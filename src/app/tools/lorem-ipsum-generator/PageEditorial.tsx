"use client";
// src/app/tools/lorem-ipsum-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/lorem-ipsum-generator";
const TOOL_NAME = "Lorem Ipsum Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#92400e", light: "#fffbeb" },
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
    "Free lorem ipsum generator — generate placeholder text in paragraphs, sentences, words, or lists instantly",
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
                <span className="text-amber-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is Lorem Ipsum and where does it come from?",
    a: "Lorem ipsum is a scrambled extract from 'De Finibus Bonorum et Malorum' (On the Ends of Good and Evil), a philosophical work by the Roman statesman and orator Cicero, written in 45 BCE. The passage beginning 'Lorem ipsum dolor sit amet...' is derived from sections 1.10.32 and 1.10.33 of that work. The words have been deliberately scrambled and altered so they are not readable as Latin — the goal is to produce text that looks natural and has a realistic letter-frequency distribution without being legible enough to distract readers from the design. The specific Lorem ipsum passage has been used as typesetting dummy text since at least the 1500s and became universally standard in desktop publishing software in the 1980s and 1990s.",
  },
  {
    q: "What is the difference between the four output modes?",
    a: "Paragraphs mode generates full blocks of connected prose, each containing 4–7 randomly constructed sentences. This is the most common mode and is best for prototyping body text, article layouts, blog posts, and long-form content areas. Sentences mode generates individual standalone sentences — useful for shorter content blocks like product descriptions, caption placeholders, tooltip text, and UI help text fields. Words mode generates a flat sequence of words with a full stop at the end, best for filling a specific word budget or a very short text field without sentence structure. Lists mode generates bullet-pointed placeholder items — ideal for prototyping navigation menus, feature lists, FAQ lists, and bullet-point-heavy UI components.",
  },
  {
    q: "Should I start my Lorem Ipsum with 'Lorem ipsum'?",
    a: "The 'Start with Lorem ipsum' option makes the generated text begin with the iconic 'Lorem ipsum dolor sit amet...' opening, which is the traditional and universally recognised placeholder format. Designers and developers tend to use this by default because it immediately signals to collaborators that the text is a placeholder and not real content. However, if you're generating multiple independent blocks of placeholder text — for example, 10 different product descriptions in a grid — you may want to disable this so the blocks don't all look identical from the first line. The generator randomises all subsequent text regardless of this setting.",
  },
  {
    q: "How does this Lorem Ipsum generator work? Is it the same every time?",
    a: "The generator uses a predefined vocabulary of 90 Latin-derived lorem ipsum words and constructs random sentences and paragraphs from them on the fly using JavaScript. Sentence length is randomised between 8 and 15 words, and paragraph length is randomised between 4 and 7 sentences — which means every click of Regenerate produces different output. The text is not pulled from a fixed database or API — it is generated fresh in your browser each time. This means you'll get unique placeholder text every time you click Regenerate, and no two outputs are identical (though they will share vocabulary since they draw from the same word pool).",
  },
  {
    q: "Can I use Lorem Ipsum text on a live website or in production?",
    a: "No — lorem ipsum is exclusively a design placeholder and should never appear in a finished, live product. Using lorem ipsum in production is a common mistake with real consequences: it can appear in search engine indexes, confusing crawlers and users; it fails accessibility requirements since the text is not meaningful; it reduces user trust if spotted; and it indicates an incomplete publishing workflow. Always replace all placeholder text with real content before launching a website, app, or document. Some content management systems have built-in tools to highlight placeholder text — use these to audit your pages before going live.",
  },
  {
    q: "What is the standard length for a Lorem Ipsum paragraph?",
    a: "The standard lorem ipsum paragraph used in most style sheets and type specimens is the opening passage from De Finibus, which contains approximately 200 words across 5–6 sentences. For design purposes, a 'typical' body text paragraph is considered to be 50–150 words, or 3–6 sentences, with an average sentence length of 15–20 words. This generator uses 4–7 sentences per paragraph with 8–15 words per sentence, which produces paragraphs of roughly 60–100 words — a realistic proxy for body copy in blog posts, news articles, and marketing content. For UI components like card descriptions, shorter snippets of 20–40 words are more representative.",
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
          How to Use the Lorem Ipsum Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Choose your output type, set the count, and get unique placeholder
          text — copy or download in seconds.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose your output type",
              body: "The four type buttons — Paragraphs, Sentences, Words, and Lists — control the structure of the generated text. Paragraphs produces full prose blocks; Sentences produces standalone sentences; Words produces a flat word sequence; Lists produces bulleted placeholder items. Text is generated immediately when you switch types — no button press required.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Mode
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Max count
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Paragraphs",
                          "Article layouts, blog body, long-form content",
                          "10",
                        ],
                        [
                          "Sentences",
                          "Product descriptions, card copy, tooltips",
                          "20",
                        ],
                        [
                          "Words",
                          "Short text fields, specific word budgets",
                          "200",
                        ],
                        [
                          "Lists",
                          "Navigation, feature lists, bullet-point UIs",
                          "10",
                        ],
                      ].map(([m, b, x]) => (
                        <tr key={m} className="hover:bg-amber-50">
                          <td className="px-4 py-2 font-bold text-amber-700 text-xs">
                            {m}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {b}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {x}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 2,
              title: "Set the count with the slider",
              body: "Drag the Count slider to control how many units are generated. The maximum varies by type: up to 10 for paragraphs and lists, 20 for sentences, and 200 for words. The count and word/character statistics in the output panel update live as you drag the slider — useful when targeting a specific word count or content area size.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Quick presets:</strong> The four Quick Preset buttons
                  — Short Article (3 paragraphs), Medium Article (5 paragraphs),
                  Description (10 sentences), and Brief Text (50 words) — apply
                  common configurations in one click. Use these when you need a
                  typical-length placeholder without thinking about the right
                  count.
                </div>
              ),
            },
            {
              n: 3,
              title: "Toggle 'Start with Lorem ipsum'",
              body: "When enabled, the output begins with the traditional 'Lorem ipsum dolor sit amet...' opening. This is the universally recognised placeholder signal and is enabled by default. Disable it when generating multiple independent text blocks — for example, 10 product card descriptions in a grid — so they don't all share the same opening line.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Why the classic opening matters:</strong> Starting
                  with 'Lorem ipsum' is the agreed-upon convention that signals
                  to designers, developers, developers, and clients that the
                  text is placeholder. Text that starts with a random Latin word
                  is less immediately recognisable as dummy content and can
                  cause confusion in client reviews.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy, regenerate, or download",
              body: "The three action buttons above the output area each serve a different purpose. Regenerate creates fresh random text using the same settings — useful when you need variety. Copy copies the full output to your clipboard for pasting directly into Figma, Sketch, a CMS, or a code editor. The download button saves the text as a plain .txt file — useful when seeding large amounts of placeholder content into a content management system or database.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Seeding CMS databases:</strong> Generate 10
                  paragraphs, download as .txt, then import into your CMS's bulk
                  upload or seeder script. For repeating content structures
                  (blog post grids, product listings), generate in batches and
                  Regenerate between each batch for content variety.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 text-white font-black text-lg flex items-center justify-center">
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
              title: "UI and web design mockups",
              desc: "Fill wireframes and Figma/Sketch prototypes with realistic-length placeholder text so layouts can be reviewed before real content is written.",
            },
            {
              emoji: "🖨️",
              title: "Print and graphic design",
              desc: "Populate brochures, posters, packaging, and print templates with body copy placeholders to evaluate typography and spacing before client delivery.",
            },
            {
              emoji: "💻",
              title: "Frontend development",
              desc: "Seed HTML, CSS, and JavaScript projects with dummy content during development — test responsive breakpoints with realistic word volumes before connecting a CMS.",
            },
            {
              emoji: "📊",
              title: "CMS and database seeding",
              desc: "Use the download function to generate bulk placeholder content for populating content management systems, databases, and staging environments.",
            },
            {
              emoji: "📝",
              title: "Typography specimens",
              desc: "Generate paragraphs at specific word counts to create type specimens showcasing fonts, leading, tracking, and line length in context.",
            },
            {
              emoji: "📋",
              title: "Template creation",
              desc: "Build reusable document, email, and presentation templates with realistic body text lengths before final copy is provided by a client or copywriter.",
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

        <div className="bg-gradient-to-br from-amber-500 to-orange-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📜</div>
          <h3 className="text-xl font-bold mb-3">
            Over 500 years of placeholder history
          </h3>
          <p className="text-amber-100 leading-relaxed max-w-xl mx-auto text-sm">
            Lorem ipsum text has been used in typesetting since the 1500s.
            Letraset, the dry-transfer lettering company, popularised it in the
            1970s. Adobe PageMaker and desktop publishing software standardised
            it in the 1980s. Today it remains the universal language of
            placeholder content across every design discipline.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Text Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/word-character-counter",
                label: "Word & Character Counter",
                desc: "Count words, characters, sentences, and paragraphs with reading time estimates.",
              },
              {
                href: "/tools/text-case-converter",
                label: "Text Case Converter",
                desc: "Convert text to uppercase, lowercase, camelCase, snake_case and 9 more formats.",
              },
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Live word and character counter as you type with real-time stats.",
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
