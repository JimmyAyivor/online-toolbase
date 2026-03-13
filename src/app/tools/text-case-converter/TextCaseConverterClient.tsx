"use client";
import React, { useState } from "react";
import {
  Type,
  Copy,
  Check,
  Download,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CaseType {
  id: string;
  name: string;
  description: string;
  example: string;
  convert: (s: string) => string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MINOR_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "for",
  "nor",
  "on",
  "at",
  "to",
  "from",
  "by",
  "in",
  "of",
]);

const CASE_TYPES: CaseType[] = [
  {
    id: "sentence",
    name: "Sentence case",
    description: "First letter capitalised",
    example: "This is sentence case",
    convert: (s) =>
      s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
  },
  {
    id: "lower",
    name: "lower case",
    description: "All letters lowercase",
    example: "this is lower case",
    convert: (s) => s.toLowerCase(),
  },
  {
    id: "upper",
    name: "UPPER CASE",
    description: "All letters uppercase",
    example: "THIS IS UPPER CASE",
    convert: (s) => s.toUpperCase(),
  },
  {
    id: "capitalized",
    name: "Capitalized Case",
    description: "First letter of every word capitalised",
    example: "This Is Capitalized Case",
    convert: (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
  },
  {
    id: "title",
    name: "Title Case",
    description: "Major words capitalised",
    example: "This Is a Title Case",
    convert: (s) =>
      s
        .toLowerCase()
        .split(" ")
        .map((w, i) =>
          i === 0 || !MINOR_WORDS.has(w)
            ? w.charAt(0).toUpperCase() + w.slice(1)
            : w,
        )
        .join(" "),
  },
  {
    id: "alternating",
    name: "aLtErNaTiNg cAsE",
    description: "Alternates lower / upper per character",
    example: "tHiS iS aLtErNaTiNg",
    convert: (s) =>
      s
        .split("")
        .map((ch, i) => (i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()))
        .join(""),
  },
  {
    id: "inverse",
    name: "iNVERSE cASE",
    description: "Flips uppercase ↔ lowercase",
    example: "tHIS iS iNVERSE cASE",
    convert: (s) =>
      s
        .split("")
        .map((ch) =>
          ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase(),
        )
        .join(""),
  },
  {
    id: "camel",
    name: "camelCase",
    description: "First word lowercase, rest joined",
    example: "thisIsCamelCase",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
        .replace(/^[A-Z]/, (c) => c.toLowerCase()),
  },
  {
    id: "pascal",
    name: "PascalCase",
    description: "All words capitalised, no spaces",
    example: "ThisIsPascalCase",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
        .replace(/^[a-z]/, (c) => c.toUpperCase()),
  },
  {
    id: "snake",
    name: "snake_case",
    description: "Words joined with underscores",
    example: "this_is_snake_case",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, ""),
  },
  {
    id: "kebab",
    name: "kebab-case",
    description: "Words joined with hyphens",
    example: "this-is-kebab-case",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
  },
  {
    id: "dot",
    name: "dot.case",
    description: "Words joined with dots",
    example: "this.is.dot.case",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/\s+/g, ".")
        .replace(/[^a-z0-9.]/g, ""),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TextCaseConverterClient() {
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState<string>("");

  const handleConvert = (converter: (s: string) => string): void => {
    if (text) setText(converter(text));
  };

  const handleCopy = (val: string, id: string): void => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleDownload = (): void => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const lines = text.split("\n").length;

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-pink-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg'>
              <Type className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Text Case Converter
            </h2>
            <p className='text-gray-500'>
              Transform your text into any of 12 case formats instantly
            </p>
          </div>

          {/* Input + stats + quick actions */}
          <div className='grid lg:grid-cols-3 gap-6 mb-6'>
            {/* Textarea + stats */}
            <div className='lg:col-span-2 space-y-4'>
              <div className='flex justify-between items-center'>
                <label className='text-sm font-semibold text-gray-700'>
                  Enter your text
                </label>
                <div className='flex gap-2'>
                  <button
                    onClick={handleDownload}
                    disabled={!text}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${text ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  >
                    <Download className='w-3.5 h-3.5' />
                    Download
                  </button>
                  <button
                    onClick={() => {
                      setText("");
                      setCopied("");
                    }}
                    disabled={!text}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${text ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  >
                    <RotateCcw className='w-3.5 h-3.5' />
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                placeholder='Type or paste your text here…'
                rows={9}
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none'
              />
              <div className='grid grid-cols-3 gap-3'>
                {[
                  {
                    label: "Characters",
                    value: chars,
                    color: "text-purple-700",
                    bg: "bg-purple-50 border-purple-100",
                  },
                  {
                    label: "Words",
                    value: words,
                    color: "text-violet-700",
                    bg: "bg-violet-50 border-violet-100",
                  },
                  {
                    label: "Lines",
                    value: lines,
                    color: "text-pink-700",
                    bg: "bg-pink-50 border-pink-100",
                  },
                ].map(({ label, value, color, bg }) => (
                  <div
                    key={label}
                    className={`rounded-xl border p-3 text-center ${bg}`}
                  >
                    <p className={`text-2xl font-black ${color}`}>{value}</p>
                    <p className='text-xs text-gray-500 mt-0.5'>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <p className='text-sm font-semibold text-gray-700 mb-3'>
                Quick convert
              </p>
              <div className='space-y-2'>
                {CASE_TYPES.slice(0, 6).map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => handleConvert(ct.convert)}
                    disabled={!text}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${text ? "bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200 hover:border-purple-400 hover:-translate-y-0.5" : "bg-gray-50 border-gray-100 cursor-not-allowed"}`}
                  >
                    <p className='font-semibold text-gray-900 text-sm'>
                      {ct.name}
                    </p>
                    <p className='text-xs text-gray-500 mt-0.5'>
                      {ct.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* All conversions grid */}
          <div>
            <p className='text-sm font-bold text-gray-500 uppercase tracking-widest mb-4'>
              All 12 formats
            </p>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {CASE_TYPES.map((ct) => {
                const converted = text ? ct.convert(text) : ct.example;
                const isCopied = copied === ct.id;
                return (
                  <div
                    key={ct.id}
                    className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow border border-gray-100'
                  >
                    <div className='flex justify-between items-start mb-3'>
                      <div>
                        <p className='font-bold text-gray-900 text-sm'>
                          {ct.name}
                        </p>
                        <p className='text-xs text-gray-500 mt-0.5'>
                          {ct.description}
                        </p>
                      </div>
                      {text && (
                        <button
                          onClick={() => handleCopy(converted, ct.id)}
                          aria-label={`Copy ${ct.name}`}
                          className='p-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors shrink-0'
                        >
                          {isCopied ? (
                            <Check className='w-4 h-4 text-green-600' />
                          ) : (
                            <Copy className='w-4 h-4 text-purple-600' />
                          )}
                        </button>
                      )}
                    </div>
                    <div className='bg-white rounded-xl p-3 border-2 border-gray-200 min-h-[52px] flex items-center mb-3'>
                      <p className='text-sm text-gray-700 break-all line-clamp-2'>
                        {converted}
                      </p>
                    </div>
                    {text && (
                      <button
                        onClick={() => handleConvert(ct.convert)}
                        className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5'
                      >
                        Apply to input <ArrowRight className='w-4 h-4' />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div className='mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Case format guide:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Use <strong>camelCase</strong> and <strong>PascalCase</strong>{" "}
                for JavaScript/TypeScript variable and class names
              </li>
              <li>
                Use <strong>snake_case</strong> for Python variables, database
                columns, and file names
              </li>
              <li>
                Use <strong>kebab-case</strong> for URLs, CSS classes, and HTML
                attributes
              </li>
              <li>
                Use <strong>Title Case</strong> for article headlines, book
                titles, and page headings
              </li>
              <li>
                Use <strong>UPPER CASE</strong> for constants, environment
                variables, and SQL keywords
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
