"use client";
// src/components/SubscribeForm.tsx
//
// Two variants:
//   <SubscribeForm />              — full card (for blog index, homepage sections)
//   <SubscribeForm variant="inline" /> — compact row (for blog post sidebar, footer)
//
// Wiring to your email provider:
//   Set the NEXT_PUBLIC_SUBSCRIBE_ENDPOINT env var to your provider's form action URL.
//   Works with Mailchimp, MailerLite, ConvertKit, and any service that accepts
//   a POST with an `email` field.
//
//   Mailchimp example endpoint:
//     https://us1.list-manage.com/subscribe/post?u=XXXX&id=XXXX
//   MailerLite example endpoint:
//     https://assets.mailerlite.com/jsonp/XXXX/forms/XXXX/subscribe
//
//   If the env var is not set the form will show a "not configured" message in
//   development so you can build the UI before wiring up the backend.

import { useState, useRef, type FormEventHandler } from "react";

// POST to our own API route — avoids Mailchimp CORS block
const ENDPOINT = "/api/subscribe";

interface Props {
  variant?: "card" | "inline";
  // Override the default heading / subheading
  heading?: string;
  subheading?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function SubscribeForm({
  variant = "card",
  heading = "Get new articles in your inbox",
  subheading = "Practical guides on writing, dev tools, finance, health, and more — free, no spam.",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  // ─── Inline variant ────────────────────────────────────────────────────────
  if (variant === "inline") {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Newsletter
          </p>
        </div>
        <div className="p-5">
          {status === "success" ? (
            <div className="flex items-center gap-2 text-emerald-600">
              <svg
                className="w-5 h-5 shrink-0"
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
              <p className="text-sm font-semibold">You&apos;re subscribed!</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                New articles straight to your inbox. No spam.
              </p>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <input
                  ref={inputRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={status === "loading"}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent disabled:opacity-50 bg-slate-50 placeholder-slate-400 text-slate-800"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !email.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Subscribing…
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-600">{errorMsg}</p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─── Card variant (default) ────────────────────────────────────────────────
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-8 shadow-xl">
      {/* Decorative background circles */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5"
        aria-hidden
      />

      <div className="relative">
        {/* Icon */}
        <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center mb-5">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-white leading-snug mb-2">
          {heading}
        </h3>
        <p className="text-indigo-200 text-sm leading-relaxed mb-6">
          {subheading}
        </p>

        {/* Success state */}
        {status === "success" ? (
          <div className="flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3.5">
            <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-white"
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
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                You&apos;re in!
              </p>
              <p className="text-indigo-200 text-xs mt-0.5">
                Check your inbox to confirm your subscription.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={status === "loading"}
                className="flex-1 px-4 py-3 text-sm bg-white/15 border border-white/20 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 disabled:opacity-50 transition-all"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="shrink-0 flex items-center justify-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Subscribing…
                  </>
                ) : (
                  "Subscribe →"
                )}
              </button>
            </div>

            {status === "error" && (
              <p className="text-red-300 text-xs mt-2.5">{errorMsg}</p>
            )}

            <p className="text-indigo-300 text-xs mt-3">
              No spam. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}