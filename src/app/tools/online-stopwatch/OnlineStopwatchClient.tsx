"use client";
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

function fmt(ms: number) {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  const cent = Math.floor((ms % 1000) / 10);
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(cent).padStart(2, "0")}`;
}

export default function OnlineStopwatchClient() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<
    { n: number; time: number; split: number }[]
  >([]);
  const startRef = useRef<number | null>(null);
  const savedRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const tick = () => {
    if (startRef.current !== null) {
      setElapsed(savedRef.current + (Date.now() - startRef.current));
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const start = () => {
    startRef.current = Date.now();
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  };
  const pause = () => {
    savedRef.current = elapsed;
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRunning(false);
  };
  const reset = () => {
    savedRef.current = 0;
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  };
  const lap = () => {
    const prev = laps[laps.length - 1]?.time ?? 0;
    setLaps((l) => [
      ...l,
      { n: l.length + 1, time: elapsed, split: elapsed - prev },
    ]);
  };

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const fastLap = laps.reduce(
    (best, l) => (l.split < best ? l.split : best),
    Infinity,
  );
  const slowLap = laps.reduce(
    (worst, l) => (l.split > worst ? l.split : worst),
    0,
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mb-4 shadow-lg'>
              <svg
                className='w-8 h-8 text-white'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <circle cx='12' cy='13' r='8' />
                <path d='M12 9v4l2 2M10 2h4M12 2v2' />
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Online Stopwatch
            </h2>
            <p className='text-gray-500'>Precision timing with lap recording</p>
          </div>

          {/* Display */}
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl py-12 px-8 text-center mb-8 shadow-2xl mx-auto max-w-md'>
            <p className='text-6xl font-black text-white tabular-nums tracking-tight font-mono'>
              {fmt(elapsed)}
            </p>
            {laps.length > 0 && (
              <p className='text-cyan-400 text-sm mt-2 tabular-nums'>
                Lap {laps.length + 1}:{" "}
                {fmt(elapsed - (laps[laps.length - 1]?.time ?? 0))}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className='flex justify-center gap-3 mb-8'>
            {!running ? (
              <button
                onClick={start}
                className='flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold shadow-lg hover:-translate-y-0.5 transition-all'
              >
                <Play className='w-5 h-5' />
                {elapsed > 0 ? "Resume" : "Start"}
              </button>
            ) : (
              <button
                onClick={pause}
                className='flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-white rounded-2xl font-bold shadow-lg hover:-translate-y-0.5 transition-all'
              >
                <Pause className='w-5 h-5' />
                Pause
              </button>
            )}
            <button
              onClick={lap}
              disabled={!running}
              className='flex items-center gap-2 px-6 py-3.5 bg-cyan-100 text-cyan-700 rounded-2xl font-bold hover:bg-cyan-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all'
            >
              <Flag className='w-5 h-5' />
              Lap
            </button>
            <button
              onClick={reset}
              disabled={elapsed === 0}
              className='flex items-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 disabled:opacity-40 transition-all'
            >
              <RotateCcw className='w-5 h-5' />
              Reset
            </button>
          </div>

          {/* Lap table */}
          {laps.length > 0 && (
            <div className='max-h-64 overflow-y-auto rounded-2xl border border-gray-100'>
              <table className='w-full text-sm'>
                <thead className='bg-gray-50 sticky top-0'>
                  <tr>
                    <th className='px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase'>
                      Lap
                    </th>
                    <th className='px-4 py-2 text-right text-xs font-bold text-gray-500 uppercase'>
                      Split
                    </th>
                    <th className='px-4 py-2 text-right text-xs font-bold text-gray-500 uppercase'>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...laps].reverse().map((l) => (
                    <tr
                      key={l.n}
                      className='border-t border-gray-50 hover:bg-gray-50'
                    >
                      <td className='px-4 py-2.5 font-bold text-gray-700'>
                        Lap {l.n}
                      </td>
                      <td
                        className={`px-4 py-2.5 font-mono text-right font-bold ${l.split === fastLap && laps.length > 1 ? "text-emerald-600" : l.split === slowLap && laps.length > 1 ? "text-red-500" : "text-gray-800"}`}
                      >
                        {fmt(l.split)}
                      </td>
                      <td className='px-4 py-2.5 font-mono text-right text-gray-500'>
                        {fmt(l.time)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className='mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Stopwatch tips:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Fastest lap shown in green, slowest in red when 2+ laps are
                recorded
              </li>
              <li>The stopwatch keeps running if you switch browser tabs</li>
              <li>
                Use lap recording for interval training, race splits, and task
                time tracking
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
