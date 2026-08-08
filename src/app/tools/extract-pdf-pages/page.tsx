"use client";

import { useEffect, useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import ToolShell from "../../../components/ToolShell";
import PdfDropzone from "../../../components/PdfDropzone";
import {
  downloadBytes,
  getPdfjs,
  renderPageThumbnail,
  stripExtension,
  describeError,
} from "../../../lib/pdf-client";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedPdfTools from "@/components/RelatedPdfTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "extract-pdf-pages");

export default function ExtractPdfPagesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [rangeInput, setRangeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (files.length === 0) {
      setThumbnails([]);
      setSelected(new Set());
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const pdfjsLib = await getPdfjs();
        const pdf = await pdfjsLib.getDocument({
          data: await files[0].arrayBuffer(),
        }).promise;
        const thumbs: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++)
          thumbs.push(await renderPageThumbnail(pdf, i));
        setThumbnails(thumbs);
      } catch (err) {
        setError(describeError(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [files]);

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const applyRangeInput = () => {
    const next = new Set<number>();
    rangeInput.split(",").forEach((part) => {
      const trimmed = part.trim();
      if (!trimmed) return;
      if (trimmed.includes("-")) {
        const [a, b] = trimmed.split("-").map((n) => parseInt(n.trim(), 10));
        if (!isNaN(a) && !isNaN(b)) {
          for (let p = Math.min(a, b); p <= Math.max(a, b); p++)
            next.add(p - 1);
        }
      } else {
        const n = parseInt(trimmed, 10);
        if (!isNaN(n)) next.add(n - 1);
      }
    });
    setSelected(next);
  };

  const apply = async () => {
    if (selected.size === 0) {
      setError("Select at least one page to extract.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const outDoc = await PDFDocument.create();
      const orderedIndices = Array.from(selected).sort((a, b) => a - b);
      const copied = await outDoc.copyPages(srcDoc, orderedIndices);
      copied.forEach((p) => outDoc.addPage(p));
      const outBytes = await outDoc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-extracted.pdf`,
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
          title="Extract PDF Pages"
          description="Pick just the pages you need and save them as a new, standalone PDF."
          useCases={[
            "Pull one chapter or section out of a longer document",
            "Save a specific page range as its own file to send separately",
            "Grab a handful of non-consecutive pages into a single new PDF",
          ]}
          faq={[
            {
              q: "How is this different from Split PDF?",
              a: "Split breaks a whole document into separate files, one per page or range. Extract Pages lets you hand-pick specific pages — including non-consecutive ones — and combine just those into one new PDF.",
            },
          ]}
        >
          <PdfDropzone
            accept="application/pdf"
            label="Drop a PDF here or click to browse"
            files={files}
            onFilesChange={setFiles}
          />

          {loading && (
            <p className="mt-4 text-center text-sm text-slate-500">
              Loading pages…
            </p>
          )}

          {thumbnails.length > 0 && (
            <div className="mt-6">
              <div className="mb-4 flex gap-2">
                <input
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder="e.g. 1-3, 5, 8"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <button
                  onClick={applyRangeInput}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  Select
                </button>
              </div>

              <p className="mb-3 text-center text-sm text-slate-500">
                {selected.size} of {thumbnails.length} page
                {thumbnails.length === 1 ? "" : "s"} selected
              </p>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {thumbnails.map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className={[
                      "relative rounded border p-1 text-center",
                      selected.has(i)
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300",
                    ].join(" ")}
                  >
                    {selected.has(i) && (
                      <span className="absolute right-1 top-1 rounded-full bg-blue-600 px-1.5 text-xs text-white">
                        ✓
                      </span>
                    )}
                    <img
                      src={thumb}
                      alt={`Page ${i + 1}`}
                      className="h-24 w-auto"
                    />
                    <p className="mt-1 text-xs text-slate-500">Page {i + 1}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={apply}
                disabled={busy || selected.size === 0}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy
                  ? "Extracting…"
                  : `Extract ${selected.size || ""} Page${selected.size === 1 ? "" : "s"} & Download`}
              </button>
              {error && (
                <p className="mt-2 text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="extract-pdf-pages" />
      </SidebarAdLayout>
    </>
  );
}
