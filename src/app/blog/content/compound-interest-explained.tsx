// src/app/blog/content/compound-interest-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        There's a thought experiment that's been used in finance education for
        decades: if you start with a single penny and double it every day for 30
        days, how much do you end up with? Most people guess a few thousand
        dollars. The actual answer is over $5 million.
      </p>
      <p>
        That's compound interest in extreme form. The real-world version is
        slower, but the principle is identical and it has a more significant
        effect on your financial life than almost anything else you could know
        about money.
      </p>

      <h2>Simple interest vs compound interest: what's actually different</h2>
      <p>
        Simple interest is calculated only on your original principal. You put
        £10,000 in an account paying 5% simple interest, you earn £500 per year.
        Forever. After 20 years: £20,000 total (£10,000 original + £10,000
        interest).
      </p>
      <p>
        Compound interest is calculated on your principal{" "}
        <em>plus all the interest you've already earned</em>. Year one: you earn
        £500 on £10,000. Year two: you earn interest on £10,500 so you earn £525
        instead of £500. Year three: you're earning on £11,025, so you earn
        £551. And so on.
      </p>
      <p>
        After 20 years at 5% compound interest: £26,533 about £6,500 more than
        simple interest, and the gap grows the longer you wait.
      </p>

      <h2>The formula (and why you don't need to memorise it)</h2>
      <p>The standard compound interest formula is:</p>
      <p>
        <strong>A = P × (1 + r/n)^(n×t)</strong>
      </p>
      <ul>
        <li>
          <strong>A</strong> = final amount
        </li>
        <li>
          <strong>P</strong> = principal (starting amount)
        </li>
        <li>
          <strong>r</strong> = annual interest rate as a decimal (5% = 0.05)
        </li>
        <li>
          <strong>n</strong> = number of compounding periods per year
        </li>
        <li>
          <strong>t</strong> = time in years
        </li>
      </ul>
      <p>
        In practice, you don't need to work this out by hand. Our{" "}
        <a href="/tools/compound-interest-calculator">
          Compound Interest Calculator
        </a>{" "}
        takes all these inputs and shows you the full growth breakdown including
        year-by-year figures. Plug in your actual numbers to make the maths
        real.
      </p>

      <h2>Compounding frequency: daily vs monthly vs annual</h2>
      <p>
        Most savings accounts compound monthly or daily. The difference between
        these matters less than most people think, but it is real:
      </p>
      <ul>
        <li>
          £10,000 at 5% for 20 years, compounded <strong>annually</strong>:
          £26,533
        </li>
        <li>
          Same investment, compounded <strong>monthly</strong>: £27,126
        </li>
        <li>
          Same investment, compounded <strong>daily</strong>: £27,182
        </li>
      </ul>
      <p>
        The difference between monthly and daily compounding is about £56 over
        20 years genuinely negligible. The thing that actually moves the needle
        is rate and time, not compounding frequency.
      </p>

      <h2>The Rule of 72: a useful mental shortcut</h2>
      <p>
        Divide 72 by your annual interest rate to get the approximate number of
        years it takes for your investment to double.
      </p>
      <ul>
        <li>At 4%: doubles in 18 years</li>
        <li>At 6%: doubles in 12 years</li>
        <li>At 8%: doubles in 9 years</li>
        <li>At 12%: doubles in 6 years</li>
      </ul>
      <p>
        This also works for debt. A credit card at 24% APR which is fairly
        typical in the UK and US doubles what you owe in 3 years if you're not
        paying it down.
      </p>

      <h2>Why time matters more than almost anything else</h2>
      <p>Here's the example that tends to make people uncomfortable:</p>
      <p>
        Alice starts investing £300/month at age 25. She stops at 35 she's
        invested for exactly 10 years, putting in £36,000 total. Then she leaves
        it alone until retirement at 65.
      </p>
      <p>
        Bob waits until 35 to start, then invests £300/month all the way to 65
        30 years, £108,000 total.
      </p>
      <p>
        At a 7% annual return, Alice ends up with more money at 65 than Bob
        despite investing for a third of the time and a third of the total
        amount. The decade head start she got at 25 compounds over 40 years.
        Bob's contributions, starting later, only compound for up to 30 years.
      </p>
      <p>
        This is why "start investing early" isn't just generic advice the
        compounding window is genuinely irreplaceable.
      </p>

      <h2>Compound interest working against you</h2>
      <p>
        The same mechanism applies to debt. Credit card interest compounds daily
        at most providers. A £3,000 balance at 20% APR, paying only the minimum
        (typically 1–2% of balance per month), can take over 25 years to clear
        and cost more than twice the original amount in interest.
      </p>
      <p>
        Mortgages are a less extreme version of the same dynamic. In the early
        years of a 25-year mortgage, the large majority of each monthly payment
        goes to interest rather than principal. You're essentially paying for
        the right to use the bank's money while the compounding ticks away. This
        is why overpaying a mortgage even small amounts has an outsized effect
        on the total interest cost over the life of the loan.
      </p>

      <h2>Practical takeaways</h2>
      <ul>
        <li>
          <strong>Start early, even with small amounts.</strong> The compounding
          window matters more than the amount.
        </li>
        <li>
          <strong>
            High-interest debt is a guaranteed negative compound investment.
          </strong>{" "}
          A credit card at 20% APR is a "return" of 20% to pay off. Very few
          investments reliably beat that.
        </li>
        <li>
          <strong>Use tax-advantaged accounts.</strong> ISAs, pensions, 401(k)s,
          and similar structures let compound growth accumulate without being
          eroded by annual tax on gains or interest.
        </li>
        <li>
          <strong>Don't break the compounding chain.</strong> Withdrawing early
          resets the clock on whatever you pull out.
        </li>
        <li>
          <strong>Reinvest returns.</strong> Dividends, interest, and
          distributions should go back in, not out that's what "compounding"
          means in practice.
        </li>
      </ul>
      <p>
        Model your own scenarios with our free{" "}
        <a href="/tools/compound-interest-calculator">
          Compound Interest Calculator
        </a>{" "}
        plug in your real numbers and see the difference that different rates,
        timescales, and monthly contributions make.
      </p>
    </>
  );
}
