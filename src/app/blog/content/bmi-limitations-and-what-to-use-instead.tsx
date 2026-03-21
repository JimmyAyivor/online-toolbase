// src/app/blog/content/bmi-limitations-and-what-to-use-instead.tsx
export default function Post() {
  return (
    <>
      <p>
        BMI is everywhere it's in your doctor's notes, your insurance forms,
        your fitness app. What most people don't know is that it was never
        designed to measure individual health. Adolphe Quetelet, the Belgian
        mathematician who created it in the 1830s, explicitly said it was a
        population statistics tool, not a medical one. The fact that it became a
        primary clinical screening metric is a historical accident more than a
        scientific endorsement.
      </p>
      <p>
        That doesn't mean BMI is useless. It means you need to know what it
        actually tells you and what it doesn't.
      </p>

      <h2>How BMI is calculated</h2>
      <p>BMI = weight (kg) ÷ height (m)²</p>
      <p>Or in imperial: BMI = (weight in lbs ÷ height in inches²) × 703</p>
      <p>
        Example: A person who weighs 80kg and is 1.75m tall has a BMI of 80 ÷
        (1.75 × 1.75) = 26.1.
      </p>
      <p>
        The WHO classifications for adults are: below 18.5 (underweight),
        18.5–24.9 (healthy weight), 25–29.9 (overweight), 30+ (obese). These
        thresholds apply universally in most contexts, though some national
        health bodies use different cut-offs for specific populations.
      </p>
      <p>
        Use our free <a href='/tools/bmi-calculator'>BMI Calculator</a> to get
        your number it supports both metric and imperial and gives you your
        category instantly.
      </p>

      <h2>What BMI is actually measuring</h2>
      <p>
        BMI measures the relationship between weight and height. That's it. It
        has no direct measurement of body fat, muscle, bone density, fat
        distribution, or metabolic health. Two people can have identical BMIs
        and entirely different body compositions, health risks, and fitness
        levels.
      </p>

      <h2>The four main limitations worth knowing</h2>

      <h3>1. It can't distinguish muscle from fat</h3>
      <p>
        Muscle is denser than fat a kilogram of muscle takes up less space than
        a kilogram of fat. Someone who trains heavily will typically weigh more
        at the same height than a sedentary person. This is why rugby players,
        bodybuilders, and many athletes score in the "overweight" or "obese"
        range on BMI despite having low body fat percentages. The number is
        counting their lean mass as excess weight.
      </p>
      <p>
        The reverse is also true. Someone with very little muscle and high body
        fat can have a perfectly "healthy" BMI a condition sometimes called
        "normal weight obesity" or "skinny fat." These individuals carry the
        metabolic risks associated with high body fat without the BMI to flag
        it.
      </p>

      <h3>2. It ignores where fat is stored</h3>
      <p>
        Fat distribution is as important as fat quantity. Visceral fat stored
        around the abdominal organs is metabolically active and strongly
        associated with cardiovascular disease, type 2 diabetes, and insulin
        resistance. Subcutaneous fat stored under the skin, often on hips and
        thighs carries far lower health risk.
      </p>
      <p>
        Two people with the same BMI can have very different visceral fat levels
        depending on where their bodies preferentially store fat. BMI captures
        none of this.
      </p>

      <h3>3. It doesn't account for age or sex</h3>
      <p>
        Body composition changes with age older adults typically have higher
        body fat percentages at the same BMI as younger adults, because muscle
        mass decreases over time. Women carry more body fat than men at the same
        BMI as a matter of normal physiology. Standard adult BMI categories
        apply the same thresholds regardless of age or sex.
      </p>

      <h3>4. Ethnic differences in metabolic risk</h3>
      <p>
        Multiple studies have found that people of South Asian, East Asian, and
        some other ethnic backgrounds face elevated metabolic health risks at
        lower BMI values than those associated with white European populations.
        The WHO itself recognises this, and several Asian health bodies use
        lower cut-off points: 23 for overweight and 27.5 for obese. At the
        standard "healthy" BMI range of 25, someone of South Asian descent may
        already have significantly elevated cardiovascular risk.
      </p>

      <h2>What to track alongside BMI</h2>
      <p>
        BMI works reasonably well as a quick population-level screening tool and
        as a rough trend tracker. For a more complete individual picture:
      </p>
      <ul>
        <li>
          <strong>Waist circumference.</strong> Health risks increase above 94cm
          (37 inches) for men and 80cm (31.5 inches) for women regardless of
          BMI. This captures abdominal fat that BMI misses.
        </li>
        <li>
          <strong>Waist-to-height ratio.</strong> Keeping your waist measurement
          below half your height is a simple, research-backed indicator of
          metabolic risk.
        </li>
        <li>
          <strong>Body fat percentage.</strong> Measured accurately via DEXA
          scan (expensive but precise) or estimated via skin-fold measurements
          or bioelectrical impedance scales. Our{" "}
          <a href='/tools/body-fat-calculator'>Body Fat Calculator</a> gives you
          an estimate from standard measurements.
        </li>
        <li>
          <strong>Blood biomarkers.</strong> Fasting glucose, HbA1c, cholesterol
          profile, triglycerides these are direct measures of metabolic health
          that no external measurement can replace.
        </li>
      </ul>

      <h2>When BMI is actually useful</h2>
      <p>
        Despite its limitations, BMI isn't worthless. For population-level
        research and public health tracking, it's a cheap, consistent metric
        that correlates reasonably well with health outcomes across large
        groups. As one data point in a clinical consultation alongside history,
        blood work, and physical examination it's a reasonable starting flag.
      </p>
      <p>
        Where it fails is as a standalone individual health verdict. "Your BMI
        is 27, you're overweight" without any other context tells you very
        little and can be actively misleading for muscular individuals or those
        with high visceral fat at normal BMI.
      </p>
      <p>
        Use our <a href='/tools/bmi-calculator'>BMI Calculator</a> as one data
        point, and combine it with the{" "}
        <a href='/tools/body-fat-calculator'>Body Fat Calculator</a> for a more
        complete picture.
      </p>
    </>
  );
}
