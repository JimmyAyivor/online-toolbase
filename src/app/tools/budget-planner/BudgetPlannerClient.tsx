"use client";
import React, { useState } from "react";
import { PieChart, RotateCcw, Plus, Trash2 } from "lucide-react";

interface LineItem {
  id: string;
  label: string;
  amount: string;
}
function uid() {
  return Math.random().toString(36).slice(2, 8);
}
function fmt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const DEFAULT_EXPENSES: LineItem[] = [
  { id: uid(), label: "Rent / Mortgage", amount: "" },
  { id: uid(), label: "Groceries", amount: "" },
  { id: uid(), label: "Transport", amount: "" },
  { id: uid(), label: "Utilities", amount: "" },
  { id: uid(), label: "Insurance", amount: "" },
  { id: uid(), label: "Entertainment", amount: "" },
  { id: uid(), label: "Dining Out", amount: "" },
  { id: uid(), label: "Savings", amount: "" },
];

export default function BudgetPlannerClient() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState<LineItem[]>(DEFAULT_EXPENSES);

  const totalIncome = parseFloat(income) || 0;
  const totalExpenses = expenses.reduce(
    (sum, e) => sum + (parseFloat(e.amount) || 0),
    0,
  );
  const remaining = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (remaining / totalIncome) * 100 : 0;

  const updateExpense = (id: string, key: "label" | "amount", val: string) =>
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [key]: val } : e)),
    );
  const addRow = () =>
    setExpenses((prev) => [
      ...prev,
      { id: uid(), label: "New item", amount: "" },
    ]);
  const removeRow = (id: string) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));

  const remainingColor = remaining >= 0 ? "text-green-700" : "text-red-600";
  const remainingBg =
    remaining >= 0
      ? "bg-green-50 border-green-100"
      : "bg-red-50 border-red-100";

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <PieChart className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Budget Planner
            </h2>
            <p className='text-gray-600'>
              Enter your monthly income and expenses to see where your money
              goes
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            {/* Inputs */}
            <div>
              <div className='mb-6'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Monthly income ($)
                </label>
                <input
                  type='number'
                  min='0'
                  value={income}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setIncome(e.target.value)
                  }
                  placeholder='e.g. 5000'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-bold'
                />
              </div>

              <p className='text-sm font-semibold text-gray-700 mb-3'>
                Monthly expenses
              </p>
              <div className='space-y-2 mb-4'>
                {expenses.map((ex) => (
                  <div key={ex.id} className='flex gap-2 items-center'>
                    <input
                      type='text'
                      value={ex.label}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateExpense(ex.id, "label", e.target.value)
                      }
                      className='flex-1 border-2 border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    />
                    <input
                      type='number'
                      min='0'
                      value={ex.amount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateExpense(ex.id, "amount", e.target.value)
                      }
                      placeholder='$'
                      className='w-28 border-2 border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    />
                    <button
                      onClick={() => removeRow(ex.id)}
                      className='text-gray-300 hover:text-red-400 transition-colors'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addRow}
                className='flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors mb-4'
              >
                <Plus className='w-4 h-4' />
                Add expense
              </button>
            </div>

            {/* Results */}
            <div className='space-y-4'>
              {[
                {
                  label: "Monthly Income",
                  value: `$${fmt(totalIncome)}`,
                  bg: "bg-indigo-50 border-indigo-100",
                  text: "text-indigo-700",
                },
                {
                  label: "Total Expenses",
                  value: `$${fmt(totalExpenses)}`,
                  bg: "bg-gray-50 border-gray-100",
                  text: "text-gray-800",
                },
              ].map(({ label, value, bg, text }) => (
                <div
                  key={label}
                  className={`${bg} border rounded-xl p-4 flex justify-between items-center`}
                >
                  <span className='text-sm font-medium text-gray-600'>
                    {label}
                  </span>
                  <span className={`text-xl font-black ${text}`}>{value}</span>
                </div>
              ))}
              <div
                className={`${remainingBg} border-2 rounded-xl p-5 text-center`}
              >
                <p className='text-xs font-medium text-gray-500 mb-1'>
                  Remaining / Surplus
                </p>
                <p className={`text-4xl font-black ${remainingColor}`}>
                  {remaining >= 0 ? "+" : ""}${fmt(remaining)}
                </p>
              </div>
              <div className='bg-gray-50 border border-gray-100 rounded-xl p-4'>
                <p className='text-xs text-gray-500 mb-2'>Savings rate</p>
                <div className='flex items-center gap-3'>
                  <div className='flex-1 bg-gray-200 rounded-full h-3'>
                    <div
                      className={`h-3 rounded-full transition-all ${savingsRate >= 20 ? "bg-green-500" : savingsRate >= 10 ? "bg-yellow-500" : "bg-red-400"}`}
                      style={{
                        width: `${Math.min(Math.max(savingsRate, 0), 100)}%`,
                      }}
                    />
                  </div>
                  <span className='font-bold text-gray-800 text-sm w-16 text-right'>
                    {savingsRate.toFixed(1)}%
                  </span>
                </div>
                <p className='text-xs text-gray-400 mt-2'>
                  {savingsRate >= 20
                    ? "🟢 Excellent — above the 20% savings benchmark"
                    : savingsRate >= 10
                      ? "🟡 Good — aim for 20% to build long-term security"
                      : "🔴 Low — try to reduce expenses to increase savings"}
                </p>
              </div>
              {/* Expense breakdown */}
              {totalExpenses > 0 && (
                <div className='bg-white border border-gray-100 rounded-xl p-4'>
                  <p className='text-xs font-semibold text-gray-500 mb-3'>
                    Expense breakdown
                  </p>
                  <div className='space-y-2'>
                    {expenses
                      .filter((e) => parseFloat(e.amount) > 0)
                      .sort(
                        (a, b) => parseFloat(b.amount) - parseFloat(a.amount),
                      )
                      .map((e) => {
                        const pct =
                          (parseFloat(e.amount) / totalExpenses) * 100;
                        return (
                          <div key={e.id}>
                            <div className='flex justify-between text-xs text-gray-600 mb-1'>
                              <span>{e.label}</span>
                              <span>
                                ${fmt(parseFloat(e.amount))} ({pct.toFixed(1)}%)
                              </span>
                            </div>
                            <div className='bg-gray-100 rounded-full h-1.5'>
                              <div
                                className='bg-indigo-400 h-1.5 rounded-full'
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setIncome("");
              setExpenses(
                DEFAULT_EXPENSES.map((e) => ({ ...e, id: uid(), amount: "" })),
              );
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>
          <div className='p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Budgeting tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                The 50/30/20 rule: 50% needs, 30% wants, 20% savings and debt
                repayment
              </li>
              <li>
                A savings rate of 20% or more puts you on a strong path to
                financial security
              </li>
              <li>
                Track actual spending for one month before setting budget
                targets
              </li>
              <li>
                All figures are monthly — multiply by 12 to see annual totals
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
