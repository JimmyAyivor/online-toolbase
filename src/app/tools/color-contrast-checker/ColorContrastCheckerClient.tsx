"use client";
import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(hex1: string, hex2: string): number | null {
  const rgb1 = hexToRgb(hex1),
    rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const l1 = relativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = relativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2),
    darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const SAMPLE_PAIRS = [
  { label: "Black on white", text: "#000000", bg: "#FFFFFF" },
  { label: "White on blue", text: "#FFFFFF", bg: "#2563EB" },
  { label: "Dark on yellow", text: "#1F2937", bg: "#FDE047" },
  { label: "White on red", text: "#FFFFFF", bg: "#DC2626" },
];

export default function ColorContrastCheckerClient() {
  const [textColor, setTextColor] = useState("#1F2937");
  const [bgColor, setBgColor] = useState("#FFFFFF");

  const ratio = contrastRatio(textColor, bgColor);
  const r = ratio ? parseFloat(ratio.toFixed(2)) : null;

  const passes = r
    ? {
        aaLarge: r >= 3,
        aaNormal: r >= 4.5,
        aaaLarge: r >= 4.5,
        aaaNormal: r >= 7,
        uiComponent: r >= 3,
      }
    : null;

  const ratingColor = !r
    ? "text-gray-400"
    : r >= 7
      ? "text-emerald-600"
      : r >= 4.5
        ? "text-blue-600"
        : r >= 3
          ? "text-amber-600"
          : "text-red-600";

  const ratingLabel = !r
    ? "—"
    : r >= 7
      ? "Excellent"
      : r >= 4.5
        ? "Good"
        : r >= 3
          ? "Partial"
          : "Fail";

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M12 2a10 10 0 0 1 0 20"
                  fill="currentColor"
                  fillOpacity={0.3}
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Color Contrast Checker
            </h2>
            <p className="text-gray-500">
              Test WCAG AA and AAA accessibility compliance for any color pair
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              {/* Color inputs */}
              {[
                {
                  label: "Text color",
                  value: textColor,
                  setter: setTextColor,
                  accent: "violet",
                },
                {
                  label: "Background color",
                  value: bgColor,
                  setter: setBgColor,
                  accent: "indigo",
                },
              ].map(({ label, value, setter, accent }) => (
                <div key={label}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="w-12 h-12 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                      <input
                        type="color"
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setter(e.target.value.toUpperCase())
                        }
                        className="w-full h-full cursor-pointer scale-125"
                      />
                    </div>
                    <input
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const v = e.target.value.toUpperCase();
                        if (/^#[0-9A-F]{0,6}$/.test(v)) setter(v);
                      }}
                      maxLength={7}
                      placeholder="#000000"
                      className={`flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 font-mono focus:ring-2 focus:ring-${accent}-400 focus:border-transparent uppercase`}
                    />
                  </div>
                </div>
              ))}

              {/* Swap button */}
              <button
                onClick={() => {
                  const t = textColor;
                  setTextColor(bgColor);
                  setBgColor(t);
                }}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-violet-300 hover:text-violet-600 transition-colors font-medium"
              >
                ⇅ Swap text and background colors
              </button>

              {/* Presets */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Try a preset
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_PAIRS.map(({ label, text, bg }) => (
                    <button
                      key={label}
                      onClick={() => {
                        setTextColor(text);
                        setBgColor(bg);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:border-violet-300 text-xs font-semibold text-gray-700 transition-all hover:shadow-sm"
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-gray-200 inline-block"
                        style={{ backgroundColor: bg }}
                      />
                      <span
                        style={{
                          color: text,
                          backgroundColor: bg,
                          padding: "0 4px",
                          borderRadius: 4,
                          fontSize: 11,
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {/* Live preview */}
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <div className="p-6" style={{ backgroundColor: bgColor }}>
                  <p
                    className="text-2xl font-black mb-1"
                    style={{ color: textColor }}
                  >
                    Large text preview
                  </p>
                  <p className="text-sm" style={{ color: textColor }}>
                    Normal text — this is how your color pair looks in practice.
                    The contrast ratio determines how readable this text is for
                    users with visual impairments.
                  </p>
                </div>
                <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    {textColor} on {bgColor}
                  </span>
                  <span className={`text-sm font-black ${ratingColor}`}>
                    {ratingLabel}
                  </span>
                </div>
              </div>

              {/* Ratio */}
              {r !== null && (
                <div
                  className={`rounded-2xl p-5 text-center ${r >= 7 ? "bg-emerald-50 border border-emerald-100" : r >= 4.5 ? "bg-blue-50 border border-blue-100" : r >= 3 ? "bg-amber-50 border border-amber-100" : "bg-red-50 border border-red-100"}`}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                    Contrast ratio
                  </p>
                  <p className={`text-5xl font-black ${ratingColor}`}>
                    {r.toFixed(2)}
                    <span className="text-xl">:1</span>
                  </p>
                </div>
              )}

              {/* WCAG grid */}
              {passes && (
                <div className="grid grid-cols-1 gap-2">
                  {[
                    {
                      label: "AA — Normal text (≥4.5:1)",
                      pass: passes.aaNormal,
                    },
                    {
                      label: "AA — Large text / UI (≥3:1)",
                      pass: passes.aaLarge,
                    },
                    {
                      label: "AAA — Normal text (≥7:1)",
                      pass: passes.aaaNormal,
                    },
                    {
                      label: "AAA — Large text (≥4.5:1)",
                      pass: passes.aaaLarge,
                    },
                  ].map(({ label, pass }) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border ${pass ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"}`}
                    >
                      <span className="text-sm text-gray-700">{label}</span>
                      <span
                        className={`text-sm font-black ${pass ? "text-emerald-600" : "text-red-500"}`}
                      >
                        {pass ? "✓ Pass" : "✗ Fail"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setTextColor("#1F2937");
              setBgColor("#FFFFFF");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 WCAG contrast tips:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                WCAG AA (4.5:1) is the minimum required for most legal
                accessibility compliance
              </li>
              <li>
                WCAG AAA (7:1) is the enhanced level — recommended for body text
              </li>
              <li>
                Large text (18pt+ or 14pt+ bold) has a lower requirement of 3:1
              </li>
              <li>
                UI components and icons also require a 3:1 ratio against
                adjacent colors
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
