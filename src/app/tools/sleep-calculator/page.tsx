// src/app/tools/sleep-calculator/page.tsx
import type { Metadata } from "next";
import SleepCalculatorClient from "./SleepCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Sleep Calculator — Best Bedtime & Wake-Up Times by Sleep Cycle",
  description:
    "Find the best time to wake up or go to bed based on 90-minute sleep cycles. Wake feeling refreshed instead of groggy. Free, instant, no signup.",
  keywords:
    "sleep calculator, bedtime calculator, wake up time calculator, sleep cycle calculator, best time to wake up, REM sleep calculator, sleep schedule",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/sleep-calculator` },
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
    url: `${SITE_URL}/tools/sleep-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Sleep Calculator — Best Bedtime & Wake-Up Times by Sleep Cycle",
    description:
      "Find optimal sleep times aligned with 90-minute cycles so you wake feeling refreshed, not groggy.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Sleep Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Sleep Calculator — Best Bedtime by Sleep Cycle",
    description:
      "Find the best time to sleep or wake based on 90-minute sleep cycles. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sleep Calculator",
  description:
    "Calculate the best bedtime or wake-up time based on 90-minute sleep cycles.",
  url: `${SITE_URL}/tools/sleep-calculator`,
  applicationCategory: "HealthApplication",
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
      name: "Health Tools",
      item: `${SITE_URL}/tools/category/health`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Sleep Calculator",
      item: `${SITE_URL}/tools/sleep-calculator`,
    },
  ],
};

export default function SleepCalculatorPage() {
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
            <a href='/' className='hover:text-violet-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/health'
              className='hover:text-violet-600 transition-colors'
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Sleep Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1'>
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Sleep Calculator — Best Bedtime & Wake-Up Times by Sleep Cycle
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Find optimal bedtimes and wake-up times aligned with 90-minute sleep
          cycles so you always wake at the lightest point of sleep.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Sleep Calculator tool'>
          <SleepCalculatorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
