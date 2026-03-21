// src/app/blog/content/how-to-calculate-your-daily-calorie-needs.tsx
export default function Post() {
  return (
    <>
      <p>
        Your daily calorie needs aren't a fixed number they change based on your
        body size, activity level, age, and goals. Eating the same amount every
        day regardless of whether you're sedentary or training hard means either
        chronic underfuelling or unintentional overconsumption. Getting your
        calorie target right is the first practical step in any meaningful
        nutrition strategy.
      </p>

      <h2>Basal Metabolic Rate and Total Daily Energy Expenditure</h2>
      <p>
        Your Basal Metabolic Rate (BMR) is the number of calories your body
        burns at complete rest the energy needed to keep you alive without any
        physical activity. It accounts for roughly 60–75% of total daily calorie
        burn for most people.
      </p>
      <p>
        Total Daily Energy Expenditure (TDEE) is BMR multiplied by an activity
        factor your actual calorie burn across a full day including all
        movement, exercise, and digestion. TDEE is the number you need to know:
        eating at TDEE maintains your current weight; eating below it creates a
        deficit for fat loss; eating above it creates a surplus for muscle
        growth.
      </p>
      <p>
        Our <a href='/tools/calorie-calculator'>Calorie Calculator</a> estimates
        both BMR and TDEE based on your height, weight, age, sex, and activity
        level.
      </p>

      <h2>How BMR is calculated: the Mifflin-St Jeor equation</h2>
      <p>
        The Mifflin-St Jeor equation is the most widely validated formula for
        estimating BMR in modern adults:
      </p>
      <ul>
        <li>
          <strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in
          cm) − (5 × age) + 5
        </li>
        <li>
          <strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in
          cm) − (5 × age) − 161
        </li>
      </ul>
      <p>
        Example: a 30-year-old woman, 65kg, 168cm: BMR = (10 × 65) + (6.25 ×
        168) − (5 × 30) − 161 = 650 + 1,050 − 150 − 161 = 1,389 calories/day at
        rest.
      </p>

      <h2>Activity multipliers</h2>
      <p>BMR is multiplied by an activity factor to estimate TDEE:</p>
      <ul>
        <li>
          <strong>Sedentary</strong> (desk job, little exercise): BMR × 1.2
        </li>
        <li>
          <strong>Lightly active</strong> (light exercise 1–3 days/week): BMR ×
          1.375
        </li>
        <li>
          <strong>Moderately active</strong> (moderate exercise 3–5 days/week):
          BMR × 1.55
        </li>
        <li>
          <strong>Very active</strong> (hard exercise 6–7 days/week): BMR ×
          1.725
        </li>
        <li>
          <strong>Extra active</strong> (very hard exercise, physical job): BMR
          × 1.9
        </li>
      </ul>
      <p>
        Using the example above: TDEE at moderately active = 1,389 × 1.55 =
        2,153 calories/day.
      </p>

      <h2>TDEE accuracy and individual variation</h2>
      <p>
        Calculated TDEE is an estimate, not a measurement. Actual calorie burn
        varies from person to person even with identical stats differences in
        metabolic efficiency, non-exercise activity thermogenesis (fidgeting,
        posture, daily movement), and digestive efficiency all affect real
        calorie expenditure.
      </p>
      <p>
        The most reliable approach: use the calculated TDEE as a starting point,
        track weight for 2–3 weeks at that intake, and adjust based on actual
        results. If weight is stable, you're at your real TDEE. If losing, your
        real TDEE is higher than calculated (eat more). If gaining, it's lower.
      </p>

      <h2>Calorie needs by goal</h2>
      <ul>
        <li>
          <strong>Maintenance:</strong> Eat at TDEE
        </li>
        <li>
          <strong>Fat loss:</strong> 300–500 calorie daily deficit
          (0.3–0.5kg/week loss). Larger deficits increase muscle loss risk and
          are harder to sustain.
        </li>
        <li>
          <strong>Muscle gain:</strong> 200–300 calorie daily surplus. Larger
          surpluses produce more fat gain without proportionally more muscle.
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>Do calorie needs change as you lose weight?</h3>
      <p>
        Yes as you lose weight, your BMR decreases (smaller body requires fewer
        calories). A deficit that produced 0.5kg/week of loss at the start may
        produce less over time as TDEE falls. Recalculate every 5–10kg of weight
        change to keep your targets accurate.
      </p>

      <h3>Why do calorie calculators give different numbers?</h3>
      <p>
        Different calculators use different BMR equations (Mifflin-St Jeor,
        Harris-Benedict, Katch-McArdle) and different activity multipliers. The
        Mifflin-St Jeor equation is the most accurate for most people.
        Katch-McArdle uses lean body mass and can be more accurate for muscular
        individuals if you know your body fat percentage.
      </p>

      <h3>Should I eat back exercise calories?</h3>
      <p>
        If you calculated TDEE using an activity multiplier that already
        includes your exercise, no they're already counted. If you used a
        sedentary multiplier and are exercising on top, adding back some
        exercise calories is appropriate. Most calculators include exercise in
        the activity multiplier, so eating back isn't necessary.
      </p>

      <h2>Conclusion</h2>
      <p>
        Your calorie target flows from TDEE, which flows from BMR and activity
        level. Use the{" "}
        <a href='/tools/calorie-calculator'>Calorie Calculator</a> to get your
        starting estimate, treat it as a working hypothesis, and adjust based on
        real-world results over 2–3 weeks. Combine with the{" "}
        <a href='/tools/calorie-macro-calculator'>Calorie & Macro Calculator</a>{" "}
        to set macro targets alongside your calorie goal.
      </p>
    </>
  );
}
