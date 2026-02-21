"use client";
import React, { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Calendar, PiggyBank } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Results {
  finalAmount: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  effectiveRate: number;
}

interface ChartDataPoint {
  year: number;
  principal: number;
  contributions: number;
  interest: number;
  total: number;
}

interface Frequency {
  value: string;
  label: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CompoundInterestCalculatorClient() {
  const [principal, setPrincipal] = useState<string>("10000");
  const [interestRate, setInterestRate] = useState<string>("7");
  const [years, setYears] = useState<string>("10");
  const [compoundFrequency, setCompoundFrequency] = useState<string>("12");
  const [contribution, setContribution] = useState<string>("100");
  const [contributionFrequency, setContributionFrequency] =
    useState<string>("12");
  const [results, setResults] = useState<Results | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  const frequencies: Frequency[] = [
    { value: "1", label: "Annually" },
    { value: "2", label: "Semi-annually" },
    { value: "4", label: "Quarterly" },
    { value: "12", label: "Monthly" },
    { value: "365", label: "Daily" },
  ];

  useEffect(() => {
    calculateCompoundInterest();
  }, [
    principal,
    interestRate,
    years,
    compoundFrequency,
    contribution,
    contributionFrequency,
  ]);

  const calculateCompoundInterest = (): void => {
    if (!principal || !interestRate || !years) {
      setResults(null);
      setChartData([]);
      return;
    }

    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(compoundFrequency);
    const PMT = parseFloat(contribution) || 0;
    const m = parseFloat(contributionFrequency);

    const data: ChartDataPoint[] = [];

    for (let year = 0; year <= t; year++) {
      const principalAmount = P * Math.pow(1 + r / n, n * year);

      let contributionsAmount = 0;
      if (PMT > 0 && year > 0) {
        contributionsAmount =
          PMT * m * ((Math.pow(1 + r / n, n * year) - 1) / (r / n));
      }

      const totalAmount = principalAmount + contributionsAmount;
      const totalInterest = totalAmount - P - PMT * m * year;

      data.push({
        year,
        principal: P,
        contributions: PMT * m * year,
        interest: totalInterest,
        total: totalAmount,
      });
    }

    const finalData = data[data.length - 1];

    setResults({
      finalAmount: finalData.total,
      totalPrincipal: P,
      totalContributions: finalData.contributions,
      totalInterest: finalData.interest,
      effectiveRate:
        (finalData.total / (P + finalData.contributions) - 1) * 100,
    });

    setChartData(data);
  };

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  // Custom tooltip — avoids recharts' complex Formatter generic entirely
  const ChartTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; stroke: string }>;
    label?: number;
  }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className='bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm'>
        <p className='font-semibold text-gray-700 mb-2'>Year {label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.stroke }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
              <TrendingUp className='w-8 h-8 text-blue-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Compound Interest Calculator
            </h2>
            <p className='text-gray-600'>
              Calculate investment growth over time
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            {/* ── Left column ── */}
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Initial Investment
                </label>
                <div className='relative'>
                  <DollarSign className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='number'
                    value={principal}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPrincipal(e.target.value)
                    }
                    className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Annual Interest Rate (%)
                </label>
                <input
                  type='number'
                  value={interestRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInterestRate(e.target.value)
                  }
                  step='0.1'
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Time Period (Years): {years}
                </label>
                <input
                  type='range'
                  min='1'
                  max='50'
                  value={years}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setYears(e.target.value)
                  }
                  className='w-full'
                />
                <div className='flex justify-between text-xs text-gray-500 mt-1'>
                  <span>1 year</span>
                  <span>50 years</span>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Compound Frequency
                </label>
                <select
                  value={compoundFrequency}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCompoundFrequency(e.target.value)
                  }
                  className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  {frequencies.map((freq) => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── Right column ── */}
            <div className='space-y-4'>
              <div className='bg-purple-50 rounded-lg p-4 border border-purple-200'>
                <h3 className='font-semibold text-gray-800 mb-3'>
                  Regular Contributions
                </h3>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Contribution Amount
                    </label>
                    <div className='relative'>
                      <DollarSign className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                      <input
                        type='number'
                        value={contribution}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setContribution(e.target.value)
                        }
                        className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Contribution Frequency
                    </label>
                    <select
                      value={contributionFrequency}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setContributionFrequency(e.target.value)
                      }
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    >
                      {frequencies.map((freq) => (
                        <option key={freq.value} value={freq.value}>
                          {freq.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                <p className='text-sm text-gray-600'>
                  <strong>Note:</strong> Regular contributions can significantly
                  boost your investment growth through the power of compounding.
                </p>
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          {results && (
            <div className='space-y-6'>
              <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200'>
                <h3 className='font-bold text-gray-800 mb-4 text-lg'>
                  Investment Summary
                </h3>

                <div className='grid md:grid-cols-4 gap-4 mb-4'>
                  <div className='bg-white rounded-lg p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <PiggyBank className='w-4 h-4 text-blue-600' />
                      <div className='text-xs text-gray-600'>
                        Initial Investment
                      </div>
                    </div>
                    <div className='text-xl font-bold text-gray-800'>
                      {formatCurrency(results.totalPrincipal)}
                    </div>
                  </div>

                  <div className='bg-white rounded-lg p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Calendar className='w-4 h-4 text-purple-600' />
                      <div className='text-xs text-gray-600'>Contributions</div>
                    </div>
                    <div className='text-xl font-bold text-gray-800'>
                      {formatCurrency(results.totalContributions)}
                    </div>
                  </div>

                  <div className='bg-white rounded-lg p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <TrendingUp className='w-4 h-4 text-green-600' />
                      <div className='text-xs text-gray-600'>
                        Interest Earned
                      </div>
                    </div>
                    <div className='text-xl font-bold text-green-600'>
                      {formatCurrency(results.totalInterest)}
                    </div>
                  </div>

                  <div className='bg-blue-600 text-white rounded-lg p-4'>
                    <div className='text-xs opacity-90 mb-2'>Final Amount</div>
                    <div className='text-2xl font-bold'>
                      {formatCurrency(results.finalAmount)}
                    </div>
                  </div>
                </div>

                <div className='bg-white rounded-lg p-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      Total Invested
                    </span>
                    <span className='font-semibold text-gray-800'>
                      {formatCurrency(
                        results.totalPrincipal + results.totalContributions,
                      )}
                    </span>
                  </div>
                  <div className='flex justify-between items-center mt-2'>
                    <span className='text-sm text-gray-600'>
                      Effective Annual Return
                    </span>
                    <span className='font-semibold text-green-600'>
                      {results.effectiveRate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Chart ── */}
              <div className='bg-white rounded-lg p-6 border border-gray-200'>
                <h3 className='font-bold text-gray-800 mb-4'>
                  Growth Over Time
                </h3>
                <ResponsiveContainer width='100%' height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      dataKey='year'
                      label={{
                        value: "Years",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      tickFormatter={(value: number) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Line
                      type='monotone'
                      dataKey='principal'
                      stroke='#6366f1'
                      name='Principal'
                      strokeWidth={2}
                    />
                    <Line
                      type='monotone'
                      dataKey='contributions'
                      stroke='#a855f7'
                      name='Contributions'
                      strokeWidth={2}
                    />
                    <Line
                      type='monotone'
                      dataKey='interest'
                      stroke='#10b981'
                      name='Interest'
                      strokeWidth={2}
                    />
                    <Line
                      type='monotone'
                      dataKey='total'
                      stroke='#f59e0b'
                      name='Total'
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* ── Breakdown ── */}
              <div className='grid md:grid-cols-3 gap-4'>
                <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
                  <div className='text-sm text-gray-600 mb-1'>
                    Principal Portion
                  </div>
                  <div className='text-xl font-bold text-blue-600'>
                    {(
                      (results.totalPrincipal / results.finalAmount) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className='bg-purple-50 rounded-lg p-4 border border-purple-200'>
                  <div className='text-sm text-gray-600 mb-1'>
                    Contributions Portion
                  </div>
                  <div className='text-xl font-bold text-purple-600'>
                    {(
                      (results.totalContributions / results.finalAmount) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className='bg-green-50 rounded-lg p-4 border border-green-200'>
                  <div className='text-sm text-gray-600 mb-1'>
                    Interest Portion
                  </div>
                  <div className='text-xl font-bold text-green-600'>
                    {(
                      (results.totalInterest / results.finalAmount) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>
              Understanding Compound Interest:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Compound interest means earning interest on both your principal
                and previously earned interest
              </li>
              <li>
                The frequency of compounding affects your returns — more
                frequent compounding yields higher returns
              </li>
              <li>
                Regular contributions significantly accelerate wealth building
              </li>
              <li>
                Time is your greatest ally — starting early makes a huge
                difference
              </li>
              <li>
                This calculator assumes interest is compounded at the selected
                frequency
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
