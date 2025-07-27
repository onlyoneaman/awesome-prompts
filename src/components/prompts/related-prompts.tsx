"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prompt } from "@/types/prompt";
import { getNavigationContext, findSimilarPrompts, getPromptsByCategory } from "@/lib/utils";
import { getCategoryBySlug } from "@/lib/content";

interface RelatedPromptsProps {
  currentPrompt: Prompt;
  allPrompts: Prompt[];
}

export function RelatedPrompts({ currentPrompt, allPrompts }: RelatedPromptsProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [sectionTitle, setSectionTitle] = useState("Related Prompts");
  const [showMoreSection, setShowMoreSection] = useState(false);
  const [morePrompts, setMorePrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const referrer = document.referrer;
    const context = getNavigationContext(referrer);
    
    if (context.type === 'category' && context.category) {
      // Coming from category - show prompts from that category
      const category = getCategoryBySlug(context.category);
      if (category) {
        const categoryPrompts = getPromptsByCategory(
          allPrompts, 
          context.category, 
          currentPrompt.id, 
          4
        );
        setPrompts(categoryPrompts);
        setSectionTitle(`More in ${category.name}`);
        
        // Also show general similar prompts if we have any
        const similarPrompts = findSimilarPrompts(currentPrompt, allPrompts, 3);
        const filteredSimilar = similarPrompts.filter(p => 
          !categoryPrompts.some(cp => cp.id === p.id)
        );
        if (filteredSimilar.length > 0) {
          setMorePrompts(filteredSimilar);
          setShowMoreSection(true);
        }
      }
    } else {
      // Coming from prompts or direct - show similar prompts
      const similarPrompts = findSimilarPrompts(currentPrompt, allPrompts, 4);
      setPrompts(similarPrompts);
      setSectionTitle("More Like This");
    }
  }, [currentPrompt, allPrompts]);

  const PromptList = ({ prompts: promptList }: { prompts: Prompt[] }) => (
    <div className="space-y-4">
      {promptList.map((prompt) => (
        <div key={prompt.id} className="border-b last:border-b-0 pb-4 last:pb-0">
          <Link 
            href={`/prompts/${prompt.slug}`}
            className="block hover:text-primary transition-colors"
          >
            <h4 className="font-semibold mb-1">{prompt.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{prompt.description}</p>
            <div className="flex flex-wrap gap-1">
              {prompt.categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );

  if (prompts.length === 0 && !showMoreSection) {
    return null;
  }

  return (
    <div className="space-y-6">
      {prompts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{sectionTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <PromptList prompts={prompts} />
          </CardContent>
        </Card>
      )}
      
      {showMoreSection && morePrompts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">More Like This</CardTitle>
          </CardHeader>
          <CardContent>
            <PromptList prompts={morePrompts} />
          </CardContent>
        </Card>
      )}
    </div>
  );
} 