// src/app/blog/content/html-entities-xss-prevention-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        HTML entities are one of those things that seem like a minor formatting
        detail until they're not. Unescaped HTML characters in user-generated
        content are the classic vector for cross-site scripting (XSS) attacks
        one of the most prevalent security vulnerabilities on the web.
        Understanding HTML entities is basic web security knowledge, not just a
        typography concern.
      </p>

      <h2>What HTML entities are</h2>
      <p>
        HTML entities are sequences that represent characters with special
        meaning in HTML characters that, if used literally, would be interpreted
        as HTML markup rather than text content. The most important:
      </p>
      <ul>
        <li>
          <code>&amp;lt;</code> → <code>&lt;</code> (less-than / opening angle
          bracket)
        </li>
        <li>
          <code>&amp;gt;</code> → <code>&gt;</code> (greater-than / closing
          angle bracket)
        </li>
        <li>
          <code>&amp;amp;</code> → <code>&amp;</code> (ampersand)
        </li>
        <li>
          <code>&amp;quot;</code> → <code>"</code> (double quote)
        </li>
        <li>
          <code>&amp;apos;</code> → <code>'</code> (single quote / apostrophe)
        </li>
      </ul>
      <p>
        When the browser encounters these entity sequences, it renders the
        corresponding character but crucially, it doesn't interpret them as HTML
        tags or attribute delimiters.
      </p>
      <p>
        Our <a href="/tools/html-entity-encoder">HTML Entity Encoder</a>{" "}
        converts text to its HTML-safe encoded form and decodes entities back to
        plain text.
      </p>

      <h2>Why this matters for security</h2>
      <p>
        If a user submits the text{" "}
        <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code> to a comment
        form, and your application displays this text without encoding, the
        browser executes it as JavaScript. This is a basic reflected or stored
        XSS attack.
      </p>
      <p>
        Encoding the output converting <code>&lt;</code> to{" "}
        <code>&amp;lt;</code> and <code>&gt;</code> to <code>&amp;gt;</code>{" "}
        before rendering means the browser displays the text literally rather
        than executing it as code. The user sees the script text; nothing
        executes.
      </p>
      <p>
        This is why HTML encoding is a fundamental security practice, not
        optional. Any content from user input, external APIs, databases, or any
        untrusted source must be encoded before being inserted into an HTML
        page.
      </p>

      <h2>Common characters and their entities</h2>
      <p>
        Beyond the security-critical five, some entities commonly needed for
        correct display:
      </p>
      <ul>
        <li>
          <code>&amp;nbsp;</code> non-breaking space (prevents line break at
          that position)
        </li>
        <li>
          <code>&amp;copy;</code> → © (copyright)
        </li>
        <li>
          <code>&amp;reg;</code> → ® (registered trademark)
        </li>
        <li>
          <code>&amp;trade;</code> → ™ (trademark)
        </li>
        <li>
          <code>&amp;mdash;</code> → (em dash)
        </li>
        <li>
          <code>&amp;ndash;</code> → – (en dash)
        </li>
        <li>
          <code>&amp;hellip;</code> → … (ellipsis)
        </li>
        <li>
          <code>&amp;euro;</code> → € (euro sign)
        </li>
        <li>
          <code>&amp;pound;</code> → £ (pound sign)
        </li>
      </ul>
      <p>
        Many of these typographic entities are also representable directly with
        their UTF-8 characters in modern HTML{" "}
        <code>&lt;meta charset="UTF-8"&gt;</code> makes the character set
        explicit, and modern browsers handle Unicode characters correctly. For
        the security-critical angle brackets and ampersands, always use entities
        regardless.
      </p>

      <h2>When to encode vs when to allow HTML</h2>
      <p>
        The default should be: encode everything. Exceptions are when you're
        intentionally allowing users to submit HTML a rich text editor, a CMS, a
        documentation system. In these cases, don't rely on encoding; instead,
        sanitise the HTML using a library that strips dangerous elements and
        attributes while preserving safe ones (like DOMPurify for JavaScript).
        Encoding and sanitising are different operations for different contexts.
      </p>

      <h2>Encoding in different contexts</h2>
      <p>
        HTML encoding is for HTML contexts (between tags, in text content).
        Different encoding is needed in other contexts:
      </p>
      <ul>
        <li>
          <strong>JavaScript:</strong> Use JSON encoding for data passed to
          JavaScript, or a dedicated JavaScript escape function.
        </li>
        <li>
          <strong>URLs:</strong> Use{" "}
          <a href="/tools/url-encoder-decoder">URL encoding</a> for values in
          URL parameters.
        </li>
        <li>
          <strong>CSS:</strong> Avoid user content in CSS property values
          entirely.
        </li>
        <li>
          <strong>SQL:</strong> Use parameterised queries, never string
          concatenation.
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>Is HTML entity encoding enough to prevent XSS?</h3>
      <p>
        It's the primary defence for text content rendered between HTML tags.
        But XSS vectors exist in other contexts attribute values, script blocks,
        CSS, URLs where different encoding or sanitisation strategies are
        needed. Output encoding in context is part of a defence-in-depth
        approach; don't rely on it as the only measure.
      </p>

      <h3>Should I use named entities or numeric entities?</h3>
      <p>
        Named entities (<code>&amp;lt;</code>) are more readable and broadly
        supported. Numeric decimal entities (<code>&amp;#60;</code>) and hex
        entities (<code>&amp;#x3C;</code>) are equivalent and useful when a
        named entity doesn't exist or you need to represent an arbitrary Unicode
        code point.
      </p>

      <h3>
        Why does <code>&amp;nbsp;</code> cause layout issues sometimes?
      </h3>
      <p>
        Non-breaking spaces prevent word-wrap at that position. Overusing them
        for spacing can cause text to overflow containers. For layout spacing,
        use CSS margin and padding rather than <code>&amp;nbsp;</code> it's a
        typographic tool for specific places where a line break would be wrong,
        not a general-purpose spacer.
      </p>

      <h2>Conclusion</h2>
      <p>
        HTML entity encoding is the first line of defence against XSS and
        necessary for correct display of special characters. Encode any
        untrusted content before inserting it into HTML. Use the{" "}
        <a href="/tools/html-entity-encoder">HTML Entity Encoder</a> to convert
        text to its safe form or decode entities from source code. For
        user-generated HTML, use a proper sanitisation library rather than
        encoding alone.
      </p>
    </>
  );
}
