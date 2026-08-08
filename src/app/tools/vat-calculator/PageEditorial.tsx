"use client";
// src/app/tools/vat-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/vat-calculator";
const TOOL_NAME = "VAT Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e1b4b", light: "#eef2ff" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
        >
          ✕
        </button>
        <h3 className="text-lg font-black text-gray-900 mb-1">
          Take it with you
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5">
          <canvas ref={canvasRef} />
        </div>
        <p className="text-xs text-gray-300 font-mono break-all">{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free VAT calculator — add or remove VAT from any price. UK 20%, 5%, or custom rate. Shows full net/VAT/gross breakdown. No signup.",
  );
  const shareUrl = encodeURIComponent(TOOL_URL);
  const copyLink = () => {
    navigator.clipboard.writeText(TOOL_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const SHARES = [
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      bg: "bg-black hover:bg-gray-800",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
    },
  ];
  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">
              Found this useful?
            </p>
            <p className="text-xs text-gray-400">
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
            >
              {copied ? (
                <span className="text-indigo-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const UK_VAT_RATES = [
  [
    "20%",
    "Standard rate",
    "Most goods and services — the default rate that applies unless a reduced or zero rate specifically applies.",
  ],
  [
    "5%",
    "Reduced rate",
    "Home energy (gas, electricity), children's car seats, contraceptive products, mobility aids, some renovation work.",
  ],
  [
    "0%",
    "Zero rate",
    "Most food (not restaurant meals), children's clothing, books and newspapers, public transport fares, prescription medicines.",
  ],
  [
    "Exempt",
    "VAT exempt",
    "Financial services, insurance, education, health services — VAT is not charged but cannot be reclaimed on costs.",
  ],
];

const FAQS = [
  {
    q: "How do you add VAT to a price?",
    a: "To add VAT to a net (ex-VAT) price, multiply the net amount by (1 + VAT rate as a decimal). For the UK standard rate of 20%: multiply by 1.20. For example, a net price of £100 + 20% VAT = £100 × 1.20 = £120 gross. The VAT amount alone is the net price multiplied by the rate: £100 × 0.20 = £20. The formula is: Gross = Net × (1 + rate/100). This tool calculates this instantly when you select 'Add VAT' mode — enter your net amount and select or type your VAT rate.",
  },
  {
    q: "How do you remove VAT from a price (reverse VAT calculation)?",
    a: "To remove VAT from a gross (VAT-inclusive) price, divide the gross amount by (1 + VAT rate as a decimal). For 20% VAT: divide by 1.20. For example, a gross price of £120 ÷ 1.20 = £100 net. The VAT amount is the gross minus the net: £120 − £100 = £20. The formula is: Net = Gross ÷ (1 + rate/100). A common mistake is to simply subtract 20% from the gross, which gives the wrong answer (£120 − £20 = £100 happens to work for 20% because the percentages coincide, but this approach fails for other rates — for 5% VAT, subtracting 5% from gross gives the wrong net). Always use the division formula for reverse VAT calculations.",
  },
  {
    q: "What are the current UK VAT rates?",
    a: "The UK has three main VAT rates. The standard rate is 20%, which applies to most goods and services — including electronics, adult clothing, restaurant meals, hotel rooms, and most professional services. The reduced rate of 5% applies to specific categories including domestic gas and electricity, children's car seats, contraceptive products, mobility aids for elderly or disabled people, and some residential renovation and conversion work. The zero rate (0%) means VAT is charged at 0% but the supply is still technically VATable — this applies to most food (excluding restaurant meals and hot takeaway food), children's clothing and footwear, books and newspapers, prescription medicines, and most public transport fares. Some goods and services are VAT exempt entirely (no VAT is charged and VAT on related costs cannot be reclaimed) — these include financial services, insurance, health services, and education.",
  },
  {
    q: "What is the difference between VAT-exempt and zero-rated?",
    a: "Both zero-rated and VAT-exempt items are sold without VAT being charged to the customer, but they differ in their VAT treatment for the business. Zero-rated supplies are technically within the VAT system — businesses that sell zero-rated goods can still register for VAT and reclaim VAT on their costs (inputs). For example, a bakery selling bread (zero-rated) can reclaim VAT on the ingredients, equipment, and utilities it purchases. VAT-exempt supplies are outside the VAT system — businesses whose supplies are wholly exempt do not charge VAT but also cannot reclaim VAT on their costs. For example, a dentist providing exempt healthcare services cannot reclaim VAT on equipment purchases. Businesses with a mix of exempt and taxable supplies (including zero-rated) can only reclaim a portion of their input VAT, calculated by the partial exemption rules.",
  },
  {
    q: "When do I need to register for VAT in the UK?",
    a: "In the UK, VAT registration becomes compulsory when your taxable turnover exceeds £90,000 in any rolling 12-month period (as of 2024 — this threshold changes periodically). Taxable turnover includes standard-rated (20%) and reduced-rate (5%) and zero-rated (0%) sales, but not exempt sales. Once you exceed the threshold, you must register within 30 days. You can also register voluntarily if your taxable turnover is below the threshold — this is often beneficial if you sell to VAT-registered businesses (they can reclaim the VAT you charge, so it doesn't affect them) and you incur significant VAT costs on your own purchases that you want to reclaim. Note that this tool provides calculation guidance only — for specific VAT registration or accounting advice, consult a qualified accountant or HMRC directly.",
  },
  {
    q: "What is VAT and how does it work?",
    a: "VAT (Value Added Tax) is a consumption tax charged on the sale of goods and services at each stage of the supply chain. Unlike a simple sales tax (which is only charged at the point of final sale), VAT is charged at each stage of production and distribution — but businesses registered for VAT can reclaim the VAT they pay on their own purchases (input VAT), so they only pay VAT on the value they add. The end consumer — who cannot reclaim VAT — ultimately bears the full VAT cost. For example, a manufacturer charges VAT on goods sold to a retailer (who reclaims it), and the retailer charges VAT on goods sold to the consumer (who pays it and cannot reclaim it). The government collects the net VAT at each stage, which cumulatively adds up to the consumer's VAT payment.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-indigo-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            <div
              className="px-5 text-sm text-gray-600 leading-relaxed overflow-hidden transition-all duration-200"
              style={{
                maxHeight: open === i ? "1000px" : "0px",
                paddingBottom: open === i ? "20px" : "0px",
                visibility: open === i ? "visible" : "hidden",
              }}
              aria-hidden={open !== i}
            >
              {f.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageEditorial() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-center">
        <div className="hidden sm:block">
          <AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className="block sm:hidden">
          <AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-4 flex justify-center">
        <AdSlot
          variant="leaderboard"
          slotId={SLOT_LEADERBOARD}
          className="hidden sm:flex"
        />
        <AdSlot
          variant="mediumrectangle"
          slotId={SLOT_LEADERBOARD}
          className="flex sm:hidden"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ShareBar />
      </div>

      <section
        id="how-to-use"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How to Use the VAT Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Select Add or Remove VAT, enter your price, choose a rate, and get the
          net amount, VAT amount, and gross total instantly.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose Add VAT or Remove VAT",
              body: "'Add VAT' (net to gross) calculates the VAT-inclusive total from a net (ex-VAT) price — use this when you have a price excluding VAT and need the amount to charge or pay. 'Remove VAT' (gross to net) extracts the net price and VAT amount from a VAT-inclusive total — use this when you have a receipt total and need to know how much VAT was included.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Mode
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Formula
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          When to use
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Add VAT",
                          "Gross = Net × (1 + rate/100)",
                          "You have an ex-VAT price and need the VAT-inclusive total",
                        ],
                        [
                          "Remove VAT",
                          "Net = Gross ÷ (1 + rate/100)",
                          "You have a VAT-inclusive total and need the net amount and VAT",
                        ],
                      ].map(([mode, formula, use]) => (
                        <tr key={mode} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-bold text-indigo-700 text-xs whitespace-nowrap">
                            {mode}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-gray-700">
                            {formula}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {use}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your amount",
              body: "Type the price into the amount field. For 'Add VAT' mode, enter the net (ex-VAT) price. For 'Remove VAT' mode, enter the gross (VAT-inclusive) total. The field accepts decimal values — enter prices in the format 999.99.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Which price to enter:</strong> If you're quoting a
                  customer and your price list shows ex-VAT prices, use Add VAT.
                  If you have a receipt or invoice showing a total that includes
                  VAT and need to know the net cost for accounting or expense
                  claims, use Remove VAT.
                </div>
              ),
            },
            {
              n: 3,
              title: "Select your VAT rate",
              body: "Click one of the preset rate buttons (5%, 10%, 15%, 20%, 21%, 23%, 25%) or type any custom rate into the custom rate field. The custom field overrides the preset buttons. For UK businesses, the standard rate is 20% and the reduced rate is 5%. For EU countries, standard rates typically range from 17% to 27%.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          UK Rate
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Rate name
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          What it covers
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {UK_VAT_RATES.map(([rate, name, desc]) => (
                        <tr key={rate} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-bold text-indigo-700 text-xs whitespace-nowrap">
                            {rate}
                          </td>
                          <td className="px-4 py-2 font-semibold text-gray-900 text-xs">
                            {name}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Read the breakdown",
              body: "The results panel shows three values: Net Amount (the price excluding VAT), VAT Amount (the tax portion at your chosen rate), and Gross Amount (the total including VAT). The value you entered is highlighted — the other two are the calculated outputs. These three values always sum correctly: Net + VAT = Gross.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>For invoicing:</strong> When issuing a VAT invoice,
                  you must show the net amount, the VAT rate, the VAT amount,
                  and the gross total as separate line items. This tool gives
                  you all four figures — copy them directly onto your invoice.
                  UK VAT invoices must also show your VAT registration number.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                {n}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common use cases
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "🧾",
              title: "Invoicing clients",
              desc: "Calculate the VAT to add to your net price for client invoices — shows the exact VAT amount and gross total to include.",
            },
            {
              emoji: "🛒",
              title: "Checking receipts",
              desc: "Remove VAT from a receipt total to find the net cost — useful for expense claims where you need to separate VAT from the cost.",
            },
            {
              emoji: "📊",
              title: "Bookkeeping and accounts",
              desc: "Quickly separate net and VAT amounts from mixed totals for accurate bookkeeping entries and VAT return completion.",
            },
            {
              emoji: "💰",
              title: "Price quoting",
              desc: "Convert your ex-VAT list prices to VAT-inclusive prices for customer quotes — or display both clearly on quotes.",
            },
            {
              emoji: "🏗️",
              title: "Tradespeople and contractors",
              desc: "Add 20% VAT to labour and materials costs to produce the correct customer-facing quote total.",
            },
            {
              emoji: "🌍",
              title: "EU and international rates",
              desc: "Use custom rate mode to calculate VAT at any European or international rate — enter 21%, 23%, 25%, or any other rate.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🧾</div>
          <h3 className="text-xl font-bold mb-3">
            Removing VAT is not the same as subtracting the VAT percentage — use
            the correct reverse formula
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            A common mistake when working with VAT-inclusive prices is to simply
            subtract the VAT rate percentage from the gross total. For 20% VAT,
            this appears to work by coincidence (£120 − £120×20% = £96, not
            £100), but the correct reverse calculation is to divide the gross by
            1.20, giving £100. For other rates — 5%, 15%, 23% — the subtraction
            method gives significantly wrong answers. The correct formula for
            any rate is: Net = Gross ÷ (1 + rate/100). This calculator uses the
            correct formula in both modes.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Calculator Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/sales-tax-calculator",
                label: "Sales Tax Calculator",
                desc: "Calculate US sales tax — add or remove tax from a price using any state or local rate.",
              },
              {
                href: "/tools/discount-calculator",
                label: "Discount Calculator",
                desc: "Calculate discounted prices — enter original price and discount percentage to find the sale price.",
              },
              {
                href: "/tools/invoice-generator",
                label: "Invoice Generator",
                desc: "Create professional invoices with itemised billing, automatic totals, and PDF download.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
              >
                <div className="font-bold text-gray-900 text-sm mb-1">
                  {label}
                </div>
                <div className="text-xs text-gray-500">{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
