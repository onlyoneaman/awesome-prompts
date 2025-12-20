---
title: "Export Your Brain: A Simple Way To Make Any AI 'Know You' From Day One"
description: "Reverse-engineer a precise, portable persona for AI systems. Create an Operating Manual and JSON profile so LLMs can work with you as if they already know you."
categories: ["psychology", "productivity"]
tags: ["persona", "ai", "knowledge base", "profile", "personalization", "operating manual", "portable", "integration", "llm", "context", "self-discovery", "productivity"]
author: "aman"
difficulty: "advanced"
type: "text"
use_cases: ["AI personalization", "persona creation", "knowledge base export", "LLM context", "self-discovery", "productivity optimization"]
created_at: "2025-12-19"
updated_at: "2025-12-19"
---

You are an expert integration architect and personal-knowledge engineer.

You have access to:
- our existing conversation history in this workspace, and/or
- any user context I provide in this chat.

Your task is to reverse-engineer a precise, portable persona for ME that other systems (LLMs, agents, tools) can use as a knowledge base so they can work with me as if they already know me.

### What to analyse
From everything you know about me, identify:
- stable traits (how I think, work, decide, learn)
- my technical preferences and tools
- my communication style
- patterns in projects I take on
- recurring likes / dislikes
- constraints (time, energy, money, risk tolerance)
- my current goals and directions

Ignore one-off or trivial details that don't matter long-term.

### Output format

1) First, write a concise natural-language memo:

Title: "Operating Manual: <my name or handle>"

Sections (use short bullets, not long paragraphs):
- Identity & role
- How I like to work
- How to communicate with me
- Tech & tooling preferences
- Decision-making style
- Current focus / projects
- Hard NOs / anti-preferences

Max 500 words. Be specific and confident; avoid vague language like "maybe", "might", "possibly".

2) Then output a machine-readable persona as VALID JSON only, with this exact structure:

```json
{
  "profile": {
    "name_or_handle": "",
    "summary": "",
    "location_region": "",
    "roles": []
  },
  "work_style": {
    "planning_style": "",
    "speed_vs_perfection": "",
    "collaboration_style": "",
    "typical_work_patterns": []
  },
  "communication_style": {
    "tone_preference": "",
    "detail_level": "",
    "format_preferences": [],
    "pet_peeves": []
  },
  "technical_preferences": {
    "primary_domains": [],
    "primary_stack": [],
    "tools_and_platforms": [],
    "coding_style_notes": []
  },
  "project_context": {
    "current_projects": [],
    "recurring_themes": [],
    "time_horizon": ""
  },
  "likes": {
    "content_preferences": [],
    "work_preferences": [],
    "life_preferences": []
  },
  "dislikes": {
    "content_avoid": [],
    "work_avoid": [],
    "other_avoid": []
  },
  "constraints": {
    "time": "",
    "budget": "",
    "risk_tolerance": "",
    "other_constraints": []
  },
  "goals": {
    "short_term": [],
    "long_term": [],
    "skill_development": []
  }
}
```

Constraints:
- Fill fields with concrete, high-signal information derived from our history.
- Do not invent random details; if unsure, leave an empty string "" or empty array [].
- Do NOT include sensitive identifiers (exact address, phone, IDs, etc.), even if you know them.
- Do not include any explanation outside the memo and the JSON block.

