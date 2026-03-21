// src/app/blog/content/text-case-styles-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        Text case might seem like a formatting detail, but in software
        development, design, and content production it's a genuine source of
        errors, inconsistency, and wasted time. camelCase, snake_case,
        PascalCase, kebab-case these aren't interchangeable. Different systems
        and style guides require specific conventions, and mixing them up in the
        wrong place breaks code, confuses APIs, and makes your work look sloppy.
      </p>
      <p>
        Here's a clear breakdown of each case style, where each one belongs, and
        how to convert between them quickly.
      </p>

      <h2>The main text case styles and where they're used</h2>

      <h3>camelCase</h3>
      <p>
        Each word starts with a capital letter except the first:{" "}
        <code>myVariableName</code>, <code>getUserData</code>,{" "}
        <code>isActiveUser</code>. The standard for variable and function names
        in JavaScript, Java, Swift, and many other languages. If you're writing
        frontend code and naming a function, camelCase is almost certainly the
        right choice.
      </p>

      <h3>PascalCase (UpperCamelCase)</h3>
      <p>
        Like camelCase but with the first word capitalised too:{" "}
        <code>MyComponent</code>, <code>UserProfile</code>,{" "}
        <code>HttpRequest</code>. Used for class names and component names in
        most languages React components must be PascalCase, C# classes are
        PascalCase by convention, TypeScript interfaces often use it.
      </p>

      <h3>snake_case</h3>
      <p>
        Words separated by underscores, all lowercase: <code>user_name</code>,{" "}
        <code>created_at</code>, <code>total_price</code>. Standard for Python
        variables and functions, database column names, and many API response
        fields. If you're designing a database schema or writing Python, this is
        your default.
      </p>

      <h3>SCREAMING_SNAKE_CASE</h3>
      <p>
        All uppercase with underscores: <code>MAX_RETRY_COUNT</code>,{" "}
        <code>API_BASE_URL</code>, <code>DEFAULT_TIMEOUT</code>. Used
        universally for constants and environment variables. Immediately signals
        to any developer reading the code that this value shouldn't change.
      </p>

      <h3>kebab-case</h3>
      <p>
        Words separated by hyphens, all lowercase: <code>my-component</code>,{" "}
        <code>user-profile</code>, <code>background-color</code>. Standard for
        CSS class names, HTML attributes, URL slugs, and file names in web
        projects. URLs are kebab-case by convention "how-to-write-a-blog-post"
        not "how_to_write_a_blog_post".
      </p>

      <h3>Title Case and Sentence case</h3>
      <p>
        Title Case capitalises every major word: "The Best Tools for Writers".
        Sentence case capitalises only the first word and proper nouns: "The
        best tools for writers". These are content formatting conventions rather
        than programming ones used in headings, titles, UI labels, and
        headlines. Style guides differ on exactly which words to capitalise in
        Title Case, but the distinction between these two is clear.
      </p>

      <h2>Why getting case wrong causes real problems</h2>
      <p>
        In programming, case sensitivity is literal. A component named{" "}
        <code>userCard</code> is different from <code>UserCard</code>. A
        database column called <code>userId</code> won't match a query looking
        for <code>user_id</code>. URLs are case-sensitive on most servers{" "}
        <code>/Blog/Post</code> and <code>/blog/post</code> are different paths.
      </p>
      <p>
        For content work, inconsistent capitalisation in titles and headings
        looks unprofessional and, in some contexts (formal documents, editorial
        style guides), signals that no one's applied consistent standards.
      </p>

      <h2>Converting between cases quickly</h2>
      <p>
        If you're converting variable names from a Python backend (snake_case)
        to a JavaScript frontend (camelCase), or preparing content headings that
        need to match a style guide, doing it manually is slow and error-prone.
        Our <a href='/tools/text-case-converter'>Text Case Converter</a>{" "}
        converts between all major case styles instantly paste your text, pick
        the output format, done.
      </p>
      <p>
        For bulk work converting a list of database column names to camelCase
        for a JavaScript object, for example paste the whole list and convert in
        one operation.
      </p>

      <h2>FAQ</h2>

      <h3>Does Google care about URL case?</h3>
      <p>
        Yes and no. Google recommends lowercase URLs and treats uppercase and
        lowercase versions as separate URLs (which can create duplicate content
        issues). Stick to lowercase kebab-case for all URL slugs. Canonicalise
        if you've already published mixed-case URLs.
      </p>

      <h3>What case should I use for file names?</h3>
      <p>
        Use lowercase kebab-case for web assets (images, CSS, JS files) this
        avoids case sensitivity issues on Linux servers and keeps URLs
        predictable. For code files, follow the language convention: PascalCase
        for React components, snake_case for Python modules.
      </p>

      <h3>What's the difference between Title Case and Headline Case?</h3>
      <p>
        They're essentially the same thing. "Headline case" is the term more
        commonly used in journalism; "Title Case" is used in publishing and
        general style guides. Both capitalise major words and leave articles,
        prepositions, and conjunctions lowercase (unless they're the first
        word).
      </p>

      <h2>Conclusion</h2>
      <p>
        Text case isn't trivial. Using the right convention in the right context
        prevents bugs, avoids duplicate content issues in URLs, and keeps your
        work consistent with the style standards your audience expects. Use the{" "}
        <a href='/tools/text-case-converter'>Text Case Converter</a> to
        eliminate the manual work of reformatting between styles.
      </p>
    </>
  );
}
