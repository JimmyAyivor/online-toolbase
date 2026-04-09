"use client";
import React, { useState, useCallback } from "react";
import {
  FileJson,
  Download,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

interface ConversionResult {
  csv: string;
  rows: number;
  columns: number;
  error: string;
}

function jsonToCsv(jsonStr: string, delimiter: string): ConversionResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr.trim());
  } catch {
    return {
      csv: "",
      rows: 0,
      columns: 0,
      error: "Invalid JSON — please check your syntax and try again.",
    };
  }

  let arr: Record<string, unknown>[];

  if (Array.isArray(parsed)) {
    if (parsed.length === 0)
      return { csv: "", rows: 0, columns: 0, error: "JSON array is empty." };
    if (typeof parsed[0] !== "object" || parsed[0] === null) {
      // flat array of primitives
      arr = parsed.map((v, i) => ({ index: i, value: v }));
    } else {
      arr = parsed as Record<string, unknown>[];
    }
  } else if (typeof parsed === "object" && parsed !== null) {
    arr = [parsed as Record<string, unknown>];
  } else {
    return {
      csv: "",
      rows: 0,
      columns: 0,
      error: "Input must be a JSON array or object.",
    };
  }

  // Collect all keys
  const keys = Array.from(new Set(arr.flatMap((row) => Object.keys(row))));

  const escapeCell = (val: unknown): string => {
    const str =
      val === null || val === undefined
        ? ""
        : typeof val === "object"
          ? JSON.stringify(val)
          : String(val);
    if (str.includes(delimiter) || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const header = keys.map(escapeCell).join(delimiter);
  const rows = arr.map((row) =>
    keys.map((k) => escapeCell(row[k])).join(delimiter),
  );
  const csv = [header, ...rows].join("\n");

  return { csv, rows: arr.length, columns: keys.length, error: "" };
}

const SAMPLE_JSON = `[
  { "id": 1, "name": "Alice", "role": "Engineer", "city": "London" },
  { "id": 2, "name": "Bob", "role": "Designer", "city": "Paris" },
  { "id": 3, "name": "Carol", "role": "Manager", "city": "Berlin" }
]`;

export default function JsonToCsvConverterClient() {
  const [input, setInput] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>(",");
  const [copied, setCopied] = useState<boolean>(false);

  const result: ConversionResult = input.trim()
    ? jsonToCsv(input, delimiter)
    : { csv: "", rows: 0, columns: 0, error: "" };

  const handleCopy = useCallback(async () => {
    if (!result.csv) return;
    await navigator.clipboard.writeText(result.csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result.csv]);

  const handleDownload = () => {
    if (!result.csv) return;
    const blob = new Blob([result.csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <FileJson className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              JSON to CSV Converter
            </h2>
            <p className="text-gray-600">
              Convert JSON arrays to CSV — download as a file or copy to
              clipboard
            </p>
          </div>

          {/* Options row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Delimiter:
              </label>
              <div className="flex gap-2">
                {[
                  { label: "Comma  ,", val: "," },
                  { label: "Semicolon  ;", val: ";" },
                  { label: "Tab  ⇥", val: "\t" },
                  { label: "Pipe  |", val: "|" },
                ].map(({ label, val }) => (
                  <button
                    key={val}
                    onClick={() => setDelimiter(val)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-colors ${delimiter === val ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setInput(SAMPLE_JSON)}
              className="ml-auto px-4 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 rounded-lg text-sm font-medium transition-colors border border-gray-200"
            >
              Load sample
            </button>
          </div>

          {/* Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JSON input
            </label>
            <textarea
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
              placeholder={
                '[\n  { "id": 1, "name": "Alice", "city": "London" },\n  { "id": 2, "name": "Bob",   "city": "Paris"  }\n]'
              }
              rows={10}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
            />
          </div>

          {/* Error */}
          {result.error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {result.error}
            </div>
          )}

          {/* Output */}
          {result.csv && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Rows", value: result.rows.toLocaleString() },
                  { label: "Columns", value: result.columns.toLocaleString() },
                  {
                    label: "CSV size",
                    value: `${new TextEncoder().encode(result.csv).length} B`,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center"
                  >
                    <div className="text-2xl font-bold text-indigo-700">
                      {value}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* CSV output */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    CSV output
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download .csv
                    </button>
                  </div>
                </div>
                <div className="w-full max-h-64 overflow-auto border-2 border-gray-200 bg-gray-50 rounded-lg px-4 py-3 font-mono text-sm text-gray-800 whitespace-pre">
                  {result.csv}
                </div>
              </div>
            </>
          )}

          {/* Reset */}
          <button
            onClick={() => setInput("")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          {/* Tips */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">
              Understanding JSON to CSV conversion:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Input must be a JSON array of objects — each object becomes one
                CSV row
              </li>
              <li>All unique keys across all objects become column headers</li>
              <li>
                Nested objects or arrays are serialised as JSON strings inside
                the cell
              </li>
              <li>
                Values containing the delimiter or quotes are automatically
                escaped with double-quote wrapping
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
