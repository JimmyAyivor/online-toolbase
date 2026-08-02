// src/app/tools/random-number-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "random-number-generator");
const RandomNumberGeneratorClient = dynamic(
  () => import("./RandomNumberGeneratorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title:
    "Free Random Number Generator — Any Range, Instantly",
  description:
    "Generate one or many random numbers between any minimum and maximum value. Option for no duplicates. Shows count, min, max, and average stats. Copy all as comma-separated list. Free, no signup.",
  keywords:
    "random number generator, random number between 1 and 100, generate random numbers, lottery number generator, random number picker, no duplicate random numbers, random list generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/random-number-generator` },
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
    url: `${SITE_URL}/tools/random-number-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Free Random Number Generator — Any Range, Instantly",
    description:
      "Generate random numbers in any range — set min, max, and how many numbers. Option for unique (no duplicate) numbers. Copy as CSV. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Random Number Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Free Random Number Generator — Any Range, Instantly",
    description:
      "Generate random numbers in any range. Set count and unique-only option. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Random Number Generator",
  description:
    "Generates random integers between a user-defined minimum and maximum value. Supports generating between 1 and 1000 numbers per run, with an optional no-duplicate mode that ensures each generated number is unique within the specified range. Shows count, smallest, largest, and average statistics. Results can be copied as a comma-separated list. Runs in the browser.",
  url: `${SITE_URL}/tools/random-number-generator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Random Number Generator",
      item: `${SITE_URL}/tools/random-number-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the random number generator truly random?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool uses JavaScript's Math.random() function, which is a pseudo-random number generator (PRNG) — not a cryptographically secure or true hardware-random generator. Math.random() uses an algorithm (typically xorshift128+ or a similar PRNG) seeded by the browser's internal state to produce sequences of numbers that appear random and pass statistical randomness tests. For most everyday uses — games, classroom activities, raffles, sampling, decision-making — this level of randomness is entirely sufficient...",
      },
    },
    {
      "@type": "Question",
      name: "What does 'no duplicate numbers' mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 'no duplicate numbers' option (sometimes called 'unique' mode) ensures that no number appears more than once in the generated set. Without this option, the same number can appear multiple times in a set — which is appropriate when simulating repeated independent events (like dice rolls). With duplicates disabled, each generated number is unique within the set — useful for lottery picks, random sampling without replacement, or generating a randomised ordering of a numbered list. Note that if you request more unique numbers than exist in your range (e.g...",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum number of random numbers I can generate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool generates up to 1,000 random numbers per run. The count slider goes from 1 to 100, but you can type a number up to 1,000 directly into the count field. In practice, generating 1,000 numbers is instant — the calculation runs entirely in your browser and completes in milliseconds. If you need more than 1,000 numbers (for example, for a statistical simulation or dataset), you can run the generator multiple times and combine the results.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use this tool to simulate a dice roll?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Set Min to 1 and Max to 6, set Count to 1, and click Generate. Each click gives you a single roll of a six-sided die. To simulate rolling multiple dice simultaneously, increase Count — setting Count to 5 gives you five independent d6 rolls at once. For other dice types: d4 (1–4), d8 (1–8), d10 (1–10), d12 (1–12), d20 (1–20), d100/percentile (1–100). For advantage/disadvantage in games like D&D, generate Count 2 from the appropriate range and take the higher or lower value respectively.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use this to randomly select from a list?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Number each item in your list starting from 1. Set Min to 1 and Max to the total number of items in your list. Set Count to 1 (to pick one item) or higher if you want to pick multiple items. Enable 'No duplicate numbers' if you want to select multiple items without repeating any. The generated number tells you which item to select. For example, if you have 8 teams and want to generate a random draw order, set 1–8 with Count 8 and unique enabled — you'll get a random ordering of all 8 numbers (1 through 8) with no repeats.",
      },
    },
    {
      "@type": "Question",
      name: "What is a pseudo-random number generator (PRNG)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A pseudo-random number generator (PRNG) is an algorithm that produces a sequence of numbers that approximates the properties of random numbers. Unlike true random number generators (which use physical processes like radioactive decay or atmospheric noise), PRNGs are entirely deterministic — if you know the initial seed value and the algorithm, you can predict the entire sequence...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Random Number Generator",
  description: "Step-by-step guide to using the free Random Number Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Random Number Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Random Number Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function RandomNumberGeneratorPage() {
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
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculator"
              className="hover:text-indigo-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Random Number Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Random Number Generator — Generate Random Numbers in Any Range Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate one or many random numbers between any minimum and maximum
          value — with optional no-duplicate mode and copy-all output.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Random Number Generator tool">
          <RandomNumberGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="random-number-generator"
          toolName="Random Number Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
