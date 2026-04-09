// src/app/blog/content/json-explained-for-developers.tsx
export default function Post() {
  return (
    <>
      <p>
        JSON JavaScript Object Notation is the format that powers most of the
        web's data exchange. It's how your front-end talks to your API, how
        configuration files are structured, how many databases store and query
        documents, and how most webhooks deliver their payloads. If you work
        anywhere near the web, you've encountered JSON constantly.
      </p>
      <p>
        This guide covers what JSON actually is, how to read and write it
        correctly, the errors that trip people up, and when to consider
        something else.
      </p>

      <h2>What JSON is (and isn't)</h2>
      <p>
        JSON is a text-based format for representing structured data. It was
        derived from JavaScript object syntax, but it's language-independent you
        can parse and produce JSON in Python, Go, Rust, Ruby, or any other
        language with a JSON library. Which is basically all of them.
      </p>
      <p>
        JSON is <em>not</em> a JavaScript object. A JavaScript object is a
        runtime value in memory. JSON is a string a piece of text that follows
        specific formatting rules. When you write JSON to a file or send it over
        HTTP, it's text. When your language parses that text, it becomes a
        native data structure (a dictionary in Python, a struct in Go, an object
        in JavaScript).
      </p>

      <h2>The six data types JSON supports</h2>
      <ul>
        <li>
          <strong>String:</strong> Always double-quoted.{" "}
          <code>"hello world"</code>
        </li>
        <li>
          <strong>Number:</strong> Integer or decimal, no quotes.{" "}
          <code>42</code> or <code>3.14</code>
        </li>
        <li>
          <strong>Boolean:</strong> Lowercase only. <code>true</code> or{" "}
          <code>false</code>
        </li>
        <li>
          <strong>Null:</strong> Lowercase only. <code>null</code>
        </li>
        <li>
          <strong>Object:</strong> Key-value pairs in curly braces. Keys must be
          double-quoted strings. <code>{`{"name": "Alice", "age": 30}`}</code>
        </li>
        <li>
          <strong>Array:</strong> Ordered list in square brackets.{" "}
          <code>[1, 2, 3]</code> or <code>["a", "b", "c"]</code>
        </li>
      </ul>
      <p>
        Objects and arrays can be nested inside each other to arbitrary depth,
        which is how JSON represents complex hierarchical data.
      </p>

      <h2>What valid JSON looks like</h2>
      <pre>{`{
  "user": {
    "id": 1042,
    "name": "Alice Zhao",
    "email": "alice@example.com",
    "active": true,
    "tags": ["admin", "billing"],
    "lastLogin": null
  }
}`}</pre>
      <p>
        If you receive a blob of JSON from an API and can't read it, paste it
        into our{" "}
        <a href="/tools/json-formatter-validator">JSON Formatter & Validator</a>{" "}
        it prettifies, colour-codes, and validates the structure instantly.
      </p>

      <h2>The most common JSON syntax errors</h2>
      <p>
        JSON is stricter than most developers expect coming from JavaScript.
        These are the mistakes that break parsers:
      </p>
      <ul>
        <li>
          <strong>Single quotes on keys or strings.</strong> JSON requires
          double quotes. <code>{"{'name': 'Alice'}"}</code> is invalid.{" "}
          <code>{`"name": "Alice"`}</code> is valid.
        </li>
        <li>
          <strong>Trailing commas.</strong> <code>[1, 2, 3,]</code> is invalid
          JSON. Remove the comma after the last item.
        </li>
        <li>
          <strong>Comments.</strong> JSON doesn't support comments. No{" "}
          <code>//</code> or <code>/* */</code>. If you need a config format
          with comments, use YAML or TOML instead.
        </li>
        <li>
          <strong>Undefined values.</strong> <code>undefined</code> is a
          JavaScript concept. It doesn't exist in JSON. Use <code>null</code>{" "}
          for absent values.
        </li>
        <li>
          <strong>Unquoted keys.</strong> <code>{`{name: "Alice"}`}</code> is
          JavaScript object notation, not JSON. All keys must be quoted strings.
        </li>
        <li>
          <strong>NaN and Infinity.</strong> These JavaScript values aren't
          valid in JSON.
        </li>
      </ul>

      <h2>JSON vs XML: why JSON won</h2>
      <p>
        Before JSON became dominant, XML was the standard format for data
        exchange you may still encounter it in enterprise systems, SOAP APIs,
        and some older web services. JSON replaced XML for most web API use
        cases because it's:
      </p>
      <ul>
        <li>
          <strong>More compact.</strong> The same data takes significantly fewer
          bytes in JSON than in XML, which matters at scale.
        </li>
        <li>
          <strong>Easier to read and write.</strong> XML's angle-bracket syntax
          is verbose and harder to work with manually.
        </li>
        <li>
          <strong>Directly parseable in JavaScript.</strong>{" "}
          <code>JSON.parse()</code> and <code>JSON.stringify()</code> are
          built-in browser APIs.
        </li>
      </ul>

      <h2>JSON vs YAML: when YAML makes more sense</h2>
      <p>
        YAML is increasingly used for configuration files (Docker Compose,
        Kubernetes, GitHub Actions, CI/CD pipelines). It's more human-readable
        than JSON, supports comments, and doesn't require quotes around most
        strings. The tradeoff is that YAML's indentation-based syntax is more
        brittle whitespace matters and errors can be subtle.
      </p>
      <p>
        For data transfer between services: JSON. For human-written config files
        where readability and comments are important: YAML.
      </p>

      <h2>Working with JSON effectively</h2>
      <p>A few practical habits:</p>
      <ul>
        <li>
          Always validate JSON you receive from external sources before parsing
          it.
        </li>
        <li>
          Use a linter or validator in your editor to catch syntax errors before
          runtime.
        </li>
        <li>
          When debugging API responses, format the JSON first raw JSON is nearly
          unreadable at any complexity.
        </li>
        <li>
          Use <code>JSON.stringify(obj, null, 2)</code> in JavaScript to
          pretty-print objects for logging.
        </li>
      </ul>
      <p>
        For quick validation and formatting, our{" "}
        <a href="/tools/json-formatter-validator">JSON Formatter & Validator</a>{" "}
        accepts any JSON, points out exactly where errors are, and renders the
        structure clearly useful for debugging API responses without opening an
        IDE.
      </p>
    </>
  );
}
