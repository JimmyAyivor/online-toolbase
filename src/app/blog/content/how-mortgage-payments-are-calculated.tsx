// src/app/blog/content/how-mortgage-payments-are-calculated.tsx
export default function Post() {
  return (
    <>
      <p>
        A mortgage is probably the largest financial commitment most people ever
        make yet the mathematics behind how monthly payments are calculated, and
        why so much of your early payments goes to interest rather than
        principal, isn't explained when you sign. Understanding how it works
        doesn't just satisfy curiosity; it helps you make better decisions about
        overpayments, term length, and when refinancing makes sense.
      </p>

      <h2>The mortgage payment formula</h2>
      <p>Monthly payment = P × [r(1+r)^n] ÷ [(1+r)^n − 1]</p>
      <ul>
        <li>
          <strong>P</strong> = principal (loan amount)
        </li>
        <li>
          <strong>r</strong> = monthly interest rate (annual rate ÷ 12)
        </li>
        <li>
          <strong>n</strong> = number of monthly payments (years × 12)
        </li>
      </ul>
      <p>
        Example: £250,000 mortgage at 4.5% annual interest over 25 years.
        Monthly rate = 4.5% ÷ 12 = 0.375%. Number of payments = 300. Monthly
        payment ≈ £1,389.
      </p>
      <p>
        Our{" "}
        <a href='/tools/loan-mortgage-calculator'>Loan & Mortgage Calculator</a>{" "}
        computes the monthly payment for any loan amount, rate, and term, and
        shows the full amortisation schedule.
      </p>

      <h2>Why early payments are mostly interest</h2>
      <p>
        Each monthly payment covers the interest accrued on the current balance,
        with the remainder reducing the principal. At the start of a mortgage,
        the balance is high, so interest is high and principal paydown is low.
        As the balance falls, more of each payment goes to principal.
      </p>
      <p>
        On the £250,000 example above, the first payment of £1,389 splits
        approximately:
      </p>
      <ul>
        <li>Interest: £250,000 × 0.375% = £937.50</li>
        <li>Principal: £1,389 − £937.50 = £451.50</li>
      </ul>
      <p>
        By the final year, almost all of each payment is principal because the
        balance is small. This is called amortisation the mathematical process
        of paying down a loan with equal periodic payments.
      </p>

      <h2>The real cost of mortgage term length</h2>
      <p>
        Shorter terms mean higher monthly payments but dramatically less total
        interest paid:
      </p>
      <ul>
        <li>
          £250,000 at 4.5% over 25 years: ~£1,389/month, ~£166,700 total
          interest
        </li>
        <li>
          £250,000 at 4.5% over 20 years: ~£1,581/month, ~£129,440 total
          interest
        </li>
        <li>
          £250,000 at 4.5% over 15 years: ~£1,912/month, ~£94,160 total interest
        </li>
      </ul>
      <p>
        The 10-year difference between 25-year and 15-year terms costs £192 more
        per month but saves over £72,000 in interest. This trade-off higher
        monthly payment vs lower total cost is the central decision in mortgage
        term selection.
      </p>

      <h2>Overpayments: the maths</h2>
      <p>
        Making regular or lump-sum overpayments reduces the principal faster,
        which reduces future interest charges and shortens the loan term. An
        extra £100 per month on a £250,000 25-year mortgage at 4.5% reduces the
        term by approximately 2.5 years and saves around £20,000 in interest.
      </p>
      <p>
        Most mortgage products allow overpayments of up to 10% of the
        outstanding balance per year without early repayment charges. Check your
        specific product before overpaying.
      </p>

      <h2>Fixed vs variable rates</h2>
      <p>
        Fixed rate mortgages lock your interest rate for an initial period
        (typically 2–5 years), after which you revert to the lender's standard
        variable rate (SVR) or remortgage. Variable and tracker rates move with
        the base rate. Fixed rates provide payment certainty; variable rates
        expose you to rate changes in both directions.
      </p>
      <p>
        At remortgage time, even a small rate reduction saves significant money
        over the remaining term. Modelling the new payment with the{" "}
        <a href='/tools/loan-mortgage-calculator'>mortgage calculator</a> versus
        your current payment quickly shows whether a switch makes financial
        sense.
      </p>

      <h2>FAQ</h2>

      <h3>
        What's the difference between a repayment mortgage and an interest-only
        mortgage?
      </h3>
      <p>
        A repayment mortgage pays both interest and principal each month, so the
        balance reduces to zero at the end of the term. An interest-only
        mortgage pays only the interest the full principal is still owed at the
        end of the term and must be repaid separately. Interest-only is common
        in investment property financing but rare in residential mortgages since
        the 2008 financial crisis.
      </p>

      <h3>How does a larger deposit affect mortgage payments?</h3>
      <p>
        A larger deposit reduces the loan-to-value (LTV) ratio. Lower LTV
        typically qualifies for better interest rates lenders price risk by LTV
        band. Moving from 90% LTV to 80% or 75% LTV often unlocks meaningfully
        lower rates. The saving on the rate can compound significantly over a
        25-year term.
      </p>

      <h3>What is APR on a mortgage?</h3>
      <p>
        APR (Annual Percentage Rate) includes the interest rate plus mandatory
        fees (arrangement fees, broker fees) expressed as an annualised cost. It
        allows comparison between mortgage products with different fee
        structures. The initial rate may look lower on a product with high fees;
        APR gives you a more complete picture of the true cost.
      </p>

      <h2>Conclusion</h2>
      <p>
        Understanding amortisation the slow shift from interest-heavy to
        principal-heavy payments over a loan's life changes how you think about
        overpayments, term length, and the true cost of borrowing. Use the{" "}
        <a href='/tools/loan-mortgage-calculator'>Loan & Mortgage Calculator</a>{" "}
        to model different scenarios and make decisions with full visibility of
        the numbers.
      </p>
    </>
  );
}
