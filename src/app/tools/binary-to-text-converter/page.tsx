// src/app/tools/binary-to-text-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const BinaryToTextConverterClient = dynamic(
  () => import("./BinaryToTextConverterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "binary-to-text-converter");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Free Binary to Text Converter — Decode Instantly",
  description:
    "Convert binary code to readable text and text to binary instantly. Supports ASCII and UTF-8. Free, instant, no signup required.",
  keywords:
    "binary to text converter, binary to text, text to binary, binary decoder, binary translator, binary code converter, free binary to text converter, online binary decoder, ascii binary converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/binary-to-text-converter` },
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
    url: `${SITE_URL}/tools/binary-to-text-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Binary to Text Converter — Decode Instantly",
    description:
      "Convert binary code to readable text and text to binary instantly. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Binary to Text Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Binary to Text Converter — Decode Instantly",
    description:
      "Convert binary to text and text to binary instantly. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Binary to Text Converter",
  description:
    "Convert binary code to readable text and text to binary. Supports ASCII and UTF-8.",
  url: `${SITE_URL}/tools/binary-to-text-converter`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Binary to Text Converter",
      item: `${SITE_URL}/tools/binary-to-text-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why do binary groups need to be exactly 8 bits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In standard ASCII encoding, each character is represented by exactly 8 binary digits (bits), forming what is called a byte. A byte can represent 256 different values (2⁸), which covers all standard ASCII characters including letters, digits, and common punctuation. If a group has fewer or more than 8 bits, it doesn't correspond to a valid ASCII byte and can't be decoded reliably.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between ASCII and binary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ASCII (American Standard Code for Information Interchange) is a character encoding standard that assigns a numeric value to each character — for example, 'A' is 65. Binary is simply the base-2 representation of those numeric values. When we say 'binary to text', we mean converting binary numbers back to the ASCII characters they represent. The letter 'A' in binary is 01000001, which is 65 in decimal.",
      },
    },
    {
      "@type": "Question",
      name: "Can this tool handle special characters and punctuation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Any character with a standard ASCII code (0–127) is fully supported, including letters, digits, punctuation, and control characters. Extended ASCII characters (128–255), which include accented letters common in European languages, are also supported in both directions. Characters beyond the ASCII range, such as emoji or Chinese characters, require multi-byte encodings like UTF-8 and may not convert correctly.",
      },
    },
    {
      "@type": "Question",
      name: "What does the swap button do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The swap button instantly switches the conversion direction and moves the current output into the input field. If you've converted text to binary and want to verify by converting it back, clicking swap places the binary output into the input and switches to Binary → Text mode, letting you confirm a round-trip conversion without copying and pasting manually.",
      },
    },
    {
      "@type": "Question",
      name: "Where is binary used in the real world?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Binary is the fundamental language of all digital computers. Every file on your computer — whether a document, image, or video — is ultimately stored as a sequence of binary digits. Developers encounter binary in contexts like network protocols, file format headers, low-level debugging, bitwise operations in programming, and digital electronics. Understanding binary encoding is foundational to computer science and software engineering.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Binary to Text Converter",
  description:
    "Step-by-step guide to using the free Binary to Text Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Binary to Text Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Binary to Text Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function BinaryToTextConverterPage() {
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
              href="/tools/category/developer-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Binary to Text Converter
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Binary to Text Converter — Free Online Binary to Text Converter
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert binary code to readable text or encode any text to binary.
          Supports ASCII and UTF-8. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Binary to Text Converter tool">
          <BinaryToTextConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="binary-to-text-converter"
          toolName="Binary to Text Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
