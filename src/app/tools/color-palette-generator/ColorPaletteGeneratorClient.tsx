"use client";
import React, { useState, useRef } from "react";
import {
  Upload,
  Palette,
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface Color {
  r: number;
  g: number;
  b: number;
  hex: string;
  hsl: HSL;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ColorPaletteGeneratorClient() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [palette, setPalette] = useState<Color[]>([]);
  const [colorCount, setColorCount] = useState<number>(5);
  const [copiedColor, setCopiedColor] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const rgbToHsl = (r: number, g: number, b: number): HSL => {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;

    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case rn:
          h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
          break;
        case gn:
          h = ((bn - rn) / d + 2) / 6;
          break;
        case bn:
          h = ((rn - gn) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const extractColors = (img: HTMLImageElement, count: number): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxSize = 200;
    const scale = Math.min(maxSize / img.width, maxSize / img.height);

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const colorMap: Record<string, number> = {};

    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      if (a < 128) continue;

      const qr = Math.round(r / 10) * 10;
      const qg = Math.round(g / 10) * 10;
      const qb = Math.round(b / 10) * 10;
      const key = `${qr},${qg},${qb}`;

      colorMap[key] = (colorMap[key] ?? 0) + 1;
    }

    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count * 3);

    const distinctColors: Color[] = [];

    for (const [colorKey] of sortedColors) {
      const [r, g, b] = colorKey.split(",").map(Number);

      const isSimilar = distinctColors.some((existing) => {
        const diff =
          Math.abs(existing.r - r) +
          Math.abs(existing.g - g) +
          Math.abs(existing.b - b);
        return diff < 60;
      });

      if (!isSimilar) {
        distinctColors.push({
          r,
          g,
          b,
          hex: rgbToHex(r, g, b),
          hsl: rgbToHsl(r, g, b),
        });
      }

      if (distinctColors.length >= count) break;
    }

    setPalette(distinctColors);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result;
      if (typeof src !== "string") return;

      const img = new Image();
      img.onload = () => {
        setImage(img);
        extractColors(img, colorCount);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const copyColor = (color: Color): void => {
    navigator.clipboard.writeText(color.hex);
    setCopiedColor(color.hex);
    setTimeout(() => setCopiedColor(""), 2000);
  };

  const generateRandom = (): void => {
    const randomColors: Color[] = Array.from({ length: colorCount }, () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return { r, g, b, hex: rgbToHex(r, g, b), hsl: rgbToHsl(r, g, b) };
    });
    setPalette(randomColors);
  };

  const exportPalette = (): void => {
    const css = palette
      .map((c, i) => `  --color-${i + 1}: ${c.hex};`)
      .join("\n");
    const fullCSS = `:root {\n${css}\n}`;
    const blob = new Blob([fullCSS], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "palette.css";
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTextColor = (r: number, g: number, b: number): string => {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <Palette className="w-8 h-8 text-pink-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Color Palette Generator
            </h2>
            <p className="text-gray-600">Extract color palettes from images</p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={generateRandom}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Random Palette
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">
                Colors: {colorCount}
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={colorCount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const count = Number(e.target.value);
                  setColorCount(count);
                  if (image) extractColors(image, count);
                }}
                className="w-32"
              />
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {image && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Source Image</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-center">
                <img
                  src={image.src}
                  alt="Uploaded source for color extraction"
                  className="max-w-full max-h-64 rounded"
                />
              </div>
            </div>
          )}

          {palette.length > 0 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Color Palette</h3>
                  <button
                    onClick={exportPalette}
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export CSS
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {palette.map((color, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                    >
                      <div
                        className="h-32 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => copyColor(color)}
                      >
                        {copiedColor === color.hex ? (
                          <div className="flex items-center gap-2 px-4 py-2 bg-black bg-opacity-20 rounded-lg">
                            <CheckCircle
                              className="w-5 h-5"
                              style={{
                                color: getTextColor(color.r, color.g, color.b),
                              }}
                            />
                            <span
                              className="font-semibold"
                              style={{
                                color: getTextColor(color.r, color.g, color.b),
                              }}
                            >
                              Copied!
                            </span>
                          </div>
                        ) : (
                          <Copy
                            className="w-6 h-6 opacity-0 hover:opacity-100 transition-opacity"
                            style={{
                              color: getTextColor(color.r, color.g, color.b),
                            }}
                          />
                        )}
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">
                            HEX
                          </span>
                          <button
                            onClick={() => copyColor(color)}
                            className="font-mono text-sm text-gray-800 hover:text-pink-600"
                          >
                            {color.hex}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">
                            RGB
                          </span>
                          <span className="font-mono text-sm text-gray-800">
                            {color.r}, {color.g}, {color.b}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">
                            HSL
                          </span>
                          <span className="font-mono text-sm text-gray-800">
                            {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Color Strip
                </h3>
                <div className="flex h-24 rounded-lg overflow-hidden">
                  {palette.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex-1 cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyColor(color)}
                      title={color.hex}
                      role="button"
                      aria-label={`Copy color ${color.hex}`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">
                  CSS Variables
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-green-400">
                    <code>
                      {`:root {\n${palette.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join("\n")}\n}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Upload an image to automatically extract its dominant colors
              </li>
              <li>
                Adjust the slider to get more or fewer colors from the palette
              </li>
              <li>Click on any color swatch to copy its HEX code</li>
              <li>Generate random palettes for inspiration</li>
              <li>Export palettes as CSS variables for easy integration</li>
              <li>The color strip shows how colors work together</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
