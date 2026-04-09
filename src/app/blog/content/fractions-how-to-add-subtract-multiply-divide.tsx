// src/app/blog/content/fractions-how-to-add-subtract-multiply-divide.tsx
export default function Post() {
  return (
    <>
      <p>
        Fractions are one of those areas where many people hit a confidence wall
        not because the rules are complicated, but because they were taught as a
        set of disconnected procedures without the underlying logic. Once you
        understand why each rule works, the operations become straightforward
        and the common mistakes disappear.
      </p>

      <h2>What a fraction actually represents</h2>
      <p>
        A fraction a/b means: divide something into b equal parts and take a of
        them. 3/4 means divide a whole into 4 equal parts, take 3. This
        definition makes many fraction rules intuitive.
      </p>
      <p>
        Our <a href="/tools/fraction-calculator">Fraction Calculator</a> adds,
        subtracts, multiplies, and divides any fractions and shows the working
        step by step.
      </p>

      <h2>Simplifying fractions</h2>
      <p>
        A fraction is simplified (in its lowest terms) when the numerator and
        denominator share no common factors. To simplify: find the Greatest
        Common Divisor (GCD) of numerator and denominator and divide both by it.
      </p>
      <p>12/18: GCD(12,18) = 6. 12÷6 = 2, 18÷6 = 3. Simplified: 2/3.</p>
      <p>
        Equivalent fractions: 1/2 = 2/4 = 3/6 = 4/8. Multiplying or dividing
        both numerator and denominator by the same number produces an equivalent
        fraction.
      </p>

      <h2>Adding and subtracting fractions</h2>
      <p>
        You can only add or subtract fractions with the same denominator. If
        denominators differ, find a common denominator first.
      </p>
      <p>
        <strong>Same denominator:</strong> Add/subtract numerators, keep
        denominator. 3/8 + 1/8 = 4/8 = 1/2.
      </p>
      <p>
        <strong>Different denominators:</strong> Find the Least Common Multiple
        (LCM) of both denominators. Convert both fractions to that denominator,
        then add.
      </p>
      <p>
        1/3 + 1/4: LCM(3,4) = 12. Convert: 1/3 = 4/12, 1/4 = 3/12. Add: 4/12 +
        3/12 = 7/12.
      </p>
      <p>
        <strong>Quick shortcut (cross-multiplication):</strong> a/b + c/d = (ad
        + bc) / bd. Then simplify. 1/3 + 1/4 = (1×4 + 1×3) / (3×4) = 7/12. This
        always works but may produce a larger denominator that needs
        simplification.
      </p>

      <h2>Multiplying fractions</h2>
      <p>
        Multiply numerators together, multiply denominators together. No need to
        find a common denominator.
      </p>
      <p>2/3 × 3/4 = (2×3) / (3×4) = 6/12 = 1/2.</p>
      <p>
        <strong>Cancellation trick:</strong> Before multiplying, cancel any
        factor that appears in both a numerator and a denominator. 2/3 × 3/4:
        the 3 in the first denominator and 3 in the second numerator cancel,
        leaving 2/1 × 1/4 = 2/4 = 1/2. Same result, less simplification at the
        end.
      </p>

      <h2>Dividing fractions</h2>
      <p>
        Dividing by a fraction is the same as multiplying by its reciprocal.
        "Keep, change, flip": keep the first fraction, change ÷ to ×, flip the
        second fraction.
      </p>
      <p>2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.</p>
      <p>
        Why? Dividing by 4/5 means "how many times does 4/5 fit into 2/3?"
        Multiplying by the reciprocal (5/4) inverts this relationship
        mathematically.
      </p>

      <h2>Mixed numbers and improper fractions</h2>
      <p>
        A mixed number like 2¾ means 2 + 3/4. An improper fraction has the
        numerator larger than the denominator: 11/4.
      </p>
      <p>
        Converting mixed to improper: (whole × denominator + numerator) /
        denominator. 2¾ = (2×4 + 3)/4 = 11/4.
      </p>
      <p>
        Converting improper to mixed: divide numerator by denominator. Quotient
        is the whole number, remainder is the new numerator. 11/4 = 2 remainder
        3 = 2¾.
      </p>
      <p>
        For calculations, convert mixed numbers to improper fractions first,
        perform the operation, then convert back.
      </p>

      <h2>Fractions in everyday contexts</h2>
      <ul>
        <li>
          <strong>Cooking:</strong> ⅔ cup × 1.5 (scaling a recipe) = ⅔ × 3/2 =
          6/6 = 1 cup
        </li>
        <li>
          <strong>Probability:</strong> P(A) × P(B) for independent events
          multiplies fractions
        </li>
        <li>
          <strong>Finance:</strong> Interest rates as fractions (1/4% = 0.0025)
        </li>
        <li>
          <strong>Construction:</strong> Adding measurements in fractions of
          inches
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>Why do you need a common denominator to add but not to multiply?</h3>
      <p>
        Adding 1/3 + 1/4 asks "how much total?" but thirds and quarters are
        different-sized pieces you can't add them directly. You need to cut both
        into the same size piece (twelfths). Multiplying 1/3 × 1/4 asks "what is
        1/3 of 1/4?" this works directly: 1/12 of the original whole.
      </p>

      <h3>What's the fastest way to find LCM?</h3>
      <p>
        LCM(a,b) = (a × b) ÷ GCD(a,b). GCD can be found using the Euclidean
        algorithm: GCD(12,8): 12 = 1×8+4, then GCD(8,4): 8 = 2×4+0. GCD = 4.
        LCM(12,8) = (12×8)÷4 = 24.
      </p>

      <h3>Can fractions have negative numerators or denominators?</h3>
      <p>
        Yes. Negative fractions follow the sign rules: negative ÷ positive =
        negative, negative ÷ negative = positive. By convention, the negative
        sign is placed in front of the fraction or in the numerator, not the
        denominator: −2/3 not 2/−3.
      </p>

      <h2>Conclusion</h2>
      <p>
        Fraction arithmetic follows logical rules: common denominators for
        addition/subtraction, direct multiplication/division for products and
        quotients. Use the{" "}
        <a href="/tools/fraction-calculator">Fraction Calculator</a> to handle
        any fraction operation with step-by-step working shown useful for
        checking your own calculations and for understanding where each step
        comes from.
      </p>
    </>
  );
}
