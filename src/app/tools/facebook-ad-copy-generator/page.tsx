// src/app/tools/facebook-ad-copy-generator/page.tsx
import type { Metadata } from "next";
import FacebookAdCopyGeneratorClient from "./FacebookAdCopyGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Facebook Ad Copy Generator — Write High-Converting Facebook Ads Free Online",
  description:
    "Generate Facebook ad copy across multiple frameworks — AIDA, PAS, FAB, social proof, and more. Enter your product, audience, and goal — get multiple headline and body copy variations to test. Free, no signup.",
  keywords:
    "facebook ad copy generator, facebook ads copywriting, ad copy generator, facebook ad headline, AIDA copywriting, PAS framework, facebook ad template, social media ad copy, free ad copy tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/facebook-ad-copy-generator` },
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
    url: `${SITE_URL}/tools/facebook-ad-copy-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Facebook Ad Copy Generator — Write High-Converting Facebook Ads Free Online",
    description:
      "Generate Facebook ad copy using AIDA, PAS, FAB, and other proven frameworks. Multiple variations per framework. Enter product, audience, and objective. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Facebook Ad Copy Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Facebook Ad Copy Generator — Write High-Converting Facebook Ads Free Online",
    description:
      "Generate Facebook ad copy variations using AIDA, PAS, FAB, and more. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Facebook Ad Copy Generator",
  description:
    "Generates Facebook ad copy variations using multiple copywriting frameworks including AIDA (Attention-Interest-Desire-Action), PAS (Problem-Agitate-Solution), FAB (Features-Advantages-Benefits), and social proof formats. User inputs product/service, target audience, and campaign objective — tool outputs multiple headline and body copy variations per framework for A/B testing. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/facebook-ad-copy-generator`,
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
      name: "Facebook Ad Copy Generator",
      item: `${SITE_URL}/tools/facebook-ad-copy-generator`,
    },
  ],
};

export default function FacebookAdCopyGeneratorPage() {
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
            <a href='/' className='hover:text-blue-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/social-media'
              className='hover:text-blue-600 transition-colors'
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Facebook Ad Copy Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1'>
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Facebook Ad Copy Generator — Write High-Converting Facebook Ads Free
          Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Generate multiple Facebook ad copy variations using AIDA, PAS, FAB,
          and other proven copywriting frameworks — enter your product,
          audience, and objective.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Facebook Ad Copy Generator tool'>
          <FacebookAdCopyGeneratorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="facebook-ad-copy-generator" toolName="Facebook Ad Copy Generator" />
      </SidebarAdLayout>
    </>
  );
}
