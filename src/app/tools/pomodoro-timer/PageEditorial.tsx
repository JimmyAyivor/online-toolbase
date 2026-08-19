"use client";
// src/app/tools/pomodoro-timer/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/pomodoro-timer";
const TOOL_NAME = "Pomodoro Timer";

// ─── QR Modal ────────────────────────────────────────────────────────────────

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7f1d1d", light: "#fff7ed" },
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
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          aria-label="Close QR code modal"
        >
          ✕
        </button>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 mb-4 shadow-lg">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-white"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="3" height="3" rx="0.5" />
            <rect x="18" y="14" width="3" height="3" rx="0.5" />
            <rect x="14" y="18" width="3" height="3" rx="0.5" />
            <rect x="18" y="18" width="3" height="3" rx="0.5" />
          </svg>
        </div>
        <h3 className="text-lg font-black text-gray-900 mb-1">
          Take it with you
        </h3>
        <p className="text-sm text-gray-400 mb-5 leading-relaxed">
          Scan with your phone camera to open the {TOOL_NAME} on mobile
        </p>
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-red-100 shadow-inner mb-5">
          <canvas ref={canvasRef} />
        </div>
        <p className="text-xs text-gray-300 font-mono break-all">{TOOL_URL}</p>
      </div>
    </div>
  );
}

