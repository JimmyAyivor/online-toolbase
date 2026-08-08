"use client";

import { useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import ToolShell from "../../../components/ToolShell";
import PdfDropzone from "../../../components/PdfDropzone";
import { downloadBytes, describeError } from "../../../lib/pdf-client";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedPdfTools from "@/components/RelatedPdfTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "jpg-to-pdf");

const PAGE_SIZES: Record<string, [number, number] | "fit"> = {
  "Fit image": "fit",
  A4: [595.28, 841.89],
  "US Letter": [612, 792],
};

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState<string>("Fit image");
  const [margin, setMargin] = useState(24);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const doc = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const isPng =
          file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
        const image = isPng
          ? await doc.embedPng(bytes)
          : await doc.embedJpg(bytes);
        const dims = image.scale(1);

        const target = PAGE_SIZES[pageSize];
        if (target === "fit") {
          const page = doc.addPage([dims.width, dims.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: dims.width,
            height: dims.height,
          });
        } else {
          const [pw, ph] = target;
          const page = doc.addPage([pw, ph]);
          const maxW = pw - margin * 2;
          const maxH = ph - margin * 2;
          const ratio = Math.min(maxW / dims.width, maxH / dims.height, 1);
          const w = dims.width * ratio;
          const h = dims.height * ratio;
          page.drawImage(image, {
            x: (pw - w) / 2,
            y: (ph - h) / 2,
            width: w,
            height: h,
          });
        }
      }

      const outBytes = await doc.save();
      downloadBytes(outBytes, "images.pdf", "application/pdf");
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
          title="JPG/PNG to PDF Converter"
          description="Combine one or more images into a single PDF — in your browser, in order."
          useCases={[
            "Turn phone photos of a signed document into one PDF",
            "Combine scanned receipt photos for an expense report",
            "Package image assets into a single shareable PDF",
          ]}
          faq={[
            {
              q: "Can I combine multiple images into one PDF?",
              a: "Yes — add images in the order you want them to appear; each becomes its own page.",
            },
            {
              q: "What page size should I use?",
              a: '"Fit image" makes each page exactly match its image\'s dimensions. A4 or US Letter centers the image on a standard page — useful when printing.',
            },
          ]}
        >
          <PdfDropzone
            accept="image/jpeg,image/png"
            multiple
            label="Drop JPG/PNG images here or click to browse"
            hint="Add images in the order you want them in the PDF"
            files={files}
            onFilesChange={setFiles}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Page size
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {Object.keys(PAGE_SIZES).map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </div>
              {pageSize !== "Fit image" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Margin (pt): {margin}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={72}
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
              <button
                onClick={convert}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Building PDF…" : "Convert to PDF"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="jpg-to-pdf" />
      </SidebarAdLayout>
    </>
  );
}
