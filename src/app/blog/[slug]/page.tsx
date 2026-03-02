// src/app/blog/[slug]/page.tsx
// Semrush-inspired editorial layout:
//  • Dark gradient hero with category pill, title, description, meta bar
//  • Two-column body: wide article + sticky right sidebar
//  • Key Takeaways box (numbered, accent-bordered)
//  • Sticky Table of Contents in sidebar with scroll-spy via client component
//  • Clean prose with custom heading anchors
//  • Share bar (X, LinkedIn)
//  • Related Tools CTA (indigo gradient card)
//  • Sidebar: TOC + Tools widget + "Browse All Tools" promo card

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "../blog-posts";
import BlogPostClient from "./BlogPostClient";

// ─── Static import map ────────────────────────────────────────────────────────
import Base64EncodingExplained from "../content/base64-encoding-explained";
import BmiLimitationsAndWhatToUseInstead from "../content/bmi-limitations-and-what-to-use-instead";
import CaloriesMacrosWhatToTrack from "../content/calories-macros-what-to-track";
import CompoundInterestExplained from "../content/compound-interest-explained";
import ContentCreatorFreeTools from "../content/content-creator-free-tools";
import FreeDeveloperToolsBookmarks from "../content/free-developer-tools-bookmarks";
import FreelancerInvoicingGuide from "../content/freelancer-invoicing-guide";
import HashtagsHowTheyWork2025 from "../content/hashtags-how-they-work-2025";
import HowToCalculateRoiCorrectly from "../content/how-to-calculate-roi-correctly";
import HowToCreateAStrongPassword from "../content/how-to-create-a-strong-password";
import ImageFormatsWebpAvifJpeg from "../content/image-formats-webp-avif-jpeg";
import JsonExplainedForDevelopers from "../content/json-explained-for-developers";
import LinkedinPostsThatGetEngagement from "../content/linkedin-posts-that-get-engagement";
import MortgageCalculatorCompleteGuide from "../content/mortgage-calculator-complete-guide";
import PlagiarismCheckBeforePublishing from "../content/plagiarism-check-before-publishing";
import PomodoroTechniqueGuide from "../content/pomodoro-technique-guide";
import QrCodesSmallBusinessUses from "../content/qr-codes-small-business-uses";
import RegexBeginnersGuide from "../content/regex-beginners-guide";
import SocialMediaEngagementRate2025 from "../content/social-media-engagement-rate-2025";
import UnitConversionsPeopleAlwaysGoogle from "../content/unit-conversions-people-always-google";
import Link from "next/link";

const CONTENT_MAP: Record<string, React.ComponentType> = {
  "base64-encoding-explained": Base64EncodingExplained,
  "bmi-limitations-and-what-to-use-instead": BmiLimitationsAndWhatToUseInstead,
  "calories-macros-what-to-track": CaloriesMacrosWhatToTrack,
  "compound-interest-explained": CompoundInterestExplained,
  "content-creator-free-tools": ContentCreatorFreeTools,
  "free-developer-tools-bookmarks": FreeDeveloperToolsBookmarks,
  "freelancer-invoicing-guide": FreelancerInvoicingGuide,
  "hashtags-how-they-work-2025": HashtagsHowTheyWork2025,
  "how-to-calculate-roi-correctly": HowToCalculateRoiCorrectly,
  "how-to-create-a-strong-password": HowToCreateAStrongPassword,
  "image-formats-webp-avif-jpeg": ImageFormatsWebpAvifJpeg,
  "json-explained-for-developers": JsonExplainedForDevelopers,
  "linkedin-posts-that-get-engagement": LinkedinPostsThatGetEngagement,
  "mortgage-calculator-complete-guide": MortgageCalculatorCompleteGuide,
  "plagiarism-check-before-publishing": PlagiarismCheckBeforePublishing,
  "pomodoro-technique-guide": PomodoroTechniqueGuide,
  "qr-codes-small-business-uses": QrCodesSmallBusinessUses,
  "regex-beginners-guide": RegexBeginnersGuide,
  "social-media-engagement-rate-2025": SocialMediaEngagementRate2025,
  "unit-conversions-people-always-google": UnitConversionsPeopleAlwaysGoogle,
};

