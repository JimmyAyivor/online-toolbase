"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Command } from "lucide-react";
import { tools, type Tool } from "@/lib/tools";
import { blogPosts, type BlogPost } from "@/app/blog/blog-posts";

// ─── Category emoji map ───────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, string> = {
  Writing: "✍️",
  Developer: "💻",
  Calculator: "🔢",
  Finance: "💰",
  Health: "❤️",
  Image: "🖼️",
  Design: "🎨",
  "Social Media": "📱",
  Marketing: "📣",
  Business: "💼",
  Productivity: "⏱️",
  Security: "🔒",
  Document: "📄",
  Education: "🎓",
  Analytics: "📊",
  Fun: "🎲",
  SEO: "🔍",
  Everyday: "📐",
};

// ─── Unified result type ──────────────────────────────────────────────────────

type ResultKind = "tool" | "blog";

interface Result {
  kind: ResultKind;
  slug: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  href: string;
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

function scoreTool(tool: Tool, q: string): number {
  const ql = q.toLowerCase();
  const name = tool.name.toLowerCase();
  const desc = tool.description.toLowerCase();
  const cat = tool.category.toLowerCase();
  if (name === ql) return 100;
  if (name.startsWith(ql)) return 80;
  if (name.includes(ql)) return 60;
  if (desc.includes(ql)) return 40;
  if (cat.includes(ql)) return 20;
  const words = ql.split(/\s+/);
  if (words.every((w) => name.includes(w) || desc.includes(w))) return 30;
  return 0;
}

function scoreBlog(post: BlogPost, q: string): number {
  const ql = q.toLowerCase();
  const title = post.title.toLowerCase();
  const desc = post.description.toLowerCase();
  const cat = post.category.toLowerCase();
  const tags = post.tags.join(" ").toLowerCase();
  if (title === ql) return 100;
  if (title.startsWith(ql)) return 80;
  if (title.includes(ql)) return 60;
  if (desc.includes(ql)) return 40;
  if (tags.includes(ql)) return 35;
  if (cat.includes(ql)) return 20;
  const words = ql.split(/\s+/);
  if (
    words.every(
      (w) => title.includes(w) || desc.includes(w) || tags.includes(w),
    )
  )
    return 30;
  return 0;
}

function runSearch(q: string): Result[] {
  if (!q.trim()) return [];

  const toolResults: Result[] = tools
    .map((t) => ({ t, s: scoreTool(t, q) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 5)
    .map(({ t }) => ({
      kind: "tool" as const,
      slug: t.slug,
      title: t.name,
      description: t.description,
      category: t.category,
      emoji: CATEGORY_ICONS[t.category] ?? "🔧",
      href: `/tools/${t.slug}`,
    }));

  const blogResults: Result[] = blogPosts
    .map((p) => ({ p, s: scoreBlog(p, q) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map(({ p }) => ({
      kind: "blog" as const,
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      emoji: p.coverEmoji,
      href: `/blog/${p.slug}`,
    }));

  // Interleave tools and blogs rather than appending all of one then the other
  const merged: Result[] = [];
  const max = Math.max(toolResults.length, blogResults.length);
  for (let i = 0; i < max; i++) {
    if (toolResults[i]) merged.push(toolResults[i]);
    if (blogResults[i]) merged.push(blogResults[i]);
  }
  return merged.slice(0, 9);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [active, setActive] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // ── Open / close ────────────────────────────────────────────────────────

  const openModal = useCallback(() => {
    setOpen(true);
    setQuery("");
    setResults([]);
    setActive(0);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  // ── Keyboard shortcut: Ctrl/Cmd + K ─────────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open ? closeModal() : openModal();
      }
      if (e.key === "Escape" && open) closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, openModal, closeModal]);

  // ── Focus input when modal opens ─────────────────────────────────────────

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // ── Search ───────────────────────────────────────────────────────────────

  useEffect(() => {
    setResults(runSearch(query));
    setActive(0);
  }, [query]);

  // ── Navigate to result ────────────────────────────────────────────────────

  const navigate = useCallback(
    (result: Result) => {
      closeModal();
      router.push(result.href);
    },
    [closeModal, router],
  );

  // ── Arrow key + Enter navigation ─────────────────────────────────────────

  const handleKey = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) navigate(results[active]);
    }
  };

  // ── Scroll active item into view ─────────────────────────────────────────

  useEffect(() => {
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  // ─── Counts for footer ───────────────────────────────────────────────────

  const toolCount = results.filter((r) => r.kind === "tool").length;
  const blogCount = results.filter((r) => r.kind === "blog").length;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Trigger button (shown in header) ───────────────────────────── */}
      <button
        onClick={openModal}
        aria-label="Search tools and articles"
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors text-sm group w-full md:w-64"
      >
        <Search className="w-4 h-4 flex-shrink-0" />
        <span className="flex-1 text-left hidden sm:block">
          Search tools &amp; articles…
        </span>
        <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-white border border-gray-200 rounded-md text-gray-400 group-hover:border-gray-300 shadow-sm">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {/* ── Modal overlay ──────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Search tools and articles"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[70vh]">
            {/* Search input row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder={`Search ${tools.length}+ tools and ${blogPosts.length} articles…`}
                className="flex-1 text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-200 rounded text-gray-400">
                ESC
              </kbd>
            </div>

            {/* Results list */}
            {results.length > 0 && (
              <ul
                ref={listRef}
                className="overflow-y-auto divide-y divide-gray-50 flex-1"
                role="listbox"
              >
                {results.map((result, i) => (
                  <li
                    key={result.href}
                    role="option"
                    aria-selected={i === active}
                    onClick={() => navigate(result)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                      i === active ? "bg-indigo-50" : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Emoji */}
                    <span className="text-xl w-8 text-center flex-shrink-0">
                      {result.emoji}
                    </span>

                    {/* Title + description */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-semibold truncate ${
                          i === active ? "text-indigo-700" : "text-gray-800"
                        }`}
                      >
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {result.description}
                      </div>
                    </div>

                    {/* Type badge + category + arrow */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {result.kind === "blog" && (
                        <span className="text-xs px-2 py-0.5 bg-pink-50 text-pink-600 rounded-full font-medium">
                          Article
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full hidden sm:inline">
                        {result.category}
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-opacity ${
                          i === active
                            ? "opacity-100 text-indigo-500"
                            : "opacity-0"
                        }`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* No results */}
            {query.trim() && results.length === 0 && (
              <div className="px-4 py-10 text-center text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-xs mt-1">
                  Try a different keyword or browse by category on the homepage
                </p>
              </div>
            )}

            {/* Empty state — popular categories */}
            {!query.trim() && (
              <div className="px-4 py-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Popular categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Calculator",
                    "Finance",
                    "Health",
                    "Writing",
                    "Developer",
                    "Design",
                    "Social Media",
                    "Productivity",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setQuery(cat)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 text-gray-600 rounded-lg text-xs font-medium transition-colors"
                    >
                      <span>{CATEGORY_ICONS[cat] ?? "🔧"}</span>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
              <span className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm">
                  ↑↓
                </kbd>{" "}
                navigate
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm">
                  ↵
                </kbd>{" "}
                open
              </span>
              {results.length > 0 && query.trim() ? (
                <span>
                  {toolCount > 0 &&
                    `${toolCount} tool${toolCount !== 1 ? "s" : ""}`}
                  {toolCount > 0 && blogCount > 0 && " · "}
                  {blogCount > 0 &&
                    `${blogCount} article${blogCount !== 1 ? "s" : ""}`}
                </span>
              ) : (
                <span>
                  {tools.length} tools · {blogPosts.length} articles
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
