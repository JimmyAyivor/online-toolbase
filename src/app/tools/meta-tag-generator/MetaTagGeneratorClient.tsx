"use client";
import React, { useState, useEffect } from "react";
import {
  Code,
  Copy,
  Check,
  Globe,
  Search,
  Share2,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RobotsOption {
  value: string;
  label: string;
}

interface SeoTip {
  color: string;
  title: string;
  desc: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ROBOTS_OPTIONS: RobotsOption[] = [
  { value: "index, follow", label: "Index & Follow (Recommended)" },
  { value: "noindex, follow", label: "No Index, Follow" },
  { value: "index, nofollow", label: "Index, No Follow" },
  { value: "noindex, nofollow", label: "No Index, No Follow" },
];

const SEO_TIPS: SeoTip[] = [
  {
    color: "bg-teal-600",
    title: "Title",
    desc: "Keep under 60 characters, include main keyword",
  },
  {
    color: "bg-cyan-600",
    title: "Description",
    desc: "150-160 characters with compelling CTA",
  },
  {
    color: "bg-blue-600",
    title: "Image",
    desc: "Use 1200x630px for best social sharing",
  },
  {
    color: "bg-indigo-600",
    title: "Keywords",
    desc: "Focus on 5-10 relevant keywords",
  },
];

const PLACEHOLDER_IMAGE =
  "https://placehold.co/1200x630/e5e7eb/6b7280?text=Preview+Image";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildMetaTags(fields: {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  siteUrl: string;
  imageUrl: string;
  author: string;
  siteName: string;
  twitterHandle: string;
  robotsIndex: string;
}): string {
  const {
    siteTitle,
    siteDescription,
    siteKeywords,
    siteUrl,
    imageUrl,
    author,
    siteName,
    twitterHandle,
    robotsIndex,
  } = fields;

  const tags: string[] = [];

  tags.push("<!-- Primary Meta Tags -->");
  if (siteTitle) {
    tags.push(`<title>${siteTitle}</title>`);
    tags.push(`<meta name="title" content="${siteTitle}">`);
  }
  if (siteDescription)
    tags.push(`<meta name="description" content="${siteDescription}">`);
  if (siteKeywords)
    tags.push(`<meta name="keywords" content="${siteKeywords}">`);
  if (author) tags.push(`<meta name="author" content="${author}">`);
  tags.push(`<meta name="robots" content="${robotsIndex}">`);
  tags.push(
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
  );
  tags.push(`<meta charset="UTF-8">`);

  tags.push("");
  tags.push("<!-- Open Graph / Facebook -->");
  tags.push(`<meta property="og:type" content="website">`);
  if (siteUrl) tags.push(`<meta property="og:url" content="${siteUrl}">`);
  if (siteTitle) tags.push(`<meta property="og:title" content="${siteTitle}">`);
  if (siteDescription)
    tags.push(`<meta property="og:description" content="${siteDescription}">`);
  if (imageUrl) tags.push(`<meta property="og:image" content="${imageUrl}">`);
  if (siteName)
    tags.push(`<meta property="og:site_name" content="${siteName}">`);

  tags.push("");
  tags.push("<!-- Twitter -->");
  tags.push(`<meta property="twitter:card" content="summary_large_image">`);
  if (siteUrl) tags.push(`<meta property="twitter:url" content="${siteUrl}">`);
  if (siteTitle)
    tags.push(`<meta property="twitter:title" content="${siteTitle}">`);
  if (siteDescription)
    tags.push(
      `<meta property="twitter:description" content="${siteDescription}">`,
    );
  if (imageUrl)
    tags.push(`<meta property="twitter:image" content="${imageUrl}">`);
  if (twitterHandle)
    tags.push(
      `<meta property="twitter:creator" content="@${twitterHandle.replace("@", "")}">`,
    );

  return tags.join("\n");
}

function stripHttps(url: string): string {
  return url.replace("https://", "").split("/")[0] ?? url;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MetaTagGeneratorClient() {
  const [siteTitle, setSiteTitle] = useState<string>("");
  const [siteDescription, setSiteDescription] = useState<string>("");
  const [siteKeywords, setSiteKeywords] = useState<string>("");
  const [siteUrl, setSiteUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [siteName, setSiteName] = useState<string>("");
  const [twitterHandle, setTwitterHandle] = useState<string>("");
  const [robotsIndex, setRobotsIndex] = useState<string>("index, follow");
  const [copied, setCopied] = useState<boolean>(false);
  const [metaTags, setMetaTags] = useState<string>("");

  useEffect(() => {
    setMetaTags(
      buildMetaTags({
        siteTitle,
        siteDescription,
        siteKeywords,
        siteUrl,
        imageUrl,
        author,
        siteName,
        twitterHandle,
        robotsIndex,
      }),
    );
  }, [
    siteTitle,
    siteDescription,
    siteKeywords,
    siteUrl,
    imageUrl,
    author,
    siteName,
    twitterHandle,
    robotsIndex,
  ]);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Preview fallbacks
  const previewUrl = siteUrl || "https://yourwebsite.com";
  const previewTitle = siteTitle || "Your Website Title";
  const previewDescription =
    siteDescription || "Your website description goes here...";
  const previewImage = imageUrl || PLACEHOLDER_IMAGE;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full mb-4 shadow-lg">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Meta Tag Generator
          </h2>
          <p className="text-gray-600">
            Generate SEO-friendly meta tags for your website
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Form + output ── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                <Globe className="w-6 h-6 text-teal-600" />
                Website Information
              </h3>

              <div className="space-y-4">
                {/* Site title */}
                <CharLimitField
                  label="Site Title"
                  required
                  value={siteTitle}
                  maxLength={60}
                  hint="Optimal: 50-60 characters"
                  placeholder="My Awesome Website"
                  onChange={setSiteTitle}
                />

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Meta Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={siteDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setSiteDescription(e.target.value)
                    }
                    placeholder="A brief description of your website that appears in search results"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 resize-none transition-colors"
                    rows={3}
                    maxLength={160}
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      Optimal: 150-160 characters
                    </p>
                    <p className="text-xs text-gray-500">
                      {siteDescription.length}/160
                    </p>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={siteKeywords}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSiteKeywords(e.target.value)
                    }
                    placeholder="keyword1, keyword2, keyword3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Comma-separated keywords
                  </p>
                </div>

                {/* URL + Author */}
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Website URL",
                      type: "url",
                      placeholder: "https://example.com",
                      value: siteUrl,
                      set: setSiteUrl,
                    },
                    {
                      label: "Author",
                      type: "text",
                      placeholder: "Your Name",
                      value: author,
                      set: setAuthor,
                    },
                  ].map(({ label, type, placeholder, value, set }) => (
                    <div key={label}>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          set(e.target.value)
                        }
                        placeholder={placeholder}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                {/* OG Image */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    OG Image URL{" "}
                    <span className="text-xs text-gray-500">
                      (Recommended: 1200x630px)
                    </span>
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setImageUrl(e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                {/* Site name + Twitter */}
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Site Name",
                      type: "text",
                      placeholder: "Your Brand Name",
                      value: siteName,
                      set: setSiteName,
                    },
                    {
                      label: "Twitter Handle",
                      type: "text",
                      placeholder: "username",
                      value: twitterHandle,
                      set: setTwitterHandle,
                    },
                  ].map(({ label, type, placeholder, value, set }) => (
                    <div key={label}>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          set(e.target.value)
                        }
                        placeholder={placeholder}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                {/* Robots */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Robots Meta Tag
                  </label>
                  <select
                    value={robotsIndex}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setRobotsIndex(e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                  >
                    {ROBOTS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Generated output */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-xl">
                  <Code className="w-6 h-6 text-teal-600" />
                  Generated Meta Tags
                </h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy All"}
                </button>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono leading-relaxed">
                  <code>
                    {metaTags ||
                      "<!-- Enter website information to generate meta tags -->"}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* ── Preview sidebar ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5 text-teal-600" />
                Preview
              </h3>

              <div className="space-y-6">
                {/* Google */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                    <Search className="w-4 h-4 text-blue-600" />
                    Google Search Preview
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="text-xs text-green-700 mb-1">
                      {previewUrl}
                    </div>
                    <div className="text-lg text-blue-600 font-medium mb-1 hover:underline cursor-pointer line-clamp-1">
                      {previewTitle}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {previewDescription}
                    </div>
                  </div>
                </div>

                {/* Facebook */}
                <PreviewCard
                  icon={<Share2 className="w-4 h-4 text-blue-600" />}
                  label="Facebook Share Preview"
                  image={previewImage}
                  title={previewTitle}
                  description={previewDescription}
                  domain={stripHttps(previewUrl)}
                  onImgError={handleImgError}
                />

                {/* Twitter */}
                <PreviewCard
                  icon={<ImageIcon className="w-4 h-4 text-cyan-600" />}
                  label="Twitter Card Preview"
                  image={previewImage}
                  title={previewTitle}
                  description={previewDescription}
                  domain={stripHttps(previewUrl)}
                  onImgError={handleImgError}
                />
              </div>
            </div>

            {/* SEO Tips */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md p-6 border-2 border-teal-200">
              <h4 className="font-bold text-gray-900 mb-4">📊 SEO Tips</h4>
              <div className="space-y-3 text-sm text-gray-700">
                {SEO_TIPS.map(({ color, title, desc }) => (
                  <div key={title} className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 ${color} rounded-full mt-2 flex-shrink-0`}
                    />
                    <p>
                      <strong>{title}:</strong> {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-3">
                🎯 What are Meta Tags?
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Meta tags provide information about your webpage to search
                engines and social media platforms. They influence how your site
                appears in search results and when shared on social media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CharLimitFieldProps {
  label: string;
  required?: boolean;
  value: string;
  maxLength: number;
  hint: string;
  placeholder: string;
  onChange: (v: string) => void;
}

function CharLimitField({
  label,
  required,
  value,
  maxLength,
  hint,
  placeholder,
  onChange,
}: CharLimitFieldProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
      />
      <div className="flex justify-between mt-1">
        <p className="text-xs text-gray-500">{hint}</p>
        <p className="text-xs text-gray-500">
          {value.length}/{maxLength}
        </p>
      </div>
    </div>
  );
}

interface PreviewCardProps {
  icon: React.ReactNode;
  label: string;
  image: string;
  title: string;
  description: string;
  domain: string;
  onImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

function PreviewCard({
  icon,
  label,
  image,
  title,
  description,
  domain,
  onImgError,
}: PreviewCardProps) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
        {icon}
        {label}
      </h4>
      <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
        <img
          src={image}
          alt="Preview"
          className="w-full h-40 object-cover bg-gray-100"
          onError={onImgError}
        />
        <div className="p-4 bg-gray-50">
          <div className="text-xs text-gray-500 uppercase mb-1">{domain}</div>
          <div className="font-bold text-gray-900 mb-1 line-clamp-1">
            {title}
          </div>
          <div className="text-sm text-gray-600 line-clamp-2">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
