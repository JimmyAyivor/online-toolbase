// src/app/blog/content/how-to-format-and-validate-json.tsx
export default function Post() {
  return (
    <>
      <p>
        JSON is everywhere in modern development API responses, configuration
        files, data storage, webhooks, environment variables. It's also one of
        the most frustrating formats to debug because a single misplaced comma,
        an unclosed bracket, or an unescaped character silently breaks
        everything. Knowing how to format and validate JSON quickly is a basic
        skill for anyone working with web APIs, backend services, or data
        pipelines.
      </p>

      <h2>JSON syntax rules that trip people up</h2>
      <p>
        JSON (JavaScript Object Notation) has strict syntax rules that differ
        from the JavaScript object literals it's based on:
      </p>
      <ul>
        <li>
          <strong>All keys must be quoted with double quotes.</strong>{" "}
          <code>{`{ name: "Alice" }`}</code> is valid JavaScript but invalid
          JSON. It must be <code>{`{ "name": "Alice" }`}</code>.
        </li>
        <li>
          <strong>No trailing commas.</strong>{" "}
          <code>{`{ "a": 1, "b": 2, }`}</code> is invalid JSON. The trailing
          comma after the last property is a syntax error, even though most
          JavaScript engines accept it.
        </li>
        <li>
          <strong>No comments.</strong> JSON does not support comments neither{" "}
          <code>//</code> nor <code>/* */</code>. This surprises developers
          accustomed to JSONC (JSON with Comments) used in some config tools
          like VS Code settings.
        </li>
        <li>
          <strong>Strings must use double quotes.</strong> Single-quoted strings
          are invalid in JSON.
        </li>
        <li>
          <strong>Numbers cannot have leading zeros.</strong> <code>007</code>{" "}
          is not valid JSON. <code>7</code> is.
        </li>
      </ul>

      <h2>Why formatting matters beyond aesthetics</h2>
      <p>
        Minified JSON all on one line with no whitespace is compact and fast to
        transmit, but impossible to read or debug. Formatted (pretty-printed)
        JSON with consistent indentation makes structure visible immediately:
        you can see nesting levels, identify where arrays end and objects begin,
        and spot structural errors that are invisible in a minified string.
      </p>
      <p>
        Our{" "}
        <a href="/tools/json-formatter-validator">JSON Formatter & Validator</a>{" "}
        formats minified JSON into readable indented output and validates the
        syntax simultaneously flagging the specific line and character where any
        error occurs.
      </p>

      <h2>Common JSON validation errors and fixes</h2>

      <h3>Unexpected token</h3>
      <p>
        Usually means a character that doesn't belong at that position often a
        trailing comma, a single-quoted string, or a missing comma between
        properties. The error message usually includes the position; go to that
        character in the raw JSON and look at what's immediately around it.
      </p>

      <h3>Unterminated string</h3>
      <p>
        A string was opened with a double quote but never closed, or contains an
        unescaped double quote inside it. To include a literal double quote
        inside a JSON string, escape it: <code>\"</code>. Newlines inside
        strings need to be escaped as <code>\n</code>.
      </p>

      <h3>Unexpected end of JSON input</h3>
      <p>
        The JSON ended before the structure was complete an unclosed bracket{" "}
        <code>[</code>, brace <code>{`{`}</code>, or string. This often happens
        when JSON gets truncated during transmission or copy-paste. Check that
        all opened structures have matching closes.
      </p>

      <h2>Minifying vs formatting: when to use each</h2>
      <p>
        <strong>Formatted JSON</strong> is for human reading: debugging, code
        review, documentation, and any time you need to understand the
        structure. Always store and review JSON in formatted form when humans
        need to work with it.
      </p>
      <p>
        <strong>Minified JSON</strong> is for machine consumption: API
        responses, files transmitted over the network, data stored in
        performance-sensitive contexts. Removing whitespace reduces file size
        (sometimes significantly for large objects) and marginally improves
        parse speed.
      </p>
      <p>
        In practice, most developers format for development and let the server
        or build process minify for production. Never manually minify JSON use a
        tool. Manually removing whitespace from complex JSON almost always
        introduces errors.
      </p>

      <h2>JSON vs JSON5 vs JSONC</h2>
      <p>
        Standard JSON is strict. Several extensions exist that relax the rules
        for human-authored configuration files:
      </p>
      <ul>
        <li>
          <strong>JSON5:</strong> Allows single quotes, trailing commas,
          comments, and unquoted keys. Used by some build tools and config
          files. Not valid JSON parsers need to explicitly support JSON5.
        </li>
        <li>
          <strong>JSONC:</strong> JSON with Comments. Adds <code>//</code> and{" "}
          <code>/* */</code> comment support. Used by VS Code, TypeScript config
          files, and other developer tools.
        </li>
      </ul>
      <p>
        If you're working with <code>.json5</code> or <code>.jsonc</code> files
        and seeing "invalid JSON" errors, check whether your parser supports the
        extension format.
      </p>

      <h2>Working with JSON in APIs</h2>
      <p>
        When debugging API responses, pasting the raw response body into a
        formatter immediately makes the structure readable. Combine this with
        our <a href="/tools/jwt-decoder">JWT Decoder</a> if the API uses JWT
        authentication decode the token to inspect its claims alongside the
        response data.
      </p>

      <h2>FAQ</h2>

      <h3>Can JSON contain null values?</h3>
      <p>
        Yes. <code>null</code> is a valid JSON value (alongside strings,
        numbers, booleans, objects, and arrays).{" "}
        <code>{`{ "middle_name": null }`}</code> is valid JSON.
      </p>

      <h3>What's the maximum size of a valid JSON file?</h3>
      <p>
        The JSON specification has no size limit. Practical limits come from the
        parser or the runtime environment browser JavaScript engines can handle
        JSON in the hundreds of megabytes, though performance degrades with very
        large files. Server-side limits vary by framework configuration.
      </p>

      <h3>Is JSON the same as a JavaScript object?</h3>
      <p>
        No they overlap significantly but aren't identical. JSON is a
        serialisation format (text); a JavaScript object is an in-memory data
        structure. JavaScript can parse JSON into objects and serialise objects
        back to JSON, but the rules differ (JSON requires quoted keys, double
        quotes, no functions, no undefined values).
      </p>

      <h2>Conclusion</h2>
      <p>
        Formatting and validating JSON is a routine development task that pays
        for itself immediately in debugging time saved. Use the{" "}
        <a href="/tools/json-formatter-validator">JSON Formatter & Validator</a>{" "}
        whenever you're working with raw JSON format before reading, validate
        before debugging, and never try to read minified JSON with the naked
        eye.
      </p>
    </>
  );
}
