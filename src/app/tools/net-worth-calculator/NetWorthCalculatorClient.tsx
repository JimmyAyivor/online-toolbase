"use client";
import React, { useState } from "react";
import { DollarSign, Plus, Trash2, RotateCcw } from "lucide-react";

interface Item {
  id: number;
  label: string;
  value: string;
}
let nextId = 10;

const fmt = (n: number) => {
  const abs = Math.abs(n);
  const s =
    abs >= 1000000
      ? `$${(abs / 1000000).toFixed(2)}M`
      : abs >= 1000
        ? `$${(abs / 1000).toFixed(1)}k`
        : `$${Math.round(abs).toLocaleString()}`;
  return n < 0 ? `-${s}` : s;
};

const DEFAULT_ASSETS: Item[] = [
  { id: 1, label: "Checking & savings", value: "5000" },
  { id: 2, label: "Retirement accounts (401k/IRA)", value: "25000" },
  { id: 3, label: "Investment accounts", value: "10000" },
  { id: 4, label: "Home value", value: "0" },
  { id: 5, label: "Vehicle(s)", value: "8000" },
];
const DEFAULT_LIABILITIES: Item[] = [
  { id: 6, label: "Credit card debt", value: "3000" },
  { id: 7, label: "Student loans", value: "20000" },
  { id: 8, label: "Car loan", value: "5000" },
  { id: 9, label: "Mortgage balance", value: "0" },
];

export default function NetWorthCalculatorClient() {
  const [assets, setAssets] = useState<Item[]>(DEFAULT_ASSETS);
  const [liabilities, setLiabilities] = useState<Item[]>(DEFAULT_LIABILITIES);

  const totalAssets = assets.reduce(
    (s, i) => s + (parseFloat(i.value) || 0),
    0,
  );
  const totalLiabilities = liabilities.reduce(
    (s, i) => s + (parseFloat(i.value) || 0),
    0,
  );
  const netWorth = totalAssets - totalLiabilities;
  const ratio =
    totalAssets > 0 ? ((netWorth / totalAssets) * 100).toFixed(0) : "0";

  const updateItem = (
    list: Item[],
    setList: (v: Item[]) => void,
    id: number,
    field: "label" | "value",
    val: string,
  ) => setList(list.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  const removeItem = (list: Item[], setList: (v: Item[]) => void, id: number) =>
    setList(list.filter((i) => i.id !== id));
  const addItem = (list: Item[], setList: (v: Item[]) => void) =>
    setList([...list, { id: nextId++, label: "", value: "0" }]);

  const renderList = (
    list: Item[],
    setList: (v: Item[]) => void,
    color: string,
  ) => (
    <div className='space-y-2'>
      {list.map((item) => (
        <div key={item.id} className='flex gap-2 items-center'>
          <input
            value={item.label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateItem(list, setList, item.id, "label", e.target.value)
            }
            placeholder='Description'
            className='flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gray-300 focus:border-transparent'
          />
          <input
            value={item.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateItem(list, setList, item.id, "value", e.target.value)
            }
            placeholder='0'
            className={`w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm text-right focus:ring-1 focus:ring-${color}-400 focus:border-transparent`}
          />
          <button
            onClick={() => removeItem(list, setList, item.id)}
            className='text-gray-300 hover:text-red-400 transition-colors'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      ))}
      <button
        onClick={() => addItem(list, setList)}
        className={`flex items-center gap-1.5 text-xs font-semibold text-${color}-600 hover:text-${color}-700 mt-1`}
      >
        <Plus className='w-3.5 h-3.5' />
        Add item
      </button>
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mb-4 shadow-lg'>
              <DollarSign className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Net Worth Calculator
            </h2>
            <p className='text-gray-500'>
              Calculate what you own minus what you owe — your financial
              snapshot
            </p>
          </div>

          {/* Summary bar */}
          <div
            className={`rounded-2xl p-6 border-2 mb-8 text-center ${netWorth >= 0 ? "bg-indigo-50 border-indigo-200" : "bg-red-50 border-red-200"}`}
          >
            <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-2'>
              Your Net Worth
            </p>
            <p
              className={`text-6xl font-black ${netWorth >= 0 ? "text-indigo-700" : "text-red-600"}`}
            >
              {fmt(netWorth)}
            </p>
            <div className='flex justify-center gap-8 mt-4'>
              <div className='text-center'>
                <p className='text-xl font-black text-emerald-600'>
                  {fmt(totalAssets)}
                </p>
                <p className='text-xs text-gray-500'>Total assets</p>
              </div>
              <div className='text-gray-200 text-3xl'>−</div>
              <div className='text-center'>
                <p className='text-xl font-black text-red-500'>
                  {fmt(totalLiabilities)}
                </p>
                <p className='text-xs text-gray-500'>Total liabilities</p>
              </div>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-lg font-bold text-emerald-700 mb-3'>
                Assets
              </h3>
              {renderList(assets, setAssets, "emerald")}
              <div className='mt-3 text-right font-black text-emerald-700'>
                {fmt(totalAssets)}
              </div>
            </div>
            <div>
              <h3 className='text-lg font-bold text-red-600 mb-3'>
                Liabilities
              </h3>
              {renderList(liabilities, setLiabilities, "red")}
              <div className='mt-3 text-right font-black text-red-600'>
                {fmt(totalLiabilities)}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setAssets(DEFAULT_ASSETS);
              setLiabilities(DEFAULT_LIABILITIES);
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset to defaults
          </button>
          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Net worth benchmarks by age (US median):
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Under 35: ~$39,000 | Ages 35–44: ~$135,000 | Ages 45–54:
                ~$247,000
              </li>
              <li>Ages 55–64: ~$365,000 | Ages 65+: ~$409,000</li>
              <li>
                Negative net worth is common early in life — it improves as debt
                is paid down and assets grow
              </li>
              <li>
                Track monthly — consistent upward trend matters more than any
                single snapshot
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
