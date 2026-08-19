// src/app/tools/random-name-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "random-name-generator");
const RandomNameGeneratorClient = dynamic(
  () => import("./RandomNameGeneratorClient"),
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
  title: "Random Name Generator — Generate Random Names Free Online",
  description:
    "Generate random first names, last names, or full names by gender and origin. Useful for fiction writing, game characters, testing, and privacy. Generate up to 50 names at once. Free, no signup.",
  keywords:
    "random name generator, random first name, random last name, character name generator, fake name generator, fiction name generator, baby name ideas, random person name",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/random-name-generator` },
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
    url: `${SITE_URL}/tools/random-name-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Random Name Generator — Generate Random Names Free Online",
    description:
      "Generate random first, last, or full names by gender and origin. Up to 50 names at once. Copy all as CSV. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Random Name Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Random Name Generator — Generate Random Names Free Online",
    description:
      "Generate random names by gender and origin. Up to 50 at once. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Random Name Generator",
  description:
    "Generates random first names, last names, or full names with options for gender (male, female, neutral) and cultural origin. Generates 1–50 names per run. Results can be copied individually or exported as a CSV list. Runs in the browser.",
  url: `${SITE_URL}/tools/random-name-generator`,
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
      name: "Fun Tools",
      item: `${SITE_URL}/tools/category/fun`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Random Name Generator",
      item: `${SITE_URL}/tools/random-name-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are random name generators used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Random name generators are used across a wide range of contexts. Fiction writers use them to name characters in novels, short stories, screenplays, and tabletop RPGs — getting past blank-page paralysis and finding names that feel authentic to a character's cultural background. Game developers use them to populate NPCs with distinct names. Software developers and testers use random names to generate realistic-looking test data without using real personal information. Designers use them to create realistic mockups and wireframes with plausible names rather than 'John Doe' placeholders...",
      },
    },
    {
      "@type": "Question",
      name: "How are the names generated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The names are drawn from curated lists of real first names and surnames organised by cultural origin and gender. When you select your options and click Generate, the tool randomly selects from the relevant list to produce the requested number of names. The randomisation uses JavaScript's Math.random() function — the same type of pseudo-random generation used in games and simulations. Names are sourced from lists representing common names in each cultural tradition, including English, Latin/Hispanic, French, German, Slavic, East Asian, South Asian, and other origin groups.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these names for my novel or game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the generated names are simply common names from various cultural traditions, and common names are not copyrightable or trademarked. You're free to use any generated name for fiction, games, creative projects, business use, or any other purpose. The tool draws from pools of real names that exist in the world — generating one doesn't create any ownership or attribution requirement. If you're writing characters from a specific cultural background, filtering by origin can help ensure names feel authentic and respectful.",
      },
    },
    {
      "@type": "Question",
      name: "What should I look for when choosing a character name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good character name has three qualities: it fits the character's cultural background or fictional setting; it sounds distinct enough from other character names to avoid reader confusion (particularly the first letter — having Tom, Tyler, and Travis in the same story causes constant confusion); and it suits the character's role and personality. Generate multiple options, say them aloud, and consider how they feel in context alongside your other character names. Often the right name is recognisable when you encounter it — it sounds like it belongs to the character you've imagined.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Random Name Generator",
  description:
    "Step-by-step guide to using the free Random Name Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Random Name Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Random Name Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function RandomNameGeneratorPage() {
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
            <a href="/" className="hover:text-purple-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/fun-generators"
              className="hover:text-purple-600 transition-colors"
            >
              Fun Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Random Name Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1">
          Free Fun Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Random Name Generator — Generate Random Names Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate random first names, last names, or full names by gender and
          cultural origin — up to 50 at a time, with CSV export.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Random Name Generator tool">
          <RandomNameGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="random-name-generator"
          toolName="Random Name Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
