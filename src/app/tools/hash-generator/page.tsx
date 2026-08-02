// src/app/tools/hash-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const HashGeneratorClient = dynamic(
  () => import("./HashGeneratorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "hash-generator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title:
    "Free Hash Generator — MD5, SHA-256 & More Instantly",
  description:
    "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes instantly in your browser. Hash text or upload a file. Free, no signup, no data sent to any server.",
  keywords:
    "hash generator, sha256 generator, md5 generator, sha1 generator, sha512 online, cryptographic hash online, hash text online, file hash checker, sha-256 hash free, hash generator tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/hash-generator` },
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
    url: `${SITE_URL}/tools/hash-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Free Hash Generator — MD5, SHA-256 & More Instantly",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly. Hash text or upload a file. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Hash Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Free Hash Generator — MD5, SHA-256 & More Instantly",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes instantly. Hash text or upload a file. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hash Generator",
  description:
    "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes instantly in your browser. Supports text input and file upload. All processing is client-side — no data is sent to any server.",
  url: `${SITE_URL}/tools/hash-generator`,
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
      name: "Hash Generator",
      item: `${SITE_URL}/tools/hash-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a cryptographic hash function?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A cryptographic hash function is a mathematical algorithm that converts any input data — text, a file, or binary data — into a fixed-length string of characters called a hash or digest. Hash functions have three critical properties that make them useful for security applications. First, they are deterministic: the same input always produces the same output. Second, they are one-way: it is computationally infeasible to reverse a hash back to the original input...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between MD5, SHA-1, SHA-256, and SHA-512?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These are four different hash algorithms that produce hashes of different lengths and offer different levels of security. MD5 produces a 128-bit (32 character) hash — it was once widely used but is now considered cryptographically broken and should not be used for security purposes. SHA-1 produces a 160-bit (40 character) hash — also considered weak since 2005, when theoretical attacks were demonstrated, and a full collision was demonstrated in 2017...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use SHA-256 to hash passwords?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SHA-256 alone is not suitable for password hashing in production systems, even though it is a strong hash function. The problem is that SHA-256 is designed to be fast — it can hash billions of passwords per second on modern GPUs, making brute-force and dictionary attacks practical. Password hashing requires a slow, computationally expensive algorithm specifically designed to resist this type of attack...",
      },
    },
    {
      "@type": "Question",
      name: "What are hashes used for in practice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hash functions have many practical applications. Data integrity: software distributions include SHA-256 checksums alongside download links so users can verify the downloaded file hasn't been corrupted or tampered with. Digital signatures: signing a hash of a document (rather than the document itself) is far more efficient — RSA-signed SHA-256 hashes are the foundation of TLS certificates, code signing, and document signing. Git version control: every commit, file, and tree in Git is identified by its SHA-1 hash (Git is migrating to SHA-256)...",
      },
    },
    {
      "@type": "Question",
      name: "What does it mean for a hash function to be 'broken'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hash function is considered broken when researchers have demonstrated a practical collision attack — the ability to find two different inputs that produce the same hash output. A collision breaks the third security property of hash functions and can be exploited in specific attack scenarios. For MD5, practical collision attacks have been known since 2004, and by 2008 researchers used MD5 collisions to create a fraudulent SSL certificate — demonstrating a real-world security impact...",
      },
    },
    {
      "@type": "Question",
      name: "Is the hash generated the same regardless of the browser or device?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — hash functions are deterministic algorithms with standardised specifications. The same input text will always produce the same SHA-256 hash regardless of which browser, operating system, device, or programming language is used to generate it. This is one of the most useful properties of hash functions: you can generate a hash in a browser and compare it to a hash generated by a server-side Python script, a mobile app, or a command-line tool, and they will all match for the same input...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Hash Generator",
  description: "Step-by-step guide to using the free Hash Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Hash Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Hash Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function HashGeneratorPage() {
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
            <a href="/" className="hover:text-violet-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer"
              className="hover:text-violet-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Hash Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Hash Generator — Generate MD5, SHA-1, SHA-256, SHA-512 Hashes Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly —
          hash text or upload a file, all in your browser.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Hash Generator tool">
          <HashGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="hash-generator" toolName="Hash Generator" />
      </SidebarAdLayout>
    </>
  );
}
