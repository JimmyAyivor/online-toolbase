// src/app/tools/body-fat-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const BodyFatCalculatorClient = dynamic(
  () => import("./BodyFatCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "body-fat-calculator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Body Fat Calculator — US Navy Method Estimate",
  description:
    "Calculate body fat percentage using the US Navy circumference method. Enter height, weight, waist, neck, and hip measurements — get body fat %, category, lean mass, and fat mass. Metric and imperial. Free, no signup.",
  keywords:
    "body fat calculator, US navy body fat formula, body fat percentage calculator, lean mass calculator, fat mass calculator, body composition calculator, navy method body fat, waist neck height formula",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/body-fat-calculator` },
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
    url: `${SITE_URL}/tools/body-fat-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Body Fat Calculator — US Navy Method Estimate",
    description:
      "Estimate body fat % using the US Navy formula. Enter circumference measurements and weight. Shows body fat %, category, lean mass, and fat mass. Metric and imperial. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Body Fat Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Body Fat Calculator — US Navy Method Estimate",
    description:
      "Estimate body fat % using the US Navy circumference method. Shows lean mass and category. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Body Fat Calculator",
  description:
    "Estimates body fat percentage using the US Navy circumference method (also called the Hodgdon-Beckett formula). Takes height, weight, waist (at navel), and neck (below larynx) measurements for males; adds hip (widest point) for females. Returns body fat percentage, body composition category (Essential Fat, Athletes, Fitness, Average, Obese), lean mass, and fat mass. Supports metric (cm/kg) and imperial (in/lbs) units. Runs in the browser.",
  url: `${SITE_URL}/tools/body-fat-calculator`,
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
      name: "Health Tools",
      item: `${SITE_URL}/tools/category/health`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Body Fat Calculator",
      item: `${SITE_URL}/tools/body-fat-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the US Navy body fat formula work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The US Navy body fat formula (also called the Hodgdon-Beckett formula) estimates body fat percentage from circumference measurements rather than weight alone. For males, it uses height, waist circumference (measured at the navel), and neck circumference (measured just below the larynx). For females, it adds hip circumference (at the widest point). The formula uses logarithms of these measurements to estimate body density, then converts body density to body fat percentage using the Siri equation...",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is this body fat calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The US Navy circumference method is considered a moderately accurate estimation method with typical error margins of ±3–4 percentage points compared to DEXA scan results. This means a calculator result of 18% body fat likely indicates actual body fat is between approximately 14–22%...",
      },
    },
    {
      "@type": "Question",
      name: "How do I take accurate circumference measurements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Measurement accuracy directly affects result accuracy. For waist circumference: measure at the level of the navel, not at the narrowest point of the torso. Keep the tape horizontal, parallel to the floor. Exhale normally and measure at the end of a normal exhale (not sucked in). For neck circumference: measure just below the larynx (Adam's apple for men; the lower part of the throat for women). Keep the tape perpendicular to the neck. For hip circumference (women only): measure at the widest point of the hips and buttocks, typically several inches below the waist...",
      },
    },
    {
      "@type": "Question",
      name: "What is lean body mass and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lean body mass (LBM) is everything in your body that is not fat — including muscle, bone, organs, water, and connective tissue. It is calculated as total body weight minus fat mass. Lean body mass matters because it is the primary driver of your resting metabolic rate (the calories your body burns at rest). More lean mass means a higher metabolism and greater caloric expenditure even without additional exercise...",
      },
    },
    {
      "@type": "Question",
      name: "What is a healthy body fat percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Healthy body fat ranges differ by sex due to physiological differences in essential fat storage. For men: 6–13% is the athletic range, 14–17% is considered fitness level, 18–24% is the typical healthy average for adult men, and 25%+ is considered above healthy range. For women: 14–20% is the athletic range, 21–24% is considered fitness level, 25–31% is the typical healthy average for adult women, and 32%+ is considered above healthy range. Women naturally carry more essential fat than men (approximately 10–13% vs 2–5%) due to hormonal and reproductive factors — this is normal and healthy...",
      },
    },
    {
      "@type": "Question",
      name: "Why is body fat percentage a better measure than BMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI (Body Mass Index) is calculated from height and weight only — it cannot distinguish between muscle mass and fat mass. This makes it a poor indicator of body composition for muscular individuals, who may have a 'overweight' or 'obese' BMI despite having healthy or low body fat levels. Conversely, individuals with low muscle mass and high fat mass (sometimes called 'skinny fat' or metabolically obese normal weight) may have a 'healthy' BMI despite carrying excess body fat...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Body Fat Calculator",
  description:
    "Step-by-step guide to using the free Body Fat Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Body Fat Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Body Fat Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function BodyFatCalculatorPage() {
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
              Body Fat Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Body Fat Calculator — Estimate Body Fat % with the US Navy Method Free
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Estimate your body fat percentage using the US Navy circumference
          method — enter your measurements and get body fat %, lean mass, fat
          mass, and a category rating.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Body Fat Calculator tool">
          <BodyFatCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="body-fat-calculator"
          toolName="Body Fat Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
