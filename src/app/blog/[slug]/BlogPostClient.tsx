"use client";
// src/app/blog/[slug]/BlogPostClient.tsx
// Handles:
//  1. Scroll-spy Table of Contents (reads h2/h3 from the article at runtime)
//  2. Copy link button

import { useEffect, useState, useRef } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  postUrl: string;
  postTitle: string;
};

export default function BlogPostClient({ postUrl, postTitle }: Props) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Build TOC from rendered headings
  useEffect(() => {
    const article = document.getElementById("article-body");
    if (!article) return;

    const headings = Array.from(
      article.querySelectorAll("h2, h3"),
    ) as HTMLElement[];

    const items: TocItem[] = headings.map((el) => {
      // Ensure each heading has an id for anchor links
      if (!el.id) {
        el.id =
          el.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-") ?? Math.random().toString(36).slice(2);
      }
      return {
        id: el.id,
        text: el.textContent ?? "",
        level: el.tagName === "H2" ? 2 : 3,
      };
    });

    setTimeout(() => {
      setToc(items);
    }, 0);
  }, []);

  // Scroll-spy: highlight active section
  useEffect(() => {
    if (toc.length === 0) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [toc]);

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (toc.length === 0) return null;

  return (
    <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
      {/* Header */}
      <div className='px-5 py-4 border-b border-slate-100 flex items-center justify-between'>
        <p className='text-[11px] font-black text-slate-400 uppercase tracking-widest'>
          In This Article
        </p>
        {/* Copy link */}
        <button
          onClick={copyLink}
          className='flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-600 transition-colors'
          title='Copy link'
        >
          {copied ? (
            <>
              <svg
                className='w-3.5 h-3.5 text-green-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2.5}
                  d='M5 13l4 4L19 7'
                />
              </svg>
              <span className='text-green-600 font-medium'>Copied!</span>
            </>
          ) : (
            <>
              <svg
                className='w-3.5 h-3.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                />
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>

      {/* TOC items */}
      <nav
        aria-label='Table of contents'
        className='px-4 py-4 max-h-[420px] overflow-y-auto'
      >
        <ol className='space-y-0.5'>
          {toc.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                style={{ paddingLeft: item.level === 3 ? "1rem" : "0" }}
              >
                <a
                  href={`#${item.id}`}
                  className={`
                    flex items-start gap-2 px-3 py-2 rounded-xl text-sm leading-snug transition-all
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }
                  `}
                >
                  {item.level === 2 && (
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isActive ? "bg-indigo-500" : "bg-slate-300"}`}
                    />
                  )}
                  {item.level === 3 && (
                    <span
                      className={`mt-1.5 w-1 h-1 rounded-full shrink-0 transition-colors ${isActive ? "bg-indigo-400" : "bg-slate-200"}`}
                    />
                  )}
                  <span>{item.text}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
