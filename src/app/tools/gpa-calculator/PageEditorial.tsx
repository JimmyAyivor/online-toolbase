"use client";
// src/app/tools/gpa-calculator/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/gpa-calculator";
const TOOL_NAME = "GPA Calculator";

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
        color: { dark: "#1e1b4b", light: "#eef2ff" },
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
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-4 shadow-lg">
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5">
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
    "Free GPA calculator — calculate semester GPA and cumulative CGPA by entering courses, credits, and letter grades. 4.0 scale. No signup.",
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
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all"
            >
              {copied ? (
                <>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy link
                </>
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                  clipRule="evenodd"
                />
                <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
              </svg>
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
    q: "How is GPA calculated?",
    a: "GPA (Grade Point Average) is calculated by multiplying each course's grade points by its credit hours (producing 'quality points'), summing the quality points across all courses, then dividing by the total credit hours. The formula is: GPA = Total Quality Points ÷ Total Credit Hours. Quality points per course = Grade Points × Credit Hours. On the standard 4.0 scale: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0. The credit-hour weighting means that a 4-credit course affects your GPA twice as much as a 2-credit course with the same grade.",
  },
  {
    q: "What is the difference between GPA and CGPA?",
    a: "GPA (Grade Point Average) typically refers to the average for a single semester or term. CGPA (Cumulative Grade Point Average) is the GPA calculated across all semesters completed — it represents your overall academic standing for your entire programme. This calculator computes the GPA for the courses you enter. If you want your CGPA, enter all courses from all semesters simultaneously. If your institution calculates CGPA differently (e.g. using a running average of semester GPAs), the result may differ from this tool's calculation, which uses the weighted quality-point method throughout.",
  },
  {
    q: "What GPA do I need for graduate school, honours, or a specific programme?",
    a: "Requirements vary by institution, programme, and country. As a general guide for US institutions: Summa Cum Laude (highest academic distinction) typically requires a 3.9–4.0 GPA; Magna Cum Laude 3.7–3.9; Cum Laude 3.5–3.7. For graduate school admission, most programmes expect a minimum of 3.0–3.3, with competitive programmes in medicine, law, and top universities often expecting 3.5–3.9. For scholarships and competitive internships, 3.5+ is a common threshold. Check your specific institution's and programme's exact requirements — these vary significantly. Note that some international institutions use a different scale (e.g. 10.0 scale in some South Asian universities, percentage-based in others).",
  },
  {
    q: "How many credit hours does each course typically count?",
    a: "Credit hours vary by course type and institution, but common patterns in US universities include: a standard lecture course 3 credit hours; a lab component 1 credit hour (often attached to a 3-credit lecture, making a 4-credit course total); physical education or activity courses 1 credit hour; seminars 2–3 credit hours; major capstone or thesis projects 3–6 credit hours. A full-time student typically takes 12–18 credit hours per semester. Check your specific course catalogue for exact credit allocations — this tool accepts any positive number of credits per course.",
  },
  {
    q: "What happens to my GPA if I retake a course?",
    a: "Grade replacement policies vary by institution. Some universities replace the original grade with the new grade in GPA calculations (grade forgiveness); others average both attempts; still others include both grades but only count the credits once. At most US institutions with grade replacement, retaking a course in which you received a low grade can significantly improve your GPA, since the failing or low grade is removed from the calculation entirely. Check your specific institution's academic policy on repeated courses before planning a retake strategy.",
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
          How to Use the GPA Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Add your courses with credit hours and letter grades, and the
          calculator instantly shows your semester GPA, credit-hour weighted
          average, and grade distribution.
        </p>

        <div className="space-y-6 mb-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Add your courses
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click 'Add Course' to add a row for each course. Enter the
                course name (optional — for your reference), the number of
                credit hours, and the letter grade received. You can add as many
                courses as needed. Delete any course using the trash icon.
              </p>
              <div className="bg-indigo-50 text-indigo-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>Semester vs cumulative:</strong> To calculate your
                semester GPA, enter only the courses from one semester. To
                calculate your CGPA (cumulative), enter all courses from all
                completed semesters at once.
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Enter credit hours and grades
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                For each course, enter the credit hour value (typically 1–6) and
                select the letter grade from the dropdown — A+, A, A-, B+, B,
                B-, C+, C, C-, D+, D, or F. The calculator uses the standard 4.0
                scale grade point values. The weighting by credit hours means
                higher-credit courses have proportionally more impact on your
                GPA.
              </p>
              <div className="bg-purple-50 text-purple-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>Grade point scale used:</strong> A+/A = 4.0 · A- = 3.7 ·
                B+ = 3.3 · B = 3.0 · B- = 2.7 · C+ = 2.3 · C = 2.0 · C- = 1.7 ·
                D+ = 1.3 · D = 1.0 · F = 0.0
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Read your GPA and breakdown
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Your GPA updates in real time as you add or change courses. The
                results panel shows your overall GPA (to 2 decimal places),
                total credit hours, total quality points, and a grade
                distribution visualisation showing the proportion of each grade
                in your course list.
              </p>
              <div className="bg-indigo-50 text-indigo-800 rounded-xl px-5 py-4 text-sm leading-relaxed">
                <strong>What if my GPA is lower than I hoped?</strong> Calculate
                the GPA you would need in the remaining semesters to reach a
                target cumulative GPA — the formula is: Required Remaining GPA =
                (Target CGPA × Total Required Credits − Current Quality Points)
                ÷ Remaining Credits.
              </div>
            </div>
          </div>
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Common uses</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          <div
            key="Checking semester performance"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">🎓</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Checking semester performance
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Calculate your GPA at the end of each semester to track your
              academic progress and identify courses where performance may have
              been below target.
            </p>
          </div>
          <div
            key="Planning grade targets"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">📊</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Planning grade targets
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Enter hypothetical grades to see what GPA different combinations
              of results would produce — useful for setting realistic targets
              before exams.
            </p>
          </div>
          <div
            key="Graduate school applications"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">📝</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Graduate school applications
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Calculate your cumulative GPA across all semesters to verify it
              meets the minimum requirements for target graduate programmes.
            </p>
          </div>
          <div
            key="Honours and distinction eligibility"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">🏆</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Honours and distinction eligibility
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Check whether your current GPA meets your institution's threshold
              for academic distinction, scholarship eligibility, or programme
              standing requirements.
            </p>
          </div>
          <div
            key="Retake strategy planning"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">📈</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              Retake strategy planning
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              See how retaking a failed or low-grade course would affect your
              cumulative GPA — compare before and after scenarios.
            </p>
          </div>
          <div
            key="International students"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-3">🌍</div>
            <p className="font-bold text-gray-900 text-sm mb-2">
              International students
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Use the 4.0 scale calculation as a reference when applying to US
              or Canadian institutions from educational systems using different
              grading conventions.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-bold mb-3">
            Credit-hour weighting means not all grades affect your GPA equally
          </h3>
          <p className="text-gray-300 leading-relaxed max-w-xl mx-auto text-sm">
            A common GPA misconception is that all courses count equally. In
            reality, a 4-credit course receiving a B has exactly twice the
            quality-point impact of a 2-credit course receiving the same B. This
            means your strategy for improving a low GPA should prioritise
            high-credit courses — an A in a 4-credit core course contributes 16
            quality points toward your total, while an A in a 1-credit elective
            contributes only 4. When planning which courses to retake or which
            semesters to target for maximum GPA improvement, always consider
            credit hours alongside grade potential.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              key="/tools/percentage-calculator"
              href="/tools/percentage-calculator"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
              aria-label="Percentage Calculator — Calculate percentages, percentage changes, and find what percentage one number is of another."
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Percentage Calculator
              </div>
              <div className="text-xs text-gray-500">
                Calculate percentages, percentage changes, and find what
                percentage one number is of another.
              </div>
            </a>
            <a
              key="/tools/tip-calculator"
              href="/tools/tip-calculator"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
              aria-label="Tip Calculator — Calculate tip amounts and split a bill between multiple people."
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Tip Calculator
              </div>
              <div className="text-xs text-gray-500">
                Calculate tip amounts and split a bill between multiple people.
              </div>
            </a>
            <a
              key="/tools/countdown-timer"
              href="/tools/countdown-timer"
              className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
              aria-label="Countdown Timer — Count down to exam dates or deadlines — days, hours, minutes, seconds."
            >
              <div className="font-bold text-gray-900 text-sm mb-1">
                Countdown Timer
              </div>
              <div className="text-xs text-gray-500">
                Count down to exam dates or deadlines — days, hours, minutes,
                seconds.
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
