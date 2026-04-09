// src/app/tools/open-graph-preview/page.tsx
import type { Metadata } from "next";
import OpenGraphPreviewClient from "./OpenGraphPreviewClient";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Open Graph Preview — Free Online Open Graph Preview Tool",
  description:
    "Preview how your page looks when shared on Twitter, Facebook, and LinkedIn. Generate og meta tags instantly. Free, no signup required.",
  keywords:
    "open graph preview, og preview tool, social media preview, open graph checker, og tag generator, twitter card preview, facebook share preview, meta tag preview, free og preview",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/open-graph-preview` },
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
    url: `${SITE_URL}/tools/open-graph-preview`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Open Graph Preview — Free Online Open Graph Preview Tool",
    description:
      "Preview how your page looks when shared on Twitter, Facebook, and LinkedIn. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Open Graph Preview Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Open Graph Preview — Free Online Open Graph Preview Tool",
    description:
      "Preview social share cards for Twitter, Facebook, and LinkedIn instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Open Graph Preview",
  description:
    "Preview how your page looks when shared on social media. Generate og meta tags.",
  url: `${SITE_URL}/tools/open-graph-preview`,
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
      name: "Open Graph Preview",
      item: `${SITE_URL}/tools/open-graph-preview`,
    },
  ],
};

export default function OpenGraphPreviewPage() {
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
              Open Graph Preview
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Open Graph Preview — Free Online Open Graph Preview Tool
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Preview your social share cards for Twitter, Facebook, and LinkedIn —
          and generate the og meta tags to copy into your page. Free, no account
          needed.
        </p>
      </header>

      <SidebarAdLayout>
        <main id="main-content" aria-label="Open Graph Preview tool">
          <OpenGraphPreviewClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="open-graph-preview"
          toolName="Open Graph Preview"
        />
      </SidebarAdLayout>
    </>
  );
}
