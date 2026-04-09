"use client";
import React, { useState } from "react";
import {
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ValidationMode = "single" | "bulk";

interface ValidationResult {
  valid: boolean;
  email: string;
  errors: string[];
  warnings: string[];
  localPart?: string;
  domain?: string;
  tld?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SIMILAR_DOMAINS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "yahooo.com": "yahoo.com",
  "yaho.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "outlok.com": "outlook.com",
};

const DISPOSABLE_DOMAINS: string[] = [
  "tempmail.com",
  "throwaway.email",
  "10minutemail.com",
  "guerrillamail.com",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();

  if (!trimmed) {
    return {
      valid: false,
      email: trimmed,
      errors: ["Email is empty"],
      warnings: [],
    };
  }

  const errors: string[] = [];
  const warnings: string[] = [];

  const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicRegex.test(trimmed)) {
    errors.push("Invalid email format");
    return { valid: false, email: trimmed, errors, warnings };
  }

  const atIndex = trimmed.indexOf("@");
  const localPart = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex + 1);

  // Local part checks
  if (localPart.length === 0) errors.push("Missing local part before @");
  if (localPart.length > 64) errors.push("Local part exceeds 64 characters");
  if (localPart.startsWith(".") || localPart.endsWith("."))
    errors.push("Local part cannot start or end with a dot");
  if (/\.{2,}/.test(localPart))
    errors.push("Local part cannot contain consecutive dots");
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart))
    errors.push("Local part contains invalid characters");

  // Domain checks
  if (domain.length > 255) errors.push("Domain exceeds 255 characters");
  if (domain.startsWith(".") || domain.endsWith("."))
    errors.push("Domain cannot start or end with a dot");
  if (domain.startsWith("-") || domain.endsWith("-"))
    errors.push("Domain cannot start or end with a hyphen");

  const domainParts = domain.split(".");
  if (domainParts.length < 2) errors.push("Domain must have at least one dot");

  const tld = domainParts[domainParts.length - 1] ?? "";
  if (tld.length < 2)
    errors.push("Top-level domain must be at least 2 characters");
  if (!/^[a-zA-Z]+$/.test(tld))
    warnings.push("Top-level domain should only contain letters");

  const domainLower = domain.toLowerCase();
  const suggestion = SIMILAR_DOMAINS[domainLower];
  if (suggestion) warnings.push(`Did you mean ${suggestion}?`);
  if (DISPOSABLE_DOMAINS.some((d) => domainLower.includes(d)))
    warnings.push("This appears to be a disposable email address");

  // Overall length
  if (trimmed.length > 254)
    errors.push("Email exceeds maximum length of 254 characters");

  return {
    valid: errors.length === 0,
    email: trimmed,
    errors,
    warnings,
    localPart,
    domain,
    tld: tld || undefined,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function EmailValidatorClient() {
  const [singleEmail, setSingleEmail] = useState<string>("");
  const [bulkEmails, setBulkEmails] = useState<string>("");
  const [mode, setMode] = useState<ValidationMode>("single");
  const [results, setResults] = useState<ValidationResult | null>(null);
  const [bulkResults, setBulkResults] = useState<ValidationResult[]>([]);

  const handleSingleValidation = (): void => {
    setResults(validateEmail(singleEmail));
  };

  const handleBulkValidation = (): void => {
    const emails = bulkEmails.split("\n").filter((e) => e.trim());
    setBulkResults(emails.map(validateEmail));
  };

  const downloadResults = (): void => {
    const csv = [
      ["Email", "Valid", "Errors", "Warnings"],
      ...bulkResults.map((r) => [
        r.email,
        r.valid ? "Yes" : "No",
        r.errors.join("; "),
        r.warnings.join("; "),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "email-validation-results.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const validCount = bulkResults.filter((r) => r.valid).length;
  const invalidCount = bulkResults.filter((r) => !r.valid).length;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Email Validator
            </h2>
            <p className="text-gray-500">Check if email addresses are valid</p>
          </div>

          {/* Mode toggle */}
          <div className="mb-6 flex gap-3">
            {(["single", "bulk"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors capitalize ${
                  mode === m
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {m === "single" ? "Single Email" : "Bulk Validation"}
              </button>
            ))}
          </div>

          {/* ── Single mode ── */}
          {mode === "single" ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={singleEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSingleEmail(e.target.value)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") handleSingleValidation();
                    }}
                    placeholder="example@domain.com"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSingleValidation}
                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Validate
                  </button>
                </div>
              </div>

              {results && (
                <div
                  className={`rounded-xl p-6 border ${
                    results.valid
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {results.valid ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-600" />
                    )}
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {results.valid ? "Valid Email" : "Invalid Email"}
                      </h3>
                      <p className="text-sm text-gray-600">{results.email}</p>
                    </div>
                  </div>

                  {results.valid && results.localPart && results.domain && (
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Local Part:</span>
                        <span className="font-mono text-gray-900">
                          {results.localPart}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Domain:</span>
                        <span className="font-mono text-gray-900">
                          {results.domain}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">TLD:</span>
                        <span className="font-mono text-gray-900">
                          {results.tld}
                        </span>
                      </div>
                    </div>
                  )}

                  {results.errors.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-red-800 mb-2">
                        Errors:
                      </h4>
                      <ul className="space-y-1">
                        {results.errors.map((error, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-red-700 flex items-start gap-2"
                          >
                            <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {results.warnings.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        Warnings:
                      </h4>
                      <ul className="space-y-1">
                        {results.warnings.map((warning, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-yellow-700 flex items-start gap-2"
                          >
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* ── Bulk mode ── */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Addresses (one per line)
                </label>
                <textarea
                  value={bulkEmails}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setBulkEmails(e.target.value)
                  }
                  placeholder={
                    "john@example.com\njane@domain.com\ninvalid@email"
                  }
                  className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none font-mono text-sm"
                />
                <div className="mt-2 text-sm text-gray-500">
                  {bulkEmails.split("\n").filter((e) => e.trim()).length} emails
                  entered
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBulkValidation}
                  className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Validate All
                </button>
                {bulkResults.length > 0 && (
                  <button
                    onClick={downloadResults}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                )}
              </div>

              {bulkResults.length > 0 && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                    <h3 className="font-bold text-gray-900 mb-4">
                      Validation Summary
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">
                          {bulkResults.length}
                        </div>
                        <div className="text-sm text-gray-600">Total</div>
                      </div>
                      <div className="bg-green-100 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">
                          {validCount}
                        </div>
                        <div className="text-sm text-gray-600">Valid</div>
                      </div>
                      <div className="bg-red-100 rounded-lg p-4">
                        <div className="text-2xl font-bold text-red-600">
                          {invalidCount}
                        </div>
                        <div className="text-sm text-gray-600">Invalid</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100 sticky top-0">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Issues
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {bulkResults.map((result, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                {result.valid ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-600" />
                                )}
                              </td>
                              <td className="px-4 py-3 font-mono text-sm text-gray-900">
                                {result.email}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {result.errors.length > 0
                                  ? result.errors.join(", ")
                                  : result.warnings.length > 0
                                    ? result.warnings.join(", ")
                                    : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              ✅ Validation Checks:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Basic email format (user@domain.com)</li>
              <li>Local part length and character validation</li>
              <li>Domain format and structure</li>
              <li>Top-level domain (TLD) validation</li>
              <li>Detection of common typos in popular domains</li>
              <li>Identification of disposable email addresses</li>
              <li>Consecutive dot and special character checks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
