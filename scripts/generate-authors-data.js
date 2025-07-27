const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const authorsDirectory = path.join(process.cwd(), 'src/content/authors');
const outputFile = path.join(process.cwd(), 'src/lib/authors-data.generated.ts');

function generateAuthorsData() {
  try {
    const fileNames = fs.readdirSync(authorsDirectory);
    const authors = fileNames
      .filter(name => name.endsWith('.md') && !name.toLowerCase().includes('readme'))
      .map(name => {
        const fullPath = path.join(authorsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        // Only include if both name and slug are present
        if (data.name && data.slug) {
          return {
            name: data.name,
            slug: data.slug
          };
        }
        return null;
      })
      .filter(author => author !== null); // Remove null entries

    const content = `// This file is auto-generated. Do not edit manually.
// Generated from markdown files in src/content/authors/

import { Author } from '@/types/author';

export const AUTHORS_DATA: Pick<Author, 'name' | 'slug'>[] = ${JSON.stringify(authors, null, 2)};
`;

    fs.writeFileSync(outputFile, content, 'utf8');
    console.log(`✅ Generated authors data with ${authors.length} authors`);
    
  } catch (error) {
    console.error('❌ Error generating authors data:', error);
    process.exit(1);
  }
}

generateAuthorsData(); 