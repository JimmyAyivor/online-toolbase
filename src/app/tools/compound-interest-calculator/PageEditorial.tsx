"use client";
// src/app/tools/compound-interest-calculator/PageEditorial.tsx
//
// Drop inside <SidebarAdLayout> in page.tsx, after <CalorieMacroCalculatorClient />.
// Requires: npm i qrcode @types/qrcode

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

const TOOL_URL =
  "https://onlinetoolbase.com/tools/compound-interest-calculator";
const TOOL_NAME = "Compound Interest Calculator";

// ─── QR Modal ────────────────────────────────────────────────────────────────

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#f0f7ff" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors'
          aria-label='Close QR code modal'
        >
          ✕
        </button>

        <div className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            className='w-6 h-6 text-white'
            stroke='currentColor'
            strokeWidth={2}
          >
            <rect x='3' y='3' width='7' height='7' rx='1' />
            <rect x='14' y='3' width='7' height='7' rx='1' />
            <rect x='3' y='14' width='7' height='7' rx='1' />
            <rect x='14' y='14' width='3' height='3' rx='0.5' />
            <rect x='18' y='14' width='3' height='3' rx='0.5' />
            <rect x='14' y='18' width='3' height='3' rx='0.5' />
            <rect x='18' y='18' width='3' height='3' rx='0.5' />
          </svg>
        </div>

        <h3 className='text-lg font-black text-gray-900 mb-1'>
          Take it with you
        </h3>
        <p className='text-sm text-gray-400 mb-5 leading-relaxed'>
          Scan with your phone camera to open the {TOOL_NAME} on mobile
        </p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-blue-100 shadow-inner mb-5'>
          <canvas ref={canvasRef} />
        </div>
        <p className='text-xs text-gray-300 font-mono break-all'>{TOOL_URL}</p>
      </div>
    </div>
  );
}

