"use client";
import React, { useState } from "react";
import { TrendingUp, RotateCcw } from "lucide-react";

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function PayRaiseCalculatorClient() {
  const [current, setCurrent] = useState("");
  const [mode, setMode] = useState<"percent" | "amount">("percent");
  const [raiseVal, setRaiseVal] = useState("");

  const cur = parseFloat(current);
  const rv = parseFloat(raiseVal);
  const valid = cur > 0 && rv >= 0;

  const results = (() => {
    if (!valid) return null;
    const raiseAmt = mode === "percent" ? (cur * rv) / 100 : rv;
    const raisePct = mode === "percent" ? rv : (rv / cur) * 100;
    const newSalary = cur + raiseAmt;
    return {
      raiseAmt,
      raisePct,
      newSalary,
      monthly: newSalary / 12,
      weekly: newSalary / 52,
      diff: newSalary - cur,
    };
  })();

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <TrendingUp className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Pay Raise Calculator
            </h2>
            <p className='text-gray-600'>
              Calculate the value of your pay raise in dollars and percentage
            </p>
          </div>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Current annual salary ($)
                </label>
                <input
                  type='number'
                  min='0'
                  value={current}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCurrent(e.target.value)
                  }
                  placeholder='e.g. 60000'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Enter raise as
                </label>
                <div className='flex gap-2 mb-3'>
                  <button
                    onClick={() => setMode("percent")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${mode === "percent" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"}`}
                  >
                    Percentage %
                  </button>
                  <button
                    onClick={() => setMode("amount")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${mode === "amount" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"}`}
                  >
                    Dollar Amount $
                  </button>
                </div>
                <input
                  type='number'
                  min='0'
                  step={mode === "percent" ? "0.1" : "100"}
                  value={raiseVal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRaiseVal(e.target.value)
                  }
                  placeholder={mode === "percent" ? "e.g. 5" : "e.g. 3000"}
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
              </div>
              <div className='flex flex-wrap gap-2'>
                {["3", "5", "7", "10"].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setMode("percent");
                      setRaiseVal(p);
                    }}
                    className='px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 rounded-lg text-sm border border-gray-200 transition-colors'
                  >
                    {p}% raise
                  </button>
                ))}
              </div>
            </div>
            {results && (
              <div className='space-y-3'>
                <div className='bg-green-50 border-2 border-green-100 rounded-xl p-5 text-center'>
                  <p className='text-xs text-gray-500 font-medium mb-1'>
                    New Annual Salary
                  </p>
                  <p className='text-4xl font-black text-green-700'>
                    ${fmt(results.newSalary)}
                  </p>
                  <p className='text-sm text-green-600 mt-1'>
                    +${fmt(results.raiseAmt)} / +{results.raisePct.toFixed(2)}%
                  </p>
                </div>
                {[
                  { label: "Current salary", value: `$${fmt(cur)}` },
                  { label: "Raise amount", value: `$${fmt(results.raiseAmt)}` },
                  {
                    label: "Raise percentage",
                    value: `${results.raisePct.toFixed(2)}%`,
                  },
                  {
                    label: "New monthly pay",
                    value: `$${fmt(results.monthly)}`,
                  },
                  { label: "New weekly pay", value: `$${fmt(results.weekly)}` },
                  {
                    label: "Annual difference",
                    value: `+$${fmt(results.diff)}`,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className='flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3'
                  >
                    <span className='text-sm text-gray-600'>{label}</span>
                    <span className='font-bold text-gray-900'>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setCurrent("");
              setRaiseVal("");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>
          <div className='p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Understanding pay raises:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                All figures shown are gross (pre-tax) — your take-home increase
                will be lower after tax
              </li>
              <li>
                A cost-of-living raise typically ranges from 2–4%; a merit raise
                from 4–10%
              </li>
              <li>
                The monthly figure is your new gross monthly salary divided into
                12 equal payments
              </li>
              <li>
                Compare raises from different employers by converting all to
                annual figures first
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
