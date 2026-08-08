"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/flip-text-generator";
const TOOL_NAME = "Flip Text Generator";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#3b0764", light: "#faf5ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-purple-100 shadow-inner mb-5">
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
    "Free flip text generator at onlinetoolbase.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How does upside-down text work?",
    a: "Upside-down text uses special Unicode characters that visually resemble standard Latin letters but are actually different code points — typically from the IPA (International Phonetic Alphabet) and other Unicode blocks. For example, the upside-down 'a' is the Unicode character ɐ (U+0250), not a rotated version of the letter a. When the text is reversed left-to-right and each letter replaced with its upside-down Unicode equivalent, the result reads correctly when physically rotated 180 degrees. Not all letters have exact Unicode equivalents, so some characters are approximations.",
  },
  {
    q: "Does flipped text work on all social media platforms?",
    a: "Flipped text works on any platform that renders standard Unicode — which includes Twitter/X, Instagram, Facebook, WhatsApp, TikTok, Discord, Reddit, and most other major platforms. It is rendered as plain text, so no special formatting is needed. Some very old or limited platforms may show placeholder characters for unusual Unicode code points, but this is rare on modern platforms.",
  },
  {
    q: "Can I use flipped text in usernames?",
    a: "Most platforms allow Unicode characters in display names (but often not usernames/handles). Instagram, Twitter, TikTok, and Discord allow Unicode in display names, so flipped or stylised text works there. Platform URL-based usernames (like @username) are typically restricted to ASCII characters. Always test on your specific platform before committing to a flipped name.",
  },
  {
    q: "What is the strikethrough text effect?",
    a: "Strikethrough text uses the Unicode combining character U+0336 (COMBINING LONG STROKE OVERLAY), which overlays a horizontal line through each character. It works on any platform that renders combining Unicode characters — most modern platforms support this. Unlike HTML strikethrough tags, this method works in plain text fields, social media posts, and messaging apps.",
  },
  {
    q: "What does the bold text option produce?",
    a: "The bold text option converts standard Latin letters to their Unicode Mathematical Bold equivalents — characters in the Mathematical Alphanumeric Symbols Unicode block (U+1D400 onwards). These look bold but are technically different characters, which means they render in bold appearance wherever Unicode is rendered, regardless of whether the platform supports bold formatting. This is why bold text in social media bios and posts works even where markdown formatting is not supported.",
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
              <span className="text-purple-600 text-lg shrink-0">
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
          How to Use the Flip Text Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Type or paste your text",
              body: "Enter any text in the input field. All transformations update in real time as you type — no button press needed. The input can be any length, though very long texts may look best when tested on your target platform before sharing.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>What works best:</strong> Short, punchy phrases work
                  best for flipped text in social media contexts. Avoid complex
                  punctuation as some characters don't have Unicode equivalents
                  and may show as '?'.
                </div>
              ),
            },
            {
              n: 2,
              title: "Choose your transformation",
              body: "Five transformations are shown simultaneously: Upside down (flipped and reversed), Reversed (backwards reading), Mirror (original + reversed), Strikethrough, and Bold. Each appears in a separate output card with a copy button.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Most popular:</strong> The Upside down (🙃) version is
                  by far the most shared on social media — it requires
                  physically rotating your phone or screen to read, which
                  creates an engaging interaction.
                </div>
              ),
            },
            {
              n: 3,
              title: "Copy and use it",
              body: "Click the copy icon on any result to copy it to your clipboard. Paste directly into your social media bio, post, profile name, or message. The text is plain Unicode — no special rendering required.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Instagram bio tip:</strong> Go to your Instagram
                  profile → Edit Profile → Name field, then paste. The display
                  name supports Unicode, so flipped text renders correctly for
                  all visitors.
                </div>
              ),
            },
            {
              n: 4,
              title: "Iterate and experiment",
              body: "Try different input phrases. Short words flip more cleanly than long sentences. Experiment with ALL CAPS input — some upside-down characters have distinct uppercase equivalents that look more striking.",
              enrich: (
                <div className="bg-fuchsia-50 rounded-xl px-5 py-4 text-sm text-fuchsia-800 leading-relaxed">
                  <strong>Creative variation:</strong> Combine multiple styles
                  in one post — for example, use bold for headings and flipped
                  text for emphasis on a specific word or phrase.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📱",
              title: "Social media bios",
              desc: "Stand out on Instagram, TikTok, Twitter, and Discord with a unique upside-down or stylised display name.",
            },
            {
              emoji: "💬",
              title: "Messaging fun",
              desc: "Send friends an upside-down message in WhatsApp, iMessage, or Telegram for a playful interaction.",
            },
            {
              emoji: "🎨",
              title: "Creative content",
              desc: "Add visual interest to posts, captions, and banners using bold or mirrored text styles.",
            },
            {
              emoji: "🎮",
              title: "Gaming usernames",
              desc: "Create eye-catching display names for Discord servers, Steam, and gaming platforms.",
            },
            {
              emoji: "🖊️",
              title: "Puzzle creation",
              desc: "Create word puzzles, riddles, or secret messages using reversed or flipped text.",
            },
            {
              emoji: "✨",
              title: "Brand aesthetics",
              desc: "Use stylised text in social media graphics and captions where standard bold/italic formatting is unavailable.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-purple-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            100% private — runs in your browser
          </h3>
          <p className="text-purple-100 leading-relaxed max-w-xl mx-auto text-sm">
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
                href: "/tools/morse-code-translator",
                label: "Morse Code Translator",
                desc: "Encode messages in Morse code for another form of fun text transformation.",
              },
              {
                href: "/tools/roman-numeral-converter",
                label: "Roman Numeral Converter",
                desc: "Convert numbers to Roman numeral format for dates and headings.",
              },
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Count characters and words in your text before transforming it.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-purple-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
