// src/app/blog/content/how-to-evaluate-a-pay-raise.tsx
export default function Post() {
  return (
    <>
      <p>
        A pay rise sounds like straightforward good news until you calculate
        what it actually means in take-home pay, real purchasing power, and
        relative to the going market rate. A 3% raise in a year with 4%
        inflation is a real pay cut. A 10% raise that still leaves you 20% below
        market rate solves one problem while leaving another. Here's how to
        evaluate a pay raise with clarity.
      </p>

      <h2>Calculating the actual increase</h2>
      <p>New annual salary = Current salary × (1 + raise percentage / 100)</p>
      <p>Monthly increase = (New salary − Current salary) ÷ 12</p>
      <p>
        After-tax monthly increase ≈ Monthly increase × (1 − marginal tax rate)
      </p>
      <p>
        Our <a href="/tools/pay-raise-calculator">Pay Raise Calculator</a>{" "}
        computes the annual and monthly difference in gross and approximate net
        pay for any raise percentage.
      </p>

      <h2>Real raise vs nominal raise</h2>
      <p>
        A nominal raise is the percentage increase in your salary. A real raise
        is the increase after accounting for inflation the change in actual
        purchasing power.
      </p>
      <p>Real raise % ≈ Nominal raise % − Inflation rate %</p>
      <p>
        A 3% salary increase when inflation is 3.5% is a −0.5% real raise your
        salary went up, but you can buy slightly less with it than before. This
        matters most in high-inflation periods when salary increases that feel
        significant are actually falling behind the cost of living.
      </p>

      <h2>Benchmarking against market rate</h2>
      <p>
        A raise's adequacy depends on what the market pays for your role,
        experience, and location. Sources for salary benchmarking:
      </p>
      <ul>
        <li>
          Glassdoor, LinkedIn Salary, Levels.fyi (for tech), and
          industry-specific surveys
        </li>
        <li>
          Conversations with peers in similar roles (often the most accurate
          data point)
        </li>
        <li>
          Recruiter conversations talking to recruiters for competitive
          intelligence, even without intent to leave, gives you current market
          data
        </li>
        <li>
          Job listings what are companies paying for someone with your profile?
        </li>
      </ul>
      <p>
        A raise that brings you to market rate is fundamentally different from a
        raise that keeps you 15% below it. Both are "raises"; only one is
        adequate.
      </p>

      <h2>The compounding effect of small raises</h2>
      <p>
        Small raises compound. A 2% raise this year, 2% next year, and 2% the
        year after results in a 6.12% cumulative increase, not exactly 6%
        (because each percentage is applied to a growing base). Over 10 years,
        2% annual raises produce a 21.9% total increase.
      </p>
      <p>
        For context, if your starting salary was £40,000 and you received 2%
        annually for 10 years, you'd be earning £48,760. If your colleagues who
        job-hopped got 10–15% increases at each move, you can see the long-term
        financial impact of consistently accepting below-market raises.
      </p>

      <h2>What to say if the raise is below expectations</h2>
      <p>
        Negotiating after receiving a raise offer is appropriate and common.
        Useful approaches:
      </p>
      <ul>
        <li>
          Anchor to market data: "Based on comparable roles in this market, I
          was expecting something closer to X."
        </li>
        <li>
          Reference performance: connect the conversation to specific
          contributions and outcomes from the past year.
        </li>
        <li>
          Ask about the review timeline: if budget is constrained, ask when the
          next opportunity to revisit salary is.
        </li>
        <li>
          Consider the total package: if base salary is fixed, negotiate on
          bonus targets, equity, benefits, flexible working, or other
          components.
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>Is a 3% raise good?</h3>
      <p>
        In a low-inflation environment, 3% is broadly in line with typical
        cost-of-living adjustments. In a higher inflation environment, 3% is
        below inflation. For performance-based raises, 3% is below what high
        performers typically expect merit raises are usually 5–10%+ for strong
        performance reviews.
      </p>

      <h3>Does a raise affect pension contributions?</h3>
      <p>
        If contributions are defined as a percentage of salary, yes both
        employer and employee contributions increase proportionally with a
        salary increase. This slightly reduces the net take-home impact of the
        raise but improves long-term retirement savings.
      </p>

      <h3>How much does a £1,000 salary increase affect take-home pay?</h3>
      <p>
        At a 20% marginal tax rate plus National Insurance (UK), a £1,000 gross
        increase yields roughly £680–700 net per year about £57–58 extra per
        month. Use the{" "}
        <a href="/tools/pay-raise-calculator">Pay Raise Calculator</a> for exact
        figures based on your tax situation.
      </p>

      <h2>Conclusion</h2>
      <p>
        Evaluate any raise against three benchmarks: real purchasing power after
        inflation, your market rate for the role, and your own performance. Use
        the <a href="/tools/pay-raise-calculator">Pay Raise Calculator</a> to
        quickly compute the dollar or pound difference, then apply the broader
        context to decide whether it's adequate.
      </p>
    </>
  );
}
