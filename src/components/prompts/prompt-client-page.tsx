'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Markdown from 'react-markdown';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { NavigationBack } from "@/components/ui/navigation-back";
import { Share2, Heart, Star, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
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
  // Gallery state for image prompts
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get all images (support both single image and images array)
  const allImages = React.useMemo(() => {
    if (prompt.images && prompt.images.length > 0) {
      return prompt.images;
    } else if (prompt.image) {
      return [prompt.image];
    }
    return [];
  }, [prompt.images, prompt.image]);

  const hasMultipleImages = allImages.length > 1;
  const isImagePrompt = prompt.type === 'image' && allImages.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

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
      {isImagePrompt ? (
        // Gallery Layout for Image Prompts
        <div className="space-y-6">
          {/* Gallery and Prompt Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Gallery Section */}
            <div className="space-y-4">
              {/* Main Image Display */}
              <div className="relative bg-gray-50 rounded-lg overflow-hidden group">
                <div className="aspect-square relative">
                  <Image
                    src={allImages[currentImageIndex]}
                    alt={`${prompt.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Fullscreen Button */}
                  <button
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="View fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {hasMultipleImages && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((imageSrc, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={imageSrc}
                        alt={`${prompt.title} - Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="text-center text-sm text-gray-500">
                  {currentImageIndex + 1} of {allImages.length}
                </div>
              )}
            </div>

            {/* Prompt Content */}
            <div>
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
                      <h4 className="font-semibold">Image Prompt:</h4>
                      <CopyButton text={prompt.actual_text} />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-hidden prose prose-sm max-w-none break-words overflow-x-auto">
                      <Markdown>
                        {prompt.actual_text}
                      </Markdown>
                    </div>
                  </div>

                  {/* Prompt Info - Moved here for image prompts */}
                  <div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      {prompt.type && prompt.type !== 'text' && (
                        <Badge variant="default" className="text-xs capitalize">
                          {prompt.type} prompt
                        </Badge>
                      )}
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
                </CardContent>
              </Card>

              {/* Prompt Details Card - Below the prompt card in image layout */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Prompt Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Author Info */}
                    {author && (
                      <div>
                        <h4 className="font-semibold mb-3">Author</h4>
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

                    {/* Use Cases */}
                    {prompt.use_cases && prompt.use_cases.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Use Cases</h4>
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
                      <h4 className="font-semibold mb-3">Categories</h4>
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
                      <h4 className="font-semibold mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {prompt.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        // Original Layout for Text Prompts
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
                      <h4 className="font-semibold mb-3">Author</h4>
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

                  {/* Use Cases */}
                  {prompt.use_cases && prompt.use_cases.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Use Cases</h4>
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
                    <h4 className="font-semibold mb-3">Categories</h4>
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
                    <h4 className="font-semibold mb-3">Tags</h4>
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
        )}
      </div>
    );
  } 