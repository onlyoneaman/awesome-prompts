# Changelog Workflow

## Overview
When committing or finalizing changes, always update the changelog to track updates, new features, and improvements.

## Changelog Location
- **Data file:** `src/lib/changelog-data.ts`
- **Page component:** `src/app/changelog/page.tsx` (imports from data file)

## When to Update Changelog

Update the changelog when:
- Adding new features
- Fixing bugs
- Improving existing functionality
- Making significant UI/UX changes
- Adding new prompts or content
- Refactoring code that affects user experience

## How to Update

### 1. Open the Changelog Data File
```bash
src/lib/changelog-data.ts
```

### 2. Add New Entry or Update Existing

**For today's date (if entry exists):**
- Add new change items to the existing entry's `changes` array

**For new date:**
- Add a new entry at the top of the `changelog` array (most recent first)
- Use format: `"YYYY-MM-DD"` for date
- Include all changes made on that date

### 3. Change Types

Use appropriate change types:
- **`added`** - New features, prompts, pages, functionality
- **`fixed`** - Bug fixes, error corrections
- **`improved`** - Enhancements to existing features, performance, UX
- **`changed`** - Modifications to existing behavior, refactoring

### 4. Entry Format

```typescript
{
  date: "2026-01-03",
  version?: "1.2.0", // Optional version number
  changes: [
    {
      type: "added",
      description: "Clear, concise description of what was added"
    },
    {
      type: "improved",
      description: "Description of improvement"
    }
  ]
}
```

### 5. User Confirmation

**IMPORTANT:** Always ask the user for confirmation before:
- Adding new changelog entries
- Updating existing entries
- Committing changes that include changelog updates

**Confirmation prompt example:**
```
"Should I update the changelog with these changes: [list of changes]?"
```

## Best Practices

1. **Be Specific:** Describe what changed, not just that something changed
   - ❌ "Updated prompts"
   - ✅ "Added sorting functionality for prompts - sort by newest, oldest, difficulty, or alphabetically"

2. **Group Related Changes:** Multiple related changes can be in one entry
   - Group by feature or area (e.g., all sorting-related changes together)

3. **Chronological Order:** Most recent entries at the top

4. **Consistent Formatting:** Keep descriptions concise and consistent

5. **Date Accuracy:** Use the actual date of changes, not the commit date if different

## Example Workflow

1. User requests a feature: "Add sorting to prompts"
2. Implement the feature
3. Before finalizing, ask: "Should I update the changelog with: 'Added sorting functionality for prompts'?"
4. If confirmed, add entry to `changelog-data.ts`
5. Show the updated entry for user review
6. Proceed with commit/finalization

## Changelog Structure

The changelog is displayed on `/changelog` page with:
- Date formatted as "Month Day, Year"
- Color-coded badges for change types
- Version numbers (if provided)
- Chronological listing (newest first)

