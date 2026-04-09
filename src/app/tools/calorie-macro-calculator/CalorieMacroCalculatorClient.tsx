"use client";
import React, { useState, useEffect } from "react";
import {
  Activity,
  User,
  Target,
  TrendingDown,
  TrendingUp,
  Minus,
  Apple,
  Flame,
  Heart,
} from "lucide-react";

interface Results {
  bmr: number;
  tdee: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const CalorieMacroCalculatorClient = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [activityLevel, setActivityLevel] = useState<
    "sedentary" | "light" | "moderate" | "active" | "extreme"
  >("moderate");
  const [goal, setGoal] = useState<
    "lose2" | "lose1" | "maintain" | "gain1" | "gain2"
  >("maintain");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const [results, setResults] = useState<Results>({
    bmr: 0,
    tdee: 0,
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  const activityLevels = {
    sedentary: {
      name: "Sedentary",
      multiplier: 1.2,
      description: "Little or no exercise",
    },
    light: {
      name: "Lightly Active",
      multiplier: 1.375,
      description: "Exercise 1-3 days/week",
    },
    moderate: {
      name: "Moderately Active",
      multiplier: 1.55,
      description: "Exercise 3-5 days/week",
    },
    active: {
      name: "Very Active",
      multiplier: 1.725,
      description: "Exercise 6-7 days/week",
    },
    extreme: {
      name: "Extremely Active",
      multiplier: 1.9,
      description: "Physical job + exercise",
    },
  } as const;

  const goals = {
    lose2: {
      name: "Lose Weight (Fast)",
      modifier: -500,
      description: "-500 cal/day, -1 lb/week",
    },
    lose1: {
      name: "Lose Weight (Moderate)",
      modifier: -300,
      description: "-300 cal/day, -0.6 lb/week",
    },
    maintain: {
      name: "Maintain Weight",
      modifier: 0,
      description: "No change",
    },
    gain1: {
      name: "Gain Weight (Lean)",
      modifier: 300,
      description: "+300 cal/day, +0.6 lb/week",
    },
    gain2: {
      name: "Gain Weight (Bulk)",
      modifier: 500,
      description: "+500 cal/day, +1 lb/week",
    },
  } as const;

  const calculateMetrics = () => {
    let weightKg = weight;
    let heightCm = height;

    if (unit === "imperial") {
      weightKg = weight * 0.453592;
      heightCm = height * 2.54;
    }

    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    const tdee = bmr * activityLevels[activityLevel].multiplier;
    const targetCalories = tdee + goals[goal].modifier;

    const proteinGrams = weightKg * 2;
    const proteinCalories = proteinGrams * 4;

    const fatCalories = targetCalories * 0.28;
    const fatGrams = fatCalories / 9;

    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = carbCalories / 4;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(targetCalories),
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbGrams),
      fats: Math.round(fatGrams),
    });
  };

  useEffect(() => {
    calculateMetrics();
  }, [gender, age, weight, height, activityLevel, goal, unit]);

  const macroPercentages = {
    protein: results.calories
      ? (results.protein * 4 * 100) / results.calories
      : 0,
    carbs: results.calories ? (results.carbs * 4 * 100) / results.calories : 0,
    fats: results.calories ? (results.fats * 9 * 100) / results.calories : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <Apple className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Calorie & Macro Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your daily calorie needs and macronutrient targets
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Personal Information
              </h3>
              {/* Gender & Unit Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setUnit("metric")}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                    unit === "metric"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Metric (kg, cm)
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                    unit === "imperial"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Imperial (lb, in)
                </button>
              </div>
              {/* Sliders */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Age */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Age: {age} years
                  </label>
                  <input
                    type="range"
                    min={15}
                    max={80}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-green-200 to-emerald-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>15</span>
                    <span>80</span>
                  </div>
                </div>
                {/* Weight */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Weight: {weight} {unit === "metric" ? "kg" : "lb"}
                  </label>
                  <input
                    type="range"
                    min={unit === "metric" ? 40 : 88}
                    max={unit === "metric" ? 200 : 440}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-blue-200 to-cyan-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{unit === "metric" ? "40" : "88"}</span>
                    <span>{unit === "metric" ? "200" : "440"}</span>
                  </div>
                </div>
                {/* Height */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Height: {height} {unit === "metric" ? "cm" : "in"}
                  </label>
                  <input
                    type="range"
                    min={unit === "metric" ? 140 : 55}
                    max={unit === "metric" ? 220 : 87}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{unit === "metric" ? "140" : "55"}</span>
                    <span>{unit === "metric" ? "220" : "87"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-8">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-xl">
                <Flame className="w-6 h-6" />
                Your Daily Targets
              </h3>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-sm text-green-100 mb-1">
                    Basal Metabolic Rate
                  </div>
                  <div className="text-3xl font-bold">{results.bmr} cal</div>
                  <div className="text-xs text-green-100 mt-1">
                    Calories at rest
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-sm text-green-100 mb-1">
                    Total Daily Energy
                  </div>
                  <div className="text-3xl font-bold">{results.tdee} cal</div>
                  <div className="text-xs text-green-100 mt-1">
                    Maintenance calories
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-5 border-2 border-white/30">
                  <div className="text-sm text-green-100 mb-2">
                    Target Calories
                  </div>
                  <div className="text-4xl font-bold mb-1">
                    {results.calories}
                  </div>
                  <div className="text-xs text-green-100">calories per day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieMacroCalculatorClient;
