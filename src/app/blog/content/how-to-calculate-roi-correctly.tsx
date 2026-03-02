// src/app/blog/content/how-to-calculate-roi-correctly.tsx
export default function Post() {
  return (
    <>
      <p>
        Return on Investment is one of the most commonly cited metrics in business — and one of the most frequently misused. People use the same term to describe four or five different calculations, apply it to situations where it's not the right metric, and present results in ways that make positive numbers look better than they are.
      </p>
      <p>
        Here's how ROI actually works, the version of the formula most people get wrong, and how to apply it properly to marketing, projects, and financial investments.
      </p>

      <h2>The correct formula</h2>
      <p>
        <strong>ROI = ((Gain from Investment − Cost of Investment) ÷ Cost of Investment) × 100</strong>
      </p>
      <p>
        Expressed as a percentage. An ROI of 200% means you made back the investment cost plus twice the investment cost in returns. An ROI of -30% means you lost 30% of what you put in.
      </p>
      <p>
        The common mistake: dividing by revenue instead of cost. If you spent £10,000 on a campaign that generated £30,000 in revenue, your ROI is (30,000 − 10,000) ÷ 10,000 × 100 = <strong>200%</strong>. Not 300%, which is what you get if you divide the gain (£20,000) by the revenue (£30,000) and then invert it. The denominator should always be the cost.
      </p>

      <h2>Net profit vs gross revenue: why it matters</h2>
      <p>
        The "gain" in the ROI formula should be net profit from the investment, not gross revenue. Using gross revenue significantly overstates ROI in most business contexts.
      </p>
      <p>
        Example: You spend £5,000 on advertising that generates £25,000 in sales. But the products you sold cost £18,000 to produce. Your actual gain is £25,000 − £18,000 − £5,000 = £2,000. Your ROI is £2,000 ÷ £5,000 × 100 = <strong>40%</strong>.
      </p>
      <p>
        If you'd used gross revenue: (£25,000 − £5,000) ÷ £5,000 × 100 = 400%. Wildly different number, and misleading.
      </p>

      <h2>The time dimension (ROI's biggest blind spot)</h2>
      <p>
        Basic ROI doesn't account for time. A 100% ROI sounds great — but was that over one month or ten years? These are completely different outcomes, and comparing them without adjusting for time produces nonsense conclusions.
      </p>
      <p>
        For investments that span more than a year, use <strong>Annualised ROI</strong>:
      </p>
      <p>
        <strong>Annualised ROI = ((1 + ROI)^(1/n) − 1) × 100</strong>
      </p>
      <p>
        Where n is the number of years. A 100% return over 5 years is an annualised ROI of about 14.9%. A 100% return over 2 years is about 41.4%. Very different.
      </p>

      <h2>ROI for marketing campaigns</h2>
      <p>
        Marketing ROI is where the formula gets abused most frequently, because attribution is difficult and costs are easy to undercount.
      </p>
      <p>
        Include all costs: ad spend, agency fees, creative production, staff time, software tools, attribution costs. Missing any of these inflates ROI artificially.
      </p>
      <p>
        Attribution is the real challenge. Does a Facebook ad that assisted in a conversion get full credit? Half credit? Analysing ROI across a multi-touch customer journey requires decisions about attribution modelling (first-touch, last-touch, linear, time-decay) that significantly affect the resulting number.
      </p>
      <p>
        A common marketing ROI benchmark for digital advertising: 4:1 (400% ROI) is often cited as the minimum threshold for a successful campaign. This accounts for the overhead of running campaigns and the indirect costs not always captured in direct ad spend.
      </p>

      <h2>ROI for business projects and investments</h2>
      <p>
        For capital expenditure, process improvements, or internal projects, ROI analysis helps prioritise where to invest limited budget. The same rules apply: include all costs (implementation, training, maintenance, opportunity cost of staff time), and be realistic about the gain.
      </p>
      <p>
        For investments with uncertain or probabilistic returns, calculate both the expected-case and conservative-case ROI. An investment that shows 200% ROI in the best case but 0% or negative in the realistic case is a different proposition than one showing 80% reliably.
      </p>

      <h2>When ROI isn't the right metric</h2>
      <p>
        ROI works well for comparing investments with clear, measurable financial returns. It works poorly for:
      </p>
      <ul>
        <li><strong>Brand building and awareness campaigns,</strong> where the returns are diffuse and long-term</li>
        <li><strong>Investments with non-financial returns</strong> (employee wellbeing programmes, sustainability initiatives)</li>
        <li><strong>Early-stage R&amp;D</strong> where the probability distribution of outcomes is too wide to produce a meaningful expected return</li>
      </ul>
      <p>
        In these cases, a different metric — Net Present Value, Cost-Benefit Ratio, or simply a strategic rationale — may be more honest than forcing an ROI calculation onto something that doesn't fit the model.
      </p>

      <h2>Calculate yours</h2>
      <p>
        Our free <a href="/tools/roi-calculator">ROI Calculator</a> handles the formula correctly — enter your investment cost and returns, and it calculates both ROI percentage and the net gain. Combine it with the <a href="/tools/percentage-calculator">Percentage Calculator</a> for any related calculations.
      </p>
    </>
  );
}
