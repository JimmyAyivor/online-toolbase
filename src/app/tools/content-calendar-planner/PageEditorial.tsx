"use client";
// src/app/tools/content-calendar-planner/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/content-calendar-planner";
const TOOL_NAME = "Content Calendar Planner";

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
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 mb-4 shadow-lg">
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5">
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
    "Free content calendar planner — schedule social media posts across all platforms, weekly view, CSV export. No signup.",
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
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
    q: "How often should I post on social media?",
    a: "Optimal posting frequency varies by platform. Instagram performs best with 3–5 feed posts per week plus daily Stories. TikTok rewards higher frequency — 1–3 videos per day is typical for growing accounts, though quality matters more than volume. LinkedIn performs well at 3–5 posts per week; posting more than once per day generally reduces per-post reach. Twitter/X has the highest optimal frequency of any platform — 3–10 tweets per day is normal for active accounts. YouTube rewards consistency over volume — 1–2 videos per week is the standard recommendation for growing channels. Facebook typically performs best at 1–2 posts per day. For all platforms, consistency matters more than high volume: a schedule you can maintain for 6–12 months outperforms an intensive burst you can't sustain.",
  },
  {
    q: "What is a content pillar and how should I structure mine?",
    a: "A content pillar is a broad topic category that defines the recurring themes of your content. Most social media strategists recommend 3–5 pillars that collectively describe what your account is about. For example, a personal finance creator might use: Educational (explaining money concepts), Inspirational (success stories), and Personal (behind-the-scenes of their financial journey). Content pillars solve the 'what should I post today?' problem — when stuck, cycle through your pillars and generate content in each category. Structuring your content calendar around pillars also ensures variety: if you post from Educational on Monday, Inspirational on Wednesday, and Personal on Friday, your feed never becomes repetitive or single-dimensional. Aim for roughly equal distribution across your pillars, though the exact balance should reflect what your audience responds to most.",
  },
  {
    q: "What is the best time to post on social media?",
    a: "The 'best time to post' varies by platform, audience, and niche — generic advice is less reliable than checking your own account analytics. That said, research-backed general guidelines are: Instagram: Tuesday–Friday, 9 AM–11 AM and 1 PM–3 PM in your audience's local time zone. LinkedIn: Tuesday, Wednesday, and Thursday, 8 AM–10 AM and 5 PM–6 PM (before and after work hours). TikTok: Tuesday–Friday, 9 AM, 12 PM, and 7 PM–9 PM. Twitter/X: weekdays, 8 AM–10 AM and 6 PM–9 PM. YouTube: Thursday–Saturday, 12 PM–4 PM (when people are planning weekend viewing). The most reliable approach: post consistently for 4–6 weeks at different times, then check your platform's native analytics to identify when your specific audience is most active and engaged.",
  },
  {
    q: "How far in advance should I plan my content calendar?",
    a: "A rolling 2–4 week content calendar is the recommended planning horizon for most creators and small teams. Planning 2 weeks ahead gives enough lead time to create content thoughtfully rather than reactively, while remaining close enough to current events and trends to stay relevant. For larger organisations or campaigns around fixed dates (product launches, seasonal campaigns, events), planning 6–12 weeks ahead is appropriate for those specific items. A common workflow: spend 1–2 hours at the start of each week reviewing and confirming the upcoming week's content, and 2–3 hours planning and batching content for the following week. Monthly planning sessions (1–2 hours) set the overall direction and identify key dates, campaigns, and content pillar themes for the month ahead.",
  },
  {
    q: "How do I repurpose content across platforms?",
    a: "Content repurposing is creating one piece of core content and adapting it for multiple platforms rather than creating entirely original content for each. A common repurposing workflow starts with a long-form piece (YouTube video or blog post) and cascades down: a 10-minute YouTube video becomes 3–5 short-form clips for TikTok and Instagram Reels, the key points become a Twitter/X thread, the main insight becomes a LinkedIn post with commentary, and quotes from the video become Instagram carousel slides or Stories. To repurpose effectively: identify the 3–5 most valuable moments or insights from your long-form content, adapt the format to suit each platform's norms (vertical video for TikTok, text-first for LinkedIn), and add platform-specific context rather than posting identical content everywhere. Most native platforms suppress content that was clearly cross-posted without adaptation.",
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
              <span className="text-indigo-600 text-lg shrink-0">
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

// ─── Platform posting frequency reference ─────────────────────────────────────

const PLATFORM_GUIDE = [
  ["Instagram", "3–5 feed posts/week", "Daily Stories", "Reels 3–5×/week"],
  ["TikTok", "1–3 videos/day", "Trending audio", "Duets & Stitches"],
  ["LinkedIn", "3–5 posts/week", "Weekday mornings", "Articles monthly"],
  ["Twitter / X", "3–10 tweets/day", "Threads 2–3×/week", "Reply to trending"],
  ["YouTube", "1–2 videos/week", "Shorts 3–5×/week", "Community posts"],
  ["Facebook", "1–2 posts/day", "Reels & Stories", "Groups engagement"],
];

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
          How to Use the Content Calendar Planner
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Plan your content week by week — add posts by platform, date, and
          type, see everything in a colour-coded weekly grid, and export your
          schedule as a CSV.
        </p>

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Select a platform and content type
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Choose the social media platform your post is for (Instagram,
                TikTok, Twitter/X, LinkedIn, YouTube, or Facebook) and select
                the content type — post, story, reel, video, thread, or article.
                These two selections determine how the post appears in the
                calendar grid and how it's categorised in the exported CSV. Each
                platform is colour-coded in the weekly view so you can see your
                platform distribution at a glance.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                        Platform
                      </th>
                      <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                        Recommended frequency
                      </th>
                      <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                        Best content types
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {PLATFORM_GUIDE.map(
                      ([platform, freq, secondary, extra]) => (
                        <tr key={platform} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-bold text-indigo-700 text-xs whitespace-nowrap">
                            {platform}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-700">
                            {freq}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {secondary} · {extra}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Set the date and add a caption or note
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Select the date you plan to publish this post. Add your caption,
                post concept, or brief notes in the caption field — this is your
                planning note rather than a final caption, so bullet points or a
                rough idea are fine. Adding context here makes the exported CSV
                useful as a brief for yourself or a team member who'll create
                the actual content.
              </p>
              <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                <strong>Planning vs writing:</strong> Use the caption field for
                planning-level notes rather than final copy — "Reel: 3
                productivity hacks for remote workers, upbeat music, text
                overlay" is more useful at the planning stage than a full
                caption. You can always write the final caption in your
                scheduling tool (Buffer, Later, etc.) when it's time to create
                the post.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Review your weekly calendar grid
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Once you've added posts, the weekly calendar grid shows all
                planned content colour-coded by platform. Use this view to check
                your posting distribution — are you posting consistently across
                the week, or clustered on certain days? Is your platform mix
                balanced? Are there gaps where you've planned nothing, or days
                where you've over-scheduled? Adjust individual posts using the
                edit or delete controls.
              </p>
              <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                <strong>Balanced distribution tip:</strong> Aim to spread posts
                evenly across weekdays rather than clustering on Monday or
                Friday. Midweek posts (Tuesday–Thursday) typically see higher
                engagement across most platforms because weekend content has
                lower competition and weekday mornings capture commute-time
                browsing. Avoid scheduling multiple posts on the same platform
                on the same day unless your audience and strategy specifically
                support it.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Export your schedule as CSV
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click "Export CSV" to download your entire content schedule as a
                spreadsheet-compatible file. The CSV includes platform, content
                type, date, and caption for every planned post. Open it in
                Excel, Google Sheets, or Notion to share with your team, use as
                a brief for content creation, or import into a scheduling tool.
                The calendar data stays in your browser — nothing is saved to a
                server, so export before closing the tab if you want to keep
                your plan.
              </p>
              <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                <strong>Workflow tip:</strong> Export your CSV at the end of
                each planning session and save it to a shared folder (Google
                Drive, Dropbox) so your team always has access to the current
                content plan. Use one exported CSV per week or month, named
                clearly (e.g. "content-plan-jan-2025.csv") for easy version
                tracking.
              </div>
            </div>
          </div>
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common uses for content calendar planning
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "📅",
              title: "Weekly content batching",
              desc: "Plan an entire week of content in one session — decide what to post where before sitting down to create, saving time and reducing daily decision fatigue.",
            },
            {
              emoji: "👥",
              title: "Team content coordination",
              desc: "Share the exported CSV with writers, designers, and videographers so everyone knows what's due when and for which platform.",
            },
            {
              emoji: "🚀",
              title: "Product or campaign launches",
              desc: "Map out a coordinated launch sequence across multiple platforms — teaser posts, launch day content, and follow-up posts all planned in advance.",
            },
            {
              emoji: "📊",
              title: "Content mix analysis",
              desc: "Visualise your platform distribution and content type mix — ensure you're not over-posting on one platform or neglecting another.",
            },
            {
              emoji: "🔄",
              title: "Repurposing workflow",
              desc: "Plan content repurposing sequences — a YouTube video on Tuesday feeds TikTok clips Wednesday–Friday, a LinkedIn article on Thursday, and Instagram carousel on Saturday.",
            },
            {
              emoji: "🗓️",
              title: "Seasonal and event planning",
              desc: "Map content around key dates — holidays, industry events, product anniversaries, and awareness months — so you're never scrambling last minute.",
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

        <div className="bg-gradient-to-br from-indigo-700 to-blue-800 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📆</div>
          <h3 className="text-xl font-bold mb-3">
            A content calendar transforms posting from reactive to intentional —
            consistency compounds over time
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            Most social media accounts with inconsistent growth share a common
            pattern: they post frequently when motivated and disappear for weeks
            when busy or uninspired. The accounts that grow consistently almost
            always have a planned content calendar — not because planned content
            is inherently better, but because a plan prevents the posting gaps
            that signal to algorithms that an account is inactive. Algorithms
            favour accounts that post on a predictable schedule. Planning 1–2
            weeks ahead means you're never scrambling for ideas the morning a
            post is due, and the consistency this creates compounds: more
            consistent posting leads to better algorithmic distribution, which
            leads to faster audience growth, which creates more motivation to
            post consistently.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Social Media Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/social-media-bio-generator",
                label: "Social Media Bio Generator",
                desc: "Generate ready-to-use bios for Instagram, LinkedIn, Twitter/X, TikTok, and YouTube.",
              },
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags for Instagram, TikTok, and LinkedIn — mixed by popularity tier.",
              },
              {
                href: "/tools/social-media-audit",
                label: "Social Media Audit Tool",
                desc: "22-point checklist across profile basics, content quality, engagement, and strategy — get an instant score.",
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
    </>
  );
}
