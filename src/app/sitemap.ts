// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { blogPosts } from "@/app/blog/blog-posts";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not set");

// Tool pages get a stable last-modified date rather than `new Date()` on every
// build — Google ignores lastModified when it changes on every crawl.
// Use the build date as a stable baseline; bump manually on major updates.
const BUILD_DATE = new Date("2025-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  /* ── Static pages ────────────────────────────────────────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  /* ── Individual tool pages (highest value pages for ranking) ─────────── */
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  /* ── Category pages ──────────────────────────────────────────────────── */
  const uniqueCategories = Array.from(new Set(tools.map((t) => t.category)));
  const categoryPages: MetadataRoute.Sitemap = uniqueCategories.map((cat) => ({
    url: `${baseUrl}/tools/category/${cat
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}`,
    lastModified: BUILD_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  /* ── Blog index ──────────────────────────────────────────────────────── */
  // Already included in staticPages above with priority 0.8

  /* ── Individual blog posts ───────────────────────────────────────────── */
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...toolPages, ...categoryPages, ...blogPostPages];
}
