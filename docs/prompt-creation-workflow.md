# Prompt Creation Workflow

## Image Handling
- **Always check `tmp/` folder** for images when creating new prompts
- **If optimized images not present:** Run `io` command in `tmp/` directory to generate optimized `.webp` files
- **Image naming convention:**
  - `ChatGPT Image...` → `chatgpt-1`, `chatgpt-2`, etc.
  - `Gemini_Generated_Image...` → `gemini-1`, `gemini-2`, etc.
  - Unnamed images → `grok-1`, `grok-2`, etc.
  - Reference images → `reference-1`, etc.
- Move optimized `.webp` files to `public/images/[prompt-slug]/`
- Add image references to prompt frontmatter

## Reference Image Field
- Add `reference_image: true` in frontmatter when prompt requires a reference image
- UI displays subtle "Reference" badge in metadata section
- Update both `getAllPrompts()` and `getPromptBySlug()` in `src/lib/content.server.ts` when adding new fields

## Prompt File Structure
- Create markdown file in `src/content/prompts/` with kebab-case naming
- Include required frontmatter: title, description, categories, tags, author, difficulty, type
- **Description rule:** Keep descriptions concise and to the point (avoid lengthy sentences)
- Add `reference_image: true` if needed
- Add `images:` array with paths to optimized webp files

