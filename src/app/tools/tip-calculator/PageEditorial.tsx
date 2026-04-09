"use client";
// src/app/tools/tip-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/tip-calculator";
const TOOL_NAME = "Tip Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#14532d", light: "#f0fdf4" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-green-100 shadow-inner mb-5">
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
    "Free tip calculator — calculate tips and split bills instantly, quick presets plus custom tip, per-person breakdown, no signup",
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
                <span className="text-green-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How is a tip calculated?",
    a: "A tip is calculated by multiplying the pre-tax bill amount by the tip percentage. For example, a 20% tip on a $45.00 bill is calculated as $45.00 × 0.20 = $9.00. The total amount due is the bill plus the tip: $45.00 + $9.00 = $54.00. To split the total between multiple people, divide the total by the number of diners: $54.00 ÷ 3 people = $18.00 per person. This calculator does all of this arithmetic automatically — enter the bill amount, select a tip percentage, and set the number of people to see the instant breakdown.",
  },
  {
    q: "Should I tip on the pre-tax or post-tax total?",
    a: "Tipping convention in the United States is to tip on the pre-tax subtotal, not the post-tax total. The service you received was not affected by the tax rate in your jurisdiction. However, tipping on the post-tax total is common enough that it's considered acceptable, and many people find it simpler to calculate a percentage of the final bill shown on the receipt. The difference is typically small: on a $50 bill with 8% sales tax, tipping 20% pre-tax gives $10.00, while tipping 20% post-tax gives $10.80. In countries where service charges are included or where tipping is less expected (UK, Japan, Australia), the convention varies significantly from US practices.",
  },
  {
    q: "How much should I tip at a restaurant?",
    a: "In the United States, standard restaurant tipping ranges from 15% for adequate service to 20–25% for good to excellent service. As a general guide: 10% is considered below standard and typically indicates genuine dissatisfaction with the service (not the food); 15% is the traditional baseline for satisfactory service; 18% is a common midpoint for good service; 20% has become the de facto standard tip in many US cities and is the most commonly expected amount; 25% or more is appropriate for exceptional service or special occasions. Remember that servers often share tips with bussers, food runners, and bartenders, so the full percentage may not go directly to your server.",
  },
  {
    q: "How do I split a bill unevenly between people?",
    a: "This calculator splits the bill evenly — each person pays an equal share of the total including tip. For uneven splits (where different people ordered different amounts), you would need to calculate each person's share individually: multiply each person's subtotal by the tip percentage to get their tip, then add the two together. For example, if Person A ordered $30 and Person B ordered $60, and you're tipping 20%, Person A pays $30 + $6 = $36 and Person B pays $60 + $12 = $72. Many people simplify this by rounding up slightly and having the group decide on a fair allocation — apps like Splitwise are designed specifically for complex uneven bill splitting.",
  },
  {
    q: "Is the tip included if there's already a service charge?",
    a: "Some restaurants — particularly for large groups (typically 6 or more people) — automatically add a gratuity or service charge, usually 18–20%, directly to the bill. This is labelled as 'auto-gratuity', 'service charge', or 'gratuity' on the receipt. If this is already included, you do not need to add an additional tip, though you may choose to add a small extra amount for exceptional service. Always check your receipt carefully before adding a tip — paying an auto-gratuity plus a manual tip means double-tipping, which is common but not expected.",
  },
  {
    q: "What are typical tip amounts for services other than restaurants?",
    a: "Tipping expectations vary widely by service type. Hair stylists and barbers: 15–20% of the service cost. Taxi and rideshare drivers: 15–20% of the fare, though many apps prompt this automatically. Hotel housekeeping: $2–5 per night, left each day rather than at checkout. Food delivery: 15–20% of the order total, with a minimum of $3–5 for small orders given the distance and time involved. Bartenders: $1–2 per drink at a bar, or 15–20% on a tab. Movers: $20–50 per mover for a half-day, $50–100 per mover for a full day. Tattoo artists: 15–25% of the service cost. Spa services: 15–20% of the service cost.",
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
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-green-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
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
          How to Use the Tip Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter the bill amount, pick a tip percentage, and set the number of
          people — the tip amount, total, and per-person breakdown update
          instantly.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter the bill amount",
              body: "Type the pre-tax subtotal from your restaurant bill, receipt, or invoice into the Bill Amount field. Use the amount before tax and before any automatic service charges that may already be included. The calculator updates all results live as you type — no need to click a button. The dollar ($) symbol is fixed as the currency indicator.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Bill
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          15% tip
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          18% tip
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          20% tip
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          25% tip
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["$20.00", "$3.00", "$3.60", "$4.00", "$5.00"],
                        ["$45.00", "$6.75", "$8.10", "$9.00", "$11.25"],
                        ["$80.00", "$12.00", "$14.40", "$16.00", "$20.00"],
                        ["$120.00", "$18.00", "$21.60", "$24.00", "$30.00"],
                        ["$200.00", "$30.00", "$36.00", "$40.00", "$50.00"],
                      ].map(([bill, ...tips]) => (
                        <tr key={bill} className="hover:bg-green-50">
                          <td className="px-4 py-2 font-bold text-gray-900 text-xs">
                            {bill}
                          </td>
                          {tips.map((t, i) => (
                            <td
                              key={i}
                              className="px-4 py-2 text-xs text-gray-600 font-mono"
                            >
                              {t}
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
              title: "Select a tip percentage",
              body: "Click one of the five quick-select preset buttons: 10%, 15%, 18%, 20%, or 25%. The selected button highlights in green and all results update instantly. If you need a percentage not covered by the presets — for example, 22% for a delivery order or 30% for outstanding service — type any number into the Custom tip % field. Entering a custom value deselects the preset buttons. The active tip percentage is shown in the label above the preset row.",
              enrich: (
                <div className="bg-green-50 rounded-xl px-5 py-4 text-sm text-green-800 leading-relaxed">
                  <strong>Quick tip mental maths:</strong> To calculate 20%
                  without a calculator, divide the bill by 10 (move the decimal
                  one place left) and then double it. For a $45 bill: $45 ÷ 10 =
                  $4.50 × 2 = $9.00 tip. For 15%, take the 10% amount and add
                  half: $4.50 + $2.25 = $6.75. For 25%, take the 10% amount and
                  multiply by 2.5: $4.50 × 2.5 = $11.25.
                </div>
              ),
            },
            {
              n: 3,
              title: "Set the number of people",
              body: "Type the number of diners into the Number of People field or drag the slider to set a value from 1 to 20. When more than one person is set, a split panel appears in the Bill Summary showing each person's share of the bill, tip, and total separately. This even-split calculation assumes everyone pays an equal share — for uneven splits, calculate each person's portion individually.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Group tipping tip:</strong> For large groups, many
                  restaurants automatically add an 18–20% gratuity to the bill
                  (labelled 'auto-gratuity' or 'service charge'). Always check
                  the receipt before adding a tip — if gratuity is already
                  included, you're not expected to add more. Some venues add a
                  service charge on top of the auto-gratuity for very large
                  parties — check the full bill breakdown carefully.
                </div>
              ),
            },
            {
              n: 4,
              title: "Read the Bill Summary",
              body: "The Bill Summary panel shows three values: Tip Amount (just the gratuity), Total Amount (bill plus tip), and — when splitting — a breakdown of each person's share. The Breakdown section shows the subtotal, tip, total, and per-person amounts in a clean line-item format. Click Reset Calculator to clear all fields and start fresh.",
              enrich: (
                <div className="bg-green-50 rounded-xl px-5 py-4 text-sm text-green-800 leading-relaxed">
                  <strong>Rounding for cash payment:</strong> When paying cash,
                  round up the per-person amount to the nearest dollar to
                  simplify the split. For a per-person total of $18.67, each
                  person contributes $19 — the small excess rounds up into a
                  slightly higher effective tip, which is always appreciated.
                  Avoid rounding down or paying exact amounts in coins, as this
                  creates confusion about the final tip amount.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🍽️",
              title: "Restaurant dining",
              desc: "Calculate the right tip for sit-down restaurant service — choose from presets or enter a custom percentage to match service quality.",
            },
            {
              emoji: "🍕",
              title: "Food delivery",
              desc: "Calculate delivery tips based on order total — factor in distance and time for fair gratuity on delivery orders.",
            },
            {
              emoji: "✂️",
              title: "Hair and beauty services",
              desc: "Calculate 15–20% gratuity for haircuts, colouring, nails, massage, and other personal care services.",
            },
            {
              emoji: "🚕",
              title: "Taxi and rideshare",
              desc: "Calculate tips for Uber, Lyft, or taxi rides — 15–20% on the fare is standard for good service.",
            },
            {
              emoji: "👥",
              title: "Group bill splitting",
              desc: "Split a large group restaurant bill evenly — set any number of people from 2 to 20 for an instant per-person breakdown.",
            },
            {
              emoji: "🏨",
              title: "Hotel and hospitality",
              desc: "Calculate tips for concierge, room service, or bellhop — typically $2–5 per service or 15–20% of the charge.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-green-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">💵</div>
          <h3 className="text-xl font-bold mb-3">
            20% has become the standard tip in most US cities — 15% is no longer
            considered generous
          </h3>
          <p className="text-green-100 leading-relaxed max-w-xl mx-auto text-sm">
            Tipping norms in the United States have shifted upward significantly
            over the past two decades. What was once a 15% standard tip is now
            widely considered low in many urban areas, particularly in major
            cities where the cost of living is high. Most servers and
            hospitality workers rely on tips to make up a significant portion of
            their income — in many states, the tipped minimum wage is as low as
            $2.13 per hour, with tips expected to bridge the gap to the regular
            minimum wage. When service has been good, 20% is now the standard
            baseline in most US restaurants.
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
                desc: "Calculate percentages, percentage change, and percentage difference for any values.",
              },
              {
                href: "/tools/sales-tax-calculator",
                label: "Sales Tax Calculator",
                desc: "Calculate sales tax and final price for any purchase — enter rate or select by US state.",
              },
              {
                href: "/tools/discount-calculator",
                label: "Discount Calculator",
                desc: "Calculate the discounted price and savings amount for any sale percentage or fixed discount.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-green-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
