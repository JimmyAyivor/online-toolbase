// src/app/tools/calorie-deficit-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const CalorieDeficitCalculatorClient = dynamic(
  () => import("./CalorieDeficitCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "calorie-deficit-calculator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Calorie Deficit Calculator — Find Your Deficit",
  description:
    "Calculate the calorie deficit needed to reach your weight loss goal by a target date. Includes safe deficit guidelines. Free.",
  keywords:
    "calorie deficit calculator, calorie deficit for weight loss, how many calories to lose weight, weight loss calorie calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/calorie-deficit-calculator` },
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
    url: `${SITE_URL}/tools/calorie-deficit-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Calorie Deficit Calculator — Find Your Deficit",
    description:
      "Calculate the calorie deficit needed to reach your weight loss goal by a target date. Includes safe deficit guidelines. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Calorie Deficit Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Calorie Deficit Calculator — Find Your Deficit",
    description:
      "Calculate the calorie deficit needed to reach your weight loss goal by a target date. Includes safe deficit guidelines. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Calorie Deficit Calculator",
  description:
    "Calculate the calorie deficit needed to reach your weight loss goal by a target date. Includes safe deficit guidelines. Free.",
  url: `${SITE_URL}/tools/calorie-deficit-calculator`,
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
      name: "Calorie Deficit Calculator",
      item: `${SITE_URL}/tools/calorie-deficit-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many calories is 1 lb of fat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One pound of body fat contains approximately 3,500 calories. This means a consistent daily deficit of 500 calories should produce roughly 1 pound of fat loss per week. In practice, the relationship is not perfectly linear — water retention, muscle mass changes, and metabolic adaptation mean weekly weight fluctuations don't always reflect pure fat change. The 3,500 cal/lb figure is a reliable planning estimate over periods of 4+ weeks, even if individual weeks vary.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum safe calorie deficit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most nutrition guidelines consider a deficit of 500–750 calories per day to be safe and sustainable for most healthy adults. A 1,000 calorie/day deficit (approximately 2 lbs/week loss) is near the upper recommended limit. Deficits larger than 1,000 cal/day risk muscle loss (the body breaks down lean tissue for energy), nutritional deficiencies (harder to meet micronutrient needs on very low calories), metabolic slowdown, and weight regain when normal eating resumes. Medical supervision is recommended for deficits above 1,000 cal/day.",
      },
    },
    {
      "@type": "Question",
      name: "What is my TDEE and how do I find it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TDEE (Total Daily Energy Expenditure) is the total calories your body burns per day, including all activity. Use this site's Calorie Calculator to estimate your TDEE based on age, sex, weight, height, and activity level. Alternatively, track your food intake precisely for 2 weeks while your weight stays stable — that intake level is your actual TDEE. The calculator method gives a starting estimate; the tracking method gives your personal true TDEE.",
      },
    },
    {
      "@type": "Question",
      name: "How do I preserve muscle while in a calorie deficit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three key strategies: (1) Keep protein high — aim for 0.7–1g of protein per pound of body weight per day (or 1.6–2.2g per kg). Protein is the primary driver of muscle retention during a deficit. (2) Strength train — resistance exercise signals the body to preserve muscle even when calories are restricted. (3) Don't cut calories too aggressively — a moderate deficit (300–500 cal/day) preserves muscle far better than a severe one. Losing weight slowly (0.5–1% of body weight per week) minimises muscle loss.",
      },
    },
    {
      "@type": "Question",
      name: "Why does weight loss slow down over time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As you lose weight, your TDEE decreases because: (1) you are lighter (less body mass to move and maintain), (2) metabolic adaptation — the body becomes more efficient and burns fewer calories at rest, and (3) non-exercise activity thermogenesis (NEAT) often decreases subconsciously when in a deficit. This is normal and expected. Recalculate your TDEE every 4–6 weeks using your updated weight, and adjust your calorie target accordingly.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Calorie Deficit Calculator",
  description:
    "Step-by-step guide to using the free Calorie Deficit Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Calorie Deficit Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Calorie Deficit Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function CalorieDeficitCalculatorPage() {
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
            <a href="/" className="hover:text-red-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/health-fitness-calculators"
              className="hover:text-red-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Calorie Deficit Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Calorie Deficit Calculator — How Big a Deficit to Lose Weight?
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Calorie Deficit Calculator tool">
          <CalorieDeficitCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="calorie-deficit-calculator"
          toolName="Calorie Deficit Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
