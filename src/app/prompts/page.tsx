import { Metadata } from "next";
import { getAllPrompts } from "@/lib/content.server";
import { sampleCategories, filterPrompts, sortPrompts } from "@/lib/content";
import { PromptCard } from "@/components/prompts/prompt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Browse AI Prompts | Awesome Prompts Library",
  description: "Discover our curated collection of AI prompts for writing, programming, marketing, and more. Perfect for ChatGPT, Claude, and other AI tools.",
  keywords: ["AI prompts", "ChatGPT prompts", "Claude prompts", "writing prompts", "programming prompts", "marketing prompts"],
  openGraph: {
    title: "Browse AI Prompts | Awesome Prompts",
    description: "Explore our collection of AI prompts for various use cases and industries.",
    type: "website",
  }
};

export default function PromptsPage() {
  // Get all prompts from MD files
  const allPromptsData = getAllPrompts();
  
  // Get featured prompts
  const featuredPrompts = filterPrompts(allPromptsData, { featured: true });
  const sortedFeaturedPrompts = sortPrompts(featuredPrompts, 'created_at', 'desc');

  // Get all prompts sorted by creation date
  const allPrompts = sortPrompts(allPromptsData, 'created_at', 'desc');

  return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Prompt Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore optimized prompts for a breadth of business and personal tasks.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          {sampleCategories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                  <div className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer text-center bg-white">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Prompts */}
          {sortedFeaturedPrompts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Featured Prompts</h2>
                <Badge variant="secondary">⭐ Curated Selection</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedFeaturedPrompts.slice(0, 6).map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            </div>
          )}

          {/* All Prompts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">All Prompts</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{allPrompts.length} prompts available</span>
                <Button variant="outline" size="sm">
                  Filter & Sort
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Have a Great Prompt to Share?</h3>
            <p className="text-gray-600 mb-6">
              Join our community and contribute your best AI prompts to help others achieve better results.
            </p>
            <Button asChild>
              <Link href="/prompts/submit">
                Submit Prompt
              </Link>
            </Button>
          </div>
        </div>
      </div>
  );
} 