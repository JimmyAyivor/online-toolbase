"use client";
import React, { useState } from "react";
import { Divide, Copy, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Op = "+" | "-" | "×" | "÷";

interface Fraction {
  num: number;
  den: number;
}

interface FractionResult {
  fraction: Fraction;
  decimal: string;
  steps: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function simplify(num: number, den: number): Fraction {
  if (den === 0) throw new Error("Denominator cannot be zero.");
  const g = gcd(Math.abs(num), Math.abs(den));
  const sign = den < 0 ? -1 : 1;
  return { num: (sign * num) / g, den: (sign * den) / g };
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function calculate(
  n1: number,
  d1: number,
  op: Op,
  n2: number,
  d2: number,
): FractionResult {
  if (d1 === 0 || d2 === 0) throw new Error("Denominator cannot be zero.");

  const steps: string[] = [];
  steps.push(`Input: ${n1}/${d1} ${op} ${n2}/${d2}`);

  let rNum: number, rDen: number;

  if (op === "+") {
    const common = lcm(d1, d2);
    rNum = n1 * (common / d1) + n2 * (common / d2);
    rDen = common;
    steps.push(`Common denominator: ${common}`);
    steps.push(
      `= ${n1 * (common / d1)}/${common} + ${n2 * (common / d2)}/${common}`,
    );
    steps.push(`= ${rNum}/${rDen}`);
  } else if (op === "-") {
    const common = lcm(d1, d2);
    rNum = n1 * (common / d1) - n2 * (common / d2);
    rDen = common;
    steps.push(`Common denominator: ${common}`);
    steps.push(
      `= ${n1 * (common / d1)}/${common} − ${n2 * (common / d2)}/${common}`,
    );
    steps.push(`= ${rNum}/${rDen}`);
  } else if (op === "×") {
    rNum = n1 * n2;
    rDen = d1 * d2;
    steps.push(`Multiply numerators: ${n1} × ${n2} = ${rNum}`);
    steps.push(`Multiply denominators: ${d1} × ${d2} = ${rDen}`);
  } else {
    // divide
    if (n2 === 0) throw new Error("Cannot divide by zero.");
    rNum = n1 * d2;
    rDen = d1 * n2;
    steps.push(`Multiply by reciprocal: ${n1}/${d1} × ${d2}/${n2}`);
    steps.push(`= ${rNum}/${rDen}`);
  }

  const simplified = simplify(rNum, rDen);
  if (simplified.num !== rNum || simplified.den !== rDen) {
    const g = gcd(Math.abs(rNum), Math.abs(rDen));
    steps.push(
      `Simplify by dividing by ${g}: ${simplified.num}/${simplified.den}`,
    );
  }

  return {
    fraction: simplified,
    decimal: (simplified.num / simplified.den)
      .toPrecision(8)
      .replace(/\.?0+$/, ""),
    steps,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FractionCalculatorClient() {
  const [n1, setN1] = useState<string>("");
  const [d1, setD1] = useState<string>("");
  const [op, setOp] = useState<Op>("+");
  const [n2, setN2] = useState<string>("");
  const [d2, setD2] = useState<string>("");
  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const compute = (): void => {
    setError("");
    setResult(null);
    try {
      const r = calculate(Number(n1), Number(d1), op, Number(n2), Number(d2));
      setResult(r);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const reset = (): void => {
    setN1("");
    setD1("");
    setOp("+");
    setN2("");
    setD2("");
    setResult(null);
    setError("");
    setCopied(false);
  };

  const copyResult = (): void => {
    if (!result) return;
    navigator.clipboard.writeText(
      `${result.fraction.num}/${result.fraction.den}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputCls =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center font-mono text-lg";

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Divide className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Fraction Calculator
            </h2>
            <p className='text-gray-600'>
              Add, subtract, multiply, and divide fractions — with step-by-step
              working shown
            </p>
          </div>

          <div className='space-y-6'>
            {/* Input row */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Enter Fractions
              </label>
              <div className='flex flex-col sm:flex-row items-center gap-3'>
                {/* Fraction 1 */}
                <div className='flex flex-col items-center gap-1 w-24'>
                  <input
                    type='number'
                    value={n1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setN1(e.target.value)
                    }
                    placeholder='num'
                    className={inputCls}
                  />
                  <div className='w-full h-0.5 bg-gray-400 rounded' />
                  <input
                    type='number'
                    value={d1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setD1(e.target.value)
                    }
                    placeholder='den'
                    className={inputCls}
                  />
                </div>

                {/* Operator */}
                <div className='flex gap-1'>
                  {(["+", "-", "×", "÷"] as Op[]).map((o) => (
                    <button
                      key={o}
                      onClick={() => setOp(o)}
                      className={`w-10 h-10 rounded-lg font-bold text-lg transition-colors border ${
                        op === o
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>

                {/* Fraction 2 */}
                <div className='flex flex-col items-center gap-1 w-24'>
                  <input
                    type='number'
                    value={n2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setN2(e.target.value)
                    }
                    placeholder='num'
                    className={inputCls}
                  />
                  <div className='w-full h-0.5 bg-gray-400 rounded' />
                  <input
                    type='number'
                    value={d2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setD2(e.target.value)
                    }
                    placeholder='den'
                    className={inputCls}
                  />
                </div>

                <span className='text-2xl font-bold text-gray-400'>=</span>

                {/* Answer placeholder */}
                <div className='flex flex-col items-center gap-1 w-28 min-h-[70px] justify-center'>
                  {result ? (
                    <>
                      <div className='text-xl font-bold text-indigo-600 font-mono'>
                        {result.fraction.num}
                      </div>
                      <div className='w-full h-0.5 bg-indigo-400 rounded' />
                      <div className='text-xl font-bold text-indigo-600 font-mono'>
                        {result.fraction.den}
                      </div>
                    </>
                  ) : (
                    <div className='text-gray-300 text-2xl font-bold'>?</div>
                  )}
                </div>
              </div>
            </div>

            <div className='flex gap-3'>
              <button
                onClick={compute}
                disabled={!n1 || !d1 || !n2 || !d2}
                className='flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors'
              >
                Calculate
              </button>
              <button
                onClick={reset}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
              >
                <RotateCcw className='w-4 h-4' />
                Reset
              </button>
            </div>

            {error && (
              <p className='text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3'>
                {error}
              </p>
            )}

            {/* Results */}
            {result && (
              <div className='space-y-4'>
                <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-xl font-bold text-gray-800'>Result</h3>
                    <button
                      onClick={copyResult}
                      className='flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors'
                    >
                      <Copy className='w-4 h-4' />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div className='bg-white rounded-lg p-4 text-center'>
                      <div className='font-mono font-bold text-indigo-600 text-xl'>
                        {result.fraction.num}
                      </div>
                      <div className='border-t-2 border-indigo-300 my-1' />
                      <div className='font-mono font-bold text-indigo-600 text-xl'>
                        {result.fraction.den}
                      </div>
                      <div className='text-xs text-gray-500 mt-1'>Fraction</div>
                    </div>
                    <div className='bg-white rounded-lg p-4 text-center flex flex-col items-center justify-center'>
                      <div className='text-2xl font-bold text-indigo-600'>
                        {result.decimal}
                      </div>
                      <div className='text-sm text-gray-600'>Decimal</div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className='font-semibold text-gray-700 mb-2 text-sm'>
                      Step-by-Step Working
                    </h4>
                    <div className='bg-white rounded-lg p-4 border border-gray-200'>
                      <ol className='space-y-1'>
                        {result.steps.map((step, i) => (
                          <li
                            key={i}
                            className='text-sm font-mono text-gray-700'
                          >
                            {i + 1}. {step}
                          </li>
                        ))}
                      </ol>
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
                Enter negative numerators to work with negative fractions — e.g.
                −3/4
              </li>
              <li>
                Results are always shown in simplest form — the GCD is divided
                out automatically
              </li>
              <li>
                Division is implemented as multiplication by the reciprocal of
                the second fraction
              </li>
              <li>
                The step-by-step section shows the exact working — useful for
                checking homework
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
