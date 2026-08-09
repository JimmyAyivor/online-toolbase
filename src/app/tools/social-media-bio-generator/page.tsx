// src/app/tools/social-media-bio-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "social-media-bio-generator");
const SocialMediaBioGeneratorClient = dynamic(
  () => import("./SocialMediaBioGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Social Media Bio Generator — All Platforms",
  description:
    "Generate optimised social media bios for Instagram, LinkedIn, Twitter/X, TikTok, YouTube, and more. Enter your name, profession, keywords, and tone — get a ready-to-use bio with a live character counter. Free, no signup.",
  keywords:
    "social media bio generator, instagram bio generator, linkedin bio generator, twitter bio generator, tiktok bio, youtube about me, profile bio, bio ideas, bio template, free bio generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/social-media-bio-generator` },
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
    url: `${SITE_URL}/tools/social-media-bio-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Social Media Bio Generator — All Platforms",
    description:
      "Generate ready-to-use bios for Instagram, LinkedIn, Twitter/X, TikTok, and YouTube. Choose platform, tone, and keywords — get a bio with character counter. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Social Media Bio Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Social Media Bio Generator — All Platforms",
    description:
      "Generate bios for Instagram, LinkedIn, Twitter/X, TikTok, and YouTube. Choose tone and keywords. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Social Media Bio Generator",
  description:
    "Generates optimised social media profile bios for Instagram, LinkedIn, Twitter/X, TikTok, YouTube, and other platforms. User inputs name, profession, keywords, tone (professional, casual, funny, inspirational), and platform — tool outputs a ready-to-use bio with a live character counter matched to each platform's limit. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/social-media-bio-generator`,
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
      name: "Social Media Bio Generator",
      item: `${SITE_URL}/tools/social-media-bio-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should I include in a social media bio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong social media bio typically includes four elements: who you are (name or brand), what you do (role, niche, or expertise), who you serve or what value you provide (your audience or the problem you solve), and a call to action or personality element (a link, a location, a memorable phrase, or a well-placed emoji)...",
      },
    },
    {
      "@type": "Question",
      name: "How long should a social media bio be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each platform has its own character limit that defines the maximum bio length, and each has a practical 'sweet spot' that's often shorter than the maximum. Instagram allows 150 characters — most effective bios use 100–140 characters, leaving room to breathe. LinkedIn's summary field allows 2,600 characters, but the profile bio/headline visible in search is 220 characters; most users see only the first couple of lines without clicking 'See more'. Twitter/X has a 160-character bio limit — treat every character as valuable...",
      },
    },
    {
      "@type": "Question",
      name: "Should I use emojis in my social media bio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Emojis in bios are effective on Instagram and TikTok, where they serve as visual breaks and personality signals, and are acceptable on Twitter/X for casual or creator accounts. On LinkedIn, emojis are generally appropriate for personal brands and creators but should be used sparingly (1–2 maximum) for corporate or B2B professional accounts — overuse reads as informal on a platform associated with professional networking. On YouTube, emojis in the About section can help with scannability. A practical rule: match the platform's dominant tone...",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between a bio and an 'About' section?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On most platforms, the 'bio' refers to the short text that appears directly under your username or profile photo — visible without any additional clicks. The 'About' section (used on YouTube and Facebook) typically refers to a longer-form description that requires a click or scroll to read in full. Bios are higher-stakes because they're the first text a new visitor reads — they function like a headline. About sections allow more context, credentials, and keywords...",
      },
    },
    {
      "@type": "Question",
      name: "Should my bio be the same across all platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — your core identity can be consistent, but your bio should be adapted to each platform's audience, character limits, and tone norms. LinkedIn audiences expect professional credentials and clear value propositions. Instagram audiences expect personality, a clear niche, and optionally a CTA. Twitter/X audiences reward wit, specificity, or a memorable claim. TikTok audiences want a quick niche signal and nothing else. A bio that works perfectly on LinkedIn will feel stiff on Instagram and too long for TikTok...",
      },
    },
    {
      "@type": "Question",
      name: "How do I write a bio that attracts followers in my niche?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Niche-attracting bios do two things: they include the words and phrases your target audience actually searches for, and they make an immediate, specific promise about what value you provide. For discoverability, use the terms people search on each platform — Instagram and TikTok bios are indexed by their internal search, so including your niche keywords (e.g. 'plant-based recipes', 'beginner investing', 'UX design') can drive profile discovery...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Social Media Bio Generator",
  description:
    "Step-by-step guide to using the free Social Media Bio Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Social Media Bio Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Social Media Bio Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function SocialMediaBioGeneratorPage() {
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
            <a href="/" className="hover:text-amber-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media-tools"
              className="hover:text-amber-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Social Media Bio Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Social Media Bio Generator — Write the Perfect Bio for Instagram,
          LinkedIn &amp; More
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate a ready-to-use bio for Instagram, LinkedIn, Twitter/X,
          TikTok, or YouTube — choose your platform, tone, and keywords and get
          a bio with a live character counter.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Social Media Bio Generator tool">
          <SocialMediaBioGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="social-media-bio-generator"
          toolName="social-media Bio Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
