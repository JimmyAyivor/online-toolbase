// src/app/tools/slogan-generator/page.tsx
import type { Metadata } from "next";
import SloganGeneratorClient from "./SloganGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Slogan Generator — Brand Taglines & Catchphrases for Any Business",
  description:
    "Generate catchy slogans and taglines for your brand, product, or campaign. Get fun, professional, and bold variants instantly. Free, no signup.",
  keywords:
    "slogan generator, tagline generator, brand slogan, catchphrase generator, business slogan generator, company tagline creator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/slogan-generator` },
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
    url: `${SITE_URL}/tools/slogan-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Slogan Generator — Brand Taglines & Catchphrases",
    description:
      "Generate catchy slogans and taglines for any brand or campaign instantly.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Slogan Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Slogan Generator",
    description: "Generate brand slogans and taglines instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Slogan Generator",
  description:
    "Generate catchy brand slogans and taglines for any business or campaign.",
  url: `${SITE_URL}/tools/slogan-generator`,
  applicationCategory: "BusinessApplication",
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
      name: "Business Tools",
      item: `${SITE_URL}/tools/category/business`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Slogan Generator",
      item: `${SITE_URL}/tools/slogan-generator`,
    },
  ],
};

export default function SloganGeneratorPage() {
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
            <a href="/" className="hover:text-rose-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business"
              className="hover:text-rose-600 transition-colors"
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Slogan Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Slogan Generator — Brand Taglines & Catchphrases
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Generate memorable brand slogans and taglines across fun,
          professional, bold, and inspirational styles — instantly.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Slogan Generator tool">
          <SloganGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="slogan-generator"
          toolName="Slogan Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
