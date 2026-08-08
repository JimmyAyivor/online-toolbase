// src/app/tools/readability-score-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "readability-score-calculator");
const ReadabilityScoreCalculatorClient = dynamic(
  () => import("./ReadabilityScoreCalculatorClient"),
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
  title: "Free Readability Score Calculator — Flesch & More",
  description:
    "Calculate Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog Index, and ARI readability scores for any text. Free, instant, no signup required.",
  keywords:
    "readability score calculator, flesch reading ease, flesch kincaid grade, gunning fog index, readability checker, text readability tool, reading level calculator, free readability score calculator, online readability checker",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/readability-score-calculator` },
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
    url: `${SITE_URL}/tools/readability-score-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Readability Score Calculator — Flesch & More",
    description:
      "Calculate Flesch, Kincaid, Gunning Fog, and ARI readability scores for any text. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Readability Score Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Readability Score Calculator — Flesch & More",
    description:
      "Flesch, Kincaid, Gunning Fog & ARI scores for any text. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Readability Score Calculator",
  description:
    "Calculate Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog Index, and Automated Readability Index scores for any text.",
  url: `${SITE_URL}/tools/readability-score-calculator`,
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Readability Score Calculator",
      item: `${SITE_URL}/tools/readability-score-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Flesch Reading Ease score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Flesch Reading Ease score is a numerical measure of how easy a piece of English text is to read, calculated from sentence length and syllable count per word. The formula is: 206.835 − (1.015 × average words per sentence) − (84.6 × average syllables per word). Scores range from 0 to 100. Scores of 90–100 indicate very easy reading (simple enough for an average 11-year-old), 60–70 indicates standard difficulty (suitable for most adults), and scores below 30 indicate very difficult text (university level and above)...",
      },
    },
    {
      "@type": "Question",
      name: "What is the Flesch-Kincaid Grade Level?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Flesch-Kincaid Grade Level converts the same underlying sentence and syllable measurements into a US school grade level — Grade 5 means the text is readable by an average fifth-grader, Grade 12 means high school senior level, and scores above 12 indicate college-level text. The formula is: (0.39 × average words per sentence) + (11.8 × average syllables per word) − 15.59. For general public communication, most style guides recommend aiming for Grade 6–8...",
      },
    },
    {
      "@type": "Question",
      name: "What is the Gunning Fog Index?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Gunning Fog Index, developed by Robert Gunning in 1952, estimates the years of formal education a reader needs to understand a piece of text on first reading. The formula is: 0.4 × (average words per sentence + percentage of complex words), where complex words are defined as words with three or more syllables. A score of 12 corresponds to a high school senior; scores above 17 are considered impenetrable by most readers...",
      },
    },
    {
      "@type": "Question",
      name: "What is the Automated Readability Index (ARI)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Automated Readability Index (ARI) was developed in 1967 for the US Air Force to assess the readability of technical manuals. Unlike the Flesch and Gunning Fog formulas, which count syllables, the ARI uses character count per word as its primary measure — making it faster to compute in contexts where syllable counting is impractical. The formula is: (4.71 × characters per word) + (0.5 × words per sentence) − 21.43. The result corresponds to a US grade level...",
      },
    },
    {
      "@type": "Question",
      name: "What readability score should I aim for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The right target depends on your audience. For general consumer content — blog posts, website copy, customer emails, marketing materials — aim for a Flesch Reading Ease of 60–70 and a Flesch-Kincaid Grade of 6–8. For internal business communications, Grade 8–10 is generally acceptable. For academic papers, legal documents, and technical writing aimed at professionals, Grade 12–14 is typical and appropriate — lower scores in these contexts might indicate oversimplification...",
      },
    },
    {
      "@type": "Question",
      name: "Why do the four scores sometimes disagree significantly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The four readability formulas measure different aspects of text complexity using different inputs, so they will not always agree. Flesch Reading Ease and Flesch-Kincaid Grade use the same two inputs (sentence length and syllable count per word) but produce inversely-related scales, so they will always be consistent with each other. Gunning Fog weights the percentage of complex words (3+ syllables) more heavily than Flesch, so text with many long technical terms but short sentences will score harder on Fog than on Flesch...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Readability Score Calculator",
  description:
    "Step-by-step guide to using the free Readability Score Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Readability Score Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Readability Score Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function ReadabilityScoreCalculatorPage() {
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
              href="/tools/category/writing-text-tools"
              className="hover:text-orange-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Readability Score Calculator
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Readability Score Calculator — Free Online Readability Score
          Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Paste any text to get Flesch, Kincaid, Gunning Fog, and ARI
          readability scores instantly. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Readability Score Calculator tool">
          <ReadabilityScoreCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="readability-score-calculator"
          toolName="Readability Score Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
