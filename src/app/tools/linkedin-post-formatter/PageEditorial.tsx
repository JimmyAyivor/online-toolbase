"use client";
// src/app/tools/linkedin-post-formatter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/linkedin-post-formatter";
const TOOL_NAME = "LinkedIn Post Formatter";

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
    "Free LinkedIn post formatter — add bold, italic, bullets, and spacing with a live preview before you copy. No signup.",
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
                <span className="text-blue-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-700 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FORMATTING_TIPS = [
  [
    "𝗕𝗼𝗹𝗱",
    "Unicode Mathematical Bold — renders as bold in LinkedIn's feed. Use for headlines, key terms, and post openers.",
  ],
  [
    "𝘐𝘵𝘢𝘭𝘪𝘤",
    "Unicode Mathematical Italic — renders as italic. Use for quotes, emphasis, or titles.",
  ],
  [
    "• Bullets",
    "Standard bullet symbol (•) manually inserted. LinkedIn doesn't support Markdown bullets natively — this symbol works.",
  ],
  [
    "Line breaks",
    "LinkedIn collapses excess blank lines — single blank lines between paragraphs display correctly; two or more may collapse into one.",
  ],
];

const FAQS = [
  {
    q: "Why doesn't LinkedIn support basic text formatting like bold and italic?",
    a: "LinkedIn's post composer and feed renderer use plain text — it doesn't process Markdown or HTML styling the way platforms like Slack or GitHub do. Bold and italic text in LinkedIn posts work through a workaround: Unicode mathematical alphanumeric symbols, which are technically different characters that visually look like bold or italic versions of standard letters. Because they are different Unicode code points, not HTML formatting, they display as bold or italic in LinkedIn's feed. This is the same technique used by tools like this formatter. The approach works across LinkedIn's desktop web, mobile apps, and feed displays. The trade-off is that Unicode-styled text may not be readable by screen readers, which interpret the mathematical symbols as symbols rather than letters — something to consider for accessibility.",
  },
  {
    q: "What is LinkedIn's character limit for posts?",
    a: "LinkedIn allows up to 3,000 characters for standard posts (status updates). Articles published through LinkedIn's article/newsletter feature can be much longer — up to approximately 125,000 characters. For standard posts, the first 210–220 characters appear before the 'See more' truncation point — this is the most valuable real estate in your post, as it's what appears in the feed without requiring a click. The character counter in this formatter tracks your total against the 3,000-character limit and highlights when you're approaching it. URLs in LinkedIn posts are not shortened — they count at their full character length, unlike Twitter/X which wraps all URLs in its t.co shortener.",
  },
  {
    q: "What are the best LinkedIn post formats for engagement?",
    a: "Data from LinkedIn creators and analytics tools consistently shows several high-performing post structures. The hook-story-lesson format — a strong opening line, a personal or professional narrative, and a takeaway — consistently generates high dwell time and comments. The numbered list ('5 things I learned about X') performs well because LinkedIn's algorithm rewards content that generates saves and reshares, and lists are highly saved. The contrarian or 'unpopular opinion' format — stating a view that pushes back on conventional wisdom in your field — generates replies through disagreement, which is a strong engagement signal. The question-at-the-end format ('What do you think?') directly invites comments, boosting algorithmic distribution. Regardless of format, posts under 1,200 characters tend to outperform longer posts in terms of engagement rate, though longer posts can drive more saves.",
  },
  {
    q: "Does adding emojis affect LinkedIn post reach?",
    a: "Emojis in LinkedIn posts can improve or hurt reach depending on usage. Moderate emoji use — 1–3 emojis used as visual anchors or bullet alternatives — tends to improve feed scanability and engagement rates, particularly for list and tips posts. Excessive emoji use (every line decorated with 3–5 emojis) is associated with spammy content and may reduce credibility among professional audiences on LinkedIn, which is more formal than Instagram or Twitter/X. Emojis count as 2 characters each for the 3,000-character limit. The most effective use is a single emoji at the start of a post opener or as a bullet alternative in a list — enough to add visual rhythm without overwhelming the professional tone.",
  },
  {
    q: "How do I add a line break in LinkedIn posts?",
    a: "On LinkedIn's desktop web composer, press Shift+Enter for a soft line break (stays on the same paragraph visually) or Enter for a full line break. On mobile, the Enter key creates a new line. The tricky part is that LinkedIn's feed renderer tends to collapse multiple consecutive blank lines into a single visual line break, so you can't create large visual gaps between paragraphs by pressing Enter multiple times. Single blank lines between paragraphs display correctly. If you draft your post in this formatter, it handles line break spacing appropriately — paste the formatted text directly into LinkedIn's composer and the line breaks will carry over.",
  },
  {
    q: "What's the best time to post on LinkedIn for maximum reach?",
    a: "LinkedIn engagement data from multiple analytics studies points to Tuesday through Thursday as the highest-engagement days, with peak times between 8–10 AM and 12–1 PM in the local timezone of your primary audience. This reflects LinkedIn's core professional audience checking the platform during work hours and the start of lunch breaks. Monday mornings tend to be lower engagement as users focus on catching up on work, and Fridays see drop-off as people disengage ahead of the weekend. Sunday posting is generally low-reach but can work for motivational or weekend-appropriate content. That said, consistent posting frequency (same days/times each week) tends to outperform optimising for a single 'best' time — the algorithm rewards accounts that post regularly and accumulate steady engagement over time.",
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
              aria-expanded={open === i}
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
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
              {f.a}
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
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How to Use the LinkedIn Post Formatter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Write or paste your post, apply bold, italic, and bullet formatting,
          preview exactly how it will look in the LinkedIn feed, then copy and
          paste it into LinkedIn's composer.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Start from a template or write from scratch",
              body: "Choose from the built-in post templates — Story, Tips List, Case Study, Thought Leadership, Question, or Reading List — to get a pre-structured post outline suited to your content type. Each template includes placeholder text showing the recommended structure and tone. Alternatively, write or paste your existing post text directly into the editor. Templates are particularly useful when you know what you want to say but are uncertain about how to structure it for LinkedIn's feed format.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Template
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Story",
                          "Personal narrative posts — challenge, lesson learned, career turning point",
                        ],
                        [
                          "Tips List",
                          "Educational content — numbered advice, '5 things I learned', how-to posts",
                        ],
                        [
                          "Case Study",
                          "Client results, project breakdowns, before-and-after professional stories",
                        ],
                        [
                          "Thought Leadership",
                          "Opinion pieces, industry commentary, contrarian takes on professional topics",
                        ],
                        [
                          "Question",
                          "Engagement-driving posts that end with a direct question to your network",
                        ],
                        [
                          "Reading List",
                          "Book or article recommendations with professional takeaways",
                        ],
                      ].map(([name, desc]) => (
                        <tr key={name} className="hover:bg-blue-50">
                          <td className="px-4 py-2 font-bold text-blue-700 text-xs whitespace-nowrap">
                            {name}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {desc}
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
              title: "Apply bold, italic, and bullet formatting",
              body: "Select any text in the editor and click Bold or Italic to apply Unicode character formatting that renders correctly in LinkedIn's feed. Use the bullet (•) button to insert a bullet point at the current cursor position for list items. These formatting options work because LinkedIn's text renderer displays Unicode mathematical alphanumeric symbols visually as bold or italic — the underlying characters are different Unicode code points rather than HTML or Markdown styling.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Format
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          How it works
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {FORMATTING_TIPS.map(([fmt, desc]) => (
                        <tr key={fmt} className="hover:bg-blue-50">
                          <td className="px-4 py-2 font-bold text-blue-700 text-xs whitespace-nowrap">
                            {fmt}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Review the live preview",
              body: "The right-side preview panel updates in real time as you type or apply formatting, showing approximately how your post will appear in LinkedIn's desktop feed — including the truncation point at ~210 characters (the 'See more' cutoff). Review the preview to check that formatting looks right, your opening hook falls within the visible portion, and the overall structure reads clearly. The character counter below the editor tracks your total against LinkedIn's 3,000-character limit.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Hook placement tip:</strong> LinkedIn truncates posts
                  in the feed after approximately 210 characters — everything
                  before that point is visible without clicking 'See more'. Your
                  strongest line, question, or claim should appear in the first
                  1–2 sentences, before the truncation point. The preview in
                  this tool marks the approximate cutoff so you can position
                  your hook correctly.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy and paste into LinkedIn",
              body: "Click 'Copy Formatted Post' to copy the full formatted text to your clipboard. Navigate to LinkedIn's post composer (click 'Start a post' on your LinkedIn feed), paste the text directly, and the formatting will carry over. Review once more in LinkedIn's composer before publishing — LinkedIn's own composer may wrap lines slightly differently than the preview. If the formatting looks correct, add any images or documents, select your audience, and post.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Paste tip:</strong> When pasting into LinkedIn's
                  composer, use Ctrl+V (or Cmd+V on Mac) rather than 'Paste as
                  plain text' — the plain text option in some browsers strips
                  Unicode characters, which would remove the bold/italic
                  formatting. If formatting disappears after pasting, try
                  pasting into a plain text editor first, then copying again
                  from there into LinkedIn.
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
              emoji: "💼",
              title: "Thought leadership posts",
              desc: "Format opinion articles and industry commentary with bold section headers and structured paragraphs that read well in LinkedIn's feed.",
            },
            {
              emoji: "📋",
              title: "Tips and list posts",
              desc: "Structure numbered lists or bullet-point tips posts with proper spacing and bold numbers or headers for maximum scannability.",
            },
            {
              emoji: "📖",
              title: "Personal story posts",
              desc: "Format narrative posts with clear paragraph breaks and a compelling hook within the first 210-character visible window.",
            },
            {
              emoji: "🏆",
              title: "Case study posts",
              desc: "Present client results or project breakdowns with bold data points, clear section structure, and a strong opening that stops the scroll.",
            },
            {
              emoji: "📣",
              title: "Announcements and launches",
              desc: "Format product launches, job announcements, and company updates with structured sections and prominent opening statements.",
            },
            {
              emoji: "🎓",
              title: "Educational content",
              desc: "Create how-to posts and explainers with numbered steps, bullet points, and bold key terms that make complex content easy to skim.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-700 to-sky-800 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">𝗟𝗶𝗻𝗸𝗲𝗱𝗜𝗻</div>
          <h3 className="text-xl font-bold mb-3">
            First impressions in the LinkedIn feed happen in 210 characters —
            make your opener count before the 'See more' cutoff
          </h3>
          <p className="text-blue-100 leading-relaxed max-w-xl mx-auto text-sm">
            LinkedIn's feed shows only the first 210–220 characters of any post
            before a 'See more' link. This means the overwhelming majority of
            users who see your post in their feed will make a decision about
            whether to engage based purely on those first two or three
            sentences. Posts that lead with their most compelling point — a bold
            claim, a surprising number, a direct question, or a counterintuitive
            statement — consistently outperform posts that bury the lead with
            context or preamble. Format your post to lead with strength, and use
            this tool's live preview to verify your hook falls within the
            visible window before you publish.
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
                desc: "Write and reorder X / Twitter threads with live character counts, numbered tweets, and one-click export.",
              },
              {
                href: "/tools/social-media-bio-generator",
                label: "Social Media Bio Generator",
                desc: "Generate optimised and creative bios for LinkedIn, Instagram, Twitter, and other social profiles.",
              },
              {
                href: "/tools/engagement-rate-calculator",
                label: "Engagement Rate Calculator",
                desc: "Calculate social media engagement rate using likes, comments, shares, and follower count.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
