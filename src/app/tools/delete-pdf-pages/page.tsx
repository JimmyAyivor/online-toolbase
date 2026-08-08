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
const tool = tools.find((t) => t.slug === "delete-pdf-pages");

export default function DeletePdfPagesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [toDelete, setToDelete] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (files.length === 0) {
      setThumbnails([]);
      setToDelete(new Set());
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
    setToDelete((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const apply = async () => {
    if (toDelete.size === thumbnails.length) {
      setError("You can't delete every page — at least one page must remain.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      // Remove from highest index to lowest so indices stay valid.
      Array.from(toDelete)
        .sort((a, b) => b - a)
        .forEach((i) => doc.removePage(i));
      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-edited.pdf`,
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
          title="Delete PDF Pages"
          description="Remove unwanted pages from a PDF. Click pages to mark them for deletion."
          useCases={[
            "Remove a blank scanned page",
            "Cut a cover sheet or terms page before sharing",
            "Trim a report down to the sections you need",
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
              <p className="mb-3 text-center text-sm text-slate-500">
                {toDelete.size} of {thumbnails.length} page
                {thumbnails.length === 1 ? "" : "s"} marked for deletion
              </p>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {thumbnails.map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className={[
                      "relative rounded border p-1 text-center",
                      toDelete.has(i)
                        ? "border-red-400 bg-red-50"
                        : "border-slate-200 hover:border-slate-300",
                    ].join(" ")}
                  >
                    {toDelete.has(i) && (
                      <span className="absolute right-1 top-1 rounded-full bg-red-500 px-1.5 text-xs text-white">
                        ✕
                      </span>
                    )}
                    <img
                      src={thumb}
                      alt={`Page ${i + 1}`}
                      className={`h-24 w-auto ${toDelete.has(i) ? "opacity-40" : ""}`}
                    />
                    <p className="mt-1 text-xs text-slate-500">Page {i + 1}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={apply}
                disabled={busy || toDelete.size === 0}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy
                  ? "Removing pages…"
                  : `Delete ${toDelete.size || ""} Page${toDelete.size === 1 ? "" : "s"} & Download`}
              </button>
              {error && (
                <p className="mt-2 text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="delete-pdf-pages" />
      </SidebarAdLayout>
    </>
  );
}
