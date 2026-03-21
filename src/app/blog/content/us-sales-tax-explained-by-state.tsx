// src/app/blog/content/us-sales-tax-explained-by-state.tsx
export default function Post() {
  return (
    <>
      <p>
        Sales tax in the United States is notoriously fragmented. Unlike most
        countries that apply a single national consumption tax, the US has no
        federal sales tax instead, 45 states plus the District of Columbia levy
        their own rates, counties add their own on top, cities add theirs, and
        the combined rates can vary block by block. Understanding how it works
        is essential for any business selling across state lines and useful for
        any consumer trying to understand what they're actually paying.
      </p>

      <h2>How US sales tax works</h2>
      <p>
        Sales tax is a consumption tax collected at the point of sale. The
        seller collects it from the buyer and remits it to the appropriate tax
        authority. The combined rate a buyer pays is typically the sum of:
      </p>
      <ul>
        <li>State rate (set by the state legislature)</li>
        <li>County rate (varies by county)</li>
        <li>City/municipal rate (varies by city)</li>
        <li>Special district rates (for transit authorities, schools, etc.)</li>
      </ul>
      <p>
        The resulting combined rate can range from 0% (in states with no sales
        tax) to over 12% in some localities.
      </p>
      <p>
        Use our <a href='/tools/sales-tax-calculator'>Sales Tax Calculator</a>{" "}
        to calculate the tax amount and final price for any base price and rate.
      </p>

      <h2>States with no sales tax</h2>
      <p>
        Five states levy no state-level sales tax: Alaska, Delaware, Montana,
        New Hampshire, and Oregon. Note that Alaska allows local jurisdictions
        to impose their own sales taxes, so some Alaskan municipalities do have
        sales tax despite no state rate.
      </p>

      <h2>Highest combined sales tax rates</h2>
      <p>
        States with high state rates plus high local rates produce the largest
        combined figures. Tennessee, Louisiana, Arkansas, Washington, and
        Alabama consistently rank among the highest combined rates nationally,
        with some localities exceeding 11–12%.
      </p>

      <h2>What's taxable varies by state</h2>
      <p>
        States don't apply sales tax uniformly to all goods and services. Common
        exemptions that vary by state:
      </p>
      <ul>
        <li>
          <strong>Groceries:</strong> Most states exempt unprepared food from
          sales tax or apply a reduced rate. A few states tax groceries at the
          full rate.
        </li>
        <li>
          <strong>Clothing:</strong> Several states (including New York and
          Pennsylvania) exempt clothing under certain price thresholds.
        </li>
        <li>
          <strong>Prescription medications:</strong> Generally exempt in most
          states.
        </li>
        <li>
          <strong>Digital goods:</strong> Software, digital downloads, and
          streaming services taxability varies widely and is still evolving in
          many states.
        </li>
        <li>
          <strong>Services:</strong> Historically often untaxed, but more states
          are expanding sales tax to services.
        </li>
      </ul>

      <h2>Economic nexus and online sales</h2>
      <p>
        The 2018 Supreme Court ruling in South Dakota v. Wayfair changed the
        landscape for online sellers. States can now require sellers to collect
        sales tax if they exceed an economic nexus threshold in that state
        typically $100,000 in sales or 200 transactions per year even without a
        physical presence. Most states have adopted similar rules.
      </p>
      <p>
        This means online businesses selling nationally need to track sales by
        state and remit to each state where they have nexus. Sales tax
        compliance for e-commerce is now significantly more complex than it was
        pre-2018.
      </p>

      <h2>Sales tax vs VAT</h2>
      <p>
        US sales tax is applied only at the final sale to the consumer. VAT
        (used in the EU, UK, and most of the world) is applied at every stage of
        the supply chain, with businesses claiming back the VAT they paid on
        inputs. For consumers, the economic result is similar; for businesses,
        the compliance mechanisms are completely different.
      </p>

      <h2>FAQ</h2>

      <h3>Is sales tax included in displayed prices in the US?</h3>
      <p>
        Generally no US retail prices are typically displayed before tax, with
        tax added at checkout. This differs from most other countries where the
        displayed price includes all taxes. The practice of displaying pre-tax
        prices means the final amount is often higher than the price shown.
      </p>

      <h3>Can businesses deduct sales tax paid as a business expense?</h3>
      <p>
        Sales tax paid on business purchases is generally deductible as a
        business expense, similar to any other operating cost. Businesses
        registered to collect sales tax typically don't pay it on purchases for
        resale.
      </p>

      <h3>What's the simplest way to calculate sales tax for a purchase?</h3>
      <p>
        Multiply the pre-tax price by the combined tax rate (expressed as a
        decimal). A $50 item at 8.5% tax: $50 × 0.085 = $4.25 tax, total =
        $54.25. Use the{" "}
        <a href='/tools/sales-tax-calculator'>Sales Tax Calculator</a> to handle
        this instantly for any rate.
      </p>

      <h2>Conclusion</h2>
      <p>
        US sales tax is among the most complex consumption tax systems in the
        world for businesses operating across state lines. For individuals, the
        key variables are the combined rate in your locality and what's exempt
        in your state. Use the{" "}
        <a href='/tools/sales-tax-calculator'>Sales Tax Calculator</a> to
        compute the tax and final price for any purchase, and the{" "}
        <a href='/tools/vat-calculator'>VAT Calculator</a> for UK and EU
        transactions.
      </p>
    </>
  );
}
