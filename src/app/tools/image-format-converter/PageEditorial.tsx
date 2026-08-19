"use client";
// src/app/tools/image-format-converter/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/image-format-converter";
const TOOL_NAME = "Image Format Converter";

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
        color: { dark: "#1e3a5f", light: "#eff6ff" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          aria-label="Close QR code modal"
        >
          ✕
        </button>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-4 shadow-lg">
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-blue-100 shadow-inner mb-5">
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
    "Free image format converter — convert PNG, JPG, WebP, BMP and more in your browser. No upload, no signup.",
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
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ];
  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">
              Found this useful?
            </p>
            <p className="text-xs text-gray-400">
              Share the tool or scan to open it on your phone
            </p>
          </div>
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
            <button
              onClick={copyLink}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
            >
              {copied ? (
                <span className="text-teal-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is the difference between PNG, JPG, and WebP?",
    a: "PNG (Portable Network Graphics) uses lossless compression — no quality is lost when saving, and it supports transparent backgrounds. Best for logos, graphics with flat colours, text-heavy images, and anything where sharp edges and exact colour reproduction matter. JPG/JPEG (Joint Photographic Experts Group) uses lossy compression — quality is reduced slightly each time you save, but file sizes are dramatically smaller than PNG for photographic images. Best for photos and complex images where some quality loss is imperceptible. WebP is a modern format developed by Google that achieves significantly smaller file sizes than either PNG or JPG while maintaining comparable quality. WebP supports both lossless and lossy modes. Best for web use where loading speed matters. Supported in all modern browsers.",
  },
  {
    q: "When should I convert to WebP?",
    a: "Convert to WebP when your primary use case is web deployment and you want the smallest possible file size without visible quality loss. WebP typically achieves 25–35% smaller files than JPEG and 26% smaller than PNG at comparable quality. It is now supported by all major browsers including Chrome, Firefox, Safari (from 14+), and Edge. If you are preparing images for a website and your target audience uses modern browsers, WebP is the recommended format. The main limitation: WebP has less universal support in image editors and older software than PNG or JPG.",
  },
  {
    q: "Does converting between formats reduce quality?",
    a: "It depends on the formats involved. Converting from a lossless format (PNG) to another lossless format (PNG, BMP) — no quality loss. Converting from a lossless format (PNG) to a lossy format (JPG, WebP lossy) — some quality reduction, controlled by the quality slider. Converting from a lossy format (JPG) to any format — the original quality loss from the JPEG encoding is permanent; you cannot recover detail that JPEG compression discarded. Converting JPG to PNG will not degrade the image further, but it also won't recover any quality lost in the original JPEG encoding. For best results, always keep the original highest-quality source file and convert from that.",
  },
  {
    q: "What quality setting should I use for JPEG and WebP?",
    a: "Quality settings for lossy formats (JPG, WebP lossy) range from 0 (maximum compression, poorest quality) to 100 (minimum compression, best quality). Practical guidance: 85–95% quality produces results that are visually identical to the original for most photographic content at significantly smaller file sizes than 100%. 70–85% is acceptable for web images where some quality trade-off is acceptable. Below 70%, visible compression artefacts (blocky patterns, smearing around edges) become noticeable at normal viewing distances. For most web use, 85% is a good default balance between quality and file size.",
  },
  {
    q: "Will my image be uploaded to a server?",
    a: "No — all conversion processing in this tool happens entirely in your browser using the HTML5 Canvas API. When you upload an image, it is read locally by your browser's FileReader API, drawn onto a canvas element, and exported in the target format. Your image is never transmitted to any server. This makes the tool safe to use with personal photos, proprietary graphics, confidential documents, and any image you don't want stored on third-party servers.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-semibold text-gray-900 text-sm">
                {faq.q}
              </span>
              <span className="text-blue-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            <div
              className="px-5 text-sm text-gray-600 leading-relaxed overflow-hidden transition-all duration-200"
              style={{
                maxHeight: open === i ? "1000px" : "0px",
                paddingBottom: open === i ? "20px" : "0px",
                visibility: open === i ? "visible" : "hidden",
              }}
              aria-hidden={open !== i}
            >
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function PageEditorial() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-center">
        <div className="hidden sm:block">
          <AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className="block sm:hidden">
          <AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ShareBar />
      </div>

      <section
        id="how-to-use"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        aria-labelledby="how-to-use-heading"
      >
        <h2
          id="how-to-use-heading"
          className="text-4xl font-bold text-gray-900 mb-4 text-center"
        >
          How to Use the Image Format Converter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Upload any image, select the output format, adjust quality if needed,
          and download — all conversion happens in your browser with no upload
          to any server.
        </p>

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Upload your image
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click the upload area or drag your image onto it. The tool
                accepts PNG, JPG, WebP, BMP, GIF, and other common image
                formats. A preview of your original image appears with its file
                size displayed. For best results, start with the
                highest-resolution version of your image — the converted output
                will be the same dimensions as the input.
              </p>
              <div className="bg-blue-50 text-blue-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>Privacy note:</strong> Your image is processed entirely
                in your browser. Nothing is uploaded to any server. Safe to use
                with personal photos, brand assets, and confidential images.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Select the output format
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click the target format — PNG, JPG, WebP, BMP, or others
                available. For photographic images destined for the web, WebP or
                JPG are recommended for their file size efficiency. For logos,
                icons, or images requiring transparency, PNG is the correct
                choice.
              </p>
              <div className="bg-indigo-50 text-indigo-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>Format guide:</strong> PNG — lossless, transparency,
                sharp edges. JPG — lossy, smallest photos, no transparency. WebP
                — modern web format, best balance of size and quality. BMP —
                uncompressed, large files, maximum compatibility.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Adjust quality (for lossy formats)
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                For JPG and lossy WebP, a quality slider appears. 85% is a
                recommended default for most web uses. Higher values preserve
                more detail at the cost of larger files; lower values produce
                smaller files with visible compression artefacts at extreme
                settings. PNG and BMP don't have a quality setting — they're
                lossless.
              </p>
              <div className="bg-blue-50 text-blue-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>Size comparison:</strong> The tool shows your original
                file size alongside the estimated converted size — use this to
                gauge whether the quality/size trade-off is acceptable for your
                use case.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Download the converted image
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click 'Download' to save the converted file to your device. The
                file is named with the original filename and the new extension.
                You can convert the same source image to multiple formats by
                changing the format selection and downloading again — the source
                image stays in place until you clear or replace it.
              </p>
              <div className="bg-indigo-50 text-indigo-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>Batch conversions:</strong> Need the same image in
                multiple formats? Keep the source uploaded, convert to each
                target format in turn, and download each version. All
                conversions run instantly in your browser.
              </div>
            </div>
          </div>
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Common uses</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          <div
            key="Web optimisation"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">🌐</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Web optimisation
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Convert PNG or JPG images to WebP for significantly smaller web
              page assets — reduce load times without visible quality reduction.
            </p>
          </div>
          <div
            key="Transparency removal"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">🖼️</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Transparency removal
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Convert a PNG with transparency to JPG (which doesn't support
              transparency) when a solid background is acceptable and smaller
              file size is needed.
            </p>
          </div>
          <div
            key="Format compatibility"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">🔄</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Format compatibility
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Convert WebP images (which some older software and email clients
              don't support) to JPG or PNG for maximum compatibility.
            </p>
          </div>
          <div
            key="Email attachments"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">📧</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Email attachments
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Reduce image file size before attaching to email — convert PNG to
              JPG to keep attachments well within size limits.
            </p>
          </div>
          <div
            key="Storage optimisation"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">💾</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Storage optimisation
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Convert large uncompressed BMP or TIFF files to PNG or JPG to
              reduce storage footprint while maintaining acceptable image
              quality.
            </p>
          </div>
          <div
            key="App development assets"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">📱</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              App development assets
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Convert design assets between formats to meet the requirements of
              different platforms, screen densities, and asset specifications.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            Your images never leave your browser — all conversion happens
            locally
          </h3>
          <p className="text-gray-300 leading-relaxed max-w-xl mx-auto text-sm">
            Unlike most online image conversion tools that upload your files to
            a remote server for processing, this tool uses the HTML5 Canvas API
            to perform all conversion entirely within your browser. Your image
            is read by your browser's local FileReader API, processed in memory,
            and the output is returned as a direct download — nothing is
            transmitted to any external service. This matters for personal
            photos, proprietary business graphics, medical images, confidential
            documents, and any image you wouldn't want stored on a third-party
            server. Browser-based processing is also faster for typical image
            sizes since there's no upload wait time.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              key="/tools/image-cropper-resizer"
              href="/tools/image-cropper-resizer"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
              aria-label="Image Cropper & Resizer — Crop and resize images with custom dimensions — works entirely in your browser."
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Image Cropper & Resizer
              </div>
              <div className="text-xs text-gray-500">
                Crop and resize images with custom dimensions — works entirely
                in your browser.
              </div>
            </a>
            <a
              key="/tools/image-compressor"
              href="/tools/image-compressor"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
              aria-label="Image Compressor — Reduce image file size without visible quality loss — useful before uploading to web platforms."
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Image Compressor
              </div>
              <div className="text-xs text-gray-500">
                Reduce image file size without visible quality loss — useful
                before uploading to web platforms.
              </div>
            </a>
            <a
              key="/tools/favicon-generator"
              href="/tools/favicon-generator"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
              aria-label="Favicon Generator — Generate favicons in all standard sizes from any image — download PNGs and webmanifest."
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Favicon Generator
              </div>
              <div className="text-xs text-gray-500">
                Generate favicons in all standard sizes from any image —
                download PNGs and webmanifest.
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
