// src/app/tools/social-media-audit/page.tsx
import type { Metadata } from "next";
import SocialMediaAuditClient from "./SocialMediaAuditClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Social Media Audit Tool — Free Profile Checklist & Score",
  description:
    "Audit your social media presence with a 22-point checklist across profile basics, content quality, engagement, and strategy. Get an instant score and prioritised action list. Free, no signup.",
  keywords:
    "social media audit, social media checklist, instagram audit, profile audit, social media score, social media strategy, content audit, engagement checklist, social media review",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/social-media-audit` },
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
    url: `${SITE_URL}/tools/social-media-audit`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Social Media Audit Tool — Free Profile Checklist & Score",
    description:
      "22-point social media audit checklist across profile basics, content quality, engagement, and strategy. Get an instant score and see what to fix first. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Social Media Audit Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Social Media Audit Tool — Free Profile Checklist & Score",
    description:
      "22-point social media audit checklist. Instant score and prioritised action list. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Social Media Audit Tool",
  description:
    "A 22-point interactive checklist that audits a social media presence across four categories: Profile Basics (6 items), Content Quality (6 items), Engagement (5 items), and Strategy (6 items). Calculates an overall percentage score with a status label (Getting Started through Social Media Pro), shows completed and remaining counts per category, and provides a progress bar. All state is local — no data is stored.",
  url: `${SITE_URL}/tools/social-media-audit`,
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
      name: "Social Media Tools",
      item: `${SITE_URL}/tools/category/social-media`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Social Media Audit Tool",
      item: `${SITE_URL}/tools/social-media-audit`,
    },
  ],
};

export default function SocialMediaAuditPage() {
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
              href="/tools/category/social-media"
              className="hover:text-violet-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Social Media Audit Tool
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Social Media Audit Tool — Free Profile Checklist &amp; Score
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Work through the 22-point checklist across profile basics, content
          quality, engagement, and strategy — get an instant score and see
          exactly what to fix.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Social Media Audit tool">
          <SocialMediaAuditClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="social-media-audit"
          toolName="social-media Audit Tool"
        />
      </SidebarAdLayout>
    </>
  );
}
