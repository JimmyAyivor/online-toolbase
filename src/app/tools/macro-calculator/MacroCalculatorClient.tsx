"use client";
import React, { useState } from "react";
import { Utensils, RotateCcw } from "lucide-react";
type Goal = "lose" | "maintain" | "gain" | "bulk";
const GOALS: Record<
  Goal,
  { label: string; p: number; c: number; f: number; adj: number }
> = {
  lose: { label: "Lose weight", p: 0.4, c: 0.35, f: 0.25, adj: -500 },
  maintain: { label: "Maintain weight", p: 0.3, c: 0.4, f: 0.3, adj: 0 },
  gain: { label: "Lean muscle gain", p: 0.35, c: 0.45, f: 0.2, adj: 250 },
  bulk: { label: "Bulk (muscle gain)", p: 0.3, c: 0.5, f: 0.2, adj: 500 },
};
export default function MacroCalculatorClient() {
  const [tdee, setTdee] = useState("");
  const [goal, setGoal] = useState<Goal>("maintain");
  const t = parseFloat(tdee) || 0;
  const g = GOALS[goal];
  const targetCals = t + g.adj;
  const result =
    t > 0
      ? {
          calories: targetCals,
          protein: Math.round((targetCals * g.p) / 4),
          carbs: Math.round((targetCals * g.c) / 4),
          fat: Math.round((targetCals * g.f) / 9),
        }
      : null;
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Utensils className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Macro Calculator
            </h2>
            <p className='text-gray-600'>
              Calculate your daily protein, carbs, and fat targets based on your
              goal
            </p>
          </div>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Your daily TDEE (maintenance calories)
                </label>
                <input
                  type='number'
                  min='0'
                  value={tdee}
                  onChange={(e) => setTdee(e.target.value)}
                  placeholder='e.g. 2200'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
                <p className='text-xs text-gray-400 mt-1'>
                  Use our Calorie Calculator to find your TDEE.
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Goal
                </label>
                <div className='space-y-2'>
                  {(
                    Object.entries(GOALS) as [Goal, (typeof GOALS)[Goal]][]
                  ).map(([k, v]) => (
                    <button
                      key={k}
                      onClick={() => setGoal(k)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${goal === k ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300"}`}
                    >
                      {v.label}
                      <span
                        className={`ml-2 text-xs ${goal === k ? "text-indigo-200" : "text-gray-400"}`}
                      >
                        P:{Math.round(v.p * 100)}% C:{Math.round(v.c * 100)}% F:
                        {Math.round(v.f * 100)}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {result && (
              <div className='space-y-3'>
                <div className='bg-indigo-50 border-2 border-indigo-100 rounded-xl p-5 text-center'>
                  <p className='text-xs text-gray-500 mb-1'>
                    Daily calorie target
                  </p>
                  <p className='text-4xl font-black text-indigo-700'>
                    {Math.round(result.calories)}
                  </p>
                  <p className='text-sm text-gray-500 mt-1'>
                    calories/day{" "}
                    {g.adj !== 0
                      ? `(${g.adj > 0 ? "+" : ""}${g.adj} from maintenance)`
                      : ""}
                  </p>
                </div>
                {[
                  {
                    l: "🥩 Protein",
                    v: `${result.protein}g`,
                    pct: `${Math.round(g.p * 100)}%`,
                    cal: `${result.protein * 4} cal`,
                    color: "text-red-600",
                  },
                  {
                    l: "🍞 Carbohydrates",
                    v: `${result.carbs}g`,
                    pct: `${Math.round(g.c * 100)}%`,
                    cal: `${result.carbs * 4} cal`,
                    color: "text-yellow-600",
                  },
                  {
                    l: "🥑 Fat",
                    v: `${result.fat}g`,
                    pct: `${Math.round(g.f * 100)}%`,
                    cal: `${result.fat * 9} cal`,
                    color: "text-green-600",
                  },
                ].map(({ l, v, pct, cal, color }) => (
                  <div key={l} className='bg-gray-50 rounded-xl px-4 py-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm font-medium text-gray-700'>
                        {l}
                      </span>
                      <span className={`font-black text-lg ${color}`}>{v}</span>
                    </div>
                    <div className='flex justify-between text-xs text-gray-400 mt-0.5'>
                      <span>{pct} of calories</span>
                      <span>{cal}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setTdee("");
              setGoal("maintain");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>
          <div className='p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Macronutrient basics:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Protein: 4 calories per gram — builds and repairs muscle, high
                satiety
              </li>
              <li>
                Carbohydrates: 4 calories per gram — primary energy source for
                brain and exercise
              </li>
              <li>
                Fat: 9 calories per gram — hormones, cell structure, fat-soluble
                vitamins
              </li>
              <li>
                These ratios are starting points — adjust based on your response
                over 2–4 weeks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
