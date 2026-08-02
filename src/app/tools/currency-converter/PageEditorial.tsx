"use client";
// src/app/tools/currency-converter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/currency-converter";
const TOOL_NAME = "Currency Converter";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#064e3b", light: "#ecfdf5" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-inner mb-5">
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
    "Free currency converter with live exchange rates — 30+ currencies, multi-currency comparison table, no signup",
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
                <span className="text-emerald-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FAQS = [
  {
    q: "How often are the exchange rates updated?",
    a: "This currency converter fetches live exchange rates from a public API. Rates are typically updated every few minutes to once per hour depending on the API provider, and reflect interbank mid-market rates — the midpoint between the buy and sell rates that banks use to trade with each other. These mid-market rates are the fairest reference rates and are what financial data services like Reuters and Bloomberg publish. They differ from the rates you'll actually receive when exchanging money: banks, currency exchange bureaus, and travel money services apply a spread (a margin added above the interbank rate) to generate profit, which means you'll always receive slightly less than the mid-market rate shown. The spread varies from under 1% at competitive online services to 5–10% at airport exchange kiosks.",
  },
  {
    q: "What is the difference between the mid-market rate and the rate I get from my bank?",
    a: "The mid-market rate (also called the interbank rate or spot rate) is the midpoint between the buy price and sell price at which banks trade currencies with each other in the wholesale forex market. This is the rate you see on this converter and on Google. When you exchange money through a bank, travel money service, or exchange bureau, they apply a markup (called a spread or margin) above the mid-market rate to make a profit. A high-street bank might offer USD/GBP at 0.76 when the mid-market rate is 0.80 — that's a 5% effective fee. Online services like Wise (TransferWise) and Revolut are known for rates very close to mid-market, often with a transparent flat fee. Airport kiosks can have spreads of 8–15%. Always compare the total cost including fees, not just the headline exchange rate.",
  },
  {
    q: "What currencies are included in this converter?",
    a: "This converter includes 30+ major and widely-traded world currencies: US Dollar (USD), Euro (EUR), British Pound (GBP), Japanese Yen (JPY), Canadian Dollar (CAD), Australian Dollar (AUD), Swiss Franc (CHF), Chinese Yuan Renminbi (CNY), Hong Kong Dollar (HKD), Singapore Dollar (SGD), Swedish Krona (SEK), Norwegian Krone (NOK), Danish Krone (DKK), Indian Rupee (INR), Mexican Peso (MXN), Brazilian Real (BRL), South African Rand (ZAR), Turkish Lira (TRY), South Korean Won (KRW), Russian Ruble (RUB), and others. These cover the most commonly needed conversions for international travel, business, and finance. For less common currencies, a dedicated forex service with a broader database would be required.",
  },
  {
    q: "What factors cause exchange rates to change?",
    a: "Exchange rates fluctuate continuously based on supply and demand in the global foreign exchange market, which trades over $7 trillion per day. The main factors driving rate changes include: interest rate differentials — currencies of countries with higher interest rates tend to strengthen as foreign investors move capital there for better returns; inflation — higher inflation erodes purchasing power and tends to weaken a currency; economic data releases — GDP growth, unemployment, manufacturing output, and trade balance data move rates as they update expectations for future interest rates; political events — elections, policy changes, geopolitical tensions, and sanctions create uncertainty that typically weakens a currency; central bank interventions — central banks occasionally buy or sell currency to influence rates; and market sentiment — risk-on periods strengthen emerging market currencies while risk-off periods strengthen safe havens like USD, CHF, and JPY.",
  },
  {
    q: "What is a reserve currency and why does the US dollar dominate?",
    a: "A reserve currency is one held in significant quantities by central banks and major institutions as part of their foreign exchange reserves, and used internationally for trade, debt, and financial transactions. The US dollar is the world's primary reserve currency, comprising approximately 58–60% of global foreign exchange reserves. This dominance stems from: the size and stability of the US economy; the depth and liquidity of US Treasury markets, which offer a safe store of value at scale; the widespread use of USD in commodity pricing (oil is priced in dollars globally, which means every country that imports oil needs dollars); and the network effect — because so much trade and finance is denominated in dollars, participants default to using it. The Euro is the second reserve currency at around 20%. China's Yuan (CNY) has been growing as a reserve currency but remains below 3% due to capital controls and limited convertibility.",
  },
  {
    q: "How do I get the best exchange rate when travelling?",
    a: "To get the best exchange rate when travelling: use a no-foreign-transaction-fee credit card for purchases where possible, as the card network rate (Visa/Mastercard) is very close to the mid-market rate with no added spread — cards like Charles Schwab, Wise, and Revolut are popular for this. Withdraw local currency from ATMs rather than exchanging cash — use your bank's ATMs or networks to minimise withdrawal fees, and always choose to be charged in local currency (decline the 'dynamic currency conversion' offer to pay in your home currency, which always uses an unfavourable rate). Avoid airport exchange kiosks, hotel exchanges, and currency exchange booths in tourist areas, which all have high spreads. If you must exchange cash, compare multiple options online before travelling — online services often offer significantly better rates with home delivery. Never exchange money at the airport if you can avoid it.",
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
              aria-expanded={open === i}            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-emerald-600 text-lg shrink-0">
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
          How to Use the Currency Converter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Select your from and to currencies, enter an amount, and get the live
          converted result — plus a comparison table showing your amount in all
          available currencies simultaneously.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Select the currencies to convert between",
              body: "Use the From currency dropdown to select the currency you're converting from, and the To dropdown for the currency you want to convert to. Both dropdowns show a flag emoji, currency code, and full currency name for easy identification. Over 30 currencies are available covering all major world currencies used for travel, business, and international finance. Use the swap button (⇄) to instantly reverse the conversion direction — the converted result becomes the new input.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Code
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Currency
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Region
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["USD", "US Dollar", "United States"],
                        ["EUR", "Euro", "Eurozone (20 countries)"],
                        ["GBP", "British Pound", "United Kingdom"],
                        ["JPY", "Japanese Yen", "Japan"],
                        ["CAD", "Canadian Dollar", "Canada"],
                        ["AUD", "Australian Dollar", "Australia"],
                        ["CHF", "Swiss Franc", "Switzerland"],
                        ["CNY", "Chinese Yuan", "China"],
                        ["INR", "Indian Rupee", "India"],
                        ["MXN", "Mexican Peso", "Mexico"],
                      ].map(([code, name, region]) => (
                        <tr key={code} className="hover:bg-emerald-50">
                          <td className="px-4 py-2 font-bold text-emerald-700 text-xs font-mono">
                            {code}
                          </td>
                          <td className="px-4 py-2 text-xs font-medium text-gray-900">
                            {name}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {region}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="px-4 py-2 text-xs text-gray-400 italic">
                    Plus 20+ more currencies — SEK, NOK, BRL, ZAR, KRW, SGD,
                    HKD, TRY, and others.
                  </p>
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter the amount to convert",
              body: "Type any amount into the input field. The conversion updates live as you type. Decimals are supported — you can enter precise amounts like 1,234.56. The result is shown in large text below the inputs, along with the exchange rate used (e.g. '1 USD = 0.9234 EUR') and the timestamp of when the rate was last fetched. The rate is a live mid-market rate from a public forex API.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Mid-market rate vs bank rate:</strong> The rate shown
                  is the mid-market (interbank) rate — the fairest reference
                  rate, used by Reuters, Bloomberg, and Google. When you
                  actually exchange money at a bank or bureau de change, they
                  apply a spread of 1–10% above this rate as their fee. Online
                  services like Wise and Revolut typically charge much less
                  (often under 1%) and are far more competitive than high-street
                  banks and airport kiosks for international transfers and
                  travel money.
                </div>
              ),
            },
            {
              n: 3,
              title: "Check the multi-currency comparison table",
              body: "Below the main converter, a comparison table shows your entered amount converted into all available currencies simultaneously. This is useful for quickly scanning what a budget or price looks like across multiple currencies — for example, seeing what $500 is worth in euros, pounds, yen, and Australian dollars all at once. Each row shows the currency flag, code, name, and converted amount. The table updates automatically when you change the amount or base currency.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Useful for travel budgeting:</strong> Before a trip,
                  enter your travel budget in your home currency and scan the
                  full table to see your purchasing power in local currency. For
                  a trip that spans multiple countries, you can quickly check
                  all relevant currencies at once without switching the
                  converter back and forth between pairs.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use the rate history context and swap feature",
              body: "The converter shows market context information alongside the current rate — this includes rate trend indicators and volatility notes where available from the API. Use the ⇄ swap button to reverse the direction: if you've converted USD to EUR, swapping converts EUR to USD at the same rate, with the result becoming the new input. This is useful for checking both directions of a conversion — for example, confirming both 'how many euros is $1,000' and 'how many dollars is €923'.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Exchange rate accuracy note:</strong> Rates are
                  fetched from a public API and are updated regularly. For large
                  transactions — international wire transfers, business
                  payments, or property purchases — always verify the current
                  rate directly with your bank or FX provider before
                  transacting. Exchange rates can move significantly within a
                  day, and the spread applied by providers can add meaningful
                  cost to large transfers.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "✈️",
              title: "Travel money planning",
              desc: "Calculate how much local currency your travel budget gives you — check purchasing power before booking trips or exchanging money.",
            },
            {
              emoji: "🛒",
              title: "International online shopping",
              desc: "Convert international prices to your home currency before purchasing — see exactly what you'll pay in dollars, pounds, or euros.",
            },
            {
              emoji: "💸",
              title: "International money transfers",
              desc: "Check the mid-market rate before sending money abroad — compare what your provider offers against the fair market rate.",
            },
            {
              emoji: "📊",
              title: "Business invoicing",
              desc: "Convert invoice amounts between currencies for international clients — quote prices in local currency or verify received payments.",
            },
            {
              emoji: "🏠",
              title: "Property abroad",
              desc: "Convert property prices in foreign currencies to understand the true cost in your home currency, accounting for current exchange rates.",
            },
            {
              emoji: "📈",
              title: "Forex reference",
              desc: "Check current mid-market rates as a reference when evaluating currency exchange offers from banks and money transfer services.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">💱</div>
          <h3 className="text-xl font-bold mb-3">
            The rate shown is the mid-market rate — always compare what your
            provider actually charges before a large transaction
          </h3>
          <p className="text-emerald-100 leading-relaxed max-w-xl mx-auto text-sm">
            The mid-market (interbank) rate is the fairest exchange rate
            available and is what you see on Google, Reuters, and this
            converter. However, no retail customer actually transacts at this
            rate — banks, card networks, and money transfer services all apply a
            markup (spread) above it. On a $10,000 transfer, a 2% spread costs
            $200; a 5% spread costs $500. Before sending money internationally,
            always check the full cost including fees and the actual exchange
            rate offered, compare multiple providers, and use specialist FX
            services (Wise, OFX, CurrencyFair) rather than high-street banks for
            significant transfers — the savings can be substantial.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Finance Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/unit-converter",
                label: "Unit Converter",
                desc: "Convert between 40+ units across length, weight, temperature, volume, speed, and time.",
              },
              {
                href: "/tools/percentage-calculator",
                label: "Percentage Calculator",
                desc: "Calculate percentages five ways — X% of Y, percentage change, increase/decrease by %, and more.",
              },
              {
                href: "/tools/tip-calculator",
                label: "Tip Calculator",
                desc: "Calculate tips and split bills for any restaurant or service — quick presets plus custom tip.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
