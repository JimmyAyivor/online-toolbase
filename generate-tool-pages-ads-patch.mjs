// ─── Ad-integrated tool page template ────────────────────────────────────────
// This replaces the generatePageTsx() function in generate-tool-pages.mjs.
// Zones wired: F (sidebar), G (below result), H (between tool+editorial), I (related tools native)

// Slot IDs — set these in .env.local:
//   NEXT_PUBLIC_AD_SLOT_BELOW_TOOL=1111111111     (Zone G — below tool result)
//   NEXT_PUBLIC_AD_SLOT_LEADERBOARD=2222222222    (Zone H — between tool + How To)
//   NEXT_PUBLIC_AD_SLOT_SIDEBAR=3333333333        (Zone F — sticky sidebar)
//   NEXT_PUBLIC_AD_SLOT_MOBILE_STICKY=4444444444  (Zone J — mobile footer, in layout.tsx)
//   NEXT_PUBLIC_AD_SLOT_HOMEPAGE_A=5555555555     (Zone A — below hero)
//   NEXT_PUBLIC_AD_SLOT_HOMEPAGE_B=6666666666     (Zone B — between categories + grid)

function generatePageTsx(tool) {
  const component = toComponentName(tool.slug);
  const keywords  = toKeywords(tool);
  const related   = relatedBlock(tool.related);
  const catLower  = tool.category.toLowerCase();

  return `// src/app/tools/${tool.slug}/page.tsx
import type { Metadata } from "next";
import ${component}Client from "./${component}Client";
import AdSlot         from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";

const SITE_URL  = "${SITE_URL}";
const SITE_NAME = "${SITE_NAME}";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL   = process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL   ?? "0000000000";
const SLOT_LEADERBOARD  = process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD  ?? "0000000000";

export const metadata: Metadata = {
  title: "${tool.name} — Free Online ${tool.name} | ${SITE_NAME}",
  description: "${tool.description.replace(/"/g, "'")} Free, instant, no signup required.",
  keywords: "${keywords}",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator:   SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: \`\${SITE_URL}/tools/${tool.slug}\` },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type:        "website",
    url:         \`\${SITE_URL}/tools/${tool.slug}\`,
    siteName:    SITE_NAME,
    locale:      "en_US",
    title:       "${tool.name} — Free Online ${tool.name}",
    description: "${tool.description.replace(/"/g, "'")} Free, instant, no signup.",
    images: [{ url: \`\${SITE_URL}/og/${tool.slug}.png\`, width: 1200, height: 630, alt: "Free Online ${tool.name}" }],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "${TWITTER}",
    creator:     "${TWITTER}",
    title:       "${tool.name} — Free Online ${tool.name}",
    description: "${tool.description.replace(/"/g, "'")}",
    images:      [\`\${SITE_URL}/og/${tool.slug}.png\`],
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type":    "SoftwareApplication",
  name:        "${tool.name}",
  description: "${tool.description.replace(/"/g, "'")}",
  url:         \`\${SITE_URL}/tools/${tool.slug}\`,
  applicationCategory: "WebApplication",
  operatingSystem:     "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type":    "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                   item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "${tool.category} Tools", item: \`\${SITE_URL}/?category=${catLower}\` },
    { "@type": "ListItem", position: 3, name: "${tool.name}",           item: \`\${SITE_URL}/tools/${tool.slug}\` },
  ],
};

export default function ${component}Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-indigo-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/?category=${catLower}" className="hover:text-indigo-600 transition-colors">${tool.category} Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">${tool.name}</span></li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free ${tool.category} Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">${tool.name} — Free Online ${tool.name}</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          ${tool.description} Free, instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout>

        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id="main-content" aria-label="${tool.name} tool">
          <${component}Client />
        </main>

        {/* ── Zone G: below tool result — highest value placement ──────── */}
        {/* Sits immediately after the tool, before any editorial content   */}
        <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-center">
          {/* desktop: rectangle 336×280; mobile: medium rectangle 300×250 */}
          <div className="hidden sm:block">
            <AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} />
          </div>
          <div className="block sm:hidden">
            <AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} />
          </div>
        </div>

        {/* ── Zone H: between tool + How To editorial ──────────────────── */}
        <div className="max-w-6xl mx-auto px-4 mt-4 flex justify-center">
          <AdSlot variant="leaderboard" slotId={SLOT_LEADERBOARD} className="hidden sm:flex" />
          <AdSlot variant="mediumrectangle" slotId={SLOT_LEADERBOARD} className="flex sm:hidden" />
        </div>

        {/* ── Editorial: How To + Related Tools ────────────────────────── */}
        <section aria-labelledby="about-${tool.slug}" className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 id="about-${tool.slug}" className="text-2xl font-bold text-gray-900 mb-4">
              How to Use This Free ${tool.name}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our free online <strong>${tool.name.toLowerCase()}</strong> is designed for speed and
              simplicity. ${tool.description} No software installation or account is required —
              just use the tool above and get results instantly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              All processing runs entirely in your browser. Your data is never sent to or stored on
              our servers. This tool is part of our{" "}
              <a href="/" className="text-indigo-600 hover:underline font-medium">
                free online tools directory
              </a>{" "}
              — 60+ tools covering calculators, converters, generators, and social media utilities.
            </p>
          </div>

          {/* ── Zone I: related tools grid with native ad slot ──────────── */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Related Free ${tool.category} Tools
            </h3>
            {/* 3-slot grid; the 4th card position (index 3) is reserved for */}
            {/* a native sponsored card — set data-ad-format="fluid" in AdSense */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
${related}
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block bg-white rounded-xl shadow p-5 border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
                  aria-label={\`\${link.label} — \${link.desc}\`}
                >
                  <div className="font-bold text-gray-900 text-sm mb-1">{link.label}</div>
                  <div className="text-xs text-gray-500">{link.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </SidebarAdLayout>
    </>
  );
}
`;
}
