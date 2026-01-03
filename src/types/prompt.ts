export interface MediaItem {
  src: string;
  type: 'image' | 'video';
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  actual_text: string;
  type: 'text' | 'image' | 'video'; // New field to distinguish prompt types
  images?: string[]; // New field for multiple images in gallery prompts
  videos?: string[]; // New field for multiple videos in gallery prompts
  categories: string[];
  tags: string[];
  created_at: Date;
  updated_at: Date;
  author?: string;
  slug: string; // SEO-friendly URL slug
  featured?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  use_cases?: string[];
  likes?: number;
  views?: number;
  reference_image?: boolean; // Indicates if the prompt requires a reference image
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
  difficulty?: string;
  search?: string;
  featured?: boolean;
}

export type PromptSortBy = 'created_at' | 'updated_at' | 'title' | 'likes' | 'views';
export type SortOrder = 'asc' | 'desc'; 