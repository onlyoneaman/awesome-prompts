import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prompt } from "@/types/prompt";

interface PromptCardProps {
  prompt: Prompt;
  showFullText?: boolean;
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

export function PromptCard({ prompt, showFullText = false }: PromptCardProps) {
  if (showFullText) {
    // Full detailed view for individual prompt pages
    return (
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl">{prompt.title}</CardTitle>
          <CardDescription>{prompt.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Prompt Text:</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {prompt.actual_text}
              </pre>
            </div>
          </div>
          
          {prompt.use_case && (
            <div>
              <h4 className="font-semibold mb-2">Use Case:</h4>
              <p className="text-sm text-gray-600">{prompt.use_case}</p>
            </div>
          )}
          
          <div className="space-y-3">
            {/* Categories */}
            <div className="flex flex-wrap gap-1">
              {prompt.categories.map((category) => (
                                       <Link key={category} href={`/category/${category}`}>
                  <Badge variant="outline" className="hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer text-xs">
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
            
            {prompt.difficulty && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Difficulty:</span>
                <span className="text-lg">
                  {getDifficultyStars(prompt.difficulty)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Minimal card view for listings
  return (
    <Link href={`/prompts/${prompt.slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow border border-gray-200 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-lg">📄</span>
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold line-clamp-1 text-gray-900 hover:text-blue-600 transition-colors">
                {prompt.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 line-clamp-2 mt-1">
                {prompt.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {prompt.categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
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