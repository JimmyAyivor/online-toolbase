// src/app/blog/content/macro-calculator-how-to-set-your-targets.tsx
export default function Post() {
  return (
    <>
      <p>
        Macronutrient targets the daily grams of protein, carbohydrate, and fat
        that make up your total calories are the next layer of nutritional
        precision beyond simply counting calories. Most people eating to a
        calorie target have no idea whether they're getting enough protein to
        preserve muscle, or whether their fat intake is too low to support
        hormone health. Setting macro targets alongside calorie targets adds
        meaningful structure to your diet without requiring professional
        intervention.
      </p>

      <h2>The three macronutrients and their caloric values</h2>
      <ul>
        <li>
          <strong>Protein:</strong> 4 calories per gram. Builds and repairs
          muscle tissue, the most satiating macronutrient, highest thermic
          effect (costs more energy to digest).
        </li>
        <li>
          <strong>Carbohydrates:</strong> 4 calories per gram. Primary fuel for
          high-intensity exercise and brain function. Stored as glycogen in
          muscle and liver.
        </li>
        <li>
          <strong>Fat:</strong> 9 calories per gram. Essential for hormone
          production, fat-soluble vitamin absorption (A, D, E, K), and cell
          membrane integrity. More than twice as calorie-dense as protein or
          carbs.
        </li>
      </ul>
      <p>
        A daily intake of 150g protein + 200g carbs + 70g fat = (150×4) +
        (200×4) + (70×9) = 600 + 800 + 630 = 2,030 calories.
      </p>
      <p>
        Our <a href='/tools/macro-calculator'>Macro Calculator</a> calculates
        your personalised daily macro targets based on your weight, activity
        level, and goal.
      </p>

      <h2>Evidence-based macro targets by goal</h2>

      <h3>Fat loss</h3>
      <ul>
        <li>
          <strong>Protein:</strong> 1.6–2.4g per kg bodyweight. High protein
          preserves muscle while in a calorie deficit and maximises satiety.
        </li>
        <li>
          <strong>Fat:</strong> Minimum 0.7–1g per kg bodyweight. Going below
          ~20% of calories from fat risks hormonal disruption.
        </li>
        <li>
          <strong>Carbs:</strong> Remainder of calorie budget after protein and
          fat are set. Flex this based on exercise demands.
        </li>
        <li>
          <strong>Calories:</strong> 300–500 below TDEE.
        </li>
      </ul>

      <h3>Muscle gain</h3>
      <ul>
        <li>
          <strong>Protein:</strong> 1.6–2.2g per kg bodyweight. Adequate to
          maximise muscle protein synthesis.
        </li>
        <li>
          <strong>Carbs:</strong> Higher than maintenance carbs fuel training
          and support recovery.
        </li>
        <li>
          <strong>Fat:</strong> 0.8–1g per kg bodyweight.
        </li>
        <li>
          <strong>Calories:</strong> 200–300 above TDEE (lean bulk) to minimise
          fat gain while supporting muscle growth.
        </li>
      </ul>

      <h3>Maintenance and performance</h3>
      <ul>
        <li>
          <strong>Protein:</strong> 1.4–2g per kg bodyweight.
        </li>
        <li>
          <strong>Carbs and fat:</strong> Split remaining calories according to
          preference and performance demands. Higher carbs benefit athletes with
          high-intensity training volumes; moderate fat supports overall health.
        </li>
      </ul>

      <h2>Setting targets in grams, not percentages</h2>
      <p>
        Percentage-based macro targets ("40/30/30") are less useful than
        gram-based targets because percentages change as total calories change.
        If your calorie target drops from 2,500 to 2,000 and you maintain a 30%
        protein target, your protein drops from 188g to 150g potentially
        insufficient if your needs are based on bodyweight.
      </p>
      <p>
        Set protein first (in grams per kg bodyweight), fat second (minimum
        threshold or preferred amount), then fill remaining calories with
        carbohydrates. This approach ensures needs-based targets regardless of
        total calorie level.
      </p>

      <h2>Tracking macros practically</h2>
      <p>
        Food tracking apps (MyFitnessPal, Cronometer, MacroFactor) show macro
        breakdowns alongside calorie counts. Scanning barcodes or searching a
        food database takes 1–2 minutes per meal. Most people find tracking for
        2–4 weeks builds sufficient awareness of typical macro contents that
        strict daily tracking becomes less necessary.
      </p>
      <p>
        For protein specifically: knowing the protein content of your typical
        meals (eggs ~6g each, chicken breast ~30g per 100g, Greek yoghurt ~10g
        per 100g) lets you roughly assess your daily intake without precise
        tracking.
      </p>

      <h2>FAQ</h2>

      <h3>Do I need to hit my macros exactly every day?</h3>
      <p>
        No consistency over weeks matters more than daily precision. Being
        within 10g of targets on most days produces the same results as hitting
        exact numbers every day. Week-level averages matter more than any single
        day.
      </p>

      <h3>What happens if I go over on one macro?</h3>
      <p>
        If you go over on fat or carbs but stay within your calorie target, it
        doesn't significantly matter for body composition. If going over on a
        macro pushes you over your calorie target, that's what matters most.
        Protein overconsumption is the least problematic excess protein is
        converted to fuel rather than stored as fat.
      </p>

      <h3>Should I track macros or just calories?</h3>
      <p>
        For general weight management: calories are sufficient. For body
        composition goals (building muscle while minimising fat gain, or losing
        fat while preserving muscle): tracking protein at minimum, alongside
        calories, produces meaningfully better results. Full macro tracking is
        for those with specific performance or body composition goals. See also:{" "}
        <a href='/tools/calorie-macro-calculator'>Calorie & Macro Calculator</a>{" "}
        for a combined approach.
      </p>

      <h2>Conclusion</h2>
      <p>
        Macro targets give nutritional precision beyond simple calorie counting.
        Set protein first based on bodyweight, fat at a health-supporting
        minimum, and fill remaining calories with carbohydrates based on
        training volume and preference. Use the{" "}
        <a href='/tools/macro-calculator'>Macro Calculator</a> to get your
        personalised gram targets for any goal, and combine with the{" "}
        <a href='/tools/calorie-deficit-calculator'>
          Calorie Deficit Calculator
        </a>{" "}
        for a complete nutritional plan.
      </p>
    </>
  );
}
