// src/app/tools/file-checksum-verifier/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const FileChecksumVerifierClient = dynamic(
  () => import("./FileChecksumVerifierClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "file-checksum-verifier");

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "File Checksum Verifier — MD5, SHA-1, SHA-256, SHA-512",
  description:
    "Compute a file's MD5, SHA-1, SHA-256, or SHA-512 checksum right in your browser and compare it against a published hash to verify integrity. Files never leave your device. Free, no signup.",
  keywords:
    "file checksum verifier, md5 checksum, sha256 checksum, sha1 hash, file hash checker, verify file integrity, checksum calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/file-checksum-verifier` },
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
    url: `${SITE_URL}/tools/file-checksum-verifier`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "File Checksum Verifier — MD5, SHA-1, SHA-256, SHA-512",
    description:
      "Compute and verify a file's checksum entirely in your browser — MD5, SHA-1, SHA-256, SHA-512. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free File Checksum Verifier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "File Checksum Verifier — MD5, SHA-1, SHA-256, SHA-512",
    description:
      "Verify a file's integrity by computing its checksum locally in your browser. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "File Checksum Verifier",
  description:
    "Computes a file's MD5, SHA-1, SHA-256, and SHA-512 hashes entirely in the browser using the Web Crypto API (with a local MD5 implementation), and compares the result against a user-supplied expected hash to confirm file integrity. Files are never uploaded to a server.",
  url: `${SITE_URL}/tools/file-checksum-verifier`,
  applicationCategory: "SecurityApplication",
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
      name: "Security Tools",
      item: `${SITE_URL}/tools/category/security-tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "File Checksum Verifier",
      item: `${SITE_URL}/tools/file-checksum-verifier`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why would I check a file's checksum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A checksum is a fingerprint of a file's exact contents. Software publishers often list the expected hash next to a download so you can confirm the file wasn't corrupted during download or tampered with by a compromised mirror or man-in-the-middle.",
      },
    },
    {
      "@type": "Question",
      name: "Which algorithm should I use — MD5, SHA-1, or SHA-256?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use whichever hash the publisher listed, since that's what you need to compare against. For security-sensitive verification where you have a choice, prefer SHA-256 or SHA-512 — MD5 and SHA-1 are broken for cryptographic purposes (collisions can be engineered), though they're still fine for catching accidental corruption.",
      },
    },
    {
      "@type": "Question",
      name: "Does my file get uploaded anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The file is read and hashed locally using your browser's Web Crypto API and a local MD5 implementation for MD5 specifically. Nothing is sent to a server, which also means very large files may take a moment as your device does all the work.",
      },
    },
    {
      "@type": "Question",
      name: "The hashes don't match — what should I do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Re-download the file first, since a mismatch is most often caused by an incomplete or corrupted download. If it still doesn't match after a clean re-download, don't run or open the file — download it from the official source only, and double-check you copied the expected hash correctly.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the File Checksum Verifier",
  description:
    "Step-by-step guide to using the free File Checksum Verifier on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose a file",
      text: "Drag a file in or click to browse. It's read locally — never uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Pick an algorithm",
      text: "Select MD5, SHA-1, SHA-256, or SHA-512 to see that hash.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Compare the hash",
      text: "Paste the expected hash from the publisher to instantly confirm a match.",
    },
  ],
};

export default function FileChecksumVerifierPage() {
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
              href="/tools/category/security-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Security Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              File Checksum Verifier
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Security Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          File Checksum Verifier — MD5, SHA-1, SHA-256, SHA-512
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Compute a file's checksum locally and compare it against a
          published hash to verify integrity — files never leave your
          device.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="File Checksum Verifier tool">
          <FileChecksumVerifierClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="file-checksum-verifier"
          toolName="File Checksum Verifier"
        />
      </SidebarAdLayout>
    </>
  );
}
