// src/app/tools/json-formatter-validator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
const JsonFormatterValidatorClient = dynamic(
  () => import("./JsonFormatterValidatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
import { tools } from "@/lib/tools";

const tool = tools.find((t) => t.slug === "json-formatter-validator");

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator — Beautify & Check",
  description:
    "Format, beautify, and validate JSON data instantly in your browser. Adjustable indentation, sort keys, minify, copy, and download. Real-time error messages. Free, no signup.",
  keywords:
    "json formatter, json validator, json beautifier, json minifier, format json online, validate json, json pretty print, json lint, online json formatter, free json tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/json-formatter-validator` },
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
    url: `${SITE_URL}/tools/json-formatter-validator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free JSON Formatter & Validator — Beautify & Check",
    description:
      "Format, beautify, and validate JSON instantly. Adjustable indentation, sort keys, minify, copy, and download. Real-time validation errors. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online JSON Formatter & Validator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free JSON Formatter & Validator — Beautify & Check",
    description:
      "Format, validate, and minify JSON instantly. Real-time error messages, sort keys, download. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON Formatter & Validator",
  description:
    "Format, beautify, and validate JSON data instantly. Adjustable indentation, sort keys alphabetically, minify, copy, and download. Real-time error messages with exact error position.",
  url: `${SITE_URL}/tools/json-formatter-validator`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "JSON Formatter & Validator",
      item: `${SITE_URL}/tools/json-formatter-validator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is JSON and why does it need to be formatted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JSON (JavaScript Object Notation) is a lightweight text format for storing and transmitting structured data. It's the most widely used data interchange format in web APIs, configuration files, databases, and application settings. Raw JSON from APIs, logs, or minified files is often a single unbroken line with no whitespace — technically valid but extremely difficult for humans to read and debug. Formatting (also called beautifying or pretty-printing) adds indentation and line breaks to reveal the nested structure of the data...",
      },
    },
    {
      "@type": "Question",
      name: "What does the validator check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The validator parses your JSON using the browser's native JSON.parse() function, which enforces the full JSON specification (RFC 8259). Common errors it detects include: unquoted or single-quoted keys (JSON requires double-quoted string keys), missing or extra commas, mismatched brackets or braces, trailing commas after the last item in an array or object (not permitted in JSON), unescaped special characters in strings, invalid number formats, and the use of undefined, NaN, or Infinity as values (which are JavaScript concepts not present in JSON)...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between beautify and minify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beautify (also called pretty-print or format) adds indentation and newlines to make JSON human-readable. It increases file size but makes the structure easy to read, debug, and edit. Minify removes all whitespace — spaces, tabs, and newlines — from the JSON, producing the most compact possible representation. Minified JSON is ideal for production environments where bandwidth matters, such as API responses sent over the network or JSON stored in databases. The difference in file size can be significant for large JSON files: a 50KB beautified file might minify to 30KB...",
      },
    },
    {
      "@type": "Question",
      name: "What does 'Sort keys alphabetically' do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enabling Sort keys alphabetically reorders the keys in every object in your JSON into alphabetical order before formatting. The JSON data itself is unchanged — only the key order within each object changes...",
      },
    },
    {
      "@type": "Question",
      name: "What do the JSON statistics mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When your JSON is valid, the tool displays four statistics. Type shows whether the root element is an Object or Array — the two valid JSON root types. Size shows the character count of the minified JSON (without whitespace), which approximates the file size in bytes for ASCII content. Depth shows the maximum nesting level — how many levels of objects and arrays are nested inside each other. A depth of 1 means a flat object with no nested structures; a depth of 5 or more indicates heavily nested data...",
      },
    },
    {
      "@type": "Question",
      name: "Is my JSON data sent to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — all processing runs entirely in your browser using JavaScript. Your JSON data is never sent to any server, logged, or stored anywhere. The tool uses the browser's built-in JSON.parse() and JSON.stringify() functions to parse, validate, and format the data. This means the tool works offline (after the page has loaded), and you can safely use it with sensitive or confidential JSON data such as API responses containing personal information, configuration files with credentials, or internal business data. Your data stays on your device at all times.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the JSON Formatter & Validator",
  description:
    "Step-by-step guide to using the free JSON Formatter & Validator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free JSON Formatter & Validator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The JSON Formatter & Validator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function JsonFormatterValidatorPage() {
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
            <a href="/" className="hover:text-cyan-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer-tools"
              className="hover:text-cyan-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              JSON Formatter &amp; Validator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          JSON Formatter &amp; Validator — Format, Beautify &amp; Validate JSON
          Free &amp; Instant
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Format, validate, and minify JSON instantly — adjustable indentation,
          sort keys, real-time error messages, copy and download.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="JSON Formatter & Validator tool">
          <JsonFormatterValidatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="json-formatter-validator"
          toolName="JSON Formatter & Validator"
        />
      </SidebarAdLayout>
    </>
  );
}
