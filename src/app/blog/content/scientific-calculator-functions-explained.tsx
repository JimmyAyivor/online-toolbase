// src/app/blog/content/scientific-calculator-functions-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        A scientific calculator goes significantly beyond basic arithmetic it
        handles trigonometry, logarithms, exponentiation, roots, and statistical
        functions that appear constantly in science, engineering, mathematics,
        and finance. Many people have used these functions without fully
        understanding what each one does or when to reach for it. Here's a
        practical reference for the functions that matter most.
      </p>

      <h2>Exponents and roots</h2>

      <h3>x² and xⁿ (power/exponent)</h3>
      <p>
        x² squares a number (multiplies it by itself). xⁿ raises x to any power
        n. The general key is usually labelled <code>yˣ</code>, <code>^</code>,
        or <code>xʸ</code>. In spreadsheets and most programming languages:{" "}
        <code>^</code> or <code>**</code>.
      </p>
      <p>
        Use for: compound interest (<code>P(1+r)ⁿ</code>), physics (kinetic
        energy = ½mv²), area and volume formulas, any growth or decay model.
      </p>

      <h3>√x and ⁿ√x (roots)</h3>
      <p>
        Square root (√x) finds the number that, multiplied by itself, gives x.
        √9 = 3. The nth root (ⁿ√x) generalises this cube root (∛8) = 2. In
        calculators: <code>√</code> button for square root; <code>xʸ</code> with
        y = 1/n for nth roots (∛8 = 8^(1/3)).
      </p>

      <h2>Logarithms</h2>

      <h3>log (base 10)</h3>
      <p>
        log₁₀(x) answers "10 to what power equals x?" log(1000) = 3 (because 10³
        = 1000). log(100) = 2, log(10) = 1, log(1) = 0.
      </p>
      <p>
        Use for: decibel calculations, Richter scale, pH chemistry, signal
        strength, any scale compressed across many orders of magnitude.
      </p>

      <h3>ln (natural log)</h3>
      <p>
        ln(x) uses base e (≈2.718) instead of base 10. ln(e) = 1, ln(1) = 0,
        ln(7.389) ≈ 2 (because e² ≈ 7.389).
      </p>
      <p>
        Use for: continuous compound interest, population growth models,
        radioactive decay, many differential equations in physics and
        engineering.
      </p>

      <h3>eˣ (exponential)</h3>
      <p>
        The inverse of ln. eˣ raises Euler's number e to the power x. Common in
        continuous growth/decay: a quantity growing at rate r continuously for
        time t is multiplied by eʳᵗ.
      </p>

      <h2>Trigonometric functions</h2>
      <p>
        Sin, cos, and tan relate angles in right triangles to the ratios of
        their sides:
      </p>
      <ul>
        <li>
          <strong>sin(θ)</strong> = opposite ÷ hypotenuse
        </li>
        <li>
          <strong>cos(θ)</strong> = adjacent ÷ hypotenuse
        </li>
        <li>
          <strong>tan(θ)</strong> = opposite ÷ adjacent = sin/cos
        </li>
      </ul>
      <p>
        Their inverses sin⁻¹ (arcsin), cos⁻¹ (arccos), tan⁻¹ (arctan) find the
        angle when you know the ratio.
      </p>
      <p>
        Key values to know: sin(30°) = 0.5, cos(60°) = 0.5, sin(45°) = cos(45°)
        = √2/2 ≈ 0.707, sin(90°) = 1, cos(0°) = 1.
      </p>

      <h3>Degrees vs radians</h3>
      <p>
        Angles can be expressed in degrees (0–360°) or radians (0–2π). Most
        calculators switch between modes with a DEG/RAD button. Programming
        languages and spreadsheets typically use radians by default a common
        source of wrong answers when someone forgets to convert. π radians =
        180°, so to convert degrees to radians: multiply by π/180.
      </p>

      <h2>Factorial and combinations</h2>
      <p>
        n! (n factorial) = n × (n−1) × (n−2) × ... × 1. 5! = 5 × 4 × 3 × 2 × 1 =
        120. Used in probability calculations and combinations.
      </p>
      <p>
        nCr (combinations) = n! ÷ (r! × (n−r)!) the number of ways to choose r
        items from n without regard to order. "How many ways can I choose 3
        people from a group of 10?" = 10C3 = 120.
      </p>
      <p>nPr (permutations) = n! ÷ (n−r)! when order matters.</p>

      <h2>Memory functions</h2>
      <p>
        M+, M−, MR, MC store and recall values during calculations. Useful for
        multi-step problems where an intermediate result is needed multiple
        times. For complex calculations, consider using a spreadsheet instead
        formulas are visible, editable, and documented.
      </p>

      <h2>Using our scientific calculator</h2>
      <p>
        Our <a href='/tools/scientific-calculator'>Scientific Calculator</a>{" "}
        provides all standard scientific functions trig, logarithms, exponents,
        roots, factorials, and combinations with both degree and radian mode and
        support for parentheses in complex expressions.
      </p>

      <h2>FAQ</h2>

      <h3>What's the order of operations in calculator expressions?</h3>
      <p>
        PEMDAS/BODMAS: Parentheses, Exponents, Multiplication/Division (left to
        right), Addition/Subtraction (left to right). Calculators follow this;
        ambiguous expressions like 6÷2(1+2) can produce different results
        depending on how the calculator handles implicit multiplication.
      </p>

      <h3>Why is log(0) undefined?</h3>
      <p>
        log(x) asks "10 to what power equals x?" There is no power you can raise
        10 to and get 0 (10^(−∞) approaches 0 but never reaches it). As x
        approaches 0 from the positive side, log(x) approaches −∞.
        Mathematically, log(0) is undefined.
      </p>

      <h3>When should I use log vs ln?</h3>
      <p>
        Use log₁₀ when working with scales defined in base 10 (decibels, pH,
        Richter scale). Use ln when working with natural growth/decay processes,
        calculus, and most mathematical contexts where the base-e logarithm is
        the "natural" choice.
      </p>

      <h2>Conclusion</h2>
      <p>
        Scientific calculator functions are tools for specific mathematical
        relationships each one encodes a concept (exponential growth, angular
        ratios, multiplicative counting) that appears across dozens of
        real-world applications. Use the{" "}
        <a href='/tools/scientific-calculator'>Scientific Calculator</a> for any
        calculation requiring these functions, and refer to this guide when you
        encounter an unfamiliar button.
      </p>
    </>
  );
}
