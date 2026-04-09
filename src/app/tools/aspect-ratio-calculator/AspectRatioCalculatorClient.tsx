"use client";
import React, { useState, useMemo } from "react";
import { Maximize2, RotateCcw, Copy, CheckCircle } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(w: number, h: number): [number, number] {
  const d = gcd(Math.round(w), Math.round(h));
  return [Math.round(w) / d, Math.round(h) / d];
}

function decimalToRatio(dec: number): string {
  // Match to common ratios
  const COMMON = [
    [16, 9],
    [4, 3],
    [21, 9],
    [9, 16],
    [3, 2],
    [1, 1],
    [5, 4],
    [2, 1],
    [18, 9],
    [16, 10],
  ];
  for (const [rw, rh] of COMMON) {
    if (Math.abs(dec - rw / rh) < 0.01) return `${rw}:${rh}`;
  }
  const [sw, sh] = simplify(Math.round(dec * 100), 100);
  return `${sw}:${sh}`;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const COMMON_RATIOS = [
  { label: "16:9", desc: "HD Video / YouTube", w: 16, h: 9 },
  { label: "4:3", desc: "Standard / Legacy TV", w: 4, h: 3 },
  { label: "1:1", desc: "Square / Instagram", w: 1, h: 1 },
  { label: "9:16", desc: "Portrait / Reels / TikTok", w: 9, h: 16 },
  { label: "21:9", desc: "Ultrawide / Cinematic", w: 21, h: 9 },
  { label: "3:2", desc: "DSLR / Photography", w: 3, h: 2 },
  { label: "5:4", desc: "Medium Format", w: 5, h: 4 },
  { label: "16:10", desc: "Widescreen Monitor", w: 16, h: 10 },
];

type Mode = "find-ratio" | "find-height" | "find-width" | "scale";

// ─── Component ───────────────────────────────────────────────────────────────

export default function AspectRatioCalculatorClient() {
  const [mode, setMode] = useState<Mode>("find-ratio");
  const [w1, setW1] = useState("");
  const [h1, setH1] = useState("");
  const [w2, setW2] = useState("");
  const [h2, setH2] = useState("");
  const [ratioW, setRatioW] = useState("");
  const [ratioH, setRatioH] = useState("");
  const [scale, setScale] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const fw = parseFloat(w1),
      fh = parseFloat(h1);
    const fw2 = parseFloat(w2),
      fh2 = parseFloat(h2);
    const rw = parseFloat(ratioW),
      rh = parseFloat(ratioH);
    const sc = parseFloat(scale) / 100;

    if (mode === "find-ratio") {
      if (!fw || !fh || fw <= 0 || fh <= 0) return null;
      const [sw, sh] = simplify(fw, fh);
      const dec = fw / fh;
      return {
        ratio: `${sw}:${sh}`,
        decimal: dec.toFixed(4),
        commonName: decimalToRatio(dec),
        width: fw,
        height: fh,
        megapixels: fw && fh ? ((fw * fh) / 1_000_000).toFixed(2) : null,
      };
    }

    if (mode === "find-height") {
      if (!fw || !rw || !rh || rw <= 0 || rh <= 0 || fw <= 0) return null;
      const newH = (fw / rw) * rh;
      return { width: fw, height: Math.round(newH), ratio: `${rw}:${rh}` };
    }

    if (mode === "find-width") {
      if (!fh || !rw || !rh || rw <= 0 || rh <= 0 || fh <= 0) return null;
      const newW = (fh / rh) * rw;
      return { width: Math.round(newW), height: fh, ratio: `${rw}:${rh}` };
    }

    if (mode === "scale") {
      if (!fw || !fh || !sc || sc <= 0) return null;
      return {
        width: Math.round(fw * sc),
        height: Math.round(fh * sc),
        ratio: decimalToRatio(fw / fh),
        scale: `${scale}%`,
      };
    }

    return null;
  }, [mode, w1, h1, w2, h2, ratioW, ratioH, scale]);

  const copyResult = () => {
    if (!result) return;
    const text = `${result.width} × ${result.height}${"ratio" in result ? ` (${result.ratio})` : ""}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (pw: number, ph: number) => {
    setRatioW(String(pw));
    setRatioH(String(ph));
    if (mode === "find-ratio") {
      setW1(String(pw * 100));
      setH1(String(ph * 100));
    }
  };

  const reset = () => {
    setW1("");
    setH1("");
    setW2("");
    setH2("");
    setRatioW("");
    setRatioH("");
    setScale("");
  };

  const inp =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm";
  const modeBtn = (m: Mode, label: string) => (
    <button
      key={m}
      onClick={() => {
        setMode(m);
        reset();
      }}
      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${mode === m ? "bg-blue-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Maximize2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Aspect Ratio Calculator
          </h2>
          <p className="text-gray-500">
            Calculate aspect ratios, find missing dimensions, and scale images
            or videos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            {/* Mode tabs */}
            <div className="bg-white rounded-2xl shadow-xl p-2 flex gap-2">
              {modeBtn("find-ratio", "Find Ratio")}
              {modeBtn("find-height", "Find Height")}
              {modeBtn("find-width", "Find Width")}
              {modeBtn("scale", "Scale")}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              {mode === "find-ratio" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">
                    Enter dimensions to find the aspect ratio
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Width (px)
                      </label>
                      <input
                        type="number"
                        value={w1}
                        onChange={(e) => setW1(e.target.value)}
                        placeholder="1920"
                        min="1"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height (px)
                      </label>
                      <input
                        type="number"
                        value={h1}
                        onChange={(e) => setH1(e.target.value)}
                        placeholder="1080"
                        min="1"
                        className={inp}
                      />
                    </div>
                  </div>
                </div>
              )}
              {mode === "find-height" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">
                    Enter width and ratio to find height
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={w1}
                      onChange={(e) => setW1(e.target.value)}
                      placeholder="1920"
                      min="1"
                      className={inp}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ratio W
                      </label>
                      <input
                        type="number"
                        value={ratioW}
                        onChange={(e) => setRatioW(e.target.value)}
                        placeholder="16"
                        min="1"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ratio H
                      </label>
                      <input
                        type="number"
                        value={ratioH}
                        onChange={(e) => setRatioH(e.target.value)}
                        placeholder="9"
                        min="1"
                        className={inp}
                      />
                    </div>
                  </div>
                </div>
              )}
              {mode === "find-width" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">
                    Enter height and ratio to find width
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={h1}
                      onChange={(e) => setH1(e.target.value)}
                      placeholder="1080"
                      min="1"
                      className={inp}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ratio W
                      </label>
                      <input
                        type="number"
                        value={ratioW}
                        onChange={(e) => setRatioW(e.target.value)}
                        placeholder="16"
                        min="1"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ratio H
                      </label>
                      <input
                        type="number"
                        value={ratioH}
                        onChange={(e) => setRatioH(e.target.value)}
                        placeholder="9"
                        min="1"
                        className={inp}
                      />
                    </div>
                  </div>
                </div>
              )}
              {mode === "scale" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">
                    Scale dimensions by percentage
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Width (px)
                      </label>
                      <input
                        type="number"
                        value={w1}
                        onChange={(e) => setW1(e.target.value)}
                        placeholder="1920"
                        min="1"
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height (px)
                      </label>
                      <input
                        type="number"
                        value={h1}
                        onChange={(e) => setH1(e.target.value)}
                        placeholder="1080"
                        min="1"
                        className={inp}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scale: {scale || 100}%
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="400"
                      value={scale || 100}
                      onChange={(e) => setScale(e.target.value)}
                      className="w-full mb-2"
                    />
                    <input
                      type="number"
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      placeholder="100"
                      min="1"
                      className={inp}
                    />
                  </div>
                </div>
              )}
              <button
                onClick={reset}
                className="mt-4 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Common ratios */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Common Ratios</h3>
              <div className="grid grid-cols-2 gap-2">
                {COMMON_RATIOS.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => applyPreset(r.w, r.h)}
                    className="text-left p-3 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="font-bold text-blue-700 text-sm">
                      {r.label}
                    </div>
                    <div className="text-xs text-gray-500">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="lg:sticky lg:top-8 self-start space-y-5">
            {result ? (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-gray-900 text-lg">Result</h3>
                  <button
                    onClick={copyResult}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-3">
                  {"ratio" in result && result.ratio && (
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <div className="text-4xl font-black text-blue-700 mb-1">
                        {result.ratio}
                      </div>
                      {"commonName" in result &&
                        result.commonName !== result.ratio && (
                          <div className="text-sm text-blue-500">
                            ≈ {result.commonName}
                          </div>
                        )}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-gray-900">
                        {result.width?.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Width (px)
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-gray-900">
                        {result.height?.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Height (px)
                      </div>
                    </div>
                    {"decimal" in result && result.decimal && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-xl font-bold text-gray-900">
                          {result.decimal}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Decimal ratio
                        </div>
                      </div>
                    )}
                    {"megapixels" in result && result.megapixels && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-xl font-bold text-gray-900">
                          {result.megapixels} MP
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Megapixels
                        </div>
                      </div>
                    )}
                    {"scale" in result && result.scale && (
                      <div className="bg-indigo-50 rounded-xl p-4 col-span-2">
                        <div className="text-lg font-bold text-indigo-700">
                          Scaled to {result.scale}
                        </div>
                        <div className="text-sm text-gray-600 mt-0.5">
                          {result.width} × {result.height} px
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual preview */}
                {result.width && result.height && (
                  <div className="mt-5">
                    <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                      Visual preview
                    </p>
                    <div
                      className="bg-gray-100 rounded-xl flex items-center justify-center"
                      style={{
                        aspectRatio: `${result.width} / ${result.height}`,
                        maxHeight: 200,
                      }}
                    >
                      <span className="text-xs text-gray-400 font-mono">
                        {result.width} × {result.height}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <Maximize2 className="w-12 h-12 mx-auto text-gray-200 mb-3" />
                <p className="text-gray-400 text-sm">
                  Enter dimensions above to see the result
                </p>
              </div>
            )}

            {/* Reference table */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                Common Resolution Reference
              </h3>
              <div className="overflow-hidden rounded-xl border border-gray-100 text-xs">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-bold text-gray-500">
                        Name
                      </th>
                      <th className="px-3 py-2 text-left font-bold text-gray-500">
                        Size
                      </th>
                      <th className="px-3 py-2 text-left font-bold text-gray-500">
                        Ratio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      ["4K UHD", "3840×2160", "16:9"],
                      ["1080p Full HD", "1920×1080", "16:9"],
                      ["720p HD", "1280×720", "16:9"],
                      ["Instagram Square", "1080×1080", "1:1"],
                      ["Instagram Story", "1080×1920", "9:16"],
                      ["YouTube Thumbnail", "1280×720", "16:9"],
                      ["Twitter/X Banner", "1500×500", "3:1"],
                      ["Facebook Cover", "820×312", "~5:2"],
                      ["A4 (300dpi)", "2480×3508", "√2:1"],
                    ].map(([name, size, ratio]) => (
                      <tr key={name} className="hover:bg-blue-50">
                        <td className="px-3 py-2 font-medium text-gray-700">
                          {name}
                        </td>
                        <td className="px-3 py-2 font-mono text-gray-600">
                          {size}
                        </td>
                        <td className="px-3 py-2 font-bold text-blue-600">
                          {ratio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
