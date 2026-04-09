// src/app/tools/engagement-rate-calculator/page.tsx
import type { Metadata } from "next";
import EngagementRateCalculatorClient from "./EngagementRateCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Engagement Rate Calculator — Calculate Social Media Engagement Rate Free",
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
    title:
      "Engagement Rate Calculator — Calculate Social Media Engagement Rate Free",
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
    title:
      "Engagement Rate Calculator — Calculate Social Media Engagement Rate Free",
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

export default function EngagementRateCalculatorPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label='Breadcrumb' className='max-w-6xl mx-auto px-4 pt-4 pb-2'>
        <ol className='flex items-center gap-2 text-sm text-gray-500'>
          <li>
            <a href='/' className='hover:text-emerald-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/social-media'
              className='hover:text-emerald-600 transition-colors'
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Engagement Rate Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1'>
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Engagement Rate Calculator — Calculate Social Media Engagement Rate
          Free
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Calculate engagement rate by followers, reach, or impressions for any
          platform — enter your metrics and get your ER% with a benchmark
          rating.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Engagement Rate Calculator tool'>
          <EngagementRateCalculatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="engagement-rate-calculator" toolName="Engagement Rate Calculator" />
      </SidebarAdLayout>
    </>
  );
}
