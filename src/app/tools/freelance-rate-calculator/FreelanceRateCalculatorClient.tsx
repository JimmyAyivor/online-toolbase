"use client";
import React, { useState } from "react";
import { Briefcase, RotateCcw } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function FreelanceRateCalculatorClient() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [taxRate, setTaxRate] = useState("25");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("48");
  const [billablePct, setBillablePct] = useState("75");

  const ann = parseFloat(income);
  const exp = parseFloat(expenses) || 0;
  const tax = parseFloat(taxRate) / 100;
  const hpw = parseFloat(hoursPerWeek) || 40;
  const wpy = parseFloat(weeksPerYear) || 48;
  const bpct = parseFloat(billablePct) / 100;

  const result = (() => {
    if (!ann || ann <= 0) return null;
    const totalNeeded = (ann + exp) / (1 - tax);
    const billableHours = hpw * wpy * bpct;
    const hourlyRate = totalNeeded / billableHours;
    const dayRate = hourlyRate * 8;
    const weekRate = hourlyRate * hpw * bpct;
    return { hourlyRate, dayRate, weekRate, totalNeeded, billableHours };
  })();

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Briefcase className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Freelance Rate Calculator
            </h2>
            <p className='text-gray-600'>
              Find the hourly rate you need to charge to hit your income goal
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              {[
                {
                  label: "Desired annual take-home income ($)",
                  val: income,
                  set: setIncome,
                  placeholder: "e.g. 80000",
                  hint: "Net income after tax you want to keep",
                },
                {
                  label: "Annual business expenses ($)",
                  val: expenses,
                  set: setExpenses,
                  placeholder: "e.g. 5000",
                  hint: "Software, equipment, accountant, health insurance",
                },
              ].map(({ label, val, set, placeholder, hint }) => (
                <div key={label}>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {label}
                  </label>
                  <input
                    type='number'
                    min='0'
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(e.target.value)
                    }
                    placeholder={placeholder}
                    className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                  <p className='text-xs text-gray-400 mt-1'>{hint}</p>
                </div>
              ))}
              {[
                {
                  label: "Self-employment tax rate (%)",
                  val: taxRate,
                  set: setTaxRate,
                  placeholder: "25",
                },
                {
                  label: "Hours worked per week",
                  val: hoursPerWeek,
                  set: setHoursPerWeek,
                  placeholder: "40",
                },
                {
                  label: "Working weeks per year",
                  val: weeksPerYear,
                  set: setWeeksPerYear,
                  placeholder: "48",
                },
                {
                  label: "Billable hours percentage (%)",
                  val: billablePct,
                  set: setBillablePct,
                  placeholder: "75",
                },
              ].map(({ label, val, set, placeholder }) => (
                <div key={label}>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {label}
                  </label>
                  <input
                    type='number'
                    min='0'
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(e.target.value)
                    }
                    placeholder={placeholder}
                    className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                </div>
              ))}
            </div>

            {result && (
              <div className='space-y-3'>
                <div className='bg-indigo-50 border-2 border-indigo-100 rounded-xl p-5 text-center'>
                  <p className='text-xs text-gray-500 mb-1'>
                    Minimum hourly rate
                  </p>
                  <p className='text-5xl font-black text-indigo-700'>
                    ${fmt(result.hourlyRate)}
                  </p>
                  <p className='text-sm text-gray-500 mt-1'>
                    per billable hour
                  </p>
                </div>
                {[
                  { label: "Day rate (8h)", value: `$${fmt(result.dayRate)}` },
                  { label: "Week rate", value: `$${fmt(result.weekRate)}` },
                  {
                    label: "Billable hours/year",
                    value: result.billableHours.toFixed(0),
                  },
                  {
                    label: "Gross revenue needed",
                    value: `$${fmt(result.totalNeeded)}`,
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
                <div className='bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800'>
                  <strong>Note:</strong> This is your minimum viable rate. Add a
                  20–30% buffer for slow periods, scope creep, and
                  under-estimation.
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setIncome("");
              setExpenses("");
              setTaxRate("25");
              setHoursPerWeek("40");
              setWeeksPerYear("48");
              setBillablePct("75");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>
          <div className='p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Freelance rate fundamentals:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Billable hours are typically 60–75% of total working hours after
                admin, marketing, and downtime
              </li>
              <li>
                Self-employment tax in the US is ~15.3% on top of income tax;
                total effective rate often 25–35%
              </li>
              <li>
                Include health insurance, retirement contributions, and
                professional development in expenses
              </li>
              <li>
                Your calculated rate is a minimum floor — charge more if market
                rates and your experience allow
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
