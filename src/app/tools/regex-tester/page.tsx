// src/app/tools/regex-tester/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "regex-tester");
const RegexTesterClient = dynamic(() => import("./RegexTesterClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Regex Tester — Test & Debug Patterns Instantly",
  description:
    "Test and debug regular expressions against sample text in real time. Live match highlighting, capture groups, flags, and a common patterns library. Free, no signup.",
  keywords:
    "regex tester, regular expression tester, regex debugger, regex online, test regex, regex match highlighter, regex capture groups, javascript regex, regex flags, free regex tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/regex-tester` },
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
    url: `${SITE_URL}/tools/regex-tester`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Regex Tester — Test & Debug Patterns Instantly",
    description:
      "Test and debug regular expressions in real time — live match highlighting, capture groups, flags, and a common patterns library. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Regex Tester",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Regex Tester — Test & Debug Patterns Instantly",
    description:
      "Test regex in real time — live match highlighting, capture groups, flags, and common patterns library. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Regex Tester",
  description:
    "Test and debug regular expressions against sample text in real time. Live match highlighting, capture groups, regex flags (g, i, m, s), and a library of common patterns for emails, URLs, phone numbers, dates, and more.",
  url: `${SITE_URL}/tools/regex-tester`,
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
      name: "Regex Tester",
      item: `${SITE_URL}/tools/regex-tester`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a regular expression (regex)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A regular expression (regex or regexp) is a sequence of characters that defines a search pattern. Regex engines use these patterns to find, match, and manipulate text. A regex can be as simple as a literal string like 'hello' (which matches the word hello anywhere in the text) or as complex as a multi-part pattern with character classes, quantifiers, anchors, groups, and alternation. Regular expressions are implemented in virtually every programming language and many text editors and command-line tools...",
      },
    },
    {
      "@type": "Question",
      name: "What do the regex flags (g, i, m, s) do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flags modify how the regex engine applies the pattern. The g (global) flag finds all matches in the text rather than stopping after the first match — without g, only the first match is returned. The i (case-insensitive) flag makes the match ignore case — the pattern 'hello' with the i flag matches 'hello', 'Hello', 'HELLO', and any other capitalisation. The m (multiline) flag changes the behaviour of the ^ and $ anchors — without m, ^ matches the start of the entire string and $ matches the end; with m, they match the start and end of each line. The s (dotAll) flag changes the ...",
      },
    },
    {
      "@type": "Question",
      name: "What are capture groups and how do I use them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Capture groups are portions of a regex pattern enclosed in parentheses ( ) that capture the matched text as a separate result alongside the full match. For example, the pattern (\\d{4})-(\\d{2})-(\\d{2}) applied to '2024-03-15' produces a full match of '2024-03-15' and three capture groups: '2024', '03', and '15'. Capture groups are used in replacement operations (you can refer to group 1 with $1 or \\1 depending on the language), in data extraction (parsing structured text into components), and in conditional matching...",
      },
    },
    {
      "@type": "Question",
      name: "What does the error 'Invalid regular expression' mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This error appears when the regex pattern contains a syntax error that prevents the engine from parsing it. Common causes include: unmatched parentheses (opening ( without a closing ), or vice versa), unmatched square brackets ([ without ]), a backslash at the end of the pattern with nothing after it, an invalid quantifier (like {2,1} where the minimum is greater than the maximum), an invalid escape sequence (like \\q, which is not a recognised escape), or a special character that needs to be escaped but isn't (some characters like + * ? ...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between .* and .+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both are quantifiers that extend the . metacharacter (which matches any single character except newline). .* means 'zero or more of any character' — it matches even when there are no characters present, because * allows zero occurrences. .+ means 'one or more of any character' — it requires at least one character to be present. This distinction matters when matching optional content: use .* when the content might be absent, and .+ when at least one character must be there. Both are greedy by default — they match as much text as possible...",
      },
    },
    {
      "@type": "Question",
      name: "How do I match a literal special character like . + * or (?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In regex, many characters have special meaning: . matches any character, + means 'one or more', * means 'zero or more', ? makes a quantifier lazy or marks a group as non-capturing, ( and ) define groups, [ and ] define character classes, { and } define quantifiers with counts, ^ anchors to the start or negates a character class, $ anchors to the end, \\ is the escape character, and | is alternation. To match any of these characters literally, prefix them with a backslash: \\. matches a literal period, \\+ matches a literal plus, \\( matches a literal opening parenthesis, and so on...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Regex Tester",
  description:
    "Step-by-step guide to using the free Regex Tester on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Regex Tester on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Regex Tester provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function RegexTesterPage() {
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
            <a href="/" className="hover:text-rose-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer-tools"
              className="hover:text-rose-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Regex Tester
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Regex Tester — Test &amp; Debug Regular Expressions Online, Free &amp;
          Instant
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Test and debug regular expressions in real time — live match
          highlighting, capture groups, flags, and a common patterns library.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Regex Tester tool">
          <RegexTesterClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="regex-tester" toolName="Regex Tester" />
      </SidebarAdLayout>
    </>
  );
}
