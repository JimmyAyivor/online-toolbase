"use client";
import React, { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

type GradientType = "linear" | "radial" | "conic";

interface Stop {
  id: number;
  color: string;
  position: number;
}

const PRESETS: {
  name: string;
  type: GradientType;
  angle: number;
  stops: Omit<Stop, "id">[];
}[] = [
  {
    name: "Sunset",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#FF6B6B", position: 0 },
      { color: "#FFA500", position: 50 },
      { color: "#FFD700", position: 100 },
    ],
  },
  {
    name: "Ocean",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#0EA5E9", position: 0 },
      { color: "#2563EB", position: 100 },
    ],
  },
  {
    name: "Aurora",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#34D399", position: 0 },
      { color: "#3B82F6", position: 50 },
      { color: "#8B5CF6", position: 100 },
    ],
  },
  {
    name: "Candy",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#F472B6", position: 0 },
      { color: "#A78BFA", position: 100 },
    ],
  },
  {
    name: "Forest",
    type: "linear",
    angle: 160,
    stops: [
      { color: "#064E3B", position: 0 },
      { color: "#10B981", position: 100 },
    ],
  },
  {
    name: "Fire",
    type: "radial",
    angle: 0,
    stops: [
      { color: "#FDE047", position: 0 },
      { color: "#EF4444", position: 100 },
    ],
  },
];

let nextId = 3;

