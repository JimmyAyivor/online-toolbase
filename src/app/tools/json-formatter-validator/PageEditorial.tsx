"use client";
// src/app/tools/json-formatter-validator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/json-formatter-validator";
const TOOL_NAME = "JSON Formatter & Validator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#164e63", light: "#ecfeff" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
        >
          ✕
        </button>
        <h3 className="text-lg font-black text-gray-900 mb-1">
          Take it with you
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-cyan-100 shadow-inner mb-5">
          <canvas ref={canvasRef} />
        </div>
        <p className="text-xs text-gray-300 font-mono break-all">{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free JSON formatter & validator — format, validate, and minify JSON instantly in your browser, no signup",
  );
  const shareUrl = encodeURIComponent(TOOL_URL);
  const copyLink = () => {
    navigator.clipboard.writeText(TOOL_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const SHARES = [
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      bg: "bg-black hover:bg-gray-800",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
    },
  ];
  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">
              Found this useful?
            </p>
            <p className="text-xs text-gray-400">
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
            >
              {copied ? (
                <span className="text-cyan-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FAQS = [
  {
    q: "What is JSON and why does it need to be formatted?",
    a: "JSON (JavaScript Object Notation) is a lightweight text format for storing and transmitting structured data. It's the most widely used data interchange format in web APIs, configuration files, databases, and application settings. Raw JSON from APIs, logs, or minified files is often a single unbroken line with no whitespace — technically valid but extremely difficult for humans to read and debug. Formatting (also called beautifying or pretty-printing) adds indentation and line breaks to reveal the nested structure of the data. Validation checks that the JSON syntax is correct — all brackets and braces are properly matched, keys are quoted strings, values are valid JSON types, and there are no trailing commas (which are not permitted in JSON even though they're allowed in JavaScript).",
  },
  {
    q: "What does the validator check?",
    a: "The validator parses your JSON using the browser's native JSON.parse() function, which enforces the full JSON specification (RFC 8259). Common errors it detects include: unquoted or single-quoted keys (JSON requires double-quoted string keys), missing or extra commas, mismatched brackets or braces, trailing commas after the last item in an array or object (not permitted in JSON), unescaped special characters in strings, invalid number formats, and the use of undefined, NaN, or Infinity as values (which are JavaScript concepts not present in JSON). When an error is detected, the exact error message from the parser is displayed — including the character position of the error, which makes it faster to find and fix the problem.",
  },
  {
    q: "What is the difference between beautify and minify?",
    a: "Beautify (also called pretty-print or format) adds indentation and newlines to make JSON human-readable. It increases file size but makes the structure easy to read, debug, and edit. Minify removes all whitespace — spaces, tabs, and newlines — from the JSON, producing the most compact possible representation. Minified JSON is ideal for production environments where bandwidth matters, such as API responses sent over the network or JSON stored in databases. The difference in file size can be significant for large JSON files: a 50KB beautified file might minify to 30KB. The Beautify button in this tool lets you expand minified JSON for inspection, while Minify lets you compact it for storage or transmission.",
  },
  {
    q: "What does 'Sort keys alphabetically' do?",
    a: "Enabling Sort keys alphabetically reorders the keys in every object in your JSON into alphabetical order before formatting. The JSON data itself is unchanged — only the key order within each object changes. This is useful for several purposes: comparing two JSON objects to find differences (key order differences won't mask content differences), enforcing consistent key ordering across different sources of the same data structure, making large JSON files easier to scan when you're looking for a specific key, and producing deterministic output when JSON is generated from different sources that may order keys differently. Note that JSON as a standard does not guarantee key order — any JSON parser is allowed to read keys in any order — so sorting is a presentation choice only.",
  },
  {
    q: "What do the JSON statistics mean?",
    a: "When your JSON is valid, the tool displays four statistics. Type shows whether the root element is an Object or Array — the two valid JSON root types. Size shows the character count of the minified JSON (without whitespace), which approximates the file size in bytes for ASCII content. Depth shows the maximum nesting level — how many levels of objects and arrays are nested inside each other. A depth of 1 means a flat object with no nested structures; a depth of 5 or more indicates heavily nested data. Properties shows the total count of all keys across all objects in the entire JSON structure — including nested objects. This gives you a sense of the total data volume beyond just the top-level structure.",
  },
  {
    q: "Is my JSON data sent to a server?",
    a: "No — all processing runs entirely in your browser using JavaScript. Your JSON data is never sent to any server, logged, or stored anywhere. The tool uses the browser's built-in JSON.parse() and JSON.stringify() functions to parse, validate, and format the data. This means the tool works offline (after the page has loaded), and you can safely use it with sensitive or confidential JSON data such as API responses containing personal information, configuration files with credentials, or internal business data. Your data stays on your device at all times.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-cyan-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            <div
              className="px-5 text-sm text-gray-600 leading-relaxed overflow-hidden transition-all duration-200"
              style={{
                maxHeight: open === i ? "1000px" : "0px",
                paddingBottom: open === i ? "20px" : "0px",
                visibility: open === i ? "visible" : "hidden",
              }}
              aria-hidden={open !== i}
            >
              {f.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageEditorial() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-center">
        <div className="hidden sm:block">
          <AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className="block sm:hidden">
          <AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-4 flex justify-center">
        <AdSlot
          variant="leaderboard"
          slotId={SLOT_LEADERBOARD}
          className="hidden sm:flex"
        />
        <AdSlot
          variant="mediumrectangle"
          slotId={SLOT_LEADERBOARD}
          className="flex sm:hidden"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ShareBar />
      </div>

      <section
        id="how-to-use"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How to Use the JSON Formatter &amp; Validator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste JSON into the left pane — it validates and formats live. Adjust
          indentation, sort keys, minify, copy, or download the result.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste JSON into the input pane",
              body: "Paste or type any JSON into the left textarea. The tool parses it live — if the JSON is valid, the formatted output appears immediately in the right pane and the green stats panel shows. If there's a syntax error, a red error panel appears with the exact error message and character position from the parser. Click 'Load Sample' to see a realistic multi-level JSON object before entering your own data.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Reading error messages:</strong> JSON parse errors
                  include a position indicator — for example, 'Unexpected token{" "}
                  {"}"} in JSON at position 47'. Count forward from the start of
                  your JSON to that position to locate the problem character.
                  Common causes: missing comma between items, trailing comma
                  after the last item, single-quoted instead of double-quoted
                  string, or an unescaped special character inside a string
                  value.
                </div>
              ),
            },
            {
              n: 2,
              title: "Choose formatting options",
              body: "Use the Indentation slider to set 2, 4, 6, or 8 spaces of indentation — 2 spaces is the most common standard for shared code and configs; 4 spaces is preferred by some teams and style guides. Enable 'Sort keys alphabetically' to reorder all object keys into alphabetical order throughout the entire JSON structure — useful when comparing two JSON objects or enforcing consistent ordering across data sources.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Option
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Effect
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Common use
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "2 spaces indent",
                          "Standard compact formatting",
                          "APIs, config files, shared code",
                        ],
                        [
                          "4 spaces indent",
                          "More spacious formatting",
                          "Some style guides, .editorconfig defaults",
                        ],
                        [
                          "Sort keys",
                          "Alphabetical key order in all objects",
                          "Diffing, consistency, debugging",
                        ],
                        [
                          "Minify",
                          "Remove all whitespace",
                          "Production APIs, file storage, bandwidth",
                        ],
                        [
                          "Beautify",
                          "Expand minified JSON",
                          "Inspection, debugging, editing",
                        ],
                      ].map(([o, e, u]) => (
                        <tr key={o} className="hover:bg-cyan-50">
                          <td className="px-4 py-2 font-bold text-cyan-700 text-xs">
                            {o}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {e}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {u}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Use Minify or Beautify to transform the JSON",
              body: "Click Minify to compress the input JSON into a single line with all whitespace removed — useful before storing JSON in a database, embedding it in a URL, or sending it in an API request where size matters. Click Beautify to expand the current output back into the input pane — useful when you've minified for inspection and want to continue editing the formatted version. Both buttons are disabled when the current input contains invalid JSON.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Minify for production:</strong> For API responses,
                  minifying JSON before sending reduces payload size and parsing
                  time. A typical API response that formats to 20KB of
                  beautified JSON often minifies to 12–14KB — a 30–40%
                  reduction. For high-traffic APIs, this compounds significantly
                  across thousands of requests per second. The Download button
                  saves the current formatted/minified output as a .json file.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy or download the result",
              body: "Click Copy to copy the formatted or minified JSON from the output pane to your clipboard — a green checkmark confirms the copy. Click Download to save the output as a formatted.json file. The download contains whatever is currently in the output pane — formatted, minified, or sorted depending on your current settings.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>JSON statistics panel:</strong> When your JSON is
                  valid, the teal stats panel shows the root type (Object or
                  Array), size in characters (approximates byte size), maximum
                  nesting depth, and total property count across all nested
                  objects. Depth above 5–6 levels often indicates an overly
                  complex data structure that could be flattened; very high
                  property counts can indicate JSON that would benefit from
                  being split into separate documents.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-600 text-white font-black text-lg flex items-center justify-center">
                {n}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common use cases
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "🔍",
              title: "Debugging API responses",
              desc: "Paste raw API response JSON to instantly see the structure, find missing fields, and check data types — much faster than reading minified output.",
            },
            {
              emoji: "⚙️",
              title: "Config file editing",
              desc: "Validate JSON configuration files (package.json, tsconfig.json, .eslintrc) before saving — catch syntax errors that would break your build.",
            },
            {
              emoji: "🗄️",
              title: "Database queries",
              desc: "Format JSON returned from MongoDB, PostgreSQL JSON columns, or NoSQL databases to inspect document structure during development.",
            },
            {
              emoji: "📦",
              title: "API development",
              desc: "Minify JSON payloads before embedding in requests, validate request/response structures, and compare expected vs actual API output.",
            },
            {
              emoji: "🔄",
              title: "Data transformation",
              desc: "Sort keys alphabetically to normalise JSON from different sources before comparing or merging them — eliminates false differences from key order.",
            },
            {
              emoji: "📋",
              title: "Code review",
              desc: "Beautify minified JSON from commits, logs, or error reports to make the structure readable during code reviews and incident investigation.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-cyan-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            Your JSON never leaves your browser
          </h3>
          <p className="text-cyan-100 leading-relaxed max-w-xl mx-auto text-sm">
            All parsing, validation, and formatting runs entirely in your
            browser using JavaScript's native JSON.parse() and JSON.stringify().
            No data is sent to any server. This means you can safely use this
            tool with API keys, access tokens, personal data, or any sensitive
            JSON content — it stays on your device at all times, even when
            offline.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Developer Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/base64-encoder-decoder",
                label: "Base64 Encoder/Decoder",
                desc: "Encode or decode Base64 strings instantly in your browser — useful for JWT tokens, image encoding, and API auth.",
              },
              {
                href: "/tools/url-encoder-decoder",
                label: "URL Encoder/Decoder",
                desc: "Encode or decode URL components for safe web transmission — handles special characters, spaces, and Unicode.",
              },
              {
                href: "/tools/hash-generator",
                label: "Hash Generator",
                desc: "Generate MD5, SHA-1, SHA-256, and other cryptographic hashes for any string or file instantly.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-cyan-200 hover:-translate-y-1 transition-all duration-200 p-5"
              >
                <div className="font-bold text-gray-900 text-sm mb-1">
                  {label}
                </div>
                <div className="text-xs text-gray-500">{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
