export interface Prompt {
  id: string;
  title: string;
  description: string;
  actual_text: string;
  categories: string[];
  tags: string[];
  created_at: Date;
  updated_at: Date;
  author?: string;
  slug: string; // SEO-friendly URL slug
  featured?: boolean;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  use_case?: string;
  likes?: number;
  views?: number;
}

export interface PromptCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  color?: string;
  icon?: string;
}

export interface PromptFilters {
  categories?: string[];
  tags?: string[];
  difficulty_level?: string;
  search?: string;
  featured?: boolean;
}

export type PromptSortBy = 'created_at' | 'updated_at' | 'title' | 'likes' | 'views';
export type SortOrder = 'asc' | 'desc'; 