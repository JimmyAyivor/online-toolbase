// src/app/tools/water-intake-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "water-intake-calculator");
const WaterIntakeCalculatorClient = dynamic(
  () => import("./WaterIntakeCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Water Intake Calculator — Daily Hydration Needs",
  description:
    "Calculate your daily water intake based on body weight, activity level, and climate. Get results in litres and glasses. Free, instant, no signup.",
  keywords:
    "water intake calculator, daily water intake, how much water should I drink, hydration calculator, water needs calculator, drinking water calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/water-intake-calculator` },
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
    url: `${SITE_URL}/tools/water-intake-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Water Intake Calculator — Daily Hydration Needs",
    description:
      "Find your personalised daily water target based on weight, activity, and climate. Litres and glasses.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Water Intake Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Water Intake Calculator — Daily Hydration Needs",
    description:
      "Calculate daily water needs by weight, activity, and climate. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Water Intake Calculator",
  description:
    "Calculate daily water intake needs based on body weight, activity level, and climate.",
  url: `${SITE_URL}/tools/water-intake-calculator`,
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
      name: "Water Intake Calculator",
      item: `${SITE_URL}/tools/water-intake-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much water should I drink per day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The commonly cited '8×8 rule' (8 glasses of 8 oz = 1.9 litres/day) is a useful simplification but not accurate for everyone. The US National Academies recommend approximately 3.7 litres/day total water for men and 2.7 litres/day for women — including water from food. This calculator uses 35 ml per kg of body weight as the medical baseline, then adjusts for activity and climate.",
      },
    },
    {
      "@type": "Question",
      name: "Does coffee and tea count towards hydration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — despite the common myth, caffeinated drinks do contribute to daily fluid intake. Caffeine has a mild diuretic effect, but the fluid in the beverage far outweighs the extra urine produced. Studies show that moderate coffee and tea consumption (up to 4–5 cups per day) contributes positively to daily fluid balance in most people.",
      },
    },
    {
      "@type": "Question",
      name: "What are the signs of dehydration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Early signs: thirst, dark yellow urine, reduced urine frequency, headache, fatigue, and difficulty concentrating. Even mild dehydration of 1–2% body weight impairs athletic performance by 10–20%. Moderate dehydration: dry mouth, dizziness, reduced physical performance. Severe dehydration is a medical emergency. The simplest daily check: urine should be pale straw yellow.",
      },
    },
    {
      "@type": "Question",
      name: "Can you drink too much water?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — hyponatremia (low blood sodium) can result from drinking excessive amounts of water rapidly, which dilutes sodium in the blood. It is rare in healthy people under everyday conditions but can occur in endurance athletes who drink very large amounts of plain water over many hours without replacing electrolytes. Sports drinks containing sodium help prevent hyponatremia during events lasting longer than 2–3 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Do hydration needs change during pregnancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — pregnant women need additional fluid to support increased blood volume, amniotic fluid, and foetal development. The US recommendation increases to approximately 3.0 litres of total water per day during pregnancy. Breastfeeding increases needs further to approximately 3.8 litres/day due to fluid secreted in breast milk. Respond promptly to thirst signals during pregnancy as they are a reliable indicator of increased need.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Water Intake Calculator",
  description:
    "Step-by-step guide to using the free Water Intake Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Water Intake Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Water Intake Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function WaterIntakeCalculatorPage() {
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
              href="/tools/category/health-fitness-calculators"
              className="hover:text-cyan-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Water Intake Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Water Intake Calculator — Daily Hydration Needs by Weight & Activity
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Get your personalised daily water intake target in litres and glasses
          — adjusted for weight, activity, and climate.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Water Intake Calculator tool">
          <WaterIntakeCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="water-intake-calculator"
          toolName="Water Intake Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
