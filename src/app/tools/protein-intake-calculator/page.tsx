// src/app/tools/protein-intake-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "protein-intake-calculator");
const ProteinIntakeCalculatorClient = dynamic(
  () => import("./ProteinIntakeCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Protein Intake Calculator — Daily Target by Goal",
  description:
    "Calculate your daily protein intake based on body weight, activity level, and fitness goal. Get per-meal targets and food source suggestions. Free, instant, no signup.",
  keywords:
    "protein intake calculator, daily protein needs, how much protein per day, protein calculator, protein for muscle gain, protein for weight loss, protein grams per kg",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/protein-intake-calculator` },
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
    url: `${SITE_URL}/tools/protein-intake-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Protein Intake Calculator — Daily Target by Goal",
    description:
      "Find out exactly how much protein you need daily based on your weight, activity, and fitness goal.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Protein Intake Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Protein Intake Calculator — Daily Target by Goal",
    description:
      "Calculate your daily protein target based on weight, activity, and fitness goal. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Protein Intake Calculator",
  description:
    "Calculate daily protein needs based on body weight, activity level, and fitness goal.",
  url: `${SITE_URL}/tools/protein-intake-calculator`,
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
      name: "Protein Intake Calculator",
      item: `${SITE_URL}/tools/protein-intake-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the RDA for protein and is it enough for athletes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The RDA of 0.8g/kg/day is the minimum needed to prevent deficiency in sedentary adults — it is not optimal for people who exercise. Sports nutrition bodies (ISSN, ACSM) support 1.4–2.2g/kg/day for active individuals, with higher intakes up to 3.1g/kg beneficial during aggressive cutting phases to preserve muscle mass.",
      },
    },
    {
      "@type": "Question",
      name: "Does eating more protein build more muscle indefinitely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Up to approximately 1.6–2.2g/kg/day, additional protein contributes to muscle protein synthesis. Above 2.5g/kg, extra protein provides no further muscle-building benefit — excess amino acids are oxidised for energy. The limiting factors above the threshold are training stimulus and sleep, not protein intake.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best high-protein foods?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Animal sources (complete proteins): chicken breast (~31g/100g), canned tuna (~29g/100g), lean beef (~26g/100g), Greek yoghurt (~10g/100g), eggs (~13g/100g). Plant sources: tempeh (~19g/100g), edamame (~11g/100g), tofu (~8–17g/100g depending on firmness), lentils (~9g/100g cooked), chickpeas (~9g/100g cooked).",
      },
    },
    {
      "@type": "Question",
      name: "Is a high-protein diet safe for kidneys?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In healthy adults without pre-existing kidney disease, research consistently shows that protein intakes up to 2.5g/kg do not cause kidney damage or reduce kidney function. The concern about protein and kidneys originated from studies of patients with existing chronic kidney disease, where protein restriction is sometimes medically appropriate. If you have kidney conditions, consult a nephrologist before significantly increasing protein intake.",
      },
    },
    {
      "@type": "Question",
      name: "How should I spread protein intake across the day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Research supports distributing protein evenly across 3–5 meals rather than consuming most of it in one sitting. Each meal should ideally contain 30–40g of protein, which is the approximate threshold to maximise muscle protein synthesis per meal. A common pattern: 30–40g at breakfast, 30–40g at lunch, 30–40g at dinner, and optional protein-rich snacks pre or post workout.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Protein Intake Calculator",
  description:
    "Step-by-step guide to using the free Protein Intake Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Protein Intake Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Protein Intake Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function ProteinIntakeCalculatorPage() {
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
            <a href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/health-fitness-calculators"
              className="hover:text-emerald-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Protein Intake Calculator
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Protein Intake Calculator — Daily Protein Needs by Weight & Goal
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Find your optimal daily protein target in grams — based on your
          weight, activity level, and fitness goal — with per-meal breakdowns.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Protein Intake Calculator tool">
          <ProteinIntakeCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="protein-intake-calculator"
          toolName="Protein Intake Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
