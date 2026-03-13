// src/app/tools/markdown-to-html-converter/page.tsx
import type { Metadata } from "next";
import MarkdownToHtmlConverterClient from "./MarkdownToHtmlConverterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Markdown to HTML Converter — Free Online Converter with Live Preview",
  description:
    "Convert Markdown to clean HTML instantly with a live rendered preview and syntax-highlighted output. Supports headings, tables, code blocks, lists, links, images, and more. Free, no signup.",
  keywords:
    "markdown to html converter, markdown to html, markdown converter online, markdown preview, markdown parser, convert md to html, markdown syntax, github markdown, commonmark, free markdown tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/markdown-to-html-converter` },
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
    url: `${SITE_URL}/tools/markdown-to-html-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Markdown to HTML Converter — Free Online Converter with Live Preview",
    description:
      "Convert Markdown to clean HTML with a live rendered preview. Supports headings, tables, code blocks, lists, links, and more. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Markdown to HTML Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Markdown to HTML Converter — Free Online Converter with Live Preview",
    description:
      "Convert Markdown to HTML instantly with a live preview. Supports tables, code blocks, lists, and more. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Markdown to HTML Converter",
  description:
    "Convert Markdown text to clean HTML with a live rendered preview and syntax-highlighted code output. Supports headings, paragraphs, bold, italic, links, images, lists, blockquotes, tables, and code blocks.",
  url: `${SITE_URL}/tools/markdown-to-html-converter`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Markdown to HTML Converter",
      item: `${SITE_URL}/tools/markdown-to-html-converter`,
    },
  ],
};

export default function MarkdownToHtmlConverterPage() {
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
            <a href='/' className='hover:text-blue-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/developer'
              className='hover:text-blue-600 transition-colors'
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Markdown to HTML Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1'>
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Markdown to HTML Converter — Free Online Converter with Live Preview
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Convert Markdown to clean HTML with a live rendered preview — supports
          tables, code blocks, headings, links, and more.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Markdown to HTML Converter tool'>
          <MarkdownToHtmlConverterClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
