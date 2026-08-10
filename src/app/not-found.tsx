"use client";

import React, { useState, useEffect, useMemo } from "react";
import { tools } from "@/lib/tools";
import { categories } from "@/lib/categories";
// ─────────────────────────────────────────────────────────────────────────
// OnlineToolBase — 404 page, built as "Tool #000 · Page Locator"
//
// The core idea: this site's whole product is small, single-purpose tools.
// Instead of a generic sorry-page, the 404 behaves like one more tool —
// input (a broken link) in, output (the right tool) out — so a lost visitor
// recovers in the same interaction pattern they already trust from the rest
// of the site.
//
// DROP-IN NOTES for app/not-found.tsx (Next.js App Router):
//   1. Add `"use client"` at the top — this needs useState/useEffect.
//   2. Swap the plain <a> tags for `import Link from "next/link"`.
//   3. `not-found.tsx` doesn't receive the failed path as a prop. The
//      `window.location.pathname` read below works fine client-side after
//      mount (see the `brokenPath` effect) — that's the standard workaround.
//   4. Swap TOOL_INDEX for your real tools[] import from "@/lib/tools".
// ─────────────────────────────────────────────────────────────────────────

export default function NotFound() {
  const [query, setQuery] = useState("");
  const [brokenPath, setBrokenPath] = useState("/the/page/you/wanted");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.location?.pathname) {
      setBrokenPath(window.location.pathname);
    }
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  return (
    <div className="otb-404-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .otb-404-root {
          --paper: #f6f7f5;
          --panel: #ffffff;
          --ink: #14171b;
          --graphite: #565d68;
          --line: #dce0e3;
          --amber: #d98a2b;
          --amber-soft: #f5e4c8;
          --ok: #2e8b57;
          min-height: 100vh;
          background: var(--paper);
          color: var(--ink);
          font-family: 'Inter', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 56px 20px 40px;
          box-sizing: border-box;
        }
        .otb-404-root * { box-sizing: border-box; }

        .otb-wrap { width: 100%; max-width: 640px; }

        .otb-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: -0.01em;
          margin-bottom: 40px;
        }
        .otb-brand-mark {
          width: 18px; height: 18px;
          border-radius: 4px;
          background: var(--ink);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .otb-brand-mark span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--amber);
        }

        .otb-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--graphite);
          margin-bottom: 14px;
          animation: otb-fade-up 0.5s ease both;
        }

        .otb-status-line {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: var(--graphite);
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          animation: otb-fade-up 0.5s ease 0.05s both;
        }
        .otb-status-line .otb-path {
          color: var(--ink);
          word-break: break-all;
        }
        .otb-status-line .otb-code {
          margin-left: auto;
          color: var(--amber);
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .otb-status-line .otb-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--amber);
          animation: otb-pulse 1.8s ease-in-out infinite;
        }

        .otb-h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 5vw, 38px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
          animation: otb-fade-up 0.5s ease 0.1s both;
        }

        .otb-sub {
          font-size: 15.5px;
          line-height: 1.55;
          color: var(--graphite);
          margin: 0 0 32px;
          max-width: 52ch;
          animation: otb-fade-up 0.5s ease 0.15s both;
        }

        .otb-console {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 18px;
          margin-bottom: 28px;
          animation: otb-fade-up 0.55s ease 0.2s both;
        }
        .otb-console-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--graphite);
          margin-bottom: 10px;
        }
        .otb-search {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--line);
          border-radius: 9px;
          padding: 11px 13px;
          background: var(--paper);
        }
        .otb-search input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          width: 100%;
        }
        .otb-search input::placeholder { color: #9aa1ab; }
        .otb-search svg { flex-shrink: 0; color: var(--graphite); }

        .otb-results {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .otb-result {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--ink);
          font-size: 14.5px;
          font-weight: 500;
          transition: background 0.15s ease;
        }
        .otb-result:hover { background: var(--amber-soft); }
        .otb-result .otb-cat {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--graphite);
          font-weight: 400;
        }
        .otb-empty {
          margin-top: 12px;
          font-size: 13.5px;
          color: var(--graphite);
          font-family: 'IBM Plex Mono', monospace;
        }

        .otb-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          animation: otb-fade-up 0.55s ease 0.25s both;
        }
        .otb-btn {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 8px;
          transition: transform 0.12s ease, background 0.15s ease;
        }
        .otb-btn:hover { transform: translateY(-1px); }
        .otb-btn.primary { background: var(--ink); color: #fff; }
        .otb-btn.primary:hover { background: #262b32; }
        .otb-btn.ghost {
          background: transparent;
          color: var(--ink);
          border: 1px solid var(--line);
        }
        .otb-btn.ghost:hover { background: var(--panel); }

        .otb-popular-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--graphite);
          margin-bottom: 12px;
        }

        .otb-cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 10px;
          margin-bottom: 44px;
          animation: otb-fade-up 0.55s ease 0.3s both;
        }
        .otb-cat-card {
          display: block;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 14px 15px;
          text-decoration: none;
          color: var(--ink);
          background: var(--panel);
          transition: border-color 0.15s ease, transform 0.12s ease;
        }
        .otb-cat-card:hover { border-color: var(--amber); transform: translateY(-2px); }
        .otb-cat-card .name { font-weight: 600; font-size: 14.5px; margin-bottom: 3px; }
        .otb-cat-card .note {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          color: var(--graphite);
        }

        .otb-footer {
          width: 100%;
          border-top: 1px solid var(--line);
          padding-top: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: var(--graphite);
        }
        .otb-footer .ok-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--ok);
        }

        @keyframes otb-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes otb-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          .otb-status-line .otb-dot { animation: none; }
          * { animation: none !important; }
        }
      `}</style>

      <div className="otb-wrap">
        <div className="otb-brand">
          <span className="otb-brand-mark"><span /></span>
          onlinetoolbase.com
        </div>

        <div className="otb-eyebrow">Tool #000 · Page Locator</div>

        <div className="otb-status-line">
          GET <span className="otb-path">{mounted ? brokenPath : "…"}</span>
          <span className="otb-code"><span className="otb-dot" />404</span>
        </div>

        <h1 className="otb-h1">This tool isn't here.</h1>
        <p className="otb-sub">
          The link you followed points to a page that's been moved, renamed, or never
          existed. Search for what you were looking for, or jump to a popular tool below.
        </p>

        <div className="otb-console">
          <div className="otb-console-label">Find the right tool</div>
          <div className="otb-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “pdf”, “password”, “wordle”…"
            />
          </div>

          {query.trim() && (
            results.length > 0 ? (
              <div className="otb-results">
                {results.map((t) => (
                  <a key={t.slug} className="otb-result" href={`/tools/${t.slug}`}>
                    {t.name}
                    <span className="otb-cat">{t.category}</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="otb-empty">No tools match "{query}" — try a shorter word, or browse all tools below.</div>
            )
          )}
        </div>

        <div className="otb-actions">
          <a className="otb-btn primary" href="/">Go home</a>
          <a className="otb-btn ghost" href="/tools">Browse all tools</a>
          <a className="otb-btn ghost" href="/contact">Report this link</a>
        </div>

        <div className="otb-popular-label">Popular categories</div>
        <div className="otb-cat-grid">
          {categories.map((c) => (
            <a key={c.slug} className="otb-cat-card" href={`/tools/category/${c.slug}`}>
              <div className="name">{c.name}</div>
            </a>
          ))}
        </div>

        <div className="otb-footer">
          <span className="ok-dot" />
          All other tools are up and running — onlinetoolbase.com
        </div>
      </div>
    </div>
  );
}