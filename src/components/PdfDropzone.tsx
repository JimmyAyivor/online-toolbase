"use client";

import { useCallback, useRef, useState } from "react";
import { formatBytes } from "../lib/pdf-client";

interface PdfDropzoneProps {
  accept: string; // e.g. "application/pdf" or "image/png,image/jpeg"
  multiple?: boolean;
  label: string; // e.g. "Drop PDF files here or click to browse"
  hint?: string; // e.g. "PDF files only, up to 100MB each"
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function PdfDropzone({
  accept,
  multiple = false,
  label,
  hint,
  files,
  onFilesChange,
}: PdfDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;
      const next = Array.from(incoming);
      onFilesChange(multiple ? [...files, ...next] : [next[0]]);
    },
    [files, multiple, onFilesChange],
  );

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && inputRef.current?.click()
        }
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          acceptFiles(e.dataTransfer.files);
        }}
        className={[
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-10 text-center transition-colors cursor-pointer",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100",
        ].join(" ")}
      >
        <svg
          className="h-8 w-8 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V4.5m0 0L7.5 9m4.5-4.5L16.5 9M4.5 16.5v2a2 2 0 002 2h11a2 2 0 002-2v-2"
          />
        </svg>
        <p className="font-medium text-slate-700">{label}</p>
        {hint && <p className="text-sm text-slate-500">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => acceptFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between gap-3 px-4 py-2 text-sm"
            >
              <span className="truncate text-slate-700">{file.name}</span>
              <span className="shrink-0 text-slate-400">
                {formatBytes(file.size)}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="shrink-0 text-slate-400 hover:text-red-500"
                aria-label={`Remove ${file.name}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
