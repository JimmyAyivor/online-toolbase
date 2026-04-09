"use client";
import React, { useState } from "react";
import { Target, RotateCcw } from "lucide-react";

type Mode = "howLong" | "howMuch";
const fmt = (n: number) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
const fmtD = (n: number) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function SavingsGoalCalculatorClient() {
  const [mode, setMode] = useState<Mode>("howLong");
  const [goal, setGoal] = useState("10000");
  const [initial, setInitial] = useState("0");
  const [monthly, setMonthly] = useState("300");
  const [rate, setRate] = useState("4");
  const [months, setMonths] = useState("36");

  const g = parseFloat(goal) || 0;
  const ini = parseFloat(initial) || 0;
  const m = parseFloat(monthly) || 0;
  const r = parseFloat(rate) / 100 / 12;
  const tgt = parseInt(months) || 0;

  const resultTime = (() => {
    if (!g || ini >= g || m <= 0) return null;
    let bal = ini,
      mo = 0;
    while (bal < g && mo < 1200) {
      bal = bal * (1 + r) + m;
      mo++;
    }
    const totalContrib = ini + m * mo;
    const totalInterest = bal - totalContrib;
    return {
      months: mo,
      years: Math.floor(mo / 12),
      remMonths: mo % 12,
      totalContrib,
      totalInterest,
    };
  })();

  const resultAmount = (() => {
    if (!g || tgt <= 0) return null;
    const need = g - ini;
    if (need <= 0) return { monthly: 0, totalInterest: g - ini };
    if (r === 0) return { monthly: need / tgt, totalInterest: 0 };
    const mp = (need * r * Math.pow(1 + r, tgt)) / (Math.pow(1 + r, tgt) - 1);
    const totalContrib = mp * tgt + ini;
    return {
      monthly: mp,
      totalInterest: g - totalContrib > 0 ? g - totalContrib : 0,
    };
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Savings Goal Calculator
            </h2>
            <p className="text-gray-500">
              Find out how long to reach your goal — or how much to save each
              month
            </p>
          </div>

          <div className="flex gap-2 mb-8 bg-gray-100 rounded-2xl p-1.5 max-w-sm mx-auto">
            <button
              onClick={() => setMode("howLong")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "howLong" ? "bg-emerald-500 text-white shadow-md" : "text-gray-500"}`}
            >
              How long?
            </button>
            <button
              onClick={() => setMode("howMuch")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "howMuch" ? "bg-emerald-500 text-white shadow-md" : "text-gray-500"}`}
            >
              How much/month?
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                {
                  label: "Savings goal ($)",
                  val: goal,
                  set: setGoal,
                  placeholder: "10000",
                },
                {
                  label: "Current savings ($)",
                  val: initial,
                  set: setInitial,
                  placeholder: "0",
                },
                ...(mode === "howLong"
                  ? [
                      {
                        label: "Monthly savings ($)",
                        val: monthly,
                        set: setMonthly,
                        placeholder: "300",
                      },
                    ]
                  : [
                      {
                        label: "Target timeframe (months)",
                        val: months,
                        set: setMonths,
                        placeholder: "36",
                      },
                    ]),
                {
                  label: "Annual interest rate (%)",
                  val: rate,
                  set: setRate,
                  placeholder: "4",
                },
              ].map(({ label, val, set, placeholder }) => (
                <div key={label}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(e.target.value)
                    }
                    placeholder={placeholder}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {mode === "howLong" && resultTime ? (
                <>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Time to reach goal
                    </p>
                    <p className="text-5xl font-black text-emerald-700">
                      {resultTime.years > 0
                        ? `${resultTime.years}y ${resultTime.remMonths}m`
                        : `${resultTime.months}mo`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {resultTime.months} months total
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Total contributed",
                        value: fmt(resultTime.totalContrib),
                      },
                      {
                        label: "Interest earned",
                        value: fmt(resultTime.totalInterest),
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center"
                      >
                        <p className="text-xl font-black text-emerald-700">
                          {value}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{label}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : mode === "howMuch" && resultAmount ? (
                <>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Monthly savings needed
                    </p>
                    <p className="text-5xl font-black text-emerald-700">
                      {fmtD(resultAmount.monthly)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      per month for {tgt} months
                    </p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                    <p className="text-xl font-black text-emerald-700">
                      {fmt(resultAmount.totalInterest)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Interest earned
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-48 bg-emerald-50 rounded-2xl border-2 border-dashed border-emerald-200">
                  <div className="text-center text-emerald-400">
                    <Target className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-medium">
                      Enter your details to see results
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setGoal("10000");
              setInitial("0");
              setMonthly("300");
              setRate("4");
              setMonths("36");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 Savings tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Even a 1% interest rate difference compounds significantly over
                multi-year goals
              </li>
              <li>
                High-yield savings accounts (HYSA) often offer 4–5% APY vs 0.01%
                at traditional banks
              </li>
              <li>
                Automate monthly transfers so saving happens before you spend
              </li>
              <li>
                Increasing monthly savings by just $50 can cut months off your
                timeline
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
