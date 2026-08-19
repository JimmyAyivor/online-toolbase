// src/app/tools/social-media-audit/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "social-media-audit");
const SocialMediaAuditClient = dynamic(
  () => import("./SocialMediaAuditClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Social Media Audit Tool — Free Profile Checklist & Score",
  description:
    "Audit your social media presence with a 22-point checklist across profile basics, content quality, engagement, and strategy. Get an instant score and prioritised action list. Free, no signup.",
  keywords:
    "social media audit, social media checklist, instagram audit, profile audit, social media score, social media strategy, content audit, engagement checklist, social media review",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/social-media-audit` },
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
    url: `${SITE_URL}/tools/social-media-audit`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Social Media Audit Tool — Free Profile Checklist & Score",
    description:
      "22-point social media audit checklist across profile basics, content quality, engagement, and strategy. Get an instant score and see what to fix first. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Social Media Audit Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Social Media Audit Tool — Free Profile Checklist & Score",
    description:
      "22-point social media audit checklist. Instant score and prioritised action list. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Social Media Audit Tool",
  description:
    "A 22-point interactive checklist that audits a social media presence across four categories: Profile Basics (6 items), Content Quality (6 items), Engagement (5 items), and Strategy (6 items). Calculates an overall percentage score with a status label (Getting Started through Social Media Pro), shows completed and remaining counts per category, and provides a progress bar. All state is local — no data is stored.",
  url: `${SITE_URL}/tools/social-media-audit`,
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
      name: "Social Media Audit Tool",
      item: `${SITE_URL}/tools/social-media-audit`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I conduct a social media audit effectively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An effective social media audit reviews your presence across four areas: profile fundamentals (bio, photo, username consistency, links), content quality (visual consistency, value, posting frequency), engagement practices (replying to comments, interacting with others, using interactive features), and strategy (hashtags, analytics, content pillars, cross-promotion). Work through the checklist systematically rather than randomly — completing Profile Basics first ensures you have a strong foundation before optimising content and engagement...",
      },
    },
    {
      "@type": "Question",
      name: "How often should I audit my social media?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A monthly audit is the recommended cadence for most creators and brands. Monthly gives you enough time for improvements to take effect before you reassess, while keeping the review regular enough to catch issues early. Quarterly audits are appropriate for less active accounts or those with stable, consistent content strategies. Annual audits are the minimum — at least once per year, review whether your bio, links, profile photo, and strategy are still aligned with your current goals...",
      },
    },
    {
      "@type": "Question",
      name: "What is a content pillar and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A content pillar is a broad theme or topic category that you post about consistently. Most social media strategists recommend 3–5 content pillars that collectively define your account's subject matter and tone. For example, a personal finance creator might use: Educational (explaining financial concepts), Inspirational (success stories and motivational content), and Personal (behind-the-scenes of their own financial journey)...",
      },
    },
    {
      "@type": "Question",
      name: "Why does posting frequency matter for the algorithm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Posting frequency matters because social media algorithms reward consistent, recent activity. Accounts that post regularly signal to the algorithm that they're active, which tends to result in more consistent distribution of each post to followers. Accounts that post sporadically — many posts in one week, then nothing for three weeks — often see inconsistent reach because the algorithm doesn't know when to show their content...",
      },
    },
    {
      "@type": "Question",
      name: "What should I prioritise if my score is below 60%?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your score is below 60%, start with Profile Basics — these are the highest-leverage fixes because every new profile visitor sees them first. Ensure your profile photo is high quality and recognisable at small sizes, your bio clearly communicates what you do and who it's for within the first two lines, your link in bio is working and leads to the right destination, and your username is consistent with your handles on other platforms. Once Profile Basics are solid, move to Content Quality: ensure you're posting at least 3 times per week with original or properly licensed images...",
      },
    },
    {
      "@type": "Question",
      name: "How do I check my social media engagement rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Engagement rate is calculated as total engagements (likes + comments + shares + saves) divided by follower count (or reach), multiplied by 100 to express as a percentage. Most platforms provide this data natively in their analytics sections: Instagram Creator Account → Insights → Account Activity; TikTok → Creator Tools → Analytics; LinkedIn → Post Analytics. As a general benchmark, 1–3% is average for Instagram, 3–9% is average for TikTok, and 0.5–2% is typical for LinkedIn — though these benchmarks vary significantly by niche and account size...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Social Media Audit Tool",
  description:
    "Step-by-step guide to using the free Social Media Audit Tool on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Social Media Audit Tool on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Social Media Audit Tool provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function SocialMediaAuditPage() {
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
              href="/tools/category/social-media-tools"
              className="hover:text-violet-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Social Media Audit Tool
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Social Media Audit Tool — Free Profile Checklist &amp; Score
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Work through the 22-point checklist across profile basics, content
          quality, engagement, and strategy — get an instant score and see
          exactly what to fix.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Social Media Audit tool">
          <SocialMediaAuditClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="social-media-audit"
          toolName="social-media Audit Tool"
        />
      </SidebarAdLayout>
    </>
  );
}
