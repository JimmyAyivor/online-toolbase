// src/app/blog/content/social-media-character-limits-by-platform.tsx
export default function Post() {
  return (
    <>
      <p>
        Every social media platform has character limits some enforced hard
        (Twitter cuts you off at 280), others soft (LinkedIn lets you write
        3,000 characters but most people stop reading after 210). Knowing these
        limits before you write means you format for the platform from the start
        rather than rewriting after hitting the wall.
      </p>

      <h2>Character limits at a glance</h2>
      <p>
        Use our{" "}
        <a href='/tools/social-media-character-counter'>
          Social Media Character Counter
        </a>{" "}
        to track your character count in real time against any platform's limit
        as you write.
      </p>

      <h3>Twitter / X</h3>
      <ul>
        <li>
          <strong>Tweet:</strong> 280 characters (hard limit)
        </li>
        <li>
          <strong>Twitter Blue / X Premium:</strong> Up to 25,000 characters for
          long-form posts
        </li>
        <li>
          <strong>DM:</strong> 10,000 characters
        </li>
        <li>
          <strong>Bio:</strong> 160 characters
        </li>
        <li>
          <strong>Display name:</strong> 50 characters
        </li>
      </ul>
      <p>
        Note: URLs count as 23 characters regardless of actual URL length.
        Images, GIFs, and videos don't count toward the character limit. Replies
        include the @mention in the character count.
      </p>

      <h3>Instagram</h3>
      <ul>
        <li>
          <strong>Caption:</strong> 2,200 characters (hard limit)
        </li>
        <li>
          <strong>Visible before truncation:</strong> ~125 characters (mobile),
          ~125–218 characters (desktop)
        </li>
        <li>
          <strong>Bio:</strong> 150 characters
        </li>
        <li>
          <strong>Username:</strong> 30 characters
        </li>
        <li>
          <strong>Comment:</strong> 2,200 characters
        </li>
        <li>
          <strong>Stories text sticker:</strong> Up to 250 characters visible,
          depends on font size
        </li>
      </ul>

      <h3>LinkedIn</h3>
      <ul>
        <li>
          <strong>Post:</strong> 3,000 characters
        </li>
        <li>
          <strong>Visible before "see more":</strong> ~210 characters (desktop),
          ~150 (mobile)
        </li>
        <li>
          <strong>Article:</strong> 110,000 characters (essentially unlimited)
        </li>
        <li>
          <strong>Headline:</strong> 220 characters
        </li>
        <li>
          <strong>About section:</strong> 2,600 characters
        </li>
        <li>
          <strong>Comment:</strong> 1,250 characters
        </li>
        <li>
          <strong>Connection request note:</strong> 300 characters
        </li>
        <li>
          <strong>InMail:</strong> Subject 200 characters, Body 1,900 characters
        </li>
      </ul>

      <h3>Facebook</h3>
      <ul>
        <li>
          <strong>Post (personal profile):</strong> 63,206 characters
        </li>
        <li>
          <strong>Post (page):</strong> 63,206 characters
        </li>
        <li>
          <strong>Optimal length for engagement:</strong> Under 80 characters
          (research-backed)
        </li>
        <li>
          <strong>Comment:</strong> 8,000 characters
        </li>
        <li>
          <strong>Page description (short):</strong> 255 characters
        </li>
        <li>
          <strong>Ad headline:</strong> 255 characters
        </li>
        <li>
          <strong>Ad primary text:</strong> 125 characters displayed; more
          truncated
        </li>
      </ul>

      <h3>TikTok</h3>
      <ul>
        <li>
          <strong>Caption:</strong> 2,200 characters
        </li>
        <li>
          <strong>Visible in feed:</strong> ~150 characters before truncation
        </li>
        <li>
          <strong>Bio:</strong> 80 characters
        </li>
        <li>
          <strong>Username:</strong> 24 characters
        </li>
        <li>
          <strong>Comment:</strong> 150 characters
        </li>
      </ul>

      <h3>YouTube</h3>
      <ul>
        <li>
          <strong>Title:</strong> 100 characters (displayed 60–70 before
          truncation)
        </li>
        <li>
          <strong>Description:</strong> 5,000 characters
        </li>
        <li>
          <strong>Visible before "more":</strong> ~157 characters in search
          results
        </li>
        <li>
          <strong>Tags:</strong> 500 characters total across all tags
        </li>
        <li>
          <strong>Comment:</strong> 10,000 characters
        </li>
        <li>
          <strong>Channel name:</strong> 30 characters
        </li>
      </ul>

      <h3>Pinterest</h3>
      <ul>
        <li>
          <strong>Pin description:</strong> 500 characters
        </li>
        <li>
          <strong>Board description:</strong> 500 characters
        </li>
        <li>
          <strong>Profile bio:</strong> 160 characters
        </li>
      </ul>

      <h2>Why the visible truncation point matters more than the hard limit</h2>
      <p>
        For most platforms, the real constraint isn't the hard character limit
        it's the truncation point where readers see "see more" or "..." and
        decide whether to tap. Content below the fold gets far fewer reads than
        content above it. The strategic character limit is the visible preview
        length, not the technical maximum.
      </p>
      <p>
        This means your hook the most compelling, attention-grabbing line must
        land within the first 125–150 characters on most mobile feeds,
        regardless of how much more you write.
      </p>

      <h2>Emoji and special character counting</h2>
      <p>
        Emoji count as either 1 or 2 characters depending on the platform and
        the specific emoji. Most standard emoji count as 2 characters on Twitter
        (they use multiple Unicode code units). On other platforms, counting
        varies. When your post is close to a limit and includes emoji, the
        character counter is the only reliable way to verify.
      </p>

      <h2>FAQ</h2>

      <h3>Do hashtags count toward character limits?</h3>
      <p>
        On most platforms, yes hashtags are part of the character count. On
        Twitter, a hashtag counts normally as part of the 280 characters. On
        Instagram, hashtags in the caption count toward the 2,200 limit;
        hashtags in a first comment don't count toward caption length.
      </p>

      <h3>Do line breaks count as characters?</h3>
      <p>
        Yes each line break counts as one character on most platforms. Instagram
        and LinkedIn count newlines as characters; multiple blank lines between
        paragraphs add to your total count.
      </p>

      <h3>Does LinkedIn count characters differently for articles vs posts?</h3>
      <p>
        Articles on LinkedIn use a separate editor and can contain up to 110,000
        characters they're essentially blog posts. Regular feed posts are
        limited to 3,000 characters. The two formats have different visibility,
        distribution, and audience behaviour.
      </p>

      <h2>Conclusion</h2>
      <p>
        Platform character limits are both a constraint and a guideline the hard
        limit tells you the maximum; the visible preview length tells you the
        practical target. Use the{" "}
        <a href='/tools/social-media-character-counter'>
          Social Media Character Counter
        </a>{" "}
        while drafting any post to track your count against the platform you're
        writing for in real time.
      </p>
    </>
  );
}
