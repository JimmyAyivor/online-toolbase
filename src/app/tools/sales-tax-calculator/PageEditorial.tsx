"use client";
// src/app/tools/sales-tax-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/sales-tax-calculator";
const TOOL_NAME = "Sales Tax Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#4a044e", light: "#fdf4ff" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500'
        >
          ✕
        </button>
        <h3 className='text-lg font-black text-gray-900 mb-1'>
          Take it with you
        </h3>
        <p className='text-sm text-gray-400 mb-5'>
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-purple-100 shadow-inner mb-5'>
          <canvas ref={canvasRef} />
        </div>
        <p className='text-xs text-gray-300 font-mono break-all'>{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free sales tax calculator — calculate tax and final price by US state or custom rate, single item or multi-item cart, no signup",
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
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <p className='text-sm font-bold text-gray-900 mb-0.5'>
              Found this useful?
            </p>
            <p className='text-xs text-gray-400'>
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className='px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold'
            >
              {copied ? (
                <span className='text-purple-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const STATE_RATES = [
  [
    "Oregon, Montana, New Hampshire, Delaware, Alaska",
    "0%",
    "No state sales tax",
  ],
  ["Hawaii", "4.0%", "Lowest among taxing states (+ county surcharges)"],
  [
    "Wisconsin, Wyoming, Maine, Virginia",
    "5.0–5.3%",
    "Below-average rate states",
  ],
  ["Texas, Nevada, Washington", "6.25–6.5%", "Above-average state base rates"],
  ["California", "7.25%", "Highest state base rate in the US"],
  [
    "Tennessee, Arkansas, Louisiana",
    "9.5–9.6%",
    "Combined state+local among highest in the US",
  ],
];

const FAQS = [
  {
    q: "Which US states have no sales tax?",
    a: "Five US states have no statewide sales tax: Oregon, Montana, New Hampshire, Delaware, and Alaska. Alaska is a partial exception — it has no state sales tax, but many Alaskan boroughs and municipalities levy their own local sales taxes, so purchases in some Alaskan cities may still incur tax. New Hampshire taxes certain goods like cars, restaurant meals, and hotel rooms through separate specific taxes, but has no general sales tax. The other three states (Oregon, Montana, Delaware) have no sales tax at the state or local level. When shopping online, tax obligations depend on where the seller has nexus — not just the buyer's location — so online purchases from retailers with no presence in your state may still be technically subject to use tax, which most consumers don't pay in practice.",
  },
  {
    q: "What is the difference between sales tax and use tax?",
    a: "Sales tax is collected by a seller at the point of purchase and remitted to the state government — the buyer pays it as part of the transaction. Use tax is a complementary tax imposed on the buyer for purchases made without paying sales tax — for example, buying goods online from an out-of-state retailer that doesn't collect your state's sales tax, or buying goods in a state with no sales tax and bringing them to a state with sales tax. Legally, use tax exists to ensure that purchases not subject to sales tax are still taxed — effectively preventing tax arbitrage from shopping in tax-free states. In practice, individual use tax compliance is very low, though states have increasingly required marketplace facilitators (Amazon, eBay, Etsy) to collect and remit sales tax on behalf of third-party sellers.",
  },
  {
    q: "How is the sales tax rate calculated — state only or state plus local?",
    a: "Sales tax in the United States is typically a combination of the state rate plus any applicable county and city (local) rates. The state sets a base rate — for example, California's state rate is 7.25% — and local jurisdictions add their own on top. In California, some cities have combined rates as high as 10.75%. When this calculator shows a US state rate, it displays the state base rate. The actual combined rate including local taxes varies by city and county within the state, and changes frequently. For a precise rate, you should always verify with your state's department of revenue or the Avalara TaxRates tool. For most general budgeting and price estimation purposes, the state base rate gives a reasonable approximation.",
  },
  {
    q: "Is sales tax applied before or after discounts?",
    a: "Generally, sales tax is applied to the final discounted price — the price you actually pay — rather than the original list price. If an item is $100 and there's a 20% discount, you pay $80 for the item. Sales tax is then calculated on $80, not $100. This is the standard treatment in most US states: taxable price = selling price after discount. However, some states have specific rules for coupon types. Manufacturer coupons (issued by the product manufacturer, not the retailer) may be treated differently in some states, where tax is applied on the pre-coupon price because the retailer receives reimbursement from the manufacturer. Retailer-issued coupons and promotional discounts consistently reduce the taxable amount.",
  },
  {
    q: "What types of purchases are exempt from sales tax?",
    a: "Sales tax exemptions vary significantly by state, but several categories are commonly exempt. Food for home consumption (groceries) is exempt in 32 states, though prepared food (restaurant meals, hot deli items) is nearly always taxable. Prescription drugs are exempt in all states; over-the-counter medicines are exempt in many. Clothing is exempt in several states including Pennsylvania, New Jersey, and New York (below a per-item threshold). Medical devices and equipment are often exempt. Agricultural supplies and machinery used in production are typically exempt. Resale items purchased by a business for resale (not consumption) are exempt under a resale certificate. Many states have periodic sales tax holidays — typically for back-to-school items, clothing, or energy-efficient appliances — during which certain items are temporarily exempt.",
  },
  {
    q: "How does online sales tax work after the South Dakota v. Wayfair decision?",
    a: "Before 2018, online retailers were only required to collect sales tax in states where they had a physical presence (nexus) — a store, warehouse, or employee. The 2018 Supreme Court decision in South Dakota v. Wayfair changed this, allowing states to require out-of-state online sellers to collect and remit sales tax based on economic nexus — typically triggered when a seller has more than $100,000 in annual sales into a state or more than 200 transactions per year in that state. All 45 states with a sales tax have now enacted economic nexus laws. For consumers, this means that purchases from major online retailers like Amazon, Walmart, Target, and most other large e-commerce sites now include your state's applicable sales tax, collected at checkout. Small sellers below the economic nexus threshold may still not collect tax.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Frequently Asked Questions
      </h2>
      <div className='space-y-3'>
        {FAQS.map((f, i) => (
          <div
            key={i}
            className='border border-gray-100 rounded-xl overflow-hidden'
          >
            <button
              className='w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors'
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className='font-semibold text-gray-900 text-sm'>{f.q}</span>
              <span className='text-purple-600 text-lg shrink-0'>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className='px-5 pb-5 text-sm text-gray-600 leading-relaxed'>
                {f.a}
              </div>
            )}
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
        <div className='hidden sm:block'>
          <AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className='block sm:hidden'>
          <AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
      <div className='max-w-6xl mx-auto px-4 mt-4 flex justify-center'>
        <AdSlot
          variant='leaderboard'
          slotId={SLOT_LEADERBOARD}
          className='hidden sm:flex'
        />
        <AdSlot
          variant='mediumrectangle'
          slotId={SLOT_LEADERBOARD}
          className='flex sm:hidden'
        />
      </div>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
        <ShareBar />
      </div>

      <section
        id='how-to-use'
        className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'
      >
        <h2 className='text-4xl font-bold text-gray-900 mb-4 text-center'>
          How to Use the Sales Tax Calculator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Enter a price, pick your US state or type a custom rate, and instantly
          see the tax amount and total — switch to cart mode to add multiple
          items.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Choose single item or cart mode",
              body: "The calculator has two modes selectable at the top. Single Item mode calculates tax on one purchase — enter the price and tax rate to see the tax amount and total instantly. Cart mode lets you build a list of items with individual names and prices, then calculates the tax on the combined subtotal. Cart mode is useful for budgeting a shopping trip or verifying a receipt with multiple line items.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          State
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Rate
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {STATE_RATES.map(([state, rate, note]) => (
                        <tr key={state} className='hover:bg-purple-50'>
                          <td className='px-4 py-2 text-xs font-medium text-gray-900'>
                            {state}
                          </td>
                          <td className='px-4 py-2 text-xs font-bold text-purple-700'>
                            {rate}
                          </td>
                          <td className='px-4 py-2 text-xs text-gray-500'>
                            {note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className='px-4 py-2 text-xs text-gray-400 italic'>
                    State base rates only — combined rate including local taxes
                    may be higher. Rates change; verify with your state revenue
                    authority.
                  </p>
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter the price and select a tax rate",
              body: "In Single Item mode, type the price before tax into the price field. Then either click your US state from the state picker to auto-fill the state's base tax rate, or type a custom percentage into the Tax Rate field. The state picker shows the two-letter abbreviation and rate for all 50 states — click any state to apply that rate. You can override a state rate by typing a different value into the tax rate field at any time.",
              enrich: (
                <div className='bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed'>
                  <strong>Important:</strong> The state rates shown are the
                  statewide base rates. Your actual combined rate — including
                  county and city taxes — may be higher. For example,
                  California's state rate is 7.25%, but combined rates in some
                  cities reach 10.75%. For precise rates at a specific address,
                  use your state's Department of Revenue rate lookup tool. For
                  most budgeting purposes, the state base rate is a useful
                  approximation.
                </div>
              ),
            },
            {
              n: 3,
              title: "Read the tax amount and total price",
              body: "The result panel shows three values: Before Tax (the price you entered), Tax Amount (the calculated sales tax), and Total Price (the amount you'd actually pay). In Cart mode, the result shows the cart subtotal, tax on the full subtotal, and grand total, with a breakdown listing each item and its individual tax contribution. All results update instantly as you change the price or rate.",
              enrich: (
                <div className='bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed'>
                  <strong>Back-calculating the pre-tax price:</strong> If you
                  know the total price and the tax rate but want the pre-tax
                  amount (useful when a price tag shows the tax-inclusive
                  total), divide the total by (1 + rate/100). For example, if
                  you paid $53.50 and the tax rate is 7%: $53.50 ÷ 1.07 = $50.00
                  pre-tax, with $3.50 in tax. This reverse calculation is common
                  in VAT countries where prices are displayed tax-inclusive.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use cart mode for shopping trips",
              body: "Switch to Cart mode using the mode selector at the top. Enter an item name and price, then click the plus (+) button or press Enter to add it to the cart. Items appear in the list below with their individual tax amounts. Add as many items as needed — the running subtotal, tax, and total update with each addition. Remove individual items with the trash icon. This mode is particularly useful for budgeting a grocery run, comparing prices across multiple purchases, or checking a receipt.",
              enrich: (
                <div className='bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed'>
                  <strong>Cart mode tip:</strong> The tax rate set at the top
                  applies to all items in the cart equally. If some items in
                  your cart have different tax rates (for example, groceries are
                  exempt and clothing is taxed in some states), calculate the
                  taxable and non-taxable items separately using two cart
                  sessions, or use the single-item mode for each item type and
                  add the results manually.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white font-black text-lg flex items-center justify-center'>
                {n}
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  {title}
                </h3>
                <p className='text-gray-600 leading-relaxed mb-3'>{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
          Common use cases
        </h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14'>
          {[
            {
              emoji: "🛒",
              title: "Shopping budgeting",
              desc: "Estimate the final total for a shopping trip — add multiple items and see exactly how much you'll pay including tax.",
            },
            {
              emoji: "🛍️",
              title: "Retail price comparison",
              desc: "Compare the true all-in price of items across different states, where the price gap after tax may differ from the pre-tax price.",
            },
            {
              emoji: "📦",
              title: "E-commerce purchases",
              desc: "Verify the sales tax on an online order — check if the rate applied at checkout matches your state's rate.",
            },
            {
              emoji: "📋",
              title: "Receipt verification",
              desc: "Check that the tax on a receipt is correct — enter the subtotal and state to confirm the store charged the right amount.",
            },
            {
              emoji: "💼",
              title: "Business expense reporting",
              desc: "Calculate the tax component of a business purchase for expense reporting — separate the pre-tax cost from the tax paid.",
            },
            {
              emoji: "🏠",
              title: "Large purchase planning",
              desc: "Plan for the tax cost on major purchases like furniture, electronics, or appliances before visiting the store.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-purple-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>⚖️</div>
          <h3 className='text-xl font-bold mb-3'>
            State base rates are just the starting point — your combined rate
            including local taxes may be significantly higher
          </h3>
          <p className='text-purple-100 leading-relaxed max-w-xl mx-auto text-sm'>
            The United States has thousands of distinct sales tax jurisdictions
            — states, counties, cities, and special districts can all layer
            their own rates on top of each other. The combined state-plus-local
            rate in the highest-tax cities can exceed 10%, even in states with
            moderate base rates. Tennessee's state rate is 7%, but combined
            rates in Memphis can reach 9.75%. California's 7.25% base becomes as
            high as 10.75% in parts of Los Angeles County. Always check the
            combined rate for your specific location when making large purchases
            or budgeting for a business operating in multiple locations.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Calculator Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/tip-calculator",
                label: "Tip Calculator",
                desc: "Calculate tips and split bills for any restaurant or service — preset percentages plus custom tip.",
              },
              {
                href: "/tools/percentage-calculator",
                label: "Percentage Calculator",
                desc: "Calculate percentages five ways — find X% of a number, percentage change, and more.",
              },
              {
                href: "/tools/discount-calculator",
                label: "Discount Calculator",
                desc: "Calculate discounted prices and savings for any sale or promotion — fixed or percentage discount.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-purple-200 hover:-translate-y-1 transition-all duration-200 p-5'
              >
                <div className='font-bold text-gray-900 text-sm mb-1'>
                  {label}
                </div>
                <div className='text-xs text-gray-500'>{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
