// src/app/tools/pregnancy-due-date-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "pregnancy-due-date-calculator");
const PregnancyDueDateCalculatorClient = dynamic(
  () => import("./PregnancyDueDateCalculatorClient"),
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
  title: "Pregnancy Due Date Calculator — Calculate Your Baby's Due Date",
  description:
    "Calculate your estimated due date (EDD) based on your last menstrual period or conception date. See trimesters and key milestones. Free.",
  keywords:
    "pregnancy due date calculator, due date calculator, estimated due date, baby due date, pregnancy calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/pregnancy-due-date-calculator` },
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
    url: `${SITE_URL}/tools/pregnancy-due-date-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Pregnancy Due Date Calculator — Calculate Your Baby's Due Date",
    description:
      "Calculate your estimated due date (EDD) based on your last menstrual period or conception date. See trimesters and key milestones. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Pregnancy Due Date Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Pregnancy Due Date Calculator — Calculate Your Baby's Due Date",
    description:
      "Calculate your estimated due date (EDD) based on your last menstrual period or conception date. See trimesters and key milestones. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pregnancy Due Date Calculator",
  description:
    "Calculate your estimated due date (EDD) based on your last menstrual period or conception date. See trimesters and key milestones. Free.",
  url: `${SITE_URL}/tools/pregnancy-due-date-calculator`,
  applicationCategory: "HealthApplication",
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
      name: "Health Tools",
      item: `${SITE_URL}/tools/category/health`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Pregnancy Due Date Calculator",
      item: `${SITE_URL}/tools/pregnancy-due-date-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is an estimated due date calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common method is Naegele's Rule: take the first day of your last menstrual period (LMP), add 1 year, subtract 3 months, and add 7 days. This assumes a 40-week pregnancy and a 28-day cycle with ovulation on day 14. For example, an LMP of January 1 gives an EDD of October 8. The alternative — calculating from conception date — is more accurate when the conception date is known precisely (e.g. IVF), as it avoids the 2-week assumption error that Naegele's Rule builds in.",
      },
    },
    {
      "@type": "Question",
      name: "What are the three trimesters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pregnancy is divided into three trimesters: First trimester (weeks 1–13): organ development, morning sickness, high miscarriage risk — ends with the dating ultrasound around weeks 11–14. Second trimester (weeks 14–27): typically the most comfortable phase, anatomy scan around week 20, fetal movement begins. Third trimester (weeks 28–40+): rapid growth, preparation for birth, Group B Strep screening around week 36, weekly check-ups from week 36 onward. 'Full term' is considered 39–40 weeks; 'early term' is 37–38 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is an estimated due date?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An EDD is an estimate, not a scheduled delivery date. Only approximately 4–5% of babies are born on their exact EDD. About 80% of births occur within 2 weeks either side of the EDD (between 38 and 42 weeks). The most accurate due date estimate comes from a first-trimester ultrasound (dating scan) at 10–14 weeks, which can estimate gestational age within ±3–5 days by measuring crown-rump length (CRL). Your midwife or obstetrician will confirm your due date at this scan — it may be adjusted from the LMP calculation.",
      },
    },
    {
      "@type": "Question",
      name: "What if my cycles are not 28 days?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Naegele's Rule assumes a 28-day cycle with ovulation on day 14. If your cycles are shorter (e.g. 24 days), you likely ovulate earlier — your EDD may be a few days earlier than the standard calculation. If your cycles are longer (e.g. 35 days), you may ovulate later — your EDD could be a few days later. The conception date method is more reliable for people with irregular or atypical cycle lengths. Your dating scan will provide the most accurate EDD regardless of cycle length.",
      },
    },
    {
      "@type": "Question",
      name: "What is a full-term pregnancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The American College of Obstetricians and Gynecologists (ACOG) defines gestational age milestones as: Early term (37–38 weeks 6 days), Full term (39–40 weeks 6 days), Late term (41–41 weeks 6 days), and Post-term (42 weeks and beyond). Babies born at 39–40 weeks have the best outcomes for lung maturity and feeding. Elective deliveries (inductions or planned C-sections) are generally not recommended before 39 weeks without a medical indication.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Pregnancy Due Date Calculator",
  description: "Step-by-step guide to using the free Pregnancy Due Date Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Pregnancy Due Date Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Pregnancy Due Date Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function PregnancyDueDateCalculatorPage() {
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
              href="/tools/category/health"
              className="hover:text-rose-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Pregnancy Due Date Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Pregnancy Due Date Calculator — Calculate Your Baby's Due Date
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Pregnancy Due Date Calculator tool">
          <PregnancyDueDateCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="pregnancy-due-date-calculator"
          toolName="Pregnancy Due Date Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
