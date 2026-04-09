// src/app/blog/content/metric-vs-imperial-unit-conversion-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        The United States, Liberia, and Myanmar are the only countries that
        haven't officially adopted the metric system. For everyone else, metric
        is the daily standard but US-origin content, recipes, engineering
        documents, and products use imperial constantly, meaning unit conversion
        is a practical daily skill for a large portion of the global population.
        Getting it reliably right is faster with good reference points and the
        right tool.
      </p>

      <h2>Length conversions</h2>
      <ul>
        <li>1 inch = 2.54 centimetres</li>
        <li>1 foot = 30.48 centimetres (12 inches)</li>
        <li>1 yard = 0.9144 metres</li>
        <li>1 mile = 1.609 kilometres</li>
        <li>1 kilometre = 0.621 miles</li>
      </ul>
      <p>
        Quick mental approximation for km to miles: multiply by 0.6 (or divide
        by 1.6). A 10km run is approximately 6.2 miles. A 100-mile road trip is
        approximately 161km.
      </p>

      <h2>Weight conversions</h2>
      <ul>
        <li>1 ounce (oz) = 28.35 grams</li>
        <li>1 pound (lb) = 453.6 grams = 0.4536 kilograms</li>
        <li>1 kilogram = 2.205 pounds</li>
        <li>1 stone (UK) = 14 pounds = 6.35 kilograms</li>
        <li>1 US ton = 2,000 pounds = 907 kilograms</li>
        <li>1 metric tonne = 1,000 kilograms = 2,204.6 pounds</li>
      </ul>
      <p>
        Quick mental approximation for kg to lbs: multiply by 2.2. 70kg ≈ 154
        lbs. For lbs to kg: multiply by 0.45. 150 lbs ≈ 68 kg.
      </p>

      <h2>Volume conversions</h2>
      <ul>
        <li>1 US fluid ounce = 29.57 millilitres</li>
        <li>1 US cup = 236.6 millilitres (roughly 240ml for cooking)</li>
        <li>1 US pint = 473 millilitres</li>
        <li>1 UK pint = 568 millilitres (different from US pint)</li>
        <li>1 US gallon = 3.785 litres</li>
        <li>1 UK gallon = 4.546 litres</li>
        <li>1 litre = 1.76 UK pints = 2.11 US pints</li>
      </ul>
      <p>
        Note the US/UK pint difference a significant source of confusion in
        recipes.
      </p>

      <h2>Temperature conversions</h2>
      <p>Celsius to Fahrenheit: °F = (°C × 9/5) + 32</p>
      <p>Fahrenheit to Celsius: °C = (°F − 32) × 5/9</p>
      <p>
        Key reference points: 0°C = 32°F (freezing), 20°C = 68°F (comfortable
        room temperature), 37°C = 98.6°F (body temperature), 100°C = 212°F
        (boiling).
      </p>
      <p>
        Quick approximation for °C to °F: double it and add 30. Not precise but
        within a few degrees for typical temperatures. 20°C → 40 + 30 = 70°F
        (actual: 68°F).
      </p>

      <h2>Area conversions</h2>
      <ul>
        <li>1 square foot = 0.0929 square metres</li>
        <li>1 square metre = 10.76 square feet</li>
        <li>1 acre = 4,047 square metres = 0.405 hectares</li>
        <li>1 hectare = 2.471 acres</li>
        <li>1 square mile = 2.59 square kilometres = 640 acres</li>
      </ul>

      <h2>Using the unit converter</h2>
      <p>
        Our <a href="/tools/unit-converter">Unit Converter</a> handles length,
        weight, volume, temperature, area, speed, and more covering the full
        range of metric and imperial units with accurate conversions. Use it
        whenever the quick mental approximations aren't precise enough.
      </p>

      <h2>FAQ</h2>

      <h3>Why does the UK use a mix of metric and imperial?</h3>
      <p>
        The UK officially adopted metric in the 1960s–70s but retained imperial
        for certain uses by convention and public preference. Road distances and
        speed limits remain in miles and mph. Beer is served in pints. Body
        weight is often expressed in stone. Formal and scientific contexts use
        metric throughout.
      </p>

      <h3>What's the difference between a US cup and a metric cup?</h3>
      <p>
        A US cup = 236.6ml. A metric cup (used in Australia, Canada, and some
        international recipes) = 250ml. The difference matters in baking always
        check which standard your recipe uses.
      </p>

      <h3>How do I convert speeds (mph to km/h)?</h3>
      <p>
        Multiply mph by 1.609 to get km/h. Divide km/h by 1.609 for mph. Quick
        approximation: 60 mph ≈ 96 km/h; 100 km/h ≈ 62 mph.
      </p>

      <h2>Conclusion</h2>
      <p>
        A handful of reference points 1 inch = 2.54cm, 1kg = 2.2lbs, the
        temperature conversion formula handles most everyday conversions
        mentally. For everything else, use the{" "}
        <a href="/tools/unit-converter">Unit Converter</a> for fast, accurate
        results across all measurement types.
      </p>
    </>
  );
}
