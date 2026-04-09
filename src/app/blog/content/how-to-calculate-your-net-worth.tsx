// src/app/blog/content/how-to-calculate-your-net-worth.tsx
export default function Post() {
  return (
    <>
      <p>
        Net worth is the most comprehensive single-number summary of your
        financial position: everything you own minus everything you owe. It's
        more useful than income or savings balance alone because it captures the
        full picture a high income with proportionally high debt isn't
        necessarily strong financial health; a modest income with growing equity
        and low debt is. Calculating it honestly, including all assets and all
        liabilities, is the foundation of any serious financial plan.
      </p>

      <h2>The net worth formula</h2>
      <p>Net Worth = Total Assets − Total Liabilities</p>
      <p>
        Our <a href="/tools/net-worth-calculator">Net Worth Calculator</a> walks
        you through both sides of the equation systematically, so nothing gets
        missed.
      </p>

      <h2>What counts as an asset</h2>
      <ul>
        <li>
          <strong>Liquid assets:</strong> Cash in current accounts, savings
          accounts, Cash ISAs, money market funds anything you can access
          quickly without loss of value
        </li>
        <li>
          <strong>Investment accounts:</strong> Stocks, bonds, ISAs, 401(k)/IRA
          accounts, pensions (estimated current value)
        </li>
        <li>
          <strong>Property:</strong> Current market value of any real estate you
          own (not the purchase price)
        </li>
        <li>
          <strong>Vehicles:</strong> Current market value (depreciating assets
          use realistic resale values)
        </li>
        <li>
          <strong>Business interests:</strong> Your equity stake in any business
          you own or co-own
        </li>
        <li>
          <strong>Other valuables:</strong> Significant collectibles, jewellery,
          art at realistic market value
        </li>
      </ul>

      <h2>What counts as a liability</h2>
      <ul>
        <li>
          <strong>Mortgage:</strong> Outstanding balance, not the original loan
          amount
        </li>
        <li>
          <strong>Car loans:</strong> Remaining balance
        </li>
        <li>
          <strong>Credit card balances:</strong> Total outstanding balance
        </li>
        <li>
          <strong>Student loans:</strong> Outstanding balance
        </li>
        <li>
          <strong>Personal loans:</strong> Remaining balance
        </li>
        <li>
          <strong>Any other debts:</strong> Money owed to family, outstanding
          tax bills, etc.
        </li>
      </ul>

      <h2>Negative net worth is common and recoverable</h2>
      <p>
        Many people in their twenties and early thirties have negative net worth
        student loans, a recently started mortgage, car finance, and relatively
        few assets. This is normal and not a crisis. Net worth is a direction
        metric as much as an absolute one. The question isn't just "what is it?"
        but "is it improving?"
      </p>
      <p>
        Tracking net worth quarterly or annually shows whether your financial
        decisions are producing the right trajectory. A consistent upward trend
        even when the absolute number is negative is the goal in early financial
        life.
      </p>

      <h2>Net worth benchmarks by age</h2>
      <p>
        Average and median net worth figures vary significantly by age and
        country. US Federal Reserve data (2022 Survey of Consumer Finances):
      </p>
      <ul>
        <li>
          Under 35: Median ~£39,000; Mean ~£183,000 (means are skewed by high
          earners)
        </li>
        <li>35–44: Median ~£135,000; Mean ~£549,000</li>
        <li>45–54: Median ~£247,000; Mean ~£976,000</li>
        <li>55–64: Median ~£365,000; Mean ~£1,566,000</li>
      </ul>
      <p>
        Median is more representative of typical households. The large gap
        between median and mean reflects extreme wealth concentration at the
        top. Use these as reference points, not targets personal circumstances
        vary too widely for age-based benchmarks to be more than rough guides.
      </p>

      <h2>What moves net worth upward</h2>
      <p>
        Three levers: increasing income, reducing liabilities (debt repayment),
        and growing assets (investing, property appreciation). The most
        effective approach depends on your starting position. For someone with
        significant high-interest debt, aggressive repayment produces the
        fastest net worth growth. For someone debt-free, maximising invested
        assets does.
      </p>

      <h2>FAQ</h2>

      <h3>Should I include my pension in net worth?</h3>
      <p>
        Yes pension funds are real assets that contribute to your financial
        security. For defined contribution pensions, use the current fund value.
        For defined benefit (final salary) pensions, you can estimate the
        equivalent capital value: annual pension at current rights ÷ an assumed
        drawdown rate (often 4%). Include it with the caveat that it's illiquid
        until pension age.
      </p>

      <h3>Should I include personal possessions in net worth?</h3>
      <p>
        Only high-value items with an active resale market property, vehicles,
        significant jewellery or art. Household furnishings, clothing, and
        electronics depreciate quickly to near-zero resale value and aren't
        worth tracking. Including them inflates the asset side without adding
        meaningful information.
      </p>

      <h3>How often should I calculate net worth?</h3>
      <p>
        Quarterly or annually is sufficient for most people. More frequent
        calculation is mostly noise market fluctuations move investment values
        daily without reflecting any change in your financial behaviour. Annual
        calculation at the same point each year gives you a consistent
        comparison point.
      </p>

      <h2>Conclusion</h2>
      <p>
        Net worth is the scorecard of your overall financial position. Calculate
        it honestly once, track the direction over time, and use it to identify
        which lever income, debt reduction, or investment will most effectively
        improve it. Use the{" "}
        <a href="/tools/net-worth-calculator">Net Worth Calculator</a> to work
        through assets and liabilities systematically and see your current
        position clearly.
      </p>
    </>
  );
}
