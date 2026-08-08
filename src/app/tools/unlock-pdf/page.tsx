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
const tool = tools.find((t) => t.slug === "unlock-pdf");

export default function UnlockPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apply = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const bytes = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(bytes, {
        password: password || undefined,
      });
      // Saving a doc loaded with the correct password writes it back out
      // without an /Encrypt dictionary — i.e. the password is removed.
      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-unlocked.pdf`,
        "application/pdf",
      );
    } catch (err) {
      setError(
        /password|decrypt/i.test(String(err))
          ? "That password didn't work. Double-check it and try again."
          : describeError(err),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <ToolShell
          title="Remove PDF Password (Unlock PDF)"
          description="Remove password protection from a PDF you have the password for — no upload required."
          badges={[
            "Free Tool",
            "No Signup",
            "100% Private — Nothing Is Uploaded",
          ]}
          useCases={[
            "Remove a password from your own document so it's easier to share internally",
            "Unlock a PDF before merging it with other files",
            "Drop the password from an old protected file you no longer need locked",
          ]}
          faq={[
            {
              q: "Do you store or see my password?",
              a: "No — the password is only used in your browser's memory to decrypt the file locally, then discarded. Nothing is transmitted.",
            },
            {
              q: "Can this crack a password I don't know?",
              a: "No. This tool removes protection from a PDF you already have the password for; it doesn't attempt to guess or break unknown passwords.",
            },
          ]}
        >
          <PdfDropzone
            accept="application/pdf"
            label="Drop a password-protected PDF here"
            files={files}
            onFilesChange={setFiles}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Current password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <button
                onClick={apply}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Unlocking…" : "Remove Password & Download"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="unlock-pdf" />
      </SidebarAdLayout>
    </>
  );
}
