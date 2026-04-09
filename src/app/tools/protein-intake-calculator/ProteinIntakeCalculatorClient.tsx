"use client";
import React, { useState } from "react";
import { Dumbbell, RotateCcw } from "lucide-react";

type Goal = "sedentary" | "general" | "endurance" | "muscle" | "cutting";

const GOALS: Record<
  Goal,
  {
    label: string;
    desc: string;
    low: number;
    high: number;
    color: string;
    badge: string;
  }
> = {
  sedentary: {
    label: "Sedentary",
    desc: "Minimal / no exercise",
    low: 0.8,
    high: 1.0,
    color: "border-gray-300 hover:border-gray-400",
    badge: "bg-gray-100 text-gray-600",
  },
  general: {
    label: "General fitness",
    desc: "3–5 sessions/week",
    low: 1.2,
    high: 1.6,
    color: "border-blue-200 hover:border-blue-400",
    badge: "bg-blue-100 text-blue-700",
  },
  endurance: {
    label: "Endurance athlete",
    desc: "Running, cycling, swimming",
    low: 1.2,
    high: 1.8,
    color: "border-sky-200 hover:border-sky-400",
    badge: "bg-sky-100 text-sky-700",
  },
  muscle: {
    label: "Building muscle",
    desc: "Resistance training focus",
    low: 1.6,
    high: 2.2,
    color: "border-emerald-200 hover:border-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
  },
  cutting: {
    label: "Cutting phase",
    desc: "Preserve muscle while losing fat",
    low: 2.0,
    high: 2.4,
    color: "border-orange-200 hover:border-orange-400",
    badge: "bg-orange-100 text-orange-700",
  },
};

const FOODS = [
  { name: "Chicken breast", per100: "31g", emoji: "🍗" },
  { name: "Canned tuna", per100: "29g", emoji: "🐟" },
  { name: "Eggs (2 large)", per100: "13g", emoji: "🥚" },
  { name: "Greek yoghurt", per100: "10g", emoji: "🥛" },
  { name: "Lentils (cooked)", per100: "9g", emoji: "🫘" },
  { name: "Tofu (firm)", per100: "8g", emoji: "🟨" },
];

export default function ProteinIntakeCalculatorClient() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"kg" | "lbs">("lbs");
  const [goal, setGoal] = useState<Goal>("muscle");

  const kg =
    unit === "kg"
      ? parseFloat(weight) || 0
      : (parseFloat(weight) || 0) / 2.2046;
  const g = GOALS[goal];
  const result =
    kg > 0
      ? {
          low: Math.round(kg * g.low),
          high: Math.round(kg * g.high),
          mid: Math.round((kg * (g.low + g.high)) / 2),
        }
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4 shadow-lg">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Protein Intake Calculator
            </h2>
            <p className="text-gray-500">
              Your daily protein target based on weight, activity, and goal
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Body weight
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={weight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setWeight(e.target.value)
                    }
                    placeholder={unit === "lbs" ? "e.g. 165" : "e.g. 75"}
                    className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden">
                    {(["lbs", "kg"] as const).map((u) => (
                      <button
                        key={u}
                        onClick={() => setUnit(u)}
                        className={`px-4 py-3 text-sm font-semibold transition-colors ${unit === u ? "bg-emerald-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fitness goal
                </label>
                <div className="space-y-2">
                  {(
                    Object.entries(GOALS) as [Goal, (typeof GOALS)[Goal]][]
                  ).map(([k, v]) => (
                    <button
                      key={k}
                      onClick={() => setGoal(k)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        goal === k
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                          : `bg-white text-gray-700 ${v.color}`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-sm">
                            {v.label}
                          </span>
                          <span
                            className={`ml-2 text-xs ${goal === k ? "text-emerald-200" : "text-gray-400"}`}
                          >
                            {v.desc}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${goal === k ? "bg-emerald-500 text-white" : v.badge}`}
                        >
                          {v.low}–{v.high}g/kg
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {result ? (
                <>
                  {/* Main result */}
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white text-center shadow-lg">
                    <p className="text-emerald-100 text-sm mb-1">
                      Daily protein target
                    </p>
                    <p className="text-6xl font-black mb-1">
                      {result.mid}
                      <span className="text-2xl font-bold">g</span>
                    </p>
                    <p className="text-emerald-200 text-sm">
                      Range: {result.low}–{result.high}g/day
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "3 meals/day",
                        value: `~${Math.round(result.mid / 3)}g`,
                        color: "bg-teal-50 border-teal-100",
                        text: "text-teal-700",
                      },
                      {
                        label: "4 meals/day",
                        value: `~${Math.round(result.mid / 4)}g`,
                        color: "bg-cyan-50 border-cyan-100",
                        text: "text-cyan-700",
                      },
                      {
                        label: "5 meals/day",
                        value: `~${Math.round(result.mid / 5)}g`,
                        color: "bg-emerald-50 border-emerald-100",
                        text: "text-emerald-700",
                      },
                      {
                        label: "Calorie equiv.",
                        value: `${result.mid * 4} kcal`,
                        color: "bg-orange-50 border-orange-100",
                        text: "text-orange-700",
                      },
                    ].map(({ label, value, color, text }) => (
                      <div
                        key={label}
                        className={`${color} border rounded-xl p-3 text-center`}
                      >
                        <p className={`text-xl font-black ${text}`}>{value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* g/kg display */}
                  <div className="bg-gray-50 rounded-xl px-4 py-3 flex justify-between items-center border border-gray-100">
                    <span className="text-sm text-gray-600">
                      Per kg bodyweight
                    </span>
                    <span className="font-bold text-gray-900">
                      {(result.mid / kg).toFixed(1)}g/kg
                    </span>
                  </div>

                  {/* Food reference */}
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-3">
                      Protein per 100g of food
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {FOODS.map(({ name, per100, emoji }) => (
                        <div key={name} className="flex items-center gap-2">
                          <span className="text-base">{emoji}</span>
                          <div>
                            <p className="text-xs font-semibold text-gray-800">
                              {per100}
                            </p>
                            <p className="text-xs text-gray-500">{name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-64 bg-emerald-50 rounded-2xl border-2 border-dashed border-emerald-200">
                  <div className="text-center text-emerald-400">
                    <Dumbbell className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium">
                      Enter your weight to see your protein target
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setWeight("");
              setGoal("muscle");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          {/* Tips */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 Protein tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                The RDA of 0.8g/kg is the minimum to prevent deficiency — not
                optimal for active people
              </li>
              <li>
                Research supports 1.6–2.2g/kg for maximising muscle protein
                synthesis
              </li>
              <li>
                Spreading protein across 3–5 meals optimises absorption better
                than one large serving
              </li>
              <li>
                Aim for at least 30–40g of protein per meal to trigger muscle
                protein synthesis
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
