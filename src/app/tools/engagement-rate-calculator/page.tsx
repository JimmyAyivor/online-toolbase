// src/app/tools/engagement-rate-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const EngagementRateCalculatorClient = dynamic(
  () => import("./EngagementRateCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "engagement-rate-calculator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Engagement Rate Calculator — All Platforms",
  description:
    "Calculate engagement rate by followers, by reach, or by impressions for any social media platform. Enter likes, comments, shares, and follower count — get your ER% with a benchmark rating. Free, no signup.",
  keywords:
    "engagement rate calculator, instagram engagement rate, tiktok engagement rate, social media analytics, influencer engagement rate, ER by followers, ER by reach, engagement benchmark, social media metrics",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/engagement-rate-calculator` },
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
    url: `${SITE_URL}/tools/engagement-rate-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Engagement Rate Calculator — All Platforms",
    description:
      "Calculate engagement rate by followers, reach, or impressions. Enter your metrics, get your ER% with a benchmark comparison. Works for Instagram, TikTok, YouTube, and more. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Engagement Rate Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Engagement Rate Calculator — All Platforms",
    description:
      "Calculate ER by followers, reach, or impressions for any platform. Benchmark your result. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Engagement Rate Calculator",
  description:
    "Calculates social media engagement rate (ER) by followers, by reach, or by impressions using likes, comments, shares, saves, and follower/reach/impression counts. Supports multiple posts, shows per-post breakdown, provides benchmark ratings (low/average/good/excellent) based on platform norms, and works for Instagram, TikTok, YouTube, LinkedIn, Facebook, and Twitter/X. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/engagement-rate-calculator`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
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
      name: "Engagement Rate Calculator",
      item: `${SITE_URL}/tools/engagement-rate-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is engagement rate and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Engagement rate (ER) is a metric that measures the level of interaction an account's content receives relative to its audience size or reach. It is expressed as a percentage and calculated by dividing total engagements (likes, comments, shares, saves, etc.) by a baseline figure — typically follower count or reach — and multiplying by 100. Engagement rate matters because it measures content quality and audience connection far more accurately than raw follower count...",
      },
    },
    {
      "@type": "Question",
      name: "What is a good engagement rate on Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Engagement rate benchmarks on Instagram vary by account size — smaller accounts typically have higher engagement rates than larger ones due to more personal audience connections. For accounts under 10,000 followers, 3–6% is considered good and above 6% is excellent. For accounts between 10,000–100,000 followers, 1.5–3% is average and above 3% is good. For accounts over 100,000 followers, 1–2% is typical and anything above 2% is above average for that scale. The industry average across all account sizes is approximately 1–3% for Instagram...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between ER by followers vs ER by reach vs ER by impressions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These three formulas use different denominators and measure slightly different things. ER by followers (Engagements ÷ Followers × 100) measures how engaged your existing audience is relative to your total follower count — the most commonly used formula for influencer benchmarking and brand comparisons. ER by reach (Engagements ÷ Reach × 100) measures engagement among people who actually saw the content — a more accurate measure of content resonance since it excludes followers who didn't see the post...",
      },
    },
    {
      "@type": "Question",
      name: "Why is TikTok's engagement rate so much higher than Instagram's?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TikTok's higher average engagement rates (often 3–9% vs Instagram's 1–3%) reflect several platform-specific factors. TikTok's For You Page algorithm distributes content primarily to non-followers based on interest signals, meaning a large proportion of a video's views come from engaged users who were algorithmically matched to the content. This produces higher engagement rates relative to follower count because the denominator (followers) is often much smaller than the actual reach...",
      },
    },
    {
      "@type": "Question",
      name: "How do brands use engagement rate when evaluating influencers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brands and agencies use engagement rate as the primary quality signal when evaluating influencer partnerships, alongside follower count and audience demographics. A standard influencer evaluation framework uses engagement rate to distinguish authentic audience connection from inflated follower counts. Influencers with engagement rates significantly below the platform average for their follower tier are often flagged for potentially purchased followers or inactive audiences...",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my engagement rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Engagement rate improvement strategies fall into four categories. Content quality: posts that generate comments typically contain a question, a controversial opinion, a strong emotional reaction, or a call to action. Carousels on Instagram consistently outperform single images for engagement — users who swipe through multiple slides count as higher-quality engagement signals. Timing: posting when your specific audience is most active (visible in each platform's analytics) increases the probability of early engagement, which in turn triggers algorithmic distribution...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Engagement Rate Calculator",
  description:
    "Step-by-step guide to using the free Engagement Rate Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your follower count or reach",
      text: "Input total followers for follower-based ER, or your post reach for reach-based ER.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your engagement numbers",
      text: "Add total likes, comments, shares, and saves for the post or time period you are measuring.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "View your engagement rate",
      text: "See your engagement rate as a percentage with platform benchmarks to compare against.",
    },
  ],
};

export default function EngagementRateCalculatorPage() {
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
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media-tools"
              className="hover:text-emerald-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Engagement Rate Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Engagement Rate Calculator — Calculate Social Media Engagement Rate
          Free
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate engagement rate by followers, reach, or impressions for any
          platform — enter your metrics and get your ER% with a benchmark
          rating.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Engagement Rate Calculator tool">
          <EngagementRateCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="engagement-rate-calculator"
          toolName="Engagement Rate Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
