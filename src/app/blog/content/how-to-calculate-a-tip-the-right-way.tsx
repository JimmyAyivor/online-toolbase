// src/app/blog/content/how-to-calculate-a-tip-the-right-way.tsx
export default function Post() {
  return (
    <>
      <p>
        Tipping is one of those calculations most people do in their heads with
        varying degrees of accuracy. The standard guidance is 15–20% in the US;
        10–15% in the UK; variable across Europe and Asia. But the more useful
        question isn't "what's the percentage?" it's "how do I calculate it
        quickly and fairly for a group?"
      </p>

      <h2>The quick mental maths method</h2>
      <p>
        For a 10% tip: move the decimal point one place to the left. A $48 bill:
        10% = $4.80. For 20%: double the 10% figure. $4.80 × 2 = $9.60. For 15%:
        take the 10% figure and add half of it. $4.80 + $2.40 = $7.20.
      </p>
      <p>
        This covers the three standard tip percentages with only two mental
        operations each. For everything else splitting among multiple people,
        adjusting for service quality, calculating the total our{" "}
        <a href="/tools/tip-calculator">Tip Calculator</a> handles it instantly.
      </p>

      <h2>Standard tipping rates by country and context</h2>
      <p>
        Tipping norms vary significantly by country, service type, and context:
      </p>
      <ul>
        <li>
          <strong>United States:</strong> 18–20% for sit-down restaurants; 15%
          for acceptable service; 25%+ for exceptional. 15–20% for
          taxi/rideshare, hairdressers, food delivery. Coffee shops: optional,
          typically $1–2 per drink.
        </li>
        <li>
          <strong>United Kingdom:</strong> 10–15% at restaurants (check if
          service charge is already included many London restaurants add 12.5%
          automatically). Not expected at pubs ordering at the bar.
        </li>
        <li>
          <strong>Continental Europe:</strong> Rounding up or 5–10% is typical
          in most countries. Service charges are often included in France and
          other countries. Tipping culture is less universal than in the US.
        </li>
        <li>
          <strong>Japan:</strong> Tipping is not customary and can be considered
          rude in some contexts. Service is considered part of the job.
        </li>
        <li>
          <strong>Australia:</strong> Not expected but appreciated; 10% for
          exceptional service in restaurants. Tipping culture is growing but not
          obligatory.
        </li>
      </ul>

      <h2>Splitting a bill with a group</h2>
      <p>
        The simplest approach: add the tip to the total first, then divide
        equally by the number of people. This avoids the awkwardness of
        calculating individual shares and tip separately.
      </p>
      <p>
        Where it gets complicated: different people ordered very different
        amounts, some people had alcohol and others didn't, or some people
        arrived later and had fewer courses. In these cases, itemised splitting
        is fairer and the best approach is usually just to split what each
        person actually consumed and then add a shared tip.
      </p>
      <p>
        The tip calculator handles both scenarios: equal split or custom number
        of people.
      </p>

      <h2>Should you tip on the pre-tax or post-tax amount?</h2>
      <p>
        In the US, etiquette varies. Some tip on the pre-tax subtotal; others on
        the full post-tax bill. The practical difference is small (a 20% tip on
        a $50 pre-tax bill is $10; on a $53 post-tax bill it's $10.60). Most
        people tip on the post-tax total for simplicity. Neither approach is
        wrong.
      </p>

      <h2>When an automatic service charge is included</h2>
      <p>
        Many restaurants add an automatic gratuity (often 18–20%) for large
        parties, or a service charge that goes directly to the restaurant rather
        than staff. Always check the bill before adding an additional tip. If a
        service charge is already included and you want to tip the staff
        directly, cash tips are the most reliable way for them to receive it.
      </p>

      <h2>FAQ</h2>

      <h3>Should I tip on alcohol?</h3>
      <p>
        In the US, yes the same percentage tip applies. Some people tip more
        generously on high-margin items like cocktails. In wine-service-heavy
        restaurants, some diners tip differently on a very expensive bottle
        versus food.
      </p>

      <h3>What if the service was bad?</h3>
      <p>
        This is a judgment call. In the US, where servers' base wages are often
        low, withholding a tip entirely sends a stronger message to the
        management than the server. A reduced tip (10%) communicates
        dissatisfaction without eliminating compensation. Speaking to a manager
        about the experience is often a more effective correction.
      </p>

      <h3>How do you tip on a delivery order?</h3>
      <p>
        15–20% is standard for delivery in the US. Consider the distance,
        weather, and whether the delivery person is working for an app that
        takes a significant commission. Cash tips are often more fully received
        than in-app tips.
      </p>

      <h2>Conclusion</h2>
      <p>
        The 10% mental maths trick covers most quick calculations. For groups,
        large bills, or situations where you want to split precisely, use the{" "}
        <a href="/tools/tip-calculator">Tip Calculator</a> to get the right
        number and a fair split without any mental arithmetic.
      </p>
    </>
  );
}
