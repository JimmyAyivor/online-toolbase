"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  PenTool,
  Download,
  Trash2,
  Type,
  Palette,
  Sliders,
  Copy,
  Check,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface PresetStyle {
  name: string;
  font: string;
  size: number;
  color: string;
  italic: boolean;
}

interface Tip {
  color: string;
  label: string;
  desc: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FONTS: readonly string[] = [
  "Dancing Script",
  "Pacifico",
  "Great Vibes",
  "Allura",
  "Alex Brush",
  "Sacramento",
  "Tangerine",
  "Satisfy",
  "Kaushan Script",
  "Cookie",
  "Caveat",
  "Permanent Marker",
];

const PRESET_STYLES: PresetStyle[] = [
  {
    name: "Classic",
    font: "Dancing Script",
    size: 64,
    color: "#000000",
    italic: false,
  },
  {
    name: "Elegant",
    font: "Great Vibes",
    size: 72,
    color: "#1a1a1a",
    italic: false,
  },
  { name: "Modern", font: "Caveat", size: 60, color: "#2563eb", italic: false },
  {
    name: "Bold",
    font: "Permanent Marker",
    size: 56,
    color: "#dc2626",
    italic: false,
  },
  {
    name: "Sophisticated",
    font: "Allura",
    size: 70,
    color: "#7c3aed",
    italic: true,
  },
  {
    name: "Professional",
    font: "Satisfy",
    size: 58,
    color: "#059669",
    italic: false,
  },
];

const TIPS: Tip[] = [
  {
    color: "bg-rose-600",
    label: "Email Signatures",
    desc: "Download and insert into email clients",
  },
  {
    color: "bg-pink-600",
    label: "Documents",
    desc: "Use in PDFs, contracts, and forms",
  },
  {
    color: "bg-purple-600",
    label: "Digital Art",
    desc: "Add personal touch to designs",
  },
  {
    color: "bg-fuchsia-600",
    label: "Professional",
    desc: "Create consistent branding",
  },
];

const PERFECT_FOR = [
  "Email signatures",
  "Digital documents",
  "PDF contracts",
  "Business correspondence",
  "Personal branding",
  "Social media graphics",
];

const CANVAS_W = 800;
const CANVAS_H = 300;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function drawSignatureToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  fontFamily: string,
  fontSize: number,
  color: string,
  strokeWidth: number,
  italic: boolean,
  underline: boolean,
  showBackground: boolean,
  backgroundColor: string,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  if (showBackground) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }

  if (!text) return;

  ctx.font = `${italic ? "italic " : ""}${fontSize}px "${fontFamily}", cursive`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const x = CANVAS_W / 2;
  const y = CANVAS_H / 2;
  ctx.fillText(text, x, y);

  if (underline) {
    const metrics = ctx.measureText(text);
    const lineY = y + fontSize / 3;
    ctx.beginPath();
    ctx.moveTo(x - metrics.width / 2, lineY);
    ctx.lineTo(x + metrics.width / 2, lineY);
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SignatureGeneratorClient() {
  const [signatureText, setSignatureText] = useState<string>("");
  const [fontFamily, setFontFamily] = useState<string>("Dancing Script");
  const [fontSize, setFontSize] = useState<number>(64);
  const [color, setColor] = useState<string>("#000000");
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFFFFF");
  const [showBackground, setShowBackground] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const redraw = useCallback((): void => {
    if (!canvasRef.current) return;
    drawSignatureToCanvas(
      canvasRef.current,
      signatureText,
      fontFamily,
      fontSize,
      color,
      strokeWidth,
      italic,
      underline,
      showBackground,
      backgroundColor,
    );
  }, [
    signatureText,
    fontFamily,
    fontSize,
    color,
    strokeWidth,
    italic,
    underline,
    showBackground,
    backgroundColor,
  ]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const handleDownload = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "signature.png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyImage = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard
        .write([item])
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(console.error);
    });
  };

  const applyPreset = (p: PresetStyle): void => {
    setFontFamily(p.font);
    setFontSize(p.size);
    setColor(p.color);
    setItalic(p.italic);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-600 to-pink-600 rounded-2xl mb-4 shadow-lg'>
            <PenTool className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Signature Generator
          </h2>
          <p className='text-gray-600'>
            Create beautiful digital signatures for documents and emails
          </p>
        </div>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* ── Main panel ── */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Canvas card */}
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <h3 className='font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl'>
                <Type className='w-6 h-6 text-rose-600' />
                Your Signature
              </h3>

              <div className='mb-6'>
                <label className='block text-sm font-bold text-gray-700 mb-3'>
                  Enter Your Name
                </label>
                <input
                  type='text'
                  value={signatureText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSignatureText(e.target.value)
                  }
                  placeholder='John Smith'
                  maxLength={30}
                  className='w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 transition-colors text-lg'
                />
              </div>

              <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 flex items-center justify-center min-h-[300px] border-2 border-gray-200'>
                <canvas ref={canvasRef} className='max-w-full h-auto' />
              </div>

              <div className='flex flex-wrap gap-3 mt-6'>
                <button
                  onClick={handleDownload}
                  disabled={!signatureText}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    signatureText
                      ? "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Download className='w-5 h-5' />
                  Download PNG
                </button>
                <button
                  onClick={handleCopyImage}
                  disabled={!signatureText}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    signatureText
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {copied ? (
                    <Check className='w-5 h-5' />
                  ) : (
                    <Copy className='w-5 h-5' />
                  )}
                  {copied ? "Copied!" : "Copy Image"}
                </button>
                <button
                  onClick={() => setSignatureText("")}
                  disabled={!signatureText}
                  aria-label='Clear signature'
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    signatureText
                      ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Trash2 className='w-5 h-5' />
                </button>
              </div>
            </div>

            {/* Presets */}
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <h3 className='font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl'>
                <Palette className='w-6 h-6 text-rose-600' />
                Preset Styles
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {PRESET_STYLES.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className='p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-rose-50 hover:to-pink-50 rounded-xl border-2 border-gray-200 hover:border-rose-300 transition-all text-center'
                  >
                    <div className='font-bold text-gray-900 mb-1'>
                      {preset.name}
                    </div>
                    <div
                      className='text-2xl mt-2'
                      style={{
                        fontFamily: `"${preset.font}", cursive`,
                        color: preset.color,
                        fontStyle: preset.italic ? "italic" : "normal",
                      }}
                    >
                      Abc
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className='space-y-6'>
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-8'>
              <h3 className='font-bold text-gray-900 mb-6 flex items-center gap-2'>
                <Sliders className='w-5 h-5 text-rose-600' />
                Customize
              </h3>

              <div className='space-y-6'>
                {/* Font */}
                <div>
                  <label className='block text-sm font-bold text-gray-700 mb-3'>
                    Font Style
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFontFamily(e.target.value)
                    }
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 transition-colors'
                  >
                    {FONTS.map((font) => (
                      <option
                        key={font}
                        value={font}
                        style={{ fontFamily: `"${font}", cursive` }}
                      >
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font size */}
                <div>
                  <label className='block text-sm font-bold text-gray-700 mb-3'>
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type='range'
                    min={32}
                    max={100}
                    value={fontSize}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFontSize(parseInt(e.target.value))
                    }
                    aria-label='Font size'
                    className='w-full h-3 bg-gradient-to-r from-rose-200 to-pink-300 rounded-lg appearance-none cursor-pointer'
                  />
                </div>

                {/* Text color */}
                <div>
                  <label className='block text-sm font-bold text-gray-700 mb-3'>
                    Text Color
                  </label>
                  <div className='flex gap-3'>
                    <input
                      type='color'
                      value={color}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setColor(e.target.value)
                      }
                      className='w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300'
                    />
                    <input
                      type='text'
                      value={color}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setColor(e.target.value)
                      }
                      className='flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-rose-500'
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className='space-y-3'>
                  {[
                    { label: "Italic Style", checked: italic, set: setItalic },
                    {
                      label: "Add Underline",
                      checked: underline,
                      set: setUnderline,
                    },
                  ].map(({ label, checked, set }) => (
                    <label
                      key={label}
                      className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors'
                    >
                      <input
                        type='checkbox'
                        checked={checked}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          set(e.target.checked)
                        }
                        className='w-5 h-5 text-rose-600 rounded'
                      />
                      <span className='font-medium text-gray-900'>{label}</span>
                    </label>
                  ))}
                </div>

                {/* Stroke width */}
                {underline && (
                  <div>
                    <label className='block text-sm font-bold text-gray-700 mb-3'>
                      Line Thickness: {strokeWidth}px
                    </label>
                    <input
                      type='range'
                      min={1}
                      max={6}
                      value={strokeWidth}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setStrokeWidth(parseInt(e.target.value))
                      }
                      aria-label='Line thickness'
                      className='w-full h-3 bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg appearance-none cursor-pointer'
                    />
                  </div>
                )}

                {/* Background */}
                <div>
                  <label className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors mb-3'>
                    <input
                      type='checkbox'
                      checked={showBackground}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setShowBackground(e.target.checked)
                      }
                      className='w-5 h-5 text-rose-600 rounded'
                    />
                    <span className='font-medium text-gray-900'>
                      Show Background
                    </span>
                  </label>

                  {showBackground && (
                    <div>
                      <label className='block text-sm font-bold text-gray-700 mb-3'>
                        Background Color
                      </label>
                      <div className='flex gap-3'>
                        <input
                          type='color'
                          value={backgroundColor}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setBackgroundColor(e.target.value)
                          }
                          className='w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300'
                        />
                        <input
                          type='text'
                          value={backgroundColor}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setBackgroundColor(e.target.value)
                          }
                          className='flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-rose-500'
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className='bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl shadow-md p-6 border-2 border-rose-200'>
              <h4 className='font-bold text-gray-900 mb-4'>✨ Usage Tips</h4>
              <div className='space-y-3 text-sm text-gray-700'>
                {TIPS.map(({ color: c, label, desc }) => (
                  <div key={label} className='flex items-start gap-2'>
                    <div
                      className={`w-2 h-2 ${c} rounded-full mt-2 flex-shrink-0`}
                    />
                    <p>
                      <strong>{label}:</strong> {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Perfect for */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h4 className='font-bold text-gray-900 mb-3'>🎯 Perfect For</h4>
              <div className='space-y-2 text-sm text-gray-700'>
                {PERFECT_FOR.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <link
          href='https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Pacifico&family=Great+Vibes&family=Allura&family=Alex+Brush&family=Sacramento&family=Tangerine:wght@700&family=Satisfy&family=Kaushan+Script&family=Cookie&family=Caveat:wght@700&family=Permanent+Marker&display=swap'
          rel='stylesheet'
        />
      </div>
    </div>
  );
}
