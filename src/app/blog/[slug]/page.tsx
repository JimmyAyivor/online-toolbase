// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "../blog-posts";

// ─── Static import map — Next.js App Router requires static imports ───────────
// Dynamic import(`../content/${slug}`) does NOT work in App Router.
// Every content file must be imported statically here.
import Base64EncodingExplained from "../content/base64-encoding-explained";
import BmiLimitationsAndWhatToUseInstead from "../content/bmi-limitations-and-what-to-use-instead";
import CaloriesMacrosWhatToTrack from "../content/calories-macros-what-to-track";
import CompoundInterestExplained from "../content/compound-interest-explained";
import ContentCreatorFreeTools from "../content/content-creator-free-tools";
import FreeDeveloperToolsBookmarks from "../content/free-developer-tools-bookmarks";
import FreelancerInvoicingGuide from "../content/freelancer-invoicing-guide";
import HashtagsHowTheyWork2025 from "../content/hashtags-how-they-work-2025";
import HowToCalculateRoiCorrectly from "../content/how-to-calculate-roi-correctly";
import HowToCreateAStrongPassword from "../content/how-to-create-a-strong-password";
import ImageFormatsWebpAvifJpeg from "../content/image-formats-webp-avif-jpeg";
import JsonExplainedForDevelopers from "../content/json-explained-for-developers";
import LinkedinPostsThatGetEngagement from "../content/linkedin-posts-that-get-engagement";
import MortgageCalculatorCompleteGuide from "../content/mortgage-calculator-complete-guide";
import PlagiarismCheckBeforePublishing from "../content/plagiarism-check-before-publishing";
import PomodoroTechniqueGuide from "../content/pomodoro-technique-guide";
import QrCodesSmallBusinessUses from "../content/qr-codes-small-business-uses";
import RegexBeginnersGuide from "../content/regex-beginners-guide";
import SocialMediaEngagementRate2025 from "../content/social-media-engagement-rate-2025";
import UnitConversionsPeopleAlwaysGoogle from "../content/unit-conversions-people-always-google";

// ─── Slug → component map ─────────────────────────────────────────────────────
const CONTENT_MAP: Record<string, React.ComponentType> = {
  "base64-encoding-explained": Base64EncodingExplained,
  "bmi-limitations-and-what-to-use-instead": BmiLimitationsAndWhatToUseInstead,
  "calories-macros-what-to-track": CaloriesMacrosWhatToTrack,
  "compound-interest-explained": CompoundInterestExplained,
  "content-creator-free-tools": ContentCreatorFreeTools,
  "free-developer-tools-bookmarks": FreeDeveloperToolsBookmarks,
  "freelancer-invoicing-guide": FreelancerInvoicingGuide,
  "hashtags-how-they-work-2025": HashtagsHowTheyWork2025,
  "how-to-calculate-roi-correctly": HowToCalculateRoiCorrectly,
  "how-to-create-a-strong-password": HowToCreateAStrongPassword,
  "image-formats-webp-avif-jpeg": ImageFormatsWebpAvifJpeg,
  "json-explained-for-developers": JsonExplainedForDevelopers,
  "linkedin-posts-that-get-engagement": LinkedinPostsThatGetEngagement,
  "mortgage-calculator-complete-guide": MortgageCalculatorCompleteGuide,
  "plagiarism-check-before-publishing": PlagiarismCheckBeforePublishing,
  "pomodoro-technique-guide": PomodoroTechniqueGuide,
  "qr-codes-small-business-uses": QrCodesSmallBusinessUses,
  "regex-beginners-guide": RegexBeginnersGuide,
  "social-media-engagement-rate-2025": SocialMediaEngagementRate2025,
  "unit-conversions-people-always-google": UnitConversionsPeopleAlwaysGoogle,
};

// ─── Constants ────────────────────────────────────────────────────────────────
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Online Tool Base";

const CATEGORY_COLORS: Record<string, string> = {
  Security: "bg-red-100 text-red-700",
  Developer: "bg-indigo-100 text-indigo-700",
  Writing: "bg-purple-100 text-purple-700",
  "Social Media": "bg-pink-100 text-pink-700",
  Finance: "bg-green-100 text-green-700",
  "Web Performance": "bg-blue-100 text-blue-700",
  Health: "bg-teal-100 text-teal-700",
  Business: "bg-orange-100 text-orange-700",
  Productivity: "bg-yellow-100 text-yellow-700",
  "Content Creation": "bg-fuchsia-100 text-fuchsia-700",
  Everyday: "bg-gray-100 text-gray-700",
};

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Online Tool Base Blog`,
    description: post.description,
    keywords: post.tags.join(", "),
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      site: "@onlinetoolbase",
      title: post.title,
      description: post.description,
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const PostContent = CONTENT_MAP[slug];
  if (!PostContent) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label='Breadcrumb' className='max-w-4xl mx-auto px-4 pt-4 pb-2'>
        <ol className='flex items-center gap-2 text-sm text-gray-500'>
          <li>
            <a href='/' className='hover:text-indigo-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a href='/blog' className='hover:text-indigo-600 transition-colors'>
              Blog
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span
              aria-current='page'
              className='text-gray-900 font-medium line-clamp-1'
            >
              {post.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <header className='max-w-4xl mx-auto px-4 pt-6 pb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-600"}`}
          >
            {post.category}
          </span>
          <span className='text-sm text-gray-400'>{post.readingTime}</span>
        </div>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4'>
          {post.title}
        </h1>
        <p className='text-lg text-gray-500 leading-relaxed mb-6'>
          {post.description}
        </p>
        <div className='flex items-center gap-2 text-sm text-gray-400'>
          <span>{SITE_NAME}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          {post.updatedAt && (
            <>
              <span>·</span>
              <span>Updated {formatDate(post.updatedAt)}</span>
            </>
          )}
        </div>
      </header>

      {/* Article */}
      <article className='max-w-4xl mx-auto px-4 pb-12'>
        <div className='bg-white rounded-2xl shadow-lg p-8 md:p-12 prose prose-gray prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 max-w-none'>
          <PostContent />
        </div>

        {/* Tags */}
        <div className='mt-8 flex flex-wrap gap-2'>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className='text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full'
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Tools CTA */}
        {post.relatedTools.length > 0 && (
          <div className='mt-10 bg-indigo-50 rounded-2xl p-8'>
            <h2 className='text-lg font-bold text-gray-900 mb-2'>
              Free tools mentioned in this article
            </h2>
            <p className='text-sm text-gray-500 mb-5'>
              Try these tools directly in your browser — no signup, no install.
            </p>
            <div className='flex flex-wrap gap-3'>
              {post.relatedTools.map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  className='inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors'
                >
                  {tool.label} →
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Back to blog */}
        <div className='mt-10 text-center'>
          <a
            href='/blog'
            className='inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors'
          >
            ← Back to all articles
          </a>
        </div>
      </article>
    </>
  );
}
