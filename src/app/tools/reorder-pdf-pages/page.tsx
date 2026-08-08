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
const tool = tools.find((t) => t.slug === "reorder-pdf-pages");

interface PageItem {
  originalIndex: number;
  thumbnail: string;
}

export default function ReorderPdfPagesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [order, setOrder] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (files.length === 0) {
      setOrder([]);
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const pdfjsLib = await getPdfjs();
        const pdf = await pdfjsLib.getDocument({
          data: await files[0].arrayBuffer(),
        }).promise;
        const items: PageItem[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          items.push({
            originalIndex: i - 1,
            thumbnail: await renderPageThumbnail(pdf, i),
          });
        }
        setOrder(items);
      } catch (err) {
        setError(describeError(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [files]);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length) return;
    setOrder((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const apply = async () => {
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const outDoc = await PDFDocument.create();
      const copied = await outDoc.copyPages(
        srcDoc,
        order.map((o) => o.originalIndex),
      );
      copied.forEach((p) => outDoc.addPage(p));
      const outBytes = await outDoc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-reordered.pdf`,
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
          title="Reorder / Organize PDF Pages"
          description="Rearrange pages into any order using the arrows, then export a new PDF."
          useCases={[
            "Put scanned pages back in the correct order",
            "Move an appendix to the end of a report",
            "Reorganize a combined document before sending it out",
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

          {order.length > 0 && (
            <div className="mt-6">
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {order.map((item, i) => (
                  <div key={item.originalIndex} className="text-center">
                    <div className="rounded border border-slate-200 p-1">
                      <img
                        src={item.thumbnail}
                        alt={`Page ${item.originalIndex + 1}`}
                        className="h-24 w-auto"
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Position {i + 1}{" "}
                      <span className="text-slate-400">
                        (orig. p{item.originalIndex + 1})
                      </span>
                    </p>
                    <div className="mt-1 flex justify-center gap-1">
                      <button
                        onClick={() => move(i, i - 1)}
                        disabled={i === 0}
                        className="rounded border border-slate-200 px-1.5 text-xs hover:bg-slate-50 disabled:opacity-30"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => move(i, i + 1)}
                        disabled={i === order.length - 1}
                        className="rounded border border-slate-200 px-1.5 text-xs hover:bg-slate-50 disabled:opacity-30"
                      >
                        →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={apply}
                disabled={busy}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Rebuilding PDF…" : "Download Reordered PDF"}
              </button>
              {error && (
                <p className="mt-2 text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="reorder-pdf-pages" />
      </SidebarAdLayout>
    </>
  );
}
