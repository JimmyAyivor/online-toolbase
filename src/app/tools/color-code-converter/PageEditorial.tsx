"use client";
// src/app/tools/color-code-converter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/color-code-converter";
const TOOL_NAME = "Color Code Converter";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#831843", light: "#fdf2f8" },
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
    "Free color code converter — convert HEX, RGB, HSL and HSB color formats instantly",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is the difference between HEX and RGB?",
    a: "HEX and RGB represent exactly the same color information but in different notations. RGB expresses each of the three color channels (Red, Green, Blue) as a decimal number from 0–255. HEX expresses each channel as a two-digit hexadecimal number from 00–FF. For example, rgb(99, 102, 241) and #6366F1 are identical — HEX is just a compact form preferred in HTML/CSS, while RGB is common in design software and CSS color functions.",
  },
  {
    q: "What is HSL and when should I use it in CSS?",
    a: "HSL stands for Hue (0–360°), Saturation (0–100%), and Lightness (0–100%). It is the most intuitive format for designing because you can adjust brightness and saturation independently. In CSS, hsl() is preferable when you need to create color variations — for example, a button hover state is simply `hsl(240, 90%, 50%)` becoming `hsl(240, 90%, 40%)` (10 lightness units darker). Modern CSS also supports hsl() natively in all browsers.",
  },
  {
    q: "What is the difference between HSL and HSB/HSV?",
    a: "HSL (Hue, Saturation, Lightness) and HSB/HSV (Hue, Saturation, Brightness/Value) both use the same Hue scale but define the other two axes differently. In HSL, pure white is L=100% regardless of saturation; in HSB, pure white is S=0%, B=100%. HSB is the format used in Photoshop, Figma, Sketch, and most design application colour pickers. HSL is the format supported natively in CSS. The converter outputs both so you can copy the appropriate one for your context.",
  },
  {
    q: "How do I convert a color from Figma to CSS?",
    a: "Figma's color picker uses HSB (called HSB or HSV in the UI). To use it in CSS: pick the color in Figma, read the HEX value at the bottom of the colour panel (easiest), paste it into this converter, and copy the hsl() or rgb() value for your CSS. Alternatively, Figma's Inspect panel shows CSS-ready color values — but this converter is faster when working outside of Figma or for batch color work.",
  },
  {
    q: "Does color format affect performance in CSS?",
    a: "No — HEX, RGB, and HSL render identically at runtime. Browsers parse all three formats to the same internal representation. Choose the format that is most maintainable for your project: HEX for conciseness, HSL for design systems where you need programmatic lightness/saturation tweaks, and CSS custom properties (variables) for all approaches in larger projects.",
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
          How to Use the Color Code Converter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Pick any color visually or enter a HEX value — instantly get RGB, HSL,
          and HSB equivalents with one-click copy for CSS and design tools.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Pick a color or enter a HEX code",
              body: "Click the color picker swatch in the bottom-right of the preview to choose any color visually. Or type a HEX code directly into the HEX input field (with or without the # prefix). Press Enter or click away to apply. The preview updates live to show the color you've selected.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Quick tip:</strong> Use the preset swatches below the
                  input for commonly used named colors — useful for quickly
                  checking how familiar CSS named colors translate to their
                  HEX/RGB values.
                </div>
              ),
            },
            {
              n: 2,
              title: "Read the converted values",
              body: "All four formats update simultaneously. The RGB panel shows decimal values for each channel. The HSL panel shows hue in degrees (0–360°) and saturation and lightness as percentages. The HSB panel shows the same hue but with brightness (value) instead of lightness — this is the format your design application color picker uses.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Format
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Example
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Used in
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["HEX", "#6366F1", "HTML, CSS, SVG"],
                        [
                          "RGB",
                          "rgb(99, 102, 241)",
                          "CSS, canvas, image editors",
                        ],
                        ["HSL", "hsl(239, 84%, 67%)", "CSS variables, theming"],
                        [
                          "HSB/HSV",
                          "hsb(239, 59%, 95%)",
                          "Figma, Photoshop, Illustrator",
                        ],
                      ].map(([f, e, u]) => (
                        <tr key={f} className="hover:bg-pink-50">
                          <td className="px-4 py-2 font-bold text-gray-800">
                            {f}
                          </td>
                          <td className="px-4 py-2 font-mono text-purple-700 text-xs">
                            {e}
                          </td>
                          <td className="px-4 py-2 text-gray-500">{u}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Copy the format you need",
              body: "Click the copy icon next to any color format to copy it to your clipboard in the correct CSS syntax. The HEX field also has a dedicated Copy button. The dark CSS snippet panel at the bottom shows all three CSS-ready declarations at once — great for pasting into your stylesheet.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>CSS custom properties pattern:</strong> For design
                  systems, define your palette as{" "}
                  <code className="bg-purple-100 px-1 rounded">
                    --color-primary: hsl(239, 84%, 67%)
                  </code>{" "}
                  and derive variants with{" "}
                  <code className="bg-purple-100 px-1 rounded">
                    hsl(239, 84%, 57%)
                  </code>{" "}
                  — HSL makes hover states and dark mode adjustments trivially
                  easy.
                </div>
              ),
            },
            {
              n: 4,
              title: "Explore with presets or enter brand colors",
              body: "Use the 12 quick-preset swatches to explore the format differences for familiar colors. To work with brand colors, paste your brand's HEX code (from a brand guidelines document) and get the RGB/HSL values you need for CSS, Figma, or PowerPoint templates.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Brand consistency tip:</strong> Save your brand's
                  primary, secondary, and accent colors as CSS custom properties
                  using HSL format — it makes deriving hover, disabled, and
                  focus states consistent and predictable across your entire
                  design system.
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
              emoji: "🎨",
              title: "CSS theming",
              desc: "Convert a brand HEX to HSL for CSS custom properties that make deriving lighter/darker variants trivial.",
            },
            {
              emoji: "🖌️",
              title: "Figma to CSS handoff",
              desc: "Grab HSB values from Figma's colour picker and convert to CSS-ready HEX or hsl() for your stylesheet.",
            },
            {
              emoji: "📱",
              title: "iOS & Android dev",
              desc: "Convert HEX to RGB float values (0–1) needed for Swift UIColor and Android Color.argb() calls.",
            },
            {
              emoji: "🏢",
              title: "Brand guideline compliance",
              desc: "Paste a client's brand HEX and verify the RGB breakdown matches the specified brand values.",
            },
            {
              emoji: "🌈",
              title: "Color exploration",
              desc: "Use the visual picker to explore the color wheel and see how hue, saturation, and lightness change between HSL and HSB.",
            },
            {
              emoji: "📊",
              title: "Data visualisation",
              desc: "Convert design-tool colors to RGB tuples for use in D3.js, Chart.js, or Plotly color arrays.",
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

        <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            All conversions run in your browser
          </h3>
          <p className="text-pink-100 leading-relaxed max-w-xl mx-auto text-sm">
            No data is sent to any server. All color math happens instantly in
            JavaScript on your device.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/color-contrast-checker",
                label: "Color Contrast Checker",
                desc: "Check WCAG contrast ratios between text and background colors.",
              },
              {
                href: "/tools/gradient-generator",
                label: "Gradient Generator",
                desc: "Generate CSS gradients between any two colors.",
              },
              {
                href: "/tools/open-graph-preview",
                label: "Open Graph Preview",
                desc: "Preview how your brand colors appear in social media link previews.",
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
