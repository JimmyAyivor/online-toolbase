"use client";
// src/app/tools/text-case-converter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/text-case-converter";
const TOOL_NAME = "Text Case Converter";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#4c1d95", light: "#fdf4ff" },
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-purple-100 shadow-inner mb-5'>
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
    "Free text case converter — convert to camelCase, snake_case, title case and 9 more formats instantly",
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
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What is the difference between camelCase, PascalCase, snake_case, and kebab-case?",
    a: "These are all naming conventions used in programming and web development, each with different separator and capitalisation rules. camelCase starts with a lowercase letter and capitalises the first letter of each subsequent word, with no spaces or separators (e.g. myVariableName). PascalCase is identical but starts with an uppercase letter (e.g. MyClassName). snake_case uses underscores as separators with all letters lowercase (e.g. my_variable_name). kebab-case uses hyphens as separators with all letters lowercase (e.g. my-variable-name). Each convention is standard in different contexts — see the use cases FAQ below for which to use where.",
  },
  {
    q: "What is Title Case and when should I use it?",
    a: "Title Case capitalises the first letter of major words in a sentence, leaving minor words (articles, prepositions, conjunctions under 4 letters — 'a', 'an', 'the', 'and', 'but', 'or', 'for', 'in', 'of', 'at', 'to', 'by', 'nor', 'on', 'from') in lowercase unless they appear as the first word. For example: 'The Lord of the Rings' not 'The Lord Of The Rings'. Use Title Case for book titles, film titles, article headlines, section headings in formal documents, and navigation labels. Some style guides (Chicago, APA) have specific additional rules — use the tool as a starting point and apply manual adjustments for strict academic formatting.",
  },
  {
    q: "Which case should I use for URLs and CSS class names?",
    a: "For URLs: use kebab-case (e.g. /tools/text-case-converter). kebab-case is the universal standard for URL slugs — it is human-readable, works reliably across all operating systems and browsers, and is preferred by Google for SEO. Never use spaces (replaced by %20), camelCase, or underscores in URLs. For CSS class names: also use kebab-case (e.g. .nav-menu, .hero-section, .btn-primary). This is the convention established by Bootstrap, Tailwind CSS, and virtually all major CSS frameworks. For CSS custom properties (variables), also use kebab-case: --primary-color.",
  },
  {
    q: "What is Sentence case and how does it differ from Title Case?",
    a: "Sentence case capitalises only the first letter of the first word and any proper nouns — exactly as you would write a normal sentence. Example: 'This is a sentence case heading'. Title Case capitalises the first letter of all major words. Example: 'This Is a Title Case Heading'. Sentence case is preferred for most digital UI copy — button labels, form labels, error messages, navigation items, and body text headings — because it feels more natural and conversational. Title Case is better suited for formal editorial contexts: book titles, film credits, and traditional journalism.",
  },
  {
    q: "Does the text case converter work with special characters and non-English text?",
    a: "The basic case conversions (uppercase, lowercase, sentence case, title case) use JavaScript's native toUpperCase() and toLowerCase() methods, which support Unicode and handle most European languages with accented characters (é → É, ü → Ü, etc.). However, developer-format cases (camelCase, snake_case, kebab-case, dot.case) strip non-alphanumeric characters since these characters are not valid in identifiers in most programming languages. For text that needs to preserve special characters, use sentence case, title case, or the alternating/inverse case modes.",
  },
  {
    q: "What is dot.case and where is it used?",
    a: "dot.case (also called dot notation or dot.notation) separates words with dots and lowercases all letters. It is less common than snake_case or kebab-case but appears in: Java and Kotlin package names (com.example.myapp), some configuration file key formats (server.port, database.url), Node.js and npm package namespacing, and property access notation in some template engines. In general web development, snake_case and kebab-case are more prevalent, but dot.case is standard in JVM ecosystem projects.",
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
              <span className='text-purple-600 text-lg shrink-0'>
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
          How to Use the Text Case Converter
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Paste your text, click a format, and get perfectly converted output —
          no account, no install, no word limit.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Paste or type your text",
              body: "Enter your text in the large input area. You can type directly or paste from any source — a document, email, code editor, or website. The character, word, and line counters update instantly so you always know the size of your text.",
              enrich: (
                <div className='bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed'>
                  <strong>No word limit:</strong> The tool processes text
                  entirely in your browser using JavaScript. There's no server
                  call for the conversion itself, so performance is instant
                  regardless of text length — paste an entire document and all
                  12 conversions appear simultaneously.
                </div>
              ),
            },
            {
              n: 2,
              title: "Use Quick Convert for the 6 most common formats",
              body: "The Quick Convert panel on the right shows the 6 most frequently used formats — Sentence case, lower case, UPPER CASE, Capitalized Case, Title Case, and alternating case. Clicking any button immediately applies that conversion to your text in the input box, replacing it. You can chain conversions — e.g. convert to lower case first, then to Title Case.",
              enrich: (
                <div className='bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed'>
                  <strong>Apply vs Copy:</strong> The Quick Convert buttons
                  change the text in the input. In the All Formats grid below,
                  'Apply to input' replaces the input text, while the copy icon
                  copies the converted version without changing your original —
                  useful when you need multiple formats from the same source
                  text.
                </div>
              ),
            },
            {
              n: 3,
              title: "Browse all 12 formats in the conversion grid",
              body: "The full grid shows all 12 case formats simultaneously. When text is entered, each card displays a live preview of your converted text. If no text has been entered, the cards show a static example so you can preview what each format looks like before committing.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Format
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Primary use
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Example
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        ["camelCase", "JS/TS variables", "myVariableName"],
                        ["PascalCase", "Classes & components", "MyComponent"],
                        ["snake_case", "Python / DB columns", "my_column"],
                        ["kebab-case", "URLs / CSS classes", "my-page-slug"],
                        ["Title Case", "Headlines & titles", "The Art of War"],
                        [
                          "UPPER CASE",
                          "Constants / env vars",
                          "MAX_RETRY_COUNT",
                        ],
                      ].map(([f, u, e]) => (
                        <tr key={f} className='hover:bg-purple-50'>
                          <td className='px-4 py-2 font-mono text-purple-700 font-bold text-xs'>
                            {f}
                          </td>
                          <td className='px-4 py-2 text-gray-700 text-xs'>
                            {u}
                          </td>
                          <td className='px-4 py-2 text-gray-500 text-xs'>
                            {e}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy or download your converted text",
              body: "Each format card has a copy button that copies just that format's output to your clipboard. The Download button at the top saves the current contents of the input box as a .txt file — useful when you've converted a large document and want to save the result.",
              enrich: (
                <div className='bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed'>
                  <strong>Tip — convert then download:</strong> Click 'Apply to
                  input' on your target format first, then click Download. The
                  downloaded file will contain the converted text rather than
                  your original.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "💻",
              title: "Variable & function naming",
              desc: "Convert description text to camelCase or snake_case for use as variable names in JavaScript, Python, Go, or SQL.",
            },
            {
              emoji: "🔗",
              title: "URL slug generation",
              desc: "Paste a page title and convert to kebab-case to create a clean, SEO-friendly URL slug.",
            },
            {
              emoji: "📰",
              title: "Headline formatting",
              desc: "Paste a draft headline and apply Title Case or Sentence case to match your editorial style guide.",
            },
            {
              emoji: "⚙️",
              title: "Config key formatting",
              desc: "Convert environment variable names to UPPER_CASE or convert config file keys to snake_case or dot.case.",
            },
            {
              emoji: "🎨",
              title: "CSS class naming",
              desc: "Convert component names to kebab-case for BEM, utility CSS classes, or Tailwind custom class names.",
            },
            {
              emoji: "📋",
              title: "Copy editing",
              desc: "Fix ALL CAPS or all-lowercase pasted text from PDFs, emails, or legacy systems before using it in documents.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-purple-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>⚡</div>
          <h3 className='text-xl font-bold mb-3'>
            Runs entirely in your browser
          </h3>
          <p className='text-purple-100 leading-relaxed max-w-xl mx-auto text-sm'>
            All 12 case conversions happen instantly using JavaScript — no text
            is sent to a server. Your content stays completely private. There
            are no word limits, no rate limits, and no account required.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Text Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Count words, characters, sentences, and reading time as you type.",
              },
              {
                href: "/tools/flip-text-generator",
                label: "Flip Text Generator",
                desc: "Flip your text upside-down or reverse it character by character.",
              },
              {
                href: "/tools/morse-code-translator",
                label: "Morse Code Translator",
                desc: "Convert text to Morse code dots and dashes and back again.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-purple-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
