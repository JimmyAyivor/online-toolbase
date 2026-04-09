// src/app/blog/content/how-to-pick-hex-colors-for-your-brand.tsx
export default function Post() {
  return (
    <>
      <p>
        A brand colour isn't just a hex code it's a set of decisions about how
        that colour will work across white backgrounds, dark backgrounds, in
        print, on screen, at large and small sizes. Most brands have primary
        colours that are specified by hex but fail in practice because nobody
        thought through how they'd perform in context. Here's how to choose and
        specify hex colours that actually work.
      </p>

      <h2>What a hex code is</h2>
      <p>
        A hex colour code is a six-character representation of an RGB colour:{" "}
        <code>#RRGGBB</code>. Two hex digits each for red, green, and blue,
        ranging from <code>00</code> (none) to <code>FF</code> (full). The
        values directly correspond to the 0–255 scale used in RGB:{" "}
        <code>FF</code> = 255, <code>80</code> ≈ 128.
      </p>
      <p>
        Use our{" "}
        <a href="/tools/hex-color-code-generator">Hex Color Code Generator</a>{" "}
        to explore colours, generate random hex codes, and copy values
        instantly.
      </p>

      <h2>Choosing brand colours systematically</h2>
      <p>
        Rather than picking a single hex code, effective brand colour systems
        specify:
      </p>
      <ul>
        <li>
          <strong>Primary colour:</strong> The main brand colour used for key UI
          elements and prominent brand expressions
        </li>
        <li>
          <strong>Primary tints (lighter variants):</strong> The primary colour
          at 10%, 20%, 40%, 60%, 80% lightness for backgrounds, hover states,
          and subtle variations
        </li>
        <li>
          <strong>Primary shades (darker variants):</strong> The primary colour
          at higher saturation/lower lightness for hover states, pressed states,
          and dark themes
        </li>
        <li>
          <strong>Neutral palette:</strong> A full grey scale from near-white to
          near-black, ideally with a slight tint of the primary colour for brand
          cohesion
        </li>
      </ul>
      <p>
        HSL is the most practical format for generating these systematically
        keep H and S constant, vary L to generate the tint/shade scale.
      </p>

      <h2>Testing your hex colours before committing</h2>
      <p>Before finalising a brand hex colour, check it in context:</p>
      <ul>
        <li>
          <strong>On white background:</strong> Does it have sufficient contrast
          for text use? (Use the{" "}
          <a href="/tools/color-contrast-checker">Color Contrast Checker</a>)
        </li>
        <li>
          <strong>On dark background:</strong> How does it perform inverted?
        </li>
        <li>
          <strong>With white text on the colour as background:</strong> If
          you'll use the colour as a button background, does white text meet
          4.5:1 contrast?
        </li>
        <li>
          <strong>In grey scale:</strong> Brand colours should have distinct
          lightness values to differentiate in grey scale (for printing,
          accessibility, and colour-blind users)
        </li>
        <li>
          <strong>At small sizes:</strong> Some saturated colours look different
          at small vs large sizes check the colour at the sizes you'll actually
          use it
        </li>
      </ul>

      <h2>The psychological associations of common hues</h2>
      <ul>
        <li>
          <strong>Blue (200–240°):</strong> Trust, reliability, professionalism.
          Most common primary in enterprise and financial brands.
        </li>
        <li>
          <strong>Green (90–150°):</strong> Growth, health, sustainability,
          nature. Common in health, finance, and eco brands.
        </li>
        <li>
          <strong>Red (350–10°):</strong> Energy, urgency, passion. Common in
          food, entertainment, and sale/promotion contexts.
        </li>
        <li>
          <strong>Orange (20–45°):</strong> Warmth, enthusiasm, accessibility.
          Common in consumer-friendly brands and calls to action.
        </li>
        <li>
          <strong>Purple (260–290°):</strong> Creativity, luxury, wisdom. Common
          in creative and premium brands.
        </li>
      </ul>
      <p>
        These associations are tendencies, not rules context, shade, and
        execution matter as much as hue.
      </p>

      <h2>FAQ</h2>

      <h3>How do I find a hex code from an existing design or website?</h3>
      <p>
        Browser developer tools: use the colour picker in the Elements panel to
        inspect any element's colour. Chrome and Firefox both have eye-dropper
        tools for sampling colours from anywhere on screen. Third-party colour
        picker browser extensions work similarly.
      </p>

      <h3>Should I use hex or HSL in my CSS?</h3>
      <p>
        Use hex for fixed, known colours (brand colours, semantic colours) that
        you're copying from a design tool. Use HSL for colours you need to
        manipulate systematically tints, shades, hover states. Both are valid;
        the practical choice depends on use context.
      </p>

      <h3>What's the difference between hex and Pantone for brand colours?</h3>
      <p>
        Hex specifies screen colours (RGB). Pantone specifies physical ink
        colours for print. They're different colour spaces a brand hex code and
        a Pantone code represent the same intended colour in their respective
        reproduction systems, but the actual printed Pantone swatch may look
        different from the screen hex colour. Brands that print materials need
        both specifications.
      </p>

      <h2>Conclusion</h2>
      <p>
        A hex code is a starting point, not a complete colour system. Specify
        tints, shades, and neutrals alongside your primary colours, test each
        colour in context for contrast and usability, and use the{" "}
        <a href="/tools/hex-color-code-generator">Hex Color Code Generator</a>{" "}
        to explore options and copy values. Combine with the{" "}
        <a href="/tools/color-code-converter">Color Code Converter</a> and{" "}
        <a href="/tools/color-contrast-checker">Color Contrast Checker</a> for a
        complete colour workflow.
      </p>
    </>
  );
}
