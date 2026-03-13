"use client";
import React, { useState } from "react";
import { Copy, Check, RotateCcw, ArrowLeftRight } from "lucide-react";

const VALS: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function toRoman(n: number): string {
  if (n < 1 || n > 3999) return "Out of range (1–3,999)";
  let result = "";
  for (const [val, sym] of VALS) {
    while (n >= val) {
      result += sym;
      n -= val;
    }
  }
  return result;
}

function fromRoman(s: string): number | null {
  const str = s.trim().toUpperCase();
  if (!/^[MDCLXVI]+$/.test(str)) return null;
  const map: Record<string, number> = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  };
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const curr = map[str[i]],
      next = map[str[i + 1]];
    if (next && curr < next) result -= curr;
    else result += curr;
  }
  return result;
}

const EXAMPLES = [
  [1, "I"],
  [4, "IV"],
  [9, "IX"],
  [14, "XIV"],
  [40, "XL"],
  [90, "XC"],
  [399, "CCCXCIX"],
  [1000, "M"],
  [1999, "MCMXCIX"],
  [2024, "MMXXIV"],
  [3999, "MMMCMXCIX"],
];

export default function RomanNumeralConverterClient() {
  const [mode, setMode] = useState<"toRoman" | "fromRoman">("toRoman");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<"result" | null>(null);

  const result = (() => {
    if (!input.trim()) return "";
    if (mode === "toRoman") {
      const n = parseInt(input);
      if (isNaN(n)) return "Please enter a valid number";
      return toRoman(n);
    } else {
      const n = fromRoman(input);
      return n === null ? "Invalid Roman numeral" : String(n);
    }
  })();

  const isError =
    result.startsWith("Out of range") ||
    result.startsWith("Invalid") ||
    result.startsWith("Please");
  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied("result");
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full mb-4 shadow-lg'>
              <span className='text-white font-black text-xl'>XIV</span>
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Roman Numeral Converter
            </h2>
            <p className='text-gray-500'>
              Convert between numbers (1–3,999) and Roman numerals
            </p>
          </div>

          {/* Mode toggle */}
          <div className='flex gap-2 mb-8 bg-gray-100 rounded-2xl p-1.5 max-w-xs mx-auto'>
            <button
              onClick={() => {
                setMode("toRoman");
                setInput("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "toRoman" ? "bg-orange-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              123 → XIV
            </button>
            <button
              onClick={() => {
                setMode("fromRoman");
                setInput("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "fromRoman" ? "bg-orange-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              XIV → 123
            </button>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  {mode === "toRoman"
                    ? "Enter a number (1–3,999)"
                    : "Enter Roman numerals"}
                </label>
                <input
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInput(e.target.value)
                  }
                  placeholder={mode === "toRoman" ? "e.g. 2024" : "e.g. MMXXIV"}
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-2xl font-bold text-center focus:ring-2 focus:ring-orange-400 focus:border-transparent uppercase'
                />
              </div>

              {result && (
                <div
                  className={`rounded-2xl p-6 text-center border-2 ${isError ? "bg-red-50 border-red-200" : "bg-orange-50 border-orange-200"}`}
                >
                  <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>
                    Result
                  </p>
                  <p
                    className={`text-5xl font-black ${isError ? "text-red-600" : "text-orange-700"} mb-3`}
                  >
                    {result}
                  </p>
                  {!isError && (
                    <button
                      onClick={copy}
                      className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-100 text-orange-700 text-sm font-semibold hover:bg-orange-200 transition-colors'
                    >
                      {copied === "result" ? (
                        <>
                          <Check className='w-4 h-4 text-green-500' />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className='w-4 h-4' />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Symbol table */}
              <div className='bg-gray-50 rounded-xl p-4'>
                <p className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-3'>
                  Roman numeral symbols
                </p>
                <div className='grid grid-cols-4 gap-2'>
                  {VALS.map(([val, sym]) => (
                    <div
                      key={sym}
                      className='bg-white border border-gray-200 rounded-lg p-2 text-center'
                    >
                      <p className='font-black text-orange-700 text-base'>
                        {sym}
                      </p>
                      <p className='text-xs text-gray-500'>
                        {val.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className='text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3'>
                Reference examples
              </p>
              <div className='space-y-1.5 max-h-[480px] overflow-y-auto pr-1'>
                {EXAMPLES.map(([n, roman]) => (
                  <div
                    key={n}
                    onClick={() => {
                      setInput(String(mode === "toRoman" ? n : roman));
                    }}
                    className='flex items-center justify-between px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl hover:bg-orange-50 hover:border-orange-200 cursor-pointer transition-all'
                  >
                    <span className='font-bold text-gray-800'>
                      {n.toLocaleString()}
                    </span>
                    <ArrowLeftRight className='w-4 h-4 text-gray-300' />
                    <span className='font-mono font-bold text-orange-700'>
                      {roman}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setInput("")}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Clear
          </button>
          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Roman numeral rules:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Symbols are added left to right: VIII = 8 (5+1+1+1)</li>
              <li>
                A smaller symbol before a larger one is subtracted: IV = 4 (5−1)
              </li>
              <li>
                Standard Roman numerals cover 1–3,999; 0 and negatives are not
                representable
              </li>
              <li>
                Common uses: clocks, centuries (XXI Century), movie sequels,
                copyright years
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
