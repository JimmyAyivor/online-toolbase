"use client";
import React, { useState } from "react";
import { Home, RotateCcw } from "lucide-react";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function RentAffordabilityCalculatorClient() {
  const [grossMonthly, setGrossMonthly] = useState("5000");
  const [grossType, setGrossType] = useState<"monthly" | "annual">("monthly");
  const [debts, setDebts] = useState("200");
  const [utilities, setUtilities] = useState("150");
  const [rule, setRule] = useState<"30" | "28" | "35">("30");

  const monthly =
    grossType === "annual"
      ? (parseFloat(grossMonthly) || 0) / 12
      : parseFloat(grossMonthly) || 0;
  const debt = parseFloat(debts) || 0;
  const util = parseFloat(utilities) || 0;
  const pct = parseInt(rule) / 100;

  const maxRent = monthly * pct;
  const maxAfterDebts = Math.max(0, maxRent - debt);
  const maxAfterAll = Math.max(0, maxAfterDebts - util);
  const leftover = monthly - maxRent - debt - util;
  const rentToIncomeRatio =
    monthly > 0 ? ((maxRent / monthly) * 100).toFixed(0) : "0";

  const getRatingColor = (rent: number) => {
    const ratio = rent / monthly;
    if (ratio <= 0.28) return { label: "Comfortable", color: "emerald" };
    if (ratio <= 0.33) return { label: "Manageable", color: "amber" };
    return { label: "Stretched", color: "red" };
  };
  const rating = getRatingColor(maxRent);

  return (
    <div className='min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mb-4 shadow-lg'>
              <Home className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Rent Affordability Calculator
            </h2>
            <p className='text-gray-500'>
              How much rent can you comfortably afford based on your income?
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-5'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Gross income
                </label>
                <div className='flex gap-2 mb-2'>
                  {(["monthly", "annual"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setGrossType(t)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize border-2 transition-all ${grossType === t ? "bg-violet-600 text-white border-violet-600" : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <input
                  value={grossMonthly}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGrossMonthly(e.target.value)
                  }
                  placeholder={grossType === "monthly" ? "5000" : "60000"}
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Monthly debt payments ($){" "}
                  <span className='text-gray-400 font-normal'>
                    car, student loan, etc.
                  </span>
                </label>
                <input
                  value={debts}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDebts(e.target.value)
                  }
                  placeholder='200'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Estimated monthly utilities ($)
                </label>
                <input
                  value={utilities}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUtilities(e.target.value)
                  }
                  placeholder='150'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Affordability rule
                </label>
                <div className='space-y-2'>
                  {(
                    [
                      [
                        "30",
                        "30% Rule (standard)",
                        "Most widely recommended benchmark",
                      ],
                      [
                        "28",
                        "28% Rule (conservative)",
                        "Preferred by many financial planners",
                      ],
                      [
                        "35",
                        "35% Rule (flexible)",
                        "Common in high cost-of-living cities",
                      ],
                    ] as [string, string, string][]
                  ).map(([v, label, desc]) => (
                    <button
                      key={v}
                      onClick={() => setRule(v as "30" | "28" | "35")}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${rule === v ? "bg-violet-600 text-white border-violet-600" : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"}`}
                    >
                      <p className='font-semibold text-sm'>{label}</p>
                      <p
                        className={`text-xs ${rule === v ? "text-violet-200" : "text-gray-400"}`}
                      >
                        {desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div
                className={`rounded-2xl p-6 border-2 bg-${rating.color}-50 border-${rating.color}-200`}
              >
                <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-1'>
                  Maximum monthly rent ({rule}% rule)
                </p>
                <p className={`text-5xl font-black text-${rating.color}-700`}>
                  {fmt(maxRent)}
                </p>
                <p
                  className={`text-sm font-semibold text-${rating.color}-600 mt-1`}
                >
                  {rating.label}
                </p>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                {[
                  { label: "After debts", value: fmt(maxAfterDebts) },
                  { label: "After debts + utils", value: fmt(maxAfterAll) },
                  { label: "Monthly income", value: fmt(monthly) },
                  { label: "Left after all", value: fmt(leftover) },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className='bg-violet-50 border border-violet-100 rounded-xl p-3 text-center'
                  >
                    <p className='text-lg font-black text-violet-700'>
                      {value}
                    </p>
                    <p className='text-xs text-gray-500 mt-0.5'>{label}</p>
                  </div>
                ))}
              </div>

              {leftover < 500 && monthly > 0 && (
                <div className='bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700'>
                  ⚠ After rent, debts, and utilities, you'd have{" "}
                  <strong>{fmt(leftover)}</strong>/month left — which may be
                  tight for food, transport, and savings. Consider a lower rent
                  or higher income.
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setGrossMonthly("5000");
              setGrossType("monthly");
              setDebts("200");
              setUtilities("150");
              setRule("30");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>
          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Rent budgeting tips:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Use gross income (before taxes) for the calculation — that's the
                standard the 30% rule is based on
              </li>
              <li>
                In high-cost cities (NYC, SF, London), 35–40% is common — focus
                on leftover after all fixed costs
              </li>
              <li>
                Include utilities, renters insurance, and parking in your true
                housing cost
              </li>
              <li>
                Aim to keep total housing + debt payments under 43% for mortgage
                qualification (DTI ratio)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
