"use client";
// src/app/tools/slogan-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/slogan-generator";
const TOOL_NAME = "Slogan Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#881337", light: "#fff1f2" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-rose-100 shadow-inner mb-5">
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
    "Free slogan generator — create memorable brand taglines and catchphrases instantly",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What makes a good brand slogan?",
    a: "A great slogan is short (typically 3–8 words), easy to say aloud, memorable, and authentic to the brand's personality. It should communicate a benefit or feeling — not just describe what the business does. The best slogans work across contexts: on business cards, social bios, packaging, and spoken in conversation. Test it by saying it aloud to someone unfamiliar with the brand and asking what they think the company does.",
  },
  {
    q: "What is the difference between a slogan and a tagline?",
    a: "In practice, the terms are used interchangeably in marketing, but there is a technical distinction. A tagline is a permanent brand identity statement used consistently across all marketing — it represents the brand's core promise or positioning. A slogan is often campaign-specific and changes with different marketing initiatives. Nike's 'Just Do It' is a tagline; a seasonal sale campaign might have its own slogan. This generator creates both types of lines.",
  },
  {
    q: "How do I know if my slogan is legally safe to use?",
    a: "Before using a slogan commercially, search the relevant trademark databases: USPTO (US), EUIPO (EU), and IPO (UK). Trademark protection for slogans is harder to obtain than for brand names, but widely used commercial phrases are protected. Avoid slogans that are too similar to well-known registered taglines. For any commercially important brand, consult a trademark attorney before committing to a slogan.",
  },
  {
    q: "Should my slogan include my brand name?",
    a: "Including the brand name is optional and depends on context. Standalone slogans like 'Just Do It' work because the brand is already strongly established. For newer brands with lower recognition, including the brand name in the slogan (e.g. 'Apple — Think Different') aids brand recall. Use this generator with and without your brand name included in the phrase to compare both approaches.",
  },
  {
    q: "How many slogans should I create before choosing one?",
    a: "Most branding professionals recommend generating at least 20–30 candidate slogans before shortlisting to 3–5 finalists for testing. Testing can be as simple as asking 10 target customers which feels most authentic and memorable. The generator provides 6 variants per style — run it multiple times with different keywords and tone settings to build a larger pool to work from.",
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
              aria-expanded={open === i}            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-rose-600 text-lg shrink-0">
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
          How to Use the Slogan Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your brand name, a core keyword, and choose a tone to instantly
          generate six slogan variants — copy your favourite and make it your
          own.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your brand name",
              body: "Type your business, product, or campaign name. This appears in the generated slogans to directly tie the tagline to your brand. Try your actual brand name, a short version, or even a placeholder to see the structure before committing.",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>No name yet?</strong> Use a descriptive placeholder
                  like 'our company' or 'your brand' to see the slogan patterns,
                  then replace it with your real name once you have one.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your core keyword",
              body: "This is the product category, core service, or brand value you want the slogan to revolve around. Single concrete nouns work best: coffee, productivity, security, skincare, speed. Avoid abstract words like 'excellence' or 'quality' alone — they're too generic.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Try multiple keywords:</strong> Run the generator once
                  with your product category (e.g. 'coffee') and once with your
                  core benefit (e.g. 'energy'). The two sets will produce very
                  different slogans — both worth exploring.
                </div>
              ),
            },
            {
              n: 3,
              title: "Choose a tone and style",
              body: "Five styles are available: Fun & Playful (consumer brands, food & beverage), Professional (B2B, financial, legal), Bold & Direct (challenger brands, sportswear), Inspirational (wellness, education, NGOs), and Minimal & Clean (luxury, tech, premium). Match the style to how your target customer expects to feel about your brand.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Style
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Famous examples
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Fun",
                          "Consumer goods, food",
                          "Skittles, Ben & Jerry's",
                        ],
                        ["Professional", "B2B, finance, law", "IBM, KPMG"],
                        ["Bold", "Sport, challenger brands", "Nike, Red Bull"],
                        [
                          "Inspirational",
                          "Health, education",
                          "Apple, Lululemon",
                        ],
                        ["Minimal", "Luxury, premium tech", "Apple, Muji"],
                      ].map(([s, b, e]) => (
                        <tr key={s} className="hover:bg-rose-50">
                          <td className="px-4 py-2 font-bold text-gray-800">
                            {s}
                          </td>
                          <td className="px-4 py-2 text-rose-700">{b}</td>
                          <td className="px-4 py-2 text-gray-500">{e}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy and refine your favourite",
              body: "Click the copy icon on the slogan you like most. Paste it into a document and edit it — change a word or two to make it sound more natural for your brand voice. The generated slogans are starting points, not final copy. Combine elements from multiple variants to find your perfect tagline.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Real-world test:</strong> Say the slogan aloud to 5
                  people who don't know your brand. Ask: What do you think this
                  company does? How does it make you feel? Their answers will
                  quickly reveal whether it communicates the right idea.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🚀",
              title: "New business launch",
              desc: "Find a tagline for a new brand before launch — use all five styles to see which feels most authentic.",
            },
            {
              emoji: "🔄",
              title: "Rebrand or refresh",
              desc: "When refreshing brand positioning, generate slogans from multiple keyword angles to explore new directions.",
            },
            {
              emoji: "📢",
              title: "Campaign-specific slogans",
              desc: "Create a slogan for a specific seasonal campaign or product promotion that differs from the evergreen tagline.",
            },
            {
              emoji: "🏪",
              title: "Product naming support",
              desc: "Use slogan patterns to help articulate the value proposition for new product lines and sub-brands.",
            },
            {
              emoji: "📱",
              title: "Social media bio copy",
              desc: "Short slogans double as punchy social media bio descriptions that communicate your brand instantly.",
            },
            {
              emoji: "🏆",
              title: "Pitch deck positioning",
              desc: "A crisp one-liner in a pitch deck's opening slide communicates brand clarity and investor confidence.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-rose-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-rose-600 to-orange-600 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">✦</div>
          <h3 className="text-xl font-bold mb-3">
            Templates, not AI — consistently fast
          </h3>
          <p className="text-rose-100 leading-relaxed max-w-xl mx-auto text-sm">
            Slogans are built from proven copywriting frameworks — no API calls
            or wait times. Instant results you can iterate quickly.
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
                desc: "Generate brand name ideas to pair with your new slogan.",
              },
              {
                href: "/tools/email-subject-line-generator",
                label: "Email Subject Line Generator",
                desc: "Turn your slogan's key message into high-performing email subject lines.",
              },
              {
                href: "/tools/keyword-density-checker",
                label: "Keyword Density Checker",
                desc: "Check that your slogan keywords appear optimally in your website copy.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-rose-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
