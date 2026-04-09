"use client";
import React, { useState, useEffect } from "react";
import {
  Tag,
  Percent,
  DollarSign,
  ShoppingBag,
  TrendingDown,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type DiscountMode = "percent" | "amount";

interface Results {
  originalPrice: number;
  discountAmount: number;
  discountPercent: number;
  priceAfterFirstDiscount: number;
  secondDiscountAmount: number;
  finalPrice: number;
  totalDiscount: number;
  totalDiscountPercent: number;
  quantity: number;
  subtotal: number;
  totalSavings: number;
  taxAmount: number;
  grandTotal: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const COMMON_DISCOUNTS: number[] = [10, 15, 20, 25, 30, 40, 50, 75];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount,
  );

// ─── Component ───────────────────────────────────────────────────────────────

export default function DiscountCalculatorClient() {
  const [mode, setMode] = useState<DiscountMode>("percent");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountValue, setDiscountValue] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const [additionalDiscount, setAdditionalDiscount] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("");
  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    calculateDiscount();
  }, [
    originalPrice,
    discountValue,
    mode,
    quantity,
    additionalDiscount,
    taxRate,
  ]);

  const calculateDiscount = (): void => {
    if (!originalPrice || parseFloat(originalPrice) <= 0) {
      setResults(null);
      return;
    }

    const price = parseFloat(originalPrice);
    const qty = parseInt(quantity) || 1;
    const discount = parseFloat(discountValue) || 0;

    // First discount
    const discountAmount =
      mode === "percent" ? (price * discount) / 100 : discount;

    const priceAfterFirstDiscount = price - discountAmount;
    const discountPercent = (discountAmount / price) * 100;

    // Optional stacked discount
    let secondDiscountAmount = 0;
    let finalPrice = priceAfterFirstDiscount;

    const addDiscValue = parseFloat(additionalDiscount);
    if (additionalDiscount && addDiscValue > 0) {
      secondDiscountAmount = (priceAfterFirstDiscount * addDiscValue) / 100;
      finalPrice = priceAfterFirstDiscount - secondDiscountAmount;
    }

    const totalDiscount = discountAmount + secondDiscountAmount;
    const totalDiscountPercent = (totalDiscount / price) * 100;

    // Quantity
    const subtotal = finalPrice * qty;
    const totalSavings = totalDiscount * qty;

    // Tax
    let taxAmount = 0;
    let grandTotal = subtotal;

    const taxValue = parseFloat(taxRate);
    if (taxRate && taxValue > 0) {
      taxAmount = (subtotal * taxValue) / 100;
      grandTotal = subtotal + taxAmount;
    }

    setResults({
      originalPrice: price,
      discountAmount,
      discountPercent,
      priceAfterFirstDiscount,
      secondDiscountAmount,
      finalPrice,
      totalDiscount,
      totalDiscountPercent,
      quantity: qty,
      subtotal,
      totalSavings,
      taxAmount,
      grandTotal,
    });
  };

  const setQuickDiscount = (percent: number): void => {
    setMode("percent");
    setDiscountValue(percent.toString());
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mb-4 shadow-lg">
              <Tag className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Discount Calculator
            </h2>
            <p className="text-gray-600">Calculate sale prices and savings</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* ── Left column ── */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setOriginalPrice(e.target.value)
                    }
                    placeholder="0.00"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Discount Type
                </label>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setMode("percent")}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                      mode === "percent"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Percent className="w-4 h-4" />
                    Percentage
                  </button>
                  <button
                    onClick={() => setMode("amount")}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                      mode === "amount"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    Amount
                  </button>
                </div>

                <div className="relative">
                  {mode === "percent" ? (
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  ) : (
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  )}
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDiscountValue(e.target.value)
                    }
                    placeholder={
                      mode === "percent" ? "e.g., 20" : "e.g., 10.00"
                    }
                    step={mode === "percent" ? "1" : "0.01"}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Discounts
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {COMMON_DISCOUNTS.map((percent) => (
                    <button
                      key={percent}
                      onClick={() => setQuickDiscount(percent)}
                      className={`py-2 rounded-lg font-semibold transition-colors ${
                        mode === "percent" &&
                        discountValue === percent.toString()
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right column ── */}
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Additional Options
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuantity(e.target.value)
                      }
                      min="1"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Discount (%)
                    </label>
                    <input
                      type="number"
                      value={additionalDiscount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAdditionalDiscount(e.target.value)
                      }
                      placeholder="Extra discount percentage"
                      step="1"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Applied after the first discount (stacking)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sales Tax (%)
                    </label>
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTaxRate(e.target.value)
                      }
                      placeholder="e.g., 8.5"
                      step="0.1"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          {results && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-gray-900 text-lg">
                  Price Breakdown
                </h3>
              </div>

              <div className="space-y-3">
                {/* Original price */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Original Price</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(results.originalPrice)}
                    </span>
                  </div>
                  {results.quantity > 1 && (
                    <div className="text-xs text-gray-500">
                      {formatCurrency(results.originalPrice)} ×{" "}
                      {results.quantity} ={" "}
                      {formatCurrency(results.originalPrice * results.quantity)}
                    </div>
                  )}
                </div>

                {/* First discount */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600">
                      First Discount ({results.discountPercent.toFixed(1)}%)
                    </span>
                    <span className="text-lg font-bold text-red-600">
                      -{formatCurrency(results.discountAmount)}
                    </span>
                  </div>
                  {results.quantity > 1 && (
                    <div className="text-xs text-gray-500">
                      {formatCurrency(results.discountAmount)} ×{" "}
                      {results.quantity} ={" "}
                      {formatCurrency(
                        results.discountAmount * results.quantity,
                      )}
                    </div>
                  )}
                </div>

                {/* Additional discount */}
                {results.secondDiscountAmount > 0 && (
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600">
                        Additional Discount ({additionalDiscount}%)
                      </span>
                      <span className="text-lg font-bold text-red-600">
                        -{formatCurrency(results.secondDiscountAmount)}
                      </span>
                    </div>
                    {results.quantity > 1 && (
                      <div className="text-xs text-gray-500">
                        {formatCurrency(results.secondDiscountAmount)} ×{" "}
                        {results.quantity} ={" "}
                        {formatCurrency(
                          results.secondDiscountAmount * results.quantity,
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Total savings */}
                <div className="bg-green-100 border border-green-300 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600">Total Savings</div>
                      <div className="text-xs text-gray-500">
                        {results.totalDiscountPercent.toFixed(1)}% off
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
                      <TrendingDown className="w-5 h-5" />
                      {formatCurrency(results.totalSavings)}
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Subtotal After Discount
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(results.subtotal)}
                    </span>
                  </div>
                </div>

                {/* Tax */}
                {results.taxAmount > 0 && (
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Sales Tax ({taxRate}%)
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        +{formatCurrency(results.taxAmount)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Final total */}
                <div className="bg-red-600 text-white rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm opacity-90">Final Price</div>
                      {results.quantity > 1 && (
                        <div className="text-xs opacity-75">
                          {formatCurrency(
                            results.grandTotal / results.quantity,
                          )}{" "}
                          per item
                        </div>
                      )}
                    </div>
                    <span className="text-3xl font-bold">
                      {formatCurrency(results.grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    Summary
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">You Pay</span>
                      <span className="font-semibold text-gray-900">
                        {(
                          (results.grandTotal /
                            (results.originalPrice * results.quantity)) *
                          100
                        ).toFixed(1)}
                        % of original
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">You Save</span>
                      <span className="font-semibold text-green-600">
                        {results.totalDiscountPercent.toFixed(1)}% total
                        discount
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 Discount Tips:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Stacking discounts are calculated sequentially, not added
                together
              </li>
              <li>
                A 20% discount followed by 10% off is not 30% total — it&apos;s
                28% off
              </li>
              <li>Sales tax is applied after all discounts</li>
              <li>Use quantity to calculate bulk purchase savings</li>
              <li>Common discount percentages: 10%, 20%, 25%, 30%, 50%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
