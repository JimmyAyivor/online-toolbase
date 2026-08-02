"use client";
// src/components/monetization/ExitIntentPopup.tsx
//
// Detects when the user is about to leave (mouse moves toward browser chrome
// on desktop, or after 45s of idle on mobile) and shows an email capture popup.
//
// Shown at most once per session. Never shown to users who already subscribed.
//
// Usage — add once to the root layout or a high-level client wrapper:
//   import ExitIntentPopup from "@/components/monetization/ExitIntentPopup";
//   <ExitIntentPopup />

import { useState, useEffect, useRef, useCallback } from "react";

const SESSION_KEY  = "exit_popup_shown";
const SUBSCRIBED_KEY = "user_subscribed";
const IDLE_TIMEOUT_MS = 45_000; // show on mobile after 45s inactivity

export default function ExitIntentPopup() {
  const [open, setOpen]       = useState(false);
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const triggered             = useRef(false);
  const idleTimer             = useRef<ReturnType<typeof setTimeout>|null>(null);

  const trigger = useCallback(() => {
    if (triggered.current) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (localStorage.getItem(SUBSCRIBED_KEY)) return;
    triggered.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setOpen(true);
  }, []);

  useEffect(() => {
    // Desktop: detect mouse moving toward top of viewport (about to use back/close)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) trigger();
    };

    // Mobile / idle: trigger after inactivity
    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(trigger, IDLE_TIMEOUT_MS);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousemove", resetIdle, { passive: true });
    document.addEventListener("keydown", resetIdle, { passive: true });
    document.addEventListener("scroll", resetIdle, { passive: true });
    document.addEventListener("touchstart", resetIdle, { passive: true });
    resetIdle();

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", resetIdle);
      document.removeEventListener("keydown", resetIdle);
      document.removeEventListener("scroll", resetIdle);
      document.removeEventListener("touchstart", resetIdle);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [trigger]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
        setTimeout(() => setOpen(false), 2500);
      } else {
        setStatus("error");
        setErrorMsg(data?.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-heading"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeSlideUp_0.3s_ease-out]">
        {/* Top gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500" />

        {/* Dismiss */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 py-8">
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">You're in!</h3>
              <p className="text-sm text-gray-500">Check your inbox to confirm your subscription.</p>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-200">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h2 id="exit-popup-heading" className="text-2xl font-black text-gray-900 leading-tight mb-2">
                Before you go —<br />
                <span className="text-indigo-600">get our best guides free</span>
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Practical articles on writing, dev tools, finance, health and more. One email a week. Unsubscribe any time.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:opacity-50 transition-all placeholder-gray-400"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !email.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm px-4 py-3.5 rounded-xl transition-colors shadow-sm shadow-indigo-200"
                >
                  {status === "loading" ? (
                    <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Subscribing…</>
                  ) : "Send me the guides →"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-500 text-center">{errorMsg}</p>
                )}
              </form>

              <button
                onClick={() => setOpen(false)}
                className="w-full mt-3 text-xs text-gray-400 hover:text-gray-500 transition-colors py-1"
              >
                No thanks, I'll pass
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}