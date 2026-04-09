"use client";
import React, { useState } from "react";
import { Flame, RotateCcw } from "lucide-react";

type Sex = "male" | "female";
type Unit = "imperial" | "metric";

const ACTIVITY = [
  {
    key: "sedentary",
    label: "Sedentary",
    desc: "Little or no exercise",
    factor: 1.2,
  },
  {
    key: "light",
    label: "Lightly active",
    desc: "Exercise 1–3 days/week",
    factor: 1.375,
  },
  {
    key: "moderate",
    label: "Moderately active",
    desc: "Exercise 3–5 days/week",
    factor: 1.55,
  },
  {
    key: "active",
    label: "Very active",
    desc: "Exercise 6–7 days/week",
    factor: 1.725,
  },
  {
    key: "extra",
    label: "Extra active",
    desc: "Physical job + daily exercise",
    factor: 1.9,
  },
];

export default function CalorieCalculatorClient() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("170");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");
  const [heightCm, setHeightCm] = useState("178");
  const [activity, setActivity] = useState("moderate");

  const actFactor = ACTIVITY.find((a) => a.key === activity)?.factor ?? 1.55;
  const w_kg =
    unit === "imperial"
      ? (parseFloat(weight) || 0) * 0.453592
      : parseFloat(weight) || 0;
  const h_cm =
    unit === "imperial"
      ? (parseFloat(heightFt) || 0) * 30.48 + (parseFloat(heightIn) || 0) * 2.54
      : parseFloat(heightCm) || 0;
  const a = parseFloat(age) || 0;

  // Mifflin-St Jeor BMR
  const bmr =
    sex === "male"
      ? 10 * w_kg + 6.25 * h_cm - 5 * a + 5
      : 10 * w_kg + 6.25 * h_cm - 5 * a - 161;
  const tdee = bmr * actFactor;

  const goals = [
    { label: "Aggressive loss (−1 kg/wk)", cal: tdee - 1000, color: "red" },
    { label: "Moderate loss (−0.5 kg/wk)", cal: tdee - 500, color: "orange" },
    { label: "Maintain weight", cal: tdee, color: "emerald" },
    { label: "Moderate gain (+0.5 kg/wk)", cal: tdee + 500, color: "blue" },
    { label: "Aggressive gain (+1 kg/wk)", cal: tdee + 1000, color: "indigo" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full mb-4 shadow-lg">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Calorie Calculator
            </h2>
            <p className="text-gray-500">
              Calculate your daily calorie needs (TDEE) and goal-based targets
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-2">
                {(["imperial", "metric"] as Unit[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize border-2 transition-all ${unit === u ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}
                  >
                    {u}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {(["male", "female"] as Sex[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSex(s)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize border-2 transition-all ${sex === s ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Age (years)
                </label>
                <input
                  value={age}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAge(e.target.value)
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Weight ({unit === "imperial" ? "lbs" : "kg"})
                </label>
                <input
                  value={weight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWeight(e.target.value)
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              {unit === "imperial" ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Height
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={heightFt}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setHeightFt(e.target.value)
                      }
                      placeholder="ft"
                      className="w-24 border-2 border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    <input
                      value={heightIn}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setHeightIn(e.target.value)
                      }
                      placeholder="in"
                      className="w-24 border-2 border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Height (cm)
                  </label>
                  <input
                    value={heightCm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setHeightCm(e.target.value)
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Activity level
                </label>
                <div className="space-y-2">
                  {ACTIVITY.map((a) => (
                    <button
                      key={a.key}
                      onClick={() => setActivity(a.key)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl border-2 transition-all ${activity === a.key ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-700 border-gray-200 hover:border-orange-300"}`}
                    >
                      <span className="font-semibold text-sm">{a.label}</span>
                      <span
                        className={`text-xs ml-2 ${activity === a.key ? "text-orange-100" : "text-gray-400"}`}
                      >
                        — {a.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {tdee > 500 && (
                <>
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 text-center mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Your TDEE (maintenance)
                    </p>
                    <p className="text-5xl font-black text-orange-600">
                      {Math.round(tdee)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      calories per day · BMR: {Math.round(bmr)} kcal
                    </p>
                  </div>
                  {goals.map(({ label, cal, color }) => (
                    <div
                      key={label}
                      className={`bg-${color}-50 border border-${color}-100 rounded-xl px-5 py-3 flex justify-between items-center`}
                    >
                      <span
                        className={`text-sm font-semibold text-${color}-800`}
                      >
                        {label}
                      </span>
                      <span className={`text-xl font-black text-${color}-700`}>
                        {Math.round(Math.max(1200, cal))}
                      </span>
                    </div>
                  ))}
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Based on Mifflin-St Jeor formula. Not medical advice —
                    consult a registered dietitian for personalised guidance.
                    Minimum 1,200 cal/day applied for safety.
                  </p>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setSex("male");
              setAge("30");
              setWeight("170");
              setHeightFt("5");
              setHeightIn("10");
              setHeightCm("178");
              setActivity("moderate");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 Calorie tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                TDEE is your Total Daily Energy Expenditure — eating at TDEE
                maintains your weight
              </li>
              <li>
                A 500 cal/day deficit produces ~0.5 kg (1 lb) of fat loss per
                week
              </li>
              <li>
                Don't go below 1,200 cal/day (women) or 1,500 cal/day (men)
                without medical supervision
              </li>
              <li>
                TDEE calculators are estimates — track your weight weekly and
                adjust by 100 cal increments
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
