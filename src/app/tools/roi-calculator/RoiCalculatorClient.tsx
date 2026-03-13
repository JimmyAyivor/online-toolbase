"use client";
import React, { useState, useMemo } from "react";
import { TrendingUp, RotateCcw } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtPct(n: number): string {
  return n.toFixed(2) + "%";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RoiCalculatorClient() {
  const [investment, setInvestment] = useState<string>("");
  const [returns, setReturns] = useState<string>("");
  const [period, setPeriod] = useState<string>("1");

  const results = useMemo(() => {
    const inv = parseFloat(investment) || 0;
    const ret = parseFloat(returns) || 0;
    const yrs = parseFloat(period) || 1;
    if (inv <= 0) return null;
    const profit = ret - inv;
    const roi = (profit / inv) * 100;
    const annRoi = ret > 0 ? (Math.pow(ret / inv, 1 / yrs) - 1) * 100 : 0;
    const multiple = ret / inv;
    return { profit, roi, annRoi, multiple, inv, ret };
  }, [investment, returns, period]);

  const reset = (): void => {
    setInvestment("");
    setReturns("");
    setPeriod("1");
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <TrendingUp className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              ROI Calculator
            </h2>
            <p className='text-gray-600'>
              Calculate return on investment for any project or campaign
            </p>
          </div>

          <div className='space-y-6'>
            {/* Inputs */}
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Initial Investment ($)
                  </label>
                  <input
                    type='number'
                    value={investment}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInvestment(e.target.value)
                    }
                    placeholder='e.g. 10000'
                    min={0}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Final Value / Total Return ($)
                  </label>
                  <input
                    type='number'
                    value={returns}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setReturns(e.target.value)
                    }
                    placeholder='e.g. 15000'
                    min={0}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Time Period (years)
                  </label>
                  <input
                    type='number'
                    value={period}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPeriod(e.target.value)
                    }
                    placeholder='e.g. 2'
                    min={0.1}
                    step={0.5}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                </div>

                <div className='flex items-end'>
                  <button
                    onClick={reset}
                    className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
                  >
                    <RotateCcw className='w-4 h-4' />
                    Reset All
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {results && (
              <div className='space-y-4'>
                <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
                  <h3 className='text-xl font-bold text-gray-800 mb-4'>
                    Results
                  </h3>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {[
                      {
                        label: "ROI",
                        value: fmtPct(results.roi),
                        highlight: true,
                      },
                      {
                        label: "Annualised ROI",
                        value: fmtPct(results.annRoi),
                        highlight: true,
                      },
                      {
                        label: "Net Profit",
                        value: `$${fmt(results.profit)}`,
                        highlight: true,
                      },
                      {
                        label: "Return Multiple",
                        value: `${results.multiple.toFixed(2)}×`,
                        highlight: true,
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className='bg-white rounded-lg p-4'>
                        <div
                          className={`text-2xl font-bold ${
                            results.profit >= 0
                              ? "text-indigo-600"
                              : "text-red-600"
                          }`}
                        >
                          {value}
                        </div>
                        <div className='text-sm text-gray-600'>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Breakdown */}
                <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                  <table className='w-full'>
                    <thead className='bg-gray-100 sticky top-0'>
                      <tr>
                        {["Metric", "Value"].map((h) => (
                          <th
                            key={h}
                            className='px-4 py-3 text-left text-sm font-semibold text-gray-700'
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {[
                        {
                          label: "Initial Investment",
                          value: `$${fmt(results.inv)}`,
                        },
                        { label: "Final Value", value: `$${fmt(results.ret)}` },
                        {
                          label: "Net Profit / Loss",
                          value: `$${fmt(results.profit)}`,
                        },
                        { label: "ROI", value: fmtPct(results.roi) },
                        {
                          label: "Annualised ROI",
                          value: fmtPct(results.annRoi),
                        },
                        {
                          label: "Return Multiple",
                          value: `${results.multiple.toFixed(2)}×`,
                        },
                        {
                          label: "Time Period",
                          value: `${period} year${Number(period) !== 1 ? "s" : ""}`,
                        },
                      ].map(({ label, value }) => (
                        <tr key={label} className='hover:bg-gray-50'>
                          <td className='px-4 py-3 text-sm font-medium text-gray-700'>
                            {label}
                          </td>
                          <td className='px-4 py-3 text-sm text-gray-800'>
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                ROI = (Net Profit ÷ Investment) × 100 — a positive ROI means you
                made money
              </li>
              <li>
                Annualised ROI accounts for time — it lets you compare
                investments held for different periods
              </li>
              <li>
                A 2× return multiple means you doubled your money regardless of
                the percentage
              </li>
              <li>
                For marketing campaigns, enter your ad spend as the investment
                and total revenue as the return
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
