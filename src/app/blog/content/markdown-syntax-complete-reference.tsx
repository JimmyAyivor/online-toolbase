// src/app/blog/content/markdown-syntax-complete-reference.tsx
export default function Post() {
  return (
    <>
      <p>
        Markdown is a lightweight markup language designed for one purpose:
        writing formatted text in plain text. It's the standard format for
        README files, documentation, blog platforms, note-taking apps, and forum
        software. The syntax is intentionally simple readable as plain text even
        before it's rendered, and convertible to HTML for display in browsers.
      </p>

      <h2>Why Markdown exists</h2>
      <p>
        HTML is verbose. Writing <code>&lt;h2&gt;Introduction&lt;/h2&gt;</code>{" "}
        just to get a heading, or{" "}
        <code>&lt;strong&gt;important&lt;/strong&gt;</code> for bold text,
        interrupts the writing flow and makes the source harder to read.
        Markdown syntax is designed to look natural in its raw form:{" "}
        <code>## Introduction</code> and <code>**important**</code> are
        immediately readable without being rendered.
      </p>
      <p>
        Our{" "}
        <a href="/tools/markdown-to-html-converter">
          Markdown to HTML Converter
        </a>{" "}
        renders any Markdown to clean HTML instantly useful for previewing
        output, converting content for publication, or integrating Markdown
        content into HTML-based systems.
      </p>

      <h2>Core Markdown syntax</h2>

      <h3>Headings</h3>
      <p>
        Hash symbols create headings. One hash for H1, two for H2, up to six for
        H6:
      </p>
      <pre>
        <code>{`# H1 Heading
## H2 Heading
### H3 Heading`}</code>
      </pre>

      <h3>Emphasis</h3>
      <pre>
        <code>{`**bold text** or __bold text__
*italic text* or _italic text_
***bold and italic***`}</code>
      </pre>

      <h3>Lists</h3>
      <p>
        Unordered lists use hyphens, asterisks, or plus signs. Ordered lists use
        numbers followed by periods. Nesting uses indentation (two or four
        spaces):
      </p>
      <pre>
        <code>{`- Item one
- Item two
  - Nested item

1. First
2. Second
3. Third`}</code>
      </pre>

      <h3>Links and images</h3>
      <pre>
        <code>{`[Link text](https://example.com)
[Link with title](https://example.com "Title text")
![Alt text](image.jpg)
![Alt text](image.jpg "Image title")`}</code>
      </pre>

      <h3>Code</h3>
      <p>
        Inline code uses backticks. Fenced code blocks use triple backticks,
        with an optional language identifier for syntax highlighting:
      </p>
      <pre>
        <code>{`Inline \`code\` in a sentence

\`\`\`javascript
const greeting = "Hello, world";
console.log(greeting);
\`\`\``}</code>
      </pre>

      <h3>Blockquotes</h3>
      <pre>
        <code>{`> This is a blockquote.
> Multiple lines continue with >.`}</code>
      </pre>

      <h3>Horizontal rule</h3>
      <pre>
        <code>{`---
***
___`}</code>
      </pre>

      <h3>Tables (GitHub Flavored Markdown)</h3>
      <p>
        Basic Markdown doesn't include tables, but most modern Markdown
        processors (GitHub, many CMSs) support them:
      </p>
      <pre>
        <code>{`| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |`}</code>
      </pre>

      <h2>Markdown flavours and compatibility</h2>
      <p>
        Standard Markdown (John Gruber's original spec) has a minimal feature
        set. Several extended flavours add functionality:
      </p>
      <ul>
        <li>
          <strong>GitHub Flavored Markdown (GFM):</strong> Adds tables, task
          lists (<code>- [x] checked item</code>), strikethrough (
          <code>~~text~~</code>), and auto-linking of URLs.
        </li>
        <li>
          <strong>CommonMark:</strong> A strict, unambiguous specification
          resolving parsing inconsistencies in original Markdown. Increasingly
          the standard base.
        </li>
        <li>
          <strong>MultiMarkdown:</strong> Adds footnotes, citations, tables, and
          other academic writing features.
        </li>
      </ul>
      <p>
        When converting Markdown for a specific platform, check which flavour it
        uses. Most modern tools support CommonMark or GFM.
      </p>

      <h2>Converting Markdown to HTML</h2>
      <p>
        The conversion is deterministic every valid Markdown element has a
        specific HTML equivalent. Headings become <code>&lt;h1&gt;</code>–
        <code>&lt;h6&gt;</code>, bold becomes <code>&lt;strong&gt;</code>,
        italic becomes <code>&lt;em&gt;</code>, links become{" "}
        <code>&lt;a&gt;</code> tags.
      </p>
      <p>
        When using the output in a browser, note that Markdown converters don't
        apply any CSS. The HTML structure is correct but unstyled. For
        publication, apply your site's stylesheet or add inline styles.
      </p>

      <h2>FAQ</h2>

      <h3>Can Markdown include raw HTML?</h3>
      <p>
        In most implementations, yes. You can write raw HTML tags directly in a
        Markdown file and they'll pass through the converter unchanged. Useful
        for elements Markdown doesn't support natively (like{" "}
        <code>&lt;div&gt;</code>, custom attributes, or specific layout
        elements).
      </p>

      <h3>Is Markdown safe to render as HTML?</h3>
      <p>
        Not always without sanitisation. Markdown allows raw HTML by default,
        which means user-submitted Markdown can include malicious scripts (XSS).
        Always sanitise rendered HTML from untrusted user input before
        displaying it in a browser.
      </p>

      <h3>What's the difference between .md and .markdown file extensions?</h3>
      <p>
        Both are the same format. <code>.md</code> is more commonly used
        (shorter, GitHub recognises it for rendering). <code>.markdown</code> is
        equally valid but less common. Either works.
      </p>

      <h2>Conclusion</h2>
      <p>
        Markdown is the most practical choice for writing formatted content that
        needs to be stored as plain text or converted to HTML. The syntax takes
        minutes to learn and covers everything needed for most documentation and
        content authoring. Use the{" "}
        <a href="/tools/markdown-to-html-converter">
          Markdown to HTML Converter
        </a>{" "}
        to preview rendering, convert for publication, or check that your syntax
        is valid.
      </p>
    </>
  );
}
