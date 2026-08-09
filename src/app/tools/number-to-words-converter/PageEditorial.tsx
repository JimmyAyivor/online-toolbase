"use client";
// src/app/tools/number-to-words-converter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/number-to-words-converter";
const TOOL_NAME = "Number to Words Converter";

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
    "Free number to words converter — convert any number to English words instantly, supports negatives, decimals, and currency mode",
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
    q: "What is the largest number this tool can convert?",
    a: "The tool supports numbers up to 999 trillion (999,999,999,999,999). This range covers the vast majority of real-world use cases including financial documents, legal amounts, government budgets, scientific measurements, and invoices. Numbers above this limit will trigger a validation error. If you need to convert numbers beyond 999 trillion, you can break the number into parts — the word-form structure for quadrillions and beyond follows the same pattern: thousand, million, billion, trillion, quadrillion, quintillion.",
  },
  {
    q: "How do I use this for cheque or cheque writing?",
    a: "Enable Currency mode by clicking the '💵 Currency mode' toggle — this appends 'dollars' to the word form, giving you the standard written amount used on personal and business cheques. For example, entering 1234.56 with currency mode on produces 'One thousand, two hundred thirty-four and 56/100 dollars'. For UK cheques, the format is the same but you would write 'pounds' in place of 'dollars' — you can copy the output and make that substitution manually. Most banks require the written amount to match the numeric amount exactly, so always double-check the output before writing it on a cheque.",
  },
  {
    q: "How are decimal numbers handled?",
    a: "Decimals up to two places are supported. The decimal portion is expressed as a fraction with 100 in the denominator — for example, 3.14 becomes 'three and 14/100' and 0.50 becomes 'zero and 50/100'. This format matches the convention used in formal financial writing, particularly cheque writing, where the cents portion is written as a fraction of a dollar. If you enter a number with more than two decimal places, the tool rounds to two places before converting.",
  },
  {
    q: "Can I enter numbers with commas already in them?",
    a: "Yes — the tool automatically strips commas from the input before processing. You can paste formatted numbers like '1,234,567' or '10,000,000.00' directly from a spreadsheet or document and the tool will handle them correctly. The formatted display below the currency toggle shows how the tool has interpreted your input, which is a useful way to confirm it's read the number correctly.",
  },
  {
    q: "Why does the output use commas between groups in the word form?",
    a: "Commas are inserted between the scale groups (thousands, millions, billions, etc.) in the word form — for example, 'one million, two hundred thousand, three hundred' — to match standard English number-writing conventions and improve readability for very large numbers. In formal financial and legal writing, this punctuation is standard. Some style guides omit the comma after the millions group in smaller numbers, but the comma-separated form produced by this tool is widely accepted and unambiguous.",
  },
  {
    q: "What is the correct way to write numbers in legal documents?",
    a: "In legal documents such as contracts, deeds, wills, and settlement agreements, the convention is to write both the numeric form and the word form — typically with the words first and the digits in parentheses, or vice versa. For example: 'the sum of Ten Thousand Dollars ($10,000)' or '$10,000 (ten thousand dollars)'. This double representation reduces the risk of fraud or misreading. Many jurisdictions have specific requirements for how amounts should be written in legal documents, so always check the relevant style guide or consult a legal professional for high-stakes documents. This tool provides the word form; you supply the numeric form and the surrounding document structure.",
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
          How to Use the Number to Words Converter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter any number and get its full English word form instantly — with
          currency mode, decimal support, and one-click copy.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Type or paste a number",
              body: "Enter any integer or decimal in the input field. Commas are automatically stripped, so you can paste formatted numbers like '1,234,567' directly from a spreadsheet or document. The formatted display next to the currency toggle confirms how the tool has read your number — useful for verifying large inputs at a glance.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Supported formats:</strong> Integers (1234), negative
                  integers (-99), decimals up to 2 places (3.14, 1234.56),
                  comma-formatted numbers (1,234,567), and zero. The tool
                  supports values up to 999 trillion. Numbers beyond this range
                  or non-numeric input will show a validation error.
                </div>
              ),
            },
            {
              n: 2,
              title: "Toggle currency mode for cheque writing",
              body: "Click the '💵 Currency mode' button to append 'dollars' to the output. With currency mode on, 1234.56 becomes 'One thousand, two hundred thirty-four and 56/100 dollars' — the standard form used on personal and business cheques. Leave currency mode off for general word-form output without the currency suffix.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Input
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Standard output
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Currency mode
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["42", "forty-two", "forty-two dollars"],
                        ["1000", "one thousand", "one thousand dollars"],
                        [
                          "3.14",
                          "three and 14/100",
                          "three and 14/100 dollars",
                        ],
                        [
                          "-99",
                          "negative ninety-nine",
                          "negative ninety-nine dollars",
                        ],
                        ["1000000", "one million", "one million dollars"],
                      ].map(([i, s, c]) => (
                        <tr key={i} className="hover:bg-teal-50">
                          <td className="px-4 py-2 font-mono font-bold text-teal-700 text-xs">
                            {i}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {s}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {c}
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
              title: "Copy the result",
              body: "Click the Copy button in the result panel to copy the full word form to your clipboard instantly. Paste it directly into a cheque, contract, invoice, or form. The result is capitalised (first letter uppercase) to match formal document conventions.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Legal documents:</strong> The standard convention in
                  contracts and deeds is to write both the word form and the
                  numeric form — for example, 'Ten Thousand Dollars ($10,000)'
                  or '$10,000 (ten thousand dollars)'. Use the Copy button to
                  get the word form and add the numeric form manually in your
                  document.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use quick examples to explore the output",
              body: "Click any of the six quick-example buttons (0, 42, 1000, 1000000, -99, 3.14) to instantly load that number and see how it converts. These cover the main structural cases: zero, small integers, thousands, millions, negatives, and decimals. Useful for understanding the output format before entering your own number.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Reset:</strong> Click the Reset button below the quick
                  examples to clear both the input and the currency mode toggle
                  simultaneously — useful when switching between different
                  document types or use cases in the same session.
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
              emoji: "🏦",
              title: "Cheque writing",
              desc: "Write dollar amounts in words as required by banks — currency mode adds the correct suffix and decimal fraction format automatically.",
            },
            {
              emoji: "📄",
              title: "Legal documents",
              desc: "Contracts, deeds, and settlement agreements require amounts written in full to prevent fraud and ambiguity — this tool produces the correct formal wording.",
            },
            {
              emoji: "🧾",
              title: "Invoices & quotes",
              desc: "Some invoice and quote templates require the total in words below the numeric amount for verification and clarity, particularly in high-value B2B contexts.",
            },
            {
              emoji: "🎓",
              title: "Education",
              desc: "Teachers and students use this to understand how large numbers are written out in English — the quick examples cover the main structural patterns.",
            },
            {
              emoji: "🌍",
              title: "Translation prep",
              desc: "Translators working with numeric content can quickly get the English word form before converting to another language's number-writing conventions.",
            },
            {
              emoji: "🤖",
              title: "Data entry & QA",
              desc: "Verify that numeric values in databases or forms match their written equivalents for quality assurance — useful for financial system audits.",
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
          <div className="text-3xl mb-3">📝</div>
          <h3 className="text-xl font-bold mb-3">
            Always write both forms in legal and financial documents
          </h3>
          <p className="text-teal-100 leading-relaxed max-w-xl mx-auto text-sm">
            The longstanding convention in contracts, deeds, cheques, and
            financial instruments is to write the amount in both words and
            numerals — for example, 'Ten Thousand Dollars ($10,000)'. The words
            guard against fraudulent alteration of the numeric figure; the
            numeral provides clarity. Most courts treat the word form as
            authoritative when the two conflict.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Text Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/acronym-generator",
                label: "Acronym Generator",
                desc: "Turn any phrase into an acronym with uppercase, lowercase, or dot-separated styles.",
              },
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Real-time word and character count with reading time and word frequency analysis.",
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
