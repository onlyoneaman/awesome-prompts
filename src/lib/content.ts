import { Prompt, PromptCategory, PromptFilters, PromptSortBy, SortOrder } from '@/types/prompt';

export function filterPrompts(
  prompts: Prompt[], 
  filters: PromptFilters = {}
): Prompt[] {
  let filtered = [...prompts];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(prompt =>
      prompt.title.toLowerCase().includes(searchLower) ||
      prompt.description.toLowerCase().includes(searchLower) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(prompt =>
      filters.categories!.some(cat => prompt.categories.includes(cat))
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(prompt =>
      filters.tags!.some(tag => prompt.tags.includes(tag))
    );
  }

  if (filters.difficulty) {
    filtered = filtered.filter(prompt =>
      prompt.difficulty === filters.difficulty
    );
  }

  if (filters.featured !== undefined) {
    filtered = filtered.filter(prompt => prompt.featured === filters.featured);
  }

  return filtered;
}

export function sortPrompts(
  prompts: Prompt[],
  sortBy: PromptSortBy = 'created_at',
  order: SortOrder = 'desc'
): Prompt[] {
  return [...prompts].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    // Handle undefined values
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    // Handle date comparison
    if (aValue instanceof Date && bValue instanceof Date) {
      const aTime = aValue.getTime();
      const bTime = bValue.getTime();
      if (order === 'asc') {
        return aTime < bTime ? -1 : aTime > bTime ? 1 : 0;
      } else {
        return aTime > bTime ? -1 : aTime < bTime ? 1 : 0;
      }
    }

    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const aLower = aValue.toLowerCase();
      const bLower = bValue.toLowerCase();
      if (order === 'asc') {
        return aLower < bLower ? -1 : aLower > bLower ? 1 : 0;
      } else {
        return aLower > bLower ? -1 : aLower < bLower ? 1 : 0;
      }
    }

    // Handle number comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }

    return 0;
  });
}

export function getAllTags(prompts: Prompt[]): string[] {
  const tagSet = new Set<string>();
  prompts.forEach((prompt) => {
    prompt.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function generatePromptSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Keep the sample categories from the original prompts.ts
export const sampleCategories: PromptCategory[] = [
  {
    id: "writing",
    name: "Writing",
    description: "Prompts for creative writing, copywriting, and content creation",
    slug: "writing",
    color: "#3B82F6",
    icon: "✍️"
  },
  {
    id: "programming",
    name: "Programming",
    description: "Technical prompts for software development and coding",
    slug: "programming",
    color: "#10B981",
    icon: "💻"
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Prompts for marketing, advertising, and business growth",
    slug: "marketing",
    color: "#F59E0B",
    icon: "📈"
  },
  {
    id: "creativity",
    name: "Creativity",
    description: "Prompts to spark creative thinking and innovation",
    slug: "creativity",
    color: "#8B5CF6",
    icon: "🎨"
  },
  {
    id: "business",
    name: "Business",
    description: "Professional prompts for business and productivity",
    slug: "business",
    color: "#EF4444",
    icon: "💼"
  },
  {
    id: "technical",
    name: "Technical",
    description: "Advanced technical and analytical prompts",
    slug: "technical",
    color: "#6B7280",
    icon: "⚙️"
  }
];

export function getCategoryBySlug(slug: string): PromptCategory | undefined {
  return sampleCategories.find(category => category.slug === slug);
} 