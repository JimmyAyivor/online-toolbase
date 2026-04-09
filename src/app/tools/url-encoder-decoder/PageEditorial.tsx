"use client";
// src/app/tools/url-encoder-decoder/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/url-encoder-decoder";
const TOOL_NAME = "URL Encoder/Decoder";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#0c4a6e", light: "#f0f9ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-sky-100 shadow-inner mb-5">
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
    "Free URL encoder/decoder — encode or decode URLs instantly in your browser, component and full URL modes, no signup",
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
                <span className="text-sky-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is URL encoding and why is it needed?",
    a: "URL encoding (also called percent-encoding) is the process of converting characters that are not safe to include in a URL into a safe format that can be transmitted over the internet. URLs can only contain a limited set of ASCII characters — letters, digits, and a small number of special characters like hyphens, underscores, and tildes. Characters outside this safe set — including spaces, ampersands, equals signs, slashes, hash symbols, non-ASCII characters like accented letters, and emoji — must be encoded as a percent sign followed by two hexadecimal digits representing the character's byte value. For example, a space becomes %20, an ampersand becomes %26, and a question mark becomes %3F. Without encoding, these characters would be interpreted as URL structure (a ? marks the start of a query string; a # marks a fragment), breaking the URL.",
  },
  {
    q: "What is the difference between Component and Full URL encoding?",
    a: "Component encoding (encodeURIComponent in JavaScript) encodes almost all special characters — including characters that have structural meaning in URLs like /, :, ?, #, &, and =. Use this mode when encoding a value that will be inserted as a query parameter, path segment, or fragment — anything that is part of a URL rather than the whole URL itself. Full URL encoding (encodeURI in JavaScript) encodes everything except characters that have structural meaning in URLs — it leaves /, :, ?, #, &, =, and @ unencoded, because these form the structure of the URL. Use this mode when encoding a complete URL that you want to preserve the structure of. As a rule of thumb: encoding a query parameter value → use Component; encoding an entire URL to embed in another URL or send as a header value → use Full URL.",
  },
  {
    q: "What does the URL Parser do?",
    a: "The URL Parser section appears when the input contains a valid complete URL (one with a protocol like https://). It automatically parses the URL into its structural components: protocol (https, http, ftp), hostname (the domain), port (if specified), path (the URL path after the domain), search string (the full query string including the ? prefix), hash (the fragment identifier after #), and query parameters (each key-value pair from the query string listed separately). This is useful for debugging URLs with complex query strings, inspecting API endpoint structures, and verifying that query parameters are correctly encoded.",
  },
  {
    q: "What characters must always be percent-encoded in URLs?",
    a: "Characters that must always be encoded in URL components include: space → %20 (or + in some contexts), # → %23, % → %25, & → %26, + → %2B, / → %2F, : → %3A, = → %3D, ? → %3F, @ → %40, [ → %5B, ] → %5D. Additionally, all non-ASCII characters — Unicode characters, accented letters, Cyrillic, Arabic, Chinese, Japanese, and emoji — must be encoded. The encoding for Unicode characters involves first converting to UTF-8 bytes, then percent-encoding each byte. For example, the emoji 😀 becomes %F0%9F%98%80 in UTF-8 percent-encoding. The Character Reference table in the tool shows the encodings for the most common special characters.",
  },
  {
    q: "Can I use this for encoding query string parameters?",
    a: "Yes — this is one of the most common uses. When building a URL with query parameters, each parameter value should be encoded using Component mode to ensure special characters in the value don't break the URL structure. For example, a search query containing 'cats & dogs' needs to be encoded as 'cats%20%26%20dogs' before it can be safely appended to a URL as a query parameter value. If you don't encode the ampersand, it will be interpreted as a parameter separator, splitting your query into two parameters. Paste your parameter value into the encoder, use Component mode, and copy the encoded result to use in your URL.",
  },
  {
    q: "Is there a difference between %20 and + for encoding spaces?",
    a: "Yes — both %20 and + represent a space, but they are used in different contexts. %20 is the standard percent-encoding for a space and is valid in all parts of a URL. The + notation for spaces is specific to the application/x-www-form-urlencoded format used in HTML form submissions — it only applies in the query string portion of a URL and is the historical convention from early HTML forms. Modern practice generally favours %20 for consistency and portability, as + in the query string can sometimes cause confusion when it appears in values that should contain literal plus signs. This tool uses %20 for spaces.",
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
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-sky-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                {f.a}
              </div>
            )}
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
          How to Use the URL Encoder/Decoder
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste a URL or text, choose encode or decode mode, and get the result
          instantly — with a built-in URL parser and character reference table.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose encode or decode",
              body: "Select Encode to convert special characters into percent-encoded form safe for URL transmission — spaces become %20, ampersands become %26, and so on. Select Decode to reverse the process and convert percent-encoded sequences back into readable text. The arrow icon between the mode buttons swaps the input and output, useful when you want to re-encode a decoded value or vice versa.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Mode
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Input
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Output
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Use for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Encode",
                          "cats & dogs",
                          "cats%20%26%20dogs",
                          "Building URL query params",
                        ],
                        [
                          "Decode",
                          "Hello%20World%21",
                          "Hello World!",
                          "Reading encoded URLs from logs",
                        ],
                      ].map(([m, i, o, u]) => (
                        <tr key={m} className="hover:bg-sky-50">
                          <td className="px-4 py-2 font-bold text-sky-700 text-xs">
                            {m}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs font-mono">
                            {i}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs font-mono">
                            {o}
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
              n: 2,
              title: "Choose Component or Full URL encoding",
              body: "In Encode mode, two sub-options are available. Component (encodeURIComponent) encodes everything including /, :, ?, #, &, and = — use this when encoding a value that will be embedded inside a URL, such as a query parameter value or a path segment. Full URL (encodeURI) leaves URL structural characters unencoded — use this when encoding a complete URL that you want to embed in another URL or transmit as a header value while preserving its structure.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Which to choose for query parameters?</strong> Always
                  use Component mode for individual query parameter values. If
                  you have the URL{" "}
                  <code className="bg-white px-1 rounded">
                    https://example.com/search?q=cats & dogs&lang=en
                  </code>
                  , encode just the value 'cats & dogs' using Component mode to
                  get{" "}
                  <code className="bg-white px-1 rounded">
                    cats%20%26%20dogs
                  </code>
                  , then build the URL manually:{" "}
                  <code className="bg-white px-1 rounded">
                    https://example.com/search?q=cats%20%26%20dogs&lang=en
                  </code>
                  .
                </div>
              ),
            },
            {
              n: 3,
              title: "Paste your text and copy the result",
              body: "Type or paste your URL or text into the input area. The encoded or decoded result appears immediately below. Click Copy to copy the result to your clipboard. For complete URLs, the URL Parser panel appears automatically — it breaks the URL into protocol, hostname, path, query string, hash, and individual query parameters, all formatted for easy inspection.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>URL Parser tip:</strong> The parser is particularly
                  useful when debugging API calls with complex query strings.
                  Paste the full URL from your browser's address bar or a
                  network log, and the parser separates each query parameter
                  into its own row — making it easy to see which parameters are
                  present, what their values are, and whether any values are
                  correctly encoded.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use the character reference table",
              body: "The Common Character Encodings table at the bottom of the tool shows the percent-encoding for the most frequently encountered special characters — spaces, question marks, equals signs, ampersands, hash symbols, slashes, and more. Click any row to copy the encoded form. Use this as a quick reference when manually building URLs or debugging encoding issues without needing to run a full encode operation.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Common mistake:</strong> Encoding the entire URL
                  (including the protocol and domain) with Component mode will
                  over-encode structural characters like : and / — turning
                  https://example.com into https%3A%2F%2Fexample.com. Only
                  encode the parts that need encoding: parameter values, path
                  segments containing special characters, and fragment
                  identifiers. Never encode the protocol or domain portion of a
                  URL.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🔗",
              title: "Building API requests",
              desc: "Encode query parameter values before appending them to API endpoint URLs — prevents special characters from breaking the request structure.",
            },
            {
              emoji: "🐛",
              title: "Debugging encoded URLs",
              desc: "Decode percent-encoded URLs from browser address bars, network logs, and server access logs to read their actual content.",
            },
            {
              emoji: "📋",
              title: "Form submission testing",
              desc: "Encode form field values to verify they match what the server will receive — useful for debugging HTML form POST and GET submissions.",
            },
            {
              emoji: "🔍",
              title: "SEO and link building",
              desc: "Check that links in HTML, sitemaps, and redirect rules are correctly encoded — improperly encoded URLs can cause 404 errors and broken redirects.",
            },
            {
              emoji: "⚙️",
              title: "Config and environment files",
              desc: "Encode special characters in connection strings, webhook URLs, and callback URLs stored in configuration files or environment variables.",
            },
            {
              emoji: "📊",
              title: "Analytics and tracking",
              desc: "Encode UTM parameters and tracking values in marketing URLs — spaces and special characters in campaign names must be encoded for the URL to work correctly.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-sky-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-sky-500 to-blue-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔗</div>
          <h3 className="text-xl font-bold mb-3">
            Always encode query parameter values, never the whole URL
          </h3>
          <p className="text-sky-100 leading-relaxed max-w-xl mx-auto text-sm">
            The most common URL encoding mistake is encoding an entire URL with
            Component mode, which over-encodes the : and / in the protocol and
            domain. Only encode the parts that contain unsafe characters: query
            parameter values, path segments with spaces or special characters,
            and fragment identifiers. The protocol (https://), domain, and path
            separator slashes should never be encoded.
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
                desc: "Encode or decode Base64 strings instantly — useful for JWT tokens, image encoding, and API authentication.",
              },
              {
                href: "/tools/json-formatter-validator",
                label: "JSON Formatter & Validator",
                desc: "Format, beautify, and validate JSON data instantly — adjustable indentation, sort keys, minify, and download.",
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
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-sky-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
