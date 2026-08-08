"use client";
// src/app/tools/text-summarizer/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/text-summarizer";
const TOOL_NAME = "Text Summarizer";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e1b4b", light: "#eef2ff" },
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
    "Free text summarizer — condense any article or document into key points with an adjustable length ratio",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How does extractive text summarisation work?",
    a: "Extractive summarisation works by scoring each sentence in the original text based on the importance of the words it contains, then selecting the highest-scoring sentences to form the summary. This tool scores sentences using term frequency: it counts how often each non-trivial word appears across the full document (ignoring common stop words like 'the', 'and', 'is'), then scores each sentence by the average frequency of its words. The top-scoring sentences — up to the number set by your length ratio — are extracted and re-ordered to match their original sequence in the document. The result is a coherent excerpt formed entirely from the original text, not a paraphrase. This approach is effective for factual content like news articles, reports, and academic papers, but less suitable for narrative or creative writing where meaning is distributed across many sentences.",
  },
  {
    q: "What is the difference between extractive and abstractive summarisation?",
    a: "Extractive summarisation (what this tool does) selects and stitches together the most important sentences from the original text without changing the wording. The summary is a subset of the original. Abstractive summarisation generates new sentences that paraphrase and condense the original ideas — similar to how a human would write a summary from scratch. Abstractive summaries can be more fluent and concise, but require advanced natural language generation models (such as transformer-based AI) to produce reliably. Extractive summarisation is simpler to implement, fully deterministic, and runs entirely in the browser without sending your text to any server — making it suitable for sensitive documents. For most factual content, extractive summaries are accurate and useful. For very long documents or complex arguments, abstractive AI tools may produce better results.",
  },
  {
    q: "What does the Summary Length percentage control?",
    a: "The Summary Length slider (10%–70%) controls what fraction of the original sentences are included in the summary. At 30% (the default), the tool keeps roughly the top 30% of sentences by word-importance score. At 10%, you get a very tight summary — only the most content-dense sentences. At 70%, the summary is nearly as long as the original but with the least-relevant sentences removed. The tool enforces a minimum of 2 sentences regardless of the ratio, so very short texts will always produce at least a 2-sentence output. A useful starting point: use 20–30% for long articles (500+ words), 40–50% for medium documents, and 60–70% for short paragraphs where you want only minor condensation.",
  },
  {
    q: "What types of text work best with this tool?",
    a: "The tool works best with well-structured factual prose — news articles, academic papers, research reports, business documents, encyclopaedia entries, and technical documentation. These text types have clear sentences where each one carries identifiable information density, making frequency-based sentence scoring reliable. The tool performs less well on: conversational or spoken transcripts (fragmented sentences reduce scoring accuracy), narrative fiction (meaning is distributed across many sentences with low repeated-word frequency), poetry and creative writing (structure breaks sentence detection), bullet-point lists without prose context, and texts under 150 words (too few sentences to meaningfully rank). For best results, paste at least 150 words of prose with complete sentences and standard punctuation.",
  },
  {
    q: "Does this tool store or share my text?",
    a: "No. All processing runs entirely in your browser using JavaScript. Your text is never sent to a server, stored in a database, or shared with any third party. The moment you close or refresh the page, the text is gone. This makes the tool suitable for summarising documents that contain personal, confidential, or commercially sensitive information — since the content never leaves your device. The only external resource loaded when you use this page is standard advertising (AdSense), which does not receive your document content.",
  },
  {
    q: "Why does my summary sometimes seem to miss the main point?",
    a: "Frequency-based extractive summarisation ranks sentences by how often their words appear across the full document. This works well when the key topic is mentioned repeatedly — a common pattern in informational and journalistic text. It can underperform when: the main argument or conclusion appears only once (high-importance ideas expressed in unique vocabulary score lower than frequently repeated supporting details); the document uses technical vocabulary where many important words appear only once; or the document is very short (under 150 words), leaving too few sentences to meaningfully rank. If the summary misses key content, try increasing the length ratio to include more sentences, or manually identify the most important paragraphs and paste them individually.",
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
          How to Use the Text Summarizer
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste your text, set the summary length, and get an extractive summary
          in seconds — with word count, compression ratio, and one-click copy.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste your text",
              body: "Copy and paste the article, essay, report, or document you want to summarise into the input area. The word and character counts update live below the textarea. For best results, use at least 150 words of well-structured prose with complete sentences — the tool works by scoring and selecting sentences, so it needs enough sentences to meaningfully rank.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>What to paste:</strong> News articles, research
                  papers, business reports, academic essays, and Wikipedia-style
                  entries work well. Transcripts, bullet-point lists, and
                  creative fiction produce less accurate results because
                  sentence scoring relies on word repetition patterns found in
                  factual informational text.
                </div>
              ),
            },
            {
              n: 2,
              title: "Set the summary length",
              body: "Drag the Summary Length slider between 10% and 70% to control how much of the original text is retained. The percentage represents the fraction of sentences kept. Lower values produce tighter, more condensed summaries; higher values keep more sentences for a more detailed output. The Compression stat in the results panel shows the actual ratio of summary words to original words.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Length %
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "10–20%",
                          "Long articles (1,000+ words) — tight executive summary",
                        ],
                        [
                          "25–35%",
                          "Medium articles (400–1,000 words) — balanced condensation",
                        ],
                        [
                          "40–55%",
                          "Short documents (150–400 words) — light editing pass",
                        ],
                        [
                          "60–70%",
                          "Very short text — minimal condensation, remove weakest sentences",
                        ],
                      ].map(([p, b]) => (
                        <tr key={p} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-bold text-indigo-700 text-xs">
                            {p}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
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
              title: "Click Summarize Text",
              body: "Press the Summarize Text button to run the extractive summariser. The results panel appears below the button showing three stats — Summary Words, Original Words, and the Compression percentage — followed by the summary text. The summary sentences are displayed in their original document order for coherence.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Understanding Compression:</strong> A compression of
                  30% means the summary is 30% the length of the original —
                  roughly a 3× reduction. A compression of 50% is a 2×
                  reduction. For a quick reference card or executive summary,
                  aim for 20–30% compression. For a detailed précis that
                  preserves most arguments, 50–60% is appropriate.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy the summary and reset",
              body: "Use the Copy button to send the summary to your clipboard for pasting into any document or editor. Use Reset All to clear both the input and output and start fresh with new text. If the summary doesn't capture the most important content, adjust the length ratio up slightly and run again — a higher percentage includes more sentences and reduces the chance of important points being excluded.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Iterating:</strong> Try the same text at 20%, 30%, and
                  40% and compare the three summaries. Because sentence
                  selection is deterministic (not random), the only way to get
                  different output is to change the ratio — each run at the same
                  percentage will produce identical results from the same input
                  text.
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
              emoji: "📰",
              title: "News article digests",
              desc: "Quickly extract the key facts from long news articles to get the core story without reading the full piece.",
            },
            {
              emoji: "📚",
              title: "Research and academic reading",
              desc: "Summarise research papers and academic texts to assess relevance before committing to a full read.",
            },
            {
              emoji: "📋",
              title: "Business reports",
              desc: "Condense lengthy internal reports, strategy documents, and briefing notes into concise executive summaries.",
            },
            {
              emoji: "✉️",
              title: "Email and message digests",
              desc: "Paste long email threads or meeting notes and extract the key action points and decisions.",
            },
            {
              emoji: "🎓",
              title: "Study aids",
              desc: "Summarise textbook chapters and lecture notes for revision — the extracted sentences highlight the most content-dense passages.",
            },
            {
              emoji: "🔍",
              title: "Content research",
              desc: "Rapidly summarise multiple sources during research to identify which articles are worth reading in full.",
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

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            Your text never leaves your browser
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            All summarisation runs locally in JavaScript — no text is sent to a
            server, stored in a database, or shared with any third party. This
            makes the tool safe for summarising confidential business documents,
            personal notes, and sensitive research material.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Writing Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/reading-time-estimator",
                label: "Reading Time Estimator",
                desc: "Estimate how long any text takes to read at your chosen reading speed.",
              },
              {
                href: "/tools/word-character-counter",
                label: "Word & Character Counter",
                desc: "Count words, characters, sentences, and paragraphs with reading time estimates.",
              },
              {
                href: "/tools/paraphrasing-tool",
                label: "Paraphrasing Tool",
                desc: "Rewrite any text in 6 styles — Standard, Fluent, Formal, Simple, Creative, Expand.",
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
