"use client";
import React, { useState } from "react";
import { Timer, RotateCcw } from "lucide-react";

type Mode = "pace" | "time" | "distance";

const RACE_PRESETS = [
  { label: "5K", km: 5, miles: 3.107 },
  { label: "10K", km: 10, miles: 6.214 },
  { label: "Half", km: 21.097, miles: 13.109 },
  { label: "Marathon", km: 42.195, miles: 26.219 },
];

function toSeconds(h: string, m: string, s: string) {
  return (
    (parseInt(h) || 0) * 3600 + (parseInt(m) || 0) * 60 + (parseInt(s) || 0)
  );
}
function formatTime(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.round(sec % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function formatPace(secPerUnit: number) {
  const m = Math.floor(secPerUnit / 60);
  const s = Math.round(secPerUnit % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function RunningPaceCalculatorClient() {
  const [mode, setMode] = useState<Mode>("pace");
  const [distKm, setDistKm] = useState("");
  const [distUnit, setDistUnit] = useState<"km" | "miles">("km");
  const [timeH, setTimeH] = useState("");
  const [timeM, setTimeM] = useState("");
  const [timeS, setTimeS] = useState("");
  const [paceM, setPaceM] = useState("");
  const [paceS, setPaceS] = useState("");
  const [paceUnit, setPaceUnit] = useState<"km" | "miles">("km");

  const dist = parseFloat(distKm) || 0;
  const distInKm = distUnit === "km" ? dist : dist * 1.60934;
  const distInMiles = distUnit === "miles" ? dist : dist / 1.60934;
  const totalSec = toSeconds(timeH, timeM, timeS);
  const paceSecPerUnit = (parseInt(paceM) || 0) * 60 + (parseInt(paceS) || 0);
  const paceSecPerKm =
    paceUnit === "km" ? paceSecPerUnit : paceSecPerUnit / 1.60934;
  const paceSecPerMile =
    paceUnit === "miles" ? paceSecPerUnit : paceSecPerUnit * 1.60934;

  let result: {
    paceKm: string;
    paceMile: string;
    totalTime: string;
    distKm: string;
    distMiles: string;
  } | null = null;

  if (mode === "pace" && distInKm > 0 && totalSec > 0) {
    const pKm = totalSec / distInKm;
    result = {
      paceKm: formatPace(pKm),
      paceMile: formatPace(pKm * 1.60934),
      totalTime: formatTime(totalSec),
      distKm: distInKm.toFixed(2),
      distMiles: distInMiles.toFixed(2),
    };
  } else if (mode === "time" && distInKm > 0 && paceSecPerKm > 0) {
    const t = distInKm * paceSecPerKm;
    result = {
      paceKm: formatPace(paceSecPerKm),
      paceMile: formatPace(paceSecPerMile),
      totalTime: formatTime(t),
      distKm: distInKm.toFixed(2),
      distMiles: distInMiles.toFixed(2),
    };
  } else if (mode === "distance" && totalSec > 0 && paceSecPerKm > 0) {
    const dKm = totalSec / paceSecPerKm;
    result = {
      paceKm: formatPace(paceSecPerKm),
      paceMile: formatPace(paceSecPerMile),
      totalTime: formatTime(totalSec),
      distKm: dKm.toFixed(2),
      distMiles: (dKm / 1.60934).toFixed(2),
    };
  }

  // Split table
  const splits: { label: string; time: string }[] = [];
  if (result) {
    const pKm =
      parseFloat(result.distKm) > 0 && toSeconds(timeH, timeM, timeS) > 0
        ? toSeconds(timeH, timeM, timeS) / parseFloat(result.distKm)
        : paceSecPerKm;
    const totalKm = parseFloat(result.distKm);
    for (let i = 1; i <= Math.min(Math.ceil(totalKm), 42); i++) {
      splits.push({ label: `${i} km`, time: formatTime(i * pKm) });
    }
  }

  const modeBtn = (m: Mode, label: string) => (
    <button
      onClick={() => setMode(m)}
      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === m ? "bg-orange-500 text-white shadow-md" : "bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300"}`}
    >
      {label}
    </button>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full mb-4 shadow-lg'>
              <Timer className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Running Pace Calculator
            </h2>
            <p className='text-gray-500'>
              Calculate pace, time, or distance for any run or race
            </p>
          </div>

          {/* Mode selector */}
          <div className='flex gap-2 mb-8'>
            {modeBtn("pace", "Find Pace")}
            {modeBtn("time", "Find Time")}
            {modeBtn("distance", "Find Distance")}
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Inputs */}
            <div className='space-y-5'>
              {/* Distance */}
              {mode !== "distance" && (
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Distance
                  </label>
                  <div className='flex gap-2 mb-2'>
                    <input
                      type='number'
                      min='0'
                      value={distKm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDistKm(e.target.value)
                      }
                      placeholder='e.g. 42.195'
                      className='flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent'
                    />
                    <div className='flex border-2 border-gray-300 rounded-lg overflow-hidden'>
                      {(["km", "miles"] as const).map((u) => (
                        <button
                          key={u}
                          onClick={() => setDistUnit(u)}
                          className={`px-3 py-2 text-sm font-semibold transition-colors ${distUnit === u ? "bg-orange-500 text-white" : "bg-white text-gray-600"}`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className='flex gap-2 flex-wrap'>
                    {RACE_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => {
                          setDistKm(
                            distUnit === "km" ? String(p.km) : String(p.miles),
                          );
                        }}
                        className='px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-700 rounded-lg text-xs font-semibold hover:bg-orange-100 transition-colors'
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Time */}
              {mode !== "time" && (
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Time (h : mm : ss)
                  </label>
                  <div className='flex gap-2'>
                    {[
                      ["Hours", timeH, setTimeH, "0"],
                      ["Min", timeM, setTimeM, "00"],
                      ["Sec", timeS, setTimeS, "00"],
                    ].map(([label, val, setter, ph]) => (
                      <div key={label as string} className='flex-1'>
                        <label className='block text-xs text-gray-400 mb-1'>
                          {label as string}
                        </label>
                        <input
                          type='number'
                          min='0'
                          value={val as string}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            (
                              setter as React.Dispatch<
                                React.SetStateAction<string>
                              >
                            )(e.target.value)
                          }
                          placeholder={ph as string}
                          className='w-full border-2 border-gray-300 rounded-lg px-3 py-3 text-center font-mono focus:ring-2 focus:ring-orange-400 focus:border-transparent'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pace */}
              {mode !== "pace" && (
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Pace (min : ss)
                  </label>
                  <div className='flex gap-2 items-end'>
                    <div className='flex-1'>
                      <label className='block text-xs text-gray-400 mb-1'>
                        Min
                      </label>
                      <input
                        type='number'
                        min='0'
                        value={paceM}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPaceM(e.target.value)
                        }
                        placeholder='5'
                        className='w-full border-2 border-gray-300 rounded-lg px-3 py-3 text-center font-mono focus:ring-2 focus:ring-orange-400 focus:border-transparent'
                      />
                    </div>
                    <span className='pb-3 text-gray-400 font-bold'>:</span>
                    <div className='flex-1'>
                      <label className='block text-xs text-gray-400 mb-1'>
                        Sec
                      </label>
                      <input
                        type='number'
                        min='0'
                        max='59'
                        value={paceS}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPaceS(e.target.value)
                        }
                        placeholder='30'
                        className='w-full border-2 border-gray-300 rounded-lg px-3 py-3 text-center font-mono focus:ring-2 focus:ring-orange-400 focus:border-transparent'
                      />
                    </div>
                    <div className='flex border-2 border-gray-300 rounded-lg overflow-hidden mb-0'>
                      {(["km", "miles"] as const).map((u) => (
                        <button
                          key={u}
                          onClick={() => setPaceUnit(u)}
                          className={`px-3 py-3 text-xs font-semibold transition-colors ${paceUnit === u ? "bg-orange-500 text-white" : "bg-white text-gray-600"}`}
                        >
                          /{u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Result */}
            <div>
              {result ? (
                <div className='space-y-4'>
                  <div className='bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg'>
                    <p className='text-orange-100 text-xs uppercase tracking-widest mb-2'>
                      {mode === "pace"
                        ? "Your pace"
                        : mode === "time"
                          ? "Finish time"
                          : "Distance"}
                    </p>
                    <p className='text-4xl font-black mb-1'>
                      {mode === "pace"
                        ? `${result.paceKm}/km`
                        : mode === "time"
                          ? result.totalTime
                          : `${result.distKm} km`}
                    </p>
                    <p className='text-orange-200 text-sm'>
                      {mode === "pace"
                        ? `${result.paceMile}/mile`
                        : mode === "time"
                          ? `${result.distKm}km / ${result.distMiles}mi`
                          : `${result.distMiles} miles`}
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-3'>
                    {[
                      {
                        label: "Pace /km",
                        value: result.paceKm,
                        color: "bg-orange-50 border-orange-100",
                        text: "text-orange-700",
                      },
                      {
                        label: "Pace /mile",
                        value: result.paceMile,
                        color: "bg-amber-50 border-amber-100",
                        text: "text-amber-700",
                      },
                      {
                        label: "Total time",
                        value: result.totalTime,
                        color: "bg-yellow-50 border-yellow-100",
                        text: "text-yellow-700",
                      },
                      {
                        label: "Distance",
                        value: `${result.distKm}km`,
                        color: "bg-red-50 border-red-100",
                        text: "text-red-600",
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

                  {/* Splits table */}
                  {splits.length > 0 && (
                    <div className='bg-gray-50 rounded-xl border border-gray-100 overflow-hidden'>
                      <p className='text-xs font-bold text-gray-400 uppercase tracking-widest px-4 py-2 border-b border-gray-100'>
                        Km splits
                      </p>
                      <div className='max-h-40 overflow-y-auto'>
                        {splits.map(({ label, time }) => (
                          <div
                            key={label}
                            className='flex justify-between px-4 py-1.5 hover:bg-orange-50 text-sm'
                          >
                            <span className='text-gray-500'>{label}</span>
                            <span className='font-mono font-bold text-gray-800'>
                              {time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className='flex items-center justify-center h-64 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200'>
                  <div className='text-center text-orange-400'>
                    <Timer className='w-12 h-12 mx-auto mb-3 opacity-40' />
                    <p className='text-sm font-medium'>
                      Enter your values to calculate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setDistKm("");
              setTimeH("");
              setTimeM("");
              setTimeS("");
              setPaceM("");
              setPaceS("");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>

          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>💡 Pace tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Find Pace: enter distance + time → get your pace per km and mile
              </li>
              <li>
                Find Time: enter distance + pace → get your predicted finish
                time
              </li>
              <li>Find Distance: enter time + pace → get how far you'll run</li>
              <li>
                Use the race presets (5K, 10K, Half, Marathon) to quickly fill
                the distance field
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
