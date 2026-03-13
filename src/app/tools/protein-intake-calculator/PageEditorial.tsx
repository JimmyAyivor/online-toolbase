"use client";
// src/app/tools/protein-intake-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/protein-intake-calculator";
const TOOL_NAME = "Protein Intake Calculator";

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
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500'
          aria-label='Close'
        >
          ✕
        </button>
        <h3 className='text-lg font-black text-gray-900 mb-1'>
          Take it with you
        </h3>
        <p className='text-sm text-gray-400 mb-5'>
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-inner mb-5'>
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
    "Free protein intake calculator — find your daily protein target based on weight and fitness goal",
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
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className='inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all'
            >
              {copied ? (
                <span className='text-green-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What is the RDA for protein and is it enough for athletes?",
    a: "The RDA of 0.8g/kg/day is the minimum needed to prevent deficiency in sedentary adults — it is not optimal for people who exercise. Sports nutrition bodies (ISSN, ACSM) support 1.4–2.2g/kg/day for active individuals, with higher intakes up to 3.1g/kg beneficial during aggressive cutting phases to preserve muscle mass.",
  },
  {
    q: "Does eating more protein build more muscle indefinitely?",
    a: "Up to approximately 1.6–2.2g/kg/day, additional protein contributes to muscle protein synthesis. Above 2.5g/kg, extra protein provides no further muscle-building benefit — excess amino acids are oxidised for energy. The limiting factors above the threshold are training stimulus and sleep, not protein intake.",
  },
  {
    q: "What are the best high-protein foods?",
    a: "Animal sources (complete proteins): chicken breast (~31g/100g), canned tuna (~29g/100g), lean beef (~26g/100g), Greek yoghurt (~10g/100g), eggs (~13g/100g). Plant sources: tempeh (~19g/100g), edamame (~11g/100g), tofu (~8–17g/100g depending on firmness), lentils (~9g/100g cooked), chickpeas (~9g/100g cooked).",
  },
  {
    q: "Is a high-protein diet safe for kidneys?",
    a: "In healthy adults without pre-existing kidney disease, research consistently shows that protein intakes up to 2.5g/kg do not cause kidney damage or reduce kidney function. The concern about protein and kidneys originated from studies of patients with existing chronic kidney disease, where protein restriction is sometimes medically appropriate. If you have kidney conditions, consult a nephrologist before significantly increasing protein intake.",
  },
  {
    q: "How should I spread protein intake across the day?",
    a: "Research supports distributing protein evenly across 3–5 meals rather than consuming most of it in one sitting. Each meal should ideally contain 30–40g of protein, which is the approximate threshold to maximise muscle protein synthesis per meal. A common pattern: 30–40g at breakfast, 30–40g at lunch, 30–40g at dinner, and optional protein-rich snacks pre or post workout.",
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
              <span className='text-emerald-600 text-lg shrink-0'>
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
        aria-labelledby='how-to-use-heading'
      >
        <h2
          id='how-to-use-heading'
          className='text-4xl font-bold text-gray-900 mb-4 text-center'
        >
          How to Use the Protein Intake Calculator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Enter your body weight and select your fitness goal to get a
          personalised daily protein target — backed by current sports nutrition
          research.
        </p>

        {/* Steps */}
        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Enter your body weight",
              body: "Input your current weight in kg or lbs using the toggle. Protein requirements are calculated per unit of body weight — the more lean tissue you carry, the more protein your body needs. Use your current weight, not your goal weight, for accuracy.",
              enrich: (
                <div className='bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed'>
                  <strong>Overweight individuals:</strong> If you have a high
                  body fat percentage, using total body weight can overestimate
                  protein needs. Consider using your lean body mass estimate, or
                  the midpoint between your ideal weight and actual weight.
                </div>
              ),
            },
            {
              n: 2,
              title: "Select your fitness goal",
              body: "Choose the goal that best matches your current training and dietary phase. Building muscle requires 1.6–2.2g/kg to support muscle protein synthesis. Cutting (maintaining muscle in a deficit) requires the highest intake at 2.0–2.4g/kg. General fitness and endurance fall in the middle range.",
              enrich: (
                <div className='bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed'>
                  <strong>Resistance training is the key factor:</strong> The
                  biggest driver of increased protein need is strength training
                  — it causes muscle protein breakdown that must be repaired
                  with dietary protein. Cardio-only exercise has a smaller
                  effect on daily protein requirements.
                </div>
              ),
            },
            {
              n: 3,
              title: "Read your daily target and per-meal breakdown",
              body: "The result shows your recommended daily protein in grams, split across 3, 4, or 5 meals. Research shows 30–40g per meal maximises muscle protein synthesis. Spreading intake evenly across the day is more effective than consuming most of your protein in one or two meals.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Goal
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Range
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Evidence basis
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        ["Sedentary", "0.8–1.0g/kg", "RDA minimum"],
                        ["General fitness", "1.2–1.6g/kg", "ACSM guidelines"],
                        ["Endurance", "1.2–1.8g/kg", "ISSN position stand"],
                        [
                          "Muscle gain",
                          "1.6–2.2g/kg",
                          "Meta-analysis consensus",
                        ],
                        [
                          "Cutting phase",
                          "2.0–2.4g/kg",
                          "Deficit preservation",
                        ],
                      ].map(([g, r, e]) => (
                        <tr key={g} className='hover:bg-emerald-50'>
                          <td className='px-4 py-2 font-medium text-gray-800'>
                            {g}
                          </td>
                          <td className='px-4 py-2 text-emerald-700 font-bold'>
                            {r}
                          </td>
                          <td className='px-4 py-2 text-gray-500'>{e}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Plan your meals around the target",
              body: "Use the per-meal figure to structure your daily eating. If your target is 160g, aim for roughly 40g per meal across 4 meals. Use a food tracking app to verify you're hitting the target, especially in the first few weeks while you calibrate your portions.",
              enrich: (
                <div className='bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed'>
                  <strong>Protein quality matters:</strong> Complete proteins
                  contain all 9 essential amino acids: meat, poultry, fish,
                  eggs, dairy, soy, and quinoa. Plant-based eaters should
                  combine sources (e.g. rice + beans, hummus + wholegrain bread)
                  to ensure all essential amino acids are covered in each meal.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center'>
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

        {/* Scenarios */}
        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
          Common use cases
        </h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14'>
          {[
            {
              emoji: "💪",
              title: "Starting a muscle gain programme",
              desc: "Calculate your protein target before beginning a bulking phase so you know exactly how much to eat daily to support hypertrophy.",
            },
            {
              emoji: "🏋️",
              title: "Cutting phase planning",
              desc: "Increase protein to 2.2g/kg during a calorie deficit to minimise muscle loss — the most common application for competitive physique athletes.",
            },
            {
              emoji: "🌱",
              title: "Plant-based diet planning",
              desc: "Use the gram target to plan plant-based meals, combining sources at each sitting to cover all essential amino acids.",
            },
            {
              emoji: "🏃",
              title: "Endurance athlete fuelling",
              desc: "Runners and cyclists need 1.4–1.7g/kg to repair muscle damage from high training volume — more than the sedentary RDA.",
            },
            {
              emoji: "👴",
              title: "Older adult health",
              desc: "Protein requirements increase with age for sarcopenia prevention. The calculator's higher ranges are appropriate for adults over 60.",
            },
            {
              emoji: "🎯",
              title: "Meal prep target setting",
              desc: "Divide your daily target by meals to know the exact protein content to hit per serving when batch cooking for the week.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className='bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>⚠️</div>
          <h3 className='text-xl font-bold mb-3'>
            For informational purposes only — not medical advice
          </h3>
          <p className='text-emerald-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Protein targets are general estimates based on published nutritional
            guidelines. Individual needs vary based on body composition,
            training history, and health status. Consult a registered dietitian
            or sports nutritionist for personalised guidance.
          </p>
        </div>

        {/* Related tools */}
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/calorie-calculator",
                label: "Calorie Calculator",
                desc: "Calculate your total daily energy expenditure and calorie targets.",
              },
              {
                href: "/tools/macro-calculator",
                label: "Macro Calculator",
                desc: "Set your full macronutrient split — protein, carbs, and fat.",
              },
              {
                href: "/tools/ideal-weight-calculator",
                label: "Ideal Weight Calculator",
                desc: "Find your healthy weight range using multiple clinical formulas.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
