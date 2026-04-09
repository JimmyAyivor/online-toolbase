// src/app/tools/tiktok-hook-generator/page.tsx
import type { Metadata } from "next";
import TiktokHookGeneratorClient from "./TikTokHookGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "TikTok Hook Generator — Generate Scroll-Stopping Opening Lines Free Online",
  description:
    "Generate proven TikTok hooks — curiosity, controversy, challenge, story, and how-to formats — customised to your topic and niche. Copy your favourite and use it as your video's opening line. Free, no signup.",
  keywords:
    "tiktok hook generator, tiktok hooks, scroll-stopping hooks, tiktok opening lines, tiktok video hook, tiktok content creator tools, viral tiktok hook, tiktok caption hook, free tiktok hooks",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/tiktok-hook-generator` },
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
    url: `${SITE_URL}/tools/tiktok-hook-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "TikTok Hook Generator — Generate Scroll-Stopping Opening Lines Free Online",
    description:
      "Generate TikTok hooks across curiosity, controversy, challenge, story, and how-to formats. Enter your topic, get 10 hooks, copy and use. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online TikTok Hook Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "TikTok Hook Generator — Generate Scroll-Stopping Opening Lines Free Online",
    description:
      "Generate TikTok hooks across 5 formats for any topic. Copy your favourite opening line. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TikTok Hook Generator",
  description:
    "Generates TikTok hook opening lines across five categories — curiosity, controversy, challenge, story, and how-to — based on the creator's topic and niche. Shows multiple hook options per category, filterable by type, with one-click copy. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/tiktok-hook-generator`,
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
      name: "TikTok Hook Generator",
      item: `${SITE_URL}/tools/tiktok-hook-generator`,
    },
  ],
};

export default function TiktokHookGeneratorPage() {
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
            <a href="/" className="hover:text-rose-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media"
              className="hover:text-rose-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              TikTok Hook Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          TikTok Hook Generator — Generate Scroll-Stopping Opening Lines Free
          Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Generate scroll-stopping TikTok hook opening lines across curiosity,
          controversy, challenge, story, and how-to formats for any topic.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="TikTok Hook Generator tool">
          <TiktokHookGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="tiktok-hook-generator"
          toolName="TikTok Hook Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
