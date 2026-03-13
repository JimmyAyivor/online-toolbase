"use client";
import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  PieChart,
  Calculator,
  Home,
  Car,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type LoanTypeId = "mortgage" | "auto" | "personal";

interface LoanType {
  id: LoanTypeId;
  name: string;
  icon: React.ElementType;
}

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const LOAN_TYPES: LoanType[] = [
  { id: "mortgage", name: "Home Mortgage", icon: Home },
  { id: "auto", name: "Auto Loan", icon: Car },
  { id: "personal", name: "Personal Loan", icon: DollarSign },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmtCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const fmtCurrencyDetailed = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatCurrency(value: number): string {
  return fmtCurrency.format(value);
}
function formatCurrencyDetailed(value: number): string {
  return fmtCurrencyDetailed.format(value);
}

function calcLoan(
  loanAmount: number,
  downPayment: number,
  interestRate: number,
  loanTerm: number,
): {
  monthly: number;
  total: number;
  interest: number;
  schedule: AmortizationRow[];
} | null {
  const principal = loanAmount - downPayment;
  if (principal <= 0 || interestRate <= 0 || loanTerm <= 0) return null;

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const payment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const total = payment * numberOfPayments;
  const interest = total - principal;

  let balance = principal;
  const schedule: AmortizationRow[] = [];

  for (let i = 1; i <= Math.min(12, numberOfPayments); i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = payment - interestPayment;
    balance -= principalPayment;
    schedule.push({
      month: i,
      payment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
    });
  }

  return { monthly: payment, total: total + downPayment, interest, schedule };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function LoanMortgageCalculatorClient() {
  const [loanType, setLoanType] = useState<LoanTypeId>("mortgage");
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [downPayment, setDownPayment] = useState<number>(50000);

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [schedule, setSchedule] = useState<AmortizationRow[]>([]);

  useEffect(() => {
    const result = calcLoan(loanAmount, downPayment, interestRate, loanTerm);
    if (!result) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      setSchedule([]);
      return;
    }
    setMonthlyPayment(result.monthly);
    setTotalPayment(result.total);
    setTotalInterest(result.interest);
    setSchedule(result.schedule);
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  const principalPaid = loanAmount - downPayment;
  const principalPercentage =
    totalPayment > 0 ? (principalPaid / totalPayment) * 100 : 0;
  const interestPercentage =
    totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg'>
            <Calculator className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Loan &amp; Mortgage Calculator
          </h2>
          <p className='text-gray-500'>
            Calculate monthly payments and total costs
          </p>
        </div>

        {/* Loan type selector */}
        <div className='grid md:grid-cols-3 gap-4 mb-6'>
          {LOAN_TYPES.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setLoanType(id)}
              className={`flex items-center justify-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                loanType === id
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
            >
              <Icon className='w-6 h-6' />
              <span className='font-semibold'>{name}</span>
            </button>
          ))}
        </div>

        <div className='grid lg:grid-cols-2 gap-6 mb-6'>
          {/* Input sliders */}
          <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
            <h3 className='font-bold text-gray-900 mb-6 flex items-center gap-2'>
              <DollarSign className='w-5 h-5 text-emerald-600' />
              Loan Details
            </h3>

            <div className='space-y-6'>
              {/* Loan amount */}
              <SliderField
                label={`Loan Amount: ${formatCurrency(loanAmount)}`}
                min={10000}
                max={1000000}
                step={5000}
                value={loanAmount}
                onChange={(v) => setLoanAmount(v)}
                tickMin='$10k'
                tickMax='$1M'
                trackColor='from-emerald-200 to-teal-300'
              />
              {/* Down payment */}
              <SliderField
                label={`Down Payment: ${formatCurrency(downPayment)}`}
                min={0}
                max={loanAmount}
                step={1000}
                value={downPayment}
                onChange={(v) => setDownPayment(v)}
                tickMin='$0'
                tickMax={formatCurrency(loanAmount)}
                trackColor='from-blue-200 to-cyan-300'
              />
              {/* Interest rate */}
              <SliderField
                label={`Interest Rate: ${interestRate}%`}
                min={0.1}
                max={20}
                step={0.1}
                value={interestRate}
                onChange={(v) => setInterestRate(v)}
                tickMin='0.1%'
                tickMax='20%'
                trackColor='from-orange-200 to-amber-300'
                float
              />
              {/* Loan term */}
              <SliderField
                label={`Loan Term: ${loanTerm} years`}
                min={1}
                max={30}
                step={1}
                value={loanTerm}
                onChange={(v) => setLoanTerm(v)}
                tickMin='1 year'
                tickMax='30 years'
                trackColor='from-purple-200 to-pink-300'
              />
            </div>
          </div>

          {/* Results */}
          <div className='space-y-6'>
            <div className='bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 text-white'>
              <h3 className='font-bold mb-6 flex items-center gap-2 text-xl'>
                <TrendingUp className='w-6 h-6' />
                Monthly Payment
              </h3>
              <div className='text-5xl font-bold mb-2'>
                {formatCurrency(monthlyPayment)}
              </div>
              <p className='text-emerald-100'>per month for {loanTerm} years</p>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  icon: <DollarSign className='w-5 h-5 text-blue-600' />,
                  label: "Total Payment",
                  value: totalPayment,
                },
                {
                  icon: <Percent className='w-5 h-5 text-orange-600' />,
                  label: "Total Interest",
                  value: totalInterest,
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className='bg-white rounded-xl shadow-md p-6'>
                  <div className='flex items-center gap-2 mb-2'>
                    {icon}
                    <span className='text-sm font-semibold text-gray-600'>
                      {label}
                    </span>
                  </div>
                  <p className='text-2xl font-bold text-gray-900'>
                    {formatCurrency(value)}
                  </p>
                </div>
              ))}
            </div>

            {/* Payment breakdown */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h4 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <PieChart className='w-5 h-5 text-emerald-600' />
                Payment Breakdown
              </h4>
              <div className='space-y-3'>
                <BreakdownBar
                  label='Principal'
                  value={formatCurrency(principalPaid)}
                  pct={principalPercentage}
                  textColor='text-emerald-600'
                  barColor='from-emerald-500 to-teal-500'
                />
                <BreakdownBar
                  label='Interest'
                  value={formatCurrency(totalInterest)}
                  pct={interestPercentage}
                  textColor='text-orange-600'
                  barColor='from-orange-500 to-amber-500'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Amortization table */}
        {schedule.length > 0 && (
          <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
            <h3 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <Calendar className='w-5 h-5 text-emerald-600' />
              Amortization Schedule (First Year)
            </h3>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b-2 border-gray-200'>
                    {[
                      "Month",
                      "Payment",
                      "Principal",
                      "Interest",
                      "Balance",
                    ].map((h, i) => (
                      <th
                        key={h}
                        className={`py-3 px-4 font-bold text-gray-700 ${i === 0 ? "text-left" : "text-right"}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr
                      key={row.month}
                      className='border-b border-gray-100 hover:bg-gray-50'
                    >
                      <td className='py-3 px-4 font-medium text-gray-900'>
                        {row.month}
                      </td>
                      <td className='text-right py-3 px-4 text-gray-700'>
                        {formatCurrencyDetailed(row.payment)}
                      </td>
                      <td className='text-right py-3 px-4 text-emerald-600 font-medium'>
                        {formatCurrencyDetailed(row.principal)}
                      </td>
                      <td className='text-right py-3 px-4 text-orange-600 font-medium'>
                        {formatCurrencyDetailed(row.interest)}
                      </td>
                      <td className='text-right py-3 px-4 text-gray-900 font-bold'>
                        {formatCurrencyDetailed(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SliderFieldProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  tickMin: string;
  tickMax: string;
  trackColor: string;
  float?: boolean;
}

function SliderField({
  label,
  min,
  max,
  step,
  value,
  onChange,
  tickMin,
  tickMax,
  trackColor,
  float,
}: SliderFieldProps) {
  return (
    <div>
      <label className='block text-sm font-bold text-gray-700 mb-3'>
        {label}
      </label>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(
            float ? parseFloat(e.target.value) : parseInt(e.target.value),
          )
        }
        className={`w-full h-3 bg-gradient-to-r ${trackColor} rounded-lg appearance-none cursor-pointer`}
        aria-label={label}
      />
      <div className='flex justify-between text-xs text-gray-500 mt-2'>
        <span>{tickMin}</span>
        <span>{tickMax}</span>
      </div>
    </div>
  );
}

interface BreakdownBarProps {
  label: string;
  value: string;
  pct: number;
  textColor: string;
  barColor: string;
}

function BreakdownBar({
  label,
  value,
  pct,
  textColor,
  barColor,
}: BreakdownBarProps) {
  return (
    <div>
      <div className='flex justify-between text-sm mb-2'>
        <span className='text-gray-600'>{label}</span>
        <span className={`font-bold ${textColor}`}>
          {value} ({pct.toFixed(1)}%)
        </span>
      </div>
      <div className='h-3 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={`h-full bg-gradient-to-r ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
