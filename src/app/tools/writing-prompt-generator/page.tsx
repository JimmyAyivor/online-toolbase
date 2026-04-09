// src/app/tools/writing-prompt-generator/page.tsx
import type { Metadata } from "next";
import WritingPromptGeneratorClient from "./WritingPromptGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Writing Prompt Generator — 80+ Prompts Across 8 Genres, Free & Instant",
  description:
    "Beat writer's block instantly with a random creative writing prompt. 8 genres — Fiction, Sci-Fi, Horror, Romance, Mystery, Fantasy, Non-Fiction, Poetry — 10 prompts each. No repeat prompts, one-click copy, no signup.",
  keywords:
    "writing prompt generator, creative writing prompts, story ideas generator, fiction writing prompts, poetry prompts, horror prompts, romance story ideas, mystery writing prompts, fantasy prompts, beat writers block",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/writing-prompt-generator` },
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
    url: `${SITE_URL}/tools/writing-prompt-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Writing Prompt Generator — 80+ Prompts Across 8 Genres, Free & Instant",
    description:
      "Beat writer's block with a random creative writing prompt. 8 genres, 80+ unique prompts, no repeats, one-click copy. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Writing Prompt Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Writing Prompt Generator — 80+ Prompts Across 8 Genres, Free & Instant",
    description:
      "Beat writer's block with a random creative writing prompt. 8 genres, 80+ unique prompts, no repeats.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Writing Prompt Generator",
  description:
    "Generate random creative writing prompts across 8 genres — Fiction, Sci-Fi, Horror, Romance, Mystery, Fantasy, Non-Fiction, and Poetry. 80+ unique prompts with no-repeat cycling.",
  url: `${SITE_URL}/tools/writing-prompt-generator`,
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
      name: "Writing Tools",
      item: `${SITE_URL}/tools/category/writing`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Writing Prompt Generator",
      item: `${SITE_URL}/tools/writing-prompt-generator`,
    },
  ],
};

export default function WritingPromptGeneratorPage() {
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
              href="/tools/category/writing"
              className="hover:text-emerald-600 transition-colors"
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Writing Prompt Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Writing Prompt Generator — 80+ Prompts Across 8 Genres, Free & Instant
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Choose a genre and generate a random creative writing prompt — 8
          genres, 80+ unique prompts, no-repeat cycling, one-click copy.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Writing Prompt Generator tool">
          <WritingPromptGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="writing-prompt-generator"
          toolName="Writing Prompt Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
