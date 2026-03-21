// src/app/blog/content/hex-rgb-hsl-color-formats-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        CSS supports four main colour formats, and each one has contexts where
        it's the most practical choice. Copying hex codes from a design tool and
        writing them verbatim into CSS works fine until you need to lighten a
        colour, adjust opacity, or create a theme with systematic variations at
        which point HSL becomes far more useful than hex. Knowing all four
        formats and when each makes sense is a CSS fluency baseline.
      </p>

      <h2>HEX</h2>
      <p>
        Six hexadecimal digits representing red, green, and blue:{" "}
        <code>#RRGGBB</code>. Each pair ranges from <code>00</code> (none) to{" "}
        <code>FF</code> (full intensity). <code>#FF0000</code> is pure red.{" "}
        <code>#000000</code> is black. <code>#FFFFFF</code> is white.
      </p>
      <p>
        Shorthand: when each pair has identical digits, you can write three
        digits <code>#FF0000</code> → <code>#F00</code>, <code>#AABBCC</code> →{" "}
        <code>#ABC</code>.
      </p>
      <p>
        <strong>Use when:</strong> copying colours from design tools (which
        typically show hex by default), working with fixed brand colours,
        sharing colour values. Hex is compact and universally understood.
      </p>
      <p>
        <strong>Limitation:</strong> Hard to intuit what adjustments to make.
        How do you lighten <code>#3A7BD5</code> by 10%? You can't do it
        mentally.
      </p>
      <p>
        Our <a href='/tools/color-code-converter'>Color Code Converter</a>{" "}
        converts between all formats instantly.
      </p>

      <h2>RGB</h2>
      <p>
        Three values 0–255 for red, green, blue: <code>rgb(255, 0, 0)</code> is
        red. <code>rgba(255, 0, 0, 0.5)</code> adds opacity (0–1 scale).
      </p>
      <p>
        <strong>Use when:</strong> you need opacity/transparency via the alpha
        channel, working with JavaScript colour manipulation, or when values
        come from programmatic calculations.
      </p>

      <h2>HSL</h2>
      <p>
        Hue (0–360 degrees on the colour wheel), Saturation (0–100%), Lightness
        (0–100%): <code>hsl(220, 70%, 50%)</code>.
      </p>
      <p>
        <strong>This is the most designer-friendly format</strong> because you
        can intuitively adjust a colour:
      </p>
      <ul>
        <li>
          Lighten: increase the L value. <code>hsl(220, 70%, 50%)</code> →{" "}
          <code>hsl(220, 70%, 70%)</code>
        </li>
        <li>Darken: decrease the L value</li>
        <li>Desaturate (mute): decrease the S value</li>
        <li>Shift the hue: change the H value</li>
      </ul>
      <p>
        <strong>Use when:</strong> creating colour systems with consistent tonal
        relationships, building design tokens with light/dark variants, writing
        CSS variables for theming, or any time you want to reason about colour
        relationships.
      </p>
      <p>
        <code>hsla()</code> adds opacity, equivalent to <code>rgba()</code>.
      </p>

      <h2>OKLCH (modern CSS)</h2>
      <p>
        A newer perceptually uniform colour space where equal changes in values
        produce equal perceived changes in colour unlike HSL, where equal S/L
        changes produce visually unequal results across different hues.
        Supported in modern browsers as <code>oklch()</code>. Increasingly used
        in design systems for more consistent colour scales.
      </p>

      <h2>Practical CSS colour variables with HSL</h2>
      <p>HSL makes CSS custom property colour systems intuitive:</p>
      <pre>
        <code>{`:root {
  --brand-hue: 220;
  --brand-saturation: 70%;
  --brand-color: hsl(var(--brand-hue), var(--brand-saturation), 50%);
  --brand-light: hsl(var(--brand-hue), var(--brand-saturation), 90%);
  --brand-dark: hsl(var(--brand-hue), var(--brand-saturation), 20%);
}`}</code>
      </pre>

      <h2>FAQ</h2>

      <h3>Which format should I use in CSS?</h3>
      <p>
        Use HSL for colours you'll need to modify or that are part of a system.
        Use hex for fixed brand colours pasted from design tools. Use RGB/RGBA
        when you need opacity and aren't using HSLA.
      </p>

      <h3>What's the difference between HSL and HSB/HSV?</h3>
      <p>
        HSL (Hue, Saturation, Lightness) and HSB/HSV (Hue, Saturation,
        Brightness/Value) are different colour models that produce different
        values for the same colour. CSS uses HSL. Design tools like Photoshop
        and Figma often show HSB/HSV. They're not interchangeable without
        conversion.
      </p>

      <h3>How do I convert between formats quickly?</h3>
      <p>
        Use the <a href='/tools/color-code-converter'>Color Code Converter</a>{" "}
        to convert any colour between HEX, RGB, HSL, HSV, and CMYK instantly.
      </p>

      <h2>Conclusion</h2>
      <p>
        Hex for sharing and pasting; HSL for building colour systems and making
        adjustments; RGB when opacity is needed. Use the{" "}
        <a href='/tools/color-code-converter'>Color Code Converter</a> to move
        between formats, and combine with the{" "}
        <a href='/tools/color-contrast-checker'>Color Contrast Checker</a> to
        verify your colour combinations meet accessibility standards.
      </p>
    </>
  );
}
