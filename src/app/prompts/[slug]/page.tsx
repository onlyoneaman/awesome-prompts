import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptBySlug, getAllPrompts } from "@/lib/content.server";
import { getAuthorBySlug } from "@/lib/authors.server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import Link from "next/link";
import { ArrowLeft, Share2, Heart, Eye, Star } from "lucide-react";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

// Helper function to convert difficulty to stars
function getDifficultyStars(difficulty: string | undefined): React.JSX.Element {
  const getStarCount = (diff: string | undefined): number => {
    switch (diff?.toLowerCase()) {
      case 'beginner':
        return 1;
      case 'intermediate':
        return 2;
      case 'advanced':
        return 3;
      default:
        return 0;
    }
  };

  const starCount = getStarCount(difficulty);
  
  if (starCount === 0) return <></>;
  
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: starCount }, (_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  
  if (!prompt) {
    return {
      title: "Prompt Not Found",
    };
  }

  return {
    title: `${prompt.title} | Awesome Prompts`,
    description: prompt.description,
    keywords: [...prompt.tags, ...prompt.categories, 'AI prompt', 'ChatGPT', 'Claude'],
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      type: "article",
      publishedTime: prompt.created_at.toISOString(),
      modifiedTime: prompt.updated_at.toISOString(),
      authors: prompt.author ? [prompt.author] : undefined,
      tags: [...prompt.tags, ...prompt.categories],
    },
    twitter: {
      card: "summary_large_image",
      title: prompt.title,
      description: prompt.description,
    }
  };
}

export async function generateStaticParams() {
  const allPrompts = getAllPrompts();
  return allPrompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  // Get related prompts (same categories, excluding current)
  const allPrompts = getAllPrompts();
  const relatedPrompts = allPrompts
    .filter((p) => 
      p.id !== prompt.id && 
      p.categories.some((cat) => prompt.categories.includes(cat))
    )
    .slice(0, 3);

  // Get author information
  const author = prompt.author ? getAuthorBySlug(prompt.author) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation & Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" asChild>
            <Link href="/prompts" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Prompts
            </Link>
          </Button>
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/prompts" className="hover:text-gray-700">Prompts</Link>
            <span>/</span>
            <Link href={`/category/${prompt.categories[0]}`} className="hover:text-gray-700">
              {prompt.categories[0]}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{prompt.title}</span>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-4">{prompt.title}</CardTitle>
                  <p className="text-lg text-gray-600 mb-4">{prompt.description}</p>
                </div>
                
                <div className="flex gap-2">
                  {prompt.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Prompt Text:</h4>
                  <CopyButton text={prompt.actual_text} />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {prompt.actual_text}
                  </pre>
                </div>
              </div>
              
              {prompt.use_cases && prompt.use_cases.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Use Cases:</h4>
                  <div className="flex flex-wrap gap-1">
                    {prompt.use_cases.map((useCase, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Prompt Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prompt Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{prompt.likes || 0} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{prompt.views || 0} views</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Updated {prompt.updated_at.toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                  })}
                </div>
                {author && (
                  <div className="text-sm text-gray-500">
                    by {author.website ? (
                      <Link href={author.website} className="text-blue-600 hover:underline" target="_blank">
                        {author.name}
                      </Link>
                    ) : author.name}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Categories & Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories & Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-1">
                    {prompt.categories.map((category) => (
                      <Link key={category} href={`/category/${category}`}>
                        <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                          {category}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {prompt.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {prompt.difficulty && (
                  <div>
                    <h4 className="font-semibold mb-2">Difficulty</h4>
                    <div className="flex items-center gap-2">
                      {getDifficultyStars(prompt.difficulty)}
                      <span className="text-sm text-gray-600 capitalize">{prompt.difficulty}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related Prompts */}
          {relatedPrompts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedPrompts.map((relatedPrompt) => (
                    <div key={relatedPrompt.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <Link 
                        href={`/prompts/${relatedPrompt.slug}`}
                        className="block hover:text-primary transition-colors"
                      >
                        <h4 className="font-semibold mb-1">{relatedPrompt.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{relatedPrompt.description}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 