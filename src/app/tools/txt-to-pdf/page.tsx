"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "@cantoo/pdf-lib";
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
const tool = tools.find((t) => t.slug === "txt-to-pdf");

const PAGE_WIDTH = 612; // US Letter, points
const PAGE_HEIGHT = 792;
const MARGIN = 54;

function wrapLine(
  text: string,
  font: any,
  size: number,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export default function TxtToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [fontSize, setFontSize] = useState(11);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const raw = await files[0].text();
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const lineHeight = fontSize * 1.4;
      const maxWidth = PAGE_WIDTH - MARGIN * 2;

      let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      let y = PAGE_HEIGHT - MARGIN;

      const paragraphs = raw.split("\n");
      for (const paragraph of paragraphs) {
        const wrapped =
          paragraph.length === 0
            ? [""]
            : wrapLine(paragraph, font, fontSize, maxWidth);
        for (const line of wrapped) {
          if (y < MARGIN) {
            page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
            y = PAGE_HEIGHT - MARGIN;
          }
          page.drawText(line, {
            x: MARGIN,
            y,
            size: fontSize,
            font,
            color: rgb(0.1, 0.1, 0.1),
          });
          y -= lineHeight;
        }
      }

      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}.pdf`,
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
          title="TXT to PDF Converter"
          description="Turn a plain text file into a formatted, paginated PDF."
          useCases={[
            "Turn a plain-text log or notes file into a shareable PDF",
            "Convert exported chat or email text into a printable document",
            "Package a README or script output as a PDF",
          ]}
        >
          <PdfDropzone
            accept=".txt,text/plain"
            label="Drop a .txt file here or click to browse"
            files={files}
            onFilesChange={setFiles}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Font size: {fontSize}pt
                </label>
                <input
                  type="range"
                  min={8}
                  max={16}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                onClick={convert}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Converting…" : "Convert to PDF"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="txt-to-pdf" />
      </SidebarAdLayout>
    </>
  );
}
