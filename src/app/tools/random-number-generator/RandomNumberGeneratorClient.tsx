"use client";
import React, { useState } from "react";
import { Dices, Copy, RotateCcw, RefreshCw } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateNumbers(
  min: number,
  max: number,
  count: number,
  unique: boolean,
): number[] | null {
  if (isNaN(min) || isNaN(max) || isNaN(count)) return null;
  if (min > max) return null;
  if (count < 1 || count > 1000) return null;
  const range = max - min + 1;
  if (unique && count > range) return null;

  const result: number[] = [];
  const used = new Set<number>();

  while (result.length < count) {
    const n = Math.floor(Math.random() * range) + min;
    if (unique && used.has(n)) continue;
    used.add(n);
    result.push(n);
  }
  return result;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RandomNumberGeneratorClient() {
  const [min, setMin] = useState<string>("1");
  const [max, setMax] = useState<string>("100");
  const [count, setCount] = useState<string>("1");
  const [unique, setUnique] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<number[] | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const generate = (): void => {
    setError("");
    setCopied(false);
    const minN = Number(min);
    const maxN = Number(max);
    const countN = Number(count);
    const range = maxN - minN + 1;

    if (minN > maxN) {
      setError("Min must be less than or equal to Max.");
      return;
    }
    if (countN < 1 || countN > 1000) {
      setError("Count must be between 1 and 1000.");
      return;
    }
    if (unique && countN > range) {
      setError(
        `Can only generate ${range} unique numbers in range ${minN}–${maxN}.`,
      );
      return;
    }

    const result = generateNumbers(minN, maxN, countN, unique);
    if (!result) {
      setError("Could not generate numbers with these settings.");
      return;
    }
    setNumbers(result);
  };

  const reset = (): void => {
    setMin("1");
    setMax("100");
    setCount("1");
    setUnique(false);
    setNumbers(null);
    setError("");
    setCopied(false);
  };

  const copyAll = (): void => {
    if (!numbers) return;
    navigator.clipboard.writeText(numbers.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sorted = numbers ? [...numbers].sort((a, b) => a - b) : null;
  const statsMin = sorted ? sorted[0] : null;
  const statsMax = sorted ? sorted[sorted.length - 1] : null;
  const avg = numbers
    ? Math.round((numbers.reduce((a, b) => a + b, 0) / numbers.length) * 100) /
      100
    : null;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Dices className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Random Number Generator
            </h2>
            <p className='text-gray-600'>
              Generate random numbers within any custom range instantly
            </p>
          </div>

          <div className='space-y-6'>
            {/* Settings */}
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Minimum
                  </label>
                  <input
                    type='number'
                    value={min}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMin(e.target.value)
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Maximum
                  </label>
                  <input
                    type='number'
                    value={max}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMax(e.target.value)
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    How Many Numbers: {count}
                  </label>
                  <input
                    type='range'
                    min={1}
                    max={100}
                    value={count}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCount(e.target.value)
                    }
                    aria-label='Number count'
                    className='w-full'
                  />
                  <div className='flex justify-between text-xs text-gray-400 mt-1'>
                    <span>1</span>
                    <span>100</span>
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      id='unique'
                      checked={unique}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUnique(e.target.checked)
                      }
                      className='w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500'
                    />
                    <label htmlFor='unique' className='text-sm text-gray-700'>
                      No duplicate numbers
                    </label>
                  </div>
                  <button
                    onClick={reset}
                    className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 w-fit'
                  >
                    <RotateCcw className='w-4 h-4' />
                    Reset All
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className='text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3'>
                {error}
              </p>
            )}

            <div className='flex gap-3'>
              <button
                onClick={generate}
                className='flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors'
              >
                Generate Numbers
              </button>
              {numbers && (
                <button
                  onClick={generate}
                  className='px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
                >
                  <RefreshCw className='w-4 h-4' />
                  Regenerate
                </button>
              )}
            </div>

            {/* Results */}
            {numbers && (
              <div className='space-y-4'>
                <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-xl font-bold text-gray-800'>Results</h3>
                    <button
                      onClick={copyAll}
                      className='flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors'
                    >
                      <Copy className='w-4 h-4' />
                      {copied ? "Copied!" : "Copy All"}
                    </button>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                    {[
                      { label: "Count", value: numbers.length },
                      { label: "Smallest", value: statsMin ?? "—" },
                      { label: "Largest", value: statsMax ?? "—" },
                      { label: "Average", value: avg ?? "—" },
                    ].map(({ label, value }) => (
                      <div key={label} className='bg-white rounded-lg p-4'>
                        <div className='text-2xl font-bold text-indigo-600'>
                          {value}
                        </div>
                        <div className='text-sm text-gray-600'>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className='bg-white rounded-lg p-4 border border-gray-200'>
                    <div className='flex flex-wrap gap-2'>
                      {numbers.map((n, i) => (
                        <span
                          key={i}
                          className='px-3 py-1.5 bg-indigo-100 text-indigo-700 font-mono font-semibold rounded-lg text-sm'
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Use &ldquo;No duplicate numbers&rdquo; for lottery-style picks
                or random selections without repeats
              </li>
              <li>
                Set Min and Max to the same value to always get that specific
                number
              </li>
              <li>
                Click Regenerate to get a fresh set with identical settings
              </li>
              <li>
                Copy All gives you a comma-separated list ready to paste
                anywhere
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
