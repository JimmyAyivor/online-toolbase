"use client";
// src/components/monetization/PostToolOffer.tsx
//
// Contextual affiliate offer shown below a tool after the user gets a result.
// This is the highest-intent moment — the user just received value and is
// primed to act on a relevant recommendation.
//
// Usage — add to any tool page after the main tool component:
//   import PostToolOffer from "@/components/monetization/PostToolOffer";
//   <PostToolOffer toolSlug="sales-tax-calculator" toolCategory="Calculator" />
//
// Or inject globally via PageEditorial / SidebarAdLayout with the tool prop.

import { useState, useEffect } from "react";
import {
  affiliateOffers,
  type AffiliateOffer,
} from "@/affiliate/affiliate-map";

// ─── Slug → offer key mapping ─────────────────────────────────────────────────
// Maps specific tool slugs to the most relevant affiliate.
// Falls back to category mapping if no slug match.

const SLUG_OFFERS: Record<string, string> = {
  "sales-tax-calculator": "notion",
  "vat-calculator": "notion",
  "invoice-generator": "notion",
  "freelance-rate-calculator": "notion",
  "roi-calculator": "notion",
  "budget-planner": "notion",
  "compound-interest-calculator": "notion",
  "plagiarism-checker": "grammarly",
  "grammar-spell-checker": "grammarly",
  "paraphrasing-tool": "quillbot",
  "text-summarizer": "jasper",
  "essay-title-generator": "jasper",
  "writing-prompt-generator": "jasper",
  "caption-generator": "jasper",
  "facebook-ad-copy-generator": "copyai",
  "email-subject-line-generator": "copyai",
  "linkedin-post-formatter": "jasper",
  "tiktok-hook-generator": "jasper",
  "slogan-generator": "copyai",
  "hashtag-generator": "surfer",
  "keyword-density-checker": "ahrefs",
  "meta-tag-generator": "surfer",
  "robots-txt-generator": "ahrefs",
  "seo-checker": "ahrefs",
  "password-generator": "nordvpn",
  "password-strength-checker": "nordvpn",
  "hash-generator": "nordvpn",
  "image-compressor": "canva",
  "image-cropper-resizer": "canva",
  "background-remover": "removebg",
  "color-palette-generator": "canva",
  "meme-generator": "canva",
  "profile-picture-resizer": "canva",
  "qr-code-generator": "canva",
  "favicon-generator": "canva",
  "json-formatter-validator": "digitalocean",
  "regex-tester": "digitalocean",
  "cron-expression-builder": "digitalocean",
  "base64-encoder-decoder": "digitalocean",
  "jwt-decoder": "digitalocean",
  "markdown-to-html-converter": "digitalocean",
  "html-minifier": "cloudways",
  "mortgage-calculator": "notion",
  "loan-mortgage-calculator": "notion",
  "retirement-calculator": "notion",
  "net-worth-calculator": "notion",
  "savings-goal-calculator": "notion",
};

const CATEGORY_OFFERS: Record<string, string> = {
  Writing: "grammarly, jasper",
  Marketing: "surfer, jasper",
  Developer: "cloudways",
  Design: "canva",
  Image: "canva, removebg",
  Security: "nordvpn",
  Finance: "notion",
  Productivity: "notion, cloudways",
  Business: "notion",
  Calculator: "quillbot",
  "Social Media": "jasper, copyai",
};

// ─── Offer card copy ──────────────────────────────────────────────────────────
// Custom headline + body per affiliate to make it feel contextual, not generic.

const OFFER_COPY: Record<
  string,
  { headline: string; body: string; cta: string }
