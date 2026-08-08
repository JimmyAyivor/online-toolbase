"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL =
  "https://onlinetoolbase.com/tools/pregnancy-due-date-calculator";
const TOOL_NAME = "Pregnancy Due Date Calculator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#881337", light: "#fff1f2" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-rose-100 shadow-inner mb-5">
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
    "Free pregnancy due date calculator at onlinetoolbase.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How is an estimated due date calculated?",
    a: "The most common method is Naegele's Rule: take the first day of your last menstrual period (LMP), add 1 year, subtract 3 months, and add 7 days. This assumes a 40-week pregnancy and a 28-day cycle with ovulation on day 14. For example, an LMP of January 1 gives an EDD of October 8. The alternative — calculating from conception date — is more accurate when the conception date is known precisely (e.g. IVF), as it avoids the 2-week assumption error that Naegele's Rule builds in.",
  },
  {
    q: "What are the three trimesters?",
    a: "Pregnancy is divided into three trimesters: First trimester (weeks 1–13): organ development, morning sickness, high miscarriage risk — ends with the dating ultrasound around weeks 11–14. Second trimester (weeks 14–27): typically the most comfortable phase, anatomy scan around week 20, fetal movement begins. Third trimester (weeks 28–40+): rapid growth, preparation for birth, Group B Strep screening around week 36, weekly check-ups from week 36 onward. 'Full term' is considered 39–40 weeks; 'early term' is 37–38 weeks.",
  },
  {
    q: "How accurate is an estimated due date?",
    a: "An EDD is an estimate, not a scheduled delivery date. Only approximately 4–5% of babies are born on their exact EDD. About 80% of births occur within 2 weeks either side of the EDD (between 38 and 42 weeks). The most accurate due date estimate comes from a first-trimester ultrasound (dating scan) at 10–14 weeks, which can estimate gestational age within ±3–5 days by measuring crown-rump length (CRL). Your midwife or obstetrician will confirm your due date at this scan — it may be adjusted from the LMP calculation.",
  },
  {
    q: "What if my cycles are not 28 days?",
    a: "Naegele's Rule assumes a 28-day cycle with ovulation on day 14. If your cycles are shorter (e.g. 24 days), you likely ovulate earlier — your EDD may be a few days earlier than the standard calculation. If your cycles are longer (e.g. 35 days), you may ovulate later — your EDD could be a few days later. The conception date method is more reliable for people with irregular or atypical cycle lengths. Your dating scan will provide the most accurate EDD regardless of cycle length.",
  },
  {
    q: "What is a full-term pregnancy?",
    a: "The American College of Obstetricians and Gynecologists (ACOG) defines gestational age milestones as: Early term (37–38 weeks 6 days), Full term (39–40 weeks 6 days), Late term (41–41 weeks 6 days), and Post-term (42 weeks and beyond). Babies born at 39–40 weeks have the best outcomes for lung maturity and feeding. Elective deliveries (inductions or planned C-sections) are generally not recommended before 39 weeks without a medical indication.",
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
              <span className="text-rose-600 text-lg shrink-0">
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
          How to Use the Pregnancy Due Date Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free — no account needed.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose your calculation method",
              body: "Select 'Last Period (LMP)' if you know when your last period started — this is the most common method. Select 'Conception date' if you know when conception occurred (e.g. via IVF or ovulation tracking). The LMP method adds 2 weeks to account for the pre-ovulation phase.",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>Which to use:</strong> If you have irregular cycles or
                  used fertility treatments, the conception date method is more
                  reliable. For natural conception with a regular cycle, the LMP
                  method gives a good estimate that your dating scan will
                  confirm.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your date",
              body: "For LMP: enter the first day of your last menstrual period — the day your most recent period started, not when it ended. For conception: enter the date of conception or embryo transfer.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Finding your LMP:</strong> Check your phone calendar,
                  cycle tracking app, or medical records. Many people track this
                  without realising it. If you genuinely don't know, your
                  healthcare provider can estimate gestational age from
                  ultrasound.
                </div>
              ),
            },
            {
              n: 3,
              title: "Review your EDD and trimester dates",
              body: "The calculator shows your estimated due date, current gestational age if applicable, trimester boundaries, and key milestone weeks (dating scan, anatomy scan, Group B Strep test, etc.).",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>Save the dates:</strong> Screenshot or note your EDD
                  and key milestone dates — anatomy scan around week 20, glucose
                  screening around week 24–28, and Group B Strep swab around
                  week 36 are the most important antenatal appointments.
                </div>
              ),
            },
            {
              n: 4,
              title: "Confirm with your healthcare provider",
              body: "Share the calculated EDD with your midwife or OB at your first appointment. They will confirm or adjust it based on your dating scan (first-trimester ultrasound). The scan date becomes the 'official' EDD.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>If your scan date differs:</strong> It is normal for
                  the scan to shift your EDD by a few days. A difference of up
                  to 7–10 days is within the expected range. Larger differences
                  may indicate irregular ovulation timing or warrant further
                  evaluation.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🏥",
              title: "First antenatal appointment preparation",
              desc: "Calculate your EDD before your first midwife or OB appointment for a starting point to discuss.",
            },
            {
              emoji: "📅",
              title: "Birth planning",
              desc: "Work backwards from your EDD to plan maternity leave, birth preferences, and baby preparation.",
            },
            {
              emoji: "👨\u200d👩\u200d👧",
              title: "Sharing the news",
              desc: "Calculate how many weeks along you are before sharing pregnancy news with family and friends.",
            },
            {
              emoji: "🎁",
              title: "Baby shower planning",
              desc: "Use the EDD to plan a baby shower 6–8 weeks before the due date.",
            },
            {
              emoji: "📊",
              title: "Pregnancy app setup",
              desc: "Enter your EDD into pregnancy tracking apps (The Bump, What to Expect, Ovia) to get week-by-week information.",
            },
            {
              emoji: "🔬",
              title: "IVF and assisted conception",
              desc: "Calculate the EDD from embryo transfer date with the conception date method.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-rose-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-rose-600 to-pink-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🤱</div>
          <h3 className="text-xl font-bold mb-3">
            Always confirm dates with your healthcare provider
          </h3>
          <p className="text-rose-100 leading-relaxed max-w-xl mx-auto text-sm">
            Estimated due dates are calculated averages — only about 5% of
            babies are born on their exact EDD. Your midwife or obstetrician
            will confirm your due date using ultrasound measurements at your
            dating scan.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/ovulation-calculator",
                label: "Ovulation Calculator",
                desc: "Track your fertile window and ovulation dates before conception.",
              },
              {
                href: "/tools/sleep-calculator",
                label: "Sleep Calculator",
                desc: "Optimise sleep during pregnancy to support health and recovery.",
              },
              {
                href: "/tools/water-intake-calculator",
                label: "Water Intake Calculator",
                desc: "Calculate increased hydration needs during pregnancy.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-rose-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
