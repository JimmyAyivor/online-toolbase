// src/app/tools/cron-expression-builder/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const CronExpressionBuilderClient = dynamic(
  () => import("./CronExpressionBuilderClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "cron-expression-builder");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Cron Expression Builder — Visual Cron Generator",
  description:
    "Build cron expressions with a visual editor — set minutes, hours, day of month, month, and day of week. Includes presets, plain-English descriptions, and a syntax reference. Free, no signup.",
  keywords:
    "cron expression builder, cron generator, cron job expression, cron syntax, cron validator, cron schedule, cron expression tester, crontab generator, linux cron, scheduled tasks",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/cron-expression-builder` },
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
    url: `${SITE_URL}/tools/cron-expression-builder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Cron Expression Builder — Visual Cron Generator",
    description:
      "Build cron expressions with a visual editor — set each field individually, use presets, and get plain-English schedule descriptions. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Cron Expression Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Cron Expression Builder — Visual Cron Generator",
    description:
      "Build cron job schedules with a visual editor — presets, plain-English descriptions, syntax reference. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cron Expression Builder",
  description:
    "Build and validate cron job schedule expressions using a visual field editor. Supports minute, hour, day-of-month, month, and day-of-week fields with wildcard, step, range, and list syntax. Includes common presets and displays a plain-English description of the schedule.",
  url: `${SITE_URL}/tools/cron-expression-builder`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Cron Expression Builder",
      item: `${SITE_URL}/tools/cron-expression-builder`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a cron expression and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A cron expression is a string of five (or six, with seconds) space-separated fields that defines a recurring schedule for a job or task. The standard five-field format is: minute hour day-of-month month day-of-week. Each field specifies when that component of the schedule is active — for example, 0 9 * * 1 means 'at minute 0 of hour 9, every day of the month, every month, on Monday (day 1)' — i.e., every Monday at 9:00 AM. The cron daemon (crond) on Unix/Linux systems reads a crontab file and executes commands at the times specified by their expressions...",
      },
    },
    {
      "@type": "Question",
      name: "What do the five cron fields mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The five fields in a standard cron expression are, in order: Minute (0–59) — the minute within the hour when the job runs. Hour (0–23) — the hour of the day in 24-hour format. Day of Month (1–31) — the day of the month. Month (1–12, or JAN–DEC) — the month of the year. Day of Week (0–7, or SUN–SAT, where both 0 and 7 represent Sunday) — the day of the week. Each field can contain a specific value, a wildcard (*), a range (1-5), a list (1,3,5), a step value (*/15 or 1-30/5), or a combination...",
      },
    },
    {
      "@type": "Question",
      name: "What do *, /, -, and , mean in cron expressions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cron expressions use four special characters for flexibility. The asterisk (*) means 'every valid value for this field' — * in the minute field means every minute, * in the hour field means every hour. The forward slash (/) defines step values — */15 in the minute field means every 15 minutes (0, 15, 30, 45), and 0-30/5 means every 5 minutes between 0 and 30. The hyphen (-) defines ranges — 1-5 in the day-of-week field means Monday through Friday. The comma (,) creates lists of specific values — 0,15,30,45 in the minute field means at minutes 0, 15, 30, and 45 of each hour...",
      },
    },
    {
      "@type": "Question",
      name: "How do I schedule a job to run every hour? Every day? Every weekday?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common schedule patterns and their cron expressions: Every minute: * * * * * — Every hour (at minute 0): 0 * * * * — Every day at midnight: 0 0 * * * — Every day at 9 AM: 0 9 * * * — Every weekday at 9 AM: 0 9 * * 1-5 — Every Monday: 0 0 * * 1 — Every 15 minutes: */15 * * * * — Every 30 minutes: */30 * * * * — First day of every month at midnight: 0 0 1 * * — Every Sunday at 3 AM: 0 3 * * 0 — Every hour during business hours (9–5 weekdays): 0 9-17 * * 1-5. The presets panel in this tool covers the most common patterns — click any preset to load it and then customise if needed.",
      },
    },
    {
      "@type": "Question",
      name: "Why does cron use UTC and does timezone matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditional Unix cron (crond) runs in the system's local timezone, which is typically set when the server is configured. However, most cloud platforms and modern schedulers run in UTC by default: AWS EventBridge, GitHub Actions, Google Cloud Scheduler, and Heroku Scheduler all use UTC unless you explicitly specify a timezone. If your server is in UTC and your audience is in New York (UTC-5), a cron job set to run at 0 9 * * * will fire at 9:00 AM UTC — which is 4:00 AM New York time. Always check what timezone your scheduler uses...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between crontab, cron daemon, and cloud schedulers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Crontab (cron table) is the configuration file that defines which commands to run on which schedule for a specific user — edited with the crontab -e command on Linux/macOS. The cron daemon (crond) is the background process that runs continuously on the server, reads all users' crontabs, and executes commands at the specified times...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Cron Expression Builder",
  description:
    "Step-by-step guide to using the free Cron Expression Builder on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Cron Expression Builder on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Cron Expression Builder provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function CronExpressionBuilderPage() {
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
              href="/tools/category/developer-tools"
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
              Cron Expression Builder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Cron Expression Builder — Visual Cron Job Generator &amp; Validator,
          Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Build cron job schedules with a visual editor — set each field, use
          presets, and get a plain-English description of when the job will run.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Cron Expression Builder tool">
          <CronExpressionBuilderClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="cron-expression-builder"
          toolName="Cron Expression Builder"
        />
      </SidebarAdLayout>
    </>
  );
}
