"use client";
// src/app/tools/discount-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/discount-calculator";
const TOOL_NAME = "Discount Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7f1d1d", light: "#fff7ed" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-red-100 shadow-inner mb-5">
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
    "Free discount calculator — calculate sale price, savings, stacked discounts, and more instantly. No signup.",
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
                <span className="text-red-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How do I calculate a percentage discount?",
    a: "To find the discounted price after a percentage discount, multiply the original price by (1 − discount/100). For example, a 30% discount on $80: $80 × (1 − 0.30) = $80 × 0.70 = $56. The amount saved is the original price minus the discounted price: $80 − $56 = $24. Equivalently, calculate the discount amount first — 30% of $80 = $24 — then subtract from the original price: $80 − $24 = $56. The multiplier method is faster for repeated calculations: multiply by 0.70 for 30% off, 0.75 for 25% off, 0.80 for 20% off, 0.85 for 15% off, 0.90 for 10% off.",
  },
  {
    q: "How do stacked discounts work — is '20% off + an extra 10% off' the same as 30% off?",
    a: "No — stacked discounts are not additive. A 20% discount followed by an additional 10% discount results in a 28% total discount, not 30%. Here's why: the second discount is applied to the already-reduced price, not the original. Starting at $100: apply 20% off → $80. Then apply 10% off on $80 → $72. Total discount: $28, which is 28% off the original $100. The formula for stacked discounts is: Effective discount = 1 − ((1 − d1/100) × (1 − d2/100)). For 20% + 10%: 1 − (0.80 × 0.90) = 1 − 0.72 = 0.28 = 28%. This is why retailers often advertise two discounts separately rather than combining them — the stated numbers look larger than the effective discount.",
  },
  {
    q: "How do I find the original price if I only know the sale price and discount percentage?",
    a: "To find the original price from the sale price and discount percentage, divide the sale price by (1 − discount/100). For example, if an item is on sale for $63 after a 30% discount: Original price = $63 ÷ (1 − 0.30) = $63 ÷ 0.70 = $90. Verification: 30% off $90 = $27 discount, $90 − $27 = $63. This reverse calculation is useful when a price tag shows the sale price and the discount percentage but not the original price — common in clearance sales where original prices are removed.",
  },
  {
    q: "Is sales tax calculated on the original price or the discounted price?",
    a: "Sales tax is applied to the final sale price after the discount has been applied — not on the original pre-discount price. If an item is $100 with a 20% discount and 8% sales tax, the calculation is: Discounted price = $100 × 0.80 = $80. Sales tax = $80 × 0.08 = $6.40. Total paid = $80 + $6.40 = $86.40. The exception applies to manufacturer coupons in some US states, where the state may require tax on the pre-coupon price because the retailer is reimbursed by the manufacturer. For retailer-issued discounts and promotional sales, tax is always on the discounted price.",
  },
  {
    q: "How do I calculate what percentage off a sale price is?",
    a: "To find the discount percentage when you know the original and sale price, use: Discount % = ((Original Price − Sale Price) ÷ Original Price) × 100. For example, an item originally $120 now selling for $84: ((120 − 84) ÷ 120) × 100 = (36 ÷ 120) × 100 = 30% off. This is the 'Find Discount %' mode in this calculator — enter the original and sale prices and it calculates the discount percentage automatically. This calculation is useful for comparing across different products or stores to determine which sale offers the best effective discount.",
  },
  {
    q: "What is the difference between a discount and a markdown?",
    a: "In retail, these terms are often used interchangeably by consumers but have distinct meanings in accounting and merchandising. A discount is a price reduction offered to a specific customer or under specific conditions — volume discounts, loyalty discounts, coupon discounts, or trade discounts given to wholesale buyers. A markdown is a permanent or semi-permanent reduction in the retail selling price of an item, typically applied to slow-moving inventory or at end-of-season. Markdowns are a cost to the retailer because they reduce the margin on goods already purchased at wholesale. Discounts can be more targeted and temporary. From a consumer calculation standpoint, both work identically — you pay less than the listed price.",
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
              <span className="text-red-600 text-lg shrink-0">
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
          How to Use the Discount Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter the original price and discount amount or percentage — or stack
          two discounts — and see the final price, savings, and effective
          discount instantly.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter the original price",
              body: "Type the original (pre-discount) price into the Original Price field. The dollar symbol is shown as a fixed prefix. Enter the full retail price before any discounts are applied — this is typically the listed price, the 'was' price on a sale tag, or the MSRP. The calculator updates all results live as you type.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Original
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          10% off
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          20% off
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          30% off
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          50% off
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["$25", "$22.50", "$20.00", "$17.50", "$12.50"],
                        ["$50", "$45.00", "$40.00", "$35.00", "$25.00"],
                        ["$100", "$90.00", "$80.00", "$70.00", "$50.00"],
                        ["$250", "$225.00", "$200.00", "$175.00", "$125.00"],
                        ["$1,000", "$900.00", "$800.00", "$700.00", "$500.00"],
                      ].map(([orig, ...prices]) => (
                        <tr key={orig} className="hover:bg-red-50">
                          <td className="px-4 py-2 font-bold text-gray-900 text-xs">
                            {orig}
                          </td>
                          {prices.map((p, i) => (
                            <td
                              key={i}
                              className="px-4 py-2 text-xs text-gray-600 font-mono"
                            >
                              {p}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 2,
              title: "Select percentage or fixed discount and enter the amount",
              body: "Use the Percentage / Fixed Amount toggle to choose your discount type. In Percentage mode, select from the quick-preset buttons (5%, 10%, 15%, 20%, 25%, 30%, 40%, 50%) or type any percentage in the custom field. In Fixed Amount mode, enter the exact dollar amount being deducted — useful for store coupons, cashback offers, or promotional credits. The quick-preset buttons only appear in Percentage mode.",
              enrich: (
                <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                  <strong>Mental maths for quick discounts:</strong> 10% off =
                  move the decimal left one place ($80 → $8 off → $72). 20% off
                  = double the 10% amount ($8 × 2 = $16 off → $64). 25% off =
                  divide by 4 ($80 ÷ 4 = $20 off → $60). 50% off = divide by 2
                  ($80 ÷ 2 = $40). 15% off = 10% + half of 10% ($8 + $4 = $12
                  off → $68).
                </div>
              ),
            },
            {
              n: 3,
              title: "Optionally add a second discount or sales tax",
              body: "Expand the Advanced Options panel to add a second stacked discount (applied on top of the first) or add sales tax to the final discounted price. The stacked discount field lets you enter a second percentage off — the calculator shows both the intermediate price after the first discount and the final price after both. Important: stacked discounts are not additive. A 20% + 10% discount is 28% off, not 30% — the tool shows the effective combined discount percentage.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Why stacked discounts aren't additive:</strong> When
                  you apply a 20% discount, the price drops to 80% of original.
                  A further 10% is then taken off the new lower price — 10% of
                  80% = 8% of original. Total discount: 20% + 8% = 28%, not 30%.
                  The formula: Effective % = 1 − ((1 − d1/100) × (1 − d2/100)).
                  For 20% + 10%: 1 − (0.80 × 0.90) = 0.28 = 28% off.
                </div>
              ),
            },
            {
              n: 4,
              title: "Read the final price and savings summary",
              body: "The results panel shows the original price, discount amount, and final discounted price in a clear breakdown. The savings amount is shown in a green badge for easy scanning. If you added a second discount or sales tax, the panel shows each step: price after first discount, price after second discount, tax amount, and final total. The effective discount percentage is displayed alongside the final price — useful for comparing deals with different discount structures.",
              enrich: (
                <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                  <strong>Finding the original price from a sale price:</strong>{" "}
                  If you know the sale price and the discount percentage but not
                  the original, divide the sale price by (1 − discount%). For
                  example, $63 after 30% off: $63 ÷ 0.70 = $90 original. Use the
                  'Find Discount %' mode in the Advanced Options to work
                  backwards from any original and sale price pair.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🛍️",
              title: "Retail sales and clearance",
              desc: "Calculate the final price during a sale — enter the original price and the advertised % off to see exactly what you'll pay.",
            },
            {
              emoji: "🎟️",
              title: "Coupon and promo codes",
              desc: "Calculate the effect of a coupon on a purchase — use fixed amount mode for dollar-off coupons and percentage mode for % off.",
            },
            {
              emoji: "📦",
              title: "Bulk and volume discounts",
              desc: "Evaluate stacked bulk discounts — apply a trade discount first, then a volume discount on top, to find the effective price.",
            },
            {
              emoji: "🏷️",
              title: "Price comparison shopping",
              desc: "Compare two items with different original prices and discount percentages — check which deal gives the lower final price.",
            },
            {
              emoji: "💳",
              title: "Cashback and rebates",
              desc: "Calculate the effective price after cashback — use fixed discount mode to subtract the rebate amount from the purchase price.",
            },
            {
              emoji: "🏪",
              title: "Retail pricing strategy",
              desc: "Work backwards from a target sale price to find the required discount percentage, or verify the effective margin after promotions.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-red-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🏷️</div>
          <h3 className="text-xl font-bold mb-3">
            Two stacked discounts of X% and Y% are not the same as a single
            discount of (X+Y)%
          </h3>
          <p className="text-red-100 leading-relaxed max-w-xl mx-auto text-sm">
            When a retailer advertises "20% off, plus an extra 10% off at
            checkout", the combined saving is 28%, not 30%. The second discount
            applies to the already-reduced price. Retailers sometimes present
            stacked discounts this way intentionally — the two numbers (20 + 10)
            look more impressive than a single 28% discount, even though the
            saving is smaller than customers might assume. For any two stacked
            discounts d1 and d2, the effective combined discount is: 100% −
            ((100% − d1) × (100% − d2) / 100). Always calculate the effective
            discount before comparing deals.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Calculator Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/percentage-calculator",
                label: "Percentage Calculator",
                desc: "Calculate percentages five ways — X% of Y, percentage change, increase/decrease by %, and what % is X of Y.",
              },
              {
                href: "/tools/sales-tax-calculator",
                label: "Sales Tax Calculator",
                desc: "Calculate sales tax and final price by US state or custom rate — single item or multi-item cart.",
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
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-red-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
