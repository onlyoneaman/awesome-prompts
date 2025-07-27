import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Author } from '@/types/author';

const authorsDirectory = path.join(process.cwd(), 'src/content/authors');

export function getAllAuthors(): Author[] {
  try {
    const fileNames = fs.readdirSync(authorsDirectory);
    const authors = fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const fullPath = path.join(authorsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        return data as Author;
      });

    return authors;
  } catch (error) {
    console.error('Error reading authors:', error);
    return [];
  }
}

export function getAuthorBySlug(slug: string): Author | undefined {
  try {
    const fullPath = path.join(authorsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      bio: content
    } as Author;
  } catch (error) {
    console.error(`Error reading author ${slug}:`, error);
    return undefined;
  }
} 