// src/components/SidebarRecentPosts.tsx
// Server component — no "use client" needed.
// Compact recent posts list designed for the 320px sticky sidebar in SidebarAdLayout.
//
// Usage in SidebarAdLayout.tsx:
//   import SidebarRecentPosts from "@/components/SidebarRecentPosts";
//
//   <aside className="hidden lg:block w-[320px] flex-shrink-0" ...>
//     <div className="sticky top-20 space-y-4">
//       <AdSlot variant="halfpage" slotId={SIDEBAR_SLOT_ID} />
//       <SidebarRecentPosts />       ← add below the ad slot
//     </div>
//   </aside>

import Link from "next/link";
import { blogPosts } from "@/app/blog/blog-posts";
import type { BlogPost } from "@/app/blog/blog-posts";

// ─── Config ───────────────────────────────────────────────────────────────────

const POSTS_TO_SHOW = 4;

// ─── Category pill colours ────────────────────────────────────────────────────

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

// ─── Widget ───────────────────────────────────────────────────────────────────

export default function SidebarRecentPosts() {
  const posts = getRecentPosts(POSTS_TO_SHOW);

  if (posts.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
          Latest Articles
        </p>
        <Link
          href="/blog"
          className="text-[11px] font-semibold text-indigo-500 hover:text-indigo-700 transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* Post list */}
      <ul className="divide-y divide-slate-50">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-start gap-3 px-4 py-3.5 hover:bg-indigo-50/60 group transition-colors"
              aria-label={`Read: ${post.title}`}
            >
              {/* Emoji thumbnail */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center text-xl select-none"
                aria-hidden="true"
              >
                {post.coverEmoji}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                {/* Category pill */}
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${pillClass(post.category)}`}
                >
                  {post.category}
                </span>

                {/* Title */}
                <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-2">
                  {post.title}
                </p>

                {/* Date + reading time */}
                <div className="flex items-center gap-2 mt-1">
                  <time
                    className="text-[11px] text-slate-400"
                    dateTime={post.publishedAt}
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className="text-slate-200" aria-hidden="true">·</span>
                  <span className="text-[11px] text-slate-400">
                    {post.readingTime}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <svg
                className="w-4 h-4 text-slate-200 group-hover:text-indigo-400 transition-colors shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer CTA */}
      <div className="px-4 py-3 border-t border-slate-50 bg-slate-50/50">
        <Link
          href="/blog"
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors py-1"
        >
          Browse all articles
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
        </Link>
      </div>
    </div>
  );
}