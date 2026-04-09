// src/app/blog/content/when-to-spell-out-numbers-in-writing.tsx
export default function Post() {
  return (
    <>
      <p>
        Whether to write "7" or "seven" is one of those style decisions that
        looks trivial until you're editing a document with inconsistent usage
        and it suddenly looks very unprofessional. Style guides disagree on the
        specifics, which is why people get confused but the underlying
        principles are consistent enough that you can make confident decisions
        once you understand them.
      </p>

      <h2>The main style guide positions</h2>
      <p>The three most commonly followed guides take different approaches:</p>
      <ul>
        <li>
          <strong>AP Style (journalism, web content):</strong> Spell out one
          through nine; use numerals for 10 and above. Always use numerals for
          ages, percentages, and measurements.
        </li>
        <li>
          <strong>Chicago Manual of Style (books, academic):</strong> Spell out
          one through one hundred; use numerals for 101 and above. More
          conservative, appropriate for formal contexts.
        </li>
        <li>
          <strong>APA Style (psychology, social sciences):</strong> Use numerals
          for 10 and above; spell out zero through nine. Close to AP but with
          different rules for specific contexts.
        </li>
      </ul>
      <p>
        Most web content follows AP Style or a simplified version of it it's the
        most reader-friendly in digital contexts because numerals are easier to
        scan.
      </p>

      <h2>Rules that apply regardless of style guide</h2>

      <h3>Never start a sentence with a numeral</h3>
      <p>
        "12 people attended the meeting" should be either "Twelve people
        attended the meeting" or restructured as "A total of 12 people attended
        the meeting." This is universal across all major style guides. If a
        number absolutely must start a sentence and spelling it out is awkward,
        restructure the sentence.
      </p>

      <h3>Be consistent within a sentence or comparison</h3>
      <p>
        When numbers appear in the same sentence for comparison, use the same
        format: "We ordered 9 red chairs and 14 blue ones" (not "nine red chairs
        and 14 blue ones"). Consistency within a passage matters more than the
        specific threshold you've chosen.
      </p>

      <h3>Always use numerals for statistics, data, and measurements</h3>
      <p>
        "The conversion rate was 3.7%", "The package weighs 12kg", "The sample
        included 247 respondents." Numerals in data contexts improve precision
        and scannability. AP, Chicago, and APA all agree on this.
      </p>

      <h3>Spell out ordinals in formal text</h3>
      <p>
        "The first chapter", "her third attempt", "the twenty-first century" in
        formal writing, small ordinals are typically spelled out. In informal
        web writing, numerals with suffixes (1st, 3rd, 21st) are widely
        accepted.
      </p>

      <h2>Special cases worth knowing</h2>

      <h3>Fractions</h3>
      <p>
        Simple fractions in text are usually spelled out: "two-thirds of
        respondents", "a one-half share". Complex fractions use numerals: "37/64
        of the material". When mixing with whole numbers, use the numeral form
        throughout: "2½ hours" rather than "two and a half hours."
      </p>

      <h3>Large round numbers</h3>
      <p>
        "The company is valued at $2 billion" is clearer than "$2,000,000,000."
        Use words (thousand, million, billion) to represent large round numbers
        it's easier to read and avoids errors from miscounting zeros.
      </p>

      <h3>Dates and years</h3>
      <p>
        Always use numerals for years (2025, not two thousand and twenty-five).
        Days of the month are numerals (March 20), though style varies on
        whether to include ordinal suffixes (March 20th vs March 20).
      </p>

      <h2>Converting numbers to words in formal documents</h2>
      <p>
        For legal documents, financial certificates, and formal written
        agreements, it's standard practice to write amounts in both numerals and
        words: "The sum of $5,000 (five thousand dollars)." Our{" "}
        <a href="/tools/number-to-words-converter">Number to Words Converter</a>{" "}
        handles this conversion instantly for any number useful when drafting
        invoices, contracts, or cheques.
      </p>

      <h2>FAQ</h2>

      <h3>Which style guide should I follow for blog content?</h3>
      <p>
        AP Style is the most practical default for web content. It's the
        convention most readers are used to from online journalism, and it's
        more scannable than Chicago's more conservative approach.
      </p>

      <h3>Should I spell out "percent" or use the % symbol?</h3>
      <p>
        In technical and web content, the % symbol with a numeral is standard
        ("conversion rate of 3.7%"). In formal literary or academic writing,
        "percent" is written out ("a 12 percent increase"). AP Style uses the %
        symbol in most cases; Chicago spells it out in text.
      </p>

      <h3>What about telephone numbers and addresses?</h3>
      <p>
        Always use numerals for phone numbers and addresses these are
        identifiers, not quantities, and numerals are universal. "555 Oak
        Street" not "Five Hundred and Fifty-Five Oak Street."
      </p>

      <h2>Conclusion</h2>
      <p>
        Consistency is the priority pick a style guide appropriate for your
        context and apply it uniformly. For most web content, AP Style's rule
        (one through nine in words, 10+ in numerals) is the practical default.
        For legal and financial documents where numbers need to be written out
        in full, use the{" "}
        <a href="/tools/number-to-words-converter">Number to Words Converter</a>{" "}
        to avoid manual errors.
      </p>
    </>
  );
}
