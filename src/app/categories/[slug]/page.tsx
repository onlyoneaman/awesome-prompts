import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptsByCategory } from "@/lib/content.server";
import { getCategoryBySlug, sampleCategories } from "@/lib/prompts";
import { sortPrompts } from "@/lib/content";
import { PromptCard } from "@/components/prompts/prompt-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const prompts = getPromptsByCategory(slug);

  return {
    title: `${category.name} AI Prompts | ${prompts.length} Premium Prompts | Awesome Prompts`,
    description: `${category.description}. Browse ${prompts.length} curated ${category.name.toLowerCase()} prompts for AI tools like ChatGPT, Claude, and more.`,
    keywords: [category.name.toLowerCase(), "AI prompts", "ChatGPT prompts", "Claude prompts", ...category.name.toLowerCase().split(' ')],
    openGraph: {
      title: `${category.name} AI Prompts Collection`,
      description: category.description,
      type: "website",
    }
  };
}

export async function generateStaticParams() {
  return sampleCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const prompts = getPromptsByCategory(slug);
  const sortedPrompts = sortPrompts(prompts, 'created_at', 'desc');

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Navigation */}
      <div className="mb-4 md:mb-6">
        {/* Back Navigation - Centered on mobile */}
        <div className="flex justify-center md:justify-start mb-4">
          <Button variant="ghost" asChild className="hover:bg-gray-100">
            <Link href="/categories" className="flex items-center gap-2 px-4 py-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm md:text-base">Back to Categories</span>
            </Link>
          </Button>
        </div>
        
        {/* Breadcrumb - Hidden on mobile to avoid redundancy */}
        <nav className="hidden md:flex justify-center lg:justify-end items-center gap-2 text-sm text-gray-500">
          <Link href="/categories" className="hover:text-gray-700">Categories</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>
      </div>

      {/* Category Header */}
      <div className="text-center mb-8 md:mb-12">
        <div 
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl md:text-3xl"
          style={{ backgroundColor: `${category.color}20`, color: category.color }}
        >
          {category.icon}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 px-4">{category.name}</h1>
        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 md:mb-6 px-4 leading-relaxed">
          {category.description}
        </p>
        {/* <div className="text-base md:text-lg text-gray-500">
          {sortedPrompts.length} prompt{sortedPrompts.length === 1 ? '' : 's'} available
        </div> */}
      </div>

      {/* Prompts Grid */}
      {sortedPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {sortedPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} referrerCategory={slug} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 md:py-16 px-4">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">No prompts found in this category</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Be the first to contribute a prompt to the {category.name.toLowerCase()} category!
          </p>
          <Button asChild>
            <Link href="/prompts/submit">
              Submit a Prompt
            </Link>
          </Button>
        </div>
      )}

      {/* Other Categories */}
      <div className="mt-12 md:mt-16">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center md:text-left">Explore Other Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sampleCategories
            .filter(cat => cat.slug !== slug)
            .slice(0, 8) // Limit to 8 categories on mobile for better UX
            .map((otherCategory) => (
              <Link key={otherCategory.id} href={`/categories/${otherCategory.slug}`}>
                <div className="p-4 rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer text-center hover:border-gray-300 bg-white">
                  <div 
                    className="w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-2 text-xl md:text-lg"
                    style={{ backgroundColor: `${otherCategory.color}20`, color: otherCategory.color }}
                  >
                    {otherCategory.icon}
                  </div>
                  <h3 className="font-semibold text-sm md:text-sm leading-tight">{otherCategory.name}</h3>
                </div>
              </Link>
            ))
          }
        </div>
        
        {/* Show all categories link on mobile */}
        <div className="text-center mt-6 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/categories">
              View All Categories
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 