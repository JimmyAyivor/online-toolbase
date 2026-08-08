"use client";
// src/app/tools/paraphrasing-tool/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/paraphrasing-tool";
const TOOL_NAME = "Paraphrasing Tool";

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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-violet-100 shadow-inner mb-5">
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
    "Free paraphrasing tool — rewrite any text in 6 styles: Standard, Fluent, Formal, Simple, Creative, and Expand",
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
                <span className="text-violet-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is paraphrasing and how is it different from summarising?",
    a: "Paraphrasing means rewriting a passage in different words while keeping roughly the same length and preserving all the original ideas. The output expresses the same meaning using different vocabulary, sentence structure, and phrasing. Summarising, by contrast, condenses a longer piece into a shorter one — capturing only the most important points and discarding detail. A paraphrase of a 200-word paragraph is roughly 200 words long; a summary of the same paragraph might be 40–60 words. Paraphrasing is used to restate ideas in your own voice without changing the scope; summarising is used to extract the core argument from longer content. Both are legitimate writing techniques, but they serve different purposes and neither is a substitute for the other.",
  },
  {
    q: "What do the six paraphrasing modes do?",
    a: "Standard mode performs balanced synonym replacement and light sentence restructuring — the most general-purpose option for most use cases. Fluent mode prioritises natural-sounding output, favouring readable flow over strict structural changes. Formal mode expands contractions (don't → do not, won't → will not, can't → cannot) and substitutes formal vocabulary, making it suitable for professional documents, academic writing, and business communication. Simple mode reverses over-formal vocabulary substitutions, replacing words like 'demonstrate' back to 'show' to make the text more accessible to general audiences. Creative mode introduces varied synonyms and sentence reordering for a distinctive, less predictable style suited to marketing and social content. Expand mode adds elaborative phrases to short sentences to create more detailed, discursive text — useful when you need to reach a higher word count while maintaining coherence.",
  },
  {
    q: "Is paraphrasing plagiarism?",
    a: "Paraphrasing is not plagiarism if it is done correctly and with attribution. The key distinction is: a plagiarist copies ideas without acknowledgement; a writer who paraphrases restates ideas in their own words and cites the original source. In academic and journalistic contexts, paraphrasing with attribution is a standard and required practice — it is how you incorporate others' research and arguments without reproducing their exact wording. However, paraphrasing without attribution — presenting reworded ideas as if they were your own original thoughts — is still plagiarism even though the exact words differ. This tool is intended for legitimate uses: adapting your own text for different audiences, practising rewriting, and generating draft alternatives for review. Always check the context in which you plan to use paraphrased content.",
  },
  {
    q: "When should I choose Formal vs Simple mode?",
    a: "Choose Formal mode when the output is intended for an audience that expects professional, authoritative language — such as business reports, academic essays, cover letters, legal correspondence, technical documentation, and formal presentations. Formal mode expands contractions and promotes elevated vocabulary, which signals professionalism and precision. Choose Simple mode when the audience is a general public, non-specialist, or young readers who benefit from clear, direct language — such as consumer-facing web copy, help documentation, instructional content, and accessible communications. Simple mode reduces over-formal vocabulary so the text reads naturally to a wider audience. A useful test: if your intended reader would be confused by the word 'facilitate', use Simple mode; if 'do not' is more appropriate than 'don't', use Formal mode.",
  },
  {
    q: "How accurate is the paraphrasing output? Do I need to edit it?",
    a: "Yes — you should always review and edit paraphrasing tool output before using it. This tool performs rule-based synonym substitution and sentence restructuring, which produces useful first drafts but can occasionally result in awkward phrasing, inappropriate synonym choices, or sentences that lose subtle nuances of the original. The tool is best used as a starting point or inspiration generator — it handles the mechanical work of vocabulary variation so you can focus editorial attention on coherence and tone. Read the output critically, verify that the meaning is preserved, and adjust any phrases that do not fit your context. The Copy and Download buttons make it easy to paste the output into any editor for revision.",
  },
  {
    q: "Can I paraphrase content in a different language?",
    a: "This tool operates on English text only. The synonym vocabulary and mode-specific logic (contraction expansion in Formal mode, vocabulary simplification in Simple mode) are all calibrated for English grammar and usage patterns. Pasting text in other languages will produce unpredictable results because the synonym substitution and sentence restructuring rules do not account for the grammar, word order, or conjugation of other languages. For non-English paraphrasing, a language-specific tool or a multilingual AI writing assistant would be more appropriate.",
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
              <span className="text-violet-600 text-lg shrink-0">
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
          How to Use the Paraphrasing Tool
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste your text, pick a rewriting mode, and get a fresh version in
          seconds — with copy and download built in.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste your original text",
              body: "Copy and paste the text you want to rewrite into the Original Text input area. The word and character counts update live below the textarea. There is no text length limit displayed in the UI, but for best results keep individual batches to 500 words or fewer — processing shorter passages produces more coherent output since the synonym and restructuring rules operate at the sentence level.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>What works well:</strong> Paragraphs of body copy,
                  email drafts, product descriptions, and academic passages are
                  ideal inputs. The tool performs synonym substitution on
                  individual words, so text with rich vocabulary gives it more
                  to work with. Very short text (under 20 words) may produce
                  minimal changes.
                </div>
              ),
            },
            {
              n: 2,
              title: "Select a paraphrasing mode",
              body: "The six mode buttons on the right panel each produce a different kind of rewrite. Standard is the default balanced option. Fluent prioritises natural flow. Formal expands contractions and uses elevated vocabulary. Simple reduces complexity for accessibility. Creative adds stylistic variety. Expand adds elaborating phrases to build out thin content. The mode is applied on top of the base synonym substitution — try multiple modes on the same input to compare outputs.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Mode
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Standard",
                          "General-purpose rewrites, blog copy, any context",
                        ],
                        [
                          "Fluent",
                          "Readability-focused rewrites, conversational content",
                        ],
                        [
                          "Formal",
                          "Business reports, academic writing, cover letters",
                        ],
                        [
                          "Simple",
                          "Consumer copy, help docs, accessible communications",
                        ],
                        [
                          "Creative",
                          "Marketing, social media, brand voice content",
                        ],
                        [
                          "Expand",
                          "Padding short content, reaching a word count target",
                        ],
                      ].map(([m, b]) => (
                        <tr key={m} className="hover:bg-violet-50">
                          <td className="px-4 py-2 font-bold text-violet-700 text-xs">
                            {m}
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
              title: "Click Paraphrase Text",
              body: "Press the Paraphrase Text button to run the rewriter. A short processing animation plays while the tool applies synonym substitution and mode-specific restructuring. The result appears in the Paraphrased Text panel below the button along with output word and character counts for comparison with the original.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Comparing counts:</strong> In Standard, Fluent,
                  Formal, and Simple modes, the word count should stay close to
                  the original. In Expand mode, the word count will be higher —
                  short sentences gain elaborating clauses. In Simple mode, word
                  count may drop slightly if multi-word substitutions are
                  replaced by single shorter words.
                </div>
              ),
            },
            {
              n: 4,
              title: "Review, edit, copy, or download",
              body: "Always read the output before using it. Check that the meaning is preserved, that synonym choices fit your context, and that the tone matches your intended audience. Use the Copy button to send the text to your clipboard for pasting into any editor. Use the Download button to save as a .txt file. Use the Clear button to reset both input and output panels and start fresh with new text.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Iterating on output:</strong> If the first result
                  isn't quite right, click Paraphrase Text again without
                  changing the input — sentence restructuring uses randomness,
                  so a second pass may produce a different arrangement.
                  Switching modes between passes is also a fast way to explore a
                  range of stylistic options from the same source text.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📚",
              title: "Academic writing",
              desc: "Rephrase research and source material to integrate ideas in your own voice — always pair with proper citation to avoid plagiarism.",
            },
            {
              emoji: "✉️",
              title: "Business communication",
              desc: "Use Formal mode to convert informal draft emails and messages into polished professional correspondence.",
            },
            {
              emoji: "✍️",
              title: "Content creation",
              desc: "Generate alternative versions of blog posts, landing page copy, and article paragraphs when writing for multiple platforms or audiences.",
            },
            {
              emoji: "📱",
              title: "Social media copy",
              desc: "Use Creative mode to create fresh, varied versions of the same core message for different social platforms and post formats.",
            },
            {
              emoji: "🎯",
              title: "Accessibility rewrites",
              desc: "Use Simple mode to convert complex, technical, or jargon-heavy text into clear, accessible language for general audiences.",
            },
            {
              emoji: "📋",
              title: "Avoiding repetition",
              desc: "When writing long-form content, paraphrase repeated ideas to maintain freshness and prevent the text from sounding formulaic.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-violet-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">✍️</div>
          <h3 className="text-xl font-bold mb-3">
            Always review paraphrased output
          </h3>
          <p className="text-violet-100 leading-relaxed max-w-xl mx-auto text-sm">
            Rule-based paraphrasing tools produce useful first drafts, but
            synonym substitution and sentence restructuring can occasionally
            introduce awkward phrasing or lose subtle meaning. Treat the output
            as a starting point — read it critically, verify the meaning is
            intact, and edit freely before publishing or submitting.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Writing Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/grammar-spell-checker",
                label: "Grammar & Spell Checker",
                desc: "Automatically detect and correct grammar and spelling errors in your writing.",
              },
              {
                href: "/tools/plagiarism-checker",
                label: "Plagiarism Checker",
                desc: "Check your text for duplicate content and potential plagiarism issues.",
              },
              {
                href: "/tools/reading-time-estimator",
                label: "Reading Time Estimator",
                desc: "Estimate how long any text takes to read at your chosen reading speed.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-violet-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
