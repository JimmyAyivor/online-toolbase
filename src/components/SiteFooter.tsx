import Link from "next/link";
import { categories } from "@/lib/categories";
import { tools } from "@/lib/tools";
import SubscribeForm from "./SubscribeForm";
import SocialLinks from "./SocialLinks";
const FEATURED_SLUGS = [
  "bmi-calculator",
  "password-generator",
  "qr-code-generator",
  "currency-converter",
  "hashtag-generator",
  "instagram-post-planner",
];

const ALL_CATEGORIES = Array.from(
  new Set(categories.map((t) => t.slug)),
).sort();

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-24" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SubscribeForm variant="inline" />

        <div className="grid md:grid-cols-4 gap-8 mt-20 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 mb-4"
              aria-label="Calculators, Pdf Tools & More — Home"
            >
              <div
                className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">
                Utilvia
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Online Calculators, Pdf Tools, Genrators & More for productivity,
              health, finance, development, social media, and more. No signup.
              No cost.
            </p>
            <SocialLinks />
          </div>

          {/* Popular Tools */}
          <nav aria-label="Popular tools">
            <h3 className="font-bold mb-4 text-white">Popular Tools</h3>
            <ul className="space-y-2 text-gray-400">
              {FEATURED_SLUGS.map((slug) => {
                const tool = tools.find((t) => t.slug === slug);
                return tool ? (
                  <li key={slug}>
                    <Link
                      href={`/tools/${slug}`}
                      className="hover:text-white transition-colors text-sm"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-label="Tool categories">
            <h3 className="font-bold mb-4 text-white">Categories</h3>
            <ul className="space-y-2 text-gray-400 columns-2">
              {ALL_CATEGORIES.map((cat: string) => (
                <li key={cat}>
                  <Link
                    href={`/tools/category/${cat.toLowerCase()}`}
                    className="hover:text-white transition-colors text-sm"
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
          <nav aria-label="Legal and support">
            <h3 className="font-bold mb-4 text-white">Legal &amp; Support</h3>
            <ul className="space-y-2 text-gray-400">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
                { href: "/disclaimer", label: "Disclaimer" },
                { href: "/partners", label: "Partners" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Utilvia.com All rights reserved.
          </p>
          <p className="mt-2 text-gray-600">
            Free Online tools — PDF tools, Financial calculators, Unit converters, word generators &amp; more.
            No signup required.
          </p>
        </div>
      </div>
    </footer>
  );
}
