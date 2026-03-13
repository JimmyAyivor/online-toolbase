"use client";
import React, { useState, useEffect } from "react";
import {
  Code,
  Eye,
  Copy,
  Check,
  Download,
  Trash2,
  FileCode,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type PreviewMode = "preview" | "html";
type CopiedType = "html" | "";

// ─── Constants ───────────────────────────────────────────────────────────────

const EXAMPLE_MARKDOWN = `# Heading 1
## Heading 2
### Heading 3

This is a paragraph with **bold text**, *italic text*, and ~~strikethrough~~.

Here's a [link](https://example.com) and some \`inline code\`.

## Lists

- Unordered item 1
- Unordered item 2
- Unordered item 3

1. Ordered item 1
2. Ordered item 2
3. Ordered item 3

## Blockquote

> This is a blockquote
> It can span multiple lines

## Code Block

\`\`\`
function hello() {
  console.log("Hello World!");
}
\`\`\`

---

That's a horizontal rule above!`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function markdownToHtml(md: string): string {
  let out = md;

  // Code blocks (before inline code to avoid interference)
  out = out.replace(/```([^`]+)```/g, "<pre><code>$1</code></pre>");
  // Inline code
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headers
  out = out.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  out = out.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  out = out.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/__(.+?)__/g, "<strong>$1</strong>");
  // Italic
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  out = out.replace(/_(.+?)_/g, "<em>$1</em>");
  // Strikethrough
  out = out.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // Images (before links to avoid greedy matching)
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  // Links
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Unordered lists
  out = out.replace(/^\* (.+)$/gim, "<li>$1</li>");
  out = out.replace(/^- (.+)$/gim, "<li>$1</li>");
  out = out.replace(/(<li>[\s\S]*?<\/li>)/, "<ul>$1</ul>");

  // Ordered lists
  out = out.replace(/^\d+\. (.+)$/gim, "<li>$1</li>");
  const orderedListRegex = /(<li>[\s\S]*?<\/li>)/;
  if (orderedListRegex.test(out) && !/^[*-]/.test(md)) {
    out = out.replace(orderedListRegex, "<ol>$1</ol>");
  }

  // Blockquotes
  out = out.replace(/^> (.+)$/gim, "<blockquote>$1</blockquote>");

  // Horizontal rules
  out = out.replace(/^---$/gim, "<hr />");
  out = out.replace(/^\*\*\*$/gim, "<hr />");

  // Paragraphs
  out = out.replace(/\n\n/g, "</p><p>");
  out = "<p>" + out + "</p>";

  // Clean up empty / redundant paragraph tags
  out = out.replace(/<p><\/p>/g, "");
  out = out.replace(/<p>(<h[1-6]>)/g, "$1");
  out = out.replace(/(<\/h[1-6]>)<\/p>/g, "$1");
  out = out.replace(/<p>(<ul>)/g, "$1");
  out = out.replace(/(<\/ul>)<\/p>/g, "$1");
  out = out.replace(/<p>(<ol>)/g, "$1");
  out = out.replace(/(<\/ol>)<\/p>/g, "$1");
  out = out.replace(/<p>(<blockquote>)/g, "$1");
  out = out.replace(/(<\/blockquote>)<\/p>/g, "$1");
  out = out.replace(/<p>(<hr \/>)<\/p>/g, "$1");
  out = out.replace(/<p>(<pre>)/g, "$1");
  out = out.replace(/(<\/pre>)<\/p>/g, "$1");

  return out;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MarkdownToHtmlConverterClient() {
  const [markdown, setMarkdown] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState<CopiedType>("");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("preview");

  useEffect(() => {
    setHtml(markdown ? markdownToHtml(markdown) : "");
  }, [markdown]);

  const handleCopy = (text: string, type: CopiedType): void => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleDownloadHtml = (): void => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = "converted.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const handleClear = (): void => {
    setMarkdown("");
    setHtml("");
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg'>
            <FileCode className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Markdown to HTML Converter
          </h2>
          <p className='text-gray-500'>
            Convert Markdown to HTML with live preview
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-6'>
          {/* ── Input column ── */}
          <div className='space-y-6'>
            <div className='bg-white rounded-2xl shadow-xl p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-bold text-gray-900 flex items-center gap-2 text-xl'>
                  <Code className='w-6 h-6 text-blue-600' />
                  Markdown Input
                </h3>
                <div className='flex gap-2'>
                  <button
                    onClick={() => setMarkdown(EXAMPLE_MARKDOWN)}
                    className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors'
                  >
                    Load Example
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={!markdown}
                    aria-label='Clear input'
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      markdown
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </div>
              </div>

              <textarea
                value={markdown}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMarkdown(e.target.value)
                }
                placeholder={
                  "Enter your Markdown here...\n\n# Example Heading\nThis is **bold** and this is *italic*"
                }
                className='w-full h-[500px] px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none transition-colors font-mono text-sm leading-relaxed'
              />

              <div className='mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200'>
                <h4 className='font-bold text-blue-900 mb-2 text-sm'>
                  📝 Markdown Cheatsheet
                </h4>
                <div className='grid grid-cols-2 gap-2 text-xs text-gray-700'>
                  {[
                    ["# H1", "Heading 1"],
                    ["## H2", "Heading 2"],
                    ["**bold**", "Bold"],
                    ["*italic*", "Italic"],
                    ["[link](url)", "Link"],
                    ["- item", "List"],
                  ].map(([code, desc]) => (
                    <div key={code}>
                      <code className='bg-white px-1 rounded'>{code}</code>{" "}
                      {desc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Output column ── */}
          <div className='space-y-6'>
            <div className='bg-white rounded-2xl shadow-xl p-6'>
              <div className='flex justify-between items-center mb-4'>
                {/* Preview/HTML toggle */}
                <div className='flex gap-2'>
                  {(["preview", "html"] as PreviewMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setPreviewMode(mode)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all capitalize ${
                        previewMode === mode
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {mode === "preview" ? (
                        <Eye className='w-4 h-4' />
                      ) : (
                        <Code className='w-4 h-4' />
                      )}
                      {mode === "preview" ? "Preview" : "HTML"}
                    </button>
                  ))}
                </div>

                {/* Copy / Download */}
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleCopy(html, "html")}
                    disabled={!html}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                      html
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {copied === "html" ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      <Copy className='w-4 h-4' />
                    )}
                    Copy
                  </button>
                  <button
                    onClick={handleDownloadHtml}
                    disabled={!html}
                    aria-label='Download HTML'
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                      html
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Download className='w-4 h-4' />
                  </button>
                </div>
              </div>

              {previewMode === "preview" ? (
                <div
                  className='min-h-[500px] p-6 bg-gray-50 rounded-xl border-2 border-gray-200 prose prose-blue max-w-none overflow-auto'
                  dangerouslySetInnerHTML={{
                    __html:
                      html ||
                      '<p class="text-gray-400">Preview will appear here...</p>',
                  }}
                  style={{ fontSize: "14px", lineHeight: "1.6" }}
                />
              ) : (
                <div className='min-h-[500px] p-6 bg-gray-900 rounded-xl overflow-auto'>
                  <pre className='text-sm text-green-400 font-mono leading-relaxed whitespace-pre-wrap break-words'>
                    <code>
                      {html || "<!-- HTML output will appear here -->"}
                    </code>
                  </pre>
                </div>
              )}
            </div>

            <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-sm p-6'>
              <h4 className='font-bold text-gray-900 mb-4'>✨ Features</h4>
              <div className='space-y-3 text-sm text-gray-700'>
                {[
                  {
                    color: "bg-blue-600",
                    title: "Live Preview",
                    desc: "See HTML output in real-time",
                  },
                  {
                    color: "bg-indigo-600",
                    title: "Multiple Views",
                    desc: "Toggle between preview and raw HTML",
                  },
                  {
                    color: "bg-purple-600",
                    title: "Copy & Download",
                    desc: "Export HTML easily",
                  },
                  {
                    color: "bg-violet-600",
                    title: "Example Template",
                    desc: "Load sample Markdown to start",
                  },
                ].map(({ color, title, desc }) => (
                  <div key={title} className='flex items-start gap-2'>
                    <div
                      className={`w-2 h-2 ${color} rounded-full mt-2 flex-shrink-0`}
                    />
                    <p>
                      <strong>{title}:</strong> {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-md p-6'>
              <h4 className='font-bold text-gray-900 mb-3'>
                🎯 Supported Syntax
              </h4>
              <div className='space-y-2 text-sm text-gray-700'>
                {[
                  "Headers (H1–H3)",
                  "Bold & Italic text",
                  "Strikethrough text",
                  "Links & Images",
                  "Ordered & Unordered lists",
                  "Code blocks & Inline code",
                  "Blockquotes",
                  "Horizontal rules",
                ].map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .prose h1 {
            font-size: 2em;
            font-weight: bold;
            margin: 0.67em 0;
          }
          .prose h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin: 0.75em 0;
          }
          .prose h3 {
            font-size: 1.17em;
            font-weight: bold;
            margin: 0.83em 0;
          }
          .prose p {
            margin: 1em 0;
          }
          .prose strong {
            font-weight: bold;
          }
          .prose em {
            font-style: italic;
          }
          .prose del {
            text-decoration: line-through;
          }
          .prose a {
            color: #3b82f6;
            text-decoration: underline;
          }
          .prose code {
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.9em;
          }
          .prose pre {
            background: #1f2937;
            color: #10b981;
            padding: 1em;
            border-radius: 8px;
            overflow-x: auto;
          }
          .prose pre code {
            background: transparent;
            padding: 0;
            color: #10b981;
          }
          .prose ul,
          .prose ol {
            margin: 1em 0;
            padding-left: 2em;
          }
          .prose li {
            margin: 0.5em 0;
          }
          .prose blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1em;
            margin: 1em 0;
            color: #6b7280;
            font-style: italic;
          }
          .prose hr {
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 2em 0;
          }
          .prose img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
          }
        `}</style>
      </div>
    </div>
  );
}
