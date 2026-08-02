"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Calculator, Plus, Trash2, Receipt } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Mode = "add" | "remove";

interface Item {
  id: number;
  name: string;
  price: number;
}

interface TaxResults {
  subtotal: number;
  taxAmount: number;
  total: number;
  effectiveRate: string;
}

interface TaxRate {
  state: string;
  rate: number;
}

type Props = {
  defaultRate?: number;
};
// ─── Constants ───────────────────────────────────────────────────────────────

const COMMON_TAX_RATES: TaxRate[] = [
  { state: "California", rate: 7.25 },
  { state: "Texas", rate: 6.25 },
  { state: "New York", rate: 4.0 },
  { state: "Florida", rate: 6.0 },
  { state: "Illinois", rate: 6.25 },
  { state: "Washington", rate: 6.5 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

function computeTax(
  amount: string,
  taxRate: string,
  mode: Mode,
  items: Item[],
): TaxResults | null {
  const itemsTotal = items.reduce((s, i) => s + i.price, 0);
  const baseAmount = (amount ? parseFloat(amount) : 0) + itemsTotal;
  if (!baseAmount || baseAmount <= 0) return null;

  const rate = parseFloat(taxRate) / 100;

  if (mode === "add") {
    const tax = baseAmount * rate;
    const total = baseAmount + tax;
    return {
      subtotal: baseAmount,
      taxAmount: tax,
      total,
      effectiveRate: taxRate,
    };
  } else {
    const subtotal = baseAmount / (1 + rate);
    const tax = baseAmount - subtotal;
    return {
      subtotal,
      taxAmount: tax,
      total: baseAmount,
      effectiveRate: taxRate,
    };
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SalesTaxCalculatorClient({ defaultRate }: Props) {
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>(
    defaultRate !== undefined ? defaultRate.toString() : "0",
  );
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<string>("");
  const [results, setResults] = useState<TaxResults | null>(null);

  useEffect(() => {
    setResults(computeTax(amount, taxRate, mode, items));
  }, [amount, taxRate, mode, items]);

  const addItem = (): void => {
    const price = parseFloat(itemPrice);
    if (!itemName || !itemPrice || price <= 0) return;
    setItems((prev) => [...prev, { id: Date.now(), name: itemName, price }]);
    setItemName("");
    setItemPrice("");
  };

  const removeItem = (id: number): void =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const clearAll = (): void => {
    setAmount("");
    setItems([]);
    setItemName("");
    setItemPrice("");
  };

  const itemsSubtotal = items.reduce((s, i) => s + i.price, 0);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Sales Tax Calculator
            </h2>
            <p className="text-gray-600">
              Calculate prices with tax included or excluded
            </p>
          </div>

          {/* Mode selector */}
          <div className="mb-6">
            <div className="flex gap-3">
              {(["add", "remove"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    mode === m
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {m === "add" ? "Add Tax" : "Remove Tax"}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {mode === "add"
                ? "Calculate total price including sales tax"
                : "Calculate original price from tax-inclusive price"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {mode === "add" ? "Price Before Tax" : "Price With Tax"}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAmount(e.target.value)
                    }
                    placeholder="0.00"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTaxRate(e.target.value)
                  }
                  step="0.1"
                  aria-label="Tax rate percentage"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Common Tax Rates
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COMMON_TAX_RATES.map(({ state, rate }) => (
                    <button
                      key={state}
                      onClick={() => setTaxRate(rate.toString())}
                      className="px-3 py-2 bg-gray-100 hover:bg-purple-100 border border-gray-200 hover:border-purple-300 rounded-lg text-sm transition-colors text-left"
                    >
                      <div className="font-semibold text-gray-900">{state}</div>
                      <div className="text-xs text-gray-600">{rate}%</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — item cart */}
            <div>
              <div className="bg-pink-50 rounded-xl border border-pink-200 p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Add Multiple Items
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setItemName(e.target.value)
                    }
                    placeholder="Item name"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={itemPrice}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setItemPrice(e.target.value)
                        }
                        placeholder="Price"
                        step="0.01"
                        className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={addItem}
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {items.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 max-h-64 overflow-y-auto">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    Items
                  </h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {fmt(item.price)}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">
                      Items Subtotal:
                    </span>
                    <span className="font-bold text-gray-900">
                      {fmt(itemsSubtotal)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-900 text-lg">
                  Calculation Results
                </h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal (Before Tax)</span>
                    <span className="text-xl font-bold text-gray-900">
                      {fmt(results.subtotal)}
                    </span>
                  </div>
                  {items.length > 0 && (
                    <div className="text-xs text-gray-500">
                      Includes {items.length} item
                      {items.length !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Sales Tax ({results.effectiveRate}%)
                    </span>
                    <span className="text-xl font-bold text-purple-600">
                      {fmt(results.taxAmount)}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-600 text-white rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">Total (With Tax)</span>
                    <span className="text-3xl font-bold">
                      {fmt(results.total)}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    Breakdown
                  </h4>
                  <div className="space-y-1 text-sm">
                    {[
                      {
                        label: "Price Portion",
                        value: (results.subtotal / results.total) * 100,
                      },
                      {
                        label: "Tax Portion",
                        value: (results.taxAmount / results.total) * 100,
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-semibold text-gray-900">
                          {value.toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={clearAll}
                className="w-full mt-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Clear All
              </button>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 Sales Tax Information:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Add Tax:</strong> Use when you know the price before tax
                and need to calculate the total
              </li>
              <li>
                <strong>Remove Tax:</strong> Use when you have a total price and
                need to find the pre-tax amount
              </li>
              <li>
                Sales tax rates vary by state, county, and city — always check
                your local rate
              </li>
              <li>
                Some items may be exempt from sales tax (groceries, medicine,
                etc.)
              </li>
              <li>
                Add multiple items to calculate tax on a shopping cart total
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
