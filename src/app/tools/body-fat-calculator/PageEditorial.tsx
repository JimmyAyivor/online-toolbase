"use client";
// src/app/tools/body-fat-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/body-fat-calculator";
const TOOL_NAME = "Body Fat Calculator";

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
    "Free body fat calculator using the US Navy circumference method. Enter measurements and get body fat %, lean mass, and category. No signup.",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const MALE_CATEGORIES = [
  [
    "2–5%",
    "Essential Fat",
    "The minimum fat required for basic physiological function. Not a sustainable or healthy long-term target for most people.",
  ],
  [
    "6–13%",
    "Athletes",
    "Typical range for competitive athletes and bodybuilders. Visible muscle definition; very lean appearance.",
  ],
  [
    "14–17%",
    "Fitness",
    "Lean and fit — visible muscle separation. Achievable with consistent training and a structured diet.",
  ],
  [
    "18–24%",
    "Average",
    "The typical range for the general population. Some visible fat but not considered unhealthy.",
  ],
  [
    "25%+",
    "Obese",
    "Associated with increased health risks. Reduction through diet and exercise is typically recommended.",
  ],
];

const FEMALE_CATEGORIES = [
  [
    "10–13%",
    "Essential Fat",
    "Minimum fat for basic female physiological function including hormonal balance. Not sustainable for most.",
  ],
  [
    "14–20%",
    "Athletes",
    "Typical for competitive female athletes. Very lean with visible muscle definition.",
  ],
  [
    "21–24%",
    "Fitness",
    "Lean and fit — the range maintained by active women who train consistently.",
  ],
  [
    "25–31%",
    "Average",
    "Typical for the general female population. Healthy and within normal range.",
  ],
  [
    "32%+",
    "Obese",
    "Associated with elevated health risks. Lifestyle changes are generally recommended.",
  ],
];

