"use client";
import React, { useState } from "react";
import { Moon, Sun, RotateCcw } from "lucide-react";

type Mode = "bedtime" | "wakeup";
const ONSET_MIN = 14; // average sleep onset latency

function addMinutes(baseH: number, baseM: number, minutes: number) {
  const total = baseH * 60 + baseM + minutes;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return { h, m };
}
function subtractMinutes(baseH: number, baseM: number, minutes: number) {
  let total = baseH * 60 + baseM - minutes;
  if (total < 0) total += 24 * 60;
  return { h: Math.floor(total / 60) % 24, m: total % 60 };
}
function fmt(h: number, m: number) {
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

const CYCLE_LABELS = ["4 cycles", "5 cycles", "6 cycles"];
const CYCLE_HOURS = [6, 7.5, 9];

export default function SleepCalculatorClient() {
  const [mode, setMode] = useState<Mode>("bedtime");
  const [inputH, setInputH] = useState("7");
  const [inputM, setInputM] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [onsetMin, setOnsetMin] = useState(ONSET_MIN);

  // Convert 12h to 24h
  const h24 = (() => {
    let h = parseInt(inputH) || 0;
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h;
  })();
  const m = parseInt(inputM) || 0;

  const results = CYCLE_LABELS.map((label, i) => {
    const cycleMin = CYCLE_HOURS[i] * 60;
    if (mode === "bedtime") {
      // Given wake time, subtract cycles + onset
      const { h, m: rm } = subtractMinutes(h24, m, cycleMin + onsetMin);
      return {
        label,
        hours: CYCLE_HOURS[i],
        time: fmt(h, rm),
        recommended: i === 1,
      };
    } else {
      // Given bedtime, add onset + cycles
      const { h, m: rm } = addMinutes(h24, m, cycleMin + onsetMin);
      return {
        label,
        hours: CYCLE_HOURS[i],
        time: fmt(h, rm),
        recommended: i === 1,
      };
    }
  });

  const modeBtn = (m: Mode, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => setMode(m)}
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${mode === m ? "bg-violet-600 text-white shadow-md" : "bg-white text-gray-600 border-2 border-gray-200 hover:border-violet-300"}`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <Moon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Sleep Calculator
            </h2>
            <p className="text-gray-500">
              Find bedtimes and wake-up times aligned with your natural sleep
              cycles
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-3 mb-8">
            {modeBtn("bedtime", <Moon className="w-4 h-4" />, "Find Bedtime")}
            {modeBtn(
              "wakeup",
              <Sun className="w-4 h-4" />,
              "Find Wake-Up Time",
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {mode === "bedtime"
                    ? "I want to wake up at…"
                    : "I plan to go to bed at…"}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={inputH}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputH(e.target.value)
                    }
                    className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 text-center text-2xl font-bold font-mono focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                  <span className="self-center text-2xl text-gray-400 font-bold">
                    :
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={inputM}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputM(e.target.value.padStart(2, "0"))
                    }
                    className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 text-center text-2xl font-bold font-mono focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                  <div className="flex flex-col border-2 border-gray-300 rounded-lg overflow-hidden">
                    {(["AM", "PM"] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`flex-1 px-4 text-sm font-bold transition-colors ${period === p ? "bg-violet-600 text-white" : "bg-white text-gray-500 hover:bg-violet-50"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Onset time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Time to fall asleep:{" "}
                  <span className="text-violet-600">{onsetMin} minutes</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="1"
                  value={onsetMin}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setOnsetMin(parseInt(e.target.value))
                  }
                  className="w-full accent-violet-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5 min (fast)</span>
                  <span>45 min (slow)</span>
                </div>
              </div>

              <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                <strong>Why cycles matter:</strong> Sleep moves through
                90-minute cycles of light, deep, and REM sleep. Waking at the
                end of a cycle — when sleep is lightest — feels far easier than
                waking mid-cycle from deep sleep.
              </div>
            </div>

            {/* Results */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                {mode === "bedtime"
                  ? "Recommended bedtimes"
                  : "Best wake-up times"}
              </p>
              {results.map(({ label, hours, time, recommended }) => (
                <div
                  key={label}
                  className={`rounded-2xl p-4 flex items-center justify-between transition-all ${recommended ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg" : "bg-gray-50 border border-gray-100"}`}
                >
                  <div>
                    <p
                      className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${recommended ? "text-violet-200" : "text-gray-400"}`}
                    >
                      {label} · {hours}h
                    </p>
                    <p
                      className={`text-2xl font-black ${recommended ? "text-white" : "text-gray-800"}`}
                    >
                      {time}
                    </p>
                    {recommended && (
                      <p className="text-violet-200 text-xs mt-0.5">
                        Recommended for most adults
                      </p>
                    )}
                  </div>
                  {recommended && <div className="text-3xl">⭐</div>}
                </div>
              ))}
              <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 mt-2">
                <strong>Includes {onsetMin}-minute</strong> sleep onset time
                before cycles begin.
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setInputH("7");
              setInputM("00");
              setPeriod("AM");
              setOnsetMin(ONSET_MIN);
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 Sleep tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Adults need 7–9 hours (5–6 complete cycles) for optimal health
              </li>
              <li>
                A consistent wake time is the most powerful anchor for your
                circadian rhythm
              </li>
              <li>
                Avoid caffeine 6 hours before bed — its half-life is 5–7 hours
              </li>
              <li>
                Weekend lie-ins of more than 1 hour cause "social jet lag" that
                affects Monday performance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
