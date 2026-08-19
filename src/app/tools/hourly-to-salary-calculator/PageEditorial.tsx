"use client";
// src/app/tools/hourly-to-salary-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/hourly-to-salary-calculator";
const TOOL_NAME = "Hourly to Salary Calculator";

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
    "Free hourly to salary calculator — convert hourly wage to annual salary or salary to hourly rate instantly",
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
    q: "How is annual salary calculated from hourly rate?",
    a: "Annual salary = Hourly rate × Hours per week × Weeks per year. The standard assumption for a full-time employee is 40 hours per week and 52 weeks per year, giving 2,080 working hours annually. So a $25/hour wage equals $52,000 per year gross. Adjust the hours and weeks fields if your work schedule differs — for example, part-time workers or those with unpaid leave periods.",
  },
  {
    q: "Are these figures before or after tax?",
    a: "All figures shown are gross (before-tax) amounts. Your actual take-home pay depends on your tax filing status, deductions, retirement contributions, health insurance premiums, and applicable federal, state, and local taxes. To estimate net pay, you'll need to apply your marginal tax rate or use a dedicated paycheck calculator that accounts for your specific withholdings.",
  },
  {
    q: "What does biweekly pay mean?",
    a: "Biweekly means paid every two weeks — 26 pay periods per year. It is the most common pay schedule in the US. This differs from semi-monthly (twice a month, 24 pay periods per year). The biweekly amount shown is two weeks' worth of pay (weekly rate × 2). Some months have three biweekly pay periods, which is worth knowing for budgeting.",
  },
  {
    q: "How do I compare a salary offer with my current hourly rate?",
    a: "Switch to Salary → Hourly mode and enter the offered annual salary. Keep your standard hours (40/week, 52 weeks) to get the direct hourly equivalent. If the offered role requires more hours — say 50 per week — enter 50 in the hours field. The resulting lower hourly rate helps you compare like-for-like when evaluating whether the salary offer represents a pay increase, decrease, or lateral move relative to your current hourly wage.",
  },
  {
    q: "How should I handle paid time off in this calculation?",
    a: "If your salary includes paid vacation and sick days, you work fewer than 52 paid weeks but still receive pay for all 52. In that case, keep weeks at 52 — your hourly rate over actual working hours will be slightly higher than the standard calculation. If you are comparing with a role that offers no paid leave, reduce the weeks field to 50 (for 2 weeks unpaid) to get the true comparison on an hours-worked basis.",
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
        aria-labelledby="how-to-use-heading"
      >
        <h2
          id="how-to-use-heading"
          className="text-4xl font-bold text-gray-900 mb-4 text-center"
        >
          How to Use the Hourly to Salary Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your hourly rate or annual salary and instantly see the full pay
          breakdown — hourly, daily, weekly, biweekly, monthly, and annual — so
          you can compare job offers and negotiate with confidence.
        </p>

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Choose your starting point
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Select <strong>Hourly → Salary</strong> if you know your hourly
                rate and want to see the annual equivalent, or{" "}
                <strong>Salary → Hourly</strong> if you have a salary offer and
                want to know what it works out to per hour. Both directions
                calculate the full breakdown simultaneously.
              </p>
              <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                <strong>Comparing offers?</strong> Run both your current rate
                and the new offer through the calculator to see the difference
                in annual terms. Even a $1/hour difference equals $2,080/year at
                full time.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Set your hours per week and weeks per year
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The default of 40 hours/week and 52 weeks/year (2,080 annual
                hours) is correct for a standard full-time employee. Adjust
                these for your situation:
              </p>
              <div className="space-y-2">
                {[
                  {
                    label: "Part-time (20h/week)",
                    value: "20 hrs / 52 wks",
                    note: "Half-time employment — annual equals exactly half the full-time equivalent",
                  },
                  {
                    label: "Contract with 2 wks unpaid",
                    value: "40 hrs / 50 wks",
                    note: "Common for contractors — 50 working weeks after two weeks without pay",
                  },
                  {
                    label: "Overtime-heavy role",
                    value: "50 hrs / 52 wks",
                    note: "Some salaried roles expect 50+ hours — this reveals the true hourly equivalent",
                  },
                ].map(({ label, value, note }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <code className="bg-white border border-gray-200 rounded px-2 py-0.5 font-mono text-blue-600 text-xs flex-shrink-0">
                      {value}
                    </code>
                    <div>
                      <p className="font-semibold text-gray-900 mb-0.5">
                        {label}
                      </p>
                      <p className="text-gray-500 leading-relaxed">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Read the full pay breakdown
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                The results panel shows six pay periods side by side. The large
                figure at the top is the primary result (annual salary or hourly
                rate), with all intermediate periods below. All figures are
                gross — pre-tax. These numbers are what you'd see on an offer
                letter or contract, before any deductions.
              </p>
              <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                <strong>For budgeting:</strong> The monthly figure is your gross
                monthly pay. A rough rule of thumb for estimating take-home is
                to multiply gross by 0.70–0.75 for moderate income brackets,
                though your actual figure depends on tax filing status and
                deductions.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Use the result in salary negotiations
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Knowing your target annual salary in hourly terms gives you a
                powerful negotiating anchor. If you're currently earning
                $28/hour and want a 10% raise, calculate $28 × 1.10 =
                $30.80/hour, then convert that to an annual figure to frame your
                salary request. Presenting an annual number often feels less
                confrontational than quoting an hourly rate.
              </p>
            </div>
          </div>
        </div>

        <FAQSection />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How the calculation works
          </h3>
          <p className="text-gray-600 leading-relaxed mb-5 text-sm">
            All six pay period figures derive from a single formula:
          </p>
          <div className="space-y-4">
            {[
              {
                label: "Annual salary",
                formula: "Hourly rate × Hours per week × Weeks per year",
                vars: "e.g. $25 × 40 × 52 = $52,000",
              },
              {
                label: "Monthly",
                formula: "Annual ÷ 12",
                vars: "$52,000 ÷ 12 = $4,333.33",
              },
              {
                label: "Daily (5-day week)",
                formula: "Weekly ÷ 5",
                vars: "($25 × 40) ÷ 5 = $200 per day",
              },
            ].map(({ label, formula, vars }) => (
              <div
                key={label}
                className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4"
              >
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {label}
                </p>
                <code className="text-sm font-mono font-bold text-blue-700 block mb-1">
                  {formula}
                </code>
                <p className="text-xs text-gray-400">{vars}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Scenarios worth calculating
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "💼",
              title: "Evaluating a job offer",
              desc: "When you receive a salary offer, convert it to hourly to see what it's worth per hour of your time — especially if the role involves expected overtime or a longer commute.",
            },
            {
              emoji: "🤝",
              title: "Negotiating a pay raise",
              desc: "Calculate the annual value of any percentage raise you're targeting. A 5% raise on a $50,000 salary is $2,500 — equivalent to an extra $1.20/hour.",
            },
            {
              emoji: "🔄",
              title: "Switching from contract to perm",
              desc: "Contractors often earn higher hourly rates to offset benefits they don't receive. Compare the equivalent annual salary to a permanent offer to see which is genuinely better.",
            },
            {
              emoji: "🌍",
              title: "International salary comparison",
              desc: "Convert salary figures from job listings in different countries (after currency conversion) to hourly rates for a fair comparison — especially when hours norms differ.",
            },
            {
              emoji: "📊",
              title: "Setting your freelance rate",
              desc: "Divide your desired annual income by 1,000 (accounting for ~50% billable hours from a 2,000-hour year) to find a sustainable freelance hourly rate that covers taxes and non-billable time.",
            },
            {
              emoji: "🏖️",
              title: "Valuing paid leave",
              desc: "If a lower-salary role offers more paid leave, calculate the hourly equivalent of both roles at actual worked hours. Extra paid weeks can offset a significant salary difference.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-bold mb-3">
            For planning purposes — not financial advice
          </h3>
          <p className="text-blue-100 leading-relaxed max-w-xl mx-auto text-sm">
            Results show gross pre-tax figures based on the hours and weeks you
            enter. Actual take-home pay depends on your tax situation, benefits
            deductions, and withholdings. For personalised financial guidance,
            consult a qualified professional.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Calculator Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/pay-raise-calculator",
                label: "Pay Raise Calculator",
                desc: "Calculate the dollar and percentage value of a pay raise.",
              },
              {
                href: "/tools/freelance-rate-calculator",
                label: "Freelance Rate Calculator",
                desc: "Find your ideal freelance hourly rate based on your income goals.",
              },
              {
                href: "/tools/budget-planner",
                label: "Budget Planner",
                desc: "Plan your monthly budget and track spending across categories.",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
              >
                <div className="font-bold text-gray-900 text-sm mb-1">
                  {link.label}
                </div>
                <div className="text-xs text-gray-500">{link.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
