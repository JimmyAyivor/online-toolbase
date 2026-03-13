// src/app/tools/password-strength-checker/page.tsx
import type { Metadata } from "next";
import PasswordStrengthCheckerClient from "./PasswordStrengthCheckerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Password Strength Checker — How Strong Is Your Password?",
  description:
    "Check password strength instantly and get actionable tips to make it stronger. 100% private — never sent to any server.",
  keywords:
    "password strength checker, password strength test, strong password checker, password meter, password security",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/password-strength-checker` },
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
    url: `${SITE_URL}/tools/password-strength-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Password Strength Checker — How Strong Is Your Password?",
    description:
      "Check password strength instantly and get actionable tips to make it stronger. 100% private — never sent to any server.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Password Strength Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Password Strength Checker — How Strong Is Your Password?",
    description:
      "Check password strength instantly and get actionable tips to make it stronger. 100% private — never sent to any server.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Password Strength Checker",
  description:
    "Check password strength instantly and get actionable tips to make it stronger. 100% private — never sent to any server.",
  url: `${SITE_URL}/tools/password-strength-checker`,
  applicationCategory: "UtilitiesApplication",
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
      name: "Productivity Tools",
      item: `${SITE_URL}/tools/category/productivity`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Password Strength Checker",
      item: `${SITE_URL}/tools/password-strength-checker`,
    },
  ],
};

export default function PasswordStrengthCheckerPage() {
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
            <a href='/' className='hover:text-red-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/productivity'
              className='hover:text-red-600 transition-colors'
            >
              Productivity Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Password Strength Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-red-600 uppercase tracking-widest mb-1'>
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Password Strength Checker — How Strong Is Your Password?
        </h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Password Strength Checker tool'>
          <PasswordStrengthCheckerClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
