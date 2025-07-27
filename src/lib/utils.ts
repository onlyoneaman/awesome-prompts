import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Prompt } from "@/types/prompt"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Navigation context utilities
export function getNavigationContext(referrer?: string | null) {
  if (!referrer) return { type: 'direct', category: null, author: null };
  
  // Check if coming from a specific category page
  const categoryMatch = referrer.match(/\/categories\/([^/?#]+)$/);
  if (categoryMatch) {
    return { type: 'category', category: categoryMatch[1], author: null };
  }
  
  // Check if coming from a specific author page
  const authorMatch = referrer.match(/\/authors\/([^/?#]+)$/);
  if (authorMatch) {
    return { type: 'author', category: null, author: authorMatch[1] };
  }
  
  // Check if coming from categories listing page
  if (referrer.includes('/categories') && referrer.endsWith('/categories')) {
    return { type: 'categories', category: null, author: null };
  }
  
  // Check if coming from authors listing page
  if (referrer.includes('/authors') && referrer.endsWith('/authors')) {
    return { type: 'authors', category: null, author: null };
  }
  
  // Check if coming from prompts listing
  if (referrer.includes('/prompts') && referrer.endsWith('/prompts')) {
    return { type: 'prompts', category: null, author: null };
  }
  
  // Check if coming from homepage (root domain ending with just /)
  if (referrer.match(/https?:\/\/[^\/]+\/?$/)) {
    return { type: 'home', category: null, author: null };
  }
  
  return { type: 'direct', category: null, author: null };
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
