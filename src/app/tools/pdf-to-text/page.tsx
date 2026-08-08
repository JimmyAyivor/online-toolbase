"use client";

import { useState } from "react";
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
const tool = tools.find((t) => t.slug === "pdf-to-text");

export default function PdfToTextPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [extracted, setExtracted] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extract = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    setExtracted(null);
    try {
      const pdfjsLib = await getPdfjs();
      const pdf = await pdfjsLib.getDocument({
        data: await files[0].arrayBuffer(),
      }).promise;
      const pageTexts: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Reading page ${i} of ${pdf.numPages}…`);
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map((item: any) => item.str).join(" ");
        pageTexts.push(text);
      }
      const full = pageTexts.join("\n\n");
      setExtracted(full);
      if (!full.trim()) {
        setError(
          "No selectable text was found — this PDF may be a scanned image without a text layer (OCR is needed to extract text from it).",
        );
      }
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const download = () => {
    if (!extracted || files.length === 0) return;
    downloadBytes(
      new TextEncoder().encode(extracted),
      `${stripExtension(files[0].name)}.txt`,
      "text/plain",
    );
  };

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <ToolShell
          title="PDF to Text Extractor"
          description="Pull the selectable text out of a PDF into a plain .txt file."
          useCases={[
            "Copy the text of a PDF into another document",
            "Feed a PDF's content into another tool that only accepts plain text",
            "Search or grep a document's contents outside a PDF viewer",
          ]}
          faq={[
            {
              q: "Why is the output empty or garbled?",
              a: "PDFs made from scanned images have no text layer — only a picture of text — so there's nothing to extract. You'd need OCR (optical character recognition) for those.",
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
              <button
                onClick={extract}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? (progress ?? "Extracting…") : "Extract Text"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}

              {extracted && (
                <>
                  <textarea
                    readOnly
                    value={extracted}
                    rows={12}
                    className="w-full rounded-lg border border-slate-300 p-3 font-mono text-xs"
                  />
                  <button
                    onClick={download}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Download as .txt
                  </button>
                </>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="pdf-to-text" />
      </SidebarAdLayout>
    </>
  );
}
