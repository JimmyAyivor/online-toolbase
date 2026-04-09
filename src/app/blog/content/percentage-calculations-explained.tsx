// src/app/blog/content/percentage-calculations-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        Percentages come up constantly discounts, tax rates, grade scores,
        interest rates, survey results, nutritional labels. Most people can
        handle simple ones mentally, but when the numbers get awkward or the
        type of calculation changes, it's easy to get the wrong answer without
        realising it. Understanding the three core percentage question types
        means you can tackle any percentage problem confidently.
      </p>

      <h2>The three types of percentage calculation</h2>

      <h3>Type 1: What is X% of Y?</h3>
      <p>
        The most common type. "What is 15% of $240?" Convert the percentage to a
        decimal (15% = 0.15) and multiply: 0.15 × 240 = $36.
      </p>
      <p>
        Quick mental shortcut: find 10% first (move the decimal), then adjust.
        10% of 240 = 24. 15% = 24 + half of 24 = 24 + 12 = 36.
      </p>

      <h3>Type 2: X is what percentage of Y?</h3>
      <p>
        "36 is what percentage of 240?" Divide X by Y and multiply by 100: (36 ÷
        240) × 100 = 15%.
      </p>
      <p>
        Use case: expressing a score as a percentage (you got 34 out of 40 what
        percentage?), finding a discount rate (an item marked down from $80 to
        $60 what's the percentage off?), or expressing a proportion of a total.
      </p>

      <h3>Type 3: X is Y% of what?</h3>
      <p>"36 is 15% of what number?" Divide X by Y%: 36 ÷ 0.15 = 240.</p>
      <p>
        Use case: working backwards from a discounted price to the original
        ("this item is $85 after a 15% discount what was the original price?").
        The answer: 85 ÷ 0.85 = $100.
      </p>

      <h2>Percentage change: increase and decrease</h2>
      <p>
        Percentage change measures how much a value has grown or shrunk relative
        to its starting point:
      </p>
      <p>
        <strong>Formula:</strong> ((New Value − Old Value) ÷ Old Value) × 100
      </p>
      <p>
        Example: a stock price moves from $50 to $63. Change = ((63 − 50) ÷ 50)
        × 100 = 26% increase.
      </p>
      <p>
        A common mistake: calculating percentage change incorrectly when the
        value decreases. If the price drops from $63 back to $50, that's not a
        26% decrease it's ((50 − 63) ÷ 63) × 100 = −20.6% decrease. Percentage
        increases and decreases from the same two numbers are not symmetrical.
      </p>
      <p>
        This asymmetry is why a 50% loss requires a 100% gain to recover a value
        halved needs to double to return to its starting point.
      </p>

      <h2>Percentage points vs percentages</h2>
      <p>
        This distinction matters in finance, statistics, and journalism.
        "Percentage points" is an absolute difference between two percentages;
        "percent" is a relative change.
      </p>
      <p>
        Example: an interest rate rises from 3% to 5%. It rose by 2 percentage
        points. But relative to its starting value, it rose by (2 ÷ 3) × 100 =
        66.7%. Saying it "rose by 2%" when it rose by 2 percentage points or
        saying it "rose 67%" when it rose 2 percentage points are both accurate
        in different senses but mean very different things. Context determines
        which framing is appropriate.
      </p>

      <h2>VAT and tax calculations</h2>
      <p>
        Adding a percentage to a price: multiply by (1 + rate). £100 + 20% VAT =
        £100 × 1.20 = £120.
      </p>
      <p>
        Removing a percentage from a price-inclusive figure: divide by (1 +
        rate). £120 inclusive of 20% VAT: £120 ÷ 1.20 = £100 ex-VAT. The common
        error: calculating 20% of £120 (= £24) rather than the correct £20. The
        percentage was applied to the base price, not the final price.
      </p>
      <p>
        Our <a href="/tools/percentage-calculator">Percentage Calculator</a>{" "}
        handles all three calculation types and percentage changes use it any
        time the arithmetic gets ambiguous.
      </p>

      <h2>FAQ</h2>

      <h3>
        What's the difference between a 10% discount and a 10% increase followed
        by a 10% decrease?
      </h3>
      <p>
        A 10% increase followed by a 10% decrease results in a 1% net decrease.
        $100 → $110 (up 10%) → $99 (down 10% of $110 = $11). The decreasing
        percentage applies to the higher base, so you end up below where you
        started.
      </p>

      <h3>How do I calculate a percentage in Excel?</h3>
      <p>
        For "X% of Y": <code>=Y*X%</code> or <code>=Y*(X/100)</code>. For
        percentage change: <code>=(new-old)/old</code>, formatted as a
        percentage. Excel treats values formatted as percentage correctly in
        formulas.
      </p>

      <h3>Is 200% of something double it?</h3>
      <p>
        Yes. 200% of $50 = $100. But "a 200% increase" means adding 200% of the
        original: $50 + $100 = $150. "200% more" and "200% of" are different.
        This is a frequent source of confusion in financial and statistical
        reporting.
      </p>

      <h2>Conclusion</h2>
      <p>
        Mastering the three percentage question types and understanding
        percentage change versus percentage points covers the vast majority of
        real-world percentage problems. Use the{" "}
        <a href="/tools/percentage-calculator">Percentage Calculator</a> for
        quick calculations and to double-check mental arithmetic on anything
        consequential.
      </p>
    </>
  );
}
