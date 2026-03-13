// src/app/tools/robots-txt-generator/page.tsx
import type { Metadata } from "next";
import RobotsTxtGeneratorClient from "./RobotsTxtGeneratorClient";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

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

export default function RobotsTxtGeneratorPage() {
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
            <a href='/' className='hover:text-indigo-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/developer'
              className='hover:text-indigo-600 transition-colors'
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Robots.txt Generator
            </span>
          </li>
        </ol>
      </nav>

      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Robots.txt Generator — Free Online Robots.txt Generator
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Build and download a valid robots.txt file — control which crawlers
          can access which paths on your site. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout>
        <main id='main-content' aria-label='Robots.txt Generator tool'>
          <RobotsTxtGeneratorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
