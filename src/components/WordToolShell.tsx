"use client";

import { ReactNode } from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface WordToolShellProps {
  title: string;
  description: string;
  badges?: string[];
  children: ReactNode;
  useCases?: string[];
  faq?: FaqItem[];
}

const DEFAULT_BADGES = [
  "Free Tool",
  "No Signup",
  "100% Private — Runs In Your Browser",
];

export default function WordToolShell({
  title,
  description,
  badges = DEFAULT_BADGES,
  children,
  useCases,
  faq,
}: WordToolShellProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-2 text-slate-600">{description}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {b}
            </span>
          ))}
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {children}
      </section>

      {useCases && useCases.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">Common uses</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </section>
      )}

      {faq && faq.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-3 divide-y divide-slate-200 rounded-lg border border-slate-200">
            {faq.map((item) => (
              <details key={item.q} className="group p-4">
                <summary className="cursor-pointer list-none font-medium text-slate-800 marker:content-none">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
