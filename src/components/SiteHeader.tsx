"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import GlobalSearch from "@/components/GlobalSearch";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* ── Logo (unchanged) ─────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-3 flex-shrink-0"
          aria-label="Calculators, Pdf Tools & More — Home"
        >
          <div
            className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-2xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
            OnlineToolBase
          </span>
        </Link>

        {/* ── Global search bar (centre) ───────────────────────────────── */}
        <div className="flex-1 max-w-sm">
          <GlobalSearch />
        </div>

        {/* ── Desktop nav links (unchanged) ───────────────────────────── */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          <Link
            href="/categories"
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/tools"
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            All Tools
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/#faq"
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* ── Mobile hamburger ────────────────────────────────────────── */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* ── Mobile dropdown ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {[
            { href: "/#categories", label: "Categories" },
            { href: "/#tools", label: "All Tools" },
            { href: "/blog", label: "Blog" },
            { href: "/#faq", label: "FAQ" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
