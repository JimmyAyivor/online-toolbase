"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/savings-goal-calculator";
const TOOL_NAME = "Savings Goal Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#064e3b", light: "#ecfdf5" },
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
    "Free savings goal calculator at onlinetoolbase.com",
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
const FAQS = [
  {
    q: "How does compound interest affect my savings goal?",
    a: "Compound interest means you earn interest on both your original deposit and the interest already accumulated. Over time this creates exponential growth — commonly called 'the snowball effect'. For example, $10,000 earning 4% annually becomes $14,800 after 10 years without any additional contributions, purely through compounding. The longer your timeframe, the more dramatic the effect. This is why starting earlier — even with smaller amounts — often beats starting later with larger amounts.",
  },
  {
    q: "What is a high-yield savings account (HYSA)?",
    a: "A high-yield savings account is a savings account that pays significantly more interest than a standard savings account. Traditional bank savings accounts often pay 0.01–0.1% APY, while HYSAs at online banks typically offer 4–5% APY (as of 2024–2025). They are FDIC-insured (up to $250,000) and work identically to regular savings accounts. Examples include Marcus by Goldman Sachs, Ally Bank, SoFi, and many credit unions. Switching to an HYSA is one of the highest-impact, lowest-effort changes you can make to your savings plan.",
  },
  {
    q: "Should I pay off debt or save toward a goal first?",
    a: "The answer depends on interest rates. If your debt carries a higher interest rate than your savings return (e.g. 20% credit card debt vs 5% savings), pay off the debt first — it is mathematically equivalent to a guaranteed 20% investment. If your debt interest rate is lower than your expected investment return (e.g. 3% car loan vs 7% stock market), contributing to savings/investments while making minimum debt payments may make sense. Always eliminate high-interest consumer debt before prioritising non-emergency savings goals.",
  },
  {
    q: "How much should I save each month?",
    a: "The most widely recommended guideline is the 50/30/20 rule: 50% of take-home pay for needs, 30% for wants, and 20% for savings and debt repayment. For specific goals, work backwards from your target: if you need $12,000 in 2 years, that's $500/month. Emergency fund priority should be 3–6 months of expenses before focusing on other goals. Once the emergency fund is in place, prioritise retirement savings (especially if your employer offers matching contributions) before other savings goals.",
  },
  {
    q: "What interest rate should I use in the calculator?",
    a: "Use the rate from the specific account where you plan to save. For HYSAs in 2024–2025, 4–5% APY is realistic. For a standard savings account, use 0.5% or lower. For a money market account, 3–4%. For bonds or CDs, check current rates. For long-term investment accounts (stocks), historical average is roughly 7% real return (after inflation), though this carries risk and is not appropriate for short-term goals. Using a slightly conservative rate (1–2% below your expected rate) builds in a useful margin of safety.",
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
              <span className="text-emerald-600 text-lg shrink-0">
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
          How to Use the Savings Goal Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — no account needed.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your savings goal amount",
              body: "Type the total amount you want to save — your goal could be an emergency fund, holiday, home deposit, or any other target. Use round numbers for clarity; precision matters less than getting started.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Goal-setting tip:</strong> Break large goals into
                  milestones. If your goal is $30,000, celebrate when you hit
                  $10,000 and $20,000 — milestone rewards reinforce the saving
                  habit.
                </div>
              ),
            },
            {
              n: 2,
              title: "Set your starting balance and interest rate",
              body: "Enter how much you already have saved toward this goal. Then enter the annual interest rate of your savings account. Check your bank's current rate — switching to a high-yield account can dramatically reduce the time to reach your goal.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Rate impact example:</strong> At $500/month with a
                  $5,000 start, the difference between 0.5% APY (traditional
                  bank) and 4.5% APY (HYSA) on a $20,000 goal is about 3–4
                  months saved.
                </div>
              ),
            },
            {
              n: 3,
              title: "Choose your mode and run the calculation",
              body: "Use 'How long?' to see how many months at your current savings rate. Use 'How much/month?' to find the monthly amount needed to hit your goal by a specific date. Both modes show total contributions and interest earned separately.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Which mode to use:</strong> Use 'How long?' for
                  ongoing savings habits. Use 'How much/month?' when you have a
                  deadline — holiday, wedding, lease end — and need to
                  reverse-engineer the required contribution.
                </div>
              ),
            },
            {
              n: 4,
              title: "Adjust to find your optimal plan",
              body: "Experiment: what happens if you increase monthly savings by $50? How much does a higher-rate account shave off the timeline? Use these scenarios to find a plan that fits your budget without requiring perfect conditions.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Automate it:</strong> Once you've found your target
                  monthly amount, set up an automatic transfer on payday.
                  Automating savings before discretionary spending is the single
                  most consistent predictor of savings success.
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
              emoji: "🏠",
              title: "Home deposit savings",
              desc: "Calculate how long to save a down payment and model the impact of different monthly savings rates.",
            },
            {
              emoji: "🚗",
              title: "Vehicle purchase",
              desc: "Plan a cash purchase to avoid car loan interest — model the required monthly savings.",
            },
            {
              emoji: "✈️",
              title: "Holiday fund",
              desc: "Set a travel goal and find the monthly savings amount needed to hit it by your departure date.",
            },
            {
              emoji: "🎓",
              title: "Education fund",
              desc: "Project savings growth for tuition, certifications, or course fees over 1–4 year horizons.",
            },
            {
              emoji: "🛡️",
              title: "Emergency fund",
              desc: "Calculate how long to reach 3–6 months of expenses at your current monthly savings rate.",
            },
            {
              emoji: "💍",
              title: "Major life event",
              desc: "Model savings for weddings, renovations, or other large planned expenses with a firm deadline.",
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
          <div className="text-3xl mb-3">💰</div>
          <h3 className="text-xl font-bold mb-3">
            Results are projections, not guarantees
          </h3>
          <p className="text-emerald-100 leading-relaxed max-w-xl mx-auto text-sm">
            Compound interest calculations assume a constant annual rate. Real
            savings account rates vary. Always verify with your bank or
            financial institution before making savings decisions.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/retirement-calculator",
                label: "Retirement Calculator",
                desc: "Project your retirement nest egg and monthly contribution needed.",
              },
              {
                href: "/tools/investment-return-calculator",
                label: "Investment Return Calculator",
                desc: "Model returns across stocks, bonds, and mixed portfolios.",
              },
              {
                href: "/tools/budget-planner",
                label: "Budget Planner",
                desc: "Find extra savings capacity by breaking down your monthly spending.",
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
