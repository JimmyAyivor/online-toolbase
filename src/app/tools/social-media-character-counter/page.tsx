// src/app/tools/social-media-character-counter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "social-media-character-counter");
const SocialMediaCharacterCounterClient = dynamic(
  () => import("./SocialMediaCharacterCounterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Social Media Character Counter — All Platforms",
  description:
    "Count characters for Twitter/X, Instagram, LinkedIn, Facebook, TikTok, YouTube, Pinterest, and Threads — all in one tool. Live progress bar, text analysis stats, and platform-specific tips. Free, no signup.",
  keywords:
    "social media character counter, twitter character counter, instagram caption length, linkedin post limit, tiktok character count, facebook post length, youtube description length, character limit checker",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/social-media-character-counter` },
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
    url: `${SITE_URL}/tools/social-media-character-counter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Social Media Character Counter — All Platforms",
    description:
      "Live character counter for Twitter/X, Instagram, LinkedIn, Facebook, TikTok, YouTube, Pinterest, and Threads. See all-platform overview at a glance. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Social Media Character Counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Social Media Character Counter — All Platforms",
    description:
      "Live character counter for 8 platforms — Twitter/X, Instagram, LinkedIn, TikTok, YouTube, and more. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Social Media Character Counter",
  description:
    "Live character counter for Twitter/X (280), Instagram (2,200), LinkedIn (3,000), Facebook (63,206), TikTok (2,200), YouTube (5,000), Pinterest (500), and Threads (500). Shows remaining characters, progress bar, word count, hashtag count, mention count, URL count, and an all-platform overview panel. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/social-media-character-counter`,
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
      name: "Social Media Character Counter",
      item: `${SITE_URL}/tools/social-media-character-counter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the character limits for each major social media platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Character limits vary significantly across platforms. Twitter/X has a 280-character limit per tweet for standard accounts (X Premium subscribers get extended posts up to 25,000 characters). Instagram captions allow up to 2,200 characters, though only the first 125 are visible before a 'more' truncation. LinkedIn posts allow 3,000 characters, with the first 210 visible in the feed. Facebook posts technically allow up to 63,206 characters, though posts over 480 characters are truncated in the feed. TikTok captions allow 2,200 characters with the first 100 visible...",
      },
    },
    {
      "@type": "Question",
      name: "Do URLs count toward the Twitter/X character limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — but in a specific way. Twitter/X automatically wraps all URLs in its own t.co shortener, and any URL (regardless of its original length) counts as exactly 23 characters toward the 280-character limit. This means a long URL like https://www.example.com/very-long-path/with/many/segments counts the same as a short https://t.co/abc — both count as 23 characters. This is handled automatically by Twitter/X when you post, but it's important to account for when drafting posts in external tools like this counter...",
      },
    },
    {
      "@type": "Question",
      name: "How many characters does an emoji use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Emoji character counts depend on the platform and the specific emoji. On most social platforms, emojis count as 2 characters because they use Unicode code points outside the standard ASCII range. Some newer or more complex emojis (compound emojis using zero-width joiners, such as family emojis) can count as 4–8 characters because they're constructed from multiple Unicode code points joined together. The safe assumption for caption planning is 2 characters per emoji on most platforms. Twitter/X counts emojis as 2 characters each. Instagram and LinkedIn use similar counting...",
      },
    },
    {
      "@type": "Question",
      name: "What is the 'truncation point' and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The truncation point is the number of characters after which a platform hides the rest of your post behind a 'more', 'see more', or '…more' link in the feed. Users have to tap or click to expand and read the full post. The truncation point varies by platform: Instagram shows the first 125 characters before a 'more' link; LinkedIn shows the first 210 characters before 'see more'; Facebook shows roughly the first 480 characters; TikTok shows approximately the first 100 characters...",
      },
    },
    {
      "@type": "Question",
      name: "What is the optimal post length for social media engagement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Optimal post length varies by platform and content type. For Twitter/X, posts between 71–100 characters receive highest average engagement according to multiple studies, though threads (multiple connected tweets) perform well for long-form content. For LinkedIn, posts under 1,200 characters tend to have higher engagement rates despite the 3,000-character limit — shorter posts get read fully, while longer posts risk truncation-caused abandonment...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this counter for LinkedIn articles and YouTube descriptions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — this counter works for any text you paste into it. For LinkedIn articles (published through LinkedIn's article editor), the character limit is approximately 125,000 characters — far beyond what this tool focuses on, but you can paste sections of long-form content to check length. For YouTube video descriptions, the 5,000-character limit is tracked in this tool under the YouTube option...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Social Media Character Counter",
  description:
    "Step-by-step guide to using the free Social Media Character Counter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Social Media Character Counter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Social Media Character Counter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function SocialMediaCharacterCounterPage() {
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
            <a href="/" className="hover:text-sky-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media-tools"
              className="hover:text-sky-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Social Media Character Counter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Social Media Character Counter — Check Post Length for Every Platform
          Free
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Live character counter for Twitter/X, Instagram, LinkedIn, Facebook,
          TikTok, YouTube, Pinterest, and Threads — see your remaining
          characters and all-platform overview at a glance.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main
          id="main-content"
          aria-label="Social Media Character Counter tool"
        >
          <SocialMediaCharacterCounterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="social-media-character-counter"
          toolName="social-media Character Counter"
        />
      </SidebarAdLayout>
    </>
  );
}
