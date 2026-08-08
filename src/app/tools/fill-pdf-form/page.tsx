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
const tool = tools.find((t) => t.slug === "fill-pdf-form");

type FieldKind = "text" | "checkbox" | "dropdown" | "radio" | "unsupported";

interface FieldMeta {
  name: string;
  kind: FieldKind;
  options?: string[];
}

export default function FillPdfFormPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [fields, setFields] = useState<FieldMeta[]>([]);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [flatten, setFlatten] = useState(true);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (files.length === 0) {
      setFields([]);
      return;
    }
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const bytes = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const form = doc.getForm();
        const detected: FieldMeta[] = form.getFields().map((f) => {
          const name = f.getName();
          const type = f.constructor.name;
          if (type === "PDFTextField") return { name, kind: "text" as const };
          if (type === "PDFCheckBox")
            return { name, kind: "checkbox" as const };
          if (type === "PDFDropdown")
            return {
              name,
              kind: "dropdown" as const,
              options: (f as any).getOptions(),
            };
          if (type === "PDFRadioGroup")
            return {
              name,
              kind: "radio" as const,
              options: (f as any).getOptions(),
            };
          return { name, kind: "unsupported" as const };
        });
        setFields(detected);
        if (detected.length === 0) {
          setError("No fillable form fields were found in this PDF.");
        }
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
      const form = doc.getForm();

      fields.forEach((field) => {
        const value = values[field.name];
        if (value === undefined) return;
        if (field.kind === "text")
          form.getTextField(field.name).setText(String(value));
        if (field.kind === "checkbox") {
          const cb = form.getCheckBox(field.name);
          value ? cb.check() : cb.uncheck();
        }
        if (field.kind === "dropdown")
          form.getDropdown(field.name).select(String(value));
        if (field.kind === "radio")
          form.getRadioGroup(field.name).select(String(value));
      });

      if (flatten) form.flatten();

      const outBytes = await doc.save();
      downloadBytes(
        outBytes,
        `${stripExtension(files[0].name)}-filled.pdf`,
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
          title="Fill PDF Form"
          description="Fill in a fillable PDF form's fields and download the completed document."
          useCases={[
            "Complete a fillable application, tax, or intake form",
            "Fill out a vendor or government PDF form without printing it",
            "Flatten a filled form so the values can't be edited afterward",
          ]}
          faq={[
            {
              q: "What if no fields are detected?",
              a: "The PDF doesn't have an interactive AcroForm — it's a static document. You can still add text with a PDF editor, but there's nothing to auto-fill.",
            },
            {
              q: 'What does "flatten" do?',
              a: "Flattening turns your filled-in values into permanent page content so they can't be edited or cleared afterward — useful before sending a form onward.",
            },
          ]}
        >
          <PdfDropzone
            accept="application/pdf"
            label="Drop a fillable PDF form here"
            files={files}
            onFilesChange={setFiles}
          />

          {loading && (
            <p className="mt-4 text-center text-sm text-slate-500">
              Reading form fields…
            </p>
          )}

          {fields.length > 0 && (
            <div className="mt-6 space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {field.name}
                  </label>
                  {field.kind === "text" && (
                    <input
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      onChange={(e) =>
                        setValues((v) => ({
                          ...v,
                          [field.name]: e.target.value,
                        }))
                      }
                    />
                  )}
                  {field.kind === "checkbox" && (
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setValues((v) => ({
                          ...v,
                          [field.name]: e.target.checked,
                        }))
                      }
                    />
                  )}
                  {(field.kind === "dropdown" || field.kind === "radio") && (
                    <select
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      defaultValue=""
                      onChange={(e) =>
                        setValues((v) => ({
                          ...v,
                          [field.name]: e.target.value,
                        }))
                      }
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {field.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  )}
                  {field.kind === "unsupported" && (
                    <p className="text-xs text-slate-400">
                      Field type not supported for editing.
                    </p>
                  )}
                </div>
              ))}

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={flatten}
                  onChange={(e) => setFlatten(e.target.checked)}
                />
                Flatten form after filling (values become permanent)
              </label>

              <button
                onClick={apply}
                disabled={busy}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy ? "Filling form…" : "Fill Form & Download"}
              </button>
            </div>
          )}
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </ToolShell>
        <RelatedPdfTools currentSlug="fill-pdf-form" />
      </SidebarAdLayout>
    </>
  );
}
