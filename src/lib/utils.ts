import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Prompt } from "@/types/prompt"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Navigation context utilities
export function getNavigationContext(referrer?: string | null) {
  if (!referrer) return { type: 'direct', category: null };
  
  // Check if coming from homepage
  if (referrer.endsWith('/') && !referrer.includes('/category') && !referrer.includes('/prompts')) {
    return { type: 'home', category: null };
  }
  
  // Check if coming from a category page  
  const categoryMatch = referrer.match(/\/categories\/([^/?]+)/);
  if (categoryMatch) {
    return { type: 'category', category: categoryMatch[1] };
  }
  
  // Check if coming from prompts listing
  if (referrer.includes('/prompts') && !referrer.includes('/prompts/')) {
    return { type: 'prompts', category: null };
  }
  
  // Check if coming from categories listing
  if (referrer.includes('/categories') && !referrer.includes('/categories/')) {
    return { type: 'categories', category: null };
  }
  
  return { type: 'direct', category: null };
}

// Similar prompts logic
export function findSimilarPrompts(
  currentPrompt: Prompt, 
  allPrompts: Prompt[], 
  maxResults: number = 3
): Prompt[] {
  // Score prompts based on similarity
  const scoredPrompts = allPrompts
    .filter(p => p.id !== currentPrompt.id)
    .map(prompt => {
      let score = 0;
      
      // Same categories (high weight)
      const sharedCategories = prompt.categories.filter(cat => 
        currentPrompt.categories.includes(cat)
      );
      score += sharedCategories.length * 3;
      
      // Same tags (medium weight)
      const sharedTags = prompt.tags.filter(tag => 
        currentPrompt.tags.includes(tag)
      );
      score += sharedTags.length * 2;
      
      // Same difficulty (low weight)
      if (prompt.difficulty === currentPrompt.difficulty) {
        score += 1;
      }
      
      return { prompt, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.prompt);
    
  return scoredPrompts;
}

// Filter prompts by category
export function getPromptsByCategory(
  allPrompts: Prompt[], 
  categorySlug: string,
  excludePromptId?: string,
  maxResults: number = 4
): Prompt[] {
  return allPrompts
    .filter(prompt => 
      prompt.categories.includes(categorySlug) && 
      prompt.id !== excludePromptId
    )
    .slice(0, maxResults);
}
