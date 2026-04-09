"use client";
// src/app/tools/tiktok-hook-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/tiktok-hook-generator";
const TOOL_NAME = "TikTok Hook Generator";

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
    "Free TikTok hook generator — generate scroll-stopping opening lines for any topic across 5 hook formats. No signup.",
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
                <span className="text-rose-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const HOOK_EXAMPLES = [
  [
    "Curiosity",
    "❓",
    "rose-700",
    "POV: you didn't know [topic] could do this",
    "Creates an information gap — the viewer must watch to close it.",
  ],
  [
    "Controversy",
    "🔥",
    "orange-600",
    "Unpopular opinion: [mainstream belief] is wrong",
    "Triggers disagreement or strong agreement — both emotions drive watch time.",
  ],
  [
    "Challenge",
    "⚡",
    "yellow-600",
    "I tried [topic] every day for 30 days — here's what happened",
    "Documents a journey with a clear result promised at the end.",
  ],
  [
    "Story",
    "📖",
    "blue-600",
    "Nobody told me this about [topic] until it was too late",
    "Implies a lesson learned through experience — evokes relatability and urgency.",
  ],
  [
    "How-To",
    "🎯",
    "green-600",
    "The fastest way to [desirable outcome] nobody talks about",
    "Promise of a shortcut or insider method — extremely high click intent.",
  ],
];

