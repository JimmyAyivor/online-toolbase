// src/app/tools/slogan-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "slogan-generator");
const SloganGeneratorClient = dynamic(() => import("./SloganGeneratorClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Slogan Generator — Brand Taglines Instantly",
  description:
    "Generate catchy slogans and taglines for your brand, product, or campaign. Get fun, professional, and bold variants instantly. Free, no signup.",
  keywords:
    "slogan generator, tagline generator, brand slogan, catchphrase generator, business slogan generator, company tagline creator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/slogan-generator` },
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
    url: `${SITE_URL}/tools/slogan-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Slogan Generator — Brand Taglines Instantly",
    description:
      "Generate catchy slogans and taglines for any brand or campaign instantly.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Slogan Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Slogan Generator — Brand Taglines Instantly",
    description: "Generate brand slogans and taglines instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Slogan Generator",
  description:
    "Generate catchy brand slogans and taglines for any business or campaign.",
  url: `${SITE_URL}/tools/slogan-generator`,
  applicationCategory: "BusinessApplication",
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
      name: "Business Tools",
      item: `${SITE_URL}/tools/category/business`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Slogan Generator",
      item: `${SITE_URL}/tools/slogan-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes a good brand slogan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A great slogan is short (typically 3–8 words), easy to say aloud, memorable, and authentic to the brand's personality. It should communicate a benefit or feeling — not just describe what the business does. The best slogans work across contexts: on business cards, social bios, packaging, and spoken in conversation. Test it by saying it aloud to someone unfamiliar with the brand and asking what they think the company does.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a slogan and a tagline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In practice, the terms are used interchangeably in marketing, but there is a technical distinction. A tagline is a permanent brand identity statement used consistently across all marketing — it represents the brand's core promise or positioning. A slogan is often campaign-specific and changes with different marketing initiatives. Nike's 'Just Do It' is a tagline; a seasonal sale campaign might have its own slogan. This generator creates both types of lines.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if my slogan is legally safe to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Before using a slogan commercially, search the relevant trademark databases: USPTO (US), EUIPO (EU), and IPO (UK). Trademark protection for slogans is harder to obtain than for brand names, but widely used commercial phrases are protected. Avoid slogans that are too similar to well-known registered taglines. For any commercially important brand, consult a trademark attorney before committing to a slogan.",
      },
    },
    {
      "@type": "Question",
      name: "Should my slogan include my brand name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Including the brand name is optional and depends on context. Standalone slogans like 'Just Do It' work because the brand is already strongly established. For newer brands with lower recognition, including the brand name in the slogan (e.g. 'Apple — Think Different') aids brand recall. Use this generator with and without your brand name included in the phrase to compare both approaches.",
      },
    },
    {
      "@type": "Question",
      name: "How many slogans should I create before choosing one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most branding professionals recommend generating at least 20–30 candidate slogans before shortlisting to 3–5 finalists for testing. Testing can be as simple as asking 10 target customers which feels most authentic and memorable. The generator provides 6 variants per style — run it multiple times with different keywords and tone settings to build a larger pool to work from.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Slogan Generator",
  description:
    "Step-by-step guide to using the free Slogan Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Slogan Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Slogan Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function SloganGeneratorPage() {
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
              href="/tools/category/business-productivity"
              className="hover:text-rose-600 transition-colors"
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Slogan Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Slogan Generator — Brand Taglines & Catchphrases
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate memorable brand slogans and taglines across fun,
          professional, bold, and inspirational styles — instantly.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Slogan Generator tool">
          <SloganGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="slogan-generator"
          toolName="Slogan Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
