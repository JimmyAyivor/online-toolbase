"use client";
import React, { useState, useCallback } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToHsb(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; v: number } {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn);
  const v = max,
    d = max - min;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

const PRESETS = [
  { name: "Crimson", hex: "#DC143C" },
  { name: "Coral", hex: "#FF6B6B" },
  { name: "Sunset", hex: "#FF8C42" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Lime", hex: "#32CD32" },
  { name: "Teal", hex: "#008080" },
  { name: "Sky", hex: "#87CEEB" },
  { name: "Royal", hex: "#4169E1" },
  { name: "Violet", hex: "#8A2BE2" },
  { name: "Rose", hex: "#FF007F" },
  { name: "Slate", hex: "#708090" },
  { name: "Onyx", hex: "#353839" },
];

export default function ColorCodeConverterClient() {
  const [hex, setHex] = useState("#6366F1");
  const [hexInput, setHexInput] = useState("#6366F1");
  const [copied, setCopied] = useState<string | null>(null);

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const hsb = rgb ? rgbToHsb(rgb.r, rgb.g, rgb.b) : null;

  const applyHex = useCallback((value: string) => {
    const clean = value.startsWith("#") ? value : "#" + value;
    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      setHex(clean.toUpperCase());
      setHexInput(clean.toUpperCase());
    }
  }, []);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const CopyBtn = ({ value, label }: { value: string; label: string }) => (
    <button
      onClick={() => copy(value, label)}
      className='flex items-center gap-1 text-xs text-gray-400 hover:text-pink-600 transition-colors'
    >
      {copied === label ? (
        <Check className='w-3.5 h-3.5 text-green-500' />
      ) : (
        <Copy className='w-3.5 h-3.5' />
      )}
    </button>
  );

  const isLight = rgb
    ? (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 128
    : true;

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mb-4 shadow-lg'>
              <svg
                className='w-8 h-8 text-white'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <circle cx='12' cy='12' r='10' />
                <circle cx='12' cy='12' r='3' />
                <path d='M12 2v3M12 19v3M2 12h3M19 12h3' />
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Color Code Converter
            </h2>
            <p className='text-gray-500'>
              Convert between HEX, RGB, HSL, and HSB color formats instantly
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Left — picker + input */}
            <div className='space-y-5'>
              {/* Color preview + picker */}
              <div
                className='relative rounded-2xl overflow-hidden shadow-lg'
                style={{ backgroundColor: hex, minHeight: 160 }}
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <p
                    className={`text-3xl font-black tracking-wider ${isLight ? "text-black/50" : "text-white/80"}`}
                  >
                    {hex}
                  </p>
                </div>
                <input
                  type='color'
                  value={hex}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setHex(e.target.value.toUpperCase());
                    setHexInput(e.target.value.toUpperCase());
                  }}
                  className='absolute bottom-3 right-3 w-10 h-10 rounded-lg border-2 border-white/50 cursor-pointer shadow-md'
                  title='Pick a color'
                />
              </div>

              {/* HEX input */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  HEX
                </label>
                <div className='flex gap-2'>
                  <input
                    value={hexInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setHexInput(e.target.value)
                    }
                    onBlur={() => applyHex(hexInput)}
                    onKeyDown={(e) => e.key === "Enter" && applyHex(hexInput)}
                    placeholder='#6366F1'
                    maxLength={7}
                    className='flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 font-mono text-gray-800 focus:ring-2 focus:ring-pink-400 focus:border-transparent uppercase'
                  />
                  <button
                    onClick={() => copy(hex, "hex-btn")}
                    className='px-4 py-3 bg-pink-50 border-2 border-pink-200 rounded-lg text-pink-600 hover:bg-pink-100 transition-colors text-sm font-semibold'
                  >
                    {copied === "hex-btn" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div>
                <p className='text-sm font-semibold text-gray-700 mb-2'>
                  Quick presets
                </p>
                <div className='grid grid-cols-6 gap-2'>
                  {PRESETS.map(({ name, hex: ph }) => (
                    <button
                      key={name}
                      onClick={() => {
                        setHex(ph);
                        setHexInput(ph);
                      }}
                      title={name}
                      className='w-full aspect-square rounded-xl border-2 border-white shadow-sm hover:scale-110 transition-transform'
                      style={{ backgroundColor: ph }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right — format outputs */}
            <div className='space-y-4'>
              {/* RGB */}
              <div className='bg-red-50 border border-red-100 rounded-2xl p-5'>
                <div className='flex items-center justify-between mb-3'>
                  <p className='text-sm font-bold text-red-700 uppercase tracking-widest'>
                    RGB
                  </p>
                  <CopyBtn
                    value={rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : ""}
                    label='rgb'
                  />
                </div>
                {rgb && (
                  <>
                    <p className='font-mono text-lg font-bold text-gray-800 mb-3'>
                      rgb({rgb.r}, {rgb.g}, {rgb.b})
                    </p>
                    <div className='grid grid-cols-3 gap-2'>
                      {[
                        { label: "R", value: rgb.r, color: "bg-red-200" },
                        { label: "G", value: rgb.g, color: "bg-green-200" },
                        { label: "B", value: rgb.b, color: "bg-blue-200" },
                      ].map(({ label, value, color }) => (
                        <div
                          key={label}
                          className={`${color} rounded-xl p-2 text-center`}
                        >
                          <p className='text-xs font-bold text-gray-500'>
                            {label}
                          </p>
                          <p className='text-xl font-black text-gray-800'>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* HSL */}
              <div className='bg-purple-50 border border-purple-100 rounded-2xl p-5'>
                <div className='flex items-center justify-between mb-3'>
                  <p className='text-sm font-bold text-purple-700 uppercase tracking-widest'>
                    HSL
                  </p>
                  <CopyBtn
                    value={hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : ""}
                    label='hsl'
                  />
                </div>
                {hsl && (
                  <>
                    <p className='font-mono text-lg font-bold text-gray-800 mb-3'>
                      hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </p>
                    <div className='grid grid-cols-3 gap-2'>
                      {[
                        { label: "H°", value: hsl.h },
                        { label: "S%", value: hsl.s },
                        { label: "L%", value: hsl.l },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className='bg-purple-100 rounded-xl p-2 text-center'
                        >
                          <p className='text-xs font-bold text-gray-500'>
                            {label}
                          </p>
                          <p className='text-xl font-black text-gray-800'>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* HSB */}
              <div className='bg-pink-50 border border-pink-100 rounded-2xl p-5'>
                <div className='flex items-center justify-between mb-3'>
                  <p className='text-sm font-bold text-pink-700 uppercase tracking-widest'>
                    HSB / HSV
                  </p>
                  <CopyBtn
                    value={hsb ? `hsb(${hsb.h}, ${hsb.s}%, ${hsb.v}%)` : ""}
                    label='hsb'
                  />
                </div>
                {hsb && (
                  <>
                    <p className='font-mono text-lg font-bold text-gray-800 mb-3'>
                      hsb({hsb.h}, {hsb.s}%, {hsb.v}%)
                    </p>
                    <div className='grid grid-cols-3 gap-2'>
                      {[
                        { label: "H°", value: hsb.h },
                        { label: "S%", value: hsb.s },
                        { label: "B%", value: hsb.v },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className='bg-pink-100 rounded-xl p-2 text-center'
                        >
                          <p className='text-xs font-bold text-gray-500'>
                            {label}
                          </p>
                          <p className='text-xl font-black text-gray-800'>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* CSS snippet */}
              {rgb && hsl && (
                <div className='bg-gray-900 rounded-2xl p-4 text-sm font-mono'>
                  <p className='text-gray-400 text-xs mb-2'>
                    /* CSS snippet */
                  </p>
                  <p className='text-green-400'>
                    color: <span className='text-yellow-300'>{hex}</span>;
                  </p>
                  <p className='text-green-400'>
                    color:{" "}
                    <span className='text-yellow-300'>
                      rgb({rgb.r}, {rgb.g}, {rgb.b})
                    </span>
                    ;
                  </p>
                  <p className='text-green-400'>
                    color:{" "}
                    <span className='text-yellow-300'>
                      hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </span>
                    ;
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setHex("#6366F1");
              setHexInput("#6366F1");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>

          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Color format tips:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                HEX is the most common format in HTML/CSS — always 6 hex digits
                after the #
              </li>
              <li>
                RGB (0–255 each) is used in CSS, image editors, and most design
                software
              </li>
              <li>
                HSL (Hue 0–360°, Saturation 0–100%, Lightness 0–100%) is
                intuitive for tweaking colors in CSS
              </li>
              <li>
                HSB/HSV is the format used in Photoshop, Figma, Illustrator, and
                most design app color pickers
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
