// src/app/tools/protein-intake-calculator/page.tsx
import type { Metadata } from "next";
import ProteinIntakeCalculatorClient from "./ProteinIntakeCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Protein Intake Calculator — Daily Protein Needs by Weight & Goal",
  description:
    "Calculate your daily protein intake based on body weight, activity level, and fitness goal. Get per-meal targets and food source suggestions. Free, instant, no signup.",
  keywords:
    "protein intake calculator, daily protein needs, how much protein per day, protein calculator, protein for muscle gain, protein for weight loss, protein grams per kg",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/protein-intake-calculator` },
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
    url: `${SITE_URL}/tools/protein-intake-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Protein Intake Calculator — Daily Protein Needs by Weight & Goal",
    description:
      "Find out exactly how much protein you need daily based on your weight, activity, and fitness goal.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Protein Intake Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Protein Intake Calculator — Daily Protein Needs",
    description:
      "Calculate your daily protein target based on weight, activity, and fitness goal. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Protein Intake Calculator",
  description:
    "Calculate daily protein needs based on body weight, activity level, and fitness goal.",
  url: `${SITE_URL}/tools/protein-intake-calculator`,
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
      name: "Protein Intake Calculator",
      item: `${SITE_URL}/tools/protein-intake-calculator`,
    },
  ],
};

export default function ProteinIntakeCalculatorPage() {
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
            <a href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/health"
              className="hover:text-emerald-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Protein Intake Calculator
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Protein Intake Calculator — Daily Protein Needs by Weight & Goal
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Find your optimal daily protein target in grams — based on your
          weight, activity level, and fitness goal — with per-meal breakdowns.
        </p>
      </header>

      <SidebarAdLayout>
        <main id="main-content" aria-label="Protein Intake Calculator tool">
          <ProteinIntakeCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="protein-intake-calculator"
          toolName="Protein Intake Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