// ─── Share Bar ────────────────────────────────────────────────────────────────

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free Pomodoro timer — 25-min focus intervals, 5-min short breaks, 15-min long breaks, fully customisable. Session tracking and audio alert. No signup.",
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
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
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
              Share the tool or scan to open it on your phone
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${label}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                {icon}
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is the Pomodoro Technique?",
    a: "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The method uses a timer to break work into 25-minute focused intervals (called 'Pomodoros' after the Italian word for tomato, from the tomato-shaped kitchen timer Cirillo used as a student) separated by short breaks. The standard sequence is: 25 minutes of focused work, 5-minute short break, repeat for 4 cycles, then take a longer 15-minute break. The technique aims to improve focus by creating defined time boxes, reduce the impact of internal and external distractions by encouraging you to note interruptions rather than act on them immediately, and manage mental fatigue by enforcing regular rest.",
  },
  {
    q: "Why 25 minutes? Can I change the interval length?",
    a: "Cirillo originally chose 25 minutes as the interval duration based on his observation that this was a sustainable focus period for most tasks before mental fatigue set in. Research since then has varied on the 'optimal' focus window — some studies suggest 52-minute work periods with 17-minute breaks (the popular '52/17' variation), others suggest 90-minute 'ultradian rhythm' cycles. The most important principle is consistency: whatever interval length you choose, maintaining it regularly across multiple sessions is more important than the specific duration. This timer is fully customisable — adjust work, short break, and long break durations in settings to match your personal focus rhythm.",
  },
  {
    q: "When should I take a break if I'm in flow?",
    a: "The Pomodoro Technique is intentionally prescriptive — you end the session when the timer goes off even if you're mid-task. This is by design: the end of a Pomodoro is meant to be a hard stop, and making a note of where you are before taking the break. The reasoning is that enforcing breaks prevents the kind of unrecognised mental fatigue that degrades work quality without feeling tiring. If you find yourself consistently in flow when the timer goes off, consider extending your work interval to 35 or 45 minutes in settings — the underlying principle matters more than the specific number.",
  },
  {
    q: "What should I do during a Pomodoro break?",
    a: "Short breaks (5 minutes) should involve complete disconnection from work: stand up and move around, stretch, look out a window at a distant point (helps eye strain from screens), get water or a snack, or simply breathe. Avoid checking work emails, social media, or news during short breaks — these activities engage the same prefrontal cortex activity as work and don't provide the cognitive rest the break is meant to deliver. Long breaks (15 minutes) allow for a more complete rest: a short walk outside, a conversation with a colleague or friend, light exercise, or simple relaxation. The goal is to return to the next Pomodoro with fully refreshed attention.",
  },
  {
    q: "Does the Pomodoro Technique work for creative or collaborative work?",
    a: "The technique works well for tasks with clear deliverables and independent execution — writing, coding, studying, analysis, and design work. It is less suitable for collaborative work requiring continuous communication, meetings, or creative sessions where interruptions break the creative flow in ways that are difficult to resume. Many professionals use a hybrid approach: Pomodoros for deep independent work and unstructured time for collaborative or creative sessions. Some creatives extend intervals to 50–90 minutes for creative work while keeping the break structure. Experiment with interval lengths and observe which combination produces your best output quality.",
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
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-semibold text-gray-900 text-sm">
                {faq.q}
              </span>
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
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

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
          How to Use the Pomodoro Timer
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Click Start to begin a 25-minute work session, take a 5-minute break
          when prompted, and continue the cycle — a long break is triggered
          after every 4 sessions.
        </p>

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Set your task intention
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Before clicking Start, decide what you will work on during this
                Pomodoro. Write it down or think it through specifically —
                'finish the intro section of the report' rather than 'work on
                the report'. A clear intention reduces the time spent deciding
                what to do and increases the likelihood you will complete the
                session focused on a single objective.
              </p>
              <div className="bg-red-50 text-red-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>Distraction management:</strong> When an unrelated
                thought, task, or interruption arises during a session, write it
                down briefly ('check email from Tom', 'fix sidebar bug') and
                return to it after the Pomodoro ends. This 'parking lot'
                approach prevents distractions from breaking your focus while
                ensuring you don't forget important items.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Click Start and work with full focus
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click Start to begin the 25-minute countdown. Work on your
                intended task with full attention until the timer ends. Avoid
                checking messages, social media, or unrelated tasks. The timer
                in the browser tab updates the page title so you can monitor
                progress at a glance without switching to the tool.
              </p>
              <div className="bg-orange-50 text-orange-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>If the timer is interrupted:</strong> If an unavoidable
                interruption stops your Pomodoro (a genuine emergency, a
                critical synchronous need), click Reset and start the session
                again from scratch when you return — an incomplete Pomodoro
                doesn't count. Only uninterrupted sessions contribute to your
                completed count.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Take your break when prompted
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                When the timer ends, an audio alert plays and the timer switches
                to the next mode (Short Break or Long Break after every 4
                sessions). Step away from your work completely during the break
                — stand up, move, look away from your screen. Click Start again
                on the break timer when you're ready.
              </p>
              <div className="bg-red-50 text-red-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>Long break trigger:</strong> A 15-minute long break is
                triggered automatically after every 4 completed work sessions.
                This is configurable in settings — change the 'Sessions Until
                Long Break' value to 2, 3, 5, or any number that suits your work
                pattern.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Track your sessions and adjust
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                The session statistics panel shows completed sessions and total
                sessions for the current browser session. Use this to understand
                how many deep work intervals you're completing in a day — most
                practitioners target 8–12 Pomodoros per working day as a
                sustainable productive output. Adjust your work and break
                durations in Settings if you consistently find the defaults too
                short or too long.
              </p>
              <div className="bg-orange-50 text-orange-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>Customise in Settings:</strong> Click the settings icon
                to adjust work duration (1–60 min), short break duration (1–30
                min), long break duration (1–60 min), and how many sessions
                trigger a long break (2–10).
              </div>
            </div>
          </div>
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Common uses</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          <div
            key="Deep work and writing"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">📝</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Deep work and writing
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Write, edit, and revise documents with defined 25-minute sprints —
              prevents the creeping distraction that derails unstructured
              writing sessions.
            </p>
          </div>
          <div
            key="Software development"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">💻</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Software development
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Code in focused intervals — a Pomodoro provides the uninterrupted
              block that complex programming tasks require to stay in flow.
            </p>
          </div>
          <div
            key="Studying and revision"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">📚</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Studying and revision
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Break study sessions into structured intervals to prevent passive
              reading without retention — active engagement within defined time
              boxes.
            </p>
          </div>
          <div
            key="Creative work"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">🎨</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Creative work
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Allocate Pomodoros to specific creative tasks (sketching, writing,
              composing) to ensure consistent progress on projects that tend to
              stall.
            </p>
          </div>
          <div
            key="Administrative tasks"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">📧</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Administrative tasks
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Batch email, admin, and communication tasks into defined intervals
              rather than allowing them to interrupt deep work throughout the
              day.
            </p>
          </div>
          <div
            key="Habit building"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">🏃</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Habit building
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Use Pomodoros to build a daily deep work habit — tracking your
              completed sessions each day creates a visible progress record that
              reinforces consistency.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🍅</div>
          <h3 className="text-xl font-bold mb-3">
            The break is not optional — it's the reason the technique works
          </h3>
          <p className="text-gray-300 leading-relaxed max-w-xl mx-auto text-sm">
            The most common Pomodoro mistake is skipping the break when you're
            'in the zone' or when a session feels productive. The break is not a
            reward for good work — it is the mechanism that makes the next
            session possible at full capacity. Mental fatigue accumulates
            invisibly: you may not feel tired, but your error rate rises, your
            decision-making quality degrades, and the depth of your focus
            decreases. The scheduled break forces a cognitive reset that allows
            the next Pomodoro to begin from a fresh mental state rather than a
            depleted one. Practitioners who skip breaks consistently report
            diminishing returns across the day and more mistakes in later
            sessions. Take the break. It makes the work better.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              key="/tools/countdown-timer"
              href="/tools/countdown-timer"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-red-200 hover:-translate-y-1 transition-all duration-200 p-5"
              aria-label="Countdown Timer — Count down to any future date or event — days, hours, minutes, and seconds."
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Countdown Timer
              </div>
              <div className="text-xs text-gray-500">
                Count down to any future date or event — days, hours, minutes,
                and seconds.
              </div>
            </a>
            <a
              key="/tools/online-stopwatch"
              href="/tools/online-stopwatch"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-red-200 hover:-translate-y-1 transition-all duration-200 p-5"
              aria-label="Online Stopwatch — Precise stopwatch with lap times — works in any browser, no installation needed."
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Online Stopwatch
              </div>
              <div className="text-xs text-gray-500">
                Precise stopwatch with lap times — works in any browser, no
                installation needed.
              </div>
            </a>
            <a
              key="/tools/meeting-cost-calculator"
              href="/tools/meeting-cost-calculator"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-red-200 hover:-translate-y-1 transition-all duration-200 p-5"
              aria-label="Meeting Cost Calculator — Calculate the real cost of a meeting based on attendees, salaries, and duration."
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Meeting Cost Calculator
              </div>
              <div className="text-xs text-gray-500">
                Calculate the real cost of a meeting based on attendees,
                salaries, and duration.
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
