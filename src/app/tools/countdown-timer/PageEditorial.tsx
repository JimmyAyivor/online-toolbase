"use client";
// src/app/tools/batch9/countdown-timer/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/countdown-timer";
const TOOL_NAME = "Countdown Timer";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#312e81", light: "#eef2ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5">
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
    "Free countdown timer — try it at https://www.onlinetoolbase.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is the Pomodoro Technique?",
    a: "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It involves working in 25-minute focused intervals (Pomodoros) separated by 5-minute short breaks, with a longer 15–30 minute break after every four Pomodoros. The 25-minute preset in this timer is specifically designed for Pomodoro sessions. Research supports short work sprints for maintaining concentration and reducing mental fatigue over long work periods.",
  },
  {
    q: "How do I use a countdown timer for studying?",
    a: "For studying, the most effective approach is fixed-interval timing. Set a 25–45 minute timer and commit to working only on one topic until it ends — no phone, no context switching. When the timer completes, take a genuine 5–10 minute break away from the screen. This method, supported by research on deliberate practice, helps build sustained concentration over time. Track how many focused sessions you complete per day for a concrete measure of productive study time.",
  },
  {
    q: "Can I use a timer for cooking?",
    a: "Yes — kitchen timing is one of the most practical uses. Set the timer for your cooking duration, add a label like 'Pasta' or 'Roast chicken', and keep the browser tab open. The tab shows the remaining time in the title, so you can monitor it while using other tabs. For recipes requiring multiple timers simultaneously, open the tool in multiple browser tabs.",
  },
  {
    q: "Does the timer continue if I change browser tabs?",
    a: "Yes — the countdown uses JavaScript's setInterval which continues running in the background when you switch tabs. However, some mobile browsers aggressively suspend background tabs to save battery. For reliable background timing on mobile, keep the timer tab visible or adjust your browser's background activity settings. Desktop browsers are generally reliable for background timers.",
  },
  {
    q: "What is the difference between a countdown timer and a stopwatch?",
    a: "A countdown timer counts down from a set duration to zero — you define the end point. A stopwatch counts up from zero — you measure elapsed time. Use a countdown timer when you have a fixed duration to manage (cooking, work sprints, exam time limits). Use a stopwatch when you are measuring how long something takes without a predefined limit (running laps, task time tracking).",
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
              <span className="text-indigo-600 text-lg shrink-0">
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
          How to Use the Countdown Timer
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — everything you need in one place.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Set the timer duration",
              body: "Use the + and − buttons to set hours, minutes, and seconds — or click a quick preset (5 min, 10 min, 25 min Pomodoro, 30 min, 1 hour). The display updates to show your chosen duration.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Pomodoro tip:</strong> The 25-minute preset is
                  calibrated for a single Pomodoro session. After 4 sessions,
                  take a 25-minute long break to restore focus.
                </div>
              ),
            },
            {
              n: 2,
              title: "Add an optional label",
              body: "Type a short label like 'Deep work', 'Pasta cooking', or 'Meeting prep' in the label field. The label shows on the timer display so you always know what you're timing — useful for time-blocking or cooking multiple items.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Time-blocking tip:</strong> Label each timer with the
                  task you're working on. Reviewing your completed timers at the
                  end of the day gives a concrete record of where your time
                  went.
                </div>
              ),
            },
            {
              n: 3,
              title: "Start and monitor progress",
              body: "Click Start to begin the countdown. A progress bar fills as time elapses. Click Pause at any point to pause — the remaining time is preserved. Click Resume to continue from where you paused.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Focus tip:</strong> Once started, minimise
                  distractions. Put your phone face-down and close unrelated
                  browser tabs. The value of a countdown timer comes from
                  committing fully to the session duration.
                </div>
              ),
            },
            {
              n: 4,
              title: "Respond to the completion alert",
              body: "When the timer reaches zero, the display shows a pulsing alarm indicator and a 'Time's up!' message. Click Reset to set up a new timer. For repeated sessions (e.g. Pomodoro cycles), simply click Reset and Start again.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Recurring sessions:</strong> For Pomodoro or interval
                  training, use the Reset and Start pattern to maintain your
                  cycle rhythm. Track how many sessions you complete in a day.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🍅",
              title: "Pomodoro sessions",
              desc: "Set 25-minute timers for focused work sprints — the most research-backed productivity technique.",
            },
            {
              emoji: "🍳",
              title: "Cooking timers",
              desc: "Time your pasta, roast, or bake precisely. Add a label and keep the tab open while you cook.",
            },
            {
              emoji: "🏋️",
              title: "Workout intervals",
              desc: "Set rest periods and work intervals for HIIT, circuit training, and strength sets.",
            },
            {
              emoji: "📚",
              title: "Exam and quiz practice",
              desc: "Simulate timed exam conditions to practise working under time pressure.",
            },
            {
              emoji: "🎯",
              title: "Meeting time limits",
              desc: "Set a visible countdown during meetings to keep discussions on schedule.",
            },
            {
              emoji: "🧘",
              title: "Meditation sessions",
              desc: "Time your meditation or breathing practice without needing to check a clock.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            100% private — runs in your browser
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
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
                href: "/tools/online-stopwatch",
                label: "Online Stopwatch",
                desc: "Measure elapsed time with lap recording for interval training and task tracking.",
              },
              {
                href: "/tools/meeting-cost-calculator",
                label: "Meeting Cost Calculator",
                desc: "Calculate the labour cost of meetings — use with a timer to stay on schedule.",
              },
              {
                href: "/tools/countdown-timer",
                label: "Countdown Timer",
                desc: "You are here.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
