// src/app/tools/youtube-title-description-generator/page.tsx
import type { Metadata } from "next";
import YouTubeTitleDescriptionGeneratorClient from "./YouTubeTitleDescriptionGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "YouTube Title & Description Generator — Free Online YouTube SEO Generator",
  description: "Generate SEO-optimized YouTube titles and descriptions. Enter your topic and content type, get multiple title options and a full description with chapters, hashtags, and keyword sections. Free, no signup.",
  keywords: "youtube title generator, youtube description generator, youtube SEO, youtube title ideas, youtube video description, youtube metadata, youtube channel growth, video SEO tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/youtube-title-description-generator` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/youtube-title-description-generator`, siteName: SITE_NAME, locale: "en_US", title: "YouTube Title & Description Generator — Free Online YouTube SEO Generator", description: "Generate SEO-optimized YouTube titles and descriptions. Multiple title styles, full description with chapters and hashtags. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free YouTube Title & Description Generator" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "YouTube Title & Description Generator — Free Online YouTube SEO Generator", description: "Generate SEO-optimized YouTube titles and descriptions. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "YouTube Title & Description Generator", description: "Generates SEO-optimized YouTube video titles in multiple styles (question, how-to, list, secret/insider, challenge, story) and a full video description including opening hook, chapter timestamps, keyword-rich body paragraphs, call to action, hashtags, and links section. Accepts topic, content type, and target audience as inputs. Runs in the browser.", url: `${SITE_URL}/tools/youtube-title-description-generator`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Social Media Tools", item: `${SITE_URL}/tools/category/social-media` }, { "@type": "ListItem", position: 3, name: "YouTube Title & Description Generator", item: `${SITE_URL}/tools/youtube-title-description-generator` }] };

export default function YouTubeTitleDescriptionGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-red-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/social-media" className="hover:text-red-600 transition-colors">Social Media Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">YouTube Title &amp; Description Generator</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">Free Social Media Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">YouTube Title &amp; Description Generator — Free Online YouTube SEO Generator</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Generate SEO-optimized YouTube titles and descriptions — multiple title styles, full description with chapters, hashtags, and keyword sections.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="YouTube Title and Description Generator tool"><YouTubeTitleDescriptionGeneratorClient /></main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}