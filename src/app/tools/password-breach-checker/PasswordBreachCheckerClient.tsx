"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Eye,
  EyeOff,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Lock,
  Loader2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type CheckStatus = "idle" | "checking" | "safe" | "pwned" | "error";

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function sha1Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

async function checkPwnedCount(password: string): Promise<number> {
  const hash = await sha1Hex(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
    headers: { "Add-Padding": "true" },
  });
  if (!res.ok) throw new Error(`Breach API responded ${res.status}`);
  const text = await res.text();

  for (const line of text.split("\n")) {
    const [lineSuffix, count] = line.trim().split(":");
    if (lineSuffix === suffix) return parseInt(count, 10) || 0;
  }
  return 0;
}

function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PasswordBreachCheckerClient() {
  const [pw, setPw] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [breachCount, setBreachCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef<number>(0);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!pw) {
      setStatus("idle");
      return;
    }

    setStatus("checking");
    const thisRequestId = ++requestIdRef.current;

    debounceRef.current = setTimeout(async () => {
      try {
        const count = await checkPwnedCount(pw);
        if (thisRequestId !== requestIdRef.current) return; // stale response
        setBreachCount(count);
        setStatus(count > 0 ? "pwned" : "safe");
      } catch (err) {
        if (thisRequestId !== requestIdRef.current) return;
        setErrorMessage(
          err instanceof Error ? err.message : "Couldn't reach the breach database",
        );
        setStatus("error");
      }
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [pw]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full mb-4 shadow-lg">
              <ShieldQuestion className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Password Breach Checker
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Checks your password against{" "}
              <span className="font-semibold">known data breaches</span> —
              your password is never sent anywhere. Only a partial hash
              fingerprint leaves your browser.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter a password to check
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPw(e.target.value)
                }
                placeholder="Type a password here…"
                autoComplete="off"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 pr-12 font-mono focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <button
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {show ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="mt-6 min-h-[9rem]">
              {status === "idle" && (
                <div className="flex items-center justify-center h-36 bg-purple-50 rounded-2xl border-2 border-dashed border-purple-200">
                  <div className="text-center text-purple-400">
                    <ShieldQuestion className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-medium">
                      Type a password to check it against known breaches
                    </p>
                  </div>
                </div>
              )}

              {status === "checking" && (
                <div className="flex items-center justify-center h-36 bg-gray-50 rounded-2xl border-2 border-gray-100">
                  <div className="text-center text-gray-500">
                    <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                    <p className="text-sm font-medium">
                      Checking against breach database…
                    </p>
                  </div>
                </div>
              )}

              {status === "safe" && (
                <div className="flex items-start gap-4 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-emerald-800 mb-1">
                      Not found in known breaches
                    </p>
                    <p className="text-sm text-emerald-700">
                      This password wasn't found in the breach database we
                      checked. That doesn't guarantee it's strong — pair this
                      with a strength check too.
                    </p>
                  </div>
                </div>
              )}

              {status === "pwned" && (
                <div className="flex items-start gap-4 p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                  <ShieldAlert className="w-8 h-8 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-red-800 mb-1">
                      Found in {formatCount(breachCount)} known{" "}
                      {breachCount === 1 ? "breach" : "breaches"}
                    </p>
                    <p className="text-sm text-red-700">
                      This password has appeared in previously leaked data.
                      Don't use it — even with minor tweaks — for any
                      account.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-start gap-4 p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl">
                  <ShieldQuestion className="w-8 h-8 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-amber-800 mb-1">
                      Couldn't complete the check
                    </p>
                    <p className="text-sm text-amber-700">{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setPw("")}
              className="mt-4 text-sm text-gray-500 hover:text-purple-600 transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600 max-w-xl mx-auto">
            <p className="font-semibold mb-2 text-gray-800 flex items-center gap-2">
              <Lock className="w-4 h-4" /> How this stays private
            </p>
            <p className="leading-relaxed">
              We use the{" "}
              <span className="font-medium">k-anonymity</span> method from
              Have I Been Pwned: your password is hashed with SHA-1 in your
              browser, and only the first 5 characters of that hash are sent
              to the API. The API returns hundreds of possible matches for
              that prefix, and the match is found locally — the API never
              receives your actual password or full hash.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
