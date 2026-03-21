// src/app/blog/content/robots-txt-complete-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        A robots.txt file is a simple text file that tells search engine
        crawlers which parts of your site they should and shouldn't visit. It's
        one of the first things crawlers check when they arrive at a domain.
        Getting it right means crawlers spend their time indexing pages that
        matter; getting it wrong can inadvertently block important pages from
        search engines entirely.
      </p>

      <h2>How robots.txt works</h2>
      <p>
        Robots.txt lives at the root of your domain:{" "}
        <code>https://yourdomain.com/robots.txt</code>. It's publicly accessible
        anyone (including competitors) can see it. The file uses a simple syntax
        of directives that tell crawlers what to do.
      </p>
      <p>
        Critically: robots.txt is a request, not a rule. Well-behaved crawlers
        (Googlebot, Bingbot) respect it. Malicious crawlers or scrapers may
        ignore it entirely. Don't rely on robots.txt for security use
        authentication and server-level access controls for genuinely sensitive
        content.
      </p>
      <p>
        Use our <a href='/tools/robots-txt-generator'>Robots.txt Generator</a>{" "}
        to build a valid robots.txt file without memorising the syntax.
      </p>

      <h2>Robots.txt syntax</h2>
      <p>
        The file consists of groups (called "records") each applying to a
        specific user agent (crawler):
      </p>
      <pre>
        <code>{`User-agent: Googlebot
Disallow: /admin/
Disallow: /private/
Allow: /admin/public-page/

User-agent: *
Disallow: /staging/

Sitemap: https://yourdomain.com/sitemap.xml`}</code>
      </pre>

      <h3>Key directives</h3>
      <ul>
        <li>
          <strong>User-agent:</strong> Specifies which crawler the following
          rules apply to. <code>*</code> is a wildcard matching all crawlers.
        </li>
        <li>
          <strong>Disallow:</strong> Specifies a path the crawler should not
          visit. <code>Disallow: /admin/</code> blocks everything under /admin/.
        </li>
        <li>
          <strong>Allow:</strong> Explicitly allows a path that would otherwise
          be blocked by a broader Disallow rule. More specific rules take
          precedence.
        </li>
        <li>
          <strong>Sitemap:</strong> Points crawlers to your XML sitemap. This
          directive is supported by all major search engines and is a best
          practice to include.
        </li>
        <li>
          <strong>Crawl-delay:</strong> Requests a delay between requests (in
          seconds). Supported inconsistently Google ignores it; Bing uses it.
        </li>
      </ul>

      <h2>Common robots.txt configurations</h2>

      <h3>Allow all crawling (default behaviour)</h3>
      <pre>
        <code>{`User-agent: *
Disallow:`}</code>
      </pre>
      <p>
        An empty Disallow directive means "allow everything." This is equivalent
        to not having a robots.txt file at all, but it's clearer in intent and
        allows you to add the Sitemap directive.
      </p>

      <h3>Block all crawling</h3>
      <pre>
        <code>{`User-agent: *
Disallow: /`}</code>
      </pre>
      <p>
        Blocks all crawlers from all paths. Appropriate for staging
        environments, internal tools, or sites that should not appear in search
        results. Warning: this blocks indexing. If applied to your production
        site accidentally, your pages will disappear from search results.
      </p>

      <h3>Block specific directories</h3>
      <pre>
        <code>{`User-agent: *
Disallow: /wp-admin/
Disallow: /checkout/
Disallow: /cart/
Disallow: /account/
Disallow: /search/`}</code>
      </pre>
      <p>
        A common configuration for WordPress or e-commerce sites blocking admin
        areas, user account pages, and dynamic search result pages that offer no
        SEO value and waste crawl budget.
      </p>

      <h2>What to block and what not to block</h2>

      <h3>Good candidates to disallow</h3>
      <ul>
        <li>Admin and login pages (/admin/, /wp-login.php, /login)</li>
        <li>
          Duplicate or filtered content (URL parameter variants:
          /products?sort=price)
        </li>
        <li>Private user areas (/account/, /dashboard/)</li>
        <li>Staging and development paths</li>
        <li>Internal search results (/search/)</li>
        <li>Thank-you and order confirmation pages</li>
      </ul>

      <h3>Things you should NOT block</h3>
      <ul>
        <li>
          CSS and JavaScript files needed to render your pages Google needs to
          render pages to understand them
        </li>
        <li>Your sitemap</li>
        <li>Important content pages that you want indexed</li>
        <li>Image files for image search</li>
      </ul>

      <h2>Robots.txt vs noindex</h2>
      <p>
        These are different tools with different effects.{" "}
        <code>robots.txt Disallow</code> prevents crawling the crawler won't
        visit the page. A <code>noindex</code> meta tag prevents indexing the
        crawler visits the page but doesn't include it in the index.
      </p>
      <p>
        You can't block crawling with robots.txt and also instruct crawlers to
        not index with a noindex tag if the page is blocked from crawling, the
        crawler can't read the noindex instruction. For pages you want
        deindexed, use noindex (and allow crawling). For pages you want
        uncrawled entirely, use robots.txt Disallow.
      </p>

      <h2>FAQ</h2>

      <h3>If I block a page in robots.txt, will it disappear from Google?</h3>
      <p>
        Not immediately, and not completely. Google can still show a page in
        results if it knows the URL exists (from external links), it just won't
        have content to display as a snippet. If external sites link to a
        blocked page, it can appear in results with a "no information available"
        type message. Use noindex for complete removal from results.
      </p>

      <h3>Does robots.txt affect all search engines equally?</h3>
      <p>
        Major search engines (Google, Bing, Yandex, DuckDuckGo's crawler)
        respect robots.txt. The specific directives and wildcards supported vary
        slightly. Google's robots.txt specification is the de facto standard.
      </p>

      <h3>Can robots.txt have multiple User-agent blocks?</h3>
      <p>
        Yes. Each User-agent block applies only to that crawler. Order doesn't
        matter a crawler looks for its specific user-agent name and, if not
        found, applies any wildcard (*) rules.
      </p>

      <h2>Conclusion</h2>
      <p>
        A well-configured robots.txt file is basic SEO hygiene it keeps crawlers
        focused on content that matters and out of pages that don't. Use the{" "}
        <a href='/tools/robots-txt-generator'>Robots.txt Generator</a> to create
        a correctly formatted file, include your sitemap URL, and test your
        configuration in Google Search Console's robots.txt tester before
        deploying.
      </p>
    </>
  );
}
