import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PromptCard } from "@/components/prompts/prompt-card";
import { getAllPrompts } from "@/lib/content.server";
import { sampleCategories, sortPrompts } from "@/lib/prompts";
import { Search, ArrowRight } from "lucide-react";

export default function Home() {
  // Get a few prompts for homepage preview
  const allPrompts = getAllPrompts();
  const sortedPrompts = sortPrompts(allPrompts, 'created_at', 'desc');
  const previewPrompts = sortedPrompts.slice(0, 6);

  return (
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">
              Prompt Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore optimized prompts for a breadth of business and personal tasks.
            </p>
            
            <div className="max-w-2xl mx-auto mb-12">
              <Link href="/prompts">
                <div className="relative cursor-pointer">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    readOnly
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Prompts Preview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Popular Prompts</h2>
              <Button variant="outline" asChild>
                <Link href="/prompts" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previewPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by Category</h2>
              <p className="text-gray-600">
                Find prompts organized by specific use cases and domains
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sampleCategories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h3 className="font-medium mb-1 text-gray-900">{category.name}</h3>
                      <p className="text-xs text-gray-500">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}
