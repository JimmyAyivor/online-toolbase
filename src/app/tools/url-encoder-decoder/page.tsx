// src/app/tools/url-encoder-decoder/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "url-encoder-decoder");
const UrlEncoderDecoderClient = dynamic(
  () => import("./UrlEncoderDecoderClient"),
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
  title: "Free URL Encoder & Decoder — Encode URLs Instantly",
  description:
    "Encode or decode URLs instantly in your browser. Supports encodeURIComponent and full URL encoding, URL parser, and common character reference table. Free, no signup.",
  keywords:
    "url encoder, url decoder, url encode decode online, encodeURIComponent online, urlencode, percent encoding, url percent decode, url encoder decoder free, online url encoder, url special characters",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/url-encoder-decoder` },
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
    url: `${SITE_URL}/tools/url-encoder-decoder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free URL Encoder & Decoder — Encode URLs Instantly",
    description:
      "Encode or decode URLs instantly. Supports component and full URL encoding, URL parser, common character reference. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online URL Encoder/Decoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free URL Encoder & Decoder — Encode URLs Instantly",
    description:
      "Encode or decode URLs instantly. Component and full URL modes, URL parser, character reference. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "URL Encoder/Decoder",
  description:
    "Encode or decode URLs for safe web transmission. Supports encodeURIComponent and full URL encoding modes, URL parser, and percent-encoding character reference table.",
  url: `${SITE_URL}/tools/url-encoder-decoder`,
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
      name: "URL Encoder/Decoder",
      item: `${SITE_URL}/tools/url-encoder-decoder`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is URL encoding and why is it needed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "URL encoding (also called percent-encoding) is the process of converting characters that are not safe to include in a URL into a safe format that can be transmitted over the internet. URLs can only contain a limited set of ASCII characters — letters, digits, and a small number of special characters like hyphens, underscores, and tildes...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Component and Full URL encoding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Component encoding (encodeURIComponent in JavaScript) encodes almost all special characters — including characters that have structural meaning in URLs like /, :, ?, #, &, and =. Use this mode when encoding a value that will be inserted as a query parameter, path segment, or fragment — anything that is part of a URL rather than the whole URL itself. Full URL encoding (encodeURI in JavaScript) encodes everything except characters that have structural meaning in URLs — it leaves /, :, ?, #, &, =, and @ unencoded, because these form the structure of the URL...",
      },
    },
    {
      "@type": "Question",
      name: "What does the URL Parser do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The URL Parser section appears when the input contains a valid complete URL (one with a protocol like https://). It automatically parses the URL into its structural components: protocol (https, http, ftp), hostname (the domain), port (if specified), path (the URL path after the domain), search string (the full query string including the ? prefix), hash (the fragment identifier after #), and query parameters (each key-value pair from the query string listed separately)...",
      },
    },
    {
      "@type": "Question",
      name: "What characters must always be percent-encoded in URLs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Characters that must always be encoded in URL components include: space → %20 (or + in some contexts), # → %23, % → %25, & → %26, + → %2B, / → %2F, : → %3A, = → %3D, ? → %3F, @ → %40, [ → %5B, ] → %5D. Additionally, all non-ASCII characters — Unicode characters, accented letters, Cyrillic, Arabic, Chinese, Japanese, and emoji — must be encoded. The encoding for Unicode characters involves first converting to UTF-8 bytes, then percent-encoding each byte. For example, the emoji 😀 becomes %F0%9F%98%80 in UTF-8 percent-encoding...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for encoding query string parameters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — this is one of the most common uses. When building a URL with query parameters, each parameter value should be encoded using Component mode to ensure special characters in the value don't break the URL structure. For example, a search query containing 'cats & dogs' needs to be encoded as 'cats%20%26%20dogs' before it can be safely appended to a URL as a query parameter value. If you don't encode the ampersand, it will be interpreted as a parameter separator, splitting your query into two parameters...",
      },
    },
    {
      "@type": "Question",
      name: "Is there a difference between %20 and + for encoding spaces?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — both %20 and + represent a space, but they are used in different contexts. %20 is the standard percent-encoding for a space and is valid in all parts of a URL. The + notation for spaces is specific to the application/x-www-form-urlencoded format used in HTML form submissions — it only applies in the query string portion of a URL and is the historical convention from early HTML forms. Modern practice generally favours %20 for consistency and portability, as + in the query string can sometimes cause confusion when it appears in values that should contain literal plus signs...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the URL Encoder/Decoder",
  description: "Step-by-step guide to using the free URL Encoder/Decoder on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free URL Encoder/Decoder on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The URL Encoder/Decoder provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function UrlEncoderDecoderPage() {
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
            <a href="/" className="hover:text-sky-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer"
              className="hover:text-sky-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              URL Encoder/Decoder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          URL Encoder/Decoder — Encode &amp; Decode URLs Instantly, Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Encode or decode URLs instantly — component and full URL modes, URL
          parser, and percent-encoding character reference table.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="URL Encoder/Decoder tool">
          <UrlEncoderDecoderClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="url-encoder-decoder"
          toolName="URL Encoder/Decoder"
        />
      </SidebarAdLayout>
    </>
  );
}
