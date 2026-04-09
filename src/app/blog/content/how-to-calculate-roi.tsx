// src/app/blog/content/how-to-calculate-roi.tsx
export default function Post() {
  return (
    <>
      <p>
        Return on investment is one of the most used and most misused metrics in
        business. It sounds like a single precise number, but what counts as
        "return" and what counts as "investment" varies significantly by
        context, industry, and what you're trying to evaluate. Understanding the
        formula and its limitations helps you use ROI meaningfully rather than
        as a rubber stamp for decisions already made.
      </p>

      <h2>The basic ROI formula</h2>
      <p>
        ROI (%) = ((Net Return − Cost of Investment) ÷ Cost of Investment) × 100
      </p>
      <p>Or equivalently: ROI = (Net Gain ÷ Cost) × 100</p>
      <p>
        Example: you invest £10,000 in a marketing campaign that generates
        £14,000 in attributed revenue. Net gain = £4,000. ROI = (£4,000 ÷
        £10,000) × 100 = 40%.
      </p>
      <p>
        Use our <a href="/tools/roi-calculator">ROI Calculator</a> to compute
        ROI for any investment scenario and see annualised return for
        investments held over different time periods.
      </p>

      <h2>What counts as "return" matters</h2>
      <p>
        The return in the formula needs to be net return revenue minus all costs
        directly associated with the investment. Using gross revenue rather than
        net return dramatically overstates ROI. A marketing campaign that
        generates £14,000 in revenue but had £8,000 in cost of goods sold and
        £3,000 in campaign costs has a net return of £3,000, not £14,000. ROI =
        (£3,000 ÷ £3,000) × 100 = 100%, not 400%.
      </p>

      <h2>Annualised ROI</h2>
      <p>
        Basic ROI doesn't account for time. A 40% return over 6 months is much
        better than a 40% return over 5 years. Annualised ROI (also called CAGR
        for compound returns) puts different time periods on equal footing:
      </p>
      <p>Annualised ROI = ((1 + ROI)^(1/years) − 1) × 100</p>
      <p>
        A 40% return over 3 years: (1.40^(1/3) − 1) × 100 = 11.87% per year.
        This is the annualised rate that, compounded over 3 years, produces the
        same total return.
      </p>

      <h2>When ROI doesn't tell the whole story</h2>
      <p>
        <strong>Risk isn't captured.</strong> Two investments with the same
        expected ROI might have very different variance. A guaranteed 8% return
        is not equivalent to a 50% chance of 0% and a 50% chance of 16%, even
        though the expected value is the same.
      </p>
      <p>
        <strong>Attribution is hard.</strong> In marketing especially,
        attributing revenue to a specific campaign is methodologically
        challenging. Last-click attribution, first-click attribution, and
        multi-touch models produce different ROI figures for the same campaign.
      </p>
      <p>
        <strong>Non-financial returns are excluded.</strong> Brand building,
        employee satisfaction improvements, and risk reduction have real
        business value that doesn't show up in a simple ROI calculation.
      </p>

      <h2>ROI benchmarks by investment type</h2>
      <ul>
        <li>
          <strong>Stock market (S&amp;P 500 historical average):</strong> ~10%
          annualised nominal, ~7% real (inflation-adjusted)
        </li>
        <li>
          <strong>Email marketing:</strong> Industry estimates often cite $36–42
          return per $1 spent, though methodology varies
        </li>
        <li>
          <strong>Real estate:</strong> Varies enormously by market; total
          return (rental yield + appreciation) historically 8–12% in strong
          markets
        </li>
        <li>
          <strong>Business investment:</strong> Varies by industry; a common
          rule of thumb is any project with &gt;15% ROI within 1–2 years
          deserves serious consideration
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>What's a good ROI?</h3>
      <p>
        It depends entirely on the investment type, time period, and risk
        profile. In a low-rate environment, 7–10% annualised is strong for
        passive investments. For active business projects, the hurdle rate the
        minimum acceptable ROI typically reflects the cost of capital and the
        risk involved.
      </p>

      <h3>How is ROI different from profit margin?</h3>
      <p>
        Profit margin is a percentage of revenue: (profit ÷ revenue) × 100. ROI
        is a percentage of investment cost: (net gain ÷ cost) × 100. A business
        can have a low profit margin but high ROI if the investment required is
        small, or a high profit margin with low ROI if capital requirements are
        large.
      </p>

      <h3>What's the difference between ROI and ROAS?</h3>
      <p>
        ROAS (Return on Ad Spend) is revenue divided by ad spend a gross metric.
        ROI uses net profit. ROAS = £14,000 ÷ £3,000 = 4.67x. ROI using net
        profit after all costs tells a different, truer story of financial
        impact.
      </p>

      <h2>Conclusion</h2>
      <p>
        ROI is a useful starting point for evaluating investments but requires
        careful definition of what goes into the return and cost figures. Use
        the <a href="/tools/roi-calculator">ROI Calculator</a> to compute both
        basic and annualised ROI, and treat the result as an input to a broader
        evaluation rather than a final verdict.
      </p>
    </>
  );
}
