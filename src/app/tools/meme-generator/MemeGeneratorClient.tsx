"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Image as ImageIcon,
  Upload,
  Download,
  Type,
  Trash2,
  Smile,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TextAlign = "left" | "center" | "right";

interface MemeTemplate {
  name: string;
  url: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const POPULAR_MEMES: MemeTemplate[] = [
  { name: "Distracted Boyfriend", url: "https://i.imgflip.com/1ur9b0.jpg" },
  { name: "Drake Hotline", url: "https://i.imgflip.com/30b1gx.jpg" },
  { name: "Two Buttons", url: "https://i.imgflip.com/1g8my4.jpg" },
  { name: "Change My Mind", url: "https://i.imgflip.com/24y43o.jpg" },
  { name: "Epic Handshake", url: "https://i.imgflip.com/28j0te.jpg" },
  { name: "Exit 12", url: "https://i.imgflip.com/1wz1my.jpg" },
];

const FONTS: string[] = [
  "Impact",
  "Arial",
  "Comic Sans MS",
  "Times New Roman",
  "Courier New",
  "Georgia",
];

const ALIGN_BUTTONS: Array<{
  value: TextAlign;
  icon: React.ReactNode;
  label: string;
}> = [
  {
    value: "left",
    icon: <AlignLeft className='w-5 h-5 mx-auto' />,
    label: "Align left",
  },
  {
    value: "center",
    icon: <AlignCenter className='w-5 h-5 mx-auto' />,
    label: "Align center",
  },
  {
    value: "right",
    icon: <AlignRight className='w-5 h-5 mx-auto' />,
    label: "Align right",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = words[0] ?? "";

  for (let i = 1; i < words.length; i++) {
    const word = words[i] ?? "";
    const width = ctx.measureText(`${current} ${word}`).width;
    if (width < maxWidth) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  lines.push(current);
  return lines;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MemeGeneratorClient() {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState<string>("");
  const [bottomText, setBottomText] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(48);
  const [textColor, setTextColor] = useState<string>("#FFFFFF");
  const [strokeColor, setStrokeColor] = useState<string>("#000000");
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [textAlign, setTextAlign] = useState<TextAlign>("center");
  const [fontFamily, setFontFamily] = useState<string>("Impact");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // allow cross-origin template URLs
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.textAlign = textAlign;
      ctx.textBaseline = "top";

      const x =
        textAlign === "center"
          ? canvas.width / 2
          : textAlign === "left"
            ? 40
            : canvas.width - 40;

      if (topText) {
        const lines = wrapText(ctx, topText.toUpperCase(), canvas.width - 80);
        lines.forEach((line, i) => {
          const y = 40 + i * fontSize * 1.2;
          ctx.strokeText(line, x, y);
          ctx.fillText(line, x, y);
        });
      }

      if (bottomText) {
        const lines = wrapText(
          ctx,
          bottomText.toUpperCase(),
          canvas.width - 80,
        );
        const startY = canvas.height - 40 - lines.length * fontSize * 1.2;
        lines.forEach((line, i) => {
          const y = startY + i * fontSize * 1.2;
          ctx.strokeText(line, x, y);
          ctx.fillText(line, x, y);
        });
      }
    };
    img.src = image;
  }, [
    image,
    topText,
    bottomText,
    fontSize,
    textColor,
    strokeColor,
    strokeWidth,
    textAlign,
    fontFamily,
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file || !file.type.match("image.*")) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result;
      if (typeof src === "string") setImage(src);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = (): void => {
    setImage(null);
    setTopText("");
    setBottomText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-4 shadow-lg'>
            <Smile className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Meme Generator
          </h2>
          <p className='text-gray-600'>Create hilarious memes in seconds</p>
        </div>

        {!image ? (
          /* ── Upload / template picker ── */
          <div className='space-y-6'>
            <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12'>
              <div
                onClick={() => fileInputRef.current?.click()}
                className='border-4 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-300 cursor-pointer group'
              >
                <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-6 group-hover:scale-110 transition-transform'>
                  <Upload className='w-12 h-12 text-yellow-600' />
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                  Upload Your Image
                </h3>
                <p className='text-gray-600 mb-4'>
                  Click to browse or drag and drop
                </p>
                <p className='text-sm text-gray-500'>JPG, PNG, GIF supported</p>
              </div>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileSelect}
                className='hidden'
              />
            </div>

            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <h3 className='font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl'>
                <Sparkles className='w-6 h-6 text-yellow-600' />
                Popular Meme Templates
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                {POPULAR_MEMES.map((meme) => (
                  <div
                    key={meme.url}
                    onClick={() => setImage(meme.url)}
                    className='group cursor-pointer'
                  >
                    <div className='relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-yellow-500 transition-all shadow-md hover:shadow-xl'>
                      <img
                        src={meme.url}
                        alt={meme.name}
                        className='w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2'>
                        <p className='text-white text-xs font-bold'>
                          {meme.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── Editor ── */
          <div className='grid lg:grid-cols-3 gap-6'>
            {/* Canvas */}
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
                <div className='flex justify-between items-center mb-6'>
                  <h3 className='font-bold text-gray-900 flex items-center gap-2'>
                    <ImageIcon className='w-5 h-5 text-yellow-600' />
                    Your Meme
                  </h3>
                  <button
                    onClick={handleClear}
                    className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                    Clear
                  </button>
                </div>

                <div className='flex justify-center bg-gray-100 rounded-xl p-4'>
                  <canvas
                    ref={canvasRef}
                    className='max-w-full h-auto rounded-lg shadow-lg'
                  />
                </div>

                <button
                  onClick={handleDownload}
                  className='w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg transition-all'
                >
                  <Download className='w-6 h-6' />
                  Download Meme
                </button>
              </div>
            </div>

            {/* Settings */}
            <div className='space-y-6'>
              <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
                <h3 className='font-bold text-gray-900 mb-6 flex items-center gap-2'>
                  <Type className='w-5 h-5 text-yellow-600' />
                  Text Settings
                </h3>

                <div className='space-y-4'>
                  {/* Text inputs */}
                  {(
                    [
                      { label: "Top Text", value: topText, set: setTopText },
                      {
                        label: "Bottom Text",
                        value: bottomText,
                        set: setBottomText,
                      },
                    ] as const
                  ).map(({ label, value, set }) => (
                    <div key={label}>
                      <label className='block text-sm font-bold text-gray-700 mb-2'>
                        {label}
                      </label>
                      <input
                        type='text'
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          set(e.target.value)
                        }
                        placeholder={`Enter ${label.toLowerCase()}`}
                        maxLength={50}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors'
                      />
                    </div>
                  ))}

                  {/* Font size */}
                  <div>
                    <label className='block text-sm font-bold text-gray-700 mb-3'>
                      Font Size: {fontSize}px
                    </label>
                    <input
                      type='range'
                      min={20}
                      max={100}
                      value={fontSize}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFontSize(parseInt(e.target.value))
                      }
                      className='w-full h-3 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-lg appearance-none cursor-pointer'
                      aria-label='Font size'
                    />
                  </div>

                  {/* Font family */}
                  <div>
                    <label className='block text-sm font-bold text-gray-700 mb-2'>
                      Font Family
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFontFamily(e.target.value)
                      }
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors'
                    >
                      {FONTS.map((font) => (
                        <option key={font} value={font}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Text alignment */}
                  <div>
                    <label className='block text-sm font-bold text-gray-700 mb-3'>
                      Text Alignment
                    </label>
                    <div className='flex gap-2'>
                      {ALIGN_BUTTONS.map(({ value, icon, label }) => (
                        <button
                          key={value}
                          onClick={() => setTextAlign(value)}
                          aria-label={label}
                          className={`flex-1 p-3 rounded-lg transition-all ${
                            textAlign === value
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className='grid grid-cols-2 gap-4'>
                    {(
                      [
                        {
                          label: "Text Color",
                          value: textColor,
                          set: setTextColor,
                        },
                        {
                          label: "Outline Color",
                          value: strokeColor,
                          set: setStrokeColor,
                        },
                      ] as const
                    ).map(({ label, value, set }) => (
                      <div key={label}>
                        <label className='block text-sm font-bold text-gray-700 mb-2'>
                          {label}
                        </label>
                        <div className='flex gap-2'>
                          <input
                            type='color'
                            value={value}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => set(e.target.value)}
                            className='w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300'
                            aria-label={label}
                          />
                          <input
                            type='text'
                            value={value}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => set(e.target.value)}
                            className='flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500 text-sm font-mono'
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Outline width */}
                  <div>
                    <label className='block text-sm font-bold text-gray-700 mb-3'>
                      Outline Width: {strokeWidth}px
                    </label>
                    <input
                      type='range'
                      min={0}
                      max={10}
                      value={strokeWidth}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setStrokeWidth(parseInt(e.target.value))
                      }
                      className='w-full h-3 bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg appearance-none cursor-pointer'
                      aria-label='Outline width'
                    />
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-md p-6 border-2 border-yellow-200'>
                <h4 className='font-bold text-gray-900 mb-3'>💡 Pro Tips</h4>
                <div className='space-y-2 text-sm text-gray-700'>
                  <p>• Keep text short and punchy</p>
                  <p>• White text with black outline works best</p>
                  <p>• ALL CAPS is classic meme style</p>
                  <p>• Download as PNG for best quality</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
