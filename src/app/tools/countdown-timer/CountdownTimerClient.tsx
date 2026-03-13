"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Bell } from "lucide-react";

const PRESETS = [
  { label: "5 min", s: 300 },
  { label: "10 min", s: 600 },
  { label: "15 min", s: 900 },
  { label: "25 min", s: 1500 },
  { label: "30 min", s: 1800 },
  { label: "1 hour", s: 3600 },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function fmt(sec: number) {
  const h = Math.floor(sec / 3600),
    m = Math.floor((sec % 3600) / 60),
    s = sec % 60;
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function CountdownTimerClient() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [label, setLabel] = useState("");

  const total = hours * 3600 + minutes * 60 + seconds;
  const display = remaining !== null ? remaining : total;
  const progress =
    remaining !== null && total > 0 ? ((total - remaining) / total) * 100 : 0;

  const start = useCallback(() => {
    if (remaining === null) setRemaining(total);
    setRunning(true);
    setFinished(false);
  }, [remaining, total]);

  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRemaining(null);
    setFinished(false);
  };

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(id);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const accent = finished
    ? "from-red-500 to-orange-500"
    : running
      ? "from-indigo-500 to-purple-600"
      : "from-indigo-400 to-purple-500";

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div
              className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${accent} rounded-full mb-4 shadow-lg transition-all`}
            >
              <Bell className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Countdown Timer
            </h2>
            <p className='text-gray-500'>
              Set a timer, focus on your task, get alerted when time is up
            </p>
          </div>

          {/* Big display */}
          <div
            className={`relative rounded-3xl p-1 mb-8 bg-gradient-to-br ${accent} shadow-xl mx-auto max-w-md`}
          >
            <div className='bg-white rounded-[20px] py-10 text-center'>
              {finished ? (
                <div className='animate-bounce'>
                  <p className='text-6xl font-black text-red-500'>⏰</p>
                  <p className='text-2xl font-bold text-red-600 mt-2'>
                    Time's up!
                  </p>
                </div>
              ) : (
                <>
                  <p className='text-7xl font-black text-gray-900 tabular-nums tracking-tight'>
                    {fmt(display)}
                  </p>
                  {label && (
                    <p className='text-sm text-gray-400 mt-2'>{label}</p>
                  )}
                  {running && remaining !== null && total > 0 && (
                    <div className='mx-6 mt-4 bg-gray-100 rounded-full h-2'>
                      <div
                        className={`bg-gradient-to-r ${accent} h-2 rounded-full transition-all`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Set time */}
          {remaining === null && (
            <div className='mb-6 max-w-md mx-auto'>
              <p className='text-sm font-semibold text-gray-700 mb-3 text-center'>
                Set duration
              </p>
              <div className='flex gap-3 justify-center'>
                {[
                  { label: "Hours", val: hours, set: setHours, max: 23 },
                  { label: "Minutes", val: minutes, set: setMinutes, max: 59 },
                  { label: "Seconds", val: seconds, set: setSeconds, max: 59 },
                ].map(({ label: lbl, val, set, max }) => (
                  <div key={lbl} className='flex flex-col items-center gap-1'>
                    <button
                      onClick={() => set((v) => Math.min(max, v + 1))}
                      className='w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-black hover:bg-indigo-200 transition-colors'
                    >
                      +
                    </button>
                    <div className='w-16 text-center'>
                      <p className='text-3xl font-black text-gray-800 tabular-nums'>
                        {pad(val)}
                      </p>
                      <p className='text-xs text-gray-400'>{lbl}</p>
                    </div>
                    <button
                      onClick={() => set((v) => Math.max(0, v - 1))}
                      className='w-9 h-9 rounded-full bg-gray-100 text-gray-600 font-black hover:bg-gray-200 transition-colors'
                    >
                      −
                    </button>
                  </div>
                ))}
              </div>
              <div className='mt-4'>
                <input
                  value={label}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLabel(e.target.value)
                  }
                  placeholder='Timer label (optional)'
                  className='w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent'
                />
              </div>
            </div>
          )}

          {/* Presets */}
          {remaining === null && (
            <div className='flex flex-wrap justify-center gap-2 mb-6'>
              {PRESETS.map(({ label: pl, s }) => (
                <button
                  key={pl}
                  onClick={() => {
                    setHours(Math.floor(s / 3600));
                    setMinutes(Math.floor((s % 3600) / 60));
                    setSeconds(s % 60);
                  }}
                  className='px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold hover:bg-indigo-100 transition-colors'
                >
                  {pl}
                </button>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className='flex justify-center gap-3'>
            {!running && !finished && (
              <button
                onClick={start}
                disabled={total === 0 && remaining === null}
                className='flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Play className='w-5 h-5' />
                Start
              </button>
            )}
            {running && (
              <button
                onClick={pause}
                className='flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all'
              >
                <Pause className='w-5 h-5' />
                Pause
              </button>
            )}
            {(running || remaining !== null || finished) && (
              <button
                onClick={reset}
                className='flex items-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold text-base hover:bg-gray-200 transition-all'
              >
                <RotateCcw className='w-5 h-5' />
                Reset
              </button>
            )}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>💡 Timer tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Use the 25-minute Pomodoro preset for focused work sessions
              </li>
              <li>
                Add a label to track what you're timing — helpful for
                time-blocking
              </li>
              <li>
                Keep this tab active for the alarm to work reliably in most
                browsers
              </li>
              <li>
                For hands-free use, allow browser notification permissions for
                audio alerts
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
