'use client';

import React from "react";
import Link from "next/link";
import Markdown from 'react-markdown';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { NavigationBack } from "@/components/ui/navigation-back";
import { Share2, Heart, Star } from "lucide-react";
import type { Prompt } from "@/types/prompt";
import type { Author } from "@/types/author";

interface PromptClientPageProps {
  prompt: Prompt;
  author: Author | null;
  referrerCategory?: string;
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

export default function PromptClientPage({ prompt, author, referrerCategory }: PromptClientPageProps) {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Navigation & Breadcrumb */}
      <div className="mb-4 md:mb-6">
        {/* Mobile: Centered back button only */}
        <div className="flex justify-center md:hidden mb-4">
          <NavigationBack currentPromptCategories={prompt.categories} referrerCategory={referrerCategory} />
        </div>
        
        {/* Desktop: Back button on left, breadcrumb on right */}
        <div className="hidden md:flex items-center justify-between">
          <NavigationBack currentPromptCategories={prompt.categories} referrerCategory={referrerCategory} />
          
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/prompts" className="hover:text-gray-700 whitespace-nowrap">Prompts</Link>
            <span className="text-gray-300">/</span>
            <Link href={`/categories/${prompt.categories[0]}`} className="hover:text-gray-700 whitespace-nowrap">
              {prompt.categories[0]}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate">{prompt.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl md:text-2xl mb-2 leading-tight">{prompt.title}</CardTitle>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{prompt.description}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-start">
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:ml-2 sm:inline">Share</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Heart className="w-4 h-4" />
                    <span className="hidden sm:ml-2 sm:inline">Like</span>
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Prompt:</h4>
                  <CopyButton text={prompt.actual_text} />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg overflow-hidden prose prose-sm max-w-none break-words overflow-x-auto">
                  <Markdown>
                    {prompt.actual_text}
                  </Markdown>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:order-last">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prompt Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Author Info */}
              {author && (
                <div>
                  <Link 
                    href={`/authors/${author.slug}`}
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-600 flex-shrink-0">
                      {author.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{author.name}</p>
                      <p className="text-sm text-gray-500">View Profile</p>
                    </div>
                  </Link>
                </div>
              )}

              {/* Prompt Info */}
              <div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Badge variant="secondary" className="text-xs">
                    {prompt.created_at.toLocaleDateString()}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    👁️ {prompt.views || 0}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    ❤️ {prompt.likes || 0}
                  </Badge>
                  {prompt.difficulty && (
                    <Badge variant='secondary'>
                      {getDifficultyStars(prompt.difficulty)}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Use Cases */}
              {prompt.use_cases && prompt.use_cases.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Use Cases</h4>
                  <div className="flex flex-wrap gap-1">
                    {prompt.use_cases.map((useCase, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
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
              
              {/* Tags */}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 