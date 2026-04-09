"use client";
import React, { useState } from "react";
import { Bitcoin, RotateCcw } from "lucide-react";

function fmt(n: number, dp = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}

export default function CryptoProfitCalculatorClient() {
  const [invested, setInvested] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [fee, setFee] = useState("0.1");
  const [currency, setCurrency] = useState("USD");

  const inv = parseFloat(invested);
  const bp = parseFloat(buyPrice);
  const sp = parseFloat(sellPrice);
  const feeRate = parseFloat(fee) / 100;

  const result = (() => {
    if (!inv || !bp || !sp || bp <= 0) return null;
    const coins = inv / bp;
    const entryFee = inv * feeRate;
    const grossSale = coins * sp;
    const exitFee = grossSale * feeRate;
    const netProfit = grossSale - inv - entryFee - exitFee;
    const roi = (netProfit / (inv + entryFee)) * 100;
    const priceChange = ((sp - bp) / bp) * 100;
    return {
      coins,
      grossSale,
      netProfit,
      roi,
      priceChange,
      entryFee,
      exitFee,
      totalFees: entryFee + exitFee,
    };
  })();

  const isProfit = result ? result.netProfit >= 0 : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Bitcoin className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Crypto Profit Calculator
            </h2>
            <p className="text-gray-600">
              Calculate profit, loss, and ROI from any cryptocurrency trade
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investment amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={invested}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInvested(e.target.value)
                    }
                    placeholder="e.g. 1000"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCurrency(e.target.value)
                    }
                    className="border-2 border-gray-300 rounded-lg px-3 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    {["USD", "EUR", "GBP", "JPY", "AUD"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              {[
                {
                  label: "Buy price per coin",
                  val: buyPrice,
                  set: setBuyPrice,
                  placeholder: "e.g. 30000",
                },
                {
                  label: "Sell price per coin",
                  val: sellPrice,
                  set: setSellPrice,
                  placeholder: "e.g. 45000",
                },
              ].map(({ label, val, set, placeholder }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={val}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      set(e.target.value)
                    }
                    placeholder={placeholder}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trading fee (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  value={fee}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFee(e.target.value)
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Typical exchange fees: Binance 0.1%, Coinbase 0.6%, Kraken
                  0.26%
                </p>
              </div>
            </div>

            {result && (
              <div className="space-y-3">
                <div
                  className={`border-2 rounded-xl p-5 text-center ${isProfit ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                >
                  <p className="text-xs text-gray-500 mb-1">
                    Net {isProfit ? "Profit" : "Loss"}
                  </p>
                  <p
                    className={`text-4xl font-black ${isProfit ? "text-green-700" : "text-red-600"}`}
                  >
                    {isProfit ? "+" : ""}
                    {currency} {fmt(result.netProfit)}
                  </p>
                  <p
                    className={`text-sm mt-1 ${isProfit ? "text-green-600" : "text-red-500"}`}
                  >
                    ROI: {result.roi.toFixed(2)}%
                  </p>
                </div>
                {[
                  { label: "Coins purchased", value: fmt(result.coins, 6) },
                  {
                    label: "Price change",
                    value: `${result.priceChange >= 0 ? "+" : ""}${result.priceChange.toFixed(2)}%`,
                  },
                  {
                    label: "Gross sale value",
                    value: `${currency} ${fmt(result.grossSale)}`,
                  },
                  {
                    label: "Total fees paid",
                    value: `${currency} ${fmt(result.totalFees)}`,
                  },
                  {
                    label: "Investment amount",
                    value: `${currency} ${fmt(inv)}`,
                  },
                  {
                    label: "Net profit / loss",
                    value: `${isProfit ? "+" : ""}${currency} ${fmt(result.netProfit)}`,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm text-gray-600">{label}</span>
                    <span className="font-bold text-gray-900 text-sm">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setInvested("");
              setBuyPrice("");
              setSellPrice("");
              setFee("0.1");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">
              For informational purposes only:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Crypto gains may be subject to capital gains tax in your
                jurisdiction
              </li>
              <li>
                This calculator does not account for taxes — consult a tax
                professional
              </li>
              <li>
                ROI is calculated on the total invested amount including entry
                fees
              </li>
              <li>
                Fees are applied to both the buy and sell sides of the trade
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
