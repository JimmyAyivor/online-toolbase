"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/online-stopwatch";
const TOOL_NAME = "Online Stopwatch";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#164e63", light: "#ecfeff" },
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
    "Free online stopwatch at https://www.onlinetoolbase.com",
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
    q: "What is the difference between a stopwatch and a countdown timer?",
    a: "A stopwatch counts up from zero and measures elapsed time without a predefined limit. A countdown timer counts down from a set duration to zero. Use a stopwatch when you are measuring how long something takes (running a mile, completing a task, timing a presentation). Use a countdown timer when you have a fixed duration to manage (cooking, Pomodoro sessions, exam time limits). Both are available as separate tools here.",
  },
  {
    q: "How accurate is a browser-based stopwatch?",
    a: "This stopwatch uses requestAnimationFrame combined with Date.now() for timing, which is accurate to within a few milliseconds for typical human activity. For scientific measurement or competitive athletics where sub-millisecond accuracy is required, use a certified timing system. For most practical purposes — interval training, cooking, task timing — the browser stopwatch is more than adequate.",
  },
  {
    q: "What is a lap time?",
    a: "A lap time records both the split time (time for just that lap) and the cumulative time at the point the lap was recorded. In running, each lap split tells you your pace for that segment. In task timing, each lap records how long a specific stage took. The stopwatch highlights the fastest split in green and the slowest in red when two or more laps have been recorded, making it easy to identify outliers.",
  },
  {
    q: "Can I use the stopwatch for interval training?",
    a: "Yes — use the Lap button to mark the end of each work and rest interval. This gives you a complete split record for your session. For example: start the stopwatch, lap at the end of each 30-second sprint, lap at the end of each 30-second rest. You can see every split time individually and identify if your splits are consistent or degrading across the session.",
  },
  {
    q: "Does the stopwatch pause if I lock my phone screen?",
    a: "Mobile browsers typically pause JavaScript execution when the screen locks, which will pause the stopwatch. For uninterrupted mobile timing, keep the screen active or use a native stopwatch app. Desktop browsers generally continue running JavaScript when the window is minimised or when you switch between applications.",
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
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How to Use the Online Stopwatch
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Start the stopwatch",
              body: "Click the Start button to begin timing from zero. The centisecond display updates at high frequency for precise reading. The display shows minutes, seconds, and centiseconds (hundredths of a second).",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Keyboard tip:</strong> Once the stopwatch is running,
                  use the buttons to keep your eyes on your activity rather than
                  the screen.
                </div>
              ),
            },
            {
              n: 2,
              title: "Record lap times",
              body: "Click the Lap button during a run to record a split. Each lap shows the split time (time for that lap alone) and the cumulative total time. Fastest split is highlighted green, slowest in red — useful for interval training and pace analysis.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Task timing tip:</strong> For knowledge work, use laps
                  to track time on different stages of a project — e.g. lap at
                  the end of research, lap at the end of drafting, lap at the
                  end of editing.
                </div>
              ),
            },
            {
              n: 3,
              title: "Pause and resume",
              body: "Click Pause to freeze the timer at any point — the current time is preserved exactly. Click Resume to continue from the same point. Use this for tasks with legitimate interruptions like phone calls or breaks.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Accurate timing:</strong> Pausing and resuming
                  maintains precision. The elapsed time shown is always the true
                  worked time excluding pauses.
                </div>
              ),
            },
            {
              n: 4,
              title: "Reset for a new session",
              body: "Click Reset to return the timer to zero and clear all lap records. Use this at the start of each new timing session. Consider noting your results before resetting if you want to keep a record.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Record keeping:</strong> For training, copy your lap
                  splits into a training log before resetting. Tracking splits
                  over weeks shows improvement in pace consistency.
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
              title: "Running and athletics",
              desc: "Record lap splits for each kilometre or mile to track pace consistency and identify fade points.",
            },
            {
              emoji: "🏋️",
              title: "Interval training",
              desc: "Time each work and rest interval precisely with lap recording for HIIT, circuits, and strength training.",
            },
            {
              emoji: "⏱️",
              title: "Task time tracking",
              desc: "Use laps to record time on each stage of a project for billing, productivity analysis, or retrospectives.",
            },
            {
              emoji: "🍳",
              title: "Kitchen timing",
              desc: "Time cooking steps precisely — especially useful for recipes requiring sequential stages.",
            },
            {
              emoji: "🎤",
              title: "Presentation rehearsal",
              desc: "Time rehearsals against your target duration and record lap times for each section.",
            },
            {
              emoji: "🎮",
              title: "Speed running",
              desc: "Accurately time game speed runs and individual segment splits for comparison across attempts.",
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
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            100% private — runs in your browser
          </h3>
          <p className="text-cyan-100 leading-relaxed max-w-xl mx-auto text-sm">
            All processing happens locally in JavaScript on your device. Nothing
            is sent to any server.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/countdown-timer",
                label: "Countdown Timer",
                desc: "Set a fixed countdown when you need a defined end time rather than elapsed time tracking.",
              },
              {
                href: "/tools/meeting-cost-calculator",
                label: "Meeting Cost Calculator",
                desc: "Calculate the cost of time spent in meetings.",
              },
              {
                href: "/tools/running-pace-calculator",
                label: "Running Pace Calculator",
                desc: "Calculate your pace, distance, and finish time for races.",
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
