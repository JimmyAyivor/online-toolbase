"use client";

import { useState } from "react";
import { diffLines, Change } from "diff";
import ToolShell from "../../../components/ToolShell";
import PdfDropzone from "../../../components/PdfDropzone";
import { getPdfjs, describeError } from "../../../lib/pdf-client";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedPdfTools from "@/components/RelatedPdfTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "compare-pdfs");

async function extractText(file: File): Promise<string> {
  const pdfjsLib = await getPdfjs();
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() })
    .promise;
  const pageTexts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    pageTexts.push(content.items.map((item: any) => item.str).join(" "));
  }
  return pageTexts.join("\n");
}

export default function ComparePdfsPage() {
  const [fileA, setFileA] = useState<File[]>([]);
  const [fileB, setFileB] = useState<File[]>([]);
  const [diff, setDiff] = useState<Change[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compare = async () => {
    if (fileA.length === 0 || fileB.length === 0) return;
    setBusy(true);
    setError(null);
    setDiff(null);
    try {
      const [textA, textB] = await Promise.all([
        extractText(fileA[0]),
        extractText(fileB[0]),
      ]);
      if (!textA.trim() || !textB.trim()) {
        setError(
          "One of these PDFs has no selectable text (likely a scan), so there's nothing to compare textually.",
        );
        return;
      }
      setDiff(diffLines(textA, textB));
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  };

  const addedCount = diff?.filter((d) => d.added).length ?? 0;
  const removedCount = diff?.filter((d) => d.removed).length ?? 0;

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <ToolShell
          title="Compare PDFs"
          description="See exactly what text changed between two versions of a document."
          useCases={[
            "Check what changed between two contract drafts",
            "Verify a revised report matches expected edits before sending it out",
            "Spot differences between two versions of the same form",
          ]}
          faq={[
            {
              q: "Does this compare layout and images, or just text?",
              a: "Just the text content, extracted page by page. Layout, formatting, and images aren't compared — for a purely visual/formatting diff you'd need to compare the PDFs side by side manually.",
            },
            {
              q: "Why does it say there's nothing to compare?",
              a: "Scanned PDFs are images of text, not real text, so there's no text layer to extract. Neither file can be compared this way.",
            },
          ]}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Original
              </p>
              <PdfDropzone
                accept="application/pdf"
                label="Drop the original PDF"
                files={fileA}
                onFilesChange={setFileA}
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Revised</p>
              <PdfDropzone
                accept="application/pdf"
                label="Drop the revised PDF"
                files={fileB}
                onFilesChange={setFileB}
              />
            </div>
          </div>

          {fileA.length > 0 && fileB.length > 0 && (
            <div className="mt-6">
              <button
                onClick={compare}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Comparing…" : "Compare PDFs"}
              </button>
              {error && (
                <p className="mt-2 text-center text-sm text-red-600">{error}</p>
              )}

              {diff && (
                <div className="mt-4">
                  <p className="mb-2 text-center text-sm text-slate-600">
                    <span className="text-green-700">+{addedCount} added</span>{" "}
                    ·{" "}
                    <span className="text-red-700">
                      -{removedCount} removed
                    </span>
                  </p>
                  <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 p-3 text-xs leading-relaxed">
                    {diff.map((part, i) => (
                      <span
                        key={i}
                        className={
                          part.added
                            ? "bg-green-100 text-green-800"
                            : part.removed
                              ? "bg-red-100 text-red-800 line-through"
                              : "text-slate-600"
                        }
                      >
                        {part.value}
                      </span>
                    ))}
                  </pre>
                </div>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="compare-pppdfs" />
      </SidebarAdLayout>
    </>
  );
}
