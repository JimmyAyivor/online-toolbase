// src/components/RecentBlogPosts.tsx
// Server component — no "use client" needed.
// Reads directly from the static blogPosts array.
//
// Usage in src/app/page.tsx (server component):
//   import RecentBlogPosts from "@/components/RecentBlogPosts";
//   <RecentBlogPosts />
//
// Place it after <HomeClient /> and before the FAQ / footer sections.

import Link from "next/link";
import { blogPosts } from "@/app/blog/blog-posts";
import type { BlogPost } from "@/app/blog/blog-posts";

// ─── Config ───────────────────────────────────────────────────────────────────

const POSTS_TO_SHOW = 3;

// ─── Category pill colours — mirrors the blog post page ───────────────────────

const CATEGORY_PILL: Record<string, string> = {
  Security:           "bg-red-100 text-red-700",
  Developer:          "bg-indigo-100 text-indigo-700",
  Writing:            "bg-purple-100 text-purple-700",
  "Social Media":     "bg-pink-100 text-pink-700",
  Finance:            "bg-emerald-100 text-emerald-700",
  "Web Performance":  "bg-blue-100 text-blue-700",
  Health:             "bg-teal-100 text-teal-700",
  Business:           "bg-orange-100 text-orange-700",
  Productivity:       "bg-yellow-100 text-yellow-800",
  "Content Creation": "bg-fuchsia-100 text-fuchsia-700",
  Everyday:           "bg-gray-100 text-gray-700",
  Marketing:          "bg-rose-100 text-rose-700",
  Design:             "bg-violet-100 text-violet-700",
  Image:              "bg-sky-100 text-sky-700",
  Education:          "bg-lime-100 text-lime-700",
  Analytics:          "bg-cyan-100 text-cyan-700",
  Fun:                "bg-amber-100 text-amber-800",
};

function pillClass(category: string) {
  return CATEGORY_PILL[category] ?? "bg-gray-100 text-gray-700";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getRecentPosts(n: number): BlogPost[] {
  return [...blogPosts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, n);
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
      aria-label={`Read: ${post.title}`}
    >
      {/* Emoji header */}
      <div className="flex items-center justify-center h-28 bg-gradient-to-br from-slate-50 to-indigo-50 text-5xl select-none">
        {post.coverEmoji}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category + reading time */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${pillClass(post.category)}`}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-indigo-700 transition-colors">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {post.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <time className="text-xs text-gray-400" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
            Read article
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function RecentBlogPosts() {
  const posts = getRecentPosts(POSTS_TO_SHOW);

  if (posts.length === 0) return null;

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      aria-labelledby="recent-posts-heading"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
            From the blog
          </p>
          <h2
            id="recent-posts-heading"
            className="text-4xl font-bold text-gray-900"
          >
            Latest Articles
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl">
            Guides, explainers, and how-tos to help you get more from every
            tool.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
        >
          View all articles
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Grid */}
      <ul
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
      >
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}