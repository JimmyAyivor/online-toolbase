"use client";
// src/app/tools/word-counter-live/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

const TOOL_URL = "https://onlinetoolbase.com/tools/word-counter-live";
const TOOL_NAME = "Word Counter Live";

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
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors'
          aria-label='Close'
        >
          ✕
        </button>
        <div className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 mb-4 shadow-lg'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            className='w-6 h-6 text-white'
            stroke='currentColor'
            strokeWidth={2}
          >
            <rect x='3' y='3' width='7' height='7' rx='1' />
            <rect x='14' y='3' width='7' height='7' rx='1' />
            <rect x='3' y='14' width='7' height='7' rx='1' />
            <rect x='14' y='14' width='3' height='3' rx='0.5' />
            <rect x='18' y='14' width='3' height='3' rx='0.5' />
            <rect x='14' y='18' width='3' height='3' rx='0.5' />
            <rect x='18' y='18' width='3' height='3' rx='0.5' />
          </svg>
        </div>
        <h3 className='text-lg font-black text-gray-900 mb-1'>
          Take it with you
        </h3>
        <p className='text-sm text-gray-400 mb-5 leading-relaxed'>
          Scan to open {TOOL_NAME} on mobile
        </p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5'>
          <canvas ref={canvasRef} />
        </div>
        <p className='text-xs text-gray-300 font-mono break-all'>{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Real-time word counter with reading time, character count & word frequency — free, no signup",
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
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
        </svg>
      ),
    },
  ];
  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <p className='text-sm font-bold text-gray-900 mb-0.5'>
              Found this useful?
            </p>
            <p className='text-xs text-gray-400'>
              Share the tool or scan to open on mobile
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {SHARES.map(({ label, href, bg, icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-colors ${bg}`}
              >
                {icon}
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className='inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 text-xs font-semibold transition-colors'
            >
              {copied ? "✓ Copied!" : "🔗 Copy link"}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 text-xs font-semibold transition-colors'
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
    q: "How is reading time calculated?",
    a: "Reading time is estimated using the average adult silent reading speed of 238 words per minute, as established by multiple academic studies. The result is rounded up to the nearest second, so even a single word shows as 1 second.",
  },
  {
    q: "How is speaking time calculated?",
    a: "Speaking time uses 130 words per minute — the average comfortable speaking pace for presentations and public speaking. This is slower than reading speed because spoken delivery includes natural pauses, emphasis, and breathing.",
  },
  {
    q: "What does the word target feature do?",
    a: "Enter a word count target in the field above the text area to see a progress bar and percentage. The bar turns green when you reach 100% of your target. This is useful for essays, articles, or any writing with a minimum or maximum word count.",
  },
  {
    q: "What words are excluded from the word frequency list?",
    a: "Common English stop words (the, a, an, and, or, but, in, on, at, to, for, of, with, is, are, was, were, it, I, you, he, she, we, they, etc.) are automatically filtered out. This leaves only the meaningful, content-bearing words in your text.",
  },
  {
    q: "Does it count characters with or without spaces?",
    a: "Both. The tool shows total characters (including spaces) and characters without spaces as separate statistics, so you can use whichever metric your target platform requires — for example, Twitter counts all characters including spaces.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6'>
      <h2 className='text-xl font-bold text-gray-900 mb-6'>
        Frequently Asked Questions
      </h2>
      <div className='space-y-3'>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className='border border-gray-100 rounded-xl overflow-hidden'
          >
            <button
              className='w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors'
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className='font-semibold text-gray-900 text-sm'>
                {faq.q}
              </span>
              <span className='text-indigo-600 text-lg shrink-0'>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className='px-5 pb-4 text-sm text-gray-600 leading-relaxed'>
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
    <section aria-label='Additional information' className='mt-6'>
      <ShareBar />
      <AdSlot slotId={SLOT_BELOW_TOOL} className='mb-6' />

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-4'>
          What every statistic means
        </h2>
        <div className='space-y-3'>
          {[
            {
              stat: "Words",
              desc: 'Total word count. A "word" is any continuous sequence of non-whitespace characters — numbers and hyphenated compounds each count as one word.',
            },
            {
              stat: "Characters",
              desc: "Total character count including spaces, punctuation, and line breaks. This matches the character count used by most social media and SMS platforms.",
            },
            {
              stat: "Characters (no spaces)",
              desc: 'Character count excluding all whitespace. Useful for platforms that measure "net" content length or for typesetting calculations.',
            },
            {
              stat: "Sentences",
              desc: "Counts sentence-ending punctuation (full stop, exclamation mark, question mark). May undercount in abbreviation-heavy text.",
            },
            {
              stat: "Paragraphs",
              desc: "Counts blocks of text separated by one or more blank lines. Single-line text with no blank lines counts as one paragraph.",
            },
            {
              stat: "Unique words",
              desc: "The number of distinct words in your text (case-insensitive). A high ratio of unique words to total words indicates varied vocabulary.",
            },
          ].map(({ stat, desc }) => (
            <div key={stat} className='flex gap-4 text-sm'>
              <span className='font-bold text-indigo-600 w-40 shrink-0'>
                {stat}
              </span>
              <span className='text-gray-600 leading-relaxed'>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <FAQSection />

      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Who uses this tool
      </h2>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
        {[
          {
            emoji: "📝",
            title: "Students & academics",
            desc: "Track essay and dissertation word counts against minimum or maximum requirements in real time as you write.",
          },
          {
            emoji: "✍️",
            title: "Bloggers & journalists",
            desc: "Check article length before publishing and ensure posts hit the optimal word count for SEO and reader engagement.",
          },
          {
            emoji: "📧",
            title: "Email & copywriters",
            desc: "Keep subject lines, ad copy, and email body text within platform character limits.",
          },
          {
            emoji: "🎤",
            title: "Public speakers",
            desc: "Use speaking time to determine how long a speech will last and adjust length before the big day.",
          },
          {
            emoji: "📱",
            title: "Social media managers",
            desc: "Ensure posts, bios, and captions fit within platform-specific character limits before publishing.",
          },
          {
            emoji: "🔍",
            title: "SEO specialists",
            desc: "Measure content depth, assess keyword density, and benchmark article length against competitor pages.",
          },
        ].map(({ emoji, title, desc }) => (
          <div
            key={title}
            className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'
          >
            <div className='text-2xl mb-3'>{emoji}</div>
            <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
            <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
          </div>
        ))}
      </div>

      <AdSlot slotId={SLOT_LEADERBOARD} className='mb-10' />

      <div>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>
          Related Free Text Tools
        </h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            {
              href: "/tools/readability-score-calculator",
              label: "Readability Score Calculator",
              desc: "Get Flesch, Kincaid, Gunning Fog, and ARI readability scores for any text.",
            },
            {
              href: "/tools/acronym-generator",
              label: "Acronym Generator",
              desc: "Turn any phrase into an acronym with uppercase, lowercase, or dot-separated styles.",
            },
            {
              href: "/tools/text-repeater",
              label: "Text Repeater",
              desc: "Repeat any text multiple times with newline, comma, pipe, or custom separators.",
            },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5'
              aria-label={`${link.label} — ${link.desc}`}
            >
              <div className='font-bold text-gray-900 text-sm mb-1'>
                {link.label}
              </div>
              <div className='text-xs text-gray-500'>{link.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
