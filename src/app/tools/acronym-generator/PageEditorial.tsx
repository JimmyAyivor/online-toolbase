"use client";
// src/app/tools/acronym-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/acronym-generator";
const TOOL_NAME = "Acronym Generator";

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
    "Free acronym generator — turn any phrase into an acronym instantly, 3 format styles, no signup",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is an acronym and how is it different from an abbreviation?",
    a: "An acronym is formed by taking the first letter of each word in a phrase and combining them into a string that represents the whole phrase — for example, NASA (National Aeronautics and Space Administration) or ASAP (As Soon As Possible). An abbreviation is any shortened form of a word or phrase, but it doesn't have to use initial letters: 'Dr.' for Doctor and 'etc.' for et cetera are abbreviations but not acronyms. The distinction that often matters in practice is pronounceability: a true acronym is typically pronounced as a word (NASA, NATO, RADAR), while an initialism is spoken as individual letters (FBI, CIA, UK). This generator creates initialisms and acronyms from any phrase — whether the result is pronounceable depends on the letters it produces.",
  },
  {
    q: "Should I include articles and prepositions in my phrase?",
    a: "It depends on the result you want. For most professional and formal acronyms, small words like 'a', 'an', 'the', 'of', 'and', 'for', and 'in' are omitted to produce a cleaner, more pronounceable result. Compare: 'Association of South East Asian Nations' → ASEAN (omitting 'of') versus ASEAAN (including 'of'). The tool processes every word you enter, so the simplest approach is to enter the phrase without articles and prepositions first, then compare to a version that includes them. In some cases — particularly if you're crafting an intentional acronym where you need a specific letter — including or excluding a small word is a useful creative tool.",
  },
  {
    q: "What is the D.O.T. style and when should I use it?",
    a: "The D.O.T. format places a period after each letter — for example, U.S.A., U.K., or N.A.T.O. This style was standard throughout most of the 20th century, especially in American English formal and academic writing. Many style guides (including the Chicago Manual of Style) have moved away from periods in acronyms over the past few decades, and modern usage typically omits them for well-known initialisms. However, the dotted format is still required or preferred in some institutional style guides, certain government documents, and academic citations for specific organisations. If you're writing for a specific publication or institution, check their style guide — some still mandate periods for geographic and political designations (U.S., U.N.) while omitting them elsewhere.",
  },
  {
    q: "Is there a limit to phrase length?",
    a: "There is no character or word limit. The tool processes your entire input and extracts the first letter of every word, regardless of how long the phrase is. Very long phrases will produce very long acronyms, which are rarely useful in practice — most effective acronyms are 2–7 letters. If your phrase produces a long result, try removing filler words (articles, prepositions, conjunctions) to shorten it, or consider restructuring the phrase so the key concept words come first and the result is more concise.",
  },
  {
    q: "What makes a good acronym?",
    a: "A good acronym has three qualities: memorability, pronounceability, and relevance. Memorability means the letter string is short enough to remember — ideally 3–6 letters. Pronounceability means it can be spoken as a word rather than spelled out letter by letter, which makes it far more likely to be adopted in speech and writing. Relevance means the letters actually stand for the key concepts in the phrase, not just filler words. Some organisations craft their name specifically to produce a good acronym — choosing words that spell something meaningful, related, or memorable. If the random result of your phrase doesn't meet these criteria, try reordering, synonymising, or trimming the phrase until the acronym works.",
  },
  {
    q: "Can I use this tool for branding and naming?",
    a: "Yes — the tool is widely used for brand and product naming, where the goal is to check whether a long company or product name produces a usable short form. Before committing to a brand name, it's worth checking: does the acronym produce any unintended words or associations in English or other relevant languages? Is the acronym already in use by a competitor, institution, or well-known entity? A quick acronym check early in a naming project can save significant time and potential embarrassment. The letter breakdown display is particularly useful for branding work, as it shows exactly which word each letter comes from — making it easy to evaluate which words are contributing most to the identity.",
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
          How to Use the Acronym Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter a phrase, choose a format style, and your acronym is generated
          live — with a letter-by-letter breakdown.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Type or paste your phrase",
              body: "Enter any multi-word phrase in the text area — a company name, project title, process name, or any expression you want to abbreviate. The acronym generates live as you type, with no button to press. Each word's first letter is extracted in order to form the result.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Phrase crafting tip:</strong> For best results, remove
                  articles and prepositions first (a, an, the, of, and, for, in)
                  — these add letters without adding meaning. 'Department of
                  Health and Social Care' → 'Department Health Social Care' →
                  DHSC is cleaner than DHASC. If the result doesn't work, try
                  reordering the key words or replacing a word with a synonym
                  that starts with a more useful letter.
                </div>
              ),
            },
            {
              n: 2,
              title: "Choose a format style",
              body: "Three styles are available. UPPERCASE is the standard format for most professional acronyms (NASA, ASAP, NATO). lowercase produces a down-cased version, useful for stylised brand names or informal shorthand. D.O.T. adds a period after each letter (U.S.A., U.K., N.A.T.O.) for formal documents or style guides that require it.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Style
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Example
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "UPPERCASE",
                          "ASAP",
                          "Standard professional & institutional use",
                        ],
                        [
                          "lowercase",
                          "asap",
                          "Brand names, informal shorthand, stylised logos",
                        ],
                        [
                          "D.O.T.",
                          "A.S.A.P.",
                          "Formal documents, certain academic & gov style guides",
                        ],
                      ].map(([s, e, u]) => (
                        <tr key={s} className="hover:bg-sky-50">
                          <td className="px-4 py-2 font-bold text-sky-700 text-xs">
                            {s}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs font-mono">
                            {e}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {u}
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
              title: "Review the letter breakdown",
              body: "The result panel shows your acronym in large text with a word-by-word breakdown below it — each contributing letter is highlighted in colour next to the rest of the word. This makes it easy to see which words are contributing which letters, and to identify which words you could change to get a different result. Three stats are shown: word count, acronym letter count, and phrase character count.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Iterating on the result:</strong> If the acronym
                  doesn't work — it spells something unintended, is hard to
                  pronounce, or is too long — use the breakdown to identify
                  which words are causing the problem. Replacing a word with a
                  synonym that starts with a better letter is usually the
                  fastest fix. For example, if your acronym spells something
                  inappropriate, swapping 'Support' for 'Assistance' changes the
                  S to an A.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy and use",
              body: "Click the Copy button in the result panel to copy the acronym to your clipboard instantly. Paste it into a document, presentation, message, or naming document. Use Reset to clear the input and start fresh with a new phrase.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Checking for conflicts:</strong> Before finalising an
                  acronym for a brand, project, or organisation, search for it
                  online to check whether it's already in use by a competitor,
                  government body, or well-known entity. A unique acronym is
                  worth more than a slightly better-sounding one that already
                  belongs to something else.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🏢",
              title: "Company & brand naming",
              desc: "Test whether a long company name produces a memorable, pronounceable acronym — and check for unintended associations before committing to a brand.",
            },
            {
              emoji: "📋",
              title: "Internal process names",
              desc: "Give internal processes, teams, frameworks, and workflows short handles that are easy to use in meetings, emails, and documentation.",
            },
            {
              emoji: "🎓",
              title: "Academic & research",
              desc: "Abbreviate study names, research programs, clinical trial names, and academic frameworks for use in papers and presentations.",
            },
            {
              emoji: "📣",
              title: "Marketing campaigns",
              desc: "Create catchy acronyms for campaign names, taglines, and framework names — short forms audiences can remember, repeat, and search for.",
            },
            {
              emoji: "🛠️",
              title: "Technical & software",
              desc: "Generate standard abbreviations for APIs, protocols, software modules, and technical specifications in documentation and code.",
            },
            {
              emoji: "✍️",
              title: "Writing & editing",
              desc: "Verify the correct acronym form for editorial consistency when writing articles, reports, and documentation — especially for first-use formatting.",
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

        <div className="bg-gradient-to-br from-sky-500 to-blue-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-xl font-bold mb-3">
            Pronounceability is the most important quality in an acronym
          </h3>
          <p className="text-sky-100 leading-relaxed max-w-xl mx-auto text-sm">
            Acronyms that can be spoken as a word (NASA, NATO, RADAR, ASAP) are
            adopted far more quickly and remembered far more easily than
            initialisms that are spelled out letter by letter (FBI, CIA, UK).
            When crafting a new acronym, aim for a vowel in the first few
            letters — it dramatically increases the chance of the result being
            pronounceable and therefore usable in everyday speech.
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
                desc: "Count words, characters, sentences, and paragraphs in real time with reading time estimates.",
              },
              {
                href: "/tools/text-repeater",
                label: "Text Repeater",
                desc: "Repeat any text multiple times with a custom separator — newline, comma, pipe, or your own.",
              },
              {
                href: "/tools/readability-score-calculator",
                label: "Readability Score Calculator",
                desc: "Get Flesch, Kincaid, Gunning Fog, and ARI readability scores for any text instantly.",
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
