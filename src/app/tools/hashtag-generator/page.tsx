// src/app/tools/hashtag-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const HashtagGeneratorClient = dynamic(
  () => import("./HashtagGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "hashtag-generator");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Hashtag Generator — Instagram, TikTok & Twitter",
  description:
    "Generate hashtags for Instagram, TikTok, Twitter/X, LinkedIn, and YouTube by topic and niche. Mix high-volume, medium, and niche hashtags, select your set, and copy. Free, no signup.",
  keywords:
    "hashtag generator, instagram hashtags, tiktok hashtags, twitter hashtags, hashtag ideas, hashtag research, niche hashtags, best hashtags, free hashtag generator, hashtags for reach",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/hashtag-generator` },
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
    url: `${SITE_URL}/tools/hashtag-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Hashtag Generator — Instagram, TikTok & Twitter",
    description:
      "Generate hashtag sets for Instagram, TikTok, Twitter/X, LinkedIn, and YouTube by topic and niche. Mix popularity tiers and copy your set. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Hashtag Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Hashtag Generator — Instagram, TikTok & Twitter",
    description:
      "Generate hashtag sets for any topic and niche, mixed by popularity tier. Copy and use instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hashtag Generator",
  description:
    "Generates relevant hashtags by topic, niche, and target platform (Instagram, TikTok, Twitter/X, LinkedIn, YouTube). Organises hashtags by popularity tier (broad, medium, niche), allows individual selection and removal, tracks the platform hashtag limit, and copies the final set. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/hashtag-generator`,
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
      name: "Hashtag Generator",
      item: `${SITE_URL}/tools/hashtag-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do hashtags actually increase reach on Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hashtags on Instagram can increase reach, but their impact has diminished significantly since 2021–2022 when Instagram's algorithm shifted to prioritise interest-based content recommendations over hashtag discovery. That said, hashtags still serve two valuable functions: they place your content in the hashtag's browse feed (where people who follow or search that hashtag can find you), and they signal content category to the algorithm, which can improve interest-based distribution...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between broad, medium, and niche hashtags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hashtag size refers to the number of posts tagged with that hashtag. Broad or high-volume hashtags (over 1 million posts) — such as #fitness, #travel, or #food — have enormous audiences but also enormous competition. Your post enters a feed with millions of others and is quickly buried; new accounts rarely benefit from broad hashtags. Medium hashtags (100,000–1 million posts) offer a balance of audience size and competition. Niche or micro hashtags (under 100,000 posts) have smaller but highly engaged audiences, and your post stays visible in the feed for much longer...",
      },
    },
    {
      "@type": "Question",
      name: "Should I put hashtags in the caption or the first comment on Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both approaches are equally effective from an algorithmic standpoint — Instagram has confirmed that hashtags in the first comment provide the same discovery benefit as hashtags in the caption. The choice comes down to aesthetics and presentation. Many creators prefer putting hashtags in the first comment to keep captions clean and story-focused without a wall of tags at the end. Others include hashtags in the caption but separate them from the main text with several line breaks...",
      },
    },
    {
      "@type": "Question",
      name: "How many hashtags should I use on TikTok?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TikTok's algorithm works differently from Instagram's — TikTok's primary distribution mechanism is interest-based personalisation through its For You Page algorithm, not hashtag browsing. Hashtags on TikTok still influence content categorisation and appear in TikTok's search, but they're less critical to initial distribution than on Instagram. Most TikTok analytics studies suggest that 3–5 targeted, relevant hashtags outperform 20+ generic ones...",
      },
    },
    {
      "@type": "Question",
      name: "Do hashtags work on LinkedIn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — LinkedIn hashtags actively influence content discovery on the platform. LinkedIn indexes hashtags and surfaces content in followers' feeds when they follow or have searched for related hashtags. LinkedIn also uses hashtags as a content categorisation signal, which affects how its algorithm distributes posts to people with relevant professional interests. The recommended count is 3–5 targeted professional hashtags per post...",
      },
    },
    {
      "@type": "Question",
      name: "Why don't the same hashtags work across all platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each platform has a different hashtag culture, algorithm, and discovery mechanism. On Instagram, community-based hashtags (#weddingphotography, #plantparent) build niche audiences. On TikTok, hashtags are more keyword-searchable terms (#recipeideas, #homeworkout). On Twitter/X, hashtags are often tied to trending events, news, and conversations — using evergreen niche hashtags is less impactful than participating in trending conversations. On LinkedIn, hashtags function like professional topic tags...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Hashtag Generator",
  description:
    "Step-by-step guide to using the free Hashtag Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Hashtag Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Hashtag Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function HashtagGeneratorPage() {
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
            <a href="/" className="hover:text-violet-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media-tools"
              className="hover:text-violet-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Hashtag Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Hashtag Generator — Generate Relevant Hashtags for Instagram, TikTok
          &amp; Twitter Free
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate hashtag sets for Instagram, TikTok, Twitter/X, LinkedIn, and
          YouTube — mixed by popularity tier, selectable, and ready to copy.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Hashtag Generator tool">
          <HashtagGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="hashtag-generator"
          toolName="Hashtag Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
