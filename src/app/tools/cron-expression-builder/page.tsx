// src/app/tools/cron-expression-builder/page.tsx
import type { Metadata } from "next";
import CronExpressionBuilderClient from "./CronExpressionBuilderClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Cron Expression Builder — Visual Cron Job Generator & Validator, Free Online",
  description:
    "Build cron expressions with a visual editor — set minutes, hours, day of month, month, and day of week. Includes presets, plain-English descriptions, and a syntax reference. Free, no signup.",
  keywords:
    "cron expression builder, cron generator, cron job expression, cron syntax, cron validator, cron schedule, cron expression tester, crontab generator, linux cron, scheduled tasks",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/cron-expression-builder` },
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
    url: `${SITE_URL}/tools/cron-expression-builder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Cron Expression Builder — Visual Cron Job Generator & Validator, Free Online",
    description:
      "Build cron expressions with a visual editor — set each field individually, use presets, and get plain-English schedule descriptions. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Cron Expression Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Cron Expression Builder — Visual Cron Job Generator & Validator, Free Online",
    description:
      "Build cron job schedules with a visual editor — presets, plain-English descriptions, syntax reference. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cron Expression Builder",
  description:
    "Build and validate cron job schedule expressions using a visual field editor. Supports minute, hour, day-of-month, month, and day-of-week fields with wildcard, step, range, and list syntax. Includes common presets and displays a plain-English description of the schedule.",
  url: `${SITE_URL}/tools/cron-expression-builder`,
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
      name: "Cron Expression Builder",
      item: `${SITE_URL}/tools/cron-expression-builder`,
    },
  ],
};

export default function CronExpressionBuilderPage() {
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
              Cron Expression Builder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Cron Expression Builder — Visual Cron Job Generator &amp; Validator,
          Free Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Build cron job schedules with a visual editor — set each field, use
          presets, and get a plain-English description of when the job will run.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Cron Expression Builder tool">
          <CronExpressionBuilderClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="cron-expression-builder"
          toolName="Cron Expression Builder"
        />
      </SidebarAdLayout>
    </>
  );
}
