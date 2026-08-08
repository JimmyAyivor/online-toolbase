"use client";
// src/app/tools/batch9/meeting-cost-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/meeting-cost-calculator";
const TOOL_NAME = "Meeting Cost Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#78350f", light: "#fffbeb" },
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
    "Free meeting cost calculator — try it at onlinetoolbase.com",
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
    q: "How is meeting cost calculated?",
    a: "Meeting cost is calculated by multiplying the number of attendees by their average hourly salary rate by the duration of the meeting in hours: Cost = Attendees × Hourly Rate × Hours. This represents the direct labour cost — the total wages paid to all attendees for the time they spend in the meeting. It does not include opportunity cost (what they could have produced instead), meeting preparation time, or overhead costs, meaning the true total cost is always higher than this calculator shows.",
  },
  {
    q: "What is the true cost of a recurring weekly meeting?",
    a: "A 1-hour meeting with 8 people at an average of $75/hour costs $600. If that meeting happens every week for a year (52 weeks), the annual labour cost is $31,200 — for one meeting. Most organisations have dozens of recurring meetings. Research from Harvard Business Review has found that a single weekly executive meeting can cost a company over $300,000 per year when all attendees' time costs are accounted for. This calculator lets you input the frequency to see the annual cost directly.",
  },
  {
    q: "What is the average hourly rate to use?",
    a: "The hourly rate field should reflect the average blended salary of all meeting attendees, not just one person. A simple approach: estimate the total annual salary for each attendee, divide by 2,000 working hours to get their hourly rate, then average across all attendees. For a rough benchmark, white-collar knowledge workers in the US often cost $40–$150/hour in direct wages. Add 30–40% for benefits and overhead if you want to estimate fully-loaded cost.",
  },
  {
    q: "How can I reduce meeting costs without eliminating meetings?",
    a: "The most impactful levers are: reduce attendees (only invite decision-makers and people who add direct value — removing one $100/hr person from a 1-hour meeting saves $100 per meeting), shorten duration (30-minute stand-ups often achieve what 60-minute sitting meetings do), and reduce frequency (biweekly instead of weekly halves the annual cost). Replacing status-update meetings with asynchronous tools (Loom, Notion, Slack) can save significant time without losing alignment.",
  },
  {
    q: "Should I include preparation and follow-up time in the cost?",
    a: "For a true cost picture, yes. Research suggests that for every hour in a meeting, attendees spend an average of 4–7 minutes preparing and 15–20 minutes following up (notes, action items, catch-up for those who missed it). For a full assessment, multiply this calculator's result by 1.25–1.5 to approximate the total productivity impact including surrounding overhead.",
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
          How to Use the Meeting Cost Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — everything you need in one place.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Set attendee count and hourly rate",
              body: "Enter the number of people in the meeting and the average hourly salary rate. Use the sliders for quick adjustments or type exact values. The average rate should reflect the blended cost of all attendees — mix junior and senior rates.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Fully-loaded rate tip:</strong> To include benefits
                  and overhead, multiply the base salary rate by 1.3–1.4. A
                  $60/hr salary typically costs the employer ~$80/hr all-in.
                </div>
              ),
            },
            {
              n: 2,
              title: "Set meeting duration",
              body: "Drag the duration slider to set the meeting length in 15-minute increments from 15 minutes to 8 hours. The cost updates instantly. Note how dramatically the cost changes between a 30-minute and 60-minute meeting.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Parkinson's Law warning:</strong> Meetings tend to
                  expand to fill the time allocated. Scheduling 45-minute
                  meetings instead of 60-minute ones often results in the same
                  outcomes at 25% lower cost.
                </div>
              ),
            },
            {
              n: 3,
              title: "Set meeting frequency",
              body: "Choose one-off, daily, weekly, or monthly to see the annualised cost. This is the most impactful calculation — a seemingly reasonable $500 weekly meeting costs $26,000 per year.",
              enrich: (
                <div className="bg-yellow-50 rounded-xl px-5 py-4 text-sm text-yellow-800 leading-relaxed">
                  <strong>Recurring meeting audit:</strong> Use this calculator
                  to audit your calendar. For every recurring meeting, calculate
                  its annual cost. Present the result to stakeholders to justify
                  reducing frequency or replacing with async communication.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use the cost to justify changes",
              body: "Share the calculated cost with your team or manager to build the business case for shorter meetings, fewer attendees, or async alternatives. The cost figure is concrete and easy to reason about — more persuasive than abstract productivity arguments.",
              enrich: (
                <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                  <strong>Async alternative ROI:</strong> If a $2,000/week
                  meeting can be replaced with a 30-minute async Loom + written
                  update, the annual saving exceeds $100,000 in direct labour
                  costs alone.
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
              emoji: "💰",
              title: "Justify async communication",
              desc: "Calculate weekly meeting costs to build the business case for replacing status meetings with Loom recordings or written updates.",
            },
            {
              emoji: "📊",
              title: "Executive reporting",
              desc: "Include meeting cost data in productivity reports to show the tangible ROI of reducing meeting culture.",
            },
            {
              emoji: "🗓️",
              title: "Calendar audit",
              desc: "Review every recurring meeting on your calendar and calculate whether its annual cost is justified by the outcomes it produces.",
            },
            {
              emoji: "🤝",
              title: "Client billing",
              desc: "Estimate the client-billable cost of project meetings to ensure meeting time is appropriately scoped in proposals.",
            },
            {
              emoji: "🏢",
              title: "Team size decisions",
              desc: "Model the cost difference between 4-person and 8-person meetings to inform attendee list decisions.",
            },
            {
              emoji: "🎓",
              title: "Training programmes",
              desc: "Calculate the true cost of all-hands training sessions and workshops to compare against e-learning alternatives.",
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
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            100% private — runs in your browser
          </h3>
          <p className="text-amber-100 leading-relaxed max-w-xl mx-auto text-sm">
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
                desc: "Use a visible timer to keep meetings on schedule and prevent overruns.",
              },
              {
                href: "/tools/online-stopwatch",
                label: "Online Stopwatch",
                desc: "Track actual meeting duration against planned duration over time.",
              },
              {
                href: "/tools/retirement-calculator",
                label: "Retirement Calculator",
                desc: "Put meeting cost savings in the context of long-term financial planning.",
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
