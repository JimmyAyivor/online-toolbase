import { notFound } from "next/navigation";
import Link from "next/link";
import { tools } from "@/lib/tools";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  const categories = Array.from(
    new Set(tools.map((tool) => tool.category.toLowerCase())),
  );

  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;

  const formatted =
    category.replace(/-/g, " ").charAt(0).toUpperCase() +
    category.replace(/-/g, " ").slice(1);

  return {
    title: `${formatted} Tools – Free Online Utilities`,
    description: `Explore free ${formatted} tools including calculators, generators, and converters.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!category) return notFound();

  const categoryTools = tools.filter(
    (tool) => tool.category?.toLowerCase() === category.toLowerCase(),
  );

  if (categoryTools.length === 0) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10 capitalize">
          {category.replace(/-/g, " ")} Tools
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
              <p className="text-gray-600 text-sm">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
