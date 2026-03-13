"use client";
// src/app/tools/html-entity-encoder/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/html-entity-encoder";
const TOOL_NAME = "HTML Entity Encoder";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e1b4b", light: "#eef2ff" },
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5'>
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
    "Free HTML entity encoder & decoder — convert special characters to HTML entities and back, prevents XSS, no signup",
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
                <span className='text-indigo-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What are HTML entities and why are they needed?",
    a: "HTML entities are special character sequences that represent characters that would otherwise be interpreted as HTML markup or that cannot be typed directly. The most critical are the five reserved HTML characters: the ampersand (&) which starts all entities and must itself be encoded as &amp; whenever it appears as literal text; the less-than sign (<) which opens HTML tags and must be encoded as &lt;; the greater-than sign (>) which closes HTML tags, encoded as &gt;; and the double quote (\") and single quote (') which delimit attribute values, encoded as &quot; and &apos; respectively. Beyond these, entities represent symbols and special characters not present on standard keyboards: &copy; for ©, &euro; for €, &mdash; for —, &hellip; for …, and hundreds more covering currency symbols, mathematical operators, arrows, and international characters.",
  },
  {
    q: "How do HTML entities prevent XSS attacks?",
    a: "Cross-site scripting (XSS) occurs when an attacker injects malicious HTML or JavaScript into a web page through user-controlled input — for example, submitting <script>document.cookie</script> as a comment or username. If the application renders this input directly as HTML, the browser executes the script. HTML entity encoding prevents this by converting < to &lt; and > to &gt;, so the browser renders the string as visible text rather than interpreting it as markup. When a browser sees &lt;script&gt;, it displays the literal characters <script> on screen instead of creating a script element. This is one of the fundamental defences against reflected and stored XSS attacks, alongside Content Security Policy headers, HTTPOnly cookies, and output context-aware encoding (HTML context vs attribute context vs JavaScript context).",
  },
  {
    q: "What is the difference between HTML entity names, numeric references, and hex references?",
    a: "HTML supports three equivalent ways to reference the same character. Named entities use a mnemonic name: &amp; for &, &lt; for <, &copy; for ©. These are the most readable but require the entity name to be known. Decimal numeric character references use the Unicode code point as a decimal number: &#38; for &, &#60; for <, &#169; for ©. Hexadecimal numeric character references use the code point in hex: &#x26; for &, &#x3C; for <, &#xA9; for ©. All three forms produce identical output in the browser. Named entities are preferred for the most common characters. Numeric references are necessary for characters that don't have a named entity. In HTML5, all Unicode code points can be referenced numerically, giving access to the full character set.",
  },
  {
    q: "When should I encode HTML entities vs use Unicode characters directly?",
    a: "In modern HTML5 documents with a UTF-8 charset declaration (<meta charset='UTF-8'>), you can include most Unicode characters directly in your HTML source — © can appear literally, as can €, —, and most symbols. UTF-8 covers all of Unicode, so entity encoding for display purposes is largely unnecessary in modern web development. However, you must still entity-encode the five reserved characters (&, <, >, \", ') in all contexts — these can never appear literally in HTML markup. And when inserting user-generated content into HTML, you should always encode all special characters regardless of encoding setting. The legacy reason entities exist for symbols like &copy; was that early character encodings (ISO-8859-1, ASCII) couldn't represent these characters directly — this is no longer a concern with UTF-8.",
  },
  {
    q: "What is a non-breaking space (&nbsp;) and when should I use it?",
    a: "&nbsp; is the HTML entity for the non-breaking space character (Unicode U+00A0). Unlike a regular space, a non-breaking space prevents a line break between the two words it connects — the browser will never wrap a line at a non-breaking space. Use cases include: preventing widowed words in typographic text (e.g. keeping '10 km' together), preventing line breaks between a number and its unit ('100&nbsp;MHz'), keeping a person's first and last name on the same line, and between a currency symbol and an amount ('$&nbsp;100'). Avoid using &nbsp; for layout and indentation — that's the job of CSS padding and margin. Overuse of &nbsp; for spacing is a legacy practice from the table-based layout era and makes content harder to maintain.",
  },
  {
    q: "Does HTML entity encoding work the same way in XML and XHTML?",
    a: "XML and XHTML have stricter entity rules than HTML. In XML (and XHTML, which is XML-serialised HTML), only five predefined entities are guaranteed to be available without a DOCTYPE declaration: &amp; (&), &lt; (<), &gt; (>), &quot; (\"), and &apos; ('). All other named entities like &copy; or &euro; are not defined in the XML specification itself — they come from the HTML DTD. To use them in strict XML, you'd need to either declare them in a DOCTYPE, use their numeric equivalents (&#169; for ©, &#8364; for €), or use the actual UTF-8 characters directly. In practice, if you're serving XHTML as text/html (as most pages do), browsers apply HTML parsing rules and all HTML5 named entities work. Only when serving as application/xhtml+xml do the strict XML entity rules apply.",
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
              <span className='text-indigo-600 text-lg shrink-0'>
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
          How to Use the HTML Entity Encoder
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Select encode or decode mode, paste your text, click the button, and
          copy the result — click any row in the reference table to insert that
          character.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Choose encode or decode mode",
              body: "Select Encode HTML Entities to convert plain text with special characters into safe HTML entity strings — for example, <script> becomes &lt;script&gt;. Select Decode HTML Entities to convert an HTML entity string back to plain text — useful when working with encoded content from a CMS, API response, or database that stores HTML-encoded strings. Use the Swap button after processing to instantly reverse the operation and pipe the output back through the opposite mode.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Character
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Named entity
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Numeric ref
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "&",
                          "&amp;",
                          "&#38;",
                          "Ampersand — must always be encoded",
                        ],
                        ["<", "&lt;", "&#60;", "Less-than — opens HTML tags"],
                        [
                          ">",
                          "&gt;",
                          "&#62;",
                          "Greater-than — closes HTML tags",
                        ],
                        [
                          '"',
                          "&quot;",
                          "&#34;",
                          "Double quote — in attribute values",
                        ],
                        [
                          "'",
                          "&apos;",
                          "&#39;",
                          "Single quote — in attribute values",
                        ],
                        ["©", "&copy;", "&#169;", "Copyright symbol"],
                        [
                          "—",
                          "&mdash;",
                          "&#8212;",
                          "Em dash — typographic separator",
                        ],
                        ["…", "&hellip;", "&#8230;", "Horizontal ellipsis"],
                      ].map(([ch, named, num, desc]) => (
                        <tr key={named} className='hover:bg-indigo-50'>
                          <td className='px-4 py-2 font-bold text-indigo-700 text-sm'>
                            {ch}
                          </td>
                          <td className='px-4 py-2 font-mono text-xs text-gray-700'>
                            {named}
                          </td>
                          <td className='px-4 py-2 font-mono text-xs text-gray-500'>
                            {num}
                          </td>
                          <td className='px-4 py-2 text-xs text-gray-500'>
                            {desc}
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
              title: "Paste or type your input",
              body: "Paste text into the input area. In Encode mode, paste plain text or raw HTML that contains special characters — the encoder converts every occurrence of the reserved and special characters to their entity equivalents. In Decode mode, paste HTML entity strings copied from source code, API responses, or database exports. The character count and word count are displayed below the input area. You can also click any row in the Common HTML Entities reference table at the bottom to append that character to the current input.",
              enrich: (
                <div className='bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed'>
                  <strong>Important encoding order:</strong> When encoding, the
                  ampersand (&) must be converted to &amp; before any other
                  entity substitutions — otherwise, entities already in the text
                  (like &copy;) would have their & double-encoded to &amp;copy;.
                  This tool handles the correct encoding order automatically.
                  When decoding, the browser's HTML parser is used via a
                  textarea element, which handles all valid entity forms —
                  named, decimal numeric, and hex numeric.
                </div>
              ),
            },
            {
              n: 3,
              title: "Click Encode or Decode Entities",
              body: "Click the action button to process your input. The result appears in the Result panel with the processed text in a read-only textarea and the character count. The Swap button appears alongside the Reset button — click Swap to take the encoded output, flip to Decode mode, and use the output as the new input in one click. This is useful for round-trip testing: encode something, then immediately decode it back to verify the original content is preserved correctly.",
              enrich: (
                <div className='bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed'>
                  <strong>Round-trip test:</strong> Paste text containing &,
                  &lt;, ©, and — then encode it. The output should have &amp;,
                  &lt;, &copy;, and &mdash;. Click Swap — the output is loaded
                  as the new input in Decode mode. Click Decode — you should get
                  back the original text exactly. If the decoded output matches
                  the original, the encoder and decoder are working correctly
                  for your input.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy the result and use it in your code",
              body: "Click the Copy Result button to copy the encoded or decoded output to your clipboard. Paste directly into your HTML template, JSX file, CMS rich text editor, email template, or SQL insert statement. In web development, always HTML-encode any user-supplied input before inserting it into an HTML context — this is the primary defence against stored and reflected XSS vulnerabilities. Use your templating engine's built-in escaping where available (React and Angular escape by default; Django templates auto-escape; Jinja2 requires |e or autoescape).",
              enrich: (
                <div className='bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed'>
                  <strong>Framework escaping:</strong> React: JSX{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    {"{"}"user text"{"}"}
                  </code>{" "}
                  auto-escapes — use{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    dangerouslySetInnerHTML
                  </code>{" "}
                  only for pre-sanitised trusted content. Angular: template
                  interpolation{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    {"{{value}}"}
                  </code>{" "}
                  auto-escapes. Django:{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    {"{{ var }}"}
                  </code>{" "}
                  auto-escapes;{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    {"{{ var | safe }}"}
                  </code>{" "}
                  does not. PHP: always use{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    htmlspecialchars($var, ENT_QUOTES, 'UTF-8')
                  </code>{" "}
                  for output.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "🛡️",
              title: "XSS prevention",
              desc: "Encode user-generated content before inserting it into HTML — convert <, >, &, and quotes to prevent script injection.",
            },
            {
              emoji: "📧",
              title: "Email HTML templates",
              desc: "Encode special characters in HTML email templates — ensure &, ©, ™, and em dashes render correctly across all email clients.",
            },
            {
              emoji: "🗄️",
              title: "Database content display",
              desc: "Decode HTML-encoded strings stored in databases or CMSs when displaying them in plain-text contexts like JSON APIs.",
            },
            {
              emoji: "📝",
              title: "CMS content migration",
              desc: "Decode HTML entities in content exported from a CMS before migrating to a new platform that stores plain Unicode text.",
            },
            {
              emoji: "🔍",
              title: "SEO and meta tags",
              desc: "Encode special characters in meta tag content attributes — & must be &amp; in HTML attributes to be well-formed.",
            },
            {
              emoji: "🧪",
              title: "Security testing",
              desc: "Use encode/decode round-trips to verify that your application's output escaping is working correctly for special character inputs.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>🛡️</div>
          <h3 className='text-xl font-bold mb-3'>
            HTML entity encoding is one of the most effective XSS defences — use
            your framework's built-in escaping
          </h3>
          <p className='text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Every major web framework — React, Angular, Vue, Django, Rails,
            Laravel — escapes HTML output by default because XSS is so common
            and so dangerous. Only bypass automatic escaping
            (dangerouslySetInnerHTML, raw(), | safe) for content you have
            explicitly sanitised with a library like DOMPurify. Never
            concatenate raw user input into HTML strings. The five reserved
            characters (&amp; &lt; &gt; &quot; &apos;) must be encoded in every
            HTML context — not just in potentially-malicious inputs, but in all
            user content without exception.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Developer Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/url-encoder-decoder",
                label: "URL Encoder/Decoder",
                desc: "Encode or decode URLs for safe web transmission — handles spaces, special characters, and Unicode.",
              },
              {
                href: "/tools/base64-encoder-decoder",
                label: "Base64 Encoder/Decoder",
                desc: "Encode or decode Base64 strings — used in HTTP auth headers, JWT tokens, and data URIs.",
              },
              {
                href: "/tools/markdown-to-html-converter",
                label: "Markdown to HTML Converter",
                desc: "Convert Markdown to clean HTML with a live preview — supports tables, code blocks, and more.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
