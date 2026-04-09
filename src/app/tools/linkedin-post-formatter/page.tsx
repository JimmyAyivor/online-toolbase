// src/app/tools/linkedin-post-formatter/page.tsx
import type { Metadata } from "next";
import LinkedinPostFormatterClient from "./LinkedInPostFormatterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "LinkedIn Post Formatter — Format, Preview & Copy LinkedIn Posts Free Online",
  description:
    "Format LinkedIn posts with bold, italic, bullet points, and line spacing. Live preview shows how your post will look when published. Add templates, copy formatted text, and check character count. Free, no signup.",
  keywords:
    "linkedin post formatter, linkedin text formatter, bold text linkedin, format linkedin post, linkedin character counter, linkedin post template, linkedin post preview, linkedin formatting tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/linkedin-post-formatter` },
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
    url: `${SITE_URL}/tools/linkedin-post-formatter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "LinkedIn Post Formatter — Format, Preview & Copy LinkedIn Posts Free Online",
    description:
      "Format LinkedIn posts with bold, italic, bullets, and spacing. Live preview shows exactly how your post will look. Choose a template, copy formatted text. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online LinkedIn Post Formatter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "LinkedIn Post Formatter — Format, Preview & Copy LinkedIn Posts Free Online",
    description:
      "Format LinkedIn posts with bold, italic, bullets, and live preview. Copy formatted text. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LinkedIn Post Formatter",
  description:
    "Formats LinkedIn post text with bold, italic, bullet symbols, and line spacing using Unicode characters that display correctly on LinkedIn. Includes a live split-pane preview, post templates (story, tips list, case study, thought leadership), character counter with LinkedIn's 3,000-character limit, and one-click copy. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/linkedin-post-formatter`,
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
      name: "LinkedIn Post Formatter",
      item: `${SITE_URL}/tools/linkedin-post-formatter`,
    },
  ],
};

export default function LinkedinPostFormatterPage() {
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
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media"
              className="hover:text-blue-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              LinkedIn Post Formatter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          LinkedIn Post Formatter — Format, Preview &amp; Copy LinkedIn Posts
          Free Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Format LinkedIn posts with bold, italic, bullets, and spacing — live
          preview shows exactly how your post will render when published.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="LinkedIn Post Formatter tool">
          <LinkedinPostFormatterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="linkedin-post-formatter"
          toolName="LinkedIn Post Formatter"
        />
      </SidebarAdLayout>
    </>
  );
}
