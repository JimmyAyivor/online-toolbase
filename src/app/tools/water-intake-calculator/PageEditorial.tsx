"use client";
// src/app/tools/water-intake-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/water-intake-calculator";
const TOOL_NAME = "Water Intake Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#0e7490", light: "#ecfeff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-cyan-100 shadow-inner mb-5">
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
    "Free water intake calculator — find your daily hydration needs based on weight, activity, and climate",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How much water should I drink per day?",
    a: "The commonly cited '8×8 rule' (8 glasses of 8 oz = 1.9 litres/day) is a useful simplification but not accurate for everyone. The US National Academies recommend approximately 3.7 litres/day total water for men and 2.7 litres/day for women — including water from food. This calculator uses 35 ml per kg of body weight as the medical baseline, then adjusts for activity and climate.",
  },
  {
    q: "Does coffee and tea count towards hydration?",
    a: "Yes — despite the common myth, caffeinated drinks do contribute to daily fluid intake. Caffeine has a mild diuretic effect, but the fluid in the beverage far outweighs the extra urine produced. Studies show that moderate coffee and tea consumption (up to 4–5 cups per day) contributes positively to daily fluid balance in most people.",
  },
  {
    q: "What are the signs of dehydration?",
    a: "Early signs: thirst, dark yellow urine, reduced urine frequency, headache, fatigue, and difficulty concentrating. Even mild dehydration of 1–2% body weight impairs athletic performance by 10–20%. Moderate dehydration: dry mouth, dizziness, reduced physical performance. Severe dehydration is a medical emergency. The simplest daily check: urine should be pale straw yellow.",
  },
  {
    q: "Can you drink too much water?",
    a: "Yes — hyponatremia (low blood sodium) can result from drinking excessive amounts of water rapidly, which dilutes sodium in the blood. It is rare in healthy people under everyday conditions but can occur in endurance athletes who drink very large amounts of plain water over many hours without replacing electrolytes. Sports drinks containing sodium help prevent hyponatremia during events lasting longer than 2–3 hours.",
  },
  {
    q: "Do hydration needs change during pregnancy?",
    a: "Yes — pregnant women need additional fluid to support increased blood volume, amniotic fluid, and foetal development. The US recommendation increases to approximately 3.0 litres of total water per day during pregnancy. Breastfeeding increases needs further to approximately 3.8 litres/day due to fluid secreted in breast milk. Respond promptly to thirst signals during pregnancy as they are a reliable indicator of increased need.",
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
              <span className="text-cyan-600 text-lg shrink-0">
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
        aria-labelledby="how-to-use-heading"
      >
        <h2
          id="how-to-use-heading"
          className="text-4xl font-bold text-gray-900 mb-4 text-center"
        >
          How to Use the Water Intake Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your body weight, activity level, and climate to get a
          personalised daily water target in litres and glasses.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your body weight",
              body: "Input your current weight in kg or lbs. The baseline water recommendation scales directly with body weight — the medical standard is approximately 35 ml per kg of body weight per day for a sedentary adult in a temperate climate. Toggle between kg and lbs as needed.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Why weight matters:</strong> Water makes up
                  approximately 60% of adult body weight. Larger bodies have
                  more cells requiring hydration and produce more metabolic
                  waste requiring excretion. A 90 kg person needs roughly 25%
                  more water than a 70 kg person at the same activity level.
                </div>
              ),
            },
            {
              n: 2,
              title: "Select your activity level",
              body: "Exercise substantially increases fluid needs through sweat loss. The calculator adds an extra 350–1,200 ml/day depending on your activity level. Select the option that most accurately reflects your weekly exercise habits — be honest, as overestimating leads to overestimating your water needs.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Measure your sweat rate:</strong> Weigh yourself
                  before and after a 1-hour workout without drinking. Each 1 kg
                  of weight loss equals approximately 1 litre of fluid lost —
                  this tells you exactly how much to replace per hour of that
                  exercise type.
                </div>
              ),
            },
            {
              n: 3,
              title: "Choose your climate",
              body: "Heat and humidity increase fluid needs significantly, even at rest. A hot and humid environment adds 400–700 ml/day to baseline needs. Select your typical environment — especially important if travelling to a tropical or desert location, or if you live somewhere with pronounced seasonal temperature changes.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>High altitude:</strong> Above 2,500m, increased
                  respiratory rate and lower humidity cause significantly
                  greater insensible water loss. Add an extra 500–1,000 ml/day
                  when at altitude until fully acclimatised — headaches at
                  altitude are commonly caused by dehydration, not just altitude
                  itself.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use your daily target throughout the day",
              body: "The result shows total daily fluid in litres, and equivalents in 250 ml glasses and 8 oz glasses. Spread intake throughout the day — a practical rhythm is: a glass on waking, one per hour through the day, one with each meal, and one before bed. The urine colour guide is the easiest real-time check.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Urine colour
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Hydration status
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Clear / pale yellow",
                          "Well hydrated",
                          "Maintain current intake",
                        ],
                        ["Medium yellow", "Adequate", "Drink a little more"],
                        ["Dark yellow", "Mildly dehydrated", "Drink water now"],
                        [
                          "Amber / brown",
                          "Dehydrated",
                          "Drink urgently — see doctor if persistent",
                        ],
                      ].map(([c, s, a]) => (
                        <tr key={c} className="hover:bg-cyan-50">
                          <td className="px-4 py-2 font-medium text-gray-800">
                            {c}
                          </td>
                          <td className="px-4 py-2 text-cyan-700 font-medium">
                            {s}
                          </td>
                          <td className="px-4 py-2 text-gray-500">{a}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🏃",
              title: "Pre/during/post exercise",
              desc: "Calculate how much extra water to drink before, during, and after a training session based on expected sweat loss.",
            },
            {
              emoji: "🌡️",
              title: "Hot weather adjustment",
              desc: "Recalculate water needs for a holiday in a hot climate — needs can increase by 700+ ml/day in high heat and humidity.",
            },
            {
              emoji: "🏔️",
              title: "Altitude travel",
              desc: "Increase targets when travelling above 2,500m — altitude headaches are commonly caused by dehydration, not altitude alone.",
            },
            {
              emoji: "👶",
              title: "Pregnancy hydration",
              desc: "Use the calculator as a baseline for increased pregnancy fluid needs, then adjust with guidance from a midwife or OB-GYN.",
            },
            {
              emoji: "🏋️",
              title: "Weight management",
              desc: "Drinking water before meals reduces appetite — knowing your daily target helps distinguish genuine hunger from mild dehydration.",
            },
            {
              emoji: "💊",
              title: "Medication considerations",
              desc: "Some medications (diuretics, lithium, certain antibiotics) increase fluid requirements — use this as a baseline to discuss with your prescriber.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-cyan-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">💧</div>
          <h3 className="text-xl font-bold mb-3">
            For informational purposes only — not medical advice
          </h3>
          <p className="text-cyan-100 leading-relaxed max-w-xl mx-auto text-sm">
            Hydration targets are general estimates based on published
            guidelines. Individual needs vary based on health status,
            medications, and specific conditions. Consult a healthcare provider
            for personalised guidance, especially during pregnancy, illness, or
            intense athletic training.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/calorie-calculator",
                label: "Calorie Calculator",
                desc: "Understand your full daily nutritional and energy needs.",
              },
              {
                href: "/tools/running-pace-calculator",
                label: "Running Pace Calculator",
                desc: "Plan running workouts and calculate hydration alongside pace targets.",
              },
              {
                href: "/tools/sleep-calculator",
                label: "Sleep Calculator",
                desc: "Hydration and sleep quality are closely linked.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-cyan-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
