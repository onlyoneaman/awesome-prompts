import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptBySlug, getAllPrompts } from "@/lib/content.server";
import { getAuthorBySlug } from "@/lib/authors.server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { NavigationBack } from "@/components/ui/navigation-back";
import { RelatedPrompts } from "@/components/prompts/related-prompts";
import Link from "next/link";
import { Share2, Heart, Eye, Star } from "lucide-react";
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
      description: "The requested prompt could not be found.",
    };
  }

  return {
    title: `${prompt.title} | Awesome Prompts`,
    description: prompt.description,
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      type: "article",
      tags: prompt.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: prompt.title,
      description: prompt.description,
    },
  };
}

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  // Get all prompts for related prompts logic
  const allPrompts = getAllPrompts();

  // Get author information
  const author = prompt.author ? getAuthorBySlug(prompt.author) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation & Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <NavigationBack currentPromptCategories={prompt.categories} />
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/prompts" className="hover:text-gray-700">Prompts</Link>
            <span>/</span>
            <Link href={`/categories/${prompt.categories[0]}`} className="hover:text-gray-700">
              {prompt.categories[0]}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{prompt.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{prompt.title}</CardTitle>
                  <p className="text-gray-600 mb-4">{prompt.description}</p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{prompt.likes || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{prompt.views || 0}</span>
                    </div>
                    {prompt.difficulty && (
                      <div className="flex items-center gap-1">
                        {getDifficultyStars(prompt.difficulty)}
                        <span className="capitalize">{prompt.difficulty}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
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
          {/* Author Info */}
          {author && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  {author.profile_picture && (
                    <img 
                      src={author.profile_picture} 
                      alt={author.name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold">{author.name}</h4>
                    {author.bio && (
                      <p className="text-sm text-gray-600">{author.bio}</p>
                    )}
                    {author.website && (
                      <Link 
                        href={author.website} 
                        target="_blank" 
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Visit Website
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Prompt Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prompt Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span>{prompt.created_at.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated:</span>
                  <span>{prompt.updated_at.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views:</span>
                  <span>{prompt.views || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Likes:</span>
                  <span>{prompt.likes || 0}</span>
                </div>
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
                      <Link key={category} href={`/categories/${category}`}>
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
          <RelatedPrompts currentPrompt={prompt} allPrompts={allPrompts} />
        </div>
      </div>
    </div>
  );
} 