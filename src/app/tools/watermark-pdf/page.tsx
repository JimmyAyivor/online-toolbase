"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb, degrees } from "@cantoo/pdf-lib";
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
const tool = tools.find((t) => t.slug === "watermark-pdf");

export default function WatermarkPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.25);
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#888888");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hexToRgb01 = (hex: string) => {
    const n = parseInt(hex.replace("#", ""), 16);
    return {
      r: ((n >> 16) & 255) / 255,
      g: ((n >> 8) & 255) / 255,
      b: (n & 255) / 255,
    };
  };

  const apply = async () => {
    if (files.length === 0 || !text.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const { r, g, b } = hexToRgb01(color);
      const textWidth = font.widthOfTextAtSize(text, fontSize);

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(r, g, b),
          opacity,
          rotate: degrees(45),
        });
      });

      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-watermarked.pdf`,
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
          title="Watermark PDF"
          description="Stamp a diagonal text watermark across every page — for drafts, confidential docs, and proofs."
          useCases={[
            'Mark a document "DRAFT" or "CONFIDENTIAL" before sharing',
            "Add a company name across a proof or sample document",
            "Discourage unauthorized redistribution of a PDF",
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
                  Watermark text
                </label>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Opacity
                  </label>
                  <input
                    type="range"
                    min={0.05}
                    max={0.8}
                    step={0.05}
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Size
                  </label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Color
                  </label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-9 w-full rounded-lg border border-slate-300"
                  />
                </div>
              </div>
              <button
                onClick={apply}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Adding watermark…" : "Add Watermark & Download"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="watermark-pdf" />
      </SidebarAdLayout>
    </>
  );
}
