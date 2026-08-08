"use client";

import { useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import ToolShell from "../../../components/ToolShell";
import PdfDropzone from "../../../components/PdfDropzone";
import {
  downloadBytes,
  formatBytes,
  getPdfjs,
  stripExtension,
  describeError,
} from "../../../lib/pdf-client";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedPdfTools from "@/components/RelatedPdfTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "pdf-compressor");

const QUALITY_PRESETS = [
  { label: "High quality (larger file)", scale: 2.0, jpegQuality: 0.85 },
  { label: "Recommended", scale: 1.5, jpegQuality: 0.72 },
  { label: "Smallest file (lower quality)", scale: 1.0, jpegQuality: 0.55 },
] as const;

export default function PdfCompressorPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [presetIndex, setPresetIndex] = useState(1);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [result, setResult] = useState<{
    originalSize: number;
    newSize: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const compress = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const file = files[0];
      const preset = QUALITY_PRESETS[presetIndex];
      const pdfjsLib = await getPdfjs();
      const sourceBytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: sourceBytes.slice(0) })
        .promise;

      const outDoc = await PDFDocument.create();

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Compressing page ${i} of ${pdf.numPages}…`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: preset.scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({
          canvas,
          canvasContext: ctx,
          viewport,
        }).promise;
        const jpegDataUrl = canvas.toDataURL("image/jpeg", preset.jpegQuality);
        const jpegBytes = await (await fetch(jpegDataUrl)).arrayBuffer();
        const embedded = await outDoc.embedJpg(jpegBytes);

        const pageWidthPt = viewport.width / preset.scale; // back to 72dpi points
        const pageHeightPt = viewport.height / preset.scale;
        const outPage = outDoc.addPage([pageWidthPt, pageHeightPt]);
        outPage.drawImage(embedded, {
          x: 0,
          y: 0,
          width: pageWidthPt,
          height: pageHeightPt,
        });
      }

      setProgress("Finalizing…");
      const outBytes = await outDoc.save();
      setResult({ originalSize: file.size, newSize: outBytes.byteLength });
      downloadBytes(
        outBytes,
        `${stripExtension(file.name)}-compressed.pdf`,
        "application/pdf",
      );
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <ToolShell
          title="PDF Compressor"
          description="Shrink PDF file size for email and upload limits — entirely in your browser."
          useCases={[
            "Get a scanned PDF under an email attachment size limit",
            "Shrink a photo-heavy report before uploading to a portal",
            "Reduce a presentation PDF's size for faster sharing",
          ]}
          faq={[
            {
              q: "Will compression affect quality?",
              a: "Yes — pages are re-rendered as images at your chosen quality level, so there's a size/quality trade-off. Selectable text becomes part of the image, similar to a scanned page. This works best for image-heavy or scanned PDFs.",
            },
            {
              q: "Is there a file size limit?",
              a: "Large PDFs (100+ pages) use your device's memory since everything runs in-browser. For very large files, try a lower quality preset or split the PDF first.",
            },
          ]}
        >
          <PdfDropzone
            accept="application/pdf"
            label="Drop a PDF here or click to browse"
            hint="PDF files only"
            files={files}
            onFilesChange={setFiles}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Compression level
                </label>
                <select
                  value={presetIndex}
                  onChange={(e) => setPresetIndex(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {QUALITY_PRESETS.map((p, i) => (
                    <option key={p.label} value={i}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={compress}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? (progress ?? "Compressing…") : "Compress PDF"}
              </button>

              {result && (
                <p className="text-center text-sm text-slate-600">
                  {formatBytes(result.originalSize)} →{" "}
                  {formatBytes(result.newSize)} (
                  {Math.max(
                    0,
                    Math.round(
                      (1 - result.newSize / result.originalSize) * 100,
                    ),
                  )}
                  % smaller)
                </p>
              )}
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="pdf-compressor" />
      </SidebarAdLayout>
    </>
  );
}
