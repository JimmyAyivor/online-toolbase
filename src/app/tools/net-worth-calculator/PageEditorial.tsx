"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/net-worth-calculator";
const TOOL_NAME = "Net Worth Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e1b4b", light: "#eef2ff" },
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
    "Free net worth calculator at https://www.onlinetoolbase.com",
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
const FAQS = [
  {
    q: "What is net worth and why does it matter?",
    a: "Net worth is the difference between everything you own (assets) and everything you owe (liabilities): Net Worth = Total Assets − Total Liabilities. It is the single most comprehensive snapshot of your financial position at any moment. Positive net worth means your assets exceed your debts. Negative net worth (more common than people realise, especially for young adults with student loans) means liabilities exceed assets. Net worth matters because it is the foundation for financial goals — it shows whether you are building wealth or accumulating debt, and tracks your progress over time.",
  },
  {
    q: "What counts as an asset?",
    a: "Assets are anything with monetary value that you own: cash and savings accounts, checking accounts, investment accounts (stocks, bonds, ETFs), retirement accounts (401k, IRA, pension values), property (home value, rental properties), vehicles (at current market value), business ownership stakes, valuable personal property (jewellery, art, collectibles with verifiable value), and money owed to you. Do not include depreciating consumer goods like ordinary furniture or clothing — only items with a resale value worth tracking.",
  },
  {
    q: "What counts as a liability?",
    a: "Liabilities are debts and financial obligations: mortgage balance (not your home's value — that's an asset), car loans, student loans, credit card balances, personal loans, medical debt, tax liabilities, and any other money you owe. Use current outstanding balances, not original loan amounts. If you have a business, include business debts only if you are personally liable for them.",
  },
  {
    q: "What is a good net worth?",
    a: "There is no universal 'good' net worth — it depends heavily on age, income, cost of living, and goals. Common benchmarks: by age 30, a net worth equal to your annual salary is a solid foundation; by 40, 3× salary; by 50, 6× salary; by 60, 8× salary. US Federal Reserve data shows the median net worth for Americans under 35 is approximately $39,000, rising to $409,000 for those 65 and older. Comparing yourself to age peers is more useful than comparing to absolute numbers.",
  },
  {
    q: "How often should I calculate my net worth?",
    a: "Monthly or quarterly is ideal for most people — frequent enough to see trends, not so frequent that short-term market fluctuations cause unnecessary anxiety. Track it in a simple spreadsheet with the date so you can chart progress over months and years. The trend line matters more than any single data point. A consistent upward trend — even slow — indicates you are building wealth.",
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
          How to Use the Net Worth Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — no account needed.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your assets",
              body: "Fill in all categories of assets: cash savings, investment accounts, retirement accounts, property value, vehicles. Use current market values for property (check Zillow or recent comparables) and vehicles (Kelley Blue Book or equivalent).",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Property valuation:</strong> For your home, use a
                  conservative current market estimate — not what you paid or
                  what you hope to sell for. Zillow, Redfin, or recent local
                  sales of comparable homes give a reasonable estimate.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your liabilities",
              body: "Input all outstanding debt balances — mortgage balance (not the original loan), car loan balance, student loan balance, credit card balances, and any other debts. Log into each account to get the exact current balance.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Credit card balances:</strong> Use the current
                  statement balance, not the credit limit. If you pay your cards
                  in full every month and your statement shows $0, enter $0 —
                  carrying no revolving debt is an asset to your net worth.
                </div>
              ),
            },
            {
              n: 3,
              title: "Add or remove line items",
              body: "Click the + Add item button to include assets or liabilities not in the default list — rental properties, business interests, crypto holdings, loans to family members, or any other financial items specific to your situation.",
              enrich: (
                <div className="bg-slate-50 rounded-xl px-5 py-4 text-sm text-slate-800 leading-relaxed">
                  <strong>Crypto and volatile assets:</strong> For
                  cryptocurrencies and other volatile assets, use today's value.
                  Consider adding a note that this figure fluctuates. Some
                  people track crypto and investments separately from 'stable'
                  net worth.
                </div>
              ),
            },
            {
              n: 4,
              title: "Track over time",
              body: "Your net worth today is most valuable as a baseline. Record it with today's date in a spreadsheet. Run the calculator again in 3 months and compare. Over time, this history becomes a motivational record of your financial progress.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Celebrate the trend:</strong> A net worth increasing
                  by $500/month — even from deeply negative — is meaningful
                  progress. At $500/month, you add $6,000/year and $60,000 per
                  decade to your position.
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
              emoji: "📅",
              title: "Annual financial review",
              desc: "Calculate net worth at the same time each year to track your wealth-building trajectory.",
            },
            {
              emoji: "🏦",
              title: "Loan application preparation",
              desc: "Many lenders request a personal financial statement — this calculator provides the key figures.",
            },
            {
              emoji: "💼",
              title: "Business planning",
              desc: "Separate personal and business net worth to assess personal financial exposure to business risk.",
            },
            {
              emoji: "🎯",
              title: "Goal-setting baseline",
              desc: "Set a net worth target for 1, 5, and 10 years out and reverse-engineer the monthly savings needed.",
            },
            {
              emoji: "👨\u200d👩\u200d👧",
              title: "Family estate planning",
              desc: "Calculate combined household net worth for estate planning, will preparation, or inheritance discussions.",
            },
            {
              emoji: "🤝",
              title: "Financial coaching",
              desc: "A starting net worth snapshot is the first step for any financial coach or planner engagement.",
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
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-bold mb-3">
            Your net worth is a snapshot, not a verdict
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            Net worth fluctuates with markets, property valuations, and life
            events. Track it regularly as a directional indicator of financial
            progress — not as a fixed measure of financial health.
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
                desc: "Use your net worth as the starting point for retirement planning.",
              },
              {
                href: "/tools/savings-goal-calculator",
                label: "Savings Goal Calculator",
                desc: "Model how monthly savings grows your net worth over time.",
              },
              {
                href: "/tools/budget-planner",
                label: "Budget Planner",
                desc: "Find ways to increase the gap between income and expenses to accelerate net worth growth.",
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