const FAQS = [
  {
    q: "What is a TikTok hook and why is it so important?",
    a: "A TikTok hook is the opening moment of your video — typically the first 1–3 seconds — that determines whether a viewer keeps watching or scrolls past. TikTok's algorithm uses watch time, completion rate, and rewatch rate as primary signals for content distribution. A weak hook means most viewers leave in the first second, signalling low quality to the algorithm and suppressing reach. A strong hook that makes a viewer pause and watch earns the video higher distribution in the For You Page (FYP) algorithm. Research by TikTok's own creator team suggests that videos losing 50%+ of viewers in the first 3 seconds rarely achieve significant organic reach, while videos that retain viewers past the 5-second mark are far more likely to be pushed to wider audiences. The hook is the single highest-leverage element of a short-form video.",
  },
  {
    q: "What are the different types of TikTok hooks?",
    a: "There are five main hook categories that consistently outperform others on short-form video platforms. Curiosity hooks create an information gap: 'You won't believe what happened when I tried [X]' — the viewer must watch to close the knowledge gap. Controversy hooks trigger strong emotional responses by challenging beliefs: 'Unpopular opinion: [mainstream view] is completely wrong.' Story hooks promise a personal narrative with an implied lesson or revelation: 'Nobody warned me about [X] until it was too late.' Challenge hooks document a transformation or experiment: 'I did [X] every day for 30 days — here's what changed.' How-to hooks promise a specific valuable outcome: 'The fastest way to [result] that nobody talks about.' The strongest hooks often combine two categories — a curiosity element within a story format, for example.",
  },
  {
    q: "How long should a TikTok hook be?",
    a: "A TikTok hook should deliver its core promise or tension within the first 1–3 seconds. In practice, this means 5–15 words spoken on camera or shown as text on screen. The goal is to create enough intrigue or promise in minimal time that the viewer's thumb stops mid-scroll. Spoken hooks should be delivered immediately at the start of the video — no intro music, no 'hey guys', no slow pan to the subject. The fastest-growing creators on TikTok start with the hook before the camera is even properly framed. For text-on-screen hooks, use high-contrast text that appears immediately in the first frame. Longer hooks (4–5 seconds) can work for story formats where the setup itself is compelling, but this requires strong delivery and visual interest to prevent early drop-off.",
  },
  {
    q: "What makes a TikTok hook go viral?",
    a: "Viral hooks tend to share several characteristics. They create immediate tension or desire: they make the viewer feel that stopping now would mean missing something important. They are specific rather than vague: 'I made $3,000 in 48 hours with this method' outperforms 'I made a lot of money quickly.' They address the viewer's self-interest directly: 'If you do [X], stop — here's why' speaks to you personally. They contain an unexpected element that subverts expectations: the contrast between setup and promised reveal is what drives curiosity. They match the niche's existing emotional register: fitness hooks use urgency and aspiration; comedy hooks use absurdity; personal finance hooks use fear and desire. The most repeatable viral hook formula combines specificity + unexpected contrast + implied reward for watching.",
  },
  {
    q: "Can I use TikTok hooks on other platforms like Instagram Reels and YouTube Shorts?",
    a: "Yes — the same hook principles apply to all short-form vertical video formats. Instagram Reels, YouTube Shorts, and TikTok all use algorithm-driven feeds optimised for watch time, completion rate, and engagement. A hook that works on TikTok will typically perform similarly on Reels and Shorts because the viewer behaviour and platform mechanics are nearly identical. The main difference is audience demographic: TikTok skews younger (18–24 dominant), Instagram Reels has a slightly older demographic and broader e-commerce intent, and YouTube Shorts audiences often have stronger existing channel loyalty. Adapt the tone and cultural references accordingly, but the hook structure — curiosity gap, controversy, story setup, challenge, or how-to promise — is platform-agnostic.",
  },
  {
    q: "How do I test whether my hooks are working?",
    a: "TikTok's analytics provide the clearest hook performance signal through the 'Average Watch Time' and 'Audience Retention' metrics (available under Creator Tools > Analytics > Video Performance for each post). Look at the 0–3 second drop-off rate: if you're losing more than 50% of viewers in the first 3 seconds, your hook is failing. Also check 'Average % Watched': a video with 20% average watch time on a 60-second video means most people left at 12 seconds — possibly after the hook but before the payoff. The most diagnostic test is comparing two videos on similar topics with different hook styles — if one retains viewers significantly longer, the hook is a likely factor. Most creators test 5–10 hook variations over several weeks before finding their most effective format for their specific audience.",
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
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-rose-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
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
          How to Use the TikTok Hook Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your topic and niche, generate hooks across five proven formats,
          filter by type, and copy the one that best matches your video concept.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your topic and niche",
              body: "Type your video topic into the topic field — be specific rather than broad. 'How I paid off $40k of student debt in 2 years' will generate better, more usable hooks than 'personal finance'. Add your niche (e.g. 'personal finance for millennials', 'beginner fitness', 'small business') to help the generator create hooks tailored to your audience's language and expectations. The more specific your inputs, the more immediately usable the output hooks will be.",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>Specificity tip:</strong> Replace vague topics
                  ('fitness', 'cooking', 'money') with specific claims or
                  scenarios ('I lost 20 lbs without cardio', 'the $5 ingredient
                  that makes restaurant-quality pasta', 'how I doubled my income
                  without a promotion'). Specific hooks create a stronger
                  information gap and are more likely to stop mid-scroll thumbs.
                </div>
              ),
            },
            {
              n: 2,
              title: "Review hooks across all five categories",
              body: "The generator produces hooks across five proven categories: Curiosity, Controversy, Challenge, Story, and How-To. Each category triggers a different psychological driver. Review all five sets before committing to one — sometimes the best hook for your content is in a category you wouldn't have tried instinctively. Use the filter tabs to focus on one category at a time if the full list is overwhelming.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Example structure
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Why it works
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {HOOK_EXAMPLES.map(([type, emoji, , example, reason]) => (
                        <tr key={type} className="hover:bg-rose-50">
                          <td className="px-4 py-2 font-bold text-rose-700 text-xs whitespace-nowrap">
                            {emoji} {type}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-gray-700 italic">
                            "{example}"
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Copy and adapt your favourite hook",
              body: "Click the copy button on any hook to copy it to your clipboard. Use it as the spoken opening line of your video, as on-screen text in the first frame, or as the first line of your TikTok caption. Most hooks work best spoken directly to camera at the start of the video — say it with energy and confidence before any other intro. Adapt the wording to sound natural in your voice: the tool gives you a structure, but your authentic delivery is what actually stops the scroll.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Delivery tip:</strong> The fastest-performing TikTok
                  creators start speaking the hook before the camera is even
                  properly framed, often mid-motion. This creates an
                  in-medias-res energy — the viewer feels like they've already
                  missed something and stays to catch up. Avoid intros like 'Hey
                  guys', 'So today I'm going to...', or 'Welcome back' before
                  the hook — these are scroll triggers that signal a slow start.
                </div>
              ),
            },
            {
              n: 4,
              title: "Test multiple hooks across different videos",
              body: "Don't use just one hook style — test different categories across your next 5–10 videos and compare performance in TikTok Analytics. Check average watch time and 3-second retention rate for each video. You'll discover which hook format resonates most with your specific audience. Most creators find that one or two hook categories consistently outperform others for their niche — once identified, lean into those formats while occasionally testing new structures to avoid creative stagnation.",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>Analytics to watch:</strong> In TikTok Creator Tools,
                  check each video's 'Average watch time' and '% of video
                  watched'. A high 3-second retention (viewers who stayed past 3
                  seconds as a percentage of total viewers) means your hook is
                  working. Low retention in the first 3 seconds despite good
                  overall content is a clear signal to test stronger hook
                  variations.
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
              emoji: "🎬",
              title: "Video content creators",
              desc: "Generate opening lines for TikTok, Reels, and Shorts — test different hook styles across videos and find what works for your niche.",
            },
            {
              emoji: "📣",
              title: "Brand and business accounts",
              desc: "Create attention-grabbing hooks for product demo videos, behind-the-scenes content, and brand storytelling on short-form platforms.",
            },
            {
              emoji: "🎓",
              title: "Educational creators",
              desc: "Hook viewers into educational content with curiosity and how-to formats that promise clear, specific learning outcomes.",
            },
            {
              emoji: "💼",
              title: "Personal finance creators",
              desc: "Generate controversy and story hooks for money content — 'I made $X doing Y' and 'unpopular money opinion' hooks consistently perform in the finance niche.",
            },
            {
              emoji: "🏋️",
              title: "Fitness and wellness creators",
              desc: "Use challenge hooks ('I did X every day for 30 days') and how-to hooks for workout, nutrition, and wellness content.",
            },
            {
              emoji: "🛍️",
              title: "E-commerce and product content",
              desc: "Generate hooks for product review videos, hauls, and UGC-style content — story and curiosity hooks drive strong product discovery watch rates.",
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

        <div className="bg-gradient-to-br from-gray-900 to-rose-950 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-xl font-bold mb-3">
            The first 3 seconds determine your entire video's reach — the hook
            is the highest-leverage element of any TikTok
          </h3>
          <p className="text-rose-200 leading-relaxed max-w-xl mx-auto text-sm">
            TikTok's For You Page algorithm is primarily driven by completion
            rate, watch time, and rewatch rate. A video that loses 70% of
            viewers in the first 3 seconds will receive minimal distribution
            regardless of how good the rest of the content is — the algorithm
            uses early retention as a quality signal to decide whether to push
            the video to more viewers. Creators who consistently outperform in
            their niche typically invest as much thought into their hook as the
            rest of the video combined. The formula is simple: a strong hook
            earns the right to deliver your content; a weak hook means your
            content never gets seen.
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
                desc: "Plan captions, hashtags, post type, and scheduling for Instagram content — visual grid and CSV export.",
              },
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags to increase reach and discoverability across Instagram, TikTok, and Twitter.",
              },
              {
                href: "/tools/social-media-character-counter",
                label: "Social Media Character Counter",
                desc: "Count characters and optimise caption length for platform-specific limits across all major networks.",
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
