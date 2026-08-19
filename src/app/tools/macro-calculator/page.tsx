// src/app/tools/macro-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const MacroCalculatorClient = dynamic(() => import("./MacroCalculatorClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "macro-calculator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Macro Calculator — Daily Protein, Carb & Fat Targets",
  description:
    "Calculate your daily macronutrient targets (protein, carbs, fat) based on your TDEE and fitness goal. Free, instant.",
  keywords:
    "macro calculator, macronutrient calculator, protein carb fat calculator, macros for weight loss, daily macro targets",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/macro-calculator` },
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
    url: `${SITE_URL}/tools/macro-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Macro Calculator — Daily Protein, Carb & Fat Targets",
    description:
      "Calculate your daily macronutrient targets (protein, carbs, fat) based on your TDEE and fitness goal. Free, instant.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Macro Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Macro Calculator — Daily Protein, Carb & Fat Targets",
    description:
      "Calculate your daily macronutrient targets (protein, carbs, fat) based on your TDEE and fitness goal. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Macro Calculator",
  description:
    "Calculate your daily macronutrient targets (protein, carbs, fat) based on your TDEE and fitness goal. Free, instant.",
  url: `${SITE_URL}/tools/macro-calculator`,
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
      name: "Macro Calculator",
      item: `${SITE_URL}/tools/macro-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are macronutrients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Macronutrients are the three main categories of nutrients that provide calories: protein (4 cal/g), carbohydrates (4 cal/g), and fat (9 cal/g). Everything you eat contains some combination of these three. 'Counting macros' means tracking the grams of each macronutrient consumed daily to hit targets aligned with your fitness goal — rather than just tracking total calories. This approach provides more nuanced control over body composition (the ratio of muscle to fat) than calorie counting alone.",
      },
    },
    {
      "@type": "Question",
      name: "How much protein do I actually need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For general health, the Recommended Dietary Allowance (RDA) is 0.8g per kg of body weight. For body composition goals — muscle building or fat loss while preserving muscle — research supports 1.6–2.2g per kg (roughly 0.7–1g per pound). Athletes doing high-volume training may benefit from the upper end of this range. Very high protein intakes (above 3g/kg) do not appear to provide additional benefit and are unnecessary. The macro calculator uses evidence-based targets adjusted for your selected goal.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between the macros for weight loss vs muscle gain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For fat loss: the goal is to maintain muscle while losing fat, which requires high protein (to preserve lean tissue), moderate fat (for hormonal health), and lower carbs (to create the calorie deficit). For muscle gain: carbohydrates are prioritised higher because they fuel training performance and support the anabolic processes of muscle protein synthesis. Fat is kept moderate; protein remains high. The calorie total differs significantly — a deficit for fat loss, a surplus for muscle gain.",
      },
    },
    {
      "@type": "Question",
      name: "What is a ketogenic macro split?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A ketogenic (keto) diet typically involves very low carbohydrates (20–50g per day, or under 5–10% of calories), high fat (65–75% of calories), and moderate protein (20–30% of calories). The goal is to induce ketosis — a metabolic state where the body burns fat for fuel instead of glucose. The macro calculator does not have an explicit keto preset, but you can approximate it: select a goal that gives the highest fat percentage, then note that the carbohydrate target would need to be reduced further for true ketosis.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to hit my macros exactly every day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — macro targets are averages over time, not daily requirements that must be hit precisely. Being within ±5g of protein and ±10g of carbs and fat on most days is practically equivalent to hitting targets exactly. Weekly averages matter more than daily perfection. The most important macro to prioritise is protein — getting adequate protein is the most impactful single variable for body composition. Carbs and fat can be more flexible as long as total calories are approximately correct.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Macro Calculator",
  description:
    "Step-by-step guide to using the free Macro Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Macro Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Macro Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function MacroCalculatorPage() {
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
              href="/tools/category/health-fitness-calculators"
              className="hover:text-amber-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Macro Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Macro Calculator — Daily Protein, Carb & Fat Targets
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Macro Calculator tool">
          <MacroCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="macro-calculator"
          toolName="Macro Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
