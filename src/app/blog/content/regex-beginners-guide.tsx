// src/app/blog/content/regex-beginners-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        Regex has a reputation for being impenetrable, and it's not entirely
        undeserved. A pattern like{" "}
        <code>{"/^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/"}</code> does look like
        line noise if you haven't spent time with the syntax. But here's the
        thing: you don't need to understand every possible regex pattern. You
        need to understand about 12 core concepts, and those cover the vast
        majority of real-world use cases.
      </p>
      <p>
        This guide covers those 12 concepts in plain English, with examples
        you'll actually encounter.
      </p>

      <h2>What regex actually does</h2>
      <p>
        A regular expression is a pattern that describes a set of strings. You
        write the pattern; the regex engine finds text that matches it. That's
        it.
      </p>
      <p>
        Where regex is used: validating user input (email addresses, phone
        numbers, postcodes), extracting data from text (finding all URLs in a
        document, pulling prices from HTML), search and replace in text editors,
        parsing log files, routing in web frameworks, data cleaning in
        scripting.
      </p>

      <h2>The 12 concepts that cover most real-world regex</h2>

      <h3>1. Literal characters</h3>
      <p>
        A letter or digit in a pattern matches itself. <code>/cat/</code>{" "}
        matches the string "cat" wherever it appears. <code>/2025/</code>{" "}
        matches "2025".
      </p>

      <h3>2. The dot (.)</h3>
      <p>
        A dot matches any single character except a newline. <code>/c.t/</code>{" "}
        matches "cat", "cut", "c5t", "c t". If you want to match a literal dot,
        escape it: <code>/\./</code>.
      </p>

      <h3>3. Character classes ([ ])</h3>
      <p>
        Square brackets match any one character from the set inside.{" "}
        <code>/[aeiou]/</code> matches any vowel. <code>/[0-9]/</code> matches
        any digit. <code>/[a-zA-Z]/</code> matches any letter.{" "}
        <code>[^abc]</code> with a caret inside means "any character except a,
        b, or c".
      </p>

      <h3>4. Shorthand character classes</h3>
      <ul>
        <li>
          <code>\d</code> any digit (0–9). Same as <code>[0-9]</code>.
        </li>
        <li>
          <code>\w</code> any word character (letters, digits, underscore). Same
          as <code>[a-zA-Z0-9_]</code>.
        </li>
        <li>
          <code>\s</code> any whitespace character (space, tab, newline).
        </li>
        <li>
          Uppercase versions are the inverse: <code>\D</code> = non-digit,{" "}
          <code>\W</code> = non-word character, <code>\S</code> =
          non-whitespace.
        </li>
      </ul>

      <h3>5. Quantifiers</h3>
      <ul>
        <li>
          <code>*</code> zero or more times
        </li>
        <li>
          <code>+</code> one or more times
        </li>
        <li>
          <code>?</code> zero or one time (makes something optional)
        </li>
        <li>
          <code>{`{3}`}</code> exactly 3 times
        </li>
        <li>
          <code>{`{2,5}`}</code> between 2 and 5 times
        </li>
        <li>
          <code>{`{3,}`}</code> 3 or more times
        </li>
      </ul>

      <h3>6. Anchors</h3>
      <p>
        <code>^</code> matches the start of a string. <code>$</code> matches the
        end. <code>/^hello/</code> only matches strings that begin with "hello".{" "}
        <code>/world$/</code> only matches strings ending with "world".{" "}
        <code>/^hello world$/</code> matches only exactly "hello world".
      </p>

      <h3>7. Alternation (|)</h3>
      <p>
        The pipe means "or". <code>/cat|dog/</code> matches either "cat" or
        "dog". <code>/(jpg|jpeg|png|webp)/</code> matches any of those file
        extensions.
      </p>

      <h3>8. Groups ()</h3>
      <p>
        Parentheses group parts of a pattern and capture the matched text.{" "}
        <code>
          /(\d{4})-(\d{2})-(\d{2})/
        </code>{" "}
        matches a date like "2025-01-15" and captures year, month, and day as
        three separate groups you can reference.
      </p>

      <h3>9. Non-capturing groups (?:)</h3>
      <p>
        <code>(?:pattern)</code> groups without capturing. Use this when you
        need the grouping for logic but don't need to reference the captured
        text it's slightly more performant and avoids cluttering your capture
        group indices.
      </p>

      <h3>10. Flags</h3>
      <ul>
        <li>
          <code>i</code> case insensitive. <code>/hello/i</code> matches
          "hello", "Hello", "HELLO".
        </li>
        <li>
          <code>g</code> global. Find all matches, not just the first one.
        </li>
        <li>
          <code>m</code> multiline. Makes <code>^</code> and <code>$</code>{" "}
          match the start/end of each line, not just the whole string.
        </li>
        <li>
          <code>s</code> dotAll. Makes <code>.</code> match newlines too.
        </li>
      </ul>

      <h3>11. Lookahead and lookbehind</h3>
      <p>
        These are zero-width assertions they check for something without
        including it in the match. <code>/price(?= USD)/</code> matches "price"
        only when it's followed by " USD", but the " USD" isn't part of the
        match. <code>/(?&lt;=£)\d+/</code> matches digits preceded by a £ sign.
      </p>

      <h3>12. Escaping special characters</h3>
      <p>
        The characters <code>. * + ? ^ $ {} [ ] | ( ) \</code> have special
        meaning in regex. To match them literally, prefix with a backslash.{" "}
        <code>/\./</code> matches a literal dot. <code>/\$/</code> matches a
        dollar sign. <code>/\(/</code> matches an opening parenthesis.
      </p>

      <h2>Putting it together: real examples</h2>
      <p>
        Email address (simplified):{" "}
        <code>/^[\w.-]+@[\w.-]+\.[a-zA-Z]{`{2,}`}$/</code>
      </p>
      <p>
        UK postcode:{" "}
        <code>
          /^[A-Z]{`{1,2}`}\d[A-Z\d]? ?\d[A-Z]{`{2}`}$/i
        </code>
      </p>
      <p>
        Extract all URLs from text: <code>/https?:\/\/[^\s]+/g</code>
      </p>
      <p>
        Match a date format YYYY-MM-DD:{" "}
        <code>
          /\d{`{4}`}-\d{`{2}`}-\d{`{2}`}/
        </code>
      </p>

      <h2>The fastest way to learn</h2>
      <p>
        Regex is one of those things you learn by doing rather than reading.
        Open our <a href='/tools/regex-tester'>Regex Tester</a>, paste some text
        you want to match against, and start building a pattern. The live
        highlighting shows you exactly what each addition to the pattern
        changes. Twenty minutes of this is worth more than reading about regex
        for hours.
      </p>
    </>
  );
}
