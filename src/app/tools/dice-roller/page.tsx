// src/app/tools/dice-roller/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const DiceRollerClient = dynamic(
  () => import("./DiceRollerClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "dice-roller");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Dice Roller — Roll Virtual Dice Free Online",
  description:
    "Roll virtual dice of any type — d4, d6, d8, d10, d12, d20, and custom dice. Roll multiple dice simultaneously and see your total and individual results. Free, no signup.",
  keywords:
    "dice roller, virtual dice, roll dice online, d20 roller, d6 dice, RPG dice roller, tabletop dice, random dice roll",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/dice-roller` },
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
    url: `${SITE_URL}/tools/dice-roller`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Dice Roller — Roll Virtual Dice Free Online",
    description:
      "Roll any dice type — d4, d6, d8, d10, d12, d20, and custom. Multiple dice at once with totals. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Dice Roller",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Dice Roller — Roll Virtual Dice Free Online",
    description: "Roll d4, d6, d8, d10, d12, d20, and custom dice. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dice Roller",
  description:
    "Virtual dice roller supporting d4, d6, d8, d10, d12, d20, and custom-sided dice. Supports rolling multiple dice of each type simultaneously and displays individual results and total. Uses cryptographically-seeded Math.random() for randomisation. Runs in the browser.",
  url: `${SITE_URL}/tools/dice-roller`,
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
      name: "Dice Roller",
      item: `${SITE_URL}/tools/dice-roller`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Dice Roller free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the Dice Roller is completely free. No signup, no download, and no payment is required. It runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Dice Roller work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Dice Roller is fully responsive and works on smartphones, tablets, and desktop computers without any app installation.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private when using the Dice Roller?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All calculations are performed locally in your browser. No data is sent to any server or stored anywhere.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Dice Roller",
  description: "Step-by-step guide to using the free Dice Roller on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Dice Roller on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Dice Roller provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function DiceRollerPage() {
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
              href="/tools/category/fun"
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
              Dice Roller
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1">
          Free Fun Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dice Roller — Roll Virtual Dice Free Online</h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Roll virtual d4, d6, d8, d10, d12, d20, and custom dice — add multiple
          dice of each type and get your total and individual results instantly.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Dice Roller tool">
          <DiceRollerClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="dice-roller" toolName="Dice Roller" />
      </SidebarAdLayout>
    </>
  );
}
