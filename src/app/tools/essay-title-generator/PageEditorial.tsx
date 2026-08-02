"use client";
// src/app/tools/essay-title-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/essay-title-generator";
const TOOL_NAME = "Essay Title Generator";

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
    "Free essay title generator — generate 10 compelling title ideas for essays, research papers, blog posts, and reports instantly",
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
    q: "How does the title generator work?",
    a: "The generator applies your topic keyword to a library of 20 proven title templates — structural formulas like '[Topic]: A Critical Analysis', 'The Future of [Topic]', and 'Why [Topic] Matters More Than Ever' — and combines them with mode-specific prefixes appropriate to your chosen writing type. Each click of Generate or Regenerate randomly selects and shuffles 10 titles from the combined pool, so every generation produces a different mix. The keyword you enter is capitalised and inserted into each template at the placeholder position. If no keyword is entered, 'Your Topic' is used as a fallback.",
  },
  {
    q: "What is the difference between the four writing type modes?",
    a: "The four modes add different prefix styles on top of the shared title templates. Essay mode uses the templates without additional prefixes, producing general-purpose academic and analytical titles. Research Paper mode adds formal academic prefixes such as 'An Empirical Study of', 'A Systematic Review of', and 'Investigating' — these signal the scholarly, evidence-based nature of research writing. Blog Post mode adds engagement-focused prefixes like 'Why', 'How to Master', and 'The Ultimate Guide to', which are optimised for click-through and search intent. Report mode adds professional prefixes like 'Executive Summary:', 'Industry Analysis:', and 'A Comprehensive Report on', which suit business and corporate writing contexts.",
  },
  {
    q: "How do I write a good essay title?",
    a: "A strong essay title does three things: it accurately describes the content, it signals the approach or angle (analytical, argumentative, descriptive), and it engages the reader. For academic essays, the most effective format is a two-part title separated by a colon — a memorable phrase or question before the colon, and a precise descriptive subtitle after it. For example: 'The Weight of Words: How Social Media Language Shapes Political Opinion'. The first part creates interest; the second delivers clarity. For blog posts, leading with a number ('7 Ways to...'), a 'How' or 'Why' question, or a direct promise ('The Complete Guide to...') tends to drive higher click-through rates. Avoid vague titles like 'An Essay on Climate Change' — be specific about what angle you're taking.",
  },
  {
    q: "Can I use the generated titles directly?",
    a: "Yes — the titles are written to be usable as-is, or as starting points you edit to fit your specific angle. Many users pick the closest matching title and personalise it: adjusting the keyword to be more specific, adding a colon subtitle, changing a word or two for tone, or combining elements of two generated titles. The most effective use of the tool is as a brainstorming aid — it quickly generates 10 candidate structures so you can identify which title direction feels right for your content, then refine that direction. Click Regenerate multiple times to see a wide variety of structural approaches before settling on one.",
  },
  {
    q: "What makes a research paper title different from a blog post title?",
    a: "Research paper titles follow academic conventions: they are typically longer, more precise, and often include technical terminology. They signal methodology (empirical study, systematic review, meta-analysis), scope (global, longitudinal, cross-sectional), and the specific population or context studied. They rarely use rhetorical questions or engagement-bait phrasing. Blog post titles, by contrast, are optimised for search intent and emotional resonance — they are typically shorter, use second-person ('you'), include numbers, and promise a direct benefit or answer. The same topic produces very different effective titles depending on the format: a research paper on exercise and cognition might be titled 'A Systematic Review of Aerobic Exercise Interventions and Cognitive Function in Adults Aged 40–70'; a blog post on the same topic might be titled 'Why 30 Minutes of Exercise a Week Improves Your Memory, According to Science'.",
  },
  {
    q: "Should I use a question as my essay title?",
    a: "Question titles can be effective, especially for argumentative and persuasive essays — they signal that the paper will take a position in response to a debated issue. For example: 'Is Social Media Making Us More Isolated?' or 'Should Governments Regulate Artificial Intelligence?'. However, question titles work better in some contexts than others. In academic writing, many style guides and instructors prefer statement titles over question titles, arguing that a well-framed statement is more precise about the paper's conclusion. In blog posts and opinion writing, question titles drive curiosity and click-through. If you're writing for a specific institution or publication, check their guidelines — some explicitly advise against question titles in formal academic work.",
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
          How to Use the Essay Title Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter a topic, choose a writing mode, and generate 10 title ideas —
          regenerate as many times as you like for variety.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your topic or keyword",
              body: "Type your essay topic, subject area, or main keyword into the input field. Be as specific as possible — 'climate change in coastal cities' produces more targeted and useful titles than just 'climate change'. You can also press Enter to trigger generation without clicking the button. If you leave the field blank, the generator uses 'Your Topic' as a placeholder so you can see the title structures before committing to a keyword.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Specificity tip:</strong> The more specific your
                  keyword, the more useful the generated titles. Compare: 'The
                  Impact of Artificial Intelligence on Modern Society' (broad)
                  vs 'The Impact of Artificial Intelligence in Emergency Medical
                  Diagnosis on Modern Society' (specific). Specific titles
                  signal a tighter scope to readers and examiners — and are
                  harder to write a vague, undirected essay about.
                </div>
              ),
            },
            {
              n: 2,
              title: "Choose your writing type",
              body: "Select from four modes: Essay (general academic titles), Research Paper (adds formal academic prefixes like 'A Systematic Review of' and 'An Empirical Study of'), Blog Post (adds engagement prefixes like 'The Ultimate Guide to' and 'Why'), or Report (adds professional prefixes like 'Executive Summary:' and 'Industry Analysis:'). The mode shapes the register and audience expectation of the generated titles.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Mode
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Register
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Example prefix
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["Essay", "Academic / analytical", "—"],
                        [
                          "Research Paper",
                          "Scholarly / formal",
                          "A Systematic Review of",
                        ],
                        [
                          "Blog Post",
                          "Engaging / web",
                          "The Ultimate Guide to",
                        ],
                        [
                          "Report",
                          "Professional / business",
                          "Executive Summary:",
                        ],
                      ].map(([m, r, e]) => (
                        <tr key={m} className="hover:bg-violet-50">
                          <td className="px-4 py-2 font-bold text-violet-700 text-xs">
                            {m}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {r}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs italic">
                            {e}
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
              title: "Click Generate Titles",
              body: "Press the Generate Titles button (or Enter in the input field) to produce a list of 10 title ideas. The results appear in a numbered table with a Copy button on each row. Each generated set is randomised — the same topic and mode will produce a different selection each time. Click the Regenerate link above the results table to get a fresh batch without re-entering your topic.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Getting variety:</strong> Click Regenerate 3–5 times
                  on the same topic to see the full range of structural patterns
                  available. Some runs will surface 'The Pros and Cons of...' or
                  'Myths vs. Reality' formats; others will surface 'In the 21st
                  Century' or 'Lessons Learned and the Road Ahead'. You're
                  looking for the structure that best matches your intended
                  argument — not necessarily the most dramatic-sounding title.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy and refine your title",
              body: "Click the Copy button on any row to copy that title to your clipboard. Use it as-is or as a starting point — most writers pick the closest structural match and personalise it by tightening the keyword, adding a colon subtitle, or adjusting a word for tone. Click Reset to clear the input and start fresh with a new topic.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Combining titles:</strong> Two generated titles can
                  often be merged into something stronger. For example, 'The
                  Future of [Topic]: Trends and Predictions' + '[Topic]: A
                  Critical Analysis' → '[Topic]: A Critical Analysis of Emerging
                  Trends and Future Predictions'. The colon structure is
                  especially flexible for combining a strong phrase with a
                  precise subtitle.
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
              emoji: "🎓",
              title: "Academic essays",
              desc: "Quickly generate title ideas for undergraduate and postgraduate essays to break the blank-page block and identify the best structural approach.",
            },
            {
              emoji: "🔬",
              title: "Research papers",
              desc: "Use Research Paper mode to generate formally structured titles with academic prefixes that match the conventions of scholarly publishing.",
            },
            {
              emoji: "✍️",
              title: "Blog writing",
              desc: "Use Blog Post mode to generate SEO-friendly, engagement-optimised title structures for your content calendar.",
            },
            {
              emoji: "📊",
              title: "Business reports",
              desc: "Use Report mode to generate professionally prefixed titles for internal reports, white papers, and industry analyses.",
            },
            {
              emoji: "💡",
              title: "Overcoming writer's block",
              desc: "When you have a topic but can't settle on a framing, generate 30–50 titles across multiple modes to identify which angle resonates.",
            },
            {
              emoji: "📚",
              title: "Teaching and assignments",
              desc: "Educators can use the generator to produce example title sets for student practice in identifying strong vs weak academic titles.",
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
          <div className="text-3xl mb-3">✏️</div>
          <h3 className="text-xl font-bold mb-3">
            The colon format is the strongest academic title structure
          </h3>
          <p className="text-violet-100 leading-relaxed max-w-xl mx-auto text-sm">
            Research on academic title effectiveness consistently finds that
            two-part titles using a colon — a memorable phrase before the colon,
            a precise descriptive subtitle after — are the most widely cited and
            best remembered. They balance interest with clarity, and give
            readers an immediate sense of both the hook and the scope of the
            work.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Writing Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/paraphrasing-tool",
                label: "Paraphrasing Tool",
                desc: "Rewrite any text in 6 styles — Standard, Fluent, Formal, Simple, Creative, Expand.",
              },
              {
                href: "/tools/lorem-ipsum-generator",
                label: "Lorem Ipsum Generator",
                desc: "Generate placeholder text in paragraphs, sentences, words, or lists.",
              },
              {
                href: "/tools/grammar-spell-checker",
                label: "Grammar & Spell Checker",
                desc: "Detect and correct grammar and spelling errors in your writing.",
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
