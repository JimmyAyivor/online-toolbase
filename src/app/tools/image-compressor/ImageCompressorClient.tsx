"use client";
import React, { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Upload,
  Download,
  Trash2,
  Maximize2,
  Minimize2,
  Percent,
  FileImage,
  Zap,
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function qualityLabel(q: number): string {
  if (q >= 90) return "High Quality";
  if (q >= 70) return "Balanced";
  if (q >= 50) return "Medium";
  return "High Compression";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ImageCompressorClient() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (imageSrc: string, qualityValue: number): void => {
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsProcessing(false);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsProcessing(false);
            return;
          }
          setCompressedSize(blob.size);

          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              setCompressedImage(reader.result);
            }
            setIsProcessing(false);
          };
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        qualityValue / 100,
      );
    };
    img.src = imageSrc;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file || !file.type.match("image.*")) return;

    setFileName(file.name);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result;
      if (typeof src !== "string") return;
      setOriginalImage(src);
      compressImage(src, quality);
    };
    reader.readAsDataURL(file);
  };

  const handleQualityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newQuality = parseInt(e.target.value);
    setQuality(newQuality);
    if (originalImage) compressImage(originalImage, newQuality);
  };

  const handleDownload = (): void => {
    if (!compressedImage) return;
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `compressed_${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = (): void => {
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setFileName("");
    setQuality(80);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const compressionRatio =
    originalSize > 0
      ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
      : "0";

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <ImageIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Image Compressor
          </h2>
          <p className="text-gray-500">
            Reduce image file size without losing quality
          </p>
        </div>

        {!originalImage ? (
          /* ── Upload zone ── */
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-violet-500 hover:bg-violet-50 transition-all duration-300 cursor-pointer group"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Choose an image to compress
              </h3>
              <p className="text-gray-600 mb-4">or drag and drop it here</p>
              <p className="text-sm text-gray-500">Supports: JPG, PNG, WebP</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          /* ── Results ── */
          <>
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  icon: <Maximize2 className="w-5 h-5 text-blue-600" />,
                  bg: "bg-blue-100",
                  label: "Original Size",
                  value: formatFileSize(originalSize),
                  textColor: "text-gray-900",
                },
                {
                  icon: <Minimize2 className="w-5 h-5 text-green-600" />,
                  bg: "bg-green-100",
                  label: "Compressed Size",
                  value: formatFileSize(compressedSize),
                  textColor: "text-gray-900",
                },
                {
                  icon: <Percent className="w-5 h-5 text-violet-600" />,
                  bg: "bg-violet-100",
                  label: "Saved",
                  value: `${compressionRatio}%`,
                  textColor: "text-violet-600",
                },
              ].map(({ icon, bg, label, value, textColor }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 ${bg} rounded-lg`}>{icon}</div>
                    <span className="text-sm font-medium text-gray-600">
                      {label}
                    </span>
                  </div>
                  <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Controls + preview */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-violet-600" />
                    Compression Quality: {quality}%
                  </label>
                  <span className="text-xs text-gray-500">
                    {qualityLabel(quality)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={handleQualityChange}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(to right, #fca5a5 0%, #fde047 50%, #86efac 100%)",
                  }}
                  aria-label="Compression quality"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>

              {isProcessing && (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-violet-200 border-t-violet-600" />
                  <p className="text-gray-600 mt-2">Processing…</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-blue-600" />
                    Original
                  </h3>
                  <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <img
                      src={originalImage}
                      alt="Original"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-green-600" />
                    Compressed
                  </h3>
                  <div className="border-2 border-green-200 rounded-xl overflow-hidden bg-gray-50">
                    {compressedImage && (
                      <img
                        src={compressedImage}
                        alt="Compressed"
                        className="w-full h-auto"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                Download Compressed Image
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Trash2 className="w-5 h-5" />
                Clear &amp; Upload New
              </button>
            </div>
          </>
        )}

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">
            ✨ Why Use Image Compression?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            {[
              {
                color: "bg-violet-600",
                title: "Faster Loading",
                body: "Smaller images load quicker, improving user experience",
              },
              {
                color: "bg-purple-600",
                title: "Save Storage",
                body: "Reduce cloud storage costs and local disk space",
              },
              {
                color: "bg-pink-600",
                title: "SEO Boost",
                body: "Faster websites rank better in search engines",
              },
            ].map(({ color, title, body }) => (
              <div key={title} className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 ${color} rounded-full mt-2 flex-shrink-0`}
                />
                <div>
                  <strong className="text-gray-900">{title}:</strong> {body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
