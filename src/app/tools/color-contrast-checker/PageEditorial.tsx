"use client";
// src/app/tools/color-contrast-checker/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/color-contrast-checker";
const TOOL_NAME = "Color Contrast Checker";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#3730a3", light: "#eef2ff" },
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
    "Free color contrast checker — test WCAG AA and AAA accessibility compliance for any color pair",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is WCAG and why does contrast ratio matter?",
    a: "WCAG (Web Content Accessibility Guidelines) is the international standard for web accessibility, published by the W3C. Contrast ratio measures the luminance difference between foreground (text) and background colors. Low contrast makes text difficult or impossible to read for users with low vision, colour blindness, or in high-glare environments. WCAG AA compliance (4.5:1 for normal text) is legally required in many jurisdictions under accessibility laws such as the ADA (US), EN 301 549 (EU), and the Equality Act (UK).",
  },
  {
    q: "What is the difference between WCAG AA and AAA?",
    a: "WCAG AA is the minimum legal standard for most contexts: 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt+ bold). WCAG AAA is the enhanced level: 7:1 for normal text and 4.5:1 for large text. WCAG AAA is recommended for high-priority content such as body text in health, legal, or financial applications, but achieving AAA for all colors simultaneously is extremely difficult. Most teams target AA as the baseline with AAA for critical text.",
  },
  {
    q: "Does contrast ratio apply to images and icons?",
    a: "Yes — WCAG 1.4.11 (Non-text Contrast) requires a minimum 3:1 contrast ratio for UI components like buttons, input borders, and icons against adjacent colors. This is distinct from the 4.5:1 text contrast requirement. Icons that convey meaning (not just decorative) must meet the 3:1 UI component requirement. Images used as text must meet the full text contrast requirements.",
  },
  {
    q: "Can I use a light gray text on a white background?",
    a: "Light gray on white is one of the most common accessibility failures in modern web design. For example, #999999 on #FFFFFF has a contrast ratio of only 2.85:1 — failing WCAG AA. The lightest gray that passes AA for normal text on white is approximately #767676 (4.54:1). Use this checker to verify before using any light gray in your design.",
  },
  {
    q: "Is dark mode automatically more accessible?",
    a: "Not automatically — dark mode shifts the contrast equation rather than solving it. Light text on dark backgrounds can fail just as easily as dark text on light backgrounds if the colors are not properly chosen. White (#FFFFFF) on true black (#000000) has a 21:1 ratio (maximum), but many dark mode palettes use off-blacks and off-whites that can drop below 4.5:1. Always check both light and dark mode color pairs with this tool.",
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
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How to Use the Color Contrast Checker
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter text and background colors to instantly see the WCAG contrast
          ratio and whether your design passes accessibility standards.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your text and background colors",
              body: "Click the color swatch to open the visual color picker, or type a HEX code directly. The checker accepts any 6-digit hex color (with or without #). Both colors update the live preview simultaneously — you can see exactly how your color pair looks in context.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Browser extension tip:</strong> Use your browser's
                  developer tools (Inspect → Computed → color) to grab exact hex
                  values from any live website and paste them directly into this
                  checker.
                </div>
              ),
            },
            {
              n: 2,
              title: "Check the contrast ratio and WCAG results",
              body: "The ratio display shows your score as a number followed by :1 (e.g. 7.5:1). The WCAG grid shows four pass/fail checks: AA normal text (4.5:1), AA large text (3:1), AAA normal text (7:1), and AAA large text (4.5:1). Green ticks indicate compliance; red crosses indicate failure.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Ratio
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Level
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Applies to
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "≥ 3:1",
                          "AA",
                          "Large text (18pt+), UI components, icons",
                        ],
                        [
                          "≥ 4.5:1",
                          "AA",
                          "Normal text (under 18pt / 14pt bold)",
                        ],
                        ["≥ 4.5:1", "AAA", "Large text"],
                        ["≥ 7:1", "AAA", "Normal text"],
                      ].map(([r, l, a]) => (
                        <tr key={r} className="hover:bg-violet-50">
                          <td className="px-4 py-2 font-bold text-violet-700">
                            {r}
                          </td>
                          <td className="px-4 py-2 font-semibold text-gray-700">
                            {l}
                          </td>
                          <td className="px-4 py-2 text-gray-500">{a}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Iterate until you pass",
              body: "If your colors fail, adjust the lightness or darkness of one or both colors until the ratio meets your target level. The checker updates in real time. For the fastest fixes: darken the text color or lighten the background color (or both) — small adjustments often make a large ratio difference near the threshold.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Quick fix strategy:</strong> If your text fails at
                  4.2:1 and you need 4.5:1, try shifting the text color 10–15%
                  darker in HSL (reduce the L value). Use the Color Code
                  Converter to make precise HSL adjustments without losing your
                  chosen hue.
                </div>
              ),
            },
            {
              n: 4,
              title: "Test both light and dark mode pairs",
              body: "Many design systems need to pass accessibility in both light and dark themes. After confirming your primary color pair, swap the text and background with the swap button to test the inverted dark mode pair. Both should meet AA as a minimum for WCAG compliance across themes.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Design system tip:</strong> Document passing and
                  failing pairs in a shared reference — include the ratio next
                  to each color swatch in your Figma library or design tokens so
                  developers and designers always know which combinations are
                  approved.
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
              emoji: "⚖️",
              title: "Legal compliance audits",
              desc: "Verify WCAG AA compliance before a website launch or accessibility audit to meet ADA, EN 301 549, and Equality Act requirements.",
            },
            {
              emoji: "🎨",
              title: "Design system building",
              desc: "Establish approved text/background pairings for your color palette and document passing ratios for your design token documentation.",
            },
            {
              emoji: "🌙",
              title: "Dark mode design",
              desc: "Test dark mode color pairs separately — off-white on dark-gray can fail just as easily as light-gray on white.",
            },
            {
              emoji: "🏦",
              title: "Financial & health apps",
              desc: "Applications handling sensitive information should target WCAG AAA (7:1) for body text to serve users with low vision.",
            },
            {
              emoji: "📧",
              title: "Email design",
              desc: "Check brand color pairs used in HTML email templates — email clients render colors differently and low contrast is common.",
            },
            {
              emoji: "📱",
              title: "Mobile UI design",
              desc: "Mobile screens in outdoor/high-glare environments demand higher contrast — test your mobile palettes at 4.5:1 minimum.",
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

        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">♿</div>
          <h3 className="text-xl font-bold mb-3">
            Accessibility is a legal and ethical requirement
          </h3>
          <p className="text-violet-100 leading-relaxed max-w-xl mx-auto text-sm">
            Approximately 300 million people worldwide have colour vision
            deficiency. Insufficient contrast affects many more — including
            elderly users and anyone viewing screens in bright sunlight. WCAG
            compliance protects users and reduces legal risk for your
            organisation.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/color-code-converter",
                label: "Color Code Converter",
                desc: "Convert between HEX, RGB, HSL, and HSB for precise color adjustments.",
              },
              {
                href: "/tools/gradient-generator",
                label: "Gradient Generator",
                desc: "Generate accessible CSS gradients using tested color pairs.",
              },
              {
                href: "/tools/html-minifier",
                label: "HTML Minifier",
                desc: "Optimise your HTML after building accessible, well-structured pages.",
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
