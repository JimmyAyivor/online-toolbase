"use client";
import React, { useState } from "react";
import { Zap, RotateCcw } from "lucide-react";

type Solve = "speed" | "distance" | "time";
type SpeedUnit = "mph" | "kmh" | "ms";
type DistUnit = "miles" | "km" | "m";
type TimeUnit = "hours" | "minutes" | "seconds";

const toMs: Record<SpeedUnit, number> = { mph: 0.44704, kmh: 1 / 3.6, ms: 1 };
const toM: Record<DistUnit, number> = { miles: 1609.344, km: 1000, m: 1 };
const toS: Record<TimeUnit, number> = { hours: 3600, minutes: 60, seconds: 1 };

function fmt(n: number, dp = 2): string {
  return n.toFixed(dp);
}

export default function SpeedDistanceTimeCalculatorClient() {
  const [solve, setSolve] = useState<Solve>("speed");
  const [speed, setSpeed] = useState("");
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>("mph");
  const [distance, setDistance] = useState("");
  const [distUnit, setDistUnit] = useState<DistUnit>("miles");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("hours");

  const result = (() => {
    if (solve === "speed") {
      const d = parseFloat(distance) * toM[distUnit];
      const t = parseFloat(time) * toS[timeUnit];
      if (!d || !t) return null;
      const ms = d / t;
      return { speed: ms / toMs[speedUnit], unit: speedUnit };
    } else if (solve === "distance") {
      const s = parseFloat(speed) * toMs[speedUnit];
      const t = parseFloat(time) * toS[timeUnit];
      if (!s || !t) return null;
      const meters = s * t;
      return { distance: meters / toM[distUnit], unit: distUnit };
    } else {
      const s = parseFloat(speed) * toMs[speedUnit];
      const d = parseFloat(distance) * toM[distUnit];
      if (!s || !d) return null;
      const secs = d / s;
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      const sec = Math.round(secs % 60);
      return {
        seconds: secs,
        formatted:
          h > 0 ? `${h}h ${m}m ${sec}s` : m > 0 ? `${m}m ${sec}s` : `${sec}s`,
      };
    }
  })();

  const SEL =
    "border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white";
  const INP =
    "w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Zap className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Speed Distance Time Calculator
            </h2>
            <p className="text-gray-600">
              Solve for speed, distance, or time using the SDT formula
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {(["speed", "distance", "time"] as Solve[]).map((s) => (
              <button
                key={s}
                onClick={() => setSolve(s)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border-2 capitalize transition-colors ${solve === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
              >
                Find {s}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Speed */}
            <div
              className={`rounded-xl border-2 p-5 ${solve === "speed" ? "border-indigo-200 bg-indigo-50" : "border-gray-100"}`}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Speed{" "}
                {solve === "speed" && (
                  <span className="text-indigo-600">(solving)</span>
                )}
              </label>
              {solve !== "speed" ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    min="0"
                    value={speed}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSpeed(e.target.value)
                    }
                    placeholder="Enter speed"
                    className={INP}
                  />
                  <select
                    value={speedUnit}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSpeedUnit(e.target.value as SpeedUnit)
                    }
                    className={`w-full ${SEL}`}
                  >
                    <option value="mph">mph</option>
                    <option value="kmh">km/h</option>
                    <option value="ms">m/s</option>
                  </select>
                </div>
              ) : (
                <div className="h-24 flex items-center justify-center">
                  <div className="text-center">
                    {result ? (
                      <>
                        <p className="text-3xl font-black text-indigo-700">
                          {fmt((result as any).speed)}
                        </p>
                        <select
                          value={speedUnit}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setSpeedUnit(e.target.value as SpeedUnit)
                          }
                          className={`mt-2 ${SEL}`}
                        >
                          <option value="mph">mph</option>
                          <option value="kmh">km/h</option>
                          <option value="ms">m/s</option>
                        </select>
                      </>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        Fill in the other fields
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Distance */}
            <div
              className={`rounded-xl border-2 p-5 ${solve === "distance" ? "border-indigo-200 bg-indigo-50" : "border-gray-100"}`}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Distance{" "}
                {solve === "distance" && (
                  <span className="text-indigo-600">(solving)</span>
                )}
              </label>
              {solve !== "distance" ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    min="0"
                    value={distance}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDistance(e.target.value)
                    }
                    placeholder="Enter distance"
                    className={INP}
                  />
                  <select
                    value={distUnit}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setDistUnit(e.target.value as DistUnit)
                    }
                    className={`w-full ${SEL}`}
                  >
                    <option value="miles">miles</option>
                    <option value="km">km</option>
                    <option value="m">m</option>
                  </select>
                </div>
              ) : (
                <div className="h-24 flex items-center justify-center">
                  <div className="text-center">
                    {result ? (
                      <>
                        <p className="text-3xl font-black text-indigo-700">
                          {fmt((result as any).distance)}
                        </p>
                        <select
                          value={distUnit}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setDistUnit(e.target.value as DistUnit)
                          }
                          className={`mt-2 ${SEL}`}
                        >
                          <option value="miles">miles</option>
                          <option value="km">km</option>
                          <option value="m">m</option>
                        </select>
                      </>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        Fill in the other fields
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Time */}
            <div
              className={`rounded-xl border-2 p-5 ${solve === "time" ? "border-indigo-200 bg-indigo-50" : "border-gray-100"}`}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Time{" "}
                {solve === "time" && (
                  <span className="text-indigo-600">(solving)</span>
                )}
              </label>
              {solve !== "time" ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    min="0"
                    value={time}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTime(e.target.value)
                    }
                    placeholder="Enter time"
                    className={INP}
                  />
                  <select
                    value={timeUnit}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setTimeUnit(e.target.value as TimeUnit)
                    }
                    className={`w-full ${SEL}`}
                  >
                    <option value="hours">hours</option>
                    <option value="minutes">minutes</option>
                    <option value="seconds">seconds</option>
                  </select>
                </div>
              ) : (
                <div className="h-24 flex items-center justify-center text-center">
                  {result ? (
                    <>
                      <p className="text-3xl font-black text-indigo-700">
                        {(result as any).formatted}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {fmt((result as any).seconds)} seconds
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Fill in the other fields
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setSpeed("");
              setDistance("");
              setTime("");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">The SDT formula:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Speed = Distance ÷ Time</li>
              <li>Distance = Speed × Time</li>
              <li>Time = Distance ÷ Speed</li>
              <li>
                All units are internally converted before calculation — you can
                mix imperial and metric freely
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
