import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptsByCategory } from "@/lib/content.server";
import { getCategoryBySlug, topCategories } from "@/lib/prompts";
import { sortPrompts } from "@/lib/content";
import { CategoryPromptsList } from "@/components/prompts/category-prompts-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

// Remove edge runtime - use Node.js runtime for filesystem access
// export const runtime = 'edge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: "Category Not Found | Awesome Prompts",
      description: "The requested category could not be found. Browse our collection of AI prompt categories for ChatGPT, Nano Banana Pro, Gemini, Claude, and other AI tools.",
    };
  }

  const prompts = getPromptsByCategory(slug);
  const sortedPrompts = sortPrompts(prompts, 'created_at', 'desc');
  
  // Calculate engagement metrics
  const totalViews = sortedPrompts.reduce((sum, prompt) => sum + (prompt.views || 0), 0);
  const featuredCount = sortedPrompts.filter(prompt => prompt.featured).length;
  const difficulties = [...new Set(sortedPrompts.map(p => p.difficulty).filter(Boolean))];
  const relatedCategories = [...new Set(sortedPrompts.flatMap(p => p.categories).filter(cat => cat !== slug))];
  
  // Generate comprehensive keywords
  const keywords = [
    `${category.name.toLowerCase()} prompts`,
    `${category.name.toLowerCase()} AI prompts`,
    `ChatGPT ${category.name.toLowerCase()}`,
    `Nano Banana Pro ${category.name.toLowerCase()}`,
    `Gemini ${category.name.toLowerCase()}`,
    `Claude ${category.name.toLowerCase()}`,
    ...difficulties.map(d => `${d} ${category.name.toLowerCase()} prompts`),
    ...relatedCategories.slice(0, 3).map(cat => `${cat} prompts`),
    "AI tools",
    "premium prompts",
    "prompt engineering"
  ].filter(Boolean);

  // Enhanced title with context
  const difficultyText = difficulties.length > 1 ? ` (${difficulties.join(', ')})` : '';
  const title = `${category.name} AI Prompts | ${sortedPrompts.length} Premium ${category.name}${difficultyText} Prompts | Awesome Prompts`;

  // Rich description with metrics and context
  const viewsText = totalViews > 0 ? ` with ${totalViews.toLocaleString()}+ total views` : '';
  const featuredText = featuredCount > 0 ? ` Including ${featuredCount} featured prompts` : '';
  const relatedText = relatedCategories.length > 0 ? ` Also explore ${relatedCategories.slice(0, 2).join(' and ')} prompts` : '';
  const description = `${category.description}. Discover ${sortedPrompts.length} curated ${category.name.toLowerCase()} prompts for ChatGPT, Nano Banana Pro, Gemini, Claude, and other AI tools${viewsText}.${featuredText}.${relatedText}. Perfect for professionals and enthusiasts.`;

  return {
    title,
    description,
    keywords: keywords.slice(0, 15),
    openGraph: {
      title: `${category.name} AI Prompts Collection | ${sortedPrompts.length} Premium Prompts`,
      description: `${category.description} Browse ${sortedPrompts.length} curated ${category.name.toLowerCase()} prompts for AI tools.`,
      type: "website",
      images: [
        {
          url: `/api/og/category?name=${encodeURIComponent(category.name)}&count=${sortedPrompts.length}&icon=${encodeURIComponent(category.icon || '')}&color=${encodeURIComponent(category.color || '')}`,
          width: 1200,
          height: 630,
          alt: `${category.name} AI Prompts Collection`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${sortedPrompts.length} ${category.name} AI Prompts`,
      description: category.description,
      images: [`/api/og/category?name=${encodeURIComponent(category.name)}&count=${sortedPrompts.length}`],
    },
    alternates: {
      canonical: `/categories/${slug}`,
    },
    other: {
      "category:name": category.name,
      "category:slug": category.slug,
      "category:prompt_count": sortedPrompts.length.toString(),
      "category:featured_count": featuredCount.toString(),
      "category:difficulties": difficulties.join(","),
      "category:related": relatedCategories.slice(0, 5).join(","),
      "category:total_views": totalViews.toString(),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };
}

export async function generateStaticParams() {
  return topCategories.map(category => ({
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
          <Button variant="link" asChild className="hover:underline">
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
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl md:text-3xl overflow-hidden"
          style={{ backgroundColor: `${category.color}20`, color: category.color }}
        >
          {category.icon?.startsWith('/') ? (
            <Image 
              src={category.icon} 
              alt={category.name}
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            category.icon
          )}
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
        <CategoryPromptsList prompts={sortedPrompts} categorySlug={slug} />
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
          {topCategories
            .filter(cat => cat.slug !== slug)
            .slice(0, 8) // Limit to 8 categories on mobile for better UX
            .map((otherCategory) => (
              <Link key={otherCategory.id} href={`/categories/${otherCategory.slug}`}>
                <div className="p-4 rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer text-center hover:border-gray-300 bg-white">
                  <div 
                    className="w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-2 text-xl md:text-lg overflow-hidden"
                    style={{ backgroundColor: `${otherCategory.color}20`, color: otherCategory.color }}
                  >
                    {otherCategory.icon?.startsWith('/') ? (
                      <Image 
                        src={otherCategory.icon} 
                        alt={otherCategory.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      otherCategory.icon
                    )}
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