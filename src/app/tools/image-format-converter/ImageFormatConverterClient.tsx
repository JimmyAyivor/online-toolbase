"use client";
import React, { useState, useRef } from "react";
import { Upload, Download, Image as ImageIcon, Info } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ExportFormat = "png" | "jpg" | "webp";

interface FormatOption {
  value: ExportFormat;
  label: string;
  mime: string;
  desc: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FORMATS: FormatOption[] = [
  {
    value: "png",
    label: "PNG",
    mime: "image/png",
    desc: "Lossless, supports transparency",
  },
  {
    value: "jpg",
    label: "JPEG",
    mime: "image/jpeg",
    desc: "Lossy compression, smaller files",
  },
  {
    value: "webp",
    label: "WebP",
    mime: "image/webp",
    desc: "Modern format, better compression",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

function approxBase64Size(dataUrl: string, mime: string): number {
  const prefix = `data:${mime};base64,`.length;
  const base64Len = dataUrl.length - prefix;
  return (base64Len * 3) / 4;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ImageFormatConverterClient() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [originalFormat, setOriginalFormat] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [targetFormat, setTargetFormat] = useState<ExportFormat>("png");
  const [quality, setQuality] = useState<number>(90);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const convertImage = (
    img: HTMLImageElement,
    format: ExportFormat,
    qual: number,
  ): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (format === "jpg") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(img, 0, 0);

    const formatInfo = FORMATS.find((f) => f.value === format);
    if (!formatInfo) return;

    const dataUrl = canvas.toDataURL(formatInfo.mime, qual / 100);
    setConvertedImage(dataUrl);
    setConvertedSize(approxBase64Size(dataUrl, formatInfo.mime));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name.split(".")[0] ?? file.name);
    setOriginalFormat((file.type.split("/")[1] ?? "unknown").toUpperCase());
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result;
      if (typeof src !== "string") return;

      const img = new window.Image();
      img.onload = () => {
        setImage(img);
        convertImage(img, targetFormat, quality);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleFormatChange = (format: ExportFormat): void => {
    setTargetFormat(format);
    if (image) convertImage(image, format, quality);
  };

  const handleQualityChange = (qual: number): void => {
    setQuality(qual);
    if (image) convertImage(image, targetFormat, qual);
  };

  const downloadConverted = (): void => {
    if (!convertedImage) return;
    const link = document.createElement("a");
    link.download = `${imageName}_converted.${targetFormat}`;
    link.href = convertedImage;
    link.click();
  };

  const savingsPct = (): string => {
    if (!originalSize || !convertedSize) return "0.0";
    return (((originalSize - convertedSize) / originalSize) * 100).toFixed(1);
  };

  const savings = parseFloat(savingsPct());

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
              <ImageIcon className='w-8 h-8 text-blue-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Image Format Converter
            </h2>
            <p className='text-gray-600'>
              Convert between JPG, PNG, and WebP formats
            </p>
          </div>

          {!image ? (
            /* ── Upload zone ── */
            <div className='border-4 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors'>
              <label className='cursor-pointer'>
                <Upload className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                <div className='text-lg font-semibold text-gray-700 mb-2'>
                  Upload an Image
                </div>
                <div className='text-sm text-gray-500 mb-4'>
                  JPG, PNG, WebP, or other image formats
                </div>
                <div className='inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors'>
                  Choose Image
                </div>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='hidden'
                />
              </label>
            </div>
          ) : (
            /* ── Editor ── */
            <div className='space-y-6'>
              {/* Image info */}
              <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <div className='font-semibold text-gray-800'>
                      {imageName}
                    </div>
                    <div className='text-sm text-gray-600'>
                      Original: {originalFormat} · {formatBytes(originalSize)} ·{" "}
                      {image.width}×{image.height}
                    </div>
                  </div>
                  <label className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer'>
                    Change Image
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      className='hidden'
                    />
                  </label>
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  {/* Format picker */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Convert To
                    </label>
                    <div className='space-y-2'>
                      {FORMATS.map((fmt) => (
                        <label
                          key={fmt.value}
                          className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                            targetFormat === fmt.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <input
                            type='radio'
                            name='format'
                            value={fmt.value}
                            checked={targetFormat === fmt.value}
                            onChange={() => handleFormatChange(fmt.value)}
                            className='mt-1'
                          />
                          <div className='flex-1'>
                            <div className='font-semibold text-gray-800'>
                              {fmt.label}
                            </div>
                            <div className='text-xs text-gray-600'>
                              {fmt.desc}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quality + stats */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Quality: {quality}%
                      {targetFormat === "png" && (
                        <span className='text-xs text-gray-500 ml-2'>
                          (PNG is lossless)
                        </span>
                      )}
                    </label>
                    <input
                      type='range'
                      min='1'
                      max='100'
                      value={quality}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleQualityChange(Number(e.target.value))
                      }
                      disabled={targetFormat === "png"}
                      className='w-full mb-4'
                      aria-label='Conversion quality'
                    />

                    <div className='bg-white rounded-lg p-4 border border-gray-200'>
                      <h4 className='font-semibold text-gray-800 mb-2 text-sm'>
                        Conversion Info
                      </h4>
                      <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Original Size:</span>
                          <span className='font-semibold text-gray-800'>
                            {formatBytes(originalSize)}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>New Size:</span>
                          <span className='font-semibold text-gray-800'>
                            {formatBytes(convertedSize)}
                          </span>
                        </div>
                        <div className='flex justify-between pt-2 border-t border-gray-200'>
                          <span className='text-gray-600'>Savings:</span>
                          <span
                            className={`font-bold ${savings > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {savingsPct()}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden canvas */}
              <canvas ref={canvasRef} className='hidden' />

              {/* Preview */}
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='font-semibold text-gray-800 mb-3'>
                    Original Image
                  </h3>
                  <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                    <img
                      src={image.src}
                      alt='Original'
                      className='max-w-full rounded'
                    />
                  </div>
                  <div className='mt-2 text-sm text-gray-600 text-center'>
                    {originalFormat} · {formatBytes(originalSize)}
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold text-gray-800 mb-3'>
                    Converted Image
                  </h3>
                  <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                    {convertedImage && (
                      <img
                        src={convertedImage}
                        alt='Converted'
                        className='max-w-full rounded'
                      />
                    )}
                  </div>
                  <div className='mt-2 text-sm text-gray-600 text-center'>
                    {targetFormat.toUpperCase()} · {formatBytes(convertedSize)}
                  </div>
                </div>
              </div>

              <div className='flex justify-center'>
                <button
                  onClick={downloadConverted}
                  className='px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors flex items-center gap-3'
                >
                  <Download className='w-6 h-6' />
                  Download {targetFormat.toUpperCase()}
                </button>
              </div>

              {/* Format guide */}
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                <div className='flex items-start gap-3'>
                  <Info className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                  <div className='text-sm text-gray-700'>
                    <p className='font-semibold mb-1'>Format Guide:</p>
                    <ul className='space-y-1'>
                      <li>
                        <strong>PNG:</strong> Best for graphics, logos, and
                        images with transparency. Lossless.
                      </li>
                      <li>
                        <strong>JPEG:</strong> Best for photographs. Smaller
                        files but no transparency.
                      </li>
                      <li>
                        <strong>WebP:</strong> Modern format with superior
                        compression. Supports both lossy and lossless.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Features:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Convert images between PNG, JPEG, and WebP formats</li>
              <li>Adjust quality for lossy formats (JPEG, WebP)</li>
              <li>See file size comparison before and after conversion</li>
              <li>Preview both original and converted images</li>
              <li>Automatic white background for JPEG (no transparency)</li>
              <li>Calculate file size savings percentage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
