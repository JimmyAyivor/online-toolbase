"use client";
// src/app/tools/regex-tester/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/regex-tester";
const TOOL_NAME = "Regex Tester";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#881337", light: "#fff1f2" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500'
        >
          ✕
        </button>
        <h3 className='text-lg font-black text-gray-900 mb-1'>
          Take it with you
        </h3>
        <p className='text-sm text-gray-400 mb-5'>
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-rose-100 shadow-inner mb-5'>
          <canvas ref={canvasRef} />
        </div>
        <p className='text-xs text-gray-300 font-mono break-all'>{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free regex tester — test and debug regular expressions in real time with live match highlighting, capture groups, and common patterns library",
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
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <p className='text-sm font-bold text-gray-900 mb-0.5'>
              Found this useful?
            </p>
            <p className='text-xs text-gray-400'>
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className='px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold'
            >
              {copied ? (
                <span className='text-rose-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What is a regular expression (regex)?",
    a: "A regular expression (regex or regexp) is a sequence of characters that defines a search pattern. Regex engines use these patterns to find, match, and manipulate text. A regex can be as simple as a literal string like 'hello' (which matches the word hello anywhere in the text) or as complex as a multi-part pattern with character classes, quantifiers, anchors, groups, and alternation. Regular expressions are implemented in virtually every programming language and many text editors and command-line tools. While the core syntax is standardised, there are dialect differences between JavaScript, Python, Java, PCRE (Perl Compatible Regular Expressions), and other regex flavours — this tool uses the JavaScript regex engine, which is the standard for browser-based tools.",
  },
  {
    q: "What do the regex flags (g, i, m, s) do?",
    a: "Flags modify how the regex engine applies the pattern. The g (global) flag finds all matches in the text rather than stopping after the first match — without g, only the first match is returned. The i (case-insensitive) flag makes the match ignore case — the pattern 'hello' with the i flag matches 'hello', 'Hello', 'HELLO', and any other capitalisation. The m (multiline) flag changes the behaviour of the ^ and $ anchors — without m, ^ matches the start of the entire string and $ matches the end; with m, they match the start and end of each line. The s (dotAll) flag changes the . metacharacter to match newline characters (\n, \r) in addition to all other characters — without s, . does not match newlines.",
  },
  {
    q: "What are capture groups and how do I use them?",
    a: "Capture groups are portions of a regex pattern enclosed in parentheses ( ) that capture the matched text as a separate result alongside the full match. For example, the pattern (\\d{4})-(\\d{2})-(\\d{2}) applied to '2024-03-15' produces a full match of '2024-03-15' and three capture groups: '2024', '03', and '15'. Capture groups are used in replacement operations (you can refer to group 1 with $1 or \\1 depending on the language), in data extraction (parsing structured text into components), and in conditional matching. Named capture groups use the syntax (?<name>pattern) and can be referenced by name instead of number — for example (?<year>\\d{4})-(?<month>\\d{2}) creates groups named 'year' and 'month'.",
  },
  {
    q: "What does the error 'Invalid regular expression' mean?",
    a: "This error appears when the regex pattern contains a syntax error that prevents the engine from parsing it. Common causes include: unmatched parentheses (opening ( without a closing ), or vice versa), unmatched square brackets ([ without ]), a backslash at the end of the pattern with nothing after it, an invalid quantifier (like {2,1} where the minimum is greater than the maximum), an invalid escape sequence (like \\q, which is not a recognised escape), or a special character that needs to be escaped but isn't (some characters like + * ? . have special meaning and must be escaped with \\ if you want to match them literally). Fix errors by checking parentheses/bracket balance and ensuring special characters are properly escaped.",
  },
  {
    q: "What is the difference between .* and .+?",
    a: "Both are quantifiers that extend the . metacharacter (which matches any single character except newline). .* means 'zero or more of any character' — it matches even when there are no characters present, because * allows zero occurrences. .+ means 'one or more of any character' — it requires at least one character to be present. This distinction matters when matching optional content: use .* when the content might be absent, and .+ when at least one character must be there. Both are greedy by default — they match as much text as possible. Append ? to make them lazy (match as little as possible): .*? and .+? match the shortest possible string rather than the longest.",
  },
  {
    q: "How do I match a literal special character like . + * or (?",
    a: "In regex, many characters have special meaning: . matches any character, + means 'one or more', * means 'zero or more', ? makes a quantifier lazy or marks a group as non-capturing, ( and ) define groups, [ and ] define character classes, { and } define quantifiers with counts, ^ anchors to the start or negates a character class, $ anchors to the end, \\ is the escape character, and | is alternation. To match any of these characters literally, prefix them with a backslash: \\. matches a literal period, \\+ matches a literal plus, \\( matches a literal opening parenthesis, and so on. In the tool's input field, type the backslash directly — for example, type \\. to match a period.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Frequently Asked Questions
      </h2>
      <div className='space-y-3'>
        {FAQS.map((f, i) => (
          <div
            key={i}
            className='border border-gray-100 rounded-xl overflow-hidden'
          >
            <button
              className='w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors'
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className='font-semibold text-gray-900 text-sm'>{f.q}</span>
              <span className='text-rose-600 text-lg shrink-0'>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className='px-5 pb-5 text-sm text-gray-600 leading-relaxed'>
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
      <div className='max-w-6xl mx-auto px-4 mt-6 flex justify-center'>
        <div className='hidden sm:block'>
          <AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className='block sm:hidden'>
          <AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
      <div className='max-w-6xl mx-auto px-4 mt-4 flex justify-center'>
        <AdSlot
          variant='leaderboard'
          slotId={SLOT_LEADERBOARD}
          className='hidden sm:flex'
        />
        <AdSlot
          variant='mediumrectangle'
          slotId={SLOT_LEADERBOARD}
          className='flex sm:hidden'
        />
      </div>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
        <ShareBar />
      </div>

      <section
        id='how-to-use'
        className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'
      >
        <h2 className='text-4xl font-bold text-gray-900 mb-4 text-center'>
          How to Use the Regex Tester
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Enter a pattern, choose your flags, and paste test text — matches
          highlight live with capture group details and match statistics.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Enter your regex pattern and choose flags",
              body: "Type your regular expression into the pattern input at the top. The pattern is tested live — results update as you type. Use the flag toggles (g, i, m, s) to modify matching behaviour: g finds all matches, i ignores case, m makes ^ and $ match line boundaries, and s makes . match newlines. The flag row shows which flags are active and updates the match results immediately when toggled.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Flag
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Effect
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Common use
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "g",
                          "Find all matches (not just first)",
                          "Extracting all occurrences",
                        ],
                        [
                          "i",
                          "Case-insensitive matching",
                          "User input validation",
                        ],
                        [
                          "m",
                          "^ and $ match line boundaries",
                          "Multi-line text processing",
                        ],
                        [
                          "s",
                          ". matches newline characters",
                          "Matching across line breaks",
                        ],
                      ].map(([flag, effect, use]) => (
                        <tr key={flag} className='hover:bg-rose-50'>
                          <td className='px-4 py-2 font-bold text-rose-700 text-xs font-mono'>
                            {flag}
                          </td>
                          <td className='px-4 py-2 text-gray-600 text-xs'>
                            {effect}
                          </td>
                          <td className='px-4 py-2 text-gray-500 text-xs'>
                            {use}
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
              title: "Paste your test text",
              body: "Paste or type the text you want to test your pattern against into the test string textarea. Matches are highlighted directly in the results pane below. The results panel shows a match count, each match's full text and character position, and any capture groups with their matched values. If your pattern contains a syntax error, a red error banner explains the problem.",
              enrich: (
                <div className='bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed'>
                  <strong>Capture groups in results:</strong> If your pattern
                  contains parentheses, each match card shows a 'Capture Groups'
                  section with numbered groups and their matched values. Group 0
                  is always the full match. Group 1 is the first ( ), Group 2 is
                  the second, and so on. Named groups (using{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    (?&lt;name&gt;pattern)
                  </code>{" "}
                  syntax) appear with their name instead of a number.
                </div>
              ),
            },
            {
              n: 3,
              title: "Use the Common Patterns library",
              body: "Click the 'Common Patterns' section below the results to see a library of pre-built regex patterns for common validation tasks: email addresses, URLs, phone numbers, IP addresses, dates, postal codes, hex colors, and more. Click any pattern to load it into the pattern input — then test it against your own text or modify it to suit your needs. This is useful both as a starting point and as a reference for correct regex syntax.",
              enrich: (
                <div className='bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed'>
                  <strong>Adapting common patterns:</strong> The built-in email
                  and URL patterns cover standard cases but may not match every
                  edge case in the relevant RFC specifications. For production
                  validation, test patterns against a representative sample of
                  real data from your application before deploying them. Regex
                  validation should always be complemented by server-side
                  validation — never rely on client-side regex alone for
                  security or data integrity.
                </div>
              ),
            },
            {
              n: 4,
              title: "Iterate and refine your pattern",
              body: "Use the Quick Reference at the bottom of the tool to look up metacharacters, character classes, quantifiers, and anchors without leaving the page. Toggle flags on and off to see how they change the match results. Use the Swap button to exchange the pattern and test text if you want to use the current pattern as new test input. Refine your pattern until the highlighted matches exactly cover what you need.",
              enrich: (
                <div className='bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed'>
                  <strong>Debugging tip:</strong> If your pattern matches too
                  much, add more specific constraints — use character classes
                  instead of . where possible, and add anchors (^ and $) to
                  force the match to the start or end of the string. If it
                  matches too little, check whether you need the g flag (to find
                  all matches rather than just the first), or whether a
                  quantifier needs to be made more flexible (e.g. + instead of
                  exactly {3}).
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-rose-500 text-white font-black text-lg flex items-center justify-center'>
                {n}
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  {title}
                </h3>
                <p className='text-gray-600 leading-relaxed mb-3'>{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
          Common use cases
        </h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14'>
          {[
            {
              emoji: "✉️",
              title: "Form validation",
              desc: "Test email, phone number, postal code, and URL patterns before adding them to form validation logic — verify they match valid inputs and reject invalid ones.",
            },
            {
              emoji: "🔍",
              title: "Log file parsing",
              desc: "Extract timestamps, error codes, IP addresses, or structured data from server logs and application output using regex patterns.",
            },
            {
              emoji: "✏️",
              title: "Find and replace",
              desc: "Build regex patterns for find-and-replace operations in code editors (VS Code, Vim, Sublime Text) — test the pattern here before applying it to your files.",
            },
            {
              emoji: "🧹",
              title: "Data cleaning",
              desc: "Strip HTML tags, normalise whitespace, remove special characters, or extract structured fields from messy text data with capture groups.",
            },
            {
              emoji: "📋",
              title: "Code review & refactoring",
              desc: "Find patterns in code — unused imports, deprecated function calls, hardcoded strings, or specific naming convention violations — before running a codebase-wide replacement.",
            },
            {
              emoji: "🤖",
              title: "API response parsing",
              desc: "Extract specific fields from API responses or webhook payloads that don't have a structured parser — useful for text-based formats and semi-structured data.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-rose-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>🔬</div>
          <h3 className='text-xl font-bold mb-3'>
            This tool uses JavaScript's regex engine
          </h3>
          <p className='text-rose-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Results match exactly what you'd get with JavaScript's RegExp object
            — perfect for frontend validation, Node.js scripts, and any
            JavaScript environment. If you're targeting Python, Java, or another
            language, test your final pattern in that language's regex engine
            too, as there are syntax differences between flavours (especially
            around lookbehind assertions, atomic groups, and Unicode property
            escapes).
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Developer Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/json-formatter-validator",
                label: "JSON Formatter & Validator",
                desc: "Format, beautify, and validate JSON data instantly — adjustable indentation, sort keys, minify, and download.",
              },
              {
                href: "/tools/url-encoder-decoder",
                label: "URL Encoder/Decoder",
                desc: "Encode or decode URLs for safe web transmission — handles special characters, spaces, and Unicode.",
              },
              {
                href: "/tools/hash-generator",
                label: "Hash Generator",
                desc: "Generate SHA-256, SHA-512, and other cryptographic hashes for any text or file instantly.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-rose-200 hover:-translate-y-1 transition-all duration-200 p-5'
              >
                <div className='font-bold text-gray-900 text-sm mb-1'>
                  {label}
                </div>
                <div className='text-xs text-gray-500'>{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
