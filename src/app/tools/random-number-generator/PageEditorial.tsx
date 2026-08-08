"use client";
// src/app/tools/random-number-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/random-number-generator";
const TOOL_NAME = "Random Number Generator";

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
    "Free random number generator — generate numbers in any range, with optional no-duplicate mode. No signup.",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const USE_CASES_TABLE = [
  ["1–6 (×1)", "Simulating a six-sided die roll"],
  ["1–52 (×1)", "Picking a random playing card position"],
  ["1–49 (×6, unique)", "Generating lottery-style number picks"],
  ["1–100 (×1)", "Classroom activities, probability exercises"],
  ["1–N (×1)", "Randomly selecting from a numbered list of N items"],
  [
    "1–N (×K, unique)",
    "Randomly ordering or sampling K items from a list of N",
  ],
];

const FAQS = [
  {
    q: "Is the random number generator truly random?",
    a: "This tool uses JavaScript's Math.random() function, which is a pseudo-random number generator (PRNG) — not a cryptographically secure or true hardware-random generator. Math.random() uses an algorithm (typically xorshift128+ or a similar PRNG) seeded by the browser's internal state to produce sequences of numbers that appear random and pass statistical randomness tests. For most everyday uses — games, classroom activities, raffles, sampling, decision-making — this level of randomness is entirely sufficient. For cryptographic, security-sensitive, or gambling applications requiring certified randomness, a hardware random number generator (HRNG) or a service like random.org (which uses atmospheric noise) would be more appropriate.",
  },
  {
    q: "What does 'no duplicate numbers' mean?",
    a: "The 'no duplicate numbers' option (sometimes called 'unique' mode) ensures that no number appears more than once in the generated set. Without this option, the same number can appear multiple times in a set — which is appropriate when simulating repeated independent events (like dice rolls). With duplicates disabled, each generated number is unique within the set — useful for lottery picks, random sampling without replacement, or generating a randomised ordering of a numbered list. Note that if you request more unique numbers than exist in your range (e.g. 50 unique numbers from 1–20), the tool will show an error because there aren't enough distinct values available.",
  },
  {
    q: "What is the maximum number of random numbers I can generate?",
    a: "This tool generates up to 1,000 random numbers per run. The count slider goes from 1 to 100, but you can type a number up to 1,000 directly into the count field. In practice, generating 1,000 numbers is instant — the calculation runs entirely in your browser and completes in milliseconds. If you need more than 1,000 numbers (for example, for a statistical simulation or dataset), you can run the generator multiple times and combine the results.",
  },
  {
    q: "How do I use this tool to simulate a dice roll?",
    a: "Set Min to 1 and Max to 6, set Count to 1, and click Generate. Each click gives you a single roll of a six-sided die. To simulate rolling multiple dice simultaneously, increase Count — setting Count to 5 gives you five independent d6 rolls at once. For other dice types: d4 (1–4), d8 (1–8), d10 (1–10), d12 (1–12), d20 (1–20), d100/percentile (1–100). For advantage/disadvantage in games like D&D, generate Count 2 from the appropriate range and take the higher or lower value respectively.",
  },
  {
    q: "How do I use this to randomly select from a list?",
    a: "Number each item in your list starting from 1. Set Min to 1 and Max to the total number of items in your list. Set Count to 1 (to pick one item) or higher if you want to pick multiple items. Enable 'No duplicate numbers' if you want to select multiple items without repeating any. The generated number tells you which item to select. For example, if you have 8 teams and want to generate a random draw order, set 1–8 with Count 8 and unique enabled — you'll get a random ordering of all 8 numbers (1 through 8) with no repeats.",
  },
  {
    q: "What is a pseudo-random number generator (PRNG)?",
    a: "A pseudo-random number generator (PRNG) is an algorithm that produces a sequence of numbers that approximates the properties of random numbers. Unlike true random number generators (which use physical processes like radioactive decay or atmospheric noise), PRNGs are entirely deterministic — if you know the initial seed value and the algorithm, you can predict the entire sequence. However, for practical purposes, modern PRNGs like the xorshift128+ used in V8 (Chrome/Node.js) and SpiderMonkey (Firefox) pass rigorous statistical randomness tests and produce distributions that are indistinguishable from truly random for all common applications. The key distinction matters only for cryptographic security, certified gambling systems, or scientific simulations where reproducibility and verified independence are required.",
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
          How to Use the Random Number Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Set your minimum, maximum, and how many numbers you want — enable
          unique mode if you need no repeats — then generate and copy.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Set your minimum and maximum values",
              body: "Enter the lower bound (minimum) and upper bound (maximum) of your range. Both accept positive and negative integers. The minimum must be less than or equal to the maximum. Common ranges: 1–6 for dice, 1–52 for card positions, 1–49 for lottery numbers, 1–100 for general purposes. There is no limit on the size of the range — you can use any integers as min and max.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Range
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Typical use
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {USE_CASES_TABLE.map(([range, use]) => (
                        <tr key={range} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-mono font-bold text-indigo-700 text-xs">
                            {range}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {use}
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
              title: "Choose how many numbers to generate",
              body: "Use the slider to select between 1 and 100 numbers, or type a value up to 1,000 directly into the count field. Generating a single number is the most common use case (picking one result, rolling one die). Generating multiple numbers is useful for lottery picks, random team assignments, sampling, or creating randomised lists.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Unique mode:</strong> Enable 'No duplicate numbers' to
                  ensure each number in your set appears only once. This is
                  equivalent to sampling without replacement — like drawing
                  numbered balls from a lottery drum and not putting them back.
                  If you request more unique numbers than exist in your range
                  (e.g. 10 unique numbers from a range of 1–5), the tool will
                  show an error rather than producing duplicates.
                </div>
              ),
            },
            {
              n: 3,
              title: "Generate and review your results",
              body: "Click 'Generate Numbers' to produce your random set. The results panel shows each number as a labelled chip, along with summary statistics: count, smallest, largest, and average. These stats are useful when generating multiple numbers to quickly understand the distribution of your results. Click 'Regenerate' to get a fresh set with the same settings — each run produces a new independent set of random numbers.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Statistics note:</strong> For large sets of numbers
                  generated from a wide range, the average should converge
                  towards the midpoint of your range as count increases — this
                  is the expected value for a uniform distribution. If you
                  generate 1,000 numbers from 1–100, the average will typically
                  be very close to 50.5 (the exact midpoint). Smaller sets will
                  show more variance, which is expected and correct.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy your results",
              body: "Click 'Copy All' to copy all generated numbers as a comma-separated list to your clipboard — ready to paste into a spreadsheet, document, or any other application. The numbers are listed in the order they were generated (not sorted). If you need them sorted, paste into a spreadsheet and use the sort function.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>CSV format:</strong> The copied output is
                  comma-separated (e.g. '42, 7, 93, 15') with a space after each
                  comma for readability. Most spreadsheet applications (Excel,
                  Google Sheets) will split this into individual cells when you
                  use 'Paste Special → Split text to columns' with comma as the
                  delimiter.
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
              emoji: "🎲",
              title: "Games and dice rolling",
              desc: "Roll d4, d6, d8, d10, d12, d20, or any custom die — generate one or multiple rolls at once.",
            },
            {
              emoji: "🎰",
              title: "Lottery number picks",
              desc: "Generate 6 unique numbers from 1–49 (UK Lotto), 5 from 1–70 (Powerball), or any other lottery format.",
            },
            {
              emoji: "🏆",
              title: "Raffles and draws",
              desc: "Assign numbers to participants and generate a random winner — use unique mode to ensure one number per person.",
            },
            {
              emoji: "📊",
              title: "Classroom and statistics",
              desc: "Generate random samples for probability exercises, teach expected value, or demonstrate distribution concepts.",
            },
            {
              emoji: "🔀",
              title: "Random ordering",
              desc: "Generate K unique numbers from 1–N to create a random ordering or selection of items from a numbered list.",
            },
            {
              emoji: "🎮",
              title: "Game development testing",
              desc: "Generate test values, random IDs, or sample datasets for development and testing purposes.",
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
          <div className="text-3xl mb-3">🎲</div>
          <h3 className="text-xl font-bold mb-3">
            Pseudo-random is random enough for every everyday purpose — the
            distinction only matters for security-critical applications
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            The random numbers generated by this tool use JavaScript's
            Math.random() — a pseudo-random number generator (PRNG) that
            produces statistically uniform distributions and passes all standard
            randomness tests. For the vast majority of uses — games, raffles,
            classroom activities, sampling, creative decisions, and simulations
            — this is indistinguishable from 'true' randomness. The only
            contexts where it matters are cryptographic security (generating
            encryption keys or secure tokens) and certified gambling systems
            (regulated online casino games). For everything else, click generate
            and trust the result.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Calculator Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/fraction-calculator",
                label: "Fraction Calculator",
                desc: "Add, subtract, multiply, and divide fractions with step-by-step working shown.",
              },
              {
                href: "/tools/percentage-calculator",
                label: "Percentage Calculator",
                desc: "Calculate percentages, percentage changes, and find what percentage one number is of another.",
              },
              {
                href: "/tools/unit-converter",
                label: "Unit Converter",
                desc: "Convert between hundreds of units across length, weight, volume, temperature, and more.",
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
