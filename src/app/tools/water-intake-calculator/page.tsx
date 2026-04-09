// src/app/tools/water-intake-calculator/page.tsx
import type { Metadata } from "next";
import WaterIntakeCalculatorClient from "./WaterIntakeCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Water Intake Calculator — Daily Hydration Needs by Weight & Activity",
  description:
    "Calculate your daily water intake based on body weight, activity level, and climate. Get results in litres and glasses. Free, instant, no signup.",
  keywords:
    "water intake calculator, daily water intake, how much water should I drink, hydration calculator, water needs calculator, drinking water calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/water-intake-calculator` },
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
    url: `${SITE_URL}/tools/water-intake-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Water Intake Calculator — Daily Hydration Needs by Weight & Activity",
    description:
      "Find your personalised daily water target based on weight, activity, and climate. Litres and glasses.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Water Intake Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Water Intake Calculator",
    description:
      "Calculate daily water needs by weight, activity, and climate. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Water Intake Calculator",
  description:
    "Calculate daily water intake needs based on body weight, activity level, and climate.",
  url: `${SITE_URL}/tools/water-intake-calculator`,
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
      name: "Water Intake Calculator",
      item: `${SITE_URL}/tools/water-intake-calculator`,
    },
  ],
};

export default function WaterIntakeCalculatorPage() {
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
            <a href='/' className='hover:text-cyan-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/health'
              className='hover:text-cyan-600 transition-colors'
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Water Intake Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1'>
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Water Intake Calculator — Daily Hydration Needs by Weight & Activity
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Get your personalised daily water intake target in litres and glasses
          — adjusted for weight, activity, and climate.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Water Intake Calculator tool'>
          <WaterIntakeCalculatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="water-intake-calculator" toolName="Water Intake Calculator" />
      </SidebarAdLayout>
    </>
  );
}
