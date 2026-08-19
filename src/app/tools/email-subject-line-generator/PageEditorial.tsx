"use client";
// src/app/tools/email-subject-line-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/email-subject-line-generator";
const TOOL_NAME = "Email Subject Line Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#eff6ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-blue-100 shadow-inner mb-5">
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
    "Free email subject line generator — create high open-rate subject lines for any campaign",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What makes an email subject line effective?",
    a: "Effective subject lines achieve three things: pass the spam filter, appear fully in the preview pane on the recipient's device, and give a compelling reason to open. Specificity beats vagueness (numbers help), relevance beats generic claims, and a clear benefit or curiosity gap beats empty hype. Subject lines that feel personal — using the recipient's name or referencing recent behaviour — consistently outperform generic ones.",
  },
  {
    q: "How long should an email subject line be?",
    a: "The benchmark is 40–60 characters for broad compatibility. Desktop email clients show ~60–80 characters, but most email is opened on mobile — iOS Mail and Gmail on mobile show ~30–40 characters before truncating. Keep your most compelling words in the first 30 characters so they're seen regardless of device.",
  },
  {
    q: "Do emojis improve email open rates?",
    a: "Research from multiple ESPs shows emojis in subject lines can improve open rates by 10–56% depending on audience and context. They work best for consumer-facing promotional emails with a conversational brand voice. Emojis typically hurt open rates in B2B and cold outreach contexts. Test with your specific audience rather than assuming aggregate study results apply.",
  },
  {
    q: "What words should I avoid in email subject lines?",
    a: "Spam trigger words that can land emails in junk folders include: FREE (all caps), GUARANTEED, WINNER, CLICK HERE, ACT NOW, and excessive exclamation marks or dollar signs. Beyond spam filters, subject lines that feel manipulative damage brand trust and increase unsubscribes over time. Authentic, specific language that accurately reflects the email's content is the safest long-term approach.",
  },
  {
    q: "How many subject line variants should I A/B test?",
    a: "Most email platforms support A/B testing two to three variants. For statistically reliable results you need a minimum of ~1,000 recipients per variant. With smaller lists, treat results as directional rather than conclusive. Over time, consistent testing of subject line strategies (urgency vs. benefit, question vs. statement) reveals patterns specific to your audience.",
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
              <span className="text-blue-600 text-lg shrink-0">
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
          How to Use the Email Subject Line Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your topic, pick email type and trigger style — get four
          ready-to-use subject line variants instantly.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your email topic",
              body: "Type the core topic, product name, offer, or event. Be specific — 'summer sale on running shoes' produces more targeted variants than 'summer sale'. Specificity signals relevance and sets accurate expectations.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Be specific:</strong> Compare 'Our new feature'
                  (vague) with 'Introducing dark mode and 12 new integrations'
                  (specific). Specificity reduces spam complaints and improves
                  open rates.
                </div>
              ),
            },
            {
              n: 2,
              title: "Select your email type",
              body: "Choose from Promotional, Newsletter, Cold Outreach, Re-engagement, or Transactional. Each type has different audience expectations and subject line conventions — cold outreach needs subtlety, promotional can be direct.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Transactional emails</strong> have the highest open
                  rates (45–65%) because recipients expect them. Even
                  transactional subjects benefit from clarity — e.g. 'Your order
                  #1234 has shipped' beats a vague 'Update on your order'.
                </div>
              ),
            },
            {
              n: 3,
              title: "Choose a trigger style",
              body: "Urgency (FOMO), Curiosity (information gap), Benefit (clear value), Personalised (recipient-specific), or Question (direct engagement). Pick the style that fits your goal — A/B test benefit vs. curiosity for the best long-term data.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>A/B strategy:</strong> Generate one benefit and one
                  curiosity variant at the same time to use as an A/B pair. Over
                  multiple campaigns you will learn which trigger your audience
                  prefers.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy and refine your pick",
              body: "Click the copy icon on any line. Customise the copied text in your email platform — add the real recipient name, adjust wording for your brand voice, and keep the final version under 60 characters.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Mobile check:</strong> After copying, verify the first
                  30 characters still make sense if the rest is truncated — most
                  mobile email clients cut off after 30–40 characters.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🛍️",
              title: "E-commerce promotions",
              desc: "Generate urgency and benefit subject lines for flash sales, seasonal promotions, and product launches.",
            },
            {
              emoji: "📧",
              title: "Newsletter campaigns",
              desc: "Curiosity and question triggers work particularly well for weekly newsletters to boost open rates.",
            },
            {
              emoji: "🤝",
              title: "Cold email outreach",
              desc: "Question and curiosity triggers are most effective for cold B2B outreach without sounding salesy.",
            },
            {
              emoji: "🔄",
              title: "Win-back campaigns",
              desc: "Personal and benefit triggers help re-engage lapsed subscribers who have stopped opening emails.",
            },
            {
              emoji: "🧪",
              title: "A/B test generation",
              desc: "Generate one benefit and one curiosity variant at the same time to use as A/B test pairs in campaigns.",
            },
            {
              emoji: "✍️",
              title: "Content marketing emails",
              desc: "Drive traffic to blog posts and guides with curiosity-focused subject lines that tease the value inside.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📧</div>
          <h3 className="text-xl font-bold mb-3">
            Templates, not AI — fast and reliable
          </h3>
          <p className="text-blue-100 leading-relaxed max-w-xl mx-auto text-sm">
            These subject lines are generated from proven copywriting templates
            based on psychological triggers. No AI calls or API costs — instant
            results every time.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/slogan-generator",
                label: "Slogan Generator",
                desc: "Create memorable brand slogans and taglines for marketing campaigns.",
              },
              {
                href: "/tools/keyword-density-checker",
                label: "Keyword Density Checker",
                desc: "Optimise email body copy keyword usage for better engagement.",
              },
              {
                href: "/tools/business-name-generator",
                label: "Business Name Generator",
                desc: "Generate brand name ideas for new products and ventures.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
