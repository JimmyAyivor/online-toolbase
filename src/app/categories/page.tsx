// src/app/category/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Blog — Tips, Guides & How-Tos | Online Tool Base",
  description:
    "Practical guides on productivity, writing, security, social media, finance, and more — written to help you get the most from Calculators, Pdf Tools & More.",
  alternates: { canonical: `${SITE_URL}/category` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/category`,
    siteName: SITE_NAME,
    title: "Blog — Tips, Guides & How-Tos | Online Tool Base",
    description:
      "Practical guides on productivity, writing, security, social media, finance, and more.",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Security: "bg-red-100 text-red-700",
  Developer: "bg-indigo-100 text-indigo-700",
  Writing: "bg-purple-100 text-purple-700",
  "Social Media": "bg-pink-100 text-pink-700",
  Finance: "bg-green-100 text-green-700",
  Image: "bg-blue-100 text-blue-700",
  Health: "bg-teal-100 text-teal-700",
  Business: "bg-orange-100 text-orange-700",
  Productivity: "bg-yellow-100 text-yellow-700",
  "Content Creation": "bg-fuchsia-100 text-fuchsia-700",
};

const CATEGORY_LINKS = [
  {
    name: "Calculators",
    slug: "calculators",
    description:
      "Free online calculators for finance, health, math, dates, percentages, conversions, and everyday calculations.",
  },
  {
    name: "PDF Tools",
    slug: "pdf-tools",
    description:
      "Free online PDF tools to merge, split, compress, convert, edit, sign, protect, redact, and manage PDF files.",
  },
  {
    name: "Image Tools",
    slug: "image-design-tools",
    description:
      "Free online image tools to resize, crop, compress, convert, remove backgrounds, create favicons, and optimize images.",
  },
  {
    name: "Writing Tools",
    slug: "writing-text-tools",
    description:
      "Free writing tools for grammar checking, paraphrasing, summarizing, text formatting, word counting, readability, and more.",
  },
  {
    name: "Developer Tools",
    slug: "developer-tools",
    description:
      "Free developer tools for JSON, Base64, URLs, regex, hashing, JWTs, HTML, Markdown, timestamps, and programming tasks.",
  },
  {
    name: "Security Tools",
    slug: "security-tools",
    description:
      "Free security tools for generating strong passwords and checking password strength and security.",
  },
  {
    name: "Health & Fitness Calculators",
    slug: "health-fitness-calculators",
    description:
      "Free health and fitness calculators for BMI, calories, macros, body fat, protein intake, running pace, sleep, hydration, and more.",
  },
  {
    name: "Finance Calculators",
    slug: "finance-calculators",
    description:
      "Free finance calculators for mortgages, loans, investments, retirement, savings, net worth, credit cards, and personal budgeting.",
  },
  {
    name: "Business & Productivity Tools",
    slug: "business-productivity",
    description:
      "Free business and productivity tools for invoices, resumes, business names, time management, meetings, time zones, and everyday work.",
  },
  {
    name: "Marketing & SEO Tools",
    slug: "marketing-seo-tools",
    description:
      "Free marketing and SEO tools for keyword analysis, ad copy, email subject lines, slogans, content, and digital marketing campaigns.",
  },
  {
    name: "Social Media Tools",
    slug: "social-media-tools",
    description:
      "Free social media tools for captions, hashtags, content planning, profile bios, post formatting, hooks, audits, and social content.",
  },
  {
    name: "Fun Generators",
    slug: "fun-generators",
    description:
      "Free fun generators and word tools for games, puzzles, random words, names, anagrams, Wordle, Scrabble, Morse code, and creative activities.",
  },
];

export default function CategoryIndexPage() {
  return (
    <>
      <section
        className="max-w-7xl mx-auto px-4 py-16"
        aria-labelledby="category-heading"
      >
        <h2
          id="category-heading"
          className="text-4xl font-bold text-center mb-4"
        >
          Explore Free Online Tools by Category
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Browse calculators, PDF utilities, image editors, developer tools, and
          writing assistants designed to help you work faster online.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
          {CATEGORY_LINKS.map((category) => (
            <Link
              key={category.slug}
              href={`tools/category/${category.slug}`}
              className="rounded-2xl border bg-white p-6 shadow hover:shadow-xl transition"
            >
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>

              <p className="text-sm text-gray-600">{category.description}</p>

              <span className="text-indigo-600 text-sm font-semibold mt-4 block">
                Explore {category.name} →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
