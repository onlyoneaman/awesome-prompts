export interface ChangelogEntry {
  date: string;
  version?: string;
  changes: {
    type: "added" | "fixed" | "improved" | "changed";
    description: string;
  }[];
}

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-01-03",
    changes: [
      {
        type: "added",
        description: "Sorting functionality for prompts - sort by newest, oldest, difficulty (easiest/hardest), or alphabetically"
      },
      {
        type: "added",
        description: "Custom request CTA component for users to request custom prompts"
      },
      {
        type: "added",
        description: "Request prompt page with form submission"
      },
      {
        type: "added",
        description: "Popular prompts section on homepage"
      },
      {
        type: "added",
        description: "Changelog page to track updates"
      },
      {
        type: "improved",
        description: "Mobile responsiveness for sorting and filtering components"
      },
      {
        type: "improved",
        description: "Better organization of prompt components for reusability"
      },
      {
        type: "improved",
        description: "Difficulty star size and color adjustments in prompt utilities"
      },
      {
        type: "changed",
        description: "Refactored submit page component and removed redundant UI code"
      },
      {
        type: "added",
        description: "Glean Prompt Library link to footer resources"
      },
      {
        type: "added",
        description: "Multiple new image prompts including portraits, street photography, and product photography"
      }
    ]
  },
  {
    date: "2025-12-18",
    changes: [
      {
        type: "added",
        description: "Reference image support for prompts"
      },
      {
        type: "added",
        description: "New modern advertisement and product photography prompts"
      }
    ]
  },
  {
    date: "2025-12-17",
    changes: [
      {
        type: "added",
        description: "3D caricature stylized prompts"
      },
      {
        type: "added",
        description: "Stylish photoshoot collage prompts for urban themes"
      }
    ]
  },
  {
    date: "2025-12-15",
    changes: [
      {
        type: "added",
        description: "Nighttime flash photography prompts with 2000s vibe"
      },
      {
        type: "added",
        description: "Sunny outdoor lifestyle portrait prompts"
      },
      {
        type: "added",
        description: "Edit photo aesthetic modern prompts"
      }
    ]
  },
  {
    date: "2025-12-08",
    changes: [
      {
        type: "added",
        description: "Retro and hyper-realistic prompt styles"
      },
      {
        type: "improved",
        description: "Prompt creation workflow documentation"
      }
    ]
  },
  {
    date: "2025-10-09",
    changes: [
      {
        type: "added",
        description: "Low-angle urban street portrait prompts"
      },
      {
        type: "improved",
        description: "Image prompt display and organization"
      }
    ]
  },
  {
    date: "2025-10-04",
    changes: [
      {
        type: "added",
        description: "New portrait and photography prompt categories"
      },
      {
        type: "improved",
        description: "Category page layout and navigation"
      }
    ]
  },
  {
    date: "2025-09-29",
    changes: [
      {
        type: "fixed",
        description: "Build issues and navigation back button"
      },
      {
        type: "fixed",
        description: "Toast notifications close button"
      }
    ]
  },
  {
    date: "2025-09-28",
    changes: [
      {
        type: "added",
        description: "Prompts for creating pictures with public figures"
      },
      {
        type: "added",
        description: "Fashion editorial, solarized silhouette, and x-ray scan prompts"
      },
      {
        type: "improved",
        description: "Expression variations in prompts"
      }
    ]
  },
  {
    date: "2025-09-19",
    changes: [
      {
        type: "added",
        description: "Mechanical object and mini commercial figure prompts"
      }
    ]
  },
  {
    date: "2025-09-14",
    changes: [
      {
        type: "added",
        description: "Elite equity research analyst prompt"
      },
      {
        type: "added",
        description: "Chibi scene prompts"
      },
      {
        type: "improved",
        description: "Simplified prompt structure"
      }
    ]
  },
  {
    date: "2025-09-11",
    changes: [
      {
        type: "added",
        description: "Open in Claude functionality"
      },
      {
        type: "added",
        description: "Better prompt copilot integration"
      }
    ]
  },
  {
    date: "2025-08-30",
    changes: [
      {
        type: "added",
        description: "Better Prompt Copilot integration"
      },
      {
        type: "added",
        description: "Author attribution (Yashvi)"
      }
    ]
  },
  {
    date: "2025-08-20",
    changes: [
      {
        type: "added",
        description: "Crayon painting prompts"
      },
      {
        type: "added",
        description: "Dramatic thumbnail prompts"
      },
      {
        type: "added",
        description: "Persona adapter prompts"
      }
    ]
  },
  {
    date: "2025-08-15",
    changes: [
      {
        type: "added",
        description: "Markdown preview and formatting"
      },
      {
        type: "improved",
        description: "Prompt content display and readability"
      }
    ]
  },
  {
    date: "2025-08-12",
    changes: [
      {
        type: "added",
        description: "AI Wealth Creation Exploration prompt"
      },
      {
        type: "improved",
        description: "Minimal surreal ad image prompts"
      }
    ]
  },
  {
    date: "2025-08-02",
    changes: [
      {
        type: "added",
        description: "Image and video prompt support"
      },
      {
        type: "added",
        description: "Realistic cinematic portrait prompts"
      },
      {
        type: "added",
        description: "Candid lifestyle photography prompts"
      },
      {
        type: "added",
        description: "Product ad video prompts"
      },
      {
        type: "added",
        description: "LLM prompt generator and formatting"
      },
      {
        type: "added",
        description: "llms.txt support"
      },
      {
        type: "improved",
        description: "Base URL configuration and keywords"
      }
    ]
  },
  {
    date: "2025-07-31",
    changes: [
      {
        type: "improved",
        description: "Footer navigation and links"
      },
      {
        type: "added",
        description: "External resource links"
      }
    ]
  },
  {
    date: "2025-07-30",
    changes: [
      {
        type: "added",
        description: "Prompt search functionality"
      },
      {
        type: "improved",
        description: "Search results display and filtering"
      }
    ]
  },
  {
    date: "2025-07-29",
    changes: [
      {
        type: "improved",
        description: "Homepage design and layout"
      },
      {
        type: "added",
        description: "Featured prompts section"
      }
    ]
  },
  {
    date: "2025-07-27",
    changes: [
      {
        type: "added",
        description: "Initial web application setup with Next.js and Cloudflare Pages"
      },
      {
        type: "added",
        description: "Full-screen image view for prompt images"
      },
      {
        type: "added",
        description: "Markdown preview for prompt content"
      },
      {
        type: "added",
        description: "Category pages and navigation"
      },
      {
        type: "added",
        description: "Author pages and profiles"
      },
      {
        type: "added",
        description: "Image prompt support and display"
      },
      {
        type: "added",
        description: "Submit form for prompt contributions"
      },
      {
        type: "added",
        description: "SEO optimization and keyword research"
      },
      {
        type: "added",
        description: "Shadcn UI components integration"
      },
      {
        type: "added",
        description: "Footer with navigation and resources"
      }
    ]
  }
];

