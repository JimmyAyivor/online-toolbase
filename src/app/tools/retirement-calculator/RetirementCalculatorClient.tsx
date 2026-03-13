"use client";
import React, { useState } from "react";
import { TrendingUp, RotateCcw } from "lucide-react";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function RetirementCalculatorClient() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("25000");
  const [monthlyContrib, setMonthlyContrib] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [monthlyNeeds, setMonthlyNeeds] = useState("4000");
  const [inflationRate, setInflationRate] = useState("2.5");

  const ca = parseInt(currentAge) || 30;
  const ra = parseInt(retirementAge) || 65;
  const cs = parseFloat(currentSavings) || 0;
  const mc = parseFloat(monthlyContrib) || 0;
  const ar = parseFloat(annualReturn) / 100;
  const mn = parseFloat(monthlyNeeds) || 0;
  const ir = parseFloat(inflationRate) / 100;
  const mr = ar / 12;
  const yearsToRetire = Math.max(0, ra - ca);
  const months = yearsToRetire * 12;

  // Future value of current savings + monthly contributions
  const fvSavings = cs * Math.pow(1 + mr, months);
  const fvContrib = months > 0 ? mc * ((Math.pow(1 + mr, months) - 1) / mr) : 0;
  const projectedNest = fvSavings + fvContrib;

  // Inflation-adjusted monthly needs at retirement
  const adjustedMonthly = mn * Math.pow(1 + ir, yearsToRetire);
  // 4% withdrawal rule safe nest egg target (25x annual)
  const targetNest = adjustedMonthly * 12 * 25;
  const onTrack = projectedNest >= targetNest;
  const gap = Math.abs(projectedNest - targetNest);

  // Required additional monthly to hit target
  const additionalNeeded = (() => {
    if (onTrack || months <= 0) return 0;
    const need = targetNest - fvSavings;
    return need > 0 ? (need * mr) / (Math.pow(1 + mr, months) - 1) - mc : 0;
  })();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg'>
              <TrendingUp className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Retirement Calculator
            </h2>
            <p className='text-gray-500'>
              Project your nest egg and see if you're on track to retire
              comfortably
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              {[
                { label: "Current age", val: currentAge, set: setCurrentAge },
                {
                  label: "Target retirement age",
                  val: retirementAge,
                  set: setRetirementAge,
                },
                {
                  label: "Current retirement savings ($)",
                  val: currentSavings,
                  set: setCurrentSavings,
                },
                {
                  label: "Monthly contribution ($)",
                  val: monthlyContrib,
                  set: setMonthlyContrib,
                },
                {
                  label: "Expected annual return (%)",
                  val: annualReturn,
                  set: setAnnualReturn,
                },
                {
                  label: "Monthly income needed in retirement ($)",
                  val: monthlyNeeds,
                  set: setMonthlyNeeds,
                },
                {
                  label: "Expected inflation rate (%)",
                  val: inflationRate,
                  set: setInflationRate,
                },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    {label}
                  </label>
                  <input
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(e.target.value)
                    }
                    className='w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              ))}
            </div>

            <div className='space-y-4'>
              <div
                className={`rounded-2xl p-6 border-2 ${onTrack ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}
              >
                <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-1'>
                  Projected nest egg at {retirementAge}
                </p>
                <p
                  className={`text-4xl font-black ${onTrack ? "text-emerald-700" : "text-red-600"}`}
                >
                  {fmt(projectedNest)}
                </p>
                <p
                  className={`text-sm mt-1 font-semibold ${onTrack ? "text-emerald-600" : "text-red-500"}`}
                >
                  {onTrack ? "✓ On track!" : "⚠ Shortfall"}
                </p>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                {[
                  {
                    label: "Target nest egg",
                    value: fmt(targetNest),
                    color: "blue",
                  },
                  {
                    label: "Gap",
                    value: `${onTrack ? "+" : "-"}${fmt(gap)}`,
                    color: onTrack ? "emerald" : "red",
                  },
                  {
                    label: "Years to retire",
                    value: `${yearsToRetire}y`,
                    color: "indigo",
                  },
                  {
                    label: "Adj. monthly need",
                    value: fmt(adjustedMonthly),
                    color: "sky",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className={`bg-${color}-50 border border-${color}-100 rounded-xl p-3 text-center`}
                  >
                    <p className={`text-lg font-black text-${color}-700`}>
                      {value}
                    </p>
                    <p className='text-xs text-gray-500 mt-0.5'>{label}</p>
                  </div>
                ))}
              </div>

              {!onTrack && additionalNeeded > 0 && (
                <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
                  <p className='text-xs font-bold text-amber-700 uppercase tracking-widest mb-1'>
                    To close the gap
                  </p>
                  <p className='text-2xl font-black text-amber-700'>
                    {fmt(mc + additionalNeeded)}/mo
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>
                    ({fmt(additionalNeeded)} more than current contribution)
                  </p>
                </div>
              )}

              <div className='bg-gray-50 rounded-xl p-4 text-xs text-gray-500 leading-relaxed'>
                Based on the <strong>4% withdrawal rule</strong> (25× annual
                expenses). Inflation-adjusted to {retirementAge}. Results are
                projections only — consult a financial advisor for personalised
                planning.
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentAge("30");
              setRetirementAge("65");
              setCurrentSavings("25000");
              setMonthlyContrib("500");
              setAnnualReturn("7");
              setMonthlyNeeds("4000");
              setInflationRate("2.5");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>
          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Retirement tips:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Max out tax-advantaged accounts first: 401(k) to employer match,
                then IRA, then 401(k) max
              </li>
              <li>
                A 1% higher return over 35 years can add hundreds of thousands
                to your nest egg
              </li>
              <li>
                Starting 10 years earlier roughly doubles your projected savings
              </li>
              <li>
                Consider sequence-of-returns risk — market drops early in
                retirement are more damaging than later ones
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
