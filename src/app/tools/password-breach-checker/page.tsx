// src/app/tools/password-breach-checker/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const PasswordBreachCheckerClient = dynamic(
  () => import("./PasswordBreachCheckerClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "password-breach-checker");

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Password Breach Checker — Has Your Password Been Leaked?",
  description:
    "Check if your password has appeared in a known data breach using the Have I Been Pwned k-anonymity API. Your password is never transmitted — only a partial hash. Free, no signup.",
  keywords:
    "password breach checker, have i been pwned, pwned password check, data breach checker, password leak checker, compromised password check",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/password-breach-checker` },
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
    url: `${SITE_URL}/tools/password-breach-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Password Breach Checker — Has Your Password Been Leaked?",
    description:
      "Check a password against known data breaches using k-anonymity — your password is never sent over the network. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Password Breach Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Password Breach Checker — Has Your Password Been Leaked?",
    description:
      "Check if a password has appeared in a known data breach. Privacy-safe k-anonymity lookup. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Password Breach Checker",
  description:
    "Checks a password against the Have I Been Pwned database of breached passwords using the k-anonymity method: the password is hashed with SHA-1 in the browser, and only the first 5 characters of the hash are sent to the API, so the full password or hash never leaves the device.",
  url: `${SITE_URL}/tools/password-breach-checker`,
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
      name: "Password Breach Checker",
      item: `${SITE_URL}/tools/password-breach-checker`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is it safe to type my real password into this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your password never leaves your browser. It's hashed with SHA-1 locally, and only the first 5 characters of that hash are sent to the Have I Been Pwned API — a method called k-anonymity. The API returns every hash suffix that shares that prefix, and the match is found in your browser. As with any tool, if a password is currently in active use somewhere sensitive, it's still good practice to be cautious about where you type it.",
      },
    },
    {
      "@type": "Question",
      name: "What does it mean if my password was found in a breach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It means that exact password has appeared in one or more publicly known data breach dumps — meaning attackers already have it in wordlists used for credential-stuffing attacks. You should stop using that password anywhere, including with minor variations, and change it on any account where it's used.",
      },
    },
    {
      "@type": "Question",
      name: "What data does this check against?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It queries the Have I Been Pwned Pwned Passwords database, which aggregates hundreds of millions of passwords exposed in real-world data breaches. It checks the password itself, not a specific email or account.",
      },
    },
    {
      "@type": "Question",
      name: "My password wasn't found — does that mean it's strong?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. A breach check only tells you whether that exact password has leaked before — it says nothing about length, randomness, or predictability. A password like a pet's name followed by a birth year might not be in the breach database yet but could still be easy to guess. Pair a breach check with a strength check for a fuller picture.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Password Breach Checker",
  description:
    "Step-by-step guide to using the free Password Breach Checker on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Type a password",
      text: "Enter the password you want to check. It's processed locally and never transmitted in full.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Wait for the check",
      text: "The tool hashes the password and checks a partial hash prefix against the breach database automatically.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review the result",
      text: "See whether the password has appeared in known breaches, and how many times.",
    },
  ],
};

export default function PasswordBreachCheckerPage() {
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
            <a href="/" className="hover:text-purple-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/security-tools"
              className="hover:text-purple-600 transition-colors"
            >
              Security Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Password Breach Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1">
          Free Security Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Password Breach Checker — Has Your Password Been Leaked?
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Check a password against known data breaches using a privacy-safe
          k-anonymity lookup — your password is never transmitted.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Password Breach Checker tool">
          <PasswordBreachCheckerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="password-breach-checker"
          toolName="Password Breach Checker"
        />
      </SidebarAdLayout>
    </>
  );
}
