// src/app/tools/open-graph-preview/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const OpenGraphPreviewClient = dynamic(
  () => import("./OpenGraphPreviewClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "open-graph-preview");

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Open Graph Preview — Free Online Open Graph Preview Tool",
  description:
    "Preview how your page looks when shared on Twitter, Facebook, and LinkedIn. Generate og meta tags instantly. Free, no signup required.",
  keywords:
    "open graph preview, og preview tool, social media preview, open graph checker, og tag generator, twitter card preview, facebook share preview, meta tag preview, free og preview",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/open-graph-preview` },
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
    url: `${SITE_URL}/tools/open-graph-preview`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Open Graph Preview — Free Online Open Graph Preview Tool",
    description:
      "Preview how your page looks when shared on Twitter, Facebook, and LinkedIn. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Open Graph Preview Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Open Graph Preview — Free Online Open Graph Preview Tool",
    description:
      "Preview social share cards for Twitter, Facebook, and LinkedIn instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Open Graph Preview",
  description:
    "Preview how your page looks when shared on social media. Generate og meta tags.",
  url: `${SITE_URL}/tools/open-graph-preview`,
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
      name: "Open Graph Preview",
      item: `${SITE_URL}/tools/open-graph-preview`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are Open Graph meta tags?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open Graph (OG) tags are HTML meta elements that control how your webpage appears when shared on social platforms. Defined by Facebook in 2010 and since adopted by Twitter, LinkedIn, Slack, iMessage, and most messaging apps, they specify which title, description, and image the platform should display in a link preview card. Without them, platforms make their best guess from your page content — often with poor results.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my image not show in the preview?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The image must be publicly accessible via a full HTTPS URL — it cannot be a local file path or a localhost URL. Social crawlers fetch the image from their servers, so it must be reachable on the public internet. Additionally, ensure your server doesn't block bots with robots.txt or rate limiting. If your image URL is correct and accessible but still not showing, try a CDN-hosted or direct image URL.",
      },
    },
    {
      "@type": "Question",
      name: "What image size should I use for Open Graph?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The widely recommended size is 1200 × 630 pixels at a 1.91:1 aspect ratio. This displays correctly on Facebook, LinkedIn, and as a large Twitter card. For the Twitter 'summary' card type, the image is shown as a square thumbnail, cropped from the centre. Always use a high-resolution image and avoid putting critical text near the edges, as some platforms crop differently.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between summary and summary_large_image on Twitter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The summary card shows a small square thumbnail alongside the title and description, suitable for pages without a strong hero image. The summary_large_image card displays a large banner image above the title and description, which is much more eye-catching in a tweet feed. Use summary_large_image for articles, product pages, or any page with a high-quality 1200×630 image.",
      },
    },
    {
      "@type": "Question",
      name: "After adding OG tags, why does the old preview still show on social platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Social platforms cache link previews aggressively, sometimes for days. After updating your OG tags and deploying, you need to clear the cache using each platform's debug tool: Facebook's Sharing Debugger, Twitter's Card Validator, or LinkedIn's Post Inspector. Paste your URL into the tool and click the option to scrape/re-fetch — the platform will pull the latest version of your page and update the cached preview.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Open Graph Preview",
  description: "Step-by-step guide to using the free Open Graph Preview on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Open Graph Preview on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Open Graph Preview provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function OpenGraphPreviewPage() {
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
              href="/tools/category/developer"
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
              Open Graph Preview
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Open Graph Preview — Free Online Open Graph Preview Tool
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Preview your social share cards for Twitter, Facebook, and LinkedIn —
          and generate the og meta tags to copy into your page. Free, no account
          needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Open Graph Preview tool">
          <OpenGraphPreviewClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="open-graph-preview"
          toolName="Open Graph Preview"
        />
      </SidebarAdLayout>
    </>
  );
}
