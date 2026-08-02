"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/retirement-calculator";
const TOOL_NAME = "Retirement Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#eff6ff" },
      });
    });
    return () => {
      c = true;
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-blue-100 shadow-inner mb-5">
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
    "Free retirement calculator at onlinetoolbase.com",
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
                <span className="text-green-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is the 4% withdrawal rule?",
    a: "The 4% rule (also called the Bengen Rule) states that a retiree can withdraw 4% of their portfolio in the first year of retirement, then adjust subsequent withdrawals for inflation, with a high probability of the portfolio lasting 30 years. It is based on historical US stock and bond market data. To find the nest egg target under this rule, multiply your desired annual retirement income by 25 (e.g. $50,000/year × 25 = $1,250,000 target). Modern financial planners sometimes use 3.5% or 3% to account for potentially lower future returns.",
  },
  {
    q: "How much should I have saved for retirement by age?",
    a: "Common benchmarks (Fidelity guidelines): by 30 — 1× annual salary; by 40 — 3× salary; by 50 — 6× salary; by 60 — 8× salary; by retirement (67) — 10× salary. These are rough guides — the actual amount depends on your expected lifestyle, health, Social Security income, pension entitlements, and when you plan to retire. The most important variable is your personal monthly spending in retirement, not your pre-retirement income.",
  },
  {
    q: "What expected annual return should I use?",
    a: "For a diversified stock/bond portfolio, historical long-term real returns (after inflation) are approximately 5–7% for stocks and 1–2% for bonds. A typical 60/40 portfolio (60% stocks, 40% bonds) averages roughly 5–6% nominal returns historically. For conservative projections, use 5–6%. For aggressive (mostly stocks) projections, use 7–8%. Avoid using returns above 8% for planning purposes — optimistic assumptions create false confidence. The calculator uses nominal returns; subtract 2–3% mentally to estimate inflation-adjusted purchasing power.",
  },
  {
    q: "What is Social Security and should I include it?",
    a: "Social Security (US) is a government retirement benefit based on your lifetime earnings history. The average benefit in 2025 is approximately $1,900/month. You can estimate your personal benefit at ssa.gov. When using this calculator, reduce your 'monthly income needed in retirement' by your expected Social Security income — this lowers the required nest egg significantly. For a $4,000/month retirement need with $1,900 in Social Security, you only need to fund $2,100/month from your portfolio.",
  },
  {
    q: "Should I prioritise a 401(k) or IRA?",
    a: "Priority order for most people: (1) 401(k) up to employer match — this is a 50–100% instant return you can't beat; (2) HSA if eligible (triple tax advantaged); (3) Roth IRA to the annual contribution limit ($7,000 in 2025); (4) 401(k) to the annual maximum ($23,500 in 2025). Roth accounts (tax-free growth and withdrawals) are generally preferable if you expect to be in a higher tax bracket in retirement. Traditional accounts (tax-deferred) are better if you expect lower taxes in retirement.",
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
              <span className="text-blue-600 text-lg shrink-0">
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
          How to Use the Retirement Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — no account needed.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your current age and retirement target",
              body: "Set your current age and the age at which you plan to retire. The gap between these is your accumulation period — more years means more compounding time and a smaller required monthly contribution.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Early retirement math:</strong> Retiring at 55 instead
                  of 65 creates a double penalty: 10 fewer accumulation years
                  AND your portfolio must sustain you for 10 additional years.
                  This roughly doubles the required nest egg.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter current savings and monthly contribution",
              body: "Input your existing retirement savings balance and how much you currently contribute each month across all accounts (401k, IRA, etc). Include employer matching contributions in the monthly total — they are part of your effective savings rate.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Match optimisation:</strong> If your employer matches
                  50% of contributions up to 6% of salary, contributing at least
                  6% gives you a 3% salary bonus. This is always the first
                  priority before any other saving or investing.
                </div>
              ),
            },
            {
              n: 3,
              title: "Set expected return and inflation",
              body: "Use 6–7% for a diversified portfolio, 5% for conservative, 8% for aggressive. Set inflation to 2–3% — this adjusts your income target to reflect what it will actually cost to live in 20–30 years.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Real vs nominal:</strong> If you enter 7% return and
                  2.5% inflation, your real (purchasing-power-adjusted) return
                  is approximately 4.5%. The calculator shows your
                  inflation-adjusted monthly income need at retirement age.
                </div>
              ),
            },
            {
              n: 4,
              title: "Review the gap and adjust your plan",
              body: "The calculator shows whether you are on track, your projected nest egg, and — if there is a shortfall — how much additional monthly contribution would close the gap. Use this to set a specific savings increase target.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Rule of thumb:</strong> Increasing your savings rate
                  by 1% of salary per year until you reach your target is
                  psychologically easier than making one large jump. Automate
                  annual increases to coincide with pay rises.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📊",
              title: "Annual retirement review",
              desc: "Run the calculator each year with updated savings balance and contribution amounts to track progress.",
            },
            {
              emoji: "💼",
              title: "New job planning",
              desc: "Model the impact of a new salary, employer match, or benefits package on your retirement timeline.",
            },
            {
              emoji: "🎯",
              title: "Early retirement planning",
              desc: "Calculate the accelerated savings rate needed to retire at 50, 55, or 60 instead of the standard age.",
            },
            {
              emoji: "👫",
              title: "Couples planning",
              desc: "Run separate calculations for each partner and combine to get a household retirement projection.",
            },
            {
              emoji: "🔄",
              title: "Career change analysis",
              desc: "Model how a salary cut for a more fulfilling role affects your retirement date and nest egg.",
            },
            {
              emoji: "📈",
              title: "Contribution increase modelling",
              desc: "See the impact of increasing monthly contributions by $100, $200, or $500 on your projected nest egg.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⚠️</div>
          <h3 className="text-xl font-bold mb-3">
            For illustrative purposes only
          </h3>
          <p className="text-blue-100 leading-relaxed max-w-xl mx-auto text-sm">
            Retirement projections assume constant returns and contributions.
            Real markets fluctuate. This tool does not constitute financial
            advice. Consult a qualified financial planner for a personalised
            retirement strategy.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/savings-goal-calculator",
                label: "Savings Goal Calculator",
                desc: "Calculate how long to reach any savings milestone.",
              },
              {
                href: "/tools/investment-return-calculator",
                label: "Investment Return Calculator",
                desc: "Model returns on specific investment portfolios.",
              },
              {
                href: "/tools/net-worth-calculator",
                label: "Net Worth Calculator",
                desc: "Track your total assets and liabilities as a baseline for retirement planning.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