// ─── Share Bar ────────────────────────────────────────────────────────────────

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = encodeURIComponent(
    "Free compound interest calculator — see exactly how your money grows over time",
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
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
        </svg>
      ),
    },
  ];

  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <p className='text-sm font-bold text-gray-900 mb-0.5'>
              Found this useful?
            </p>
            <p className='text-xs text-gray-400'>
              Share the tool or scan to open it on your phone
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {SHARES.map(({ label, href, bg, icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Share on ${label}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                {icon}
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className='inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all'
            >
              {copied ? (
                <>
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-3.5 h-3.5 text-green-600'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-green-600'>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-3.5 h-3.5'
                  >
                    <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
                    <path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z' />
                  </svg>
                  Copy link
                </>
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5'
              aria-label='Open QR code to scan on mobile'
            >
              <svg
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-3.5 h-3.5'
              >
                <path
                  fillRule='evenodd'
                  d='M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z'
                  clipRule='evenodd'
                />
                <path d='M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z' />
              </svg>
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main editorial export ────────────────────────────────────────────────────

export default function PageEditorial() {
  return (
    <>
      {/* ── Ad: below tool ──────────────────────────────────────────────── */}
      <div className='max-w-6xl mx-auto px-4 mt-6 flex justify-center'>
        <div className='hidden sm:block'>
          <AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className='block sm:hidden'>
          <AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>

      {/* ── Ad: leaderboard ─────────────────────────────────────────────── */}
      <div className='max-w-6xl mx-auto px-4 mt-4 flex justify-center'>
        <AdSlot
          variant='leaderboard'
          slotId={SLOT_LEADERBOARD}
          className='hidden sm:flex'
        />
        <AdSlot
          variant='mediumrectangle'
          slotId={SLOT_LEADERBOARD}
          className='flex sm:hidden'
        />
      </div>

      {/* ── Share bar ───────────────────────────────────────────────────── */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
        <ShareBar />
      </div>

      {/* ── How to use ──────────────────────────────────────────────────── */}
      <section
        id='how-to-use'
        className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'
        aria-labelledby='how-to-use-heading'
      >
        <h2
          id='how-to-use-heading'
          className='text-4xl font-bold text-gray-900 mb-4 text-center'
        >
          How to Use the Compound Interest Calculator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Enter your investment details and see exactly how your money grows
          year by year — with a live chart, a full breakdown of principal vs
          contributions vs interest, and an effective return rate.
        </p>

        {/* ── Steps ── */}
        <div className='space-y-6 mb-14'>
          {/* Step 1 */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
              1
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                Enter your initial investment
              </h3>
              <p className='text-gray-600 leading-relaxed mb-3'>
                Type your starting balance into the{" "}
                <strong>Initial Investment</strong> field. This is the lump sum
                you're investing today — your principal. It can be as small as
                $1 or as large as you like; the formula scales identically.
              </p>
              <div className='bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed'>
                <strong>Not sure what to enter?</strong> Use your current
                savings balance, the amount you're planning to invest, or any
                round number to explore the maths. You can adjust it instantly —
                all results update live with every keystroke.
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
              2
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                Set the annual interest rate and time period
              </h3>
              <p className='text-gray-600 leading-relaxed mb-4'>
                Enter an <strong>Annual Interest Rate</strong> as a percentage
                and drag the <strong>Time Period</strong> slider between 1 and
                50 years. Both update the chart and summary instantly.
              </p>
              <div className='space-y-2'>
                {[
                  {
                    label: "Savings account (typical)",
                    range: "0.5 – 2%",
                    note: "Most high-street savings accounts. Low return but guaranteed and liquid.",
                  },
                  {
                    label: "High-yield savings / bonds",
                    range: "3 – 5%",
                    note: "Online savings accounts, short-term government bonds, or CDs.",
                  },
                  {
                    label: "Diversified index fund (historical avg)",
                    range: "6 – 8%",
                    note: "S&P 500 historically returns ~7% annualised after inflation. Commonly used as a planning benchmark.",
                  },
                  {
                    label: "Aggressive growth / individual stocks",
                    range: "8 – 12%",
                    note: "Higher potential return, higher risk and volatility. Not guaranteed.",
                  },
                ].map(({ label, range, note }) => (
                  <div
                    key={label}
                    className='flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3'
                  >
                    <code className='text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded flex-shrink-0 mt-0.5 whitespace-nowrap'>
                      {range}
                    </code>
                    <div>
                      <p className='font-semibold text-gray-900 mb-0.5'>
                        {label}
                      </p>
                      <p className='text-gray-500 leading-relaxed'>{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
              3
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                Choose a compound frequency
              </h3>
              <p className='text-gray-600 leading-relaxed mb-4'>
                The <strong>Compound Frequency</strong> dropdown determines how
                often interest is calculated and added to your balance. More
                frequent compounding means slightly higher returns — because
                each period's interest starts earning interest sooner.
              </p>
              <div className='overflow-x-auto rounded-xl border border-gray-100 mb-4'>
                <table className='w-full text-sm'>
                  <thead className='bg-gray-50 border-b border-gray-100'>
                    <tr>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>
                        Frequency
                      </th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>
                        Times / year
                      </th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>
                        Common for
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-50'>
                    {[
                      {
                        freq: "Annually",
                        n: "1",
                        use: "Bonds, some savings accounts, simple planning",
                      },
                      {
                        freq: "Semi-annually",
                        n: "2",
                        use: "Some government bonds, certain fixed deposits",
                      },
                      {
                        freq: "Quarterly",
                        n: "4",
                        use: "Many savings accounts and investment products",
                      },
                      {
                        freq: "Monthly",
                        n: "12",
                        use: "Most savings accounts, mortgages, credit cards",
                      },
                      {
                        freq: "Daily",
                        n: "365",
                        use: "High-yield online savings accounts",
                      },
                    ].map(({ freq, n, use }) => (
                      <tr
                        key={freq}
                        className='hover:bg-blue-50 transition-colors'
                      >
                        <td className='px-4 py-2.5 font-medium text-gray-900 text-xs'>
                          {freq}
                        </td>
                        <td className='px-4 py-2.5 font-mono text-blue-600 text-xs'>
                          {n}
                        </td>
                        <td className='px-4 py-2.5 text-gray-400 text-xs'>
                          {use}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className='text-sm text-gray-500'>
                For most long-term investment planning, the difference between
                monthly and daily compounding is small — a fraction of a percent
                over decades. The rate and time period matter far more.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
              4
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                Add regular contributions (optional)
              </h3>
              <p className='text-gray-600 leading-relaxed mb-4'>
                The <strong>Regular Contributions</strong> panel lets you model
                ongoing deposits alongside your lump sum. Set a contribution
                amount and how often you'll make it. Set both to zero (or leave
                blank) to calculate lump-sum growth only.
              </p>
              <p className='text-gray-600 leading-relaxed mb-4'>
                Regular contributions often have a bigger impact than the
                interest rate itself — especially in the first decade. A
                $100/month contribution to a 7% investment over 30 years adds
                more to the final balance than doubling the initial lump sum.
              </p>
              <div className='bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed'>
                <strong>
                  Match the contribution frequency to your pay cycle:
                </strong>{" "}
                If you're paid monthly, set contributions to Monthly. If weekly,
                set to Annually and divide your annual savings target by 52 to
                find the weekly equivalent — or simply use the annual total in
                the contribution field on Annual frequency.
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
              5
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                Read the results and growth chart
              </h3>
              <p className='text-gray-600 leading-relaxed mb-4'>
                The results panel shows four numbers and a line chart that
                updates live:
              </p>
              <div className='space-y-2 mb-5'>
                {[
                  {
                    label: "Initial Investment",
                    color: "bg-indigo-100 text-indigo-700",
                    desc: "Your starting lump sum — unchanged throughout the calculation.",
                  },
                  {
                    label: "Contributions",
                    color: "bg-purple-100 text-purple-700",
                    desc: "The total of all regular deposits you'll make over the time period, excluding interest.",
                  },
                  {
                    label: "Interest Earned",
                    color: "bg-green-100 text-green-700",
                    desc: "The amount generated purely by compound growth — money you didn't put in yourself.",
                  },
                  {
                    label: "Final Amount",
                    color: "bg-blue-600 text-white",
                    desc: "The sum of all three: what your investment is worth at the end of the period.",
                  },
                ].map(({ label, color, desc }) => (
                  <div
                    key={label}
                    className='flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3'
                  >
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${color}`}
                    >
                      {label}
                    </span>
                    <p className='text-gray-600 leading-relaxed'>{desc}</p>
                  </div>
                ))}
              </div>
              <p className='text-gray-600 leading-relaxed text-sm mb-3'>
                The <strong>line chart</strong> plots all four lines across
                every year of the period. The divergence between the Total line
                and the Principal + Contributions lines is the visual
                representation of compounding at work — the gap that widens
                exponentially over time.
              </p>
              <p className='text-gray-600 leading-relaxed text-sm'>
                The <strong>Effective Annual Return</strong> in the summary is
                the total percentage gain on everything you put in (principal +
                contributions), annualised over the period. Use it to compare
                this scenario against a different rate, time period, or
                contribution level.
              </p>
            </div>
          </div>
        </div>

        {/* ── The maths ── */}
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6'>
          <h3 className='text-xl font-bold text-gray-900 mb-4'>
            How the calculation works
          </h3>
          <p className='text-gray-600 leading-relaxed mb-5 text-sm'>
            The calculator uses two standard formulas and combines them at each
            year interval to build the chart:
          </p>
          <div className='space-y-4 mb-5'>
            {[
              {
                label: "Lump sum compound growth",
                formula: "A = P × (1 + r/n)^(n×t)",
                vars: "P = principal, r = annual rate, n = compound frequency, t = years",
              },
              {
                label: "Future value of regular contributions",
                formula: "FV = PMT × m × ((1 + r/n)^(n×t) − 1) / (r/n)",
                vars: "PMT = contribution amount, m = contribution frequency per year",
              },
            ].map(({ label, formula, vars }) => (
              <div
                key={label}
                className='bg-gray-50 rounded-xl border border-gray-100 px-5 py-4'
              >
                <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>
                  {label}
                </p>
                <code className='text-sm font-mono font-bold text-blue-700 block mb-1'>
                  {formula}
                </code>
                <p className='text-xs text-gray-400'>{vars}</p>
              </div>
            ))}
          </div>
          <p className='text-sm text-gray-500 leading-relaxed'>
            The final balance at any year is the sum of both formulas. The
            interest earned is the final balance minus total principal minus
            total contributions made to that point.
          </p>
        </div>

        {/* ── Scenarios ── */}
        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
          Scenarios worth modelling
        </h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14'>
          {[
            {
              emoji: "🎓",
              title: "Starting early vs starting late",
              desc: "Run the same inputs twice — once starting at 25 and once at 35. The 10-year head start typically doubles the final amount, showing why time is the most powerful variable in compounding.",
            },
            {
              emoji: "📈",
              title: "The cost of a 1% difference",
              desc: "Compare 6% vs 7% over 30 years on the same principal. A 1% difference in rate compounds to a 25–35% difference in final value — the maths case for choosing investments carefully.",
            },
            {
              emoji: "💳",
              title: "Debt as negative compound interest",
              desc: "Enter a credit card APR (18–25%) as the rate to see compound interest working against you. The same mathematics that build wealth accelerate debt when the sign flips.",
            },
            {
              emoji: "🏦",
              title: "Savings account vs index fund",
              desc: "Compare 1.5% (savings) vs 7% (index fund estimate) over 20 years on the same monthly contribution. The gap is the opportunity cost of keeping long-term savings in cash.",
            },
            {
              emoji: "🎯",
              title: "Reverse-engineering a goal",
              desc: "Set your target final amount, then adjust principal and contribution until you hit it. Use the calculator to find the minimum monthly contribution needed to reach a specific number.",
            },
            {
              emoji: "📅",
              title: "Contribution frequency impact",
              desc: "Keep everything identical but change contributions from Annual to Monthly. Monthly contributions get 11 extra months of compounding in year 1 alone — see how it accumulates over decades.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        {/* ── Disclaimer ── */}
        <div className='bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>📊</div>
          <h3 className='text-xl font-bold mb-3'>
            For planning purposes — not financial advice
          </h3>
          <p className='text-blue-100 leading-relaxed max-w-xl mx-auto text-sm'>
            This calculator uses standard compound interest formulas to
            illustrate mathematical growth. Real investment returns vary, are
            not guaranteed, and past performance does not predict future
            results. For decisions involving significant capital, consult a
            qualified financial adviser. All calculations run in your browser —
            no data is sent to a server.
          </p>
        </div>

        {/* ── Related tools ── */}
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Finance Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/mortgage-calculator",
                label: "Mortgage Calculator",
                desc: "Calculate monthly repayments, total interest, and the full cost of any mortgage.",
              },
              {
                href: "/tools/roi-calculator",
                label: "ROI Calculator",
                desc: "Calculate return on investment and compare the profitability of different options.",
              },
              {
                href: "/tools/invoice-generator",
                label: "Invoice Generator",
                desc: "Create professional invoices instantly — free, no account required.",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5'
                aria-label={`${link.label} — ${link.desc}`}
              >
                <div className='font-bold text-gray-900 text-sm mb-1'>
                  {link.label}
                </div>
                <div className='text-xs text-gray-500'>{link.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
