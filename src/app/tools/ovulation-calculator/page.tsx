// src/app/tools/ovulation-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const OvulationCalculatorClient = dynamic(
  () => import("./OvulationCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "ovulation-calculator");

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Ovulation Calculator — Predict Your Fertile Days",
  description:
    "Calculate your ovulation date and fertile window based on your last period and cycle length. Free, private, no signup.",
  keywords:
    "ovulation calculator, fertile window calculator, ovulation date, when do i ovulate, fertility calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/ovulation-calculator` },
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
    url: `${SITE_URL}/tools/ovulation-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Ovulation Calculator — Predict Your Fertile Days",
    description:
      "Calculate your ovulation date and fertile window based on your last period and cycle length. Free, private, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Ovulation Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Ovulation Calculator — Predict Your Fertile Days",
    description:
      "Calculate your ovulation date and fertile window based on your last period and cycle length. Free, private, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ovulation Calculator",
  description:
    "Calculate your ovulation date and fertile window based on your last period and cycle length. Free, private, no signup.",
  url: `${SITE_URL}/tools/ovulation-calculator`,
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
      name: "Ovulation Calculator",
      item: `${SITE_URL}/tools/ovulation-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When does ovulation occur in the menstrual cycle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ovulation — the release of a mature egg from the ovary — typically occurs approximately 14 days before the start of the next period, not 14 days after the last period. For a standard 28-day cycle, this is around day 14. For a shorter 24-day cycle, it's around day 10. For a longer 35-day cycle, it's around day 21. The luteal phase (from ovulation to the next period) is relatively constant at 12–16 days for most people, while the follicular phase (period start to ovulation) varies more between individuals and cycles.",
      },
    },
    {
      "@type": "Question",
      name: "What is the fertile window?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fertile window is the period during which conception is possible. It spans approximately 6 days: the 5 days before ovulation and the day of ovulation itself. This is because sperm can survive in the female reproductive tract for up to 5 days, while the egg is only viable for 12–24 hours after release. The highest pregnancy probability occurs on the day of ovulation and the 2 days immediately preceding it.",
      },
    },
    {
      "@type": "Question",
      name: "How can I confirm when I'm actually ovulating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Several methods confirm ovulation beyond calendar calculation: (1) Ovulation predictor kits (OPKs) detect the LH surge that precedes ovulation by 24–36 hours — most reliable for timing; (2) Basal body temperature (BBT) charting — temperature rises 0.2–0.5°C after ovulation, confirming it has occurred; (3) Cervical mucus monitoring — mucus becomes clearer, more stretchy (like egg whites) in the days approaching ovulation; (4) Ultrasound monitoring by a healthcare provider. Using two or more methods together gives the most reliable picture.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get pregnant outside the fertile window?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The probability is very low but not zero. Sperm can survive up to 5 days, so intercourse 5 days before ovulation can result in conception. Intercourse after ovulation has very low probability as the egg degrades within 24 hours. Irregular cycles make calendar-based prediction less reliable — LH testing or BBT charting is more accurate for people with variable cycle lengths.",
      },
    },
    {
      "@type": "Question",
      name: "Why might my cycle length vary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cycle length can vary due to stress, illness, travel, significant weight changes, intense exercise, thyroid dysfunction, polycystic ovary syndrome (PCOS), perimenopause, or normal biological variation. A cycle that varies by 3–5 days from month to month is considered normal. Cycles shorter than 21 days or longer than 35 days consistently, or extreme irregularity, warrant evaluation by a gynaecologist.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Ovulation Calculator",
  description:
    "Step-by-step guide to using the free Ovulation Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Ovulation Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Ovulation Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function OvulationCalculatorPage() {
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
            <a href="/" className="hover:text-pink-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/health-fitness-calculators"
              className="hover:text-pink-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Ovulation Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Ovulation Calculator — Predict Your Fertile Days
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Ovulation Calculator tool">
          <OvulationCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="ovulation-calculator"
          toolName="Ovulation Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
