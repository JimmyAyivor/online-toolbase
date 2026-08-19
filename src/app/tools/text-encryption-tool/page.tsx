// src/app/tools/text-encryption-tool/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const TextEncryptionToolClient = dynamic(
  () => import("./TextEncryptionToolClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "text-encryption-tool");

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Text Encryption Tool — Encrypt & Decrypt with a Passphrase",
  description:
    "Encrypt or decrypt text with AES-256-GCM using a passphrase, entirely in your browser. Nothing is transmitted or stored. Free, no signup.",
  keywords:
    "text encryption tool, encrypt text online, aes encryption online, decrypt text, passphrase encryption, secure text encryptor",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-encryption-tool` },
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
    url: `${SITE_URL}/tools/text-encryption-tool`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Text Encryption Tool — Encrypt & Decrypt with a Passphrase",
    description:
      "AES-256-GCM text encryption and decryption, fully in-browser. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Text Encryption Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Text Encryption Tool — Encrypt & Decrypt with a Passphrase",
    description:
      "Encrypt or decrypt text with a passphrase using AES-256-GCM, entirely client-side. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Encryption Tool",
  description:
    "Encrypts and decrypts text using AES-256-GCM with a key derived from a user-supplied passphrase via PBKDF2 (150,000 iterations, SHA-256), all performed locally using the Web Crypto API. A fresh random salt and IV are generated for every encryption.",
  url: `${SITE_URL}/tools/text-encryption-tool`,
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
      name: "Text Encryption Tool",
      item: `${SITE_URL}/tools/text-encryption-tool`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What encryption does this use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AES-256-GCM, an authenticated encryption algorithm widely used in modern secure protocols. Your passphrase is stretched into a 256-bit key using PBKDF2 with 150,000 iterations and a random salt, so the same passphrase produces a different key (and different ciphertext) every time you encrypt.",
      },
    },
    {
      "@type": "Question",
      name: "How do I share the encrypted text with someone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copy the encrypted output and send it through whatever channel you'd normally use — email, chat, etc. — then share the passphrase separately through a different channel (like a phone call), so a single intercepted message doesn't expose both.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I lose the passphrase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The text is unrecoverable. There's no backdoor, master key, or password reset — that's the point of the encryption. Make sure both sender and recipient have a reliable way to remember or store the passphrase.",
      },
    },
    {
      "@type": "Question",
      name: "Is this a replacement for a proper encrypted messaging app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's well suited to encrypting a single note or message you'll share through another channel. For ongoing encrypted conversations, a dedicated end-to-end encrypted messenger (like Signal) handles key exchange and forward secrecy in ways a one-off text tool doesn't.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Text Encryption Tool",
  description:
    "Step-by-step guide to using the free Text Encryption Tool on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose Encrypt or Decrypt",
      text: "Select the mode you need at the top of the tool.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your text and passphrase",
      text: "Type or paste the text, then choose a strong passphrase.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy the result",
      text: "Copy the encrypted or decrypted output to use elsewhere.",
    },
  ],
};

export default function TextEncryptionToolPage() {
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
              href="/tools/category/security-tools"
              className="hover:text-violet-600 transition-colors"
            >
              Security Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Text Encryption Tool
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Security Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Text Encryption Tool — Encrypt & Decrypt with a Passphrase
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          AES-256-GCM text encryption and decryption using a passphrase —
          entirely in your browser, nothing transmitted.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Text Encryption Tool">
          <TextEncryptionToolClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="text-encryption-tool"
          toolName="Text Encryption Tool"
        />
      </SidebarAdLayout>
    </>
  );
}
