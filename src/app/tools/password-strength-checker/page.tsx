// src/app/tools/password-strength-checker/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const PasswordStrengthCheckerClient = dynamic(
  () => import("./PasswordStrengthCheckerClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "password-strength-checker");

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes a password strong?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong password has four key properties: length (12+ characters is the minimum for modern security; 16+ is better), complexity (mix of uppercase, lowercase, numbers, and special characters), uniqueness (not a word from a dictionary or common phrase), and unpredictability (not based on personal information like birthdays, names, or addresses). The most practical strong passwords are either long random passphrases (4+ random words strung together) or randomly generated character strings managed in a password manager.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to type my real password into this checker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This password checker runs entirely in your browser using JavaScript — your password is never sent to any server or stored anywhere. You can verify this by checking your browser's network activity (DevTools → Network) while typing — no requests are made. However, as a general security best practice, avoid typing passwords into any online tool you cannot fully verify. Use this tool to understand strength principles and check password patterns rather than your actual live passwords.",
      },
    },
    {
      "@type": "Question",
      name: "What is a passphrase and why is it recommended?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A passphrase is a sequence of random words used as a password — for example, 'correct-horse-battery-staple'. Passphrases are long (typically 20–40 characters), easy to remember, and extremely difficult to crack because of their length. The key is that the words must be truly random — not a common phrase, song lyric, or meaningful sentence. Use a dice-based word list (Diceware) or a password manager's passphrase generator to pick random words. A 4-word Diceware passphrase has more entropy than most complex 10-character passwords.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I use a password manager?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A password manager solves the fundamental password problem: strong passwords are hard to remember, so people reuse weak ones. A password manager generates, stores, and autofills unique random passwords for every account — you only need to remember one master password. This eliminates reuse (the single biggest cause of account compromises), enables genuinely random passwords, and reduces phishing vulnerability (good managers only autofill on the correct domain). Reputable options include Bitwarden (open source, free tier available), 1Password, and Dashlane.",
      },
    },
    {
      "@type": "Question",
      name: "What is two-factor authentication and should I enable it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two-factor authentication (2FA) requires a second verification step beyond your password — typically a code from an authenticator app (Google Authenticator, Authy) or a physical security key. Even if someone steals your password, they cannot access your account without the second factor. Enable 2FA on all important accounts: email, banking, cloud storage, social media, and work tools. Authenticator app codes are more secure than SMS codes (which can be intercepted via SIM swapping). Password strength matters, but 2FA adds a layer that is independent of password security.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Password Strength Checker",
  description: "Step-by-step guide to using the free Password Strength Checker on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Password Strength Checker on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Password Strength Checker provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function PasswordStrengthCheckerPage() {
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
            <a href="/" className="hover:text-red-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/productivity"
              className="hover:text-red-600 transition-colors"
            >
              Productivity Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Password Strength Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Password Strength Checker — How Strong Is Your Password?
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Password Strength Checker tool">
          <PasswordStrengthCheckerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="password-strength-checker"
          toolName="Password Strength Checker"
        />
      </SidebarAdLayout>
    </>
  );
}
