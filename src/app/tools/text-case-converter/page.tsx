// src/app/tools/text-case-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "text-case-converter");
const TextCaseConverterClient = dynamic(
  () => import("./TextCaseConverterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./Pageeditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Text Case Converter — Free Online Text Case Converter",
  description:
    "Convert text to uppercase, lowercase, title case, camelCase, PascalCase, snake_case, kebab-case and more. 12 case formats. Free, instant, no signup.",
  keywords:
    "text case converter, uppercase converter, lowercase converter, title case, camelCase converter, snake_case converter, kebab-case, PascalCase, text transformer, case changer",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-case-converter` },
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
    url: `${SITE_URL}/tools/text-case-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Text Case Converter — Free Online Text Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case, camelCase, snake_case, and 8 more formats. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text Case Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Text Case Converter — Free Online Text Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case, camelCase, snake_case and more. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Case Converter",
  description:
    "Convert text to uppercase, lowercase, title case, camelCase, snake_case, kebab-case and more.",
  url: `${SITE_URL}/tools/text-case-converter`,
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Text Case Converter",
      item: `${SITE_URL}/tools/text-case-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between camelCase, PascalCase, snake_case, and kebab-case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These are all naming conventions used in programming and web development, each with different separator and capitalisation rules. camelCase starts with a lowercase letter and capitalises the first letter of each subsequent word, with no spaces or separators (e.g. myVariableName). PascalCase is identical but starts with an uppercase letter (e.g. MyClassName). snake_case uses underscores as separators with all letters lowercase (e.g. my_variable_name). kebab-case uses hyphens as separators with all letters lowercase (e.g. my-variable-name)...",
      },
    },
    {
      "@type": "Question",
      name: "What is Title Case and when should I use it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Title Case capitalises the first letter of major words in a sentence, leaving minor words (articles, prepositions, conjunctions under 4 letters — 'a', 'an', 'the', 'and', 'but', 'or', 'for', 'in', 'of', 'at', 'to', 'by', 'nor', 'on', 'from') in lowercase unless they appear as the first word. For example: 'The Lord of the Rings' not 'The Lord Of The Rings'. Use Title Case for book titles, film titles, article headlines, section headings in formal documents, and navigation labels...",
      },
    },
    {
      "@type": "Question",
      name: "Which case should I use for URLs and CSS class names?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For URLs: use kebab-case (e.g. /tools/text-case-converter). kebab-case is the universal standard for URL slugs — it is human-readable, works reliably across all operating systems and browsers, and is preferred by Google for SEO. Never use spaces (replaced by %20), camelCase, or underscores in URLs. For CSS class names: also use kebab-case (e.g. .nav-menu, .hero-section, .btn-primary). This is the convention established by Bootstrap, Tailwind CSS, and virtually all major CSS frameworks. For CSS custom properties (variables), also use kebab-case: --primary-color.",
      },
    },
    {
      "@type": "Question",
      name: "What is Sentence case and how does it differ from Title Case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sentence case capitalises only the first letter of the first word and any proper nouns — exactly as you would write a normal sentence. Example: 'This is a sentence case heading'. Title Case capitalises the first letter of all major words. Example: 'This Is a Title Case Heading'. Sentence case is preferred for most digital UI copy — button labels, form labels, error messages, navigation items, and body text headings — because it feels more natural and conversational. Title Case is better suited for formal editorial contexts: book titles, film credits, and traditional journalism.",
      },
    },
    {
      "@type": "Question",
      name: "Does the text case converter work with special characters and non-English text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The basic case conversions (uppercase, lowercase, sentence case, title case) use JavaScript's native toUpperCase() and toLowerCase() methods, which support Unicode and handle most European languages with accented characters (é → É, ü → Ü, etc.). However, developer-format cases (camelCase, snake_case, kebab-case, dot.case) strip non-alphanumeric characters since these characters are not valid in identifiers in most programming languages. For text that needs to preserve special characters, use sentence case, title case, or the alternating/inverse case modes.",
      },
    },
    {
      "@type": "Question",
      name: "What is dot.case and where is it used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "dot.case (also called dot notation or dot.notation) separates words with dots and lowercases all letters. It is less common than snake_case or kebab-case but appears in: Java and Kotlin package names (com.example.myapp), some configuration file key formats (server.port, database.url), Node.js and npm package namespacing, and property access notation in some template engines. In general web development, snake_case and kebab-case are more prevalent, but dot.case is standard in JVM ecosystem projects.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Text Case Converter",
  description:
    "Step-by-step guide to using the free Text Case Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Text Case Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Text Case Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function TextCaseConverterPage() {
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
              href="/tools/category/writing-text-tools"
              className="hover:text-purple-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Text Case Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Text Case Converter — Free Online Text Case Converter
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert text to uppercase, lowercase, title case, camelCase,
          snake_case, kebab-case and 6 more formats. Instant, no account needed.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Text Case Converter tool">
          <TextCaseConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="text-case-converter"
          toolName="Text Case Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