// ─── Key Takeaways ────────────────────────────────────────────────────────────
const KEY_TAKEAWAYS: Record<string, string[]> = {
  "how-to-create-a-strong-password": [
    "Length beats complexity — 16+ random characters is vastly stronger than clever letter-swaps.",
    "Modern cracking tools have every common substitution pattern (P@ssw0rd, etc.) built in.",
    "Use a random generator + password manager for accounts you don't type regularly.",
    "Use a passphrase of 4+ unrelated words for passwords you need to memorise.",
    "Two-factor authentication is a separate essential layer — even a strong password can be phished.",
  ],
  "social-media-engagement-rate-2025": [
    "Instagram static posts (6.2% avg) now outperform Reels (3.5%) for engagement.",
    "LinkedIn documents are averaging 37% engagement — highest of any format on any platform.",
    "TikTok engagement has been declining month-on-month since early 2024.",
    "Replying to comments in the first hour is the single highest-leverage action after publishing.",
    "Reach-based ER is more accurate for content performance; follower-based for brand comparisons.",
  ],
  "compound-interest-explained": [
    "Compound interest earns on interest already earned — simple interest never does.",
    "Time matters more than rate. Starting at 25 beats saving 3× as much from age 35.",
    "Rule of 72: divide 72 by your annual rate to find years to double.",
    "A credit card at 24% APR doubles what you owe in just 3 years if unpaid.",
    "Daily vs monthly compounding barely matters. Rate and time are what move the needle.",
  ],
  "image-formats-webp-avif-jpeg": [
    "AVIF is 40–50% smaller than JPEG at comparable quality — now supported by all modern browsers.",
    "Use the HTML <picture> element to serve AVIF with WebP and JPEG fallbacks automatically.",
    "Images are ~63% of average page weight and the top cause of poor LCP scores.",
    "Resizing to display dimensions matters as much as format choice.",
    "SVG is always the right choice for logos, icons, and vector graphics.",
  ],
  "bmi-limitations-and-what-to-use-instead": [
    "BMI was designed in the 1830s as a population statistic — not a personal health tool.",
    "It can't distinguish muscle from fat. Heavy athletes regularly score 'obese'.",
    "Where fat is stored (visceral vs subcutaneous) is as important as how much — BMI ignores this.",
    "South and East Asian populations face elevated health risk at lower BMI values than standard thresholds.",
    "Waist circumference, waist-to-height ratio, and body fat % give a more complete picture.",
  ],
  "freelancer-invoicing-guide": [
    "An invoice is a legal document — vague descriptions like 'services rendered' create disputes.",
    "Always confirm the accounts payable contact before invoicing, especially at larger companies.",
    "Include a specific due date, not just 'Net 30' — ambiguity delays payment.",
    "Ask for a PO number before invoicing large clients; without it invoices stall in their queue.",
    "Send the invoice the same day you deliver work — every day of delay adds to your wait.",
  ],
  "regex-beginners-guide": [
    "You only need ~12 core concepts to cover 90% of real-world regex use cases.",
    "Character classes [], shorthand \\d \\w \\s, and quantifiers * + ? cover most patterns.",
    "Anchors ^ and $ are critical for validating full strings vs finding matches within text.",
    "Lookahead and lookbehind let you match context without including it in the result.",
    "The fastest way to learn regex is a live tester — write patterns against real data.",
  ],
  "json-explained-for-developers": [
    "JSON is a text format — it's not a JavaScript object, even though the syntax looks similar.",
    "All keys must be double-quoted strings. Single quotes and unquoted keys are invalid.",
    "Trailing commas and comments are not valid JSON — use YAML or JSON5 if you need them.",
    "JSON won over XML for APIs because it's smaller, more readable, and natively parseable in JS.",
    "Always validate untrusted JSON before parsing — a malformed payload will throw at runtime.",
  ],
  "calories-macros-what-to-track": [
    "Energy balance (calories in vs out) is the fundamental driver of weight change.",
    "Protein intake is the most important macro for body composition and satiety.",
    "Tracking macros adds value when building muscle, hitting performance goals, or troubleshooting a plateau.",
    "For most people: hit a protein target within a calorie budget — that's the highest-leverage approach.",
    "Track long enough to build intuition, then decide whether to continue or rely on habits.",
  ],
  "mortgage-calculator-complete-guide": [
    "In the early years of a repayment mortgage, most of each payment goes to interest, not principal.",
    "A 2% rate difference on a £250k mortgage means ~£300/month and £90k+ in total interest.",
    "Overpaying even small amounts early has a disproportionate impact on total interest paid.",
    "Mortgage calculators show principal + interest only — stamp duty, fees, and insurance are extra.",
    "Always compare total cost over the fixed term, not just headline rate — arrangement fees matter.",
  ],
  "pomodoro-technique-guide": [
    "After an interruption it takes ~23 minutes to fully regain deep focus on a task.",
    "The technique works by making the cost of interruption explicit and time-boxing tasks.",
    "Breaks must involve genuine mental disengagement — scrolling social media doesn't count.",
    "The 50/10 ratio works better than 25/5 for work that requires long context-loading.",
    "Tracking Pomodoros per task builds self-knowledge that makes future planning more accurate.",
  ],
  "hashtags-how-they-work-2025": [
    "Instagram now recommends 3–5 relevant hashtags — not 30 generic ones.",
    "Hashtags function primarily as algorithm classification signals, not traffic drivers in 2025.",
    "Instagram's algorithm also reads caption copy for content classification — keywords matter.",
    "#fyp and #foryou have no special algorithmic power on TikTok despite appearing on viral posts.",
    "LinkedIn hashtags have more structural value because users actively follow them as content feeds.",
  ],
  "qr-codes-small-business-uses": [
    "Every modern smartphone camera scans QR codes natively — no app download required.",
    "Google Review QR codes are the highest-ROI application for most customer-facing businesses.",
    "Wi-Fi QR codes encode credentials directly — customers connect automatically on scan.",
    "Always download as SVG for print — it scales infinitely without pixelating.",
    "Test your code from the printed version before distributing — screen and print render differently.",
  ],
  "content-creator-free-tools": [
    "You don't need $200/month in subscriptions to produce professional content.",
    "Caption generators are starting points — always edit the output to match your voice.",
    "Compress every image before uploading — most are 3–5× larger than needed for web.",
    "Consistent posting frequency predicts account growth more reliably than posting volume.",
    "Start with the 2–3 tools that address your biggest friction points and ignore the rest.",
  ],
  //   "compound-interest-explained": [
  //     "Compound interest earns on interest already earned — simple interest never does.",
  //     "Time matters more than rate. Starting at 25 beats saving 3× as much from age 35.",
  //     "Rule of 72: divide 72 by your annual rate to find years to double.",
  //     "A credit card at 24% APR doubles what you owe in just 3 years if unpaid.",
  //     "Daily vs monthly compounding barely matters. Rate and time are what move the needle.",
  //   ],
  "base64-encoding-explained": [
    "Base64 converts binary data to safe ASCII text — it's encoding, not encryption.",
    "Encoded output is always ~33% larger than the original input.",
    "JWT tokens use URL-safe Base64 (- and _ instead of + and /) in all three sections.",
    "Only the JWT signature provides security — the header and payload are just encoded, not encrypted.",
    "Avoid Base64 data URIs for images larger than ~2KB — size overhead plus no caching.",
  ],
  "linkedin-posts-that-get-engagement": [
    "LinkedIn truncates posts at ~210 characters — your hook must earn the 'see more' click.",
    "LinkedIn's algorithm weights comments far more heavily than likes for distribution.",
    "Native document posts (PDF carousels) average 37% engagement — highest of any format.",
    "Cross-posting content from Instagram or TikTok performs poorly — rewrite for LinkedIn's tone.",
    "Replying to every comment in the first 60 minutes significantly boosts algorithmic reach.",
  ],
  "unit-conversions-people-always-google": [
    "1 km = 0.621 miles. Divide by 1.6 for a quick mental estimate.",
    "1 kg = 2.205 lbs. Multiply by 2.2 for everyday use.",
    "°F = (°C × 1.8) + 32. Key references: 0°C=32°F, 20°C=68°F, 37°C=98.6°F.",
    "1 US gallon = 3.785 litres. Divide litres by 3.8 for a quick gallons figure.",
    "1 m² = 10.764 ft². Multiply by 10.75 (or just 10 for a fast estimate).",
  ],
  "how-to-calculate-roi-correctly": [
    "ROI = ((Gain − Cost) ÷ Cost) × 100. The denominator is always the cost, not the revenue.",
    "Using gross revenue instead of net profit massively overstates ROI in most business contexts.",
    "Basic ROI ignores time — a 100% return over 1 year and 10 years are completely different.",
    "For multi-year investments, use annualised ROI: ((1 + ROI)^(1/n) − 1) × 100.",
    "ROI works poorly for brand building, R&D, and investments with non-financial returns.",
  ],
  "plagiarism-check-before-publishing": [
    "Most plagiarism is accidental — heavy research exposure causes phrases to stick in memory.",
    "The similarity percentage matters less than what's actually flagged — read the full report.",
    "Superficial synonym-swapping while keeping sentence structure is still plagiarism.",
    "For academic work, free online checkers are a preview — universities use Turnitin and iThenticate.",
    "The real fix is research habits: write in your own words from the start, not from copy-pasted notes.",
  ],
};

