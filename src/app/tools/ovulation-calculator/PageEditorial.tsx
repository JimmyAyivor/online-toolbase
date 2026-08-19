"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/ovulation-calculator";
const TOOL_NAME = "Ovulation Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#831843", light: "#fdf2f8" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-pink-100 shadow-inner mb-5">
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
    "Free ovulation calculator at https://www.utilvia.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "When does ovulation occur in the menstrual cycle?",
    a: "Ovulation — the release of a mature egg from the ovary — typically occurs approximately 14 days before the start of the next period, not 14 days after the last period. For a standard 28-day cycle, this is around day 14. For a shorter 24-day cycle, it's around day 10. For a longer 35-day cycle, it's around day 21. The luteal phase (from ovulation to the next period) is relatively constant at 12–16 days for most people, while the follicular phase (period start to ovulation) varies more between individuals and cycles.",
  },
  {
    q: "What is the fertile window?",
    a: "The fertile window is the period during which conception is possible. It spans approximately 6 days: the 5 days before ovulation and the day of ovulation itself. This is because sperm can survive in the female reproductive tract for up to 5 days, while the egg is only viable for 12–24 hours after release. The highest pregnancy probability occurs on the day of ovulation and the 2 days immediately preceding it.",
  },
  {
    q: "How can I confirm when I'm actually ovulating?",
    a: "Several methods confirm ovulation beyond calendar calculation: (1) Ovulation predictor kits (OPKs) detect the LH surge that precedes ovulation by 24–36 hours — most reliable for timing; (2) Basal body temperature (BBT) charting — temperature rises 0.2–0.5°C after ovulation, confirming it has occurred; (3) Cervical mucus monitoring — mucus becomes clearer, more stretchy (like egg whites) in the days approaching ovulation; (4) Ultrasound monitoring by a healthcare provider. Using two or more methods together gives the most reliable picture.",
  },
  {
    q: "Can I get pregnant outside the fertile window?",
    a: "The probability is very low but not zero. Sperm can survive up to 5 days, so intercourse 5 days before ovulation can result in conception. Intercourse after ovulation has very low probability as the egg degrades within 24 hours. Irregular cycles make calendar-based prediction less reliable — LH testing or BBT charting is more accurate for people with variable cycle lengths.",
  },
  {
    q: "Why might my cycle length vary?",
    a: "Cycle length can vary due to stress, illness, travel, significant weight changes, intense exercise, thyroid dysfunction, polycystic ovary syndrome (PCOS), perimenopause, or normal biological variation. A cycle that varies by 3–5 days from month to month is considered normal. Cycles shorter than 21 days or longer than 35 days consistently, or extreme irregularity, warrant evaluation by a gynaecologist.",
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
              <span className="text-pink-600 text-lg shrink-0">
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
          How to Use the Ovulation Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — no account needed.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your last period start date",
              body: "Select the date your most recent period began — day 1 of your cycle. This is the starting point for all calculations. Use the most recent completed period for the most accurate upcoming predictions.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Record keeping tip:</strong> Track your period start
                  dates in a cycle app (Clue, Flo, Natural Cycles) or a simple
                  notes app. A 3–6 month history allows you to calculate your
                  true average cycle length.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your average cycle length",
              body: "Input your typical cycle length in days. Count from the first day of one period to the first day of the next. If your cycle varies, use the average of your last 3–6 cycles. The default is 28 days — adjust if your cycle is shorter or longer.",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>Finding your average:</strong> If your last 4 cycles
                  were 26, 28, 27, and 29 days, your average is 27.5 days —
                  round to 28. Tracking 3+ cycles gives a more reliable average
                  than relying on memory.
                </div>
              ),
            },
            {
              n: 3,
              title: "Review your fertile window and ovulation date",
              body: "The calculator shows your predicted ovulation date, fertile window (5 days before ovulation through ovulation day), and the next period prediction. The highest-probability conception days are highlighted.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Timing intercourse:</strong> The 2–3 days immediately
                  before ovulation and the day of ovulation itself give the
                  highest probability of conception. Regular intercourse every
                  1–2 days throughout the fertile window maximises the chance.
                </div>
              ),
            },
            {
              n: 4,
              title: "Track and adjust based on actual cycles",
              body: "Compare the predicted ovulation date with observed signs (OPK results, BBT temperature shift, cervical mucus changes). Over 2–3 cycles, you'll know whether the calculator's predictions match your actual ovulation timing.",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>When predictions are off:</strong> If your actual
                  ovulation consistently differs from predictions by more than
                  2–3 days, adjust your cycle length input or check for
                  irregular cycles. Consistent early or late ovulation may
                  warrant medical evaluation.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "👶",
              title: "Conception planning",
              desc: "Identify your fertile window to time intercourse for the highest probability of conception.",
            },
            {
              emoji: "📅",
              title: "Cycle tracking",
              desc: "Predict upcoming period dates and ovulation across the next several months.",
            },
            {
              emoji: "🚫",
              title: "Natural family planning",
              desc: "Understand your cycle pattern as part of a fertility awareness-based contraceptive approach.",
            },
            {
              emoji: "🏃",
              title: "Exercise and energy planning",
              desc: "Use cycle phase awareness to plan training intensity — many athletes perform better before ovulation.",
            },
            {
              emoji: "😴",
              title: "Mood and symptom tracking",
              desc: "Connect emotional and physical symptoms to cycle phases for better self-awareness.",
            },
            {
              emoji: "🏥",
              title: "Fertility appointment preparation",
              desc: "Bring cycle date history and predicted ovulation dates to a fertility consultation.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-pink-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-pink-600 to-rose-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🌸</div>
          <h3 className="text-xl font-bold mb-3">
            Always consult a healthcare provider for fertility concerns
          </h3>
          <p className="text-pink-100 leading-relaxed max-w-xl mx-auto text-sm">
            This calculator provides estimates based on average cycle patterns.
            Ovulation timing varies significantly between individuals and
            cycles. For fertility treatment or conception difficulties, consult
            a gynaecologist or reproductive specialist.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/pregnancy-due-date-calculator",
                label: "Pregnancy Due Date Calculator",
                desc: "Calculate your estimated due date once conception has occurred.",
              },
              {
                href: "/tools/ovulation-calculator",
                label: "Ovulation Calculator",
                desc: "You are here.",
              },
              {
                href: "/tools/sleep-calculator",
                label: "Sleep Calculator",
                desc: "Optimise your sleep schedule during pregnancy and fertility tracking phases.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-pink-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
