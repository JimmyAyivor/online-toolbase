"use client";
// src/app/tools/youtube-title-description-generator/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL =
  "https://onlinetoolbase.com/tools/youtube-title-description-generator";
const TOOL_NAME = "YouTube Title & Description Generator";

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
        color: { dark: "#7f1d1d", light: "#fff7ed" },
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
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 mb-4 shadow-lg">
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-red-100 shadow-inner mb-5">
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
    "Free YouTube title and description generator — SEO-optimized titles and full descriptions with chapters and hashtags. No signup.",
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
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
    q: "How long should a YouTube title be?",
    a: "YouTube titles can be up to 100 characters, but the visible length in most contexts is significantly shorter. On desktop search results, titles are truncated at approximately 60–70 characters. On mobile, the cut-off is around 50–55 characters. In the YouTube homepage feed, titles show roughly 50–60 characters depending on the device and layout. The practical recommendation is to keep the most important information — the core topic and primary keyword — within the first 50–55 characters, so it's visible before truncation in every context. The title style that most consistently performs well across YouTube's contexts places the primary keyword near the front rather than at the end.",
  },
  {
    q: "How long should a YouTube description be?",
    a: "YouTube descriptions can be up to 5,000 characters. The first 125–150 characters are shown in search results before the 'Show more' cutoff, so these opening lines function like a meta description — they need to be compelling enough to make someone click. The full description is indexed by YouTube's search algorithm, so keyword-rich content throughout the full description helps with discoverability. Best practice is to include: a compelling opening hook (first 150 characters), chapter timestamps if the video is longer than 5–7 minutes (these become clickable in the player), the main content in keyword-rich paragraphs, a clear call to action (subscribe, link in comments, playlist), and relevant hashtags (YouTube displays the first three below the video title).",
  },
  {
    q: "What title style gets the most clicks on YouTube?",
    a: "Click-through rate (CTR) on YouTube titles varies significantly by niche and audience, but several patterns consistently perform above average. Question-format titles ('Why is X happening?', 'Can you really do Y?') perform well because they create an information gap the viewer needs to close. Number-led titles ('7 things you didn't know about X') set clear expectations and promise structured value. 'How to' titles capture high-intent search traffic from people actively looking for a solution. Challenge and experiment formats ('I tried X for 30 days') create narrative investment. The highest-CTR titles tend to combine a specific number or timeframe, a strong emotional hook, and a clear outcome — for example, '7 Mistakes I Made Building My First SaaS (and what I'd do differently)' rather than just 'My SaaS Journey'.",
  },
  {
    q: "Do YouTube descriptions help with SEO?",
    a: "Yes — YouTube descriptions are indexed by YouTube's search algorithm and contribute to how videos rank for search queries. The most important SEO factors in a YouTube description are: keyword placement in the first 150 characters (the section indexed most heavily), natural use of your primary keyword and related terms throughout the full description, chapter timestamps (which also improve watch time by helping viewers navigate), and links to relevant playlists (which improve session time on your channel). Hashtags in the description (YouTube indexes the first three as clickable tags shown under the title) also contribute to discoverability. YouTube descriptions are also used by Google to understand video content for Google Search video results — a well-written, keyword-rich description can drive external traffic from Google.",
  },
  {
    q: "How many hashtags should I use in a YouTube description?",
    a: "YouTube displays only the first three hashtags from your description as clickable tags shown below the video title. Beyond that, hashtags remain searchable but aren't displayed prominently. Best practice is to use 3–5 highly relevant hashtags at the end of your description. Using more than 15 hashtags can trigger YouTube to ignore all hashtags on a video. Choose hashtags that are: (1) directly relevant to the specific video topic, not just the channel, (2) a mix of broader topic tags (#productivity, #websitedevelopment) and more specific niche tags, and (3) terms that people on YouTube actually search for — not obscure internal tags. Avoid using the same hashtags on every video regardless of content, as this can reduce their effectiveness.",
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
              <span className="text-red-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            )}
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
          How to Use the YouTube Title &amp; Description Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your video topic, content type, and target audience — get
          multiple title options across different styles and a full
          SEO-optimized description ready to paste into YouTube Studio.
        </p>

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Enter your video topic
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Type your video's main topic into the topic field. Be specific —
                "how to stop procrastinating" will generate more targeted and
                useful titles than just "productivity". The more precise your
                topic, the more relevant and clickable your generated titles
                will be. Include any specific angle, technique, or outcome your
                video focuses on.
              </p>
              <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                <strong>Specificity tip:</strong> Instead of "fitness", try
                "building muscle over 40 with limited equipment". Instead of
                "coding", try "learning Python in 30 days with no prior
                experience". Specific topics generate hooks and descriptions
                that speak directly to your target viewer — and specific titles
                consistently outperform broad ones for click-through rate.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Select your content type and target audience
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Choose the content type that best matches your video format —
                tutorial, review, vlog, listicle, case study, or documentary.
                Then enter your target audience. Both inputs adjust the
                generated titles and description to match the tone and structure
                your audience expects from that format. A tutorial title for
                beginners looks different from a case study aimed at
                professionals.
              </p>
              <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                <strong>Audience specificity:</strong> "beginner JavaScript
                developers" generates more targeted copy than "programmers".
                "busy parents of toddlers" generates more relevant hooks than
                "parents". The more precisely you define your audience, the more
                your titles and description will resonate with the exact people
                your video is made for.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Choose a title style and copy your title
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                The generator produces multiple titles across different proven
                frameworks — question, how-to, list, secret/insider, challenge,
                and story. Review all options before selecting one. The best
                title isn't always the first — read each option aloud and ask
                whether it would make you stop scrolling. Click Copy next to any
                title to copy it to your clipboard.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                        Style
                      </th>
                      <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                        Best for
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      [
                        "Question",
                        "Curiosity-driven topics — the viewer needs the answer",
                      ],
                      [
                        "How-to",
                        "Tutorial and instructional content — captures search intent",
                      ],
                      [
                        "List / Number",
                        "Structured advice or roundups — sets clear expectations",
                      ],
                      [
                        "Secret / Insider",
                        "Niche or expert content — 'what they don't tell you'",
                      ],
                      [
                        "Challenge",
                        "Experiment or transformation content — 30-day, 7-day formats",
                      ],
                      [
                        "Story",
                        "Personal journey or case study — for human-interest narratives",
                      ],
                    ].map(([style, best]) => (
                      <tr key={style} className="hover:bg-red-50">
                        <td className="px-4 py-2 font-bold text-red-700 text-xs whitespace-nowrap">
                          {style}
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-600">
                          {best}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Copy your description and customise it
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click "Copy Description" to copy the full generated description
                to your clipboard. Paste it into YouTube Studio and customise
                it: update the chapter timestamps to match your actual video
                structure, add your real social media links and channel URL in
                the links section, replace placeholder hashtags with the
                specific tags most relevant to your video's niche, and add any
                sponsor messages or affiliate disclosures required by your
                channel.
              </p>
              <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                <strong>First 150 characters:</strong> The opening lines of your
                description appear in YouTube search results before the "Show
                more" truncation. Make sure the generated opening hook
                accurately describes your video and includes your primary
                keyword — these first lines are the most heavily weighted by
                YouTube's search algorithm and directly affect whether someone
                clicks on your video from search.
              </div>
            </div>
          </div>
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common uses for YouTube title and description generation
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "🎬",
              title: "New channel launch",
              desc: "Generate optimized titles and descriptions for your first videos — start with solid SEO foundations from day one.",
            },
            {
              emoji: "📈",
              title: "Improving existing videos",
              desc: "Regenerate titles and descriptions for older videos with low impressions — refresh metadata to boost search visibility.",
            },
            {
              emoji: "⚡",
              title: "Overcoming upload bottlenecks",
              desc: "Remove the friction of writing metadata — generate a strong starting point in seconds and spend time refining rather than starting from blank.",
            },
            {
              emoji: "🎓",
              title: "Educational content",
              desc: "Generate tutorial-format titles that capture high-intent search queries from people actively looking to learn your topic.",
            },
            {
              emoji: "💼",
              title: "Brand and business channels",
              desc: "Create professional, consistent metadata for product demos, company updates, and thought leadership content.",
            },
            {
              emoji: "🔄",
              title: "Batch content planning",
              desc: "Generate titles for a series of planned videos in one session — compare options and build a consistent content calendar.",
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

        <div className="bg-gradient-to-br from-red-600 to-orange-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📺</div>
          <h3 className="text-xl font-bold mb-3">
            Your title determines whether anyone watches — the description
            determines whether they find it
          </h3>
          <p className="text-red-100 leading-relaxed max-w-xl mx-auto text-sm">
            YouTube's algorithm uses two signals to decide which videos to show
            people: click-through rate (CTR) — which is almost entirely driven
            by your title and thumbnail — and watch time. A great title drives
            clicks; watch time determines long-term distribution. Your
            description, meanwhile, is the primary text YouTube's search
            algorithm indexes to understand what your video is about. A weak
            description means fewer search impressions even if your video
            content is excellent. Treat both as equal priorities: the title
            earns the click, and the description earns the discovery.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Social Media Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags for Instagram, TikTok, and LinkedIn — mixed by popularity tier.",
              },
              {
                href: "/tools/social-media-bio-generator",
                label: "Social Media Bio Generator",
                desc: "Generate ready-to-use bios for Instagram, LinkedIn, Twitter/X, TikTok, and YouTube.",
              },
              {
                href: "/tools/viral-hook-generator",
                label: "Viral Hook Generator",
                desc: "Generate scroll-stopping opening hooks across curiosity, controversy, story, value, and challenge frameworks.",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-red-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
