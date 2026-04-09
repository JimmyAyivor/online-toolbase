"use client";
import React, { useState, useMemo } from "react";
import { CalendarDays, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DateDiff {
  days: number;
  weeks: number;
  months: number;
  years: number;
  hours: number;
  minutes: number;
  workdays: number;
  weekends: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function diffDates(start: string, end: string): DateDiff | null {
  if (!start || !end) return null;
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

  const from = s <= e ? s : e;
  const to = s <= e ? e : s;

  const ms = to.getTime() - from.getTime();
  const days = Math.round(ms / 86_400_000);
  const hours = Math.round(ms / 3_600_000);
  const minutes = Math.round(ms / 60_000);

  // Count workdays
  let workdays = 0;
  const cur = new Date(from);
  while (cur <= to) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) workdays++;
    cur.setDate(cur.getDate() + 1);
  }

  // Approximate months & years
  let months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  let years = to.getFullYear() - from.getFullYear();
  if (to.getDate() < from.getDate()) {
    months--;
  }
  if (months < 0) months = 0;
  years = Math.floor(months / 12);

  return {
    days,
    weeks: Math.floor(days / 7),
    months,
    years,
    hours,
    minutes,
    workdays,
    weekends: days - workdays,
  };
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function DateDifferenceCalculatorClient() {
  const [start, setStart] = useState<string>(today());
  const [end, setEnd] = useState<string>("");

  const diff = useMemo(() => diffDates(start, end), [start, end]);

  const reset = (): void => {
    setStart(today());
    setEnd("");
  };

  const isReversed = start && end && new Date(start) > new Date(end);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <CalendarDays className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Date Difference Calculator
            </h2>
            <p className="text-gray-500">
              Calculate the exact number of days between two dates
            </p>
          </div>

          <div className="space-y-6">
            {/* Inputs */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={start}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setStart(e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={end}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEnd(e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              {isReversed && (
                <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
                  End date is before start date — results show the absolute
                  difference.
                </p>
              )}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Results */}
            {diff && (
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Results
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Days", value: diff.days.toLocaleString() },
                    { label: "Weeks", value: diff.weeks.toLocaleString() },
                    { label: "Months", value: diff.months.toLocaleString() },
                    { label: "Years", value: diff.years.toLocaleString() },
                    { label: "Hours", value: diff.hours.toLocaleString() },
                    { label: "Minutes", value: diff.minutes.toLocaleString() },
                    {
                      label: "Workdays",
                      value: diff.workdays.toLocaleString(),
                    },
                    {
                      label: "Weekend days",
                      value: diff.weekends.toLocaleString(),
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-indigo-600">
                        {value}
                      </div>
                      <div className="text-sm text-gray-600">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick presets */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quick Presets
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Last 30 days", days: -30 },
                  { label: "Last 90 days", days: -90 },
                  { label: "Last 365 days", days: -365 },
                  { label: "Next 30 days", days: 30 },
                ].map(({ label, days }) => (
                  <button
                    key={label}
                    onClick={() => {
                      const d = new Date();
                      const t = today();
                      d.setDate(d.getDate() + days);
                      const other = d.toISOString().split("T")[0];
                      if (days < 0) {
                        setStart(other);
                        setEnd(t);
                      } else {
                        setStart(t);
                        setEnd(other);
                      }
                    }}
                    className="py-2 px-3 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-sm text-gray-700 rounded-lg transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Use the preset buttons to quickly calculate common time ranges
              </li>
              <li>
                Workdays excludes Saturdays and Sundays — no bank holidays are
                accounted for
              </li>
              <li>
                If the end date is earlier than the start date the calculator
                still shows the absolute difference
              </li>
              <li>
                Months and years are calendar-based, not exact 30/365-day
                approximations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
