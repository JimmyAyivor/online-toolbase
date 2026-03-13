"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/roman-numeral-converter";
const TOOL_NAME = "Roman Numeral Converter";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7c2d12", light: "#fff7ed" },
      });
    });
    return () => {
      c = true;
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-orange-100 shadow-inner mb-5'>
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
    "Free roman numeral converter at onlinetoolbase.com",
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
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What are the rules of Roman numerals?",
    a: "Roman numerals follow two core rules: addition and subtraction. Addition: symbols are generally written largest-to-smallest left-to-right and their values added together (VIII = 5+1+1+1 = 8). Subtraction: a smaller symbol placed before a larger symbol is subtracted (IV = 5-1 = 4, IX = 10-1 = 9). The six subtractive pairs are IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900). The same symbol cannot be repeated more than three times in a row (except M which can repeat for large thousands).",
  },
  {
    q: "Why do Roman numerals not have a zero?",
    a: "The Roman numeral system was developed for counting and recording quantities — contexts where zero (the absence of something) was not a concept that required representation. The number zero as a mathematical concept was developed independently in India and later introduced to Europe through Arabic mathematics in the medieval period. Roman numerals are therefore inadequate for algebra, positional arithmetic, or any calculation requiring zero. This is one reason the Indo-Arabic numeral system (1, 2, 3...) with its zero eventually replaced Roman numerals for mathematics.",
  },
  {
    q: "What is the largest number in standard Roman numerals?",
    a: "Standard Roman numerals represent 1 to 3,999. The largest is MMMCMXCIX (3,999). For numbers above 3,999, historical texts used a vinculum (an overbar) to multiply a numeral by 1,000 — so V̄ = 5,000 and M̄ = 1,000,000. This tool uses the standard 1–3,999 range without vinculum notation.",
  },
  {
    q: "Where are Roman numerals still used today?",
    a: "Roman numerals remain common in: clock faces (I–XII), chapter and section numbering in books and legal documents, year numbering in film and television credits (copyright years like MMXXIV), Super Bowl numbering, Olympic Games editions, monarchs and popes (King Charles III, Pope John XXIII), centuries (21st Century → XXI Century), and decorative inscriptions on buildings and monuments. They convey formality, tradition, and permanence — which is why they are maintained in these contexts.",
  },
  {
    q: "How do I write years in Roman numerals?",
    a: "Convert the year digit by digit from thousands down. Example for 2024: 2000 = MM, 0 hundreds = nothing, 20 = XX, 4 = IV → MMXXIV. Example for 1999: 1000 = M, 900 = CM, 90 = XC, 9 = IX → MCMXCIX. Use this tool's examples list to quickly check any recent year — click any example to load it into the converter.",
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
              <span className='text-orange-600 text-lg shrink-0'>
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
          How to Use the Roman Numeral Converter
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Simple, fast, and free.
        </p>
        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Choose conversion direction",
              body: "Click '123 → XIV' to convert a number to Roman numerals, or 'XIV → 123' to convert Roman numerals to a number. Both directions are supported for numbers 1 through 3,999.",
              enrich: (
                <div className='bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed'>
                  <strong>Quick reference:</strong> Use the examples list on the
                  right to quickly verify common values — click any example row
                  to load that value into the converter.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your number or Roman numeral",
              body: "For number-to-Roman: type a whole number between 1 and 3,999. For Roman-to-number: type your Roman numeral using the letters M, D, C, L, X, V, and I (uppercase or lowercase). The result updates instantly as you type.",
              enrich: (
                <div className='bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed'>
                  <strong>Valid characters:</strong> Only M, D, C, L, X, V, and
                  I are valid Roman numeral characters. Other characters will
                  produce an 'Invalid Roman numeral' error.
                </div>
              ),
            },
            {
              n: 3,
              title: "Read and copy the result",
              body: "The result is displayed in a large, clearly formatted panel. Click the Copy button to copy the result to your clipboard.",
              enrich: (
                <div className='bg-yellow-50 rounded-xl px-5 py-4 text-sm text-yellow-800 leading-relaxed'>
                  <strong>Year tip:</strong> Type any year between 1 and 3,999
                  to get its Roman numeral equivalent — useful for film credits,
                  building inscriptions, and book copyright pages.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use the symbol reference table",
              body: "The reference table shows all 13 Roman numeral symbols (I=1 through M=1000) with their values. Use this to build an intuitive understanding of the additive/subtractive system.",
              enrich: (
                <div className='bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed'>
                  <strong>Memorise the six subtractive pairs:</strong> IV=4,
                  IX=9, XL=40, XC=90, CD=400, CM=900. Knowing these six patterns
                  lets you read virtually any Roman numeral without a reference
                  chart.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "📽️",
              title: "Film and TV credits",
              desc: "Convert copyright years to Roman numerals for film credit sequences and production documentation.",
            },
            {
              emoji: "🏟️",
              title: "Event and competition numbering",
              desc: "Number Super Bowls, Olympics, and other recurring events in Roman numeral format.",
            },
            {
              emoji: "📚",
              title: "Book and document formatting",
              desc: "Format chapter numbers, section headings, and front matter page numbers in Roman numerals.",
            },
            {
              emoji: "⏰",
              title: "Clock face design",
              desc: "Verify Roman numeral clock markings for product design, illustration, and graphic design work.",
            },
            {
              emoji: "🏛️",
              title: "Architecture and inscriptions",
              desc: "Verify Roman numerals for building cornerstones, plaques, and monument inscriptions.",
            },
            {
              emoji: "👑",
              title: "Monarchs and titles",
              desc: "Correctly number monarchs, popes, and rulers: King Charles III = Carolus III in formal Latin.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-orange-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>
        <div className='bg-gradient-to-br from-orange-600 to-amber-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>🔒</div>
          <h3 className='text-xl font-bold mb-3'>
            100% private — runs in your browser
          </h3>
          <p className='text-orange-100 leading-relaxed max-w-xl mx-auto text-sm'>
            All processing happens locally in JavaScript. Nothing is sent to any
            server.
          </p>
        </div>
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/morse-code-translator",
                label: "Morse Code Translator",
                desc: "Translate text to another historical encoding system.",
              },
              {
                href: "/tools/flip-text-generator",
                label: "Flip Text Generator",
                desc: "Transform text with upside-down, reversed, and bold Unicode styles.",
              },
              {
                href: "/tools/number-to-words-converter",
                label: "Number to Words Converter",
                desc: "Convert numbers to their written English word equivalents.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-orange-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
