"use client";
// src/app/tools/word-frequency-counter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/word-frequency-counter";
const TOOL_NAME = "Word Frequency Counter";

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
    "Free word frequency counter — analyse any text to see the most common words, counts, and percentages",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What does a word frequency counter actually measure?",
    a: "A word frequency counter reads through your text, splits it into individual words, and tallies how many times each unique word appears. The output shows each word alongside its raw count and its frequency as a percentage of all words analysed. For example, if your text contains 500 words and 'innovation' appears 10 times, its frequency is 10/500 = 2.00%. Frequency analysis is used in linguistics (corpus analysis), content strategy (keyword density), text mining, and natural language processing research.",
  },
  {
    q: "What are 'common words' and why would I filter them out?",
    a: "Common words — also called stop words, function words, or grammatical words — are the high-frequency words that hold sentences together grammatically but carry little semantic meaning on their own: 'the', 'and', 'of', 'to', 'a', 'in', 'is', 'it', 'for', 'not', and so on. Because these words appear in almost every English text, they dominate the frequency table and obscure the meaningful content words. Enabling the 'Ignore common words' filter removes over 100 of these function words, so the top results reflect the actual subjects and themes of your text rather than the grammatical scaffolding.",
  },
  {
    q: "What is a good keyword density for SEO content?",
    a: "Keyword density is the percentage of times a target keyword appears relative to the total word count. The commonly cited guideline is 1–3% for a primary keyword — high enough to signal relevance to search engines, low enough to read naturally. However, modern SEO is more nuanced: Google's algorithms evaluate topical relevance, semantic context, and natural language patterns rather than raw keyword counts. A density below 0.5% may indicate under-optimisation, while above 4–5% risks appearing keyword-stuffed, which can negatively impact rankings. Use the frequency counter to audit your content, but prioritise readability and natural language over hitting a specific percentage.",
  },
  {
    q: "How does the minimum word length filter work?",
    a: "The minimum length slider (1–10) filters out all words shorter than the selected value. At the default of 1, every word including single letters is counted. Setting it to 3 removes one and two-letter words ('a', 'an', 'to', 'of', 'is', etc.), which tend to be grammatical function words. Setting it to 5 or higher retains only longer, more content-rich words. The minimum length filter works independently from the common words filter — you can use either or both simultaneously. For most content analysis purposes, a minimum length of 3–4 combined with stop word filtering gives the clearest picture of your text's vocabulary.",
  },
  {
    q: "Can I use this to analyse keyword density in my blog posts or website copy?",
    a: "Yes — paste the full text of your page (excluding navigation, headers, and footer boilerplate) into the tool to see keyword distribution. Look at the top 20 words to understand how your copy is weighted. If your primary keyword is not appearing in the top results, you may want to include it more prominently. If it's appearing at very high frequency (above 4%), consider varying vocabulary with synonyms. You can also use the CSV export to import results into a spreadsheet for more detailed analysis — for example, to track keyword density changes between content drafts.",
  },
  {
    q: "What is the difference between 'total words' and 'unique words'?",
    a: "Total words is the count of every word token in your text, including repetitions. If you write 'the cat sat on the mat', total words = 6. Unique words counts how many distinct words appear — in that example, 'the' appears twice, so unique words = 5 ('the', 'cat', 'sat', 'on', 'mat'). The ratio of unique words to total words is called the type-token ratio (TTR) and is used as a measure of lexical diversity. A higher TTR indicates more varied vocabulary. Academic and literary writing typically has a higher TTR than repetitive marketing copy or transcribed speech.",
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
          How to Use the Word Frequency Counter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste your text, adjust the filters, and instantly see which words
          appear most often — with counts, percentages, and visual bars.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste or type your text",
              body: "Enter any text into the input area — an article, essay, blog post, book chapter, email, product description, or any other content. The analysis runs live as you type, with the word and character count updating below the box. There's no word limit — the tool handles entire documents without performance issues since all processing happens locally in your browser.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>What to paste:</strong> For SEO analysis, paste the
                  full visible body text of a page. For academic writing, paste
                  your essay or paper draft. For content strategy, paste a
                  competitor's article to see their most-used vocabulary. For
                  readability editing, paste repetitive copy to identify
                  overused words.
                </div>
              ),
            },
            {
              n: 2,
              title: "Adjust the filters to refine your results",
              body: "Use the filter panel to control what gets counted. The Minimum Word Length slider removes short words — set it to 3 or 4 to filter out most grammatical function words. The 'Ignore common words' checkbox removes 100+ English stop words including articles, prepositions, and conjunctions. The 'Show Top' slider controls how many words appear in the results table (10–100).",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Filter
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Default
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Min word length",
                          "1 character",
                          "Content analysis: set to 3–4",
                        ],
                        [
                          "Ignore common words",
                          "Off",
                          "SEO / topic analysis: turn on",
                        ],
                        [
                          "Case sensitive",
                          "Off",
                          "Proper noun tracking: turn on",
                        ],
                        [
                          "Sort by",
                          "Frequency",
                          "Alphabetical: for dictionary-style lists",
                        ],
                        [
                          "Show top",
                          "50 words",
                          "Increase to 100 for full vocabulary view",
                        ],
                      ].map(([f, d, b]) => (
                        <tr key={f} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-bold text-indigo-700 text-xs">
                            {f}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {d}
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
              title: "Read the statistics summary",
              body: "The statistics panel shows six metrics: total word count, unique word count, average word length, total characters, longest word, and shortest word. The ratio of unique to total words (the type-token ratio) is a useful indicator of vocabulary diversity — a higher ratio suggests more varied and less repetitive writing.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Type-token ratio:</strong> Divide unique words by
                  total words to get the TTR. A ratio above 0.5 indicates good
                  vocabulary variety. Below 0.3 suggests repetition — useful to
                  know when editing marketing copy or student essays that rely
                  too heavily on a small set of words.
                </div>
              ),
            },
            {
              n: 4,
              title: "Review the frequency table with visual bars",
              body: "The results table lists each word with its rank, count, percentage of total, and a proportional visual bar showing frequency relative to the most common word. Words are sorted by frequency by default (highest to lowest) — switch to alphabetical in the Sort By dropdown to scan for specific terms. The table scrolls if more than 20–30 results are shown.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Reading the percentage:</strong> The percentage shown
                  is the word's share of all counted words (after filters are
                  applied). A primary keyword at 2–3% for SEO content is
                  generally considered healthy. If your target keyword appears
                  below 0.5%, consider adding it more naturally throughout the
                  content.
                </div>
              ),
            },
            {
              n: 5,
              title: "Export to CSV for deeper analysis",
              body: "Click the Export CSV button to download the full word frequency list as a spreadsheet file. The CSV includes all words (not just the top N shown in the table) with their counts and percentages. Open it in Excel, Google Sheets, or any data analysis tool to create charts, filter by threshold, or compare vocabulary across multiple documents.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Comparison workflow:</strong> Export CSVs from two
                  different documents, then use a spreadsheet to find words that
                  appear in one but not the other. This is useful for comparing
                  your content against a competitor's, or tracking vocabulary
                  changes between two drafts of the same document.
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
              emoji: "🔍",
              title: "SEO keyword density audit",
              desc: "Check that your primary and secondary keywords appear at a healthy frequency in page copy before publishing.",
            },
            {
              emoji: "📚",
              title: "Academic writing analysis",
              desc: "Identify overused words in essays and dissertations, and find opportunities to vary vocabulary for stronger prose.",
            },
            {
              emoji: "📣",
              title: "Marketing copy review",
              desc: "Spot repetitive terms in ad copy, landing pages, and product descriptions — repeated words reduce impact.",
            },
            {
              emoji: "🧠",
              title: "Vocabulary research",
              desc: "Analyse texts in a genre or subject area to understand which domain-specific terms are most central.",
            },
            {
              emoji: "📰",
              title: "Competitor content analysis",
              desc: "Paste competitor articles to see their vocabulary patterns, topic coverage depth, and keyword priorities.",
            },
            {
              emoji: "📖",
              title: "Language learning",
              desc: "Analyse reading material in a foreign language to identify the highest-frequency words to study first.",
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

        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            Private by design — runs in your browser
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            All word counting and analysis happens locally using JavaScript —
            your text never leaves your device. No server, no storage, no
            account. Safe to use with unpublished drafts, confidential reports,
            and proprietary content.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Text Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Count words, characters, sentences, and reading time as you type.",
              },
              {
                href: "/tools/text-difference-checker",
                label: "Text Difference Checker",
                desc: "Compare two text versions side-by-side and highlight every change.",
              },
              {
                href: "/tools/keyword-density-checker",
                label: "Keyword Density Checker",
                desc: "Check the density of a specific target keyword in your text.",
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
