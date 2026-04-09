// src/app/blog/content/how-much-water-should-you-drink-per-day.tsx
export default function Post() {
  return (
    <>
      <p>
        The "8 glasses a day" rule is one of the most persistent health myths
        with no scientific basis. The real answer depends on your body weight,
        activity level, climate, and diet and it's not the same for everyone.
        Understanding what actually determines your hydration needs produces a
        more accurate target than any one-size-fits-all guideline.
      </p>

      <h2>Where the 8 glasses rule came from</h2>
      <p>
        The 8×8 (8 glasses of 8 ounces = 64 oz ≈ 1.9 litres) guideline traces
        back to a 1945 US Food and Nutrition Board recommendation of 2.5 litres
        per day which included water from all food sources. The "all food
        sources" part was lost over time, leaving the bare fluid recommendation
        standing on its own as if it applied to drinking alone. It doesn't have
        a robust evidence base as a universal daily drinking target.
      </p>

      <h2>Evidence-based daily fluid intake recommendations</h2>
      <p>
        The US National Academies of Medicine adequate intake recommendations:
      </p>
      <ul>
        <li>
          <strong>Men:</strong> 3.7 litres (125 oz) total water per day from all
          sources (food + drinks)
        </li>
        <li>
          <strong>Women:</strong> 2.7 litres (91 oz) total water per day from
          all sources
        </li>
      </ul>
      <p>
        Approximately 20% of daily water intake comes from food (fruits,
        vegetables, cooked foods). That leaves approximately 3 litres for men
        and 2.2 litres for women as daily fluid intake targets from drinks not
        exactly the 8-glass rule.
      </p>
      <p>
        Use our{" "}
        <a href="/tools/water-intake-calculator">Water Intake Calculator</a> to
        get a personalised recommendation based on your weight, activity level,
        and climate.
      </p>

      <h2>Factors that increase water needs</h2>
      <ul>
        <li>
          <strong>Exercise:</strong> 0.5–1 litre per hour of moderate exercise;
          more in heat or high-intensity efforts. Replace sweat losses.
        </li>
        <li>
          <strong>Hot or humid climate:</strong> Increases sweat rate
          significantly. An additional 0.5–1 litre per day in hot conditions is
          reasonable.
        </li>
        <li>
          <strong>High altitude:</strong> Increased respiratory rate causes
          higher water loss. Additional intake recommended above 2,500m.
        </li>
        <li>
          <strong>Illness with fever, diarrhoea, or vomiting:</strong>{" "}
          Significant fluid and electrolyte losses require increased intake and
          often electrolyte replacement.
        </li>
        <li>
          <strong>Pregnancy:</strong> Increased needs approximately 300ml/day
          additional recommended.
        </li>
        <li>
          <strong>Breastfeeding:</strong> Approximately 700ml/day additional
          needed for milk production.
        </li>
        <li>
          <strong>High-protein diet:</strong> Protein metabolism produces more
          urea, requiring more water for kidney filtration.
        </li>
      </ul>

      <h2>Does coffee and tea count toward fluid intake?</h2>
      <p>
        Yes. Despite caffeine's mild diuretic effect, caffeinated beverages
        still provide a net hydration benefit the water in the drink exceeds the
        water lost through increased urination. The exception: very high
        caffeine intake (over 5–6 cups of coffee) may tip toward a net diuretic
        effect. For most people, coffee and tea contribute meaningfully to daily
        fluid intake.
      </p>

      <h2>How to know if you're adequately hydrated</h2>
      <p>
        Urine colour is the simplest indicator. Pale straw yellow = well
        hydrated. Dark yellow = needs more fluid. Colourless = potentially
        over-hydrated (rare problem, but over-hydration in extreme situations
        like endurance events can be dangerous). Thirst is a reliable indicator
        for healthy adults in normal conditions you don't need to pre-empt
        thirst significantly unless exercising intensely in heat.
      </p>

      <h2>FAQ</h2>

      <h3>Can you drink too much water?</h3>
      <p>
        Yes, though it's uncommon outside specific contexts. Hyponatraemia (low
        blood sodium from excessive water dilution) can occur when drinking very
        large amounts over a short period, especially during prolonged endurance
        events like marathons. Drinking plain water without electrolytes for
        hours of intense exercise is the main risk scenario. For everyday life,
        drinking enough to produce pale yellow urine is the target.
      </p>

      <h3>Does body weight affect how much water you need?</h3>
      <p>
        Yes larger bodies have more cells to hydrate and generally have higher
        metabolic activity. A common rough guideline: 30–35ml of water per kg of
        bodyweight per day. At 70kg: 2.1–2.45 litres; at 90kg: 2.7–3.15 litres.
        The <a href="/tools/water-intake-calculator">Water Intake Calculator</a>{" "}
        applies this and adjusts for activity level.
      </p>

      <h3>Is water from food significant?</h3>
      <p>
        Yes. Fruits and vegetables have high water content cucumbers and lettuce
        are over 95% water; watermelon and strawberries over 90%; cooked grains
        absorb water during cooking. A diet high in fruit and vegetables
        contributes meaningfully to daily fluid intake.
      </p>

      <h2>Conclusion</h2>
      <p>
        Ignore the 8-glasses rule and use a personalised estimate instead. A
        rough target: 30–35ml per kg of bodyweight, adjusted upward for
        exercise, heat, illness, and pregnancy. Use the{" "}
        <a href="/tools/water-intake-calculator">Water Intake Calculator</a> for
        a specific recommendation and use urine colour as your daily feedback
        mechanism.
      </p>
    </>
  );
}
