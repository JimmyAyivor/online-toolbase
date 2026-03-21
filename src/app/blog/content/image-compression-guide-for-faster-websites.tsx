// src/app/blog/content/image-compression-guide-for-faster-websites.tsx
export default function Post() {
  return (
    <>
      <p>
        Images account for the majority of page weight on most websites
        typically 50–75% of total page size. Reducing image file size is the
        single highest-impact performance optimisation available to most site
        owners, and it requires zero coding. The tradeoff between visual quality
        and file size is the only real decision involved.
      </p>

      <h2>Lossy vs lossless compression</h2>
      <p>
        <strong>Lossless compression</strong> reduces file size by removing
        redundant data without discarding any image information. The image can
        be perfectly reconstructed from the compressed file. Lossless
        compression is limited typically 10–30% size reduction. Use for: PNG
        graphics, logos, images you'll edit further.
      </p>
      <p>
        <strong>Lossy compression</strong> permanently removes some image data
        typically fine detail that's hard to perceive to achieve much higher
        compression ratios. Quality loss is controlled by a quality setting. At
        quality 80–85% (a typical web setting), the visual difference from the
        original is imperceptible to most viewers, while file size is 60–80%
        smaller. Use for: photographs and complex images.
      </p>
      <p>
        Our <a href='/tools/image-compressor'>Image Compressor</a> reduces file
        size with adjustable quality settings while showing you the size saving
        and quality comparison.
      </p>

      <h2>Target file sizes for web</h2>
      <ul>
        <li>
          <strong>Hero images:</strong> Under 200KB. 100–150KB is achievable for
          most hero images at web display sizes.
        </li>
        <li>
          <strong>Blog post images:</strong> 50–150KB depending on complexity
          and dimensions.
        </li>
        <li>
          <strong>Product images:</strong> 50–100KB per image. For product
          galleries with many images, keeping each image under 80KB has a
          meaningful cumulative effect.
        </li>
        <li>
          <strong>Thumbnails:</strong> Under 20–30KB.
        </li>
        <li>
          <strong>Icons:</strong> Under 5KB. SVG is usually better for icons
          than compressed PNG.
        </li>
      </ul>

      <h2>The impact on page load and Core Web Vitals</h2>
      <p>
        Google's Largest Contentful Paint (LCP) a Core Web Vitals metric
        measures how long it takes for the largest visible element to load. This
        is often a hero image. Reducing a 1.5MB hero image to 120KB can move LCP
        from "needs improvement" to "good" on mobile connections without any
        other changes.
      </p>
      <p>
        Every 100KB reduction in page weight saves approximately 0.1 seconds on
        a 10Mbps connection. On slow mobile connections (1–3Mbps, common in many
        markets), each megabyte saved is 0.3–1 second of load time.
      </p>

      <h2>Compression workflow</h2>
      <ol>
        <li>
          Resize the image to actual display dimensions first (see:{" "}
          <a href='/tools/image-cropper-resizer'>Image Cropper & Resizer</a>)
        </li>
        <li>
          Convert to the appropriate format (WebP for photos, PNG for graphics
          with transparency)
        </li>
        <li>
          Apply compression at quality 80–85% for photographs; lossless for
          graphics
        </li>
        <li>
          Check the result visually at display size if quality looks good, the
          compression setting is correct
        </li>
      </ol>

      <h2>FAQ</h2>

      <h3>What quality level should I use?</h3>
      <p>
        For JPEG/WebP photographs: 75–85% is the standard range. Below 70% is
        visibly degraded on detailed photographs; above 85% provides minimal
        additional quality at significantly larger file size. The right level
        depends on the specific image use your eyes to judge at the display
        size.
      </p>

      <h3>Does compression affect SEO?</h3>
      <p>
        Indirectly page speed (including image load time) is a ranking factor.
        Heavily compressed, pixelated images that degrade user experience don't
        help. Well-compressed images at appropriate quality that load quickly
        do.
      </p>

      <h3>Should I compress images before or after uploading to a CMS?</h3>
      <p>
        Before always. Most CMSes store what you upload. Some apply additional
        compression, but you can't control its quality settings. Compress to
        your target quality before upload to ensure consistent results.
      </p>

      <h2>Conclusion</h2>
      <p>
        Image compression is the highest-impact, lowest-effort web performance
        optimisation available. Use the{" "}
        <a href='/tools/image-compressor'>Image Compressor</a> to reduce file
        size on any image before web publishing, targeting under 150KB for most
        full-width images and under 50KB for smaller supporting images.
      </p>
    </>
  );
}
