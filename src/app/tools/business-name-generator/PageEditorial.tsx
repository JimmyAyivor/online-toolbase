"use client";
// src/app/tools/business-name-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/business-name-generator";
const TOOL_NAME = "Business Name Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#4c1d95", light: "#f5f3ff" },
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-violet-100 shadow-inner mb-5'>
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
    "Free business name generator — create company and brand name ideas for any industry",
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
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What makes a strong business name?",
    a: "A strong business name is memorable, easy to spell when heard aloud, and available as a .com domain and trademark. Short names (1–2 words, under 12 characters) are easier to use across all marketing channels. The best names either describe what the business does clearly (descriptive), create an emotional feeling associated with the brand (abstract), or combine both elements. The name should also work in all caps for signage and lowercase for URLs without losing meaning.",
  },
  {
    q: "Should I use my own name as a business name?",
    a: "Using your personal name (eponymous naming) works well for professional services where trust and personal reputation are central — law firms, consultancies, therapists, photographers. It creates an inherent credibility and human connection. However, it makes the business harder to sell or scale beyond one person, since the brand equity is tied to an individual. If you plan to grow beyond a solo practice or sell eventually, a distinct brand name is generally a better foundation.",
  },
  {
    q: "How do I check if a business name is already taken?",
    a: "Check four things before committing: domain availability (Namecheap or GoDaddy for .com), trademark registration (USPTO for US, EUIPO for EU, IPO for UK), social media handles across your key platforms, and a Google search for the name plus your industry. A name that passes all four checks has no obvious conflicts. For important brand investments, have a trademark attorney conduct a formal clearance search — automated searches miss phonetic similarities that could constitute infringement.",
  },
  {
    q: "How important is having a .com domain?",
    a: "For most businesses, a .com domain remains the gold standard — it signals credibility, is the default assumption when people type your name into a browser, and is expected globally. Alternative TLDs (.io, .co, .studio) are increasingly accepted in tech and creative industries but may cause confusion for traditional B2B or consumer businesses. If your preferred .com is not available, consider slightly modifying the name (e.g. adding a city, suffix, or industry word) rather than using a less-trusted TLD.",
  },
  {
    q: "Can I trademark a business name generated by this tool?",
    a: "Generated names can potentially be trademarked if they are distinctive, not already registered in your category, and not merely descriptive of your service. Abstract, coined, or compound names tend to receive stronger trademark protection than purely descriptive ones. The generator provides starting point ideas — always conduct a trademark clearance search through the relevant registry (USPTO, EUIPO, IPO) and consult a trademark attorney before filing. Trademark registration is territory-specific and typically takes 12–18 months.",
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
              <span className='text-violet-600 text-lg shrink-0'>
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
          How to Use the Business Name Generator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Enter a keyword, pick your industry and naming style — get 15 business
          name ideas instantly.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Enter your core keyword",
              body: "Type the word that best captures what your business does or what value it delivers — your product, service, niche, or core brand feeling. Single concrete nouns work best. The keyword becomes the anchor for all generated names.",
              enrich: (
                <div className='bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed'>
                  <strong>Try multiple keywords:</strong> Run the generator with
                  your product category first (e.g. 'coffee'), then with a
                  benefit word (e.g. 'energy' or 'ritual'). The two runs produce
                  completely different name sets — both valuable to explore.
                </div>
              ),
            },
            {
              n: 2,
              title: "Select your industry",
              body: "Choose from General, Tech, Health, Finance, or Creative. Each industry uses a different set of power prefixes and language patterns that resonate with that sector's customers and conventions.",
              enrich: (
                <div className='bg-fuchsia-50 rounded-xl px-5 py-4 text-sm text-fuchsia-800 leading-relaxed'>
                  <strong>Tech names</strong> often use Latin or scientific
                  roots and clean suffixes (-io, -labs).{" "}
                  <strong>Health names</strong> use soft, natural sounds.{" "}
                  <strong>Finance names</strong> project strength and stability.
                  Choose the industry closest to your target customer.
                </div>
              ),
            },
            {
              n: 3,
              title: "Choose a naming style",
              body: "Five proven naming frameworks: Compound (merge two meaningful words — common in tech), Descriptive + suffix (keyword + trendy ending like -ly or -hub), Abstract (coined or Latin-inspired — premium feel), Action-first (verb + keyword — energetic), Premium/Formal (keyword + prestige word like 'Partners' or 'Studio').",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Style
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Example
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "Compound",
                          "Facebook, YouTube",
                          "Tech, digital products",
                        ],
                        [
                          "Descriptive + suffix",
                          "Spotify, Shopify",
                          "SaaS, apps, consumer",
                        ],
                        [
                          "Abstract",
                          "Apple, Nike",
                          "Premium, lifestyle brands",
                        ],
                        [
                          "Action-first",
                          "Stripe, Slack",
                          "B2B, productivity tools",
                        ],
                        [
                          "Premium",
                          "Goldman Sachs",
                          "Finance, law, professional services",
                        ],
                      ].map(([s, e, b]) => (
                        <tr key={s} className='hover:bg-violet-50'>
                          <td className='px-4 py-2 font-bold text-gray-800'>
                            {s}
                          </td>
                          <td className='px-4 py-2 text-violet-700'>{e}</td>
                          <td className='px-4 py-2 text-gray-500'>{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Shortlist, check availability, and refine",
              body: "Copy your top 5–10 names, then immediately check domain and trademark availability. Narrow to 3 finalists and get feedback from 5–10 members of your target audience. The winning name should be easy to say aloud, easy to spell when heard, and available as a .com domain.",
              enrich: (
                <div className='bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed'>
                  <strong>Domain availability tools:</strong> Namecheap,
                  GoDaddy, or Instant Domain Search let you check multiple
                  domains at once. Check .com first, then country-specific TLDs
                  relevant to your market.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "🚀",
              title: "Startup launch",
              desc: "Generate name options before registering a company — create a large pool to check domain availability across.",
            },
            {
              emoji: "🔄",
              title: "Rebrand planning",
              desc: "When pivoting or rebranding, use multiple style settings to explore radically different name directions quickly.",
            },
            {
              emoji: "🛍️",
              title: "New product or sub-brand",
              desc: "Name a new product line or sub-brand that fits within the parent brand's language and positioning.",
            },
            {
              emoji: "🌐",
              title: "Domain name inspiration",
              desc: "Use generated names as inspiration for available domain combinations — check multiple variations simultaneously.",
            },
            {
              emoji: "💼",
              title: "Freelance / consulting brand",
              desc: "Find a professional name that stands apart from your personal name for a freelance or consulting business.",
            },
            {
              emoji: "🤝",
              title: "Naming client projects",
              desc: "Quickly generate large pools of candidate names for client branding briefs to use in initial naming presentations.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-violet-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-violet-600 to-fuchsia-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>⚠️</div>
          <h3 className='text-xl font-bold mb-3'>
            Always check trademark and domain availability
          </h3>
          <p className='text-violet-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Generated names are starting points for your own creative process —
            not guaranteed to be available. Always check trademark databases and
            domain registrars before making any business or legal decisions
            based on a name.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/slogan-generator",
                label: "Slogan Generator",
                desc: "Create a memorable tagline to accompany your new business name.",
              },
              {
                href: "/tools/email-subject-line-generator",
                label: "Email Subject Line Generator",
                desc: "Generate launch email subjects to announce your new brand.",
              },
              {
                href: "/tools/password-strength-checker",
                label: "Password Strength Checker",
                desc: "Secure your new business accounts with strong passwords.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-violet-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
