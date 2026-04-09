// src/app/tools/social-media-character-counter/page.tsx
import type { Metadata } from "next";
import SocialMediaCharacterCounterClient from "./SocialMediaCharacterCounterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Social Media Character Counter — Check Post Length for Every Platform Free",
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
    title:
      "Social Media Character Counter — Check Post Length for Every Platform Free",
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
    title:
      "Social Media Character Counter — Check Post Length for Every Platform Free",
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
              href="/tools/category/social-media"
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
        <h1 className="sr-only">
          Social Media Character Counter — Check Post Length for Every Platform
          Free
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Live character counter for Twitter/X, Instagram, LinkedIn, Facebook,
          TikTok, YouTube, Pinterest, and Threads — see your remaining
          characters and all-platform overview at a glance.
        </p>
      </header>
      <SidebarAdLayout>
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
