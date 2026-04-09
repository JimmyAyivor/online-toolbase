// src/app/blog/content/mortgage-calculator-complete-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        Mortgage calculators are one of the most useful financial tools
        available but only if you understand what you're putting in and what the
        output actually means. A lot of people use them, get a monthly payment
        number, and treat that as "what buying a house costs." That number is
        incomplete, and sometimes significantly so.
      </p>
      <p>
        Here's a guide to using a mortgage calculator properly what each field
        means, what moves your payment, and the costs the calculator won't show
        you.
      </p>

      <h2>The four core inputs</h2>

      <h3>Loan amount (principal)</h3>
      <p>
        This is the amount you're borrowing the purchase price minus your
        deposit. If you're buying a £300,000 property with a £60,000 (20%)
        deposit, your loan amount is £240,000. A larger deposit means a smaller
        loan and lower monthly payments, and importantly, it also means access
        to better interest rates lenders charge lower rates as loan-to-value
        (LTV) decreases.
      </p>

      <h3>Interest rate</h3>
      <p>
        The annual interest rate on the mortgage. This has an enormous effect on
        your monthly payment. The difference between a 4% and 6% rate on a
        £250,000 mortgage over 25 years is roughly £300 per month and over
        £90,000 in total interest paid. Shopping around for even a 0.5% better
        rate is worth significant time and effort.
      </p>
      <p>
        When entering a rate, use the actual rate you've been offered, not the
        advertised headline rate the two are sometimes different once
        arrangement fees and other costs are factored into the APR.
      </p>

      <h3>Mortgage term</h3>
      <p>
        The number of years over which you repay the loan. A longer term means
        lower monthly payments but much higher total interest paid. A 25-year
        mortgage versus a 20-year mortgage on the same loan might save you
        £200/month now but cost you an extra £40,000+ in total interest over the
        life of the loan. Our{" "}
        <a href="/tools/loan-mortgage-calculator">Loan & Mortgage Calculator</a>{" "}
        shows the full repayment schedule so you can see this trade-off clearly.
      </p>

      <h3>Repayment type</h3>
      <p>
        Repayment mortgages pay off both interest and principal each month. At
        the end of the term, you own the property outright. Interest-only
        mortgages pay only the interest monthly, leaving the full principal
        outstanding at the end you need a separate plan for repaying it. Most
        residential buyers use repayment mortgages.
      </p>

      <h2>How principal repayment works in the early years</h2>
      <p>
        One thing calculators show that surprises most first-time buyers: in the
        early years of a repayment mortgage, the large majority of each monthly
        payment goes toward interest, not principal. On a £250,000 mortgage at
        5% over 25 years, your first payment of around £1,462 might include
        about £1,042 in interest and only £420 off the principal. By year 20,
        those proportions have reversed.
      </p>
      <p>
        This is why overpaying even small amounts early in the mortgage say, an
        extra £100–200 per month has a disproportionate impact. It reduces the
        principal faster, which reduces the interest charged on subsequent
        months, which compounds. A £200/month overpayment on a 25-year mortgage
        can cut the term by several years and save tens of thousands in
        interest.
      </p>

      <h2>What the calculator doesn't show you</h2>
      <p>
        The monthly payment figure from a calculator is the principal and
        interest only. The true cost of homeownership includes:
      </p>
      <ul>
        <li>
          <strong>Stamp duty / Land Transaction Tax.</strong> In the UK, stamp
          duty applies to purchases above £250,000 for most buyers (different
          thresholds for first-time buyers). This can be tens of thousands of
          pounds and must be paid upfront.
        </li>
        <li>
          <strong>Arrangement and product fees.</strong> Many mortgage products
          carry arrangement fees of £999–£2,500. On a competitive low-rate
          product, these fees can make it more expensive than a slightly
          higher-rate fee-free product. Always compare total cost over the fixed
          term, not just rate.
        </li>
        <li>
          <strong>Solicitor / conveyancing fees.</strong> Typically
          £1,000–£3,000 in the UK.
        </li>
        <li>
          <strong>Survey costs.</strong> A homebuyer survey or full structural
          survey is advisable. Budget £400–£1,500 depending on the property and
          survey type.
        </li>
        <li>
          <strong>Buildings and contents insurance.</strong> Mortgage lenders
          require buildings insurance. Budget £200–£500+ per year.
        </li>
        <li>
          <strong>Maintenance and repairs.</strong> Unlike renting, all
          maintenance costs fall on the owner. A common rule of thumb is to
          budget 1–2% of the property value per year for maintenance.
        </li>
        <li>
          <strong>Service charges and ground rent.</strong> For leasehold
          properties (most flats), these can add hundreds or thousands per year.
        </li>
      </ul>

      <h2>Fixed vs variable rates</h2>
      <p>
        A fixed-rate mortgage locks your interest rate for an initial period
        (typically 2, 3, or 5 years in the UK). Your payment is predictable
        during this period. After it ends, you roll onto the lender's Standard
        Variable Rate (SVR), which is higher most buyers remortgage at this
        point.
      </p>
      <p>
        A tracker or variable-rate mortgage moves with the Bank of England base
        rate. Your payments can go up or down. This carries more uncertainty but
        can be cheaper in a falling rate environment.
      </p>
      <p>
        Run scenarios for both in our{" "}
        <a href="/tools/loan-mortgage-calculator">Loan & Mortgage Calculator</a>{" "}
        try different rates, terms, and deposit sizes to understand the full
        range of outcomes before you commit.
      </p>
    </>
  );
}
