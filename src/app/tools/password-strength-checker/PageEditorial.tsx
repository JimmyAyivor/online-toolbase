"use client";
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/password-strength-checker";
const TOOL_NAME = "Password Strength Checker";
function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let c = false;
    import("qrcode").then((Q) => {
      if (c || !canvasRef.current) return;
      Q.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7f1d1d", light: "#fff1f2" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-red-100 shadow-inner mb-5">
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
    "Free password strength checker at https://www.onlinetoolbase.com",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What makes a password strong?",
    a: "A strong password has four key properties: length (12+ characters is the minimum for modern security; 16+ is better), complexity (mix of uppercase, lowercase, numbers, and special characters), uniqueness (not a word from a dictionary or common phrase), and unpredictability (not based on personal information like birthdays, names, or addresses). The most practical strong passwords are either long random passphrases (4+ random words strung together) or randomly generated character strings managed in a password manager.",
  },
  {
    q: "Is it safe to type my real password into this checker?",
    a: "This password checker runs entirely in your browser using JavaScript — your password is never sent to any server or stored anywhere. You can verify this by checking your browser's network activity (DevTools → Network) while typing — no requests are made. However, as a general security best practice, avoid typing passwords into any online tool you cannot fully verify. Use this tool to understand strength principles and check password patterns rather than your actual live passwords.",
  },
  {
    q: "What is a passphrase and why is it recommended?",
    a: "A passphrase is a sequence of random words used as a password — for example, 'correct-horse-battery-staple'. Passphrases are long (typically 20–40 characters), easy to remember, and extremely difficult to crack because of their length. The key is that the words must be truly random — not a common phrase, song lyric, or meaningful sentence. Use a dice-based word list (Diceware) or a password manager's passphrase generator to pick random words. A 4-word Diceware passphrase has more entropy than most complex 10-character passwords.",
  },
  {
    q: "Why should I use a password manager?",
    a: "A password manager solves the fundamental password problem: strong passwords are hard to remember, so people reuse weak ones. A password manager generates, stores, and autofills unique random passwords for every account — you only need to remember one master password. This eliminates reuse (the single biggest cause of account compromises), enables genuinely random passwords, and reduces phishing vulnerability (good managers only autofill on the correct domain). Reputable options include Bitwarden (open source, free tier available), 1Password, and Dashlane.",
  },
  {
    q: "What is two-factor authentication and should I enable it?",
    a: "Two-factor authentication (2FA) requires a second verification step beyond your password — typically a code from an authenticator app (Google Authenticator, Authy) or a physical security key. Even if someone steals your password, they cannot access your account without the second factor. Enable 2FA on all important accounts: email, banking, cloud storage, social media, and work tools. Authenticator app codes are more secure than SMS codes (which can be intercepted via SIM swapping). Password strength matters, but 2FA adds a layer that is independent of password security.",
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
              <span className="text-red-600 text-lg shrink-0">
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
          How to Use the Password Strength Checker
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Simple, fast, and free.
        </p>
        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your password to check",
              body: "Type or paste a password into the input field. All analysis runs locally — nothing is sent to any server. Use the eye icon to toggle between masked and visible text while reviewing.",
              enrich: (
                <div className="bg-red-50 rounded-xl px-5 py-4 text-sm text-red-800 leading-relaxed">
                  <strong>Privacy guarantee:</strong> Open your browser's
                  DevTools (F12 → Network) while typing to confirm zero network
                  requests are made. Your password stays on your device.
                </div>
              ),
            },
            {
              n: 2,
              title: "Review the strength score and level",
              body: "The strength bar updates in real time from Very Weak to Very Strong based on 9 criteria. The score shows how many criteria are met out of 9. The level label (Very Weak / Weak / Fair / Strong / Very Strong) gives a quick at-a-glance assessment.",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>What 'Very Strong' means:</strong> A Very Strong
                  rating means the password meets all 9 criteria: 16+
                  characters, all four character types, no dictionary words, and
                  no repeated characters. This is the target for any password
                  protecting sensitive accounts.
                </div>
              ),
            },
            {
              n: 3,
              title: "Read the checklist for specific gaps",
              body: "The checklist shows which of the 9 criteria your password passes and fails. Each failed item is a specific, actionable improvement. Focus on the highest-impact items first: length and character diversity have the biggest effect on strength.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Fastest way to improve:</strong> Add length first.
                  Going from 8 to 16 characters increases crack time
                  exponentially more than adding a single special character to a
                  short password.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use a password manager for production passwords",
              body: "Once you understand what makes a strong password, use a password manager to generate and store them. A random 16+ character password with all character types generated by a password manager is stronger than any manually crafted password.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Recommended approach:</strong> Bitwarden is free,
                  open-source, and cross-platform. Set a strong master
                  passphrase (4+ random words), enable 2FA on the manager
                  itself, and generate unique random passwords for every
                  account.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🔐",
              title: "Account security audit",
              desc: "Test the strength of passwords you currently use to identify weak ones that should be changed.",
            },
            {
              emoji: "📚",
              title: "Security awareness training",
              desc: "Use the interactive checker to show team members what makes passwords strong vs weak.",
            },
            {
              emoji: "🔑",
              title: "Master password design",
              desc: "Design a strong master password for your password manager that balances strength and memorability.",
            },
            {
              emoji: "🛡️",
              title: "New account setup",
              desc: "Before setting a new password for an important account, test its strength and refine until it scores 'Strong' or better.",
            },
            {
              emoji: "🎓",
              title: "Student learning",
              desc: "Understand password security concepts interactively — great for cybersecurity and digital literacy courses.",
            },
            {
              emoji: "💼",
              title: "IT policy compliance",
              desc: "Verify that passwords meet organisational minimum requirements before submitting to IT systems.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-red-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            100% private — runs in your browser
          </h3>
          <p className="text-red-100 leading-relaxed max-w-xl mx-auto text-sm">
            All processing happens locally in JavaScript on your device. Nothing
            is sent to any server.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/business-name-generator",
                label: "Business Name Generator",
                desc: "Generate strong brand names — then secure them with strong passwords.",
              },
              {
                href: "/tools/countdown-timer",
                label: "Countdown Timer",
                desc: "Set reminders to update passwords on a regular schedule.",
              },
              {
                href: "/tools/binary-to-text-converter",
                label: "Binary to Text Converter",
                desc: "Explore encoding and data representation concepts related to cryptography.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-red-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
