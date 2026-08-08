"use client";

import { useEffect, useState } from "react";
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
const tool = tools.find((t) => t.slug === "edit-pdf-metadata");

interface Meta {
  title: string;
  author: string;
  subject: string;
  keywords: string;
}

export default function EditPdfMetadataPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [meta, setMeta] = useState<Meta>({
    title: "",
    author: "",
    subject: "",
    keywords: "",
  });
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (files.length === 0) return;
    (async () => {
      setLoading(true);
      try {
        const bytes = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        setMeta({
          title: doc.getTitle() ?? "",
          author: doc.getAuthor() ?? "",
          subject: doc.getSubject() ?? "",
          keywords: (doc.getKeywords() ?? "").toString(),
        });
      } catch (err) {
        setError(describeError(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [files]);

  const apply = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      doc.setTitle(meta.title);
      doc.setAuthor(meta.author);
      doc.setSubject(meta.subject);
      doc.setKeywords(
        meta.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      );
      doc.setModificationDate(new Date());
      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-metadata.pdf`,
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
          title="Edit PDF Metadata"
          description="View and update a PDF's title, author, subject, and keywords."
          useCases={[
            "Set a proper document title so it doesn't show a filename in browser tabs",
            "Add author and keyword metadata for internal document management",
            "Clear personal metadata before sharing a file externally",
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
              Reading metadata…
            </p>
          )}

          {files.length > 0 && !loading && (
            <div className="mt-6 space-y-4">
              {(["title", "author", "subject"] as const).map((field) => (
                <div key={field}>
                  <label className="mb-1 block text-sm font-medium capitalize text-slate-700">
                    {field}
                  </label>
                  <input
                    value={meta[field]}
                    onChange={(e) =>
                      setMeta((m) => ({ ...m, [field]: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Keywords (comma-separated)
                </label>
                <input
                  value={meta.keywords}
                  onChange={(e) =>
                    setMeta((m) => ({ ...m, keywords: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <button
                onClick={apply}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Saving…" : "Save Metadata & Download"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="edit-pdf-metadata" />
      </SidebarAdLayout>
    </>
  );
}