const FAQS = [
  {
    q: "How does the US Navy body fat formula work?",
    a: "The US Navy body fat formula (also called the Hodgdon-Beckett formula) estimates body fat percentage from circumference measurements rather than weight alone. For males, it uses height, waist circumference (measured at the navel), and neck circumference (measured just below the larynx). For females, it adds hip circumference (at the widest point). The formula uses logarithms of these measurements to estimate body density, then converts body density to body fat percentage using the Siri equation. The formula was developed and validated by the US Department of Defense as a practical field measurement method that requires only a tape measure. It is consistently within 3–4 percentage points of DEXA scan results for most people, making it one of the more accurate non-laboratory methods available.",
  },
  {
    q: "How accurate is this body fat calculator?",
    a: "The US Navy circumference method is considered a moderately accurate estimation method with typical error margins of ±3–4 percentage points compared to DEXA scan results. This means a calculator result of 18% body fat likely indicates actual body fat is between approximately 14–22%. The accuracy is affected by measurement technique (inconsistent placement can shift results significantly), body shape (the formula is validated on military populations and may be less accurate for extreme body types), and hydration status (measuring after exercise or when dehydrated can affect circumference readings). More accurate methods include DEXA (dual-energy X-ray absorptiometry, considered the gold standard), hydrostatic weighing, and Bod Pod (air displacement plethysmography). Skinfold caliper measurements can also be accurate when performed by an experienced practitioner. For health monitoring and tracking progress over time, the Navy method is useful and practical — for precise body composition assessment, a professional DEXA scan is recommended.",
  },
  {
    q: "How do I take accurate circumference measurements?",
    a: "Measurement accuracy directly affects result accuracy. For waist circumference: measure at the level of the navel, not at the narrowest point of the torso. Keep the tape horizontal, parallel to the floor. Exhale normally and measure at the end of a normal exhale (not sucked in). For neck circumference: measure just below the larynx (Adam's apple for men; the lower part of the throat for women). Keep the tape perpendicular to the neck. For hip circumference (women only): measure at the widest point of the hips and buttocks, typically several inches below the waist. Keep the tape horizontal and parallel to the floor. For all measurements: use a non-stretching flexible tape measure (fabric tape measures can stretch over time — use a fibreglass or plastic measuring tape). Take each measurement twice and average the two readings if they differ. Measure at the same time of day — morning before eating and drinking gives the most consistent results.",
  },
  {
    q: "What is lean body mass and why does it matter?",
    a: "Lean body mass (LBM) is everything in your body that is not fat — including muscle, bone, organs, water, and connective tissue. It is calculated as total body weight minus fat mass. Lean body mass matters because it is the primary driver of your resting metabolic rate (the calories your body burns at rest). More lean mass means a higher metabolism and greater caloric expenditure even without additional exercise. Lean mass is also the primary tissue targeted in strength and resistance training — when someone says they want to 'gain muscle', they're increasing their lean body mass while ideally maintaining or reducing fat mass. Tracking lean mass over time (alongside body fat percentage) provides a more complete picture of body composition change than body weight alone — someone can gain 3kg of muscle and lose 3kg of fat while appearing to have made 'no progress' on the scale.",
  },
  {
    q: "What is a healthy body fat percentage?",
    a: "Healthy body fat ranges differ by sex due to physiological differences in essential fat storage. For men: 6–13% is the athletic range, 14–17% is considered fitness level, 18–24% is the typical healthy average for adult men, and 25%+ is considered above healthy range. For women: 14–20% is the athletic range, 21–24% is considered fitness level, 25–31% is the typical healthy average for adult women, and 32%+ is considered above healthy range. Women naturally carry more essential fat than men (approximately 10–13% vs 2–5%) due to hormonal and reproductive factors — this is normal and healthy. The 'ideal' body fat percentage depends on individual goals, age, and activity level. Very low body fat (below essential fat levels) is associated with health risks including hormonal disruption, bone density loss, and impaired immune function.",
  },
  {
    q: "Why is body fat percentage a better measure than BMI?",
    a: "BMI (Body Mass Index) is calculated from height and weight only — it cannot distinguish between muscle mass and fat mass. This makes it a poor indicator of body composition for muscular individuals, who may have a 'overweight' or 'obese' BMI despite having healthy or low body fat levels. Conversely, individuals with low muscle mass and high fat mass (sometimes called 'skinny fat' or metabolically obese normal weight) may have a 'healthy' BMI despite carrying excess body fat. Body fat percentage measures the actual proportion of fat in the body — it is a more direct and meaningful indicator of body composition and metabolic health risk. Research consistently shows that body fat percentage and fat distribution (particularly visceral fat around organs) are better predictors of metabolic health outcomes than BMI alone. For athletes and anyone with above-average muscle mass, body fat percentage is a significantly more accurate health metric than BMI.",
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
              <span className="text-green-600 text-lg shrink-0">
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
          How to Use the Body Fat Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Select your sex and units, enter your measurements, and get an instant
          estimate of your body fat percentage, category, lean mass, and fat
          mass.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Select sex and unit system",
              body: "Choose Male or Female — the formula uses different variables for each sex, and body fat categories differ between male and female. Select Metric (cm/kg) or Imperial (in/lbs) based on your measurement preference. Female users need to measure an additional hip circumference that male users don't need — the formula panel adapts automatically.",
              enrich: (
                <div className="bg-green-50 rounded-xl px-5 py-4 text-sm text-green-800 leading-relaxed">
                  <strong>Why sex matters for body fat calculation:</strong> The
                  US Navy formula uses different logarithmic equations for males
                  and females because body fat distribution patterns differ
                  significantly between sexes. Women naturally carry more
                  essential fat (approximately 10–13% vs 2–5% for men)
                  concentrated in the hip/glute region, which is why the female
                  formula includes hip circumference. Using the wrong sex
                  selection will produce significantly inaccurate results.
                </div>
              ),
            },
            {
              n: 2,
              title: "Take your measurements",
              body: "Measure your height, weight, waist (at navel level), neck (just below the larynx), and hip if female (at the widest point). Use a flexible, non-stretching tape measure. Measure each circumference twice and use the average. Take measurements first thing in the morning before eating or drinking for the most consistent results. Keep the tape horizontal and snug — not so tight it compresses skin.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Measurement
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Where to measure
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Waist",
                          "At the level of the navel — not the narrowest point of the torso. Horizontal, end of normal exhale.",
                        ],
                        [
                          "Neck",
                          "Just below the larynx (Adam's apple / lower throat). Perpendicular to the neck axis.",
                        ],
                        [
                          "Hip ♀",
                          "At the widest point of the hips and buttocks. Horizontal, parallel to the floor.",
                        ],
                        [
                          "Height",
                          "Stand tall without shoes. Measure to the top of the head.",
                        ],
                        [
                          "Weight",
                          "First thing in the morning, after using the bathroom, without clothes or shoes.",
                        ],
                      ].map(([m, desc]) => (
                        <tr key={m} className="hover:bg-green-50">
                          <td className="px-4 py-2 font-bold text-green-700 text-xs whitespace-nowrap">
                            {m}
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
              n: 3,
              title: "Review your body fat percentage and category",
              body: "Results update automatically as you enter your measurements. The result panel shows your estimated body fat %, your category (Essential Fat, Athletes, Fitness, Average, or Obese), lean body mass, and fat mass. The visual bar shows your body fat % on a 0–50% scale for a quick visual reference.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Male range
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Female range
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Category
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {MALE_CATEGORIES.map(([mRange, cat], i) => (
                        <tr key={cat} className="hover:bg-green-50">
                          <td className="px-4 py-2 font-bold text-green-700 text-xs">
                            {mRange}
                          </td>
                          <td className="px-4 py-2 font-bold text-teal-700 text-xs">
                            {FEMALE_CATEGORIES[i][0]}
                          </td>
                          <td className="px-4 py-2 font-semibold text-gray-900 text-xs">
                            {cat}
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
              title: "Track progress over time",
              body: "Use this calculator monthly at the same time of day (ideally the same morning conditions) to track body composition change over time. Changes in body fat percentage are typically slow — a 1–2% change per month is a realistic expectation with consistent training and nutrition. Track both body fat % and lean mass — these tell a more complete story than body weight alone. Weight can remain the same while body fat decreases and lean mass increases, which is a positive body composition change even though the scale doesn't move.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Measurement consistency:</strong> Always measure under
                  the same conditions — same time of day, same hydration status,
                  using the same tape measure. Even slight variations in waist
                  measurement placement can shift results by 1–2%. The most
                  reliable way to use this tool is to track the trend over
                  months rather than focusing on any single measurement result.
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
              emoji: "🏋️",
              title: "Fitness tracking",
              desc: "Track body composition changes over a training programme — monitor whether you're building muscle and losing fat as intended.",
            },
            {
              emoji: "🎯",
              title: "Setting body composition goals",
              desc: "Use category benchmarks to set a realistic target body fat percentage and track progress toward it monthly.",
            },
            {
              emoji: "🥗",
              title: "Nutrition planning",
              desc: "Calculate lean mass to determine protein targets and calorie adjustments for a body recomposition or cutting phase.",
            },
            {
              emoji: "👩‍⚕️",
              title: "Health monitoring",
              desc: "Track body fat as a health metric over time — a more meaningful indicator of metabolic health than body weight alone.",
            },
            {
              emoji: "🏃",
              title: "Athletes and performance",
              desc: "Monitor body fat percentage to ensure you're in the optimal range for your sport without compromising performance.",
            },
            {
              emoji: "📊",
              title: "Progress without the scale",
              desc: "Use when the scale isn't moving — body fat % and lean mass changes reveal progress that bodyweight doesn't show.",
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

        <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl p-8 text-white text-center mb-14">
          <p className="text-xs font-semibold text-green-200 uppercase tracking-widest mb-4">
            Health disclaimer
          </p>
          <h3 className="text-xl font-bold mb-3">
            This tool provides an estimate for informational purposes — consult
            a healthcare professional for medical advice
          </h3>
          <p className="text-green-100 leading-relaxed max-w-xl mx-auto text-sm">
            The US Navy body fat formula is a validated estimation method with
            typical accuracy margins of ±3–4 percentage points. It is
            appropriate for general fitness tracking and progress monitoring. It
            is not a substitute for professional body composition assessment
            (such as DEXA scanning), and results should not be used to make
            medical decisions. If you have concerns about your body composition,
            metabolic health, or weight management, consult a registered
            dietitian, doctor, or qualified fitness professional. Body fat
            percentage is one of several metrics that contribute to overall
            health — it should be considered alongside nutrition, activity
            levels, sleep, stress, and other health markers.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Health Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/ideal-weight-calculator",
                label: "Ideal Weight Calculator",
                desc: "Calculate your ideal weight range using multiple formulas — Devine, Robinson, Miller, and Hamwi.",
              },
              {
                href: "/tools/macro-calculator",
                label: "Macro Calculator",
                desc: "Calculate your daily protein, carbohydrate, and fat targets based on your goals and activity level.",
              },
              {
                href: "/tools/calorie-calculator",
                label: "Calorie Calculator",
                desc: "Calculate your daily calorie needs using the Mifflin-St Jeor equation and your activity level.",
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
