"use client";
import React, { useState, useEffect } from "react";
import { DollarSign, Users, Receipt } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TipResults {
  tipAmount: number;
  total: number;
  perPerson: number;
  tipPerPerson: number;
  billPerPerson: number;
}

interface TippingGuide {
  pct: string;
  desc: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TIP_PRESETS = [10, 15, 18, 20, 25] as const;

const TIPPING_GUIDE: TippingGuide[] = [
  { pct: "10%", desc: "Below average service" },
  { pct: "15%", desc: "Average/standard service" },
  { pct: "18%", desc: "Good service" },
  { pct: "20%", desc: "Great service (standard in many cities)" },
  { pct: "25%+", desc: "Exceptional service or special occasions" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

function computeResults(
  billAmount: string,
  tipPercent: number,
  customTip: string,
  numPeople: number,
): TipResults | null {
  const bill = parseFloat(billAmount);
  if (!billAmount || bill <= 0) return null;

  const tip = customTip ? parseFloat(customTip) || 0 : tipPercent;
  const people = numPeople || 1;
  const tipAmount = (bill * tip) / 100;
  const total = bill + tipAmount;

  return {
    tipAmount,
    total,
    perPerson: total / people,
    tipPerPerson: tipAmount / people,
    billPerPerson: bill / people,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TipCalculatorClient() {
  const [billAmount, setBillAmount] = useState<string>("");
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [numPeople, setNumPeople] = useState<number>(1);
  const [customTip, setCustomTip] = useState<string>("");
  const [results, setResults] = useState<TipResults | null>(null);

  useEffect(() => {
    setResults(computeResults(billAmount, tipPercent, customTip, numPeople));
  }, [billAmount, tipPercent, numPeople, customTip]);

  const selectTipPreset = (pct: number): void => {
    setTipPercent(pct);
    setCustomTip("");
  };

  const handleCustomTip = (value: string): void => {
    setCustomTip(value);
    if (value) setTipPercent(parseFloat(value) || 0);
  };

  const reset = (): void => {
    setBillAmount("");
    setTipPercent(15);
    setNumPeople(1);
    setCustomTip("");
    setResults(null);
  };

  const activeTip = customTip || tipPercent;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Tip Calculator
            </h2>
            <p className="text-gray-500">
              Calculate tips and split bills easily
            </p>
          </div>

          <div className="space-y-6">
            {/* Bill amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
                  $
                </span>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBillAmount(e.target.value)
                  }
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-10 pr-4 py-4 text-2xl border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tip selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tip Percentage: {activeTip}%
              </label>
              <div className="grid grid-cols-5 gap-3 mb-3">
                {TIP_PRESETS.map((pct) => (
                  <button
                    key={pct}
                    onClick={() => selectTipPreset(pct)}
                    className={`py-3 rounded-lg font-semibold transition-colors ${
                      tipPercent === pct && !customTip
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={customTip}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCustomTip(e.target.value)
                }
                placeholder="Custom tip %"
                min="0"
                max="100"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Number of people */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of People
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="number"
                  value={numPeople}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNumPeople(parseInt(e.target.value) || 1)
                  }
                  min="1"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={numPeople}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNumPeople(parseInt(e.target.value))
                }
                aria-label="Number of people"
                className="w-full mt-3"
              />
            </div>

            {/* Results */}
            {results && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <Receipt className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-gray-900 text-lg">
                    Bill Summary
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Tip Amount</div>
                    <div className="text-3xl font-bold text-green-600">
                      {fmt(results.tipAmount)}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Total Amount
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {fmt(results.total)}
                    </div>
                  </div>

                  {numPeople > 1 && (
                    <div className="bg-green-600 text-white rounded-lg p-4">
                      <div className="text-sm mb-3 opacity-90">
                        Split between {numPeople} people
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: "Bill", value: results.billPerPerson },
                          { label: "Tip", value: results.tipPerPerson },
                          { label: "Total", value: results.perPerson },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <div className="text-xs opacity-80 mb-1">
                              {label}
                            </div>
                            <div className="font-bold text-lg">
                              {fmt(value)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                      Breakdown
                    </h4>
                    <div className="space-y-2 text-sm">
                      {[
                        {
                          label: "Subtotal",
                          value: parseFloat(billAmount),
                          bold: false,
                          color: "text-gray-900",
                        },
                        {
                          label: `Tip (${activeTip}%)`,
                          value: results.tipAmount,
                          bold: false,
                          color: "text-gray-900",
                        },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-gray-600">{label}</span>
                          <span className={`font-semibold ${color}`}>
                            {fmt(value)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 border-t border-gray-300">
                        <span className="font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="font-bold text-gray-900">
                          {fmt(results.total)}
                        </span>
                      </div>
                      {numPeople > 1 && (
                        <div className="flex justify-between pt-2 border-t border-gray-300">
                          <span className="font-semibold text-gray-900">
                            Per Person
                          </span>
                          <span className="font-bold text-green-600">
                            {fmt(results.perPerson)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
            >
              Reset Calculator
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 Tipping Guide:
            </p>
            <ul className="list-disc list-inside space-y-1">
              {TIPPING_GUIDE.map(({ pct, desc }) => (
                <li key={pct}>
                  <strong>{pct}:</strong> {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
