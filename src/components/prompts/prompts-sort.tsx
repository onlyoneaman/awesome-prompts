"use client";

import { Prompt } from "@/types/prompt";
import { sortPrompts } from "@/lib/content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = 'default' | 'difficulty-asc' | 'difficulty-desc' | 'old' | 'title-asc' | 'title-desc';

interface PromptsSortProps {
  prompts: Prompt[];
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  countLabel?: string;
}

// Helper function to get difficulty order
function getDifficultyOrder(difficulty?: string): number {
  if (!difficulty) return 999; // Put undefined at the end
  const order: Record<string, number> = {
    'beginner': 1,
    'intermediate': 2,
    'advanced': 3,
  };
  return order[difficulty] || 999;
}

// Sort prompts based on sort option
export function sortPromptsByOption(prompts: Prompt[], sortOption: SortOption): Prompt[] {
  if (sortOption === 'default') {
    return sortPrompts(prompts, 'created_at', 'desc');
  } else if (sortOption === 'old') {
    return sortPrompts(prompts, 'created_at', 'asc');
  } else if (sortOption === 'difficulty-asc') {
    // Custom sorting for difficulty (Low-Hi)
    return [...prompts].sort((a, b) => {
      const aOrder = getDifficultyOrder(a.difficulty);
      const bOrder = getDifficultyOrder(b.difficulty);
      return aOrder - bOrder;
    });
  } else if (sortOption === 'difficulty-desc') {
    // Custom sorting for difficulty (Hi-Low)
    return [...prompts].sort((a, b) => {
      const aOrder = getDifficultyOrder(a.difficulty);
      const bOrder = getDifficultyOrder(b.difficulty);
      return bOrder - aOrder;
    });
  } else if (sortOption === 'title-asc') {
    return sortPrompts(prompts, 'title', 'asc');
  } else if (sortOption === 'title-desc') {
    return sortPrompts(prompts, 'title', 'desc');
  }

  return prompts;
}

export function PromptsSort({ prompts, sortOption, onSortChange, countLabel }: PromptsSortProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-auto sm:w-[170px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Newest First</SelectItem>
          <SelectItem value="old">Oldest First</SelectItem>
          <SelectItem value="difficulty-asc">Easiest First</SelectItem>
          <SelectItem value="difficulty-desc">Hardest First</SelectItem>
          <SelectItem value="title-asc">Alphabetical (A-Z)</SelectItem>
          <SelectItem value="title-desc">Alphabetical (Z-A)</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-xs text-left text-gray-400 whitespace-nowrap">
        {prompts.length} {countLabel || 'prompt'}{prompts.length !== 1 ? 's' : ''} 
        {countLabel ? '' : ' available'}
      </span>
    </div>
  );
}

