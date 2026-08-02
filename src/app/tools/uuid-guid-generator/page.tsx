// src/app/tools/uuid-guid-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "uuid-guid-generator");
const UuidGuidGeneratorClient = dynamic(
  () => import("./UuidGuidGeneratorClient"),
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
  title: "Free UUID Generator — v4 UUIDs Instantly Online",
  description:
    "Generate one or hundreds of Version 4 UUIDs/GUIDs instantly. Multiple formats: default, uppercase, braces, no dashes. Copy all or download as a file. Free, no signup.",
  keywords:
    "uuid generator, guid generator, uuid v4 generator, random uuid, generate uuid online, bulk uuid generator, uuid formats, globally unique identifier, universally unique identifier, free uuid tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/uuid-guid-generator` },
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
    url: `${SITE_URL}/tools/uuid-guid-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free UUID Generator — v4 UUIDs Instantly Online",
    description:
      "Generate one or hundreds of Version 4 UUIDs instantly. Multiple formats, copy all, download as file. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online UUID/GUID Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free UUID Generator — v4 UUIDs Instantly Online",
    description:
      "Generate Version 4 UUIDs instantly — multiple formats, bulk generation, copy all, download. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "UUID/GUID Generator",
  description:
    "Generate Version 4 (random) UUIDs/GUIDs instantly in your browser. Supports bulk generation up to 100 at once, multiple output formats (default, uppercase, braces, no dashes), copy all, and download as a text file.",
  url: `${SITE_URL}/tools/uuid-guid-generator`,
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
      name: "UUID/GUID Generator",
      item: `${SITE_URL}/tools/uuid-guid-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a UUID and what does it stand for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UUID stands for Universally Unique Identifier. It is a 128-bit number used to identify information in computer systems without requiring a central registration authority to guarantee uniqueness. A UUID is typically represented as 32 hexadecimal digits displayed in five groups separated by hyphens in the format 8-4-4-4-12, for example: 550e8400-e29b-41d4-a716-446655440000. GUID stands for Globally Unique Identifier and is an alternative term for UUID used primarily in Microsoft systems — the two terms are interchangeable...",
      },
    },
    {
      "@type": "Question",
      name: "What is a Version 4 UUID?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Version 4 is the most commonly used UUID type. It is generated entirely from random or pseudo-random numbers, with only two bits predetermined: the variant bits (identifying it as RFC 4122) and the version bits (identifying it as version 4). The version number appears as the first digit of the third group — in a V4 UUID, it is always 4. The variant bits appear in the fourth group — the first character is always 8, 9, a, or b. All other bits (122 out of 128) are random...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between UUID and GUID?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no technical difference. GUID (Globally Unique Identifier) is Microsoft's terminology for the same concept that the rest of the industry calls UUID (Universally Unique Identifier). Both are 128-bit identifiers following the same RFC 4122 standard. Microsoft introduced the term GUID in COM (Component Object Model) in the early 1990s. You'll see GUID used in Microsoft documentation, SQL Server, .NET, Windows APIs, and COM interfaces — and UUID in databases like PostgreSQL, MySQL, and SQLite, as well as in web standards and most non-Microsoft systems...",
      },
    },
    {
      "@type": "Question",
      name: "Can two UUIDs ever be the same?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In theory, yes — any random generation process can produce duplicates. In practice, the probability is so small that it is irrelevant for all real-world applications. A Version 4 UUID has 122 random bits, giving approximately 5.3 × 10³⁶ possible values. To have a 50% probability of at least one collision among randomly generated V4 UUIDs, you would need to generate approximately 2.7 × 10¹⁸ UUIDs — that's 2.7 quintillion. If you generated one billion UUIDs per second, it would take approximately 85 years to reach a 50% collision probability...",
      },
    },
    {
      "@type": "Question",
      name: "Which UUID format should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The choice of format depends on your storage and application requirements. The default lowercase format (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx) is the standard RFC 4122 representation and is the most widely compatible — use it unless you have a specific reason to choose otherwise. Uppercase with dashes is required by some legacy Windows APIs and COM interfaces that use GUIDs. The braces format ({xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx}) is used in Windows registry entries and some Microsoft tools...",
      },
    },
    {
      "@type": "Question",
      name: "Should I use UUIDs as primary keys in my database?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UUIDs work well as primary keys in distributed systems where you need to generate IDs without coordinating with a central database — multiple servers, microservices, or offline clients can each generate unique IDs independently. The main trade-offs compared to auto-incrementing integer keys are: UUIDs are larger (16 bytes vs 4–8 bytes for integers), which increases index size; random V4 UUIDs cause index fragmentation in clustered indexes because new records insert in random positions rather than appending to the end; and UUIDs are harder to read and debug in logs...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the UUID/GUID Generator",
  description: "Step-by-step guide to using the free UUID/GUID Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free UUID/GUID Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The UUID/GUID Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function UuidGuidGeneratorPage() {
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
            <a href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer"
              className="hover:text-emerald-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              UUID/GUID Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          UUID/GUID Generator — Generate v4 UUIDs Instantly, Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate Version 4 UUIDs instantly — bulk generation, multiple
          formats, copy all or download as a file.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="UUID/GUID Generator tool">
          <UuidGuidGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="uuid-guid-generator"
          toolName="UUID/GUID Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
