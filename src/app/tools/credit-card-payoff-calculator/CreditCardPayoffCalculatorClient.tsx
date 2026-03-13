"use client";
import React, { useState } from "react";
import { CreditCard, RotateCcw } from "lucide-react";

function fmt(n: number) { return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

export default function CreditCardPayoffCalculatorClient() {
    const [balance, setBalance] = useState("");
    const [rate, setRate] = useState("");
    const [payment, setPayment] = useState("");
    const [mode, setMode] = useState < "payment" | "months" > ("payment");
    const [targetMonths, setTargetMonths] = useState("");

    const bal = parseFloat(balance);
    const apr = parseFloat(rate);
    const monthlyRate = apr / 100 / 12;

    const paymentResult = (() => {
        const pmt = parseFloat(payment);
        if (!bal || !apr || !pmt || pmt <= bal * monthlyRate) return null;
        let b = bal, months = 0, totalInterest = 0;
        while (b > 0 && months < 600) {
            const interest = b * monthlyRate;
            totalInterest += interest;
            b = b + interest - pmt;
            months++;
        }
        b = Math.max(0, b);
        return { months, totalInterest, totalPaid: months * pmt - b, years: Math.floor(months / 12), remMonths: months % 12 };
    })();

    const monthsResult = (() => {
        const tm = parseInt(targetMonths);
        if (!bal || !apr || !tm || tm <= 0) return null;
        if (monthlyRate === 0) return { payment: bal / tm, totalInterest: 0 };
        const pmt = (bal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -tm));
        const totalPaid = pmt * tm;
        return { payment: pmt, totalInterest: totalPaid - bal };
    })();

    const minPayment = bal && apr ? Math.max(25, bal * monthlyRate * 1.01) : null;

    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
            <div className='max-w-6xl mx-auto'>
                <div className='bg-white rounded-2xl shadow-xl p-8'>
                    <div className='text-center mb-8'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'><CreditCard className='w-8 h-8 text-indigo-600' /></div>
                        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Credit Card Payoff Calculator</h2>
                        <p className='text-gray-600'>See how long it takes to pay off your card and how much interest you'll pay</p>
                    </div>

                    <div className='flex justify-center gap-3 mb-6'>
                        <button onClick={() => setMode("payment")} className={`px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${mode === "payment" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"}`}>Fixed monthly payment</button>
                        <button onClick={() => setMode("months")} className={`px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${mode === "months" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"}`}>Target payoff date</button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-8'>
                        <div className='space-y-4'>
                            {[
                                { label: "Current balance ($)", val: balance, set: setBalance, placeholder: "e.g. 5000" },
                                { label: "Annual interest rate (APR %)", val: rate, set: setRate, placeholder: "e.g. 19.99" },
                            ].map(({ label, val, set, placeholder }) => (
                                <div key={label}>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
                                    <input type='number' min='0' value={val} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value)} placeholder={placeholder} className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent' />
                                </div>
                            ))}
                            {mode === "payment" ? (
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Monthly payment ($)</label>
                                    <input type='number' min='0' value={payment} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPayment(e.target.value)} placeholder='e.g. 200' className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent' />
                                    {minPayment && <p className='text-xs text-gray-400 mt-1'>Estimated minimum payment: ~${fmt(minPayment)}/month</p>}
                                </div>
                            ) : (
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Target months to pay off</label>
                                    <input type='number' min='1' value={targetMonths} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetMonths(e.target.value)} placeholder='e.g. 24' className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent' />
                                </div>
                            )}
                        </div>

                        <div className='space-y-3'>
                            {mode === "payment" && paymentResult && (
                                <>
                                    <div className='bg-indigo-50 border-2 border-indigo-100 rounded-xl p-5 text-center'>
                                        <p className='text-xs text-gray-500 mb-1'>Time to pay off</p>
                                        <p className='text-3xl font-black text-indigo-700'>{paymentResult.years > 0 ? `${paymentResult.years}y ${paymentResult.remMonths}m` : `${paymentResult.months} months`}</p>
                                    </div>
                                    {[
                                        { label: "Total interest paid", value: `$${fmt(paymentResult.totalInterest)}`, red: true },
                                        { label: "Total amount paid", value: `$${fmt(paymentResult.totalPaid)}` },
                                        { label: "Interest as % of balance", value: `${((paymentResult.totalInterest / bal) * 100).toFixed(1)}%` },
                                    ].map(({ label, value, red }) => (
                                        <div key={label} className={`flex justify-between items-center rounded-xl px-4 py-3 ${red ? "bg-red-50" : "bg-gray-50"}`}>
                                            <span className='text-sm text-gray-600'>{label}</span>
                                            <span className={`font-bold ${red ? "text-red-600" : "text-gray-900"}`}>{value}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                            {mode === "months" && monthsResult && (
                                <>
                                    <div className='bg-indigo-50 border-2 border-indigo-100 rounded-xl p-5 text-center'>
                                        <p className='text-xs text-gray-500 mb-1'>Required monthly payment</p>
                                        <p className='text-3xl font-black text-indigo-700'>${fmt(monthsResult.payment)}</p>
                                    </div>
                                    {[
                                        { label: "Total interest paid", value: `$${fmt(monthsResult.totalInterest)}`, red: true },
                                        { label: "Total amount paid", value: `$${fmt(bal + monthsResult.totalInterest)}` },
                                    ].map(({ label, value, red }) => (
                                        <div key={label} className={`flex justify-between items-center rounded-xl px-4 py-3 ${red ? "bg-red-50" : "bg-gray-50"}`}>
                                            <span className='text-sm text-gray-600'>{label}</span>
                                            <span className={`font-bold ${red ? "text-red-600" : "text-gray-900"}`}>{value}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                            {mode === "payment" && !paymentResult && balance && rate && payment && (
                                <div className='bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700'>Your monthly payment must exceed the interest charge (${bal && apr ? fmt(bal * monthlyRate) : "—"}/month) to reduce the balance.</div>
                            )}
                        </div>
                    </div>

                    <button onClick={() => { setBalance(""); setRate(""); setPayment(""); setTargetMonths(""); }} className='flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8'><RotateCcw className='w-4 h-4' />Reset</button>
                    <div className='p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600'>
                        <p className='font-semibold mb-2'>Reducing credit card debt:</p>
                        <ul className='list-disc list-inside space-y-1'>
                            <li>Pay more than the minimum — minimum payments can keep you in debt for decades</li>
                            <li>The avalanche method: pay off highest-APR cards first to minimise interest</li>
                            <li>A balance transfer to a 0% APR card can eliminate interest during the promotional period</li>
                            <li>Every extra dollar above the minimum goes directly to reducing principal</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}