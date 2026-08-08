// src/app/tools/sleep-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "sleep-calculator");
const SleepCalculatorClient = dynamic(() => import("./SleepCalculatorClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Sleep Calculator — Best Bedtime by Sleep Cycle",
  description:
    "Find the best time to wake up or go to bed based on 90-minute sleep cycles. Wake feeling refreshed instead of groggy. Free, instant, no signup.",
  keywords:
    "sleep calculator, bedtime calculator, wake up time calculator, sleep cycle calculator, best time to wake up, REM sleep calculator, sleep schedule",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/sleep-calculator` },
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
    url: `${SITE_URL}/tools/sleep-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Sleep Calculator — Best Bedtime by Sleep Cycle",
    description:
      "Find optimal sleep times aligned with 90-minute cycles so you wake feeling refreshed, not groggy.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Sleep Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Sleep Calculator — Best Bedtime by Sleep Cycle",
    description:
      "Find the best time to sleep or wake based on 90-minute sleep cycles. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sleep Calculator",
  description:
    "Calculate the best bedtime or wake-up time based on 90-minute sleep cycles.",
  url: `${SITE_URL}/tools/sleep-calculator`,
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
      name: "Sleep Calculator",
      item: `${SITE_URL}/tools/sleep-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long is a sleep cycle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A complete sleep cycle lasts approximately 90 minutes and progresses through four stages: N1 (light sleep, 5–10 min), N2 (light-medium sleep, 20 min), N3 (deep/slow-wave sleep, 20–40 min), and REM (rapid eye movement sleep, 10–20 min, increasing in later cycles). REM sleep, associated with memory consolidation and dreaming, becomes longer in later cycles — cutting sleep short disproportionately reduces REM.",
      },
    },
    {
      "@type": "Question",
      name: "How many hours of sleep do adults need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CDC and WHO recommend 7–9 hours per night for adults aged 18–64, and 7–8 hours for adults 65+. Teenagers need 8–10 hours; school-age children 9–12 hours. There is meaningful genetic variation — roughly 3% of the population genuinely thrive on 6 hours — but most people who believe they 'do fine on 6 hours' have adapted to chronic sleep deprivation without recognising impaired cognitive performance.",
      },
    },
    {
      "@type": "Question",
      name: "What is sleep inertia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sleep inertia is the groggy, disoriented feeling experienced immediately after waking — especially when woken from deep N3 sleep. It typically lasts 15–60 minutes and is accompanied by reduced cognitive performance and reaction time. Waking at the end of a 90-minute cycle, when sleep is naturally in the lighter N1 or N2 stage, significantly reduces sleep inertia — which is the core principle behind this Sleep Calculator.",
      },
    },
    {
      "@type": "Question",
      name: "Does napping affect night sleep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Short naps of 20–30 minutes improve alertness and performance without significantly affecting night sleep if taken before 3 PM. Naps longer than 30 minutes risk sleep inertia from waking mid-cycle, and can reduce sleep pressure (adenosine buildup) that drives night sleep onset. Avoid napping after 3 PM if you struggle with falling asleep at night.",
      },
    },
    {
      "@type": "Question",
      name: "How does caffeine affect sleep quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Caffeine blocks adenosine receptors, reducing feelings of sleepiness. Its half-life is approximately 5–7 hours, meaning half the caffeine in a 3 PM coffee is still active at 8–10 PM. The general recommendation is to cut off caffeine at least 6 hours before your target bedtime. Sensitivity varies significantly by individual based on the CYP1A2 gene variant — some people metabolise caffeine twice as fast as others.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Sleep Calculator",
  description:
    "Step-by-step guide to using the free Sleep Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Sleep Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Sleep Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function SleepCalculatorPage() {
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
            <a href="/" className="hover:text-violet-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/health-fitness-calculators"
              className="hover:text-violet-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Sleep Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Sleep Calculator — Best Bedtime & Wake-Up Times by Sleep Cycle
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Find optimal bedtimes and wake-up times aligned with 90-minute sleep
          cycles so you always wake at the lightest point of sleep.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Sleep Calculator tool">
          <SleepCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="sleep-calculator"
          toolName="Sleep Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
