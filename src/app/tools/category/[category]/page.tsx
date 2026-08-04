// src/app/tools/category/[category]/page.tsx
//
// SEO category pages. One page per canonical category in lib/categories.ts.
// Statically generated at build time (generateStaticParams) since the
// category list and tool assignments only change on deploy.
//
// Integration notes (adjust to match your actual components — I don't have
// their prop signatures, so these are reasonable guesses based on your
// component names):
// - <SiteHeader /> / <SiteFooter />: assumed no required props.
// - <AdSlot />: assumed takes a `slot` id string. Swap for your real prop.
// - Adjust the import paths below if your tsconfig path alias isn't "@/*".

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategoryBySlug,
  getToolsForCategory,
  getRelatedCategories,
} from "@/lib/categories";
import AdSlot from "@/components/AdSlot";

const SLOT_A = process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_A ?? "0000000000";
const SLOT_B = process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_B ?? "0000000000";
const SLOT_D = process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_D ?? "0000000000";
const SLOT_E = process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_E ?? "0000000000";

type Props = {
  params: Promise<{ category: string }>;
};

const SITE_URL = "https://onlinetoolbase.com";

// ─────────────────────────────────────────────────────────────────────────
// Static generation — one page per category at build time.
// ─────────────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

// ─────────────────────────────────────────────────────────────────────────
// Metadata — title, description, canonical, Open Graph.
// ─────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return { title: "Category Not Found | Online Tool Base" };
  }

  const canonicalUrl = `${SITE_URL}/tools/category/${category.slug}`;

  return {
    title: category.title,
    description: category.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: category.title,
      description: category.metaDescription,
      url: canonicalUrl,
      siteName: "Online Tool Base",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: category.title,
      description: category.metaDescription,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categoryTools = getToolsForCategory(category.slug);
  const relatedCategories = getRelatedCategories(category.slug);
  const canonicalUrl = `${SITE_URL}/tools/category/${category.slug}`;

  // ── Structured data ───────────────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: category.name, item: canonicalUrl },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.title,
    description: category.metaDescription,
    url: canonicalUrl,
    hasPart: categoryTools.map((tool) => ({
      "@type": "SoftwareApplication",
      name: tool.name,
      description: tool.description,
      url: `${SITE_URL}/tools/${tool.slug}`,
      applicationCategory: "UtilitiesApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD — three separate scripts is fine; Google parses each independently */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />


      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/tools" className="hover:text-gray-900">
                Categories
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900" aria-current="page">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* H1 + intro */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {categoryTools.length} free tools · No signup required
        </p>

        <div className="prose prose-gray mt-6 max-w-none">
          {category.intro.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="flex justify-center px-4 py-4">
      <AdSlot
        variant="leaderboard"
        slotId={SLOT_A}
        className="hidden sm:flex"
      />
      <AdSlot
        variant="mediumrectangle"
        slotId={SLOT_A}
        className="flex sm:hidden"
      />
    </div>

        {/* Tool grid */}
        <section aria-label={`${category.name} tools`} className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 hover:shadow-sm"
              >
                <h2 className="font-semibold text-gray-900">{tool.name}</h2>
                <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex justify-center px-4 py-4">
      <AdSlot
        variant="leaderboard"
        slotId={SLOT_B}
        className="hidden sm:flex"
      />
      <AdSlot
        variant="mediumrectangle"
        slotId={SLOT_B}
        className="flex sm:hidden"
      />
    </div>

        {/* FAQ */}
        <section aria-label="Frequently asked questions" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <dl className="mt-4 space-y-6">
            {category.faqs.map((faq, i) => (
              <div key={i}>
                <dt className="font-semibold text-gray-900">{faq.question}</dt>
                <dd className="mt-1 text-gray-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related categories */}
        {relatedCategories.length > 0 && (
          <section aria-label="Related categories" className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Related Categories
            </h2>
            <ul className="mt-3 flex flex-wrap gap-3">
              {relatedCategories.map((rel) => (
                <li key={rel.slug}>
                  <Link
                    href={`/tools/category/${rel.slug}`}
                    className="inline-block rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  >
                    {rel.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

    </>
  );
}