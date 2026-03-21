// src/app/blog/content/retirement-planning-how-much-do-you-need.tsx
export default function Post() {
  return (
    <>
      <p>
        Retirement planning has a reputation for being complicated, which leads
        many people to avoid it which is the worst possible outcome, since time
        is the most powerful variable in the calculation. You don't need a
        precise answer to start. You need a reasonable estimate and a direction.
        Here's how to work out roughly what you need, whether you're on track,
        and what the levers are.
      </p>

      <h2>The 4% rule: a starting framework</h2>
      <p>
        The 4% rule is a retirement planning guideline from the Trinity Study
        (1998): withdrawing 4% of your portfolio annually adjusts for inflation
        and has historically left most portfolios intact over a 30-year
        retirement. It gives you a target portfolio size from your desired
        annual income:
      </p>
      <p>Target portfolio = Annual retirement income ÷ 0.04 (multiply by 25)</p>
      <p>
        If you want £30,000/year in retirement income: £30,000 × 25 = £750,000.
        If you want £50,000/year: £1,250,000.
      </p>
      <p>
        This is a starting estimate, not a guarantee. A more conservative 3.5%
        withdrawal rate (multiply by 28.6) is often recommended for longer
        retirements or lower-risk portfolios.
      </p>
      <p>
        Our <a href='/tools/retirement-calculator'>Retirement Calculator</a>{" "}
        projects your portfolio growth based on current savings, monthly
        contributions, expected return, and years to retirement.
      </p>

      <h2>State pension as a baseline</h2>
      <p>
        In the UK, the full new State Pension is currently £11,502/year
        (2024/25), requiring 35 qualifying National Insurance years. This
        reduces the required private pension savings if the State Pension covers
        £11,500 of your £30,000 target, you only need to fund £18,500 privately
        (£18,500 × 25 = £462,500).
      </p>
      <p>
        Check your State Pension forecast via the government's Check Your State
        Pension service. It shows projected State Pension at retirement age
        based on your NI record to date.
      </p>

      <h2>The contribution and return calculation</h2>
      <p>
        To reach a target portfolio by a target date, you need to know three
        things: current savings, monthly contributions, and expected return
        rate.
      </p>
      <p>
        A rough guideline: to retire comfortably, many financial planners
        suggest contributing 15% of gross income to retirement savings from your
        mid-20s. Starting later requires higher contribution rates to compensate
        for lost compound growth years.
      </p>
      <p>
        Real (inflation-adjusted) return assumptions that are commonly used:
        5–7% for a globally diversified equity portfolio, 2–3% for a balanced
        fund, 1–2% for bonds. Use the more conservative end for planning.
      </p>

      <h2>What happens if you're behind</h2>
      <p>If the projection shows a shortfall, the levers are:</p>
      <ul>
        <li>
          <strong>Increase contributions.</strong> The most reliable lever every
          additional £100/month compounds over time.
        </li>
        <li>
          <strong>Work longer.</strong> Each additional year adds contributions
          and reduces the drawdown period, significantly improving outcomes.
        </li>
        <li>
          <strong>Reduce retirement spending target.</strong> A more modest
          lifestyle in retirement requires a smaller portfolio.
        </li>
        <li>
          <strong>Optimise returns.</strong> Unnecessary fees, poor asset
          allocation, or over-conservative portfolios reduce long-term returns.
          Switching to low-cost index funds typically outperforms active
          management over long periods.
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>How much should I have saved for retirement by 40?</h3>
      <p>
        A common rule of thumb: 3× your annual salary by 40. So £35,000 salary →
        £105,000 in pension/retirement savings. This is a benchmark, not a
        prescription but if you're significantly below it, it's worth examining
        why and what to change.
      </p>

      <h3>Is a defined benefit pension still worth the 4% rule calculation?</h3>
      <p>
        Defined benefit pensions pay a fixed income in retirement they're more
        like an annuity than an investment portfolio. To include them in net
        worth or retirement planning, estimate the capital value: annual pension
        income ÷ 0.04 (or whatever withdrawal rate you're using). A DB pension
        paying £15,000/year has a capital equivalent of approximately £375,000
        at a 4% rate.
      </p>

      <h3>Should I pay off my mortgage or invest for retirement?</h3>
      <p>
        If your mortgage rate is below expected investment returns, investing
        typically produces a better outcome. If your mortgage rate is high or
        you're close to retirement, paying it off may make more sense a paid-off
        home reduces retirement income needs significantly. Employer pension
        matching (free money) should usually be captured before any other saving
        or debt repayment.
      </p>

      <h2>Conclusion</h2>
      <p>
        You don't need a perfect retirement plan to start. You need a direction.
        Use the <a href='/tools/retirement-calculator'>Retirement Calculator</a>{" "}
        to project where your current trajectory leads, identify the gap, and
        test different contribution levels to find one you can actually commit
        to. Then automate it and revisit annually.
      </p>
    </>
  );
}
