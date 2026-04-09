"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  Minimize2,
  Maximize2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface JsonStats {
  size: number;
  depth: number;
  properties: number;
  type: string;
}

// ─── Helpers (module-level, pure) ────────────────────────────────────────────

function calculateDepth(value: unknown, depth = 1): number {
  if (typeof value !== "object" || value === null) return depth;
  const values = Object.values(value as Record<string, unknown>);
  if (values.length === 0) return depth;
  return Math.max(...values.map((v) => calculateDepth(v, depth + 1)));
}

function countProperties(value: unknown): number {
  if (typeof value !== "object" || value === null) return 0;
  const obj = value as Record<string, unknown>;
  let count = Object.keys(obj).length;
  Object.values(obj).forEach((v) => {
    count += countProperties(v);
  });
  return count;
}

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (typeof value === "object" && value !== null) {
    return Object.keys(value as object)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortObject((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

const SAMPLE_JSON = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
  address: {
    street: "123 Main St",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
  },
  phoneNumbers: [
    { type: "home", number: "555-1234" },
    { type: "mobile", number: "555-5678" },
  ],
  isActive: true,
  balance: 1250.5,
  tags: ["customer", "premium", "verified"],
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function JsonFormatterValidatorClient() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [sortKeys, setSortKeys] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [stats, setStats] = useState<JsonStats | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      setIsValid(false);
      setStats(null);
      return;
    }

    try {
      const parsed = JSON.parse(input) as unknown;
      setIsValid(true);
      setError("");

      const jsonString = JSON.stringify(parsed);
      setStats({
        size: jsonString.length,
        depth: calculateDepth(parsed),
        properties: countProperties(parsed),
        type: Array.isArray(parsed) ? "Array" : typeof parsed,
      });

      const formatted =
        sortKeys && typeof parsed === "object" && parsed !== null
          ? sortObject(parsed)
          : parsed;

      setOutput(JSON.stringify(formatted, null, indentSize));
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
      setStats(null);
    }
  }, [input, indentSize, sortKeys]);

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = (): void => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const minify = (): void => {
    if (!isValid) return;
    try {
      setInput(JSON.stringify(JSON.parse(input) as unknown));
    } catch {
      /* already invalid */
    }
  };

  const beautify = (): void => {
    if (isValid && output) setInput(output);
  };

  const loadSample = (): void => {
    setInput(JSON.stringify(SAMPLE_JSON, null, 2));
  };

  const STAT_CARDS: Array<{ label: string; value: string | number }> = stats
    ? [
        { label: "Type", value: stats.type },
        { label: "Size", value: `${stats.size} chars` },
        { label: "Depth", value: stats.depth },
        { label: "Properties", value: stats.properties },
      ]
    : [];

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              JSON Formatter &amp; Validator
            </h2>
            <p className="text-gray-500">
              Format, validate, and minify JSON data
            </p>
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={loadSample}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors text-sm"
              >
                Load Sample
              </button>
              <button
                onClick={minify}
                disabled={!isValid}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
              >
                <Minimize2 className="w-4 h-4" /> Minify
              </button>
              <button
                onClick={beautify}
                disabled={!isValid}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
              >
                <Maximize2 className="w-4 h-4" /> Beautify
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                disabled={!isValid}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy
                  </>
                )}
              </button>
              <button
                onClick={downloadJson}
                disabled={!isValid}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>

          {/* Formatting options */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">
              Formatting Options
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indentation: {indentSize} spaces
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="2"
                  value={indentSize}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setIndentSize(Number(e.target.value))
                  }
                  className="w-full"
                  aria-label="Indentation size"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  {[2, 4, 6, 8].map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sortKeys"
                  checked={sortKeys}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSortKeys(e.target.checked)
                  }
                  className="w-4 h-4 text-cyan-600 rounded focus:ring-2 focus:ring-cyan-500"
                />
                <label htmlFor="sortKeys" className="text-sm text-gray-700">
                  Sort keys alphabetically
                </label>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-red-800">Invalid JSON</div>
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          {/* Stats */}
          {isValid && stats && (
            <div className="mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Valid JSON</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STAT_CARDS.map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-lg p-3">
                    <div className="text-sm text-gray-600">{label}</div>
                    <div className="text-lg font-bold text-gray-900">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Editor panes */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input JSON
              </label>
              <textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
                placeholder='{"key": "value"}'
                className="w-full h-96 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formatted Output
              </label>
              <div className="relative">
                <textarea
                  value={output}
                  readOnly
                  placeholder="Formatted JSON will appear here..."
                  className="w-full h-96 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
                />
                {isValid && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">⚡ Features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Real-time JSON validation with detailed error messages</li>
              <li>Automatic formatting with customizable indentation</li>
              <li>Minify to remove whitespace and reduce size</li>
              <li>Sort object keys alphabetically for consistency</li>
              <li>View JSON statistics including depth and property count</li>
              <li>Copy formatted JSON or download as file</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
