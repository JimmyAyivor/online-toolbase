// src/app/tools/calorie-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const CalorieCalculatorClient = dynamic(
  () => import("./CalorieCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "calorie-calculator");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Calorie Calculator — Daily Calorie Needs (TDEE)",
  description:
    "Calculate your daily calorie needs (TDEE) based on age, weight, height, sex, and activity level. Free, instant, no signup.",
  keywords:
    "calorie calculator, tdee calculator, daily calorie needs, how many calories should i eat, maintenance calories",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/calorie-calculator` },
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
    url: `${SITE_URL}/tools/calorie-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Calorie Calculator — Daily Calorie Needs (TDEE)",
    description:
      "Calculate your daily calorie needs (TDEE) based on age, weight, height, sex, and activity level. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Calorie Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Calorie Calculator — Daily Calorie Needs (TDEE)",
    description:
      "Calculate your daily calorie needs (TDEE) based on age, weight, height, sex, and activity level. Free, instant, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Calorie Calculator",
  description:
    "Calculate your daily calorie needs (TDEE) based on age, weight, height, sex, and activity level. Free, instant, no signup.",
  url: `${SITE_URL}/tools/calorie-calculator`,
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
      name: "Calorie Calculator",
      item: `${SITE_URL}/tools/calorie-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is TDEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day, accounting for your basal metabolic rate (BMR) plus physical activity. BMR is the calories your body needs at complete rest just to maintain organ function. TDEE multiplies BMR by an activity factor to account for movement. Eating exactly at your TDEE maintains your current weight. Eating below it creates a deficit (weight loss); eating above it creates a surplus (weight gain).",
      },
    },
    {
      "@type": "Question",
      name: "Which TDEE formula is most accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator uses the Mifflin-St Jeor formula, which research consistently shows to be the most accurate for most adults. Other formulas include Harris-Benedict (older, slightly less accurate) and Katch-McArdle (more accurate if you know your body fat percentage). All TDEE calculators are estimates — individual metabolism can vary ±15–20% from the calculated figure. The most reliable way to find your actual TDEE is to track your food intake and weight precisely for 2–4 weeks at a consistent intake level.",
      },
    },
    {
      "@type": "Question",
      name: "How do I choose the right activity level?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most people overestimate their activity level. 'Sedentary' is office work with no formal exercise. 'Lightly active' is 1–3 genuine workout sessions per week. 'Moderately active' is 4–5 sessions. 'Very active' is twice-daily training or a physical job plus exercise. 'Extra active' is professional athletic training or a physically demanding job combined with regular training. When in doubt, choose one level lower than you think — you can adjust based on actual weight changes over 2–4 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "How many calories should I eat to lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A deficit of 500 calories per day produces approximately 0.5 kg (1 lb) of fat loss per week — a widely accepted safe rate. A 1,000 cal/day deficit produces roughly 1 kg/week, which is near the upper safe limit for most people. Going below 1,200 cal/day (women) or 1,500 cal/day (men) risks muscle loss, nutrient deficiencies, and metabolic adaptation without medical supervision. The calorie deficit calculator on this site lets you set a weight goal and timeframe to find the appropriate deficit.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to count calories to lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — calorie counting is one tool, not the only path. Many people lose weight successfully through food quality improvements (more whole foods, less ultra-processed food), portion awareness, mindful eating, or time-restricted eating. However, calorie awareness — even approximate — helps most people understand why they are not losing weight when expected. Knowing your TDEE gives you a reference point even if you don't track every meal.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Calorie Calculator",
  description:
    "Step-by-step guide to using the free Calorie Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Calorie Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Calorie Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function CalorieCalculatorPage() {
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
              href="/tools/category/health-fitness-calculators"
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
              Calorie Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Calorie Calculator — Daily Calorie Needs (TDEE)
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Calorie Calculator tool">
          <CalorieCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="calorie-calculator"
          toolName="Calorie Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
