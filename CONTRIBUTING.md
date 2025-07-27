# 🤝 Contributing to Awesome Prompts

Thank you for your interest in contributing to Awesome Prompts! This document provides guidelines and instructions for contributing to our open-source collection of AI prompts.

## 🌟 Ways to Contribute

### 1. Submit New Prompts
- Add high-quality, tested prompts to our collection
- Ensure prompts are original or significantly improved versions
- Follow our prompt quality standards

### 2. Improve Existing Prompts
- Enhance prompt clarity and effectiveness
- Add missing information or context
- Fix typos or formatting issues

### 3. Technical Improvements
- Fix bugs in the website
- Improve UI/UX
- Add new features
- Optimize performance

### 4. Documentation
- Improve README and documentation
- Add examples and use cases
- Translate content (future feature)

## 📝 Prompt Submission Guidelines

### Quality Standards

All prompts should meet these criteria:

- **Clear and Specific**: Instructions should be unambiguous
- **Well-Tested**: Verify the prompt works with major AI models
- **Properly Formatted**: Use consistent formatting and structure
- **Original Value**: Either original content or significant improvements
- **Appropriate Category**: Fits well within existing categories

### Prompt Structure

Each prompt should include:

```javascript
{
  title: "Clear, descriptive title",
  description: "Brief explanation of what the prompt does",
  actual_text: "The actual prompt text with [PLACEHOLDERS] for variables",
  categories: ["category1", "category2"],
  tags: ["tag1", "tag2", "tag3"],
  difficulty: "beginner" | "intermediate" | "advanced",
  use_case: "Specific use case description",
  author: "Your name (optional)"
}
```

### Writing Guidelines

1. **Use Placeholders**: Employ `[BRACKETS]` for user-replaceable content
   ```
   Good: "Write a [TONE] email about [TOPIC] for [AUDIENCE]"
   Bad: "Write a professional email about sales for customers"
   ```

2. **Be Specific**: Include context, constraints, and desired output format
   ```
   Good: "Act as a technical writer. Create a step-by-step guide for [PROCESS]. Include prerequisites, detailed steps with explanations, and troubleshooting tips. Format as numbered list with subpoints."
   Bad: "Write instructions for [PROCESS]."
   ```

3. **Test Thoroughly**: Verify prompts work well with:
   - ChatGPT (GPT-3.5/4)
   - Claude (Anthropic)
   - Gemini (Google)
   - Other major AI models when possible

## 🚀 How to Submit

### Method 1: Web Form (Recommended for Non-Developers)

1. Visit [prompts.amankumar.ai/prompts/submit](https://prompts.amankumar.ai/prompts/submit)
2. Fill out the submission form
3. Our team will review and add approved prompts

### Method 2: Pull Request (Recommended for Developers)

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/awesome-prompts.git
   cd awesome-prompts
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b add-new-prompt-category-name
   ```

3. **Add Your Prompt**
   - Create a new markdown file in `src/content/prompts/` named `your-prompt-slug.md`
   - Use the frontmatter structure shown above to define metadata
   - Add your prompt content after the frontmatter section
   - Ensure it follows the markdown format of existing prompts

4. **Test Locally**
   ```bash
   npm install
   npm run dev
   ```
   - Verify your prompt displays correctly
   - Test the copy functionality
   - Check mobile responsiveness

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add [PROMPT_TITLE] prompt for [CATEGORY]"
   ```

6. **Push and Create PR**
   ```bash
   git push origin add-new-prompt-category-name
   ```
   - Go to GitHub and create a Pull Request
   - Use our PR template (auto-loaded)
   - Provide clear description of your addition

## 🔍 Review Process

### For Prompt Submissions
1. **Quality Check**: Verify prompt meets our standards
2. **Testing**: Test with multiple AI models
3. **Category Fit**: Ensure proper categorization
4. **Duplicate Check**: Verify no similar prompts exist

### For Code Changes
1. **Code Review**: Check for quality and best practices
2. **Testing**: Ensure no breaking changes
3. **Performance**: Verify no performance regressions

### Timeline
- **Prompt Reviews**: 1-3 business days
- **Code Reviews**: 2-5 business days
- **Complex Features**: 1-2 weeks

## 📋 Pull Request Template

When creating a PR, please include:

```markdown
## Description
Brief description of your changes

## Type of Change
- [ ] New prompt addition
- [ ] Prompt improvement
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Prompt Details (if applicable)
- **Category**: 
- **Difficulty**: 
- **Tested with**: (list AI models)

## Checklist
- [ ] Follows prompt guidelines
- [ ] Tested locally
- [ ] No duplicate content
- [ ] Proper formatting
```

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type check
npm run type-check
```

### Project Structure for Contributors
```
src/
├── app/                    # Next.js pages
├── components/
│   ├── layout/            # Header, Footer, Layout
│   ├── prompts/           # Prompt-related components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── prompts.ts         # Main prompts data (ADD HERE)
│   └── utils.ts           # Utility functions
└── types/
    └── prompt.ts          # TypeScript types
```

## 🚫 What Not to Submit

- **Low-quality prompts**: Vague, untested, or poorly formatted
- **Duplicate content**: Similar prompts already exist
- **Inappropriate content**: Offensive, harmful, or unethical prompts
- **Promotional content**: Prompts primarily for self-promotion
- **Breaking changes**: Code changes that break existing functionality

## 📞 Getting Help

### Questions?
- 💬 [Open a Discussion](https://github.com/onlyoneaman/awesome-prompts/discussions)
- 🐛 [Report Issues](https://github.com/onlyoneaman/awesome-prompts/issues)
- 📧 Email: [your-email@example.com](mailto:your-email@example.com)

### Resources
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🏆 Recognition

Contributors will be:
- Listed in our README contributors section
- Credited in prompt attribution (if desired)
- Invited to our contributors community

## 📜 Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards other community members

## 🙏 Thank You

Every contribution, no matter how small, helps make Awesome Prompts better for everyone. Thank you for being part of our community!

---

**Happy Contributing! 🚀** 