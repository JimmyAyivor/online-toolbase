"use client";
// src/app/tools/loan-mortgage-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/loan-mortgage-calculator";
const TOOL_NAME = "Loan & Mortgage Calculator";

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
    "Free loan & mortgage calculator — monthly payments, total interest, and amortisation schedule for home, auto, or personal loans. No signup.",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const RATE_TABLE = [
  ["$150,000", "5.0%", 15, "$1,186", "$63,480"],
  ["$150,000", "6.5%", 30, "$949", "$191,640"],
  ["$300,000", "5.0%", 30, "$1,610", "$179,600"],
  ["$300,000", "6.5%", 30, "$1,896", "$382,560"],
  ["$500,000", "6.5%", 30, "$3,160", "$637,600"],
  ["$500,000", "7.0%", 15, "$4,494", "$308,920"],
];

const FAQS = [
  {
    q: "How is a monthly mortgage payment calculated?",
    a: "Monthly mortgage payments use the standard loan amortisation formula: M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], where P is the principal (loan amount minus down payment), r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (years × 12). For example, a $250,000 loan at 6.5% for 30 years: r = 0.065/12 = 0.005417; n = 360; M = 250,000 × [0.005417 × (1.005417)^360] ÷ [(1.005417)^360 − 1] = $1,580.17 per month. Over 30 years, total payments = $568,861 — meaning $318,861 goes to interest on a $250,000 principal. This is why even a small reduction in interest rate or a larger down payment saves a substantial amount over the life of the loan.",
  },
  {
    q: "What is an amortisation schedule and how does it work?",
    a: "An amortisation schedule shows how each monthly payment is split between principal and interest over the life of the loan. In the early months, most of the payment goes to interest because the outstanding balance is high. As the balance decreases with each payment, progressively more goes toward principal. For a $250,000 mortgage at 6.5% for 30 years with a $1,580 monthly payment: Month 1 — $1,354 goes to interest, only $226 to principal. Month 60 — ~$1,289 interest, ~$291 principal. Month 180 — ~$1,143 interest, ~$437 principal. Month 360 — ~$9 interest, ~$1,571 principal. This slow start on principal reduction is why making extra principal payments in the early years of a mortgage has an outsized effect on the total interest paid and the loan payoff date.",
  },
  {
    q: "How does the down payment affect my mortgage?",
    a: "A larger down payment reduces your loan in three important ways. First, it directly reduces the principal, which lowers every monthly payment and reduces the total interest paid over the life of the loan. Second, putting at least 20% down typically eliminates the requirement for Private Mortgage Insurance (PMI), which typically adds 0.5–1.5% of the loan amount annually — on a $300,000 loan, that's $1,500–$4,500 per year in additional cost. Third, a lower loan-to-value ratio (LTV) often qualifies you for a better interest rate, further reducing both monthly payments and total cost. The trade-off is that a larger down payment depletes cash reserves that could be invested elsewhere. The optimal down payment depends on your emergency fund, other investment opportunities, and how long you plan to stay in the property.",
  },
  {
    q: "Is a 15-year mortgage or 30-year mortgage better?",
    a: "A 15-year mortgage has higher monthly payments but substantially lower total interest cost. On a $300,000 loan at 6.5%: a 30-year mortgage has a monthly payment of ~$1,896 and total interest of ~$382,560. The same loan on a 15-year term at 6.0% (15-year rates are typically lower) has a monthly payment of ~$2,532 — $636 more per month — but total interest of only ~$155,760, saving over $226,000. The 15-year is better if you can comfortably afford the higher payment, plan to stay in the property long-term, and prioritise building equity quickly. The 30-year is better if the lower payment gives you flexibility to invest the difference, if you might move within a few years, or if cash flow is a concern. Many financial advisors suggest a 30-year mortgage but making extra principal payments when possible to get the flexibility of the lower required payment with the interest savings of accelerated payoff.",
  },
  {
    q: "What costs are not included in this calculator?",
    a: "This calculator computes the principal and interest (P&I) component of a mortgage payment. A real mortgage payment often includes additional costs, commonly bundled into an 'PITI' payment: Property taxes (T) — typically 1–2% of home value per year, added to monthly payments held in escrow by the lender. Homeowner's insurance (I) — typically $100–200/month depending on coverage and location. Private Mortgage Insurance (PMI) if down payment is less than 20% — typically 0.5–1.5% of loan annually. HOA fees if applicable. For a full picture, budget approximately $300–600/month in additional costs on top of the calculated P&I payment for a median US home, though this varies significantly by location and property type.",
  },
  {
    q: "How does paying extra principal each month affect the loan?",
    a: "Making additional principal payments reduces the outstanding balance faster, which reduces the interest charged in every subsequent period (since interest accrues on the remaining balance). The compounding effect is significant: adding just $100/month in extra principal to a $300,000 mortgage at 6.5% for 30 years saves approximately $57,000 in total interest and pays off the loan about 4.5 years early. Adding $500/month saves about $151,000 and pays off the loan 10 years early. The savings are highest in the early years because interest is charged on a larger balance. If you make extra payments, ensure your lender applies them to principal and not future payments — specify 'apply to principal' on payment instructions. Some mortgages have prepayment penalties, so check your loan terms before making large lump-sum payments.",
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
          How to Use the Loan & Mortgage Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Select the loan type, adjust the sliders for amount, down payment,
          rate, and term — the monthly payment, total cost, and first-year
          amortisation update instantly.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Select the loan type",
              body: "Click one of the three loan type buttons at the top: Home Mortgage, Auto Loan, or Personal Loan. The selected type is highlighted in emerald. The loan type is informational — it does not change the underlying calculation (which is the standard amortisation formula), but it helps you frame the inputs appropriately. Home mortgages typically have longer terms (15–30 years) and lower rates; auto loans are typically 3–7 years; personal loans are typically 1–7 years at higher rates.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Loan
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Rate
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Term
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Monthly*
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Total interest*
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {RATE_TABLE.map(
                        ([amount, rate, term, monthly, interest]) => (
                          <tr
                            key={`loan-${amount}-${rate}-${term}`}
                            className="hover:bg-emerald-50"
                          >
                            <td className="px-4 py-2 text-xs font-medium text-gray-900">
                              {amount}
                            </td>
                            <td className="px-4 py-2 text-xs font-bold text-emerald-700">
                              {rate}
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-600">
                              {term}yr
                            </td>
                            <td className="px-4 py-2 text-xs font-mono text-gray-900">
                              {monthly}
                            </td>
                            <td className="px-4 py-2 text-xs font-mono text-orange-700">
                              {interest}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                  <p className="px-4 py-2 text-xs text-gray-400 italic">
                    *Principal & interest only — excludes tax, insurance, and
                    PMI.
                  </p>
                </div>
              ),
            },
            {
              n: 2,
              title: "Set the loan amount and down payment",
              body: "Drag the Loan Amount slider between $10,000 and $1,000,000, or type a specific value. Then set the Down Payment — the slider maximum adjusts automatically to match the loan amount. The principal used in the calculation is the loan amount minus the down payment, shown in the Payment Breakdown as the principal portion. A down payment of at least 20% of the home purchase price typically eliminates the need for Private Mortgage Insurance (PMI), which this calculator does not include.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Down payment impact:</strong> On a $400,000 home at
                  6.5% for 30 years: a 10% down payment ($40,000) means a
                  $360,000 principal with a $2,275/month payment and $459,000 in
                  total interest. A 20% down payment ($80,000) means a $320,000
                  principal with $2,023/month and $408,680 in total interest —
                  saving $252/month and $50,320 in interest, plus eliminating
                  PMI costs of potentially $1,600–4,800 per year.
                </div>
              ),
            },
            {
              n: 3,
              title: "Adjust interest rate and loan term",
              body: "Set the Interest Rate slider from 0.1% to 20% in 0.1% increments — the current rate is shown in the label. Set the Loan Term from 1 to 30 years. Both updates recalculate all results instantly. The interest rate has a large effect on both monthly payment and total cost: a 1 percentage point increase in rate on a $300,000 30-year mortgage raises the monthly payment by about $190 and adds approximately $68,000 to the total interest paid. The loan term affects the monthly payment significantly but total interest even more — a 30-year term has a lower monthly payment but far more total interest than a 15-year term.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Rate vs term trade-off on $300k mortgage:</strong>{" "}
                  6.5% / 30yr → $1,896/mo, $382k total interest. 6.5% / 15yr →
                  $2,614/mo, $170k total interest — $718 more per month but
                  $212k less in interest. 5.5% / 30yr → $1,703/mo, $313k total
                  interest — a 1% rate drop saves $193/mo and $69k in interest
                  over 30 years.
                </div>
              ),
            },
            {
              n: 4,
              title: "Read the results and amortisation schedule",
              body: "The Monthly Payment is shown prominently in the emerald panel. Below it, the Total Payment includes the down payment plus all monthly payments, and the Total Interest shows how much of that total is interest. The Payment Breakdown bar chart shows the principal vs interest split as percentages. If inputs are valid, the Amortisation Schedule (First Year) table shows the month-by-month breakdown of each payment — how much goes to interest, how much to principal, and the remaining balance after each payment.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Reading the amortisation table:</strong> In the early
                  months, interest dominates — on a $250,000 loan at 6.5%, month
                  1 directs ~$1,354 to interest and only ~$226 to principal. By
                  month 120 (year 10), the split is still roughly $1,180
                  interest to $400 principal. It's not until about year 22 of a
                  30-year mortgage that the principal payment finally exceeds
                  the interest payment in each instalment.
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
              title: "Home buying budgeting",
              desc: "Find the maximum home price you can afford by working backwards from a monthly payment you're comfortable with.",
            },
            {
              emoji: "🔄",
              title: "Refinancing comparison",
              desc: "Compare your current mortgage rate and remaining balance against a potential refinance rate to see if the numbers justify refinancing.",
            },
            {
              emoji: "🚗",
              title: "Auto loan planning",
              desc: "Calculate monthly payments for different car prices, down payments, and loan terms before visiting the dealership.",
            },
            {
              emoji: "📊",
              title: "15 vs 30 year comparison",
              desc: "Compare the monthly payment difference and total interest savings between a 15-year and 30-year mortgage for the same loan amount.",
            },
            {
              emoji: "💸",
              title: "Extra payment planning",
              desc: "Understand the principal vs interest split to see how extra principal payments in the early years have an outsized impact on total interest.",
            },
            {
              emoji: "📝",
              title: "Personal loan evaluation",
              desc: "Evaluate whether a personal loan's interest rate and term result in affordable payments before applying.",
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
          <div className="text-3xl mb-3">⚠️</div>
          <h3 className="text-xl font-bold mb-3">
            This calculator shows principal and interest only — your true
            monthly cost includes tax, insurance, and possibly PMI
          </h3>
          <p className="text-emerald-100 leading-relaxed max-w-xl mx-auto text-sm">
            A real mortgage payment typically includes four components known as
            PITI: Principal, Interest, property Taxes, and homeowner's
            Insurance. Lenders usually collect tax and insurance monthly and
            hold them in escrow, releasing payments when due. On a $400,000
            home, annual property taxes might be $5,000–8,000 ($417–667/month)
            and homeowner's insurance $1,200–2,400 ($100–200/month). If your
            down payment is less than 20%, add PMI of roughly 0.5–1.5% of the
            loan annually. These costs can add $600–1,000 or more per month on
            top of the principal and interest payment this calculator shows —
            always budget for the full PITI when assessing affordability.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Finance Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/compound-interest-calculator",
                label: "Compound Interest Calculator",
                desc: "Calculate how savings or investments grow over time with compound interest and regular contributions.",
              },
              {
                href: "/tools/mortgage-affordability-calculator",
                label: "Mortgage Affordability Calculator",
                desc: "Find out how much mortgage you can afford based on your income, debts, and down payment.",
              },
              {
                href: "/tools/investment-return-calculator",
                label: "Investment Return Calculator",
                desc: "Calculate the total return and annual growth rate of any investment over a specified period.",
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
