"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools";
import SponsoredToolSlot from "@/components/monetization/SponsoredToolSlot";

interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
}

interface SponsoredItem {
  type: "sponsored";
}

const CATEGORY_LINKS = [
  {
    name: "Calculators",
    slug: "finance-calculators",
    description:
      "Free online calculators for finance, health, math, conversions and everyday problems.",
  },
  {
    name: "PDF Tools",
    slug: "pdf-tools",
    description: "Merge, compress, split and convert PDF files online.",
  },
  {
    name: "Image Tools",
    slug: "image-design-tools",
    description: "Resize, compress, optimize and convert images instantly.",
  },
  {
    name: "Writing Tools",
    slug: "/writing-text-tools",
    description:
      "Grammar, rewriting, text formatting and writing productivity tools.",
  },
  {
    name: "Developer Tools",
    slug: "developer-tools",
    description: "JSON, encoding, hashing, regex and programming utilities.",
  },
];

export default function HomeClient() {
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return tools;

    return tools.filter(
      (tool: Tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q),
    );
  }, [search]);

  const toolsWithSponsored = useMemo<(Tool | SponsoredItem)[]>(() => {
    const list = [...filteredTools];

    if (list.length > 5) {
      list.splice(5, 0);
    }

    return list;
  }, [filteredTools]);

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  return (
    <>
      <section
        className="max-w-7xl mx-auto px-4 py-16"
        aria-labelledby="category-heading"
      >
        <h2
          id="category-heading"
          className="text-4xl font-bold text-center mb-4"
        >
          Explore Free Online Tools by Category
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Browse calculators, PDF utilities, image editors, developer tools, and
          writing assistants designed to help you work faster online.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
          {CATEGORY_LINKS.map((category) => (
            <Link
              key={category.slug}
              href={`tools/category/${category.slug}`}
              className="rounded-2xl border bg-white p-6 shadow hover:shadow-xl transition"
            >
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>

              <p className="text-sm text-gray-600">{category.description}</p>

              <span className="text-indigo-600 text-sm font-semibold mt-4 block">
                Explore {category.name} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="tools"
        className="max-w-7xl mx-auto px-4 py-16 bg-white rounded-3xl shadow-xl"
      >
        <div className="mb-10">
          <label htmlFor="tool-search" className="sr-only">
            Search free online tools
          </label>

          <input
            id="tool-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools — BMI calculator, PDF compressor, JSON formatter..."
            className="w-full max-w-2xl px-6 py-4 border-2 rounded-2xl text-lg"
          />
        </div>

        <h2 className="text-4xl font-bold mb-8">Free Online Tools</h2>

        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <p>No tools found for "{search}"</p>

            <button onClick={clearSearch} className="text-indigo-600 mt-4">
              Clear search
            </button>
          </div>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsWithSponsored.map((item, index) => {
              if ("type" in item) {
                return (
                  <li key={index}>
                    <SponsoredToolSlot />
                  </li>
                );
              }

              return (
                <li key={item.slug}>
                  <Link
                    href={`/tools/${item.slug}`}
                    className="block rounded-2xl border p-6 shadow hover:shadow-xl transition"
                  >
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>

                    <p className="text-gray-600 mb-4">{item.description}</p>

                    <span className="text-indigo-600 font-semibold">
                      Use {item.name} Free →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
