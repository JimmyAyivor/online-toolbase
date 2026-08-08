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
const tool = tools.find((t) => t.slug === "add-pdf-page-numbers");
const POSITIONS = {
  "Bottom center": "bottom-center",
  "Bottom right": "bottom-right",
  "Bottom left": "bottom-left",
  "Top center": "top-center",
  "Top right": "top-right",
} as const;

export default function AddPageNumbersPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [position, setPosition] =
    useState<keyof typeof POSITIONS>("Bottom center");
  const [format, setFormat] = useState("Page {n} of {total}");
  const [startAt, setStartAt] = useState(1);
  const [fontSize, setFontSize] = useState(10);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apply = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const total = pages.length;

      pages.forEach((page, i) => {
        const label = format
          .replace("{n}", String(i + startAt))
          .replace("{total}", String(total + startAt - 1));
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(label, fontSize);
        const margin = 24;
        let x = margin;
        let y = margin;

        switch (POSITIONS[position]) {
          case "bottom-center":
            x = (width - textWidth) / 2;
            y = margin;
            break;
          case "bottom-right":
            x = width - textWidth - margin;
            y = margin;
            break;
          case "bottom-left":
            x = margin;
            y = margin;
            break;
          case "top-center":
            x = (width - textWidth) / 2;
            y = height - margin;
            break;
          case "top-right":
            x = width - textWidth - margin;
            y = height - margin;
            break;
        }

        page.drawText(label, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.2, 0.2, 0.2),
        });
      });

      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-numbered.pdf`,
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
          title="Add Page Numbers to PDF"
          description="Stamp page numbers onto every page, in the position and format you choose."
          useCases={[
            "Number a report or proposal before printing",
            'Add "Page X of Y" to a multi-section handout',
            "Restart numbering at a specific value for an appendix",
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
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Position
                </label>
                <select
                  value={position}
                  onChange={(e) =>
                    setPosition(e.target.value as keyof typeof POSITIONS)
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {Object.keys(POSITIONS).map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Format
                </label>
                <input
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  placeholder="Page {n} of {total}"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Use {"{n}"} for the page number and {"{total}"} for the page
                  count.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Start at
                  </label>
                  <input
                    type="number"
                    value={startAt}
                    onChange={(e) => setStartAt(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Font size
                  </label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <button
                onClick={apply}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Adding page numbers…" : "Add Page Numbers & Download"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="add-pdf-page-numbers" />
      </SidebarAdLayout>
    </>
  );
}
