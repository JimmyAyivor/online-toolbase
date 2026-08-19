"use client";
// src/app/tools/fraction-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/fraction-calculator";
const TOOL_NAME = "Fraction Calculator";

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
    "Free fraction calculator — add, subtract, multiply, and divide fractions with step-by-step working shown. No signup.",
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

const OPERATION_RULES = [
  [
    "+",
    "Addition",
    "Find the LCM of both denominators. Convert each fraction to the common denominator. Add numerators. Simplify.",
  ],
  [
    "−",
    "Subtraction",
    "Find the LCM of both denominators. Convert each fraction. Subtract second numerator from first. Simplify.",
  ],
  [
    "×",
    "Multiplication",
    "Multiply numerators together and denominators together. Simplify the result by dividing by the GCD.",
  ],
  [
    "÷",
    "Division",
    "Multiply the first fraction by the reciprocal of the second (flip numerator and denominator of the second). Simplify.",
  ],
];

const FAQS = [
  {
    q: "How do you add fractions with different denominators?",
    a: "To add fractions with different denominators, you first need to find a common denominator — the Least Common Multiple (LCM) of both denominators. Then convert each fraction so it has that common denominator by multiplying its numerator and denominator by the same factor. Once both fractions share the same denominator, add the numerators and keep the denominator. Finally, simplify the result by dividing both numerator and denominator by their Greatest Common Divisor (GCD). For example, to add 1/3 + 1/4: the LCM of 3 and 4 is 12. Convert to 4/12 + 3/12. Add to get 7/12. Since 7 and 12 share no common factor, 7/12 is already in simplest form.",
  },
  {
    q: "How do you subtract fractions?",
    a: "Fraction subtraction follows the same process as addition, except you subtract the second numerator from the first after finding the common denominator. Find the LCM of both denominators, convert each fraction to the common denominator, subtract the numerators, and simplify. For example, 3/4 − 1/3: the LCM of 4 and 3 is 12. Convert to 9/12 − 4/12. Subtract to get 5/12. The result is already simplified. If the result is negative (because the second numerator is larger than the first), the fraction will have a negative numerator — this is correct and expected.",
  },
  {
    q: "How do you multiply fractions?",
    a: "Multiplying fractions is the simplest of the four operations: multiply the numerators together to get the new numerator, and multiply the denominators together to get the new denominator, then simplify. No common denominator is needed. For example, 2/3 × 3/4 = (2×3)/(3×4) = 6/12. Simplify by dividing by the GCD of 6 and 12, which is 6, to get 1/2. A useful shortcut is to simplify before multiplying — in 2/3 × 3/4, the 3 in the numerator of the second fraction and the 3 in the denominator of the first cancel out, giving 2/1 × 1/4 = 2/4 = 1/2.",
  },
  {
    q: "How do you divide fractions?",
    a: "To divide fractions, multiply the first fraction by the reciprocal of the second fraction. The reciprocal means the fraction flipped — the numerator and denominator are swapped. So a/b ÷ c/d becomes a/b × d/c = (a×d)/(b×c). For example, 2/3 ÷ 4/5 becomes 2/3 × 5/4 = (2×5)/(3×4) = 10/12. Simplify by dividing by the GCD of 10 and 12, which is 2, to get 5/6. Remember: dividing by a fraction is the same as multiplying by its reciprocal.",
  },
  {
    q: "What is a simplified fraction and how do you simplify one?",
    a: "A simplified fraction (also called a reduced fraction or fraction in lowest terms) is a fraction where the numerator and denominator share no common factors other than 1. To simplify a fraction, find the Greatest Common Divisor (GCD) of the numerator and denominator, then divide both by it. For example, 12/18: the GCD of 12 and 18 is 6. Divide both by 6: 12/6 = 2 and 18/6 = 3. The simplified fraction is 2/3. A fraction is fully simplified when its GCD is 1 — meaning no number larger than 1 divides evenly into both numerator and denominator. This calculator automatically simplifies all results.",
  },
  {
    q: "What is LCM and why is it used in fraction addition?",
    a: "LCM stands for Least Common Multiple — the smallest positive number that is a multiple of two given numbers. When adding or subtracting fractions, you need both fractions to have the same denominator before you can combine their numerators. The LCM of the two denominators gives the smallest possible common denominator, which keeps numbers smaller and makes simplification easier. For example, to add 1/4 + 1/6: the LCM of 4 and 6 is 12 (smaller than 24, which is 4×6 but not the smallest). Convert to 3/12 + 2/12 = 5/12. Using the LCM rather than just multiplying the denominators together produces smaller intermediate numbers and avoids unnecessary simplification steps.",
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
          How to Use the Fraction Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter two fractions, select the operation, and calculate — the result
          is shown in simplest form with the decimal equivalent and step-by-step
          working.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter the numerators and denominators",
              body: "Type the numerator (top number) and denominator (bottom number) for each fraction. The numerator field is above the dividing line; the denominator is below. Both fractions accept positive and negative integers. Negative fractions are entered by putting a minus sign in the numerator — for example, enter −3 in the numerator and 4 in the denominator for −3/4.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Input tips:</strong> Denominators cannot be zero
                  (division by zero is undefined). You can enter fractions that
                  are already in simplified form or not — the calculator
                  simplifies all results automatically. Mixed numbers (like 2½)
                  should be converted to improper fractions first: 2½ = 5/2
                  (multiply the whole number by the denominator and add the
                  numerator: 2×2+1=5).
                </div>
              ),
            },
            {
              n: 2,
              title: "Select the operation",
              body: "Click one of the four operation buttons: + (addition), − (subtraction), × (multiplication), or ÷ (division). The selected operation is highlighted. Each operation uses a different algorithm — addition and subtraction require a common denominator via the LCM, multiplication multiplies numerators and denominators directly, and division multiplies by the reciprocal.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Op
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Name
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Method
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {OPERATION_RULES.map(([op, name, method]) => (
                        <tr key={op} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-black text-indigo-700 text-xl font-mono">
                            {op}
                          </td>
                          <td className="px-4 py-2 font-bold text-gray-900 text-xs">
                            {name}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {method}
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
              title: "Click Calculate and review the result",
              body: "Click 'Calculate' to compute the result. The answer is displayed as a simplified fraction and as a decimal equivalent. The result panel also shows a numbered step-by-step working section — the exact mathematical steps taken to reach the answer, including the LCM used for addition/subtraction or the reciprocal for division, and the GCD simplification step where applicable.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Using the step-by-step section:</strong> The steps
                  section shows the exact working as you would write it on paper
                  — useful for checking homework, understanding where your own
                  working went wrong, or teaching fraction operations. Each step
                  is numbered in order from the input through to the simplified
                  result.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy the result or reset for a new calculation",
              body: "Click 'Copy' to copy the simplified fraction result to your clipboard in numerator/denominator format. Click 'Reset' to clear all fields and start a new calculation. The reset button also resets the operator to addition (+). All calculations happen instantly in your browser — no data is sent anywhere.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Chaining calculations:</strong> To use the result of
                  one calculation in the next, note the simplified result then
                  click Reset and enter the result as the first fraction in your
                  new calculation. For example, if you want to calculate (1/2 +
                  1/3) × 2/5, first calculate 1/2 + 1/3 = 5/6, then reset and
                  calculate 5/6 × 2/5.
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
              emoji: "📚",
              title: "Homework and schoolwork",
              desc: "Check fraction calculations for maths homework — the step-by-step section shows the working so you can follow and learn the method.",
            },
            {
              emoji: "🍕",
              title: "Cooking and recipe scaling",
              desc: "Scale recipe ingredient fractions — add ½ cup and ⅓ cup, or multiply ¾ cup by 3 for a triple batch.",
            },
            {
              emoji: "📐",
              title: "Measurement and DIY",
              desc: "Add or subtract fractional measurements in imperial units — combine lengths measured in fractions of an inch without converting to decimals.",
            },
            {
              emoji: "💰",
              title: "Financial calculations",
              desc: "Work with fractional interest rates, ownership stakes, or proportional splits that are expressed as fractions rather than percentages.",
            },
            {
              emoji: "🎓",
              title: "Teaching fraction concepts",
              desc: "Use the step-by-step output to demonstrate how fraction operations work — shows LCM, common denominators, and GCD simplification clearly.",
            },
            {
              emoji: "🔢",
              title: "Checking manual calculations",
              desc: "Verify fraction calculations done by hand — input your fractions and compare the tool's answer and steps to your own working.",
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
          <div className="text-3xl mb-3">÷</div>
          <h3 className="text-xl font-bold mb-3">
            Understanding the steps matters more than getting the answer — see
            exactly how each fraction operation works
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            Most calculators give you a number but not the reasoning. For
            fractions in particular — where the method is just as important as
            the result for learning and teaching — showing the step-by-step
            working reveals whether you understand why the answer is correct.
            This calculator shows every step: the LCM used to find the common
            denominator in addition and subtraction, the reciprocal
            multiplication in division, and the GCD used to simplify the result.
            Use it both to get answers quickly and to understand the method well
            enough to do it yourself.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Calculator Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
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
              {
                href: "/tools/tip-calculator",
                label: "Tip Calculator",
                desc: "Calculate tip amounts and split a bill between multiple people — enter your total and tip percentage.",
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
