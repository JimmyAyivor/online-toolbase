// src/app/tools/speed-distance-time-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "speed-distance-time-calculator");
const SpeedDistanceTimeCalculatorClient = dynamic(
  () => import("./SpeedDistanceTimeCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Free Speed Distance Time Calculator — Solve for Any",
  description:
    "Calculate speed, distance, or time using the speed-distance-time formula. Supports mph, km/h, m/s. Free, no signup.",
  keywords:
    "speed distance time calculator, sdt calculator, speed calculator, distance calculator, time calculator, mph calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/speed-distance-time-calculator` },
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
    url: `${SITE_URL}/tools/speed-distance-time-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Speed Distance Time Calculator — Solve for Any",
    description:
      "Calculate speed, distance, or time using the speed-distance-time formula. Supports mph, km/h, m/s. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Speed Distance Time Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Speed Distance Time Calculator — Solve for Any",
    description:
      "Calculate speed, distance, or time using the speed-distance-time formula. Supports mph, km/h, m/s. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Speed Distance Time Calculator",
  description:
    "Calculate speed, distance, or time using the speed-distance-time formula. Supports mph, km/h, m/s. Free, no signup.",
  url: `${SITE_URL}/tools/speed-distance-time-calculator`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
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
      name: "Speed Distance Time Calculator",
      item: `${SITE_URL}/tools/speed-distance-time-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the speed-distance-time formula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The three-part formula is: Speed = Distance ÷ Time, Distance = Speed × Time, Time = Distance ÷ Speed. All three derive from the same relationship. The key is ensuring consistent units — if speed is in mph and distance is in miles, time will be in hours. This tool handles all unit conversions automatically so you don't need to worry about matching units manually.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert between mph and km/h?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multiply mph by 1.60934 to get km/h. Divide km/h by 1.60934 to get mph. Common benchmarks: 30 mph = 48.3 km/h, 60 mph = 96.6 km/h, 100 km/h = 62.1 mph. For a quick mental approximation, multiply mph by 1.6 or divide km/h by 1.6.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for running pace calculations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — enter your distance (e.g. 5 km) and finish time (e.g. 30 minutes) and select Find speed to get your average speed in km/h or mph. For pace in minutes per kilometre or per mile, divide 60 by your speed in km/h (for min/km) or 60 by mph (for min/mile). A running speed of 10 km/h equals a 6 min/km pace.",
      },
    },
    {
      "@type": "Question",
      name: "What is m/s used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Metres per second (m/s) is the SI unit of speed used in science, physics problems, and engineering. Walking pace is roughly 1.4 m/s, sprinting is 10–12 m/s, and highway driving is around 27 m/s. When solving physics problems involving acceleration, force, or kinetic energy, always use m/s and metres to keep units consistent.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculation is mathematically exact — there is no rounding during the computation. Results are displayed to 2 decimal places by default. Unit conversion factors are precise to 6 significant figures (e.g. 1 mile = 1,609.344 metres exactly). The only source of imprecision is the values you enter.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Speed Distance Time Calculator",
  description:
    "Step-by-step guide to using the free Speed Distance Time Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Speed Distance Time Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Speed Distance Time Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function SpeedDistanceTimeCalculatorPage() {
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
              href="/tools/category/calculators"
              className="hover:text-indigo-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Speed Distance Time Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Speed Distance Time Calculator — Free Online Speed Distance Time
          Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate speed, distance, or time using the speed-distance-time
          formula. Supports mph, km/h, m/s. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main
          id="main-content"
          aria-label="Speed Distance Time Calculator tool"
        >
          <SpeedDistanceTimeCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="speed-distance-time-calculator"
          toolName="Speed Distance Time Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
