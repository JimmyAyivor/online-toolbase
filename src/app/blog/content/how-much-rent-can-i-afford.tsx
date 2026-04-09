// src/app/blog/content/how-much-rent-can-i-afford.tsx
export default function Post() {
  return (
    <>
      <p>
        The 30% rule spend no more than 30% of gross income on rent is a useful
        starting point, but it was established in US federal housing policy in
        the 1960s and hasn't kept pace with how much housing costs have
        increased relative to wages in major cities. In London, New York, San
        Francisco, or Sydney, many renters spending 40–50% of income on housing
        aren't making bad decisions they're navigating a difficult market.
        Understanding both the benchmark and its limits helps you make a
        realistic call.
      </p>

      <h2>The 30% rule: useful benchmark, imperfect rule</h2>
      <p>
        The guideline: rent should be no more than 30% of gross (pre-tax)
        monthly income. At a £40,000 salary (£3,333/month gross), this suggests
        a maximum rent of £1,000/month.
      </p>
      <p>The problems with applying this literally:</p>
      <ul>
        <li>
          It uses gross income, not net income. After tax, the same £40,000
          salary might be £2,600/month 30% of gross is 38% of net.
        </li>
        <li>
          It doesn't account for other fixed costs, savings goals, or debt
          repayments.
        </li>
        <li>
          In high-cost cities, the median rent may already exceed 30% for median
          incomes the rule describes what's affordable, not what's available.
        </li>
      </ul>
      <p>
        Our{" "}
        <a href="/tools/rent-affordability-calculator">
          Rent Affordability Calculator
        </a>{" "}
        uses your net income and total expenses to calculate a more personalised
        maximum rent.
      </p>

      <h2>A better framework: budget-based affordability</h2>
      <p>Start with net monthly income. Subtract:</p>
      <ul>
        <li>
          All fixed non-housing expenses (loan payments, subscriptions,
          insurance)
        </li>
        <li>Target savings rate (at least 10–20% of net income)</li>
        <li>
          Estimated monthly variable expenses (food, transport, utilities,
          personal care)
        </li>
      </ul>
      <p>
        What remains is your actual maximum housing budget not a percentage of
        income, but what's left after everything else is accounted for.
      </p>

      <h2>What total housing cost includes</h2>
      <p>
        Don't compare rent against the 30% rule in isolation the full housing
        cost includes:
      </p>
      <ul>
        <li>Rent (obviously)</li>
        <li>
          Council tax (UK) / property taxes (US, if included in rent or not)
        </li>
        <li>
          Utilities not included in rent (gas, electricity, water, internet)
        </li>
        <li>Contents insurance</li>
        <li>Any service charges or parking fees</li>
      </ul>
      <p>
        The all-in monthly housing cost is what to benchmark against your
        income, not just the headline rent figure.
      </p>

      <h2>When spending more than 30% makes sense</h2>
      <p>Spending more than 30% on housing can be rational when:</p>
      <ul>
        <li>
          You're early in your career with a low current salary but strong
          income growth trajectory
        </li>
        <li>
          Location directly enables higher income (proximity to opportunities,
          avoiding long commutes that cost money and time)
        </li>
        <li>
          Other expenses are genuinely low no debt, minimal lifestyle costs
          leaving headroom despite high rent
        </li>
        <li>
          The city simply doesn't offer adequate housing below that threshold
        </li>
      </ul>
      <p>
        Spending more than 50% of net income on housing is usually unsustainable
        it leaves insufficient room for savings, emergency fund building, and
        basic discretionary spending.
      </p>

      <h2>FAQ</h2>

      <h3>Is the 30% rule gross or net income?</h3>
      <p>
        The original rule uses gross income. Net income gives a more realistic
        picture of actual affordability since it reflects what you can actually
        spend. Budget-based calculations should use net income.
      </p>

      <h3>Does the 30% rule apply to buying as well as renting?</h3>
      <p>
        The same benchmark is often applied to total housing costs for
        homeowners (mortgage + insurance + taxes). Some lenders use 28% of gross
        income as the front-end ratio limit for mortgage payments.
      </p>

      <h3>What's the rent-to-income ratio landlords use to screen tenants?</h3>
      <p>
        Most UK landlords look for tenants earning at least 2.5–3× the annual
        rent. For a £1,500/month flat (£18,000/year), they typically want income
        of £45,000–54,000. This protects them against rent arrears risk; it's
        not the same as what you can comfortably afford.
      </p>

      <h2>Conclusion</h2>
      <p>
        The 30% rule is a useful sanity check, not an absolute constraint. Build
        your housing budget from your actual financial situation income, debts,
        savings targets, and other expenses and make location and housing
        choices that fit within it. Use the{" "}
        <a href="/tools/rent-affordability-calculator">
          Rent Affordability Calculator
        </a>{" "}
        to find a realistic personalised range.
      </p>
    </>
  );
}
