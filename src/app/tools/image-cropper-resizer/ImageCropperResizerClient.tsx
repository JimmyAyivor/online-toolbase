"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Download,
  Crop,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Dimensions {
  width: number;
  height: number;
}
type Preset = "instagram" | "facebook" | "twitter" | "youtube" | "hd";
type ExportFormat = "png" | "jpg" | "webp";

// ─── Constants ───────────────────────────────────────────────────────────────

const PRESETS: Array<{ id: Preset; label: string; w: number; h: number }> = [
  { id: "instagram", label: "Instagram", w: 1080, h: 1080 },
  { id: "facebook", label: "Facebook", w: 1200, h: 630 },
  { id: "twitter", label: "Twitter", w: 1200, h: 675 },
  { id: "youtube", label: "YouTube", w: 1280, h: 720 },
  { id: "hd", label: "HD", w: 1920, h: 1080 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function drawCanvas(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  width: number,
  height: number,
  rot: number,
  fH: boolean,
  fV: boolean,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if (rot === 90 || rot === 270) {
    canvas.width = height;
    canvas.height = width;
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rot * Math.PI) / 180);
  ctx.scale(fH ? -1 : 1, fV ? -1 : 1);

  if (rot === 90 || rot === 270) {
    ctx.drawImage(img, -height / 2, -width / 2, height, width);
  } else {
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
  }

  ctx.restore();
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ImageCropperResizerClient() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const [newWidth, setNewWidth] = useState<string>("");
  const [newHeight, setNewHeight] = useState<string>("");
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [quality, setQuality] = useState<number>(90);
  const [format, setFormat] = useState<ExportFormat>("png");
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redraw whenever any render parameter changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const w = parseInt(newWidth) || dimensions.width;
    const h = parseInt(newHeight) || dimensions.height;
    drawCanvas(canvas, image, w, h, rotation, flipH, flipV);
  }, [image, newWidth, newHeight, rotation, flipH, flipV]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name.split(".")[0] ?? file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result;
      if (typeof src !== "string") return;

      const img = new Image();
      img.onload = () => {
        setImage(img);
        setDimensions({ width: img.width, height: img.height });
        setNewWidth(img.width.toString());
        setNewHeight(img.height.toString());
        setAspectRatio(img.width / img.height);
        // Reset transforms on new image
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (value: string): void => {
    setNewWidth(value);
    if (maintainAspect && value) {
      setNewHeight(Math.round(parseInt(value) / aspectRatio).toString());
    }
  };

  const handleHeightChange = (value: string): void => {
    setNewHeight(value);
    if (maintainAspect && value) {
      setNewWidth(Math.round(parseInt(value) * aspectRatio).toString());
    }
  };

  const applyPreset = (preset: Preset): void => {
    const found = PRESETS.find((p) => p.id === preset);
    if (!found) return;
    setNewWidth(found.w.toString());
    setNewHeight(found.h.toString());
    setMaintainAspect(false);
  };

  const rotate90 = (): void => {
    const next = (rotation + 90) % 360;
    setRotation(next);
    // Swap dimensions when crossing 90° / 270°
    if (next % 180 === 90) {
      setNewWidth(newHeight);
      setNewHeight(newWidth);
    }
  };

  const downloadImage = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mimeType = format === "jpg" ? "image/jpeg" : `image/${format}`;
    const dataUrl = canvas.toDataURL(mimeType, quality / 100);
    const link = document.createElement("a");
    link.download = `${imageName}_resized.${format}`;
    link.href = dataUrl;
    link.click();
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full mb-4 shadow-lg">
              <Crop className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Image Cropper &amp; Resizer
            </h2>
            <p className="text-gray-500">
              Crop and resize images to specific dimensions
            </p>
          </div>

          {!image ? (
            /* ── Upload zone ── */
            <div className="border-4 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-teal-400 transition-colors">
              <label className="cursor-pointer">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  Upload an Image
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Click to browse or drag and drop
                </div>
                <div className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors">
                  Choose File
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            /* ── Editor ── */
            <div className="space-y-6">
              {/* Image info + change */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {imageName}
                    </div>
                    <div className="text-sm text-gray-600">
                      Original: {dimensions.width} × {dimensions.height} px
                    </div>
                  </div>
                  <label className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors cursor-pointer">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Dimensions */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={newWidth}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleWidthChange(e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={newHeight}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleHeightChange(e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="maintainAspect"
                    checked={maintainAspect}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMaintainAspect(e.target.checked)
                    }
                    className="w-4 h-4 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <label
                    htmlFor="maintainAspect"
                    className="text-sm text-gray-700"
                  >
                    Maintain aspect ratio
                  </label>
                </div>
              </div>

              {/* Presets */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Quick Presets
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {PRESETS.map(({ id, label, w, h }) => (
                    <button
                      key={id}
                      onClick={() => applyPreset(id)}
                      className="px-3 py-2 bg-white hover:bg-teal-50 border border-gray-300 hover:border-teal-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      {label}
                      <br />
                      {w}×{h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transform */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Transform</h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={rotate90}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-teal-50 border border-gray-300 hover:border-teal-400 rounded-lg font-medium transition-colors"
                  >
                    <RotateCw className="w-4 h-4" />
                    Rotate 90°
                  </button>
                  <button
                    onClick={() => setFlipH((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium transition-colors ${
                      flipH
                        ? "bg-teal-100 border-teal-400"
                        : "bg-white hover:bg-teal-50 border-gray-300 hover:border-teal-400"
                    }`}
                  >
                    <FlipHorizontal className="w-4 h-4" />
                    Flip H
                  </button>
                  <button
                    onClick={() => setFlipV((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium transition-colors ${
                      flipV
                        ? "bg-teal-100 border-teal-400"
                        : "bg-white hover:bg-teal-50 border-gray-300 hover:border-teal-400"
                    }`}
                  >
                    <FlipVertical className="w-4 h-4" />
                    Flip V
                  </button>
                </div>
              </div>

              {/* Export settings */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Export Settings
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format
                    </label>
                    <select
                      value={format}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFormat(e.target.value as ExportFormat)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="png">PNG</option>
                      <option value="jpg">JPEG</option>
                      <option value="webp">WebP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quality: {quality}%
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={quality}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuality(Number(e.target.value))
                      }
                      className="w-full"
                      aria-label="Export quality"
                    />
                  </div>
                </div>
              </div>

              {/* Canvas preview */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Preview</h3>
                <div className="bg-white rounded-xl p-4 flex items-center justify-center min-h-64 overflow-auto">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-96 border border-gray-300"
                  />
                </div>
                <div className="mt-3 text-sm text-gray-600 text-center">
                  Output: {newWidth} × {newHeight} px
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={downloadImage}
                  className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-lg transition-colors flex items-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  Download Image
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">Features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Resize images to custom dimensions or use social media presets
              </li>
              <li>
                Maintain aspect ratio automatically or set custom proportions
              </li>
              <li>Rotate images in 90° increments</li>
              <li>Flip images horizontally or vertically</li>
              <li>
                Export in PNG, JPEG, or WebP formats with adjustable quality
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
