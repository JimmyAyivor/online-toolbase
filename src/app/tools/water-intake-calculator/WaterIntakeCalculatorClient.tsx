"use client";
import React, { useState } from "react";
import { Droplets, RotateCcw } from "lucide-react";

type Activity = "sedentary" | "light" | "moderate" | "active" | "very_active";
type Climate = "cool" | "temperate" | "warm" | "hot";

const ACTIVITY_OPTIONS: {
  value: Activity;
  label: string;
  desc: string;
  extra: number;
}[] = [
  {
    value: "sedentary",
    label: "Sedentary",
    desc: "Desk job, minimal movement",
    extra: 0,
  },
  {
    value: "light",
    label: "Lightly active",
    desc: "1–3 days/week exercise",
    extra: 350,
  },
  {
    value: "moderate",
    label: "Moderately active",
    desc: "3–5 days/week exercise",
    extra: 600,
  },
  {
    value: "active",
    label: "Very active",
    desc: "6–7 days/week or physical job",
    extra: 900,
  },
  {
    value: "very_active",
    label: "Athlete / twice daily",
    desc: "Elite training or manual labour",
    extra: 1200,
  },
];

const CLIMATE_OPTIONS: {
  value: Climate;
  label: string;
  emoji: string;
  extra: number;
}[] = [
  { value: "cool", label: "Cool / Cold", emoji: "🥶", extra: -200 },
  { value: "temperate", label: "Temperate", emoji: "🌤️", extra: 0 },
  { value: "warm", label: "Warm / Humid", emoji: "☀️", extra: 400 },
  { value: "hot", label: "Hot / Tropical", emoji: "🔥", extra: 700 },
];

