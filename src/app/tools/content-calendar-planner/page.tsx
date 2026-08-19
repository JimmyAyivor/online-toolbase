// src/app/tools/content-calendar-planner/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const ContentCalendarPlannerClient = dynamic(
  () => import("./ContentCalendarPlannerClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "content-calendar-planner");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Content Calendar Planner — Plan & Schedule Posts",
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
    title: "Free Content Calendar Planner — Plan & Schedule Posts",
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
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Content Calendar Planner — Plan & Schedule Posts",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often should I post on social media?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Optimal posting frequency varies by platform. Instagram performs best with 3–5 feed posts per week plus daily Stories. TikTok rewards higher frequency — 1–3 videos per day is typical for growing accounts, though quality matters more than volume. LinkedIn performs well at 3–5 posts per week; posting more than once per day generally reduces per-post reach. Twitter/X has the highest optimal frequency of any platform — 3–10 tweets per day is normal for active accounts. YouTube rewards consistency over volume — 1–2 videos per week is the standard recommendation for growing channels...",
      },
    },
    {
      "@type": "Question",
      name: "What is a content pillar and how should I structure mine?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A content pillar is a broad topic category that defines the recurring themes of your content. Most social media strategists recommend 3–5 pillars that collectively describe what your account is about. For example, a personal finance creator might use: Educational (explaining money concepts), Inspirational (success stories), and Personal (behind-the-scenes of their financial journey). Content pillars solve the 'what should I post today?' problem — when stuck, cycle through your pillars and generate content in each category...",
      },
    },
    {
      "@type": "Question",
      name: "What is the best time to post on social media?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 'best time to post' varies by platform, audience, and niche — generic advice is less reliable than checking your own account analytics. That said, research-backed general guidelines are: Instagram: Tuesday–Friday, 9 AM–11 AM and 1 PM–3 PM in your audience's local time zone. LinkedIn: Tuesday, Wednesday, and Thursday, 8 AM–10 AM and 5 PM–6 PM (before and after work hours). TikTok: Tuesday–Friday, 9 AM, 12 PM, and 7 PM–9 PM. Twitter/X: weekdays, 8 AM–10 AM and 6 PM–9 PM. YouTube: Thursday–Saturday, 12 PM–4 PM (when people are planning weekend viewing)...",
      },
    },
    {
      "@type": "Question",
      name: "How far in advance should I plan my content calendar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A rolling 2–4 week content calendar is the recommended planning horizon for most creators and small teams. Planning 2 weeks ahead gives enough lead time to create content thoughtfully rather than reactively, while remaining close enough to current events and trends to stay relevant. For larger organisations or campaigns around fixed dates (product launches, seasonal campaigns, events), planning 6–12 weeks ahead is appropriate for those specific items...",
      },
    },
    {
      "@type": "Question",
      name: "How do I repurpose content across platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Content repurposing is creating one piece of core content and adapting it for multiple platforms rather than creating entirely original content for each. A common repurposing workflow starts with a long-form piece (YouTube video or blog post) and cascades down: a 10-minute YouTube video becomes 3–5 short-form clips for TikTok and Instagram Reels, the key points become a Twitter/X thread, the main insight becomes a LinkedIn post with commentary, and quotes from the video become Instagram carousel slides or Stories...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Content Calendar Planner",
  description:
    "Step-by-step guide to using the free Content Calendar Planner on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Content Calendar Planner on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Content Calendar Planner provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
              href="/tools/category/social-media-tools"
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Content Calendar Planner — Free Online Content Calendar &amp;
          Scheduling Tool
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Plan and schedule your social media posts across all platforms —
          weekly calendar view, platform colour coding, and CSV export.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
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
