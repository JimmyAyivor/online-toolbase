"use client";
import React, { useState } from "react";
import { Code, Copy, RotateCcw, ArrowLeftRight } from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const ENTITY_MAP: [string, string][] = [
  ["&", "&amp;"],
  ['"', "&quot;"],
  ["'", "&apos;"],
  ["<", "&lt;"],
  [">", "&gt;"],
  [" ", "&nbsp;"],
  ["©", "&copy;"],
  ["®", "&reg;"],
  ["™", "&trade;"],
  ["€", "&euro;"],
  ["£", "&pound;"],
  ["¥", "&yen;"],
  ["—", "&mdash;"],
  ["–", "&ndash;"],
  ["…", "&hellip;"],
  ["«", "&laquo;"],
  ["»", "&raquo;"],
  ["°", "&deg;"],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function encodeEntities(text: string): string {
  return ENTITY_MAP.reduce(
    (s, [char, entity]) => s.replaceAll(char, entity),
    text,
  );
}

function decodeEntities(text: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HtmlEntityEncoderClient() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState<boolean>(false);

  const process = (): void => {
    setOutput(
      mode === "encode" ? encodeEntities(input) : decodeEntities(input),
    );
    setCopied(false);
  };

  const reset = (): void => {
    setInput("");
    setOutput("");
    setCopied(false);
  };

  const copyOutput = (): void => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapMode = (): void => {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setInput(output);
    setOutput("");
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mb-4 shadow-lg'>
              <Code className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              HTML Entity Encoder
            </h2>
            <p className='text-gray-500'>
              Encode and decode HTML entities to prevent XSS vulnerabilities
            </p>
          </div>

          <div className='space-y-6'>
            {/* Mode selector */}
            <div className='bg-gray-50 rounded-xl border border-gray-200 p-4'>
              <div className='flex items-center gap-2 mb-3'>
                <ArrowLeftRight className='w-5 h-5 text-gray-600' />
                <h3 className='font-semibold text-gray-900'>Mode</h3>
              </div>
              <div className='flex gap-3'>
                {(["encode", "decode"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setOutput("");
                    }}
                    className={`flex-1 py-2 rounded-lg font-semibold text-sm capitalize transition-colors ${
                      mode === m
                        ? "bg-indigo-600 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {m} HTML Entities
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                {mode === "encode"
                  ? "Plain Text Input"
                  : "HTML with Entities Input"}
              </label>
              <textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
                placeholder={
                  mode === "encode"
                    ? 'e.g. <h1>Hello "World" & More © 2025</h1>'
                    : "e.g. &lt;h1&gt;Hello &amp; World&lt;/h1&gt;"
                }
                className='w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm'
              />
              <div className='flex justify-between mt-2 text-sm text-gray-500'>
                <span>{input.length} characters</span>
                <span>
                  {input.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex gap-3'>
              <button
                onClick={process}
                disabled={!input.trim()}
                className='flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors'
              >
                {mode === "encode" ? "Encode Entities" : "Decode Entities"}
              </button>
              {output && (
                <button
                  onClick={swapMode}
                  className='px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
                >
                  <ArrowLeftRight className='w-4 h-4' />
                  Swap
                </button>
              )}
              <button
                onClick={reset}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
              >
                <RotateCcw className='w-4 h-4' />
                Reset
              </button>
            </div>

            {/* Output */}
            {output && (
              <div className='space-y-4'>
                <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
                  <div className='flex items-center justify-between mb-3'>
                    <h3 className='text-xl font-bold text-gray-900'>Result</h3>
                    <button
                      onClick={copyOutput}
                      className='flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors'
                    >
                      <Copy className='w-4 h-4' />
                      {copied ? "Copied!" : "Copy Result"}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={output}
                    rows={6}
                    className='w-full p-4 border border-gray-200 rounded-lg font-mono text-sm bg-white resize-none'
                  />
                  <div className='mt-2 text-sm text-gray-500'>
                    {output.length} characters
                  </div>
                </div>
              </div>
            )}

            {/* Reference table */}
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                Common HTML Entities
              </h3>
              <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
                <table className='w-full'>
                  <thead className='bg-gray-100 sticky top-0'>
                    <tr>
                      {["Character", "Entity", "Description"].map((h) => (
                        <th
                          key={h}
                          className='px-4 py-3 text-left text-sm font-semibold text-gray-700'
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {[
                      ["&", "&amp;", "Ampersand"],
                      ['"', "&quot;", "Double quote"],
                      ["'", "&apos;", "Single quote"],
                      ["<", "&lt;", "Less than"],
                      [">", "&gt;", "Greater than"],
                      ["©", "&copy;", "Copyright"],
                      ["®", "&reg;", "Registered trademark"],
                      ["™", "&trade;", "Trademark"],
                      ["€", "&euro;", "Euro sign"],
                      ["£", "&pound;", "Pound sign"],
                      ["—", "&mdash;", "Em dash"],
                      ["…", "&hellip;", "Ellipsis"],
                    ].map(([char, entity, desc]) => (
                      <tr
                        key={entity}
                        className='hover:bg-gray-50 cursor-pointer'
                        onClick={() => {
                          setInput((prev) => prev + char);
                          setOutput("");
                        }}
                      >
                        <td className='px-4 py-3 text-sm font-bold text-indigo-600'>
                          {char}
                        </td>
                        <td className='px-4 py-3 text-sm font-mono text-gray-900'>
                          {entity}
                        </td>
                        <td className='px-4 py-3 text-sm text-gray-600'>
                          {desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>💡 Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Click any row in the reference table to append that character to
                your input
              </li>
              <li>
                Always encode user-generated content before inserting it into
                HTML to prevent XSS attacks
              </li>
              <li>
                Use Swap to reverse the operation — pipe encoded output back
                through decoding
              </li>
              <li>
                &amp;nbsp; is a non-breaking space — useful when you need spaces
                that won&apos;t collapse in HTML
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
