"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/morse-code-translator";
const TOOL_NAME = "Morse Code Translator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#713f12", light: "#fffbeb" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-yellow-100 shadow-inner mb-5">
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
    "Free morse code translator at onlinetoolbase.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is Morse code?",
    a: "Morse code is a character-encoding system that represents letters, digits, and punctuation as sequences of dots (short signals, called 'dits') and dashes (longer signals, called 'dahs'). It was developed in the 1830s and 1840s by Samuel Morse and Alfred Vail for use with the electric telegraph. Each character has a unique dot-dash pattern — for example, S is three dots (...) and O is three dashes (---), making SOS (...---...) the internationally recognised distress signal. Morse code was the primary form of long-distance communication until the mid-20th century.",
  },
  {
    q: "How do I write Morse code correctly?",
    a: "In text format, dots and dashes within a letter are separated by nothing (or minimal spacing), letters are separated by a single space, and words are separated by a forward slash (/) or three spaces. This tool uses the convention of single spaces between letters and / between words. In audio/signal form, a dot is one unit of time, a dash is three units, the gap between symbols within a letter is one unit, the gap between letters is three units, and the gap between words is seven units.",
  },
  {
    q: "What is the Morse code for SOS?",
    a: "SOS in Morse code is ... --- ... (three dots, three dashes, three dots). It was chosen as the international distress signal not for any acronym meaning but because it is one of the simplest and most distinctive patterns in Morse — easy to send, impossible to misidentify, and transmittable by anyone regardless of language or Morse proficiency. The pattern is sent as a continuous sequence without spaces between the letters in emergency transmission.",
  },
  {
    q: "Can Morse code be used today?",
    a: "Morse code remains in use in several contexts. Aviation radio navigation beacons (VOR, NDB) still transmit their identifiers in Morse code. Amateur radio operators use it widely — the ITU licenses still recognise Morse proficiency. It is used in accessibility contexts where visual and auditory signals are too complex for people with certain disabilities. Militaries retain Morse knowledge for backup communication. And it is widely used recreationally, educationally, and in popular culture.",
  },
  {
    q: "How do I decode Morse code manually?",
    a: "Separate the Morse by spaces: each group of dots/dashes between spaces is one letter. Find each letter in a Morse code reference chart (shown in the tool below the translator). Groups separated by / or longer gaps are word breaks. With practice, most people can decode common letters like E (.), T (-), A (.-), and N (-.) by ear without a reference. The most common letters in English (ETAOIN SHRDLU) are worth memorising first.",
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
              <span className="text-yellow-600 text-lg shrink-0">
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
          How to Use the Morse Code Translator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose encode or decode mode",
              body: "Click 'Text → Morse' to convert English text to Morse code. Click 'Morse → Text' to decode Morse code back to English. Switching mode clears the input to prevent confusion.",
              enrich: (
                <div className="bg-yellow-50 rounded-xl px-5 py-4 text-sm text-yellow-800 leading-relaxed">
                  <strong>Input format for decoding:</strong> When entering
                  Morse code to decode, separate letters with single spaces and
                  words with / (forward slash). Example: .... . .-.. .-.. --- /
                  .-- --- .-. .-.. -..
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your text or Morse code",
              body: "Type or paste your input into the text area. For encoding, use regular text — the tool converts to uppercase automatically. For decoding, enter Morse using dots, dashes, spaces, and / for word breaks.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Supported characters:</strong> Letters A–Z, numbers
                  0–9, and common punctuation (. , ? ! / : ; = + - _ " $ @ ')
                  are all supported. Unsupported characters show as '?' in the
                  output.
                </div>
              ),
            },
            {
              n: 3,
              title: "Read the output and copy",
              body: "The Morse output appears in a dark terminal-style panel. For encoding, you also see a count of dots and dashes. Click the Copy button to copy the complete Morse code or decoded text to your clipboard.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Dots and dashes counter:</strong> The dot and dash
                  count gives you an instant sense of a message's length and
                  complexity — useful for timing if you're practising audio
                  Morse transmission.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use the reference chart",
              body: "Click 'Show Morse code reference chart' to see all 26 letters and digits displayed as dot-dash patterns. This is useful for manual encoding practice or quick reference when learning.",
              enrich: (
                <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                  <strong>Learning tip:</strong> Start by memorising the 5 most
                  common letters: E (.), T (-), A (.-), I (..), N (-.). These
                  alone let you decode a significant portion of English text.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📡",
              title: "Ham radio and amateur radio",
              desc: "Encode and decode messages for Morse code practice and CW (continuous wave) radio operation.",
            },
            {
              emoji: "🎓",
              title: "Learning Morse code",
              desc: "Use the reference chart and translator together to practise encoding and decoding progressively.",
            },
            {
              emoji: "🆘",
              title: "Emergency signal knowledge",
              desc: "Learn the SOS pattern and other emergency signals that remain relevant in backcountry and maritime settings.",
            },
            {
              emoji: "🎮",
              title: "Puzzle games and escape rooms",
              desc: "Create and solve Morse code puzzles for escape rooms, scavenger hunts, and cryptography challenges.",
            },
            {
              emoji: "✈️",
              title: "Aviation beacon identification",
              desc: "Identify VOR and NDB navigation beacon identifiers that are still transmitted in Morse code.",
            },
            {
              emoji: "🎬",
              title: "Film and media production",
              desc: "Verify Morse code accuracy for films, games, and other media requiring authentic signal representation.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-yellow-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-yellow-600 to-amber-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            100% private — runs in your browser
          </h3>
          <p className="text-yellow-100 leading-relaxed max-w-xl mx-auto text-sm">
            All processing happens locally in JavaScript. Nothing is sent to any
            server.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/flip-text-generator",
                label: "Flip Text Generator",
                desc: "Transform text with upside-down, reversed, and bold Unicode styles.",
              },
              {
                href: "/tools/roman-numeral-converter",
                label: "Roman Numeral Converter",
                desc: "Convert between standard numbers and Roman numerals.",
              },
              {
                href: "/tools/binary-to-text-converter",
                label: "Binary to Text Converter",
                desc: "Convert text to binary and ASCII encoding.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-yellow-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
