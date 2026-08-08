"use client";
// src/app/tools/text-difference-checker/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/text-difference-checker";
const TOOL_NAME = "Text Difference Checker";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#134e4a", light: "#f0fdfa" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-teal-100 shadow-inner mb-5">
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
    "Free text difference checker — compare two texts and highlight every addition, removal, and modification instantly",
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
                <span className="text-teal-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How does the text difference checker determine what has changed?",
    a: "The tool compares your two texts line by line. For each line number, it checks whether the line in the original matches the corresponding line in the modified version exactly. If they match, the line is marked unchanged. If the original has a line but the modified version has a different line at the same position, it's marked as modified (shown in amber). If the modified version has a line where the original has nothing (because the modified text is longer), it's marked as added (green). If the original has a line where the modified text has nothing, it's marked as removed (red). This line-based approach is the same algorithm used in Unix diff utilities and most code review systems.",
  },
  {
    q: "What is the difference between Side by Side view and Unified view?",
    a: "Side by Side view shows your original and modified text in two parallel columns. Each line is highlighted according to its change type, and you can scroll both columns simultaneously to scan for differences. This view is best for comparing documents where you need to read both versions in context — for example, comparing two drafts of a report or two versions of a contract. Unified view shows a single scrollable stream with − markers for removed lines and + markers for added lines, similar to the output of the git diff command in version control. This view is more compact and is preferred by developers reviewing code changes.",
  },
  {
    q: "What does the similarity percentage mean?",
    a: "The similarity score is calculated as the percentage of lines that are identical between the two texts. For example, if you have 10 lines and 8 are unchanged, the similarity is 80%. A score of 100% means the texts are identical. A score of 0% means no lines match at all. The score gives a quick at-a-glance quality metric — for content editing, a similarity of 85–95% typically indicates a light revision, while 50–70% suggests substantial rewrites. Note that the score is based on exact line matching — a line with a single changed word counts as a modified line rather than a partial match.",
  },
  {
    q: "Can I use this to compare code files?",
    a: "Yes — the tool works well for comparing code, configuration files, SQL queries, JSON, YAML, and other structured text. The monospace font in the input and output areas is specifically chosen to make code easier to read. The line-by-line comparison approach matches how professional diff tools like git diff, Meld, and Beyond Compare work. For large files with hundreds of lines, paste the full content and use the scrollable output area. One limitation: the tool does not collapse or hide unchanged lines (a feature called context collapsing in some diff tools), so very long files with minor changes will require scrolling to find the differences.",
  },
  {
    q: "Is my text kept private when I use this tool?",
    a: "Yes — all comparison logic runs entirely in your browser using JavaScript. Your text is never sent to a server or stored anywhere. The tool performs the diff calculation locally on your device, which is also why it's instant — there's no network request involved. This makes it safe to use with confidential content: internal documents, proprietary code, sensitive communications, or unpublished drafts. Unlike some online diff tools that require you to upload files to a server, this tool processes everything client-side.",
  },
  {
    q: "What happens when the two texts have different numbers of lines?",
    a: "When the texts have different line counts, the shorter text is effectively padded with empty lines to match the length of the longer text. Lines that exist in the modified text but not the original (because the modified text is longer) are marked as added. Lines that exist in the original but not the modified text (because the original is longer) are marked as removed. This means that a block of new paragraphs added in the middle of a document will appear as a mix of modified and added lines rather than purely added lines — the tool compares line by line positionally rather than using a full LCS (longest common subsequence) algorithm.",
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
              <span className="text-teal-600 text-lg shrink-0">
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
          How to Use the Text Difference Checker
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste two text blocks, pick your view, and get a line-by-line diff
          with colour-coded additions, removals, and modifications — instantly.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste your original text into the left box",
              body: "Enter or paste the older, original version of your text into the left input labelled 'Original text'. This could be the first draft of a document, the previous version of a configuration file, the old content of a web page, or any other text you want to use as a baseline for comparison. The counter below the box shows the current line and character count.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>What counts as 'original'?</strong> The original is
                  whichever version came first — the earlier draft, the previous
                  commit, the before state. If you're not sure which is which,
                  it doesn't matter much — you can always click Swap to reverse
                  the comparison direction.
                </div>
              ),
            },
            {
              n: 2,
              title: "Paste your modified text into the right box",
              body: "Enter or paste the newer, updated version of your text into the right input labelled 'Modified text'. The comparison runs live — results appear immediately as you type or paste, with no submit button required. Both text areas support any length of text, including multi-paragraph documents and multi-hundred-line code files.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Live comparison:</strong> The diff recalculates every
                  time either text area changes. If you're making edits, the
                  output panel updates in real time so you can see which lines
                  are still different as you work through revisions.
                </div>
              ),
            },
            {
              n: 3,
              title: "Choose Side by Side or Unified view",
              body: "Side by Side shows your two texts in parallel columns with colour-coded line highlighting — ideal for reading documents in context. Unified view shows a single scrollable diff stream with − and + markers, matching the output format of git diff — preferred by developers reviewing code changes.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Colour
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Meaning
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Example use
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["White", "Unchanged", "Lines identical in both texts"],
                        [
                          "Amber",
                          "Modified",
                          "Line exists in both but content differs",
                        ],
                        [
                          "Green",
                          "Added",
                          "Line present in modified, absent in original",
                        ],
                        [
                          "Red",
                          "Removed",
                          "Line present in original, absent in modified",
                        ],
                      ].map(([c, m, e]) => (
                        <tr key={c} className="hover:bg-teal-50">
                          <td className="px-4 py-2 font-bold text-gray-700 text-xs">
                            {c}
                          </td>
                          <td className="px-4 py-2 text-gray-700 text-xs">
                            {m}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
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
              n: 4,
              title: "Review the comparison summary",
              body: "Above the diff output, the summary panel shows five metrics: similarity percentage, unchanged line count, modified line count, added line count, and removed line count. Use the similarity score as a quick quality check — 90%+ suggests a minor revision, 50–80% indicates significant changes, and below 50% typically means a major rewrite.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Swap and re-compare:</strong> If you realise you've
                  pasted the texts the wrong way around, click Swap to instantly
                  reverse the comparison direction — the original becomes the
                  modified and vice versa — without having to re-paste anything.
                </div>
              ),
            },
            {
              n: 5,
              title: "Use the output to guide editing or code review",
              body: "Once you've identified the differences, use the output to guide your next steps. For document editing, work through the amber (modified) lines and decide whether to accept the changes. For code review, focus on the red (removed) and green (added) lines to understand what logic was added or deleted. When done, click Reset to clear both inputs and start a fresh comparison.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Iterative workflow:</strong> After accepting some
                  changes and making additional edits, paste the updated version
                  back into the modified box to run a fresh comparison against
                  your original baseline. This lets you track cumulative changes
                  across multiple revision rounds.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📝",
              title: "Document revision tracking",
              desc: "Compare two drafts of a report, essay, or proposal to see exactly which sentences and paragraphs were changed between versions.",
            },
            {
              emoji: "💻",
              title: "Code review and diff checking",
              desc: "Paste two versions of a function, config file, or SQL query to see what changed — without needing git or a full IDE.",
            },
            {
              emoji: "📄",
              title: "Contract and legal document comparison",
              desc: "Identify amendments between two versions of a contract, terms of service, or policy document by highlighting every changed line.",
            },
            {
              emoji: "🌐",
              title: "Website content auditing",
              desc: "Compare old and new versions of web page copy to verify which content was updated, added, or removed during a site revision.",
            },
            {
              emoji: "📊",
              title: "Data validation",
              desc: "Check two exports of the same dataset — CSV rows, JSON responses, or API outputs — to find records that changed between runs.",
            },
            {
              emoji: "✉️",
              title: "Email and message proofreading",
              desc: "Compare a draft against a previously sent version to ensure you haven't accidentally removed or changed important wording.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-teal-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            100% private — runs in your browser
          </h3>
          <p className="text-teal-100 leading-relaxed max-w-xl mx-auto text-sm">
            All comparison logic executes locally using JavaScript — your text
            never leaves your device. No server, no storage, no account. Safe to
            use with confidential documents, proprietary code, and sensitive
            data.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Text Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/plagiarism-checker",
                label: "Plagiarism Checker",
                desc: "Check your text against live web sources to detect duplicate content.",
              },
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Count words, characters, sentences, and reading time as you type.",
              },
              {
                href: "/tools/text-case-converter",
                label: "Text Case Converter",
                desc: "Convert text to camelCase, snake_case, Title Case and 9 more formats.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-teal-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
