"use client";
// src/app/tools/unit-converter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/unit-converter";
const TOOL_NAME = "Unit Converter";

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
    "Free unit converter — 40+ units across length, weight, temperature, volume, speed, and time. Instant results, no signup.",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const COMMON_CONVERSIONS: {
  from: string;
  to: string;
  val: string;
  result: string;
  category: string;
}[] = [
  {
    category: "Length",
    from: "1 mile",
    to: "km",
    val: "1",
    result: "1.60934 km",
  },
  {
    category: "Length",
    from: "1 foot",
    to: "cm",
    val: "1",
    result: "30.48 cm",
  },
  { category: "Length", from: "1 inch", to: "mm", val: "1", result: "25.4 mm" },
  {
    category: "Weight",
    from: "1 kg",
    to: "lbs",
    val: "1",
    result: "2.20462 lbs",
  },
  {
    category: "Weight",
    from: "1 stone",
    to: "kg",
    val: "1",
    result: "6.35029 kg",
  },
  {
    category: "Temperature",
    from: "100°C",
    to: "°F",
    val: "100",
    result: "212°F",
  },
  {
    category: "Temperature",
    from: "0°C",
    to: "K",
    val: "0",
    result: "273.15 K",
  },
  {
    category: "Volume",
    from: "1 US gallon",
    to: "litres",
    val: "1",
    result: "3.78541 L",
  },
  {
    category: "Speed",
    from: "60 mph",
    to: "km/h",
    val: "60",
    result: "96.56 km/h",
  },
  {
    category: "Time",
    from: "1 hour",
    to: "seconds",
    val: "1",
    result: "3,600 s",
  },
];

