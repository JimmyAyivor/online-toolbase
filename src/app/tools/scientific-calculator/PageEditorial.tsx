"use client";
// src/app/tools/scientific-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/scientific-calculator";
const TOOL_NAME = "Scientific Calculator";

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
    "Free scientific calculator — trig, log, sqrt, powers, π, e, DEG/RAD modes, and history. No signup.",
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
                <span className="text-indigo-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-slate-700 to-indigo-800 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FUNCTIONS_TABLE = [
  ["sin(x)", "Sine of x", "sin(30) = 0.5 (DEG mode)"],
  ["cos(x)", "Cosine of x", "cos(60) = 0.5 (DEG mode)"],
  ["tan(x)", "Tangent of x", "tan(45) = 1 (DEG mode)"],
  ["sqrt(x)", "Square root of x", "sqrt(16) = 4"],
  ["log(x)", "Base-10 logarithm of x", "log(100) = 2"],
  ["ln(x)", "Natural logarithm of x", "ln(e) = 1"],
  ["x^y", "x raised to power y", "2^10 = 1024"],
  ["π", "Pi constant", "π = 3.14159265358…"],
  ["e", "Euler's number", "e = 2.71828182845…"],
];

const FAQS = [
  {
    q: "When should I use DEG mode vs RAD mode?",
    a: "DEG (degrees) and RAD (radians) are two ways of measuring angles. DEG mode is used in everyday contexts and most school maths: a right angle is 90°, a full rotation is 360°. Use DEG mode when working with practical angles, surveying, navigation, or any context where angles are expressed in degrees. RAD (radians) is the standard unit in advanced mathematics, calculus, physics, and engineering. In radians, a right angle is π/2 (approximately 1.5708) and a full rotation is 2π (approximately 6.2832). Use RAD mode when working with calculus derivatives and integrals involving trigonometric functions, physics equations, programming (most programming languages default to radians in their math libraries), and higher-level mathematics. A common mistake is leaving the calculator in DEG mode when computing trigonometric functions for a calculus problem — always check which mode is active before using sin, cos, or tan.",
  },
  {
    q: "What is the difference between log and ln?",
    a: "log(x) in this calculator computes the base-10 logarithm (also written log₁₀(x)) — the power to which 10 must be raised to equal x. For example, log(100) = 2 because 10² = 100; log(1000) = 3 because 10³ = 1000. Base-10 logarithms are used in scientific notation, pH calculations, decibel (dB) sound levels, and the Richter scale for earthquakes. ln(x) computes the natural logarithm (base e, where e ≈ 2.71828) — the power to which Euler's number e must be raised to equal x. For example, ln(e) = 1; ln(e²) ≈ 2. Natural logarithms appear frequently in calculus, differential equations, compound interest calculations, probability distributions, and information theory. The relationship between the two is: ln(x) = log(x) / log(e) ≈ log(x) / 0.4343, or equivalently log(x) = ln(x) / ln(10) ≈ ln(x) / 2.3026.",
  },
  {
    q: "How do I calculate powers and exponents?",
    a: "Use the ^ button (or type ^) for exponentiation. The expression a^b computes a raised to the power b. Examples: 2^10 = 1024 (2 to the power 10); 3^3 = 27 (3 cubed); 10^-2 = 0.01 (10 to the power negative 2); 4^0.5 = 2 (4 to the power 0.5 is the square root of 4, same as sqrt(4)). For square roots specifically, you can use either sqrt(x) or x^0.5 — both give the same result. For cube roots, use x^(1/3). For the nth root of x, use x^(1/n). Note that the ^ operator follows standard mathematical precedence — 2^3^2 evaluates as 2^(3^2) = 2^9 = 512 in right-to-left order. Use parentheses to control evaluation order if needed.",
  },
  {
    q: "How do I use π and e in expressions?",
    a: "Click the π button to insert the value of pi (3.14159265358979…) into your expression. Click the e button to insert Euler's number (2.71828182845904…). Both can be used in any arithmetic or function expression: sin(pi/6) calculates sin(π/6) = 0.5 in RAD mode; e^1 = e ≈ 2.718; 2*pi*r calculates the circumference of a circle. Note that pi and e in this calculator are entered as the letters 'pi' and 'e' — the calculator recognises these as their full decimal values when computing. Expressions like pi/2, e^2, and 2*pi are all valid. When combining e with numbers immediately (like 2e or e3), use explicit multiplication: 2*e, e*3.",
  },
  {
    q: "How do I use parentheses correctly in expressions?",
    a: "Parentheses control the order of operations. Without parentheses, the calculator follows standard mathematical precedence: powers first (^), then multiplication and division (× ÷), then addition and subtraction (+ −). Use parentheses when you want to override this order or make complex expressions unambiguous. Examples: 2+3*4 = 14 (multiplication before addition), but (2+3)*4 = 20 (parentheses force addition first); sin(pi/4)*2 = √2 ≈ 1.4142 (calculates sin of π/4 then multiplies by 2); sqrt(9+16) = sqrt(25) = 5 (evaluates 9+16 inside parentheses before taking the square root). Trigonometric functions like sin( and cos( automatically require a closing parenthesis — always close every ( you open. The calculator will show Error if parentheses are unbalanced.",
  },
  {
    q: "What are the most common scientific calculator mistakes?",
    a: "The most common errors when using a scientific calculator are: wrong angle mode — using DEG when a problem requires RAD (or vice versa) is the most frequent cause of wrong trig results; forgetting to close parentheses in function arguments — sin(30 produces an error where sin(30) is correct; multiplying by a constant but forgetting the × sign — 2pi should be 2*pi; computing square roots using √x when you mean the square root of an entire expression (use sqrt(x+y) not sqrt(x+y) with x and y entered separately); and operator precedence errors — 1+2^3 = 9 (not 27) because 2^3=8 is calculated first. Always use parentheses to make your intention explicit when combining operations.",
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
          How to Use the Scientific Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Build expressions using the function buttons, number pad, and
          operators — press = to evaluate. Use DEG or RAD mode for trigonometric
          functions.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Set your angle mode before using trig functions",
              body: "Before entering any expression involving sin, cos, or tan, check whether you need DEG (degrees) or RAD (radians) mode and select it from the Angle Mode panel. DEG mode is correct for most everyday calculations and school maths where angles are in degrees (e.g. sin(30°) = 0.5). RAD mode is required for calculus, physics equations, and programming contexts where angles are in radians (e.g. sin(π/6) = 0.5). Switching mode after entering an expression will change the result of trig functions — always set the mode first.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Quick check:</strong> In DEG mode, sin(90) should
                  equal 1 exactly. In RAD mode, sin(1.5708) should equal
                  approximately 1 (since π/2 ≈ 1.5708). If your result is wrong,
                  the first thing to check is whether you're in the correct
                  angle mode.
                </div>
              ),
            },
            {
              n: 2,
              title: "Build and evaluate expressions",
              body: "Click buttons to build your expression — it displays in the expression bar above the result. Functions like sin(, cos(, sqrt( open parentheses that need to be closed with the ) button. Click = to evaluate the complete expression. The result appears in green; Error appears in red if the expression is invalid or produces a non-finite result (e.g. division by zero, log of a negative number). Click ⌫ to delete the last character; click C to clear the entire expression.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Function
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          What it does
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Example
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {FUNCTIONS_TABLE.map(([fn, desc, ex]) => (
                        <tr key={fn} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-mono font-bold text-indigo-700 text-xs">
                            {fn}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-700">
                            {desc}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-gray-500">
                            {ex}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Use parentheses to control expression order",
              body: "Parentheses control the order in which operations are evaluated. The standard mathematical precedence applies: powers (^) first, then multiplication and division, then addition and subtraction. Use parentheses when the default order would give the wrong result. For example: sqrt(2+7) evaluates the sum first then takes the root; 2^(3+1) raises 2 to the power 4 rather than calculating 2^3 then adding 1; sin(pi/4) passes π/4 to the sine function.",
              enrich: (
                <div className="bg-slate-50 rounded-xl px-5 py-4 text-sm text-slate-700 leading-relaxed">
                  <strong>Parentheses tip:</strong> When in doubt, use more
                  parentheses. A well-parenthesised expression like (2+3)*(4-1)
                  is always clearer and safer than 2+3*4-1 (which evaluates as
                  2+(3*4)-1 = 13, not as 5*3 = 15). Functions like sin( already
                  include an opening parenthesis — remember to close it with the
                  ) button after your argument.
                </div>
              ),
            },
            {
              n: 4,
              title: "Review calculation history",
              body: "The last 10 calculations are stored in the History panel below the button grid. Each entry shows the full expression and its result (e.g. '2^10 = 1024'). History persists through the current browser session — clicking Reset All clears both the current expression and the history. Use history to review your work, copy expressions by re-entering them, or track intermediate results in a multi-step calculation.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Multi-step calculations:</strong> For problems
                  requiring multiple steps (e.g. solving a quadratic,
                  calculating compound interest), work through each step
                  individually and note intermediate results from the History
                  panel. Each step's result can be the starting point for the
                  next expression — clear the display with C and enter the next
                  stage of your calculation.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-700 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📐",
              title: "Trigonometry homework",
              desc: "Calculate sin, cos, and tan values for angles in both degrees and radians — use DEG mode for school geometry, RAD for calculus.",
            },
            {
              emoji: "📊",
              title: "Physics calculations",
              desc: "Work with logarithms, exponentials, and trig functions for physics problems — switch to RAD mode for angular velocity and wave calculations.",
            },
            {
              emoji: "🧮",
              title: "Engineering computations",
              desc: "Evaluate expressions involving powers, roots, logarithms, and constants π and e for engineering and science coursework.",
            },
            {
              emoji: "💹",
              title: "Financial mathematics",
              desc: "Calculate compound interest (using e^rt for continuous compounding), logarithmic growth rates, and power functions.",
            },
            {
              emoji: "🎓",
              title: "Exam preparation",
              desc: "Practice scientific calculations ahead of maths, physics, or chemistry exams — the layout mirrors physical scientific calculators.",
            },
            {
              emoji: "🔬",
              title: "Scientific notation",
              desc: "Work with large and small numbers using powers of 10 — calculate 10^-9 for nanometres, 6.022*10^23 for Avogadro's number.",
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

        <div className="bg-gradient-to-br from-slate-700 to-indigo-800 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔢</div>
          <h3 className="text-xl font-bold mb-3">
            DEG vs RAD — the most common source of wrong answers in trigonometry
          </h3>
          <p className="text-slate-300 leading-relaxed max-w-xl mx-auto text-sm">
            The single most common cause of incorrect trigonometric results is
            being in the wrong angle mode. sin(90) in DEG mode correctly returns
            1. sin(90) in RAD mode returns approximately 0.894 — because 90
            radians is roughly 5156 degrees, not 90 degrees. Most students and
            professionals work in degrees for everyday calculations; most
            programming languages and advanced mathematics use radians by
            default. Before using sin, cos, or tan, always verify which mode
            you're in and which mode your problem requires. This calculator
            defaults to DEG mode — switch to RAD when your problem specifies
            radian angles or when using the calculator for calculus and physics
            computations.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Calculator Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/fraction-calculator",
                label: "Fraction Calculator",
                desc: "Add, subtract, multiply, and divide fractions with step-by-step working shown.",
              },
              {
                href: "/tools/percentage-calculator",
                label: "Percentage Calculator",
                desc: "Calculate percentages, percentage changes, and find what percentage one number is of another.",
              },
              {
                href: "/tools/unit-converter",
                label: "Unit Converter",
                desc: "Convert between hundreds of units across length, weight, volume, temperature, and more.",
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
