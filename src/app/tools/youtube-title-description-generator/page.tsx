// src/app/tools/youtube-title-description-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find(
  (t) => t.slug === "youtube-title-description-generator",
);
const YouTubeTitleDescriptionGeneratorClient = dynamic(
  () => import("./YouTubeTitleDescriptionGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

// ─── Metadata ─────────────────────────────────────────────────────────────────
// Title: 57 chars — fits Google's ~60 char display limit without truncation
// Previous title was 73 chars and was being truncated in search results
// This page has 997 impressions at position 5 with 0 clicks — CTR is the fix
export const metadata: Metadata = {
  title: "Free YouTube Title & Description Generator — SEO Optimised",
  description:
    "Generate SEO-optimised YouTube titles and descriptions instantly. Choose from 6 title styles — question, how-to, list, challenge and more. Full description with chapters and hashtags included. Free, no signup.",
  keywords:
    "youtube title generator, youtube description generator, youtube SEO, youtube title ideas, youtube video description, youtube metadata, youtube channel growth, video SEO tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: `${SITE_URL}/tools/youtube-title-description-generator`,
  },
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
    url: `${SITE_URL}/tools/youtube-title-description-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free YouTube Title & Description Generator — SEO Optimised",
    description:
      "Generate SEO-optimised YouTube titles and descriptions. 6 title styles, full description with chapters and hashtags. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free YouTube Title & Description Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free YouTube Title & Description Generator — SEO Optimised",
    description:
      "Generate SEO-optimised YouTube titles and descriptions. 6 styles, chapters, hashtags. Free.",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "YouTube Title & Description Generator",
  description:
    "Generates SEO-optimized YouTube video titles in multiple styles (question, how-to, list, secret/insider, challenge, story) and a full video description including opening hook, chapter timestamps, keyword-rich body paragraphs, call to action, hashtags, and links section. Accepts topic, content type, and target audience as inputs. Runs in the browser.",
  url: `${SITE_URL}/tools/youtube-title-description-generator`,
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
      name: "YouTube Title & Description Generator",
      item: `${SITE_URL}/tools/youtube-title-description-generator`,
    },
  ],
};

// FAQPage schema — unlocks FAQ rich results in Google Search
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should a YouTube title be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube titles can be up to 100 characters, but titles are truncated at approximately 60–70 characters in desktop search results and around 50–55 characters on mobile. Keep the most important information — your core topic and primary keyword — within the first 50–55 characters so it is visible before truncation in every context.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a YouTube description be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube descriptions can be up to 5,000 characters. The first 125–150 characters appear in search results before the Show more cutoff, so these opening lines function like a meta description. The full description is indexed by YouTube's search algorithm. Best practice is to include an opening hook, chapter timestamps for longer videos, keyword-rich paragraphs, a call to action, and 3–5 relevant hashtags.",
      },
    },
    {
      "@type": "Question",
      name: "What title style gets the most clicks on YouTube?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Question-format titles create an information gap viewers need to close. Number-led titles set clear expectations. How-to titles capture high-intent search traffic. The highest-CTR titles combine a specific number or timeframe, a strong emotional hook, and a clear outcome — for example '7 Mistakes I Made Building My First SaaS' rather than just 'My SaaS Journey'.",
      },
    },
    {
      "@type": "Question",
      name: "Do YouTube descriptions help with SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — YouTube descriptions are indexed by YouTube's search algorithm and affect how videos rank for search queries. The most important SEO factors are keyword placement in the first 150 characters, natural use of your primary keyword throughout, chapter timestamps, and relevant hashtags. YouTube descriptions are also used by Google to understand video content for Google Search video results.",
      },
    },
    {
      "@type": "Question",
      name: "How many hashtags should I use in a YouTube description?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube displays only the first three hashtags from your description as clickable tags shown below the video title. Best practice is to use 3–5 highly relevant hashtags at the end of your description. Using more than 15 hashtags can trigger YouTube to ignore all hashtags on a video.",
      },
    },
  ],
};

// HowTo schema — targets 'how to use a youtube title generator' searches
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Generate SEO-Optimised YouTube Titles and Descriptions",
  description:
    "Use this free generator to create click-worthy YouTube titles and full descriptions with chapters and hashtags in seconds.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your video topic",
      text: "Type your video's main topic into the topic field. Be specific — 'how to stop procrastinating' generates more targeted titles than just 'productivity'.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select content type and target audience",
      text: "Choose the content type that best matches your video format — tutorial, review, vlog, listicle, or case study. Then enter your target audience to tailor the tone and structure.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose a title style and copy your title",
      text: "The generator produces titles across six proven frameworks: question, how-to, list, secret/insider, challenge, and story. Click Copy next to any title to copy it to your clipboard.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Copy your description and customise it",
      text: "Click Copy Description to copy the full generated description. Paste it into YouTube Studio and update the chapter timestamps, social media links, and hashtags to match your specific video.",
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function YouTubeTitleDescriptionGeneratorPage() {
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
            <a href="/" className="hover:text-red-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media-tools"
              className="hover:text-red-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              YouTube Title &amp; Description Generator
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        {/*
          H1 is now visible on all screen sizes.
          Previously sr-only which hid it from users and weakened
          the heading hierarchy signal for Google.
        */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          YouTube Title &amp; Description Generator
        </h1>
        {/*
          Subtitle now visible on all screen sizes.
          Previously hidden md:block hid it on mobile —
          bad for Google's mobile-first indexing.
        */}
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate SEO-optimised YouTube titles and descriptions — 6 title
          styles, full description with chapters, hashtags, and keyword
          sections. Free, no signup.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main
          id="main-content"
          aria-label="YouTube Title and Description Generator tool"
        >
          <YouTubeTitleDescriptionGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="youtube-title-description-generator"
          toolName="YouTube Title & Description Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
