"use client";
// src/app/tools/roi-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/roi-calculator";
const TOOL_NAME = "ROI Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#064e3b", light: "#ecfdf5" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-inner mb-5">
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
    "Free ROI calculator — calculate return on investment, annualised ROI, net profit, and return multiple. No signup.",
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
                <span className="text-emerald-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const ROI_EXAMPLES = [
  [
    "Stock investment",
    "$10,000 → $14,500 over 2 years",
    "ROI: 45%  |  Ann. ROI: 20.4%  |  Multiple: 1.45×",
  ],
  [
    "Marketing campaign",
    "$5,000 spend → $20,000 revenue",
    "ROI: 300%  |  1-year period  |  Multiple: 4.00×",
  ],
  [
    "Real estate",
    "$200,000 → $280,000 over 5 years",
    "ROI: 40%  |  Ann. ROI: 6.96%  |  Multiple: 1.40×",
  ],
  [
    "Failed investment",
    "$10,000 → $7,000 over 1 year",
    "ROI: −30%  |  Net loss: −$3,000  |  Multiple: 0.70×",
  ],
];

const FAQS = [
  {
    q: "What is ROI and how is it calculated?",
    a: "ROI (Return on Investment) is a percentage that measures the profitability of an investment relative to its cost. The formula is: ROI = (Net Profit ÷ Initial Investment) × 100, where Net Profit = Final Value − Initial Investment. For example, if you invest $10,000 and receive $14,000 back, your Net Profit is $4,000 and your ROI is ($4,000 ÷ $10,000) × 100 = 40%. A positive ROI means the investment was profitable; a negative ROI means you lost money. ROI is expressed as a percentage, which makes it easy to compare the profitability of different investments regardless of their absolute size — a 40% ROI on a $1,000 investment and a 40% ROI on a $1,000,000 investment are equally profitable in proportional terms.",
  },
  {
    q: "What is annualised ROI and why is it more useful than total ROI?",
    a: "Annualised ROI (also called Compound Annual Growth Rate or CAGR) adjusts the total ROI to account for the time period of the investment, expressing it as an equivalent annual rate. The formula is: Annualised ROI = [(Final Value ÷ Initial Investment)^(1 ÷ Years) − 1] × 100. For example, a 100% total ROI over 5 years is a 14.9% annualised ROI — not 20% (which would be the simple annual average). Annualised ROI is more useful than total ROI when comparing investments held for different lengths of time: a 50% ROI in 1 year is far better than a 50% ROI in 5 years, but the total ROI figure alone doesn't show this difference. By converting to an annualised rate, you can compare any two investments on a like-for-like basis.",
  },
  {
    q: "What is a 'return multiple' and when is it used?",
    a: "A return multiple (also called a money-on-money multiple or MoM) is the total final value divided by the initial investment, expressed as a multiplier. If you invest $10,000 and receive $30,000 back, your return multiple is 3.0× (you tripled your money). Return multiples are commonly used in private equity, venture capital, and real estate investment discussions because they provide an immediately intuitive measure of how much money was made relative to what was put in, without requiring knowledge of the investment period. A 2× multiple means you doubled your money; a 0.5× multiple means you lost half your money. Unlike ROI % or annualised ROI, the return multiple doesn't account for time, making it more useful for communicating total value creation than for comparing investment quality.",
  },
  {
    q: "How do I calculate ROI for a marketing campaign?",
    a: "For marketing ROI, the initial investment is your total campaign spend (ad spend, creative costs, agency fees, staff time, etc.) and the return is the revenue attributed to that campaign. Use the simple ROI formula: Marketing ROI = (Revenue − Cost) ÷ Cost × 100. For example, if you spend $5,000 on a campaign and it generates $20,000 in revenue, your marketing ROI is ($15,000 ÷ $5,000) × 100 = 300%. A common industry benchmark is that a 5:1 revenue-to-cost ratio (400% ROI) is considered good for marketing, and a 10:1 ratio (900% ROI) is exceptional. One complication: attributing revenue to specific campaigns is rarely perfect — use first-touch, last-touch, or multi-touch attribution models and note which model you used when reporting ROI, since the choice significantly affects the calculated figure.",
  },
  {
    q: "What is a good ROI?",
    a: "What constitutes a 'good' ROI depends heavily on the type of investment, the risk involved, and the time period. For stock market investments, the S&P 500 has historically returned approximately 10% per year on average (7% after inflation), so a 10% annualised ROI on equity investments is broadly considered 'market average'. For real estate, a 6–10% annualised ROI is typical depending on location and leverage. For venture capital and private equity, target returns are typically 20–25%+ annualised due to the high risk and illiquidity premium. For marketing campaigns, a 200–500% ROI (3×–6× revenue multiple) is often considered good, with the acceptable threshold varying by industry, customer lifetime value, and margin. The key principle: higher expected ROI should come with proportionally higher risk — a 30% annualised ROI on a 'safe' investment should be viewed with skepticism.",
  },
  {
    q: "What are the limitations of ROI as a metric?",
    a: "ROI has several important limitations. It doesn't account for risk — two investments with identical ROI percentages may have very different risk profiles. It can be manipulated by choice of inputs — marketing ROI calculations in particular vary enormously depending on how costs and revenues are defined. Simple ROI doesn't account for the time value of money beyond the annualised version — a dollar received today is worth more than a dollar received in 5 years. ROI doesn't capture opportunity cost — a 15% ROI might be poor if the same capital could earn 25% elsewhere. It doesn't account for liquidity — a real estate investment with 15% annualised ROI is harder to exit quickly than a stock with 10% ROI. For complex investment decisions, ROI should be considered alongside other metrics including IRR (Internal Rate of Return), NPV (Net Present Value), and risk-adjusted measures such as Sharpe ratio.",
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
              <span className="text-emerald-600 text-lg shrink-0">
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
          How to Use the ROI Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your initial investment, final value, and time period — get ROI
          %, annualised ROI, net profit, and return multiple instantly.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your initial investment",
              body: "Type the total amount invested — the cost you paid to make the investment. This includes all costs directly associated with acquiring or making the investment: for stocks, include the purchase price; for a marketing campaign, include all spend (ads, creative, agency fees); for real estate, include the purchase price plus acquisition costs. Use the same currency throughout both fields for consistent results.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>What counts as the investment cost:</strong> Include
                  all costs that are part of making the investment, not ongoing
                  operational costs after the investment. For marketing: total
                  campaign spend. For stocks: purchase price + brokerage fees.
                  For real estate: purchase price + stamp duty / closing costs.
                  Excluding relevant costs inflates your ROI — be comprehensive
                  in what you include as the initial investment for accurate
                  results.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter the final value or total return",
              body: "Enter the total value received from the investment — the amount you got back or the current value of the investment. For a completed investment: enter the total cash received (sale proceeds + any income received like dividends or rent). For a marketing campaign: enter the total revenue attributed to the campaign. For an ongoing investment: enter its current market value. If the investment is still active, use the current value to calculate the ROI to date.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Investment type
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Enter as Final Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Stocks / ETFs",
                          "Current market value + dividends received",
                        ],
                        [
                          "Marketing campaign",
                          "Total attributed revenue from the campaign",
                        ],
                        ["Real estate", "Sale price + rental income received"],
                        [
                          "Business investment",
                          "Proceeds received + business value if sold",
                        ],
                        [
                          "Training / education",
                          "Estimated salary increase value over time",
                        ],
                      ].map(([type, value]) => (
                        <tr key={type} className="hover:bg-emerald-50">
                          <td className="px-4 py-2 font-bold text-emerald-700 text-xs">
                            {type}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {value}
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
              title: "Set the time period",
              body: "Enter the number of years the investment was held or the campaign ran. For periods shorter than a year, use decimals: 6 months = 0.5, 3 months = 0.25, 18 months = 1.5. The time period is used to calculate the annualised ROI — it doesn't affect the total ROI % or net profit, only the annualised rate. For a one-time campaign without a duration (e.g. a single ad campaign that ran for 1 month), set 0.083 (1/12 of a year) to see the annualised equivalent.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Why annualised ROI matters:</strong> A 50% ROI over 1
                  year (50% annualised) is much better than a 50% ROI over 5
                  years (8.45% annualised). Without the time component, ROI
                  comparisons are misleading. Always use annualised ROI when
                  comparing investments held for different periods — the
                  calculator shows both so you can see the difference.
                </div>
              ),
            },
            {
              n: 4,
              title: "Interpret your results",
              body: "The calculator shows four metrics: ROI % (total return relative to investment), Annualised ROI (equivalent annual rate of return), Net Profit (total monetary gain or loss), and Return Multiple (how many times your investment was returned). A positive ROI and a multiple above 1.00× indicates a profitable investment. Use annualised ROI to compare against benchmarks: the S&P 500's historical average is approximately 10% annualised.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Example
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Inputs
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Key outputs
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {ROI_EXAMPLES.map(([name, inputs, outputs]) => (
                        <tr key={name} className="hover:bg-emerald-50">
                          <td className="px-4 py-2 font-bold text-emerald-700 text-xs whitespace-nowrap">
                            {name}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-700">
                            {inputs}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-gray-500">
                            {outputs}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📣",
              title: "Marketing campaign ROI",
              desc: "Calculate the return on ad spend (ROAS) and overall campaign ROI — enter total campaign cost and attributed revenue.",
            },
            {
              emoji: "📈",
              title: "Stock and portfolio returns",
              desc: "Calculate the total and annualised return on stock investments — enter purchase cost and current or sale value with holding period.",
            },
            {
              emoji: "🏠",
              title: "Real estate investment",
              desc: "Evaluate property investment performance — include purchase costs and total returns from rental income and sale proceeds.",
            },
            {
              emoji: "💼",
              title: "Business investment evaluation",
              desc: "Compare the ROI of different business investments — equipment, training, software, or expansion — using annualised returns.",
            },
            {
              emoji: "🎓",
              title: "Education and training ROI",
              desc: "Estimate the return on education or training investment — compare course cost against expected salary increase over time.",
            },
            {
              emoji: "⚖️",
              title: "Investment comparison",
              desc: "Use annualised ROI to compare investments held for different periods — the annualised figure normalises the time factor for fair comparison.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-bold mb-3">
            Total ROI and annualised ROI tell different stories — use both to
            understand your investment performance fully
          </h3>
          <p className="text-emerald-100 leading-relaxed max-w-xl mx-auto text-sm">
            A 100% total ROI sounds impressive — but whether it's actually good
            depends entirely on how long it took. 100% ROI in 1 year is
            exceptional (100% annualised). 100% ROI in 10 years is modest (7.2%
            annualised — roughly matching a stock market index fund over the
            same period). Without the time dimension, total ROI comparisons
            between different investments are misleading. This calculator shows
            both metrics side by side so you can evaluate performance both in
            absolute terms (total return and net profit) and in time-adjusted
            terms (annualised ROI) — the combination gives you the complete
            picture of any investment's performance.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Finance Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/investment-return-calculator",
                label: "Investment Return Calculator",
                desc: "Calculate the future value of an investment with compound interest over time.",
              },
              {
                href: "/tools/percentage-calculator",
                label: "Percentage Calculator",
                desc: "Calculate percentages, percentage changes, and find what percentage one number is of another.",
              },
              {
                href: "/tools/discount-calculator",
                label: "Discount Calculator",
                desc: "Calculate discounted prices — enter original price and discount percentage to find the sale price.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
