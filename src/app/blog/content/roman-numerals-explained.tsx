// src/app/blog/content/roman-numerals-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        Roman numerals appear constantly in contexts where they're never
        explained movie copyright dates, clock faces, Super Bowl numbering,
        monarchs and popes (King Charles III, Pope Francis I), book preface page
        numbers, and architectural dates carved in stone. Most people can read
        the basic ones but stumble on anything beyond XX. The system is actually
        logical and easy to learn once you understand the two rules it's built
        on.
      </p>
      <h2>The seven basic symbols</h2>
      <ul>
        <li>I = 1</li>
        <li>V = 5</li>
        <li>X = 10</li>
        <li>L = 50</li>
        <li>C = 100</li>
        <li>D = 500</li>
        <li>M = 1,000</li>
      </ul>
      <p>
        Use our{" "}
        <a href="/tools/roman-numeral-converter">Roman Numeral Converter</a> to
        convert any number to Roman numerals and back.
      </p>
      <h2>The two rules: addition and subtraction</h2>
      <p>
        <strong>Addition:</strong> When a smaller or equal value symbol follows
        a larger one, add them. VIII = 5 + 1 + 1 + 1 = 8. XII = 10 + 1 + 1 = 12.
        LXXX = 50 + 10 + 10 + 10 = 80.
      </p>
      <p>
        <strong>Subtraction:</strong> When a smaller value symbol immediately
        precedes a larger one, subtract it. IV = 5 − 1 = 4. IX = 10 − 1 = 9. XL
        = 50 − 10 = 40. XC = 100 − 10 = 90. CD = 500 − 100 = 400. CM = 1,000 −
        100 = 900.
      </p>
      <p>
        Subtractive notation rules: only I, X, and C can be used subtractively.
        I can only precede V or X. X can only precede L or C. C can only precede
        D or M.
      </p>
      <h2>Reading complex numbers</h2>
      <p>
        MCMXCIX = 1,999. Breaking it down: M (1,000) + CM (900) + XC (90) + IX
        (9) = 1,999.
      </p>
      <p>MMXXVI = 2,026. MM (2,000) + XX (20) + VI (6) = 2,026.</p>
      <p>
        The pattern: work left to right, applying addition or subtraction based
        on whether the current symbol is smaller than the one following it.
      </p>
      <h2>Where Roman numerals are still used today</h2>
      <ul>
        <li>
          <strong>Movie and TV copyright dates:</strong> "© MMXXIV" for 2024.
          This convention historically gave some ambiguity about production
          dates useful for distributors, not for viewers.
        </li>
        <li>
          <strong>Sequels and series:</strong> Rocky II, Star Wars: Episode IV
        </li>
        <li>
          <strong>Super Bowl:</strong> Super Bowl LVIII, for instance
        </li>
        <li>
          <strong>Clock faces:</strong> Traditional clock dials use Roman
          numerals, with IIII (not IV) being the conventional usage on clocks
        </li>
        <li>
          <strong>Monarchs and popes:</strong> Ordinal naming distinguishing
          rulers with the same name
        </li>
        <li>
          <strong>Book front matter:</strong> Preface and table of contents
          pages use lowercase Roman numerals (i, ii, iii, iv...) separate from
          the main page numbering
        </li>
        <li>
          <strong>Outlines:</strong> I., II., III. for major sections in formal
          outlines
        </li>
      </ul>
      <h2>The IIII vs IV question on clocks</h2>
      <p>
        Traditional clock faces use IIII for four rather than the standard IV.
        Theories vary clockmakers found IIII visually balanced against VIII on
        the opposite side; it may have been a convention that predates the
        subtractive notation becoming standard; or early clockmakers
        deliberately avoided IV to avoid associating with IVPITER (Jupiter) in
        Roman numerals. Whatever the origin, IIII on clock faces is the
        long-established convention.
      </p>
      <h2>FAQ</h2>
      <h3>What's the largest number in Roman numerals?</h3>
      <p>
        Standard Roman numerals can represent up to 3,999 (MMMCMXCIX). For
        larger numbers, an overline (vinculum) over a symbol multiplied its
        value by 1,000 V̄ = 5,000, X̄ = 10,000. This notation is rarely used
        today. For most practical purposes, Roman numerals are used for numbers
        under 4,000.
      </p>
      <h3>Is there a zero in Roman numerals?</h3>
      <p>
        No the Romans had no symbol for zero, which is one reason Roman numerals
        are impractical for arithmetic. The concept of zero as a number was
        developed independently in India and transmitted through Arab
        mathematics to Europe in the Medieval period, long after Rome's fall.
      </p>
      <h2>Conclusion</h2>
      <p>
        Roman numerals are easier to understand than they appear once you know
        the additive and subtractive rules. They remain in genuine use across
        dozens of contexts, from movie credits to clock faces to royalty. Use
        the <a href="/tools/roman-numeral-converter">Roman Numeral Converter</a>{" "}
        to convert any number to Roman numerals or decode any Roman numeral back
        to decimal.
      </p>
    </>
  );
}
