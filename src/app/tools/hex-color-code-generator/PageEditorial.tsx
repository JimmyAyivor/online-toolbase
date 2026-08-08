"use client";
// src/app/tools/hex-color-code-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/hex-color-code-generator";
const TOOL_NAME = "Hex Color Code Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#701a75", light: "#fdf4ff" },
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
    "Free hex colour code generator — pick any colour and get HEX, RGB, and HSL codes instantly. No signup.",
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
                <span className="text-pink-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const NAMED_COLORS = [
  [
    "#FF0000",
    "255, 0, 0",
    "0°, 100%, 50%",
    "Red",
    "Alert, danger, error states, stop actions",
  ],
  [
    "#0000FF",
    "0, 0, 255",
    "240°, 100%, 50%",
    "Blue",
    "Trust, links, primary actions, tech brands",
  ],
  [
    "#008000",
    "0, 128, 0",
    "120°, 100%, 25%",
    "Green",
    "Success, confirmation, eco, money",
  ],
  [
    "#FFFF00",
    "255, 255, 0",
    "60°, 100%, 50%",
    "Yellow",
    "Warning, highlight, caution, optimism",
  ],
  [
    "#FF6600",
    "255, 102, 0",
    "24°, 100%, 50%",
    "Orange",
    "Energy, enthusiasm, calls-to-action",
  ],
  [
    "#800080",
    "128, 0, 128",
    "300°, 100%, 25%",
    "Purple",
    "Luxury, creativity, royalty, spirituality",
  ],
  [
    "#FFFFFF",
    "255, 255, 255",
    "0°, 0%, 100%",
    "White",
    "Clean, minimal, backgrounds, space",
  ],
  [
    "#000000",
    "0, 0, 0",
    "0°, 0%, 0%",
    "Black",
    "Text, contrast, sophistication, formality",
  ],
];

