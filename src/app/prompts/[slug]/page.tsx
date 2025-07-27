import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptBySlug, getAllPrompts } from "@/lib/content.server";
import { getAuthorBySlug } from "@/lib/authors.server";
import PromptClientPage from "@/components/prompts/prompt-client-page";

// Remove edge runtime - use Node.js runtime for filesystem access
// export const runtime = 'edge';

// Required for static export
export const dynamic = 'force-static'

interface Props {
  params: Promise<{ slug: string }>;
  // searchParams removed for static export compatibility
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    return {
      title: "Prompt Not Found | Awesome Prompts",
      description: "The requested AI prompt could not be found. Browse our collection of premium prompts for ChatGPT, Claude, and other AI tools.",
    };
  }

  // Get author information for metadata
  const author = prompt.author ? getAuthorBySlug(prompt.author) : null;
  
  // Generate rich keywords from categories, tags, and use cases
  const keywords = [
    ...prompt.categories.map(cat => `${cat} prompts`),
    ...prompt.tags,
    ...(prompt.use_cases || []),
    "AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "AI tools",
    ...(prompt.difficulty ? [`${prompt.difficulty} prompts`] : [])
  ];

  const categoryContext = prompt.categories[0] ? ` | ${prompt.categories[0].charAt(0).toUpperCase() + prompt.categories[0].slice(1)} AI Prompt` : '';
  const title = `${prompt.title}${categoryContext} | Awesome Prompts`;

  // Enhanced description with context
  const categoryText = prompt.categories.length > 0 ? ` Perfect for ${prompt.categories.join(', ')} tasks` : '';
  const useCaseText = prompt.use_cases && prompt.use_cases.length > 0 ? ` Ideal for ${prompt.use_cases.slice(0, 2).join(' and ')}` : '';
  const description = `${prompt.description}${categoryText}.${useCaseText}. Get premium AI prompts for ChatGPT, Claude, and more.`;

  return {
    title,
    description,
    keywords: keywords.slice(0, 20), // Limit to 20 most relevant keywords
    authors: author ? [{ name: author.name }] : undefined,
    creator: author?.name,
    publisher: "Awesome Prompts",
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      type: "article",
      tags: prompt.tags,
      authors: author ? [author.name] : undefined,
      publishedTime: prompt.created_at.toISOString(),
      modifiedTime: prompt.updated_at.toISOString(),
      section: prompt.categories[0],
    },
    twitter: {
      card: "summary_large_image",
      title: `${prompt.title} | ${prompt.categories[0]?.charAt(0).toUpperCase() + prompt.categories[0]?.slice(1)} AI Prompt`,
      description: prompt.description,
      creator: author?.twitter || "@awesome_prompts",
    },
    alternates: {
      canonical: `/prompts/${slug}`,
    },
    other: {
      "prompt:difficulty": prompt.difficulty || "",
      "prompt:categories": prompt.categories.join(","),
      "prompt:tags": prompt.tags.join(","),
      "prompt:use_cases": prompt.use_cases?.join(",") || "",
      "prompt:featured": prompt.featured ? "true" : "false",
    }
  };
}

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  return prompts.map(prompt => ({
    slug: prompt.slug,
  }));
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;
  
  // For static export, we can't await searchParams, so we'll pass undefined
  // The client component will handle URL params on the client side
  const referrerCategory = undefined;
  const referrerAuthor = undefined;
  
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  // Get author information
  const author = prompt.author ? getAuthorBySlug(prompt.author) || null : null;

  return (
    <PromptClientPage 
      prompt={prompt}
      author={author}
      referrerCategory={referrerCategory}
      referrerAuthor={referrerAuthor}
    />
  );
} 