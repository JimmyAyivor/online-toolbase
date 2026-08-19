// src/app/tools/morse-code-translator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const MorseCodeTranslatorClient = dynamic(
  () => import("./MorseCodeTranslatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "morse-code-translator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Morse Code Translator — Text to Morse Code & Back",
  description:
    "Translate any text to Morse code and decode Morse code back to text instantly. Dots, dashes, copy-paste ready.",
  keywords:
    "morse code translator, text to morse code, morse code converter, morse code decoder, encode morse code",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/morse-code-translator` },
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
    url: `${SITE_URL}/tools/morse-code-translator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Morse Code Translator — Text to Morse Code & Back",
    description:
      "Translate any text to Morse code and decode Morse code back to text instantly. Dots, dashes, copy-paste ready.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Morse Code Translator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Morse Code Translator — Text to Morse Code & Back",
    description:
      "Translate any text to Morse code and decode Morse code back to text instantly. Dots, dashes, copy-paste ready.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Morse Code Translator",
  description:
    "Translate any text to Morse code and decode Morse code back to text instantly. Dots, dashes, copy-paste ready.",
  url: `${SITE_URL}/tools/morse-code-translator`,
  applicationCategory: "UtilitiesApplication",
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Morse Code Translator",
      item: `${SITE_URL}/tools/morse-code-translator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Morse code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morse code is a character-encoding system that represents letters, digits, and punctuation as sequences of dots (short signals, called 'dits') and dashes (longer signals, called 'dahs'). It was developed in the 1830s and 1840s by Samuel Morse and Alfred Vail for use with the electric telegraph. Each character has a unique dot-dash pattern — for example, S is three dots (...) and O is three dashes (---), making SOS (...---...) the internationally recognised distress signal. Morse code was the primary form of long-distance communication until the mid-20th century.",
      },
    },
    {
      "@type": "Question",
      name: "How do I write Morse code correctly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In text format, dots and dashes within a letter are separated by nothing (or minimal spacing), letters are separated by a single space, and words are separated by a forward slash (/) or three spaces. This tool uses the convention of single spaces between letters and / between words. In audio/signal form, a dot is one unit of time, a dash is three units, the gap between symbols within a letter is one unit, the gap between letters is three units, and the gap between words is seven units.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Morse code for SOS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SOS in Morse code is ... --- ... (three dots, three dashes, three dots). It was chosen as the international distress signal not for any acronym meaning but because it is one of the simplest and most distinctive patterns in Morse — easy to send, impossible to misidentify, and transmittable by anyone regardless of language or Morse proficiency. The pattern is sent as a continuous sequence without spaces between the letters in emergency transmission.",
      },
    },
    {
      "@type": "Question",
      name: "Can Morse code be used today?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morse code remains in use in several contexts. Aviation radio navigation beacons (VOR, NDB) still transmit their identifiers in Morse code. Amateur radio operators use it widely — the ITU licenses still recognise Morse proficiency. It is used in accessibility contexts where visual and auditory signals are too complex for people with certain disabilities. Militaries retain Morse knowledge for backup communication. And it is widely used recreationally, educationally, and in popular culture.",
      },
    },
    {
      "@type": "Question",
      name: "How do I decode Morse code manually?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Separate the Morse by spaces: each group of dots/dashes between spaces is one letter. Find each letter in a Morse code reference chart (shown in the tool below the translator). Groups separated by / or longer gaps are word breaks. With practice, most people can decode common letters like E (.), T (-), A (.-), and N (-.) by ear without a reference. The most common letters in English (ETAOIN SHRDLU) are worth memorising first.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Morse Code Translator",
  description:
    "Step-by-step guide to using the free Morse Code Translator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Morse Code Translator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Morse Code Translator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function MorseCodeTranslatorPage() {
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
            <a href="/" className="hover:text-yellow-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/writing-text-tools"
              className="hover:text-yellow-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Morse Code Translator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-yellow-600 uppercase tracking-widest mb-1">
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Morse Code Translator — Text to Morse Code & Back
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Morse Code Translator tool">
          <MorseCodeTranslatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="morse-code-translator"
          toolName="Morse Code Translator"
        />
      </SidebarAdLayout>
    </>
  );
}
