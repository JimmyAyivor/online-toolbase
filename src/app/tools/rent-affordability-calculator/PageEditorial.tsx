"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL =
  "https://www.onlinetoolbase.com/tools/rent-affordability-calculator";
const TOOL_NAME = "Rent Affordability Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#3b0764", light: "#f5f3ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-violet-100 shadow-inner mb-5">
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
    "Free rent affordability calculator at https://www.onlinetoolbase.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is the 30% rent rule?",
    a: "The 30% rule states that you should spend no more than 30% of your gross (pre-tax) monthly income on housing costs. It originated in US housing policy in the 1980s and became the default affordability benchmark. For example, if your gross monthly income is $5,000, the 30% rule suggests keeping rent at or below $1,500. The rule is a useful starting point but does not account for high-cost cities, varying lifestyle costs, or different income levels — someone earning $10,000/month has more flexibility above 30% than someone earning $3,000/month.",
  },
  {
    q: "Is the 30% rule realistic in expensive cities?",
    a: "In high cost-of-living cities like New York, San Francisco, London, Sydney, and Toronto, the 30% rule is frequently impossible to achieve. Many renters in these cities spend 40–50% of income on housing. In these markets, focus on what remains after rent rather than the percentage: ensure you have enough left for food, transport, savings, and an emergency fund. Some financial planners use a modified rule for expensive cities: keep total fixed costs (rent + utilities + loan payments) under 50% of net income.",
  },
  {
    q: "Should I use gross or net income for the calculation?",
    a: "The 30% rule traditionally uses gross income (before taxes and deductions). However, since you actually live on your net (take-home) income, many planners argue net income is more practical. As a rough guide: if you use gross income at 30%, that's approximately equivalent to 40–45% of net income for a typical tax burden. Using net income with a 35–40% threshold is a reasonable alternative for practical budgeting.",
  },
  {
    q: "What costs should I include in my housing budget?",
    a: "Beyond base rent, include: utilities (electricity, gas, water, internet — typically $100–300/month), renters insurance ($15–30/month), parking ($50–300/month in cities), pet fees or pet deposits if applicable, and any building amenity fees. In some markets, landlords charge separately for water, trash, or building amenity access. Your total housing cost is rent plus all these recurring fees — compare this total to the calculator's affordability figure.",
  },
  {
    q: "How does existing debt affect rent affordability?",
    a: "Lenders use the Debt-to-Income (DTI) ratio to assess borrowing capacity: total monthly debt payments divided by gross monthly income. For renters, landlords often require that rent plus existing debt payments stay below 40–43% of gross income. This calculator lets you input existing monthly debt payments and shows both the raw affordability limit and the adjusted limit after debts — giving a more realistic picture than the simple percentage rule alone.",
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
              <span className="text-violet-600 text-lg shrink-0">
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
          How to Use the Rent Affordability Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — no account needed.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your gross income",
              body: "Input your gross (pre-tax) monthly income, or switch to annual and the calculator converts it. If you have multiple income sources, add them together — freelance, part-time, rental income, etc. all count toward affordability.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Income instability note:</strong> If your income is
                  variable (freelance, commission, seasonal), use your lowest
                  typical month, not your average or best month. Rent is a fixed
                  obligation — size it to your floor, not your ceiling.
                </div>
              ),
            },
            {
              n: 2,
              title: "Add existing debt payments",
              body: "Enter your total monthly debt obligations: car payments, student loan minimums, credit card minimums, personal loans. This reduces your effective rent budget and gives a more accurate picture of true affordability.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Debt impact example:</strong> At $5,000 gross income,
                  the 30% rule gives a $1,500 rent budget. With $400 in monthly
                  debt payments, your practical rent ceiling drops to about
                  $1,100 to keep total debt obligations manageable.
                </div>
              ),
            },
            {
              n: 3,
              title: "Include estimated utilities",
              body: "Add your expected monthly utilities (electricity, gas, water, internet). Many people budget only for base rent and are caught off guard — true housing costs including utilities are typically 15–25% higher than the listed rent amount.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Utility estimation:</strong> If you haven't rented in
                  the building before, ask the landlord for average utility
                  costs for the unit. Many landlords will provide this on
                  request, especially for electricity and gas.
                </div>
              ),
            },
            {
              n: 4,
              title: "Choose your affordability rule and review",
              body: "Select the 30% (standard), 28% (conservative), or 35% (flexible for HCOL areas) rule based on your situation. Review the 'left after all' figure — this is what you'd have monthly after rent, debts, and utilities for food, transport, savings, and discretionary spending.",
              enrich: (
                <div className="bg-fuchsia-50 rounded-xl px-5 py-4 text-sm text-fuchsia-800 leading-relaxed">
                  <strong>The leftover test:</strong> Whatever affordability
                  rule you use, ensure the leftover amount covers: food
                  (~$300–600/month), transport (~$100–400), savings (at least
                  10% of income), and some discretionary spending. If it
                  doesn't, the rent is too high regardless of the percentage.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🔍",
              title: "Apartment search budgeting",
              desc: "Set your maximum rent before starting your search to avoid falling in love with unaffordable listings.",
            },
            {
              emoji: "🤝",
              title: "Flatmate split planning",
              desc: "Calculate combined household affordability and find apartments within range for multiple income earners.",
            },
            {
              emoji: "📍",
              title: "City comparison",
              desc: "Compare affordability in different cities by adjusting income and rent levels to see which markets are viable.",
            },
            {
              emoji: "📊",
              title: "Financial review",
              desc: "Annual check-in: has your income grown enough to afford a better apartment, or should you stay put?",
            },
            {
              emoji: "💼",
              title: "New job relocation",
              desc: "Before accepting a job in a new city, model rent affordability on the offered salary in that market.",
            },
            {
              emoji: "🏦",
              title: "Rental application preparation",
              desc: "Know your DTI ratio before applying — landlords often reject applicants where rent exceeds 33% of gross income.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-violet-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🏠</div>
          <h3 className="text-xl font-bold mb-3">
            Estimates only — local markets vary significantly
          </h3>
          <p className="text-violet-100 leading-relaxed max-w-xl mx-auto text-sm">
            Rent affordability depends on your full financial picture including
            savings, job stability, credit, and local market conditions. This
            calculator provides guidelines — not personalised financial advice.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/mortgage-affordability-calculator",
                label: "Mortgage Affordability Calculator",
                desc: "See when renting vs buying makes financial sense for your income.",
              },
              {
                href: "/tools/budget-planner",
                label: "Budget Planner",
                desc: "Build a complete monthly budget around your rent target.",
              },
              {
                href: "/tools/net-worth-calculator",
                label: "Net Worth Calculator",
                desc: "Track assets and liabilities as you work toward a home deposit.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-violet-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