export default function GradientGeneratorClient() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([
    { id: 1, color: "#6366F1", position: 0 },
    { id: 2, color: "#EC4899", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const gradientCss = (() => {
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    const stopStr = sorted.map((s) => `${s.color} ${s.position}%`).join(", ");
    if (type === "linear") return `linear-gradient(${angle}deg, ${stopStr})`;
    if (type === "radial") return `radial-gradient(circle, ${stopStr})`;
    return `conic-gradient(from ${angle}deg, ${stopStr})`;
  })();

  const fullCss = `background: ${gradientCss};`;

  const copy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addStop = () => {
    setStops((prev) => [
      ...prev,
      { id: nextId++, color: "#A855F7", position: 50 },
    ]);
  };
  const updateStop = (
    id: number,
    field: "color" | "position",
    value: string | number,
  ) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };
  const removeStop = (id: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops.map((s, i) => ({ ...s, id: i + 1 })));
    nextId = preset.stops.length + 1;
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-fuchsia-50 via-purple-50 to-pink-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div
              className='inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg'
              style={{
                background: "linear-gradient(135deg, #A855F7, #EC4899)",
              }}
            >
              <svg
                className='w-8 h-8 text-white'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <rect x='3' y='3' width='18' height='18' rx='3' />
                <path d='M3 9h18M3 15h18M9 3v18M15 3v18' />
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              CSS Gradient Generator
            </h2>
            <p className='text-gray-500'>
              Build beautiful gradients visually and copy the CSS code instantly
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Controls */}
            <div className='space-y-6'>
              {/* Type */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Gradient type
                </label>
                <div className='flex gap-2'>
                  {(["linear", "radial", "conic"] as GradientType[]).map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${type === t ? "bg-fuchsia-600 text-white shadow-md" : "bg-white text-gray-600 border-2 border-gray-200 hover:border-fuchsia-300"}`}
                      >
                        {t}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Angle (linear/conic) */}
              {type !== "radial" && (
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    {type === "linear" ? "Direction" : "Start angle"}:{" "}
                    <span className='text-fuchsia-600'>{angle}°</span>
                  </label>
                  <input
                    type='range'
                    min='0'
                    max='360'
                    value={angle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAngle(parseInt(e.target.value))
                    }
                    className='w-full accent-fuchsia-600'
                  />
                  <div className='flex justify-between text-xs text-gray-400 mt-1'>
                    <span>0°</span>
                    <span>90°</span>
                    <span>180°</span>
                    <span>270°</span>
                    <span>360°</span>
                  </div>
                </div>
              )}

              {/* Color stops */}
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <label className='text-sm font-semibold text-gray-700'>
                    Color stops
                  </label>
                  <button
                    onClick={addStop}
                    className='text-xs px-3 py-1.5 bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 rounded-lg font-semibold hover:bg-fuchsia-100 transition-colors'
                  >
                    + Add stop
                  </button>
                </div>
                <div className='space-y-2'>
                  {[...stops]
                    .sort((a, b) => a.position - b.position)
                    .map((stop) => (
                      <div
                        key={stop.id}
                        className='flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100'
                      >
                        <input
                          type='color'
                          value={stop.color}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateStop(
                              stop.id,
                              "color",
                              e.target.value.toUpperCase(),
                            )
                          }
                          className='w-10 h-10 rounded-lg border-0 cursor-pointer'
                        />
                        <span className='font-mono text-xs text-gray-500 w-16'>
                          {stop.color}
                        </span>
                        <div className='flex-1'>
                          <input
                            type='range'
                            min='0'
                            max='100'
                            value={stop.position}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              updateStop(
                                stop.id,
                                "position",
                                parseInt(e.target.value),
                              )
                            }
                            className='w-full accent-fuchsia-500'
                          />
                        </div>
                        <span className='text-xs text-gray-500 w-8'>
                          {stop.position}%
                        </span>
                        <button
                          onClick={() => removeStop(stop.id)}
                          disabled={stops.length <= 2}
                          className='text-gray-300 hover:text-red-400 disabled:opacity-30 text-lg leading-none transition-colors'
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Presets */}
              <div>
                <p className='text-sm font-semibold text-gray-700 mb-2'>
                  Quick presets
                </p>
                <div className='grid grid-cols-3 gap-2'>
                  {PRESETS.map((p) => {
                    const sorted = [...p.stops].sort(
                      (a, b) => a.position - b.position,
                    );
                    const css =
                      p.type === "linear"
                        ? `linear-gradient(${p.angle}deg, ${sorted.map((s) => `${s.color} ${s.position}%`).join(", ")})`
                        : p.type === "radial"
                          ? `radial-gradient(circle, ${sorted.map((s) => `${s.color} ${s.position}%`).join(", ")})`
                          : `conic-gradient(from ${p.angle}deg, ${sorted.map((s) => `${s.color} ${s.position}%`).join(", ")})`;
                    return (
                      <button
                        key={p.name}
                        onClick={() => applyPreset(p)}
                        className='rounded-xl overflow-hidden border-2 border-transparent hover:border-fuchsia-300 transition-all hover:shadow-md'
                        style={{ background: css, height: 48 }}
                      >
                        <span className='text-white text-xs font-bold drop-shadow'>
                          {p.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Preview + output */}
            <div className='space-y-4'>
              {/* Large preview */}
              <div
                className='rounded-2xl overflow-hidden shadow-lg border border-gray-100'
                style={{ background: gradientCss, minHeight: 200 }}
              >
                <div className='flex items-end justify-end p-4 h-full min-h-[200px]'>
                  <span className='text-xs text-white/60 bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1 font-mono'>
                    {type}
                  </span>
                </div>
              </div>

              {/* CSS output */}
              <div className='bg-gray-900 rounded-2xl overflow-hidden'>
                <div className='flex items-center justify-between px-4 py-2 bg-gray-800'>
                  <span className='text-xs text-gray-400 font-mono'>CSS</span>
                  <button
                    onClick={copy}
                    className='flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors'
                  >
                    {copied ? (
                      <>
                        <Check className='w-3.5 h-3.5 text-green-400' />
                        <span className='text-green-400'>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className='w-3.5 h-3.5' />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className='px-4 py-4 font-mono text-sm'>
                  <span className='text-blue-400'>background</span>
                  <span className='text-gray-400'>: </span>
                  <span className='text-yellow-300 break-all'>
                    {gradientCss}
                  </span>
                  <span className='text-gray-400'>;</span>
                </div>
              </div>

              {/* Strip preview */}
              <div
                className='rounded-xl overflow-hidden h-8 shadow-sm'
                style={{ background: gradientCss }}
              />

              {/* Stop count info */}
              <div className='grid grid-cols-3 gap-3'>
                {[
                  { label: "Type", value: type },
                  { label: "Stops", value: stops.length },
                  {
                    label: "Angle",
                    value: type === "radial" ? "circle" : `${angle}°`,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className='bg-fuchsia-50 border border-fuchsia-100 rounded-xl p-3 text-center'
                  >
                    <p className='text-lg font-black text-fuchsia-700'>
                      {value}
                    </p>
                    <p className='text-xs text-gray-500 mt-0.5'>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setType("linear");
              setAngle(135);
              setStops([
                { id: 1, color: "#6366F1", position: 0 },
                { id: 2, color: "#EC4899", position: 100 },
              ]);
              nextId = 3;
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-fuchsia-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>

          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Gradient tips:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Use 3+ stops for richer gradients — add a midpoint color to
                control the blend curve
              </li>
              <li>
                Linear at 135° (diagonal) is the most versatile hero background
                direction
              </li>
              <li>
                Radial gradients work great for spotlight effects and button
                hover states
              </li>
              <li>
                Conic gradients can create pie chart effects, color wheels, and
                starburst patterns
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
