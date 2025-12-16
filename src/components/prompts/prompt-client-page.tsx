'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { NavigationBack } from "@/components/ui/navigation-back";
import { Share2, Heart, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Prompt, MediaItem } from "@/types/prompt";
import type { Author } from "@/types/author";
import { getDifficultyStars } from "@/lib/prompt-utils";
import { toast } from "sonner";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import MarkdownPreview from '@uiw/react-markdown-preview';

interface PromptClientPageProps {
  prompt: Prompt;
  author: Author | null;
  referrerCategory?: string;
  referrerAuthor?: string;
}

// Main Prompt Card Component
function PromptMainCard({ prompt }: { prompt: Prompt }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard');
  }

  const encodePrompt = (prompt: string) => {
    return encodeURIComponent(prompt);
  };

  const openInChatGPT = () => {
    const encodedPrompt = encodePrompt(prompt.actual_text);
    const chatgptUrl = `https://chatgpt.com/?prompt=${encodedPrompt}`;
    window.open(chatgptUrl, '_blank');
  }

  const openInClaude = () => {
    const encodedPrompt = encodePrompt(prompt.actual_text);
    const claudeUrl = `https://claude.ai/new?q=${encodedPrompt}`;
    window.open(claudeUrl, '_blank');
  }

  const buttonSize = isMobile ? "xs" : "sm";

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-1 md:gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl md:text-2xl mb-1 md:mb-2 leading-tight">{prompt.title}</CardTitle>
            <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">{prompt.description}</p>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2 self-start">
            <div className="hidden md:block">
              <AnimatedTooltip content="Share Link">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareLink}
                  className="flex items-center gap-1"
                >
                  <Share2 size={16} />
                </Button>
              </AnimatedTooltip>
            </div>
            <Button variant="outline" size="sm" className="flex-shrink-0 hidden">
              <Heart size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 md:space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1 md:mb-2">
            <h4 className="font-semibold">
              {prompt.type === 'image' ? 'Image Prompt:' : 'Prompt:'}
            </h4>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="block md:hidden">
                <AnimatedTooltip content="Share Link">
                  <Button
                    variant="outline"
                    size={buttonSize}
                    onClick={shareLink}
                    className="flex items-center gap-1"
                  >
                    <Share2 size={16} />
                  </Button>
                </AnimatedTooltip>
              </div>
              <AnimatedTooltip content="Open in ChatGPT">
                <Button
                  variant="outline"
                  size={buttonSize}
                  onClick={openInChatGPT}
                  className="flex items-center gap-1"
                >
                  <Image
                    src="/openai.svg"
                    alt="OpenAI"
                    width={14}
                    height={14}
                  />
                </Button>
              </AnimatedTooltip>
              <AnimatedTooltip content="Open in Claude">
                <Button
                  variant="outline"
                  size={buttonSize}
                  onClick={openInClaude}
                  className="flex items-center gap-1"
                >
                  <Image
                    src="/claude.png"
                    alt="Claude"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </Button>
              </AnimatedTooltip>
              <CopyButton text={prompt.actual_text} size={buttonSize} />
            </div>
          </div>
          <MarkdownPreview 
            source={prompt.actual_text}
            style={{
              padding: 12,
              fontSize: isMobile ? '12px' : '16px',
              backgroundColor: '#f5f5f5'
            }}
            wrapperElement={{
              "data-color-mode": "light"
            }}
          />
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
                {/* <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-600 flex-shrink-0">
                  {author.name.charAt(0).toUpperCase()}
                </div> */}
                <Image
                  src={author.profile_picture ?? ''}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
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
  // Gallery state for media prompts
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Get all media items (unified images and videos)
  const allMedia = React.useMemo(() => {
    const media: MediaItem[] = [];
    
    // Add images
    if (prompt.images) {
      prompt.images.forEach(src => media.push({ src, type: 'image' }));
    }
    
    // Add videos
    if (prompt.videos) {
      prompt.videos.forEach(src => media.push({ src, type: 'video' }));
    }
    
    return media;
  }, [prompt.images, prompt.videos]);

  const hasMultipleMedia = allMedia.length > 1;
  const hasMedia = allMedia.length > 0;
  const isMediaPrompt = (prompt.type === 'image' || prompt.type === 'video') && hasMedia;
  const currentMedia = allMedia[currentMediaIndex];

  const nextMedia = React.useCallback(() => {
    setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
  }, [allMedia.length]);

  const prevMedia = React.useCallback(() => {
    setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  }, [allMedia.length]);

  const selectMedia = (index: number) => {
    setCurrentMediaIndex(index);
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
          if (hasMultipleMedia) prevMedia();
          break;
        case 'ArrowRight':
          if (hasMultipleMedia) nextMedia();
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, hasMultipleMedia, nextMedia, prevMedia]);

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Navigation & Breadcrumb */}
      <div className="mb-4 md:mb-6">
        {/* Mobile: Centered back button only */}
        <div className="flex justify-center md:hidden mb-2 md:mb-4">
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
      {isMediaPrompt ? (
        // Gallery Layout for Media Prompts (Images and Videos)
        <div className="space-y-6">
          {/* Gallery and Prompt Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Media Gallery Section */}
            <div className="space-y-4">
              {/* Main Media Display */}
              <div className="relative bg-gray-50 rounded-lg overflow-hidden group">
                <div className={`relative max-h-[70vh] ${currentMedia?.type === 'video' ? 'aspect-video' : 'aspect-square'}`}>
                  {currentMedia?.type === 'image' ? (
                    <Image
                      src={currentMedia.src}
                      alt={`${prompt.title} - Image ${currentMediaIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <video
                      src={currentMedia?.src}
                      className="w-full h-full object-contain"
                      controls
                      preload="metadata"
                    />
                  )}
                  
                  {/* Navigation Arrows */}
                  {hasMultipleMedia && (
                    <>
                      <button
                        onClick={prevMedia}
                        className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous media"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextMedia}
                        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next media"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Fullscreen Button */}
                  <button
                    onClick={openFullscreen}
                    className="absolute cursor-pointer top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="View fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Media Thumbnail Gallery */}
              {hasMultipleMedia && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 md:pb-2">
                  {allMedia.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => selectMedia(index)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentMediaIndex
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {media.type === 'image' ? (
                        <Image
                          src={media.src}
                          alt={`${prompt.title} - Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <video
                          src={media.src}
                          className="w-full h-full object-cover"
                          muted
                          preload="metadata"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Media Counter */}
              {/* {hasMultipleMedia && (
                <div className="text-center text-sm text-gray-500">
                  {currentMediaIndex + 1} / {allMedia.length}
                </div>
              )} */}
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

      {/* Unified Fullscreen Modal for Media */}
      {isFullscreen && isMediaPrompt && currentMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute cursor-pointer top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Arrows */}
          {hasMultipleMedia && (
            <>
              <button
                onClick={prevMedia}
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                aria-label="Previous media"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextMedia}
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                aria-label="Next media"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Main Media Display */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full">
              {currentMedia.type === 'image' ? (
                <Image
                  src={currentMedia.src}
                  alt={`${prompt.title} - Media ${currentMediaIndex + 1}`}
                  width={0}
                  height={0}
                  className="h-[95vh] w-auto object-contain"
                  sizes="100vw"
                  style={{ width: 'auto', height: '95vh' }}
                />
              ) : (
                <video
                  src={currentMedia.src}
                  className="h-[95vh] w-auto"
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>

          {/* Media Counter */}
          {hasMultipleMedia && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentMediaIndex + 1} / {allMedia.length}
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