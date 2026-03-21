// src/app/blog/content/how-much-protein-do-you-actually-need.tsx
export default function Post() {
  return (
    <>
      <p>
        Protein recommendations span a surprisingly wide range depending on who
        you ask from the bare minimum to prevent deficiency, to what's optimal
        for muscle building. The gap between "enough to not get sick" and
        "enough to maximise muscle growth" is significant, and most fitness
        advice operates somewhere in the middle. Here's what the research
        actually says, separated from marketing.
      </p>

      <h2>The RDA vs optimal intake</h2>
      <p>
        The Recommended Dietary Allowance (RDA) for protein is 0.8g per kg of
        bodyweight per day. This is the amount sufficient to prevent deficiency
        in sedentary adults it's a minimum, not an optimal. The RDA was never
        intended as a performance or body composition target.
      </p>
      <p>
        Research on protein for active individuals consistently shows higher
        intakes producing better outcomes for muscle retention and growth:
      </p>
      <ul>
        <li>
          <strong>Sedentary adults:</strong> 0.8g/kg (RDA) is adequate for
          health maintenance
        </li>
        <li>
          <strong>General exercisers:</strong> 1.2–1.6g/kg supports muscle
          recovery and adaptation
        </li>
        <li>
          <strong>Resistance training / muscle building:</strong> 1.6–2.2g/kg is
          the evidence-supported range for maximising muscle protein synthesis
        </li>
        <li>
          <strong>Caloric deficit (fat loss):</strong> Up to 2.2–2.4g/kg helps
          preserve muscle while losing fat
        </li>
        <li>
          <strong>Older adults (over 65):</strong> 1.2–1.6g/kg is recommended to
          counteract age-related muscle loss (sarcopenia)
        </li>
      </ul>
      <p>
        Our{" "}
        <a href='/tools/protein-intake-calculator'>Protein Intake Calculator</a>{" "}
        recommends daily protein based on your weight, activity level, and goal.
      </p>

      <h2>Protein distribution across meals</h2>
      <p>
        Research on protein timing suggests that muscle protein synthesis is
        better stimulated by spreading protein across 3–5 meals rather than
        concentrating it in one or two. The practical target: 25–40g of protein
        per meal, which maximises muscle protein synthesis per meal. This
        produces approximately 0.31g/kg per meal as a useful individual dose
        target.
      </p>

      <h2>Complete vs incomplete protein</h2>
      <p>
        Complete proteins contain all nine essential amino acids in adequate
        proportions. Animal proteins (meat, fish, eggs, dairy) are complete.
        Most plant proteins are incomplete but combining different plant sources
        throughout the day provides all essential amino acids. Soy is the
        notable plant exception, being a complete protein.
      </p>
      <p>
        Leucine, in particular, is the primary amino acid that triggers muscle
        protein synthesis. It's abundant in animal proteins, whey, and higher in
        legumes and soy than other plant sources.
      </p>

      <h2>Can you eat too much protein?</h2>
      <p>
        In healthy individuals without pre-existing kidney disease, high protein
        intakes (up to 3g/kg) have not been shown to cause kidney damage in
        research studies. The concern about protein and kidneys applies to
        people with compromised kidney function, not to healthy adults.
      </p>
      <p>
        Practically, there's a ceiling on the benefit of very high intakes above
        approximately 2.2g/kg, additional protein provides minimal additional
        muscle-building benefit. Excess protein beyond what can be used is
        metabolised for energy or stored, not converted to muscle.
      </p>

      <h2>FAQ</h2>

      <h3>Does protein timing around workouts matter?</h3>
      <p>
        The "anabolic window" (the idea that you must consume protein
        immediately post-workout) is less important than total daily protein
        intake. If you hit your daily protein target across reasonable meal
        timing, exact post-workout timing has minimal additional effect. Still,
        protein within 2 hours of training is sensible and won't hurt.
      </p>

      <h3>What are the best protein sources?</h3>
      <p>
        By leucine content and bioavailability: whey protein, eggs, chicken
        breast, Greek yoghurt, cottage cheese, fish, beef. For plant-based
        diets: soy, lentils, chickpeas, tofu, tempeh, quinoa, edamame. Combining
        diverse plant sources maximises amino acid coverage.
      </p>

      <h3>Is more protein better for weight loss?</h3>
      <p>
        Higher protein diets support weight loss through three mechanisms:
        greater satiety (protein is the most filling macronutrient per calorie),
        higher thermic effect (digesting protein burns more calories than fat or
        carbs), and muscle preservation in a calorie deficit. Eating at the
        higher end of the protein range (2–2.4g/kg) during a cut is
        well-supported by the evidence.
      </p>

      <h2>Conclusion</h2>
      <p>
        For muscle building and body composition, target 1.6–2.2g of protein per
        kg of bodyweight, spread across 3–5 meals with 25–40g per sitting. For
        fat loss, stay at the higher end to preserve muscle. Use the{" "}
        <a href='/tools/protein-intake-calculator'>Protein Intake Calculator</a>{" "}
        to get your specific daily target, and the{" "}
        <a href='/tools/calorie-macro-calculator'>Calorie & Macro Calculator</a>{" "}
        to plan your complete nutritional framework.
      </p>
    </>
  );
}
