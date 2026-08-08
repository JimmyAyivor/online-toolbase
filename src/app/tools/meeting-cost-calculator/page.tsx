// src/app/tools/meeting-cost-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const MeetingCostCalculatorClient = dynamic(
  () => import("./MeetingCostCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "meeting-cost-calculator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Meeting Cost Calculator — Real Cost of Meetings",
  description:
    "Calculate the real cost of any meeting based on number of attendees and hourly salaries. Free, instant, no signup.",
  keywords:
    "meeting cost calculator, cost of meetings, meeting calculator, hourly meeting cost, productivity calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/meeting-cost-calculator` },
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
    url: `${SITE_URL}/tools/meeting-cost-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Meeting Cost Calculator — Real Cost of Meetings",
    description:
      "Calculate the real cost of any meeting based on number of attendees and hourly salaries. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Meeting Cost Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Meeting Cost Calculator — Real Cost of Meetings",
    description:
      "Calculate the real cost of any meeting based on number of attendees and hourly salaries. Free, instant, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Meeting Cost Calculator",
  description:
    "Calculate the real cost of any meeting based on number of attendees and hourly salaries. Free, instant, no signup.",
  url: `${SITE_URL}/tools/meeting-cost-calculator`,
  applicationCategory: "UtilitiesApplication",
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
      name: "Productivity Tools",
      item: `${SITE_URL}/tools/category/productivity`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Meeting Cost Calculator",
      item: `${SITE_URL}/tools/meeting-cost-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is meeting cost calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meeting cost is calculated by multiplying the number of attendees by their average hourly salary rate by the duration of the meeting in hours: Cost = Attendees × Hourly Rate × Hours. This represents the direct labour cost — the total wages paid to all attendees for the time they spend in the meeting. It does not include opportunity cost (what they could have produced instead), meeting preparation time, or overhead costs, meaning the true total cost is always higher than this calculator shows.",
      },
    },
    {
      "@type": "Question",
      name: "What is the true cost of a recurring weekly meeting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 1-hour meeting with 8 people at an average of $75/hour costs $600. If that meeting happens every week for a year (52 weeks), the annual labour cost is $31,200 — for one meeting. Most organisations have dozens of recurring meetings. Research from Harvard Business Review has found that a single weekly executive meeting can cost a company over $300,000 per year when all attendees' time costs are accounted for. This calculator lets you input the frequency to see the annual cost directly.",
      },
    },
    {
      "@type": "Question",
      name: "What is the average hourly rate to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The hourly rate field should reflect the average blended salary of all meeting attendees, not just one person. A simple approach: estimate the total annual salary for each attendee, divide by 2,000 working hours to get their hourly rate, then average across all attendees. For a rough benchmark, white-collar knowledge workers in the US often cost $40–$150/hour in direct wages. Add 30–40% for benefits and overhead if you want to estimate fully-loaded cost.",
      },
    },
    {
      "@type": "Question",
      name: "How can I reduce meeting costs without eliminating meetings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most impactful levers are: reduce attendees (only invite decision-makers and people who add direct value — removing one $100/hr person from a 1-hour meeting saves $100 per meeting), shorten duration (30-minute stand-ups often achieve what 60-minute sitting meetings do), and reduce frequency (biweekly instead of weekly halves the annual cost). Replacing status-update meetings with asynchronous tools (Loom, Notion, Slack) can save significant time without losing alignment.",
      },
    },
    {
      "@type": "Question",
      name: "Should I include preparation and follow-up time in the cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a true cost picture, yes. Research suggests that for every hour in a meeting, attendees spend an average of 4–7 minutes preparing and 15–20 minutes following up (notes, action items, catch-up for those who missed it). For a full assessment, multiply this calculator's result by 1.25–1.5 to approximate the total productivity impact including surrounding overhead.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Meeting Cost Calculator",
  description:
    "Step-by-step guide to using the free Meeting Cost Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Meeting Cost Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Meeting Cost Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function MeetingCostCalculatorPage() {
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
            <a href="/" className="hover:text-amber-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business-productivity"
              className="hover:text-amber-600 transition-colors"
            >
              Productivity Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Meeting Cost Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Meeting Cost Calculator — What Does Your Meeting Really Cost?
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Meeting Cost Calculator tool">
          <MeetingCostCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="meeting-cost-calculator"
          toolName="Meeting Cost Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
