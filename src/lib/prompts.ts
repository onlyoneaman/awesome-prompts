import { PromptCategory } from "@/types/prompt";

// Note: Server-side functions (getAllPrompts, getPromptBySlug, getPromptsByCategory) 
// should be imported directly from "@/lib/content.server" in server components

// Re-export client-side utility functions from content.ts
export { 
  filterPrompts, 
  sortPrompts, 
  getAllTags, 
  generatePromptSlug 
} from "@/lib/content";

// Re-export client-side author functions
export { 
  getAuthorBySlug, 
  getAllAuthorsBasic 
} from "@/lib/authors.client";

// Category utility function (not re-exported since categories are defined here)
export function getCategoryBySlug(slug: string): PromptCategory | undefined {
  return topCategories.find(category => category.slug === slug);
}

// Categories remain static as they define the site structure
export const topCategories: PromptCategory[] = [
  {
    id: "business",
    name: "Business",
    description: "Professional prompts for business and productivity",
    slug: "business",
    color: "#EF4444",
    icon: "💼"
  },
  {
    id: "psychology",
    name: "Psychology",
    description: "Prompts for psychological insights, behavior analysis, and mental wellness",
    slug: "psychology",
    color: "#EC4899",
    icon: "🧠"
  },
  {
    id: "images",
    name: "Images",
    description: "Prompts for image generation.",
    slug: "images",
    color: "#10B981",
    icon: "/images/high-fashion-editorial-urban-portrait/high-fashion-editorial-urban-portrait-1.png"
  },
  {
    id: "portraits",
    name: "Portraits",
    description: "Prompts for portrait photography and selfies",
    slug: "portraits",
    color: "#EC4899",
    icon: "/images/mirror-selfie-otaku-pc-corner/mirror-selfie-otaku-pc-corner-1.png"
  },
  {
    id: "videos",
    name: "Videos",
    description: "Prompts for video generation.",
    slug: "videos",
    color: "#10B981",
    icon: "🎥"
  },
  {
    id: "writing",
    name: "Writing",
    description: "Prompts for creative writing, copywriting, and content creation",
    slug: "writing",
    color: "#3B82F6",
    icon: "✍️"
  },
  {
    id: "strategy",
    name: "Strategy",
    description: "Prompts for strategic thinking and planning",
    slug: "strategy",
    color: "#8B5A2B",
    icon: "🎯"
  },
  {
    id: "productivity",
    name: "Productivity",
    description: "Prompts for improving productivity and personal efficiency",
    slug: "productivity",
    color: "#06B6D4",
    icon: "⚡"
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
    id: "programming",
    name: "Programming",
    description: "Technical prompts for software development and coding",
    slug: "programming",
    color: "#10B981",
    icon: "💻"
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
    id: "illustration",
    name: "Illustration",
    description: "Prompts for creating illustrations and visual artwork",
    slug: "illustration",
    color: "#F97316",
    icon: "🖼️"
  },
  {
    id: "designer",
    name: "Designer",
    description: "Prompts for design work and creative design projects",
    slug: "designer",
    color: "#6366F1",
    icon: "/images/category-icons/designer-icon-optimized.webp"
  },
  {
    id: "graphics",
    name: "Graphics",
    description: "Prompts for creating graphics and visual designs",
    slug: "graphics",
    color: "#14B8A6",
    icon: "🎨"
  },
  {
    id: "product-uiux",
    name: "Product UI/UX",
    description: "Prompts for product design, UI/UX, user interface, and user experience",
    slug: "product-uiux",
    color: "#A855F7",
    icon: "🎯"
  },
  {
    id: "seo",
    name: "SEO",
    description: "Prompts for SEO, content strategy, and keyword research",
    slug: "seo",
    color: "#6B7280",
    icon: "⚙️"
  },
  {
    id: "learning",
    name: "Learning",
    description: "Prompts for learning and education",
    slug: "learning",
    color: "#10B981",
    icon: "📚"
  }
]; 