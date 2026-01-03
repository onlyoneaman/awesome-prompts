"use client";

import { useState, useMemo } from "react";
import { Prompt } from "@/types/prompt";
import { PromptCard } from "@/components/prompts/prompt-card";
import { PromptsSort, sortPromptsByOption, type SortOption } from "@/components/prompts/prompts-sort";

interface CategoryPromptsListProps {
  prompts: Prompt[];
  categorySlug: string;
}

export function CategoryPromptsList({ prompts, categorySlug }: CategoryPromptsListProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const sortedPrompts = useMemo(() => {
    return sortPromptsByOption(prompts, sortOption);
  }, [prompts, sortOption]);

  if (sortedPrompts.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">All Prompts</h2>
        <PromptsSort
          prompts={prompts}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
        {sortedPrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} referrerCategory={categorySlug} />
        ))}
      </div>
    </>
  );
}

