"use client";
// src/app/tools/instagram-post-planner/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/instagram-post-planner";
const TOOL_NAME = "Instagram Post Planner";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#831843", light: "#fdf2f8" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-pink-100 shadow-inner mb-5">
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
    "Free Instagram post planner — plan captions, hashtags, post type, status, and schedule in a visual content grid. CSV export. No signup.",
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
                <span className="text-pink-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const POST_TYPES = [
  [
    "📷 Photo",
    "Single static image. Best for high-quality product shots, portraits, landscapes, or any visual that tells a story without motion.",
  ],
  [
    "🎬 Video",
    "Single video up to 60 seconds in feed (up to 60 min for IGTV). Higher engagement than static images for most audiences.",
  ],
  [
    "🎠 Carousel",
    "Up to 10 slides (images or videos). Best for step-by-step tutorials, before/after comparisons, and multi-image collections.",
  ],
  [
    "📖 Story",
    "Vertical full-screen format, disappears after 24 hours. Best for time-sensitive content, polls, and casual behind-the-scenes.",
  ],
  [
    "🎥 Reel",
    "Short-form vertical video (up to 90 seconds). The highest organic reach format on Instagram due to algorithm prioritisation.",
  ],
];

const FAQS = [
  {
    q: "What is a content calendar and why do creators use one?",
    a: "A content calendar (also called a content plan or editorial calendar) is a scheduled plan of what content to create and publish, and when. For Instagram creators and brands, it serves several purposes. Consistency: The Instagram algorithm rewards accounts that post regularly — a plan ensures you never miss a posting day or run dry on content ideas. Quality: Planning ahead lets you shoot, edit, and write captions thoughtfully rather than rushing a post together at the last minute. Strategy: A calendar lets you plan content around key dates, product launches, seasonal moments, and campaign themes weeks or months in advance. Variety: Planning lets you balance content types — a mix of educational, entertaining, product-focused, and community posts performs better than a monotone feed. Analytics: With a documented plan, you can compare actual posting dates and performance against the plan, identifying which content types and topics resonate most.",
  },
  {
    q: "What are the best times to post on Instagram?",
    a: "The best posting time varies significantly by audience, niche, and time zone. General research suggests that weekdays between 9 AM and 11 AM in your audience's local time tend to perform well for reach, with Tuesday, Wednesday, and Thursday being the strongest days. Evening slots around 7–9 PM also see good engagement as people browse before bed. However, these are averages across all accounts — your own audience's behaviour is what matters most. The most reliable approach: switch to a professional or creator account to access Instagram Insights, then check the 'Most Active Times' data under your audience metrics. This shows exactly when your followers are online, and scheduling content for those windows gives it the best chance of being seen while it's fresh.",
  },
  {
    q: "How many hashtags should I use on Instagram posts?",
    a: "Instagram officially recommends using 3–5 highly relevant hashtags per post, a significant shift from the earlier advice of using 20–30 hashtags. The algorithm change in 2021–2022 moved away from volume-based hashtag reach toward topic-based content distribution — Instagram now uses the post content itself (image analysis and caption text) to determine who to show it to, with hashtags playing a supporting role. Relevance matters more than quantity: using 5 highly specific hashtags that precisely describe your content outperforms 30 generic hashtags. A good hashtag mix might include 1–2 broad niche hashtags (500k–2M posts), 2–3 mid-tier niche hashtags (50k–500k posts), and 1–2 tight community hashtags (under 50k posts) where your content can actually surface rather than being buried immediately.",
  },
  {
    q: "What is the ideal caption length for Instagram?",
    a: "Caption length depends on your content type and strategy. Instagram truncates captions after the first 125 characters with a 'more' tap required to expand, so your hook — the opening line — is critical. Short captions (under 125 characters) work well for visually self-explanatory content, quotes, product shots, and entertainment posts where the image does the heavy lifting. Medium captions (125–300 characters) are versatile and suit most use cases. Long captions (300+ characters, up to the 2,200 character limit) work well for storytelling, educational content, personal anecdotes, and thought leadership posts — audiences who engage with long-form content on Instagram tend to be highly invested. The key variable is your audience: check which caption lengths correlate with higher engagement on your existing posts in Instagram Insights.",
  },
  {
    q: "What is the difference between Instagram Reels and regular video posts?",
    a: "Instagram Reels are short-form vertical videos (up to 90 seconds) that are shown in the Reels feed, the Explore tab, and can be shared to your main feed. Reels receive priority distribution from Instagram's algorithm — they are more likely to be shown to non-followers, making them the highest organic reach format on the platform. The Reels format uses a full-screen 9:16 aspect ratio (1080×1920 px). Regular feed videos (now called Instagram Videos) are also shown in the main feed and on your profile grid but do not get the same algorithmic push to non-followers. For creators focused on growing their following, Reels is the most effective format; for existing follower engagement, feed posts, Stories, and carousels are often more effective.",
  },
  {
    q: "How do I plan an Instagram content strategy for a new account?",
    a: "Building a strategy from scratch involves a few key decisions. First, define your niche and content pillars — 3–5 core topics you'll consistently post about. This gives your account a clear identity and makes it easier for Instagram's algorithm to categorise and recommend your content to relevant audiences. Second, choose your content mix: most successful accounts use a rough formula like 40% educational/informational, 30% entertaining, 20% promotional, and 10% personal/behind-the-scenes. Third, establish a posting cadence you can sustain consistently — 3 posts per week consistently outperforms 10 posts one week and 1 the next. Fourth, use this planner to map out a month of content ideas before you start, batching your content creation into sessions rather than shooting and posting day-by-day. Fifth, review performance monthly: double down on content types that get engagement, and cut or adjust what isn't working.",
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
              <span className="text-pink-600 text-lg shrink-0">
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
          How to Use the Instagram Post Planner
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Add post ideas with captions, hashtags, type, status, and scheduled
          date — view them in a visual content grid or list, filter by status,
          and export your full plan as CSV.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Add a new post idea",
              body: "Click 'Add Post' to create a new post entry. Fill in the caption (up to 2,200 characters, matching Instagram's limit), add hashtags (the tool helps you track them separately from the caption for easy management), set a scheduled date and time, and assign the post a colour label for visual organisation. All data is saved in your browser's local storage — it persists between sessions without any login required.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Caption writing tip:</strong> The first 125 characters
                  of your caption are shown before the 'more' tap on mobile —
                  this is your hook. Write the most compelling line first. Save
                  hashtags for the end of the caption or the first comment to
                  keep the opening lines clean and readable.
                </div>
              ),
            },
            {
              n: 2,
              title: "Set the post type and status",
              body: "Choose from five post types: Photo, Video, Carousel, Story, or Reel. Each type has different optimal dimensions, caption lengths, and use cases. Set the status to track where each post is in your workflow: Idea (not yet started), Draft (caption or concept written), Scheduled (ready to go, queued in a scheduling tool), or Posted (live on your feed). Filter the content grid by status to see only what needs attention — for example, filtering to 'Draft' shows posts that need finishing.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {POST_TYPES.map(([type, desc]) => (
                        <tr key={type} className="hover:bg-pink-50">
                          <td className="px-4 py-2 font-bold text-pink-700 text-xs whitespace-nowrap">
                            {type}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-600">
                            {desc}
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
              title: "View and navigate the content grid",
              body: "Switch between Grid view (a visual card layout mimicking a content calendar) and List view (a compact row-based layout suited for detailed editing and bulk review). In Grid view, each card shows the caption preview, colour label, post type badge, status badge, and scheduled date. Click any card to open the full edit panel. Use the filter controls at the top to show only posts of a specific status, post type, or date range — useful for sprint-style weekly planning sessions.",
              enrich: (
                <div className="bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed">
                  <strong>Colour label strategy:</strong> Use colour labels to
                  categorise content by pillar or theme — for example, pink for
                  promotional posts, purple for educational content, orange for
                  behind-the-scenes, and blue for community/engagement posts. At
                  a glance in the grid, you can see whether your planned month
                  has a healthy mix or is skewed towards one content type.
                </div>
              ),
            },
            {
              n: 4,
              title: "Export your content plan as CSV",
              body: "Click 'Export CSV' to download your full content plan as a spreadsheet-compatible CSV file. Each row contains one post with all fields: caption, hashtags, post type, status, scheduled date and time, and colour label. Import this CSV into Google Sheets, Excel, Notion, or any other tool to share your plan with a team, create a more detailed editorial calendar, or keep an archive of historical post plans.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Team workflow tip:</strong> Export the CSV, open it in
                  Google Sheets, and share the sheet with your team or clients
                  for collaborative review. Add columns for engagement metrics
                  after posting to turn your plan into a performance tracker.
                  Compare planned vs actual posting dates over time to improve
                  your planning accuracy.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📅",
              title: "Monthly content planning",
              desc: "Map out 30 days of posts at the start of each month — captions, types, and dates — so you're never scrambling for ideas.",
            },
            {
              emoji: "🏢",
              title: "Brand & business accounts",
              desc: "Plan product launches, promotions, and campaign content weeks in advance with clear status tracking across the team.",
            },
            {
              emoji: "🎨",
              title: "Creator content calendars",
              desc: "Balance educational, entertaining, and promotional posts across the month — use colour labels to visualise your content mix at a glance.",
            },
            {
              emoji: "📊",
              title: "Client social media management",
              desc: "Plan content for multiple client accounts, export CSVs for client approval, and maintain a clear record of approved posts.",
            },
            {
              emoji: "🚀",
              title: "Campaign and launch planning",
              desc: "Plot out a multi-week campaign with teaser posts, launch day content, and follow-up engagement posts in a single view.",
            },
            {
              emoji: "📝",
              title: "Caption writing batching",
              desc: "Write a week's worth of captions in one focused session — use Draft status to mark what's written, Scheduled for what's ready, and Idea for what's still being developed.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-pink-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-orange-400 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📋</div>
          <h3 className="text-xl font-bold mb-3">
            Consistency is the single most important Instagram growth factor —
            planning makes consistency effortless
          </h3>
          <p className="text-pink-100 leading-relaxed max-w-xl mx-auto text-sm">
            Instagram's algorithm rewards accounts that post consistently over
            time more than accounts that post in bursts. Irregular posting — a
            week of daily content followed by two weeks of silence — causes
            reach to drop and audiences to disengage. Most successful creators
            and brands batch-create content: one or two focused production
            sessions per month, followed by scheduled publishing throughout the
            month. This planner supports that workflow — use it to map out a
            month of ideas, write all your captions in one session, then
            transfer your schedule to Instagram's native scheduler or a tool
            like Buffer or Later. The result is a consistent feed without the
            daily stress of wondering what to post.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Social Media Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags to increase Instagram reach and discoverability for any topic or niche.",
              },
              {
                href: "/tools/social-media-bio-generator",
                label: "Social Media Bio Generator",
                desc: "Generate optimised and creative bios for Instagram profiles and other social media platforms.",
              },
              {
                href: "/tools/engagement-rate-calculator",
                label: "Engagement Rate Calculator",
                desc: "Calculate Instagram engagement rate using likes, comments, and followers — benchmark against industry standards.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-pink-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
