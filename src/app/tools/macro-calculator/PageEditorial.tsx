"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/macro-calculator";
const TOOL_NAME = "Macro Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#78350f", light: "#fffbeb" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-amber-100 shadow-inner mb-5">
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
    "Free macro calculator at onlinetoolbase.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What are macronutrients?",
    a: "Macronutrients are the three main categories of nutrients that provide calories: protein (4 cal/g), carbohydrates (4 cal/g), and fat (9 cal/g). Everything you eat contains some combination of these three. 'Counting macros' means tracking the grams of each macronutrient consumed daily to hit targets aligned with your fitness goal — rather than just tracking total calories. This approach provides more nuanced control over body composition (the ratio of muscle to fat) than calorie counting alone.",
  },
  {
    q: "How much protein do I actually need?",
    a: "For general health, the Recommended Dietary Allowance (RDA) is 0.8g per kg of body weight. For body composition goals — muscle building or fat loss while preserving muscle — research supports 1.6–2.2g per kg (roughly 0.7–1g per pound). Athletes doing high-volume training may benefit from the upper end of this range. Very high protein intakes (above 3g/kg) do not appear to provide additional benefit and are unnecessary. The macro calculator uses evidence-based targets adjusted for your selected goal.",
  },
  {
    q: "What is the difference between the macros for weight loss vs muscle gain?",
    a: "For fat loss: the goal is to maintain muscle while losing fat, which requires high protein (to preserve lean tissue), moderate fat (for hormonal health), and lower carbs (to create the calorie deficit). For muscle gain: carbohydrates are prioritised higher because they fuel training performance and support the anabolic processes of muscle protein synthesis. Fat is kept moderate; protein remains high. The calorie total differs significantly — a deficit for fat loss, a surplus for muscle gain.",
  },
  {
    q: "What is a ketogenic macro split?",
    a: "A ketogenic (keto) diet typically involves very low carbohydrates (20–50g per day, or under 5–10% of calories), high fat (65–75% of calories), and moderate protein (20–30% of calories). The goal is to induce ketosis — a metabolic state where the body burns fat for fuel instead of glucose. The macro calculator does not have an explicit keto preset, but you can approximate it: select a goal that gives the highest fat percentage, then note that the carbohydrate target would need to be reduced further for true ketosis.",
  },
  {
    q: "Do I need to hit my macros exactly every day?",
    a: "No — macro targets are averages over time, not daily requirements that must be hit precisely. Being within ±5g of protein and ±10g of carbs and fat on most days is practically equivalent to hitting targets exactly. Weekly averages matter more than daily perfection. The most important macro to prioritise is protein — getting adequate protein is the most impactful single variable for body composition. Carbs and fat can be more flexible as long as total calories are approximately correct.",
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
              <span className="text-amber-600 text-lg shrink-0">
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
          How to Use the Macro Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — no account needed.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your TDEE",
              body: "Input your Total Daily Energy Expenditure — this is the calorie foundation that all macro splits are based on. Use the Calorie Calculator on this site or your known maintenance intake if you've tracked it precisely.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>TDEE accuracy:</strong> If you don't know your TDEE,
                  the Calorie Calculator link in the tool computes it. Start
                  with that estimate and adjust after 2–4 weeks based on actual
                  weight trend.
                </div>
              ),
            },
            {
              n: 2,
              title: "Select your fitness goal",
              body: "Choose from Lose Fat, Maintain, Lean Gain, or Bulk. Each goal applies a different calorie adjustment (deficit or surplus) and a different macro percentage split optimised for that outcome.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Goal-specific splits:</strong> Fat loss: high protein,
                  moderate fat, lower carb. Lean gain: moderate protein, higher
                  carbs, moderate fat. Bulk: higher calories overall, more
                  carb-forward. Maintenance: balanced split.
                </div>
              ),
            },
            {
              n: 3,
              title: "Review your daily macro targets",
              body: "The results show your daily calorie target and grams of protein, carbohydrates, and fat. The percentage breakdown is shown for each macronutrient. Use these gram targets when logging food in apps like MyFitnessPal or Cronometer.",
              enrich: (
                <div className="bg-yellow-50 rounded-xl px-5 py-4 text-sm text-yellow-800 leading-relaxed">
                  <strong>Set app targets:</strong> In MyFitnessPal: Settings →
                  Goals → Custom Macros. Enter the gram targets from this
                  calculator for precise tracking aligned to your goal.
                </div>
              ),
            },
            {
              n: 4,
              title: "Track and adjust after 4 weeks",
              body: "Run the macro calculation again with your updated weight every 4–6 weeks. As your body weight changes, your TDEE and therefore your calorie and macro targets shift. Recalculating keeps your plan accurate throughout your journey.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>The protein priority rule:</strong> If tracking all
                  three macros feels overwhelming, start with just protein. Hit
                  your daily protein target and let carbs and fat fill in the
                  remaining calories. Protein adherence alone drives most of the
                  benefit.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "💪",
              title: "Bodybuilding contest prep",
              desc: "Set precise macro splits for cutting and bulking phases to optimise body composition changes.",
            },
            {
              emoji: "🥗",
              title: "Flexible dieting (IIFYM)",
              desc: "Use macro targets as a flexible framework — 'If It Fits Your Macros' — for food choices.",
            },
            {
              emoji: "🏃",
              title: "Endurance sport fuelling",
              desc: "Calculate carbohydrate targets appropriate for high-volume running, cycling, or triathlon training.",
            },
            {
              emoji: "🧑\u200d⚕️",
              title: "Post-surgery recovery",
              desc: "Higher protein targets support tissue repair and recovery after operations.",
            },
            {
              emoji: "📱",
              title: "Meal prep planning",
              desc: "Use daily gram targets to plan and prep meals with accurate macro totals for the week.",
            },
            {
              emoji: "🎓",
              title: "Nutrition education",
              desc: "Understand how different goals (fat loss vs muscle gain) produce different macro splits and why.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-amber-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⚠️</div>
          <h3 className="text-xl font-bold mb-3">
            Individual nutrition needs vary — these are starting points
          </h3>
          <p className="text-amber-100 leading-relaxed max-w-xl mx-auto text-sm">
            Macronutrient targets are population-level estimates. Individual
            needs vary based on health conditions, metabolic rate, training
            load, and goals. Consult a registered dietitian for personalised
            nutrition planning.
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
                desc: "Calculate your TDEE — the essential first input for macro planning.",
              },
              {
                href: "/tools/calorie-deficit-calculator",
                label: "Calorie Deficit Calculator",
                desc: "Build a deficit plan if fat loss is your goal.",
              },
              {
                href: "/tools/protein-intake-calculator",
                label: "Protein Intake Calculator",
                desc: "Get a detailed breakdown of daily protein needs by goal and body weight.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-amber-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
