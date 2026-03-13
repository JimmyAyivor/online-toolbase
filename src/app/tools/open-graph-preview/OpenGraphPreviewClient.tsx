"use client";
import React, { useState } from "react";
import { Share2, Copy, Check, RotateCcw, ImageIcon } from "lucide-react";

type CardType = "summary_large_image" | "summary";
type Platform = "twitter" | "facebook" | "linkedin";

interface OgFields {
  title: string;
  description: string;
  imageUrl: string;
  siteUrl: string;
  siteName: string;
  cardType: CardType;
}

function truncate(str: string, len: number) {
  return str.length > len ? str.slice(0, len - 1) + "…" : str;
}

function TwitterCard({ f }: { f: OgFields }) {
  const isLarge = f.cardType === "summary_large_image";
  return (
    <div className='border border-gray-200 rounded-2xl overflow-hidden bg-white max-w-md'>
      {f.imageUrl && isLarge && (
        <div className='w-full aspect-[1200/630] bg-gray-100 overflow-hidden'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.imageUrl}
            alt='OG preview'
            className='w-full h-full object-cover'
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      <div className='flex gap-3 p-3'>
        {f.imageUrl && !isLarge && (
          <div className='w-20 h-20 flex-shrink-0 rounded-xl bg-gray-100 overflow-hidden'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.imageUrl}
              alt=''
              className='w-full h-full object-cover'
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
        <div className='min-w-0'>
          <p className='text-xs text-gray-400 mb-0.5'>
            {f.siteUrl || "example.com"}
          </p>
          <p className='font-bold text-gray-900 text-sm leading-snug mb-1'>
            {truncate(f.title || "Page title", 70)}
          </p>
          <p className='text-xs text-gray-500 leading-relaxed'>
            {truncate(f.description || "Page description", 200)}
          </p>
        </div>
      </div>
    </div>
  );
}

function FacebookCard({ f }: { f: OgFields }) {
  return (
    <div className='border border-gray-200 overflow-hidden bg-white max-w-md'>
      {f.imageUrl ? (
        <div className='w-full aspect-[1200/630] bg-gray-100 overflow-hidden'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.imageUrl}
            alt='OG preview'
            className='w-full h-full object-cover'
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className='w-full aspect-[1200/630] bg-gray-100 flex items-center justify-center'>
          <ImageIcon className='w-10 h-10 text-gray-300' />
        </div>
      )}
      <div className='bg-[#f0f2f5] px-3 py-2.5 border-t border-gray-200'>
        <p className='text-[10px] text-gray-400 uppercase tracking-wide mb-0.5'>
          {f.siteUrl || "EXAMPLE.COM"}
        </p>
        <p className='font-bold text-gray-900 text-sm leading-snug'>
          {truncate(f.title || "Page title", 80)}
        </p>
        <p className='text-xs text-gray-500 mt-0.5'>
          {truncate(f.description || "Page description", 120)}
        </p>
      </div>
    </div>
  );
}

function LinkedInCard({ f }: { f: OgFields }) {
  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden bg-white max-w-md shadow-sm'>
      {f.imageUrl ? (
        <div className='w-full aspect-[1200/627] bg-gray-100 overflow-hidden'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.imageUrl}
            alt='OG preview'
            className='w-full h-full object-cover'
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className='w-full aspect-[1200/627] bg-gray-100 flex items-center justify-center'>
          <ImageIcon className='w-10 h-10 text-gray-300' />
        </div>
      )}
      <div className='px-4 py-3 bg-white'>
        <p className='font-bold text-gray-900 text-sm leading-snug mb-1'>
          {truncate(f.title || "Page title", 70)}
        </p>
        <p className='text-xs text-gray-500 leading-relaxed mb-1'>
          {truncate(f.description || "Page description", 120)}
        </p>
        <p className='text-[10px] text-gray-400 uppercase tracking-wide'>
          {f.siteName || f.siteUrl || "Example"}
        </p>
      </div>
    </div>
  );
}

function generateMetaTags(f: OgFields): string {
  return `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${f.siteUrl}" />
<meta property="og:title" content="${f.title}" />
<meta property="og:description" content="${f.description}" />
<meta property="og:image" content="${f.imageUrl}" />
<meta property="og:site_name" content="${f.siteName}" />

<!-- Twitter -->
<meta name="twitter:card" content="${f.cardType}" />
<meta name="twitter:url" content="${f.siteUrl}" />
<meta name="twitter:title" content="${f.title}" />
<meta name="twitter:description" content="${f.description}" />
<meta name="twitter:image" content="${f.imageUrl}" />`;
}

