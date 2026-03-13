"use client";
import React, { useState, useEffect } from "react";
import { Search, CheckCircle, AlertCircle, Copy, BookOpen } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FlagKey = "g" | "i" | "m" | "s" | "u";
type Flags = Record<FlagKey, boolean>;

interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

interface CommonPattern {
  name: string;
  pattern: string;
  test: string;
}

interface FlagInfo {
  key: FlagKey;
  desc: string;
}

interface QuickRef {
  token: string;
  desc: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FLAG_INFOS: FlagInfo[] = [
  { key: "g", desc: "global (all matches)" },
  { key: "i", desc: "case insensitive" },
  { key: "m", desc: "multiline" },
  { key: "s", desc: "dotAll" },
  { key: "u", desc: "unicode" },
];

const DEFAULT_FLAGS: Flags = {
  g: true,
  i: false,
  m: false,
  s: false,
  u: false,
};

const COMMON_PATTERNS: CommonPattern[] = [
  {
    name: "Email",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    test: "user@example.com",
  },
  {
    name: "URL",
    pattern:
      "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
    test: "https://example.com",
  },
  {
    name: "Phone (US)",
    pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}",
    test: "(123) 456-7890",
  },
  {
    name: "IP Address",
    pattern:
      "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    test: "192.168.1.1",
  },
  {
    name: "Date (MM/DD/YYYY)",
    pattern: "(0[1-9]|1[0-2])\\/(0[1-9]|[12][0-9]|3[01])\\/\\d{4}",
    test: "12/31/2024",
  },
  {
    name: "Hex Color",
    pattern: "#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})",
    test: "#FF5733",
  },
  { name: "Username", pattern: "^[a-zA-Z0-9_-]{3,16}$", test: "user_name123" },
  {
    name: "Password (Strong)",
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    test: "Pass123!",
  },
];

const QUICK_REFS: QuickRef[] = [
  { token: ".", desc: "Any character" },
  { token: "\\d", desc: "Digit (0-9)" },
  { token: "\\w", desc: "Word character" },
  { token: "\\s", desc: "Whitespace" },
  { token: "*", desc: "0 or more" },
  { token: "+", desc: "1 or more" },
  { token: "?", desc: "0 or 1" },
  { token: "^", desc: "Start of string" },
  { token: "$", desc: "End of string" },
  { token: "[abc]", desc: "Character class" },
  { token: "(x)", desc: "Capture group" },
  { token: "x|y", desc: "Alternation" },
];

const MARK_START = "___MARK_START___";
const MARK_END = "___MARK_END___";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildFlagString(flags: Flags): string {
  return (Object.entries(flags) as [FlagKey, boolean][])
    .filter(([, enabled]) => enabled)
    .map(([flag]) => flag)
    .join("");
}

function execMatches(
  regex: RegExp,
  input: string,
  isGlobal: boolean,
): RegexMatch[] {
  const results: RegexMatch[] = [];
  if (isGlobal) {
    let m: RegExpExecArray | null;
    while ((m = regex.exec(input)) !== null) {
      results.push({
        match: m[0],
        index: m.index,
        groups: Array.from(m)
          .slice(1)
          .map((g) => g ?? ""),
      });
    }
  } else {
    const m = regex.exec(input);
    if (m) {
      results.push({
        match: m[0],
        index: m.index,
        groups: Array.from(m)
          .slice(1)
          .map((g) => g ?? ""),
      });
    }
  }
  return results;
}

