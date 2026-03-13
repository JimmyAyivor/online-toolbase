"use client";
import React, { useState } from "react";
import { Hash, Copy, Check, RotateCcw } from "lucide-react";

// ─── Number-to-words logic ────────────────────────────────────────────────────

const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
const scales = ["", "thousand", "million", "billion", "trillion"];

function chunkToWords(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100)
    return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "");
  return (
    ones[Math.floor(n / 100)] +
    " hundred" +
    (n % 100 ? " " + chunkToWords(n % 100) : "")
  );
}

function numberToWords(num: number): string {
  if (num === 0) return "zero";
  if (!isFinite(num)) return "not a number";

  const negative = num < 0;
  let n = Math.abs(Math.floor(num));
  const decimals = Math.round((Math.abs(num) - n) * 100);

  const parts: string[] = [];
  let scaleIdx = 0;

  while (n > 0) {
    const chunk = n % 1000;
    if (chunk !== 0) {
      const words = chunkToWords(chunk);
      parts.unshift(scales[scaleIdx] ? words + " " + scales[scaleIdx] : words);
    }
    n = Math.floor(n / 1000);
    scaleIdx++;
  }

  let result = (negative ? "negative " : "") + parts.join(", ");
  if (decimals > 0) result += " and " + chunkToWords(decimals) + "/100";
  return result;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function NumberToWordsConverterClient() {
  const [input, setInput] = useState<string>("");
  const [currency, setCurrency] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const numVal = parseFloat(input.replace(/,/g, ""));
  const isValid =
    input.trim() !== "" &&
    !isNaN(numVal) &&
    Math.abs(numVal) <= 999999999999999;

  const result = isValid ? numberToWords(numVal) : "";
  const displayResult = isValid
    ? result.charAt(0).toUpperCase() +
      result.slice(1) +
      (currency ? " dollars" : "")
    : "";

  const formatted = isValid
    ? numVal.toLocaleString("en-US", { maximumFractionDigits: 2 })
    : "";

  const handleCopy = async (): Promise<void> => {
    if (!displayResult) return;
    await navigator.clipboard.writeText(displayResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = (): void => {
    setInput("");
    setCurrency(false);
  };

  const EXAMPLES = ["0", "42", "1000", "1000000", "-99", "3.14"];

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full mb-4 shadow-lg'>
              <Hash className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Number to Words Converter
            </h2>
            <p className='text-gray-500'>
              Convert any number into its English word form
            </p>
          </div>

          <div className='max-w-xl mx-auto'>
            {/* Input */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Enter a number
              </label>
              <input
                type='text'
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInput(e.target.value)
                }
                placeholder='e.g. 1234567'
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              />
            </div>

            {/* Currency toggle + formatted display */}
            <div className='flex items-center gap-3 mb-6'>
              <button
                onClick={() => setCurrency(!currency)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                  currency
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-teal-400"
                }`}
              >
                💵 Currency mode
              </button>
              {formatted && (
                <span className='text-sm text-gray-400'>
                  Formatted:{" "}
                  <span className='text-gray-600 font-medium'>{formatted}</span>
                </span>
              )}
            </div>

            {/* Validation error */}
            {input.trim() && !isValid && (
              <div className='bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm mb-6'>
                Please enter a valid number (up to 999 trillion).
              </div>
            )}

            {/* Result */}
            {displayResult && (
              <div className='bg-teal-50 border-2 border-teal-100 rounded-xl p-6 mb-6'>
                <div className='flex items-start justify-between gap-4'>
                  <p className='text-gray-800 text-lg font-medium leading-relaxed flex-1'>
                    {displayResult}
                  </p>
                  <button
                    onClick={handleCopy}
                    className='flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-800 transition-colors shrink-0'
                  >
                    {copied ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      <Copy className='w-4 h-4' />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            {/* Quick examples */}
            <div className='mb-6'>
              <p className='text-sm text-gray-500 mb-2'>Quick examples:</p>
              <div className='flex flex-wrap gap-2'>
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setInput(ex)}
                    className='px-3 py-1.5 bg-gray-100 hover:bg-teal-100 text-gray-600 hover:text-teal-700 rounded-lg text-sm transition-colors border border-gray-200'
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className='flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors mb-8'
            >
              <RotateCcw className='w-4 h-4' />
              Reset
            </button>

            {/* Tips */}
            <div className='mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
              <p className='font-semibold mb-2 text-gray-800'>
                💡 Understanding number-to-words conversion:
              </p>
              <ul className='list-disc list-inside space-y-1'>
                <li>
                  Supports negative numbers — just type a minus sign before the
                  number
                </li>
                <li>
                  Enable Currency mode to append "dollars" for cheque writing
                </li>
                <li>
                  Decimals work too — useful for amounts like 3.14 (three and
                  14/100)
                </li>
                <li>
                  Works for numbers up to 999 trillion — plenty for most use
                  cases
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
