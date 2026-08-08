// src/app/tools/jwt-decoder/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const JwtDecoderClient = dynamic(() => import("./JwtDecoderClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "jwt-decoder");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free JWT Decoder — Inspect Tokens Instantly Online",
  description:
    "Decode JWT tokens in your browser — inspect the header, payload claims, expiry, and signature instantly. No data leaves your device. Free, no signup.",
  keywords:
    "jwt decoder, decode jwt, jwt token decoder, jwt inspector, jwt claims, jwt expiry checker, json web token decoder, jwt header payload, base64url decode, free jwt tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/jwt-decoder` },
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
    url: `${SITE_URL}/tools/jwt-decoder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free JWT Decoder — Inspect Tokens Instantly Online",
    description:
      "Decode JWT tokens in your browser — inspect header, payload claims, expiry timestamps, and signature. Nothing leaves your device. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online JWT Decoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free JWT Decoder — Inspect Tokens Instantly Online",
    description:
      "Decode JWT tokens instantly — inspect header, payload, expiry, and claims. Runs entirely in your browser. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JWT Decoder",
  description:
    "Decode and inspect JSON Web Tokens (JWT) entirely in your browser. Displays the decoded header, payload claims (including iat, exp, nbf, sub, iss), expiry status, and Base64URL-encoded signature. No data is sent to any server.",
  url: `${SITE_URL}/tools/jwt-decoder`,
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
      name: "JWT Decoder",
      item: `${SITE_URL}/tools/jwt-decoder`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a JWT and what are its three parts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JWT stands for JSON Web Token — a compact, URL-safe format for transmitting claims between two parties. A JWT consists of three Base64URL-encoded segments separated by dots: the header, the payload, and the signature. The header is a JSON object that identifies the token type (typ: JWT) and the signing algorithm used (alg: HS256, RS256, ES256, etc.). The payload is a JSON object containing claims — statements about an entity (typically a user) and additional metadata...",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to decode a JWT in a browser tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — decoding a JWT does not require the secret key and poses no security risk. The header and payload are simply Base64URL-encoded, not encrypted, meaning anyone who has the token can read their contents. The sensitive part of a JWT is the signature, which is used for verification (proving the token is authentic and hasn't been modified) — but signature verification requires the secret key and is not performed by this decoder. This tool decodes the header and payload entirely within your browser, and no data is transmitted to any server...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between decoding and verifying a JWT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Decoding a JWT means extracting and displaying the header and payload contents — this requires no secret key and anyone can do it. Verifying a JWT means checking that the signature is valid, which requires the secret key (for HMAC algorithms like HS256) or the public key (for asymmetric algorithms like RS256 and ES256). Verification confirms two things: the token was signed by a trusted party (authenticity), and the token has not been modified since it was signed (integrity)...",
      },
    },
    {
      "@type": "Question",
      name: "What do the standard JWT claim fields mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The JWT specification defines several registered claim names with specific meanings. sub (subject) — the principal that the JWT is about, typically a user ID. iss (issuer) — the entity that issued the token, such as your auth server's domain. aud (audience) — the intended recipient(s) of the token; your application should verify this matches its expected value. exp (expiration time) — a Unix timestamp (seconds since epoch) after which the token must be rejected. iat (issued at) — the Unix timestamp when the token was created...",
      },
    },
    {
      "@type": "Question",
      name: "What JWT signing algorithms are commonly used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JWT signing algorithms fall into two categories: symmetric (HMAC) and asymmetric (RSA, ECDSA). Symmetric algorithms use the same secret key for both signing and verification — HS256 (HMAC-SHA256), HS384 (HMAC-SHA384), and HS512 (HMAC-SHA512). These are simple and fast but require both parties to share the same secret securely, making them unsuitable when the verifier is a third party. Asymmetric algorithms use a private key to sign and a public key to verify — RS256 (RSA-PKCS1v1.5 with SHA-256), RS384, RS512, PS256 (RSA-PSS), ES256 (ECDSA with P-256), and EdDSA...",
      },
    },
    {
      "@type": "Question",
      name: "Why does the alg: none attack matter and how is it prevented?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The alg: none attack is a well-known JWT vulnerability where an attacker modifies a JWT's header to set alg to none (indicating no signature), then removes the signature segment entirely. If the verifying server naively accepts alg: none as valid, the attacker can forge arbitrary tokens with any claims they want. This attack was a real vulnerability in several early JWT libraries. Modern JWT libraries prevent it by explicitly requiring the application to specify which algorithms are acceptable, and rejecting tokens with alg: none by default...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the JWT Decoder",
  description:
    "Step-by-step guide to using the free JWT Decoder on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free JWT Decoder on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The JWT Decoder provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function JwtDecoderPage() {
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
              href="/tools/category/developer-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              JWT Decoder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          JWT Decoder — Decode &amp; Inspect JWT Tokens Instantly, Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Decode JWT tokens in your browser — inspect header, payload claims,
          expiry, and signature. Nothing leaves your device.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="JWT Decoder tool">
          <JwtDecoderClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="jwt-decoder" toolName="JWT Decoder" />
      </SidebarAdLayout>
    </>
  );
}
