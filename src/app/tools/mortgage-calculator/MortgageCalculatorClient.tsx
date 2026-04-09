"use client";
import React, { useState, useMemo } from "react";
import { Home, RotateCcw } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
function fmtCurrency(n: number, sym: string): string {
  return `${sym}${fmt(n)}`;
}

function calcMortgage(
  principal: number,
  annualRate: number,
  termYears: number,
) {
  if (principal <= 0 || annualRate < 0 || termYears <= 0) return null;
  const n = termYears * 12;
  const r = annualRate / 100 / 12;
  let monthlyPayment: number;
  if (r === 0) {
    monthlyPayment = principal / n;
  } else {
    monthlyPayment =
      (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - principal;
  return { monthlyPayment, totalPayment, totalInterest, n };
}

interface AmortRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

function buildAmortisation(
  principal: number,
  annualRate: number,
  termYears: number,
): AmortRow[] {
  const result = calcMortgage(principal, annualRate, termYears);
  if (!result) return [];
  const { monthlyPayment, n } = result;
  const r = annualRate / 100 / 12;
  const rows: AmortRow[] = [];
  let balance = principal;
  for (let m = 1; m <= n; m++) {
    const interest = balance * r;
    const prinPmt = monthlyPayment - interest;
    balance = Math.max(0, balance - prinPmt);
    rows.push({
      month: m,
      payment: monthlyPayment,
      principal: prinPmt,
      interest,
      balance,
    });
  }
  return rows;
}

const CURRENCIES = [
  { sym: "$", label: "USD ($)" },
  { sym: "£", label: "GBP (£)" },
  { sym: "€", label: "EUR (€)" },
  { sym: "CA$", label: "CAD (CA$)" },
  { sym: "AU$", label: "AUD (AU$)" },
  { sym: "¥", label: "JPY (¥)" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function MortgageCalculatorClient() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [downPct, setDownPct] = useState("20");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("300");
  const [insurance, setInsurance] = useState("150");
  const [pmi, setPmi] = useState("0");
  const [hoa, setHoa] = useState("0");
  const [currency, setCurrency] = useState("$");
  const [showAmort, setShowAmort] = useState(false);
  const [amortPage, setAmortPage] = useState(0);

  const sym = currency;

  const principal = useMemo(
    () => Math.max(0, parseFloat(homePrice) - parseFloat(downPayment)),
    [homePrice, downPayment],
  );
  const downPctCalc = useMemo(() => {
    const hp = parseFloat(homePrice);
    return hp > 0 ? ((parseFloat(downPayment) / hp) * 100).toFixed(1) : "0";
  }, [homePrice, downPayment]);

  const result = useMemo(
    () => calcMortgage(principal, parseFloat(rate), parseFloat(term)),
    [principal, rate, term],
  );

  const totalMonthly = useMemo(() => {
    if (!result) return 0;
    return (
      result.monthlyPayment +
      parseFloat(propertyTax || "0") +
      parseFloat(insurance || "0") +
      parseFloat(pmi || "0") +
      parseFloat(hoa || "0")
    );
  }, [result, propertyTax, insurance, pmi, hoa]);

  const amortRows = useMemo(
    () =>
      showAmort
        ? buildAmortisation(principal, parseFloat(rate), parseFloat(term))
        : [],
    [showAmort, principal, rate, term],
  );
  const PAGE_SIZE = 24;
  const pageRows = amortRows.slice(
    amortPage * PAGE_SIZE,
    (amortPage + 1) * PAGE_SIZE,
  );

  const syncDown = (hp: string, pct: string) => {
    const d = (parseFloat(hp) * parseFloat(pct)) / 100;
    setDownPayment(isNaN(d) ? "" : String(Math.round(d)));
  };
  const syncPct = (hp: string, dp: string) => {
    const p = (parseFloat(dp) / parseFloat(hp)) * 100;
    setDownPct(isNaN(p) ? "" : p.toFixed(1));
  };

  const reset = () => {
    setHomePrice("400000");
    setDownPayment("80000");
    setDownPct("20");
    setRate("6.5");
    setTerm("30");
    setPropertyTax("300");
    setInsurance("150");
    setPmi("0");
    setHoa("0");
    setShowAmort(false);
  };

  const inp =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm";

  const pieTotal = result ? result.monthlyPayment : 1;
  const piePrin = result
    ? ((result.monthlyPayment - principal * (parseFloat(rate) / 100 / 12)) /
        pieTotal) *
      100
    : 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Mortgage Calculator
          </h2>
          <p className="text-gray-500">
            Calculate monthly payments, total interest, and full amortisation
            schedule
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Inputs ── */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Loan Details</h3>
                <div className="flex items-center gap-2">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.sym} value={c.sym}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={reset}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Home Price ({sym})
                  </label>
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => {
                      setHomePrice(e.target.value);
                      syncDown(e.target.value, downPct);
                    }}
                    min="0"
                    className={inp}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Down Payment ({sym})
                  </label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => {
                      setDownPayment(e.target.value);
                      syncPct(homePrice, e.target.value);
                    }}
                    min="0"
                    className={inp}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment %: {downPctCalc}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.5"
                    value={downPct}
                    onChange={(e) => {
                      setDownPct(e.target.value);
                      syncDown(homePrice, e.target.value);
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>20%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan amount:</span>
                    <span className="font-bold text-gray-900">
                      {fmtCurrency(principal, sym)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    min="0"
                    max="30"
                    step="0.05"
                    className={inp}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Term
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["10", "15", "20", "25", "30"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTerm(t)}
                        className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${term === t ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
                      >
                        {t}yr
                      </button>
                    ))}
                    <input
                      type="number"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      placeholder="yrs"
                      min="1"
                      max="50"
                      className={`${inp} col-span-1 text-center`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Additional Monthly Costs
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: `Property Tax (${sym}/mo)`,
                    val: propertyTax,
                    set: setPropertyTax,
                  },
                  {
                    label: `Home Insurance (${sym}/mo)`,
                    val: insurance,
                    set: setInsurance,
                  },
                  {
                    label: `PMI (${sym}/mo)`,
                    val: pmi,
                    set: setPmi,
                    hint: "Private mortgage insurance",
                  },
                  { label: `HOA Fees (${sym}/mo)`, val: hoa, set: setHoa },
                ].map(({ label, val, set, hint }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {label}
                      {hint && (
                        <span className="text-gray-400 ml-1">({hint})</span>
                      )}
                    </label>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => set(e.target.value)}
                      min="0"
                      className={inp}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-2 space-y-5">
            {result ? (
              <>
                {/* Monthly breakdown */}
                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
                  <p className="text-emerald-100 text-sm font-medium mb-1">
                    Total Monthly Payment
                  </p>
                  <div className="text-5xl font-black mb-4">
                    {fmtCurrency(totalMonthly, sym)}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      {
                        label: "Principal & Interest",
                        val: result.monthlyPayment,
                      },
                      {
                        label: "Property Tax",
                        val: parseFloat(propertyTax || "0"),
                      },
                      { label: "Insurance", val: parseFloat(insurance || "0") },
                      {
                        label: "PMI + HOA",
                        val: parseFloat(pmi || "0") + parseFloat(hoa || "0"),
                      },
                    ].map(({ label, val }) => (
                      <div
                        key={label}
                        className="bg-white/15 backdrop-blur rounded-xl p-3"
                      >
                        <div className="text-lg font-bold">
                          {fmtCurrency(val, sym)}
                        </div>
                        <div className="text-xs text-emerald-100">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Loan Amount",
                      val: fmtCurrency(principal, sym),
                      sub: `${downPctCalc}% down`,
                    },
                    {
                      label: "Total Interest Paid",
                      val: fmtCurrency(result.totalInterest, sym),
                      sub: "over loan term",
                    },
                    {
                      label: "Total Cost",
                      val: fmtCurrency(result.totalPayment, sym),
                      sub: `principal + interest`,
                    },
                  ].map(({ label, val, sub }) => (
                    <div
                      key={label}
                      className="bg-white rounded-2xl shadow-xl p-5"
                    >
                      <div className="text-xl font-black text-gray-900">
                        {val}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{label}</div>
                      <div className="text-xs text-gray-400">{sub}</div>
                    </div>
                  ))}
                </div>

                {/* Stacked bar breakdown */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Payment Breakdown
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Principal",
                        val: principal,
                        total: result.totalPayment,
                        color: "bg-emerald-500",
                      },
                      {
                        label: "Total Interest",
                        val: result.totalInterest,
                        total: result.totalPayment,
                        color: "bg-amber-400",
                      },
                    ].map(({ label, val, total, color }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${color}`} />
                            <span className="text-gray-700">{label}</span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {fmtCurrency(val, sym)}{" "}
                            <span className="text-gray-400 font-normal">
                              ({((val / total) * 100).toFixed(1)}%)
                            </span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div
                            className={`${color} h-3 rounded-full transition-all`}
                            style={{ width: `${(val / total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    For every{" "}
                    <strong className="text-gray-900">
                      {fmtCurrency(result.monthlyPayment, sym)}
                    </strong>{" "}
                    monthly payment —{" "}
                    <strong className="text-gray-900">
                      {fmtCurrency(result.totalInterest / result.n, sym)}
                    </strong>{" "}
                    average interest /{" "}
                    <strong className="text-gray-900">
                      {fmtCurrency(principal / result.n, sym)}
                    </strong>{" "}
                    average principal
                  </div>
                </div>

                {/* Amortisation */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">
                      Amortisation Schedule
                    </h3>
                    <button
                      onClick={() => {
                        setShowAmort(!showAmort);
                        setAmortPage(0);
                      }}
                      className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      {showAmort ? "Hide" : "Show"} full schedule
                    </button>
                  </div>
                  {showAmort && (
                    <>
                      <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-50">
                            <tr>
                              {[
                                "Month",
                                "Payment",
                                "Principal",
                                "Interest",
                                "Balance",
                              ].map((h) => (
                                <th
                                  key={h}
                                  className="px-3 py-2 text-left font-bold text-gray-500"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {pageRows.map((row) => (
                              <tr
                                key={row.month}
                                className="hover:bg-emerald-50"
                              >
                                <td className="px-3 py-2 font-medium text-gray-700">
                                  {row.month}
                                </td>
                                <td className="px-3 py-2 font-mono text-gray-700">
                                  {fmtCurrency(row.payment, sym)}
                                </td>
                                <td className="px-3 py-2 font-mono text-emerald-700">
                                  {fmtCurrency(row.principal, sym)}
                                </td>
                                <td className="px-3 py-2 font-mono text-amber-600">
                                  {fmtCurrency(row.interest, sym)}
                                </td>
                                <td className="px-3 py-2 font-mono text-gray-900">
                                  {fmtCurrency(row.balance, sym)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <button
                          disabled={amortPage === 0}
                          onClick={() => setAmortPage((p) => p - 1)}
                          className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-40 transition-colors"
                        >
                          ← Previous
                        </button>
                        <span className="text-xs text-gray-500">
                          Months {amortPage * PAGE_SIZE + 1}–
                          {Math.min(
                            (amortPage + 1) * PAGE_SIZE,
                            amortRows.length,
                          )}{" "}
                          of {amortRows.length}
                        </span>
                        <button
                          disabled={
                            (amortPage + 1) * PAGE_SIZE >= amortRows.length
                          }
                          onClick={() => setAmortPage((p) => p + 1)}
                          className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-40 transition-colors"
                        >
                          Next →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
                <Home className="w-16 h-16 mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400">
                  Enter loan details to calculate your mortgage
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
