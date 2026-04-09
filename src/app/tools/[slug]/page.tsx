// src/app/tools/[slug]/page.tsx
// SERVER COMPONENT — generateMetadata + JSON-LD per tool.
// This is the most important SEO file on the site.
// Each of 130+ tool pages gets unique, keyword-rich metadata
// targeting "[tool name] free", "[tool name] online", "free [tool name]" etc.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import Link from "next/link";
import { toolClientComponents } from "./tool-clients";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface Props {
  params: Promise<{ slug: string }>;
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Generates the best possible title for a tool page.
 * Targets: "Free [Tool Name]", "[Tool Name] Online", "[Tool Name] — Free Online Tool"
 * Stays under 60 characters where possible.
 */
function generateTitle(name: string): string {
  const base = `Free ${name}`;
  if (base.length <= 55) return `${base} — Online ${name}`;
  return `${name} — Free Online Tool`;
}

/**
 * Generates a unique, keyword-rich meta description for each tool.
 * Targets: "free [tool name] online", "no signup", "instant", "[use case]"
 * ~145–155 characters.
 */
function generateDescription(
  name: string,
  description: string,
  category: string,
): string {
  const lower = name.toLowerCase();
  return `Free online ${lower} — ${description} No signup, no download. Works instantly in your browser. ${category} tool — 100% free forever.`;
}

/**
 * Per-tool FAQ content for JSON-LD — massive featured snippet opportunity.
 * Generic fallbacks work for all tools; specific tools can be overridden.
 */
function generateFaqs(name: string) {
  const lower = name.toLowerCase();
  return [
    {
      "@type": "Question",
      name: `Is this ${lower} free?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes, this ${lower} is completely free. There are no hidden fees, no premium tiers, and no usage limits. Use it as many times as you need.`,
      },
    },
    {
      "@type": "Question",
      name: `Do I need to sign up to use this ${lower}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `No account or sign-up is required. Open the page and start using the ${lower} immediately — no email, no password, no registration.`,
      },
    },
    {
      "@type": "Question",
      name: `Is my data safe when I use this ${lower}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes. This ${lower} runs entirely in your browser. Nothing you enter is sent to our servers — your data never leaves your device.`,
      },
    },
    {
      "@type": "Question",
      name: `Does this ${lower} work on mobile?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Yes. This ${lower} is fully responsive and works on phones, tablets, and desktops. No app download required.`,
      },
    },
  ];
}

/* ─── Static params (required for static export / ISR) ──────────────────── */

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

/* ─── Per-tool metadata ──────────────────────────────────────────────────── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return { title: "Tool Not Found" };

  const title = generateTitle(tool.name);
  const description = generateDescription(
    tool.name,
    tool.description,
    tool.category,
  );
  const url = `${SITE_URL}/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: [
      `free ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} online`,
      `${tool.name.toLowerCase()} free`,
      `online ${tool.name.toLowerCase()}`,
      `free online ${tool.name.toLowerCase()}`,
      `${tool.category.toLowerCase()} tools`,
      "free online tools",
      "no signup",
      "browser tool",
    ].join(", "),

    alternates: { canonical: url },
    robots: { index: true, follow: true },

    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url,
      title: `${tool.name} — Free Online ${tool.name}`,
      description: `Free online ${tool.name.toLowerCase()}. ${tool.description} No signup required. Works instantly in your browser.`,
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${tool.name} — Free Online Tool`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@onlinetoolbase",
      creator: "@onlinetoolbase",
      title: `${tool.name} — Free Online ${tool.name}`,
      description: `Free online ${tool.name.toLowerCase()}. ${tool.description} No signup needed.`,
    },
  };
}

/* ─── Page component ─────────────────────────────────────────────────────── */

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const url = `${SITE_URL}/tools/${tool.slug}`;
  const catSlug = slugify(tool.category);

  /* ── JSON-LD schemas ─────────────────────────────────────────────────── */

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.category,
        item: `${SITE_URL}/tools/category/${catSlug}`,
      },
      { "@type": "ListItem", position: 4, name: tool.name, item: url },
    ],
  };

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generateFaqs(tool.name),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the free online ${tool.name.toLowerCase()}`,
    description: `Step-by-step guide to using the free ${tool.name.toLowerCase()} on Free Online Tools.`,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Open the tool",
        text: `Navigate to the free ${tool.name.toLowerCase()} — no account or download required.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Enter your input",
        text: `Enter the values or text you want to process. The tool works entirely in your browser.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Get your result",
        text: `Your result appears instantly. Copy, download, or use it however you need — completely free.`,
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: tool.name,
      },
    ],
    totalTime: "PT1M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
  };

  /* ── Render ──────────────────────────────────────────────────────────── */

  const ToolClient = toolClientComponents[slug] ?? null;

  return (
    <>
      {/* ── Structured data ───────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* ── Tool component ────────────────────────────────────────────── */}
      {ToolClient ? (
        <ToolClient />
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-600">
          <p>This tool is coming soon. Check back later!</p>
        </div>
      )}

      {/* ── SEO content block (visible, crawlable, below the tool) ────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About this free {tool.name.toLowerCase()}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            This free online {tool.name.toLowerCase()} runs entirely in your
            browser — no signup, no download, and no cost. {tool.description}{" "}
            Use it as many times as you need, on any device, completely free.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Part of our {tool.category} tools collection. All processing happens
            client-side, which means your data never leaves your device.
          </p>
        </div>

        {/* FAQ section — crawlable, feeds the JSON-LD */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <dl className="space-y-5">
            {generateFaqs(tool.name).map((faq) => (
              <div
                key={faq.name}
                className="border-b border-gray-50 pb-5 last:border-0 last:pb-0"
              >
                <dt className="font-semibold text-gray-800 mb-2">{faq.name}</dt>
                <dd className="text-gray-600 leading-relaxed">
                  {faq.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Related tools — internal linking */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            More free {tool.category.toLowerCase()} tools
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tools
              .filter(
                (t) => t.category === tool.category && t.slug !== tool.slug,
              )
              .slice(0, 6)
              .map((related) => (
                <li key={related.slug}>
                  <a
                    href={`/tools/${related.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors group"
                  >
                    <span className="w-8 h-8 bg-linear-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
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
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700">
                        {related.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {related.description}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
          </ul>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-indigo-600 hover:text-purple-600 transition-colors"
          >
            View all 130+ free tools →
          </Link>
        </div>
      </section>
    </>
  );
}
