// src/app/tools/compound-interest-calculator/page.tsx
import type { Metadata } from "next";
import CompoundInterestCalculatorClient from "./CompoundInterestCalculatorClient";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title:
    "Compound Interest Calculator — Free Online Compound Interest Calculator",
  description:
    "Calculate compound interest and see your investment grow over time. Free, instant, no signup required.",
  keywords:
    "compound interest calculator, free compound interest calculator, online compound interest calculator, compound interest calculator free, compound interest calculator online, calculator tool, free online compound interest calculator, best compound interest calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/compound-interest-calculator` },
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
    url: `${SITE_URL}/tools/compound-interest-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Compound Interest Calculator — Free Online Compound Interest Calculator",
    description:
      "Calculate compound interest and see your investment grow over time. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Compound Interest Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Compound Interest Calculator — Free Online Compound Interest Calculator",
    description:
      "Calculate compound interest and see your investment grow over time.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Compound Interest Calculator",
  description:
    "Calculate compound interest and see your investment grow over time.",
  url: `${SITE_URL}/tools/compound-interest-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Compound Interest Calculator",
      item: `${SITE_URL}/tools/compound-interest-calculator`,
    },
  ],
};

export default function CompoundInterestCalculatorPage() {
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

      {/* Breadcrumb */}
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
              href='/tools/category/calculator'
              className='hover:text-indigo-600 transition-colors'
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Compound Interest Calculator
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Compound Interest Calculator — Free Online Compound Interest
          Calculator
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Calculate compound interest and see your investment grow over time.
          Free, instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id='main-content' aria-label='Compound Interest Calculator tool'>
          <CompoundInterestCalculatorClient />
        </main>

        {/* ── Zone G: below tool result — highest value placement ──────── */}
        {/* Sits immediately after the tool, before any editorial content   */}

        <PageEditorial />
              <ToolEngagement toolSlug="compound-interest-calculator" toolName="Compound Interest Calculator" />
      </SidebarAdLayout>
    </>
  );
}
