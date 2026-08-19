"use client";
// src/app/tools/viral-hook-generator/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/viral-hook-generator";
const TOOL_NAME = "Viral Hook Generator";

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
        color: { dark: "#3b0764", light: "#faf5ff" },
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
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 mb-4 shadow-lg">
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
    "Free viral hook generator — generate scroll-stopping content hooks across curiosity, controversy, story, value, fear, and challenge frameworks. No signup.",
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
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

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What makes a content hook effective?",
    a: "An effective hook does one thing in its first line: gives the reader a compelling reason to stop scrolling and read the next line. This happens through three mechanisms — an information gap (the reader feels they'll miss something important if they don't continue), a bold or unexpected claim they want to validate or refute, or an emotional connection through relatability. Specificity is the single biggest factor separating weak hooks from strong ones: 'I learned something about productivity' creates no urgency; 'I tried one productivity change for 30 days and my output doubled' makes a specific, credible promise that triggers curiosity.",
  },
  {
    q: "Which hook type works best for which platform?",
    a: "Platform context shapes which frameworks perform best. On LinkedIn, story and value hooks consistently outperform others — the audience responds to transformation narratives and practical professional takeaways. On Twitter/X, curiosity and controversy hooks work well because the fast-scrolling, opinion-rich feed rewards bold, confident openings. On Instagram and TikTok, fear/warning hooks ('Stop doing X') and challenge hooks ('I tried this for 30 days') perform strongly — they create visual curiosity with a promised resolution. Value hooks work across all platforms for educational content. Test two or three frameworks with your specific audience and monitor completion and engagement rates to find your best-performing type.",
  },
  {
    q: "How specific should my topic be?",
    a: "The more specific your topic, the more targeted and usable the generated hooks will be. 'Productivity' generates generic hooks that apply to everyone. 'Inbox zero for remote workers', 'time blocking for freelancers', or 'morning routines for ADHD' generate hooks that speak directly to a defined audience. Specific topics also make hooks feel credible — niche audiences can immediately tell whether a hook is written for them or for the general population. Niche-specific hooks consistently outperform broad ones because they create immediate relevance recognition: the reader thinks 'this is for me' before reading the second line.",
  },
  {
    q: "Should I use these hooks exactly as written?",
    a: "Use them as starting points rather than final copy. The generated hooks follow proven frameworks with your topic substituted in — but the highest-performing hooks sound like your authentic voice. After generating, read each option aloud: does it sound natural for you? Does it match the tone your audience expects? Edit phrasing to match your register — if you're formal, remove casual contractions; if you're conversational, loosen formal language. The structure and psychological mechanism of the hook is what makes it effective, not the exact wording. Adding a specific real detail, an actual number from your experience, or a phrase unique to your niche will consistently outperform a generic template.",
  },
  {
    q: "How does the regenerate feature work?",
    a: "Clicking 'Regenerate' produces a fresh set of 5 hooks for the same topic and hook type without changing any settings. The hooks are drawn randomly from the template pool — each generation is independent, so regenerating gives you a different selection from the available templates for that framework. This is useful when the first set doesn't quite fit your angle — regenerate 2–3 times to see a wider range of options before switching to a different hook type. The template pool for each framework is large enough that repeated generations will typically produce meaningfully different results.",
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
              <span className="text-purple-600 text-lg shrink-0">
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
          How to Use the Viral Hook Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your topic, choose a hook framework, generate 5 options, then
          copy the hook that best fits your content and voice — edit it to sound
          like you before posting.
        </p>

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Enter your topic
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Type your content topic into the topic field. Be specific —
                'intermittent fasting for busy professionals' will generate more
                targeted and usable hooks than just 'diet'. The generator
                substitutes your topic directly into each hook template, so a
                specific, descriptive topic produces hooks that speak to a
                clearly defined audience rather than generic ones that could
                apply to anyone.
              </p>
              <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                <strong>Specificity matters:</strong> Include your niche and
                audience where possible. 'B2B cold email' is more useful than
                'email'. 'Beginner guitar for adults' is better than 'music'.
                The more the topic describes exactly who your content is for,
                the more immediately relevant the generated hooks will feel to
                that audience.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Select a hook framework
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click one of the six framework buttons to select how your hooks
                will be structured. Each framework triggers a different
                psychological mechanism.
              </p>
              <div className="space-y-2">
                {[
                  {
                    label: "Curiosity",
                    desc: "Creates an information gap — the reader must engage to find out what they're missing.",
                  },
                  {
                    label: "Controversy",
                    desc: "Challenges a widely-held belief — triggers strong agreement or disagreement, both of which drive engagement.",
                  },
                  {
                    label: "Story",
                    desc: "Opens a personal narrative with implied transformation — evokes empathy and relatability.",
                  },
                  {
                    label: "Value",
                    desc: "Promises an immediate, specific takeaway — attracts audiences actively seeking information.",
                  },
                  {
                    label: "Fear / Warning",
                    desc: "Alerts to a common mistake or risk — resonates with people already thinking about the topic.",
                  },
                  {
                    label: "Challenge",
                    desc: "Invites the reader to follow an experiment or take action — creates investment in the outcome.",
                  },
                ].map(({ label, desc }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <span className="font-bold text-purple-700 min-w-[90px] flex-shrink-0">
                      {label}
                    </span>
                    <p className="text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Generate and review your hooks
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click "Generate Hooks" to produce 5 hooks for your topic using
                the selected framework. The hooks are drawn randomly from a
                template pool — each generation is independent. Review all 5
                before deciding: the best hook isn't always the first one. Click
                "Regenerate" to get a fresh set from the same framework without
                changing settings.
              </p>
              <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                <strong>Try all frameworks:</strong> Generate hooks across at
                least 2–3 different framework types before settling on one. The
                framework that intuitively seems best for your topic isn't
                always the one that produces the strongest hook in practice.
                Curiosity and Fear hooks often outperform others for cold
                audiences who don't yet know your content.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Copy, personalise, and use as your opening line
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click "Copy" next to any hook to copy it to your clipboard.
                Before posting, edit the hook to sound like your authentic voice
                — adjust phrasing to match your usual tone, add a specific real
                detail or number from your own experience, and remove anything
                that feels generic. The hook becomes your post's first sentence
                — everything else in the post should follow from it.
              </p>
              <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                <strong>Quick test:</strong> Read your chosen hook aloud as if
                you're speaking to one person in your target audience. Does it
                feel natural? Would it make you want to keep reading if you were
                that person? If the answer is yes to both, it's ready to use.
              </div>
            </div>
          </div>
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common uses for content hooks
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "💼",
              title: "LinkedIn posts",
              desc: "Grab attention in a professional feed with story and value hooks — test curiosity and controversy to stand out from standard thought-leadership content.",
            },
            {
              emoji: "🐦",
              title: "Twitter / X threads",
              desc: "Open a thread with a curiosity or controversy hook that makes the reader want to click through and see the full content.",
            },
            {
              emoji: "🎵",
              title: "TikTok captions",
              desc: "Use a fear/warning or challenge hook as both the video opening line and caption to create consistency between what viewers see and read.",
            },
            {
              emoji: "📸",
              title: "Instagram posts",
              desc: "Lead with a value hook that promises a specific takeaway — then deliver on it in the carousel or caption to drive saves and shares.",
            },
            {
              emoji: "📧",
              title: "Email subject lines",
              desc: "Adapt curiosity and fear/warning frameworks for email subject lines — the same psychological principles that stop the scroll also drive open rates.",
            },
            {
              emoji: "📝",
              title: "Blog and article intros",
              desc: "Use a hook as the first sentence of a blog post or article to earn the reader's attention before they decide whether the full piece is worth reading.",
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

        <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-xl font-bold mb-3">
            The first sentence decides whether anyone reads the second — invest
            more time in the hook than in the rest of the post
          </h3>
          <p className="text-purple-100 leading-relaxed max-w-xl mx-auto text-sm">
            Most social media content fails not because the content itself is
            poor but because the first line doesn't earn the reader's attention.
            An average piece of content with a great hook will consistently
            outperform a great piece of content with a weak hook — because the
            weak hook prevents most readers from ever getting to the content.
            Professional copywriters routinely spend 50% of their writing time
            on the headline or opening line alone. Use this generator to produce
            multiple options quickly, then invest the remaining effort in
            finding and refining the hook that best earns the attention of your
            specific audience.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Social Media Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/tiktok-hook-generator",
                label: "TikTok Hook Generator",
                desc: "Generate scroll-stopping TikTok opening lines across 5 hook formats for any topic.",
              },
              {
                href: "/tools/linkedin-post-formatter",
                label: "LinkedIn Post Formatter",
                desc: "Format LinkedIn posts with bold, italic, and bullets — live preview before posting.",
              },
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags for Instagram, TikTok, and LinkedIn — mixed by popularity tier.",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-purple-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
