"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/calorie-deficit-calculator";
const TOOL_NAME = "Calorie Deficit Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7f1d1d", light: "#fff1f2" },
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
    "Free calorie deficit calculator at onlinetoolbase.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How many calories is 1 lb of fat?",
    a: "One pound of body fat contains approximately 3,500 calories. This means a consistent daily deficit of 500 calories should produce roughly 1 pound of fat loss per week. In practice, the relationship is not perfectly linear — water retention, muscle mass changes, and metabolic adaptation mean weekly weight fluctuations don't always reflect pure fat change. The 3,500 cal/lb figure is a reliable planning estimate over periods of 4+ weeks, even if individual weeks vary.",
  },
  {
    q: "What is the maximum safe calorie deficit?",
    a: "Most nutrition guidelines consider a deficit of 500–750 calories per day to be safe and sustainable for most healthy adults. A 1,000 calorie/day deficit (approximately 2 lbs/week loss) is near the upper recommended limit. Deficits larger than 1,000 cal/day risk muscle loss (the body breaks down lean tissue for energy), nutritional deficiencies (harder to meet micronutrient needs on very low calories), metabolic slowdown, and weight regain when normal eating resumes. Medical supervision is recommended for deficits above 1,000 cal/day.",
  },
  {
    q: "What is my TDEE and how do I find it?",
    a: "TDEE (Total Daily Energy Expenditure) is the total calories your body burns per day, including all activity. Use this site's Calorie Calculator to estimate your TDEE based on age, sex, weight, height, and activity level. Alternatively, track your food intake precisely for 2 weeks while your weight stays stable — that intake level is your actual TDEE. The calculator method gives a starting estimate; the tracking method gives your personal true TDEE.",
  },
  {
    q: "How do I preserve muscle while in a calorie deficit?",
    a: "Three key strategies: (1) Keep protein high — aim for 0.7–1g of protein per pound of body weight per day (or 1.6–2.2g per kg). Protein is the primary driver of muscle retention during a deficit. (2) Strength train — resistance exercise signals the body to preserve muscle even when calories are restricted. (3) Don't cut calories too aggressively — a moderate deficit (300–500 cal/day) preserves muscle far better than a severe one. Losing weight slowly (0.5–1% of body weight per week) minimises muscle loss.",
  },
  {
    q: "Why does weight loss slow down over time?",
    a: "As you lose weight, your TDEE decreases because: (1) you are lighter (less body mass to move and maintain), (2) metabolic adaptation — the body becomes more efficient and burns fewer calories at rest, and (3) non-exercise activity thermogenesis (NEAT) often decreases subconsciously when in a deficit. This is normal and expected. Recalculate your TDEE every 4–6 weeks using your updated weight, and adjust your calorie target accordingly.",
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
          How to Use the Calorie Deficit Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — no account needed.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your current and goal weight",
              body: "Input your current weight and your target weight in the same unit (lbs or kg). The calculator computes the total fat mass to lose, which drives all other calculations.",
              enrich: (
                <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                  <strong>Goal weight realism:</strong> Body weight includes
                  muscle, water, bone, and organs — not just fat. A goal weight
                  20 lbs below your current weight may represent as little as
                  12–15 lbs of actual fat loss, depending on composition changes
                  along the way.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your TDEE",
              body: "This is the most important input. Use the Calorie Calculator (linked in the tool) to estimate your TDEE, or use your known maintenance intake if you've tracked it. Accuracy here determines whether your daily calorie target is correct.",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>TDEE check:</strong> If your weight has been stable
                  for 2+ weeks at a consistent intake, that intake is your real
                  TDEE. Use it instead of the calculator estimate for maximum
                  accuracy.
                </div>
              ),
            },
            {
              n: 3,
              title: "Set your timeframe",
              body: "Enter how many weeks you want to achieve your goal in. The calculator shows the required daily deficit and daily calorie target, plus a flag if the deficit is unsafe (above 1,000 cal/day).",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Adjust if flagged as unsafe:</strong> If the
                  calculator shows your deficit as aggressive or unsafe, extend
                  the timeframe until it moves into the 'moderate' or 'gentle'
                  range. Safety and sustainability matter more than speed.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use the safe timeframe as a guide",
              body: "The 'safe timeframe' shown is the minimum weeks at a 500 cal/day deficit (roughly 0.5 kg/week loss) to reach your goal. This is the gold standard for sustainable fat loss — use it as your target if you're unsure how to pace your plan.",
              enrich: (
                <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                  <strong>Recalculate every 4 weeks:</strong> As you lose
                  weight, your TDEE drops. Recalculate every 4–6 weeks with your
                  updated weight to keep your calorie target accurate.
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
              emoji: "🏆",
              title: "Contest prep",
              desc: "Calculate precise deficits for bodybuilding or physique competition cutting phases with specific deadlines.",
            },
            {
              emoji: "👗",
              title: "Event deadline",
              desc: "Work backwards from a wedding, holiday, or reunion to find a safe, achievable deficit plan.",
            },
            {
              emoji: "📉",
              title: "Plateau breaking",
              desc: "Recalculate with current weight after a plateau to see if your deficit has shrunk as your TDEE dropped.",
            },
            {
              emoji: "🥗",
              title: "Diet planning",
              desc: "Use the daily calorie target to build meal plans with appropriate calorie totals.",
            },
            {
              emoji: "🏃",
              title: "Endurance athlete cut",
              desc: "Calculate a modest deficit that doesn't impair training performance.",
            },
            {
              emoji: "📊",
              title: "Progress tracking",
              desc: "Recalculate every 4–6 weeks with updated weight to keep the plan on track.",
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
        <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⚠️</div>
          <h3 className="text-xl font-bold mb-3">
            Prioritise safety over speed
          </h3>
          <p className="text-red-100 leading-relaxed max-w-xl mx-auto text-sm">
            Aggressive calorie deficits can cause muscle loss, nutritional
            deficiencies, and hormonal disruption. Results are estimates. If you
            have a medical condition or eating disorder history, consult a
            healthcare professional before restricting calories.
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
                desc: "Calculate your TDEE — the essential input for this deficit calculator.",
              },
              {
                href: "/tools/macro-calculator",
                label: "Macro Calculator",
                desc: "Split your deficit calories into protein, carb, and fat targets.",
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
