// src/app/tools/html-entity-encoder/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const HtmlEntityEncoderClient = dynamic(
  () => import("./HtmlEntityEncoderClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "html-entity-encoder");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free HTML Entity Encoder & Decoder — XSS-Safe HTML",
  description:
    "Encode plain text to HTML entities or decode HTML entities back to plain text. Converts &, <, >, \", ', ©, ™, €, and more. Prevents XSS vulnerabilities. Free, browser-based, no signup.",
  keywords:
    "html entity encoder, html entity decoder, encode html entities, decode html entities, xss prevention, html special characters, html escape, ampersand encoding, html sanitiser, free html encoder",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/html-entity-encoder` },
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
    url: `${SITE_URL}/tools/html-entity-encoder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free HTML Entity Encoder & Decoder — XSS-Safe HTML",
    description:
      "Encode plain text to HTML entities or decode HTML entities back to plain text. Handles &, <, >, quotes, copyright, currency symbols, and more. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online HTML Entity Encoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free HTML Entity Encoder & Decoder — XSS-Safe HTML",
    description:
      "Encode or decode HTML entities instantly — handles &, <, >, quotes, copyright, currency and more. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HTML Entity Encoder & Decoder",
  description:
    "Encode plain text to HTML entities (&amp;, &lt;, &gt;, &quot;, etc.) or decode HTML entity strings back to plain text. Includes a reference table of common entities with click-to-insert functionality. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/html-entity-encoder`,
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
      name: "HTML Entity Encoder",
      item: `${SITE_URL}/tools/html-entity-encoder`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are HTML entities and why are they needed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HTML entities are special character sequences that represent characters that would otherwise be interpreted as HTML markup or that cannot be typed directly. The most critical are the five reserved HTML characters: the ampersand (&) which starts all entities and must itself be encoded as &amp; whenever it appears as literal text; the less-than sign (<) which opens HTML tags and must be encoded as &lt;; the greater-than sign (>) which closes HTML tags, encoded as &gt;; and the double quote (\") and single quote (') which delimit attribute values, encoded as &quot; and &apos; respectively...",
      },
    },
    {
      "@type": "Question",
      name: "How do HTML entities prevent XSS attacks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cross-site scripting (XSS) occurs when an attacker injects malicious HTML or JavaScript into a web page through user-controlled input — for example, submitting <script>document.cookie</script> as a comment or username. If the application renders this input directly as HTML, the browser executes the script. HTML entity encoding prevents this by converting < to &lt; and > to &gt;, so the browser renders the string as visible text rather than interpreting it as markup...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between HTML entity names, numeric references, and hex references?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HTML supports three equivalent ways to reference the same character. Named entities use a mnemonic name: &amp; for &, &lt; for <, &copy; for ©. These are the most readable but require the entity name to be known. Decimal numeric character references use the Unicode code point as a decimal number: &#38; for &, &#60; for <, &#169; for ©. Hexadecimal numeric character references use the code point in hex: &#x26; for &, &#x3C; for <, &#xA9; for ©. All three forms produce identical output in the browser. Named entities are preferred for the most common characters...",
      },
    },
    {
      "@type": "Question",
      name: "When should I encode HTML entities vs use Unicode characters directly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In modern HTML5 documents with a UTF-8 charset declaration (<meta charset='UTF-8'>), you can include most Unicode characters directly in your HTML source — © can appear literally, as can €, —, and most symbols. UTF-8 covers all of Unicode, so entity encoding for display purposes is largely unnecessary in modern web development. However, you must still entity-encode the five reserved characters (&, <, >, \", ') in all contexts — these can never appear literally in HTML markup...",
      },
    },
    {
      "@type": "Question",
      name: "What is a non-breaking space (&nbsp;) and when should I use it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "&nbsp; is the HTML entity for the non-breaking space character (Unicode U+00A0). Unlike a regular space, a non-breaking space prevents a line break between the two words it connects — the browser will never wrap a line at a non-breaking space. Use cases include: preventing widowed words in typographic text (e.g. keeping '10 km' together), preventing line breaks between a number and its unit ('100&nbsp;MHz'), keeping a person's first and last name on the same line, and between a currency symbol and an amount ('$&nbsp;100')...",
      },
    },
    {
      "@type": "Question",
      name: "Does HTML entity encoding work the same way in XML and XHTML?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "XML and XHTML have stricter entity rules than HTML. In XML (and XHTML, which is XML-serialised HTML), only five predefined entities are guaranteed to be available without a DOCTYPE declaration: &amp; (&), &lt; (<), &gt; (>), &quot; (\"), and &apos; ('). All other named entities like &copy; or &euro; are not defined in the XML specification itself — they come from the HTML DTD. To use them in strict XML, you'd need to either declare them in a DOCTYPE, use their numeric equivalents (&#169; for ©, &#8364; for €), or use the actual UTF-8 characters directly...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the HTML Entity Encoder & Decoder",
  description:
    "Step-by-step guide to using the free HTML Entity Encoder & Decoder on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free HTML Entity Encoder & Decoder on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The HTML Entity Encoder & Decoder provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function HtmlEntityEncoderPage() {
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
              HTML Entity Encoder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          HTML Entity Encoder &amp; Decoder — Free Online Tool for XSS-Safe HTML
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Encode plain text to HTML entities or decode entity strings back to
          plain text — prevents XSS, handles all special characters.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="HTML Entity Encoder tool">
          <HtmlEntityEncoderClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="html-entity-encoder"
          toolName="HTML Entity Encoder"
        />
      </SidebarAdLayout>
    </>
  );
}
