"use client";
// src/app/tools/text-repeater/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

const TOOL_URL = "https://www.onlinetoolbase.com/tools/text-repeater";
const TOOL_NAME = "Text Repeater";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#312e81", light: "#eef2ff" },
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
          aria-label="Close"
        >
          ✕
        </button>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 mb-4 shadow-lg">
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
          Scan to open {TOOL_NAME} on mobile
        </p>
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5">
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
    "Repeat any text multiple times with custom separators — free, instant, no signup",
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
              Share the tool or scan to open on mobile
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-colors ${bg}`}
              >
                {icon}
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 text-xs font-semibold transition-colors"
            >
              {copied ? "✓ Copied!" : "🔗 Copy link"}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 text-xs font-semibold transition-colors"
            >
              📱 QR code
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FAQS = [
  {
    q: "How many times can I repeat text?",
    a: "The tool supports up to 1,000 repetitions. Use the slider for quick adjustments or type an exact number into the count field. The copy button always captures the full output regardless of how long it is.",
  },
  {
    q: "What separators are available?",
    a: "You can choose from five built-in separators: New line (each repetition on its own line), Space (repetitions separated by a single space), Comma (comma and space), Pipe (space | space), or Custom (any character, emoji, or string you type). The Custom option gives you complete flexibility.",
  },
  {
    q: "Will the tool copy the full output even if it is truncated on screen?",
    a: "Yes. The display truncates very long outputs at 2,000 characters for performance, but the Copy button always copies the complete, untruncated result to your clipboard.",
  },
  {
    q: "Can I repeat multi-line text?",
    a: "Yes. You can paste multiple lines of text into the input field and the entire block will be repeated as a unit, with your chosen separator placed between each repetition.",
  },
  {
    q: "What are some practical uses for repeated text?",
    a: "Common uses include: generating test data for forms and databases, creating placeholder content for design mockups, building practice typing exercises, producing repeated list entries for templates, and creating separator lines made from repeated characters.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
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
              <span className="text-indigo-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageEditorial() {
  return (
    <section aria-label="Additional information" className="mt-6">
      <ShareBar />
      <AdSlot slotId={SLOT_BELOW_TOOL} className="mb-6" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          How to use the Text Repeater
        </h2>
        <div className="space-y-4">
          {[
            {
              n: "1",
              title: "Enter your text",
              body: "Type or paste any text into the input field. You can enter a single word, a phrase, a sentence, or even multiple paragraphs — the entire input is treated as one unit to repeat.",
            },
            {
              n: "2",
              title: "Set the repeat count",
              body: "Use the slider to choose a number between 1 and 100 quickly, or type any number up to 1,000 directly into the count field for exact repetitions.",
            },
            {
              n: "3",
              title: "Choose a separator",
              body: "Select how each repetition is separated. Use New line for stacked lists, Space for inline repetition, Comma or Pipe for structured data formats, or Custom for any character or string.",
            },
            {
              n: "4",
              title: "Copy the result",
              body: "The output appears in real time below. Click Copy to capture the full result to your clipboard — even if the display is truncated, the copy always includes everything.",
            },
          ].map(({ n, title, body }) => (
            <div key={n} className="flex items-start gap-4 text-sm">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
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

      <FAQSection />

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Common use cases
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {[
          {
            emoji: "🧪",
            title: "Test data generation",
            desc: "Quickly fill forms, databases, or spreadsheets with repeated placeholder values for testing and QA purposes.",
          },
          {
            emoji: "🎨",
            title: "Design mockups",
            desc: "Generate blocks of repeated Lorem Ipsum-style text or branded copy to fill design layouts and wireframes.",
          },
          {
            emoji: "⌨️",
            title: "Typing practice",
            desc: "Create long passages of a specific word or sentence to practise touch typing or keyboard shortcuts.",
          },
          {
            emoji: "📊",
            title: "Spreadsheet templates",
            desc: "Repeat column headers, row labels, or data patterns to quickly build structured template content.",
          },
          {
            emoji: "🔧",
            title: "Developer utilities",
            desc: "Generate repeated strings for unit tests, mock API responses, or performance benchmarking scenarios.",
          },
          {
            emoji: "📝",
            title: "Document formatting",
            desc: "Create repeated divider lines, section markers, or decorative borders using any character repeated many times.",
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

      <AdSlot slotId={SLOT_LEADERBOARD} className="mb-10" />

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Related Free Text Tools
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              href: "/tools/word-counter-live",
              label: "Word Counter Live",
              desc: "Count words, characters, and sentences in real time with reading and speaking time estimates.",
            },
            {
              href: "/tools/acronym-generator",
              label: "Acronym Generator",
              desc: "Turn any phrase into an acronym with uppercase, lowercase, or dot-separated formatting.",
            },
            {
              href: "/tools/readability-score-calculator",
              label: "Readability Score Calculator",
              desc: "Get Flesch, Kincaid, Gunning Fog, and ARI readability scores for any block of text.",
            },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
  );
}
