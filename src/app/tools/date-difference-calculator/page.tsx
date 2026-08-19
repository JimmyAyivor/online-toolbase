// src/app/tools/date-difference-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const DateDifferenceCalculatorClient = dynamic(
  () => import("./DateDifferenceCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "date-difference-calculator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Date Difference Calculator — Days Between Dates",
  description:
    "Calculate the exact number of days, weeks, months, years, hours, minutes, workdays, and weekend days between any two dates. Quick presets for common ranges. Free, no signup.",
  keywords:
    "date difference calculator, days between dates, how many days between, date calculator, workdays calculator, days weeks months calculator, date span calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/date-difference-calculator` },
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
    url: `${SITE_URL}/tools/date-difference-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Date Difference Calculator — Days Between Dates",
    description:
      "Calculate days, weeks, months, years, hours, workdays, and weekend days between two dates. Quick presets included. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Date Difference Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Date Difference Calculator — Days Between Dates",
    description:
      "Calculate days, weeks, months, workdays between two dates. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Date Difference Calculator",
  description:
    "Calculates the difference between two dates in multiple units: days, weeks, approximate months, approximate years, hours, minutes, workdays (Mon–Fri), and weekend days (Sat–Sun). Handles reversed date order (showing absolute difference). Includes quick preset buttons for last 30 days, last 90 days, last 365 days, and next 30 days. Runs in the browser.",
  url: `${SITE_URL}/tools/date-difference-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Date Difference Calculator",
      item: `${SITE_URL}/tools/date-difference-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is the date difference calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator finds the exact number of milliseconds between the two dates using JavaScript's Date object, then converts that to the requested units. Days are calculated by dividing milliseconds by 86,400,000 (24×60×60×1000). Weeks are the total days divided by 7 (rounded down). Hours are milliseconds divided by 3,600,000. Minutes are milliseconds divided by 60,000. Workdays are counted by iterating through each day between the two dates and counting only Monday through Friday...",
      },
    },
    {
      "@type": "Question",
      name: "What counts as a workday?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In this calculator, workdays are defined as Monday through Friday — any day that is not Saturday or Sunday. The calculator counts every calendar day between the two dates and excludes Saturdays and Sundays. It does not account for public holidays, bank holidays, or local non-working days, as these vary significantly by country, region, and company. If you need to calculate working days excluding specific holidays (for contractual deadlines, HR calculations, or project planning), you will need to manually subtract the relevant public holidays from the workday count this tool provides.",
      },
    },
    {
      "@type": "Question",
      name: "Why is the month count different from what I expected?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Month counting in date calculations is nuanced because months have different lengths (28, 29, 30, or 31 days) and 'one month later' from January 31st is ambiguous. This calculator uses calendar month counting: it counts how many calendar months have elapsed, taking into account whether the day-of-month in the end date is before or after the day-of-month in the start date. For example, from January 15 to March 10 is 1 month and some days (not 2 full months, because March 10 is before the 15th). From January 15 to March 20 is 2 months (because March 20 is after the 15th)...",
      },
    },
    {
      "@type": "Question",
      name: "Can I calculate the date difference between past or future dates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the calculator accepts any valid dates, including dates in the past and far future. There is no minimum or maximum date restriction. You can calculate the number of days between historical dates (e.g. two dates in the 19th century), or between a date today and a future date (e.g. a deadline or anniversary). If the end date you enter is earlier than the start date, the calculator shows an 'End date is before start date' notice and displays the absolute difference (the same result as if the dates were in the correct order)...",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between calendar days and business days?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Calendar days are the total count of all days between two dates — including weekends and holidays. Business days (or working days) count only Monday–Friday. The difference matters in many contexts: legal and financial contracts often specify business days for deadlines (a '10 business day' deadline starting Monday means the deadline falls on the second Friday, not 10 calendar days later). Employment contracts, notice periods, and regulatory filings often use business days. Project management timelines typically use calendar days for scheduling but business days for resource planning...",
      },
    },
    {
      "@type": "Question",
      name: "Why do the hours and minutes counts seem very large for long date ranges?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hours and minutes are total elapsed units for the entire period, not average hours or minutes per day. A 365-day period contains 8,760 hours (365 × 24) and 525,600 minutes (365 × 24 × 60). These large numbers are correct and can be useful in specific contexts: software systems that work with elapsed time in hours or minutes, rental or billing periods calculated per hour, or simple curiosity about how many minutes since an event. For most human planning contexts, the days and weeks figures are more intuitive...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Date Difference Calculator",
  description:
    "Step-by-step guide to using the free Date Difference Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Date Difference Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Date Difference Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function DateDifferenceCalculatorPage() {
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
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculators"
              className="hover:text-blue-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Date Difference Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Date Difference Calculator — Calculate Days Between Two Dates Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate the exact days, weeks, months, hours, workdays, and weekend
          days between any two dates — with quick presets for common ranges.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Date Difference Calculator tool">
          <DateDifferenceCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="date-difference-calculator"
          toolName="Date Difference Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
