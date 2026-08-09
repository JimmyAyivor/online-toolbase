// src/app/tools/diceware-passphrase-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const DicewarePassphraseGeneratorClient = dynamic(
  () => import("./DicewarePassphraseGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "diceware-passphrase-generator");

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Diceware Passphrase Generator — Random Word Passphrases",
  description:
    "Generate secure, memorable passphrases from random words — customizable word count, separators, and add-ons. Uses your browser's secure random generator. Free, no signup.",
  keywords:
    "diceware passphrase generator, passphrase generator, random word password, memorable password generator, secure passphrase",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/diceware-passphrase-generator` },
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
    url: `${SITE_URL}/tools/diceware-passphrase-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Diceware Passphrase Generator — Random Word Passphrases",
    description:
      "Generate secure, memorable passphrases from random words, with adjustable length and separators. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Diceware Passphrase Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Diceware Passphrase Generator — Random Word Passphrases",
    description:
      "Generate secure, memorable random-word passphrases in your browser. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Diceware Passphrase Generator",
  description:
    "Generates random passphrases by selecting words from a curated wordlist using the browser's cryptographically secure random number generator, similar to the classic Diceware method of rolling dice against a word list. Supports adjustable word count, separators, capitalization, and appended numbers or symbols, with an entropy estimate.",
  url: `${SITE_URL}/tools/diceware-passphrase-generator`,
  applicationCategory: "SecurityApplication",
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
      name: "Security Tools",
      item: `${SITE_URL}/tools/category/security-tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Diceware Passphrase Generator",
      item: `${SITE_URL}/tools/diceware-passphrase-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Diceware passphrase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diceware is a method for generating passphrases by rolling physical dice to randomly pick words from a numbered word list — for example, 'correct horse battery staple'. This tool uses the same principle, substituting your browser's cryptographically secure random number generator for physical dice.",
      },
    },
    {
      "@type": "Question",
      name: "Why are passphrases better than complex short passwords?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Length matters more than complexity for resisting brute-force attacks, and passphrases are far easier to remember than a random string of symbols. A five-word random passphrase can have more entropy than a 10-character password with mixed case, numbers, and symbols, while being much easier to type and recall.",
      },
    },
    {
      "@type": "Question",
      name: "How many words should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Five to six words is a solid default for most accounts. Use more words (7-8) for a master password protecting a password manager or an encryption key, since that's worth the extra entropy and typing effort.",
      },
    },
    {
      "@type": "Question",
      name: "Is the word selection really random?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — words are chosen using crypto.getRandomValues(), the Web Crypto API's cryptographically secure random number generator, with a rejection-sampling technique to avoid modulo bias. Nothing about the generation is predictable or seeded from anything transmitted over the network.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Diceware Passphrase Generator",
  description:
    "Step-by-step guide to using the free Diceware Passphrase Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Set your options",
      text: "Choose how many words, a separator style, and any add-ons like capitalization or a trailing number.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Generate a passphrase",
      text: "A new random passphrase appears instantly, along with an entropy estimate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy and store it safely",
      text: "Copy the passphrase and save it in a password manager rather than reusing it elsewhere.",
    },
  ],
};

export default function DicewarePassphraseGeneratorPage() {
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
            <a href="/" className="hover:text-teal-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/security-tools"
              className="hover:text-teal-600 transition-colors"
            >
              Security Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Diceware Passphrase Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
          Free Security Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Diceware Passphrase Generator — Random Word Passphrases
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate long, memorable passphrases from random words —
          adjustable word count, separators, and entropy estimate.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Diceware Passphrase Generator tool">
          <DicewarePassphraseGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="diceware-passphrase-generator"
          toolName="Diceware Passphrase Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
