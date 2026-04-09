"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  Copy,
  Download,
  Upload,
  FileText,
  CheckCircle,
  ImageIcon,
} from "lucide-react";

/* =========================
   Types
========================= */

type Mode = "encode" | "decode";

type FileInfo = {
  name: string;
  size: string;
  type: string;
};

/* =========================
   Component
========================= */

export default function Base64EncoderDecoderClient() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  /* =========================
     Encode / Decode Logic
  ========================= */

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
        setError("");
        setImagePreview("");
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
        setError("");

        if (input.startsWith("data:image/")) {
          setImagePreview(input);
        } else if (/^[A-Za-z0-9+/=]+$/.test(input)) {
          const testImage = `data:image/png;base64,${input}`;
          setImagePreview(testImage);
        } else {
          setImagePreview("");
        }
      }
    } catch {
      setError(`Invalid input for ${mode}ing. Please check your data.`);
      setOutput("");
      setImagePreview("");
    }
  }, [input, mode]);

  /* =========================
     Clipboard
  ========================= */

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard.");
    }
  };

  /* =========================
     Downloads
  ========================= */

  const downloadOutput = (): void => {
    if (!output) return;

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "encode" ? "encoded.txt" : "decoded.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const downloadImage = (): void => {
    if (!imagePreview) return;

    const link = document.createElement("a");
    link.href = imagePreview;
    link.download = "decoded-image.png";
    link.click();
  };

  /* =========================
     File Upload (Text or Image)
  ========================= */

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileInfo({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type,
    });

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;
      if (typeof result !== "string") return;

      setInput(result);
      setMode("encode");
      setImagePreview(file.type.startsWith("image/") ? result : "");
    };

    if (file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    setFileInfo({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type,
    });

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;
      if (typeof result !== "string") return;

      setInput(result);
      setMode("encode");
      setImagePreview(result);
      setError("");
    };

    reader.readAsDataURL(file);
  };

  /* =========================
     Utilities
  ========================= */

  const clearAll = (): void => {
    setInput("");
    setOutput("");
    setError("");
    setImagePreview("");
    setFileInfo(null);
  };

  const swapMode = (): void => {
    const newMode: Mode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    if (output) setInput(output);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Base64 Encoder/Decoder
            </h1>
            <p className="text-gray-600">
              Convert text and images to/from Base64 format
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setMode("encode")}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                  mode === "encode"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Lock className="w-4 h-4" />
                Encode
              </button>
              <button
                onClick={() => setMode("decode")}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                  mode === "decode"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Unlock className="w-4 h-4" />
                Decode
              </button>
            </div>

            <div className="flex gap-2">
              <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Text
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".txt,.json,.xml,.csv"
                />
              </label>
              <label className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Upload Image
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {fileInfo && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {fileInfo.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {fileInfo.size} • {fileInfo.type}
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="font-semibold text-red-800">{error}</div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input {mode === "encode" ? "(Plain Text)" : "(Base64)"}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? "Enter text to encode..."
                    : "Enter Base64 to decode..."
                }
                className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-mono text-sm"
              />
              <div className="mt-2 text-sm text-gray-500">
                {input.length} characters
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Output {mode === "encode" ? "(Base64)" : "(Plain Text)"}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    disabled={!output}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white text-xs rounded font-medium transition-colors flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadOutput}
                    disabled={!output}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:text-gray-500 text-white text-xs rounded font-medium transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Output will appear here..."
                className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
              />
              <div className="mt-2 text-sm text-gray-500">
                {output.length} characters
              </div>
            </div>
          </div>

          {imagePreview && (
            <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Image Preview</h3>
                <button
                  onClick={downloadImage}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Image
                </button>
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-96 object-contain"
                  onError={() => setImagePreview("")}
                />
              </div>
            </div>
          )}

          <div className="flex justify-center mb-6">
            <button
              onClick={swapMode}
              disabled={!output}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Unlock className="w-5 h-5" />
              Swap & {mode === "encode" ? "Decode" : "Encode"}
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">About Base64:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Base64 encoding converts binary data into ASCII text format
              </li>
              <li>
                Commonly used for embedding images in HTML/CSS or transmitting
                data over text-based protocols
              </li>
              <li>
                Encoded data is approximately 33% larger than the original
              </li>
              <li>Upload text files or images to automatically convert them</li>
              <li>
                Image uploads will show a preview and include the data URI
                prefix
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
