"use client";
import React, { useState } from "react";
import { Users, RotateCcw } from "lucide-react";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  CAD: "C$",
  AUD: "A$",
};

export default function MeetingCostCalculatorClient() {
  const [attendees, setAttendees] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [duration, setDuration] = useState(60);
  const [currency, setCurrency] = useState("USD");
  const [frequency, setFrequency] = useState<
    "once" | "daily" | "weekly" | "monthly"
  >("once");

  const sym = CURRENCY_SYMBOLS[currency];
  const totalHours = duration / 60;
  const singleCost = attendees * hourlyRate * totalHours;
  const annualCost =
    frequency === "daily"
      ? singleCost * 260
      : frequency === "weekly"
        ? singleCost * 52
        : frequency === "monthly"
          ? singleCost * 12
          : singleCost;

  const fmt = (n: number) =>
    sym +
    n.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const costRating =
    singleCost < 200
      ? {
          label: "Reasonable",
          color: "text-emerald-600",
          bg: "bg-emerald-50 border-emerald-200",
        }
      : singleCost < 500
        ? {
            label: "Significant",
            color: "text-amber-600",
            bg: "bg-amber-50 border-amber-200",
          }
        : {
            label: "Very costly",
            color: "text-red-600",
            bg: "bg-red-50 border-red-200",
          };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Meeting Cost Calculator
            </h2>
            <p className="text-gray-500">
              Calculate the real labour cost of any meeting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Currency
                </label>
                <div className="flex gap-2">
                  {Object.keys(CURRENCY_SYMBOLS).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all ${currency === c ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {[
                {
                  label: "Number of attendees",
                  val: attendees,
                  set: setAttendees,
                  min: 1,
                  max: 100,
                  step: 1,
                  fmt: (v: number) => `${v} people`,
                },
                {
                  label: `Average hourly rate (${sym})`,
                  val: hourlyRate,
                  set: setHourlyRate,
                  min: 10,
                  max: 500,
                  step: 5,
                  fmt: (v: number) => `${sym}${v}/hr`,
                },
                {
                  label: "Meeting duration (minutes)",
                  val: duration,
                  set: setDuration,
                  min: 15,
                  max: 480,
                  step: 15,
                  fmt: (v: number) =>
                    v >= 60
                      ? `${(v / 60).toFixed(v % 60 === 0 ? 0 : 1)}h`
                      : `${v}m`,
                },
              ].map(({ label, val, set, min, max, step, fmt: f }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {label}
                    </label>
                    <span className="text-sm font-bold text-amber-600">
                      {f(val)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(parseFloat(e.target.value))
                    }
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{f(min)}</span>
                    <span>{f(max)}</span>
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meeting frequency
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["once", "daily", "weekly", "monthly"] as const).map(
                    (f) => (
                      <button
                        key={f}
                        onClick={() => setFrequency(f)}
                        className={`py-2.5 rounded-xl text-sm font-semibold capitalize border-2 transition-all ${frequency === f ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"}`}
                      >
                        {f === "once" ? "One-off" : f}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`rounded-2xl p-6 border-2 ${costRating.bg}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Meeting cost
                </p>
                <p className={`text-5xl font-black ${costRating.color}`}>
                  {fmt(singleCost)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {costRating.label} · {fmt(singleCost / attendees)} per person
                </p>
              </div>

              {frequency !== "once" && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                    Annual cost ({frequency})
                  </p>
                  <p className="text-4xl font-black text-indigo-700">
                    {fmt(annualCost)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    If held every{" "}
                    {frequency === "daily" ? "working day" : `${frequency}`}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Attendees", value: attendees },
                  { label: "Duration", value: `${duration}m` },
                  { label: "Per head", value: fmt(singleCost / attendees) },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center"
                  >
                    <p className="text-lg font-black text-amber-700">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-2xl p-5">
                <p className="text-gray-400 text-xs mb-3 font-semibold uppercase tracking-widest">
                  Cost breakdown
                </p>
                {[
                  {
                    label: "Labour cost formula",
                    value: `${attendees} × ${sym}${hourlyRate}/hr × ${(duration / 60).toFixed(2)}h`,
                  },
                  { label: "Total meeting cost", value: fmt(singleCost) },
                  ...(frequency !== "once"
                    ? [
                        {
                          label: `Annual (${frequency})`,
                          value: fmt(annualCost),
                        },
                      ]
                    : []),
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between py-1.5 border-b border-gray-700 last:border-0"
                  >
                    <span className="text-gray-400 text-sm">{label}</span>
                    <span className="text-white font-bold text-sm">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setAttendees(5);
              setHourlyRate(75);
              setDuration(60);
              setFrequency("once");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 Meeting efficiency tips:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Reduce attendees: cutting from 8 to 5 people saves 37.5% of the
                meeting cost
              </li>
              <li>
                Shorter meetings: 30-minute stand-ups often accomplish what
                1-hour meetings do
              </li>
              <li>
                Weekly recurring meetings are often the biggest hidden
                productivity drain
              </li>
              <li>
                Use this calculator to justify asynchronous alternatives (shared
                docs, Loom recordings)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
