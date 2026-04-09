// src/app/blog/content/aspect-ratios-explained-for-designers-and-video.tsx
export default function Post() {
  return (
    <>
      <p>
        Aspect ratio is the relationship between an image or screen's width and
        height expressed as two numbers separated by a colon. It seems like a
        simple technical spec, but getting it wrong creates stretched, cropped,
        or pillarboxed images that look unprofessional. Understanding which
        aspect ratios different platforms and contexts require prevents a
        constant cycle of manual resizing.
      </p>

      <h2>What aspect ratio means</h2>
      <p>
        A 16:9 aspect ratio means for every 16 units of width, there are 9 units
        of height. The actual dimensions can be anything that maintains this
        ratio: 1920×1080, 1280×720, 3840×2160 all 16:9. The ratio defines the
        shape, not the size.
      </p>
      <p>
        Our <a href="/tools/aspect-ratio-calculator">Aspect Ratio Calculator</a>{" "}
        calculates the missing dimension when you know the ratio and one
        dimension, or finds the ratio from known dimensions.
      </p>

      <h2>Common aspect ratios and where they're used</h2>

      <h3>16:9 (widescreen)</h3>
      <p>
        The dominant standard for video content, monitors, and television since
        the shift from 4:3. Used by: YouTube videos, most social video
        (landscape), desktop monitors, laptops, television, streaming content.
        If you're creating video content without a platform-specific reason to
        do otherwise, 16:9 is the default.
      </p>

      <h3>4:3 (traditional screen)</h3>
      <p>
        The standard for older television and computer monitors. Still used for:
        certain presentation formats (older PowerPoint/Keynote defaults), tablet
        interfaces (some iPads are closer to 4:3 than 16:9), and contexts where
        square-ish framing is intended.
      </p>

      <h3>1:1 (square)</h3>
      <p>
        Instagram popularised the square format. Still used for: Instagram posts
        (though Instagram now supports other ratios), certain avatars and
        profile pictures, some print formats.
      </p>

      <h3>9:16 (vertical/portrait)</h3>
      <p>
        The inverse of 16:9. Standard for: Stories (Instagram, Facebook,
        Snapchat), TikTok, YouTube Shorts, Reels. As mobile-first content has
        grown, 9:16 has become one of the most important ratios for social
        video.
      </p>

      <h3>4:5 (portrait)</h3>
      <p>
        Instagram's portrait post format taller than square but less extreme
        than 9:16. Common for: Instagram feed posts in portrait orientation,
        which display larger in the feed than square or landscape formats.
      </p>

      <h3>2.39:1 (cinemascope/anamorphic)</h3>
      <p>
        Ultra-wide cinematic format. Used in film production for a distinctly
        cinematic look. Creates letterboxing (black bars top and bottom) on
        standard 16:9 displays.
      </p>

      <h2>What happens when aspect ratios don't match</h2>
      <p>
        When content doesn't match the display's aspect ratio, the options are:
      </p>
      <ul>
        <li>
          <strong>Letterboxing/pillarboxing:</strong> Add black bars to fill the
          difference. Preserves original proportions but uses less of the
          display.
        </li>
        <li>
          <strong>Cropping:</strong> Trim the content to fill the target ratio.
          Loses some content around the edges.
        </li>
        <li>
          <strong>Stretching:</strong> Distort the content to fill the ratio.
          Almost always looks bad; avoid unless intentional.
        </li>
        <li>
          <strong>Scaling:</strong> Reduce or enlarge while maintaining ratio.
          Doesn't fill the full space.
        </li>
      </ul>

      <h2>Responsive image aspect ratios on the web</h2>
      <p>
        CSS's <code>aspect-ratio</code> property (modern browsers) or the
        padding-top hack (legacy) maintains aspect ratio as an element resizes.
        For images, specifying both width and height attributes in HTML prevents
        layout shift (CLS) a Core Web Vitals metric by letting the browser
        reserve space before the image loads.
      </p>

      <h2>FAQ</h2>

      <h3>How do I resize an image without distorting it?</h3>
      <p>
        Resize by specifying one dimension and letting the other scale
        proportionally (maintaining the original aspect ratio). Most image
        editors have a "constrain proportions" or "lock aspect ratio" option. If
        you specify both dimensions at different ratios than the original, the
        image will distort.
      </p>

      <h3>What aspect ratio should I use for LinkedIn banner images?</h3>
      <p>
        LinkedIn recommends 4:1 for company page banners (1128×191px) and
        different dimensions for personal profiles. Always check current
        platform specifications these change. The{" "}
        <a href="/tools/aspect-ratio-calculator">Aspect Ratio Calculator</a>{" "}
        helps you scale to exact platform dimensions while maintaining the right
        proportions.
      </p>

      <h3>What's the aspect ratio of A4 paper?</h3>
      <p>
        A4 is 210mm × 297mm, giving a ratio of approximately 1:1.414 (or roughly
        5:7). This is the √2 ratio used by the entire ISO 216 paper size system,
        which has the useful property that folding in half gives the next
        smaller size with the same ratio.
      </p>

      <h2>Conclusion</h2>
      <p>
        Knowing the required aspect ratio for your platform before you start
        designing or filming prevents resizing headaches. Use the{" "}
        <a href="/tools/aspect-ratio-calculator">Aspect Ratio Calculator</a> to
        find missing dimensions when scaling existing content, or to verify that
        your dimensions maintain the intended ratio.
      </p>
    </>
  );
}
