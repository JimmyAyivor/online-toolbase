"use client";
// src/app/tools/aspect-ratio-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/aspect-ratio-calculator";
const TOOL_NAME = "Aspect Ratio Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#eff6ff" },
      });
    });
    return () => {
      c = true;
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

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free aspect ratio calculator — find ratio from dimensions, calculate missing width/height, scale proportionally. No signup.",
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
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              aria-label="Open QR code"
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

const FAQS = [
  {
    q: "What is an aspect ratio?",
    a: "An aspect ratio is the proportional relationship between a rectangle's width and height, expressed as two numbers separated by a colon — for example, 16:9 or 4:3. It describes the shape of the rectangle without specifying its size. A 16:9 display can be 1280×720, 1920×1080, or 3840×2160 — all are the same shape. Aspect ratios are used in display technology, photography, film production, graphic design, and video for consistent proportional framing regardless of actual resolution. The ratio is always simplified to its lowest common denominator using the greatest common divisor: 1920×1080 simplifies to 16:9 because both numbers are divisible by 120 (1920/120=16, 1080/120=9).",
  },
  {
    q: "What is the 16:9 aspect ratio and why is it the standard?",
    a: "16:9 (pronounced 'sixteen by nine') is the aspect ratio used by virtually all modern HD and 4K video content, displays, and monitors. It was adopted as the standard for HDTV in the late 1990s as a compromise between the 4:3 ratio of standard-definition television and the wider cinema ratios (2.35:1, 2.39:1) used in film. 16:9 provides a wider field of view than 4:3 while remaining practical for broadcast and streaming. It matches how human peripheral vision naturally extends horizontally. Common 16:9 resolutions include 1280×720 (720p), 1920×1080 (1080p Full HD), 2560×1440 (1440p QHD), and 3840×2160 (4K UHD). YouTube, Netflix, and most streaming platforms use 16:9 as their primary format.",
  },
  {
    q: "How do I maintain aspect ratio when resizing an image?",
    a: "To resize an image while maintaining its aspect ratio, use the Scale mode in this calculator: enter the original width and height, then set the percentage to scale to (50% = half size, 200% = double size). The calculator applies the same percentage to both dimensions, preserving the ratio exactly. In image editing software: in Photoshop, check the 'Constrain Proportions' or chain-link icon before entering a new dimension. In most software, holding Shift while dragging a resize handle constrains the ratio. If you know the target width but not the height, use 'Find Height' mode — enter your target width and the original ratio, and the calculator gives you the correct height to keep the image proportional.",
  },
  {
    q: "What aspect ratio should I use for social media?",
    a: "Different platforms use different optimal ratios. Instagram feed posts perform best at 4:5 (1080×1350px) as it takes up the most vertical space in the feed; square 1:1 (1080×1080px) also works well. Instagram Stories and Reels use 9:16 (1080×1920px). TikTok is 9:16 (1080×1920px). YouTube videos are 16:9 (1920×1080px); YouTube Shorts are 9:16. Twitter/X images display at various ratios — 16:9 and 2:1 work well in feed previews. LinkedIn posts use 1:1 or 1.91:1 (1200×628px) for shared links. Facebook feed posts are 1.91:1 for link previews and 1:1 or 4:5 for direct image posts. Pinterest performs best with tall images at 2:3 or 1:2 ratios.",
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
          How to Use the Aspect Ratio Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Choose the mode that matches your need — find a ratio, calculate a
          missing dimension, or scale proportionally — then enter your values
          and copy the result.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Find Ratio — discover the aspect ratio of any dimensions",
              body: "Enter any width and height in pixels (or any unit) to get the simplified aspect ratio, decimal equivalent, and megapixel count. This is useful when you have an image or video at an unusual resolution and want to know what standard ratio it corresponds to — for example, 2560×1600 simplifies to 8:5, which is the 16:10 widescreen monitor ratio.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Common ratio preset:</strong> Click any of the 8 ratio
                  buttons below the mode selector to instantly populate the
                  inputs with standard dimensions at that ratio (e.g. clicking
                  16:9 enters 1600×900px). The visual preview updates to show
                  the shape of the selected ratio.
                </div>
              ),
            },
            {
              n: 2,
              title: "Find Height / Find Width — calculate missing dimensions",
              body: "If you need an image at a specific width but don't know what height to use to maintain a given ratio — enter the width and the ratio (e.g. width 1200, ratio 16:9) to get the correct height (675). This is the most common use case for resizing images for specific platforms without distortion.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Example:</strong> You're creating a YouTube thumbnail
                  (16:9) but you know you need it to be 1280px wide. Enter
                  width: 1280, ratio: 16:9 → result: height 720px (1280×720 =
                  720p HD). Use 'Find Width' for the reverse: enter height 1080,
                  ratio 16:9 → width 1920.
                </div>
              ),
            },
            {
              n: 3,
              title: "Scale — resize proportionally by percentage",
              body: "Enter original dimensions and a scale percentage to get the new width and height while keeping the exact same ratio. 50% gives you half the size; 200% doubles it. Useful for creating responsive image sets (1x, 2x, 3x) or downscaling large source files to web-appropriate sizes.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Responsive images:</strong> Start with your largest
                  source image (e.g. 3840×2160) and scale to 50% for a 1920×1080
                  medium, and 25% for a 960×540 small. All three maintain the
                  exact 16:9 ratio and can be used in HTML srcset attributes for
                  responsive image serving.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy the result and use in your project",
              body: "Click the Copy button on the result panel to copy the dimensions to your clipboard. The copied format is 'width × height (ratio)' — for example '1920 × 1080 (16:9)'. Use the resolution reference table on the right to quickly identify standard resolutions and their corresponding aspect ratios without needing to calculate them.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Visual preview:</strong> The blue rectangle below the
                  result updates to visually represent the selected ratio. This
                  is useful for immediately seeing whether a ratio is portrait,
                  landscape, square, or ultra-wide — and helps catch errors
                  where a dimension was entered in the wrong order.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
                {n}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>
        <FAQSection />
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common use cases
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "🎬",
              title: "Video production",
              desc: "Verify export dimensions match 16:9 for YouTube, 9:16 for Reels, or 21:9 for cinematic cropping before rendering.",
            },
            {
              emoji: "🖼️",
              title: "Graphic design",
              desc: "Find the correct height for a banner at a known width, or check whether a client's supplied image matches the required ratio.",
            },
            {
              emoji: "📱",
              title: "Social media assets",
              desc: "Calculate correct dimensions for Instagram posts (4:5), Stories (9:16), LinkedIn headers (8:1), and Twitter/X banners (3:1).",
            },
            {
              emoji: "🖥️",
              title: "Web and UI design",
              desc: "Scale component dimensions proportionally, or find the correct CSS aspect-ratio value from pixel dimensions.",
            },
            {
              emoji: "📷",
              title: "Photography",
              desc: "Check image crop ratios before printing, verify sensor format ratios (3:2, 4:3, 1:1), or plan crop dimensions.",
            },
            {
              emoji: "🎮",
              title: "Game and app development",
              desc: "Calculate resolution variants for different device aspect ratios (iPhone 16:9, modern smartphones 19.5:9, tablets 4:3).",
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
        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📐</div>
          <h3 className="text-xl font-bold mb-3">
            Always maintain ratio when scaling — stretching or squashing an
            image is immediately visible and looks unprofessional
          </h3>
          <p className="text-blue-100 leading-relaxed max-w-xl mx-auto text-sm">
            Distorted images — where width and height have been scaled
            independently — look immediately wrong to any viewer even if they
            can't explain why. Circles become ovals, faces look wider or taller
            than they should, and text becomes blurry or difficult to read. The
            single most common cause of distorted images in web and print
            production is resizing width and height independently without
            checking that the ratio is preserved. This calculator removes the
            mental arithmetic of maintaining proportions — enter one dimension
            and the ratio, and the correct corresponding dimension is calculated
            for you.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Calculator Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/image-format-converter",
                label: "Image Format Converter",
                desc: "Convert between JPG, PNG, and WebP formats with quality control and file size comparison.",
              },
              {
                href: "/tools/profile-picture-resizer",
                label: "Profile Picture Resizer",
                desc: "Resize profile photos to exact platform dimensions for Instagram, LinkedIn, Twitter, and more.",
              },
              {
                href: "/tools/favicon-generator",
                label: "Favicon Generator",
                desc: "Generate favicons in all standard sizes from any image — ICO, PNG, and webmanifest.",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
