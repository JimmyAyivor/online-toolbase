// src/app/blog/content/profile-picture-sizes-for-every-platform.tsx
export default function Post() {
  return (
    <>
      <p>
        Profile pictures are displayed at many different sizes depending on the
        platform and context sometimes as a tiny 32×32 circle in a comment
        thread, sometimes as a full 400px avatar on your profile page. A photo
        that looks great at full size can look terrible when compressed to a
        thumbnail, particularly if it contains small details or text. Getting
        your profile picture right across platforms starts with understanding
        what each platform actually requires.
      </p>

      <h2>Platform profile picture dimensions</h2>

      <h3>Social media</h3>
      <ul>
        <li>
          <strong>Instagram:</strong> Displayed at 110×110px on profile; stored
          at higher resolution. Upload at least 320×320px. Square format
          displayed as a circle on mobile.
        </li>
        <li>
          <strong>Twitter/X:</strong> Displayed at 200×200px maximum. Upload at
          400×400px or larger for future-proofing. Displayed as a circle.
        </li>
        <li>
          <strong>Facebook:</strong> Profile picture displays at 170×170px on
          desktop. Upload at 320×320px minimum for best quality.
        </li>
        <li>
          <strong>LinkedIn:</strong> Profile photo displayed at 200×200px,
          stored at up to 400×400px. Must be at least 200×200px. Circular
          display.
        </li>
        <li>
          <strong>TikTok:</strong> Displayed at approximately 100×100px in feed;
          upload at 200×200px. Displayed as a circle.
        </li>
        <li>
          <strong>YouTube:</strong> Channel icon displayed at 98×98px in most
          contexts. Upload at 800×800px minimum for quality across all contexts.
        </li>
      </ul>

      <h3>Messaging and work platforms</h3>
      <ul>
        <li>
          <strong>Slack:</strong> 512×512px maximum upload; displayed at various
          sizes from 24px (small inline) to 192px (profile page).
        </li>
        <li>
          <strong>Discord:</strong> Displayed at 32px in messages to 128px on
          profile. Upload at 128×128px minimum.
        </li>
        <li>
          <strong>Zoom:</strong> Profile picture displays at 80×80px. Minimum
          200×200px upload.
        </li>
        <li>
          <strong>Microsoft Teams:</strong> Displayed at various sizes; upload
          at 648×648px for best quality.
        </li>
        <li>
          <strong>GitHub:</strong> Upload at 460×460px minimum. Displayed in
          various contexts from small inline to full profile view.
        </li>
      </ul>

      <p>
        Our <a href='/tools/profile-picture-resizer'>Profile Picture Resizer</a>{" "}
        crops and resizes any photo to the correct dimensions for any platform,
        with options for circular cropping preview.
      </p>

      <h2>What makes a good profile picture</h2>
      <p>
        Profile pictures are almost always displayed at small sizes in their
        most common context a 32–50px circle in a comment thread or message
        list. This means:
      </p>
      <ul>
        <li>
          <strong>Face close and centred.</strong> Wide-angle shots where the
          face is small look like a blank circle at thumbnail size. Fill the
          frame with your face or subject.
        </li>
        <li>
          <strong>High contrast between subject and background.</strong> At
          small sizes, low contrast makes the image look muddy and
          unrecognisable.
        </li>
        <li>
          <strong>Simple background.</strong> Complex backgrounds compete with
          the subject at any size; at small sizes they become noise.
        </li>
        <li>
          <strong>No text.</strong> Text in a profile picture is unreadable at
          thumbnail sizes.
        </li>
        <li>
          <strong>Good lighting.</strong> Even, clear lighting shows the face
          clearly at any size.
        </li>
      </ul>

      <h2>Square vs circular display</h2>
      <p>
        Most platforms display profile pictures as circles. If you upload a
        square photo without circular cropping, the corners get cut off. Make
        sure the important content (your face, logo, or subject) is centred
        within the square frame, ideally with some margin from the edges.
      </p>
      <p>
        Some platforms (like Slack for workspace icons) display as squares or
        rounded squares. Check the display format for each platform before
        uploading.
      </p>

      <h2>FAQ</h2>

      <h3>Should I use a real photo or a logo as my profile picture?</h3>
      <p>
        For personal accounts, a real photo consistently produces better
        engagement and connection people respond differently to faces than to
        logos. For brand/company accounts, a simplified logo is standard. For
        personal professional accounts (LinkedIn especially), a real photo is
        strongly recommended.
      </p>

      <h3>Can I use the same photo across all platforms?</h3>
      <p>
        Yes, but resize and re-export for each platform's specifications rather
        than uploading the same file everywhere. Platforms compress uploads
        differently starting from a high-quality source image and exporting to
        each platform's specs gives you the best quality on each one.
      </p>

      <h3>How do I make a photo look good at small sizes?</h3>
      <p>
        Start with a high-resolution original. Crop tightly to the subject.
        Ensure the key detail (face, logo) fills at least 60–70% of the frame.
        Check at the actual display size zoom out to see how it looks at 40–50px
        before finalising.
      </p>

      <h2>Conclusion</h2>
      <p>
        Upload the right dimensions and centre the subject clearly within the
        frame those two steps fix most profile picture problems. Use the{" "}
        <a href='/tools/profile-picture-resizer'>Profile Picture Resizer</a> to
        export correctly sized versions for any platform, and check your result
        at the actual display size before uploading.
      </p>
    </>
  );
}
