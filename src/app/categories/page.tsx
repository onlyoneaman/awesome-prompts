import { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleCategories } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "Categories | Awesome Prompts",
  description: "Browse prompts by category. Find AI prompts for writing, programming, marketing, creativity, and more.",
  openGraph: {
    title: "Categories | Awesome Prompts",
    description: "Browse prompts by category. Find AI prompts for writing, programming, marketing, creativity, and more.",
  },
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Browse Categories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover AI prompts organized by category. From creative writing to technical programming, 
          find the perfect prompts for your needs.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleCategories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border hover:border-gray-300 group">
              <CardHeader className="text-center pb-6">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  {category.icon}
                </div>
                <CardTitle className="text-2xl mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {category.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 