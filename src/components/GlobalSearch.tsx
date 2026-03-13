"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Command } from "lucide-react";
import { tools, type Tool } from "@/lib/tools";

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
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function score(tool: Tool, q: string): number {
  const ql = q.toLowerCase();
  const name = tool.name.toLowerCase();
  const desc = tool.description.toLowerCase();
  const cat  = tool.category.toLowerCase();
  if (name === ql)                    return 100;
  if (name.startsWith(ql))           return 80;
  if (name.includes(ql))             return 60;
  if (desc.includes(ql))             return 40;
  if (cat.includes(ql))              return 20;
  // word-level match
  const words = ql.split(/\s+/);
  const allMatch = words.every((w) => name.includes(w) || desc.includes(w));
  if (allMatch)                       return 30;
  return 0;
}

function search(q: string): Tool[] {
  if (!q.trim()) return [];
  return tools
    .map((t) => ({ tool: t, s: score(t, q) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 8)
    .map(({ tool }) => tool);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GlobalSearch() {
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [active,  setActive]  = useState(0);
  const router    = useRouter();
  const inputRef  = useRef<HTMLInputElement>(null);
  const listRef   = useRef<HTMLUListElement>(null);

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
    const res = search(query);
    setResults(res);
    setActive(0);
  }, [query]);

  // ── Navigate to tool ─────────────────────────────────────────────────────

  const navigate = useCallback((tool: Tool) => {
    closeModal();
    router.push(`/tools/${tool.slug}`);
  }, [closeModal, router]);

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

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Trigger button (shown in header) ───────────────────────────── */}
      <button
        onClick={openModal}
        aria-label='Search tools'
        className='flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors text-sm group w-full md:w-64'
      >
        <Search className='w-4 h-4 flex-shrink-0' />
        <span className='flex-1 text-left hidden sm:block'>Search tools…</span>
        <kbd className='hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-white border border-gray-200 rounded-md text-gray-400 group-hover:border-gray-300 shadow-sm'>
          <Command className='w-3 h-3' />K
        </kbd>
      </button>

      {/* ── Modal overlay ──────────────────────────────────────────────── */}
      {open && (
        <div
          className='fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4'
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role='dialog'
          aria-modal='true'
          aria-label='Search tools'
        >
          {/* Backdrop */}
          <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' aria-hidden='true' />

          {/* Panel */}
          <div className='relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[70vh]'>

            {/* Search input row */}
            <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-100'>
              <Search className='w-5 h-5 text-gray-400 flex-shrink-0' />
              <input
                ref={inputRef}
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder='Search 130+ tools…'
                className='flex-1 text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent'
                autoComplete='off'
                spellCheck={false}
              />
              {query && (
                <button onClick={() => setQuery("")} className='text-gray-400 hover:text-gray-600 transition-colors'>
                  <X className='w-4 h-4' />
                </button>
              )}
              <kbd className='hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-200 rounded text-gray-400'>
                ESC
              </kbd>
            </div>

            {/* Results list */}
            {results.length > 0 && (
              <ul
                ref={listRef}
                className='overflow-y-auto divide-y divide-gray-50 flex-1'
                role='listbox'
              >
                {results.map((tool, i) => (
                  <li
                    key={tool.slug}
                    role='option'
                    aria-selected={i === active}
                    onClick={() => navigate(tool)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${i === active ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                  >
                    <span className='text-xl w-8 text-center flex-shrink-0'>
                      {CATEGORY_ICONS[tool.category] ?? "🔧"}
                    </span>
                    <div className='flex-1 min-w-0'>
                      <div className={`text-sm font-semibold truncate ${i === active ? "text-indigo-700" : "text-gray-800"}`}>
                        {tool.name}
                      </div>
                      <div className='text-xs text-gray-400 truncate'>{tool.description}</div>
                    </div>
                    <div className='flex items-center gap-2 flex-shrink-0'>
                      <span className='text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full'>
                        {tool.category}
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-opacity ${i === active ? "opacity-100 text-indigo-500" : "opacity-0"}`} />
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* No results */}
            {query.trim() && results.length === 0 && (
              <div className='px-4 py-10 text-center text-gray-400'>
                <Search className='w-8 h-8 mx-auto mb-2 opacity-30' />
                <p className='text-sm'>No tools found for &ldquo;{query}&rdquo;</p>
                <p className='text-xs mt-1'>Try a different keyword or browse by category on the homepage</p>
              </div>
            )}

            {/* Empty state — show popular categories */}
            {!query.trim() && (
              <div className='px-4 py-4'>
                <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3'>Popular categories</p>
                <div className='flex flex-wrap gap-2'>
                  {["Calculator", "Finance", "Health", "Writing", "Developer", "Design", "Social Media", "Productivity"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setQuery(cat)}
                      className='flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 text-gray-600 rounded-lg text-xs font-medium transition-colors'
                    >
                      <span>{CATEGORY_ICONS[cat] ?? "🔧"}</span>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer hint */}
            <div className='flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-400'>
              <span className='flex items-center gap-2'>
                <kbd className='px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm'>↑↓</kbd> navigate
                <kbd className='px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm'>↵</kbd> open
              </span>
              <span>{tools.length} tools available</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
