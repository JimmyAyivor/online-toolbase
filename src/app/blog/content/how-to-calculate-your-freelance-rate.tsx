// src/app/blog/content/how-to-calculate-your-freelance-rate.tsx
export default function Post() {
  return (
    <>
      <p>
        Most freelancers price their services one of two ways: they guess based
        on what feels reasonable, or they match what they've heard competitors
        charge. Both approaches leave money on the table and often result in
        rates that don't actually sustain the income you need. Calculating a
        freelance rate from your income requirements produces a defensible
        minimum floor the rate below which you literally cannot afford to work.
      </p>

      <h2>The components of a freelance rate</h2>
      <p>A sustainable freelance rate covers:</p>
      <ul>
        <li>
          <strong>Your target net income</strong> (what you want to take home
          after tax)
        </li>
        <li>
          <strong>Tax and self-employment contributions</strong> (income tax,
          NI/self-employment tax, VAT if applicable)
        </li>
        <li>
          <strong>Business expenses</strong> (software, equipment, insurance,
          professional development)
        </li>
        <li>
          <strong>Non-billable time</strong> (admin, sales, marketing,
          professional development hours not earning)
        </li>
        <li>
          <strong>Paid time off equivalent</strong> (employees get holiday pay;
          freelancers don't work and get paid)
        </li>
        <li>
          <strong>Benefits you fund yourself</strong> (pension, private health
          insurance, income protection)
        </li>
      </ul>
      <p>
        Our{" "}
        <a href="/tools/freelance-rate-calculator">Freelance Rate Calculator</a>{" "}
        works through all of these inputs to produce a minimum hourly and daily
        rate.
      </p>

      <h2>The non-billable time problem</h2>
      <p>
        A common mistake: dividing target annual income by hours in a year. A
        freelancer working full-time doesn't bill 2,080 hours per year a
        significant portion of working time is non-billable: pitching new
        clients, sending invoices, handling contracts, administration,
        professional development. For most freelancers, billable hours are
        50–70% of total working hours.
      </p>
      <p>
        If your target is £60,000/year and you estimate 60% of your time is
        billable: £60,000 ÷ (2,080 × 0.60) = £48.08/hour before tax and
        expenses. This is the floor, not the ceiling.
      </p>

      <h2>The employee equivalent multiplier</h2>
      <p>
        A rough way to set a market-rate starting point: take the equivalent
        employed salary and multiply by 1.5–2. This accounts for the lack of
        benefits, job security, paid leave, and employer contributions that
        employment provides.
      </p>
      <p>
        If the equivalent employed salary is £50,000/year (≈£24/hour), a
        comparable freelance rate would be £36–48/hour before business expenses
        and tax. This is a market-rate benchmark to compare against your
        needs-based calculation.
      </p>

      <h2>Day rates vs hourly rates vs project rates</h2>
      <p>
        Day rates are common in UK contracting, especially in tech and creative
        industries. A day rate based on an hourly rate: multiply by 7–8 hours.
        Project rates require estimating hours, adding a buffer for scope creep
        (typically 20–30%), then multiplying by hourly rate.
      </p>
      <p>
        Project rates can be more profitable than time-based rates if you work
        efficiently but they carry scope risk. Always define deliverables and
        revision limits contractually before quoting a fixed project price.
      </p>

      <h2>Raising your rates</h2>
      <p>
        The best time to raise rates is when you acquire a new client. Raising
        rates for existing clients requires advance notice (typically one
        billing cycle) and a reason increased experience, market rates, or
        simply that your rate hasn't changed in two years. Clients who push back
        hard on a modest rate increase are often the ones not worth keeping at
        the new rate.
      </p>

      <h2>FAQ</h2>

      <h3>Should I charge VAT as a freelancer?</h3>
      <p>
        In the UK, once your taxable turnover exceeds £90,000, VAT registration
        is mandatory. Below that, registration is optional. If your clients are
        VAT-registered businesses, they can reclaim the VAT you charge, making
        registration cost-neutral to them. If your clients are consumers, they
        bear the full VAT cost.
      </p>

      <h3>How do I handle clients who say my rate is too high?</h3>
      <p>
        Either hold the rate (the client wasn't the right fit) or offer a
        reduced scope for the quoted rate. Never reduce your rate for the same
        scope it signals that your original rate wasn't genuine and establishes
        a precedent for future negotiations.
      </p>

      <h3>
        What's a typical day rate for a freelance developer/designer/writer in
        the UK?
      </h3>
      <p>
        Rates vary widely by specialism, experience, and sector. Mid-level
        freelance developers: £350–550/day. Senior/specialist developers:
        £500–900+/day. Designers: £250–550/day. Writers: £300–600/day for
        experienced content professionals. These are indicative ranges location,
        niche, and client type all affect actual rates significantly.
      </p>

      <h2>Conclusion</h2>
      <p>
        Build your rate from your actual income requirements upward, then check
        it against market rates. The{" "}
        <a href="/tools/freelance-rate-calculator">Freelance Rate Calculator</a>{" "}
        structures all the inputs target income, tax, expenses, non-billable
        time, and paid leave into a minimum viable rate. Use that as your floor,
        and price your value above it.
      </p>
    </>
  );
}