> = {
  grammarly: {
    headline: "Write with confidence every time",
    body: "Grammarly catches errors across every app you use — email, docs, social.",
    cta: "Try Grammarly Free",
  },
  jasper: {
    headline: "10× your content output",
    body: "Jasper writes blog posts, ads, and social copy in your brand voice.",
    cta: "Start Free Trial",
  },
  quillbot: {
    headline: "Rewrite anything in seconds",
    body: "QuillBot paraphrases content while keeping your meaning perfectly intact.",
    cta: "Try QuillBot Free",
  },
  copyai: {
    headline: "Marketing copy that actually converts",
    body: "Copy.ai generates high-performing ads, emails, and landing page copy.",
    cta: "Generate Free Copy",
  },
  ahrefs: {
    headline: "Outrank your competitors",
    body: "Ahrefs shows you exactly what's driving their traffic — and how to beat it.",
    cta: "Try Ahrefs",
  },
  surfer: {
    headline: "Rank higher with data-driven content",
    body: "Surfer SEO tells you exactly what your content needs to reach page one.",
    cta: "Try Surfer SEO",
  },
  digitalocean: {
    headline: "Deploy your next project in minutes",
    body: "DigitalOcean makes cloud hosting simple, predictable, and affordable.",
    cta: "Get $200 Free Credit",
  },
  cloudways: {
    headline: "Managed hosting without the headaches",
    body: "Cloudways handles server management so you can focus on building.",
    cta: "Try Free for 3 Days",
  },
  canva: {
    headline: "Design anything in minutes",
    body: "Canva has 250,000+ templates for social posts, presentations, and more.",
    cta: "Design for Free",
  },
  removebg: {
    headline: "Remove any background instantly",
    body: "Remove.bg erases backgrounds from photos in under 5 seconds. Always clean.",
    cta: "Remove Background Free",
  },
  nordvpn: {
    headline: "Browse privately and securely",
    body: "NordVPN encrypts your connection and keeps your data away from prying eyes.",
    cta: "Get NordVPN",
  },
  notion: {
    headline: "Organise everything in one place",
    body: "Notion replaces your docs, spreadsheets, and project tools in one workspace.",
    cta: "Try Notion Free",
  },
};

// ─── Session dismiss key ──────────────────────────────────────────────────────

function getDismissKey(offerKey: string) {
  return `post_offer_dismissed_${offerKey}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  toolSlug: string;
  toolCategory: string;
  /** Delay in ms before the offer appears — lets the user see their result first */
  delayMs?: number;
}

export default function PostToolOffer({
  toolSlug,
  toolCategory,
  delayMs = 1200,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // start hidden, reveal after check

  // Resolve which offer to show
  const offerKey =
    SLUG_OFFERS[toolSlug] ?? CATEGORY_OFFERS[toolCategory] ?? null;
  const offer: AffiliateOffer | null = offerKey
    ? (affiliateOffers[offerKey] ?? null)
    : null;
  const copy = offerKey ? (OFFER_COPY[offerKey] ?? null) : null;

  useEffect(() => {
    if (!offer || !offerKey) return;

    // Check if user dismissed this specific offer recently (24h)
    const dismissedAt = sessionStorage.getItem(getDismissKey(offerKey));
    if (dismissedAt) return;

    setDismissed(false);

    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [offer, offerKey, delayMs]);

  const handleDismiss = () => {
    if (offerKey) sessionStorage.setItem(getDismissKey(offerKey), "1");
    setVisible(false);
    setTimeout(() => setDismissed(true), 400);
  };

  if (!offer || !copy || dismissed) return null;

  const affiliateUrl = `/go?offer=${encodeURIComponent(offerKey)}&tool=${encodeURIComponent(toolSlug)}`;

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative mt-6 rounded-2xl overflow-hidden border border-indigo-100 shadow-sm bg-gradient-to-r from-indigo-50 via-white to-violet-50">
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Dismiss offer"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="px-5 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          {/* Copy */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                Recommended tool
              </p>
            </div>
            <p className="text-sm font-bold text-gray-900 leading-snug">
              {copy.headline}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              {copy.body}
            </p>
          </div>

          {/* CTA */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm whitespace-nowrap"
          >
            {copy.cta}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
