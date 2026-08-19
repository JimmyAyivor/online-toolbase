// src/app/tools/facebook-ad-copy-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const FacebookAdCopyGeneratorClient = dynamic(
  () => import("./FacebookAdCopyGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "facebook-ad-copy-generator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Facebook Ad Copy Generator — Ads That Convert",
  description:
    "Generate Facebook ad copy across multiple frameworks — AIDA, PAS, FAB, social proof, and more. Enter your product, audience, and goal — get multiple headline and body copy variations to test. Free, no signup.",
  keywords:
    "facebook ad copy generator, facebook ads copywriting, ad copy generator, facebook ad headline, AIDA copywriting, PAS framework, facebook ad template, social media ad copy, free ad copy tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/facebook-ad-copy-generator` },
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
    url: `${SITE_URL}/tools/facebook-ad-copy-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Facebook Ad Copy Generator — Ads That Convert",
    description:
      "Generate Facebook ad copy using AIDA, PAS, FAB, and other proven frameworks. Multiple variations per framework. Enter product, audience, and objective. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Facebook Ad Copy Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Facebook Ad Copy Generator — Ads That Convert",
    description:
      "Generate Facebook ad copy variations using AIDA, PAS, FAB, and more. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Facebook Ad Copy Generator",
  description:
    "Generates Facebook ad copy variations using multiple copywriting frameworks including AIDA (Attention-Interest-Desire-Action), PAS (Problem-Agitate-Solution), FAB (Features-Advantages-Benefits), and social proof formats. User inputs product/service, target audience, and campaign objective — tool outputs multiple headline and body copy variations per framework for A/B testing. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/facebook-ad-copy-generator`,
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
      name: "Social Media Tools",
      item: `${SITE_URL}/tools/category/social-media`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Facebook Ad Copy Generator",
      item: `${SITE_URL}/tools/facebook-ad-copy-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes Facebook ad copy convert well?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "High-converting Facebook ad copy typically has four elements working together. A hook in the first line that stops the scroll — either by addressing the audience's specific pain point, making a bold claim, or opening a pattern interrupt. A clear, specific value proposition that communicates what the product does and for whom in plain language. Social proof or specificity that builds credibility — a customer result, a number, or a specific claim is always more persuasive than vague superlatives. And a clear, single call to action that tells the reader exactly what to do next...",
      },
    },
    {
      "@type": "Question",
      name: "How long should Facebook ad copy be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Facebook ad copy length depends on the campaign objective and audience temperature. For cold audiences seeing your brand for the first time, shorter copy (50–150 words in the body) tends to outperform long copy because the audience hasn't yet developed enough interest to read extensively. For warm audiences who've already visited your site or interacted with your brand, longer copy (200–400 words) can work well because they're willing to engage with more detail...",
      },
    },
    {
      "@type": "Question",
      name: "What is the AIDA formula for Facebook ads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AIDA stands for Attention, Interest, Desire, and Action — a four-stage copywriting framework that guides a reader from first awareness to purchase intent. In Facebook ads: Attention is captured in the first line (the hook) — it interrupts the scroll and makes the reader pause. Interest is built in the next 1–3 sentences by expanding on what the product is and why it's relevant to this specific audience. Desire is created by showcasing the transformation, outcome, or specific benefit the reader will experience — making them want what you're offering...",
      },
    },
    {
      "@type": "Question",
      name: "What is the PAS copywriting framework?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PAS stands for Problem, Agitate, Solution — a three-part copywriting framework that identifies an audience's pain point, intensifies the emotional weight of that problem, then presents the product or service as the relief. In practice: the Problem statement names the specific frustration the audience is experiencing (e.g. 'Struggling to get consistent leads for your consulting business?'). The Agitate section deepens the pain — it expands on the consequences of the problem remaining unsolved, making the reader feel the cost of inaction more acutely...",
      },
    },
    {
      "@type": "Question",
      name: "How many Facebook ad copy variations should I test?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meta (Facebook's parent company) recommends testing 3–5 creative variations per ad set for meaningful A/B test data. For ad copy specifically, testing at least 2–3 variations is the minimum for learning — one variation tells you nothing; two gives you a comparison; three or more gives you a pattern. The most efficient testing approach is to hold one variable constant and change one element at a time: test the same image with different headlines, or the same body copy with different CTAs...",
      },
    },
    {
      "@type": "Question",
      name: "What are Facebook's ad copy character limits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Facebook's ad copy has several distinct character limit zones, each with different truncation behaviour. The primary text (body copy above the image) shows approximately 125 characters before a 'See more' link in the feed — everything after that is hidden until the user clicks to expand. The headline (bold text below the image or video) has a 40-character soft limit before it may be truncated on mobile placements. The description (grey text below the headline) shows 30 characters on most placements. Link descriptions for link ads are often not shown on mobile at all...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Facebook Ad Copy Generator",
  description:
    "Step-by-step guide to using the free Facebook Ad Copy Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Facebook Ad Copy Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Facebook Ad Copy Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function FacebookAdCopyGeneratorPage() {
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
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media-tools"
              className="hover:text-blue-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Facebook Ad Copy Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Facebook Ad Copy Generator — Write High-Converting Facebook Ads Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate multiple Facebook ad copy variations using AIDA, PAS, FAB,
          and other proven copywriting frameworks — enter your product,
          audience, and objective.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Facebook Ad Copy Generator tool">
          <FacebookAdCopyGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="facebook-ad-copy-generator"
          toolName="Facebook Ad Copy Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
