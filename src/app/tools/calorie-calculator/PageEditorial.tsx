"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/calorie-calculator";
const TOOL_NAME = "Calorie Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7c2d12", light: "#fff7ed" },
      });
    });
    return () => {
      c = true;
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-orange-100 shadow-inner mb-5">
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
    "Free calorie calculator at onlinetoolbase.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is TDEE?",
    a: "TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day, accounting for your basal metabolic rate (BMR) plus physical activity. BMR is the calories your body needs at complete rest just to maintain organ function. TDEE multiplies BMR by an activity factor to account for movement. Eating exactly at your TDEE maintains your current weight. Eating below it creates a deficit (weight loss); eating above it creates a surplus (weight gain).",
  },
  {
    q: "Which TDEE formula is most accurate?",
    a: "This calculator uses the Mifflin-St Jeor formula, which research consistently shows to be the most accurate for most adults. Other formulas include Harris-Benedict (older, slightly less accurate) and Katch-McArdle (more accurate if you know your body fat percentage). All TDEE calculators are estimates — individual metabolism can vary ±15–20% from the calculated figure. The most reliable way to find your actual TDEE is to track your food intake and weight precisely for 2–4 weeks at a consistent intake level.",
  },
  {
    q: "How do I choose the right activity level?",
    a: "Most people overestimate their activity level. 'Sedentary' is office work with no formal exercise. 'Lightly active' is 1–3 genuine workout sessions per week. 'Moderately active' is 4–5 sessions. 'Very active' is twice-daily training or a physical job plus exercise. 'Extra active' is professional athletic training or a physically demanding job combined with regular training. When in doubt, choose one level lower than you think — you can adjust based on actual weight changes over 2–4 weeks.",
  },
  {
    q: "How many calories should I eat to lose weight?",
    a: "A deficit of 500 calories per day produces approximately 0.5 kg (1 lb) of fat loss per week — a widely accepted safe rate. A 1,000 cal/day deficit produces roughly 1 kg/week, which is near the upper safe limit for most people. Going below 1,200 cal/day (women) or 1,500 cal/day (men) risks muscle loss, nutrient deficiencies, and metabolic adaptation without medical supervision. The calorie deficit calculator on this site lets you set a weight goal and timeframe to find the appropriate deficit.",
  },
  {
    q: "Do I need to count calories to lose weight?",
    a: "No — calorie counting is one tool, not the only path. Many people lose weight successfully through food quality improvements (more whole foods, less ultra-processed food), portion awareness, mindful eating, or time-restricted eating. However, calorie awareness — even approximate — helps most people understand why they are not losing weight when expected. Knowing your TDEE gives you a reference point even if you don't track every meal.",
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
              <span className="text-orange-600 text-lg shrink-0">
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
          How to Use the Calorie Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — no account needed.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Select your units and biological sex",
              body: "Choose imperial (lbs/ft) or metric (kg/cm) and select male or female. Biological sex affects the Mifflin-St Jeor formula because men typically have higher muscle mass, which raises BMR. Use your biological sex assigned at birth for the most accurate calculation.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Non-binary note:</strong> If you don't identify with
                  either option, calculate both and use the average as your
                  baseline. The difference is typically 100–200 calories/day —
                  small enough that the midpoint is a reasonable starting
                  estimate.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter age, weight, and height",
              body: "These three inputs drive the BMR calculation. Use your current weight (not goal weight) and actual height. Age matters because metabolic rate declines roughly 1–2% per decade after age 20 — the formula accounts for this automatically.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Accuracy tip:</strong> Weigh yourself in the morning
                  before eating, without shoes or heavy clothing, for the most
                  consistent measurement. Height should be your standing height
                  without shoes.
                </div>
              ),
            },
            {
              n: 3,
              title: "Select your activity level",
              body: "Choose the level that best matches your typical week — not your best week or goal week. Be honest: most sedentary office workers who exercise 2–3 times per week fall into 'lightly active', not 'moderately active'.",
              enrich: (
                <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                  <strong>The activity multiplier matters most:</strong> The
                  difference between 'sedentary' (×1.2) and 'very active'
                  (×1.725) is a 43% difference in TDEE. Overestimating activity
                  is the most common reason people find their 'maintenance'
                  calories don't actually maintain their weight.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use your TDEE to set a calorie target",
              body: "Your TDEE is your maintenance level. Set a goal: eat at TDEE to maintain, subtract 300–500 to lose fat, add 200–500 to gain muscle. The goal table shows five scenarios from aggressive loss to aggressive gain automatically.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Track and adjust:</strong> After 2 weeks at your
                  target, check your weight trend. If not changing as expected,
                  adjust by 100 calories in the appropriate direction. Real TDEE
                  is found through measurement, not calculation.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white font-black text-lg flex items-center justify-center">
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
              title: "Weight loss planning",
              desc: "Calculate your maintenance calories and set a sustainable deficit target for fat loss.",
            },
            {
              emoji: "💪",
              title: "Muscle gain (bulk)",
              desc: "Find your TDEE and add a modest calorie surplus (200–300 cal) for lean muscle gain.",
            },
            {
              emoji: "🍽️",
              title: "Meal prep calorie targets",
              desc: "Use your daily calorie budget to build meal plans and portion sizes.",
            },
            {
              emoji: "🏃",
              title: "Endurance athlete fuelling",
              desc: "Calculate the calorie needs of high-volume training weeks versus rest days.",
            },
            {
              emoji: "👨\u200d⚕️",
              title: "Patient education",
              desc: "Healthcare professionals can use this to give patients a quick baseline calorie estimate.",
            },
            {
              emoji: "📱",
              title: "Macro planning",
              desc: "Pair your TDEE with the macro calculator to split calories into protein, carb, and fat targets.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-orange-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⚠️</div>
          <h3 className="text-xl font-bold mb-3">
            Not a substitute for medical or nutritional advice
          </h3>
          <p className="text-orange-100 leading-relaxed max-w-xl mx-auto text-sm">
            TDEE calculations are estimates based on population averages.
            Individual metabolism varies. Consult a registered dietitian or
            physician before making significant changes to your diet, especially
            if you have a medical condition.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/calorie-deficit-calculator",
                label: "Calorie Deficit Calculator",
                desc: "Turn your TDEE into a specific deficit target for weight loss.",
              },
              {
                href: "/tools/macro-calculator",
                label: "Macro Calculator",
                desc: "Split your daily calories into protein, carb, and fat macronutrient targets.",
              },
              {
                href: "/tools/ideal-weight-calculator",
                label: "Ideal Weight Calculator",
                desc: "Compare your goal weight against medical ideal weight formulas.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-orange-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
