"use client";

import { useState } from "react";
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
const tool = tools.find((t) => t.slug === "flatten-pdf");

export default function FlattenPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const apply = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const form = doc.getForm();
      const fieldCount = form.getFields().length;

      if (fieldCount === 0) {
        setNotice(
          "This PDF has no fillable form fields to flatten — it may already be flat.",
        );
      } else {
        form.flatten();
      }

      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-flattened.pdf`,
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
          title="Flatten PDF"
          description="Turn fillable form fields into permanent, uneditable page content."
          useCases={[
            "Lock in filled-out form values before sending a document onward",
            "Prevent a completed application or contract from being altered",
            "Make a form print consistently across every PDF viewer",
          ]}
          faq={[
            {
              q: "What does flattening actually do?",
              a: "It converts each form field's current value into ordinary page content and removes the interactive field — so the text is still there, but it can no longer be edited, checked, or cleared.",
            },
            {
              q: "Can I undo flattening?",
              a: "No — like printing a form and scanning it back in, flattening is one-way. Keep a copy of the original if you might need to edit the fields again later.",
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
                onClick={apply}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Flattening…" : "Flatten PDF & Download"}
              </button>
              {notice && (
                <p className="text-center text-sm text-amber-600">{notice}</p>
              )}
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="flatten-pdf" />
      </SidebarAdLayout>
    </>
  );
}
