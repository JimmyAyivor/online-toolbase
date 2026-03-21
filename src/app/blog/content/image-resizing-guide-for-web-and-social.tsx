// src/app/blog/content/image-resizing-guide-for-web-and-social.tsx
export default function Post() {
  return (
    <>
      <p>
        Uploading the wrong image size is one of the easiest performance
        problems to create and one of the most overlooked. A 4MB hero image that
        could be 150KB with appropriate resizing is costing every visitor load
        time and costing you Core Web Vitals score. The right dimensions and
        file size for each context social media, web, email, print are
        well-defined; the gap is usually just not knowing them.
      </p>

      <h2>Why image dimensions and file size both matter</h2>
      <p>
        Dimensions determine how many pixels the image contains. File size
        determines how much data needs to be transferred. Both matter but in
        different ways:
      </p>
      <ul>
        <li>
          A 5000×3500px image displayed at 800×600px forces the browser to
          download all 5000×3500px of data just to show 800×600px wasted
          bandwidth and slower load.
        </li>
        <li>
          An image with correct dimensions but high compression quality may
          still have large file size if the format is inefficient (PNG for a
          photograph, for example).
        </li>
      </ul>
      <p>
        Correct approach: resize to the actual display dimensions first, then
        choose the appropriate format and compression level.
      </p>
      <p>
        Our <a href='/tools/image-cropper-resizer'>Image Cropper & Resizer</a>{" "}
        handles both operations crop to the right aspect ratio and resize to the
        target dimensions in one step.
      </p>

      <h2>Standard dimensions by context</h2>

      <h3>Website images</h3>
      <ul>
        <li>
          <strong>Hero/banner:</strong> 1920×1080px at maximum; displayed width
          rarely exceeds 1440px. File size target under 200KB for hero images.
        </li>
        <li>
          <strong>Blog post images:</strong> 1200×630px is a common standard
          that also works for Open Graph sharing.
        </li>
        <li>
          <strong>Product images:</strong> Square (1:1) at 800–1200px minimum.
          Most e-commerce platforms recommend at least 800px on each side for
          zoom functionality.
        </li>
        <li>
          <strong>Thumbnails:</strong> 300–600px depending on grid size.
        </li>
      </ul>

      <h3>Social media</h3>
      <ul>
        <li>
          <strong>Instagram post (square):</strong> 1080×1080px
        </li>
        <li>
          <strong>Instagram post (portrait 4:5):</strong> 1080×1350px
        </li>
        <li>
          <strong>Instagram Stories/Reels:</strong> 1080×1920px
        </li>
        <li>
          <strong>Facebook post:</strong> 1200×630px
        </li>
        <li>
          <strong>LinkedIn post:</strong> 1200×627px
        </li>
        <li>
          <strong>Twitter/X image:</strong> 1600×900px (16:9)
        </li>
        <li>
          <strong>YouTube thumbnail:</strong> 1280×720px
        </li>
      </ul>

      <h3>Email</h3>
      <ul>
        <li>
          <strong>Email header:</strong> 600–700px wide (the standard email
          column width). 200px tall for a typical header.
        </li>
        <li>
          <strong>Inline images:</strong> Max 600px wide. Keep file size under
          100KB per image for reliable delivery.
        </li>
      </ul>

      <h2>Cropping vs resizing</h2>
      <p>
        Resizing changes the dimensions while maintaining proportions (scales
        the image). Cropping changes the dimensions by removing content from the
        edges (changes aspect ratio). For a square Instagram post from a
        landscape photo, you need to crop removing the sides not just resize.
      </p>
      <p>
        Always crop to the correct aspect ratio first, then resize to the target
        pixel dimensions. If you resize a landscape image to square dimensions
        without cropping first, it will be stretched.
      </p>

      <h2>FAQ</h2>

      <h3>Should I resize images in HTML or in the file itself?</h3>
      <p>
        In the file always. Setting width and height in HTML without actually
        resizing the image file just makes the browser download the full-size
        image and display it small. Resize the actual file to the dimensions you
        need.
      </p>

      <h3>What resolution (DPI) do web images need?</h3>
      <p>
        DPI (dots per inch) is meaningless for web images it only matters for
        print. Screen resolution is measured in pixels, not DPI. Ignore DPI for
        web; focus on pixel dimensions and file size.
      </p>

      <h3>How do I serve different sizes to different screen sizes?</h3>
      <p>
        Use the HTML <code>srcset</code> attribute and{" "}
        <code>&lt;picture&gt;</code> element to specify multiple image sizes;
        the browser downloads the appropriate size. This is responsive images a
        standard web performance practice.
      </p>

      <h2>Conclusion</h2>
      <p>
        Getting image dimensions right before upload is one of the fastest wins
        in web performance. Use the{" "}
        <a href='/tools/image-cropper-resizer'>Image Cropper & Resizer</a> to
        crop to the correct aspect ratio and resize to platform-specific
        dimensions, then follow with the{" "}
        <a href='/tools/image-compressor'>Image Compressor</a> to reduce file
        size before publishing.
      </p>
    </>
  );
}
