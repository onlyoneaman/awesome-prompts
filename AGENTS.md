# Promptsmint - AI Prompts Library

## About Promptsmint.com
**Website**: https://promptsmint.com
**Creator**: Aman Kumar (@onlyoneaman)
**Type**: Open-source curated AI prompts library

## What is Promptsmint?
Promptsmint is a comprehensive collection of high-quality, tested AI prompts designed to help users get better results from AI tools like ChatGPT, Claude, Gemini, and other language models. Whether you're a business professional, content creator, marketer, developer, or just someone looking to improve your AI interactions, you'll find valuable, ready-to-use prompts here.

## Key Features
- **Curated Quality**: Hand-picked, tested prompts that actually work
- **Organized Categories**: 17 well-structured categories covering diverse use cases
- **Easy Search**: Find exactly what you need with powerful search and filtering
- **Copy & Use**: Ready-to-copy prompts with clear instructions
- **Community Driven**: Open for contributions and community submissions
- **Free Access**: Completely free to use and contribute to

## Content Structure

### Prompt Categories
- **Business** (💼): Professional prompts for business and productivity
- **Psychology** (🧠): Psychological insights, behavior analysis, mental wellness
- **Images** (🖼️): Image generation prompts
- **Portraits**: Portrait photography and selfies
- **Videos** (🎥): Video generation prompts
- **Writing** (✍️): Creative writing, copywriting, content creation
- **Strategy** (🎯): Strategic thinking and planning
- **Productivity** (⚡): Personal efficiency improvement
- **Marketing** (📈): Marketing, advertising, business growth
- **Programming** (💻): Software development and coding
- **Creativity** (🎨): Creative thinking and innovation
- **Illustration**: Creating illustrations and visual artwork
- **Designer**: Design work and creative design projects
- **Graphics**: Creating graphics and visual designs
- **Product UI/UX**: Product design, UI/UX, user interface, and user experience
- **SEO** (⚙️): SEO, content strategy, keyword research
- **Learning** (📚): Education and learning

### Category Selection Guidelines
When adding categories to prompts, select categories that accurately represent the prompt's purpose:

- **Designer**: Use for prompts related to design work, creative design projects, visual design, branding, and design thinking
- **Product UI/UX**: Use for prompts related to product design, user interface design, user experience, wireframing, prototyping, and UX research
- **Illustration**: Use for prompts that create illustrations, visual artwork, drawings, and artistic visuals
- **Graphics**: Use for prompts that create graphics, visual designs, infographics, and graphic elements
- **Images**: Use for all image generation prompts (this is the primary category for image prompts)
- **Portraits**: Use specifically for portrait photography, selfies, and people-focused image prompts

**Important**: Prompts can have multiple categories. For example:
- A prompt for creating a logo design should include both `designer` and `graphics`
- A prompt for UI mockups should include `product-uiux` and `designer`
- A prompt for illustration work should include `illustration` and `images`

### Prompt Data Model
Each prompt includes:
- **Metadata**: Title, description, categories, tags, author
- **Content**: Actual prompt text with placeholders
- **Media**: Optional images/videos
- **Classification**: Type (text/image/video), difficulty level
- **SEO**: URL slug, creation/update dates
- **Engagement**: Views, likes (optional)

## Development Guidelines

### Adding New Prompts
1. Create Markdown file in `src/content/prompts/`
2. Include required frontmatter (title, description, categories, etc.)
3. Add actual prompt text with [PLACEHOLDERS] for variables
4. Place related media in appropriate `public/` subdirectories
5. Follow naming convention: `kebab-case.md`

### Code Standards
- TypeScript for all code
- ESLint configuration enforced
- Tailwind for styling
- Component composition over inheritance
- Server/client separation for data fetching

### Content Standards
- Clear, specific, and well-tested prompts
- Proper categorization and tagging
- Original content or significant improvements
- Consistent formatting and structure

## Key Files to Understand

### Configuration
- `package.json`: Dependencies and scripts
- `next.config.ts`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS customization
- `tsconfig.json`: TypeScript configuration

### Core Functionality
- `src/lib/content.server.ts`: Server-side content loading
- `src/lib/prompts.ts`: Prompt utilities and categories
- `src/types/prompt.ts`: Core data type definitions
- `src/app/layout.tsx`: Root layout with SEO setup

### Components
- `src/components/prompts/prompt-card.tsx`: Individual prompt display
- `src/components/prompts/prompts-search.tsx`: Search functionality
- `src/app/prompts/submit/page.tsx`: Prompt submission form

## Build Process
1. **Pre-build**: Generate authors data (`scripts/generate-authors-data.js`)
2. **Build**: Next.js static generation
3. **Deploy**: Vercel (primary) or Cloudflare Pages

## Environment Variables
- `NEXT_PUBLIC_SITE_URL`: Site URL for SEO
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: Google Analytics tracking ID

This project focuses on providing high-quality, curated AI prompts in an accessible, searchable format while maintaining excellent user experience and technical standards.