const FAQS = [
  {
    q: "How do I convert Celsius to Fahrenheit (and back)?",
    a: "To convert Celsius to Fahrenheit, use the formula: °F = (°C × 9/5) + 32. For example, 20°C = (20 × 1.8) + 32 = 36 + 32 = 68°F. To convert Fahrenheit to Celsius, use: °C = (°F − 32) × 5/9. For example, 98.6°F = (98.6 − 32) × 5/9 = 66.6 × 0.5556 = 37°C. A useful approximation for quick mental maths: double the Celsius, subtract 10%, and add 32. For 20°C: 20 × 2 = 40, minus 4 = 36, plus 32 = 68°F. Key reference points: 0°C = 32°F (water freezes); 100°C = 212°F (water boils); 37°C = 98.6°F (body temperature); −40°C = −40°F (the only temperature where both scales meet).",
  },
  {
    q: "How do I convert miles to kilometres?",
    a: "1 mile = 1.60934 kilometres. To convert miles to kilometres, multiply by 1.60934. For quick mental maths, multiply by 1.6 (or 8/5). For example, 50 miles ≈ 50 × 1.6 = 80 km. To convert km to miles, divide by 1.60934 (or multiply by 0.621371). For quick maths, multiply by 0.6 or divide by 1.6. Example: 100 km ÷ 1.6 = 62.5 miles. The Fibonacci sequence provides a surprisingly useful approximation: successive Fibonacci numbers (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...) approximate mile-km conversions: 5 miles ≈ 8 km, 8 miles ≈ 13 km, 13 miles ≈ 21 km, 21 miles ≈ 34 km.",
  },
  {
    q: "How do I convert kilograms to pounds and stones?",
    a: "1 kilogram = 2.20462 pounds. To convert kg to lbs, multiply by 2.20462. For quick maths, multiply by 2.2. For example, 70 kg ≈ 70 × 2.2 = 154 lbs. To convert lbs to kg, divide by 2.20462. For quick maths, divide by 2.2. To convert kg to stones (used in the UK for body weight): 1 stone = 6.35029 kg, so divide the kg value by 6.35. For example, 70 kg ÷ 6.35 ≈ 11 stone. For the stones-and-pounds format: 70 kg ÷ 6.35 = 11.02 stone = 11 stone and 0.02 × 14 = 0.28 pounds ≈ 11 stone 0 pounds. This tool converts between kg, grams, pounds, ounces, and metric tons.",
  },
  {
    q: "What is the difference between US and Imperial measurements?",
    a: "The United States customary system and the British Imperial system share many unit names but differ in some volume measurements. For length and weight, they are identical: both use inches, feet, yards, miles, ounces, and pounds with the same values. For liquid volume, they diverge: a US fluid ounce = 29.5735 mL, while an Imperial fluid ounce = 28.4131 mL. A US gallon = 3.78541 litres; an Imperial gallon = 4.54609 litres — about 20% larger. A US pint = 473 mL; an Imperial pint = 568 mL. This difference is particularly important when following recipes from different countries. This tool uses US customary volume units (US gallons, US pints, US fluid ounces).",
  },
  {
    q: "How are speed units related — mph, km/h, m/s, and knots?",
    a: "Speed units all measure distance per unit of time. 1 mile per hour (mph) = 1.60934 km/h = 0.44704 m/s = 0.86898 knots. 1 kilometre per hour (km/h) = 0.62137 mph = 0.27778 m/s = 0.53996 knots. 1 metre per second (m/s) = 3.6 km/h = 2.23694 mph = 1.94384 knots. 1 knot = 1 nautical mile per hour = 1.852 km/h = 1.15078 mph = 0.51444 m/s. Knots are used in aviation and marine navigation because they relate directly to latitude — 1 nautical mile = 1 arcminute of latitude, so navigation calculations are simpler. In everyday life: 100 km/h ≈ 62 mph; 60 mph ≈ 97 km/h; motorway speed (70 mph UK / 65–70 mph US) ≈ 112 km/h.",
  },
  {
    q: "Why does the metric system use base-10 while imperial uses mixed bases?",
    a: "The metric system was designed in France in the 1790s with a deliberate base-10 structure: each unit is a power of 10 times the base unit (milli = ÷1000, centi = ÷100, kilo = ×1000, mega = ×1,000,000). This makes conversions trivially easy — just move the decimal point. The imperial system evolved organically over centuries from traditional measures: 12 inches in a foot (because 12 is divisible by 2, 3, 4, 6), 3 feet in a yard, 1,760 yards in a mile (derived from 1,000 Roman paces of 5 feet). The mixed bases made sense when dividing physical objects by hand — 12 is more easily divided than 10. Today, the metric system is used by the scientific community worldwide and is the official system in every country except the US, Myanmar, and Liberia, though the US uses metric for science and many industries.",
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
          How to Use the Unit Converter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Select a category, choose your From and To units, type a value, and
          get the converted result instantly — swap direction with one click.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Select the unit category",
              body: "Click one of the six category buttons at the top of the converter: Length, Weight, Temperature, Volume, Speed, or Time. The active category is highlighted in indigo. The unit dropdowns update automatically to show the units available in that category. There are 40+ units total across all six categories — from millimetres to miles, milligrams to metric tons, Celsius to Kelvin, millilitres to US gallons, metres per second to knots, and seconds to years.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Category
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Units included
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Length",
                          "Metres, km, cm, mm, miles, yards, feet, inches",
                        ],
                        [
                          "Weight",
                          "Kilograms, grams, mg, pounds, ounces, metric tons",
                        ],
                        ["Temperature", "Celsius, Fahrenheit, Kelvin"],
                        [
                          "Volume",
                          "Litres, mL, US gallons, quarts, pints, cups, fl oz",
                        ],
                        ["Speed", "m/s, km/h, mph, knots, feet/second"],
                        [
                          "Time",
                          "Seconds, minutes, hours, days, weeks, months, years",
                        ],
                      ].map(([cat, units]) => (
                        <tr key={cat} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-bold text-indigo-700 text-xs">
                            {cat}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-600">
                            {units}
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
              title: "Choose From and To units",
              body: "Use the two dropdown menus to select the unit you're converting from (top panel) and the unit you want to convert to (bottom panel). Both dropdowns show all units in the selected category. You can select the same unit in both fields — useful for sanity-checking a value. When you switch the active category, both dropdowns reset to default units for that category.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          From
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          To
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Result for value = 1
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {COMMON_CONVERSIONS.map(
                        ({ from, to, result, category }) => (
                          <tr key={from + to} className="hover:bg-indigo-50">
                            <td className="px-4 py-2 text-xs font-medium text-gray-900">
                              {from}
                            </td>
                            <td className="px-4 py-2 text-xs text-gray-600">
                              {to}
                            </td>
                            <td className="px-4 py-2 text-xs font-bold text-indigo-700">
                              {result}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Enter a value and read the result",
              body: "Type your number into the input field in the From panel. The converted result appears instantly in the To panel in large indigo text. The result is shown with up to 6 significant decimal places, with trailing zeros removed. Temperature conversions use the precise non-linear formulas (not factor-based). All other categories use a base-unit factor method: the input is first converted to the base unit, then multiplied by the target unit's factor.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Temperature is different:</strong> Unlike length,
                  weight, and other unit types, temperature cannot be converted
                  by simple multiplication — it requires offset adjustments
                  because the zero points differ. 0°C ≠ 0°F ≠ 0K. Celsius and
                  Kelvin differ by an additive offset (0°C = 273.15 K).
                  Fahrenheit uses a different scale size (9/5 of Celsius) plus a
                  32° offset. The converter handles all three temperature
                  formulas automatically.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use the swap button to reverse the conversion",
              body: "Click the indigo swap button (↔) between the From and To panels to instantly reverse the conversion direction. The From and To units are swapped, and the current result value becomes the new input — so you can check that the round-trip conversion returns to the original value. This is useful for verifying conversions and for quickly converting in both directions without re-entering values.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Quick reference — memorise these five:</strong> 1 inch
                  = 2.54 cm exactly (the definition). 1 mile = 1.609 km (≈ 1.6).
                  1 kg = 2.205 lbs (≈ 2.2). 100°C = 212°F. 1 US gallon = 3.785
                  litres. With these five anchors you can estimate most everyday
                  conversions without a calculator.
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
              emoji: "✈️",
              title: "International travel",
              desc: "Convert miles to km for road signs, lbs to kg for luggage limits, and °F to °C for weather forecasts when travelling abroad.",
            },
            {
              emoji: "🍳",
              title: "Cooking and recipes",
              desc: "Convert between US cups, tablespoons, fluid ounces, and metric millilitres when following recipes from different countries.",
            },
            {
              emoji: "🏃",
              title: "Running and fitness",
              desc: "Convert miles to kilometres for race distances, pounds to kilograms for weight tracking, or miles per hour to km/h for treadmill settings.",
            },
            {
              emoji: "🏗️",
              title: "Construction and DIY",
              desc: "Convert between inches, feet, centimetres, and metres for measurements — and between yards and metres for materials quantities.",
            },
            {
              emoji: "🌡️",
              title: "Science and medicine",
              desc: "Convert between Celsius, Fahrenheit, and Kelvin for scientific calculations or medical reference ranges.",
            },
            {
              emoji: "🛳️",
              title: "Navigation and aviation",
              desc: "Convert knots to mph or km/h for speed comparisons, and nautical miles to statute miles or kilometres for distance planning.",
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

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📏</div>
          <h3 className="text-xl font-bold mb-3">
            1 inch = 2.54 cm exactly — the single defined relationship between
            imperial and metric length
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            Since 1959, the international inch has been defined as exactly 2.54
            centimetres. This single defined relationship is the root of all
            imperial-to-metric length conversions: a foot is 12 × 2.54 = 30.48
            cm exactly; a yard is 91.44 cm exactly; a mile is 1,609.344 metres
            exactly. Before this standardisation, the inch varied slightly
            between the US and UK (the US inch was 25.40005 mm; the Imperial
            inch was 25.39998 mm). The 1959 international yard and pound
            agreement fixed both the inch and the pound to exact metric
            equivalents, making all subsequent unit conversions derivable from
            these two anchor definitions.
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
                desc: "Calculate percentages five ways — X% of Y, percentage change, increase/decrease by %, and more.",
              },
              {
                href: "/tools/tip-calculator",
                label: "Tip Calculator",
                desc: "Calculate tips and split bills for any restaurant or service — quick presets plus custom tip.",
              },
              {
                href: "/tools/discount-calculator",
                label: "Discount Calculator",
                desc: "Calculate discounted prices and savings for any sale — percentage or fixed discount, stackable.",
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
