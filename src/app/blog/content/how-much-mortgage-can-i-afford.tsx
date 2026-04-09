// src/app/blog/content/how-much-mortgage-can-i-afford.tsx
export default function Post() {
  return (
    <>
      <p>
        "How much can I borrow?" and "how much can I afford?" are different
        questions and confusing them is one of the most common ways people end
        up house-poor. Lenders will tell you the maximum they'll lend based on
        income and credit history. That figure isn't a target; it's a ceiling.
        Your affordable mortgage is determined by the monthly payment you can
        comfortably sustain alongside all your other financial obligations and
        goals.
      </p>

      <h2>How lenders calculate maximum borrowing</h2>
      <p>
        In the UK, most lenders use income multiples of 4–4.5× your gross annual
        income (some go to 5–5.5× for higher earners or certain professions).
        Joint applications typically use combined income. Lenders also run
        affordability stress tests checking whether you could still service the
        mortgage if interest rates rose by 3% or more.
      </p>
      <p>
        In the US, lenders use debt-to-income (DTI) ratios. The conventional
        maximum is 43% DTI (total monthly debt payments ÷ gross monthly income).
        The recommended front-end ratio (housing costs only) is 28% or below.
      </p>
      <p>
        Our{" "}
        <a href="/tools/mortgage-affordability-calculator">
          Mortgage Affordability Calculator
        </a>{" "}
        estimates your borrowing range based on income, existing debts, and
        deposit, and shows the resulting monthly payment.
      </p>

      <h2>The affordability calculation you should do yourself</h2>
      <p>
        A more useful question than "what will a lender approve?" is "what
        monthly payment fits my budget?"
      </p>
      <ul>
        <li>Start with net monthly income (after tax)</li>
        <li>
          Subtract all fixed monthly commitments (existing debts, car,
          insurance, subscriptions)
        </li>
        <li>
          Subtract estimated monthly costs for the property (utilities,
          maintenance budget, ground rent/service charge if applicable)
        </li>
        <li>Subtract your target monthly savings rate</li>
        <li>
          What remains is the maximum monthly mortgage payment that keeps your
          budget intact
        </li>
      </ul>
      <p>
        Reverse-engineer the loan amount from that monthly payment using the
        mortgage payment formula or our{" "}
        <a href="/tools/loan-mortgage-calculator">Loan & Mortgage Calculator</a>
        .
      </p>

      <h2>The deposit's role</h2>
      <p>
        A larger deposit reduces the loan size (and therefore monthly payment),
        improves the loan-to-value (LTV) ratio, and qualifies you for better
        interest rates. LTV thresholds matter: moving from 95% LTV to 90% or 85%
        typically unlocks meaningfully lower rates, reducing total interest paid
        over the mortgage term by thousands.
      </p>
      <p>
        The minimum deposit in most cases is 5% of the purchase price. 10% is
        better; 20–25% typically accesses the best rates available.
      </p>

      <h2>Hidden costs of homeownership</h2>
      <p>
        The mortgage payment is just one component of housing cost. New
        homeowners often underestimate:
      </p>
      <ul>
        <li>
          <strong>Stamp duty / transfer taxes:</strong> A significant upfront
          cost in many jurisdictions
        </li>
        <li>
          <strong>Maintenance and repairs:</strong> Budget 1–2% of property
          value annually
        </li>
        <li>
          <strong>Buildings and contents insurance</strong>
        </li>
        <li>
          <strong>Service charges and ground rent</strong> on leasehold
          properties
        </li>
        <li>
          <strong>Solicitor and surveyor fees</strong> during purchase
        </li>
        <li>
          <strong>Furnishing costs</strong> when moving into a new property
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>
        Is it better to have a bigger deposit or keep savings as an emergency
        fund?
      </h3>
      <p>
        Don't put everything into a deposit and leave yourself with no liquid
        savings. The standard recommendation: maintain 3–6 months of expenses in
        accessible savings even after using your deposit. Homeownership brings
        unexpected costs, and having no emergency fund shortly after completing
        a house purchase is a vulnerable position.
      </p>

      <h3>
        How does a Help to Buy or shared ownership scheme affect affordability?
      </h3>
      <p>
        These schemes effectively reduce the required mortgage size by providing
        equity loans or shared equity, making properties accessible with a
        smaller deposit or mortgage. They come with terms and restrictions
        understand the full cost over the scheme's lifetime, not just the
        initial monthly payment.
      </p>

      <h3>Should I get a mortgage in principle before viewing properties?</h3>
      <p>
        Yes a mortgage in principle (also called a decision in principle or
        agreement in principle) gives you a confirmed indicative borrowing limit
        from a lender without a full application. It makes you a more credible
        buyer when making offers and helps focus your property search on a
        realistic price range.
      </p>

      <h2>Conclusion</h2>
      <p>
        Maximum borrowing is not the same as affordable borrowing. Calculate
        from your actual budget downward what monthly payment can you sustain
        without sacrificing savings, lifestyle, and financial resilience? Use
        the{" "}
        <a href="/tools/mortgage-affordability-calculator">
          Mortgage Affordability Calculator
        </a>{" "}
        as a starting estimate, then model the resulting monthly payment against
        your real budget with the{" "}
        <a href="/tools/loan-mortgage-calculator">Loan Calculator</a>.
      </p>
    </>
  );
}
