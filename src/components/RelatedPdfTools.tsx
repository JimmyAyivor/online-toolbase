import Link from "next/link";

interface PdfTool {
  slug: string;
  href: string;
  label: string;
  desc: string;
}

const PDF_TOOLS: PdfTool[] = [
  {
    slug: "pdf-merger-splitter",
    href: "/tools/pdf-merger-splitter",
    label: "PDF Merger & Splitter",
    desc: "Merge multiple PDFs into one file or split a PDF into separate pages and documents.",
  },
  {
    slug: "watermark-pdf",
    href: "/tools/watermark-pdf",
    label: "Watermark PDF",
    desc: "Add custom text or image watermarks to your PDF documents.",
  },
  {
    slug: "unlock-pdf",
    href: "/tools/unlock-pdf",
    label: "Unlock PDF",
    desc: "Remove password protection from PDFs when you have permission to access them.",
  },
  {
    slug: "sign-pdf",
    href: "/tools/sign-pdf",
    label: "Sign PDF",
    desc: "Add your signature to PDF documents directly in your browser.",
  },
  {
    slug: "rotate-pdf",
    href: "/tools/rotate-pdf",
    label: "Rotate PDF",
    desc: "Rotate PDF pages and save your document with the correct orientation.",
  },
  {
    slug: "reorder-pdf-pages",
    href: "/tools/reorder-pdf-pages",
    label: "Reorder PDF Pages",
    desc: "Rearrange PDF pages into the order you need before downloading.",
  },
  {
    slug: "protect-pdf",
    href: "/tools/protect-pdf",
    label: "Protect PDF",
    desc: "Add password protection to PDF documents to help keep them secure.",
  },
  {
    slug: "pdf-to-text",
    href: "/tools/pdf-to-text",
    label: "PDF to Text",
    desc: "Extract readable text from PDF files directly in your browser.",
  },
  {
    slug: "pdf-to-jpg",
    href: "/tools/pdf-to-jpg",
    label: "PDF to JPG",
    desc: "Convert PDF pages into high-quality JPG images.",
  },
  {
    slug: "pdf-compressor",
    href: "/tools/pdf-compressor",
    label: "PDF Compressor",
    desc: "Reduce PDF file size while keeping your documents easy to read and share.",
  },
  {
    slug: "jpg-to-pdf",
    href: "/tools/jpg-to-pdf",
    label: "JPG to PDF",
    desc: "Convert JPG images into downloadable PDF documents.",
  },
  {
    slug: "fill-pdf-form",
    href: "/tools/fill-pdf-form",
    label: "Fill PDF Form",
    desc: "Fill out PDF forms directly in your browser without installing software.",
  },
  {
    slug: "extract-images-from-pdf",
    href: "/tools/extract-images-from-pdf",
    label: "Extract Images from PDF",
    desc: "Extract embedded images from PDF documents and save them individually.",
  },
  {
    slug: "edit-pdf-metadata",
    href: "/tools/edit-pdf-metadata",
    label: "Edit PDF Metadata",
    desc: "Edit PDF metadata such as title, author, subject, and keywords.",
  },
  {
    slug: "delete-pdf-pages",
    href: "/tools/delete-pdf-pages",
    label: "Delete PDF Pages",
    desc: "Remove unwanted pages from a PDF and download the updated document.",
  },
  {
    slug: "add-pdf-page-numbers",
    href: "/tools/add-pdf-page-numbers",
    label: "Add PDF Page Numbers",
    desc: "Add page numbers to PDF documents with customizable positioning.",
  },
  {
    slug: "crop-pdf",
    href: "/tools/crop-pdf",
    label: "Crop PDF",
    desc: "Crop PDF pages to remove unwanted margins and adjust the visible page area.",
  },
  {
    slug: "redact-pdf",
    href: "/tools/redact-pdf",
    label: "Redact PDF",
    desc: "Permanently hide sensitive information in PDF documents before sharing.",
  },
  {
    slug: "flatten-pdf",
    href: "/tools/flatten-pdf",
    label: "Flatten PDF",
    desc: "Flatten PDF forms and annotations so document content can no longer be edited.",
  },
  {
    slug: "compare-pdfs",
    href: "/tools/compare-pdfs",
    label: "Compare PDFs",
    desc: "Compare two PDF documents to identify differences between their content.",
  },
  {
    slug: "txt-to-pdf",
    href: "/tools/txt-to-pdf",
    label: "TXT to PDF",
    desc: "Convert plain text files into clean, downloadable PDF documents.",
  },
  {
    slug: "word-to-pdf",
    href: "/tools/word-to-pdf",
    label: "Word to PDF",
    desc: "Convert Word documents into PDF files for easy sharing and printing.",
  },
  {
    slug: "excel-to-pdf",
    href: "/tools/excel-to-pdf",
    label: "Excel to PDF",
    desc: "Convert Excel spreadsheets into PDF documents ready for sharing or printing.",
  },
  {
    slug: "extract-pdf-pages",
    href: "/tools/extract-pdf-pages",
    label: "Extract PDF Pages",
    desc: "Extract specific pages from a PDF and save them as a new PDF.",
  },
];
/**
 * Creates a deterministic numeric value from a string.
 *
 * This gives each PDF page a stable "random-looking" selection
 * without using Math.random() during server rendering.
 */
function hashSlug(slug: string): number {
  let hash = 0;

  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

/**
 * Returns exactly `count` related PDF tools while excluding
 * the current tool.
 */
function getRelatedPdfTools(currentSlug: string, count = 3): PdfTool[] {
  const available = PDF_TOOLS.filter((tool) => tool.slug !== currentSlug);

  if (available.length <= count) {
    return available;
  }

  const start = hashSlug(currentSlug) % available.length;

  const selected: PdfTool[] = [];

  for (let i = 0; selected.length < count; i++) {
    const tool = available[(start + i) % available.length];

    if (!selected.some((item) => item.slug === tool.slug)) {
      selected.push(tool);
    }
  }

  return selected;
}

interface RelatedPdfToolsProps {
  currentSlug: string;
  count?: number;
  title?: string;
}

export default function RelatedPdfTools({
  currentSlug,
  count = 3,
  title = "Related Free PDF Tools",
}: RelatedPdfToolsProps) {
  const relatedTools = getRelatedPdfTools(currentSlug, count);

  return (
    <section aria-labelledby="related-pdf-tools-heading" className="mt-10">
      <h2
        id="related-pdf-tools-heading"
        className="text-lg font-bold text-gray-900 mb-4"
      >
        {title}
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-sky-200 hover:-translate-y-1 transition-all duration-200 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label={`${tool.label} — ${tool.desc}`}
          >
            <div className="font-bold text-gray-900 text-sm mb-1">
              {tool.label}
            </div>

            <div className="text-xs text-gray-500 leading-relaxed">
              {tool.desc}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
