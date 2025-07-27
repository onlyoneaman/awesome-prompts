import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Prompt } from '@/types/prompt';

const promptsDirectory = path.join(process.cwd(), 'src/content/prompts');

export function getAllPrompts(): Prompt[] {
  try {
    const fileNames = fs.readdirSync(promptsDirectory);
    const prompts = fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const fullPath = path.join(promptsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          id: data.slug || name.replace('.md', ''),
          title: data.title,
          description: data.description,
          actual_text: content.trim(),
          type: data.type || 'text', // Default to 'text' if not specified
          image: data.image, // Optional image field
          categories: data.categories || [],
          tags: data.tags || [],
          created_at: new Date(data.created_at),
          updated_at: new Date(data.updated_at),
          author: data.author,
          slug: data.slug,
          featured: data.featured || false,
          difficulty: data.difficulty,
          use_cases: data.use_cases,
          likes: data.likes || 0,
          views: data.views || 0
        } as Prompt;
      });

    return prompts;
  } catch (error) {
    console.error('Error reading prompts:', error);
    return [];
  }
}

export function getPromptBySlug(slug: string): Prompt | undefined {
  try {
    const fullPath = path.join(promptsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      id: data.slug || slug,
      title: data.title,
      description: data.description,
      actual_text: content.trim(),
      type: data.type || 'text', // Default to 'text' if not specified
      image: data.image, // Optional image field
      categories: data.categories || [],
      tags: data.tags || [],
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      author: data.author,
      slug: data.slug,
      featured: data.featured || false,
      difficulty: data.difficulty,
      use_cases: data.use_cases,
      likes: data.likes || 0,
      views: data.views || 0
    } as Prompt;
  } catch (error) {
    console.error(`Error reading prompt ${slug}:`, error);
    return undefined;
  }
}

export function getPromptsByCategory(categorySlug: string): Prompt[] {
  const allPrompts = getAllPrompts();
  return allPrompts.filter(prompt => 
    prompt.categories.includes(categorySlug)
  );
} 