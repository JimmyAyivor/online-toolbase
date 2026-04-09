// src/app/blog/content/word-count-targets-for-every-content-type.tsx
export default function Post() {
  return (
    <>
      <p>
        Word count and character count are the most basic measurements in
        writing but the targets differ significantly by platform, content type,
        and purpose. Tweets, meta descriptions, LinkedIn posts, academic papers,
        landing pages, and email subject lines all have different optimal
        lengths, and some have hard limits that cut you off if you exceed them.
      </p>
      <p>
        This is a practical reference for the limits and targets that matter
        most, by content type.
      </p>

      <h2>Why character count matters differently than word count</h2>
      <p>
        Word count measures content depth how much ground you're covering.
        Character count is primarily a technical constraint imposed by platforms
        and display contexts. Social media platforms enforce character limits
        directly. SEO tools cap meta titles and descriptions not by words but by
        the pixel width of the text in search results (though character count is
        a reasonable proxy). SMS messages have a 160-character limit per
        segment.
      </p>
      <p>
        Our <a href="/tools/word-character-counter">Word & Character Counter</a>{" "}
        tracks both simultaneously as you type, so you can monitor the metric
        that matters for your specific context without switching tools.
      </p>

      <h2>Character limits by platform</h2>

      <h3>Social media</h3>
      <ul>
        <li>
          <strong>Twitter/X:</strong> 280 characters per tweet. Shorter posts
          (under 100 characters) typically get higher engagement.
        </li>
        <li>
          <strong>Instagram caption:</strong> 2,200 characters maximum, but only
          the first 125 characters show before "more". Write the most important
          content first.
        </li>
        <li>
          <strong>LinkedIn post:</strong> 3,000 characters. First 210 characters
          show before the "see more" cutoff on desktop.
        </li>
        <li>
          <strong>Facebook post:</strong> 63,206 characters (effectively
          unlimited for practical purposes).
        </li>
        <li>
          <strong>TikTok caption:</strong> 2,200 characters, though shorter is
          typical for the platform's style.
        </li>
      </ul>

      <h3>SEO metadata</h3>
      <ul>
        <li>
          <strong>Meta title:</strong> 50–60 characters. Google truncates titles
          longer than roughly 600 pixels (about 60 characters in standard
          fonts). Keep the primary keyword near the start.
        </li>
        <li>
          <strong>Meta description:</strong> 140–160 characters. Longer
          descriptions get truncated in search results. This doesn't directly
          affect ranking but does affect click-through rate.
        </li>
        <li>
          <strong>URL slug:</strong> No hard limit, but shorter is better for
          readability and sharing. 50–75 characters is a sensible maximum.
        </li>
      </ul>

      <h3>Email</h3>
      <ul>
        <li>
          <strong>Subject line:</strong> 40–60 characters for desktop; under 30
          characters to avoid truncation on mobile (where over 60% of email is
          read).
        </li>
        <li>
          <strong>Preview text:</strong> 85–100 characters. This shows alongside
          the subject line in most email clients.
        </li>
      </ul>

      <h2>Word count targets by content type</h2>

      <h3>Blog posts and articles</h3>
      <ul>
        <li>
          <strong>Short posts:</strong> 500–800 words. Good for news updates,
          announcements, and thin-topic posts.
        </li>
        <li>
          <strong>Standard articles:</strong> 1,000–1,500 words. The working
          default for most informational content.
        </li>
        <li>
          <strong>In-depth guides:</strong> 2,000–4,000 words. For competitive
          SEO topics requiring comprehensive coverage.
        </li>
      </ul>

      <h3>Landing pages and web copy</h3>
      <ul>
        <li>
          <strong>Product pages:</strong> 300–500 words of body copy is typical,
          though e-commerce pages for complex products often go longer.
        </li>
        <li>
          <strong>Landing pages:</strong> Highly variable short for simple
          offers (under 500 words), long for high-consideration purchases
          (2,000+ words with objection handling).
        </li>
      </ul>

      <h3>Academic writing</h3>
      <ul>
        <li>
          Essay assignments: typically specified by the instructor (1,000–5,000
          words for undergraduate work).
        </li>
        <li>
          Journal articles: 5,000–8,000 words for most peer-reviewed journals.
        </li>
        <li>
          Dissertations: 10,000–100,000 words depending on level and field.
        </li>
      </ul>

      <h2>How to use word count strategically</h2>
      <p>
        Don't work backwards from a word count target. Write what the topic
        requires, then check the count. If you're significantly short of a
        content brief's target, the question isn't "how do I add words?" but
        "what important aspects haven't I covered?" If you're significantly
        over, ask what can be cut without losing value.
      </p>
      <p>
        For SEO content specifically, the relevant question isn't length but
        completeness. Pages that cover a topic thoroughly answering the
        questions a reader has, including ones they haven't thought to ask yet
        tend to outperform pages that hit a word count target mechanically. A{" "}
        <a href="/tools/readability-score-calculator">readability check</a>{" "}
        ensures that completeness is also accessible.
      </p>

      <h2>FAQ</h2>

      <h3>Do Twitter character counts include spaces?</h3>
      <p>
        Yes character counts on social platforms include spaces, punctuation,
        and most symbols. URLs are handled differently: Twitter counts every URL
        as 23 characters regardless of actual length.
      </p>

      <h3>Should word count or character count guide my blog posts?</h3>
      <p>
        Word count. Character count is relevant mainly for social media,
        metadata, and platform-constrained formats. For blog posts, word count
        is the more meaningful length metric.
      </p>

      <h3>What's the word count for a 5-minute read?</h3>
      <p>
        At an average reading speed of 238 words per minute, a 5-minute read is
        approximately 1,190 words. Use our{" "}
        <a href="/tools/reading-time-estimator">Reading Time Estimator</a> to
        check the estimated reading time for any specific piece.
      </p>

      <h2>Conclusion</h2>
      <p>
        Knowing the right limits and targets for your content type prevents
        truncation, keeps your work platform-appropriate, and helps you plan
        content that fits its purpose. Use the{" "}
        <a href="/tools/word-character-counter">Word & Character Counter</a> as
        a live reference while writing, and cross-reference with the platform
        guidelines above for anything with hard limits.
      </p>
    </>
  );
}
