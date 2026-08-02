// src/app/tools/business-name-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const BusinessNameGeneratorClient = dynamic(
  () => import("./BusinessNameGeneratorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "business-name-generator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Free Business Name Generator — Brand Ideas Instantly",
  description:
    "Generate unique business, company, and brand name ideas for any industry. Get catchy, professional, and creative name suggestions instantly. Free, no signup.",
  keywords:
    "business name generator, company name generator, brand name generator, startup name generator, business name ideas, brand name ideas",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/business-name-generator` },
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
    url: `${SITE_URL}/tools/business-name-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Business Name Generator — Brand Ideas Instantly",
    description:
      "Generate unique business and brand name ideas for any industry instantly.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Business Name Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Business Name Generator — Brand Ideas Instantly",
    description: "Generate business and brand names for any industry. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Business Name Generator",
  description:
    "Generate unique business and brand name ideas for any industry.",
  url: `${SITE_URL}/tools/business-name-generator`,
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
      name: "Business Name Generator",
      item: `${SITE_URL}/tools/business-name-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes a strong business name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong business name is memorable, easy to spell when heard aloud, and available as a .com domain and trademark. Short names (1–2 words, under 12 characters) are easier to use across all marketing channels. The best names either describe what the business does clearly (descriptive), create an emotional feeling associated with the brand (abstract), or combine both elements. The name should also work in all caps for signage and lowercase for URLs without losing meaning.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use my own name as a business name?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Using your personal name (eponymous naming) works well for professional services where trust and personal reputation are central — law firms, consultancies, therapists, photographers. It creates an inherent credibility and human connection. However, it makes the business harder to sell or scale beyond one person, since the brand equity is tied to an individual. If you plan to grow beyond a solo practice or sell eventually, a distinct brand name is generally a better foundation.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check if a business name is already taken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check four things before committing: domain availability (Namecheap or GoDaddy for .com), trademark registration (USPTO for US, EUIPO for EU, IPO for UK), social media handles across your key platforms, and a Google search for the name plus your industry. A name that passes all four checks has no obvious conflicts. For important brand investments, have a trademark attorney conduct a formal clearance search — automated searches miss phonetic similarities that could constitute infringement.",
      },
    },
    {
      "@type": "Question",
      name: "How important is having a .com domain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most businesses, a .com domain remains the gold standard — it signals credibility, is the default assumption when people type your name into a browser, and is expected globally. Alternative TLDs (.io, .co, .studio) are increasingly accepted in tech and creative industries but may cause confusion for traditional B2B or consumer businesses. If your preferred .com is not available, consider slightly modifying the name (e.g. adding a city, suffix, or industry word) rather than using a less-trusted TLD.",
      },
    },
    {
      "@type": "Question",
      name: "Can I trademark a business name generated by this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generated names can potentially be trademarked if they are distinctive, not already registered in your category, and not merely descriptive of your service. Abstract, coined, or compound names tend to receive stronger trademark protection than purely descriptive ones. The generator provides starting point ideas — always conduct a trademark clearance search through the relevant registry (USPTO, EUIPO, IPO) and consult a trademark attorney before filing. Trademark registration is territory-specific and typically takes 12–18 months.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Business Name Generator",
  description: "Step-by-step guide to using the free Business Name Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Business Name Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Business Name Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function BusinessNameGeneratorPage() {
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
            <a href="/" className="hover:text-violet-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business"
              className="hover:text-violet-600 transition-colors"
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Business Name Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Business Name Generator — Company & Brand Name Ideas Instantly
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate creative, catchy, and professional business name ideas for
          any industry — instantly, with multiple naming styles.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Business Name Generator tool">
          <BusinessNameGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="business-name-generator"
          toolName="Business Name Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
