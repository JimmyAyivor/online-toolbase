// src/app/tools/content-calendar-planner/page.tsx
import type { Metadata } from "next";
import ContentCalendarPlannerClient from "./ContentCalendarPlannerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Content Calendar Planner — Free Online Content Calendar & Scheduling Tool",
  description:
    "Plan and schedule your social media content with a free online content calendar. Add posts by platform, date, and type — view your week at a glance and export your schedule. Free, no signup.",
  keywords:
    "content calendar, content calendar planner, social media content calendar, content scheduling tool, editorial calendar, content planner, social media planner, content strategy tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/content-calendar-planner` },
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
    url: `${SITE_URL}/tools/content-calendar-planner`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Content Calendar Planner — Free Online Content Calendar & Scheduling Tool",
    description:
      "Plan and schedule social media content with a free content calendar. Add posts by platform, date, and type. View by week, export as CSV. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Content Calendar Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Content Calendar Planner — Free Online Content Calendar & Scheduling Tool",
    description:
      "Plan and schedule social media content. Weekly view, CSV export. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Content Calendar Planner",
  description:
    "A browser-based content calendar that allows users to schedule social media posts by selecting a platform (Instagram, TikTok, Twitter/X, LinkedIn, YouTube, Facebook), date, content type (post, story, reel, video, thread, article), and caption. Displays a weekly calendar grid with colour-coded posts per platform. Exports the full schedule as a CSV file. No data is sent to a server.",
  url: `${SITE_URL}/tools/content-calendar-planner`,
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
      name: "Content Calendar Planner",
      item: `${SITE_URL}/tools/content-calendar-planner`,
    },
  ],
};

export default function ContentCalendarPlannerPage() {
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
              href="/tools/category/social-media"
              className="hover:text-indigo-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Content Calendar Planner
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Content Calendar Planner — Free Online Content Calendar &amp;
          Scheduling Tool
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Plan and schedule your social media posts across all platforms —
          weekly calendar view, platform colour coding, and CSV export.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Content Calendar Planner tool">
          <ContentCalendarPlannerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="content-calendar-planner"
          toolName="Content Calendar Planner"
        />
      </SidebarAdLayout>
    </>
  );
}
