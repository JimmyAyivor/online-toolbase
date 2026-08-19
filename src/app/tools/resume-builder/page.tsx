// src/app/tools/resume-builder/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "resume-builder");
const ResumeBuilderClient = dynamic(() => import("./ResumeBuilderClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Resume Builder — Download Professional Resume",
  description:
    "Build a professional resume with sections for work experience, education, skills, and a summary. Live preview updates as you type. Download as PDF. Free, no signup, no data stored.",
  keywords:
    "resume builder, free resume builder, online resume maker, CV builder, resume template, resume PDF download, professional resume, ATS resume, resume creator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/resume-builder` },
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
    url: `${SITE_URL}/tools/resume-builder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Resume Builder — Download Professional Resume",
    description:
      "Build a resume with work experience, education, skills, and summary. Live preview. Download as PDF. Free, no signup, no data stored.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Resume Builder — Download Professional Resume",
    description:
      "Build a professional resume with live preview and PDF download. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Resume Builder",
  description:
    "Builds a professional resume with sections for personal details, professional summary, work experience (multiple entries with dates and bullet points), education, and skills. Includes a live preview that updates as you type and a one-click PDF download. All data stays in the browser — nothing is sent to or stored on servers.",
  url: `${SITE_URL}/tools/resume-builder`,
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
      name: "Business Tools",
      item: `${SITE_URL}/tools/category/business`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Resume Builder",
      item: `${SITE_URL}/tools/resume-builder`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should a resume be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standard resume length is one page for candidates with under 10 years of experience, and two pages for more experienced professionals with extensive relevant experience to show. Three-page resumes are rarely appropriate except in academic CV contexts (where the format is different from a standard resume) or very senior executive roles...",
      },
    },
    {
      "@type": "Question",
      name: "What is an ATS and how do I make my resume ATS-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ATS stands for Applicant Tracking System — software used by most medium and large employers to scan, parse, and rank resumes before a human recruiter sees them. ATS systems extract text from your resume and compare keywords, job titles, and skills against the job description requirements. An ATS-unfriendly resume gets filtered out before any human reads it...",
      },
    },
    {
      "@type": "Question",
      name: "How should I format my work experience bullet points?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Effective resume bullet points follow the CAR or STAR structure: start with a strong action verb, describe what you did, and quantify the result where possible. The formula is: '[Action verb] + [what you did] + [measurable outcome]'...",
      },
    },
    {
      "@type": "Question",
      name: "Should I include a professional summary on my resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — a 3–5 sentence professional summary at the top of your resume is valuable for most candidates, especially those with more than 3 years of experience. The summary gives recruiters an immediate snapshot of who you are and what you bring, without requiring them to read the entire document. It's also an opportunity to include targeted keywords for ATS systems and to address any context that the rest of your resume doesn't immediately convey (such as a career transition, a gap, or an unusual background)...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a resume and a CV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the US and Canada, 'resume' and 'CV' are sometimes used interchangeably in casual conversation, but they refer to different documents in professional contexts. A resume is a concise 1–2 page document tailored to a specific job application, focused on relevant work experience, skills, and achievements...",
      },
    },
    {
      "@type": "Question",
      name: "Should I tailor my resume for each job application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — tailoring your resume to each job application significantly improves your callback rate. Tailoring doesn't mean rewriting your entire resume from scratch; it means adjusting your professional summary, reordering or emphasising relevant bullet points, and ensuring your skills section mirrors the keywords and requirements in the specific job description. Many candidates submit an identical resume to every job — employers and ATS systems can tell...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Resume Builder",
  description:
    "Step-by-step guide to using the free Resume Builder on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Resume Builder on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Resume Builder provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function ResumeBuilderPage() {
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
              Resume Builder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Resume Builder — Build &amp; Download a Professional Resume Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Build a professional resume with work experience, education, skills,
          and summary — live preview updates as you type and downloads as a PDF.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Resume Builder tool">
          <ResumeBuilderClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="resume-builder" toolName="Resume Builder" />
      </SidebarAdLayout>
    </>
  );
}