export default function OpenGraphPreviewClient() {
  const [fields, setFields] = useState<OgFields>({
    title: "",
    description: "",
    imageUrl: "",
    siteUrl: "",
    siteName: "",
    cardType: "summary_large_image",
  });
  const [platform, setPlatform] = useState<Platform>("twitter");
  const [copied, setCopied] = useState(false);

  const set =
    (key: keyof OgFields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateMetaTags(fields));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () =>
    setFields({
      title: "",
      description: "",
      imageUrl: "",
      siteUrl: "",
      siteName: "",
      cardType: "summary_large_image",
    });

  const PLATFORMS: { id: Platform; label: string }[] = [
    { id: "twitter", label: "X / Twitter" },
    { id: "facebook", label: "Facebook" },
    { id: "linkedin", label: "LinkedIn" },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Share2 className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Open Graph Preview
            </h2>
            <p className='text-gray-600'>
              Preview your social share cards and generate og meta tags
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            {/* Left: Fields */}
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Title{" "}
                  <span className='text-gray-400 font-normal'>
                    ({fields.title.length}/70)
                  </span>
                </label>
                <input
                  type='text'
                  value={fields.title}
                  onChange={set("title")}
                  placeholder='Your page title'
                  maxLength={100}
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
                {fields.title.length > 70 && (
                  <p className='text-xs text-amber-600 mt-1'>
                    ⚠ Title over 70 chars may be truncated by Twitter
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description{" "}
                  <span className='text-gray-400 font-normal'>
                    ({fields.description.length}/200)
                  </span>
                </label>
                <textarea
                  value={fields.description}
                  onChange={set("description")}
                  placeholder='A brief description of your page content'
                  rows={3}
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Image URL
                </label>
                <input
                  type='url'
                  value={fields.imageUrl}
                  onChange={set("imageUrl")}
                  placeholder='https://example.com/og-image.jpg'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
                <p className='text-xs text-gray-400 mt-1'>
                  Recommended size: 1200 × 630 px
                </p>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Page URL
                  </label>
                  <input
                    type='url'
                    value={fields.siteUrl}
                    onChange={set("siteUrl")}
                    placeholder='https://example.com/page'
                    className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Site name
                  </label>
                  <input
                    type='text'
                    value={fields.siteName}
                    onChange={set("siteName")}
                    placeholder='My Website'
                    className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Twitter card type
                </label>
                <select
                  value={fields.cardType}
                  onChange={set("cardType")}
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white'
                >
                  <option value='summary_large_image'>
                    summary_large_image — large banner image
                  </option>
                  <option value='summary'>
                    summary — small thumbnail image
                  </option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className='flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors'
              >
                <RotateCcw className='w-4 h-4' />
                Reset
              </button>
            </div>

            {/* Right: Preview */}
            <div>
              <div className='flex items-center gap-2 mb-4'>
                {PLATFORMS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setPlatform(id)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium border-2 transition-colors ${platform === id ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                {platform === "twitter" && <TwitterCard f={fields} />}
                {platform === "facebook" && <FacebookCard f={fields} />}
                {platform === "linkedin" && <LinkedInCard f={fields} />}
              </div>
            </div>
          </div>

          {/* Generated tags */}
          <div className='mt-8'>
            <div className='flex items-center justify-between mb-2'>
              <p className='text-sm font-semibold text-gray-700'>
                Generated meta tags
              </p>
              <button
                onClick={handleCopy}
                className='flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 transition-colors'
              >
                {copied ? (
                  <Check className='w-4 h-4' />
                ) : (
                  <Copy className='w-4 h-4' />
                )}
                {copied ? "Copied!" : "Copy all"}
              </button>
            </div>
            <pre className='bg-gray-900 text-green-400 rounded-xl p-5 text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed'>
              {generateMetaTags(fields)}
            </pre>
          </div>

          {/* Tips */}
          <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2'>
              Understanding Open Graph meta tags:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                OG tags go inside the &lt;head&gt; of your HTML and control how
                social platforms display your link
              </li>
              <li>
                Image dimensions of 1200 × 630 px give the best result across
                all major platforms
              </li>
              <li>
                Twitter falls back to og:title and og:image if twitter: tags are
                missing
              </li>
              <li>
                After deploying, use each platform's official debug tool to
                clear their cached preview
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
