"use client";
// src/app/tools/gradient-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/gradient-generator";
const TOOL_NAME = "CSS Gradient Generator";

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
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500'
        >
          ✕
        </button>
        <h3 className='text-lg font-black text-gray-900 mb-1'>
          Take it with you
        </h3>
        <p className='text-sm text-gray-400 mb-5'>
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-fuchsia-100 shadow-inner mb-5'>
          <canvas ref={canvasRef} />
        </div>
        <p className='text-xs text-gray-300 font-mono break-all'>{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free CSS gradient generator — create linear, radial and conic gradients visually",
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
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <p className='text-sm font-bold text-gray-900 mb-0.5'>
              Found this useful?
            </p>
            <p className='text-xs text-gray-400'>
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className='px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold'
            >
              {copied ? (
                <span className='text-green-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What is the difference between linear, radial, and conic gradients in CSS?",
    a: "A linear-gradient transitions colors along a straight line at a specified angle (e.g. 135deg transitions from top-left to bottom-right). A radial-gradient emanates from a center point outward in a circle or ellipse — useful for spotlight and glow effects. A conic-gradient transitions colors around a center point like the hands of a clock — useful for pie charts, color wheels, and angular backgrounds. All three are supported natively in all modern browsers without any prefixes.",
  },
  {
    q: "How do I add multiple color stops to a gradient?",
    a: "Add as many stops as needed by clicking Add stop. Each stop has a color and a percentage position (0% = start, 100% = end). The positions do not need to be evenly spaced — placing two stops at the same percentage creates a hard edge rather than a smooth transition. Example: linear-gradient(90deg, red 0%, red 50%, blue 50%, blue 100%) creates a hard split halfway.",
  },
  {
    q: "Can I use gradients as text colors in CSS?",
    a: "Yes — combine background: linear-gradient(...) with background-clip: text and color: transparent on the element. This clips the gradient to the text shape, making the text itself render the gradient colors. Note that -webkit-background-clip is still needed for Safari compatibility alongside the standard background-clip property.",
  },
  {
    q: "How do I make a gradient repeat across the background?",
    a: "Use repeating-linear-gradient or repeating-radial-gradient instead of the standard versions. Specify the total size of one repetition by setting the last color stop position: repeating-linear-gradient(45deg, #6366f1 0px, #6366f1 10px, transparent 10px, transparent 20px) creates diagonal stripes repeating every 20px. This technique is used for stripe patterns, hazard tape effects, and loading indicators.",
  },
  {
    q: "Why does my gradient look different in Safari compared to Chrome?",
    a: "Safari uses a slightly different colour interpolation method for CSS gradients, which can cause mid-gradient hues to appear different — particularly for gradients passing through hues on opposite sides of the color wheel (e.g. blue to red). For production, always test gradients in Safari explicitly and consider adjusting mid-stop colors if the difference is visually significant.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Frequently Asked Questions
      </h2>
      <div className='space-y-3'>
        {FAQS.map((f, i) => (
          <div
            key={i}
            className='border border-gray-100 rounded-xl overflow-hidden'
          >
            <button
              className='w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors'
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className='font-semibold text-gray-900 text-sm'>{f.q}</span>
              <span className='text-fuchsia-600 text-lg shrink-0'>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className='px-5 pb-5 text-sm text-gray-600 leading-relaxed'>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageEditorial() {
  return (
    <>
      <div className='max-w-6xl mx-auto px-4 mt-6 flex justify-center'>
        <div className='hidden sm:block'>
          <AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className='block sm:hidden'>
          <AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
      <div className='max-w-6xl mx-auto px-4 mt-4 flex justify-center'>
        <AdSlot
          variant='leaderboard'
          slotId={SLOT_LEADERBOARD}
          className='hidden sm:flex'
        />
        <AdSlot
          variant='mediumrectangle'
          slotId={SLOT_LEADERBOARD}
          className='flex sm:hidden'
        />
      </div>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
        <ShareBar />
      </div>

      <section
        id='how-to-use'
        className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'
      >
        <h2 className='text-4xl font-bold text-gray-900 mb-4 text-center'>
          How to Use the CSS Gradient Generator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Pick your gradient type, choose colors, adjust direction — then copy
          the ready-to-use CSS in one click.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Choose your gradient type",
              body: "Select linear for directional blends (the most common), radial for circular effects emanating from a center, or conic for angular sweeps around a center point. The live preview updates instantly as you switch types. Each type uses a different CSS function: linear-gradient(), radial-gradient(), or conic-gradient().",
              enrich: (
                <div className='bg-fuchsia-50 rounded-xl px-5 py-4 text-sm text-fuchsia-800 leading-relaxed'>
                  <strong>Most common choice:</strong> Linear gradients are used
                  in over 90% of web gradient backgrounds. Start with linear
                  unless you specifically need a spotlight (radial) or pie-chart
                  effect (conic).
                </div>
              ),
            },
            {
              n: 2,
              title: "Set the angle or direction",
              body: "For linear and conic gradients, drag the angle slider to set the direction. 0° flows top to bottom, 90° flows left to right, 135° flows diagonally from top-left to bottom-right — popular for hero sections. Radial gradients always emanate from the center.",
              enrich: (
                <div className='bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed'>
                  <strong>Named directions:</strong> CSS also accepts keyword
                  directions — to right, to bottom right — but degree values
                  give you precise control for any custom angle beyond the 8
                  named directions.
                </div>
              ),
            },
            {
              n: 3,
              title: "Add and position color stops",
              body: "Each color stop has a color swatch you can click to change, and a position slider from 0% to 100%. Stops are automatically sorted by position. Add extra stops to create three- or four-color gradients — click Add stop to insert a new one. Remove any stop with the ✕ button (minimum two stops required).",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Stops
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Effect
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Common use
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "2 stops",
                          "Simple smooth blend",
                          "Hero backgrounds, buttons",
                        ],
                        [
                          "3 stops",
                          "Three-color transition",
                          "Brand gradients, banners",
                        ],
                        [
                          "4+ stops",
                          "Complex multi-color",
                          "Illustrations, color wheels",
                        ],
                        [
                          "Same position x2",
                          "Hard colour edge",
                          "Striped patterns, split designs",
                        ],
                      ].map(([s, e, u]) => (
                        <tr key={s} className='hover:bg-fuchsia-50'>
                          <td className='px-4 py-2 font-bold text-gray-800'>
                            {s}
                          </td>
                          <td className='px-4 py-2 text-fuchsia-700'>{e}</td>
                          <td className='px-4 py-2 text-gray-500'>{u}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy the CSS and use it in your project",
              body: "Click the Copy button in the CSS output panel to copy the complete background property declaration. Paste it directly into your stylesheet, Tailwind config, Figma CSS export field, or inline style. The output is production-ready — no vendor prefixes are needed for modern browser support.",
              enrich: (
                <div className='bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed'>
                  <strong>Tailwind arbitrary value:</strong> Use the gradient as{" "}
                  <code className='bg-pink-100 px-1 rounded text-xs'>
                    [background:linear-gradient(135deg,#6366f1,#ec4899)]
                  </code>{" "}
                  — or add it to your tailwind.config.js backgroundImage object
                  for a named utility class.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-600 text-white font-black text-lg flex items-center justify-center'>
                {n}
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  {title}
                </h3>
                <p className='text-gray-600 leading-relaxed mb-3'>{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
          Common use cases
        </h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14'>
          {[
            {
              emoji: "🦸",
              title: "Hero section backgrounds",
              desc: "Diagonal linear gradients at 135° are the go-to for modern SaaS hero sections and landing pages.",
            },
            {
              emoji: "🔘",
              title: "Button hover effects",
              desc: "Subtle gradient backgrounds on buttons add depth — try a small lightness shift between stops.",
            },
            {
              emoji: "🃏",
              title: "Card backgrounds",
              desc: "Soft, low-saturation gradients on cards add visual interest without competing with the content.",
            },
            {
              emoji: "📊",
              title: "Pie charts and progress rings",
              desc: "Conic gradients create pie charts and progress rings directly in CSS without images or SVG.",
            },
            {
              emoji: "✍️",
              title: "Gradient text",
              desc: "Combine with background-clip: text for colourful heading typography that instantly grabs attention.",
            },
            {
              emoji: "🌅",
              title: "Full-page backgrounds",
              desc: "Large radial gradients create a focal point that draws the eye to the center of the page.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-fuchsia-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div
          className='rounded-2xl p-8 text-white text-center mb-14'
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
        >
          <div className='text-3xl mb-3'>🔒</div>
          <h3 className='text-xl font-bold mb-3'>
            All generation happens in your browser
          </h3>
          <p className='text-fuchsia-100 leading-relaxed max-w-xl mx-auto text-sm'>
            No data is sent to any server. Gradient CSS is generated entirely in
            JavaScript on your device — instant and private.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/color-code-converter",
                label: "Color Code Converter",
                desc: "Convert HEX to RGB/HSL to find exact gradient stop values.",
              },
              {
                href: "/tools/color-contrast-checker",
                label: "Color Contrast Checker",
                desc: "Check that text on gradient backgrounds meets WCAG contrast standards.",
              },
              {
                href: "/tools/html-minifier",
                label: "HTML Minifier",
                desc: "Minify HTML after adding gradient-styled sections to your pages.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-fuchsia-200 hover:-translate-y-1 transition-all duration-200 p-5'
              >
                <div className='font-bold text-gray-900 text-sm mb-1'>
                  {label}
                </div>
                <div className='text-xs text-gray-500'>{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
