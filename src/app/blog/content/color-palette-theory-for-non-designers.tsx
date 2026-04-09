// src/app/blog/content/color-palette-theory-for-non-designers.tsx
export default function Post() {
  return (
    <>
      <p>
        Colour choice is where many non-designers feel most out of their depth.
        "What colours go together?" isn't arbitrary it's governed by principles
        from colour theory that produce predictable, reliable results.
        Understanding these principles lets you make intentional colour
        decisions rather than guessing or copying, whether you're designing a
        website, presentation, or brand identity.
      </p>

      <h2>The colour wheel and relationships</h2>
      <p>
        The traditional colour wheel organises colours by their relationships.
        The standard categories of colour harmony:
      </p>
      <ul>
        <li>
          <strong>Complementary:</strong> Colours directly opposite each other
          on the wheel (red/green, blue/orange, purple/yellow). High contrast,
          vibrant, visually energetic. Works well for accents and calls to
          action, but use the weaker colour as dominant and the stronger as
          accent.
        </li>
        <li>
          <strong>Analogous:</strong> Three colours adjacent on the wheel (blue,
          blue-green, green). Harmonious, natural-looking, low contrast. Common
          in nature-inspired designs and creates cohesion.
        </li>
        <li>
          <strong>Triadic:</strong> Three colours equally spaced around the
          wheel (red, yellow, blue). Balanced but vibrant. Often works best with
          one dominant colour and two accent colours.
        </li>
        <li>
          <strong>Split-complementary:</strong> A colour plus the two colours
          adjacent to its complement. Slightly less tension than full
          complementary while maintaining visual interest.
        </li>
        <li>
          <strong>Tetradic/square:</strong> Four colours in two complementary
          pairs. Rich palette but difficult to balance one should clearly
          dominate.
        </li>
      </ul>
      <p>
        Our <a href="/tools/color-palette-generator">Color Palette Generator</a>{" "}
        generates harmonious palettes from any starting colour using these
        relationship types.
      </p>

      <h2>Hue, saturation, and value</h2>
      <p>Every colour has three dimensions:</p>
      <ul>
        <li>
          <strong>Hue:</strong> The colour itself (red, blue, green)
        </li>
        <li>
          <strong>Saturation:</strong> How intense/vivid vs grey. A desaturated
          red is a muted dusty rose; full saturation is fire-engine red.
        </li>
        <li>
          <strong>Value/lightness:</strong> How light or dark. A dark red is
          burgundy; a light red is pink.
        </li>
      </ul>
      <p>
        Most professional palettes don't use colours at full saturation they use
        a range of saturation and value levels across the selected hues. Pure,
        fully saturated colours in combination are often jarring; the same hues
        at varied saturation levels work together more elegantly.
      </p>

      <h2>A practical palette structure</h2>
      <p>
        For web and brand design, a practical palette typically consists of:
      </p>
      <ul>
        <li>
          <strong>Primary colour:</strong> Your main brand colour. Used for
          primary buttons, key UI elements.
        </li>
        <li>
          <strong>Secondary colour:</strong> A complementary or analogous colour
          for accents and variation.
        </li>
        <li>
          <strong>Neutral colours:</strong> Greys, near-whites, near-blacks for
          text, backgrounds, borders. These carry most of the UI.
        </li>
        <li>
          <strong>Semantic colours:</strong> Success (green), warning
          (amber/yellow), error (red). These are functional, not aesthetic
          choices.
        </li>
        <li>
          <strong>Tints and shades of primary/secondary:</strong> 5–9 lightness
          steps of your main colours for hover states, backgrounds, disabled
          states.
        </li>
      </ul>

      <h2>The 60/30/10 rule</h2>
      <p>
        A simple rule for applying a three-colour palette: 60% dominant colour
        (usually neutral), 30% secondary colour, 10% accent. This creates visual
        interest while maintaining hierarchy. A white background (60%), blue UI
        elements (30%), orange call-to-action buttons (10%) follows this
        structure.
      </p>

      <h2>FAQ</h2>

      <h3>How do I choose a starting colour for my brand?</h3>
      <p>
        Colour psychology provides a starting point: blue (trust, reliability,
        professional), green (growth, health, nature), red (energy, urgency,
        passion), orange (warmth, enthusiasm), purple (creativity, luxury),
        yellow (optimism, attention). These aren't rules context matters but
        they're useful starting considerations for brand positioning.
      </p>

      <h3>What's the difference between HEX, RGB, and HSL?</h3>
      <p>
        All represent the same colours in different formats. HEX is used in
        HTML/CSS. RGB (Red/Green/Blue) specifies colour as component intensities
        0–255. HSL (Hue/Saturation/Lightness) is more intuitive for designers
        because you can adjust lightness without changing hue. Use the{" "}
        <a href="/tools/color-code-converter">Color Code Converter</a> to
        convert between formats.
      </p>

      <h3>How many colours should a palette have?</h3>
      <p>
        For a functional design palette: 2 primary colours (including neutrals),
        1–2 accent colours, plus semantic colours (error, success, warning).
        More colours increase complexity and the likelihood of inconsistency.
        Fewer colours force more intentional choices. 5–8 total named colours is
        a practical range for most UI systems.
      </p>

      <h2>Conclusion</h2>
      <p>
        Colour harmony isn't magic it follows rules that produce predictable
        results. Start with a colour wheel relationship type, adjust saturation
        and value for sophistication, and apply the 60/30/10 rule for balance.
        Use the{" "}
        <a href="/tools/color-palette-generator">Color Palette Generator</a> to
        explore harmonious options from any starting colour.
      </p>
    </>
  );
}
