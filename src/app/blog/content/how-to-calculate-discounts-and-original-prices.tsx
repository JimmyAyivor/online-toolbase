// src/app/blog/content/how-to-calculate-discounts-and-original-prices.tsx
export default function Post() {
  return (
    <>
      <p>
        Sale pricing is deliberately confusing. "40% off" sounds significant
        until you realise what you're starting from and "was £200, now £120"
        requires a calculation to verify whether that's actually 40% off or
        something else. Knowing how to quickly calculate discounts, verify sale
        claims, and work backwards from sale prices helps you make better
        purchasing decisions and, if you're a retailer, set pricing more
        accurately.
      </p>

      <h2>Calculating the sale price from a discount percentage</h2>
      <p>Sale price = Original price × (1 − discount rate)</p>
      <p>A £80 item at 25% off: £80 × (1 − 0.25) = £80 × 0.75 = £60.</p>
      <p>
        Mental shortcut: for a 25% discount, multiply by 0.75. For 10% off,
        multiply by 0.9. For 20% off, multiply by 0.8. The multiplier is always
        (1 − the decimal form of the discount).
      </p>

      <h2>Calculating the discount amount</h2>
      <p>Discount amount = Original price × discount rate</p>
      <p>A £80 item at 25% off saves: £80 × 0.25 = £20.</p>

      <h2>Working backwards: finding the original price</h2>
      <p>
        This is the calculation most people get wrong. If an item costs £60
        after a 25% discount, the original price is NOT £60 + 25% of £60 (that
        gives £75, which is wrong).
      </p>
      <p>Original price = Sale price ÷ (1 − discount rate)</p>
      <p>£60 ÷ (1 − 0.25) = £60 ÷ 0.75 = £80. Correct.</p>
      <p>
        The error happens because the percentage was taken off the original
        price, not the sale price. Adding the same percentage back to the sale
        price adds a smaller absolute amount.
      </p>
      <p>
        Our <a href='/tools/discount-calculator'>Discount Calculator</a> handles
        all three calculations sale price, discount amount, and original price
        instantly.
      </p>

      <h2>Verifying sale price claims</h2>
      <p>
        Retailers are required to be accurate about discounts in most
        jurisdictions, but errors and misleading claims occur. To verify:
      </p>
      <p>
        Claimed discount % = ((Original price − Sale price) ÷ Original price) ×
        100
      </p>
      <p>
        "Was £200, now £130": ((200 − 130) ÷ 200) × 100 = 35% not "up to 40%
        off" as the banner claims. This kind of discrepancy is common in sales
        marketing.
      </p>

      <h2>Stacked discounts</h2>
      <p>
        When discounts stack "10% off already reduced items" you can't simply
        add the percentages. A 20% discount followed by an additional 10%
        discount is not 30% total.
      </p>
      <p>
        £100 → 20% off = £80 → 10% off that = £72. Total discount: £28 off £100
        = 28%, not 30%.
      </p>
      <p>
        For any number of stacked discounts, multiply the factors: (1 − 0.20) ×
        (1 − 0.10) = 0.80 × 0.90 = 0.72. So you pay 72% of the original price.
      </p>

      <h2>Retail pricing strategy context</h2>
      <p>
        Understanding discount mathematics from the seller's side: a 50%
        discount on a product with a 40% gross margin means selling below cost.
        A 30% discount on a 60% margin product still leaves the seller
        profitable. This is why "up to X% off" sales can coexist with maintained
        profitability the largest discounts are often on items with the highest
        original margins or end-of-season stock the retailer needs to clear.
      </p>

      <h2>FAQ</h2>

      <h3>Is a 50% off sale the same as buy one get one free?</h3>
      <p>
        Mathematically yes, on a per-unit basis both result in paying half price
        per item, assuming equal value items. The difference is practical: BOGO
        requires buying two items; 50% off applies to one.
      </p>

      <h3>How do I calculate a discount in Excel?</h3>
      <p>
        Sale price: <code>=original*(1-discount_rate)</code>. Discount amount:{" "}
        <code>=original*discount_rate</code>. Original from sale price:{" "}
        <code>=sale/(1-discount_rate)</code>.
      </p>

      <h3>
        What's the effective discount when a coupon is applied to a sale price?
      </h3>
      <p>
        Multiply the retained factors. A 20%-off sale with a 15% coupon: you pay
        0.80 × 0.85 = 68% of original, effectively a 32% total discount. Use the{" "}
        <a href='/tools/discount-calculator'>Discount Calculator</a> to chain
        multiple discounts.
      </p>

      <h2>Conclusion</h2>
      <p>
        The most useful skill in discount calculations is working backwards from
        a sale price and knowing that you can't simply add the percentage back
        to recover the original. Use the{" "}
        <a href='/tools/discount-calculator'>Discount Calculator</a> for quick
        verification and calculation, and apply the stacking formula whenever
        multiple discounts are involved.
      </p>
    </>
  );
}
