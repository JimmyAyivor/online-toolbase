// src/app/tools/running-pace-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "running-pace-calculator");
const RunningPaceCalculatorClient = dynamic(
  () => import("./RunningPaceCalculatorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Running Pace Calculator — Pace, Time & Distance for Any Race",
  description:
    "Calculate your running pace, finish time, or distance for any race or training run. Supports miles and kilometres with split tables. Free, instant, no signup.",
  keywords:
    "running pace calculator, race pace calculator, marathon pace calculator, 5k pace calculator, min per mile, min per km, running time calculator, split pace calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/running-pace-calculator` },
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
    url: `${SITE_URL}/tools/running-pace-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Running Pace Calculator — Pace, Time & Distance for Any Race",
    description:
      "Calculate running pace, finish time, or distance. Miles and km, with per-mile/km split tables.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Running Pace Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Running Pace Calculator",
    description: "Calculate pace, time, or distance for any run or race. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Running Pace Calculator",
  description:
    "Calculate running pace, finish time, or distance. Supports miles and kilometres with split tables.",
  url: `${SITE_URL}/tools/running-pace-calculator`,
  applicationCategory: "HealthApplication",
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
      name: "Health Tools",
      item: `${SITE_URL}/tools/category/health`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Running Pace Calculator",
      item: `${SITE_URL}/tools/running-pace-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is running pace calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pace = Time ÷ Distance. If you run 10 km in 55 minutes, your pace is 55 ÷ 10 = 5:30 per km. In miles: 55 ÷ 6.214 miles = 8:51 per mile. The calculator handles all three directions — find pace, find time, or find distance — and displays results in both imperial and metric units simultaneously.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good running pace for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For beginner runners, any pace that allows you to hold a full conversation is appropriate — typically 10–13 minutes per mile (6:12–8:04 per km). The primary goal in the first 3–6 months of running is building aerobic base and injury resilience, not speed. Pace naturally improves as fitness develops without specifically targeting it.",
      },
    },
    {
      "@type": "Question",
      name: "What paces correspond to common race finish times?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marathon sub-4h: 5:41/km (9:09/mile). Sub-3:30: 4:58/km (8:00/mile). Sub-3h: 4:16/km (6:52/mile). Half sub-2h: 5:41/km (9:09/mile). Sub-1:45: 4:58/km (8:00/mile). 5K sub-30min: 6:00/km (9:39/mile). Sub-25min: 5:00/km (8:03/mile). Sub-20min: 4:00/km (6:26/mile).",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert pace to speed (mph or km/h)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Speed (mph) = 60 ÷ pace (min/mile). A 9:00/mile pace = 60 ÷ 9 = 6.67 mph. Speed (km/h) = 60 ÷ pace (min/km). A 5:30/km pace = 60 ÷ 5.5 = 10.9 km/h. Runners use pace because it maps directly to effort and race strategy, while speed is more useful on treadmills and for comparing to cycling.",
      },
    },
    {
      "@type": "Question",
      name: "What is negative splitting in running?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Negative splitting means running the second half of a race faster than the first. It is the most efficient racing strategy for most distances because it conserves glycogen early, avoids early lactic acid buildup, and allows a strong finish when competitors are fading. For beginner runners, even pacing is a safer and more achievable goal than planned negative splits.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Running Pace Calculator",
  description: "Step-by-step guide to using the free Running Pace Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Running Pace Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Running Pace Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function RunningPaceCalculatorPage() {
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
            <a href="/" className="hover:text-orange-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/health"
              className="hover:text-orange-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Running Pace Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Running Pace Calculator — Pace, Time & Distance for Any Race
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate your running pace, race finish time, or distance — with
          per-mile and per-km splits for any distance.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Running Pace Calculator tool">
          <RunningPaceCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="running-pace-calculator"
          toolName="Running Pace Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
