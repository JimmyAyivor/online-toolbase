"use client";
// src/app/tools/social-media-bio-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/social-media-bio-generator";
const TOOL_NAME = "Social Media Bio Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#78350f", light: "#fffbeb" },
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
    "Free social media bio generator — generate ready-to-use bios for Instagram, LinkedIn, Twitter/X, TikTok, and YouTube. Choose tone and keywords. No signup.",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const PLATFORM_LIMITS = [
  [
    "Instagram",
    "150",
    "Professional tone works for businesses; casual/funny for personal. Include niche keywords, an emoji or two, and a CTA with your link.",
  ],
  [
    "LinkedIn",
    "220",
    "Professional or inspirational tone. Lead with your current role and value proposition. Avoid buzzwords; be specific about what you do.",
  ],
  [
    "Twitter / X",
    "160",
    "Concise — every word must earn its place. Include what you do + a personality element. Many top accounts lead with a memorable fact or claim.",
  ],
  [
    "TikTok",
    "80",
    "Very short — focus on a single hook line and your niche. Emojis work well. CTA if you have a link in bio (e.g. 'Get my free guide ↓').",
  ],
  [
    "YouTube",
    "1,000",
    "Longer form. Include what your channel covers, upload schedule, and relevant credentials. First 100 chars appear in search results.",
  ],
  [
    "Facebook",
    "101",
    "Page bios are short — keep to one punchy sentence describing what you or your business does and who it's for.",
  ],
];

