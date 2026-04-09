"use client";
import React, { useState } from "react";
import { Percent, TrendingUp, TrendingDown, Calculator } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Mode = "basic" | "increase" | "decrease" | "difference" | "of";

interface BasicResult {
  result: number;
  formula: string;
}
interface ChangeResult {
  change: number;
  final: number;
  formula: string;
}
interface DifferenceResult {
  difference: number;
  percent: number;
  isIncrease: boolean;
  formula: string;
}
interface OfResult {
  percent: number;
  formula: string;
}

interface ModeConfig {
  id: Mode;
  name: string;
  icon: React.ElementType;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MODES: ModeConfig[] = [
  { id: "basic", name: "Basic %", icon: Percent },
  { id: "increase", name: "Increase", icon: TrendingUp },
  { id: "decrease", name: "Decrease", icon: TrendingDown },
  { id: "difference", name: "Difference", icon: Calculator },
  { id: "of", name: "What %", icon: Percent },
];

const COMMON_USES: Array<{ label: string; desc: string }> = [
  { label: "Basic", desc: "Calculate discounts, tax, tips, commission" },
  { label: "Increase", desc: "Price increases, salary raises, growth rates" },
  { label: "Decrease", desc: "Discounts, sales, depreciation, losses" },
  { label: "Difference", desc: "Compare values, track changes over time" },
  { label: "What %", desc: "Test scores, completion rates, proportions" },
];

const INPUT_CLASS =
  "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseNum(s: string): number {
  return parseFloat(s);
}

function calcBasic(value: string, percent: string): BasicResult | null {
  if (!value || !percent) return null;
  const result = (parseNum(value) * parseNum(percent)) / 100;
  return { result, formula: `${value} × ${percent}% = ${result.toFixed(2)}` };
}

function calcChange(
  original: string,
  pct: string,
  increase: boolean,
): ChangeResult | null {
  if (!original || !pct) return null;
  const orig = parseNum(original);
  const change = (orig * parseNum(pct)) / 100;
  const final = increase ? orig + change : orig - change;
  const op = increase ? "+" : "-";
  return {
    change,
    final,
    formula: `${original} ${op} (${original} × ${pct}%) = ${final.toFixed(2)}`,
  };
}

function calcDifference(v1: string, v2: string): DifferenceResult | null {
  if (!v1 || !v2) return null;
  const n1 = parseNum(v1);
  const n2 = parseNum(v2);
  const diff = Math.abs(n2 - n1);
  const pct = (diff / n1) * 100;
  return {
    difference: diff,
    percent: pct,
    isIncrease: n2 > n1,
    formula: `((${v2} - ${v1}) / ${v1}) × 100 = ${pct.toFixed(2)}%`,
  };
}

function calcOf(part: string, whole: string): OfResult | null {
  if (!part || !whole) return null;
  const pct = (parseNum(part) / parseNum(whole)) * 100;
  return {
    percent: pct,
    formula: `(${part} / ${whole}) × 100 = ${pct.toFixed(2)}%`,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface NumInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}

function NumInput({ label, value, placeholder, onChange }: NumInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className={INPUT_CLASS}
      />
    </div>
  );
}

interface ResultBoxProps {
  bg: string;
  border: string;
  children: React.ReactNode;
}

