"use client";
// src/app/tools/color-palette-generator/PageEditorial.tsx
//
// Drop this component directly into your page.tsx inside <SidebarAdLayout tool={tool}>
// after the ad units, replacing the existing editorial section.
//
// Requires: qrcode (npm i qrcode @types/qrcode)
// All other deps are React + Tailwind — no extra installs.

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

const TOOL_URL ="https://www.utilvia.com/tools/color-palette-generator";
const TOOL_NAME = "Color Palette Generator";

// ─── QR Modal ────────────────────────────────────────────────────────────────

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e1b4b", light: "#faf5ff" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          aria-label="Close QR code modal"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 mb-4 shadow-lg">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-white"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="3" height="3" rx="0.5" />
            <rect x="18" y="14" width="3" height="3" rx="0.5" />
            <rect x="14" y="18" width="3" height="3" rx="0.5" />
            <rect x="18" y="18" width="3" height="3" rx="0.5" />
          </svg>
        </div>

        <h3 className="text-lg font-black text-gray-900 mb-1">
          Take it with you
        </h3>
        <p className="text-sm text-gray-400 mb-5 leading-relaxed">
          Scan with your phone camera to open the {TOOL_NAME} on mobile
        </p>

        {/* QR canvas */}
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-purple-100 shadow-inner mb-5">
          <canvas ref={canvasRef} />
        </div>

        <p className="text-xs text-gray-300 font-mono break-all">{TOOL_URL}</p>
      </div>
    </div>
  );
}

