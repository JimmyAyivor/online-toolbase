// src/app/tools/page.tsx

import Link from "next/link";
import { tools } from "@/lib/tools";

type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
};

export default function ToolsPage() {
  // Group tools by category
  const groupedTools = tools.reduce<Record<string, Tool[]>>((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">All Tools</h1>

        {Object.entries(groupedTools).map(([category, categoryTools]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
              {category
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="block bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
