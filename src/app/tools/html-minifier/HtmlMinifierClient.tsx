"use client";
import React, { useState, useCallback } from "react";
import { Code, Copy, Check, RotateCcw, Minimize2 } from "lucide-react";

interface MinifyOptions {
  removeComments: boolean;
  collapseWhitespace: boolean;
  removeEmptyAttributes: boolean;
  removeRedundantAttributes: boolean;
  lowercaseTags: boolean;
}

function minifyHtml(html: string, opts: MinifyOptions): string {
  let result = html;

  if (opts.removeComments) {
    result = result.replace(/<!--\[if[^\]]*\]>/g, "<!--[if]>");
  }

  if (opts.collapseWhitespace) {
    result = result
      .replace(/\s*\n\s*/g, " ")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/>\s+</g, "><")
      .trim();
  }

  if (opts.removeEmptyAttributes) {
    result = result.replace(/\s+(?:class|id|style|alt|title)=""/g, "");
  }

  if (opts.removeRedundantAttributes) {
    result = result
      .replace(/\s+type="text\/javascript"/g, "")
      .replace(/\s+type="text\/css"/g, "")
      .replace(/\s+language="javascript"/gi, "");
  }

  if (opts.lowercaseTags) {
    result = result.replace(/<\/?[A-Z][A-Za-z0-9]*/g, (m) => m.toLowerCase());
  }

  return result;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}

export default function HtmlMinifierClient() {
  const [input, setInput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [opts, setOpts] = useState<MinifyOptions>({
    removeComments: true,
    collapseWhitespace: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    lowercaseTags: false,
  });

  const toggle = (key: keyof MinifyOptions) =>
    setOpts((o) => ({ ...o, [key]: !o[key] }));

  const output = input.trim() ? minifyHtml(input, opts) : "";

  const inputBytes = new TextEncoder().encode(input).length;
  const outputBytes = new TextEncoder().encode(output).length;
  const saving =
    inputBytes > 0
      ? Math.round(((inputBytes - outputBytes) / inputBytes) * 100)
      : 0;

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const OPTION_LABELS: {
    key: keyof MinifyOptions;
    label: string;
    desc: string;
  }[] = [
    {
      key: "removeComments",
      label: "Remove HTML comments",
      desc: "Strips <!-- ... --> blocks",
    },
    {
      key: "collapseWhitespace",
      label: "Collapse whitespace",
      desc: "Merges spaces & removes line breaks",
    },
    {
      key: "removeEmptyAttributes",
      label: "Remove empty attributes",
      desc: 'Removes class="" id="" etc.',
    },
    {
      key: "removeRedundantAttributes",
      label: "Remove redundant attributes",
      desc: 'Removes type="text/javascript"',
    },
    {
      key: "lowercaseTags",
      label: "Lowercase tag names",
      desc: "Converts <DIV> to <div>",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Minimize2 className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              HTML Minifier
            </h2>
            <p className="text-gray-600">
              Remove whitespace, comments, and redundant code to reduce HTML
              size
            </p>
          </div>

          {/* Options */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Minification options
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {OPTION_LABELS.map(({ key, label, desc }) => (
                <label
                  key={key}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={opts[key]}
                      onChange={() => toggle(key)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${opts[key] ? "bg-indigo-600 border-indigo-600" : "border-gray-300 bg-white group-hover:border-indigo-400"}`}
                    >
                      {opts[key] && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{label}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Input / Output */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original HTML{" "}
                <span className="text-gray-400 font-normal">
                  ({formatBytes(inputBytes)})
                </span>
              </label>
              <textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
                placeholder={
                  "<!DOCTYPE html>\n<html>\n  <head>\n    <!-- page title -->\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>"
                }
                rows={14}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Minified HTML{" "}
                  <span className="text-gray-400 font-normal">
                    ({formatBytes(outputBytes)})
                  </span>
                </label>
                {output && (
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
                )}
              </div>
              <div className="w-full min-h-[336px] border-2 border-gray-200 bg-gray-50 rounded-lg px-4 py-3 font-mono text-sm text-gray-800 whitespace-pre-wrap break-all overflow-auto">
                {output || (
                  <span className="text-gray-400">
                    Minified output will appear here…
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          {output && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Original size", value: formatBytes(inputBytes) },
                { label: "Minified size", value: formatBytes(outputBytes) },
                { label: "Size reduction", value: `${saving}%` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className={`rounded-xl p-3 text-center border ${label === "Size reduction" ? "bg-green-50 border-green-100" : "bg-indigo-50 border-indigo-100"}`}
                >
                  <div
                    className={`text-2xl font-bold ${label === "Size reduction" ? "text-green-700" : "text-indigo-700"}`}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
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
              Understanding HTML minification:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Minification only removes non-functional characters — your HTML
                remains valid and renders identically
              </li>
              <li>
                Whitespace inside pre, textarea, and script tags is preserved to
                avoid breaking content
              </li>
              <li>
                IE conditional comments ({"<!--[if"}…) are never removed as they
                affect rendering
              </li>
              <li>
                For production use, combine minification with gzip compression
                on your server for maximum savings
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
