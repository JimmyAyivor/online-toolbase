// src/app/tools/acronym-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
const AcronymGeneratorClient = dynamic(
  () => import("./AcronymGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import { tools } from "@/lib/tools";

import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "acronym-generator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Acronym Generator — Free Online Acronym Generator",
  description:
    "Turn any phrase into an acronym instantly. Choose uppercase, lowercase, or dot-separated styles. Free, instant, no signup required.",
  keywords:
    "acronym generator, free acronym generator, online acronym generator, acronym maker, phrase to acronym, abbreviation generator, acronym creator, free online acronym generator, best acronym generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/acronym-generator` },
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
    url: `${SITE_URL}/tools/acronym-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Acronym Generator — Free Online Acronym Generator",
    description:
      "Turn any phrase into an acronym instantly. Choose uppercase, lowercase, or dot-separated styles. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Acronym Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Acronym Generator — Free Online Acronym Generator",
    description: "Turn any phrase into an acronym instantly. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Acronym Generator",
  description:
    "Generate acronyms from any phrase with uppercase, lowercase, or dot-separated formatting.",
  url: `${SITE_URL}/tools/acronym-generator`,
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
      item: `${SITE_URL}/tools/category/writing-text-tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Acronym Generator",
      item: `${SITE_URL}/tools/acronym-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an acronym and how is it different from an abbreviation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An acronym is formed by taking the first letter of each word in a phrase and combining them into a string that represents the whole phrase — for example, NASA (National Aeronautics and Space Administration) or ASAP (As Soon As Possible). An abbreviation is any shortened form of a word or phrase, but it doesn",
      },
    },
    {
      "@type": "Question",
      name: "Should I include articles and prepositions in my phrase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the result you want. For most professional and formal acronyms, small words like",
      },
    },
    {
      "@type": "Question",
      name: "What is the D.O.T. style and when should I use it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The D.O.T. format places a period after each letter — for example, U.S.A., U.K., or N.A.T.O. This style was standard throughout most of the 20th century, especially in American English formal and academic writing. Many style guides (including the Chicago Manual of Style) have moved away from periods in acronyms over the past few decades, and modern usage typically omits them for well-known initialisms. However, the dotted format is still required or preferred in some institutional style guide...",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit to phrase length?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no character or word limit. The tool processes your entire input and extracts the first letter of every word, regardless of how long the phrase is. Very long phrases will produce very long acronyms, which are rarely useful in practice — most effective acronyms are 2–7 letters. If your phrase produces a long result, try removing filler words (articles, prepositions, conjunctions) to shorten it, or consider restructuring the phrase so the key concept words come first and the result is ...",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good acronym?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good acronym has three qualities: memorability, pronounceability, and relevance. Memorability means the letter string is short enough to remember — ideally 3–6 letters. Pronounceability means it can be spoken as a word rather than spelled out letter by letter, which makes it far more likely to be adopted in speech and writing. Relevance means the letters actually stand for the key concepts in the phrase, not just filler words. Some organisations craft their name specifically to produce a go...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this tool for branding and naming?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the tool is widely used for brand and product naming, where the goal is to check whether a long company or product name produces a usable short form. Before committing to a brand name, it",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Acronym Generator",
  description:
    "Step-by-step guide to using the free Acronym Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Acronym Generator",
      text: "Navigate to the Acronym Generator on Calculators, Pdf Tools & More. No signup or download is required — the tool runs entirely in your browser.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your information",
      text: "Fill in the required fields with your data. The Acronym Generator provides instant results as you type or when you click the calculate button.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately — no registration needed.",
    },
  ],
};

export default function AcronymGeneratorPage() {
  if (!tool) {
    return null;
  }

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
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-sky-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/writing-text-tools"
              className="hover:text-sky-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Acronym Generator
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Acronym Generator — Free Online Acronym Generator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Turn any phrase into an acronym instantly. Choose uppercase,
          lowercase, or dot-separated styles. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Acronym Generator tool">
          <AcronymGeneratorClient />
        </main>
        <PageEditorial tool={tool} />
        <ToolEngagement
          toolSlug="acronym-generator"
          toolName="Acronym Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
