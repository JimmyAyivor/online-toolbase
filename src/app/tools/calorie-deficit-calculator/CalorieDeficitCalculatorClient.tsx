"use client";
import React, { useState } from "react";
import { Minus, RotateCcw } from "lucide-react";

const LBS_PER_KG = 2.20462;

export default function CalorieDeficitCalculatorClient() {
  const [unit, setUnit] = useState<"lbs" | "kg">("lbs");
  const [currentWeight, setCurrentWeight] = useState("180");
  const [goalWeight, setGoalWeight] = useState("165");
  const [tdee, setTdee] = useState("2200");
  const [weeks, setWeeks] = useState("12");

  const cw = parseFloat(currentWeight) || 0;
  const gw = parseFloat(goalWeight) || 0;
  const t = parseFloat(tdee) || 0;
  const w = parseInt(weeks) || 0;

  const lossNeeded_lbs = unit === "lbs" ? cw - gw : (cw - gw) * LBS_PER_KG;
  const lossNeeded_kg = lossNeeded_lbs / LBS_PER_KG;
  const totalCaloriesNeeded = lossNeeded_lbs * 3500; // 3500 cal = 1 lb fat
  const dailyDeficit = w > 0 ? totalCaloriesNeeded / (w * 7) : 0;
  const dailyCalories = Math.max(1200, t - dailyDeficit);
  const actualDeficit = t - dailyCalories;
  const isSafe = dailyDeficit <= 1000;
  const safestWeeks =
    totalCaloriesNeeded > 0 ? Math.ceil(totalCaloriesNeeded / (500 * 7)) : 0;

  const rateLabel =
    dailyDeficit > 1000
      ? "Aggressive (not recommended)"
      : dailyDeficit > 750
        ? "Fast"
        : dailyDeficit > 500
          ? "Moderate"
          : "Gentle";
  const rateColor =
    dailyDeficit > 1000 ? "red" : dailyDeficit > 750 ? "amber" : "emerald";

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-rose-500 rounded-full mb-4 shadow-lg'>
              <Minus className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Calorie Deficit Calculator
            </h2>
            <p className='text-gray-500'>
              Calculate the daily deficit needed to reach your weight loss goal
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div className='flex gap-2'>
                {(["lbs", "kg"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all ${unit === u ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-600 border-gray-200 hover:border-red-300"}`}
                  >
                    {u}
                  </button>
                ))}
              </div>
              {[
                {
                  label: `Current weight (${unit})`,
                  val: currentWeight,
                  set: setCurrentWeight,
                },
                {
                  label: `Goal weight (${unit})`,
                  val: goalWeight,
                  set: setGoalWeight,
                },
                {
                  label: "Your TDEE / maintenance calories",
                  val: tdee,
                  set: setTdee,
                },
                { label: "Timeframe (weeks)", val: weeks, set: setWeeks },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    {label}
                  </label>
                  <input
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(e.target.value)
                    }
                    className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-400 focus:border-transparent'
                  />
                </div>
              ))}
              <p className='text-xs text-gray-400'>
                Don't know your TDEE? Use our{" "}
                <a
                  href='/tools/calorie-calculator'
                  className='text-red-500 underline'
                >
                  Calorie Calculator
                </a>{" "}
                first.
              </p>
            </div>

            <div className='space-y-4'>
              {lossNeeded_lbs > 0 && w > 0 && t > 0 && (
                <>
                  <div
                    className={`rounded-2xl p-6 border-2 bg-${rateColor}-50 border-${rateColor}-200`}
                  >
                    <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-1'>
                      Daily calorie target
                    </p>
                    <p className={`text-5xl font-black text-${rateColor}-700`}>
                      {Math.round(dailyCalories)}
                    </p>
                    <p
                      className={`text-sm font-semibold text-${rateColor}-600 mt-1`}
                    >
                      {rateLabel} — deficit of {Math.round(actualDeficit)}{" "}
                      cal/day
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-3'>
                    {[
                      {
                        label: "Weight to lose",
                        value: `${lossNeeded_lbs.toFixed(1)} lbs`,
                      },
                      {
                        label: "Total cal deficit",
                        value: `${Math.round(totalCaloriesNeeded).toLocaleString()}`,
                      },
                      {
                        label: "Weekly loss",
                        value: `${(lossNeeded_lbs / w).toFixed(2)} lbs`,
                      },
                      {
                        label: "Safe timeframe",
                        value: `${safestWeeks} weeks`,
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className='bg-red-50 border border-red-100 rounded-xl p-3 text-center'
                      >
                        <p className='text-lg font-black text-red-700'>
                          {value}
                        </p>
                        <p className='text-xs text-gray-500 mt-0.5'>{label}</p>
                      </div>
                    ))}
                  </div>

                  {!isSafe && (
                    <div className='bg-red-50 border-2 border-red-300 rounded-xl p-4 text-sm text-red-700'>
                      ⚠ A deficit of {Math.round(dailyDeficit)} cal/day is too
                      aggressive. The maximum safe deficit is ~1,000 cal/day (1
                      lb/week loss). Extend your timeframe to at least{" "}
                      <strong>{safestWeeks} weeks</strong> for safe, sustainable
                      results.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentWeight("180");
              setGoalWeight("165");
              setTdee("2200");
              setWeeks("12");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>
          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Safe deficit guidelines:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Max recommended deficit: 500–750 cal/day for sustainable fat
                loss
              </li>
              <li>
                1 lb of fat ≈ 3,500 calories deficit; 1 kg ≈ 7,700 calories
              </li>
              <li>
                Preserve muscle with adequate protein (0.7–1g per lb of body
                weight)
              </li>
              <li>
                Losing faster than 1 lb/week risks muscle loss, nutrient
                deficiencies, and rebound
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
