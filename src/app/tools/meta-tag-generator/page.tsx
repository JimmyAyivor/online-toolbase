// src/app/tools/meta-tag-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const MetaTagGeneratorClient = dynamic(
  () => import("./MetaTagGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "meta-tag-generator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Meta Tag Generator — SEO, OG & Twitter Cards",
  description:
    "Generate complete HTML meta tags for SEO, Open Graph (Facebook/LinkedIn), and Twitter Cards. Preview how your page will look when shared. Free, instant, no signup.",
  keywords:
    "meta tag generator, open graph generator, twitter card generator, seo meta tags, og tags generator, meta description generator, html meta tags, social media meta tags, free meta tag tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/meta-tag-generator` },
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
    url: `${SITE_URL}/tools/meta-tag-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Meta Tag Generator — SEO, OG & Twitter Cards",
    description:
      "Generate complete HTML meta tags for SEO, Open Graph, and Twitter Cards. Preview social sharing appearance. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Meta Tag Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Meta Tag Generator — SEO, OG & Twitter Cards",
    description:
      "Generate SEO meta tags, Open Graph tags, and Twitter Cards with a live social share preview. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Meta Tag Generator",
  description:
    "Generate complete HTML meta tags for SEO, Open Graph social sharing (Facebook, LinkedIn), and Twitter Cards. Includes a live preview of how the page will appear when shared on social media.",
  url: `${SITE_URL}/tools/meta-tag-generator`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Meta Tag Generator",
      item: `${SITE_URL}/tools/meta-tag-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are meta tags and why do they matter for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meta tags are snippets of HTML code placed inside the <head> section of a web page. They provide structured information about the page to search engines and social media platforms. The most important meta tags for SEO are the title tag and meta description: the title tag is displayed as the clickable headline in search results and browser tabs, and the meta description is the short summary paragraph shown below the title in search results...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Open Graph tags and Twitter Card tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open Graph (OG) tags were created by Facebook and are now used by most social platforms — including LinkedIn, WhatsApp, Slack, Discord, and iMessage — to generate rich link previews when a URL is shared. Twitter Cards are Twitter's own format for rich link previews within tweets. The two systems overlap significantly: og:title, og:description, og:image, and og:url cover the core data needed by most platforms, while Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image) are specifically for Twitter...",
      },
    },
    {
      "@type": "Question",
      name: "What is the ideal length for a meta title and meta description?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google displays approximately 50–60 characters for a page title in search results before truncating with an ellipsis. Some titles up to 70 characters may display fully depending on the character widths used. Keep titles under 60 characters to avoid truncation. For meta descriptions, Google typically displays 155–160 characters in desktop search results and around 120 characters on mobile. Descriptions up to 160 characters are safe; anything longer is likely to be cut off at a word boundary...",
      },
    },
    {
      "@type": "Question",
      name: "What size should the Open Graph image be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The recommended Open Graph image size is 1200 × 630 pixels with a 1.91:1 aspect ratio. This size is optimised for full-width display in Facebook, LinkedIn, Twitter, and Slack link previews. The image file should ideally be under 8MB for Facebook compatibility, though smaller files (under 1MB as a JPEG or WebP) load faster and are less likely to be cached poorly by social platforms. Twitter's large card format (summary_large_image) uses a 2:1 aspect ratio — a 1200 × 600 image works well across both formats...",
      },
    },
    {
      "@type": "Question",
      name: "What does the robots meta tag do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The robots meta tag tells search engine crawlers how to handle the page. The most common values are: index (allow the page to be included in search results — the default), noindex (exclude the page from search results), follow (allow crawlers to follow links on the page — the default), and nofollow (don't pass link equity through links on this page). You can combine these: index, follow is the default for all pages and doesn't need to be specified explicitly. noindex, follow tells Google not to show the page in results but still follow its links...",
      },
    },
    {
      "@type": "Question",
      name: "Should I add a canonical URL meta tag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The canonical tag (<link rel='canonical'>) is technically not a meta tag but a link element — it tells search engines which URL is the 'master' version of a page when duplicate or near-duplicate content exists at multiple URLs. Common situations that need a canonical: the same page accessible at both www and non-www versions, pages with and without trailing slashes, pages with URL parameters (like ?sort=price or ?utm_source=newsletter), and paginated content...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Meta Tag Generator",
  description:
    "Step-by-step guide to using the free Meta Tag Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Meta Tag Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Meta Tag Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function MetaTagGeneratorPage() {
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
            <a href="/" className="hover:text-teal-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer-tools"
              className="hover:text-teal-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Meta Tag Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Meta Tag Generator — Free SEO Meta Tags, Open Graph &amp; Twitter Card
          Builder
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate SEO meta tags, Open Graph tags, and Twitter Cards with a live
          social sharing preview — free, no account needed.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Meta Tag Generator tool">
          <MetaTagGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="meta-tag-generator"
          toolName="Meta Tag Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