const FAQS = [
  {
    q: "What is a HEX colour code and how does it work?",
    a: "A HEX (hexadecimal) colour code is a six-character string preceded by a # symbol that represents a specific colour in the RGB colour model. The six characters are divided into three pairs: the first pair represents the Red channel (00–FF), the second pair represents the Green channel (00–FF), and the third pair represents the Blue channel (00–FF). Each pair is a hexadecimal number from 00 (0 in decimal, minimum intensity) to FF (255 in decimal, maximum intensity). For example, #FF0000 is pure red (red=255, green=0, blue=0), #00FF00 is pure green, and #0000FF is pure blue. #FFFFFF is white (all channels at maximum) and #000000 is black (all channels at minimum). This gives 256 × 256 × 256 = 16,777,216 possible colours. HEX codes are widely used in CSS, HTML, design tools like Figma and Photoshop, and anywhere digital colours need to be specified precisely.",
  },
  {
    q: "What is the difference between HEX, RGB, and HSL colour formats?",
    a: "HEX, RGB, and HSL are three different ways to express the same colour. HEX (#RRGGBB) is a compact hexadecimal representation of RGB values — mostly used in HTML/CSS and design tools because it's short and easy to copy. RGB (Red, Green, Blue) expresses colour as three integer values from 0–255 — rgb(255, 99, 71) — or as a CSS function. It's intuitive for thinking about light mixing but not great for choosing colours intuitively since adjusting one channel affects perceived hue and brightness simultaneously. HSL (Hue, Saturation, Lightness) expresses colour in terms more aligned with human perception: Hue is the colour angle on the colour wheel (0°=red, 120°=green, 240°=blue), Saturation is the intensity (0%=grey, 100%=vivid), and Lightness is the brightness (0%=black, 100%=white). HSL is far more intuitive for designers — to make a colour lighter, increase L; to make it more muted, decrease S. Modern CSS fully supports all three formats.",
  },
  {
    q: "When should I use HEX vs RGB vs HSL in CSS?",
    a: "All three formats are valid in CSS and produce identical results — it's primarily a matter of workflow preference and readability. Use HEX (#RRGGBB) for static colour values in CSS or design tokens, especially when copying colours from design tools — it's compact and familiar. Use RGB / rgba() when you need to control opacity: rgba(255, 99, 71, 0.5) for 50% transparent tomato red. The 'a' (alpha) channel in rgba is only available with the function syntax, not HEX (though CSS now supports 8-digit HEX like #FF634780 for transparency). Use HSL / hsla() when building colour systems programmatically — it makes it easy to generate lighter/darker variants of a colour (e.g., hsl(9, 100%, 50%) for base, hsl(9, 100%, 60%) for hover state), create harmonious palettes, or animate colour changes. Many modern CSS frameworks and design systems use HSL internally for this reason.",
  },
  {
    q: "What is colour contrast and why does it matter for accessibility?",
    a: "Colour contrast refers to the difference in luminance between two colours — typically text and its background. The Web Content Accessibility Guidelines (WCAG) define contrast ratios to ensure content is readable by people with low vision or colour blindness. WCAG 2.1 Level AA requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt bold). Level AAA requires 7:1 for normal text. A contrast ratio of 1:1 means no contrast (same colour); 21:1 is the maximum (black on white). Many colours that look fine to people with full colour vision fail contrast requirements — for example, light grey text (#999999) on white (#FFFFFF) has a contrast ratio of only 2.85:1, failing AA. The Color Contrast Checker tool on this site can verify whether any two colours meet WCAG standards.",
  },
  {
    q: "What are CSS custom properties (variables) and how do I use colour codes in them?",
    a: "CSS custom properties (also called CSS variables) allow you to store colour values (and other values) in reusable named variables, then reference them throughout your stylesheet. This makes it easy to maintain a consistent colour system and update colours globally by changing one value. Define custom properties in the :root selector: :root { --color-primary: #E63946; --color-secondary: #457B9D; }. Then use them anywhere in your CSS: button { background-color: var(--color-primary); }. This approach is the foundation of modern design tokens — a standardised way to name and manage design decisions. Tools like Figma and design systems often export colour tokens as CSS custom properties. When building a colour palette, define your full colour set as custom properties at the start of your stylesheet for maximum maintainability.",
  },
  {
    q: "How do I convert between HEX, RGB, and HSL?",
    a: "To convert HEX to RGB: take each pair of hex digits and convert from base-16 to base-10. For #FF6347: FF=255 (red), 63=99 (green), 47=71 (blue) → rgb(255, 99, 71). To convert RGB to HEX: convert each value from decimal to hexadecimal and pad to two digits. 255=FF, 99=63, 71=47 → #FF6347. To convert RGB to HSL: normalise each RGB value to 0–1, find the max and min values, then calculate Hue using the formula H = 60° × ((G-B)/(max-min)) for max=R; Saturation = (max-min) / (1-|2L-1|); Lightness = (max+min)/2. This is more complex to do by hand — use a tool like this one or a colour conversion library. In JavaScript, libraries like chroma.js and tinycolor2 handle all conversions automatically. This tool shows all three formats simultaneously so you never need to convert manually.",
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
          How to Use the Hex Color Code Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Use the colour picker or type a HEX value to see the matching RGB and
          HSL codes — copy any format with one click for use in CSS, Figma, or
          any design or development workflow.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Pick a colour with the colour picker",
              body: "Click the large colour swatch or the colour picker input to open your browser's native colour picker. Drag the selector across the colour spectrum to choose any hue, then adjust the saturation and brightness in the gradient panel. The colour updates in real time. You can also click 'Random Color' to generate a random colour — useful for exploring the colour space or finding inspiration when you're not starting with a specific colour in mind.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Exploring colours:</strong> Use the random colour
                  generator to quickly sample a wide range of hues and discover
                  unexpected combinations. Click it repeatedly and pay attention
                  to which colours feel energetic, calm, professional, or
                  playful. This is a useful exercise when building a brand
                  colour palette from scratch — start with a large set of
                  candidates before narrowing down.
                </div>
              ),
            },
            {
              n: 2,
              title: "Read the HEX, RGB, and HSL codes",
              body: "Once a colour is selected, the tool displays three colour code formats simultaneously: HEX (e.g., #E63946), RGB (e.g., rgb(230, 57, 70)), and HSL (e.g., hsl(356°, 78%, 56%)). Each format has a one-click copy button — click it and the value is instantly copied to your clipboard, ready to paste into your CSS file, Figma colour field, Photoshop colour picker, or any other tool. The large colour preview swatch shows the selected colour so you can visually confirm you have the right one.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Colour
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          HEX
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          RGB
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          HSL
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Common meaning
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {NAMED_COLORS.map(([hex, rgb, hsl, name, meaning]) => (
                        <tr key={hex} className="hover:bg-pink-50">
                          <td className="px-4 py-2 flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0"
                              style={{ backgroundColor: hex }}
                            />
                            <span className="font-medium text-gray-900 text-xs">
                              {name}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs font-mono font-bold text-pink-700">
                            {hex}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-gray-600">
                            {rgb}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-gray-600">
                            {hsl}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {meaning}
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
              title: "Type or paste a HEX code directly",
              body: "If you already have a HEX code and want to see the RGB and HSL equivalents, type or paste it into the HEX input field. The tool updates the colour picker, preview swatch, and all three format displays instantly. You can enter a full 6-digit HEX code with or without the # prefix. This is useful for converting between colour formats — for example, when a design spec gives you a HEX code but your CSS framework expects HSL values.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Format conversion workflow:</strong> Paste a HEX code
                  from Figma → read the HSL value → use the HSL in your CSS
                  custom properties. Or use the RGB value for an rgba() call
                  with transparency. The tool shows all three simultaneously so
                  you never need to switch between converters.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use the saved colours history",
              body: "Each colour you pick or generate is saved to the colour history panel, building up a palette of recently used colours as you work. Click any saved colour swatch to reload it — the picker, codes, and preview all update instantly. This is useful for building a colour palette iteratively: explore different hues, save the ones you like by returning to them, and compare options side-by-side in the history panel. Clear the history at any time to start a fresh palette.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Building a colour palette:</strong> A strong colour
                  palette for a website or app typically includes a primary
                  brand colour, a secondary/accent colour, and a set of neutral
                  greys. Use the tool to explore candidates: pick a primary hue
                  you like, then use HSL to find a lighter tint (increase L), a
                  darker shade (decrease L), and a muted version (decrease S).
                  Your history panel becomes a visual palette you can compare at
                  a glance.
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
              title: "Web design & CSS",
              desc: "Get copy-ready HEX, RGB, and HSL values to paste directly into CSS stylesheets or design system colour tokens.",
            },
            {
              emoji: "🖥️",
              title: "Figma and design tools",
              desc: "Pick a colour, copy the HEX code, and paste it into Figma, Sketch, Adobe XD, or any other design application.",
            },
            {
              emoji: "📐",
              title: "Brand colour systems",
              desc: "Explore and document primary, secondary, and neutral colours for a brand palette — use history to compare candidates.",
            },
            {
              emoji: "🖨️",
              title: "Print and media design",
              desc: "Identify HEX and RGB values for digital versions of colours used in print design (noting that RGB and CMYK gamuts differ).",
            },
            {
              emoji: "🌈",
              title: "UI component theming",
              desc: "Generate tints and shades of a brand colour by picking variations and noting the HSL lightness values for a systematic scale.",
            },
            {
              emoji: "✏️",
              title: "Developer colour reference",
              desc: "Quick lookup when you know what colour you want visually but need the exact code — faster than searching a colour reference table.",
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
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="text-xl font-bold mb-3">
            HEX, RGB, and HSL all describe the same colour — choose the format
            that fits your workflow
          </h3>
          <p className="text-pink-100 leading-relaxed max-w-xl mx-auto text-sm">
            CSS supports all three colour formats natively: #E63946, rgb(230,
            57, 70), and hsl(356, 78%, 56%) all produce identical results in a
            browser. Use HEX for static values in stylesheets and design tools
            where compactness matters. Use rgba() when you need alpha
            transparency. Use HSL when building a colour system — it's far
            easier to generate consistent tints (increase lightness) and shades
            (decrease lightness) programmatically using HSL than RGB or HEX,
            making it the preferred format for design tokens and CSS custom
            properties in modern design systems.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Design Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/color-contrast-checker",
                label: "Color Contrast Checker",
                desc: "Check if two colours meet WCAG AA/AAA accessibility contrast requirements for text and UI.",
              },
              {
                href: "/tools/color-code-converter",
                label: "Color Code Converter",
                desc: "Convert between HEX, RGB, HSL, and other colour formats with full conversions in one place.",
              },
              {
                href: "/tools/gradient-generator",
                label: "Gradient Generator",
                desc: "Create CSS gradient code — linear, radial, and conic — with a visual two-colour picker.",
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
