// src/app/tools/ideal-weight-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const IdealWeightCalculatorClient = dynamic(
  () => import("./IdealWeightCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "ideal-weight-calculator");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator — What Is Your Ideal Body Weight?",
  description:
    "Calculate your ideal body weight using multiple medical formulas (Hamwi, Devine, Robinson, Miller). Compare results. Free.",
  keywords:
    "ideal weight calculator, ideal body weight, healthy weight calculator, ibw calculator, what should i weigh",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/ideal-weight-calculator` },
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
    url: `${SITE_URL}/tools/ideal-weight-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Ideal Weight Calculator — What Is Your Ideal Body Weight?",
    description:
      "Calculate your ideal body weight using multiple medical formulas (Hamwi, Devine, Robinson, Miller). Compare results. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Ideal Weight Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Ideal Weight Calculator — What Is Your Ideal Body Weight?",
    description:
      "Calculate your ideal body weight using multiple medical formulas (Hamwi, Devine, Robinson, Miller). Compare results. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ideal Weight Calculator",
  description:
    "Calculate your ideal body weight using multiple medical formulas (Hamwi, Devine, Robinson, Miller). Compare results. Free.",
  url: `${SITE_URL}/tools/ideal-weight-calculator`,
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
      name: "Ideal Weight Calculator",
      item: `${SITE_URL}/tools/ideal-weight-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Hamwi formula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Hamwi formula was developed in 1964 for clinical nutrition and drug dosing. For men: 48 kg for 5 feet of height, plus 2.7 kg for each additional inch. For women: 45.5 kg for 5 feet, plus 2.27 kg per additional inch. It tends to suggest lower weights for taller individuals. It is one of the most widely used formulas in clinical settings but was never designed as a personal weight goal — it was created to estimate lean body mass for medication dosing.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Devine formula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Devine formula (1974) was created to estimate lean body mass for medication dosing, particularly in pharmacokinetics. For men: 50 kg + 2.3 kg per inch over 5 feet. For women: 45.5 kg + 2.3 kg per inch over 5 feet. It is widely used in clinical medicine and forms the basis of many IBW calculators. Like all IBW formulas, it does not account for body composition — a muscular athlete and a sedentary person of the same height would get the same result.",
      },
    },
    {
      "@type": "Question",
      name: "What is a healthy BMI range?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The World Health Organization (WHO) defines a healthy BMI as 18.5–24.9. BMI is calculated as weight (kg) divided by height in metres squared. The healthy range translates to the weight range shown in this calculator. However, BMI has well-documented limitations: it does not distinguish between fat and muscle mass (athletes often register as 'overweight'), does not account for fat distribution, and may systematically mis-classify certain ethnic groups. It is best used as one data point among several, not as a standalone health measure.",
      },
    },
    {
      "@type": "Question",
      name: "Why do the four formulas give different results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each formula was developed in a different era, for a different clinical purpose, and using different research populations. Hamwi (1964) and Devine (1974) are the oldest and most widely used. Robinson (1983) is a modification of Devine with slightly different coefficients. Miller (1983) was designed to be more accommodating for taller individuals. None were designed as personal weight goals — they were dosing tools. The range across formulas gives a more realistic ideal weight zone than any single formula in isolation.",
      },
    },
    {
      "@type": "Question",
      name: "Should I aim for my ideal weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ideal weight formulas provide a useful reference range, but health is determined by more than a number on a scale. Body composition (ratio of fat to muscle), metabolic health markers (blood pressure, blood glucose, cholesterol), fitness levels, and mental wellbeing all matter as much as or more than absolute weight. A person at the 'ideal' weight with poor fitness and high visceral fat may be less healthy than someone slightly above it with good fitness and health markers. Use ideal weight as one reference point — not a rigid target.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Ideal Weight Calculator",
  description:
    "Step-by-step guide to using the free Ideal Weight Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Ideal Weight Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Ideal Weight Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function IdealWeightCalculatorPage() {
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
            <a href="/" className="hover:text-green-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/health-fitness-calculators"
              className="hover:text-green-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Ideal Weight Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Ideal Weight Calculator — What Is Your Ideal Body Weight?
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Ideal Weight Calculator tool">
          <IdealWeightCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="ideal-weight-calculator"
          toolName="Ideal Weight Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