// ─── Category styling ─────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { pill: string }> = {
  Security: { pill: "bg-red-100 text-red-700" },
  Developer: { pill: "bg-indigo-100 text-indigo-700" },
  Writing: { pill: "bg-purple-100 text-purple-700" },
  "Social Media": { pill: "bg-pink-100 text-pink-700" },
  Finance: { pill: "bg-emerald-100 text-emerald-700" },
  "Web Performance": { pill: "bg-blue-100 text-blue-700" },
  Health: { pill: "bg-teal-100 text-teal-700" },
  Business: { pill: "bg-orange-100 text-orange-700" },
  Productivity: { pill: "bg-yellow-100 text-yellow-800" },
  "Content Creation": { pill: "bg-fuchsia-100 text-fuchsia-700" },
  Everyday: { pill: "bg-gray-100 text-gray-700" },
};

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Online Tool Base";

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Online Tool Base Blog`,
    description: post.description,
    keywords: post.tags.join(", "),
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Page (server component) ──────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const PostContent = CONTENT_MAP[slug];
  if (!PostContent) notFound();

  const catStyle = CATEGORY_COLORS[post.category] ?? {
    pill: "bg-gray-100 text-gray-700",
  };
  const takeaways = KEY_TAKEAWAYS[slug] ?? null;
  const postUrl = `${SITE_URL}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: postUrl,
    keywords: post.tags.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className='bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14'>
          {/* Breadcrumb */}
          <nav aria-label='Breadcrumb' className='mb-7'>
            <ol className='flex items-center gap-2 text-sm text-slate-400 flex-wrap'>
              <li>
                <Link href='/' className='hover:text-white transition-colors'>
                  Home
                </Link>
              </li>
              <li className='text-slate-600' aria-hidden='true'>
                ›
              </li>
              <li>
                <a href='/blog' className='hover:text-white transition-colors'>
                  Blog
                </a>
              </li>
              <li className='text-slate-600' aria-hidden='true'>
                ›
              </li>
              <li className='text-slate-300 font-medium truncate max-w-xs'>
                {post.category}
              </li>
            </ol>
          </nav>

          {/* Category + reading time pills */}
          <div className='flex flex-wrap items-center gap-2.5 mb-5'>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${catStyle.pill}`}
            >
              {post.category}
            </span>
            <span className='flex items-center gap-1.5 text-xs text-slate-400'>
              <svg
                className='w-3.5 h-3.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight max-w-3xl mb-5'>
            {post.title}
          </h1>

          {/* Description */}
          <p className='text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-9'>
            {post.description}
          </p>

          {/* Author / date bar */}
          <div className='flex flex-wrap items-center gap-x-5 gap-y-3 pt-6 border-t border-slate-700'>
            {/* Avatar + name */}
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-black select-none'>
                OT
              </div>
              <div>
                <p className='text-sm font-semibold text-white leading-none'>
                  {SITE_NAME}
                </p>
                <p className='text-xs text-slate-400 mt-0.5'>Editorial Team</p>
              </div>
            </div>
            {/* Date */}
            <div className='flex items-center gap-1.5 text-sm text-slate-400'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            {/* Updated */}
            {post.updatedAt && (
              <div className='flex items-center gap-1.5 text-sm text-slate-400'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                  />
                </svg>
                <span>Updated {formatDate(post.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <div className='bg-slate-50 min-h-screen'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          {/* Two-column grid: article (left) + sidebar (right) */}
          <div className='lg:grid lg:grid-cols-[1fr_300px] lg:gap-12 xl:gap-16'>
            {/* ── ARTICLE COLUMN ─────────────────────────────────────────── */}
            <div className='min-w-0'>
              {/* Key Takeaways */}
              {takeaways && (
                <div className='mb-8 rounded-2xl overflow-hidden border border-indigo-200 shadow-sm'>
                  <div className='bg-indigo-600 px-6 py-3.5 flex items-center gap-2.5'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='text-sm font-bold text-white tracking-wide uppercase'>
                      Key Takeaways
                    </span>
                  </div>
                  <div className='bg-white px-6 py-5'>
                    <ul className='space-y-3'>
                      {takeaways.map((item, i) => (
                        <li
                          key={i}
                          className='flex items-start gap-3 text-sm text-slate-700 leading-relaxed'
                        >
                          <span className='mt-0.5 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0'>
                            {i + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Article prose */}
              <article
                id='article-body'
                className='
                  bg-white rounded-2xl shadow-sm border border-slate-100
                  px-6 sm:px-10 lg:px-12 py-10 lg:py-12
                  prose prose-slate lg:prose-lg max-w-none
                  prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-100
                  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-800
                  prose-p:text-slate-600 prose-p:leading-[1.85] prose-p:text-[1.05rem]
                  prose-a:text-indigo-600 prose-a:font-medium prose-a:no-underline
                  hover:prose-a:underline hover:prose-a:decoration-indigo-400
                  prose-strong:text-slate-900 prose-strong:font-semibold
                  prose-ul:my-5 prose-ol:my-5
                  prose-li:text-slate-600 prose-li:leading-relaxed prose-li:my-1
                  prose-code:text-indigo-700 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5
                  prose-code:rounded-md prose-code:text-[0.875em] prose-code:font-semibold
                  prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-md
                  prose-pre:text-sm prose-pre:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-indigo-400
                  prose-blockquote:bg-indigo-50/50 prose-blockquote:rounded-r-xl
                  prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:not-italic
                  prose-blockquote:text-slate-700
                  prose-table:text-sm prose-th:bg-slate-50 prose-th:font-semibold
                  prose-tr:border-slate-100
                '
              >
                <PostContent />
              </article>

              {/* Tags */}
              <div className='mt-6 flex flex-wrap gap-2'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-xs bg-white border border-slate-200 text-slate-500 px-3 py-1.5 rounded-full hover:border-indigo-300 hover:text-indigo-600 transition-colors'
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share bar */}
              <div className='mt-7 bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                  <p className='text-sm font-bold text-slate-800'>
                    Found this helpful?
                  </p>
                  <p className='text-xs text-slate-400 mt-0.5'>
                    Share it with someone who&apos;d find it useful.
                  </p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors'
                  >
                    <svg
                      className='w-3.5 h-3.5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                    </svg>
                    Share on X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 bg-[#0A66C2] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors'
                  >
                    <svg
                      className='w-3.5 h-3.5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                    </svg>
                    Share on LinkedIn
                  </a>
                </div>
              </div>

              {/* Related tools CTA */}
              {post.relatedTools.length > 0 && (
                <div className='mt-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-7 shadow-lg'>
                  <div className='flex items-start gap-4 mb-5'>
                    <div className='w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0'>
                      <svg
                        className='w-5 h-5 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 10V3L4 14h7v7l9-11h-7z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className='text-base font-bold text-white mb-1'>
                        Free tools mentioned in this article
                      </h2>
                      <p className='text-indigo-200 text-sm leading-snug'>
                        Works in your browser — no signup, no install required.
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2.5'>
                    {post.relatedTools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className='inline-flex items-center gap-1.5 bg-white text-indigo-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm'
                      >
                        {tool.label}
                        <svg
                          className='w-3.5 h-3.5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2.5}
                            d='M9 5l7 7-7 7'
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Back link */}
              <div className='mt-8 pb-2'>
                <a
                  href='/blog'
                  className='inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition-colors'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                  Back to all articles
                </a>
              </div>
            </div>

            {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
            <aside className='hidden lg:block'>
              {/* Sticky wrapper */}
              <div className='sticky top-6 space-y-5'>
                {/* Scroll-spy TOC — client component */}
                <BlogPostClient postUrl={postUrl} postTitle={post.title} />

                {/* Tools widget */}
                {post.relatedTools.length > 0 && (
                  <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
                    <div className='px-5 py-4 border-b border-slate-100'>
                      <p className='text-[11px] font-black text-slate-400 uppercase tracking-widest'>
                        Free Tools
                      </p>
                    </div>
                    <div className='p-3 space-y-0.5'>
                      {post.relatedTools.map((tool) => (
                        <a
                          key={tool.href}
                          href={tool.href}
                          className='flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-indigo-50 group transition-colors'
                        >
                          <span className='text-sm text-slate-700 group-hover:text-indigo-700 font-medium transition-colors leading-snug'>
                            {tool.label}
                          </span>
                          <svg
                            className='w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors flex-shrink-0 ml-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5l7 7-7 7'
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Promo card */}
                <div className='rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white'>
                  <div className='text-3xl mb-3'>🛠️</div>
                  <h3 className='font-black text-base mb-2 leading-snug'>
                    80+ Free Online Tools
                  </h3>
                  <p className='text-slate-400 text-sm leading-relaxed mb-5'>
                    Calculators, converters, generators and more. No account
                    needed.
                  </p>
                  <a
                    href='/tools'
                    className='block text-center bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors'
                  >
                    Browse All Tools →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
