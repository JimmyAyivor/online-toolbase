"use client";
import React, { useState, useRef } from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Merge,
  Split,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Mode = "merge" | "split";
type MessageType = "error" | "success" | "info" | "";

interface PdfFile {
  id: number;
  file: File;
  name: string;
  size: number;
}

interface StatusMessage {
  type: MessageType;
  text: string;
}

interface FeatureTip {
  color: string;
  title: string;
  desc: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FEATURE_TIPS: FeatureTip[] = [
  {
    color: "bg-red-600",
    title: "Free & Secure",
    desc: "All processing happens in your browser",
  },
  {
    color: "bg-orange-600",
    title: "No Upload Required",
    desc: "Your files never leave your device",
  },
  {
    color: "bg-yellow-600",
    title: "Reorder Files",
    desc: "Use arrows to change merge order",
  },
  {
    color: "bg-green-600",
    title: "Fast Processing",
    desc: "Quick merging and splitting",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PdfMergerSplitterClient() {
  const [mode, setMode] = useState<Mode>("merge");
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [splitRange, setSplitRange] = useState<string>("1-5");
  const [processing, setProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<StatusMessage>({ type: "", text: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Handlers ──────────────────────────────────────────────────────────

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selected = Array.from(e.target.files ?? []).filter(
      (file) => file.type === "application/pdf",
    );

    if (selected.length === 0) {
      setMessage({ type: "error", text: "Please select PDF files only" });
      return;
    }

    const newFiles: PdfFile[] = selected.map((file, i) => ({
      id: Date.now() + i,
      file,
      name: file.name,
      size: file.size,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setMessage({ type: "success", text: `${selected.length} file(s) added` });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (id: number): void => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setMessage({ type: "success", text: "File removed" });
  };

  const moveFile = (index: number, direction: "up" | "down"): void => {
    const next = direction === "up" ? index - 1 : index + 1;
    if (next < 0 || next >= files.length) return;
    setFiles((prev) => {
      const arr = [...prev];
      [arr[index], arr[next]] = [arr[next]!, arr[index]!];
      return arr;
    });
  };

  const clearAll = (): void => {
    setFiles([]);
    setMessage({ type: "success", text: "All files cleared" });
  };

  const handleMerge = (): void => {
    if (files.length < 2) {
      setMessage({
        type: "error",
        text: "Please add at least 2 PDF files to merge",
      });
      return;
    }
    setProcessing(true);
    setMessage({ type: "info", text: "Merging PDFs…" });
    setTimeout(() => {
      setProcessing(false);
      setMessage({
        type: "success",
        text: `Successfully merged ${files.length} PDFs! Download would start in a real implementation.`,
      });
    }, 2000);
  };

  const handleSplit = (): void => {
    if (files.length === 0) {
      setMessage({ type: "error", text: "Please add a PDF file to split" });
      return;
    }
    if (!splitRange.trim()) {
      setMessage({
        type: "error",
        text: "Please enter page range (e.g., 1-5 or 3,5,7)",
      });
      return;
    }
    setProcessing(true);
    setMessage({ type: "info", text: "Splitting PDF…" });
    setTimeout(() => {
      setProcessing(false);
      setMessage({
        type: "success",
        text: "Successfully split PDF! Download would start in a real implementation.",
      });
    }, 2000);
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mb-4 shadow-lg'>
            <FileText className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            PDF Merger &amp; Splitter
          </h2>
          <p className='text-gray-600'>
            Merge multiple PDFs or split a PDF into separate files
          </p>
        </div>

        {/* Mode selector */}
        <div className='grid md:grid-cols-2 gap-4 mb-6'>
          {[
            {
              id: "merge" as Mode,
              icon: <Merge className='w-6 h-6' />,
              title: "Merge PDFs",
              desc: "Combine multiple PDFs into one",
            },
            {
              id: "split" as Mode,
              icon: <Split className='w-6 h-6' />,
              title: "Split PDF",
              desc: "Extract specific pages from PDF",
            },
          ].map(({ id, icon, title, desc }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`flex items-center justify-center gap-3 p-6 rounded-xl transition-all duration-200 ${
                mode === id
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              {icon}
              <div className='text-left'>
                <div className='font-bold text-lg'>{title}</div>
                <div className='text-sm opacity-90'>{desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Status message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              message.type === "error"
                ? "bg-red-50   text-red-700   border border-red-200"
                : message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-blue-50  text-blue-700  border border-blue-200"
            }`}
          >
            {message.type === "error" && (
              <AlertCircle className='w-5 h-5 flex-shrink-0' />
            )}
            {message.type === "success" && (
              <CheckCircle className='w-5 h-5 flex-shrink-0' />
            )}
            <span className='font-medium'>{message.text}</span>
          </div>
        )}

        {/* File area */}
        <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6'>
          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className='border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-red-500 hover:bg-red-50 transition-all duration-300 cursor-pointer group mb-6'
          >
            <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mb-6 group-hover:scale-110 transition-transform'>
              <Upload className='w-10 h-10 text-red-600' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>
              {mode === "merge"
                ? "Add PDF Files to Merge"
                : "Add PDF File to Split"}
            </h3>
            <p className='text-gray-600 mb-2'>
              Click to browse or drag and drop
            </p>
            <p className='text-sm text-gray-500'>PDF files only</p>
          </div>

          <input
            ref={fileInputRef}
            type='file'
            accept='application/pdf'
            multiple={mode === "merge"}
            onChange={handleFileSelect}
            className='hidden'
          />

          {files.length > 0 && (
            <>
              {/* File list header */}
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-bold text-gray-900'>
                  Selected Files ({files.length}) — Total:{" "}
                  {formatFileSize(totalSize)}
                </h3>
                <button
                  onClick={clearAll}
                  className='flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors'
                >
                  <Trash2 className='w-4 h-4' />
                  Clear All
                </button>
              </div>

              {/* File rows */}
              <div className='space-y-3 mb-6'>
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors'
                  >
                    <FileText className='w-8 h-8 text-red-600 flex-shrink-0' />
                    <div className='flex-1 min-w-0'>
                      <p className='font-semibold text-gray-900 truncate'>
                        {file.name}
                      </p>
                      <p className='text-sm text-gray-600'>
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    {mode === "merge" && files.length > 1 && (
                      <div className='flex gap-2'>
                        <button
                          onClick={() => moveFile(index, "up")}
                          disabled={index === 0}
                          aria-label='Move up'
                          className={`p-2 rounded-lg transition-colors ${
                            index === 0
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <ArrowUp className='w-5 h-5' />
                        </button>
                        <button
                          onClick={() => moveFile(index, "down")}
                          disabled={index === files.length - 1}
                          aria-label='Move down'
                          className={`p-2 rounded-lg transition-colors ${
                            index === files.length - 1
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <ArrowDown className='w-5 h-5' />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => removeFile(file.id)}
                      aria-label={`Remove ${file.name}`}
                      className='p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors'
                    >
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </div>
                ))}
              </div>

              {/* Split range input */}
              {mode === "split" && (
                <div className='mb-6'>
                  <label className='block text-sm font-bold text-gray-700 mb-2'>
                    Page Range to Extract
                  </label>
                  <input
                    type='text'
                    value={splitRange}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSplitRange(e.target.value)
                    }
                    placeholder='e.g., 1-5 or 1,3,5-8'
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors'
                  />
                  <p className='text-sm text-gray-600 mt-2'>
                    Enter page numbers (e.g., &ldquo;1-5&rdquo; for pages 1 to
                    5, or &ldquo;1,3,5&rdquo; for specific pages)
                  </p>
                </div>
              )}

              {/* Action button */}
              <button
                onClick={mode === "merge" ? handleMerge : handleSplit}
                disabled={processing}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                  processing
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {processing ? (
                  <>
                    <div className='animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent' />
                    Processing…
                  </>
                ) : (
                  <>
                    <Download className='w-6 h-6' />
                    {mode === "merge"
                      ? "Merge & Download PDF"
                      : "Split & Download PDF"}
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Features */}
        <div className='bg-white rounded-xl shadow-md p-6'>
          <h3 className='font-bold text-gray-900 mb-4'>
            ✨ Features &amp; Tips
          </h3>
          <div className='grid md:grid-cols-2 gap-4 text-sm text-gray-700'>
            {FEATURE_TIPS.map(({ color, title, desc }) => (
              <div key={title} className='flex items-start gap-3'>
                <div
                  className={`w-2 h-2 ${color} rounded-full mt-2 flex-shrink-0`}
                />
                <div>
                  <strong className='text-gray-900'>{title}:</strong> {desc}
                </div>
              </div>
            ))}
          </div>
          <div className='mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
            <p className='text-sm text-yellow-800'>
              <strong>Note:</strong> This is a demonstration interface. In a
              production version, you would integrate a PDF processing library
              like pdf-lib or PDF.js to actually merge/split PDFs in the
              browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
