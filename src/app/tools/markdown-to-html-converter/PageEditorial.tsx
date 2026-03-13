"use client";
// src/app/tools/markdown-to-html-converter/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/markdown-to-html-converter";
const TOOL_NAME = "Markdown to HTML Converter";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#eff6ff" },
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-blue-100 shadow-inner mb-5'>
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
    "Free Markdown to HTML converter — live rendered preview, syntax highlighting, supports tables and code blocks, no signup",
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
                <span className='text-blue-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What is Markdown and how does it work?",
    a: "Markdown is a lightweight markup language created by John Gruber in 2004. It uses plain text formatting conventions — asterisks for bold, underscores for italic, hashes for headings, dashes for lists — that are readable as plain text but also convert cleanly to formatted HTML. The guiding principle is that a Markdown document should look good as-is, even without being rendered. Markdown is widely used for documentation (GitHub READMEs, GitBook, Notion), blog posts (Hugo, Jekyll, Ghost), technical writing, and content management systems. When you write Markdown, a parser reads the plain text and outputs structured HTML — for example, `# Hello` becomes `<h1>Hello</h1>` and `**bold**` becomes `<strong>bold</strong>`. CommonMark is the standardised, unambiguous Markdown specification that most modern tools follow.",
  },
  {
    q: "What Markdown syntax is supported?",
    a: "This tool supports the core CommonMark Markdown specification plus common extensions. Supported elements include: headings (# through ######), paragraphs, bold (**text** or __text__), italic (*text* or _text_), bold italic (***text***), strikethrough (~~text~~), inline code (`code`), code blocks (``` fenced or indented), unordered lists (-, *, +), ordered lists (1. 2. 3.), nested lists, blockquotes (>), horizontal rules (---, ***, ___), links ([text](url) and reference links), images (![alt](url)), HTML tables with alignment, and line breaks. HTML entities and raw HTML may also pass through depending on the parser settings.",
  },
  {
    q: "How do I create a table in Markdown?",
    a: "Markdown tables use pipes (|) to separate columns and hyphens (---) to create the header separator row. A basic table looks like: | Header 1 | Header 2 | on the first line, then | --- | --- | on the second (separator) line, then | Cell 1 | Cell 2 | for each data row. You can control column alignment by adding colons to the separator row: | :--- | for left-align, | ---: | for right-align, and | :---: | for centre-align. The pipes at the start and end of each row are optional but recommended for readability. Tables are a CommonMark extension and not part of the original Markdown spec — they're supported in GitHub Flavored Markdown (GFM), GitLab, Notion, most static site generators, and this converter.",
  },
  {
    q: "What is the difference between inline code and code blocks?",
    a: "Inline code is used for short code snippets within a sentence — wrap the text in single backticks: `variable_name` renders as a monospace inline element. Code blocks are for multi-line code samples — wrap the code in triple backticks (```) on their own lines, with an optional language identifier after the opening fence for syntax highlighting: ```python starts a Python-highlighted code block. Indented code blocks (four spaces or one tab of indentation) are the original Markdown method, still supported but less common than fenced blocks in modern usage. Fenced code blocks with a language identifier are the recommended approach for technical documentation.",
  },
  {
    q: "Why does my Markdown look different on GitHub vs other tools?",
    a: "Different Markdown renderers implement different specs. GitHub uses GitHub Flavored Markdown (GFM), which extends CommonMark with tables, strikethrough, task lists (- [ ] and - [x]), autolinked URLs, and @mentions. Some older tools use the original Gruber Markdown or Markdown Extra, which handle edge cases differently — particularly around nested lists, code block indentation, and emphasis inside words. CommonMark was created specifically to resolve these inconsistencies with a strict, unambiguous specification. If you need output identical to GitHub's rendering, use a GFM-compatible parser like remark with remark-gfm, or marked with the gfm option enabled.",
  },
  {
    q: "Can I include raw HTML in Markdown?",
    a: "In most Markdown parsers, yes — raw HTML can be mixed directly into Markdown documents. Block-level HTML elements (divs, sections, tables) typically work when they're separated from surrounding Markdown by blank lines. Inline HTML (spans, strong tags, anchor tags) can be mixed inline with Markdown text. However, some platforms sanitise HTML for security — notably GitHub, Notion, and most user-generated content platforms strip or escape HTML to prevent XSS attacks. If you're converting Markdown for a platform that allows raw HTML (a static site generator, your own server-rendered page), raw HTML in Markdown works reliably. If the output will be displayed in a sandboxed or sanitised context, avoid raw HTML and use Markdown syntax instead.",
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
              <span className='text-blue-600 text-lg shrink-0'>
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
          How to Use the Markdown to HTML Converter
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Paste or type Markdown in the editor — the HTML output and live
          rendered preview update in real time as you type.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Type or paste your Markdown",
              body: "Enter Markdown text in the left editor panel. A sample document loads automatically when the tool opens — use it as a syntax reference or clear it to start fresh. The editor accepts all standard CommonMark Markdown syntax: headings, bold, italic, links, images, lists, blockquotes, tables, and fenced code blocks. Paste content from any source — GitHub READMEs, documentation files, blog post drafts, or notes from apps like Obsidian, Notion, or Typora.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Markdown syntax
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          HTML output
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Result
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "# Heading 1",
                          "<h1>Heading 1</h1>",
                          "Largest heading",
                        ],
                        ["**bold text**", "<strong>bold text</strong>", "Bold"],
                        ["*italic text*", "<em>italic text</em>", "Italic"],
                        [
                          "`inline code`",
                          "<code>inline code</code>",
                          "Monospace inline",
                        ],
                        [
                          "[Link](https://...)",
                          '<a href="...">Link</a>',
                          "Hyperlink",
                        ],
                        [
                          "- List item",
                          "<ul><li>List item</li></ul>",
                          "Bullet list",
                        ],
                      ].map(([md, html, r]) => (
                        <tr key={md} className='hover:bg-blue-50'>
                          <td className='px-4 py-2 font-mono text-xs text-blue-700'>
                            {md}
                          </td>
                          <td className='px-4 py-2 font-mono text-xs text-gray-500'>
                            {html}
                          </td>
                          <td className='px-4 py-2 text-xs text-gray-600'>
                            {r}
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
              title: "View the live rendered preview",
              body: "The Preview tab in the output panel shows your Markdown rendered as formatted HTML in real time — exactly as it would appear in a browser. Use this to verify heading hierarchy, check that tables display correctly, and confirm that links and images are formatted as expected before copying the HTML. Toggle between the Preview and HTML tabs to compare the rendered output with the raw HTML code.",
              enrich: (
                <div className='bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed'>
                  <strong>Table rendering tip:</strong> Markdown tables require
                  a header separator row (| --- | --- |) to render correctly. If
                  your table isn't rendering, check that the separator row is
                  present, that you have the same number of columns in every
                  row, and that there are blank lines before and after the table
                  block. Column alignment is controlled by colons:{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    | :--- |
                  </code>{" "}
                  left,{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    | ---: |
                  </code>{" "}
                  right,{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    | :---: |
                  </code>{" "}
                  centre.
                </div>
              ),
            },
            {
              n: 3,
              title: "Copy the generated HTML",
              body: "Switch to the HTML tab to see the raw HTML output, then click the Copy HTML button to copy the complete HTML to your clipboard. The output is clean, semantic HTML — heading tags (h1–h6), paragraph tags, strong and em for emphasis, ul/ol/li for lists, blockquote, pre and code for code blocks, and table elements with thead and tbody. Paste the HTML directly into a CMS rich text editor, a static HTML file, or any system that accepts HTML input.",
              enrich: (
                <div className='bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed'>
                  <strong>CMS integration:</strong> Most modern CMS platforms
                  (WordPress, Ghost, Contentful, Sanity) have a Markdown field
                  or plugin that handles conversion automatically — paste
                  Markdown directly rather than converting to HTML first. Use
                  the HTML output when pasting into a legacy CMS or email editor
                  that uses a WYSIWYG HTML editor, or when you need to embed the
                  content in a static HTML template.
                </div>
              ),
            },
            {
              n: 4,
              title: "Use the Markdown cheat sheet",
              body: "The Quick Reference panel below the editor lists common Markdown syntax elements as a handy reminder while you write. For a complete syntax reference including edge cases and less common elements (definition lists, footnotes, task lists), refer to the CommonMark specification at spec.commonmark.org or the GitHub Flavored Markdown spec for GFM extensions.",
              enrich: (
                <div className='bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed'>
                  <strong>Code block tip:</strong> Start a fenced code block
                  with three backticks and a language name for syntax
                  highlighting in platforms that support it:{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    ```javascript
                  </code>
                  ,{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    ```python
                  </code>
                  ,{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    ```bash
                  </code>
                  ,{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    ```sql
                  </code>
                  . The language identifier is passed through as a class name in
                  the HTML output (
                  <code className='bg-white px-1 rounded font-mono'>
                    class="language-python"
                  </code>
                  ) — compatible with Prism.js, highlight.js, and most syntax
                  highlighting libraries.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "📝",
              title: "README files",
              desc: "Preview and convert GitHub README.md files to HTML for documentation sites, project pages, or wikis.",
            },
            {
              emoji: "✍️",
              title: "Blog post drafting",
              desc: "Write blog posts in Markdown and convert to HTML for pasting into WordPress, Ghost, or any HTML-based CMS.",
            },
            {
              emoji: "📚",
              title: "Technical documentation",
              desc: "Convert Markdown documentation files to HTML for inclusion in static site generators like Hugo, Jekyll, or Docusaurus.",
            },
            {
              emoji: "📧",
              title: "Email newsletters",
              desc: "Write email content in readable Markdown, then convert to HTML for pasting into email editors like Mailchimp or Klaviyo.",
            },
            {
              emoji: "🎓",
              title: "Learning Markdown syntax",
              desc: "Use the live preview to learn Markdown by experimenting with syntax and immediately seeing the rendered result.",
            },
            {
              emoji: "🔄",
              title: "Content migration",
              desc: "Convert Markdown exports from Notion, Obsidian, or Typora to HTML for importing into legacy CMS platforms.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>⌨️</div>
          <h3 className='text-xl font-bold mb-3'>
            Markdown: write once, publish anywhere
          </h3>
          <p className='text-blue-100 leading-relaxed max-w-xl mx-auto text-sm'>
            One of Markdown's greatest strengths is portability. A .md file
            written today can be rendered on GitHub, published as a blog post
            via Jekyll or Hugo, converted to a PDF via Pandoc, imported into
            Notion, synced to Obsidian, and displayed on a documentation site —
            all without reformatting. Unlike HTML or Word documents, Markdown
            separates content from presentation, making it the most future-proof
            format for writing that needs to outlast any single platform or
            tool.
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
                desc: "Format, beautify, and validate JSON data with syntax highlighting and error detection.",
              },
              {
                href: "/tools/html-minifier",
                label: "HTML Minifier",
                desc: "Minify HTML files by removing whitespace, comments, and redundant attributes to reduce file size.",
              },
              {
                href: "/tools/meta-tag-generator",
                label: "Meta Tag Generator",
                desc: "Generate SEO meta tags, Open Graph tags, and Twitter Cards for any page.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