export default function WaterIntakeCalculatorClient() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"kg" | "lbs">("lbs");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [climate, setClimate] = useState<Climate>("temperate");

  const kg =
    unit === "kg"
      ? parseFloat(weight) || 0
      : (parseFloat(weight) || 0) / 2.2046;

  const baseML = kg > 0 ? kg * 35 : 0; // 35ml/kg baseline
  const actExtra =
    ACTIVITY_OPTIONS.find((a) => a.value === activity)?.extra ?? 0;
  const climExtra =
    CLIMATE_OPTIONS.find((c) => c.value === climate)?.extra ?? 0;
  const totalML = baseML + actExtra + climExtra;
  const totalL = (totalML / 1000).toFixed(1);
  const glasses250 = Math.ceil(totalML / 250);
  const glasses8oz = Math.ceil(totalML / 237);

  const pct = (portion: number) => Math.round((portion / totalML) * 100);

  return (
    <div className='min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mb-4 shadow-lg'>
              <Droplets className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Water Intake Calculator
            </h2>
            <p className='text-gray-500'>
              Your personalised daily hydration target — adjusted for weight,
              activity, and climate
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Inputs */}
            <div className='space-y-6'>
              {/* Weight */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Body weight
                </label>
                <div className='flex gap-2'>
                  <input
                    type='number'
                    min='0'
                    value={weight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setWeight(e.target.value)
                    }
                    placeholder={unit === "lbs" ? "e.g. 165" : "e.g. 75"}
                    className='flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                  />
                  <div className='flex border-2 border-gray-300 rounded-lg overflow-hidden'>
                    {(["lbs", "kg"] as const).map((u) => (
                      <button
                        key={u}
                        onClick={() => setUnit(u)}
                        className={`px-4 py-3 text-sm font-semibold transition-colors ${unit === u ? "bg-cyan-500 text-white" : "bg-white text-gray-600"}`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Activity level
                </label>
                <div className='space-y-2'>
                  {ACTIVITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setActivity(opt.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${activity === opt.value ? "bg-cyan-600 text-white border-cyan-600 shadow-md" : "bg-white text-gray-700 border-gray-200 hover:border-cyan-300"}`}
                    >
                      <div className='flex items-center justify-between'>
                        <div>
                          <span className='font-semibold text-sm'>
                            {opt.label}
                          </span>
                          <span
                            className={`ml-2 text-xs ${activity === opt.value ? "text-cyan-200" : "text-gray-400"}`}
                          >
                            {opt.desc}
                          </span>
                        </div>
                        {opt.extra > 0 && (
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-full ${activity === opt.value ? "bg-cyan-500 text-white" : "bg-cyan-50 text-cyan-700"}`}
                          >
                            +{opt.extra}ml
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Climate */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Climate
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  {CLIMATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setClimate(opt.value)}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex items-center gap-2 ${climate === opt.value ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"}`}
                    >
                      <span>{opt.emoji}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className='space-y-4'>
              {kg > 0 ? (
                <>
                  <div className='bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white text-center shadow-lg'>
                    <p className='text-cyan-100 text-sm mb-1'>
                      Daily water target
                    </p>
                    <p className='text-6xl font-black mb-1'>
                      {totalL}
                      <span className='text-2xl font-bold'>L</span>
                    </p>
                    <p className='text-cyan-200 text-sm'>
                      {Math.round(totalML).toLocaleString()} ml / day
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-3'>
                    {[
                      {
                        label: "250ml glasses",
                        value: glasses250,
                        color: "bg-sky-50 border-sky-100",
                        text: "text-sky-700",
                      },
                      {
                        label: "8 oz glasses",
                        value: glasses8oz,
                        color: "bg-cyan-50 border-cyan-100",
                        text: "text-cyan-700",
                      },
                      {
                        label: "Base (weight)",
                        value: `${Math.round(baseML)}ml`,
                        color: "bg-blue-50 border-blue-100",
                        text: "text-blue-700",
                      },
                      {
                        label: "Activity extra",
                        value: `+${actExtra}ml`,
                        color: "bg-teal-50 border-teal-100",
                        text: "text-teal-700",
                      },
                    ].map(({ label, value, color, text }) => (
                      <div
                        key={label}
                        className={`${color} border rounded-xl p-3 text-center`}
                      >
                        <p className={`text-xl font-black ${text}`}>{value}</p>
                        <p className='text-xs text-gray-500 mt-0.5'>{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Breakdown bar */}
                  <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                    <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>
                      What makes up your target
                    </p>
                    <div className='flex h-4 rounded-full overflow-hidden mb-2'>
                      <div
                        className='bg-cyan-500'
                        style={{ width: `${pct(baseML)}%` }}
                      />
                      <div
                        className='bg-blue-400'
                        style={{ width: `${pct(actExtra)}%` }}
                      />
                      <div
                        className='bg-sky-300'
                        style={{ width: `${pct(Math.max(0, climExtra))}%` }}
                      />
                    </div>
                    <div className='flex gap-4 text-xs text-gray-500'>
                      <span className='flex items-center gap-1'>
                        <span className='w-3 h-3 rounded-full bg-cyan-500 inline-block' />
                        Base
                      </span>
                      <span className='flex items-center gap-1'>
                        <span className='w-3 h-3 rounded-full bg-blue-400 inline-block' />
                        Activity
                      </span>
                      <span className='flex items-center gap-1'>
                        <span className='w-3 h-3 rounded-full bg-sky-300 inline-block' />
                        Climate
                      </span>
                    </div>
                  </div>

                  <div className='bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 text-sm text-amber-800'>
                    <strong>Urine colour check:</strong> Pale straw yellow =
                    well hydrated. Dark yellow = drink more. Clear = possibly
                    over-hydrated.
                  </div>
                </>
              ) : (
                <div className='flex items-center justify-center h-64 bg-cyan-50 rounded-2xl border-2 border-dashed border-cyan-200'>
                  <div className='text-center text-cyan-400'>
                    <Droplets className='w-12 h-12 mx-auto mb-3 opacity-40' />
                    <p className='text-sm font-medium'>
                      Enter your weight to calculate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setWeight("");
              setActivity("moderate");
              setClimate("temperate");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>

          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Hydration tips:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Drink a glass of water first thing in the morning to rehydrate
                after sleep
              </li>
              <li>
                Coffee and tea do count toward your daily fluid intake — the
                caffeine diuretic effect is mild
              </li>
              <li>
                About 20% of daily water comes from food — fruits and vegetables
                are especially hydrating
              </li>
              <li>
                Thirst is already a sign of mild dehydration — drink
                consistently throughout the day
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