function ResultBox({ bg, border, children }: ResultBoxProps) {
  return (
    <div className={`${bg} ${border} border rounded-lg p-4 mt-4`}>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PercentageCalculatorClient() {
  const [mode, setMode] = useState<Mode>("basic");

  // Basic
  const [value, setValue] = useState<string>("");
  const [percent, setPercent] = useState<string>("");

  // Increase / Decrease (shared inputs)
  const [originalValue, setOriginalValue] = useState<string>("");
  const [changePercent, setChangePercent] = useState<string>("");

  // Difference
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");

  // What %
  const [partValue, setPartValue] = useState<string>("");
  const [wholeValue, setWholeValue] = useState<string>("");

  // Derived results (computed once per render, not called multiple times in JSX)
  const basicResult = calcBasic(value, percent);
  const increaseRes = calcChange(originalValue, changePercent, true);
  const decreaseRes = calcChange(originalValue, changePercent, false);
  const diffResult = calcDifference(value1, value2);
  const ofResult = calcOf(partValue, wholeValue);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
              <Percent className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Percentage Calculator
            </h2>
            <p className="text-gray-600">
              Calculate percentages, increases, decreases, and more
            </p>
          </div>

          {/* Mode selector */}
          <div className="mb-6">
            <div className="grid grid-cols-5 gap-2">
              {MODES.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setMode(id)}
                  className={`p-3 rounded-lg font-semibold transition-colors flex flex-col items-center gap-2 ${
                    mode === id
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            {/* ── Basic ── */}
            {mode === "basic" && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 mb-4">
                  What is X% of Y?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <NumInput
                    label="Percentage (%)"
                    value={percent}
                    placeholder="e.g., 25"
                    onChange={setPercent}
                  />
                  <NumInput
                    label="Value"
                    value={value}
                    placeholder="e.g., 200"
                    onChange={setValue}
                  />
                </div>
                {basicResult && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="text-sm text-gray-600 mb-1">Result</div>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {basicResult.result.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      {basicResult.formula}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Increase ── */}
            {mode === "increase" && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 mb-4">Increase by X%</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <NumInput
                    label="Original Value"
                    value={originalValue}
                    placeholder="e.g., 100"
                    onChange={setOriginalValue}
                  />
                  <NumInput
                    label="Increase (%)"
                    value={changePercent}
                    placeholder="e.g., 15"
                    onChange={setChangePercent}
                  />
                </div>
                {increaseRes && (
                  <ResultBox bg="bg-green-50" border="border-green-200">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Increase Amount
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        +{increaseRes.change.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Final Value
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {increaseRes.final.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      {increaseRes.formula}
                    </div>
                  </ResultBox>
                )}
              </div>
            )}

            {/* ── Decrease ── */}
            {mode === "decrease" && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 mb-4">Decrease by X%</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <NumInput
                    label="Original Value"
                    value={originalValue}
                    placeholder="e.g., 100"
                    onChange={setOriginalValue}
                  />
                  <NumInput
                    label="Decrease (%)"
                    value={changePercent}
                    placeholder="e.g., 20"
                    onChange={setChangePercent}
                  />
                </div>
                {decreaseRes && (
                  <ResultBox bg="bg-red-50" border="border-red-200">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Decrease Amount
                      </div>
                      <div className="text-2xl font-bold text-red-600">
                        -{decreaseRes.change.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Final Value
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {decreaseRes.final.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      {decreaseRes.formula}
                    </div>
                  </ResultBox>
                )}
              </div>
            )}

            {/* ── Difference ── */}
            {mode === "difference" && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 mb-4">
                  Percentage Difference
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <NumInput
                    label="Starting Value"
                    value={value1}
                    placeholder="e.g., 50"
                    onChange={setValue1}
                  />
                  <NumInput
                    label="Ending Value"
                    value={value2}
                    placeholder="e.g., 75"
                    onChange={setValue2}
                  />
                </div>
                {diffResult && (
                  <ResultBox
                    bg={diffResult.isIncrease ? "bg-green-50" : "bg-red-50"}
                    border={
                      diffResult.isIncrease
                        ? "border-green-200"
                        : "border-red-200"
                    }
                  >
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        {diffResult.isIncrease ? "Increase" : "Decrease"}
                      </div>
                      <div
                        className={`text-2xl font-bold ${diffResult.isIncrease ? "text-green-600" : "text-red-600"}`}
                      >
                        {diffResult.isIncrease ? "+" : "-"}
                        {diffResult.difference.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Percentage Change
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        {diffResult.percent.toFixed(2)}%
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      {diffResult.formula}
                    </div>
                  </ResultBox>
                )}
              </div>
            )}

            {/* ── What % ── */}
            {mode === "of" && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 mb-4">
                  X is what % of Y?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <NumInput
                    label="Part (X)"
                    value={partValue}
                    placeholder="e.g., 30"
                    onChange={setPartValue}
                  />
                  <NumInput
                    label="Whole (Y)"
                    value={wholeValue}
                    placeholder="e.g., 150"
                    onChange={setWholeValue}
                  />
                </div>
                {ofResult && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                    <div className="text-sm text-gray-600 mb-1">Result</div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {ofResult.percent.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      {ofResult.formula}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">Common Uses:</p>
            <ul className="list-disc list-inside space-y-1">
              {COMMON_USES.map(({ label, desc }) => (
                <li key={label}>
                  <strong>{label}:</strong> {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