function buildHighlighted(input: string, matchList: RegexMatch[]): string {
  let out = input;
  let offset = 0;
  for (const m of matchList) {
    const start = m.index + offset;
    const end = start + m.match.length;
    out =
      out.slice(0, start) +
      MARK_START +
      out.slice(start, end) +
      MARK_END +
      out.slice(end);
    offset += MARK_START.length + MARK_END.length;
  }
  return out;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState<string>("");
  const [testString, setTestString] = useState<string>("");
  const [flags, setFlags] = useState<Flags>(DEFAULT_FLAGS);
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [error, setError] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError("");
      setHighlightedText(testString);
      return;
    }
    try {
      const flagStr = buildFlagString(flags);
      const regex = new RegExp(pattern, flagStr);
      const matchList = execMatches(regex, testString, flags.g);
      setMatches(matchList);
      setError("");
      setHighlightedText(
        matchList.length > 0
          ? buildHighlighted(testString, matchList)
          : testString,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setMatches([]);
      setHighlightedText(testString);
    }
  }, [pattern, testString, flags]);

  const toggleFlag = (flag: FlagKey): void => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const loadExample = (ex: CommonPattern): void => {
    setPattern(ex.pattern);
    setTestString(ex.test);
  };

  const copyPattern = (): void => {
    navigator.clipboard.writeText(pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedText = (): React.ReactNode[] => {
    const parts = highlightedText.split(
      new RegExp(`${MARK_START}|${MARK_END}`),
    );
    return parts.map((part, idx) =>
      idx % 2 === 1 ? (
        <mark key={idx} className='bg-yellow-300 font-semibold'>
          {part}
        </mark>
      ) : (
        <span key={idx}>{part}</span>
      ),
    );
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full mb-4 shadow-lg'>
              <Search className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Regex Tester
            </h2>
            <p className='text-gray-600'>
              Test regular expressions with live matches
            </p>
          </div>

          <div className='space-y-6'>
            {/* Pattern input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Regular Expression Pattern
              </label>
              <div className='flex gap-2'>
                <div className='flex-1 flex items-center border-2 border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-rose-500 focus-within:border-transparent'>
                  <span className='px-3 text-gray-500 font-mono'>/</span>
                  <input
                    type='text'
                    value={pattern}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPattern(e.target.value)
                    }
                    placeholder='Enter regex pattern...'
                    className='flex-1 px-2 py-3 outline-none font-mono text-sm'
                  />
                  <span className='px-3 text-gray-500 font-mono'>/</span>
                  <div className='flex gap-1 px-2'>
                    {FLAG_INFOS.map(({ key }) => (
                      <button
                        key={key}
                        onClick={() => toggleFlag(key)}
                        aria-label={`Toggle flag ${key}`}
                        className={`w-6 h-6 rounded text-xs font-mono font-semibold transition-colors ${
                          flags[key]
                            ? "bg-rose-600 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={copyPattern}
                  disabled={!pattern}
                  className='px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2'
                >
                  {copied ? (
                    <>
                      <CheckCircle className='w-4 h-4' /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className='w-4 h-4' /> Copy
                    </>
                  )}
                </button>
              </div>

              <div className='mt-2 text-xs text-gray-600'>
                <div className='flex flex-wrap gap-x-4 gap-y-1'>
                  {FLAG_INFOS.map(({ key, desc }) => (
                    <span key={key}>
                      <strong>{key}</strong> – {desc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className='flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg'>
                <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0 mt-0.5' />
                <div>
                  <div className='font-semibold text-red-800'>
                    Invalid Regular Expression
                  </div>
                  <div className='text-sm text-red-700'>{error}</div>
                </div>
              </div>
            )}

            {/* Test string */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Test String
              </label>
              <textarea
                value={testString}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setTestString(e.target.value)
                }
                placeholder='Enter text to test against the pattern...'
                className='w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none'
              />
            </div>

            {/* Results */}
            {pattern && testString && (
              <div className='bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-semibold text-gray-900'>Results</h3>
                  {matches.length > 0 ? (
                    <div className='flex items-center gap-2 text-green-700'>
                      <CheckCircle className='w-5 h-5' />
                      <span className='font-semibold'>
                        {matches.length} match{matches.length !== 1 ? "es" : ""}
                      </span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2 text-gray-600'>
                      <AlertCircle className='w-5 h-5' />
                      <span className='font-semibold'>No matches</span>
                    </div>
                  )}
                </div>

                {/* Highlighted text */}
                <div className='bg-white rounded-lg p-4 mb-4'>
                  <div className='text-sm font-medium text-gray-700 mb-2'>
                    Highlighted Text
                  </div>
                  <div className='font-mono text-sm whitespace-pre-wrap break-all'>
                    {renderHighlightedText()}
                  </div>
                </div>

                {/* Match details */}
                {matches.length > 0 && (
                  <div>
                    <div className='text-sm font-medium text-gray-700 mb-2'>
                      Match Details
                    </div>
                    <div className='space-y-2'>
                      {matches.map((m, idx) => (
                        <div key={idx} className='bg-white rounded-lg p-4'>
                          <div className='flex items-start justify-between mb-2'>
                            <span className='font-semibold text-gray-900'>
                              Match {idx + 1}
                            </span>
                            <span className='text-sm text-gray-600'>
                              Position: {m.index}
                            </span>
                          </div>
                          <div className='font-mono text-sm bg-yellow-100 px-3 py-2 rounded border border-yellow-300 mb-2'>
                            {m.match}
                          </div>
                          {m.groups.length > 0 && (
                            <div className='mt-2'>
                              <div className='text-xs font-medium text-gray-700 mb-1'>
                                Capture Groups:
                              </div>
                              {m.groups.map((group, gIdx) => (
                                <div
                                  key={gIdx}
                                  className='text-xs font-mono bg-gray-100 px-2 py-1 rounded inline-block mr-2 mb-1'
                                >
                                  Group {gIdx + 1}: {group || "(empty)"}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Common patterns */}
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <BookOpen className='w-5 h-5 text-gray-600' />
                <h3 className='font-semibold text-gray-900'>Common Patterns</h3>
              </div>
              <div className='grid md:grid-cols-2 gap-3'>
                {COMMON_PATTERNS.map((ex) => (
                  <button
                    key={ex.name}
                    onClick={() => loadExample(ex)}
                    className='bg-white border border-gray-200 rounded-lg p-3 hover:border-rose-300 hover:bg-rose-50 transition-colors text-left'
                  >
                    <div className='font-semibold text-gray-900 mb-1'>
                      {ex.name}
                    </div>
                    <div className='font-mono text-xs text-gray-600 truncate'>
                      {ex.pattern}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick reference */}
          <div className='mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              ⚡ Quick Reference:
            </p>
            <div className='grid md:grid-cols-2 gap-2'>
              {QUICK_REFS.map(({ token, desc }) => (
                <div key={token}>
                  <code className='bg-white px-1 rounded'>{token}</code> –{" "}
                  {desc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
