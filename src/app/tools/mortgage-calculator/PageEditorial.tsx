"use client";
// src/app/tools/mortgage-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL = process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD = process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/mortgage-calculator";
const TOOL_NAME = "Mortgage Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => { let c = false; import("qrcode").then((Q) => { if (c || !canvasRef.current) return; Q.toCanvas(canvasRef.current, TOOL_URL, { width: 220, margin: 2, color: { dark: "#064e3b", light: "#ecfdf5" } }); }); return () => { c = true; }; }, []);
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm' onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center'>
        <button onClick={onClose} className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors' aria-label='Close QR code modal'>✕</button>
        <div className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 mb-4 shadow-lg'>
          <svg viewBox='0 0 24 24' fill='none' className='w-6 h-6 text-white' stroke='currentColor' strokeWidth={2}><rect x='3' y='3' width='7' height='7' rx='1' /><rect x='14' y='3' width='7' height='7' rx='1' /><rect x='3' y='14' width='7' height='7' rx='1' /><rect x='14' y='14' width='3' height='3' rx='0.5' /><rect x='18' y='14' width='3' height='3' rx='0.5' /><rect x='14' y='18' width='3' height='3' rx='0.5' /><rect x='18' y='18' width='3' height='3' rx='0.5' /></svg>
        </div>
        <h3 className='text-lg font-black text-gray-900 mb-1'>Take it with you</h3>
        <p className='text-sm text-gray-400 mb-5 leading-relaxed'>Scan with your phone camera to open the {TOOL_NAME} on mobile</p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-inner mb-5'><canvas ref={canvasRef} /></div>
        <p className='text-xs text-gray-300 font-mono break-all'>{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent("Free mortgage calculator — monthly payments, total interest, and full amortisation schedule. No signup.");
  const shareUrl = encodeURIComponent(TOOL_URL);
  const copyLink = () => { navigator.clipboard.writeText(TOOL_URL); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const SHARES = [
    { label: "X / Twitter", href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, bg: "bg-black hover:bg-gray-800", icon: <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'><path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' /></svg> },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, bg: "bg-[#0A66C2] hover:bg-[#004182]", icon: <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'><path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' /></svg> },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, bg: "bg-[#1877F2] hover:bg-[#0c5ab9]", icon: <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'><path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' /></svg> },
    { label: "WhatsApp", href: `https://wa.me/?text=${shareText}%20${shareUrl}`, bg: "bg-[#25D366] hover:bg-[#1da851]", icon: <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' /></svg> },
  ];
  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div><p className='text-sm font-bold text-gray-900 mb-0.5'>Found this useful?</p><p className='text-xs text-gray-400'>Share the tool or scan to open it on your phone</p></div>
          <div className='flex flex-wrap items-center gap-2'>
            {SHARES.map(({ label, href, bg, icon }) => (<a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={`Share on ${label}`} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}>{icon}{label}</a>))}
            <button onClick={copyLink} className='inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all'>
              {copied ? (<><svg viewBox='0 0 20 20' fill='currentColor' className='w-3.5 h-3.5 text-green-600'><path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' /></svg><span className='text-green-600'>Copied!</span></>) : (<><svg viewBox='0 0 20 20' fill='currentColor' className='w-3.5 h-3.5'><path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' /><path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z' /></svg>Copy link</>)}
            </button>
            <button onClick={() => setQrOpen(true)} className='hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5' aria-label='Open QR code'>
              <svg viewBox='0 0 20 20' fill='currentColor' className='w-3.5 h-3.5'><path fillRule='evenodd' d='M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z' clipRule='evenodd' /><path d='M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z' /></svg>
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FAQS = [
  { q: "How is my monthly mortgage payment calculated?", a: "The monthly principal and interest payment is calculated using the standard amortisation formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1], where P is the loan principal (home price minus down payment), r is the monthly interest rate (annual rate divided by 12 and by 100), and n is the total number of monthly payments (loan term in years × 12). This formula distributes the loan repayment evenly across all monthly payments so that each payment is identical, while the split between principal and interest changes over time — early payments are mostly interest, and later payments are mostly principal. This is why a 30-year mortgage accumulates so much more total interest than a 15-year mortgage even at the same rate." },
  { q: "How does a 15-year vs 30-year mortgage compare?", a: "A 15-year mortgage has a higher monthly payment than a 30-year mortgage for the same loan amount but results in dramatically less total interest paid and builds equity much faster. For a $400,000 loan at 6.5%: the 30-year mortgage has a monthly payment of approximately $2,528 with total interest of approximately $510,000. The 15-year mortgage has a monthly payment of approximately $3,487 (38% higher) but total interest of only approximately $227,000 — saving around $283,000 in interest over the life of the loan. The trade-off is higher monthly cash flow commitment with a 15-year. Many financial advisors suggest the 30-year term with voluntary additional principal payments, which achieves faster payoff while maintaining payment flexibility." },
  { q: "What is PMI and when is it required?", a: "PMI (Private Mortgage Insurance) is insurance that protects the lender — not the buyer — in case of default. It is typically required in the US when the down payment is less than 20% of the home price (i.e. the loan-to-value ratio exceeds 80%). PMI is not a fixed cost — it typically ranges from 0.1% to 2% of the loan amount per year, divided into monthly payments. On a $400,000 loan at 0.5% PMI, that's $2,000/year or approximately $167/month. PMI can be cancelled once you've paid down the loan to 80% of the original appraised value (by law in the US, lenders must cancel it at 78% LTV). UK equivalent is MBS (mortgage indemnity guarantee); similar products exist in other countries." },
  { q: "What is an amortisation schedule?", a: "An amortisation schedule is a complete table showing each monthly payment broken down into its principal and interest components, plus the remaining loan balance after each payment. In early months, most of the payment covers interest — for a 6.5%, 30-year mortgage, over 70% of the first payment goes to interest. As the balance decreases, the interest portion shrinks and the principal portion grows, even though the total payment remains constant. Viewing the amortisation schedule is useful for understanding how much equity you've built at any point in the loan, calculating the payoff amount if you want to refinance or sell, and seeing the impact of making extra principal payments." },
  { q: "How much does an extra monthly payment save?", a: "Making even one extra mortgage payment per year — or dividing your monthly payment by 12 and adding that amount to each monthly payment — can save tens of thousands in interest and shorten the loan term significantly. For a 30-year, $400,000 mortgage at 6.5%: making one extra payment per year shaves approximately 4–5 years off the loan term and saves approximately $60,000–70,000 in total interest. This calculator doesn't model extra payments directly, but you can approximate the effect by reducing the loan term — for example, if you plan to consistently pay as if it were a 25-year mortgage, set the term to 25 years and compare the payments and total interest to a 30-year calculation." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>Frequently Asked Questions</h2>
      <div className='space-y-3'>
        {FAQS.map((faq, i) => (
          <div key={i} className='border border-gray-100 rounded-xl overflow-hidden'>
            <button className='w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors' onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              <span className='font-semibold text-gray-900 text-sm'>{faq.q}</span>
              <span className='text-emerald-600 text-lg shrink-0'>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className='px-5 pb-5 text-sm text-gray-600 leading-relaxed'>{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageEditorial() {
  return (
    <>
      <div className='max-w-6xl mx-auto px-4 mt-6 flex justify-center'>
        <div className='hidden sm:block'><AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} /></div>
        <div className='block sm:hidden'><AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} /></div>
      </div>
      <div className='max-w-6xl mx-auto px-4 mt-4 flex justify-center'>
        <AdSlot variant='leaderboard' slotId={SLOT_LEADERBOARD} className='hidden sm:flex' />
        <AdSlot variant='mediumrectangle' slotId={SLOT_LEADERBOARD} className='flex sm:hidden' />
      </div>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'><ShareBar /></div>
      <section id='how-to-use' className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10' aria-labelledby='how-to-use-heading'>
        <h2 id='how-to-use-heading' className='text-4xl font-bold text-gray-900 mb-4 text-center'>How to Use the Mortgage Calculator</h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>Enter your home price, down payment, interest rate, and loan term — the calculator shows your monthly payment, total interest, and a full amortisation schedule instantly.</p>
        <div className='space-y-6 mb-14'>
          {[
            { n: 1, title: "Enter home price and down payment", body: "Enter the purchase price of the home in the Home Price field. Adjust your down payment using either the dollar amount field or the percentage slider — the two are linked and update each other automatically. The loan amount (home price minus down payment) is shown in real time. A 20% down payment ($80,000 on a $400,000 home) is typically required to avoid PMI in the US.", enrich: <div className='bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed'><strong>Down payment impact:</strong> Try dragging the down payment slider from 5% to 20% and watching how the monthly payment and total interest change. A larger down payment reduces the loan principal, which reduces both the monthly payment and the total interest paid over the loan term — and eliminates PMI if you reach 20%.</div> },
            { n: 2, title: "Set the interest rate and loan term", body: "Enter the annual interest rate offered by your lender — even a 0.5% difference in rate has a significant impact over 30 years. Use the term buttons to select 10, 15, 20, 25, or 30 years, or type a custom term. Shorter terms have higher monthly payments but dramatically lower total interest. Compare the 15-year vs 30-year results to understand the trade-off between monthly cash flow and total loan cost.", enrich: <div className='bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed'><strong>Rate sensitivity:</strong> On a $320,000 loan, the difference between 6.0% and 7.0% is approximately $190/month and nearly $70,000 in total interest over 30 years. Check your lender's current rates and try both the offered rate and 0.25% lower to understand the value of negotiating or shopping around for a better rate.</div> },
            { n: 3, title: "Add property tax, insurance, and other costs", body: "The Additional Monthly Costs section lets you include property tax (usually quoted as an annual amount — divide by 12 for monthly), home insurance, PMI (if your down payment is under 20%), and HOA fees. These are added to your principal and interest payment to show your true total monthly housing cost. Many first-time buyers underestimate the impact of these additional costs.", enrich: <div className='bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed'><strong>Total cost of ownership:</strong> For a typical US home at $400,000, the principal and interest payment at 6.5% for 30 years is approximately $2,528/month — but when property tax ($400–$600/month), insurance ($100–$200/month), and PMI (if applicable, $100–$200/month) are included, the real monthly cost is often $3,100–$3,500/month. Always calculate with these included for a realistic affordability assessment.</div> },
            { n: 4, title: "Review the amortisation schedule", body: "Click 'Show full schedule' to see a complete month-by-month breakdown of every payment over the life of the loan. Each row shows the payment number, total payment, amount going to principal, amount going to interest, and remaining balance. The schedule is paginated in 24-month blocks. Use it to see when you'll reach 50% equity, how much you owe after a specific number of years, or to understand the long-term effect of the early interest-heavy payment structure.", enrich: <div className='bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed'><strong>Disclaimer:</strong> This calculator is for informational and planning purposes only. It provides estimates based on the inputs you enter and uses the standard fixed-rate amortisation formula. It does not account for rate changes (ARM loans), prepayment penalties, origination fees, closing costs, or tax considerations. Consult a licensed mortgage broker or financial advisor before making lending decisions.</div> },
          ].map(({ n, title, body, enrich }) => (
            <div key={n} className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center'>{n}</div>
              <div><h3 className='text-lg font-bold text-gray-900 mb-2'>{title}</h3><p className='text-gray-600 leading-relaxed mb-3'>{body}</p>{enrich}</div>
            </div>
          ))}
        </div>
        <FAQSection />
        <h3 className='text-2xl font-bold text-gray-900 mb-6'>Common use cases</h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14'>
          {[
            { emoji: "🏡", title: "First-time buyers", desc: "Understand what monthly payment you can afford before approaching lenders — calculate for multiple home price points to set a realistic budget." },
            { emoji: "📊", title: "Comparing loan offers", desc: "Enter the same home price and down payment with different rates and terms to compare total costs across multiple lender quotes side by side." },
            { emoji: "🔄", title: "Refinancing decisions", desc: "Calculate your new payment at a lower rate and compare to your current payment — see how quickly the monthly savings offset refinancing costs." },
            { emoji: "💡", title: "Down payment planning", desc: "Use the slider to see how different down payment amounts affect your monthly payment — set a savings target to hit a specific monthly payment goal." },
            { emoji: "📅", title: "Payoff planning", desc: "Use the amortisation schedule to see when your balance drops below key milestones — 80% LTV for PMI removal, 50% equity, full payoff." },
            { emoji: "🌍", title: "International buyers", desc: "Switch currency to GBP, EUR, CAD, AUD, or JPY to calculate mortgage costs for property purchases in different countries." },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>
        <div className='bg-gradient-to-br from-emerald-700 to-teal-800 rounded-2xl p-8 text-white text-center mb-14'>
          <p className='text-xs font-semibold text-emerald-200 uppercase tracking-widest mb-4'>Financial disclaimer</p>
          <h3 className='text-xl font-bold mb-3'>A 30-year mortgage pays roughly half the home price in interest alone — understanding this before committing is essential</h3>
          <p className='text-emerald-100 leading-relaxed max-w-xl mx-auto text-sm'>On a $400,000 home with 20% down ($320,000 loan) at 6.5% for 30 years, you'll pay approximately $688,000 total — the $320,000 loan plus approximately $368,000 in interest. The interest nearly equals the original loan. This isn't unusual — it's the cost of long-term borrowing. Understanding this number before signing helps buyers make informed decisions about term length, down payment size, and whether to make additional principal payments. This calculator provides estimates based on the standard fixed-rate amortisation formula and should not be used as the sole basis for a lending decision. Always consult a qualified mortgage broker or financial advisor before proceeding.</p>
        </div>
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>Related Free Finance Tools</h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              { href: "/tools/roi-calculator", label: "ROI Calculator", desc: "Calculate return on investment, annualised ROI, net profit, and return multiple for any investment." },
              { href: "/tools/percentage-calculator", label: "Percentage Calculator", desc: "Calculate percentages, percentage changes, and find what percentage one number is of another." },
              { href: "/tools/vat-calculator", label: "VAT Calculator", desc: "Add or remove VAT from any amount — supports custom rates for any country." },
            ].map((link) => (<a key={link.href} href={link.href} className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200 p-5' aria-label={`${link.label} — ${link.desc}`}><div className='font-bold text-gray-900 text-sm mb-1'>{link.label}</div><div className='text-xs text-gray-500'>{link.desc}</div></a>))}
          </div>
        </div>
      </section>
    </>
  );
}