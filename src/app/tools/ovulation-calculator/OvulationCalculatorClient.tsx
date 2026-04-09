"use client";
import React, { useState } from "react";
import { Heart, RotateCcw } from "lucide-react";
function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function fmtDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
export default function OvulationCalculatorClient() {
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const result = (() => {
    if (!lmp) return null;
    const start = new Date(lmp);
    const len = parseInt(cycle) || 28;
    const ovulation = addDays(start, len - 14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    const nextPeriod = addDays(start, len);
    return { ovulation, fertileStart, fertileEnd, nextPeriod };
  })();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isInWindow =
    result && today >= result.fertileStart && today <= result.fertileEnd;
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Ovulation Calculator
            </h2>
            <p className="text-gray-600">
              Estimate your ovulation date and fertile window
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First day of last period
                </label>
                <input
                  type="date"
                  value={lmp}
                  onChange={(e) => setLmp(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average cycle length (days)
                </label>
                <input
                  type="number"
                  min="21"
                  max="45"
                  value={cycle}
                  onChange={(e) => setCycle(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Typical range: 21–35 days. Average is 28 days.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800">
                <strong>How it works:</strong> Ovulation typically occurs 14
                days before the next period. The fertile window is 5 days before
                ovulation through 1 day after — the 6 days when conception is
                possible.
              </div>
            </div>
            {result && (
              <div className="space-y-3">
                {isInWindow && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center text-green-800 text-sm font-bold">
                    🌟 You are currently in your fertile window
                  </div>
                )}
                {[
                  {
                    l: "Ovulation date",
                    v: fmtDate(result.ovulation),
                    highlight: true,
                  },
                  {
                    l: "Fertile window start",
                    v: fmtDate(result.fertileStart),
                  },
                  { l: "Fertile window end", v: fmtDate(result.fertileEnd) },
                  { l: "Next expected period", v: fmtDate(result.nextPeriod) },
                ].map(({ l, v, highlight }) => (
                  <div
                    key={l}
                    className={`flex justify-between items-center rounded-xl px-4 py-3 ${highlight ? "bg-indigo-50 border-2 border-indigo-100" : "bg-gray-50"}`}
                  >
                    <span className="text-sm text-gray-600">{l}</span>
                    <span
                      className={`font-bold ${highlight ? "text-indigo-700" : "text-gray-900"}`}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setLmp("");
              setCycle("28");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
            <p className="font-semibold mb-1">Important note:</p>
            <p>
              These dates are estimates based on an average cycle. Actual
              ovulation can vary due to stress, illness, or cycle irregularity.
              For family planning or fertility treatment, consult a qualified
              healthcare provider. This tool is not a substitute for medical
              advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
