"use client";
// src/components/CookieBanner.tsx
//
// GDPR-compliant cookie consent banner.
// - Stores consent in localStorage under "cookie_consent"
// - Values: "all" | "essential" | null (not yet answered)
// - Exposes a helper hook so other components can read consent state
// - Slides up from the bottom on first visit, gone once answered
//
// Usage in src/app/layout.tsx:
//   import CookieBanner from "@/components/CookieBanner";
//   // Inside <body>:
//   <CookieBanner />

import { useState, useEffect } from "react";

export type ConsentLevel = "all" | "essential" | null;

const STORAGE_KEY = "cookie_consent";

export function getConsent(): ConsentLevel {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(STORAGE_KEY) as ConsentLevel) ?? null;
}

export function hasConsent(level: "all" | "essential"): boolean {
  const c = getConsent();
  if (level === "essential") return c !== null;
  return c === "all";
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "all");
    setVisible(false);
    // Fire analytics init if you have it
    window.dispatchEvent(new CustomEvent("cookie_consent", { detail: "all" }));
  }

  function essential() {
    localStorage.setItem(STORAGE_KEY, "essential");
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent("cookie_consent", { detail: "essential" }),
    );
  }

  // Don't render on server or if already answered
  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className={`
        fixed bottom-0 left-0 right-0 z-50
        transition-transform duration-500 ease-out
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      {/* Backdrop gradient — softens the page behind */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
        aria-hidden
      />

      {/* Banner card */}
      <div className="relative mx-auto max-w-5xl mb-4 mx-4 sm:mx-6 lg:mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />

          <div className="px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Icon */}
              <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  We use cookies to improve your experience
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Essential cookies keep the site working. Analytics cookies (if
                  you accept) help us understand which tools are most useful so
                  we can improve them. We never sell your data.{" "}
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-2 transition-colors"
                  >
                    {showDetails ? "Hide details" : "Learn more"}
                  </button>
                </p>

                {/* Expandable detail */}
                {showDetails && (
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <p className="text-xs font-bold text-slate-700">
                          Essential cookies
                        </p>
                        <span className="ml-auto text-xs text-slate-400 font-medium">
                          Always on
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Keep the site secure and functional. Store your
                        preferences (e.g. dark mode, consent choice). Cannot be
                        disabled.
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                        <p className="text-xs font-bold text-slate-700">
                          Analytics cookies
                        </p>
                        <span className="ml-auto text-xs text-slate-400 font-medium">
                          Optional
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Help us see which tools people use and find errors. Data
                        is aggregated and anonymous. No tracking across other
                        websites.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-col gap-2 shrink-0 sm:min-w-[160px]">
                <button
                  onClick={accept}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Accept all
                </button>
                <button
                  onClick={essential}
                  className="w-full text-sm font-medium text-slate-500 hover:text-slate-700 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Essential only
                </button>
              </div>
            </div>

            {/* Footer links */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-1">
              <a
                href="/privacy"
                className="text-xs text-slate-400 hover:text-indigo-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-xs text-slate-400 hover:text-indigo-600 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-xs text-slate-400 hover:text-indigo-600 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
