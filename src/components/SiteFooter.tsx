import Link from "next/link";
import { tools } from "@/lib/tools";

const FEATURED_SLUGS = [
  "bmi-calculator",
  "password-generator",
  "qr-code-generator",
  "currency-converter",
  "hashtag-generator",
  "instagram-post-planner",
];

const ALL_CATEGORIES = Array.from(new Set(tools.map((t) => t.category))).sort();
const TOOL_COUNT = tools.length;

export default function SiteFooter() {
  return (
    <footer className='bg-gray-900 text-white mt-24' role='contentinfo'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid md:grid-cols-4 gap-8 mb-8'>
          {/* Brand */}
          <div className='md:col-span-1'>
            <Link
              href='/'
              className='flex items-center gap-3 mb-4'
              aria-label='Free Online Tools — Home'
            >
              <div
                className='w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center'
                aria-hidden='true'
              >
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <span className='text-xl font-bold'>Free Online Tools</span>
            </Link>
            <p className='text-gray-400 text-sm leading-relaxed'>
              {TOOL_COUNT}+ free online tools for productivity, health, finance,
              development, social media, and more. No signup. No cost.
            </p>
          </div>

          {/* Popular Tools */}
          <nav aria-label='Popular tools'>
            <h3 className='font-bold mb-4 text-white'>Popular Tools</h3>
            <ul className='space-y-2 text-gray-400'>
              {FEATURED_SLUGS.map((slug) => {
                const tool = tools.find((t) => t.slug === slug);
                return tool ? (
                  <li key={slug}>
                    <Link
                      href={`/tools/${slug}`}
                      className='hover:text-white transition-colors text-sm'
                    >
                      {tool.name}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-label='Tool categories'>
            <h3 className='font-bold mb-4 text-white'>Categories</h3>
            <ul className='space-y-2 text-gray-400 columns-2'>
              {ALL_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/tools/category/${cat.toLowerCase()}`}
                    className='hover:text-white transition-colors text-sm'
                  >
                    {cat
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label='Legal and support'>
            <h3 className='font-bold mb-4 text-white'>Legal &amp; Support</h3>
            <ul className='space-y-2 text-gray-400'>
              {[
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms-of-service", label: "Terms of Service" },
                { href: "/disclaimer", label: "Disclaimer" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className='hover:text-white transition-colors text-sm'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className='border-t border-gray-800 pt-8 text-center text-gray-400 text-sm'>
          <p>
            &copy; {new Date().getFullYear()} Free Online Tools. All rights
            reserved.
          </p>
          <p className='mt-2 text-gray-600'>
            {TOOL_COUNT}+ free tools — calculators, converters, generators &amp;
            more. No signup required.
          </p>
        </div>
      </div>
    </footer>
  );
}
