"use client";
// src/app/tools/word-character-counter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/word-character-counter";
const TOOL_NAME = "Word & Character Counter";

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
    "Free word and character counter — count words, characters, sentences, paragraphs and get reading time estimates instantly",
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
                <span className="text-indigo-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
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
    q: "How are words counted — does punctuation affect the count?",
    a: "The tool counts words by splitting your text on whitespace — spaces, tabs, and newlines. Punctuation attached to a word (commas, full stops, hyphens, apostrophes) is treated as part of that word token and does not create extra word counts. So 'it's', 'end.' and 'well-designed' each count as one word. Hyphenated compound words like 'state-of-the-art' count as one word — if you prefer them counted separately, replace hyphens with spaces before pasting. Leading and trailing whitespace is trimmed before counting, so extra blank lines do not inflate the word count.",
  },
  {
    q: "What is the difference between 'characters' and 'characters (no spaces)'?",
    a: "Characters is the total number of character positions in your text, including every letter, number, punctuation mark, and space. Characters (no spaces) strips all whitespace before counting — only actual content characters are counted. Most social media platforms that impose character limits — Twitter/X, LinkedIn, Instagram captions — use the total character count including spaces. Some character-limited platforms like certain SMS services or meta descriptions count without spaces. Always check the specific platform's counting method. The tool shows both values so you can use whichever is relevant.",
  },
  {
    q: "How accurate are the reading and speaking time estimates?",
    a: "Reading time is calculated at 200 words per minute, which is widely cited as the average adult silent reading speed for non-technical general content. Academic research on reading rates typically finds adults read between 175 and 300 wpm depending on text complexity, familiarity, and individual ability. Speaking time uses 150 wpm, typical for a deliberate, clear presentation or lecture pace — conversational speech is faster (160–180 wpm) while careful public speaking is often slower (120–140 wpm). For a precise reading or speaking time, do a timed test of your first paragraph and extrapolate.",
  },
  {
    q: "Why do my sentence counts seem off?",
    a: "The sentence counter splits on full stops, exclamation marks, and question marks. This works well for most prose but can produce unexpected results in some situations: abbreviations with full stops (e.g. 'Dr.', 'U.S.', 'etc.') are counted as sentence endings; decimal numbers (3.14) may be counted as a sentence boundary; and ellipses (...) count as three sentence endings if each dot triggers a split. If you need a highly accurate sentence count, review the result manually for texts that contain many abbreviations or numerical data.",
  },
  {
    q: "How are paragraphs counted?",
    a: "Paragraphs are counted by splitting your text on double newlines (blank lines between blocks of text), which is the standard paragraph separator in plain text. If you're pasting from a word processor where paragraphs are separated by a single newline, the tool may count all your text as one paragraph. In that case, replace single line breaks between paragraphs with double line breaks (one blank line between each paragraph) before pasting. Single-line breaks within a paragraph — such as in poetry or bullet points — do not start a new paragraph count.",
  },
  {
    q: "Can I use this as a text editor and save my work?",
    a: "The textarea functions as a basic plain-text editor — you can type, paste, and edit freely. Use the Copy button to copy your text to the clipboard and paste it into another application, or click Download to save the current content as a .txt file. Saved files are plain text only — there's no formatting, font information, or document metadata. The tool does not auto-save: if you navigate away or close the tab, your text is lost. For longer editing sessions, periodically download your work as a backup.",
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
              <span className="text-indigo-600 text-lg shrink-0">
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
          How to Use the Word &amp; Character Counter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Type or paste any text and get an instant breakdown of words,
          characters, sentences, paragraphs, and estimated reading and speaking
          times.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Type or paste your text",
              body: "Enter text directly into the large editor area, or paste from any source — a word processor, email, web page, or code editor. All stats update in real time with every keystroke. There's no word or character limit — the tool handles documents of any length since all processing happens locally in your browser.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Paste from Word or Google Docs:</strong> When pasting
                  from a word processor, rich text formatting (bold, italic,
                  headings, links) is stripped — only the plain text content is
                  counted. This is the correct behaviour for pure text metrics
                  and avoids counting HTML or formatting tags.
                </div>
              ),
            },
            {
              n: 2,
              title: "Read the six stat cards",
              body: "Above the editor, six cards update live: Words, Characters (including spaces), Characters (no spaces), Sentences, Paragraphs, and Reading Time. Each metric serves a different purpose — social media platforms typically limit by character count including spaces, while some APIs and forms count characters without spaces.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Metric
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Rate used
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Words",
                          "—",
                          "Submission limits, essay targets, blog post length",
                        ],
                        [
                          "Characters",
                          "—",
                          "Twitter/X (280), SMS (160), meta descriptions (160)",
                        ],
                        [
                          "Characters (no spaces)",
                          "—",
                          "Instagram (2,200), some CMS character fields",
                        ],
                        [
                          "Reading time",
                          "200 wpm",
                          "Blog, article, and long-form content planning",
                        ],
                        [
                          "Speaking time",
                          "150 wpm",
                          "Presentation, podcast, and speech script timing",
                        ],
                      ].map(([m, r, b]) => (
                        <tr key={m} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-bold text-indigo-700 text-xs">
                            {m}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {r}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {b}
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
              title: "Check the time estimates and average metrics",
              body: "Below the editor, two panels show time estimates (reading and speaking time in minutes) and average metrics (words per sentence and characters per word). Average words per sentence is a useful readability indicator — a value above 20 typically makes text harder to follow and suggests breaking long sentences up. Average characters per word reflects vocabulary complexity: simple, everyday language scores around 4–5, while technical or academic writing scores 6–8.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Reading time benchmarks:</strong> A 5-minute read is
                  approximately 1,000 words — a standard blog post. A 15-minute
                  read is around 3,000 words — a long-form article or feature.
                  An average conference talk is 3,000–4,000 words at 150 wpm
                  speaking pace. A typical university lecture runs 8,000–10,000
                  words at 120–150 wpm.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy, download, or clear your text",
              body: "Three action buttons sit above the editor. Copy Text copies the full contents of the editor to your clipboard — useful for quickly moving text to another application after editing. Download saves the content as a plain .txt file. Clear removes all text and resets all counters. The Copy and Download buttons are disabled when the editor is empty.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Editing workflow:</strong> The editor can be used as a
                  lightweight distraction-free writing environment. Type
                  directly, paste content to check lengths before submitting to
                  a platform with a character limit, or draft content and
                  download it as a backup. For long sessions, download
                  periodically — the tool does not auto-save if you close the
                  tab.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📱",
              title: "Social media copy",
              desc: "Check character counts against platform limits before posting — Twitter/X (280), LinkedIn posts (3,000), Instagram captions (2,200).",
            },
            {
              emoji: "🎓",
              title: "Academic assignments",
              desc: "Meet essay word count targets precisely — stay within the allowed range without guessing or relying on your word processor.",
            },
            {
              emoji: "🎤",
              title: "Speech and presentation prep",
              desc: "Use the speaking time estimate to write a script that fits your allotted slot — 5 minutes, 10 minutes, or a keynote address.",
            },
            {
              emoji: "📝",
              title: "SEO content planning",
              desc: "Check that blog posts and articles meet the recommended length for your target topic — typically 1,200–2,500 words for competitive searches.",
            },
            {
              emoji: "📧",
              title: "Email subject lines and copy",
              desc: "Keep subject lines under 50 characters for optimal open rates, and verify that preheader text stays within the 85–100 character preview window.",
            },
            {
              emoji: "🛒",
              title: "Product descriptions",
              desc: "Ensure product copy meets platform character limits for marketplaces like Amazon, eBay, and Shopify without truncation.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-xl font-bold mb-3">
            Real-time counting — no submit button needed
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            Every stat updates as you type. All processing runs locally in your
            browser — your text never leaves your device. No account, no rate
            limits, no word cap. Works offline once the page has loaded.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Text Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/word-frequency-counter",
                label: "Word Frequency Counter",
                desc: "See which words appear most often in your text with counts and percentages.",
              },
              {
                href: "/tools/readability-score-calculator",
                label: "Readability Score",
                desc: "Measure how easy your text is to read with Flesch-Kincaid and other scores.",
              },
              {
                href: "/tools/text-case-converter",
                label: "Text Case Converter",
                desc: "Convert text to uppercase, lowercase, camelCase, snake_case and 9 more formats.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
