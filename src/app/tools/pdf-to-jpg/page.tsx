"use client";

import { useState } from "react";
import JSZip from "jszip";
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
const tool = tools.find((t) => t.slug === "pdf-to-jpg");

export default function PdfToJpgPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<"jpeg" | "png">("jpeg");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const file = files[0];
      const pdfjsLib = await getPdfjs();
      const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() })
        .promise;
      const baseName = stripExtension(file.name);
      const ext = format === "jpeg" ? "jpg" : "png";
      const mime = format === "jpeg" ? "image/jpeg" : "image/png";

      if (pdf.numPages === 1) {
        const blob = await renderPageToBlob(pdf, 1, mime);
        downloadBytes(blob, `${baseName}.${ext}`, mime);
      } else {
        const zip = new JSZip();
        for (let i = 1; i <= pdf.numPages; i++) {
          setProgress(`Rendering page ${i} of ${pdf.numPages}…`);
          const blob = await renderPageToBlob(pdf, i, mime);
          zip.file(
            `${baseName}-page-${String(i).padStart(2, "0")}.${ext}`,
            blob,
          );
        }
        setProgress("Zipping…");
        const zipBlob = await zip.generateAsync({ type: "blob" });
        downloadBytes(zipBlob, `${baseName}-pages.zip`, "application/zip");
      }
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  async function renderPageToBlob(
    pdf: any,
    pageNum: number,
    mime: string,
  ): Promise<Blob> {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 }); // ~144 DPI
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;
    return new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b!), mime, 0.92),
    );
  }

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <ToolShell
          title="PDF to JPG Converter"
          description="Convert each page of a PDF into a JPG or PNG image — processed locally, no upload."
          useCases={[
            "Turn a PDF page into an image for a slide or social post",
            "Extract a scanned document's pages as images",
            "Get a quick thumbnail preview of a PDF's contents",
          ]}
          faq={[
            {
              q: "What resolution are the images?",
              a: "Pages are rendered at roughly 144 DPI (2x scale), which is sharp enough for screen use and most printing.",
            },
            {
              q: "How do I get all pages?",
              a: "Multi-page PDFs download as a single .zip containing one image per page, named in page order.",
            },
          ]}
        >
          <PdfDropzone
            accept="application/pdf"
            label="Drop a PDF here or click to browse"
            files={files}
            onFilesChange={setFiles}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={format === "jpeg"}
                    onChange={() => setFormat("jpeg")}
                  />{" "}
                  JPG
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={format === "png"}
                    onChange={() => setFormat("png")}
                  />{" "}
                  PNG
                </label>
              </div>
              <button
                onClick={convert}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? (progress ?? "Converting…") : "Convert to Images"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="pdf-to-jpg" />
      </SidebarAdLayout>
    </>
  );
}
