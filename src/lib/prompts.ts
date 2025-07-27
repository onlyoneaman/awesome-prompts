import { Prompt, PromptCategory, PromptFilters, PromptSortBy, SortOrder } from "@/types/prompt";

// Sample data - in a real app, this would come from a database
export const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "Creative Writing Assistant",
    description: "A comprehensive prompt for generating creative stories, poems, and narrative content with specific themes and styles.",
    actual_text: "You are a creative writing assistant. Help me write a compelling [STORY TYPE] about [TOPIC]. The story should have [TONE/MOOD] and be approximately [LENGTH]. Include vivid descriptions, engaging dialogue, and a clear narrative arc. Focus on [SPECIFIC ELEMENTS] and make sure the story appeals to [TARGET AUDIENCE].",
    categories: ["writing", "creativity"],
    tags: ["creative-writing", "storytelling", "narrative", "fiction"],
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-15"),
    author: "PromptCrafter",
    slug: "creative-writing-assistant",
    featured: true,
    difficulty_level: "intermediate",
    use_case: "Content creation, creative writing, storytelling",
    likes: 45,
    views: 230
  },
  {
    id: "2",
    title: "Code Review Expert",
    description: "A technical prompt for conducting thorough code reviews, identifying issues, and suggesting improvements.",
    actual_text: "You are an experienced software engineer conducting a code review. Analyze the following code for:\n\n1. Code quality and readability\n2. Performance optimizations\n3. Security vulnerabilities\n4. Best practices adherence\n5. Potential bugs or edge cases\n\nProvide specific feedback with examples and suggest improvements. Focus on [PROGRAMMING LANGUAGE] and [FRAMEWORK] best practices.\n\nCode to review:\n[CODE_BLOCK]",
    categories: ["programming", "technical"],
    tags: ["code-review", "software-engineering", "best-practices", "debugging"],
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-12"),
    author: "TechLead",
    slug: "code-review-expert",
    featured: false,
    difficulty_level: "advanced",
    use_case: "Code quality assurance, technical reviews, software development",
    likes: 67,
    views: 312
  },
  {
    id: "3",
    title: "Marketing Copy Generator",
    description: "Create compelling marketing copy for various platforms and audiences with this versatile prompt.",
    actual_text: "Create compelling marketing copy for [PRODUCT/SERVICE]. The copy should:\n\n- Target audience: [TARGET_AUDIENCE]\n- Platform: [PLATFORM] (e.g., social media, email, website)\n- Tone: [TONE] (e.g., professional, casual, urgent)\n- Goal: [GOAL] (e.g., increase sales, build awareness, drive traffic)\n- Key benefits: [BENEFITS]\n- Call-to-action: [CTA]\n\nMake it engaging, persuasive, and appropriate for the platform. Include attention-grabbing headlines and clear value propositions.",
    categories: ["marketing", "business"],
    tags: ["copywriting", "marketing", "sales", "advertising", "content-marketing"],
    created_at: new Date("2024-01-08"),
    updated_at: new Date("2024-01-08"),
    author: "MarketingPro",
    slug: "marketing-copy-generator",
    featured: true,
    difficulty_level: "beginner",
    use_case: "Marketing campaigns, advertising, content creation",
    likes: 89,
    views: 445
  }
];

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

// Utility functions
export function getPromptBySlug(slug: string): Prompt | undefined {
  return samplePrompts.find(prompt => prompt.slug === slug);
}

export function getPromptsByCategory(categorySlug: string): Prompt[] {
  return samplePrompts.filter(prompt => 
    prompt.categories.includes(categorySlug)
  );
}

export function getCategoryBySlug(slug: string): PromptCategory | undefined {
  return sampleCategories.find(category => category.slug === slug);
}

export function filterPrompts(
  prompts: Prompt[] = samplePrompts, 
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

  if (filters.difficulty_level) {
    filtered = filtered.filter(prompt =>
      prompt.difficulty_level === filters.difficulty_level
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

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  samplePrompts.forEach(prompt => {
    prompt.tags.forEach(tag => tagSet.add(tag));
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