"use client";
// src/app/tools/date-difference-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/date-difference-calculator";
const TOOL_NAME = "Date Difference Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#eff6ff" },
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
    "Free date difference calculator — days, weeks, months, workdays between any two dates. Instant results, no signup.",
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
                <span className="text-blue-600">✓ Copied!</span>
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
    q: "How is the date difference calculated?",
    a: "The calculator finds the exact number of milliseconds between the two dates using JavaScript's Date object, then converts that to the requested units. Days are calculated by dividing milliseconds by 86,400,000 (24×60×60×1000). Weeks are the total days divided by 7 (rounded down). Hours are milliseconds divided by 3,600,000. Minutes are milliseconds divided by 60,000. Workdays are counted by iterating through each day between the two dates and counting only Monday through Friday. Months are calculated based on calendar months (accounting for month-end dates) rather than using a fixed 30-day month. Years are derived from the month count divided by 12. For the most precise results, both dates are compared at midnight (start of day) in the local browser timezone.",
  },
  {
    q: "What counts as a workday?",
    a: "In this calculator, workdays are defined as Monday through Friday — any day that is not Saturday or Sunday. The calculator counts every calendar day between the two dates and excludes Saturdays and Sundays. It does not account for public holidays, bank holidays, or local non-working days, as these vary significantly by country, region, and company. If you need to calculate working days excluding specific holidays (for contractual deadlines, HR calculations, or project planning), you will need to manually subtract the relevant public holidays from the workday count this tool provides.",
  },
  {
    q: "Why is the month count different from what I expected?",
    a: "Month counting in date calculations is nuanced because months have different lengths (28, 29, 30, or 31 days) and 'one month later' from January 31st is ambiguous. This calculator uses calendar month counting: it counts how many calendar months have elapsed, taking into account whether the day-of-month in the end date is before or after the day-of-month in the start date. For example, from January 15 to March 10 is 1 month and some days (not 2 full months, because March 10 is before the 15th). From January 15 to March 20 is 2 months (because March 20 is after the 15th). This is the same method used by legal and financial contracts. If you need exact 30-day month equivalents, divide the total days by 30.",
  },
  {
    q: "Can I calculate the date difference between past or future dates?",
    a: "Yes — the calculator accepts any valid dates, including dates in the past and far future. There is no minimum or maximum date restriction. You can calculate the number of days between historical dates (e.g. two dates in the 19th century), or between a date today and a future date (e.g. a deadline or anniversary). If the end date you enter is earlier than the start date, the calculator shows an 'End date is before start date' notice and displays the absolute difference (the same result as if the dates were in the correct order). This is useful when you're not sure of the chronological order and just want the span.",
  },
  {
    q: "What's the difference between calendar days and business days?",
    a: "Calendar days are the total count of all days between two dates — including weekends and holidays. Business days (or working days) count only Monday–Friday. The difference matters in many contexts: legal and financial contracts often specify business days for deadlines (a '10 business day' deadline starting Monday means the deadline falls on the second Friday, not 10 calendar days later). Employment contracts, notice periods, and regulatory filings often use business days. Project management timelines typically use calendar days for scheduling but business days for resource planning. When in doubt, clarify which type of day is intended in any deadline or contractual context.",
  },
  {
    q: "Why do the hours and minutes counts seem very large for long date ranges?",
    a: "Hours and minutes are total elapsed units for the entire period, not average hours or minutes per day. A 365-day period contains 8,760 hours (365 × 24) and 525,600 minutes (365 × 24 × 60). These large numbers are correct and can be useful in specific contexts: software systems that work with elapsed time in hours or minutes, rental or billing periods calculated per hour, or simple curiosity about how many minutes since an event. For most human planning contexts, the days and weeks figures are more intuitive. The hours figure is the same as 'total hours in the period' which is useful for billing, energy consumption calculations, or duration analysis.",
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
              <span className="text-blue-600 text-lg shrink-0">
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
          How to Use the Date Difference Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Select a start date and end date, and the calculator instantly shows
          the difference in days, weeks, months, years, hours, minutes,
          workdays, and weekend days.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your start and end dates",
              body: "Click the Start Date field and type or use the date picker to select your start date. Do the same for the End Date. Results update instantly as you change either date — there's no need to click a Calculate button. The start date defaults to today when the page loads; clear it and enter any date you need. The calculator accepts any valid past or future dates.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Tip:</strong> If you don't know the exact date, use
                  the quick preset buttons below the inputs — 'Last 30 days',
                  'Last 90 days', 'Last 365 days', and 'Next 30 days' will
                  automatically fill in the correct dates for each common range.
                  These are useful for quickly checking how many workdays fall
                  in a recent or upcoming period.
                </div>
              ),
            },
            {
              n: 2,
              title: "Read the results",
              body: "Eight metrics are displayed simultaneously: Days (total calendar days), Weeks (complete weeks), Months (calendar months), Years (complete years), Hours (total elapsed hours), Minutes (total elapsed minutes), Workdays (Monday–Friday count), and Weekend days (Saturday–Sunday count). All update instantly when you change either date. Use the metric most relevant to your need — for project deadlines, workdays is often most useful; for age or anniversary calculations, years and days are most relevant.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Metric
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Definition
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Common use
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Days",
                          "Total calendar days including weekends",
                          "Contract deadlines, age calculation",
                        ],
                        [
                          "Weeks",
                          "Complete 7-day weeks",
                          "Project timelines, subscription durations",
                        ],
                        [
                          "Months",
                          "Calendar months (not exact 30-day units)",
                          "Lease lengths, employment periods",
                        ],
                        [
                          "Years",
                          "Complete calendar years",
                          "Age, anniversary, tenure calculation",
                        ],
                        [
                          "Workdays",
                          "Monday–Friday days only",
                          "Business deadlines, HR notice periods",
                        ],
                        [
                          "Weekend days",
                          "Saturday–Sunday days only",
                          "Staffing, availability planning",
                        ],
                        [
                          "Hours",
                          "Total elapsed hours",
                          "Billing, rental, energy calculations",
                        ],
                        [
                          "Minutes",
                          "Total elapsed minutes",
                          "Software timestamps, time tracking",
                        ],
                      ].map(([metric, def, use]) => (
                        <tr key={metric} className="hover:bg-blue-50">
                          <td className="px-4 py-2 font-bold text-blue-700 text-xs whitespace-nowrap">
                            {metric}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-700">
                            {def}
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
              n: 3,
              title: "Use quick presets for common ranges",
              body: "The Quick Presets section below the results provides four common date ranges with a single click: Last 30 days (start 30 days ago, end today), Last 90 days (a quarter), Last 365 days (a full year), and Next 30 days (today to 30 days ahead). These presets are useful for quickly checking how many workdays fall in the past month, quarter, or year — useful for business reporting, HR calculations, or billing period analysis.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Practical example:</strong> If you're wondering how
                  many working days fell in Q1 of the current year, set the
                  start date to January 1 and the end date to March 31 — the
                  Workdays count will tell you the number of Monday-to-Friday
                  days in that quarter (typically 64–66 depending on the year).
                  Subtract any bank holidays manually for your specific
                  country's working day count.
                </div>
              ),
            },
            {
              n: 4,
              title: "Handle reversed dates",
              body: "If you accidentally enter an end date that is earlier than the start date, the calculator shows an amber notice ('End date is before start date — results show the absolute difference') and continues to display the correct absolute difference. This means you don't need to worry about which date comes first — the results will always show the correct span between the two dates regardless of order.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>No bank holidays:</strong> The workday count excludes
                  Saturdays and Sundays but does not account for public
                  holidays, bank holidays, or local non-working days. These vary
                  by country and region — subtract the relevant holidays from
                  the workday count manually if you need a precise business-day
                  calculation for contractual or legal purposes.
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
              emoji: "📅",
              title: "Project deadline planning",
              desc: "Calculate how many calendar days or workdays remain until a project deadline — or how many days a past project took.",
            },
            {
              emoji: "👔",
              title: "Employment and HR",
              desc: "Calculate notice periods, employment tenure, probation lengths, and contract durations in days, weeks, or months.",
            },
            {
              emoji: "🎂",
              title: "Age and anniversary",
              desc: "Calculate exact age in days, weeks, and years — or how many days until or since an anniversary or birthday.",
            },
            {
              emoji: "⚖️",
              title: "Legal and contractual",
              desc: "Calculate contract durations, limitation periods, and deadline compliance in calendar days or business days.",
            },
            {
              emoji: "💰",
              title: "Financial periods",
              desc: "Calculate the number of days in a billing period, interest accrual period, or investment holding period.",
            },
            {
              emoji: "🗓️",
              title: "Event planning",
              desc: "Count down days to an event, calculate how long a past event lasted, or figure out how many weekends remain in a period.",
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
          <div className="text-3xl mb-3">📅</div>
          <h3 className="text-xl font-bold mb-3">
            Calendar days and business days are different things — always
            clarify which applies to your deadline
          </h3>
          <p className="text-blue-100 leading-relaxed max-w-xl mx-auto text-sm">
            A common source of confusion in contracts, employment agreements,
            and project schedules is whether deadlines are expressed in calendar
            days (every day including weekends) or business days (Monday–Friday
            only). A '10 calendar day' deadline starting on a Monday falls the
            following Wednesday. A '10 business day' deadline starting on the
            same Monday falls on the second Friday (two weeks later). For legal
            and contractual deadlines, always confirm which type of day is
            specified — 'days' in legal documents typically means calendar days
            unless explicitly stated as business days. This calculator shows
            both counts so you can verify whichever applies to your specific
            situation.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Calculator Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/timestamp-converter",
                label: "Timestamp Converter",
                desc: "Convert Unix timestamps to readable dates and times — convert between formats instantly.",
              },
              {
                href: "/tools/countdown-timer",
                label: "Countdown Timer",
                desc: "Count down to any future date or event — set a target date and see days, hours, and minutes remaining.",
              },
              {
                href: "/tools/age-calculator",
                label: "Age Calculator",
                desc: "Calculate exact age in years, months, and days from a birth date to today or any specific date.",
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
