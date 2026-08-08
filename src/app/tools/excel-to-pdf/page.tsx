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
const tool = tools.find((t) => t.slug === "excel-to-pdf");

const PAGE_WIDTH = 792; // US Letter landscape, points — better fit for wide sheets
const PAGE_HEIGHT = 612;
const MARGIN = 36;
const ROW_HEIGHT = 18;
const FONT_SIZE = 8.5;

export default function ExcelToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const XLSX = await import("xlsx");
      const bytes = await files[0].arrayBuffer();
      const workbook = XLSX.read(bytes, { type: "array" });

      const outDoc = await PDFDocument.create();
      const font = await outDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await outDoc.embedFont(StandardFonts.HelveticaBold);

      for (const sheetName of workbook.SheetNames) {
        setProgress(`Rendering sheet "${sheetName}"…`);
        const sheet = workbook.Sheets[sheetName];
        const rows: string[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          blankrows: false,
          defval: "",
        });
        if (rows.length === 0) continue;

        const colCount = Math.max(...rows.map((r) => r.length));
        const usableWidth = PAGE_WIDTH - MARGIN * 2;
        const colWidth = usableWidth / Math.max(colCount, 1);
        const rowsPerPage = Math.floor(
          (PAGE_HEIGHT - MARGIN * 2 - ROW_HEIGHT) / ROW_HEIGHT,
        );

        for (let start = 0; start < rows.length; start += rowsPerPage) {
          const chunk = rows.slice(start, start + rowsPerPage);
          const page = outDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

          page.drawText(start === 0 ? sheetName : `${sheetName} (cont.)`, {
            x: MARGIN,
            y: PAGE_HEIGHT - MARGIN + 6,
            size: 11,
            font: boldFont,
            color: rgb(0.15, 0.15, 0.15),
          });

          let y = PAGE_HEIGHT - MARGIN - ROW_HEIGHT;
          chunk.forEach((row, rowIdx) => {
            const isHeaderRow = start === 0 && rowIdx === 0;
            for (let c = 0; c < colCount; c++) {
              const raw = row[c] ?? "";
              const text = truncateToWidth(
                String(raw),
                isHeaderRow ? boldFont : font,
                FONT_SIZE,
                colWidth - 4,
              );
              page.drawText(text, {
                x: MARGIN + c * colWidth + 2,
                y,
                size: FONT_SIZE,
                font: isHeaderRow ? boldFont : font,
                color: rgb(0.1, 0.1, 0.1),
              });
            }
            page.drawLine({
              start: { x: MARGIN, y: y - 4 },
              end: { x: MARGIN + colWidth * colCount, y: y - 4 },
              thickness: 0.5,
              color: rgb(0.85, 0.85, 0.85),
            });
            y -= ROW_HEIGHT;
          });
        }
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

  function truncateToWidth(
    text: string,
    font: any,
    size: number,
    maxWidth: number,
  ): string {
    if (font.widthOfTextAtSize(text, size) <= maxWidth) return text;
    let truncated = text;
    while (
      truncated.length > 1 &&
      font.widthOfTextAtSize(truncated + "…", size) > maxWidth
    ) {
      truncated = truncated.slice(0, -1);
    }
    return truncated + "…";
  }

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <ToolShell
          title="Excel to PDF Converter"
          description="Convert a spreadsheet's data into a clean, paginated PDF table — with real, selectable text."
          useCases={[
            "Share a spreadsheet with someone who doesn't have Excel",
            "Produce a printable PDF version of a data export",
            "Archive a spreadsheet's contents in a fixed, non-editable format",
          ]}
          faq={[
            {
              q: "Does this keep my original formatting, formulas, and charts?",
              a: "No — this extracts each sheet's cell values into a simple table (grid lines, bold header row) rather than replicating Excel's exact styling, cell colors, or charts. Formulas are converted to their calculated values, not the formulas themselves.",
            },
            {
              q: "What happens with wide spreadsheets?",
              a: 'Pages are laid out in landscape to fit more columns, but very wide sheets will still shrink each column and truncate long text with "…" to keep everything on the page.',
            },
            {
              q: "Are multiple sheets included?",
              a: "Yes — every sheet in the workbook is converted, each starting with its own sheet-name heading.",
            },
          ]}
        >
          <PdfDropzone
            accept=".xlsx,.xls,.csv"
            label="Drop a .xlsx, .xls, or .csv file here"
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
        <RelatedPdfTools currentSlug="excel-to-pdf" />
      </SidebarAdLayout>
    </>
  );
}
