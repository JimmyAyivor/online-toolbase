"use client";
import React, { useState, useEffect } from "react";
import { Link, Copy, CheckCircle, ArrowLeftRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Mode = "encode" | "decode";
type EncodeType = "component" | "full";

interface ParsedUrl {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
}

interface CommonExample {
  name: string;
  original: string;
  encoded: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const COMMON_EXAMPLES: CommonExample[] = [
  { name: "Space", original: " ", encoded: "%20" },
  { name: "Question Mark", original: "?", encoded: "%3F" },
  { name: "Ampersand", original: "&", encoded: "%26" },
  { name: "Equals", original: "=", encoded: "%3D" },
  { name: "Forward Slash", original: "/", encoded: "%2F" },
  { name: "Colon", original: ":", encoded: "%3A" },
  { name: "Pound/Hash", original: "#", encoded: "%23" },
  { name: "Plus", original: "+", encoded: "%2B" },
];

const ENCODE_EXAMPLE =
  "https://example.com/search?q=hello world&category=news&sort=date";
const DECODE_EXAMPLE =
  "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26category%3Dnews%26sort%3Ddate";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function encodeInput(text: string, encodeType: EncodeType): string {
  return encodeType === "component"
    ? encodeURIComponent(text)
    : encodeURI(text);
}

function decodeInput(text: string): string {
  return decodeURIComponent(text.replace(/\+/g, " "));
}

function tryParseUrl(raw: string): ParsedUrl | null {
  try {
    const url = new URL(raw);
    const params: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      params,
    };
  } catch {
    return null;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function UrlEncoderDecoderClient() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [encodeType, setEncodeType] = useState<EncodeType>("component");
  const [parsedUrl, setParsedUrl] = useState<ParsedUrl | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setParsedUrl(null);
      return;
    }
    try {
      const result =
        mode === "encode" ? encodeInput(input, encodeType) : decodeInput(input);

      setOutput(result);

      // Try URL parsing
      const urlCandidate = mode === "encode" ? input : result;
      if (mode === "decode" || input.startsWith("http")) {
        setParsedUrl(tryParseUrl(urlCandidate));
      } else {
        setParsedUrl(null);
      }
    } catch {
      setOutput(`Error: Invalid input for ${mode}ing`);
      setParsedUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mode, encodeType]);

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = (): void => {
    setInput(output);
    setMode((m) => (m === "encode" ? "decode" : "encode"));
  };

  const loadExample = (): void => {
    setInput(mode === "encode" ? ENCODE_EXAMPLE : DECODE_EXAMPLE);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full mb-4 shadow-lg'>
              <Link className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              URL Encoder/Decoder
            </h2>
            <p className='text-gray-600'>
              Encode and decode URL strings safely
            </p>
          </div>

          {/* Mode + actions */}
          <div className='mb-6 flex flex-wrap gap-3 items-center justify-between'>
            <div className='flex gap-2'>
              {(["encode", "decode"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    mode === m
                      ? "bg-sky-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={loadExample}
              className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors'
            >
              Load Example
            </button>
          </div>

          {/* Encode type selector */}
          {mode === "encode" && (
            <div className='mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <h3 className='font-semibold text-gray-700 mb-3'>
                Encoding Type
              </h3>
              <div className='flex gap-4'>
                {(
                  [
                    {
                      value: "component",
                      label: "Component (Recommended)",
                      desc: "Encodes all special characters",
                    },
                    {
                      value: "full",
                      label: "Full URL",
                      desc: "Preserves URL structure",
                    },
                  ] as { value: EncodeType; label: string; desc: string }[]
                ).map(({ value, label, desc }) => (
                  <label
                    key={value}
                    className='flex items-center gap-2 cursor-pointer'
                  >
                    <input
                      type='radio'
                      name='encodeType'
                      value={value}
                      checked={encodeType === value}
                      onChange={() => setEncodeType(value)}
                      className='w-4 h-4 text-sky-600'
                    />
                    <div>
                      <div className='font-medium text-gray-900'>{label}</div>
                      <div className='text-sm text-gray-600'>{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* I/O textareas */}
          <div className='grid md:grid-cols-2 gap-6 mb-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Input ({mode === "encode" ? "Plain URL" : "Encoded URL"})
              </label>
              <textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
                placeholder={
                  mode === "encode"
                    ? "Enter URL or text to encode..."
                    : "Enter encoded URL to decode..."
                }
                className='w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none font-mono text-sm'
              />
              <div className='mt-2 text-sm text-gray-500'>
                {input.length} characters
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between mb-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Output ({mode === "encode" ? "Encoded URL" : "Plain URL"})
                </label>
                <button
                  onClick={copyToClipboard}
                  disabled={!output}
                  className='px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white text-xs rounded font-medium transition-colors flex items-center gap-1'
                >
                  {copied ? (
                    <>
                      <CheckCircle className='w-3 h-3' /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className='w-3 h-3' /> Copy
                    </>
                  )}
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder='Output will appear here...'
                className='w-full h-48 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm'
              />
              <div className='mt-2 text-sm text-gray-500'>
                {output.length} characters
              </div>
            </div>
          </div>

          {/* Swap */}
          <div className='flex justify-center mb-6'>
            <button
              onClick={swap}
              disabled={!output}
              className='px-6 py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg font-semibold transition-colors flex items-center gap-2'
            >
              <ArrowLeftRight className='w-5 h-5' />
              Swap &amp; {mode === "encode" ? "Decode" : "Encode"}
            </button>
          </div>

          {/* URL parser */}
          {parsedUrl && (
            <div className='mb-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-200'>
              <h3 className='font-semibold text-gray-900 mb-4'>URL Parser</h3>
              <div className='space-y-3'>
                {[
                  { label: "Protocol", value: parsedUrl.protocol, show: true },
                  {
                    label: "Hostname",
                    value: parsedUrl.hostname,
                    show: !!parsedUrl.hostname,
                  },
                  {
                    label: "Port",
                    value: parsedUrl.port,
                    show: !!parsedUrl.port,
                  },
                  {
                    label: "Path",
                    value: parsedUrl.pathname,
                    show: !!parsedUrl.pathname && parsedUrl.pathname !== "/",
                  },
                  {
                    label: "Hash",
                    value: parsedUrl.hash,
                    show: !!parsedUrl.hash,
                  },
                ]
                  .filter(({ show }) => show)
                  .map(({ label, value }) => (
                    <div key={label} className='bg-white rounded-lg p-3'>
                      <div className='text-sm text-gray-500 mb-1'>{label}</div>
                      <div className='font-mono text-gray-900'>{value}</div>
                    </div>
                  ))}

                {Object.keys(parsedUrl.params).length > 0 && (
                  <div className='bg-white rounded-lg p-3'>
                    <div className='text-sm text-gray-500 mb-2'>
                      Query Parameters
                    </div>
                    <div className='space-y-2'>
                      {Object.entries(parsedUrl.params).map(([key, value]) => (
                        <div
                          key={key}
                          className='flex items-start gap-2 text-sm'
                        >
                          <span className='font-semibold text-sky-700'>
                            {key}:
                          </span>
                          <span className='font-mono text-gray-900'>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reference table */}
          <div className='mb-6'>
            <h3 className='font-semibold text-gray-900 mb-3'>
              Common URL Encodings
            </h3>
            <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
              <table className='w-full'>
                <thead className='bg-gray-100'>
                  <tr>
                    {["Character", "Original", "Encoded"].map((h) => (
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
                  {COMMON_EXAMPLES.map(({ name, original, encoded }) => (
                    <tr key={name} className='hover:bg-gray-50'>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        {name}
                      </td>
                      <td className='px-4 py-3 text-sm font-mono text-gray-900'>
                        {original}
                      </td>
                      <td className='px-4 py-3 text-sm font-mono text-sky-600'>
                        {encoded}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2'>About URL Encoding:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                <strong>Component Encoding (encodeURIComponent):</strong>{" "}
                Encodes all special characters including ?, &amp;, =, etc. Use
                for query parameters and form data.
              </li>
              <li>
                <strong>Full URL Encoding (encodeURI):</strong> Preserves URL
                structure like :, /, ?, #. Use for complete URLs.
              </li>
              <li>
                URL encoding is essential for passing data safely through URLs
              </li>
              <li>Spaces are encoded as %20 (not + in modern standards)</li>
              <li>Always encode user input before adding it to URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
