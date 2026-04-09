// src/app/blog/content/css-gradients-complete-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        CSS gradients have gone from a novelty in the late 2000s to one of the
        most commonly used design elements on the web. Used well, they add
        depth, vibrancy, and visual interest. Used poorly, they produce the
        garish rainbow backgrounds of mid-2000s MySpace pages. The difference is
        in the technique and CSS gradient syntax gives you precise control over
        every parameter.
      </p>

      <h2>The three gradient types in CSS</h2>

      <h3>Linear gradients</h3>
      <p>
        Transitions between colours along a straight line. Direction is
        specified as an angle (0deg = bottom to top, 90deg = left to right) or
        as a keyword:
      </p>
      <pre>
        <code>{`background: linear-gradient(135deg, #667eea, #764ba2);
background: linear-gradient(to right, #f093fb, #f5576c);
background: linear-gradient(to bottom right, #4facfe, #00f2fe);`}</code>
      </pre>

      <h3>Radial gradients</h3>
      <p>
        Radiates outward from a centre point. Can be circular or elliptical:
      </p>
      <pre>
        <code>{`background: radial-gradient(circle, #667eea, #764ba2);
background: radial-gradient(ellipse at center, #ffffff, #000000);`}</code>
      </pre>

      <h3>Conic gradients</h3>
      <p>
        Rotates around a centre point like a colour wheel. Useful for pie
        charts, radial menus, and creative effects:
      </p>
      <pre>
        <code>{`background: conic-gradient(from 0deg, red, yellow, green, blue, red);`}</code>
      </pre>

      <h2>Colour stops and smooth transitions</h2>
      <p>
        Multiple colour stops control where transitions happen. A stop includes
        a colour and an optional position:
      </p>
      <pre>
        <code>{`background: linear-gradient(135deg, 
  #f093fb 0%, 
  #f5576c 50%, 
  #4facfe 100%
);`}</code>
      </pre>
      <p>
        Positions can be percentages, px, or other length units. If omitted,
        stops distribute evenly.
      </p>

      <h2>Avoiding the "muddy middle" problem</h2>
      <p>
        Gradients between very different saturated colours (like blue to orange)
        often produce a desaturated muddy grey in the middle. This happens
        because the transition passes through low-saturation values in the
        middle of the RGB colour space.
      </p>
      <p>Solutions:</p>
      <ul>
        <li>Add a midpoint colour stop of a more saturated intermediate hue</li>
        <li>
          Use the HSL colour space for gradients where available:{" "}
          <code>hsl(220, 70%, 50%)</code> to <code>hsl(280, 70%, 50%)</code>{" "}
          transitions through hues rather than through RGB space
        </li>
        <li>
          Use the <code>in oklab</code> or <code>in hsl</code> interpolation
          modifier in modern CSS:{" "}
          <code>
            background: linear-gradient(in hsl, hsl(220,70%,50%),
            hsl(340,70%,50%))
          </code>
        </li>
      </ul>

      <h2>Using gradients on text</h2>
      <pre>
        <code>{`.gradient-text {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`}</code>
      </pre>
      <p>
        This clips the gradient to the text shape, producing coloured gradient
        text. Widely used in modern web design.
      </p>

      <h2>Our gradient generator</h2>
      <p>
        Our <a href="/tools/gradient-generator">CSS Gradient Generator</a>{" "}
        creates gradients visually with live preview, lets you add and position
        colour stops, choose direction and gradient type, and outputs copy-ready
        CSS. No memorising syntax required.
      </p>

      <h2>FAQ</h2>

      <h3>Do CSS gradients affect performance?</h3>
      <p>
        No CSS gradients are rendered by the GPU as part of the compositor layer
        and have negligible performance impact. They're more efficient than
        gradient images and scale perfectly at any resolution.
      </p>

      <h3>Can I animate a CSS gradient?</h3>
      <p>
        Not directly via <code>transition</code> CSS can't transition gradient
        colour stops yet in most browsers. Common workarounds: animate{" "}
        <code>background-position</code> on an oversized gradient, or use CSS
        custom properties with a JavaScript-driven animation, or use{" "}
        <code>@keyframes</code> with opacity crossfades between gradient layers.
      </p>

      <h3>What's the browser support for conic gradients?</h3>
      <p>
        Conic gradients are supported in all modern browsers (Chrome, Firefox,
        Safari, Edge). IE is unsupported, but IE is no longer a relevant browser
        for almost all projects.
      </p>

      <h2>Conclusion</h2>
      <p>
        CSS gradients are versatile and performance-free. The muddy middle
        problem is the main quality issue to watch for use intermediate colour
        stops or HSL interpolation to avoid it. Use the{" "}
        <a href="/tools/gradient-generator">CSS Gradient Generator</a> to build
        gradients visually and copy production-ready CSS directly.
      </p>
    </>
  );
}
