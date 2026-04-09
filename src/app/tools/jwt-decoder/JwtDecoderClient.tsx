"use client";
import React, { useState } from "react";
import { Key, Copy, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );
  try {
    return decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(""),
    );
  } catch {
    return atob(padded);
  }
}

function decodeJwt(token: string): JwtParts {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT — must have 3 parts separated by dots.");
  }
  return {
    header: JSON.parse(base64UrlDecode(parts[0])),
    payload: JSON.parse(base64UrlDecode(parts[1])),
    signature: parts[2],
  };
}

function formatTs(val: unknown): string | null {
  if (typeof val !== "number") return null;
  return new Date(val * 1000).toLocaleString();
}

// ─── Component ───────────────────────────────────────────────────────────────

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoderClient() {
  const [token, setToken] = useState<string>("");
  const [result, setResult] = useState<JwtParts | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<string | null>(null);

  const decode = (): void => {
    setError("");
    setResult(null);
    try {
      setResult(decodeJwt(token));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const reset = (): void => {
    setToken("");
    setResult(null);
    setError("");
    setCopied(null);
  };

  const copyText = (text: string, key: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const isExpired =
    typeof result?.payload?.exp === "number"
      ? new Date((result.payload.exp as number) * 1000) < new Date()
      : false;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              JWT Decoder
            </h2>
            <p className="text-gray-500">
              Decode and inspect JWT tokens instantly — runs entirely in your
              browser
            </p>
          </div>

          <div className="space-y-6">
            {/* Token input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Paste JWT Token
                </label>
                <button
                  onClick={() => {
                    setToken(SAMPLE);
                    setResult(null);
                    setError("");
                  }}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Load sample token
                </button>
              </div>
              <textarea
                value={token}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setToken(e.target.value)
                }
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
              />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={decode}
                  disabled={!token.trim()}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors"
                >
                  Decode JWT
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              {error && (
                <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-4">
                {/* Validity */}
                <div
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium ${
                    isExpired
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-green-50 border-green-200 text-green-700"
                  }`}
                >
                  {isExpired ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {isExpired ? "Token is expired" : "Token is valid"}
                  {typeof result?.payload?.exp === "number" && (
                    <span className="font-normal">
                      &nbsp;· Expires {formatTs(result.payload.exp)}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Token Info
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        label: "Algorithm",
                        value: String(result.header.alg ?? "—"),
                      },
                      {
                        label: "Type",
                        value: String(result.header.typ ?? "—"),
                      },
                      {
                        label: "Subject",
                        value: String(result.payload.sub ?? "—"),
                      },
                      {
                        label: "Issued At",
                        value: formatTs(result.payload.iat) ?? "—",
                      },
                      {
                        label: "Expires",
                        value: formatTs(result.payload.exp) ?? "—",
                      },
                      {
                        label: "Issuer",
                        value: String(result.payload.iss ?? "—"),
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">
                          {label}
                        </div>
                        <div className="font-semibold text-gray-900 truncate text-sm">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-700">
                      Header{" "}
                      <span className="text-xs text-red-400 font-normal">
                        (algorithm &amp; type)
                      </span>
                    </h3>
                    <button
                      onClick={() =>
                        copyText(
                          JSON.stringify(result.header, null, 2),
                          "header",
                        )
                      }
                      className="flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                    >
                      <Copy className="w-3 h-3" />
                      {copied === "header" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm overflow-x-auto font-mono">
                    {JSON.stringify(result.header, null, 2)}
                  </pre>
                </div>

                {/* Payload */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-700">
                      Payload{" "}
                      <span className="text-xs text-purple-400 font-normal">
                        (claims)
                      </span>
                    </h3>
                    <button
                      onClick={() =>
                        copyText(
                          JSON.stringify(result.payload, null, 2),
                          "payload",
                        )
                      }
                      className="flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                    >
                      <Copy className="w-3 h-3" />
                      {copied === "payload" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm overflow-x-auto font-mono">
                    {JSON.stringify(result.payload, null, 2)}
                  </pre>
                </div>

                {/* Signature */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Signature{" "}
                    <span className="text-xs text-blue-400 font-normal">
                      (Base64URL-encoded)
                    </span>
                  </h3>
                  <p className="font-mono text-sm text-gray-600 break-all bg-gray-50 rounded-lg p-3 border border-gray-200">
                    {result.signature}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                JWTs have three dot-separated parts: header, payload, and
                signature
              </li>
              <li>
                The header and payload are Base64URL-encoded — not encrypted, so
                never store sensitive data in them
              </li>
              <li>
                Signature verification requires the secret key — this tool only
                decodes the visible parts
              </li>
              <li>
                Timestamps (iat, exp, nbf) are Unix epoch seconds and are
                displayed as human-readable local time above
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
