"use client";

import { useEffect, useState } from "react";
import { PDFDocument, degrees } from "@cantoo/pdf-lib";
import ToolShell from "../../../components/ToolShell";
import PdfDropzone from "../../../components/PdfDropzone";
import {
  downloadBytes,
  getPdfjs,
  renderPageThumbnail,
  stripExtension,
  describeError,
} from "../../../lib/pdf-client";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedPdfTools from "@/components/RelatedPdfTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "rotate-pdf");
interface PageState {
  thumbnail: string;
  rotation: number; // relative rotation to apply, in 90deg steps
}

export default function RotatePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState<PageState[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (files.length === 0) {
      setPages([]);
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const pdfjsLib = await getPdfjs();
        const pdf = await pdfjsLib.getDocument({
          data: await files[0].arrayBuffer(),
        }).promise;
        const thumbs: PageState[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          thumbs.push({
            thumbnail: await renderPageThumbnail(pdf, i),
            rotation: 0,
          });
        }
        setPages(thumbs);
      } catch (err) {
        setError(describeError(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [files]);

  const rotatePage = (index: number, delta: number) => {
    setPages((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, rotation: (p.rotation + delta + 360) % 360 } : p,
      ),
    );
  };

  const rotateAll = (delta: number) => {
    setPages((prev) =>
      prev.map((p) => ({ ...p, rotation: (p.rotation + delta + 360) % 360 })),
    );
  };

  const apply = async () => {
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      doc.getPages().forEach((page, i) => {
        const current = page.getRotation().angle;
        page.setRotation(degrees(current + pages[i].rotation));
      });
      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-rotated.pdf`,
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
          title="Rotate PDF"
          description="Fix sideways or upside-down pages — rotate one page or the whole document."
          useCases={[
            "Fix pages scanned in the wrong orientation",
            "Rotate a single landscape page within a portrait document",
            "Straighten an entire PDF before printing",
          ]}
        >
          <PdfDropzone
            accept="application/pdf"
            label="Drop a PDF here or click to browse"
            files={files}
            onFilesChange={setFiles}
          />

          {loading && (
            <p className="mt-4 text-center text-sm text-slate-500">
              Loading pages…
            </p>
          )}

          {pages.length > 0 && (
            <div className="mt-6">
              <div className="mb-4 flex justify-center gap-2">
                <button
                  onClick={() => rotateAll(-90)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                >
                  ⟲ Rotate all left
                </button>
                <button
                  onClick={() => rotateAll(90)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                >
                  ⟳ Rotate all right
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {pages.map((p, i) => (
                  <div key={i} className="text-center">
                    <div className="mx-auto w-fit rounded border border-slate-200 p-1">
                      <img
                        src={p.thumbnail}
                        alt={`Page ${i + 1}`}
                        style={{ transform: `rotate(${p.rotation}deg)` }}
                        className="h-24 w-auto transition-transform"
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Page {i + 1}</p>
                    <div className="mt-1 flex justify-center gap-1">
                      <button
                        onClick={() => rotatePage(i, -90)}
                        className="rounded border border-slate-200 px-1.5 text-xs hover:bg-slate-50"
                      >
                        ⟲
                      </button>
                      <button
                        onClick={() => rotatePage(i, 90)}
                        className="rounded border border-slate-200 px-1.5 text-xs hover:bg-slate-50"
                      >
                        ⟳
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={apply}
                disabled={busy}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Applying rotation…" : "Download Rotated PDF"}
              </button>
              {error && (
                <p className="mt-2 text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="rotate-pdf" />
      </SidebarAdLayout>
    </>
  );
}
