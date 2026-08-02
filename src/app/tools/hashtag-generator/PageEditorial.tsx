"use client";
// src/app/tools/hashtag-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/hashtag-generator";
const TOOL_NAME = "Hashtag Generator";

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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-violet-100 shadow-inner mb-5">
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
    "Free hashtag generator — generate relevant hashtags for Instagram, TikTok, Twitter/X, and more by topic and niche. No signup.",
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
                <span className="text-violet-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const PLATFORM_HASHTAG_LIMITS = [
  [
    "Instagram",
    "30",
    "Up to 30 per post; Stories allow 10. Hashtags in caption or first comment both work. Mix of sizes recommended.",
  ],
  [
    "TikTok",
    "~5",
    "No hard limit but 3–5 targeted tags outperform 20+ generic ones. #fyp and #foryou are popular but very competitive.",
  ],
  [
    "Twitter / X",
    "1–2",
    "Tweets with 1–2 hashtags get higher engagement than those with 3+. Use only the most targeted tags.",
  ],
  [
    "LinkedIn",
    "3–5",
    "LinkedIn indexes hashtags for discovery. 3–5 specific professional hashtags outperform broad ones.",
  ],
  [
    "YouTube",
    "3–5",
    "Tags appear in description. First tag is weighted most heavily in YouTube search — make it your primary keyword.",
  ],
  [
    "Facebook",
    "1–3",
    "Hashtags have limited discovery impact on Facebook. Use sparingly; they don't drive reach the way they do on Instagram.",
  ],
];

