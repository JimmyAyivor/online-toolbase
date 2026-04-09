// src/app/blog/content/meta-tags-complete-guide-for-seo.tsx
export default function Post() {
  return (
    <>
      <p>
        Meta tags are HTML elements that provide information about a page to
        search engines and social platforms they live in the{" "}
        <code>&lt;head&gt;</code> of an HTML document and are invisible to
        visitors but highly visible to crawlers and link-sharing systems.
        Getting them right has a direct and measurable impact on search
        rankings, click-through rates, and how your pages look when shared on
        social media.
      </p>

      <h2>The meta tags that actually matter</h2>

      <h3>Title tag</h3>
      <p>
        Technically not a meta tag (it's a <code>&lt;title&gt;</code> element),
        but always discussed with meta tags because it's the most important
        single on-page SEO element. The title appears as the blue link text in
        search results and in the browser tab.
      </p>
      <p>
        Best practices: 50–60 characters, primary keyword near the start,
        descriptive and accurate, unique across your site. Google sometimes
        rewrites titles this usually happens when the title is too long, too
        short, keyword-stuffed, or doesn't match the page content. Write
        accurate titles and Google's rewrites are rare.
      </p>

      <h3>Meta description</h3>
      <p>
        The <code>&lt;meta name="description"&gt;</code> tag provides the
        snippet that appears below the title in search results. It doesn't
        directly affect rankings, but it significantly affects click-through
        rate a well-written description that matches search intent and includes
        a soft call to action gets more clicks than a generic or absent one.
      </p>
      <p>
        Best practices: 140–160 characters, include the primary keyword
        naturally, address the user's intent, end with a reason to click. Google
        often ignores the description and pulls text from the page instead this
        happens most when the description doesn't match the actual query.
      </p>

      <h3>Open Graph tags</h3>
      <p>
        Open Graph (<code>og:</code>) tags control how pages look when shared on
        Facebook, LinkedIn, Slack, and most other platforms. The key ones:
      </p>
      <ul>
        <li>
          <code>og:title</code> the title shown in the social share card
        </li>
        <li>
          <code>og:description</code> the description in the share card
        </li>
        <li>
          <code>og:image</code> the image displayed in the card (minimum
          1200×630px recommended)
        </li>
        <li>
          <code>og:url</code> the canonical URL for the page
        </li>
        <li>
          <code>og:type</code> the content type ("website", "article",
          "product")
        </li>
      </ul>
      <p>
        Without these tags, platforms guess often pulling the wrong image or an
        uninformative description. Always set Open Graph tags on any page likely
        to be shared.
      </p>

      <h3>Twitter Card tags</h3>
      <p>
        Twitter (X) uses its own card system. The main tag is{" "}
        <code>twitter:card</code>, which controls the card format:{" "}
        <code>summary</code> (small image), <code>summary_large_image</code>{" "}
        (large featured image), <code>app</code>, or <code>player</code>.
        Twitter falls back to Open Graph tags if Twitter-specific tags aren't
        present, so setting OG tags first is the minimum; Twitter tags refine
        the display.
      </p>

      <h3>Robots meta tag</h3>
      <p>
        <code>&lt;meta name="robots" content="..."&gt;</code> controls crawler
        behaviour. Key values:
      </p>
      <ul>
        <li>
          <code>index</code> / <code>noindex</code> whether to include the page
          in search results
        </li>
        <li>
          <code>follow</code> / <code>nofollow</code> whether to follow links on
          the page
        </li>
        <li>
          <code>noarchive</code> prevent Google from showing a cached version
        </li>
        <li>
          <code>nosnippet</code> prevent Google from showing a description
          snippet
        </li>
      </ul>
      <p>
        The default (no robots tag) is <code>index, follow</code>. Only add this
        tag when you need non-default behaviour.
      </p>

      <h3>Canonical tag</h3>
      <p>
        Not a meta tag exactly (<code>&lt;link rel="canonical"&gt;</code>), but
        essential for duplicate content management. Tells search engines which
        URL is the authoritative version when the same content is accessible at
        multiple URLs pagination, tracking parameters, HTTP vs HTTPS, www vs
        non-www.
      </p>

      <h2>Generating meta tags efficiently</h2>
      <p>
        Our <a href="/tools/meta-tag-generator">Meta Tag Generator</a> creates
        all the essential meta tags title, description, Open Graph, Twitter
        Card, and robots from a simple form. Copy the output directly into your
        page's <code>&lt;head&gt;</code>. Combine with our{" "}
        <a href="/tools/open-graph-preview">Open Graph Preview</a> tool to
        verify how your share cards will look before publishing.
      </p>

      <h2>FAQ</h2>

      <h3>Do meta keywords still matter?</h3>
      <p>
        No. Google officially confirmed in 2009 that it ignores the meta
        keywords tag for ranking. Bing has also said it uses it only minimally,
        as a spam signal. Don't spend time on meta keywords.
      </p>

      <h3>How often should I update meta descriptions?</h3>
      <p>
        When you update the page content, when your click-through rate is low in
        Search Console, or when a description no longer accurately describes the
        current page. Don't change descriptions that are performing well without
        a clear reason.
      </p>

      <h3>What happens if I have duplicate title tags across pages?</h3>
      <p>
        Duplicate titles make it harder for Google to understand what makes each
        page distinct. They can lead to the wrong page ranking for a query.
        Every page should have a unique, accurate title that reflects its
        specific content.
      </p>

      <h2>Conclusion</h2>
      <p>
        Meta tags are a small investment with significant returns a properly set
        title and description improve CTR from search results, and Open Graph
        tags ensure your pages look professional when shared. Use the{" "}
        <a href="/tools/meta-tag-generator">Meta Tag Generator</a> to produce
        the complete set quickly and preview social share cards with the{" "}
        <a href="/tools/open-graph-preview">Open Graph Preview</a> tool before
        going live.
      </p>
    </>
  );
}
