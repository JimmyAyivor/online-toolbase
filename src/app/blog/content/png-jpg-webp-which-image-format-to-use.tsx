// src/app/blog/content/png-jpg-webp-which-image-format-to-use.tsx
export default function Post() {
  return (
    <>
      <p>
        Choosing the wrong image format is one of the most common causes of
        unnecessarily large web pages. PNG where JPG would do, JPG for logos
        that should be SVG, or GIF for animations that should be WebP these
        aren't subtle differences. The right format can reduce file size by
        50–90% compared to the wrong one, with no perceptible quality
        difference.
      </p>

      <h2>The main image formats and their use cases</h2>

      <h3>JPEG (JPG)</h3>
      <p>
        Lossy compression for photographs and complex images with many colours
        and gradients. Each save re-compresses and reduces quality (generation
        loss). Doesn't support transparency.
      </p>
      <p>
        <strong>Use for:</strong> Photographs, realistic images, complex
        backgrounds, any image where the slight quality loss from compression is
        invisible to the human eye at normal viewing distances.
      </p>
      <p>
        <strong>Avoid for:</strong> Logos, icons, images with text, images
        requiring transparency, anything you'll edit and re-save multiple times.
      </p>

      <h3>PNG</h3>
      <p>
        Lossless compression. Supports transparency (alpha channel). Larger
        files than JPEG for photographs.
      </p>
      <p>
        <strong>Use for:</strong> Logos, icons, illustrations, screenshots,
        images with text overlaid, images with transparent backgrounds, images
        you'll edit further.
      </p>
      <p>
        <strong>Avoid for:</strong> Photographs (the file will be 3–5× larger
        than JPEG with no visible quality improvement).
      </p>

      <h3>WebP</h3>
      <p>
        Modern format from Google supporting both lossy and lossless
        compression. Typically 25–35% smaller than JPEG at equivalent quality
        for photographs; 26% smaller than PNG for images requiring lossless
        compression or transparency. Supported by all modern browsers.
      </p>
      <p>
        <strong>Use for:</strong> Any web image where browser compatibility
        isn't a concern for older browsers. The best general-purpose web format
        for both photos and graphics.
      </p>

      <h3>AVIF</h3>
      <p>
        Even newer than WebP. Better compression than WebP for photographs at
        equivalent quality typically 20–50% smaller. Browser support is now
        broad (Chrome, Firefox, Safari, Edge all support it). Encoding is slower
        than WebP.
      </p>
      <p>
        <strong>Use for:</strong> High-performance sites where maximum
        compression is a priority and you're targeting modern browsers.
      </p>

      <h3>SVG</h3>
      <p>
        Vector format defined by mathematical paths rather than pixels. Scales
        to any size without quality loss. File size is tiny for simple graphics;
        larger for complex illustrations.
      </p>
      <p>
        <strong>Use for:</strong> Logos, icons, illustrations, charts, diagrams,
        any graphic that needs to scale across different display sizes.
      </p>
      <p>
        <strong>Avoid for:</strong> Photographs (SVG can't represent
        photographic detail efficiently).
      </p>

      <h3>GIF</h3>
      <p>
        Limited 256-colour palette. Supports simple animations. Largely obsolete
        WebP and AVIF support animation with far better compression and quality.
      </p>
      <p>
        <strong>Use for:</strong> Only when broad compatibility for simple
        animations is required. Avoid for everything else.
      </p>

      <h2>Format conversion</h2>
      <p>
        Our <a href='/tools/image-format-converter'>Image Format Converter</a>{" "}
        converts between PNG, JPG, WebP, and other formats. Use it to convert
        JPEG photos to WebP for web publishing, or PNG screenshots to JPG when
        transparency isn't needed and file size matters.
      </p>

      <h2>FAQ</h2>

      <h3>Should I convert all my site's images to WebP?</h3>
      <p>
        Yes, for modern sites targeting current browsers. WebP consistently
        outperforms JPG and PNG on file size with comparable quality. If you
        need to support very old browsers (IE 11), provide JPG/PNG fallbacks.
        Most modern frameworks and CDNs handle this automatically via content
        negotiation.
      </p>

      <h3>Does converting JPG to PNG improve quality?</h3>
      <p>
        No. Converting from a lossy format (JPG) to lossless (PNG) doesn't
        recover the quality lost during the original JPEG compression it just
        makes a lossless copy of the already-degraded image, at a larger file
        size. Quality can only be preserved by starting from the original
        uncompressed source.
      </p>

      <h3>What's the best format for email images?</h3>
      <p>
        JPG for photographs, PNG for graphics with transparency. WebP is not
        universally supported in email clients stick to JPG and PNG for email.
      </p>

      <h2>Conclusion</h2>
      <p>
        The format decision comes down to content type: photographs → WebP (or
        JPG for maximum compatibility); graphics/logos with transparency → PNG
        or SVG; simple vector graphics → SVG; animations → WebP. Use the{" "}
        <a href='/tools/image-format-converter'>Image Format Converter</a> to
        convert between formats, and follow with the{" "}
        <a href='/tools/image-compressor'>Image Compressor</a> to reduce file
        size before publishing.
      </p>
    </>
  );
}
