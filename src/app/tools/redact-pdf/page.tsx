"use client";

import { useEffect, useRef, useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import ToolShell from "../../../components/ToolShell";
import PdfDropzone from "../../../components/PdfDropzone";
import {
  downloadBytes,
  getPdfjs,
  stripExtension,
  describeError,
} from "../../../lib/pdf-client";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedPdfTools from "@/components/RelatedPdfTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "redact-pdf");

const PREVIEW_WIDTH = 500;
const RASTER_SCALE = 2.5; // render scale for pages that get redacted, for a crisp result

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function RedactPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });
  const [boxesByPage, setBoxesByPage] = useState<Record<number, Rect[]>>({});
  const [draftRect, setDraftRect] = useState<Rect | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfjsInstance, setPdfjsInstance] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (files.length === 0) {
      setPreviewUrl(null);
      setPdfjsInstance(null);
      return;
    }
    (async () => {
      try {
        const pdfjsLib = await getPdfjs();
        const pdf = await pdfjsLib.getDocument({
          data: await files[0].arrayBuffer(),
        }).promise;
        setPdfjsInstance(pdf);
        setNumPages(pdf.numPages);
        setCurrentPage(0);
        setBoxesByPage({});
      } catch (err) {
        setError(describeError(err));
      }
    })();
  }, [files]);

  useEffect(() => {
    if (!pdfjsInstance) return;
    (async () => {
      const page = await pdfjsInstance.getPage(currentPage + 1);
      const unscaled = page.getViewport({ scale: 1 });
      const scale = PREVIEW_WIDTH / unscaled.width;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx, viewport }).promise;
      setPreviewSize({ width: viewport.width, height: viewport.height });
      setPreviewUrl(canvas.toDataURL("image/png"));
    })();
  }, [pdfjsInstance, currentPage]);

  const relPos = (e: React.PointerEvent) => {
    const box = containerRef.current!.getBoundingClientRect();
    return {
      x: Math.min(Math.max(e.clientX - box.left, 0), previewSize.width),
      y: Math.min(Math.max(e.clientY - box.top, 0), previewSize.height),
    };
  };

  const onDown = (e: React.PointerEvent) => {
    dragStart.current = relPos(e);
    setDraftRect({
      x: dragStart.current.x,
      y: dragStart.current.y,
      w: 0,
      h: 0,
    });
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const p = relPos(e);
    const x = Math.min(p.x, dragStart.current.x);
    const y = Math.min(p.y, dragStart.current.y);
    setDraftRect({
      x,
      y,
      w: Math.abs(p.x - dragStart.current.x),
      h: Math.abs(p.y - dragStart.current.y),
    });
  };

  const onUp = () => {
    dragStart.current = null;
    if (draftRect && draftRect.w > 4 && draftRect.h > 4) {
      setBoxesByPage((prev) => ({
        ...prev,
        [currentPage]: [...(prev[currentPage] ?? []), draftRect],
      }));
    }
    setDraftRect(null);
  };

  const undoLast = () => {
    setBoxesByPage((prev) => ({
      ...prev,
      [currentPage]: (prev[currentPage] ?? []).slice(0, -1),
    }));
  };

  const totalBoxes = Object.values(boxesByPage).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );

  const apply = async () => {
    if (totalBoxes === 0) {
      setError("Draw at least one black box over content you want to redact.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const pdfjsLib = await getPdfjs();
      const srcBytes = await files[0].arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: srcBytes.slice(0) })
        .promise;
      const srcDoc = await PDFDocument.load(srcBytes);
      const outDoc = await PDFDocument.create();

      for (let i = 0; i < pdf.numPages; i++) {
        const boxes = boxesByPage[i];
        if (!boxes || boxes.length === 0) {
          // No redactions on this page — copy it through unchanged, preserving text/quality.
          const [copied] = await outDoc.copyPages(srcDoc, [i]);
          outDoc.addPage(copied);
          continue;
        }

        // Redacted page: rasterize at high scale, paint black boxes, embed as an image.
        // This genuinely removes the underlying text/vector content, unlike a plain overlay.
        const page = await pdf.getPage(i + 1);
        const unscaled = page.getViewport({ scale: 1 });
        const previewScaleForPage = PREVIEW_WIDTH / unscaled.width;
        const viewport = page.getViewport({ scale: RASTER_SCALE });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({
          canvas,
          canvasContext: ctx,
          viewport,
        }).promise;

        ctx.fillStyle = "#000000";
        const rasterPerPreviewPx = RASTER_SCALE / previewScaleForPage;
        boxes.forEach((b) => {
          ctx.fillRect(
            b.x * rasterPerPreviewPx,
            b.y * rasterPerPreviewPx,
            b.w * rasterPerPreviewPx,
            b.h * rasterPerPreviewPx,
          );
        });

        const jpegBytes = await (
          await fetch(canvas.toDataURL("image/jpeg", 0.9))
        ).arrayBuffer();
        const embedded = await outDoc.embedJpg(jpegBytes);
        const outPage = outDoc.addPage([unscaled.width, unscaled.height]);
        outPage.drawImage(embedded, {
          x: 0,
          y: 0,
          width: unscaled.width,
          height: unscaled.height,
        });
      }

      const outBytes = await outDoc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-redacted.pdf`,
        "application/pdf",
      );
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <ToolShell
          title="Redact PDF"
          description="Permanently black out sensitive text or images before sharing a document."
          useCases={[
            "Black out account numbers or SSNs before sending a document externally",
            "Remove a name or signature from a form you're sharing as a sample",
            "Cover confidential figures in a report before distribution",
          ]}
          faq={[
            {
              q: "Does this actually remove the content, or just cover it?",
              a: "Any page you redact is rasterized (converted to an image) with the black box baked in, so the underlying text can't be selected, copied, or recovered by removing an overlay — a common flaw in tools that just draw a shape on top of live text. Pages you don't mark are left untouched at full quality.",
            },
            {
              q: "Will this affect pages I don't redact?",
              a: "No — only pages with at least one black box are rasterized. Every other page stays exactly as it was, text and all.",
            },
          ]}
        >
          <PdfDropzone
            accept="application/pdf"
            label="Drop a PDF here or click to browse"
            files={files}
            onFilesChange={setFiles}
          />

          {previewUrl && (
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between text-sm">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-50 disabled:opacity-30"
                >
                  ← Prev
                </button>
                <span className="text-slate-600">
                  Page {currentPage + 1} of {numPages} —{" "}
                  {(boxesByPage[currentPage] ?? []).length} box(es) here
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(numPages - 1, p + 1))
                  }
                  disabled={currentPage === numPages - 1}
                  className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-50 disabled:opacity-30"
                >
                  Next →
                </button>
              </div>

              <p className="mb-2 text-center text-xs text-slate-500">
                Drag on the page to draw a redaction box
              </p>

              <div
                ref={containerRef}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                className="relative mx-auto touch-none select-none"
                style={{ width: previewSize.width, height: previewSize.height }}
              >
                <img
                  src={previewUrl}
                  alt={`Page ${currentPage + 1} preview`}
                  className="pointer-events-none absolute inset-0"
                />
                {(boxesByPage[currentPage] ?? []).map((b, i) => (
                  <div
                    key={i}
                    className="absolute bg-black"
                    style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
                  />
                ))}
                {draftRect && (
                  <div
                    className="absolute border-2 border-red-500 bg-black/60"
                    style={{
                      left: draftRect.x,
                      top: draftRect.y,
                      width: draftRect.w,
                      height: draftRect.h,
                    }}
                  />
                )}
              </div>

              <div className="mt-3 flex justify-center gap-2">
                <button
                  onClick={undoLast}
                  className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                >
                  Undo last box on this page
                </button>
              </div>

              <button
                onClick={apply}
                disabled={busy || totalBoxes === 0}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy
                  ? "Redacting…"
                  : `Redact ${totalBoxes} Area${totalBoxes === 1 ? "" : "s"} & Download`}
              </button>
              {error && (
                <p className="mt-2 text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="redact-pdf" />
      </SidebarAdLayout>
    </>
  );
}
