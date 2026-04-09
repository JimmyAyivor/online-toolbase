// src/app/blog/content/open-graph-images-social-sharing-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        Most website owners spend significant effort on the page experience
        layout, typography, content. Then someone shares the page on LinkedIn
        and it renders as a white box with a site name and no image. Open Graph
        is the set of meta tags that controls exactly what appears when your
        page is shared and it takes about five minutes to get right.
      </p>

      <h2>What Open Graph is</h2>
      <p>
        Open Graph (OG) is a protocol created by Facebook that lets web pages
        control how they appear when shared on social platforms. It's now
        implemented by virtually every major platform: LinkedIn, Twitter/X,
        Slack, Discord, WhatsApp, iMessage, and others all read OG tags when
        generating link previews.
      </p>
      <p>
        Without OG tags, platforms guess they extract the page title from the{" "}
        <code>&lt;title&gt;</code> element, the description from the first
        paragraph of text, and an image from whatever's largest on the page. The
        results are often wrong, ugly, or missing entirely.
      </p>
      <p>
        Use our <a href="/tools/open-graph-preview">Open Graph Preview</a> tool
        to see exactly how your page will appear on major platforms before
        publishing.
      </p>

      <h2>The essential Open Graph tags</h2>

      <h3>og:title</h3>
      <p>
        The title shown in the share card. Can be different from your page's
        HTML <code>&lt;title&gt;</code> this is useful when your SEO title
        includes brand name suffixes (<code>How to Format JSON | DevTools</code>
        ) but you want the social card to show just the article title (
        <code>How to Format JSON</code>). 55–95 characters is the practical
        range before truncation on most platforms.
      </p>

      <h3>og:description</h3>
      <p>
        The description under the title in the card. 2–4 sentences that explain
        what the page is about and why it's worth clicking. Most platforms
        display 55–200 characters before truncating. Write for the share
        context: this is the last pitch before the click.
      </p>

      <h3>og:image</h3>
      <p>
        The image displayed in the card. This single tag has the most impact on
        click-through rate from social sharing. Best practices:
      </p>
      <ul>
        <li>
          Minimum 1200×630 pixels (the recommended size for most platforms)
        </li>
        <li>Aspect ratio of 1.91:1 is safe across platforms</li>
        <li>Under 8MB file size (under 1MB is preferable for load speed)</li>
        <li>
          Include text overlaid on the image if the image alone doesn't convey
          context
        </li>
        <li>Use an absolute URL including https:// relative URLs won't work</li>
      </ul>

      <h3>og:url</h3>
      <p>
        The canonical URL for the page. Important for correct deduplication if
        your page is accessible at multiple URLs (www vs non-www, with vs
        without trailing slash), set <code>og:url</code> to the canonical
        version to ensure share counts aggregate to one URL rather than
        splitting.
      </p>

      <h3>og:type</h3>
      <p>
        The type of content: <code>website</code> (default),{" "}
        <code>article</code>, <code>book</code>, <code>profile</code>,{" "}
        <code>video.movie</code>, etc. For blog posts, use <code>article</code>.
        This enables additional metadata (article:author,
        article:published_time) that platforms use for enhanced display.
      </p>

      <h2>Twitter Card tags</h2>
      <p>
        Twitter uses its own card system alongside OG. The key tag is{" "}
        <code>twitter:card</code>. Options:
      </p>
      <ul>
        <li>
          <code>summary</code> small square thumbnail with title and description
        </li>
        <li>
          <code>summary_large_image</code> large featured image above title.
          This is the right choice for most content pages
        </li>
      </ul>
      <p>
        Add <code>twitter:site</code> (your @handle) and{" "}
        <code>twitter:creator</code> (author's @handle) for attribution in the
        card. Twitter falls back to OG tags for title, description, and image if
        Twitter-specific tags are absent.
      </p>

      <h2>Common mistakes</h2>
      <p>
        <strong>Using a relative URL for og:image.</strong> This doesn't work.
        Always use the full absolute URL including protocol.
      </p>
      <p>
        <strong>Same og:image for every page.</strong> Generic site-wide images
        don't communicate what a specific page is about. Article-specific images
        consistently outperform generic brand images for share click-through.
      </p>
      <p>
        <strong>Not checking the cache.</strong> Platforms cache OG data. After
        updating tags, use platform-specific debugging tools (Facebook Debugger,
        LinkedIn Post Inspector) to force a cache refresh.
      </p>

      <h2>FAQ</h2>

      <h3>Do Open Graph tags affect SEO?</h3>
      <p>
        Not directly. OG tags are for social sharing, not for search engines.
        However, social shares can drive traffic and links, which indirectly
        affect SEO. And pages with strong social sharing often have better
        engagement metrics, which can have indirect ranking effects.
      </p>

      <h3>What image format is best for og:image?</h3>
      <p>
        JPEG for photographs (smaller file size), PNG for images with text or
        flat graphics (better quality). WebP is supported by some platforms but
        JPEG/PNG remains safest for universal compatibility.
      </p>

      <h3>
        Why does my OG image look wrong on Facebook but correct elsewhere?
      </h3>
      <p>
        Likely a cache issue. Use the{" "}
        <a
          href="https://developers.facebook.com/tools/debug/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook Sharing Debugger
        </a>{" "}
        to scrape fresh OG data and see exactly what Facebook reads. This also
        shows you the cached version vs the current version.
      </p>

      <h2>Conclusion</h2>
      <p>
        Open Graph tags are five minutes of implementation with a
        disproportionate impact on how your content appears when shared. Set the
        essential four tags on every page, use article-specific images rather
        than a generic site logo, and verify with the{" "}
        <a href="/tools/open-graph-preview">Open Graph Preview</a> tool before
        publishing. Your shared links will consistently look professional across
        every platform that renders them.
      </p>
    </>
  );
}
