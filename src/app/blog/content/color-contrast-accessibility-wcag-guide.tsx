// src/app/blog/content/color-contrast-accessibility-wcag-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        Colour contrast is the accessibility requirement most designers either
        don't know about or quietly ignore because it rules out combinations
        they like. But approximately 300 million people worldwide have some form
        of colour vision deficiency, and low-contrast text is hard for everyone
        to read in suboptimal conditions bright sunlight on mobile, small text
        sizes, or ageing eyes. Meeting WCAG contrast standards isn't just legal
        compliance; it's better design for everyone.
      </p>

      <h2>What WCAG contrast requirements mean</h2>
      <p>
        The Web Content Accessibility Guidelines (WCAG) define contrast
        requirements using a contrast ratio a calculated comparison of the
        relative luminance of two colours:
      </p>
      <ul>
        <li>
          <strong>WCAG AA (minimum):</strong> 4.5:1 for normal text; 3:1 for
          large text (18pt+ or 14pt+ bold) and UI components/graphics.
        </li>
        <li>
          <strong>WCAG AAA (enhanced):</strong> 7:1 for normal text; 4.5:1 for
          large text. Required for highest accessibility level.
        </li>
      </ul>
      <p>
        A contrast ratio of 1:1 is no contrast (same colour). The maximum is
        21:1 (black on white). Most decorative elements and disabled components
        are exempt.
      </p>
      <p>
        Use our{" "}
        <a href='/tools/color-contrast-checker'>Color Contrast Checker</a> to
        instantly verify any foreground/background colour combination against
        WCAG AA and AAA standards.
      </p>

      <h2>How contrast ratio is calculated</h2>
      <p>
        The contrast ratio formula: (L1 + 0.05) / (L2 + 0.05), where L1 is the
        lighter colour's relative luminance and L2 is the darker. Relative
        luminance is calculated from the RGB values through a gamma correction
        formula. The checker handles this automatically you just provide the two
        colours.
      </p>

      <h2>Common design decisions that fail contrast requirements</h2>
      <ul>
        <li>
          <strong>Light grey text on white:</strong> A very common design choice
          that often fails AA at normal text sizes. Light grey (#999999) on
          white (#FFFFFF) has a contrast ratio of approximately 2.85:1 below the
          4.5:1 minimum.
        </li>
        <li>
          <strong>White text on light brand colours:</strong> White on a medium
          blue or teal may look fine to some eyes but fail the ratio test. Check
          before committing to the combination.
        </li>
        <li>
          <strong>Coloured text on coloured background:</strong> Brand-heavy
          designs often use coloured text on coloured backgrounds. These almost
          always need verification.
        </li>
        <li>
          <strong>Placeholder text:</strong> Input placeholder text is often
          styled at very low opacity or light grey frequently fails AA
          standards.
        </li>
      </ul>

      <h2>Practical fixes for low contrast</h2>
      <ul>
        <li>
          Darken the text colour (reduce lightness in HSL) until the ratio
          passes
        </li>
        <li>Lighten the background colour until the ratio passes</li>
        <li>
          Increase font size to qualify for the 3:1 large text threshold rather
          than the 4.5:1 normal text threshold
        </li>
        <li>
          Add a dark overlay to a background image before placing text on it
          (background images are unpredictable for contrast)
        </li>
      </ul>

      <h2>Contrast beyond text: UI components</h2>
      <p>
        WCAG 1.4.11 (Non-text Contrast) requires 3:1 contrast for UI components
        form inputs, buttons, checkboxes, focus indicators, icons that carry
        meaning. The button's background colour needs sufficient contrast
        against the page background; the input field border needs 3:1 against
        the surrounding area.
      </p>

      <h2>FAQ</h2>

      <h3>Does contrast ratio apply to images?</h3>
      <p>
        Text overlaid on images needs to meet contrast requirements. Since image
        content varies, this typically means adding a semi-transparent dark
        overlay, a text shadow, or a solid background behind the text to ensure
        consistent contrast. Pure decorative images don't require contrast
        checks.
      </p>

      <h3>Is WCAG AA legally required?</h3>
      <p>
        In many jurisdictions, yes for public sector websites, and increasingly
        for commercial sites serving the public. In the UK, the Equality Act and
        EU Web Accessibility Directive reference WCAG. In the US, ADA compliance
        for websites is an active area of litigation. WCAG AA is the de facto
        standard required for compliance.
      </p>

      <h3>How do I check contrast for hover and focus states?</h3>
      <p>
        Check each state's colour combination separately hover backgrounds,
        focus ring colours, active states. Enter the colours for each state into
        the <a href='/tools/color-contrast-checker'>Color Contrast Checker</a>{" "}
        to verify all interactive states independently.
      </p>

      <h2>Conclusion</h2>
      <p>
        Contrast verification should be part of every design review, not an
        afterthought. Check all text/background combinations against WCAG AA as
        a minimum. Use the{" "}
        <a href='/tools/color-contrast-checker'>Color Contrast Checker</a>{" "}
        during the design process it's faster to fix at design stage than after
        implementation.
      </p>
    </>
  );
}
