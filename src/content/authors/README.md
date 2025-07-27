# Authors Directory

This directory contains author profiles for the prompts website.

## Adding a New Author

To add a new author, follow these steps:

### 1. Create Author Markdown File

Create a new `.md` file in this directory with the author's slug as the filename (e.g., `john-doe.md`).

**Template:**
```markdown
---
name: "Your Full Name"
slug: "your-slug"
website: "https://yourwebsite.com"
profile_picture: "/authors/your-slug.jpg"
bio: "Brief description of yourself and your expertise."
twitter: "@yourtwitterhandle"
github: "yourgithub"
linkedin: "yourlinkedin"
---

# Your Full Name

Detailed bio and information about the author.

## Expertise
- Area 1
- Area 2
- Area 3

## Notable Contributions
- Description of your work
- Notable achievements
```

### 2. Add Profile Picture

1. Add your profile picture to `public/authors/your-slug.jpg`
2. The image should be:
   - Square aspect ratio (recommended)
   - Reasonable size (under 500KB)
   - Format: JPG or PNG

### 3. Build Process

The author data is automatically generated from these markdown files during the build process. When you add a new author:

1. The build script will read your markdown file
2. Extract the basic info (name, slug) for client-side navigation
3. Generate the `authors-data.generated.ts` file
4. Your author page will be automatically available at `/authors/your-slug`

### 4. File Structure

```
src/content/authors/
├── README.md           # This file
├── your-slug.md        # Your author profile
└── ...

public/authors/
├── your-slug.jpg       # Your profile picture
└── ...
```

### Example

See `aman.md` for a complete example of an author profile.

## Notes

- The `slug` field must be unique and URL-friendly (lowercase, no spaces, use hyphens)
- The `profile_picture` path should match the actual image location in `public/authors/`
- The build process automatically generates client-side author data for navigation
- Make sure your markdown file frontmatter is valid YAML 