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
const tool = tools.find((t) => t.slug === "crop-pdf");

const PREVIEW_WIDTH = 360;

export default function CropPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });
  const [pageSizePt, setPageSizePt] = useState({ width: 0, height: 0 });
  const [applyToAll, setApplyToAll] = useState(true);
  const [rect, setRect] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (files.length === 0) {
      setPreviewUrl(null);
      return;
    }
    (async () => {
      try {
        const pdfjsLib = await getPdfjs();
        const pdf = await pdfjsLib.getDocument({
          data: await files[0].arrayBuffer(),
        }).promise;
        const page = await pdf.getPage(1);
        const unscaled = page.getViewport({ scale: 1 });
        setPageSizePt({ width: unscaled.width, height: unscaled.height });
        const scale = PREVIEW_WIDTH / unscaled.width;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({
          canvas,
          canvasContext: ctx,
          viewport,
        }).promise;
        setPreviewSize({ width: viewport.width, height: viewport.height });
        setPreviewUrl(canvas.toDataURL("image/png"));
        setRect(null);
      } catch (err) {
        setError(describeError(err));
      }
    })();
  }, [files]);

  const relPos = (e: React.PointerEvent) => {
    const box = containerRef.current!.getBoundingClientRect();
    return {
      x: Math.min(Math.max(e.clientX - box.left, 0), previewSize.width),
      y: Math.min(Math.max(e.clientY - box.top, 0), previewSize.height),
    };
  };

  const onDown = (e: React.PointerEvent) => {
    dragStart.current = relPos(e);
    setRect({ x: dragStart.current.x, y: dragStart.current.y, w: 0, h: 0 });
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const p = relPos(e);
    const x = Math.min(p.x, dragStart.current.x);
    const y = Math.min(p.y, dragStart.current.y);
    setRect({
      x,
      y,
      w: Math.abs(p.x - dragStart.current.x),
      h: Math.abs(p.y - dragStart.current.y),
    });
  };

  const onUp = () => {
    dragStart.current = null;
  };

  const apply = async () => {
    if (!rect || rect.w < 5 || rect.h < 5) {
      setError(
        "Drag a rectangle over the preview to select a crop area first.",
      );
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const scale = pageSizePt.width / previewSize.width;

      // Convert preview pixel rect (top-left origin) to PDF point rect (bottom-left origin).
      const cropX = rect.x * scale;
      const cropWidth = rect.w * scale;
      const cropHeightPt = rect.h * scale;
      const cropYTopPt = rect.y * scale;
      const cropY = pageSizePt.height - cropYTopPt - cropHeightPt;

      const pages = applyToAll ? doc.getPages() : [doc.getPages()[0]];
      pages.forEach((page) => {
        page.setCropBox(cropX, cropY, cropWidth, cropHeightPt);
      });

      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-cropped.pdf`,
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
          title="Crop PDF"
          description="Trim the margins or select an area to keep — drag a box on the preview to set the crop."
          useCases={[
            "Remove wide scanner margins from a scanned document",
            "Crop out a header/footer strip before sharing a page",
            "Cut a PDF down to just a chart or table region",
          ]}
          faq={[
            {
              q: "Does this apply the same crop to every page?",
              a: 'By default yes, using page 1\'s dimensions and your drawn rectangle. Turn off "apply to all pages" to crop only the first page.',
            },
            {
              q: "Is content outside the crop actually deleted?",
              a: "No — cropping sets the page's visible area (the CropBox), which is what every PDF viewer and printer respects. The original content remains in the file, similar to how Word's crop tool works. Use Redact PDF if you need content permanently removed.",
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
              <p className="mb-2 text-sm text-slate-600">
                Drag on the preview below to select the crop area (page 1
                shown):
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
                  alt="Page 1 preview"
                  className="pointer-events-none absolute inset-0"
                />
                {rect && (
                  <div
                    className="absolute border-2 border-blue-500 bg-blue-500/20"
                    style={{
                      left: rect.x,
                      top: rect.y,
                      width: rect.w,
                      height: rect.h,
                    }}
                  />
                )}
              </div>

              <label className="mt-4 flex items-center justify-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={applyToAll}
                  onChange={(e) => setApplyToAll(e.target.checked)}
                />
                Apply this crop to every page
              </label>

              <button
                onClick={apply}
                disabled={busy}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Cropping…" : "Crop PDF & Download"}
              </button>
              {error && (
                <p className="mt-2 text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="crop-pdf" />
      </SidebarAdLayout>
    </>
  );
}
