"use client";
import React, { useState } from "react";
import { Baby, RotateCcw } from "lucide-react";
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
type Method = "lmp" | "conception" | "ivf";
export default function PregnancyDueDateCalculatorClient() {
  const [method, setMethod] = useState<Method>("lmp");
  const [date, setDate] = useState("");
  const [cycle, setCycle] = useState("28");
  const result = (() => {
    if (!date) return null;
    const d = new Date(date);
    let dueDate: Date;
    if (method === "lmp") {
      const cycleAdj = (parseInt(cycle) || 28) - 28;
      dueDate = addDays(d, 280 + cycleAdj);
    } else if (method === "conception") {
      dueDate = addDays(d, 266);
    } else {
      dueDate = addDays(d, 266);
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const conceptionEst = method === "lmp" ? addDays(d, 14) : d;
    const lmpEst = method === "lmp" ? d : addDays(d, -14);
    const daysPregnant = Math.max(
      0,
      Math.floor((today.getTime() - lmpEst.getTime()) / (1000 * 60 * 60 * 24)),
    );
    const weeksPregnant = Math.floor(daysPregnant / 7);
    const daysExtra = daysPregnant % 7;
    const trimester =
      weeksPregnant < 13 ? "First" : weeksPregnant < 27 ? "Second" : "Third";
    return {
      dueDate,
      conceptionEst,
      weeksPregnant,
      daysExtra,
      trimester,
      daysPregnant,
    };
  })();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Baby className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Pregnancy Due Date Calculator
            </h2>
            <p className="text-gray-600">
              Calculate your estimated due date (EDD)
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calculate from
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["lmp", "Last period"],
                    ["conception", "Conception date"],
                    ["ivf", "IVF transfer"],
                  ].map(([v, l]) => (
                    <button
                      key={v}
                      onClick={() => setMethod(v as Method)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${method === v ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {method === "lmp"
                    ? "First day of last menstrual period"
                    : method === "conception"
                      ? "Conception date"
                      : "IVF transfer date"}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              {method === "lmp" && (
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
                </div>
              )}
            </div>
            {result && (
              <div className="space-y-3">
                <div className="bg-indigo-50 border-2 border-indigo-100 rounded-xl p-5 text-center">
                  <p className="text-xs text-gray-500 mb-1">
                    Estimated due date
                  </p>
                  <p className="text-2xl font-black text-indigo-700">
                    {fmtDate(result.dueDate)}
                  </p>
                </div>
                {result.weeksPregnant > 0 && (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
                    <p className="text-sm font-semibold text-green-800">
                      {result.weeksPregnant} weeks {result.daysExtra} days
                      pregnant
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {result.trimester} trimester
                    </p>
                  </div>
                )}
                {[
                  {
                    l: "Estimated conception",
                    v: fmtDate(result.conceptionEst),
                  },
                ].map(({ l, v }) => (
                  <div
                    key={l}
                    className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm text-gray-600">{l}</span>
                    <span className="font-bold text-gray-900">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setDate("");
              setCycle("28");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
            <p className="font-semibold mb-1">Important:</p>
            <p>
              This calculator provides an estimate using Naegele's rule. Your
              actual due date will be confirmed by your healthcare provider
              using an ultrasound dating scan. Only about 5% of babies are born
              on their exact due date — most arrive within 2 weeks either side.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
