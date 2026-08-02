"use client";
// src/app/tools/grammar-spell-checker/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/grammar-spell-checker";
const TOOL_NAME = "Grammar & Spell Checker";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#14532d", light: "#f0fdf4" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-green-100 shadow-inner mb-5">
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
    "Free AI grammar & spell checker — fix grammar, spelling, punctuation and style instantly",
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
                <span className="text-green-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What types of errors does the grammar checker find?",
    a: "The tool identifies four categories of writing issues. Grammar errors include subject-verb disagreement, incorrect tense usage, misplaced modifiers, sentence fragments, and run-on sentences. Spelling errors catch misspelled words, homophones used incorrectly (their/there/they're, your/you're), and typos. Punctuation issues cover missing or misplaced commas, incorrect apostrophe usage, missing full stops, and overuse of exclamation marks. Style suggestions flag passive voice, wordiness, repetitive vocabulary, and overly long or complex sentences.",
  },
  {
    q: "How accurate is the AI grammar checker compared to tools like Grammarly?",
    a: "The tool uses the same underlying Claude AI model that powers many professional writing tools, so accuracy is generally high for common grammar and spelling errors. For standard writing — emails, essays, articles, reports — it will catch the vast majority of errors. Grammarly and similar tools have advantages in real-time checking, browser integration, and large proprietary training datasets built specifically for grammar detection. This tool's advantage is that it also suggests style improvements and produces a fully corrected version of your entire text in one pass, without requiring an account or browser extension.",
  },
  {
    q: "What does the writing score mean?",
    a: "The writing score (0–100) reflects the overall quality of your text based on the number and severity of errors found relative to the length of the text. A score of 90–100 indicates excellent writing with minimal or no errors. 70–89 indicates good writing with a few correctable issues — typical of first-draft professional writing. Below 70 indicates significant issues that should be addressed before the text is published or submitted. The score is a relative guide, not an absolute standard — a highly technical document may score lower than a simple email even if both are well-written.",
  },
  {
    q: "Can I use this for academic essays and assignments?",
    a: "Yes — the grammar checker is well-suited for academic writing. It identifies the types of errors most commonly flagged by academic markers: subject-verb disagreement, incorrect tense, comma splices, apostrophe errors, and unclear sentence structure. However, a few caveats apply: the tool does not check citation formatting (APA, MLA, Chicago), does not verify factual accuracy, and its style suggestions reflect general professional writing rather than the specific conventions of every academic discipline. Always apply your own judgement and review corrections in context before accepting them.",
  },
  {
    q: "Is my text kept private when I use this tool?",
    a: "Your text is sent to the Anthropic Claude API for analysis and a corrected response is returned. The text passes through the API's infrastructure during processing. It is not stored on this website's servers. If your text contains sensitive personal information, confidential business content, or unpublished creative work you want to protect, consider using a local grammar tool instead. For everyday writing — emails, blog posts, student essays, and general content — the privacy trade-off is comparable to any other AI-powered writing assistant.",
  },
  {
    q: "Why does the corrected text sometimes change meaning slightly?",
    a: "AI grammar correction can occasionally make changes that alter nuance, especially when the original phrasing is unconventional but intentional — for example, sentence fragments used for stylistic effect, deliberate repetition for emphasis, or dialect-specific expressions. Always read the corrected text carefully before using it. Accept corrections that fix clear errors, but override suggestions that change your intended meaning or voice. The tool is an assistant, not an authority — you always have final editorial control.",
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
              aria-expanded={open === i}            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-green-600 text-lg shrink-0">
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
          How to Use the Grammar &amp; Spell Checker
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste your text, click check, and get a writing score, a list of
          issues, and a fully corrected version — in seconds.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste or type your text",
              body: "Copy and paste your text into the input area — or type directly. There's no word limit. The tool works best with complete sentences and paragraphs rather than isolated words or headings, as context is important for accurate grammar analysis.",
              enrich: (
                <div className="bg-green-50 rounded-xl px-5 py-4 text-sm text-green-800 leading-relaxed">
                  <strong>What to check:</strong> Essays, emails, cover letters,
                  blog drafts, product descriptions, social media captions,
                  academic assignments, business reports — any written text
                  benefits from a grammar check before it's published or sent.
                </div>
              ),
            },
            {
              n: 2,
              title: "Click 'Check Grammar & Spelling'",
              body: "Hit the button and the AI analyses your entire text at once — grammar, spelling, punctuation, and style. Unlike real-time checkers that flag words as you type, this tool reviews the complete text in context, which improves accuracy for complex grammar rules like subject-verb agreement and tense consistency.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Processing note:</strong> Analysis typically takes
                  5–10 seconds. The AI reads the full text before returning
                  results, so keep the tab active while it processes.
                </div>
              ),
            },
            {
              n: 3,
              title: "Review your writing score",
              body: "The score (0–100) gives an at-a-glance quality rating. Below the score, colour-coded pills show how many issues were found in each category — grammar, spelling, punctuation, and style. A high score with zero issues means your text is clean and ready to publish.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Score
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Category
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Typical cause
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "90–100",
                          "Excellent",
                          "Minimal or no errors — ready to publish",
                        ],
                        [
                          "70–89",
                          "Good",
                          "Small number of fixable issues — typical first draft",
                        ],
                        [
                          "50–69",
                          "Needs work",
                          "Multiple errors — review all corrections carefully",
                        ],
                        [
                          "0–49",
                          "Significant issues",
                          "High error density — consider a full rewrite",
                        ],
                      ].map(([s, c, t]) => (
                        <tr key={s} className="hover:bg-green-50">
                          <td className="px-4 py-2 font-bold text-green-700">
                            {s}
                          </td>
                          <td className="px-4 py-2 text-gray-700">{c}</td>
                          <td className="px-4 py-2 text-gray-500">{t}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Work through the issues list",
              body: "Each issue card shows the original problematic text (in red, struck through), the suggested correction (in green), and a plain-English explanation of why the change was made. Read each explanation before accepting — some corrections may not suit your intended style or tone.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Issue types colour guide:</strong> Red = grammar ·
                  Orange = spelling · Blue = punctuation · Purple = style.
                  Grammar and spelling issues should almost always be fixed.
                  Style suggestions are advisory — accept them if they improve
                  clarity, skip them if they change your intended voice.
                </div>
              ),
            },
            {
              n: 5,
              title: "Copy the corrected text",
              body: "The corrected text panel shows your full text with all issues fixed. Use the Copy button to copy it to your clipboard, then paste it wherever you need it — your email client, word processor, CMS, or social media platform. If you want to make further edits, paste the corrected text back into the tool and run another check.",
              enrich: (
                <div className="bg-green-50 rounded-xl px-5 py-4 text-sm text-green-800 leading-relaxed">
                  <strong>Iterative checking:</strong> For complex documents,
                  run the checker twice. The first pass fixes obvious errors;
                  the second pass catches issues that become visible only after
                  initial corrections improve readability and context.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📧",
              title: "Professional emails",
              desc: "Check emails before sending to clients, managers, or partners — a grammar error in a business email undermines credibility.",
            },
            {
              emoji: "🎓",
              title: "Academic essays",
              desc: "Catch grammar and punctuation errors in essays, dissertations, and assignments before submission.",
            },
            {
              emoji: "📝",
              title: "Cover letters",
              desc: "Cover letters are read carefully — eliminate errors that could cost you an interview.",
            },
            {
              emoji: "✍️",
              title: "Blog posts and articles",
              desc: "Polish first drafts before publishing — improve readability and catch typos that slip through normal proofreading.",
            },
            {
              emoji: "📱",
              title: "Social media captions",
              desc: "Check longer captions and LinkedIn posts for embarrassing grammar mistakes before publishing to a public audience.",
            },
            {
              emoji: "🛒",
              title: "Product descriptions",
              desc: "Ensure ecommerce copy and marketing materials are error-free — errors reduce buyer trust and conversion rates.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-green-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">✏️</div>
          <h3 className="text-xl font-bold mb-3">
            AI assistance, human judgement
          </h3>
          <p className="text-green-100 leading-relaxed max-w-xl mx-auto text-sm">
            This tool uses AI to identify issues and suggest corrections, but
            you always have final editorial control. Some style suggestions may
            not suit your voice or genre — accept corrections that improve
            clarity and fix genuine errors, but override anything that changes
            your intended meaning.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Writing Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/plagiarism-checker",
                label: "Plagiarism Checker",
                desc: "Check your text against live web sources for duplicate content.",
              },
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Count words, characters, sentences, and reading time as you type.",
              },
              {
                href: "/tools/readability-score-calculator",
                label: "Readability Score",
                desc: "Measure how easy your text is to read with Flesch-Kincaid scores.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-green-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
