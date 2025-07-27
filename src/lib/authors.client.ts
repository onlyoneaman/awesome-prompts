import { Author } from '@/types/author';
import { AUTHORS_DATA } from './authors-data.generated';

export function getAuthorBySlug(slug: string): Pick<Author, 'name' | 'slug'> | undefined {
  return AUTHORS_DATA.find(author => author.slug === slug);
}

export function getAllAuthorsBasic(): Pick<Author, 'name' | 'slug'>[] {
  return AUTHORS_DATA;
}

// Re-export the generated data for direct access if needed
export { AUTHORS_DATA }; 