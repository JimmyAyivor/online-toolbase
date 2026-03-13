"use client";
import React, { useState } from "react";
import { Scale, RotateCcw } from "lucide-react";

type Sex = "male" | "female";
type Unit = "imperial" | "metric";

function calcFormulas(heightCm: number, sex: Sex) {
  const hIn = heightCm / 2.54;
  const base = sex === "male" ? 48 : 45.5;
  const baseHamwi = sex === "male" ? 48 : 45.5;
  const inchesOver = Math.max(0, hIn - 60);
  const hamwi =
    (baseHamwi + (sex === "male" ? 2.72 : 2.27) * inchesOver) *
    (sex === "male" ? 1 : 1);
  // Hamwi
  const hamwi_kg =
    sex === "male" ? 48 + 2.7 * inchesOver : 45.5 + 2.2 * inchesOver;
  // Devine
  const devine_kg =
    sex === "male" ? 50 + 2.3 * inchesOver : 45.5 + 2.3 * inchesOver;
  // Robinson
  const robinson_kg =
    sex === "male" ? 52 + 1.9 * inchesOver : 49 + 1.7 * inchesOver;
  // Miller
  const miller_kg =
    sex === "male" ? 56.2 + 1.41 * inchesOver : 53.1 + 1.36 * inchesOver;
  // BMI healthy range (18.5–24.9)
  const h_m = heightCm / 100;
  const bmiLow = 18.5 * h_m * h_m;
  const bmiHigh = 24.9 * h_m * h_m;
  return { hamwi_kg, devine_kg, robinson_kg, miller_kg, bmiLow, bmiHigh };
}

const kg2lbs = (n: number) => n * 2.20462;
const fmtKg = (n: number) => `${n.toFixed(1)} kg`;
const fmtLbs = (n: number) => `${kg2lbs(n).toFixed(1)} lbs`;

export default function IdealWeightCalculatorClient() {
  const [sex, setSex] = useState<Sex>("male");
  const [unit, setUnit] = useState<Unit>("imperial");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn2, setHeightIn2] = useState("10");
  const [heightCm, setHeightCm] = useState("178");

  const h_cm =
    unit === "imperial"
      ? (parseFloat(heightFt) || 0) * 30.48 +
        (parseFloat(heightIn2) || 0) * 2.54
      : parseFloat(heightCm) || 0;

  const { hamwi_kg, devine_kg, robinson_kg, miller_kg, bmiLow, bmiHigh } =
    h_cm > 100
      ? calcFormulas(h_cm, sex)
      : {
          hamwi_kg: 0,
          devine_kg: 0,
          robinson_kg: 0,
          miller_kg: 0,
          bmiLow: 0,
          bmiHigh: 0,
        };
  const average = (hamwi_kg + devine_kg + robinson_kg + miller_kg) / 4;
  const fmt = (kg: number) => (unit === "imperial" ? fmtLbs(kg) : fmtKg(kg));

  const formulas = [
    { name: "Hamwi formula", kg: hamwi_kg, note: "Used in clinical nutrition" },
    {
      name: "Devine formula",
      kg: devine_kg,
      note: "Used in pharmacology dosing",
    },
    { name: "Robinson formula", kg: robinson_kg, note: "Modified Devine" },
    {
      name: "Miller formula",
      kg: miller_kg,
      note: "Less common, taller-friendly",
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4 shadow-lg'>
              <Scale className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Ideal Weight Calculator
            </h2>
            <p className='text-gray-500'>
              Compare 4 medical formulas for your ideal body weight range
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div className='flex gap-2'>
                {(["imperial", "metric"] as Unit[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize border-2 transition-all ${unit === u ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"}`}
                  >
                    {u}
                  </button>
                ))}
              </div>
              <div className='flex gap-2'>
                {(["male", "female"] as Sex[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSex(s)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize border-2 transition-all ${sex === s ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {unit === "imperial" ? (
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    Height
                  </label>
                  <div className='flex gap-2'>
                    <input
                      value={heightFt}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setHeightFt(e.target.value)
                      }
                      placeholder='ft'
                      className='w-24 border-2 border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-400 focus:border-transparent'
                    />
                    <input
                      value={heightIn2}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setHeightIn2(e.target.value)
                      }
                      placeholder='in'
                      className='w-24 border-2 border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-400 focus:border-transparent'
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    Height (cm)
                  </label>
                  <input
                    value={heightCm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setHeightCm(e.target.value)
                    }
                    className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:border-transparent'
                  />
                </div>
              )}
              <div className='bg-green-50 border border-green-100 rounded-xl p-4'>
                <p className='text-xs font-bold text-green-700 uppercase tracking-widest mb-1'>
                  Healthy BMI range (18.5–24.9)
                </p>
                <p className='text-lg font-black text-green-700'>
                  {h_cm > 100 ? `${fmt(bmiLow)} – ${fmt(bmiHigh)}` : "—"}
                </p>
                <p className='text-xs text-gray-400 mt-1'>
                  BMI has limitations — does not account for muscle mass or body
                  composition
                </p>
              </div>
            </div>

            <div className='space-y-3'>
              {h_cm > 100 && (
                <>
                  <div className='bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 text-center'>
                    <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-1'>
                      Average across formulas
                    </p>
                    <p className='text-4xl font-black text-emerald-700'>
                      {fmt(average)}
                    </p>
                  </div>
                  {formulas.map(({ name, kg, note }) => (
                    <div
                      key={name}
                      className='bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 flex justify-between items-center'
                    >
                      <div>
                        <p className='font-semibold text-gray-800 text-sm'>
                          {name}
                        </p>
                        <p className='text-xs text-gray-400'>{note}</p>
                      </div>
                      <p className='text-xl font-black text-green-700'>
                        {fmt(kg)}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setSex("male");
              setUnit("imperial");
              setHeightFt("5");
              setHeightIn2("10");
              setHeightCm("178");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>
          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              ⚠ Important disclaimer:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Ideal weight formulas are guidelines, not prescriptions — not
                all apply to every body type
              </li>
              <li>
                Muscle mass, bone density, ethnicity, and age affect what's
                healthy for you personally
              </li>
              <li>
                Consult a doctor or registered dietitian for personalised weight
                goals
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
