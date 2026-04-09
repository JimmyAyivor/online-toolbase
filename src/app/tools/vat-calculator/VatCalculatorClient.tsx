"use client";
import React, { useState, useMemo } from "react";
import { Receipt, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Mode = "add" | "remove";

// ─── Constants ───────────────────────────────────────────────────────────────

const PRESET_RATES = [5, 10, 15, 20, 21, 23, 25];

// ─── Helpers ─────────────────────────────────────────────────────────────────

interface VatResult {
  net: number;
  vatAmount: number;
  gross: number;
}

function calculate(amount: number, rate: number, mode: Mode): VatResult | null {
  if (isNaN(amount) || amount <= 0 || isNaN(rate) || rate < 0) return null;
  const r = rate / 100;
  if (mode === "add") {
    return { net: amount, vatAmount: amount * r, gross: amount * (1 + r) };
  }
  const net = amount / (1 + r);
  return { net, vatAmount: amount - net, gross: amount };
}

function fmt(n: number): string {
  return n.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function VatCalculatorClient() {
  const [amount, setAmount] = useState<string>("");
  const [rate, setRate] = useState<string>("20");
  const [customRate, setCustomRate] = useState<string>("");
  const [mode, setMode] = useState<Mode>("add");

  const effectiveRate = customRate !== "" ? Number(customRate) : Number(rate);

  const result = useMemo(
    () => calculate(Number(amount), effectiveRate, mode),
    [amount, effectiveRate, mode],
  );

  const reset = (): void => {
    setAmount("");
    setRate("20");
    setCustomRate("");
    setMode("add");
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              VAT Calculator
            </h2>
            <p className="text-gray-500">
              Add or remove VAT from any price — supports custom rates
            </p>
          </div>

          <div className="space-y-6">
            {/* Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to do?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { key: "add", label: "Add VAT (net → gross)" },
                    { key: "remove", label: "Remove VAT (gross → net)" },
                  ] as { key: Mode; label: string }[]
                ).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setMode(key)}
                    className={`py-2 rounded-lg font-semibold text-sm transition-colors border ${
                      mode === key
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {mode === "add"
                      ? "Net Amount (excl. VAT)"
                      : "Gross Amount (incl. VAT)"}
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAmount(e.target.value)
                    }
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VAT Rate (%)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {PRESET_RATES.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setRate(String(r));
                          setCustomRate("");
                        }}
                        className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors border ${
                          rate === String(r) && customRate === ""
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {r}%
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={customRate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCustomRate(e.target.value)
                    }
                    placeholder="Custom rate..."
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={reset}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset All
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Net Amount",
                      value: fmt(result.net),
                      highlight: mode === "add",
                    },
                    {
                      label: `VAT (${effectiveRate}%)`,
                      value: fmt(result.vatAmount),
                      highlight: false,
                    },
                    {
                      label: "Gross Amount",
                      value: fmt(result.gross),
                      highlight: mode === "remove",
                    },
                  ].map(({ label, value, highlight }) => (
                    <div
                      key={label}
                      className={`rounded-lg p-4 ${highlight ? "bg-indigo-600 text-white" : "bg-white"}`}
                    >
                      <div
                        className={`text-sm mb-1 ${highlight ? "text-indigo-200" : "text-gray-600"}`}
                      >
                        {label}
                      </div>
                      <div
                        className={`text-2xl font-bold ${highlight ? "text-white" : "text-indigo-600"}`}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Use &ldquo;Add VAT&rdquo; when you have an ex-VAT price and need
                the customer-facing total
              </li>
              <li>
                Use &ldquo;Remove VAT&rdquo; to extract the net amount from a
                VAT-inclusive price
              </li>
              <li>
                UK standard VAT rate is 20%; reduced rate is 5% for items like
                home energy and children&apos;s car seats
              </li>
              <li>
                Type any custom rate into the custom rate field — it overrides
                the preset buttons
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
