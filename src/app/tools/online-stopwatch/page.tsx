// src/app/tools/online-stopwatch/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const OnlineStopwatchClient = dynamic(
  () => import("./OnlineStopwatchClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./Pageeditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "online-stopwatch");

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Online Stopwatch — Free Stopwatch with Lap Timer",
  description:
    "Free online stopwatch with start, stop, reset, and lap timer. No signup, works instantly in any browser.",
  keywords:
    "online stopwatch, stopwatch online, free stopwatch, lap timer, timer stopwatch",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/online-stopwatch` },
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
    url: `${SITE_URL}/tools/online-stopwatch`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Online Stopwatch — Free Stopwatch with Lap Timer",
    description:
      "Free online stopwatch with start, stop, reset, and lap timer. No signup, works instantly in any browser.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Stopwatch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Online Stopwatch — Free Stopwatch with Lap Timer",
    description:
      "Free online stopwatch with start, stop, reset, and lap timer. No signup, works instantly in any browser.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Online Stopwatch",
  description:
    "Free online stopwatch with start, stop, reset, and lap timer. No signup, works instantly in any browser.",
  url: `${SITE_URL}/tools/online-stopwatch`,
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
      name: "Online Stopwatch",
      item: `${SITE_URL}/tools/online-stopwatch`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between a stopwatch and a countdown timer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A stopwatch counts up from zero and measures elapsed time without a predefined limit. A countdown timer counts down from a set duration to zero. Use a stopwatch when you are measuring how long something takes (running a mile, completing a task, timing a presentation). Use a countdown timer when you have a fixed duration to manage (cooking, Pomodoro sessions, exam time limits). Both are available as separate tools here.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is a browser-based stopwatch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This stopwatch uses requestAnimationFrame combined with Date.now() for timing, which is accurate to within a few milliseconds for typical human activity. For scientific measurement or competitive athletics where sub-millisecond accuracy is required, use a certified timing system. For most practical purposes — interval training, cooking, task timing — the browser stopwatch is more than adequate.",
      },
    },
    {
      "@type": "Question",
      name: "What is a lap time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A lap time records both the split time (time for just that lap) and the cumulative time at the point the lap was recorded. In running, each lap split tells you your pace for that segment. In task timing, each lap records how long a specific stage took. The stopwatch highlights the fastest split in green and the slowest in red when two or more laps have been recorded, making it easy to identify outliers.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the stopwatch for interval training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — use the Lap button to mark the end of each work and rest interval. This gives you a complete split record for your session. For example: start the stopwatch, lap at the end of each 30-second sprint, lap at the end of each 30-second rest. You can see every split time individually and identify if your splits are consistent or degrading across the session.",
      },
    },
    {
      "@type": "Question",
      name: "Does the stopwatch pause if I lock my phone screen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mobile browsers typically pause JavaScript execution when the screen locks, which will pause the stopwatch. For uninterrupted mobile timing, keep the screen active or use a native stopwatch app. Desktop browsers generally continue running JavaScript when the window is minimised or when you switch between applications.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Online Stopwatch",
  description: "Step-by-step guide to using the free Online Stopwatch on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Online Stopwatch on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Online Stopwatch provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function OnlineStopwatchPage() {
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
            <a href="/" className="hover:text-cyan-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/productivity"
              className="hover:text-cyan-600 transition-colors"
            >
              Productivity Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Online Stopwatch
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1">
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Online Stopwatch — Free Stopwatch with Lap Timer
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Online Stopwatch tool">
          <OnlineStopwatchClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="online-stopwatch"
          toolName="Online Stopwatch"
        />
      </SidebarAdLayout>
    </>
  );
}
