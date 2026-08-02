"use client";
// src/app/tools/social-media-audit/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/social-media-audit";
const TOOL_NAME = "Social Media Audit Tool";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#3b0764", light: "#faf5ff" },
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
    "Free social media audit tool — 22-point checklist across profile, content, engagement, and strategy. Get an instant score. No signup.",
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
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const SCORE_TABLE = [
  [
    "0–39%",
    "Getting Started",
    "Most fundamentals are not yet in place. Start with Profile Basics and complete every item before moving to Content.",
  ],
  [
    "40–59%",
    "Needs Work",
    "The foundations are partially set but significant gaps remain. Focus on unchecked Profile Basics and Content Quality items first.",
  ],
  [
    "60–79%",
    "On the Right Track",
    "Core elements are in place. Now focus on Engagement and Strategy items to accelerate growth.",
  ],
  [
    "80–94%",
    "Looking Good",
    "Strong overall presence. Fine-tune remaining items and maintain consistency — growth should be consistent at this level.",
  ],
  [
    "95–100%",
    "Social Media Pro",
    "All major best practices are implemented. Focus on testing, iteration, and refining what's working.",
  ],
];

const FAQS = [
  {
    q: "How do I conduct a social media audit effectively?",
    a: "An effective social media audit reviews your presence across four areas: profile fundamentals (bio, photo, username consistency, links), content quality (visual consistency, value, posting frequency), engagement practices (replying to comments, interacting with others, using interactive features), and strategy (hashtags, analytics, content pillars, cross-promotion). Work through the checklist systematically rather than randomly — completing Profile Basics first ensures you have a strong foundation before optimising content and engagement. Screenshot or note your current score, then re-audit monthly to track progress. The items you leave unchecked become your prioritised action list for the following month.",
  },
  {
    q: "How often should I audit my social media?",
    a: "A monthly audit is the recommended cadence for most creators and brands. Monthly gives you enough time for improvements to take effect before you reassess, while keeping the review regular enough to catch issues early. Quarterly audits are appropriate for less active accounts or those with stable, consistent content strategies. Annual audits are the minimum — at least once per year, review whether your bio, links, profile photo, and strategy are still aligned with your current goals. For rapidly growing accounts or accounts undergoing a rebrand or pivot, a fortnightly or even weekly check-in on specific metrics (engagement rate, follower growth, reach) is valuable in addition to the full monthly audit.",
  },
  {
    q: "What is a content pillar and why does it matter?",
    a: "A content pillar is a broad theme or topic category that you post about consistently. Most social media strategists recommend 3–5 content pillars that collectively define your account's subject matter and tone. For example, a personal finance creator might use: Educational (explaining financial concepts), Inspirational (success stories and motivational content), and Personal (behind-the-scenes of their own financial journey). Content pillars matter because they create a coherent, recognisable account identity — new profile visitors can quickly understand what they'll get from following you. They also solve the common problem of running out of content ideas: when you feel stuck, cycle back through your pillars and generate content in each category. Accounts without defined pillars tend to post inconsistently or randomly, which makes it harder to attract and retain a clearly defined audience.",
  },
  {
    q: "Why does posting frequency matter for the algorithm?",
    a: "Posting frequency matters because social media algorithms reward consistent, recent activity. Accounts that post regularly signal to the algorithm that they're active, which tends to result in more consistent distribution of each post to followers. Accounts that post sporadically — many posts in one week, then nothing for three weeks — often see inconsistent reach because the algorithm doesn't know when to show their content. The 'correct' frequency varies by platform: Instagram typically rewards 3–5 times per week for feed posts plus daily Stories; TikTok's algorithm is more forgiving of lower frequency because it prioritises interest-matching over recency; LinkedIn performs well at 3–5 posts per week. Beyond the algorithmic benefit, consistent posting keeps you visible to existing followers who might otherwise forget about your account during long gaps.",
  },
  {
    q: "What should I prioritise if my score is below 60%?",
    a: "If your score is below 60%, start with Profile Basics — these are the highest-leverage fixes because every new profile visitor sees them first. Ensure your profile photo is high quality and recognisable at small sizes, your bio clearly communicates what you do and who it's for within the first two lines, your link in bio is working and leads to the right destination, and your username is consistent with your handles on other platforms. Once Profile Basics are solid, move to Content Quality: ensure you're posting at least 3 times per week with original or properly licensed images. These two categories — Profile Basics and Content Quality — form the foundation. Engagement and Strategy items compound on top of a strong foundation; they're less impactful if your profile itself isn't working effectively yet.",
  },
  {
    q: "How do I check my social media engagement rate?",
    a: "Engagement rate is calculated as total engagements (likes + comments + shares + saves) divided by follower count (or reach), multiplied by 100 to express as a percentage. Most platforms provide this data natively in their analytics sections: Instagram Creator Account → Insights → Account Activity; TikTok → Creator Tools → Analytics; LinkedIn → Post Analytics. As a general benchmark, 1–3% is average for Instagram, 3–9% is average for TikTok, and 0.5–2% is typical for LinkedIn — though these benchmarks vary significantly by niche and account size. You can use the Engagement Rate Calculator tool on this site to calculate your rate manually from your metrics.",
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
          How to Use the Social Media Audit Tool
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Work through all 22 checklist items honestly — the items you leave
          unchecked become your prioritised action list for improving your
          social media presence.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Start with Profile Basics",
              body: "The Profile Basics category covers the six elements every profile visitor sees first — your photo, username, bio, call to action, link in bio, and contact information. These have the highest leverage on first impressions: a new visitor to your profile makes a 'follow or don't follow' decision within seconds based primarily on these elements. Complete all six Profile Basics items before moving to other categories — a weak profile foundation limits the effectiveness of even excellent content.",
              enrich: (
                <div className="bg-violet-50 rounded-xl px-5 py-4 text-sm text-violet-800 leading-relaxed">
                  <strong>Quick profile wins:</strong> The two highest-impact
                  profile fixes for most accounts are (1) ensuring the bio's
                  first two lines clearly state what you do and who it's for —
                  without requiring the 'more' expansion click — and (2)
                  verifying the link in bio is working and leads somewhere
                  useful. Both take minutes to fix and immediately improve
                  conversion from profile visitor to follower.
                </div>
              ),
            },
            {
              n: 2,
              title: "Assess your Content Quality",
              body: "The Content Quality section evaluates six aspects of your actual posts: visual consistency, caption quality, value delivery, posting frequency, video accessibility, and image originality. Be honest — view your last 9 or 12 posts as a grid and ask whether they look cohesive, whether a stranger scrolling past would stop, and whether each post delivers genuine value to your target audience. Check each item only if it's consistently true, not if you've done it once.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>The 80/20 of content quality:</strong> Two content
                  items consistently matter most for growth: posting frequency
                  (3+ times per week is the minimum for consistent algorithmic
                  favour) and value delivery (content that educates, entertains,
                  or inspires rather than just promoting). If you can only focus
                  on two things in the Content Quality section, prioritise
                  these.
                </div>
              ),
            },
            {
              n: 3,
              title: "Review your Engagement habits",
              body: "Engagement is the most underrated category — most creators focus on creating content but neglect the daily practice of engaging with their audience and community. Check each item only if you're doing it consistently, not occasionally. Replying to comments within 24 hours, engaging with others in your niche, posting regular Stories, and using interactive features are all algorithmic signals that tell platforms your account generates genuine community activity.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>The engagement compounding effect:</strong> Accounts
                  that reply to every comment consistently see higher reach on
                  future posts because the algorithm registers their content as
                  generating conversations. The 15–30 minutes spent replying to
                  comments the day after posting is often more valuable for
                  algorithmic reach than spending the same time creating an
                  additional post.
                </div>
              ),
            },
            {
              n: 4,
              title: "Evaluate your Strategy",
              body: "The Strategy category covers the longer-term structural decisions that compound over time: hashtag research, content pillar planning, analytics review, cross-promotion, pinned post strategy, and collaboration. These items don't produce immediate results but significantly affect your growth trajectory over months. If you're in early growth (under 1,000 followers), focus on getting Profile Basics, Content Quality, and Engagement right first — Strategy items become more impactful once you have a working content engine.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Score
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Priority action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {SCORE_TABLE.map(([score, status, action]) => (
                        <tr key={score} className="hover:bg-violet-50">
                          <td className="px-4 py-2 font-bold text-violet-700 text-xs whitespace-nowrap">
                            {score}
                          </td>
                          <td className="px-4 py-2 font-semibold text-gray-900 text-xs">
                            {status}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {action}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              title: "Instagram creators",
              desc: "Audit your Instagram profile and content strategy — identify which of the 22 points you're missing and create an improvement plan.",
            },
            {
              emoji: "💼",
              title: "LinkedIn professionals",
              desc: "Review your LinkedIn presence against best practices — profile completeness, content consistency, and engagement habits.",
            },
            {
              emoji: "🏢",
              title: "Small business owners",
              desc: "Assess your brand's social media foundation — ensure your profile basics are strong before investing more time in content creation.",
            },
            {
              emoji: "📣",
              title: "Social media managers",
              desc: "Use as a structured client account review — systematically evaluate a client's current presence and produce an action report.",
            },
            {
              emoji: "🎓",
              title: "New content creators",
              desc: "Use this as a launch checklist — ensure all 22 fundamentals are in place before investing heavily in growing your following.",
            },
            {
              emoji: "🔄",
              title: "Quarterly reviews",
              desc: "Re-run monthly to track improvement — compare your score over time and celebrate progress as new items get checked off.",
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

        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📋</div>
          <h3 className="text-xl font-bold mb-3">
            Most creators focus only on content — but profile fundamentals and
            engagement habits determine whether that content ever gets seen
          </h3>
          <p className="text-violet-100 leading-relaxed max-w-xl mx-auto text-sm">
            Creating content without a strong profile foundation is like running
            ads for a broken landing page — the effort is wasted because the
            destination doesn't convert. Similarly, posting consistently without
            engaging with comments or your community signals to the algorithm
            that your content doesn't generate conversation, which suppresses
            future distribution. The accounts that grow consistently aren't
            necessarily the ones with the best content — they're the ones that
            have all three elements working together: a compelling profile that
            converts visitors to followers, consistent content that delivers
            value, and daily engagement habits that signal to the algorithm that
            their account is active and their content generates community
            activity.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Social Media Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/engagement-rate-calculator",
                label: "Engagement Rate Calculator",
                desc: "Calculate your engagement rate by followers, reach, or impressions — with benchmark ratings per platform.",
              },
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags for Instagram, TikTok, and LinkedIn — mixed by popularity tier.",
              },
              {
                href: "/tools/social-media-bio-generator",
                label: "Social Media Bio Generator",
                desc: "Generate ready-to-use bios for Instagram, LinkedIn, Twitter/X, TikTok, and YouTube.",
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
