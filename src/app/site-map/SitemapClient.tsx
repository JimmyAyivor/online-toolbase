"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { CategoryData } from "./page";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  categories: CategoryData[];
  totalTools: number;
  siteUrl: string;
}

type View = "grid" | "tree";

// ── Static pages shown above the tool grid ────────────────────────────────────

const STATIC_PAGES = [
  { href: "/", label: "Home", icon: "🏠", root: true },
  { href: "/tools", label: "/tools", icon: "🗂", root: false },
  { href: "/about", label: "/about", icon: "ℹ️", root: false },
  { href: "/advertise", label: "/advertise", icon: "📣", root: false },
  { href: "/blog", label: "/blog", icon: "📝", root: false },
  { href: "/contact", label: "/contact", icon: "✉️", root: false },
  { href: "/privacy", label: "/privacy", icon: "🔒", root: false },
  { href: "/terms", label: "/terms", icon: "📄", root: false },
  { href: "/sitemap.xml", label: "/sitemap.xml", icon: "🗺", root: false },
  { href: "/robots.txt", label: "/robots.txt", icon: "🤖", root: false },
];

// ── Colour utility ────────────────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  siteUrl,
  query,
}: {
  cat: CategoryData;
  siteUrl: string;
  query: string;
}) {
  const visibleTools = useMemo(() => {
    if (!query) return cat.tools;
    const q = query.toLowerCase();
    return cat.tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.slug.includes(q) ||
        t.description.toLowerCase().includes(q),
    );
  }, [cat.tools, query]);

  if (query && visibleTools.length === 0) return null;

  return (
    <div
      className="category-block"
      style={{ borderTop: `3px solid ${cat.color}` }}
    >
      {/* Header */}
      <div className="cat-header">
        <div
          className="cat-icon"
          style={{ background: hexToRgba(cat.color, 0.15) }}
        >
          {cat.icon}
        </div>
        <div className="cat-title" style={{ color: cat.color }}>
          {cat.label}
        </div>
        <div className="cat-count">{visibleTools.length}</div>
      </div>

      {/* Tool list */}
      <div className="tool-list">
        {visibleTools.map((tool) => (
          <a
            key={tool.slug}
            className="tool-node"
            href={`${siteUrl}/tools/${tool.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            title={tool.description}
          >
            <span className="dot" style={{ background: cat.color }} />
            <span>{tool.name}</span>
            <span className="slug">/{tool.slug}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function TreeCategory({
  cat,
  siteUrl,
  query,
}: {
  cat: CategoryData;
  siteUrl: string;
  query: string;
}) {
  const visibleTools = useMemo(() => {
    if (!query) return cat.tools;
    const q = query.toLowerCase();
    return cat.tools.filter(
      (t) => t.name.toLowerCase().includes(q) || t.slug.includes(q),
    );
  }, [cat.tools, query]);

  if (query && visibleTools.length === 0) return null;

  return (
    <div className="tree-category">
      <div className="tree-vert" style={{ background: cat.color }} />
      <div
        className="tree-cat-node"
        style={{
          background: hexToRgba(cat.color, 0.15),
          borderColor: hexToRgba(cat.color, 0.4),
          color: cat.color,
        }}
      >
        {cat.icon} {cat.label}
      </div>
      <div className="tree-tools-col">
        {visibleTools.map((tool) => (
          <div key={tool.slug} className="tree-tool-wrap">
            <div
              className="tree-vert"
              style={{ background: cat.color, opacity: 0.3 }}
            />
            <a
              className="tree-tool"
              href={`${siteUrl}/tools/${tool.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              title={tool.description}
              style={{ ["--cat-color" as string]: cat.color }}
            >
              {tool.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main client component ─────────────────────────────────────────────────────

export default function SitemapClient({
  categories,
  totalTools,
  siteUrl,
}: Props) {
  const [view, setView] = useState<View>("grid");
  const [query, setQuery] = useState("");
  const [activeFilter, setFilter] = useState("all");

  const totalCategories = categories.length;

  // Filtered categories for both views
  const displayedCategories = useMemo(() => {
    let cats = categories;
    if (activeFilter !== "all") {
      cats = cats.filter((c) => c.id === activeFilter);
    }
    return cats;
  }, [categories, activeFilter]);

  // Did the search produce any results?
  const hasResults = useMemo(() => {
    if (!query) return true;
    const q = query.toLowerCase();
    return displayedCategories.some((cat) =>
      cat.tools.some(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.slug.includes(q) ||
          t.description.toLowerCase().includes(q),
      ),
    );
  }, [query, displayedCategories]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Reset category filter when searching so all categories are searched
    if (e.target.value) setFilter("all");
  }, []);

  const handleFilterClick = useCallback((catId: string) => {
    setFilter(catId);
    setQuery("");
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg:     #080C14;
          --bg2:    #0D1321;
          --border: rgba(255,255,255,0.07);
          --text:   #E2E8F0;
          --muted:  #64748B;
        }
        body { background: var(--bg) !important; }

        .sm-wrap {
          font-family: 'Syne', 'DM Sans', system-ui, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          position: relative;
        }

        /* Sticky toolbar */
        .sm-bar {
          position: sticky; top: 0; z-index: 50;
          background: rgba(8,12,20,0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: 0.75rem 2rem;
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
        }
        .sm-stats {
          display: flex; gap: 0.6rem; flex-shrink: 0;
          font-size: 0.72rem; font-variant-numeric: tabular-nums;
        }
        .sm-pill {
          background: rgba(255,255,255,0.04); border: 1px solid var(--border);
          border-radius: 20px; padding: 0.3rem 0.7rem;
          display: flex; align-items: center; gap: 0.4rem; color: var(--muted);
        }
        .sm-pill .dot { width:6px; height:6px; border-radius:50%; background:#10B981; }
        .sm-search {
          flex: 1; min-width: 200px; max-width: 400px;
          background: rgba(255,255,255,0.05); border: 1px solid var(--border);
          border-radius: 10px; padding: 0.45rem 0.9rem;
          color: var(--text); font-size: 0.82rem; outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .sm-search:focus { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.06); }
        .sm-search::placeholder { color: var(--muted); }
        .view-toggle {
          display: flex; background: rgba(255,255,255,0.05);
          border: 1px solid var(--border); border-radius: 8px; overflow: hidden;
        }
        .vbtn {
          padding: 0.38rem 0.75rem; font-size: 0.7rem; font-weight: 700;
          cursor: pointer; border: none; background: transparent;
          color: var(--muted); transition: all 0.15s; letter-spacing: 0.06em;
        }
        .vbtn.active { background: rgba(99,102,241,0.2); color: #818CF8; }

        /* Hero */
        .sm-hero {
          text-align: center; padding: 2.5rem 2rem 1.5rem;
        }
        .sm-hero h1 {
          font-size: clamp(1.6rem, 4vw, 2.8rem); font-weight: 800;
          letter-spacing: -0.04em; line-height: 1.1;
          background: linear-gradient(135deg, #C7D2FE 0%, #818CF8 40%, #C084FC 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 0.4rem;
        }
        .sm-hero p { font-size: 0.78rem; color: var(--muted); letter-spacing: 0.06em; }

        /* Filter bar */
        .filter-bar {
          display: flex; flex-wrap: wrap; gap: 0.4rem;
          justify-content: center; padding: 0 2rem 1.5rem;
        }
        .fpill {
          padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.7rem;
          font-weight: 600; cursor: pointer; border: 1.5px solid var(--border);
          background: rgba(255,255,255,0.03); color: var(--muted);
          transition: all 0.15s; letter-spacing: 0.04em;
        }
        .fpill:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
        .fpill.active { color: #fff; background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.5); }

        /* Main area */
        .sm-main { padding: 0 2rem 3rem; max-width: 1600px; margin: 0 auto; }

        /* Static section */
        .static-label {
          font-size: 0.68rem; color: var(--muted); letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: 0.6rem; padding-left: 2px;
        }
        .static-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
        .static-node {
          display: flex; align-items: center; gap: 0.45rem;
          padding: 0.45rem 0.85rem; background: var(--bg2);
          border: 1px solid var(--border); border-radius: 10px;
          font-size: 0.78rem; font-weight: 600; color: var(--text);
          text-decoration: none; transition: all 0.2s; cursor: pointer;
        }
        .static-node:hover {
          border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.08);
          color: #fff; transform: translateY(-2px);
        }
        .static-node.root {
          background: linear-gradient(135deg,rgba(99,102,241,.2),rgba(139,92,246,.2));
          border-color: rgba(99,102,241,.4); font-weight: 800; color: #C7D2FE;
          font-size: 0.85rem;
        }
        .tools-section-label {
          font-size: 0.68rem; color: var(--muted); letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: 1rem; padding-left: 2px;
        }

        /* GRID VIEW */
        .site-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
          gap: 1.1rem;
        }
        .category-block {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 14px; overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .category-block:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,.4); }
        .cat-header {
          padding: 0.85rem 1rem; display: flex; align-items: center; gap: 0.65rem;
          border-bottom: 1px solid var(--border);
        }
        .cat-icon {
          width: 34px; height: 34px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .cat-title { font-size: 0.85rem; font-weight: 700; letter-spacing: -0.01em; }
        .cat-count {
          margin-left: auto; font-size: 0.68rem; color: var(--muted);
          background: rgba(255,255,255,0.05); padding: 0.12rem 0.45rem;
          border-radius: 20px; border: 1px solid var(--border);
        }
        .tool-list { padding: 0.5rem 0.65rem 0.65rem; display: flex; flex-direction: column; gap: 1px; }
        .tool-node {
          display: flex; align-items: center; gap: 0.45rem;
          padding: 0.35rem 0.55rem; border-radius: 7px; cursor: pointer;
          text-decoration: none; color: var(--text);
          transition: background 0.12s, color 0.12s, transform 0.12s; font-size: 0.76rem; font-weight: 500;
        }
        .tool-node:hover { background: rgba(255,255,255,0.05); color: #fff; transform: translateX(3px); }
        .dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; opacity: .65; }
        .slug {
          font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--muted);
          margin-left: auto; opacity: 0; transition: opacity 0.12s; white-space: nowrap;
        }
        .tool-node:hover .slug { opacity: 1; }

        /* No results */
        .no-results {
          grid-column: 1/-1; display: flex; flex-direction: column;
          align-items: center; padding: 4rem 2rem; color: var(--muted); text-align: center;
        }
        .no-results-icon { font-size: 2.5rem; margin-bottom: 1rem; opacity: .3; }
        .no-results p { font-size: 0.82rem; }

        /* TREE VIEW */
        .tree-wrap { display: flex; flex-direction: column; align-items: center; }
        .tree-root {
          display: flex; align-items: center; gap: 0.6rem;
          background: linear-gradient(135deg,rgba(99,102,241,.25),rgba(139,92,246,.25));
          border: 1.5px solid rgba(99,102,241,.5);
          border-radius: 12px; padding: 0.65rem 1.4rem;
          font-size: 0.95rem; font-weight: 800; color: #C7D2FE; letter-spacing: -0.02em;
        }
        .tree-vline {
          width: 2px; height: 28px;
          background: linear-gradient(to bottom, rgba(99,102,241,.5), rgba(255,255,255,.08));
          margin: 0 auto;
        }
        .tree-branch-row {
          display: flex; align-items: flex-start; justify-content: center;
          gap: 0.75rem; width: 100%; flex-wrap: wrap;
        }
        .tree-category {
          display: flex; flex-direction: column; align-items: center;
          min-width: 148px; max-width: 188px;
        }
        .tree-vert { width: 1.5px; height: 12px; margin: 0 auto; }
        .tree-cat-node {
          display: flex; align-items: center; gap: 0.35rem;
          padding: 0.42rem 0.75rem; border-radius: 9px; font-size: 0.72rem;
          font-weight: 700; border: 1.5px solid transparent; white-space: nowrap;
          letter-spacing: 0.01em; width: 100%; justify-content: center;
        }
        .tree-tools-col { display: flex; flex-direction: column; align-items: center; width: 100%; }
        .tree-tool-wrap { display: flex; flex-direction: column; align-items: center; width: 100%; }
        .tree-tool {
          width: 100%; text-align: center; padding: 0.25rem 0.5rem;
          border-radius: 6px; font-size: 0.65rem; font-weight: 500; color: var(--muted);
          cursor: pointer; transition: all 0.12s; border: 1px solid transparent;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          text-decoration: none; display: block;
        }
        .tree-tool:hover {
          color: var(--cat-color, #818CF8);
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.08);
        }

        @media (max-width: 640px) {
          .sm-bar { padding: 0.6rem 1rem; }
          .sm-main { padding: 0 1rem 2rem; }
          .sm-hero { padding: 1.5rem 1rem 1rem; }
          .filter-bar { padding: 0 1rem 1rem; }
        }
      `}</style>

      <div className="sm-wrap">
        {/* ── Toolbar ──────────────────────────────────────────────────────── */}
        <div className="sm-bar">
          <div className="sm-stats">
            <div className="sm-pill">
              <span className="dot" />
              {totalTools} tools
            </div>
            <div className="sm-pill">{totalCategories} categories</div>
          </div>

          <input
            className="sm-search"
            type="text"
            placeholder={`Search ${totalTools} tools…`}
            value={query}
            onChange={handleSearch}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            autoComplete="off"
            spellCheck={false}
          />

          <div className="view-toggle">
            <button
              className={`vbtn${view === "grid" ? " active" : ""}`}
              onClick={() => setView("grid")}
            >
              GRID
            </button>
            <button
              className={`vbtn${view === "tree" ? " active" : ""}`}
              onClick={() => setView("tree")}
            >
              TREE
            </button>
          </div>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="sm-hero">
          <h1>Visual Sitemap</h1>
          <p>
            onlinetoolbase.com — {totalTools} tools across {totalCategories}{" "}
            categories
          </p>
        </div>

        {/* ── Category filter ───────────────────────────────────────────────── */}
        {!query && (
          <div className="filter-bar">
            <button
              className={`fpill${activeFilter === "all" ? " active" : ""}`}
              onClick={() => handleFilterClick("all")}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`fpill${activeFilter === cat.id ? " active" : ""}`}
                onClick={() => handleFilterClick(cat.id)}
                style={
                  activeFilter === cat.id
                    ? {
                        background: hexToRgba(cat.color, 0.15),
                        borderColor: hexToRgba(cat.color, 0.45),
                        color: cat.color,
                      }
                    : {}
                }
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        )}

        <div className="sm-main">
          {/* ── Static pages (only show when not searching / not filtering) ── */}
          {!query && activeFilter === "all" && (
            <>
              <div className="static-label">// core pages</div>
              <div className="static-grid">
                {STATIC_PAGES.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className={`static-node${p.root ? " root" : ""}`}
                  >
                    <span>{p.icon}</span>
                    {p.label}
                  </Link>
                ))}
              </div>
              <div className="tools-section-label">
                // tool pages — {totalTools} routes under /tools/
              </div>
            </>
          )}

          {/* ══ GRID VIEW ══════════════════════════════════════════════════ */}
          {view === "grid" && (
            <div className="site-grid">
              {displayedCategories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  siteUrl={siteUrl}
                  query={query}
                />
              ))}
              {!hasResults && (
                <div className="no-results">
                  <div className="no-results-icon">⌕</div>
                  <p>No tools match &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>
          )}

          {/* ══ TREE VIEW ══════════════════════════════════════════════════ */}
          {view === "tree" && (
            <div className="tree-wrap">
              <div className="tree-root">⚡ onlinetoolbase.com</div>
              <div className="tree-vline" />
              <div className="tree-branch-row">
                {displayedCategories.map((cat) => (
                  <TreeCategory
                    key={cat.id}
                    cat={cat}
                    siteUrl={siteUrl}
                    query={query}
                  />
                ))}
                {!hasResults && (
                  <div className="no-results">
                    <div className="no-results-icon">⌕</div>
                    <p>No tools match &ldquo;{query}&rdquo;</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
