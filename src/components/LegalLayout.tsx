// src/components/LegalLayout.tsx
// Shared wrapper for all legal / policy pages.
// Matches the app's existing breadcrumb + section conventions.

import React from "react";
import Link from "next/link";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  description: string;
  children: React.ReactNode;
}

const LEGAL_NAV = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact" },
];

export default function LegalLayout({
  title,
  lastUpdated,
  description,
  children,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb — matches tool pages */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              {title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Secondary legal nav */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {LEGAL_NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <main
        id="main-content"
        aria-label={title}
        className="max-w-4xl mx-auto px-4 pb-16"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Page header */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-500 text-sm mb-2">{description}</p>
          <p className="text-gray-400 text-xs mb-8">
            Last Updated: {lastUpdated}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-8" />

          {/* Page-specific content */}
          <div className="prose prose-lg max-w-none">{children}</div>
        </div>
      </main>
    </div>
  );
}

// ─── Re-usable section primitives ────────────────────────────────────────────

export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

export function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {children}
    </div>
  );
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function InfoBox({
  variant,
  title,
  children,
}: {
  variant: "blue" | "amber" | "red" | "green";
  title: string;
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    blue: "bg-blue-50  border-blue-200  text-blue-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    red: "bg-red-50   border-red-200   text-red-900",
    green: "bg-green-50 border-green-200 text-green-900",
  };
  return (
    <div className={`border-2 rounded-xl p-6 mt-6 ${styles[variant]}`}>
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      {children}
    </div>
  );
}
