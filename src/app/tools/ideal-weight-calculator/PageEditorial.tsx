"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/ideal-weight-calculator";
const TOOL_NAME = "Ideal Weight Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#14532d", light: "#f0fdf4" },
      });
    });
    return () => {
      c = true;
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-green-100 shadow-inner mb-5'>
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
    "Free ideal weight calculator at onlinetoolbase.com",
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
                <span className='text-green-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What is the Hamwi formula?",
    a: "The Hamwi formula was developed in 1964 for clinical nutrition and drug dosing. For men: 48 kg for 5 feet of height, plus 2.7 kg for each additional inch. For women: 45.5 kg for 5 feet, plus 2.27 kg per additional inch. It tends to suggest lower weights for taller individuals. It is one of the most widely used formulas in clinical settings but was never designed as a personal weight goal — it was created to estimate lean body mass for medication dosing.",
  },
  {
    q: "What is the Devine formula?",
    a: "The Devine formula (1974) was created to estimate lean body mass for medication dosing, particularly in pharmacokinetics. For men: 50 kg + 2.3 kg per inch over 5 feet. For women: 45.5 kg + 2.3 kg per inch over 5 feet. It is widely used in clinical medicine and forms the basis of many IBW calculators. Like all IBW formulas, it does not account for body composition — a muscular athlete and a sedentary person of the same height would get the same result.",
  },
  {
    q: "What is a healthy BMI range?",
    a: "The World Health Organization (WHO) defines a healthy BMI as 18.5–24.9. BMI is calculated as weight (kg) divided by height in metres squared. The healthy range translates to the weight range shown in this calculator. However, BMI has well-documented limitations: it does not distinguish between fat and muscle mass (athletes often register as 'overweight'), does not account for fat distribution, and may systematically mis-classify certain ethnic groups. It is best used as one data point among several, not as a standalone health measure.",
  },
  {
    q: "Why do the four formulas give different results?",
    a: "Each formula was developed in a different era, for a different clinical purpose, and using different research populations. Hamwi (1964) and Devine (1974) are the oldest and most widely used. Robinson (1983) is a modification of Devine with slightly different coefficients. Miller (1983) was designed to be more accommodating for taller individuals. None were designed as personal weight goals — they were dosing tools. The range across formulas gives a more realistic ideal weight zone than any single formula in isolation.",
  },
  {
    q: "Should I aim for my ideal weight?",
    a: "Ideal weight formulas provide a useful reference range, but health is determined by more than a number on a scale. Body composition (ratio of fat to muscle), metabolic health markers (blood pressure, blood glucose, cholesterol), fitness levels, and mental wellbeing all matter as much as or more than absolute weight. A person at the 'ideal' weight with poor fitness and high visceral fat may be less healthy than someone slightly above it with good fitness and health markers. Use ideal weight as one reference point — not a rigid target.",
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
              <span className='text-green-600 text-lg shrink-0'>
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
          How to Use the Ideal Weight Calculator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Simple, fast, and free — no account needed.
        </p>
        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Select your unit and sex",
              body: "Choose imperial or metric and select your biological sex. The formulas use different baseline weights for male and female — this is the most significant variable after height in the calculation.",
              enrich: (
                <div className='bg-green-50 rounded-xl px-5 py-4 text-sm text-green-800 leading-relaxed'>
                  <strong>Height matters most:</strong> All four ideal weight
                  formulas are primarily driven by height. Age, weight history,
                  and fitness are not inputs — ideal weight is expressed purely
                  as a function of height and sex.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your height",
              body: "Input your height in feet and inches (imperial) or centimetres (metric). For accuracy, measure against a wall without shoes. Height above or below 5 feet changes the formula output significantly — every inch matters.",
              enrich: (
                <div className='bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed'>
                  <strong>Formula note:</strong> All four formulas were
                  calibrated for heights from approximately 5'0" (152 cm) to
                  6'4" (193 cm). Results outside this range should be treated
                  with extra caution.
                </div>
              ),
            },
            {
              n: 3,
              title: "Review the four formula results",
              body: "The calculator shows results from all four formulas (Hamwi, Devine, Robinson, Miller) and their average. The spread between the lowest and highest gives you a realistic ideal weight range rather than a false precise target.",
              enrich: (
                <div className='bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed'>
                  <strong>Healthy BMI range:</strong> The BMI-based weight range
                  (18.5–24.9) is also shown. Compare this to the formula results
                  — if your current weight falls within either range, this is
                  generally considered healthy.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use results as a reference, not a target",
              body: "If your current weight is within or near the range across all four formulas, weight is unlikely to be a significant health concern. If it is substantially above or below, discuss with a healthcare provider — they can assess your individual health picture including body composition, not just weight.",
              enrich: (
                <div className='bg-green-50 rounded-xl px-5 py-4 text-sm text-green-800 leading-relaxed'>
                  <strong>When to see a doctor:</strong> If you are more than
                  20% above or below any formula result, or if you are
                  considering significant weight loss or gain, consult a doctor
                  or registered dietitian before changing your diet or exercise
                  plan.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "🏥",
              title: "Clinical reference",
              desc: "Healthcare professionals use IBW formulas for medication dosing and nutritional assessment.",
            },
            {
              emoji: "🎯",
              title: "Weight goal setting",
              desc: "Use as a reference range when setting a weight loss or gain goal alongside BMI and other health markers.",
            },
            {
              emoji: "📊",
              title: "Fitness baseline",
              desc: "Compare your current weight to the ideal weight range as one component of a fitness assessment.",
            },
            {
              emoji: "🧬",
              title: "Body composition context",
              desc: "Pair with body fat percentage data to understand whether weight is fat, muscle, or lean mass.",
            },
            {
              emoji: "👨\u200d⚕️",
              title: "Patient education",
              desc: "Help patients contextualise their weight relative to population-level clinical norms.",
            },
            {
              emoji: "🏋️",
              title: "Athletic weight class planning",
              desc: "Understand whether a competition weight class is within a medically normal range.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-green-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>
        <div className='bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>⚠️</div>
          <h3 className='text-xl font-bold mb-3'>
            Ideal weight is a range, not a single number
          </h3>
          <p className='text-green-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Medical ideal weight formulas were developed for pharmacology
            dosing, not body image goals. They do not account for muscle mass,
            bone density, ethnicity, or age-related changes. Always consult a
            healthcare professional for personalised weight goals.
          </p>
        </div>
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/calorie-calculator",
                label: "Calorie Calculator",
                desc: "Calculate the daily calories needed to reach your ideal weight range.",
              },
              {
                href: "/tools/calorie-deficit-calculator",
                label: "Calorie Deficit Calculator",
                desc: "Build a safe deficit plan to move toward your ideal weight.",
              },
              {
                href: "/tools/macro-calculator",
                label: "Macro Calculator",
                desc: "Set protein, carb, and fat targets to support your weight goal.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-green-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
