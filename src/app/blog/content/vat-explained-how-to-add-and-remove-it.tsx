// src/app/blog/content/vat-explained-how-to-add-and-remove-it.tsx
export default function Post() {
  return (
    <>
      <p>
        VAT (Value Added Tax) is a consumption tax applied to goods and services
        across the EU, UK, and most of the world. Unlike US sales tax, which is
        added at the point of final sale, VAT is charged at every stage of the
        supply chain but businesses reclaim the VAT they've paid on inputs, so
        it ultimately falls on the end consumer. Understanding how to add and
        remove VAT correctly is essential for any business, freelancer, or
        finance professional working in VAT-applicable jurisdictions.
      </p>

      <h2>Standard VAT rates by country</h2>
      <ul>
        <li>
          <strong>United Kingdom:</strong> 20% standard rate. 5% reduced rate
          (domestic energy, some children's items). 0% zero rate (food,
          children's clothing, books, most medicines).
        </li>
        <li>
          <strong>European Union:</strong> Varies by member state. Ranges from
          17% (Luxembourg) to 27% (Hungary). Most countries cluster around
          20–25%.
        </li>
        <li>
          <strong>Germany:</strong> 19% standard, 7% reduced
        </li>
        <li>
          <strong>France:</strong> 20% standard, 10% and 5.5% reduced rates
        </li>
        <li>
          <strong>Australia (GST):</strong> 10%
        </li>
        <li>
          <strong>Canada (GST/HST):</strong> 5% federal GST; combined HST rates
          vary by province (13–15%)
        </li>
      </ul>
      <p>
        Use our <a href='/tools/vat-calculator'>VAT Calculator</a> to add or
        remove VAT from any price at any rate.
      </p>

      <h2>Adding VAT to a net price</h2>
      <p>Gross (VAT-inclusive) price = Net price × (1 + VAT rate)</p>
      <p>A £100 service at 20% VAT: £100 × 1.20 = £120 gross.</p>
      <p>This is straightforward. The VAT amount is £100 × 0.20 = £20.</p>

      <h2>Removing VAT from a gross price (reverse VAT)</h2>
      <p>
        This is where the common mistake occurs. If a price of £120 is
        VAT-inclusive at 20%, the net price is:
      </p>
      <p>Net price = Gross price ÷ (1 + VAT rate) = £120 ÷ 1.20 = £100</p>
      <p>The VAT amount is £120 − £100 = £20.</p>
      <p>
        The wrong approach: calculating 20% of £120 = £24. The VAT is £20, not
        £24. The 20% was applied to the net price (£100), not the gross price
        (£120). Calculating 20% of the gross price overstates the VAT content.
      </p>

      <h2>VAT registration and thresholds</h2>
      <p>
        Businesses must register for VAT once their taxable turnover exceeds the
        registration threshold. In the UK, this threshold is £90,000 (2024).
        Below the threshold, registration is voluntary. Above it, registration
        is mandatory.
      </p>
      <p>
        VAT-registered businesses charge VAT on their sales (output tax) and
        reclaim VAT on their purchases (input tax). The difference is paid to
        (or reclaimed from) HMRC quarterly or monthly. Businesses that buy
        significant VAT-able goods and services may reclaim more than they
        collect resulting in VAT repayments rather than payments.
      </p>

      <h2>Zero-rated vs exempt vs outside scope</h2>
      <p>
        These are distinct VAT categories with different implications for input
        tax recovery:
      </p>
      <ul>
        <li>
          <strong>Zero-rated (0%):</strong> VAT-able at 0% businesses can
          reclaim input VAT on costs related to zero-rated supplies. UK
          examples: most food, books, children's clothing, exports.
        </li>
        <li>
          <strong>Exempt:</strong> Not VAT-able businesses cannot reclaim input
          VAT on costs related to exempt supplies. UK examples: insurance,
          financial services, most health and education services.
        </li>
        <li>
          <strong>Outside scope:</strong> Not subject to VAT at all wages,
          donations, some grants. Input VAT recovery rules vary by context.
        </li>
      </ul>
      <p>
        Businesses making both exempt and taxable supplies face partial
        exemption calculations a complex area requiring professional advice.
      </p>

      <h2>FAQ</h2>

      <h3>Do I charge VAT to overseas customers?</h3>
      <p>
        It depends on the customer type and location. UK businesses typically
        don't charge UK VAT on exports to non-UK businesses (B2B) or consumers
        (B2C) in some cases, but may need to account for VAT in the customer's
        country depending on the supply type and value. Post-Brexit rules for
        UK-EU trade added significant complexity. Professional advice is
        recommended for international VAT.
      </p>

      <h3>What's the difference between VAT and GST?</h3>
      <p>
        GST (Goods and Services Tax) is functionally equivalent to VAT a
        multi-stage consumption tax with input tax credits. The name differs by
        country (Australia, Canada, Singapore, India all use GST or a variant).
        The mechanism is the same: tax collected at each stage, reclaimed
        through the chain, net cost to end consumer.
      </p>

      <h3>Can individuals reclaim VAT?</h3>
      <p>
        Generally no VAT recovery is for VAT-registered businesses. However,
        tourists leaving the EU or UK may be able to reclaim VAT on qualifying
        purchases through refund schemes at ports of departure.
      </p>

      <h2>Conclusion</h2>
      <p>
        The critical calculation to get right is reverse VAT dividing by (1 +
        rate) rather than subtracting a percentage of the gross. Use the{" "}
        <a href='/tools/vat-calculator'>VAT Calculator</a> to add or remove VAT
        at any rate without arithmetic errors, and use the{" "}
        <a href='/tools/sales-tax-calculator'>Sales Tax Calculator</a> for US
        state tax calculations.
      </p>
    </>
  );
}
