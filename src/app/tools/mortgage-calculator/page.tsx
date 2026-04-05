// src/app/tools/mortgage-calculator/page.tsx
import type { Metadata } from "next";
import MortgageCalculatorClient from "./MortgageCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Mortgage Calculator — Free Online Mortgage Payment Calculator",
  description: "Calculate monthly mortgage payments, total interest, and full amortisation schedule. Enter home price, down payment, interest rate, and loan term. Includes property tax, insurance, PMI, and HOA. Free, no signup.",
  keywords: "mortgage calculator, monthly mortgage payment, mortgage amortisation, home loan calculator, mortgage interest calculator, down payment calculator, house payment calculator, principal and interest",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/mortgage-calculator` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/mortgage-calculator`, siteName: SITE_NAME, locale: "en_US", title: "Mortgage Calculator — Free Online Mortgage Payment Calculator", description: "Calculate monthly mortgage payments, total interest, and full amortisation schedule. Includes property tax, insurance, PMI, and HOA. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Mortgage Calculator" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Mortgage Calculator — Free Monthly Payment & Amortisation Calculator", description: "Monthly payments, total interest, full amortisation schedule. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Mortgage Calculator", description: "Calculates monthly principal-and-interest mortgage payment using the standard amortisation formula, plus optional additional monthly costs (property tax, home insurance, PMI, HOA). Shows total monthly payment, total interest paid, total cost, and a paginated full amortisation schedule. Supports multiple currencies and loan terms 1–50 years. Runs in the browser. Not financial advice.", url: `${SITE_URL}/tools/mortgage-calculator`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Finance Tools", item: `${SITE_URL}/tools/category/finance` }, { "@type": "ListItem", position: 3, name: "Mortgage Calculator", item: `${SITE_URL}/tools/mortgage-calculator` }] };

export default function MortgageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-emerald-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/finance" className="hover:text-emerald-600 transition-colors">Finance Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">Mortgage Calculator</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">Free Finance Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Mortgage Calculator — Free Online Mortgage Payment Calculator</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Calculate monthly mortgage payments, total interest, and a full amortisation schedule — with property tax, insurance, PMI, and HOA included.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Mortgage Calculator tool"><MortgageCalculatorClient /></main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}