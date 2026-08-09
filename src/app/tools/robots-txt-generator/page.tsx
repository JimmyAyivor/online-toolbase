// src/app/tools/robots-txt-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "robots-txt-generator");
const RobotsTxtGeneratorClient = dynamic(
  () => import("./RobotsTxtGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Robots.txt Generator — Free Online Robots.txt Generator",
  description:
    "Generate a valid robots.txt file to control search engine crawler access to your website. Free, instant, no signup required.",
  keywords:
    "robots txt generator, robots.txt generator, generate robots.txt, robots txt file, robots txt creator, free robots txt generator, seo robots txt, crawler control, disallow robots",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/robots-txt-generator` },
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
    url: `${SITE_URL}/tools/robots-txt-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Robots.txt Generator — Free Online Robots.txt Generator",
    description:
      "Generate a valid robots.txt file to control search engine crawler access. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Robots.txt Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Robots.txt Generator — Free Online Robots.txt Generator",
    description:
      "Generate a valid robots.txt file for your site instantly. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Robots.txt Generator",
  description:
    "Generate a valid robots.txt file to control search engine crawler access to your website.",
  url: `${SITE_URL}/tools/robots-txt-generator`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Robots.txt Generator",
      item: `${SITE_URL}/tools/robots-txt-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a robots.txt file and why do I need one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A robots.txt file is a plain text file placed at the root of your domain that tells search engine crawlers and other bots which pages or sections of your site they are allowed or not allowed to access. While it's not mandatory, having a correctly configured robots.txt file is considered a basic SEO best practice. It prevents crawlers from indexing staging pages, admin areas, or duplicate content that could harm your search rankings.",
      },
    },
    {
      "@type": "Question",
      name: "Does robots.txt actually stop bots from accessing my pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It stops well-behaved bots — Googlebot, Bingbot, and most legitimate crawlers follow the Robots Exclusion Protocol by convention. However, malicious bots, scrapers, and some AI training crawlers may ignore your robots.txt entirely. If you need to genuinely prevent access to sensitive pages, use server-side authentication or firewall rules rather than relying on robots.txt alone.",
      },
    },
    {
      "@type": "Question",
      name: "If I disallow a page in robots.txt, will it be removed from Google's index?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not automatically. Blocking a page in robots.txt prevents Google from crawling it, but if the page already has inbound links from other sites, Google may still show it in search results with a 'no information' snippet. To fully de-index a page, use a noindex meta tag (on pages Google can still crawl) or the URL Removal Tool in Google Search Console. Disallowing in robots.txt is not a substitute for the noindex directive.",
      },
    },
    {
      "@type": "Question",
      name: "What does the * wildcard mean in User-agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "User-agent: * means the rule applies to all crawlers that don't have a more specific rule in the file. It acts as a default. You can then add separate blocks for specific bots — for example, blocking all crawlers from /admin with a * rule while allowing Googlebot with a separate Googlebot-specific Allow rule. More specific User-agent blocks always take precedence over the wildcard block.",
      },
    },
    {
      "@type": "Question",
      name: "Should I block AI crawlers like GPTBot and Claude-Web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is a growing debate among website owners. Blocking AI training crawlers prevents your content from being used in training datasets for large language models. OpenAI's GPTBot, Anthropic's Claude-Web, and Common Crawl's CCBot all respect robots.txt. If protecting your content from AI training is important to you — particularly for creative work, journalism, or proprietary research — the 'Block AI crawlers' preset in the tool sets up the relevant disallow rules in one click.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Robots.txt Generator",
  description:
    "Step-by-step guide to using the free Robots.txt Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Robots.txt Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Robots.txt Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function RobotsTxtGeneratorPage() {
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
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Robots.txt Generator
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Robots.txt Generator — Free Online Robots.txt Generator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Build and download a valid robots.txt file — control which crawlers
          can access which paths on your site. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Robots.txt Generator tool">
          <RobotsTxtGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="robots-txt-generator"
          toolName="Robots.txt Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
