'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { NavigationBack } from "@/components/ui/navigation-back";
import { Share2, Heart, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Prompt } from "@/types/prompt";
import type { Author } from "@/types/author";
import { getDifficultyStars } from "@/lib/prompt-utils";
import { toast } from "sonner";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

interface PromptClientPageProps {
  prompt: Prompt;
  author: Author | null;
  referrerCategory?: string;
  referrerAuthor?: string;
}

// Main Prompt Card Component
function PromptMainCard({ prompt }: { prompt: Prompt }) {

  const shareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Prompt copied to clipboard');
  }

  const openInChatGPT = () => {
    const encodedPrompt = encodeURIComponent(prompt.actual_text);
    const chatgptUrl = `https://chatgpt.com/?prompt=${encodedPrompt}`;
    window.open(chatgptUrl, '_blank');
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl md:text-2xl mb-2 leading-tight">{prompt.title}</CardTitle>
            <p className="text-gray-600 mb-4 text-sm md:text-base">{prompt.description}</p>
          </div>
          
          <div className="flex items-center gap-2 self-start">
            <AnimatedTooltip content="Share Link">
              <Button
                variant="outline"
                size="sm"
                onClick={shareLink}
                className="flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </AnimatedTooltip>
            <Button variant="outline" size="sm" className="flex-shrink-0 hidden">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">
              {prompt.type === 'image' ? 'Image Prompt:' : 'Prompt:'}
            </h4>
            <div className="flex items-center gap-2">
              <AnimatedTooltip content="Open in ChatGPT">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openInChatGPT}
                  className="flex items-center gap-1"
                >
                  <Image
                    src="/openai.svg"
                    alt="OpenAI"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </Button>
              </AnimatedTooltip>
              <CopyButton text={prompt.actual_text} />
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg overflow-hidden prose prose-sm max-w-none break-words overflow-x-auto">
            {prompt.actual_text}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MoreDetails({ prompt, author }: { prompt: Prompt; author: Author | null }) {
  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="space-y-6">
          {/* Prompt Stats */}
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
              {(prompt.views ?? 0) > 0 && (
                <Badge variant="secondary" className="text-xs">
                  👁️ {prompt.views}
                </Badge>
              )}
              {(prompt.likes ?? 0) > 0 && (
                <Badge variant="secondary" className="text-xs">
                  ❤️ {prompt.likes}
                </Badge>
              )}
              {prompt.difficulty && (
                <Badge variant='secondary'>
                  {getDifficultyStars(prompt.difficulty)}
                </Badge>
              )}
            </div>
          </div>

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
                  <p className="hidden text-sm text-gray-500">View Profile</p>
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
          <div className="hidden">
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
          <div className="hidden">
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
  );
}

export default function PromptClientPage({ prompt, author, referrerCategory, referrerAuthor }: PromptClientPageProps) {
  // Gallery state for image prompts
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
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

  const nextImage = React.useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = React.useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Keyboard navigation for fullscreen
  React.useEffect(() => {
    if (!isFullscreen) return;

    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          if (hasMultipleImages) prevImage();
          break;
        case 'ArrowRight':
          if (hasMultipleImages) nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, hasMultipleImages, nextImage, prevImage]);

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Navigation & Breadcrumb */}
      <div className="mb-4 md:mb-6">
        {/* Mobile: Centered back button only */}
        <div className="flex justify-center md:hidden mb-4">
          <NavigationBack currentPromptCategories={prompt.categories} referrerCategory={referrerCategory} referrerAuthor={referrerAuthor} />
        </div>
        
        {/* Desktop: Back button on left, breadcrumb on right */}
        <div className="hidden md:flex items-center justify-between">
          <NavigationBack currentPromptCategories={prompt.categories} referrerCategory={referrerCategory} referrerAuthor={referrerAuthor} />
          
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
                    onClick={openFullscreen}
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
            <div className="space-y-4">
              <PromptMainCard prompt={prompt} />
              <MoreDetails prompt={prompt} author={author} />
            </div>
          </div>
        </div>
      ) : (
        // Original Layout for Text Prompts
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <PromptMainCard prompt={prompt} />
          </div>

          {/* Sidebar */}
          <div className="lg:order-last">
            <MoreDetails prompt={prompt} author={author} />
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && isImagePrompt && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full">
              <img
                src={allImages[currentImageIndex]}
                alt={`${prompt.title} - Image ${currentImageIndex + 1}`}
                className="h-[95vh] w-auto"
              />
            </div>
          </div>

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentImageIndex + 1} of {allImages.length}
            </div>
          )}

          {/* Background click to close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeFullscreen}
            aria-label="Close fullscreen"
          />
        </div>
      )}
    </div>
  );
} 