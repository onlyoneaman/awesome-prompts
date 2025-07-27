import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptsByCategory } from "@/lib/content.server";
import { getCategoryBySlug, sampleCategories, sortPrompts } from "@/lib/content";
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
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/categories" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Link>
          </Button>
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/categories" className="hover:text-gray-700">Categories</Link>
            <span>/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="text-center mb-12">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
          style={{ backgroundColor: `${category.color}20`, color: category.color }}
        >
          {category.icon}
        </div>
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          {category.description}
        </p>
        <div className="text-lg text-gray-500">
          {sortedPrompts.length} prompt{sortedPrompts.length === 1 ? '' : 's'} available
        </div>
      </div>

      {/* Prompts Grid */}
      {sortedPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} referrerCategory={slug} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold mb-4">No prompts found in this category</h3>
          <p className="text-gray-600 mb-6">
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
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Explore Other Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {sampleCategories
            .filter(cat => cat.slug !== slug)
            .map((otherCategory) => (
              <Link key={otherCategory.id} href={`/categories/${otherCategory.slug}`}>
                <div className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer text-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-lg"
                    style={{ backgroundColor: `${otherCategory.color}20`, color: otherCategory.color }}
                  >
                    {otherCategory.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{otherCategory.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {getPromptsByCategory(otherCategory.slug).length} prompts
                  </p>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
} 