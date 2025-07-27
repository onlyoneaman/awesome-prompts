import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPrompts } from "@/lib/content.server";
import { sampleCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Categories | Awesome Prompts",
  description: "Browse prompts by category. Find AI prompts for writing, programming, marketing, creativity, and more.",
  openGraph: {
    title: "Categories | Awesome Prompts",
    description: "Browse prompts by category. Find AI prompts for writing, programming, marketing, creativity, and more.",
  },
};

export default function CategoriesPage() {
  const allPrompts = getAllPrompts();
  
  // Calculate prompt count for each category
  const categoriesWithCounts = sampleCategories.map(category => {
    const promptCount = allPrompts.filter(prompt => 
      prompt.categories.includes(category.slug)
    ).length;
    
    return {
      ...category,
      promptCount
    };
  });

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCounts.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  {category.icon}
                </div>
                <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                <CardDescription className="text-sm">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge 
                  variant="outline" 
                  className="text-sm font-medium"
                  style={{ borderColor: category.color, color: category.color }}
                >
                  {category.promptCount} {category.promptCount === 1 ? 'prompt' : 'prompts'}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>


    </div>
  );
} 