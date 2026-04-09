// src/app/blog/content/url-encoding-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        URL encoding is one of those things that works silently most of the time
        until it doesn't. You paste a URL with spaces into a browser, the spaces
        become <code>%20</code>, and everything works fine. But then you try to
        pass a URL as a query parameter in another URL and suddenly half the
        destination URL gets mangled. Understanding how URL encoding works
        prevents a whole category of frustrating bugs.
      </p>

      <h2>Why URLs need encoding</h2>
      <p>
        URLs can only contain a specific set of characters: letters (A–Z, a–z),
        digits (0–9), and a handful of special characters (<code>-</code>,{" "}
        <code>_</code>, <code>.</code>, <code>~</code>). Every other character
        spaces, punctuation, non-ASCII characters, many symbols must be encoded
        before being included in a URL.
      </p>
      <p>
        The encoding scheme is straightforward: replace the character with a{" "}
        <code>%</code> followed by its two-digit hexadecimal ASCII code. Space
        becomes <code>%20</code>, <code>&amp;</code> becomes <code>%26</code>,{" "}
        <code>=</code> becomes <code>%3D</code>, <code>/</code> becomes{" "}
        <code>%2F</code>.
      </p>

      <h2>Percent encoding vs application/x-www-form-urlencoded</h2>
      <p>
        There are two related but different encoding schemes commonly
        encountered:
      </p>
      <ul>
        <li>
          <strong>Percent encoding (RFC 3986):</strong> The standard for
          encoding characters in URLs. Space → <code>%20</code>.
        </li>
        <li>
          <strong>Form encoding (application/x-www-form-urlencoded):</strong>{" "}
          Used when HTML forms submit data. Nearly identical to percent
          encoding, but spaces are encoded as <code>+</code> rather than{" "}
          <code>%20</code>. This is why you sometimes see <code>+</code> signs
          in query strings.
        </li>
      </ul>
      <p>
        This difference causes subtle bugs: if you build a URL manually using
        form-encoded data and then use it in a context expecting percent
        encoding, the <code>+</code> characters may be interpreted as literal
        plus signs rather than spaces.
      </p>
      <p>
        Our <a href="/tools/url-encoder-decoder">URL Encoder/Decoder</a> handles
        both standards so you can encode and decode in whichever format your
        context requires.
      </p>

      <h2>When you need to URL-encode</h2>

      <h3>Query parameters containing special characters</h3>
      <p>
        Query string parameters frequently contain values with characters that
        are reserved in URLs. The <code>&amp;</code> character separates
        parameters (<code>?name=Alice&amp;age=30</code>) if a parameter value
        itself contains <code>&amp;</code>, it must be encoded as{" "}
        <code>%26</code> or the URL will be parsed incorrectly. Same for{" "}
        <code>=</code>, <code>+</code>, <code>#</code>, and others.
      </p>

      <h3>Passing a URL as a parameter in another URL</h3>
      <p>
        This is the classic case that breaks things. If your redirect URL is{" "}
        <code>
          https://example.com/redirect?to=https://destination.com/page?id=123&amp;ref=abc
        </code>
        , the second URL's <code>?</code> and <code>&amp;</code> will be
        interpreted as part of the outer URL structure. Encode the destination
        URL first: the <code>?</code> becomes <code>%3F</code>, the{" "}
        <code>&amp;</code> becomes <code>%26</code>.
      </p>

      <h3>Non-ASCII characters in URLs</h3>
      <p>
        URLs containing non-ASCII characters accented letters, CJK characters,
        Arabic, emoji must be encoded using UTF-8 percent encoding. A URL like{" "}
        <code>https://example.com/über</code> becomes{" "}
        <code>https://example.com/%C3%BCber</code>. Modern browsers handle this
        display translation automatically, but when constructing URLs
        programmatically you need to encode explicitly.
      </p>

      <h2>Encoding in JavaScript</h2>
      <p>
        JavaScript has three encoding functions, and using the wrong one is a
        common source of bugs:
      </p>
      <ul>
        <li>
          <code>encodeURIComponent()</code> encodes everything except letters,
          digits, and <code>- _ . ! ~ * ' ( )</code>. Use this for encoding
          individual parameter values.
        </li>
        <li>
          <code>encodeURI()</code> encodes everything except characters valid in
          a complete URL structure. Use this for encoding a full URL while
          preserving its structure.
        </li>
        <li>
          <code>escape()</code> deprecated, doesn't handle Unicode correctly.
          Don't use it.
        </li>
      </ul>
      <p>
        The most common mistake: using <code>encodeURI()</code> on a parameter
        value. It won't encode <code>/</code>, <code>?</code>,{" "}
        <code>&amp;</code>, or <code>=</code>, because those are structurally
        valid in a full URL but they're wrong inside a parameter value.
      </p>

      <h2>Decoding encoded URLs</h2>
      <p>
        When debugging API calls, analysing server logs, or inspecting redirect
        chains, URL-encoded strings are hard to read. Decoding them reveals the
        original values. Paste encoded URLs into the{" "}
        <a href="/tools/url-encoder-decoder">URL Decoder</a> to see them in
        readable form useful when tracking down parameter parsing bugs or
        analysing tracking URLs in marketing campaigns.
      </p>

      <h2>FAQ</h2>

      <h3>
        What's the difference between <code>%20</code> and <code>+</code> for
        spaces?
      </h3>
      <p>
        Both represent spaces in URL contexts, but in different schemes.{" "}
        <code>%20</code> is the standard percent-encoded form for use in URL
        paths and general contexts. <code>+</code> represents a space only in
        query strings using form encoding (
        <code>application/x-www-form-urlencoded</code>). In URL paths, a literal{" "}
        <code>+</code> is just a plus sign, not a space.
      </p>

      <h3>Do I need to encode forward slashes in path segments?</h3>
      <p>
        Only if the slash is part of a value, not part of the path structure. A
        URL path like <code>/users/123</code> doesn't need the slashes encoded
        they're structural. But a file name containing a slash that's part of a
        parameter value (<code>?file=folder/name.txt</code>) should have the
        slash encoded as <code>%2F</code>.
      </p>

      <h3>
        Why do some URLs have both <code>%20</code> and <code>+</code> for
        spaces?
      </h3>
      <p>
        Usually because parts of the URL came from different encoding contexts a
        form submission for the query string, and a manually constructed path.
        Consistent encoding throughout a URL is the right approach; mixing
        encoding schemes can cause unpredictable parsing behaviour.
      </p>

      <h2>Conclusion</h2>
      <p>
        URL encoding is a small piece of web fundamentals that causes
        disproportionate confusion when it breaks. The core principle is simple:
        anything that isn't a letter, digit, or a handful of safe symbols needs
        to be percent-encoded before going into a URL. Use the{" "}
        <a href="/tools/url-encoder-decoder">URL Encoder/Decoder</a> for quick
        encoding, decoding, and debugging and use{" "}
        <code>encodeURIComponent()</code> in JavaScript when constructing
        parameter values programmatically.
      </p>
    </>
  );
}
