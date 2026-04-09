// src/app/blog/content/calories-macros-what-to-track.tsx
export default function Post() {
  return (
    <>
      <p>
        The calories vs macros debate generates a lot of heat online, usually
        from people with strong opinions and a vested interest in one approach.
        The more useful answer is that it depends on what you're trying to do
        and for most people, the choice isn't either/or.
      </p>
      <p>
        Here's a practical breakdown of what each approach actually does, when
        it's appropriate, and how to calculate the numbers you need.
      </p>

      <h2>What calories track (and why they matter)</h2>
      <p>
        A calorie is a unit of energy. Calories in versus calories out the
        energy your body takes in from food versus the energy it expends in
        basic metabolic functions, digestion, and physical activity determines
        whether you gain, lose, or maintain weight over time.
      </p>
      <p>
        This is sometimes dismissed as an oversimplification, and it is a
        simplification hormones, sleep, stress, gut microbiome, food composition
        and timing all affect weight and body composition. But the fundamental
        energy balance principle is well-supported and forms the basis of all
        evidence-based nutrition guidance. The argument about whether "a calorie
        is just a calorie" doesn't change the fact that being in a sustained
        calorie deficit leads to weight loss and a sustained surplus leads to
        weight gain.
      </p>
      <p>
        Calorie tracking is most useful for: weight loss, weight gain, getting a
        baseline understanding of how much you're eating when you don't know, or
        maintaining weight after a period of significant change.
      </p>

      <h2>What macros track (and why they matter differently)</h2>
      <p>
        Macronutrients are the three categories of nutrient that provide
        calories: protein, carbohydrates, and fat. Tracking macros means
        tracking the ratio and quantity of these three, not just the total
        calorie number.
      </p>
      <p>Why this matters beyond calories:</p>
      <ul>
        <li>
          <strong>Protein</strong> is the macronutrient most critical for muscle
          preservation and growth. Two diets with identical calories but
          different protein levels produce different body composition results
          particularly when combined with resistance training. Protein also has
          the highest thermic effect (digesting protein costs more energy than
          digesting fat or carbs) and is the most satiating macronutrient per
          calorie.
        </li>
        <li>
          <strong>Carbohydrates</strong> are the primary fuel source for
          high-intensity exercise and brain function. For active people,
          manipulating carb intake around training can improve performance and
          recovery.
        </li>
        <li>
          <strong>Fat</strong> is essential for hormone production, fat-soluble
          vitamin absorption, and cell membrane structure. Very low-fat diets
          have downstream effects on testosterone, oestrogen, and other
          hormones.
        </li>
      </ul>

      <h2>When to track calories only</h2>
      <p>Pure calorie tracking is appropriate when:</p>
      <ul>
        <li>
          You're new to tracking and building the habit calories first is
          simpler.
        </li>
        <li>
          Your goal is general weight management without performance or body
          composition goals.
        </li>
        <li>
          You eat a varied, balanced diet and just need to understand quantity.
        </li>
      </ul>

      <h2>When to track macros</h2>
      <p>Adding macro tracking (or switching to it) makes sense when:</p>
      <ul>
        <li>
          You're trying to build muscle alongside maintaining or losing weight
          protein intake becomes critical.
        </li>
        <li>
          You're an athlete or train seriously and need to fuel performance
          specifically.
        </li>
        <li>
          You're losing weight but feeling excessively tired or losing strength
          often a sign of inadequate protein or carbohydrates.
        </li>
        <li>
          You've hit a plateau despite being in a calorie deficit macro ratios
          sometimes matter.
        </li>
      </ul>

      <h2>How to calculate your numbers</h2>
      <p>
        Your calorie target starts with your Total Daily Energy Expenditure
        (TDEE) the total calories you burn per day. This is your Basal Metabolic
        Rate (the energy your body needs at rest) multiplied by an activity
        factor.
      </p>
      <p>
        Our{" "}
        <a href="/tools/calorie-macro-calculator">Calorie & Macro Calculator</a>{" "}
        calculates both your TDEE and suggested macro split based on your goal
        weight loss, maintenance, or muscle gain. It handles the maths so you
        can focus on the food.
      </p>
      <p>A rough guide to macro ratios by goal:</p>
      <ul>
        <li>
          <strong>Weight loss:</strong> Protein at 1.6–2.2g per kg of
          bodyweight, fat at 0.8–1g per kg, remainder from carbs. Total calories
          15–20% below TDEE.
        </li>
        <li>
          <strong>Muscle gain:</strong> Protein at 1.6–2.2g per kg, moderate
          fat, higher carbs. Total calories 10–15% above TDEE.
        </li>
        <li>
          <strong>Maintenance/performance:</strong> Protein at 1.4–2g per kg,
          balanced fat and carbs. Total calories at TDEE.
        </li>
      </ul>

      <h2>The practical reality</h2>
      <p>
        For most people most of the time, hitting a protein target within a
        calorie budget is the most leverage you can get from nutrition tracking.
        You don't need to obsess over carbs versus fat unless you have specific
        performance goals or a medical reason to manage one specifically.
      </p>
      <p>
        Track for long enough to build intuition about portion sizes and food
        composition usually a few months and then decide whether you want to
        continue tracking or whether you've internalised enough to maintain your
        results without it. Tracking indefinitely isn't the goal for most
        people; building knowledge and habits is.
      </p>
    </>
  );
}