const FAQS = [
  {
    q: "What should I include in a social media bio?",
    a: "A strong social media bio typically includes four elements: who you are (name or brand), what you do (role, niche, or expertise), who you serve or what value you provide (your audience or the problem you solve), and a call to action or personality element (a link, a location, a memorable phrase, or a well-placed emoji). The exact balance depends on the platform — LinkedIn bios skew professional and credential-focused, Instagram bios can include personality and emojis, Twitter/X bios need to be tight and memorable within 160 characters, and TikTok bios are extremely short with a focus on a single hook. The universal principle: make it immediately clear what a new visitor to your profile will get by following you.",
  },
  {
    q: "How long should a social media bio be?",
    a: "Each platform has its own character limit that defines the maximum bio length, and each has a practical 'sweet spot' that's often shorter than the maximum. Instagram allows 150 characters — most effective bios use 100–140 characters, leaving room to breathe. LinkedIn's summary field allows 2,600 characters, but the profile bio/headline visible in search is 220 characters; most users see only the first couple of lines without clicking 'See more'. Twitter/X has a 160-character bio limit — treat every character as valuable. TikTok's bio is just 80 characters, so it must be a single strong line. Facebook page bios are 101 characters. YouTube About sections allow up to 1,000 characters and have more space for SEO keywords since they're searchable within YouTube.",
  },
  {
    q: "Should I use emojis in my social media bio?",
    a: "Emojis in bios are effective on Instagram and TikTok, where they serve as visual breaks and personality signals, and are acceptable on Twitter/X for casual or creator accounts. On LinkedIn, emojis are generally appropriate for personal brands and creators but should be used sparingly (1–2 maximum) for corporate or B2B professional accounts — overuse reads as informal on a platform associated with professional networking. On YouTube, emojis in the About section can help with scannability. A practical rule: match the platform's dominant tone. Use emojis where they appear in the bios of top creators in your niche; avoid them where they look out of place relative to comparable accounts.",
  },
  {
    q: "What's the difference between a bio and an 'About' section?",
    a: "On most platforms, the 'bio' refers to the short text that appears directly under your username or profile photo — visible without any additional clicks. The 'About' section (used on YouTube and Facebook) typically refers to a longer-form description that requires a click or scroll to read in full. Bios are higher-stakes because they're the first text a new visitor reads — they function like a headline. About sections allow more context, credentials, and keywords. This tool generates both short-form bios (Instagram, Twitter, TikTok) and the longer professional summaries suited to LinkedIn and YouTube About sections.",
  },
  {
    q: "Should my bio be the same across all platforms?",
    a: "No — your core identity can be consistent, but your bio should be adapted to each platform's audience, character limits, and tone norms. LinkedIn audiences expect professional credentials and clear value propositions. Instagram audiences expect personality, a clear niche, and optionally a CTA. Twitter/X audiences reward wit, specificity, or a memorable claim. TikTok audiences want a quick niche signal and nothing else. A bio that works perfectly on LinkedIn will feel stiff on Instagram and too long for TikTok. Use this generator to create platform-specific versions of your bio, keeping the core facts consistent (name, role, niche) while adapting tone, length, and CTAs to each platform's conventions.",
  },
  {
    q: "How do I write a bio that attracts followers in my niche?",
    a: "Niche-attracting bios do two things: they include the words and phrases your target audience actually searches for, and they make an immediate, specific promise about what value you provide. For discoverability, use the terms people search on each platform — Instagram and TikTok bios are indexed by their internal search, so including your niche keywords (e.g. 'plant-based recipes', 'beginner investing', 'UX design') can drive profile discovery. For converting visitors to followers, your bio needs to answer 'why should I follow this person?' — be specific about what type of content you post, how often, or what outcomes your audience will get. Vague bios ('content creator | traveller | coffee lover') provide no reason to follow; specific bios ('Weekly tips on building a freelance writing business') give visitors a clear reason to click Follow.",
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
          How to Use the Social Media Bio Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your name, profession, and a few keywords, select a platform and
          tone, then generate a bio sized to each platform's character limit and
          ready to copy.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Select your platform",
              body: "Choose the platform you're writing a bio for — Instagram, LinkedIn, Twitter/X, TikTok, YouTube, Facebook, or a general option. The tool generates a bio formatted specifically for each platform's character limit and tone conventions. Each platform has a different limit and audience expectation: a LinkedIn bio is professional and credential-focused, an Instagram bio can use emojis and line breaks, and a TikTok bio must make its case in just 80 characters.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Platform
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Limit
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Bio strategy
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {PLATFORM_LIMITS.map(([platform, limit, tip]) => (
                        <tr key={platform} className="hover:bg-amber-50">
                          <td className="px-4 py-2 font-bold text-amber-700 text-xs whitespace-nowrap">
                            {platform}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500 whitespace-nowrap">
                            {limit} chars
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {tip}
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
              title: "Enter your details",
              body: "Fill in your name or brand name, your profession or role (be specific — 'freelance UX designer for SaaS startups' is more useful than 'designer'), and a few keywords that describe your niche, skills, or interests. The more specific your inputs, the more targeted and usable the generated bio will be. Vague inputs like 'content creator' produce generic bios; specific inputs like 'plant-based recipe developer' produce bios that immediately communicate your niche.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Specificity tip:</strong> Replace generic job titles
                  with niche-specific descriptions. Instead of 'marketer', try
                  'B2B SaaS growth marketer'. Instead of 'photographer', try
                  'wedding photographer based in Austin, TX'. The more specific
                  your role description, the more your bio will attract your
                  exact target audience and stand out from generic profiles in
                  your category.
                </div>
              ),
            },
            {
              n: 3,
              title: "Choose your tone",
              body: "Select a tone that matches your personal brand and the platform's audience: Professional for LinkedIn and formal business profiles, Casual for Instagram and personal accounts, Funny for entertainment-focused accounts and Twitter/X personalities, or Inspirational for motivational content creators and coaches. The tone selection shapes the vocabulary, sentence structure, and personality of the generated bio. You can generate the same bio in multiple tones to compare options.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Tone matching:</strong> The most effective bios match
                  the dominant tone of top accounts in your niche. Before
                  generating, look at 5–10 profiles of accounts you admire in
                  your category and note the tone they use. Mimicking the tone
                  conventions of successful profiles in your niche signals to
                  new visitors that you're a credible member of that community.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy and customise before publishing",
              body: "Click 'Copy' to copy the generated bio to your clipboard. Before pasting it into your profile, read it aloud — does it sound like you? Edit any phrases that feel generic or don't match your voice. Add specific personal details the generator couldn't know: your actual location, your specific achievement ('helped 200+ clients'), or your unique selling point. The generated bio is a strong starting point and structural template; personalising it with authentic specifics makes it significantly more effective.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Personalisation tip:</strong> After generating and
                  editing your bio, test it by asking: if someone read only this
                  bio, would they know exactly what you do, who you help, and
                  why they should follow you? If any of those three questions is
                  unclear from the bio text alone, revise until all three are
                  answered. These are the three questions every effective
                  profile bio must answer for a first-time visitor.
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
              emoji: "📸",
              title: "Instagram creators and brands",
              desc: "Generate a concise, keyword-rich Instagram bio that communicates your niche in 150 characters and drives profile link clicks.",
            },
            {
              emoji: "💼",
              title: "LinkedIn professionals",
              desc: "Write a compelling LinkedIn headline and bio summary that positions your expertise and attracts the right professional connections.",
            },
            {
              emoji: "🐦",
              title: "Twitter/X accounts",
              desc: "Craft a memorable 160-character Twitter/X bio that communicates your identity and gives new visitors a reason to follow.",
            },
            {
              emoji: "🎵",
              title: "TikTok creators",
              desc: "Generate a punchy 80-character TikTok bio that captures your niche and hooks new profile visitors into clicking Follow.",
            },
            {
              emoji: "🎥",
              title: "YouTube channels",
              desc: "Write a searchable YouTube About section that tells subscribers what your channel covers and when to expect uploads.",
            },
            {
              emoji: "🏢",
              title: "Small business profiles",
              desc: "Create professional, brand-consistent bios across multiple platforms — keep the messaging aligned while adapting tone and length per platform.",
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

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">👤</div>
          <h3 className="text-xl font-bold mb-3">
            Your bio is the first thing a new visitor reads — it decides whether
            they follow or scroll on
          </h3>
          <p className="text-amber-100 leading-relaxed max-w-xl mx-auto text-sm">
            Profile bios are the highest-leverage text on any social media
            account. When someone visits your profile for the first time —
            whether they arrived from a recommended post, a hashtag, or a direct
            share — your bio is the first thing they read to decide whether
            you're worth following. A generic, vague, or cluttered bio is a
            wasted opportunity. A clear, specific, and well-toned bio converts
            profile visitors into followers, and followers into an engaged
            audience. Most social media users update their bio once and forget
            about it — revisiting and refining your bio with specific keywords
            and a clear value proposition is one of the highest-ROI
            optimisations any creator or brand can make.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Social Media Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/instagram-post-planner",
                label: "Instagram Post Planner",
                desc: "Plan Instagram posts with captions, hashtags, and scheduling ideas — visual grid planning and CSV export.",
              },
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags for Instagram, TikTok, and Twitter/X — maximise reach and discoverability for any topic.",
              },
              {
                href: "/tools/social-media-character-counter",
                label: "Social Media Character Counter",
                desc: "Count characters for all major platforms — see limits side by side and trim posts to fit before publishing.",
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
