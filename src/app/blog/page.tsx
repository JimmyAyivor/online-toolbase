// src/app/blog/page.tsx
import type { Metadata } from "next";
import { blogPosts } from "./blog-posts";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Online Tool Base";

export const metadata: Metadata = {
  title: "Blog — Tips, Guides & How-Tos | Online Tool Base",
  description:
    "Practical guides on productivity, writing, security, social media, finance, and more — written to help you get the most from free online tools.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    title: "Blog — Tips, Guides & How-Tos | Online Tool Base",
    description:
      "Practical guides on productivity, writing, security, social media, finance, and more.",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Security: "bg-red-100 text-red-700",
  Developer: "bg-indigo-100 text-indigo-700",
  Writing: "bg-purple-100 text-purple-700",
  "Social Media": "bg-pink-100 text-pink-700",
  Finance: "bg-green-100 text-green-700",
  Image: "bg-blue-100 text-blue-700",
  Health: "bg-teal-100 text-teal-700",
  Business: "bg-orange-100 text-orange-700",
  Productivity: "bg-yellow-100 text-yellow-700",
  "Content Creation": "bg-fuchsia-100 text-fuchsia-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const featured = blogPosts[blogPosts.length - 1]; // latest post is featured
  const rest = [...blogPosts].reverse().slice(1);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-6xl mx-auto px-4 py-12'>
          <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2'>
            The Online Tool Base Blog
          </p>
          <h1 className='text-4xl font-bold text-gray-900 mb-3'>
            Tips, Guides & How-Tos
          </h1>
          <p className='text-gray-500 max-w-xl'>
            Practical articles on productivity, writing, security, social media,
            and more — written to help you work smarter with free online tools.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-12'>
        {/* Featured post */}
        <a
          href={`/blog/${featured.slug}`}
          className='block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 mb-12'
        >
          <div className='md:flex'>
            <div className='md:w-2/5 bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-16'>
              <span className='text-8xl'>{featured.coverEmoji}</span>
            </div>
            <div className='md:w-3/5 p-8 md:p-10 flex flex-col justify-center'>
              <div className='flex items-center gap-3 mb-4'>
                <span className='text-xs font-bold bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-wide'>
                  Latest
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    CATEGORY_COLORS[featured.category] ??
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {featured.category}
                </span>
              </div>
              <h2 className='text-2xl font-bold text-gray-900 mb-3 leading-snug'>
                {featured.title}
              </h2>
              <p className='text-gray-500 leading-relaxed mb-6'>
                {featured.description}
              </p>
              <div className='flex items-center gap-4 text-sm text-gray-400'>
                <span>{formatDate(featured.publishedAt)}</span>
                <span>·</span>
                <span>{featured.readingTime}</span>
              </div>
            </div>
          </div>
        </a>

        {/* Post grid */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {rest.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='block bg-white rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden'
            >
              <div className='bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center h-36'>
                <span className='text-5xl'>{post.coverEmoji}</span>
              </div>
              <div className='p-6'>
                <div className='flex items-center gap-2 mb-3'>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      CATEGORY_COLORS[post.category] ??
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className='text-xs text-gray-400'>
                    {post.readingTime}
                  </span>
                </div>
                <h2 className='font-bold text-gray-900 leading-snug mb-2 line-clamp-2'>
                  {post.title}
                </h2>
                <p className='text-sm text-gray-500 leading-relaxed line-clamp-3'>
                  {post.description}
                </p>
                <p className='text-xs text-gray-400 mt-4'>
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
