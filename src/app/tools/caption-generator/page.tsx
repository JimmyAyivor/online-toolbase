// src/app/tools/caption-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const CaptionGeneratorClient = dynamic(
  () => import("./CaptionGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "caption-generator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Caption Generator — Free Online Caption Generator",
  description:
    "Generate engaging captions for photos and social media posts. Multiple tones and platform-specific hashtags.",
  keywords:
    "caption generator, instagram captions, social media captions, free caption generator, photo caption, hashtag generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/caption-generator` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/caption-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Caption Generator — Free Online Caption Generator",
    description:
      "Generate engaging captions for photos and social media posts. Multiple tones and platform-specific hashtags.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Caption Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Caption Generator — Free Online Caption Generator",
    description:
      "Generate engaging captions for photos and social media posts.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Caption Generator",
  description: "Generate engaging captions for photos and social media posts.",
  url: `${SITE_URL}/tools/caption-generator`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Social Media Tools",
      item: `${SITE_URL}/tools/category/social-media`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Caption Generator",
      item: `${SITE_URL}/tools/caption-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Caption Generator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the Caption Generator is completely free. No signup, no download, and no payment is required. It runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Caption Generator work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Caption Generator is fully responsive and works on smartphones, tablets, and desktop computers without any app installation.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private when using the Caption Generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All calculations are performed locally in your browser. No data is sent to any server or stored anywhere.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Caption Generator",
  description:
    "Step-by-step guide to using the free Caption Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Caption Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Caption Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function CaptionGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Caption Generator
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Caption Generator — Free Online Caption Generator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate engaging captions for photos and social media posts.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout tool={tool}>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id="main-content" aria-label="Caption Generator tool">
          <CaptionGeneratorClient />
        </main>

        {/* ── Zone G: below tool result — highest value placement ──────── */}
        {/* Sits immediately after the tool, before any editorial content   */}
        <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-center">
          {/* desktop: rectangle 336×280; mobile: medium rectangle 300×250 */}
          <div className="hidden sm:block">
            <AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} />
          </div>
          <div className="block sm:hidden">
            <AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} />
          </div>
        </div>

        {/* ── Zone H: between tool + How To editorial ──────────────────── */}
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

        {/* ── Editorial: How To + Related Tools ────────────────────────── */}
        {/* ── HOW TO USE ─────────────────────────────────────────────────────────── */}
        <section
          id="how-to-use"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          aria-labelledby="how-to-use-heading"
        >
          <h2
            id="how-to-use-heading"
            className="text-4xl font-bold text-gray-900 mb-4 text-center"
          >
            How to Use the Caption Generator
          </h2>
          <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Describe your post, pick a tone and platform, and get five
            ready-to-use captions with platform-appropriate hashtags in one
            click.
          </p>

          {/* ── Steps ── */}
          <div className="space-y-6 mb-14">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Describe what your post is about
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Type a short description of your post into the{" "}
                  <strong>What Is Your Post About?</strong> field. This becomes
                  the subject that gets woven into each generated caption. You
                  can leave it blank and the tool will use a generic
                  placeholder, but specific topics always produce more usable
                  results.
                </p>
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Be specific:</strong> The more descriptive your topic,
                  the more relevant the captions. Compare:
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold flex-shrink-0">
                        ✗
                      </span>
                      <span>
                        <em>"product"</em> — too vague, produces generic output
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold flex-shrink-0">
                        ✓
                      </span>
                      <span>
                        <em>"my new skincare serum launch"</em> — specific,
                        produces usable captions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold flex-shrink-0">
                        ✓
                      </span>
                      <span>
                        <em>"finishing my first marathon"</em> — personal and
                        concrete
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold flex-shrink-0">
                        ✓
                      </span>
                      <span>
                        <em>"our team hitting 100 customers"</em> — works well
                        for professional tone
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Choose a tone
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Select the voice that matches the feeling of your post. The
                  tone shapes the sentence structure, vocabulary, and energy of
                  every caption — the topic stays the same but the framing
                  changes completely.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      tone: "Fun 😄",
                      badge: "bg-yellow-100 text-yellow-700",
                      desc: "Playful, self-aware, uses trends like POV and 'era' framing. Good for personal posts, lifestyle content, behind-the-scenes, and anything where personality is the point.",
                    },
                    {
                      tone: "Professional 💼",
                      badge: "bg-blue-100 text-blue-700",
                      desc: "Clean, confident, achievement-focused. Suited for product announcements, work milestones, company updates, and LinkedIn-first content.",
                    },
                    {
                      tone: "Inspirational 🌟",
                      badge: "bg-purple-100 text-purple-700",
                      desc: "Motivational and forward-looking. Works well for fitness, personal development, milestone posts, and any content where you want the audience to feel something.",
                    },
                    {
                      tone: "Casual ☕",
                      badge: "bg-green-100 text-green-700",
                      desc: "Relaxed and grateful, no performance. Good for everyday posts, community-building content, and when you want to sound approachable rather than polished.",
                    },
                  ].map(({ tone, badge, desc }) => (
                    <div
                      key={tone}
                      className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-3"
                    >
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-2 ${badge}`}
                      >
                        {tone}
                      </span>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Not sure which tone to use? Generate with one, then hit{" "}
                  <strong>Regenerate</strong> after switching to another. Seeing
                  the same topic in two tones side-by-side makes the choice
                  obvious.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Select your platform
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Each platform has different norms for caption length, hashtag
                  volume, and tone — the tool adjusts the hashtag set
                  automatically based on your selection.
                </p>
                <div className="space-y-2">
                  {[
                    {
                      platform: "Instagram",
                      tags: "#instagood #photooftheday #content #lifestyle #explore #trending",
                      note: "Receives the full hashtag set. Instagram's discovery algorithm uses hashtags as classification signals, so a relevant set helps reach new audiences.",
                    },
                    {
                      platform: "LinkedIn",
                      tags: "#professional #leadership #growth #innovation #business",
                      note: "Professional hashtags only. LinkedIn users follow hashtags as content feeds — using industry-relevant tags increases distribution to people interested in your topic.",
                    },
                    {
                      platform: "TikTok",
                      tags: "#fyp #foryou #trending #viral #foryoupage",
                      note: "Discovery-focused tags. Note: TikTok has confirmed that #fyp and #foryou provide no special algorithmic boost — they're included here as they remain broadly used, but niche-specific tags often outperform them.",
                    },
                    {
                      platform: "X / Twitter",
                      tags: "#trending only",
                      note: "No hashtag block is appended — just the caption text. Twitter's character limit and posting culture mean that heavy hashtag use looks spammy and reduces engagement. One or two specific hashtags added manually perform better.",
                    },
                    {
                      platform: "Facebook",
                      tags: "#community #share",
                      note: "Minimal hashtags. Facebook's algorithm prioritises content that drives comments and shares over hashtag discovery — captions work better when they prompt a response.",
                    },
                  ].map(({ platform, tags, note }) => (
                    <div
                      key={platform}
                      className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <span className="font-bold text-indigo-600 w-24 flex-shrink-0">
                        {platform}
                      </span>
                      <div>
                        <code className="text-xs text-gray-400 block mb-1">
                          {tags}
                        </code>
                        <p className="text-gray-500 leading-relaxed">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Generate, pick, copy
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Click <strong>Generate Captions</strong> to get five
                  variations. Each result card shows the full caption text, its
                  character count, and a <strong>Copy</strong> button that
                  copies everything — caption and hashtags — to your clipboard
                  in one click.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      action: "Regenerate",
                      icon: "↺",
                      desc: "Produces a fresh random set of five captions from the same topic, tone, and platform settings. Use this if none of the first five feel right — the template pool is large enough that each run gives meaningfully different results.",
                    },
                    {
                      action: "Copy",
                      icon: "⧉",
                      desc: "Copies the individual caption (including the hashtag block) to your clipboard. The button shows 'Copied!' for 2 seconds to confirm. Paste directly into your social media app's caption field.",
                    },
                    {
                      action: "Reset",
                      icon: "↩",
                      desc: "Clears the topic field, resets tone to Fun and platform to Instagram, and removes all generated captions. Use this when starting a completely different post.",
                    },
                  ].map(({ action, icon, desc }) => (
                    <div
                      key={action}
                      className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {icon}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 mb-0.5">
                          {action}
                        </p>
                        <p className="text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Getting the most out of it ── */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Getting the best results
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            {[
              {
                emoji: "✏️",
                title: "Treat captions as starting points",
                desc: "Generated captions are templates, not finished copy. The best approach: pick the one closest to what you want, then edit it to match your exact voice, add a specific detail, or swap a word. 10 seconds of editing turns a good caption into a great one.",
              },
              {
                emoji: "🔁",
                title: "Compare tones side by side",
                desc: "Type your topic, generate with Professional, then switch to Fun and regenerate. Seeing the same subject expressed in two different tones makes it immediately obvious which fits your brand — faster than describing what you want.",
              },
              {
                emoji: "📏",
                title: "Check the character count",
                desc: "Each card shows the caption's character count. Twitter has a 280-character limit and LinkedIn performs best under 700 characters for most content. If a caption is too long, trim the hashtags or shorten a sentence.",
              },
              {
                emoji: "🏷️",
                title: "Replace generic hashtags with niche ones",
                desc: "#instagood has hundreds of millions of posts. Your content is buried instantly. After copying a caption, replace 2–3 of the generic hashtags with niche tags specific to your audience — they reach fewer people but people who are much more likely to engage.",
              },
              {
                emoji: "🎯",
                title: "Add a call to action manually",
                desc: "None of the templates end with a question or CTA — they're designed as clean caption starters. For higher engagement, add one sentence at the end: 'What's your take?' / 'Drop a comment below' / 'Link in bio.' These consistently outperform captions that end on a statement.",
              },
              {
                emoji: "📅",
                title: "Batch generate for a content calendar",
                desc: "Set aside 15 minutes, list 5–7 upcoming posts, and generate captions for each in one session. Copy them into a doc or scheduling tool. Batching caption writing is faster than doing it one-by-one at posting time when you're under pressure.",
              },
            ].map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="text-2xl mb-3">{emoji}</div>
                <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* ── Platform character limits ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Platform character limits at a glance
            </h3>
            <div className="space-y-2">
              {[
                {
                  platform: "Instagram",
                  limit: "2,200 characters",
                  sweet:
                    "125–150 chars before truncation, full caption on expand",
                  color: "bg-pink-100 text-pink-700",
                },
                {
                  platform: "LinkedIn",
                  limit: "3,000 characters",
                  sweet:
                    "Around 700 chars for most content types; document posts benefit from longer copy",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  platform: "TikTok",
                  limit: "2,200 characters",
                  sweet:
                    "First 1–2 lines visible before 'more' — make them count",
                  color: "bg-gray-100 text-gray-700",
                },
                {
                  platform: "X / Twitter",
                  limit: "280 characters",
                  sweet:
                    "The entire tweet is your hook — no hiding behind 'see more'",
                  color: "bg-sky-100 text-sky-700",
                },
                {
                  platform: "Facebook",
                  limit: "63,206 characters",
                  sweet:
                    "Practical sweet spot: 40–80 chars for highest engagement per most studies",
                  color: "bg-indigo-100 text-indigo-700",
                },
              ].map(({ platform, limit, sweet, color }) => (
                <div
                  key={platform}
                  className="flex items-start gap-3 text-sm px-4 py-3 bg-gray-50 rounded-xl"
                >
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${color}`}
                  >
                    {platform}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Limit: {limit}
                    </span>
                    <p className="text-gray-400 text-xs mt-0.5">{sweet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer note ── */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center">
            <div className="text-3xl mb-3">✍️</div>
            <h3 className="text-xl font-bold mb-3">
              Captions generated in your browser
            </h3>
            <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
              All caption generation runs locally in JavaScript — no text is
              sent to a server and nothing is logged. Generate as many captions
              as you need, for as many posts as you like, with no limits.
            </p>
          </div>

          {/* ── Zone I: related tools grid with native ad slot ──────────── */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Related Free Social Media Tools
            </h3>
            {/* 3-slot grid; the 4th card position (index 3) is reserved for */}
            {/* a native sponsored card — set data-ad-format="fluid" in AdSense */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  href: "/tools/hashtag-generator",
                  label: "Hashtag Generator",
                  desc: "Generate relevant hashtags to boost reach.",
                },
                {
                  href: "/tools/viral-hook-generator",
                  label: "Viral Hook Generator",
                  desc: "Create scroll-stopping hooks for any platform.",
                },
                {
                  href: "/tools/social-media-bio-generator",
                  label: "Social Media Bio Generator",
                  desc: "Generate optimised bios for social profiles.",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block bg-white rounded-xl shadow p-5 border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
                  aria-label={`${link.label} — ${link.desc}`}
                >
                  <div className="font-bold text-gray-900 text-sm mb-1">
                    {link.label}
                  </div>
                  <div className="text-xs text-gray-500">{link.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <ToolEngagement
          toolSlug="caption-generator"
          toolName="Caption Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
