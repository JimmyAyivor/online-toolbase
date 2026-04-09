"use client";
// src/app/tools/social-media-character-counter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL =
  "https://onlinetoolbase.com/tools/social-media-character-counter";
const TOOL_NAME = "Social Media Character Counter";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#0c4a6e", light: "#f0f9ff" },
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
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
        >
          ✕
        </button>
        <h3 className="text-lg font-black text-gray-900 mb-1">
          Take it with you
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-sky-100 shadow-inner mb-5">
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
    "Free social media character counter — check post length for Twitter/X, Instagram, LinkedIn, TikTok, YouTube, and more in one tool. No signup.",
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
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
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
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
            >
              {copied ? (
                <span className="text-sky-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const LIMITS_TABLE = [
  ["𝕏 Twitter/X", "280", "23", "Posts: 280 / DMs: 10,000 / Bio: 160"],
  ["Instagram", "2,200", "Full URL", "Caption: 2,200 / Bio: 150 / Story: none"],
  [
    "LinkedIn",
    "3,000",
    "Full URL",
    "Post: 3,000 / Bio: 220 / Article: ~125,000",
  ],
  [
    "Facebook",
    "63,206",
    "Full URL",
    "Post: 63,206 / Page bio: 101 / Optimal: 40–80",
  ],
  [
    "TikTok",
    "2,200",
    "Full URL",
    "Caption: 2,200 / Bio: 80 / First 100 visible",
  ],
  [
    "YouTube",
    "5,000",
    "Full URL",
    "Description: 5,000 / Title: 100 / First 100 in search",
  ],
  [
    "Pinterest",
    "500",
    "Full URL",
    "Pin description: 500 / First 50 most visible",
  ],
  ["Threads", "500", "Full URL", "Post: 500 / No hashtag indexing currently"],
];

const FAQS = [
  {
    q: "What are the character limits for each major social media platform?",
    a: "Character limits vary significantly across platforms. Twitter/X has a 280-character limit per tweet for standard accounts (X Premium subscribers get extended posts up to 25,000 characters). Instagram captions allow up to 2,200 characters, though only the first 125 are visible before a 'more' truncation. LinkedIn posts allow 3,000 characters, with the first 210 visible in the feed. Facebook posts technically allow up to 63,206 characters, though posts over 480 characters are truncated in the feed. TikTok captions allow 2,200 characters with the first 100 visible. YouTube video descriptions allow 5,000 characters with the first 100 appearing in search results. Pinterest pin descriptions allow 500 characters. Threads allows 500 characters per post.",
  },
  {
    q: "Do URLs count toward the Twitter/X character limit?",
    a: "Yes — but in a specific way. Twitter/X automatically wraps all URLs in its own t.co shortener, and any URL (regardless of its original length) counts as exactly 23 characters toward the 280-character limit. This means a long URL like https://www.example.com/very-long-path/with/many/segments counts the same as a short https://t.co/abc — both count as 23 characters. This is handled automatically by Twitter/X when you post, but it's important to account for when drafting posts in external tools like this counter. On other platforms (Instagram, LinkedIn, Facebook, TikTok, YouTube), URLs count at their full character length.",
  },
  {
    q: "How many characters does an emoji use?",
    a: "Emoji character counts depend on the platform and the specific emoji. On most social platforms, emojis count as 2 characters because they use Unicode code points outside the standard ASCII range. Some newer or more complex emojis (compound emojis using zero-width joiners, such as family emojis) can count as 4–8 characters because they're constructed from multiple Unicode code points joined together. The safe assumption for caption planning is 2 characters per emoji on most platforms. Twitter/X counts emojis as 2 characters each. Instagram and LinkedIn use similar counting. When in doubt, paste your text into this counter and the live count will show exactly how many characters your post uses.",
  },
  {
    q: "What is the 'truncation point' and why does it matter?",
    a: "The truncation point is the number of characters after which a platform hides the rest of your post behind a 'more', 'see more', or '…more' link in the feed. Users have to tap or click to expand and read the full post. The truncation point varies by platform: Instagram shows the first 125 characters before a 'more' link; LinkedIn shows the first 210 characters before 'see more'; Facebook shows roughly the first 480 characters; TikTok shows approximately the first 100 characters. This matters for engagement because the majority of users who see your post in their feed will not click 'more' — they make their engagement decision based solely on the visible text before the truncation. Your most compelling sentence or hook should always appear before the truncation point on every platform.",
  },
  {
    q: "What is the optimal post length for social media engagement?",
    a: "Optimal post length varies by platform and content type. For Twitter/X, posts between 71–100 characters receive highest average engagement according to multiple studies, though threads (multiple connected tweets) perform well for long-form content. For LinkedIn, posts under 1,200 characters tend to have higher engagement rates despite the 3,000-character limit — shorter posts get read fully, while longer posts risk truncation-caused abandonment. For Instagram, 138–150 character captions (fitting fully before 'more') work well for promotional content; 1,000–2,000 character captions work for storytelling posts that reward the engaged audience. For Facebook, posts between 40–80 characters receive the most engagement for brand pages. These are averages — the quality and relevance of content matters far more than exact character count.",
  },
  {
    q: "Can I use this counter for LinkedIn articles and YouTube descriptions?",
    a: "Yes — this counter works for any text you paste into it. For LinkedIn articles (published through LinkedIn's article editor), the character limit is approximately 125,000 characters — far beyond what this tool focuses on, but you can paste sections of long-form content to check length. For YouTube video descriptions, the 5,000-character limit is tracked in this tool under the YouTube option. YouTube descriptions also have an important sub-limit: only the first 100 characters appear in search results and in the YouTube feed below the video, so treat those first 100 characters like a meta description — include your primary keyword and a compelling summary. The title has a separate 100-character limit, which you can check by pasting your title text into the counter.",
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
        {FAQS.map((f, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-sky-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                {f.a}
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
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How to Use the Social Media Character Counter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Select your platform, type or paste your post text, and see your
          character count, remaining characters, and all-platform overview
          update in real time.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Select your target platform",
              body: "Click the platform icon for the network you're posting to — Twitter/X, Instagram, LinkedIn, Facebook, TikTok, YouTube, Pinterest, or Threads. The active platform panel updates to show the correct character limit, a colour-coded progress bar, and platform-specific tips. You can switch between platforms at any time to check the same text against different limits.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Platform
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Post limit
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          URL counts as
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Other limits
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {LIMITS_TABLE.map(([platform, limit, url, other]) => (
                        <tr key={platform} className="hover:bg-sky-50">
                          <td className="px-3 py-2 font-bold text-sky-700 text-xs whitespace-nowrap">
                            {platform}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-700 whitespace-nowrap">
                            {limit}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">
                            {url}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-500">
                            {other}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 2,
              title: "Type or paste your post text",
              body: "Write your post directly in the text area, or paste an existing draft. The character counter updates on every keystroke — the remaining character count in the platform banner and the progress bar update in real time. The progress bar turns orange when you're within 15% of the limit and red when you exceed it. The text analysis panel on the right tracks word count, hashtag count, mention count, URL count, and line count simultaneously.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Multi-platform tip:</strong> The right-side panel
                  shows an 'All Platforms' overview — a mini progress bar for
                  each platform updated in real time as you type. This is useful
                  when you're writing a post you plan to cross-post: you can see
                  at a glance which platforms your text fits within and which
                  will need editing before publishing.
                </div>
              ),
            },
            {
              n: 3,
              title: "Check the platform-specific tips",
              body: "Below the progress bar, a tips panel shows important platform-specific notes for the active platform — such as Twitter/X's URL counting rule (all URLs = 23 characters), Instagram's 125-character truncation point, or LinkedIn's 210-character 'see more' cutoff. These notes highlight the constraints that matter beyond just the hard character limit, helping you optimise your post for maximum visible content before truncation.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Truncation is as important as the limit:</strong> For
                  most platforms, the 'visible before truncation' threshold is
                  more actionable than the maximum character limit. Users rarely
                  click 'see more' — they make their engagement decision based
                  on the visible text. Keep your most compelling content before
                  the truncation point: 125 chars on Instagram, 210 on LinkedIn,
                  100 on TikTok, ~480 on Facebook.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy your finalised post",
              body: "Once your post is within the character limit and reads well, click the copy icon in the top-right corner of the text area to copy it to your clipboard. Then paste directly into the platform's composer — no reformatting needed. Use the clear button (trash icon) to reset the text area for your next post. You can also write multiple platform versions by drafting, copying, and clearing in sequence.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Cross-posting workflow:</strong> Draft your full post
                  text, check it against Instagram (2,200), LinkedIn (3,000),
                  and Facebook (3,000) — if it fits all three, it's cross-post
                  ready without edits. Then switch to Twitter/X (280) to write a
                  condensed version. Having both a long-form and short-form
                  version of every post covers all major platforms in one
                  sitting.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-500 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🐦",
              title: "Twitter/X post drafting",
              desc: "Draft tweets to the exact 280-character limit — make every character count without constant manual counting.",
            },
            {
              emoji: "📸",
              title: "Instagram caption writing",
              desc: "Check that your hook appears in the first 125 characters before the 'more' truncation, and that hashtags fit within the 2,200-character limit.",
            },
            {
              emoji: "💼",
              title: "LinkedIn post optimisation",
              desc: "Ensure your most compelling content appears in the first 210 characters — what the algorithm and readers see before 'see more'.",
            },
            {
              emoji: "📣",
              title: "Cross-platform content",
              desc: "Write once, then use the all-platforms panel to see instantly which networks your post fits and which need editing.",
            },
            {
              emoji: "🎵",
              title: "TikTok caption and bio",
              desc: "Check TikTok captions (2,200) and bios (80) — the bio limit is tight and often overlooked when planning creator profiles.",
            },
            {
              emoji: "▶",
              title: "YouTube description SEO",
              desc: "Optimise YouTube descriptions knowing the first 100 characters appear in search — front-load your primary keyword in that window.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-sky-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-sky-600 to-indigo-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-bold mb-3">
            Character limits are the floor — truncation points are what actually
            determine what most readers see
          </h3>
          <p className="text-sky-100 leading-relaxed max-w-xl mx-auto text-sm">
            Every major social platform truncates long posts in the feed before
            showing a 'see more' link — and most users never click it. The
            character limit tells you the maximum your post can be; the
            truncation point tells you the maximum that most readers will
            actually read. On Instagram, that's 125 characters. On LinkedIn,
            210. On TikTok, 100. On Facebook, around 480. These truncation
            thresholds are the real character limits that matter for engagement
            — everything before them is prime real estate, and everything after
            is only read by the most engaged fraction of your audience. Plan
            your posts around the truncation point, not the maximum limit.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Social Media Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/twitter-thread-builder",
                label: "Twitter Thread Builder",
                desc: "Write and reorder X / Twitter threads with live character counts per tweet and numbered formatting.",
              },
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags for Instagram, TikTok, and Twitter/X — increase reach and discoverability for any topic.",
              },
              {
                href: "/tools/engagement-rate-calculator",
                label: "Engagement Rate Calculator",
                desc: "Calculate social media engagement rate using likes, comments, shares, and follower count across platforms.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-sky-200 hover:-translate-y-1 transition-all duration-200 p-5"
              >
                <div className="font-bold text-gray-900 text-sm mb-1">
                  {label}
                </div>
                <div className="text-xs text-gray-500">{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
