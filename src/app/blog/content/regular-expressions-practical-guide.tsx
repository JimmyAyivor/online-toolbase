// src/app/blog/content/regular-expressions-practical-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        Regular expressions have a reputation for being unreadable and honestly,
        a poorly written regex earns that reputation. But for the problems
        they're designed to solve, they're faster, more precise, and more
        reliable than the string manipulation alternatives. Knowing the core
        syntax and the most useful patterns gives you a tool that pays for
        itself constantly in validation, parsing, and text processing tasks.
      </p>

      <h2>What regular expressions are for</h2>
      <p>
        A regular expression (regex) is a pattern that describes a set of
        strings. It can be used to:
      </p>
      <ul>
        <li>
          <strong>Test</strong> whether a string matches a pattern (input
          validation)
        </li>
        <li>
          <strong>Find</strong> occurrences of a pattern in text (search)
        </li>
        <li>
          <strong>Extract</strong> matched portions from a larger string
          (parsing)
        </li>
        <li>
          <strong>Replace</strong> matched content with something else
          (transformation)
        </li>
      </ul>
      <p>
        Our <a href="/tools/regex-tester">Regex Tester</a> lets you write a
        pattern, test it against sample text, and see matches highlighted in
        real time the fastest way to build and debug regex patterns.
      </p>

      <h2>Core syntax: the building blocks</h2>

      <h3>Literals and the dot</h3>
      <p>
        Most characters match themselves: the pattern <code>cat</code> matches
        the string "cat" wherever it appears. The dot (<code>.</code>) is a
        wildcard that matches any single character except a newline:{" "}
        <code>c.t</code> matches "cat", "cut", "c3t", "c t".
      </p>

      <h3>Character classes</h3>
      <p>
        Square brackets define a character class match any one character from
        the set: <code>[aeiou]</code> matches any vowel. <code>[0-9]</code>{" "}
        matches any digit. <code>[a-zA-Z]</code> matches any letter. The caret
        inside a class negates it: <code>[^0-9]</code> matches anything that
        isn't a digit.
      </p>

      <h3>Shorthand character classes</h3>
      <ul>
        <li>
          <code>\d</code> digit, equivalent to <code>[0-9]</code>
        </li>
        <li>
          <code>\w</code> word character (letter, digit, or underscore),
          equivalent to <code>[a-zA-Z0-9_]</code>
        </li>
        <li>
          <code>\s</code> whitespace (space, tab, newline)
        </li>
        <li>
          Uppercase versions (<code>\D</code>, <code>\W</code>, <code>\S</code>)
          are the negation of each
        </li>
      </ul>

      <h3>Quantifiers</h3>
      <ul>
        <li>
          <code>*</code> zero or more
        </li>
        <li>
          <code>+</code> one or more
        </li>
        <li>
          <code>?</code> zero or one (makes the preceding element optional)
        </li>
        <li>
          <code>{`{n}`}</code> exactly n times
        </li>
        <li>
          <code>{`{n,m}`}</code> between n and m times
        </li>
      </ul>

      <h3>Anchors</h3>
      <p>
        <code>^</code> matches the start of a string (or line in multiline
        mode). <code>$</code> matches the end. <code>^hello$</code> matches only
        the string "hello" nothing before or after.
      </p>

      <h3>Groups and alternatives</h3>
      <p>
        Parentheses create groups: <code>(cat|dog)</code> matches either "cat"
        or "dog". Groups can be referenced in replacements and captured for
        extraction. Non-capturing groups (<code>(?:...)</code>) group without
        capturing, useful when you need grouping for quantifiers but don't need
        the captured value.
      </p>

      <h2>Practical patterns you'll actually use</h2>

      <h3>Email validation (simplified)</h3>
      <p>
        <code>/^[^\s@]+@[^\s@]+\.[^\s@]+$/</code> basic pattern checking for the
        structure of an email address. Not RFC-5321 compliant (real email
        validation is surprisingly complex) but catches obvious formatting
        errors reliably.
      </p>

      <h3>UK postcode</h3>
      <p>
        <code>
          /^[A-Z]{"{1,2}"}[0-9][0-9A-Z]?\s?[0-9][A-Z]{"{2}"}$/i
        </code>{" "}
        validates the structure of a UK postcode. The <code>i</code> flag makes
        it case-insensitive.
      </p>

      <h3>URL matching</h3>
      <p>
        <code>/https?:\/\/[^\s]+/g</code> finds URLs starting with http or
        https. The <code>?</code> after the "s" makes it optional (matches both
        http and https). The <code>g</code> flag finds all matches in the
        string.
      </p>

      <h3>Strip HTML tags</h3>
      <p>
        <code>/&lt;[^&gt;]*&gt;/g</code> matches HTML tags and can be used to
        strip them from a string. Not suitable for parsing HTML (use a proper
        parser for that), but fine for sanitising simple strings.
      </p>

      <h2>Common mistakes and how to avoid them</h2>
      <p>
        <strong>Greedy vs lazy matching:</strong> By default, quantifiers are
        greedy they match as much as possible. <code>&lt;.+&gt;</code> on{" "}
        <code>&lt;b&gt;text&lt;/b&gt;</code> will match the entire string{" "}
        <code>&lt;b&gt;text&lt;/b&gt;</code>, not just <code>&lt;b&gt;</code>.
        Add <code>?</code> to make it lazy: <code>&lt;.+?&gt;</code> matches{" "}
        <code>&lt;b&gt;</code> and stops.
      </p>
      <p>
        <strong>Forgetting to escape special characters:</strong> Characters
        like <code>.</code>, <code>*</code>, <code>+</code>, <code>?</code>,{" "}
        <code>(</code>, <code>)</code>, <code>[</code>, <code>{`{`}</code> have
        special meaning in regex. To match a literal dot, write <code>\.</code>.
        To match a literal bracket, write <code>\[</code>.
      </p>

      <h2>FAQ</h2>

      <h3>Are regex patterns the same in every language?</h3>
      <p>
        Core syntax is broadly similar across languages, but there are
        differences in supported features, flags, and edge case behaviour.
        Python, JavaScript, PHP, and Java all support standard regex with minor
        variations. PCRE (Perl-Compatible Regular Expressions) is the most
        widely used engine. Test in the language and engine you'll actually
        deploy.
      </p>

      <h3>When should I not use regex?</h3>
      <p>
        Parsing structured formats like HTML, XML, or JSON. These formats have
        nesting that regex can't handle correctly use proper parsers for them.
        Also avoid regex for complex business logic where the pattern would be
        so elaborate that it becomes unmaintainable. Sometimes a few lines of
        explicit string manipulation are clearer than a dense regex.
      </p>

      <h3>How do I make my regex case-insensitive?</h3>
      <p>
        Add the <code>i</code> flag after the pattern: <code>/pattern/i</code>{" "}
        in JavaScript, <code>re.compile("pattern", re.IGNORECASE)</code> in
        Python. Case-insensitive matching is one of the most commonly used
        flags.
      </p>

      <h2>Conclusion</h2>
      <p>
        Regular expressions reward investment. The initial learning curve is
        real, but the core patterns cover the vast majority of practical use
        cases. Use the <a href="/tools/regex-tester">Regex Tester</a> to build
        patterns iteratively write the pattern, test against real examples,
        refine until it matches what you need and nothing else, then copy to
        your code.
      </p>
    </>
  );
}
