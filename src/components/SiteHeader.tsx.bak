"use client";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className='bg-white shadow-sm sticky top-0 z-50' role='banner'>
      <nav
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'
        aria-label='Main navigation'
      >
        <Link
          href='/'
          className='flex items-center gap-3'
          aria-label='Free Online Tools — Home'
        >
          <div
            className='w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center'
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
          <span className='text-2xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
            Free Online Tools
          </span>
        </Link>
        <div className='hidden md:flex items-center gap-6'>
          <Link
            href='/#categories'
            className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
          >
            Categories
          </Link>
          <Link
            href='/#tools'
            className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
          >
            All Tools
          </Link>
          <Link
            href='/blog'
            className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
          >
            Blog
          </Link>
          <Link
            href='/#faq'
            className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
          >
            FAQ
          </Link>
          <Link
            href='/contact'
            className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
