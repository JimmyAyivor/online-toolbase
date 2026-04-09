// src/app/tools/business-name-generator/page.tsx
import type { Metadata } from "next";
import BusinessNameGeneratorClient from "./BusinessNameGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Business Name Generator — Company & Brand Name Ideas Instantly",
  description:
    "Generate unique business, company, and brand name ideas for any industry. Get catchy, professional, and creative name suggestions instantly. Free, no signup.",
  keywords:
    "business name generator, company name generator, brand name generator, startup name generator, business name ideas, brand name ideas",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/business-name-generator` },
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
    url: `${SITE_URL}/tools/business-name-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Business Name Generator — Company & Brand Name Ideas",
    description:
      "Generate unique business and brand name ideas for any industry instantly.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Business Name Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Business Name Generator",
    description: "Generate business and brand names for any industry. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Business Name Generator",
  description:
    "Generate unique business and brand name ideas for any industry.",
  url: `${SITE_URL}/tools/business-name-generator`,
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
      name: "Business Name Generator",
      item: `${SITE_URL}/tools/business-name-generator`,
    },
  ],
};

export default function BusinessNameGeneratorPage() {
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
            <a href="/" className="hover:text-violet-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business"
              className="hover:text-violet-600 transition-colors"
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Business Name Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Business Name Generator — Company & Brand Name Ideas Instantly
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Generate creative, catchy, and professional business name ideas for
          any industry — instantly, with multiple naming styles.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Business Name Generator tool">
          <BusinessNameGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="business-name-generator"
          toolName="Business Name Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
