"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  Copy,
  Check,
  Eye,
  EyeOff,
  Timer,
  AlertTriangle,
} from "lucide-react";
import { toArrayBuffer } from "@/lib/crypto";
// ─── Types ───────────────────────────────────────────────────────────────────

type Digits = 6 | 8;
type Period = 30 | 60;
type Algorithm = "SHA-1" | "SHA-256" | "SHA-512";

// ─── Base32 decode (RFC 4648) ────────────────────────────────────────────────

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(input: string): Uint8Array {
  const clean = input.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = "";
  for (const char of clean) {
    const val = BASE32_ALPHABET.indexOf(char);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, "0");
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return new Uint8Array(bytes);
}

function isValidBase32Secret(input: string): boolean {
  const clean = input.toUpperCase().replace(/\s+/g, "").replace(/=+$/, "");
  return clean.length >= 8 && /^[A-Z2-7]+$/.test(clean);
}

// ─── TOTP (RFC 6238 / HOTP RFC 4226) ────────────────────────────────────────

function counterToBytes(counter: number): Uint8Array {
  const bytes = new Uint8Array(8);
  let value = counter;
  for (let i = 7; i >= 0; i--) {
    bytes[i] = value % 256;
    value = Math.floor(value / 256);
  }
  return bytes;
}

async function generateTotp(
  secret: string,
  digits: Digits,
  period: Period,
  algorithm: Algorithm,
  atTime: number = Date.now(),
): Promise<string> {
  const key = base32Decode(secret);
  const counter = Math.floor(atTime / 1000 / period);
  const counterBytes = counterToBytes(counter);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    toArrayBuffer(key),
    { name: "HMAC", hash: algorithm },
    false,
    ["sign"],
  );
  const hmac = new Uint8Array(
    await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      toArrayBuffer(counterBytes)
    ),
  );

  const offset = hmac[hmac.length - 1] & 0xf;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const modulo = 10 ** digits;
  return (binary % modulo).toString().padStart(digits, "0");
}

const DIGIT_OPTIONS: Digits[] = [6, 8];
const PERIOD_OPTIONS: Period[] = [30, 60];
const ALGO_OPTIONS: Algorithm[] = ["SHA-1", "SHA-256", "SHA-512"];

// ─── Component ───────────────────────────────────────────────────────────────

export default function TotpCodeGeneratorClient() {
  const [secret, setSecret] = useState<string>("");
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const [digits, setDigits] = useState<Digits>(6);
  const [period, setPeriod] = useState<Period>(30);
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-1");
  const [code, setCode] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [genError, setGenError] = useState<string>("");

  const validSecret = isValidBase32Secret(secret);

  const refreshCode = useCallback(async (): Promise<void> => {
    if (!validSecret) {
      setCode("");
      return;
    }
    try {
      const now = Date.now();
      const nextCode = await generateTotp(secret, digits, period, algorithm, now);
      setCode(nextCode);
      setGenError("");
    } catch {
      setGenError("Couldn't generate a code from this secret.");
      setCode("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secret, digits, period, algorithm, validSecret]);

  // Recompute the code whenever inputs change.
  useEffect(() => {
    refreshCode();
  }, [refreshCode]);

  // Tick every second: update the countdown, and regenerate right as a new
  // time-window begins so the code is never shown after it's expired.
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const elapsedInWindow = Math.floor(now / 1000) % period;
      const remaining = period - elapsedInWindow;
      setSecondsLeft(remaining);
      if (remaining === period) refreshCode();
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [period, refreshCode]);

  const handleCopy = (): void => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = (secondsLeft / period) * 100;
  const formattedCode = code
    ? `${code.slice(0, code.length / 2)} ${code.slice(code.length / 2)}`
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-600 to-sky-700 rounded-2xl mb-4 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            TOTP / 2FA Code Generator
          </h2>
          <p className="text-gray-600">
            Generate live authenticator codes from a secret key — fully
            offline, nothing is transmitted
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Secret key (Base32)
            </label>
            <div className="relative">
              <input
                type={showSecret ? "text" : "password"}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="e.g. JBSWY3DPEHPK3PXP"
                autoComplete="off"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 pr-12 font-mono text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
              <button
                onClick={() => setShowSecret((s) => !s)}
                aria-label={showSecret ? "Hide secret" : "Show secret"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showSecret ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              This is the same secret shown as text (or encoded in the QR
              code) when an app or site sets up two-factor authentication.
            </p>
          </div>

          {!secret ? (
            <div className="flex items-center justify-center h-40 bg-cyan-50 rounded-2xl border-2 border-dashed border-cyan-200 mb-6">
              <div className="text-center text-cyan-400">
                <Timer className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">
                  Enter a secret key to generate a live code
                </p>
              </div>
            </div>
          ) : !validSecret ? (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl mb-6">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">
                That doesn&apos;t look like a valid Base32 secret (letters A–Z and
                digits 2–7 only).
              </p>
            </div>
          ) : genError ? (
            <div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl mb-6">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{genError}</p>
            </div>
          ) : (
            <div className="mb-6 p-6 bg-gradient-to-br from-cyan-50 to-sky-50 border-2 border-cyan-200 rounded-2xl text-center">
              <p className="text-5xl font-black font-mono text-gray-900 tracking-wider mb-4">
                {formattedCode}
              </p>
              <div className="max-w-xs mx-auto mb-3">
                <div className="h-2 bg-white rounded-full overflow-hidden border border-cyan-100">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Refreshes in {secondsLeft}s
              </p>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Code
                  </>
                )}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Digits
              </label>
              <div className="flex gap-2">
                {DIGIT_OPTIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDigits(d)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      digits === d
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Period (seconds)
              </label>
              <div className="flex gap-2">
                {PERIOD_OPTIONS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      period === p
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Algorithm
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-cyan-500"
              >
                {ALGO_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Most authenticator apps use 6 digits, a 30-second period, and
            SHA-1 — only change these if your service told you to use
            something else.
          </p>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-600" />
            When to use this
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            This generates the same time-based one-time codes (TOTP) that
            apps like Google Authenticator or Authy produce, computed
            entirely in your browser via the Web Crypto API. It&apos;s useful for
            testing your own 2FA setup, verifying a secret before scanning it
            into an app, or building/debugging TOTP integrations. Only enter
            secrets you own — treat a TOTP secret with the same care as a
            password, since anyone with it can generate your codes.
          </p>
        </div>
      </div>
    </div>
  );
}
