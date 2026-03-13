"use client";
import React, { useState, useMemo } from "react";
import { Activity, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Sex = "male" | "female";
type Unit = "metric" | "imperial";

interface BodyFatResult {
  bodyFat: number;
  category: string;
  lean: number;
  fat: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MALE_CATEGORIES: [number, string][] = [
  [6, "Essential Fat"],
  [14, "Athletes"],
  [18, "Fitness"],
  [25, "Average"],
  [Infinity, "Obese"],
];

const FEMALE_CATEGORIES: [number, string][] = [
  [14, "Essential Fat"],
  [21, "Athletes"],
  [25, "Fitness"],
  [32, "Average"],
  [Infinity, "Obese"],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCategory(bf: number, sex: Sex): string {
  const table = sex === "male" ? MALE_CATEGORIES : FEMALE_CATEGORIES;
  return table.find(([max]) => bf <= max)?.[1] ?? "Obese";
}

function calcNavy(
  sex: Sex,
  heightCm: number,
  waistCm: number,
  neckCm: number,
  hipCm: number,
  weightKg: number,
): BodyFatResult | null {
  if ([heightCm, waistCm, neckCm, weightKg].some((v) => !v || v <= 0))
    return null;
  if (sex === "female" && (!hipCm || hipCm <= 0)) return null;

  let bf: number;
  if (sex === "male") {
    bf =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waistCm - neckCm) +
          0.15456 * Math.log10(heightCm)) -
      450;
  } else {
    bf =
      495 /
        (1.29579 -
          0.35004 * Math.log10(waistCm + hipCm - neckCm) +
          0.221 * Math.log10(heightCm)) -
      450;
  }

  if (isNaN(bf) || bf < 0) return null;
  bf = Math.min(bf, 60);

  return {
    bodyFat: Math.round(bf * 10) / 10,
    category: getCategory(bf, sex),
    lean: Math.round(weightKg * (1 - bf / 100) * 10) / 10,
    fat: Math.round(weightKg * (bf / 100) * 10) / 10,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BodyFatCalculatorClient() {
  const [sex, setSex] = useState<Sex>("male");
  const [unit, setUnit] = useState<Unit>("metric");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [neck, setNeck] = useState<string>("");
  const [hip, setHip] = useState<string>("");

  const toCm = (v: string): number => {
    const n = Number(v);
    return unit === "imperial" ? n * 2.54 : n;
  };
  const toKg = (v: string): number => {
    const n = Number(v);
    return unit === "imperial" ? n * 0.453592 : n;
  };

  const result = useMemo(
    () =>
      calcNavy(
        sex,
        toCm(height),
        toCm(waist),
        toCm(neck),
        toCm(hip),
        toKg(weight),
      ),
    [sex, unit, height, weight, waist, neck, hip],
  );

  const reset = (): void => {
    setHeight("");
    setWeight("");
    setWaist("");
    setNeck("");
    setHip("");
  };

  const u = unit === "metric" ? "cm" : "in";
  const wu = unit === "metric" ? "kg" : "lbs";

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Activity className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Body Fat Calculator
            </h2>
            <p className='text-gray-600'>
              Estimate body fat percentage using the US Navy circumference
              method
            </p>
          </div>

          <div className='space-y-6'>
            {/* Options */}
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Sex
                  </label>
                  <div className='grid grid-cols-2 gap-2'>
                    {(["male", "female"] as Sex[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSex(s)}
                        className={`py-2 rounded-lg font-semibold text-sm capitalize transition-colors border ${
                          sex === s
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Units
                  </label>
                  <div className='grid grid-cols-2 gap-2'>
                    {(
                      [
                        { key: "metric", label: "Metric (cm / kg)" },
                        { key: "imperial", label: "Imperial (in / lbs)" },
                      ] as { key: Unit; label: string }[]
                    ).map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setUnit(key)}
                        className={`py-2 rounded-lg font-semibold text-sm transition-colors border ${
                          unit === key
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Measurements */}
            <div className='grid md:grid-cols-2 gap-4'>
              {[
                { label: `Height (${u})`, value: height, set: setHeight },
                { label: `Weight (${wu})`, value: weight, set: setWeight },
                {
                  label: `Waist (${u}) — measured at navel`,
                  value: waist,
                  set: setWaist,
                },
                {
                  label: `Neck (${u}) — measured below larynx`,
                  value: neck,
                  set: setNeck,
                },
                ...(sex === "female"
                  ? [
                      {
                        label: `Hip (${u}) — widest point`,
                        value: hip,
                        set: setHip,
                      },
                    ]
                  : []),
              ].map(({ label, value, set }) => (
                <div key={label}>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {label}
                  </label>
                  <input
                    type='number'
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(e.target.value)
                    }
                    placeholder='0'
                    min='0'
                    step='0.1'
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                </div>
              ))}
            </div>

            <button
              onClick={reset}
              className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
            >
              <RotateCcw className='w-4 h-4' />
              Reset All
            </button>

            {/* Results */}
            {result && (
              <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
                <h3 className='text-xl font-bold text-gray-800 mb-4'>
                  Results
                </h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                  {[
                    { label: "Body Fat %", value: `${result.bodyFat}%` },
                    { label: "Category", value: result.category },
                    { label: `Lean Mass (${wu})`, value: String(result.lean) },
                    { label: `Fat Mass (${wu})`, value: String(result.fat) },
                  ].map(({ label, value }) => (
                    <div key={label} className='bg-white rounded-lg p-4'>
                      <div className='text-2xl font-bold text-indigo-600'>
                        {value}
                      </div>
                      <div className='text-sm text-gray-600'>{label}</div>
                    </div>
                  ))}
                </div>
                {/* Body fat bar */}
                <div>
                  <div className='flex justify-between text-xs text-gray-500 mb-1'>
                    <span>0%</span>
                    <span>Body Fat: {result.bodyFat}%</span>
                    <span>50%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-3'>
                    <div
                      className='bg-indigo-600 h-3 rounded-full transition-all'
                      style={{
                        width: `${Math.min(100, (result.bodyFat / 50) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Measure your waist at the navel level and your neck just below
                the larynx (Adam&apos;s apple)
              </li>
              <li>
                Women need a hip measurement at the widest point for the Navy
                formula
              </li>
              <li>
                This formula provides an estimate — DEXA scans are the gold
                standard for accuracy
              </li>
              <li>
                For best results, measure first thing in the morning before
                eating or drinking
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
