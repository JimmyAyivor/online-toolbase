// src/app/tools/viral-hook-generator/page.tsx
import type { Metadata } from "next";
import ViralHookGeneratorClient from "./ViralHookGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Viral Hook Generator — Generate Scroll-Stopping Content Hooks Free Online",
  description:
    "Generate viral content hooks across 6 frameworks — curiosity, controversy, story, value, fear, and challenge. Enter your topic and get 5 hooks per type. Copy and use instantly. Free, no signup.",
  keywords:
    "viral hook generator, content hook generator, social media hooks, scroll-stopping hooks, curiosity hook, content writing hooks, LinkedIn hook, TikTok hook, engagement hook",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/viral-hook-generator` },
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
    url: `${SITE_URL}/tools/viral-hook-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Viral Hook Generator — Generate Scroll-Stopping Content Hooks Free Online",
    description:
      "Generate hooks across curiosity, controversy, story, value, fear, and challenge frameworks. Enter your topic, get 5 hooks per type. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Viral Hook Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Viral Hook Generator — Generate Scroll-Stopping Content Hooks Free Online",
    description:
      "Generate hooks in 6 frameworks for any topic. Copy and use. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Viral Hook Generator",
  description:
    "Generates 5 content hook opening lines for a user-supplied topic across 6 hook frameworks: Curiosity (information gap), Controversy (challenge beliefs), Story (personal narrative), Value (immediate usefulness promise), Fear/Warning (common mistake alert), and Challenge (invite action). Templates include variable substitution for topic and a random number. Copy individual hooks with one click.",
  url: `${SITE_URL}/tools/viral-hook-generator`,
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
      name: "Viral Hook Generator",
      item: `${SITE_URL}/tools/viral-hook-generator`,
    },
  ],
};

export default function ViralHookGeneratorPage() {
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
            <a href="/" className="hover:text-purple-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media"
              className="hover:text-purple-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Viral Hook Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Viral Hook Generator — Generate Scroll-Stopping Content Hooks Free
          Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Generate content hooks across curiosity, controversy, story, value,
          fear, and challenge frameworks — enter your topic and get 5
          ready-to-use hooks per type.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Viral Hook Generator tool">
          <ViralHookGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="viral-hook-generator"
          toolName="Viral Hook Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
