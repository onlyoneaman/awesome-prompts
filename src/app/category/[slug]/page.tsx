import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPromptsByCategory, sampleCategories, sortPrompts } from "@/lib/prompts";
import { PromptCard } from "@/components/prompts/prompt-card";
import { Badge } from "@/components/ui/badge";
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
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/prompts" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to All Prompts
          </Link>
        </Button>
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/prompts" className="hover:text-gray-700">Prompts</Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>
      </div>

      {/* Category Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-4xl font-bold">{category.name} Prompts</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          {category.description}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {sortedPrompts.length} {sortedPrompts.length === 1 ? 'Prompt' : 'Prompts'} Available
          </Badge>
          <Button variant="outline">
            Filter & Sort
          </Button>
        </div>
      </div>

      {/* Prompts Grid */}
      {sortedPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
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
              <Link key={otherCategory.id} href={`/category/${otherCategory.slug}`}>
                <div className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer text-center">
                  <div className="text-2xl mb-2">{otherCategory.icon}</div>
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