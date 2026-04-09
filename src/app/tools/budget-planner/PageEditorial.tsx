"use client";
// src/app/tools/budget-planner/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/budget-planner";
const TOOL_NAME = "Budget Planner";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (!c && canvasRef.current)
        Q.toCanvas(canvasRef.current, TOOL_URL, {
          width: 220,
          margin: 2,
          color: { dark: "#1e3a5f", light: "#f0f7ff" },
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
          aria-label="Close"
        >
          ✕
        </button>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-white"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="3" height="3" rx="0.5" />
            <rect x="18" y="14" width="3" height="3" rx="0.5" />
            <rect x="14" y="18" width="3" height="3" rx="0.5" />
            <rect x="18" y="18" width="3" height="3" rx="0.5" />
          </svg>
        </div>
        <h3 className="text-lg font-black text-gray-900 mb-1">
          Take it with you
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          Scan to open {TOOL_NAME} on mobile
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
  const st = encodeURIComponent(
    "Free monthly budget planner — track income and expenses to see where your money goes",
  );
  const su = encodeURIComponent(TOOL_URL);
  const copyLink = () => {
    navigator.clipboard.writeText(TOOL_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const SHARES = [
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${st}&url=${su}`,
      bg: "bg-black hover:bg-gray-800",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${su}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${su}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${st}%20${su}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
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
            {SHARES.map(({ label, href, bg, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${label}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                {icon}
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all"
            >
              {copied ? (
                <>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy link
                </>
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                  clipRule="evenodd"
                />
                <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
              </svg>
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
    q: "What is the 50/30/20 budget rule?",
    a: "The 50/30/20 rule divides your after-tax income into three buckets: 50% for needs (housing, utilities, groceries, insurance, transport), 30% for wants (dining out, entertainment, travel, hobbies), and 20% for savings and debt repayment. It's a popular starting framework because it's simple and flexible — but in high-cost cities, the 50% needs category often needs to go higher, squeezing other areas.",
  },
  {
    q: "Should I budget from gross or net income?",
    a: "Budget from your net (take-home) income for practical spending planning, since that's what you actually have available. Use gross income when calculating your savings rate as a percentage (since employer 401k matches and payroll deductions come out before you see your pay). If you're tracking everything including pre-tax savings like 401(k) contributions, gross is more comprehensive.",
  },
  {
    q: "How do I handle irregular expenses?",
    a: "For irregular expenses like car registration, annual insurance premiums, or holiday gifts, calculate the annual total and divide by 12 to get a monthly figure. Add a 'Sinking funds' category to your budget at that monthly amount, and put that money into a dedicated savings account. When the bill arrives, you'll have the money waiting rather than scrambling.",
  },
  {
    q: "What is a good savings rate?",
    a: "Financial independence research (the FIRE movement) suggests that a 50% savings rate leads to financial independence in roughly 17 years from a zero starting point. The standard financial planning benchmark is 15–20% (including employer contributions). At 10%, you're building a cushion but slowly. Below 5% leaves you vulnerable to any unexpected expense.",
  },
  {
    q: "How often should I review my budget?",
    a: "Review your budget monthly — compare actual bank and card spending against your plan and adjust category amounts based on reality. Do a bigger annual review each January to reset targets based on income changes, new financial goals, and lifestyle changes. Many budgeting apps sync with your accounts to automate the tracking; this planner is a great place to set the plan before importing it there.",
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
        aria-labelledby="how-to-use-heading"
      >
        <h2
          id="how-to-use-heading"
          className="text-4xl font-bold text-gray-900 mb-4 text-center"
        >
          How to Use the Budget Planner
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your monthly income and expenses across any categories you
          choose, and see your balance, savings rate, and spending breakdown
          update live as you type.
        </p>

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Enter your monthly income
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Type your gross or net monthly income into the income field at
                the top. You can use gross (pre-tax) if you want to budget from
                your full earnings, or net (take-home) if you want to plan from
                what actually hits your bank account. Be consistent — use the
                same basis for all figures.
              </p>
              <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                <strong>Multiple income sources?</strong> Add all sources
                together before entering — freelance income, side jobs, rental
                income, and investment dividends all count. Include only
                reliable, recurring income; exclude windfalls.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Fill in your expense categories
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                The planner comes pre-loaded with eight common expense
                categories. Enter your monthly amount for each that applies. You
                can rename any category by clicking on the label and typing, add
                new rows with the + button, or delete rows you don't need with
                the trash icon.
              </p>
              <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                <strong>Don't know your exact amounts?</strong> Check your last
                3 bank and card statements and average the category totals. Most
                people underestimate groceries and dining by 30–40% — the
                statements don't lie.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Read your savings rate
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                The savings rate gauge updates as you enter expenses. A rate of
                20%+ is shown in green — excellent. 10–19% is yellow — good but
                improvable. Under 10% is red — review your expenses for easy
                cuts. The 20% benchmark comes from the 50/30/20 budgeting rule,
                which divides income into needs, wants, and savings.
              </p>
              <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                <strong>
                  Savings rate = (Income − Expenses) ÷ Income × 100.
                </strong>{" "}
                If you have remaining money but it's unallocated, it's not being
                saved by default — explicitly allocate it to a savings line item
                to make your plan intentional.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Review the expense breakdown
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                The breakdown bars below the summary show each spending category
                as a percentage of total expenses, sorted from largest to
                smallest. Categories that dominate your budget are your
                highest-leverage targets for reduction. Even trimming the top
                two or three categories by 10% can meaningfully improve your
                savings rate.
              </p>
              <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                <strong>The 50/30/20 rule check:</strong> Add up your Needs
                (rent, utilities, groceries, transport, insurance). They should
                be under 50% of income. Wants (dining, entertainment,
                subscriptions) under 30%. Savings and debt repayment at least
                20%.
              </div>
            </div>
          </div>
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common use cases
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl mb-3">🏠</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Monthly household budgeting
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Plan all household income and expenses in one view — rent,
              utilities, groceries, and everything else — to know exactly where
              your money goes.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl mb-3">🎓</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Student budgeting
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Budget a student income from part-time work or loans across rent,
              food, transport, and study costs to avoid overdraft.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl mb-3">💍</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Wedding or event saving
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Allocate a monthly savings amount toward a big event and track it
              against regular expenses to see if the timeline is realistic.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl mb-3">🌍</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Relocation planning
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Compare your current city budget with an estimated budget for a
              new city to understand the true cost-of-living difference.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl mb-3">💼</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Career break planning
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Map out expenses for a period of reduced income to see how long
              savings will last and where costs can be cut.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl mb-3">🏡</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              First home saving
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Track monthly expenses and savings contributions toward a house
              deposit goal to see your timeline and identify areas to save
              faster.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-bold mb-3">For planning purposes only</h3>
          <p className="text-blue-100 leading-relaxed max-w-xl mx-auto text-sm">
            This tool helps you plan and estimate — it does not sync with your
            bank or track real transactions. For accurate spending tracking, use
            a bank app or dedicated budgeting software alongside this planner.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/tools/savings-goal-calculator"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Savings Goal Calculator
              </div>
              <div className="text-xs text-gray-500">
                Calculate how long to reach a savings target or how much to save
                monthly.
              </div>
            </a>
            <a
              href="/tools/rent-affordability-calculator"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Rent Affordability Calculator
              </div>
              <div className="text-xs text-gray-500">
                Find out how much rent you can comfortably afford.
              </div>
            </a>
            <a
              href="/tools/net-worth-calculator"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Net Worth Calculator
              </div>
              <div className="text-xs text-gray-500">
                Calculate total net worth: assets minus liabilities.
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
