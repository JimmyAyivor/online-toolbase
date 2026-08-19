// src/app/tools/email-subject-line-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const EmailSubjectLineGeneratorClient = dynamic(
  () => import("./EmailSubjectLineGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "email-subject-line-generator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Email Subject Line Generator — High Open-Rate Subject Lines",
  description:
    "Generate compelling email subject lines for any campaign type. Get urgency, curiosity, and personalisation variants instantly. Free, no signup.",
  keywords:
    "email subject line generator, email subject lines, best email subject lines, marketing email subject, newsletter subject line generator, cold email subject line",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/email-subject-line-generator` },
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
    url: `${SITE_URL}/tools/email-subject-line-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Email Subject Line Generator — High Open-Rate Subject Lines",
    description:
      "Generate urgency, curiosity, and personalised email subject line variants for any campaign.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Email Subject Line Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Email Subject Line Generator",
    description:
      "Generate compelling email subject lines for any campaign. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Email Subject Line Generator",
  description:
    "Generate high open-rate email subject lines with urgency, curiosity, and personalisation variants.",
  url: `${SITE_URL}/tools/email-subject-line-generator`,
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
      name: "Email Subject Line Generator",
      item: `${SITE_URL}/tools/email-subject-line-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes an email subject line effective?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Effective subject lines achieve three things: pass the spam filter, appear fully in the preview pane on the recipient's device, and give a compelling reason to open. Specificity beats vagueness (numbers help), relevance beats generic claims, and a clear benefit or curiosity gap beats empty hype. Subject lines that feel personal — using the recipient's name or referencing recent behaviour — consistently outperform generic ones.",
      },
    },
    {
      "@type": "Question",
      name: "How long should an email subject line be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The benchmark is 40–60 characters for broad compatibility. Desktop email clients show ~60–80 characters, but most email is opened on mobile — iOS Mail and Gmail on mobile show ~30–40 characters before truncating. Keep your most compelling words in the first 30 characters so they're seen regardless of device.",
      },
    },
    {
      "@type": "Question",
      name: "Do emojis improve email open rates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Research from multiple ESPs shows emojis in subject lines can improve open rates by 10–56% depending on audience and context. They work best for consumer-facing promotional emails with a conversational brand voice. Emojis typically hurt open rates in B2B and cold outreach contexts. Test with your specific audience rather than assuming aggregate study results apply.",
      },
    },
    {
      "@type": "Question",
      name: "What words should I avoid in email subject lines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spam trigger words that can land emails in junk folders include: FREE (all caps), GUARANTEED, WINNER, CLICK HERE, ACT NOW, and excessive exclamation marks or dollar signs. Beyond spam filters, subject lines that feel manipulative damage brand trust and increase unsubscribes over time. Authentic, specific language that accurately reflects the email's content is the safest long-term approach.",
      },
    },
    {
      "@type": "Question",
      name: "How many subject line variants should I A/B test?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most email platforms support A/B testing two to three variants. For statistically reliable results you need a minimum of ~1,000 recipients per variant. With smaller lists, treat results as directional rather than conclusive. Over time, consistent testing of subject line strategies (urgency vs. benefit, question vs. statement) reveals patterns specific to your audience.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Email Subject Line Generator",
  description:
    "Step-by-step guide to using the free Email Subject Line Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Email Subject Line Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Email Subject Line Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function EmailSubjectLineGeneratorPage() {
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
              href="/tools/category/business-productivity"
              className="hover:text-blue-600 transition-colors"
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Email Subject Line Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Email Subject Line Generator — High Open-Rate Subject Lines
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate compelling email subject lines across different psychological
          trigger styles — urgency, curiosity, benefit, and personalisation.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Email Subject Line Generator tool">
          <EmailSubjectLineGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="email-subject-line-generator"
          toolName="Email Subject Line Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
