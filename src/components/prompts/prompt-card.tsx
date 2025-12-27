"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prompt } from "@/types/prompt";
import { getDifficultyStars, getPromptTypeIcon } from "@/lib/prompt-utils";

interface PromptCardProps {
  prompt: Prompt;
  referrerCategory?: string;
  referrerAuthor?: string;
}

export function PromptCard({ prompt, referrerCategory, referrerAuthor }: PromptCardProps) {
  const buildPromptLink = (slug: string) => {
    const params = new URLSearchParams();
    
    if (referrerCategory) {
      params.append('referrer_category', referrerCategory);
    }
    
    if (referrerAuthor) {
      params.append('referrer_author', referrerAuthor);
    }
    
    const queryString = params.toString();
    return queryString ? `/prompts/${slug}?${queryString}` : `/prompts/${slug}`;
  };

  return (
    <Link href={buildPromptLink(prompt.slug)}>
      <Card className="h-full hover:shadow-md transition-shadow border border-gray-200 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            {(() => {
              // Check for first available media (prioritize images, then videos)
              const firstImage = prompt.images?.[0];
              const firstVideo = prompt.videos?.[0];
              const hasMedia = firstImage || firstVideo;

              if (hasMedia) {
                if (firstImage) {
                  return (
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={firstImage}
                        alt={prompt.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                } else if (firstVideo) {
                  return (
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100 relative">
                      <video
                        src={firstVideo}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-lg bg-black/50 rounded-full p-1">
                          {getPromptTypeIcon(prompt.type)}
                        </span>
                      </div>
                    </div>
                  );
                }
              }

              return (
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-lg">{getPromptTypeIcon(prompt.type)}</span>
                </div>
              );
            })()}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-base font-semibold line-clamp-1 text-gray-900 hover:text-blue-600 transition-colors">
                  {prompt.title}
                </CardTitle>
                {prompt.type && prompt.type !== 'text' && (
                  <Badge variant="secondary" className="text-xs capitalize">
                    {prompt.type}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm text-gray-600 line-clamp-2">
                {prompt.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-end">
            {prompt.difficulty && (
              <span className="text-sm">
                {getDifficultyStars(prompt.difficulty)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 