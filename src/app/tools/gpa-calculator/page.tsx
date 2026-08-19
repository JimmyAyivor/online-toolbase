// src/app/tools/gpa-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const GpaCalculatorClient = dynamic(() => import("./GpaCalculatorClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "gpa-calculator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "GPA Calculator — Calculate Your GPA Free Online",
  description:
    "Calculate your GPA by entering course grades and credit hours. Supports letter grades (A+ to F) and percentage grades. Shows cumulative GPA and per-course contribution. Free, no signup.",
  keywords:
    "GPA calculator, grade point average calculator, college GPA, cumulative GPA, letter grade GPA, credit hour GPA, academic GPA calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/gpa-calculator` },
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
    url: `${SITE_URL}/tools/gpa-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "GPA Calculator — Calculate Your GPA Free Online",
    description:
      "Calculate cumulative GPA from course grades and credit hours. Supports A+ to F letter grades and percentage grades. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free GPA Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "GPA Calculator — Calculate Your GPA Free Online",
    description:
      "Calculate GPA from grades and credit hours. Letter grades and percentages. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GPA Calculator",
  description:
    "Calculates cumulative GPA from multiple courses. Accepts letter grades (A+ through F on a 4.0 scale) and credit/unit hours per course. Displays each course's grade points, total credit hours, and weighted cumulative GPA. Courses can be added or removed dynamically. Runs in the browser.",
  url: `${SITE_URL}/tools/gpa-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "GPA Calculator",
      item: `${SITE_URL}/tools/gpa-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is GPA calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPA (Grade Point Average) is calculated by multiplying each course's grade points by its credit hours (producing 'quality points'), summing the quality points across all courses, then dividing by the total credit hours. The formula is: GPA = Total Quality Points ÷ Total Credit Hours. Quality points per course = Grade Points × Credit Hours. On the standard 4.0 scale: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between GPA and CGPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPA (Grade Point Average) typically refers to the average for a single semester or term. CGPA (Cumulative Grade Point Average) is the GPA calculated across all semesters completed — it represents your overall academic standing for your entire programme. This calculator computes the GPA for the courses you enter. If you want your CGPA, enter all courses from all semesters simultaneously. If your institution calculates CGPA differently (e.g. using a running average of semester GPAs), the result may differ from this tool's calculation, which uses the weighted quality-point method throughout.",
      },
    },
    {
      "@type": "Question",
      name: "What GPA do I need for graduate school, honours, or a specific programme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Requirements vary by institution, programme, and country. As a general guide for US institutions: Summa Cum Laude (highest academic distinction) typically requires a 3.9–4.0 GPA; Magna Cum Laude 3.7–3.9; Cum Laude 3.5–3.7. For graduate school admission, most programmes expect a minimum of 3.0–3.3, with competitive programmes in medicine, law, and top universities often expecting 3.5–3.9. For scholarships and competitive internships, 3.5+ is a common threshold. Check your specific institution's and programme's exact requirements — these vary significantly...",
      },
    },
    {
      "@type": "Question",
      name: "How many credit hours does each course typically count?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Credit hours vary by course type and institution, but common patterns in US universities include: a standard lecture course 3 credit hours; a lab component 1 credit hour (often attached to a 3-credit lecture, making a 4-credit course total); physical education or activity courses 1 credit hour; seminars 2–3 credit hours; major capstone or thesis projects 3–6 credit hours. A full-time student typically takes 12–18 credit hours per semester. Check your specific course catalogue for exact credit allocations — this tool accepts any positive number of credits per course.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to my GPA if I retake a course?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grade replacement policies vary by institution. Some universities replace the original grade with the new grade in GPA calculations (grade forgiveness); others average both attempts; still others include both grades but only count the credits once. At most US institutions with grade replacement, retaking a course in which you received a low grade can significantly improve your GPA, since the failing or low grade is removed from the calculation entirely. Check your specific institution's academic policy on repeated courses before planning a retake strategy.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the GPA Calculator",
  description:
    "Step-by-step guide to using the free GPA Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free GPA Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The GPA Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function GpaCalculatorPage() {
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
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculators"
              className="hover:text-indigo-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              GPA Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          GPA Calculator — Calculate Your GPA Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Add your courses with grades and credit hours — get your cumulative
          GPA on the 4.0 scale instantly with a per-course breakdown.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="GPA Calculator tool">
          <GpaCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="gpa-calculator" toolName="GPA Calculator" />
      </SidebarAdLayout>
    </>
  );
}
