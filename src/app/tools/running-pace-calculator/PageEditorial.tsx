"use client";
// src/app/tools/running-pace-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/running-pace-calculator";
const TOOL_NAME = "Running Pace Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7c2d12", light: "#fff7ed" },
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
    "Free running pace calculator — calculate pace, time, or distance for any race",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How is running pace calculated?",
    a: "Pace = Time ÷ Distance. If you run 10 km in 55 minutes, your pace is 55 ÷ 10 = 5:30 per km. In miles: 55 ÷ 6.214 miles = 8:51 per mile. The calculator handles all three directions — find pace, find time, or find distance — and displays results in both imperial and metric units simultaneously.",
  },
  {
    q: "What is a good running pace for beginners?",
    a: "For beginner runners, any pace that allows you to hold a full conversation is appropriate — typically 10–13 minutes per mile (6:12–8:04 per km). The primary goal in the first 3–6 months of running is building aerobic base and injury resilience, not speed. Pace naturally improves as fitness develops without specifically targeting it.",
  },
  {
    q: "What paces correspond to common race finish times?",
    a: "Marathon sub-4h: 5:41/km (9:09/mile). Sub-3:30: 4:58/km (8:00/mile). Sub-3h: 4:16/km (6:52/mile). Half sub-2h: 5:41/km (9:09/mile). Sub-1:45: 4:58/km (8:00/mile). 5K sub-30min: 6:00/km (9:39/mile). Sub-25min: 5:00/km (8:03/mile). Sub-20min: 4:00/km (6:26/mile).",
  },
  {
    q: "How do I convert pace to speed (mph or km/h)?",
    a: "Speed (mph) = 60 ÷ pace (min/mile). A 9:00/mile pace = 60 ÷ 9 = 6.67 mph. Speed (km/h) = 60 ÷ pace (min/km). A 5:30/km pace = 60 ÷ 5.5 = 10.9 km/h. Runners use pace because it maps directly to effort and race strategy, while speed is more useful on treadmills and for comparing to cycling.",
  },
  {
    q: "What is negative splitting in running?",
    a: "Negative splitting means running the second half of a race faster than the first. It is the most efficient racing strategy for most distances because it conserves glycogen early, avoids early lactic acid buildup, and allows a strong finish when competitors are fading. For beginner runners, even pacing is a safer and more achievable goal than planned negative splits.",
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
              <span className="text-orange-500 text-lg shrink-0">
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
        aria-labelledby="how-to-use-heading"
      >
        <h2
          id="how-to-use-heading"
          className="text-4xl font-bold text-gray-900 mb-4 text-center"
        >
          How to Use the Running Pace Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter any two of pace, distance, or time to instantly calculate the
          third — with mile and km splits for race planning.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose what you want to calculate",
              body: "Click Find Pace, Find Time, or Find Distance. The calculator activates the two relevant input fields and computes the missing value instantly. Use Find Pace to plan race strategy, Find Time to predict a finish, or Find Distance to see how far you'll run in a set time.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Race goal example:</strong> To find the pace needed
                  for a sub-4 hour marathon, click Find Pace, enter 42.195 km
                  distance and 4:00:00 time. The result is the maximum pace per
                  km you can afford at each split.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter distance and choose units",
              body: "Type your distance and select km or miles. Use the race preset buttons — 5K, 10K, Half Marathon, Marathon — to instantly fill the distance field with the exact standard race distance in your chosen unit. The calculator converts between imperial and metric automatically.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Common distances:</strong> 5K = 3.107 miles, 10K =
                  6.214 miles, Half Marathon = 21.097 km / 13.109 miles,
                  Marathon = 42.195 km / 26.219 miles.
                </div>
              ),
            },
            {
              n: 3,
              title: "Enter time or pace",
              body: "For time, use the separate hours, minutes, and seconds fields — leave hours blank for runs under an hour. For pace, enter minutes and seconds per km or miles using the toggle. The calculator handles any combination and displays both units in the results.",
              enrich: (
                <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                  <strong>Pace format:</strong> A pace of 5:30/km means each
                  kilometre takes 5 minutes and 30 seconds. This equals
                  8:51/mile. Results always display both units so you can use
                  whichever your GPS watch or app shows.
                </div>
              ),
            },
            {
              n: 4,
              title: "Read your results and km splits",
              body: "The result panel shows pace per km and per mile, total time, and distance. Scroll through the km split table to see the expected cumulative time at each kilometre marker based on even pacing — useful for programming into a GPS watch or printing to carry in a race.",
              enrich: (
                <div className="bg-yellow-50 rounded-xl px-5 py-4 text-sm text-yellow-800 leading-relaxed">
                  <strong>Negative splits strategy:</strong> For race day, aim
                  to pass each split slightly under your target time — not over.
                  Building a small buffer in the first half gives you room to
                  slow slightly in the final kilometres if needed without
                  missing your goal time.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🏁",
              title: "Race goal pace planning",
              desc: "Calculate the exact per-km pace needed to hit your marathon, half, or 5K goal time, then programme it into your GPS watch.",
            },
            {
              emoji: "📊",
              title: "Training run time estimates",
              desc: "Estimate how long a planned training route will take at your current fitness pace before heading out the door.",
            },
            {
              emoji: "⏱️",
              title: "Treadmill interval settings",
              desc: "Convert a target pace (e.g. 5:00/km) into km/h or mph for treadmill speed settings.",
            },
            {
              emoji: "📈",
              title: "Progress tracking",
              desc: "Compare your pace for the same distance over weeks and months to see objective fitness improvement from your training plan.",
            },
            {
              emoji: "🌍",
              title: "Unit conversion",
              desc: "Convert race results between European km-based paces and mile-based paces for international comparison and communication.",
            },
            {
              emoji: "🗓️",
              title: "Race selection",
              desc: "Calculate whether your current fitness pace meets the entry standard or age group cutoff for a target event.",
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

        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            All calculations run in your browser
          </h3>
          <p className="text-orange-100 leading-relaxed max-w-xl mx-auto text-sm">
            No data is sent to any server. Pace, time, and distance calculations
            happen entirely in JavaScript on your device — instant and private.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/speed-distance-time-calculator",
                label: "Speed Distance Time Calculator",
                desc: "General speed, distance, and time calculations for any scenario.",
              },
              {
                href: "/tools/calorie-calculator",
                label: "Calorie Calculator",
                desc: "Estimate how running affects your daily calorie needs and TDEE.",
              },
              {
                href: "/tools/water-intake-calculator",
                label: "Water Intake Calculator",
                desc: "Calculate hydration needs for longer runs and training sessions.",
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
