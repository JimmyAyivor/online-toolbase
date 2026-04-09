"use client";
// src/app/tools/percentage-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/percentage-calculator";
const TOOL_NAME = "Percentage Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#78350f", light: "#fffbeb" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-yellow-100 shadow-inner mb-5">
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
    "Free percentage calculator — 5 formulas in one: X% of Y, percentage change, increase/decrease by %, and what % is X of Y. No signup.",
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
                <span className="text-yellow-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How do I calculate X% of a number?",
    a: "To find X% of a number, multiply the number by the percentage divided by 100. The formula is: Result = (Percentage ÷ 100) × Number. For example, to find 15% of 80: (15 ÷ 100) × 80 = 0.15 × 80 = 12. A quick mental shortcut: to find 10% of any number, move the decimal point one place to the left (10% of 250 = 25). For 5%, halve the 10% result (5% of 250 = 12.5). For 20%, double the 10% result (20% of 250 = 50). For 1%, move the decimal two places left (1% of 250 = 2.5). Combine these for any percentage: 17% = 10% + 5% + 2%.",
  },
  {
    q: "What is the formula for percentage change?",
    a: "Percentage change measures how much a value has increased or decreased relative to its original value. The formula is: Percentage Change = ((New Value − Old Value) ÷ Old Value) × 100. A positive result means an increase; a negative result means a decrease. For example, if a product's price rises from $40 to $52: ((52 − 40) ÷ 40) × 100 = (12 ÷ 40) × 100 = 30% increase. If the price drops from $52 to $40: ((40 − 52) ÷ 52) × 100 = (−12 ÷ 52) × 100 = −23.08% (a 23.08% decrease). Note that a 30% increase followed by a 30% decrease does not return to the original value — this is a common misconception.",
  },
  {
    q: "What is the difference between percentage change and percentage difference?",
    a: "Percentage change compares a new value to an original (old) value — it has a clear direction (increase or decrease) and the old value is always the reference point. It answers the question 'by what percentage did this change?'. Percentage difference compares two values where neither is the definitive 'original' — it measures the relative gap between them using their average as the base. The formula is: Percentage Difference = (|Value A − Value B| ÷ ((Value A + Value B) ÷ 2)) × 100. For example, comparing 80 and 120: |80 − 120| ÷ ((80 + 120) ÷ 2) × 100 = 40 ÷ 100 × 100 = 40% difference. Use percentage change when there is a before/after relationship; use percentage difference when comparing two peers.",
  },
  {
    q: "How do I calculate what percentage one number is of another?",
    a: "To find what percentage number A is of number B, divide A by B and multiply by 100. The formula is: Percentage = (A ÷ B) × 100. For example, to find what percentage 35 is of 140: (35 ÷ 140) × 100 = 0.25 × 100 = 25%. In plain language: 35 is 25% of 140. This calculation is commonly used for test scores (you got 42 out of 60 — what percentage?), budget analysis (expenses are $3,200 of a $8,000 budget — what percentage?), and proportional comparisons (segment A has 1,250 customers out of 5,000 total — what percentage?).",
  },
  {
    q: "How do I increase or decrease a number by a percentage?",
    a: "To increase a number by X%, multiply by (1 + X/100). To decrease a number by X%, multiply by (1 − X/100). For example, to increase $200 by 15%: $200 × (1 + 0.15) = $200 × 1.15 = $230. To decrease $200 by 15%: $200 × (1 − 0.15) = $200 × 0.85 = $170. Equivalently, you can find X% of the number and add/subtract: 15% of $200 = $30; $200 + $30 = $230 (increase) or $200 − $30 = $170 (decrease). The multiplication method is more efficient for repeated calculations. Note: increasing by X% and then decreasing by X% does not return to the original — e.g. $200 → +15% → $230 → −15% → $195.50.",
  },
  {
    q: "Why does a percentage increase followed by the same percentage decrease not return to the original value?",
    a: "This is one of the most counterintuitive aspects of percentage arithmetic. When you increase by X%, the new value is larger — so the same percentage decrease is applied to a larger base, removing more in absolute terms than was added. For example, start at $100. Increase by 50%: $100 × 1.5 = $150. Decrease by 50%: $150 × 0.5 = $75 — not back to $100. The original $100 plus 50% added $50, but 50% of the new $150 removes $75. To reverse a percentage increase of X%, you need to decrease by X/(1+X/100)% — for a 50% increase, you need a 33.33% decrease to return to the original. The symmetry only works for very small percentages where the difference between old and new bases is negligible.",
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
              <span className="text-yellow-600 text-lg shrink-0">
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
          How to Use the Percentage Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Five percentage calculators in one — select the formula you need,
          enter your values, and get the result instantly with the formula
          shown.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose the percentage formula you need",
              body: "The calculator offers five distinct calculations shown as large selectable cards. Click the card that matches what you want to calculate: 'X% of Y' to find a percentage of a number; 'Increase by X%' to apply a percentage increase; 'Decrease by X%' to apply a percentage decrease; 'Percentage Difference' to compare two values; or 'What % is X of Y' to find what percentage one number is of another. The active card is highlighted in yellow and the input fields update to match the selected formula.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Formula
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Example
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Result
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Use case
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["X% of Y", "15% of 80", "12", "Tips, tax, commission"],
                        [
                          "Increase by X%",
                          "$200 + 20%",
                          "$240",
                          "Price rises, salary increases",
                        ],
                        [
                          "Decrease by X%",
                          "$200 − 20%",
                          "$160",
                          "Discounts, depreciation",
                        ],
                        [
                          "% Difference",
                          "80 vs 120",
                          "40%",
                          "Comparing two peers",
                        ],
                        [
                          "What % is X of Y",
                          "35 of 140",
                          "25%",
                          "Test scores, proportions",
                        ],
                      ].map(([f, ex, res, use]) => (
                        <tr key={f} className="hover:bg-yellow-50">
                          <td className="px-4 py-2 font-bold text-yellow-700 text-xs">
                            {f}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-gray-700">
                            {ex}
                          </td>
                          <td className="px-4 py-2 text-xs font-bold text-gray-900">
                            {res}
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
              title: "Enter your values",
              body: "Type your numbers into the input fields shown for the selected formula. All inputs are numeric and update the result live as you type — no need to click a button. The fields are labelled to match the formula: 'Percentage (%)' and 'Number' for the first mode; 'Value' and 'Percentage' for increase/decrease; 'Value A' and 'Value B' for percentage difference; 'Part' and 'Whole' for the what-percentage mode. Decimal values are supported in all fields.",
              enrich: (
                <div className="bg-yellow-50 rounded-xl px-5 py-4 text-sm text-yellow-800 leading-relaxed">
                  <strong>Mental maths shortcuts:</strong> For 10%, move the
                  decimal left one place (10% of 350 = 35). For 20%, double the
                  10% result (20% of 350 = 70). For 5%, halve the 10% result (5%
                  of 350 = 17.5). For 25%, divide by 4 (25% of 200 = 50). For
                  50%, divide by 2. Combine these: 15% = 10% + 5%; 30% = 3 ×
                  10%.
                </div>
              ),
            },
            {
              n: 3,
              title: "Read the result and formula",
              body: "The result appears instantly in a highlighted panel below the inputs. The result value is shown in large bold text for easy reading. Below the result, a formula line shows the exact calculation performed — for example, '15% of 80 = 0.15 × 80 = 12.00'. This formula display helps you verify the calculation and learn the underlying maths. The result panel colour changes to match the type of result: yellow for basic percentage, blue for percentage change, green for increase, red for decrease.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Percentage change direction:</strong> A positive
                  percentage change means an increase; a negative value means a
                  decrease. For the 'Percentage Difference' mode, the result is
                  always positive because it measures the absolute gap between
                  two values, regardless of which is larger. The formula line
                  always shows the full calculation so you can confirm the
                  result is what you expected.
                </div>
              ),
            },
            {
              n: 4,
              title: "Switch between formulas as needed",
              body: "The five formula cards are always visible — click any card to switch modes instantly. Your previously entered values are cleared when switching modes so you start fresh with the correct inputs for the new formula. Use the tool for multiple calculations in sequence: calculate 20% of your budget, then check what percentage an expense is of the total, then calculate the year-on-year percentage change — all without leaving the page.",
              enrich: (
                <div className="bg-yellow-50 rounded-xl px-5 py-4 text-sm text-yellow-800 leading-relaxed">
                  <strong>Common percentage relationships to know:</strong> 25%
                  = ¼, 33.33% ≈ ⅓, 50% = ½, 66.67% ≈ ⅔, 75% = ¾. A 100% increase
                  doubles the value. A 50% decrease halves it. Increasing by
                  100% and decreasing by 50% are not inverses — a 100% increase
                  followed by a 50% decrease returns to the original; but a 50%
                  decrease followed by a 100% increase also returns to the
                  original. This symmetry only works for these specific values.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🛍️",
              title: "Discounts and sales",
              desc: "Calculate the final price after a 20%, 30%, or 50% discount — or find what percentage off a sale price represents.",
            },
            {
              emoji: "📊",
              title: "Business and finance",
              desc: "Calculate profit margins, revenue growth rates, budget allocations, and expense ratios as percentages.",
            },
            {
              emoji: "📝",
              title: "Test and exam scores",
              desc: "Convert a raw score to a percentage — find what percentage 42 out of 60 is, or calculate a pass/fail threshold.",
            },
            {
              emoji: "📈",
              title: "Investment returns",
              desc: "Calculate the percentage gain or loss on an investment — find the percentage change from purchase price to current value.",
            },
            {
              emoji: "💰",
              title: "Tips and commission",
              desc: "Calculate a 15%, 18%, or 20% tip on a bill, or find a sales commission as a percentage of revenue.",
            },
            {
              emoji: "🏠",
              title: "Property and mortgages",
              desc: "Calculate a down payment as a percentage of property value, or find what percentage of income goes to housing costs.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-yellow-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📐</div>
          <h3 className="text-xl font-bold mb-3">
            Percentage change and percentage difference are different
            calculations — use the right one for your data
          </h3>
          <p className="text-yellow-100 leading-relaxed max-w-xl mx-auto text-sm">
            Percentage change measures how a value has moved from an original
            starting point — it has direction (increase or decrease) and the
            original value is always the denominator. Percentage difference
            compares two values as peers with no defined starting point — it
            uses the average of both values as the base, and the result is
            always positive. Using the wrong formula leads to misleading
            results: reporting a 40% 'change' when you should report a 40%
            'difference' implies a before/after relationship that may not exist
            in the data.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Calculator Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/tip-calculator",
                label: "Tip Calculator",
                desc: "Calculate tips and split bills for any restaurant or service — quick presets plus custom tip percentage.",
              },
              {
                href: "/tools/discount-calculator",
                label: "Discount Calculator",
                desc: "Calculate discounted prices and savings for any sale or promotion — fixed amount or percentage discount.",
              },
              {
                href: "/tools/sales-tax-calculator",
                label: "Sales Tax Calculator",
                desc: "Calculate sales tax and final price for any purchase — enter a rate or select your US state.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-yellow-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