const FAQS = [
  {
    q: "Do hashtags actually increase reach on Instagram?",
    a: "Hashtags on Instagram can increase reach, but their impact has diminished significantly since 2021–2022 when Instagram's algorithm shifted to prioritise interest-based content recommendations over hashtag discovery. That said, hashtags still serve two valuable functions: they place your content in the hashtag's browse feed (where people who follow or search that hashtag can find you), and they signal content category to the algorithm, which can improve interest-based distribution. The consensus among creators and marketing studies is that a focused set of 5–10 highly relevant hashtags outperforms 30 generic ones — the algorithm is sophisticated enough that large numbers of off-topic hashtags can actually reduce distribution by confusing the content categorisation signal. Use hashtags that accurately describe your post and niche audience.",
  },
  {
    q: "What is the difference between broad, medium, and niche hashtags?",
    a: "Hashtag size refers to the number of posts tagged with that hashtag. Broad or high-volume hashtags (over 1 million posts) — such as #fitness, #travel, or #food — have enormous audiences but also enormous competition. Your post enters a feed with millions of others and is quickly buried; new accounts rarely benefit from broad hashtags. Medium hashtags (100,000–1 million posts) offer a balance of audience size and competition. Niche or micro hashtags (under 100,000 posts) have smaller but highly engaged audiences, and your post stays visible in the feed for much longer. The generally recommended strategy is a mix: 1–2 broad for categorisation, 3–5 medium for reach, and 3–7 niche for engaged-audience targeting. This generator organises hashtags by these tiers to make the selection easier.",
  },
  {
    q: "Should I put hashtags in the caption or the first comment on Instagram?",
    a: "Both approaches are equally effective from an algorithmic standpoint — Instagram has confirmed that hashtags in the first comment provide the same discovery benefit as hashtags in the caption. The choice comes down to aesthetics and presentation. Many creators prefer putting hashtags in the first comment to keep captions clean and story-focused without a wall of tags at the end. Others include hashtags in the caption but separate them from the main text with several line breaks. If you use Instagram Stories, note that you can add up to 10 hashtags per story through the hashtag sticker — these are hidden from the visible story if you resize them to be very small, but still functional for discovery.",
  },
  {
    q: "How many hashtags should I use on TikTok?",
    a: "TikTok's algorithm works differently from Instagram's — TikTok's primary distribution mechanism is interest-based personalisation through its For You Page algorithm, not hashtag browsing. Hashtags on TikTok still influence content categorisation and appear in TikTok's search, but they're less critical to initial distribution than on Instagram. Most TikTok analytics studies suggest that 3–5 targeted, relevant hashtags outperform 20+ generic ones. Popular hashtags like #fyp and #foryoupage are extremely competitive and provide minimal incremental reach — using your actual niche hashtags (e.g. #smallbusiness, #budgetcooking, #beginnerworkout) is more effective for reaching your specific target audience. TikTok's caption has a 2,200-character limit and hashtags count toward it.",
  },
  {
    q: "Do hashtags work on LinkedIn?",
    a: "Yes — LinkedIn hashtags actively influence content discovery on the platform. LinkedIn indexes hashtags and surfaces content in followers' feeds when they follow or have searched for related hashtags. LinkedIn also uses hashtags as a content categorisation signal, which affects how its algorithm distributes posts to people with relevant professional interests. The recommended count is 3–5 targeted professional hashtags per post. Unlike Instagram, LinkedIn hashtag discovery is primarily keyword-driven rather than community-driven — hashtags like #leadership, #digitalmarketing, #entrepreneurship, and niche industry terms all have active follower bases. Avoid using more than 5–7 hashtags on LinkedIn, as it can make posts appear spammy in the professional context and may negatively affect perceived credibility.",
  },
  {
    q: "Why don't the same hashtags work across all platforms?",
    a: "Each platform has a different hashtag culture, algorithm, and discovery mechanism. On Instagram, community-based hashtags (#weddingphotography, #plantparent) build niche audiences. On TikTok, hashtags are more keyword-searchable terms (#recipeideas, #homeworkout). On Twitter/X, hashtags are often tied to trending events, news, and conversations — using evergreen niche hashtags is less impactful than participating in trending conversations. On LinkedIn, hashtags function like professional topic tags. On YouTube, hashtags appear above the video title and influence search, making keyword-accurate tags more important than community tags. This tool lets you select the target platform so generated hashtags are appropriate to that platform's conventions and audience behaviour.",
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
              <span className="text-violet-600 text-lg shrink-0">
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
          How to Use the Hashtag Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter your topic and niche, select a platform, generate hashtags
          sorted by popularity tier, pick your set, and copy in one click.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Enter your topic and niche",
              body: "Type your post topic into the topic field — be specific about your content. 'sustainable home decor on a budget' will produce better-targeted hashtags than 'home decor'. Add your niche (e.g. 'sustainable living', 'first-time homeowner', 'interior design DIY') to help the generator produce hashtags that match both your content and your target audience. Specific inputs consistently produce more targeted and effective hashtag sets than generic topic descriptions.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Niche tip:</strong> Think about who you're trying to
                  reach, not just what your content is about. A fitness post
                  targeting beginners needs different hashtags
                  (#beginnerworkout, #fitnessmotivation) than one targeting
                  competitive athletes (#strengthtraining,
                  #performancenutrition). Your niche description directly shapes
                  which community-relevant hashtags the generator surfaces.
                </div>
              ),
            },
            {
              n: 2,
              title: "Select your target platform",
              body: "Choose the platform you're posting to — Instagram, TikTok, Twitter/X, LinkedIn, or YouTube. Each platform has different hashtag conventions, count recommendations, and discovery mechanics. The generator adapts its output to the platform's norms: Instagram results include community hashtags suitable for the browse feed; LinkedIn results include professional topic tags; TikTok results include keyword-style tags suited to TikTok's search-based discovery.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Platform
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Recommended count
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Strategy
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {PLATFORM_HASHTAG_LIMITS.map(([platform, count, tip]) => (
                        <tr key={platform} className="hover:bg-violet-50">
                          <td className="px-4 py-2 font-bold text-violet-700 text-xs whitespace-nowrap">
                            {platform}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-700 whitespace-nowrap">
                            {count}
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
              n: 3,
              title: "Review hashtags by popularity tier",
              body: "Generated hashtags are organised into three tiers: Broad (high-volume, over 1M posts), Medium (100K–1M posts), and Niche (under 100K posts). For most platforms and goals, a balanced mix of tiers performs best — 1–2 broad for category signal, 3–5 medium for audience reach, and 3–7 niche for targeted community engagement. Click individual hashtags to select them for your final set. The selection panel tracks how many you've chosen against the platform's recommended limit.",
              enrich: (
                <div className="bg-fuchsia-50 rounded-xl px-5 py-4 text-sm text-fuchsia-800 leading-relaxed">
                  <strong>Tier mixing strategy:</strong> New accounts and posts
                  with lower engagement should lean heavier on niche hashtags
                  (lower competition, longer in-feed visibility) and avoid broad
                  ones entirely. Established accounts with strong engagement can
                  use 1–2 broad hashtags as they have the engagement velocity to
                  remain visible in crowded feeds. A 20% broad / 40% medium /
                  40% niche split is a commonly recommended starting ratio.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy and add to your post",
              body: "Once you've selected your hashtag set, click 'Copy' to copy all selected hashtags to your clipboard in a space-separated format ready to paste. For Instagram, paste them at the end of your caption or in the first comment immediately after posting. For TikTok and LinkedIn, paste directly into the caption. For YouTube, paste into the description at the end, after your main content. Test different hashtag sets across posts and monitor reach and discovery in your platform analytics to identify which tags consistently drive profile discovery.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Testing tip:</strong> Treat hashtags as an experiment
                  — use a consistent set for 3–5 posts, then swap one tier at a
                  time and compare impressions from hashtags in your analytics.
                  Instagram Insights and TikTok Analytics both show 'Impressions
                  from hashtags' or 'Traffic source' data, which tells you
                  exactly how much of your reach came from hashtag discovery vs.
                  other sources.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 text-white font-black text-lg flex items-center justify-center">
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
              title: "Instagram content creators",
              desc: "Generate targeted hashtag sets for every post — mixed by tier, matched to your niche, and sized to Instagram's 30-hashtag limit.",
            },
            {
              emoji: "🎵",
              title: "TikTok creators",
              desc: "Find the 3–5 keyword-style hashtags that match your TikTok content category and target audience for maximum search and FYP distribution.",
            },
            {
              emoji: "💼",
              title: "LinkedIn thought leaders",
              desc: "Generate 3–5 professional topic hashtags for LinkedIn posts — increase content discoverability among professionals in your industry.",
            },
            {
              emoji: "🏢",
              title: "Small businesses and brands",
              desc: "Build a consistent branded hashtag strategy — generate sets for each content pillar and maintain a library of proven performers per category.",
            },
            {
              emoji: "🎥",
              title: "YouTube creators",
              desc: "Generate keyword-accurate hashtags for YouTube descriptions — the first hashtag appears above the video title and is weighted in YouTube search.",
            },
            {
              emoji: "📣",
              title: "Social media managers",
              desc: "Quickly generate hashtag sets for multiple client accounts and content types — save time on manual hashtag research across platforms.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-violet-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">#</div>
          <h3 className="text-xl font-bold mb-3">
            30 generic hashtags won't outperform 8 targeted ones — relevance
            beats volume every time
          </h3>
          <p className="text-violet-100 leading-relaxed max-w-xl mx-auto text-sm">
            The most common hashtag mistake is using as many broad, popular
            hashtags as possible in the hope of reaching the largest audience.
            In practice, platforms like Instagram and TikTok use hashtags as a
            content categorisation signal — not just a placement mechanism. When
            your hashtags are unrelated to your content or audience, the
            algorithm receives a mixed signal about who should see your post,
            which can suppress distribution. Using fewer, highly relevant
            hashtags that accurately describe your content, niche, and target
            audience consistently outperforms a maxed-out list of generic tags.
            Use this generator to build sets that are specific, targeted, and
            matched to the platform where you're posting.
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
                desc: "Plan Instagram posts with captions, hashtags, post type, and scheduling ideas — visual grid and CSV export.",
              },
              {
                href: "/tools/tiktok-hook-generator",
                label: "TikTok Hook Generator",
                desc: "Generate scroll-stopping TikTok hook opening lines across curiosity, story, challenge, and how-to formats.",
              },
              {
                href: "/tools/social-media-bio-generator",
                label: "Social Media Bio Generator",
                desc: "Generate ready-to-use bios for Instagram, LinkedIn, Twitter/X, TikTok, and YouTube. Choose tone and keywords.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-violet-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
