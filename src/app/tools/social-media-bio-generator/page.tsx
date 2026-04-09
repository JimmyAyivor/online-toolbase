// src/app/tools/social-media-bio-generator/page.tsx
import type { Metadata } from "next";
import SocialMediaBioGeneratorClient from "./SocialMediaBioGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Social Media Bio Generator — Write the Perfect Bio for Instagram, LinkedIn & More",
  description:
    "Generate optimised social media bios for Instagram, LinkedIn, Twitter/X, TikTok, YouTube, and more. Enter your name, profession, keywords, and tone — get a ready-to-use bio with a live character counter. Free, no signup.",
  keywords:
    "social media bio generator, instagram bio generator, linkedin bio generator, twitter bio generator, tiktok bio, youtube about me, profile bio, bio ideas, bio template, free bio generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/social-media-bio-generator` },
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
    url: `${SITE_URL}/tools/social-media-bio-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Social Media Bio Generator — Write the Perfect Bio for Instagram, LinkedIn & More",
    description:
      "Generate ready-to-use bios for Instagram, LinkedIn, Twitter/X, TikTok, and YouTube. Choose platform, tone, and keywords — get a bio with character counter. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Social Media Bio Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Social Media Bio Generator — Write the Perfect Bio for Instagram, LinkedIn & More",
    description:
      "Generate bios for Instagram, LinkedIn, Twitter/X, TikTok, and YouTube. Choose tone and keywords. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Social Media Bio Generator",
  description:
    "Generates optimised social media profile bios for Instagram, LinkedIn, Twitter/X, TikTok, YouTube, and other platforms. User inputs name, profession, keywords, tone (professional, casual, funny, inspirational), and platform — tool outputs a ready-to-use bio with a live character counter matched to each platform's limit. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/social-media-bio-generator`,
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
      name: "Social Media Bio Generator",
      item: `${SITE_URL}/tools/social-media-bio-generator`,
    },
  ],
};

export default function SocialMediaBioGeneratorPage() {
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
            <a href='/' className='hover:text-amber-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/social-media'
              className='hover:text-amber-600 transition-colors'
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Social Media Bio Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1'>
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Social Media Bio Generator — Write the Perfect Bio for Instagram,
          LinkedIn &amp; More
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Generate a ready-to-use bio for Instagram, LinkedIn, Twitter/X,
          TikTok, or YouTube — choose your platform, tone, and keywords and get
          a bio with a live character counter.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Social Media Bio Generator tool'>
          <SocialMediaBioGeneratorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="social-media-bio-generator" toolName="social-media Bio Generator" />
      </SidebarAdLayout>
    </>
  );
}
