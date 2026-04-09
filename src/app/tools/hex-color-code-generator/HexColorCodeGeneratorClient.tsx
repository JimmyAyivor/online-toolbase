"use client";
import React, { useState, useEffect } from "react";
import {
  Palette,
  Copy,
  Check,
  RefreshCw,
  Heart,
  Trash2,
  Download,
  Shuffle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RGB {
  r: number;
  g: number;
  b: number;
}
interface HSL {
  h: number;
  s: number;
  l: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const INITIAL_COLOR = "#6366F1";

// ─── Helpers (module-level, pure) ────────────────────────────────────────────

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;

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

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const ln = l / 100;
  const a = (s * Math.min(ln, 1 - ln)) / 100;
  const f = (n: number): string => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getContrastColor(hexColor: string): string {
  const { r, g, b } = hexToRgb(hexColor);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function randomHex(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HexColorCodeGeneratorClient() {
  const [currentColor, setCurrentColor] = useState<string>(INITIAL_COLOR);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const [copied, setCopied] = useState<string>("");

  const rgb = hexToRgb(currentColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Derive palette from current color (no separate state needed)
  const palette: string[] = Array.from({ length: 5 }, (_, i) => {
    const hue = (hsl.h + (i - 2) * 30 + 360) % 360;
    return hslToHex(hue, hsl.s, hsl.l);
  });

  // Update history whenever current color changes (not just on random)
  useEffect(() => {
    setColorHistory((prev) => {
      if (prev[0] === currentColor) return prev; // no duplicate at head
      return [currentColor, ...prev.slice(0, 11)];
    });
  }, [currentColor]);

  const generateRandomColor = (): void => {
    setCurrentColor(randomHex());
  };

  const handleCopy = (text: string, id: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const saveColor = (): void => {
    setSavedColors((prev) =>
      prev.includes(currentColor) ? prev : [...prev, currentColor],
    );
  };

  const removeColor = (color: string): void => {
    setSavedColors((prev) => prev.filter((c) => c !== color));
  };

  const handleExportPalette = (): void => {
    const paletteData = savedColors
      .map((color) => {
        const { r, g, b } = hexToRgb(color);
        const { h, s, l } = rgbToHsl(r, g, b);
        return `${color}\nRGB: rgb(${r}, ${g}, ${b})\nHSL: hsl(${h}, ${s}%, ${l}%)`;
      })
      .join("\n\n");

    const blob = new Blob([paletteData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = "color-palette.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const contrastColor = getContrastColor(currentColor);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Hex Color Code Generator
          </h2>
          <p className="text-gray-600">
            Generate, explore, and save beautiful color palettes
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Main column ── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {/* Color preview */}
              <div
                className="w-full h-64 rounded-2xl shadow-lg mb-6 flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: currentColor }}
              >
                <div className="text-center">
                  <div
                    className="text-5xl font-bold mb-2"
                    style={{ color: contrastColor }}
                  >
                    {currentColor}
                  </div>
                  <div
                    className="text-xl"
                    style={{ color: contrastColor, opacity: 0.8 }}
                  >
                    Click to change color
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <button
                  onClick={generateRandomColor}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg transition-all"
                >
                  <Shuffle className="w-5 h-5" />
                  Random
                </button>
                <button
                  onClick={() => handleCopy(currentColor, "hex")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all"
                >
                  {copied === "hex" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                  Copy HEX
                </button>
                <button
                  onClick={saveColor}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition-all"
                >
                  <Heart className="w-5 h-5" />
                  Save
                </button>
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCurrentColor(e.target.value.toUpperCase())
                  }
                  aria-label="Pick a color"
                  className="w-full h-full rounded-xl cursor-pointer border-2 border-gray-300"
                />
              </div>

              {/* Color code display */}
              <div className="space-y-4">
                {(
                  [
                    { label: "HEX", value: currentColor, id: "hex-code" },
                    {
                      label: "RGB",
                      value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                      id: "rgb",
                    },
                    {
                      label: "HSL",
                      value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
                      id: "hsl",
                    },
                  ] as const
                ).map(({ label, value, id }) => (
                  <div key={id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">
                        {label}
                      </span>
                      <button
                        onClick={() => handleCopy(value, id)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                        aria-label={`Copy ${label} value`}
                      >
                        {copied === id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                    <code className="text-lg font-mono font-bold text-gray-900">
                      {value}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* Analogous palette */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-xl">
                <Palette className="w-6 h-6 text-pink-600" />
                Analogous Color Palette
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentColor(color)}
                    className="cursor-pointer group"
                  >
                    <div
                      className="w-full h-20 rounded-xl shadow-md group-hover:shadow-lg transition-all group-hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-xs font-mono text-center mt-2 text-gray-600">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* History */}
            {colorHistory.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-xl">
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                  Recent Colors
                </h3>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
                  {colorHistory.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentColor(color)}
                      className="cursor-pointer group"
                      title={color}
                    >
                      <div
                        className="w-full h-12 rounded-lg shadow-md group-hover:shadow-lg transition-all group-hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  Saved Colors ({savedColors.length})
                </h3>
                {savedColors.length > 0 && (
                  <button
                    onClick={handleExportPalette}
                    className="flex items-center gap-1 px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                )}
              </div>

              {savedColors.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No saved colors yet</p>
                  <p className="text-xs mt-1">Click save to add colors</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {savedColors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div
                        className="w-12 h-12 rounded-lg shadow-md flex-shrink-0 cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => setCurrentColor(color)}
                        title={`Select ${color}`}
                      />
                      <div className="flex-1 min-w-0">
                        <code className="text-sm font-mono font-bold text-gray-900 block truncate">
                          {color}
                        </code>
                      </div>
                      <button
                        onClick={() => handleCopy(color, `saved-${index}`)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                        aria-label={`Copy ${color}`}
                      >
                        {copied === `saved-${index}` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                      <button
                        onClick={() => removeColor(color)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                        aria-label={`Remove ${color}`}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-md p-6 border-2 border-pink-200">
              <h4 className="font-bold text-gray-900 mb-4">🎨 Color Formats</h4>
              <div className="space-y-3 text-sm text-gray-700">
                {[
                  {
                    color: "bg-pink-600",
                    text: (
                      <>
                        <strong>HEX:</strong> Used in CSS, HTML (#RRGGBB)
                      </>
                    ),
                  },
                  {
                    color: "bg-purple-600",
                    text: (
                      <>
                        <strong>RGB:</strong> Red, Green, Blue values (0–255)
                      </>
                    ),
                  },
                  {
                    color: "bg-indigo-600",
                    text: (
                      <>
                        <strong>HSL:</strong> Hue, Saturation, Lightness
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 ${item.color} rounded-full mt-2 flex-shrink-0`}
                    />
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-3">💡 Quick Tips</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Use color picker for precise selection</p>
                <p>• Save colors to build custom palettes</p>
                <p>• Export saved colors for your projects</p>
                <p>• Generate analogous color schemes</p>
                <p>• Copy in multiple formats (HEX, RGB, HSL)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
