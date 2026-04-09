// src/app/tools/color-contrast-checker/page.tsx
import type { Metadata } from "next";
import ColorContrastCheckerClient from "./ColorContrastCheckerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Color Contrast Checker — WCAG AA & AAA Accessibility Ratio Tool",
  description:
    "Check color contrast ratios for WCAG AA and AAA accessibility compliance. Test text and background color pairs instantly. Free, no signup.",
  keywords:
    "color contrast checker, WCAG contrast ratio, accessibility contrast, AA contrast ratio, AAA contrast ratio, text background contrast, color accessibility checker",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/color-contrast-checker` },
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
    url: `${SITE_URL}/tools/color-contrast-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Color Contrast Checker — WCAG AA & AAA Accessibility",
    description:
      "Test text/background color pairs against WCAG AA and AAA contrast ratio standards instantly.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Color Contrast Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Color Contrast Checker — WCAG AA & AAA",
    description:
      "Check WCAG color contrast ratios for web accessibility. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Color Contrast Checker",
  description:
    "Check color contrast ratios for WCAG AA and AAA accessibility compliance.",
  url: `${SITE_URL}/tools/color-contrast-checker`,
  applicationCategory: "DesignApplication",
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
      name: "Design Tools",
      item: `${SITE_URL}/tools/category/design`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Color Contrast Checker",
      item: `${SITE_URL}/tools/color-contrast-checker`,
    },
  ],
};

export default function ColorContrastCheckerPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label='Breadcrumb' className='max-w-6xl mx-auto px-4 pt-4 pb-2'>
        <ol className='flex items-center gap-2 text-sm text-gray-500'>
          <li>
            <a href='/' className='hover:text-violet-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/design'
              className='hover:text-violet-600 transition-colors'
            >
              Design Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Color Contrast Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1'>
          Free Design Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Color Contrast Checker — WCAG AA & AAA Accessibility Ratio Tool
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Check text and background color pairs for WCAG AA and AAA contrast
          ratio compliance — see pass/fail for normal text, large text, and UI
          components.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Color Contrast Checker tool'>
          <ColorContrastCheckerClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="color-contrast-checker" toolName="Color Contrast Checker" />
      </SidebarAdLayout>
    </>
  );
}
