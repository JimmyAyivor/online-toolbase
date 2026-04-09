"use client";
import React, { useState } from "react";
import { DollarSign, RotateCcw } from "lucide-react";

type Mode = "hourlyToSalary" | "salaryToHourly";

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function HourlyToSalaryCalculatorClient() {
  const [mode, setMode] = useState<Mode>("hourlyToSalary");
  const [hourly, setHourly] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [weeksPerYear, setWeeksPerYear] = useState<string>("52");

  const hpw = parseFloat(hoursPerWeek) || 40;
  const wpy = parseFloat(weeksPerYear) || 52;

  const results = (() => {
    if (mode === "hourlyToSalary") {
      const h = parseFloat(hourly);
      if (!h || h <= 0) return null;
      const annual = h * hpw * wpy;
      return {
        hourlyRate: h,
        daily: h * (hpw / 5),
        weekly: h * hpw,
        biweekly: h * hpw * 2,
        monthly: annual / 12,
        annual,
      };
    } else {
      const s = parseFloat(salary);
      if (!s || s <= 0) return null;
      const hourlyRate = s / (hpw * wpy);
      return {
        hourlyRate,
        daily: s / (wpy * 5),
        weekly: s / wpy,
        biweekly: (s / wpy) * 2,
        monthly: s / 12,
        annual: s,
      };
    }
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <DollarSign className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Hourly to Salary Calculator
            </h2>
            <p className="text-gray-600">
              Convert between hourly wage and annual salary
            </p>
          </div>

          {/* Mode */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setMode("hourlyToSalary")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${mode === "hourlyToSalary" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
            >
              Hourly → Salary
            </button>
            <button
              onClick={() => setMode("salaryToHourly")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${mode === "salaryToHourly" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
            >
              Salary → Hourly
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              {mode === "hourlyToSalary" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hourly rate ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={hourly}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setHourly(e.target.value)
                    }
                    placeholder="e.g. 25.00"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual salary ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={salary}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSalary(e.target.value)
                    }
                    placeholder="e.g. 52000"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hours per week
                </label>
                <input
                  type="number"
                  min="1"
                  max="168"
                  value={hoursPerWeek}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHoursPerWeek(e.target.value)
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weeks per year
                </label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={weeksPerYear}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWeeksPerYear(e.target.value)
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Use 50 if you take 2 weeks unpaid leave; 52 for full year
                </p>
              </div>
            </div>

            {results && (
              <div className="space-y-3">
                <div className="bg-indigo-50 border-2 border-indigo-100 rounded-xl p-5 text-center mb-2">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    {mode === "hourlyToSalary"
                      ? "Annual Salary"
                      : "Hourly Rate"}
                  </p>
                  <p className="text-4xl font-black text-indigo-700">
                    $
                    {fmt(
                      mode === "hourlyToSalary"
                        ? results.annual
                        : results.hourlyRate,
                    )}
                  </p>
                  {mode === "salaryToHourly" && (
                    <p className="text-sm text-gray-500 mt-1">per hour</p>
                  )}
                </div>
                {[
                  {
                    label: "Hourly rate",
                    value: `$${fmt(results.hourlyRate)}`,
                  },
                  { label: "Daily (8h day)", value: `$${fmt(results.daily)}` },
                  { label: "Weekly", value: `$${fmt(results.weekly)}` },
                  { label: "Biweekly", value: `$${fmt(results.biweekly)}` },
                  { label: "Monthly", value: `$${fmt(results.monthly)}` },
                  { label: "Annual", value: `$${fmt(results.annual)}` },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm text-gray-600">{label}</span>
                    <span className="font-bold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setHourly("");
              setSalary("");
              setHoursPerWeek("40");
              setWeeksPerYear("52");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">
              Understanding salary calculations:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Standard full-time employment assumes 40 hours/week × 52 weeks =
                2,080 hours per year
              </li>
              <li>
                Results show gross (pre-tax) figures — your take-home pay will
                be lower after deductions
              </li>
              <li>Daily rate assumes a 5-day week, dividing weekly pay by 5</li>
              <li>
                Adjust weeks per year to account for unpaid leave or part-year
                contracts
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
