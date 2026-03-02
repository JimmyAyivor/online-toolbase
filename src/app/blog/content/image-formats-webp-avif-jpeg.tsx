// src/app/blog/content/image-formats-webp-avif-jpeg.tsx
export default function Post() {
  return (
    <>
      <p>
        For most of the web's history, the advice was simple: use JPEG for photos, PNG for graphics with transparency. Then WebP came along and complicated things. Now AVIF has entered the picture, and the recommendation has changed again.
      </p>
      <p>
        Here's the current state of image formats in 2025, with actual compression numbers, a clear framework for which to use when, and what it means for your Core Web Vitals.
      </p>

      <h2>Why image format choice matters for your site's performance</h2>
      <p>
        Images account for around 63% of total page weight on the average website. They're also the leading cause of poor Largest Contentful Paint (LCP) scores — the Core Web Vitals metric Google uses to measure how quickly the main content of a page loads, and one that directly influences search rankings.
      </p>
      <p>
        Switching from JPEG to a modern format can reduce image file sizes by 30–50% without any perceptible quality difference. On an image-heavy page, that's a meaningful improvement in load time — which affects both SEO and user experience. Research consistently shows a 1-second improvement in load time correlates with a 27% increase in conversions on e-commerce sites.
      </p>

      <h2>JPEG: The baseline you're probably still using</h2>
      <p>
        JPEG has been the web's default photo format since 1992. It uses lossy compression that removes visual data the human eye is unlikely to notice — decent at quality 80–85, degraded visibly at lower settings. It doesn't support transparency, and its compression algorithm struggles with sharp edges and fine text.
      </p>
      <p>
        In 2025, JPEG should be your fallback format, not your default. The only reason to use JPEG as a primary format is legacy compatibility — Internet Explorer, very old mobile browsers, some email clients. With IE's global usage now below 0.3%, that's rarely a concern.
      </p>

      <h2>WebP: The current safe default</h2>
      <p>
        Google released WebP in 2010 to replace JPEG and PNG. It supports both lossy and lossless compression, handles transparency (unlike JPEG), can contain animations (unlike JPEG or PNG), and is typically 25–35% smaller than JPEG at comparable visual quality.
      </p>
      <p>
        Browser support for WebP hit effectively 100% of modern browsers in 2023. Safari, the last holdout, fully supported it from Safari 14 (2020) and it's been on by default ever since.
      </p>
      <p>
        In 2025, WebP is the safe, practical default for most websites. It's the format to serve if you want modern compression without worrying about browser compatibility.
      </p>

      <h2>AVIF: The best compression, now mainstream</h2>
      <p>
        AVIF is based on the AV1 video codec and delivers substantially better compression than WebP — typically 20% smaller than WebP at the same perceived quality, and 40–50% smaller than JPEG. For complex photographic content, the difference is particularly noticeable at lower file sizes, where JPEG and even WebP start to show compression artefacts but AVIF holds detail well.
      </p>
      <p>
        AVIF also supports HDR, wide colour gamut, and up to 12-bit colour depth — advantages that matter for high-quality photography and product imagery.
      </p>
      <p>
        The practical barrier to AVIF adoption was browser support and encoding speed. Both have improved significantly. AVIF is now supported in Chrome, Edge, Firefox, and Safari — covering effectively all modern browsers as of 2025. Encoding is more CPU-intensive than WebP, which matters if you're processing large batches, but the file size savings are worth it for most production use cases.
      </p>
      <p>
        For teams targeting strong Core Web Vitals scores and mobile performance, AVIF is now the recommended primary format, with WebP as a fallback.
      </p>

      <h2>Real-world compression comparison</h2>
      <p>
        To give you concrete numbers, a test on a 2000×2000 pixel product photograph produced:
      </p>
      <ul>
        <li>JPEG at quality 80: ~540 KB</li>
        <li>WebP at quality 85: ~350 KB (35% smaller than JPEG)</li>
        <li>AVIF at comparable quality settings: ~210 KB (61% smaller than JPEG, 40% smaller than WebP)</li>
      </ul>
      <p>
        On an image-heavy page with 10–15 images, switching from JPEG to AVIF can easily save multiple megabytes per page load — a significant improvement for users on slower mobile connections.
      </p>

      <h2>Which format should you use and when</h2>
      <p>
        Here's the practical decision framework for 2025:
      </p>
      <ul>
        <li><strong>Photos and complex imagery (hero images, product photos, blog images):</strong> AVIF primary, WebP fallback. Use the HTML <code>&lt;picture&gt;</code> element to serve AVIF to supporting browsers and WebP to others.</li>
        <li><strong>Graphics, logos, icons with transparency:</strong> WebP lossless, or SVG if the image is vector-based. AVIF lossless is also 15–25% smaller than PNG for transparency images.</li>
        <li><strong>Animations:</strong> WebP supports animation; AVIF does too but encoding support is less widespread. For complex animations, consider video (MP4/WebM with autoplay and mute).</li>
        <li><strong>Legacy fallback:</strong> JPEG for browsers that support neither AVIF nor WebP.</li>
        <li><strong>Icons, logos, illustrations:</strong> SVG wherever possible — it's a vector format, scales perfectly at any size, and is usually the smallest option.</li>
      </ul>

      <h2>Implementing the picture element</h2>
      <p>
        The HTML <code>&lt;picture&gt;</code> element lets browsers choose the best supported format automatically:
      </p>
      <pre>{`<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>`}</pre>
      <p>
        The browser will use the first format it supports. If AVIF is available, it gets served. If not, WebP. If not, JPEG. This gives you the best of all worlds without any JavaScript.
      </p>
      <p>
        If you're using Next.js, the built-in <code>&lt;Image /&gt;</code> component handles format selection, resizing, and lazy loading automatically — one of the easiest ways to get image optimisation right without manual effort.
      </p>

      <h2>Don't forget: resize before you convert</h2>
      <p>
        Format choice is one part of image optimisation. Sizing matters equally. Serving a 4000px wide photo to a 800px column wastes bandwidth regardless of format. Always resize images to their maximum display dimensions before converting.
      </p>
      <p>
        Our <a href="/tools/image-compressor">Image Compressor</a> reduces file sizes directly in your browser, and the <a href="/tools/image-format-converter">Image Format Converter</a> handles JPEG, PNG, and WebP conversion — no uploads to a server, everything processed locally.
      </p>
    </>
  );
}
