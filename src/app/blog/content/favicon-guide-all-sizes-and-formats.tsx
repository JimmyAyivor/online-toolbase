// src/app/blog/content/favicon-guide-all-sizes-and-formats.tsx
export default function Post() {
  return (
    <>
      <p>
        A favicon is one of those small details that separates a finished
        website from an unfinished one. The tiny icon in the browser tab,
        bookmarks bar, and mobile home screen is often the last thing developers
        add and frequently done incorrectly because the requirements have grown
        significantly more complex than a single 16×16 pixel .ico file.
      </p>

      <h2>Why favicon requirements are more complex than they used to be</h2>
      <p>
        In the early web, a favicon was a single 16×16 or 32×32 pixel .ico file
        at <code>/favicon.ico</code>. Now, icons need to render well across:
      </p>
      <ul>
        <li>Browser tabs (16×16 and 32×32)</li>
        <li>Bookmarks and browser history (32×32)</li>
        <li>iOS home screen icons (180×180 for modern iPhones)</li>
        <li>Android home screen icons (192×192)</li>
        <li>Windows Start menu tiles (various sizes)</li>
        <li>macOS Safari pinned tab (SVG monochrome)</li>
        <li>Open Graph and Twitter Card thumbnails (1200×630)</li>
      </ul>
      <p>
        Our <a href="/tools/favicon-generator">Favicon Generator</a> creates all
        the necessary sizes from a single source image and generates the HTML to
        include them correctly.
      </p>

      <h2>The minimum viable favicon setup</h2>
      <p>For most sites, three files cover the majority of cases:</p>
      <ul>
        <li>
          <code>favicon.ico</code> multi-size ICO containing 16×16 and 32×32.
          Placed at the root domain for legacy browser support.
        </li>
        <li>
          <code>apple-touch-icon.png</code> 180×180px PNG for iOS home screen
          icons.
        </li>
        <li>
          <code>favicon.svg</code> vector SVG for modern browsers that support
          them (Chrome, Firefox, Edge). Scales perfectly to any size.
        </li>
      </ul>
      <p>
        Required HTML in <code>&lt;head&gt;</code>:
      </p>
      <pre>
        <code>{`<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">`}</code>
      </pre>

      <h2>Designing a favicon that works at small sizes</h2>
      <p>
        A logo that works at 500×500 often fails at 32×32. Detailed designs with
        thin lines, small text, or complex gradients become illegible at small
        sizes. Effective favicons:
      </p>
      <ul>
        <li>Use bold, simple shapes with high contrast</li>
        <li>
          Work in monochrome (you can't predict the browser chrome colour)
        </li>
        <li>
          Often use a single letterform or simplified icon rather than a full
          logo
        </li>
        <li>Have clear, distinct silhouettes at tiny sizes</li>
      </ul>
      <p>
        Start by designing the 32×32 version first. If it's readable and
        distinctive at that size, scale up for the larger formats. If you scale
        down from a full logo, you'll likely need to simplify.
      </p>

      <h2>Web App Manifest for Android</h2>
      <p>
        For Progressive Web Apps (PWAs) or Android home screen bookmarks, a{" "}
        <code>manifest.json</code> file specifies icons in various sizes. At
        minimum, include 192×192 and 512×512 PNG icons.
      </p>
      <pre>
        <code>{`{
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}`}</code>
      </pre>

      <h2>FAQ</h2>

      <h3>Does my favicon affect SEO?</h3>
      <p>
        Not directly for rankings. However, favicons appear in search results
        for some queries (Google shows them next to search results) and in
        browser bookmarks both contribute to brand recognition and click-through
        rate. A missing or broken favicon also signals an unfinished site.
      </p>

      <h3>Why is my favicon not updating after I changed it?</h3>
      <p>
        Browsers cache favicons aggressively. Hard refresh (
        <code>Ctrl+Shift+R</code> / <code>Cmd+Shift+R</code>) or clearing
        browser cache forces a fresh load. Some browsers require closing and
        reopening all tabs. In production, adding a versioned query string to
        the favicon URL (<code>favicon.ico?v=2</code>) forces browsers to fetch
        the new version.
      </p>

      <h3>What format is best for favicons in 2026?</h3>
      <p>
        SVG for modern browsers (scales perfectly, supports dark mode variants
        via CSS media queries). ICO at the root for legacy support. PNG for
        Apple touch icons. This combination covers all major platforms and
        contexts.
      </p>

      <h2>Conclusion</h2>
      <p>
        A properly set up favicon requires more than a single .ico file but
        isn't complicated once you know the requirements. Use the{" "}
        <a href="/tools/favicon-generator">Favicon Generator</a> to create all
        necessary sizes from a single source image, copy the generated HTML into
        your page head, and your site's icon will display correctly across all
        devices and contexts.
      </p>
    </>
  );
}
