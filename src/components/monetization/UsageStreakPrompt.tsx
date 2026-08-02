"use client";
// src/components/monetization/UsageStreakPrompt.tsx
//
// Tracks how many different tools a user has used this session (via localStorage).
// After 3 tools: shows a "power user" recognition banner with email capture.
// After 5 tools: escalates with a stronger message.
// Dismissed permanently once subscribed, or per-session if skipped.
//
// Usage — add to any tool page layout (fires after the tool is interacted with):
//   import { trackToolUse } from "@/components/monetization/UsageStreakPrompt";
//   // Call this when the user gets a result:
//   trackToolUse("sales-tax-calculator");
//
// The banner itself auto-mounts when the threshold is crossed:
//   import UsageStreakPrompt from "@/components/monetization/UsageStreakPrompt";
//   <UsageStreakPrompt />  // Add once to layout

import { useState, useEffect } from "react";

const STORAGE_KEY   = "used_tools";
const DISMISSED_KEY = "streak_dismissed";
const SUBSCRIBED_KEY = "user_subscribed";
const THRESHOLD_1   = 3;
const THRESHOLD_2   = 5;

// ── Public helper — call from tool pages when user gets a result ──────────────
export function trackToolUse(slug: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const used: string[] = raw ? JSON.parse(raw) : [];
    if (!used.includes(slug)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...used, slug]));
      window.dispatchEvent(new Event("toolused"));
    }
  } catch { /* non-critical */ }
}

export function getUsedToolCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw).length : 0;
  } catch { return 0; }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function UsageStreakPrompt() {
  const [show, setShow]       = useState(false);
  const [count, setCount]     = useState(0);
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const check = () => {
      if (localStorage.getItem(SUBSCRIBED_KEY)) return;
      if (sessionStorage.getItem(DISMISSED_KEY)) return;
      const c = getUsedToolCount();
      if (c >= THRESHOLD_1) { setCount(c); setShow(true); }
    };

    check();
    window.addEventListener("toolused", check);
    return () => window.removeEventListener("toolused", check);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        localStorage.setItem(SUBSCRIBED_KEY, "1");
        setTimeout(() => setShow(false), 3000);
      } else {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (!show) return null;

  const isPowerUser = count >= THRESHOLD_2;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 pointer-events-none">
      <div
        className="w-full max-w-2xl pointer-events-auto animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className={`relative rounded-2xl shadow-2xl overflow-hidden border ${
          isPowerUser
            ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-500"
            : "bg-white border-indigo-100"
        }`}>
          {/* Top accent line for non-power-user */}
          {!isPowerUser && (
            <div className="h-1 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400" />
          )}

          <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Badge */}
            <div className={`flex items-center gap-2.5 flex-shrink-0 ${isPowerUser ? "text-white" : "text-indigo-700"}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                isPowerUser ? "bg-white/20" : "bg-indigo-100"
              }`}>
                {count}
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${isPowerUser ? "text-violet-200" : "text-indigo-400"}`}>
                  {isPowerUser ? "Power User 🔥" : "On a roll ⚡"}
                </p>
                <p className={`text-sm font-bold leading-snug ${isPowerUser ? "text-white" : "text-gray-900"}`}>
                  {isPowerUser
                    ? `${count} tools used — you're a power user`
                    : `You've used ${count} tools today`}
                </p>
              </div>
            </div>

            {/* Form or success */}
            {status === "success" ? (
              <div className={`flex items-center gap-2 text-sm font-semibold ${isPowerUser ? "text-white" : "text-emerald-600"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Get weekly tool guides — your@email.com"
                  disabled={status === "loading"}
                  className={`flex-1 px-3 py-2 text-sm rounded-xl focus:outline-none focus:ring-2 disabled:opacity-50 ${
                    isPowerUser
                      ? "bg-white/20 border border-white/30 text-white placeholder-violet-300 focus:ring-white/40"
                      : "border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !email.trim()}
                  className={`shrink-0 flex items-center justify-center gap-1.5 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isPowerUser
                      ? "bg-white text-indigo-700 hover:bg-indigo-50"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {status === "loading"
                    ? <div className="w-4 h-4 border-2 border-current/40 border-t-current rounded-full animate-spin" />
                    : "Subscribe →"}
                </button>
                {status === "error" && (
                  <p className={`text-xs ${isPowerUser ? "text-red-300" : "text-red-500"}`}>{errorMsg}</p>
                )}
              </form>
            )}

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                isPowerUser
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600"
              }`}
              aria-label="Dismiss"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}