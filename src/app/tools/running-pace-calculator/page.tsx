// src/app/tools/running-pace-calculator/page.tsx
import type { Metadata } from "next";
import RunningPaceCalculatorClient from "./RunningPaceCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Running Pace Calculator — Pace, Time & Distance for Any Race",
  description:
    "Calculate your running pace, finish time, or distance for any race or training run. Supports miles and kilometres with split tables. Free, instant, no signup.",
  keywords:
    "running pace calculator, race pace calculator, marathon pace calculator, 5k pace calculator, min per mile, min per km, running time calculator, split pace calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/running-pace-calculator` },
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
    url: `${SITE_URL}/tools/running-pace-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Running Pace Calculator — Pace, Time & Distance for Any Race",
    description:
      "Calculate running pace, finish time, or distance. Miles and km, with per-mile/km split tables.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Running Pace Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Running Pace Calculator",
    description: "Calculate pace, time, or distance for any run or race. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Running Pace Calculator",
  description:
    "Calculate running pace, finish time, or distance. Supports miles and kilometres with split tables.",
  url: `${SITE_URL}/tools/running-pace-calculator`,
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
      name: "Running Pace Calculator",
      item: `${SITE_URL}/tools/running-pace-calculator`,
    },
  ],
};

export default function RunningPaceCalculatorPage() {
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
            <a href='/' className='hover:text-orange-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/health'
              className='hover:text-orange-600 transition-colors'
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Running Pace Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-orange-600 uppercase tracking-widest mb-1'>
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Running Pace Calculator — Pace, Time & Distance for Any Race
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Calculate your running pace, race finish time, or distance — with
          per-mile and per-km splits for any distance.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Running Pace Calculator tool'>
          <RunningPaceCalculatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="running-pace-calculator" toolName="Running Pace Calculator" />
      </SidebarAdLayout>
    </>
  );
}
