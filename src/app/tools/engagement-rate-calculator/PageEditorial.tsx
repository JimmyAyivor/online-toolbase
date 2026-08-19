"use client";
// src/app/tools/engagement-rate-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/engagement-rate-calculator";
const TOOL_NAME = "Engagement Rate Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#064e3b", light: "#ecfdf5" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-inner mb-5">
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
    "Free engagement rate calculator — calculate ER by followers, reach, or impressions for any social platform. Benchmark your result. No signup.",
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
                <span className="text-emerald-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const BENCHMARKS = [
  ["Instagram", "< 1%", "1–3%", "3–6%", "> 6%"],
  ["TikTok", "< 3%", "3–9%", "9–18%", "> 18%"],
  ["YouTube", "< 0.5%", "0.5–2%", "2–5%", "> 5%"],
  ["LinkedIn", "< 0.5%", "0.5–2%", "2–5%", "> 5%"],
  ["Facebook", "< 0.5%", "0.5–1%", "1–3%", "> 3%"],
  ["Twitter / X", "< 0.3%", "0.3–1%", "1–3%", "> 3%"],
];

const FAQS = [
  {
    q: "What is engagement rate and why does it matter?",
    a: "Engagement rate (ER) is a metric that measures the level of interaction an account's content receives relative to its audience size or reach. It is expressed as a percentage and calculated by dividing total engagements (likes, comments, shares, saves, etc.) by a baseline figure — typically follower count or reach — and multiplying by 100. Engagement rate matters because it measures content quality and audience connection far more accurately than raw follower count. An account with 1 million followers but a 0.1% engagement rate has an audience that is largely disengaged — their content reaches many but resonates with few. An account with 10,000 followers and a 5% engagement rate has a highly connected audience. For brands and advertisers, engagement rate is a primary metric for evaluating influencer partnerships and campaign performance.",
  },
  {
    q: "What is a good engagement rate on Instagram?",
    a: "Engagement rate benchmarks on Instagram vary by account size — smaller accounts typically have higher engagement rates than larger ones due to more personal audience connections. For accounts under 10,000 followers, 3–6% is considered good and above 6% is excellent. For accounts between 10,000–100,000 followers, 1.5–3% is average and above 3% is good. For accounts over 100,000 followers, 1–2% is typical and anything above 2% is above average for that scale. The industry average across all account sizes is approximately 1–3% for Instagram. These are broad benchmarks — niche matters significantly: personal finance, fitness, and parenting communities typically have higher engagement than celebrity or entertainment accounts of equivalent size.",
  },
  {
    q: "What is the difference between ER by followers vs ER by reach vs ER by impressions?",
    a: "These three formulas use different denominators and measure slightly different things. ER by followers (Engagements ÷ Followers × 100) measures how engaged your existing audience is relative to your total follower count — the most commonly used formula for influencer benchmarking and brand comparisons. ER by reach (Engagements ÷ Reach × 100) measures engagement among people who actually saw the content — a more accurate measure of content resonance since it excludes followers who didn't see the post. ER by impressions (Engagements ÷ Impressions × 100) measures engagement relative to total views, including repeat views of the same post by the same user — the most conservative formula and the least commonly used for benchmarking. For most creator and brand analytics, ER by followers is the standard. For evaluating individual post quality, ER by reach is more informative.",
  },
  {
    q: "Why is TikTok's engagement rate so much higher than Instagram's?",
    a: "TikTok's higher average engagement rates (often 3–9% vs Instagram's 1–3%) reflect several platform-specific factors. TikTok's For You Page algorithm distributes content primarily to non-followers based on interest signals, meaning a large proportion of a video's views come from engaged users who were algorithmically matched to the content. This produces higher engagement rates relative to follower count because the denominator (followers) is often much smaller than the actual reach. Instagram's distribution is increasingly feed-based for followers plus Reels discovery, but its algorithm is more weighted toward existing follower distribution for non-Reels content. Additionally, TikTok's short video format has higher completion and interaction rates than static Instagram posts. Direct comparisons of engagement rates across TikTok and Instagram should account for these structural differences.",
  },
  {
    q: "How do brands use engagement rate when evaluating influencers?",
    a: "Brands and agencies use engagement rate as the primary quality signal when evaluating influencer partnerships, alongside follower count and audience demographics. A standard influencer evaluation framework uses engagement rate to distinguish authentic audience connection from inflated follower counts. Influencers with engagement rates significantly below the platform average for their follower tier are often flagged for potentially purchased followers or inactive audiences. Most influencer platforms and agencies use 1–3% as the minimum acceptable engagement rate for Instagram collaborations and 3%+ as the preferred threshold. For micro-influencers (10,000–100,000 followers), brands frequently prioritise engagement rate over absolute follower count — a 50,000-follower account with 4% ER is typically more valuable for a campaign than a 200,000-follower account with 0.5% ER.",
  },
  {
    q: "How can I improve my engagement rate?",
    a: "Engagement rate improvement strategies fall into four categories. Content quality: posts that generate comments typically contain a question, a controversial opinion, a strong emotional reaction, or a call to action. Carousels on Instagram consistently outperform single images for engagement — users who swipe through multiple slides count as higher-quality engagement signals. Timing: posting when your specific audience is most active (visible in each platform's analytics) increases the probability of early engagement, which in turn triggers algorithmic distribution. Interaction: responding to every comment, especially in the first hour after posting, signals to algorithms that your content is generating active conversations. Audience quality: a smaller, genuinely interested audience will always outperform a large, passive one — this is why niche content consistently has higher engagement rates than broad content aimed at everyone.",
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
              <span className="text-emerald-600 text-lg shrink-0">
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
          How to Use the Engagement Rate Calculator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Select your calculation method, enter your engagement metrics and
          follower or reach count, and get your engagement rate percentage with
          a benchmark rating.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose your calculation method",
              body: "Select how you want to calculate your engagement rate: by Followers (total engagements ÷ followers), by Reach (total engagements ÷ unique accounts reached), or by Impressions (total engagements ÷ total views). ER by followers is the standard formula used for influencer benchmarking and cross-account comparisons. ER by reach is more accurate for measuring content resonance. ER by impressions is the most conservative formula and least commonly used for comparative purposes.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Method
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Formula
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "By followers",
                          "Engagements ÷ Followers × 100",
                          "Influencer benchmarking, cross-account comparison",
                        ],
                        [
                          "By reach",
                          "Engagements ÷ Reach × 100",
                          "Evaluating individual post quality and resonance",
                        ],
                        [
                          "By impressions",
                          "Engagements ÷ Impressions × 100",
                          "Paid content analysis, most conservative benchmark",
                        ],
                      ].map(([method, formula, use]) => (
                        <tr key={method} className="hover:bg-emerald-50">
                          <td className="px-3 py-2 font-bold text-emerald-700 text-xs whitespace-nowrap">
                            {method}
                          </td>
                          <td className="px-3 py-2 text-xs font-mono text-gray-700">
                            {formula}
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-500">
                            {use}
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
              title: "Select your platform and enter your follower count",
              body: "Select the platform the post was published on — Instagram, TikTok, YouTube, LinkedIn, Facebook, or Twitter/X. Enter your total follower count (or reach/impressions, depending on your chosen method) into the baseline field. This value is used as the denominator in the engagement rate calculation and determines which platform benchmarks are used to rate your result.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Platform
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Low
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Average
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Good
                        </th>
                        <th className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">
                          Excellent
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {BENCHMARKS.map(([platform, low, avg, good, exc]) => (
                        <tr key={platform} className="hover:bg-emerald-50">
                          <td className="px-3 py-2 font-bold text-emerald-700 text-xs whitespace-nowrap">
                            {platform}
                          </td>
                          <td className="px-3 py-2 text-xs text-red-500">
                            {low}
                          </td>
                          <td className="px-3 py-2 text-xs text-orange-500">
                            {avg}
                          </td>
                          <td className="px-3 py-2 text-xs text-emerald-600">
                            {good}
                          </td>
                          <td className="px-3 py-2 text-xs text-emerald-700 font-bold">
                            {exc}
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
              title: "Enter your engagement metrics",
              body: "Enter the engagement metrics for the post: likes, comments, shares, and saves (where applicable). The tool sums these for the total engagement numerator. You can enter metrics for a single post or add multiple posts to calculate an average engagement rate across a set of content. The per-post breakdown shows the ER for each individual post, which is useful for identifying which content types are performing above or below your average.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Which metrics to include:</strong> Include all
                  interactions that represent genuine audience engagement. On
                  Instagram: likes + comments + saves + shares. On TikTok: likes
                  + comments + shares + saves. On YouTube: likes + comments
                  (views are impressions, not engagements). On LinkedIn:
                  reactions + comments + reposts. Not all platforms make every
                  metric publicly visible — use the metrics available to you and
                  note which formula you're using for consistent comparison.
                </div>
              ),
            },
            {
              n: 4,
              title: "Read your result and benchmark",
              body: "The calculated engagement rate is displayed as a percentage alongside a benchmark rating — Low, Average, Good, or Excellent — based on typical ranges for your selected platform. Use this benchmark to set realistic targets and track improvement over time. Calculate your engagement rate monthly using an average of your last 10–20 posts to track trends rather than relying on individual post performance, which can vary significantly based on content type, timing, and algorithmic distribution.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Tracking over time:</strong> A single post's
                  engagement rate is influenced by many factors beyond content
                  quality — timing, algorithmic distribution, and whether the
                  post was boosted. To get a meaningful picture of your
                  account's performance, calculate engagement rate as an average
                  across your last 10–20 posts, then track this monthly average
                  over 3–6 months. A rising monthly average ER indicates
                  improving content-audience connection; a falling ER may
                  indicate audience mismatch or content fatigue.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📊",
              title: "Creator performance tracking",
              desc: "Calculate your average engagement rate monthly and track it over time to measure whether your content-audience connection is improving.",
            },
            {
              emoji: "🤝",
              title: "Influencer vetting for brands",
              desc: "Calculate an influencer's engagement rate before a partnership to verify audience quality — flag accounts with unusually low ER relative to their follower count.",
            },
            {
              emoji: "📈",
              title: "Campaign performance analysis",
              desc: "Calculate post-by-post engagement rates for a campaign to identify which creative, copy, or format generated the highest audience response.",
            },
            {
              emoji: "🔍",
              title: "Competitor benchmarking",
              desc: "Calculate engagement rates for competitor accounts using their publicly visible metrics to benchmark your performance against industry peers.",
            },
            {
              emoji: "💼",
              title: "Agency client reporting",
              desc: "Generate engagement rate calculations for client monthly reports — show ER by post type, content pillar, and time period to demonstrate performance trends.",
            },
            {
              emoji: "🎯",
              title: "Content strategy decisions",
              desc: "Compare engagement rates across content types (Reels vs static, carousels vs single images) to identify which formats resonate most with your audience.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-bold mb-3">
            Follower count is vanity — engagement rate is the metric that
            actually measures audience quality
          </h3>
          <p className="text-emerald-100 leading-relaxed max-w-xl mx-auto text-sm">
            A large follower count without proportional engagement signals a
            passive or disengaged audience — one that sees your content but
            doesn't interact with it. This matters for both creators and brands:
            algorithmic distribution on every major platform is driven by early
            engagement signals. A post from a 10,000-follower account that
            generates 500 likes in the first hour will typically be distributed
            more broadly than a post from a 500,000-follower account that
            generates 300 likes — because the ratio signals content quality to
            the algorithm. Building a smaller, genuinely engaged audience
            consistently outperforms growing a large passive one, both for
            organic reach and for monetisation and partnership opportunities.
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
                desc: "Plan Instagram posts with captions, hashtags, and scheduling ideas — visual grid layout and CSV export.",
              },
              {
                href: "/tools/social-media-character-counter",
                label: "Social Media Character Counter",
                desc: "Live character counter for Twitter/X, Instagram, LinkedIn, TikTok, YouTube, and more in one tool.",
              },
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags for Instagram, TikTok, and LinkedIn — mixed by popularity tier, ready to copy.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
