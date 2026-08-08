"use client";

import { useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import ToolShell from "../../../components/ToolShell";
import PdfDropzone from "../../../components/PdfDropzone";
import {
  downloadBytes,
  stripExtension,
  describeError,
} from "../../../lib/pdf-client";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedPdfTools from "@/components/RelatedPdfTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "word-to-pdf");

// US Letter at 96 CSS px/in, rendered at 2x for a crisp result.
const CSS_PAGE_WIDTH = 816; // 8.5in * 96
const CSS_PAGE_HEIGHT = 1056; // 11in * 96
const RENDER_SCALE = 2;
const PDF_PAGE_WIDTH = 612; // points
const PDF_PAGE_HEIGHT = 792;

export default function WordToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    setProgress("Reading document…");
    try {
      const mammoth = await import("mammoth");
      const html2canvas = (await import("html2canvas")).default;

      const arrayBuffer = await files[0].arrayBuffer();
      const { value: html, messages } = await mammoth.convertToHtml({
        arrayBuffer,
      });
      if (messages.some((m) => m.type === "error")) {
        throw new Error(
          "Some parts of this document couldn't be read — it may use unsupported formatting.",
        );
      }

      setProgress("Laying out pages…");
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-99999px";
      container.style.top = "0";
      container.style.width = `${CSS_PAGE_WIDTH}px`;
      container.style.padding = "72px 60px"; // ~0.75in / 0.6in margins
      container.style.boxSizing = "border-box";
      container.style.background = "#ffffff";
      container.style.fontFamily = "Georgia, 'Times New Roman', serif";
      container.style.fontSize = "16px";
      container.style.lineHeight = "1.5";
      container.style.color = "#1a1a1a";
      container.innerHTML = html;
      document.body.appendChild(container);

      setProgress("Rendering…");
      const canvas = await html2canvas(container, {
        scale: RENDER_SCALE,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      document.body.removeChild(container);

      const pxPerPdfPage = CSS_PAGE_HEIGHT * RENDER_SCALE;
      const totalPages = Math.max(1, Math.ceil(canvas.height / pxPerPdfPage));

      const outDoc = await PDFDocument.create();
      for (let i = 0; i < totalPages; i++) {
        setProgress(`Building page ${i + 1} of ${totalPages}…`);
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = pxPerPdfPage;
        const ctx = sliceCanvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          i * pxPerPdfPage,
          canvas.width,
          pxPerPdfPage,
          0,
          0,
          canvas.width,
          pxPerPdfPage,
        );

        const jpegBytes = await (
          await fetch(sliceCanvas.toDataURL("image/jpeg", 0.88))
        ).arrayBuffer();
        const embedded = await outDoc.embedJpg(jpegBytes);
        const page = outDoc.addPage([PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT]);
        page.drawImage(embedded, {
          x: 0,
          y: 0,
          width: PDF_PAGE_WIDTH,
          height: PDF_PAGE_HEIGHT,
        });
      }

      const outBytes = await outDoc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}.pdf`,
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
          title="Word to PDF Converter"
          description="Convert a .docx file to PDF, entirely in your browser."
          useCases={[
            "Turn a Word draft into a PDF before sending it out for signature",
            "Convert a resume or cover letter to PDF for a job application",
            "Produce a print-ready PDF from a Word document",
          ]}
          faq={[
            {
              q: "Will formatting look exactly the same?",
              a: "Close, for typical documents — headings, paragraphs, lists, bold/italic, and simple tables carry over well. Complex layouts (multi-column sections, text boxes, embedded objects, precise page breaks) may shift, since conversion happens without Word itself. For pixel-perfect fidelity on complex documents, exporting to PDF from Word directly is still more reliable.",
            },
            {
              q: "Is the resulting text selectable?",
              a: "No — pages are rendered as high-resolution images to guarantee visual accuracy across all formatting, similar to a print-to-PDF. If you need selectable/searchable text, use TXT to PDF for plain text instead.",
            },
          ]}
        >
          <PdfDropzone
            accept=".docx"
            label="Drop a .docx file here or click to browse"
            files={files}
            onFilesChange={setFiles}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <button
                onClick={convert}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? (progress ?? "Converting…") : "Convert to PDF"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="word-to-pdf" />
      </SidebarAdLayout>
    </>
  );
}
