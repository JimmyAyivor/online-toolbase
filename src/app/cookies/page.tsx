// src/app/cookies/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const LAST_UPDATED = "1 March 2026";
const CONTACT_EMAIL = "privacy@utilvia.com";

export const metadata: Metadata = {
  title: "Cookie Policy | Online Tool Base",
  description:
    "Learn how Online Tool Base uses cookies — what we set, why, and how to control or remove them.",
  alternates: { canonical: `${SITE_URL}/cookies` },
  robots: { index: true, follow: true },
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
        {title}
      </h2>
      <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  );
}

function CookieTable({
  rows,
}: {
  rows: {
    name: string;
    type: string;
    purpose: string;
    duration: string;
  }[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">
              Cookie name
            </th>
            <th className="text-left px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">
              Type
            </th>
            <th className="text-left px-4 py-3 font-semibold text-slate-700">
              Purpose
            </th>
            <th className="text-left px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">
              Duration
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/60 transition-colors">
              <td className="px-4 py-3">
                <code className="text-xs font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                  {row.name}
                </code>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    row.type === "Essential"
                      ? "bg-emerald-100 text-emerald-700"
                      : row.type === "Analytics"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {row.type}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">{row.purpose}</td>
              <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                {row.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TOC = [
  { id: "what-are-cookies", label: "What are cookies?" },
  { id: "cookies-we-use", label: "Cookies we use" },
  { id: "essential", label: "Essential cookies" },
  { id: "analytics", label: "Analytics cookies" },
  { id: "third-party", label: "Third-party cookies" },
  { id: "managing", label: "Managing your cookies" },
  { id: "consent", label: "Your consent" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-slate-300">Cookie Policy</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-indigo-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">
                Cookie Policy
              </h1>
              <p className="text-slate-400 text-sm">
                Last updated: <time dateTime="2026-03-01">{LAST_UPDATED}</time>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                On this page
              </p>
              <nav className="space-y-1">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Summary box */}
              <div className="mt-8 rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                <p className="text-xs font-bold text-emerald-700 mb-2">
                  Plain English summary
                </p>
                <ul className="space-y-1.5 text-xs text-emerald-700">
                  <li className="flex items-start gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    We use minimal cookies
                  </li>
                  <li className="flex items-start gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    We never sell your data
                  </li>
                  <li className="flex items-start gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Analytics are anonymous
                  </li>
                  <li className="flex items-start gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    You can opt out any time
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="space-y-12">
            {/* Intro */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-6 text-[15px] text-slate-600 leading-relaxed">
              <p>
                This Cookie Policy explains what cookies are, which cookies{" "}
                <strong className="text-slate-800">{SITE_NAME}</strong> ({" "}
                <a href={SITE_URL} className="text-indigo-600 hover:underline">
                  {SITE_URL}
                </a>
                ) uses, why we use them, and how you can control them.
              </p>
              <p className="mt-3">
                We keep our cookie use minimal. The site works without analytics
                cookies — they are entirely optional and only loaded after you
                give explicit consent.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 sm:px-8 py-8 space-y-12">
              <Section id="what-are-cookies" title="1. What are cookies?">
                <p>
                  Cookies are small text files that a website stores on your
                  device when you visit. They are widely used to make websites
                  work, remember your preferences, and provide information to
                  the site owner.
                </p>
                <p>
                  Cookies are not programs — they cannot run code, carry
                  viruses, or access other files on your device. They contain
                  only text, and only the site that set them can read them.
                </p>
                <p>
                  In addition to cookies, we may use similar technologies such
                  as <strong className="text-slate-800">localStorage</strong>{" "}
                  (used to store your consent preference client-side). This
                  policy covers both.
                </p>
              </Section>

              <Section id="cookies-we-use" title="2. Cookies we use">
                <p>
                  We use two categories of cookies:{" "}
                  <strong className="text-slate-800">essential</strong> (always
                  on, required for the site to function) and{" "}
                  <strong className="text-slate-800">analytics</strong>{" "}
                  (optional, only loaded with your consent). We do not use
                  advertising, tracking, or social media cookies.
                </p>
              </Section>

              <Section id="essential" title="3. Essential cookies">
                <p>
                  Essential cookies are necessary for the website to function.
                  They cannot be disabled because the site would not work
                  correctly without them. No personal data is collected through
                  essential cookies.
                </p>
                <CookieTable
                  rows={[
                    {
                      name: "cookie_consent",
                      type: "Essential",
                      purpose:
                        "Stores your cookie consent choice (accepted all / essential only). Prevents the banner from showing on every visit.",
                      duration: "1 year",
                    },
                    {
                      name: "__Host-next-auth.csrf-token",
                      type: "Essential",
                      purpose:
                        "CSRF protection token — prevents cross-site request forgery attacks. Set by Next.js.",
                      duration: "Session",
                    },
                    {
                      name: "next-auth.session-token",
                      type: "Essential",
                      purpose:
                        "Session identifier if authentication is used. Not set unless you sign in.",
                      duration: "30 days",
                    },
                  ]}
                />
              </Section>

              <Section id="analytics" title="4. Analytics cookies">
                <p>
                  Analytics cookies help us understand how visitors use the site
                  — which tools are popular, where users come from, and whether
                  there are errors. This helps us improve the tools and content.
                </p>
                <p>
                  Analytics cookies are{" "}
                  <strong className="text-slate-800">
                    only set after you accept
                  </strong>{" "}
                  them via the consent banner. If you choose &ldquo;Essential
                  only&rdquo;, no analytics cookies are loaded — not even
                  briefly.
                </p>
                <p>
                  All analytics data is{" "}
                  <strong className="text-slate-800">
                    aggregated and anonymous
                  </strong>
                  . We cannot identify individual users from analytics data. We
                  do not share raw analytics data with third parties.
                </p>
                <CookieTable
                  rows={[
                    {
                      name: "_ga",
                      type: "Analytics",
                      purpose:
                        "Google Analytics — distinguishes unique users by assigning a randomly generated number. Used to calculate visitor, session, and campaign data.",
                      duration: "2 years",
                    },
                    {
                      name: "_ga_XXXXXXXX",
                      type: "Analytics",
                      purpose:
                        "Google Analytics — persists session state across page requests.",
                      duration: "2 years",
                    },
                    {
                      name: "_gid",
                      type: "Analytics",
                      purpose:
                        "Google Analytics — distinguishes users. Expires after 24 hours.",
                      duration: "24 hours",
                    },
                    {
                      name: "_gat",
                      type: "Analytics",
                      purpose:
                        "Google Analytics — throttles request rate to the GA servers.",
                      duration: "1 minute",
                    },
                  ]}
                />
                <p className="text-sm text-slate-500">
                  We use Google Analytics with IP anonymisation enabled. Your
                  full IP address is never stored. For more information, see{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  . You can opt out of Google Analytics across all sites using
                  the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </p>
              </Section>

              <Section id="third-party" title="5. Third-party cookies">
                <p>
                  We do not embed content from social media platforms (Facebook,
                  Twitter, Instagram, etc.) in a way that sets third-party
                  cookies. Social sharing links on the site open in a new tab
                  and do not load third-party scripts.
                </p>
                <p>
                  If you use an embedded YouTube video (if any are present on
                  the site), YouTube may set its own cookies. We use
                  YouTube&apos;s privacy-enhanced mode where possible to
                  minimise this.
                </p>
                <p>
                  We have no advertising relationships and set no advertising or
                  retargeting cookies of any kind.
                </p>
              </Section>

              <Section id="managing" title="6. Managing your cookies">
                <p>You have several options for controlling cookies:</p>

                <div className="space-y-4">
                  {/* Option 1 */}
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="font-semibold text-slate-800 mb-1">
                      Change your consent on this site
                    </p>
                    <p className="text-sm text-slate-600">
                      Clear your browser&apos;s localStorage for this site to
                      reset your consent choice. The cookie banner will reappear
                      on your next visit and you can choose again.
                    </p>
                  </div>

                  {/* Option 2 */}
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="font-semibold text-slate-800 mb-1">
                      Browser settings
                    </p>
                    <p className="text-sm text-slate-600 mb-3">
                      All modern browsers let you view, manage, and delete
                      cookies through their settings. Blocking all cookies will
                      affect functionality on many websites.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        {
                          name: "Chrome",
                          href: "https://support.google.com/chrome/answer/95647",
                        },
                        {
                          name: "Firefox",
                          href: "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox",
                        },
                        {
                          name: "Safari",
                          href: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac",
                        },
                        {
                          name: "Edge",
                          href: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
                        },
                      ].map((b) => (
                        <a
                          key={b.name}
                          href={b.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          {b.name} instructions
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Option 3 */}
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="font-semibold text-slate-800 mb-1">
                      Opt out of Google Analytics
                    </p>
                    <p className="text-sm text-slate-600">
                      Install the{" "}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Google Analytics Opt-out Browser Add-on
                      </a>{" "}
                      to prevent your data being sent to Google Analytics across
                      all websites, regardless of your consent choice here.
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="consent" title="7. Your consent">
                <p>
                  When you first visit {SITE_NAME}, a cookie banner appears
                  giving you two options:
                </p>
                <ul className="list-none space-y-2 pl-0">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span>
                      <strong className="text-slate-800">Accept all</strong> —
                      enables both essential and analytics cookies.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span>
                      <strong className="text-slate-800">Essential only</strong>{" "}
                      — only essential cookies are set. No analytics scripts
                      load.
                    </span>
                  </li>
                </ul>
                <p>
                  Your choice is saved in your browser&apos;s localStorage so
                  you are not asked again. You can change your choice at any
                  time by clearing site data in your browser settings.
                </p>
                <p>
                  We do not use consent obtained through confusing or dark
                  pattern design. Consent is freely given, specific, informed,
                  and unambiguous as required by the UK GDPR and EU GDPR.
                </p>
              </Section>

              <Section id="changes" title="8. Changes to this policy">
                <p>
                  We may update this Cookie Policy when we add new features,
                  change analytics providers, or when legislation changes. When
                  we make significant changes we will update the &ldquo;Last
                  updated&rdquo; date at the top of this page.
                </p>
                <p>
                  We encourage you to review this page periodically. Continued
                  use of the site after changes constitutes acceptance of the
                  updated policy.
                </p>
              </Section>

              <Section id="contact" title="9. Contact us">
                <p>
                  If you have questions about this Cookie Policy or how we
                  handle your data, please contact us:
                </p>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm">
                  <p className="font-semibold text-slate-800 mb-1">
                    {SITE_NAME}
                  </p>
                  <p className="text-slate-600">
                    Email:{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <p className="text-slate-600 mt-1">
                    Website:{" "}
                    <a
                      href={SITE_URL}
                      className="text-indigo-600 hover:underline"
                    >
                      {SITE_URL}
                    </a>
                  </p>
                </div>
                <p>
                  See also our{" "}
                  <Link
                    href="/privacy"
                    className="text-indigo-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for full details on how we collect, use, and protect your
                  personal data.
                </p>
              </Section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
