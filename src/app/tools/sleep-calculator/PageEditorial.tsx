"use client";
// src/app/tools/sleep-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/sleep-calculator";
const TOOL_NAME = "Sleep Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#4c1d95", light: "#f5f3ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-violet-100 shadow-inner mb-5">
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
    "Free sleep calculator — find the best bedtime or wake-up time based on 90-minute sleep cycles",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How long is a sleep cycle?",
    a: "A complete sleep cycle lasts approximately 90 minutes and progresses through four stages: N1 (light sleep, 5–10 min), N2 (light-medium sleep, 20 min), N3 (deep/slow-wave sleep, 20–40 min), and REM (rapid eye movement sleep, 10–20 min, increasing in later cycles). REM sleep, associated with memory consolidation and dreaming, becomes longer in later cycles — cutting sleep short disproportionately reduces REM.",
  },
  {
    q: "How many hours of sleep do adults need?",
    a: "The CDC and WHO recommend 7–9 hours per night for adults aged 18–64, and 7–8 hours for adults 65+. Teenagers need 8–10 hours; school-age children 9–12 hours. There is meaningful genetic variation — roughly 3% of the population genuinely thrive on 6 hours — but most people who believe they 'do fine on 6 hours' have adapted to chronic sleep deprivation without recognising impaired cognitive performance.",
  },
  {
    q: "What is sleep inertia?",
    a: "Sleep inertia is the groggy, disoriented feeling experienced immediately after waking — especially when woken from deep N3 sleep. It typically lasts 15–60 minutes and is accompanied by reduced cognitive performance and reaction time. Waking at the end of a 90-minute cycle, when sleep is naturally in the lighter N1 or N2 stage, significantly reduces sleep inertia — which is the core principle behind this Sleep Calculator.",
  },
  {
    q: "Does napping affect night sleep?",
    a: "Short naps of 20–30 minutes improve alertness and performance without significantly affecting night sleep if taken before 3 PM. Naps longer than 30 minutes risk sleep inertia from waking mid-cycle, and can reduce sleep pressure (adenosine buildup) that drives night sleep onset. Avoid napping after 3 PM if you struggle with falling asleep at night.",
  },
  {
    q: "How does caffeine affect sleep quality?",
    a: "Caffeine blocks adenosine receptors, reducing feelings of sleepiness. Its half-life is approximately 5–7 hours, meaning half the caffeine in a 3 PM coffee is still active at 8–10 PM. The general recommendation is to cut off caffeine at least 6 hours before your target bedtime. Sensitivity varies significantly by individual based on the CYP1A2 gene variant — some people metabolise caffeine twice as fast as others.",
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
              <span className="text-violet-600 text-lg shrink-0">
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
          How to Use the Sleep Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your wake-up time or bedtime to get a list of optimal sleep
          times aligned with 90-minute sleep cycles — wake up refreshed, not
          groggy.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose your mode",
              body: "Select Find Bedtime to calculate when to go to sleep given a desired wake-up time, or Find Wake-Up Time to calculate when to set your alarm given a set bedtime. Both modes account for the time it takes to fall asleep before the first cycle begins.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Most useful mode:</strong> Find Bedtime is most
                  practical for workday planning — you know what time you must
                  wake up, and need to know the latest you can go to bed while
                  still completing enough full cycles.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your time",
              body: "Type your wake-up or bedtime in hours and minutes, selecting AM or PM. The calculator accepts standard 12-hour format. The results update in real time as you type — no button press needed.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Common wake times:</strong> Use quick reference — if
                  you need to wake at 6:30 AM, the recommended 5-cycle bedtime
                  (7.5 hours + onset) is approximately 10:46 PM.
                </div>
              ),
            },
            {
              n: 3,
              title: "Adjust your sleep onset time",
              body: "The slider sets how long it typically takes you to fall asleep — the default is 14 minutes (population average). If you usually fall asleep in 5 minutes, reduce it. If it takes you 30+ minutes, increase the slider. This is subtracted from total sleep time so the cycle windows are accurate.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>
                    Taking longer than 20 minutes to fall asleep consistently?
                  </strong>{" "}
                  This may indicate poor sleep hygiene (blue light before bed,
                  inconsistent schedule, caffeine timing) or stress-related
                  insomnia. The military sleep technique — progressive body
                  relaxation — can reduce onset time significantly.
                </div>
              ),
            },
            {
              n: 4,
              title: "Choose a cycle count from the results",
              body: "The results show bedtimes or wake times for 4 cycles (6 hours), 5 cycles (7.5 hours), and 6 cycles (9 hours). The 5-cycle option is highlighted as the recommended amount for most adults. Pick the one that fits your schedule while completing the most full cycles possible.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Cycles
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Sleep time
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "4 cycles",
                          "6 hours",
                          "Minimum — use only occasionally",
                        ],
                        [
                          "5 cycles",
                          "7.5 hours",
                          "Recommended for most adults",
                        ],
                        [
                          "6 cycles",
                          "9 hours",
                          "Recovery, illness, adolescents",
                        ],
                      ].map(([c, h, b]) => (
                        <tr key={c} className="hover:bg-violet-50">
                          <td className="px-4 py-2 font-medium text-gray-800">
                            {c}
                          </td>
                          <td className="px-4 py-2 text-violet-700 font-bold">
                            {h}
                          </td>
                          <td className="px-4 py-2 text-gray-500">{b}</td>
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
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "⏰",
              title: "Optimal alarm setting",
              desc: "Find the wake time that aligns with the end of a natural cycle so your alarm goes off at the lightest point of sleep — not mid-deep-sleep.",
            },
            {
              emoji: "😴",
              title: "Power nap planning",
              desc: "Calculate a nap start time that lets you complete exactly one 90-minute cycle and wake up refreshed rather than groggy.",
            },
            {
              emoji: "✈️",
              title: "Jet lag recovery",
              desc: "After crossing time zones, calculate a new bedtime in local timezone that aligns with full cycles and a desired wake time.",
            },
            {
              emoji: "🧑‍💻",
              title: "Night shift planning",
              desc: "Calculate optimal sleep windows for rotating or night shift workers to maximise cycle completeness within available sleep time.",
            },
            {
              emoji: "📚",
              title: "Exam preparation",
              desc: "Ensure you wake at the end of a sleep cycle before an important exam or performance event to maximise alertness and cognitive speed.",
            },
            {
              emoji: "🌙",
              title: "Sleep schedule reset",
              desc: "After disrupted sleep (illness, travel, newborn), use the calculator to gradually shift bedtime toward a cycle-aligned schedule.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-violet-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">😴</div>
          <h3 className="text-xl font-bold mb-3">
            For educational purposes only — not medical advice
          </h3>
          <p className="text-violet-100 leading-relaxed max-w-xl mx-auto text-sm">
            Sleep needs vary by individual. Persistent sleep difficulties may
            indicate a sleep disorder such as insomnia or sleep apnoea. Consult
            a healthcare provider if you consistently struggle to fall asleep,
            stay asleep, or feel rested despite adequate time in bed.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/water-intake-calculator",
                label: "Water Intake Calculator",
                desc: "Proper hydration supports deep sleep quality.",
              },
              {
                href: "/tools/calorie-calculator",
                label: "Calorie Calculator",
                desc: "Nutrition timing also affects sleep — understand your energy needs.",
              },
              {
                href: "/tools/countdown-timer",
                label: "Countdown Timer",
                desc: "Set a bedtime countdown reminder.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-violet-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
