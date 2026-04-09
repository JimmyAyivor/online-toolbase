"use client";
import React, { useState } from "react";
import { TrendingUp, RotateCcw } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function InvestmentReturnCalculatorClient() {
  const [initial, setInitial] = useState("");
  const [monthly, setMonthly] = useState("0");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [compound, setCompound] = useState<"monthly" | "annually">("monthly");

  const p = parseFloat(initial) || 0;
  const m = parseFloat(monthly) || 0;
  const r = parseFloat(rate) / 100;
  const y = parseInt(years) || 0;

  const result = (() => {
    if (!p || !r || !y) return null;
    const n = compound === "monthly" ? 12 : 1;
    const periods = y * n;
    const periodRate = r / n;
    // FV of initial lump sum
    const fvLump = p * Math.pow(1 + periodRate, periods);
    // FV of monthly contributions (annuity)
    const mPerPeriod = compound === "monthly" ? m : m * 12;
    const fvContrib =
      mPerPeriod > 0
        ? mPerPeriod * ((Math.pow(1 + periodRate, periods) - 1) / periodRate)
        : 0;
    const total = fvLump + fvContrib;
    const totalContributed = p + m * 12 * y;
    const totalInterest = total - totalContributed;

    // Yearly breakdown
    const breakdown: {
      year: number;
      balance: number;
      contributed: number;
      interest: number;
    }[] = [];
    for (let yr = 1; yr <= Math.min(y, 30); yr++) {
      const yPeriods = yr * n;
      const fvL = p * Math.pow(1 + periodRate, yPeriods);
      const fvC =
        mPerPeriod > 0
          ? mPerPeriod * ((Math.pow(1 + periodRate, yPeriods) - 1) / periodRate)
          : 0;
      const bal = fvL + fvC;
      const contributed = p + m * 12 * yr;
      breakdown.push({
        year: yr,
        balance: bal,
        contributed,
        interest: bal - contributed,
      });
    }
    return { total, totalContributed, totalInterest, breakdown };
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Investment Return Calculator
            </h2>
            <p className="text-gray-600">
              See how compound interest grows your investment over time
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                {
                  label: "Initial investment ($)",
                  val: initial,
                  set: setInitial,
                  placeholder: "e.g. 10000",
                },
                {
                  label: "Monthly contribution ($)",
                  val: monthly,
                  set: setMonthly,
                  placeholder: "e.g. 500",
                },
                {
                  label: "Annual return rate (%)",
                  val: rate,
                  set: setRate,
                  placeholder: "e.g. 7",
                },
                {
                  label: "Investment period (years)",
                  val: years,
                  set: setYears,
                  placeholder: "e.g. 20",
                },
              ].map(({ label, val, set, placeholder }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(e.target.value)
                    }
                    placeholder={placeholder}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compound frequency
                </label>
                <div className="flex gap-2">
                  {(["monthly", "annually"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCompound(c)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border-2 capitalize transition-colors ${compound === c ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { r: "5", y: "10" },
                  { r: "7", y: "20" },
                  { r: "10", y: "30" },
                ].map(({ r: rv, y: yv }) => (
                  <button
                    key={`${rv}-${yv}`}
                    onClick={() => {
                      setRate(rv);
                      setYears(yv);
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 rounded-lg text-xs border border-gray-200 transition-colors"
                  >
                    {rv}% / {yv}yr
                  </button>
                ))}
              </div>
            </div>

            {result && (
              <div>
                <div className="bg-indigo-50 border-2 border-indigo-100 rounded-xl p-5 text-center mb-4">
                  <p className="text-xs text-gray-500 mb-1">
                    Total value after {years} years
                  </p>
                  <p className="text-4xl font-black text-indigo-700">
                    ${fmt(result.total)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    {
                      label: "Amount invested",
                      value: `$${fmt(result.totalContributed)}`,
                      bg: "bg-blue-50",
                    },
                    {
                      label: "Interest earned",
                      value: `$${fmt(result.totalInterest)}`,
                      bg: "bg-green-50",
                    },
                  ].map(({ label, value, bg }) => (
                    <div
                      key={label}
                      className={`${bg} rounded-xl p-3 text-center`}
                    >
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <p className="font-black text-gray-800 text-lg">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="overflow-auto max-h-64 rounded-xl border border-gray-100">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-gray-500">
                          Year
                        </th>
                        <th className="px-3 py-2 text-right text-gray-500">
                          Balance
                        </th>
                        <th className="px-3 py-2 text-right text-gray-500">
                          Interest
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.breakdown.map((row) => (
                        <tr key={row.year} className="hover:bg-blue-50">
                          <td className="px-3 py-2 text-gray-600">
                            {row.year}
                          </td>
                          <td className="px-3 py-2 text-right font-medium text-gray-900">
                            ${fmt(row.balance)}
                          </td>
                          <td className="px-3 py-2 text-right text-green-600">
                            ${fmt(row.interest)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setInitial("");
              setMonthly("0");
              setRate("");
              setYears("");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">Investment return notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Results assume a fixed rate of return — real investments
                fluctuate annually
              </li>
              <li>
                The historical average S&P 500 return is ~10% nominal, ~7%
                inflation-adjusted
              </li>
              <li>
                Monthly compounding gives slightly better results than annual
                compounding
              </li>
              <li>
                This calculator does not account for taxes on dividends or
                capital gains
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