// ─── Share Bar ────────────────────────────────────────────────────────────────

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = encodeURIComponent(
    `Extract beautiful color palettes from any image — free, instant, no signup`,
  );
  const shareUrl = encodeURIComponent(TOOL_URL);

  const copyLink = () => {
    navigator.clipboard.writeText(TOOL_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SHARES = [
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      bg: "bg-black hover:bg-gray-800",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`,
      bg: "bg-[#E60023] hover:bg-[#b5001b]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left */}
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">
              Found this useful?
            </p>
            <p className="text-xs text-gray-400">
              Share the tool or take it with you on mobile
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${label}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                {icon}
                {label}
              </a>
            ))}

            {/* Copy link */}
            <button
              onClick={copyLink}
              aria-label="Copy link to clipboard"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all"
            >
              {copied ? (
                <>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy link
                </>
              )}
            </button>

            {/* QR code — desktop only */}
            <button
              onClick={() => setQrOpen(true)}
              aria-label="Open QR code to scan on mobile"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                  clipRule="evenodd"
                />
                <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
              </svg>
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main editorial export ────────────────────────────────────────────────────

export default function PageEditorial() {
  return (
    <>
      {/* ── Ad: below tool ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-center">
        <div className="hidden sm:block">
          <AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className="block sm:hidden">
          <AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>

      {/* ── Ad: leaderboard ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 mt-4 flex justify-center">
        <AdSlot
          variant="leaderboard"
          slotId={SLOT_LEADERBOARD}
          className="hidden sm:flex"
        />
        <AdSlot
          variant="mediumrectangle"
          slotId={SLOT_LEADERBOARD}
          className="flex sm:hidden"
        />
      </div>

      {/* ── Share bar ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ShareBar />
      </div>

      {/* ── How to use ──────────────────────────────────────────────────── */}
      <section
        id="how-to-use"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        aria-labelledby="how-to-use-heading"
      >
        <h2
          id="how-to-use-heading"
          className="text-4xl font-bold text-gray-900 mb-4 text-center"
        >
          How to Use the Color Palette Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Extract the dominant colors from any image in seconds — or generate a
          random palette for inspiration — then copy every value or export
          straight to CSS.
        </p>

        {/* Steps */}
        <div className="space-y-6 mb-14">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Upload an image or generate a random palette
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Click <strong>Upload Image</strong> to select any photo,
                illustration, logo, or screenshot from your device. The tool
                accepts all common image formats — JPG, PNG, WebP, GIF, SVG.
                Processing starts automatically the moment the image loads.
              </p>
              <p className="text-gray-600 leading-relaxed mb-3">
                Don't have an image handy? Click <strong>Random Palette</strong>{" "}
                to generate a set of random colours instantly — useful for
                design exploration and finding unexpected combinations.
              </p>
              <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                <strong>Best source images for extraction:</strong> Photos with
                clear, distinct regions produce the most useful palettes — a
                landscape with sky, foliage, and earth; a product photo on a
                contrasting background; a painting with deliberate colour zones.
                Images with heavy gradients may return colours that feel very
                similar to each other.
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Adjust the colour count
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The <strong>Colors</strong> slider (range: 3–10) controls how
                many distinct colours are extracted. Dragging it while an image
                is loaded re-runs the extraction immediately with the new count.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    range: "3–4 colours",
                    use: "Minimal brand palettes, logo design, monochromatic compositions. Forces extraction of only the most dominant hues.",
                  },
                  {
                    range: "5–6 colours",
                    use: "The most versatile range for UI design, presentations, and general creative work. Enough variety without noise.",
                  },
                  {
                    range: "7–10 colours",
                    use: "Detailed illustration reference, interior design mood boards, or when you need to capture subtle accent colours from a complex image.",
                  },
                ].map(({ range, use }) => (
                  <div
                    key={range}
                    className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-3"
                  >
                    <p className="text-xs font-bold text-pink-700 mb-1">
                      {range}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {use}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Read each colour's values
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Each colour card shows three representations of the same colour.
                All three are interchangeable — they describe exactly the same
                hue, just in the format your tool expects:
              </p>
              <div className="space-y-2 mb-4">
                {[
                  {
                    format: "HEX",
                    example: "#a855f7",
                    use: "CSS, HTML, design tools (Figma, Sketch, Canva, Photoshop). The universal format — paste it anywhere a colour field accepts text.",
                  },
                  {
                    format: "RGB",
                    example: "168, 85, 247",
                    use: "CSS rgb() and rgba() functions. Use when you need to control opacity (e.g. rgba(168, 85, 247, 0.5)) or when working in a colour pipeline that uses 0–255 values.",
                  },
                  {
                    format: "HSL",
                    example: "280°, 91%, 65%",
                    use: "CSS hsl() functions and design systems. HSL is human-readable — hue (0–360°), saturation (0–100%), lightness (0–100%) — making it easy to create tints and shades by adjusting lightness alone.",
                  },
                ].map(({ format, example, use }) => (
                  <div
                    key={format}
                    className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <code className="text-xs font-bold bg-pink-100 text-pink-700 px-2 py-1 rounded flex-shrink-0 mt-0.5">
                      {format}
                    </code>
                    <div>
                      <code className="text-gray-400 text-xs block mb-0.5">
                        {example}
                      </code>
                      <p className="text-gray-600 leading-relaxed">{use}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Click the HEX value text or the colour swatch itself to copy the
                HEX code to your clipboard instantly. The swatch shows a
                "Copied!" overlay for 2 seconds to confirm.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Use the colour strip for harmony checking
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                The <strong>Colour Strip</strong> below the cards shows all
                extracted colours side-by-side as equal-width segments. This is
                the fastest way to judge whether the palette works as a set —
                whether the tones are harmonious, whether there's enough
                contrast between adjacent colours, and whether any colour feels
                out of place.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Clicking any segment in the strip copies that colour's HEX code,
                the same as clicking a card swatch.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
              5
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Export as CSS variables
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click <strong>Export CSS</strong> to download a{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm text-pink-700">
                  palette.css
                </code>{" "}
                file containing all extracted colours as CSS custom properties,
                ready to import into any project:
              </p>
              <div className="bg-gray-900 rounded-xl px-5 py-4 mb-3">
                <pre className="text-sm text-green-400 leading-relaxed">
                  {`:root {
  --color-1: #a855f7;
  --color-2: #ec4899;
  --color-3: #f97316;
  --color-4: #14b8a6;
  --color-5: #1e1b4b;
}`}
                </pre>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Reference the variables anywhere in your stylesheet with{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">
                  var(--color-1)
                </code>
                . Rename the variables to semantic names (e.g.{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">
                  --color-primary
                </code>
                ,{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">
                  --color-accent
                </code>
                ) after downloading.
              </p>
            </div>
          </div>
        </div>

        {/* ── How the extraction works ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How the colour extraction works
          </h3>
          <p className="text-gray-600 leading-relaxed mb-5 text-sm">
            The tool uses the HTML5 Canvas API to process your image entirely in
            the browser — nothing is uploaded to a server. Here's the three-step
            process:
          </p>
          <div className="space-y-4">
            {[
              {
                n: "1",
                title: "Downsample",
                body: "The image is drawn onto a hidden canvas scaled down to a maximum of 200×200 pixels. This dramatically reduces the number of pixels to process while preserving colour distribution.",
              },
              {
                n: "2",
                title: "Quantise and count",
                body: "Every 10th pixel is sampled (skipping transparent pixels). Each pixel's RGB values are rounded to the nearest 10 to group similar shades together, then counted. The result is a frequency map of the image's colour space.",
              },
              {
                n: "3",
                title: "Deduplicate by distance",
                body: "The most frequent colours are sorted and filtered. Any candidate colour that's within a perceptual distance of 60 RGB units from an already-selected colour is skipped — this prevents the palette from being filled with near-identical shades of the same hue.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex items-start gap-4 text-sm">
                <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {n}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 mb-0.5">{title}</p>
                  <p className="text-gray-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Use cases ── */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          What designers use it for
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "🎨",
              title: "Brand colour extraction",
              desc: "Upload a brand photo or hero image to extract a colour palette that's guaranteed to feel native to the brand's visual world — no guessing at hex codes.",
            },
            {
              emoji: "🖼️",
              title: "Artwork-matched UI themes",
              desc: "Extract colours from an album cover, film still, or illustration to build a UI theme that feels designed alongside the creative work.",
            },
            {
              emoji: "🛍️",
              title: "E-commerce product pages",
              desc: "Pull the palette from a product photo to use as the page's background, border, and accent colours — creating a cohesive look that makes the product feel intentional.",
            },
            {
              emoji: "📊",
              title: "Data visualisation",
              desc: "Generate a palette from a relevant image and use it as your chart colour set — more characterful than the defaults in Chart.js or D3.",
            },
            {
              emoji: "📱",
              title: "App UI design",
              desc: "Start from a hero photograph and use the extracted palette as the foundation for button, card, and background colours — grounding the UI in the visual content.",
            },
            {
              emoji: "🎭",
              title: "Mood board building",
              desc: "Pull palettes from several reference images and compare the colour strips to find the common emotional thread running through your inspiration.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── Privacy note ── */}
        <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            Your images never leave your device
          </h3>
          <p className="text-pink-100 leading-relaxed max-w-xl mx-auto text-sm">
            All processing happens on the HTML5 Canvas API in your browser. No
            image is uploaded, transmitted, or stored anywhere. Safe to use with
            private, confidential, or commercially sensitive visuals.
          </p>
        </div>

        {/* ── Related tools ── */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Design Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/image-compressor",
                label: "Image Compressor",
                desc: "Reduce image file size without visible quality loss — JPG, PNG, and WebP.",
              },
              {
                href: "/tools/background-remover",
                label: "Background Remover",
                desc: "Remove image backgrounds instantly and export as a transparent PNG.",
              },
              {
                href: "/tools/aspect-ratio-calculator",
                label: "Aspect Ratio Calculator",
                desc: "Calculate and convert image dimensions while maintaining the correct aspect ratio.",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-pink-200 hover:-translate-y-1 transition-all duration-200 p-5"
                aria-label={`${link.label} — ${link.desc}`}
              >
                <div className="font-bold text-gray-900 text-sm mb-1">
                  {link.label}
                </div>
                <div className="text-xs text-gray-500">{link.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
