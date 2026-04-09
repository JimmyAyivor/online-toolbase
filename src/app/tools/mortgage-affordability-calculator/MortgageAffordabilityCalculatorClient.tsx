"use client";
import React, { useState } from "react";
import { Home, RotateCcw } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
function fmtD(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function MortgageAffordabilityCalculatorClient() {
  const [annualIncome, setAnnualIncome] = useState("");
  const [monthlyDebts, setMonthlyDebts] = useState("0");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("7");
  const [termYears, setTermYears] = useState("30");
  const [propertyTax, setPropertyTax] = useState("1.1");
  const [insurance, setInsurance] = useState("1200");

  const income = parseFloat(annualIncome);
  const debts = parseFloat(monthlyDebts) || 0;
  const down = parseFloat(downPayment) || 0;
  const r = parseFloat(rate) / 100 / 12;
  const n = parseInt(termYears) * 12;
  const tax = parseFloat(propertyTax) / 100;
  const ins = parseFloat(insurance) / 12;

  const result = (() => {
    if (!income || !r || !n) return null;
    const monthlyIncome = income / 12;
    // 28% front-end / 36% back-end rules
    const maxByFront = monthlyIncome * 0.28;
    const maxByBack = monthlyIncome * 0.36 - debts;
    const maxHousing = Math.min(maxByFront, maxByBack);

    // Determine max loan amount given max housing payment
    // payment = P * [r(1+r)^n / ((1+r)^n - 1)] + tax*homeValue/12 + ins
    // Iterate to solve since tax depends on home value
    // Approximate: treat tax as fixed monthly for now
    const factor =
      r > 0 ? (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 1 / n;
    // maxHousing = P * factor + P * tax/12 + ins  (approx: home value ≈ loan amount + down)
    // maxHousing - ins = P * (factor + tax/12)
    const maxLoan = (maxHousing - ins) / (factor + tax / 12);
    const maxHome = maxLoan + down;
    const monthlyPayment = maxLoan * factor + (maxHome * tax) / 12 + ins;

    return {
      maxHome: Math.max(0, maxHome),
      maxLoan: Math.max(0, maxLoan),
      monthlyPayment: Math.max(0, monthlyPayment),
      maxHousing,
    };
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Home className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Mortgage Affordability Calculator
            </h2>
            <p className="text-gray-600">
              Estimate how much home you can afford based on income and debts
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                {
                  label: "Annual gross income ($)",
                  val: annualIncome,
                  set: setAnnualIncome,
                  placeholder: "e.g. 85000",
                },
                {
                  label: "Monthly debt payments ($)",
                  val: monthlyDebts,
                  set: setMonthlyDebts,
                  placeholder: "e.g. 400",
                  hint: "Car loans, student loans, credit card minimums",
                },
                {
                  label: "Down payment ($)",
                  val: downPayment,
                  set: setDownPayment,
                  placeholder: "e.g. 40000",
                },
                {
                  label: "Mortgage rate (%)",
                  val: rate,
                  set: setRate,
                  placeholder: "e.g. 7",
                },
                {
                  label: "Loan term (years)",
                  val: termYears,
                  set: setTermYears,
                  placeholder: "30",
                },
                {
                  label: "Annual property tax rate (%)",
                  val: propertyTax,
                  set: setPropertyTax,
                  placeholder: "1.1",
                },
                {
                  label: "Annual home insurance ($)",
                  val: insurance,
                  set: setInsurance,
                  placeholder: "1200",
                },
              ].map(({ label, val, set, placeholder, hint }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
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
                  {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
                </div>
              ))}
            </div>

            {result && (
              <div className="space-y-3">
                <div className="bg-indigo-50 border-2 border-indigo-100 rounded-xl p-5 text-center">
                  <p className="text-xs text-gray-500 mb-1">
                    Maximum home price
                  </p>
                  <p className="text-4xl font-black text-indigo-700">
                    ${fmt(result.maxHome)}
                  </p>
                </div>
                {[
                  {
                    label: "Maximum loan amount",
                    value: `$${fmt(result.maxLoan)}`,
                  },
                  {
                    label: "Estimated monthly payment",
                    value: `$${fmtD(result.monthlyPayment)}`,
                  },
                  {
                    label: "Max monthly housing budget",
                    value: `$${fmtD(result.maxHousing)}`,
                  },
                  { label: "Down payment", value: `$${fmt(down)}` },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm text-gray-600">{label}</span>
                    <span className="font-bold text-gray-900">{value}</span>
                  </div>
                ))}
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-800">
                  <strong>Based on:</strong> 28% front-end ratio (housing ≤ 28%
                  of gross income) and 36% back-end ratio (all debts ≤ 36%).
                  Lenders use both and apply whichever is lower.
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setAnnualIncome("");
              setMonthlyDebts("0");
              setDownPayment("");
              setRate("7");
              setTermYears("30");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">Mortgage affordability notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Results are estimates — actual approval depends on credit score,
                employment history, and lender
              </li>
              <li>
                A larger down payment reduces your loan amount and may eliminate
                PMI (private mortgage insurance)
              </li>
              <li>
                PMI is typically required when your down payment is less than
                20% of the purchase price
              </li>
              <li>
                Consider keeping total housing costs under 25% of take-home pay
                for financial flexibility
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
