"use client";
import React, { useState } from "react";
import { Upload, Download, ImageIcon, Code, Package } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FaviconSize {
  size: number;
  name: string;
  desc: string;
}

interface GeneratedFavicon extends FaviconSize {
  dataUrl: string;
}

type CopiedCode = "html" | "manifest" | "";

// ─── Constants ───────────────────────────────────────────────────────────────

const SIZES: FaviconSize[] = [
  { size: 16, name: "favicon-16x16.png", desc: "Browser tabs" },
  { size: 32, name: "favicon-32x32.png", desc: "Taskbar shortcut" },
  { size: 48, name: "favicon-48x48.png", desc: "Windows site icons" },
  { size: 64, name: "favicon-64x64.png", desc: "Windows site icons" },
  { size: 128, name: "favicon-128x128.png", desc: "Chrome Web Store" },
  { size: 180, name: "apple-touch-icon.png", desc: "Apple touch icon" },
  { size: 192, name: "android-chrome-192x192.png", desc: "Android Chrome" },
  { size: 512, name: "android-chrome-512x512.png", desc: "Android Chrome" },
];

const HTML_CODE = `<!-- Favicon links for your HTML <head> -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function triggerDownload(href: string, filename: string): void {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.click();
}

function renderToCanvas(img: HTMLImageElement, size: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, size, size);

  const scale = Math.min(size / img.width, size / img.height);
  const x = (size - img.width * scale) / 2;
  const y = (size - img.height * scale) / 2;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

  return canvas.toDataURL("image/png");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FaviconGeneratorClient() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [favicons, setFavicons] = useState<GeneratedFavicon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<CopiedCode>("");

  const generateFavicons = (img: HTMLImageElement): void => {
    const generated: GeneratedFavicon[] = SIZES.map((s) => ({
      ...s,
      dataUrl: renderToCanvas(img, s.size),
    }));
    setFavicons(generated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name.split(".")[0] ?? file.name);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result;
      if (typeof src !== "string") {
        setLoading(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        setImage(img);
        generateFavicons(img);
        setLoading(false);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const downloadFavicon = (favicon: GeneratedFavicon): void => {
    triggerDownload(favicon.dataUrl, favicon.name);
  };

  const downloadAll = (): void => {
    favicons.forEach((favicon, index) => {
      setTimeout(() => downloadFavicon(favicon), index * 200);
    });
  };

  const generateICO = (): void => {
    const favicon32 = favicons.find((f) => f.size === 32);
    if (favicon32) triggerDownload(favicon32.dataUrl, "favicon.ico");
  };

  const copyCode = (code: string, type: CopiedCode): void => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const manifestCode = `{
  "name": "${imageName || "Your App"}",
  "short_name": "${imageName || "App"}",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4 shadow-lg'>
              <ImageIcon className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Favicon Generator
            </h2>
            <p className='text-gray-500'>
              Create favicons from images in multiple sizes
            </p>
          </div>

          {!image ? (
            /* ── Upload prompt ── */
            <div className='border-4 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-orange-400 transition-colors'>
              <label className='cursor-pointer'>
                <Upload className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                <div className='text-lg font-semibold text-gray-700 mb-2'>
                  Upload Your Logo or Image
                </div>
                <div className='text-sm text-gray-500 mb-4'>
                  Best results with square images (PNG recommended)
                </div>
                <div className='inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors'>
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
            /* ── Results ── */
            <div className='space-y-6'>
              <div className='bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between'>
                <div className='font-semibold text-gray-900'>
                  Source Image: {imageName}
                </div>
                <label className='px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors cursor-pointer'>
                  Change Image
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />
                </label>
              </div>

              {loading ? (
                <div className='text-center py-12'>
                  <div className='inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin' />
                  <div className='mt-4 text-gray-600'>Generating favicons…</div>
                </div>
              ) : (
                <>
                  {/* Favicon grid */}
                  <div className='bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200'>
                    <div className='flex items-center justify-between mb-4'>
                      <h3 className='font-semibold text-gray-900'>
                        Generated Favicons ({favicons.length})
                      </h3>
                      <div className='flex gap-2'>
                        <button
                          onClick={generateICO}
                          className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2'
                        >
                          <Download className='w-4 h-4' />
                          favicon.ico
                        </button>
                        <button
                          onClick={downloadAll}
                          className='px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2'
                        >
                          <Package className='w-4 h-4' />
                          Download All
                        </button>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      {favicons.map((favicon) => (
                        <div
                          key={favicon.size}
                          className='bg-white rounded-lg p-4 border border-gray-200'
                        >
                          <div className='flex items-center justify-center mb-3 bg-gray-50 rounded p-4'>
                            <img
                              src={favicon.dataUrl}
                              alt={`${favicon.size}×${favicon.size} favicon`}
                              style={{
                                width: Math.min(favicon.size, 128),
                                height: Math.min(favicon.size, 128),
                              }}
                            />
                          </div>
                          <div className='text-center mb-2'>
                            <div className='font-semibold text-gray-900'>
                              {favicon.size}×{favicon.size}
                            </div>
                            <div className='text-xs text-gray-600'>
                              {favicon.desc}
                            </div>
                          </div>
                          <button
                            onClick={() => downloadFavicon(favicon)}
                            className='w-full px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-lg font-medium transition-colors'
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HTML code */}
                  <CodeBlock
                    title='HTML Code'
                    code={HTML_CODE}
                    id='html'
                    copied={copiedCode === "html"}
                    onCopy={() => copyCode(HTML_CODE, "html")}
                  />

                  {/* Manifest */}
                  <CodeBlock
                    title='site.webmanifest'
                    code={manifestCode}
                    id='manifest'
                    copied={copiedCode === "manifest"}
                    onCopy={() => copyCode(manifestCode, "manifest")}
                  />
                </>
              )}
            </div>
          )}

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips for best results:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Use a square image (1:1 aspect ratio) for optimal results</li>
              <li>PNG format with transparent background works best</li>
              <li>Minimum recommended size: 512×512 pixels</li>
              <li>Simple, bold designs work better at smaller sizes</li>
              <li>
                Test favicons at 16×16 to ensure they&apos;re recognizable
              </li>
              <li>Place favicon files in your website&apos;s root directory</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CodeBlockProps {
  title: string;
  code: string;
  id: string;
  copied: boolean;
  onCopy: () => void;
}

function CodeBlock({ title, code, copied, onCopy }: CodeBlockProps) {
  return (
    <div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
      <div className='flex items-center gap-2 mb-4'>
        <Code className='w-5 h-5 text-gray-600' />
        <h3 className='font-semibold text-gray-900'>{title}</h3>
      </div>
      <div className='bg-gray-900 rounded-lg p-4 relative'>
        <button
          onClick={onCopy}
          className='absolute top-2 right-2 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded font-medium transition-colors'
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre className='text-sm text-green-400 overflow-x-auto'>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
