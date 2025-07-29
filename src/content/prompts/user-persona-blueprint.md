---
title: "User Persona Blueprint"
description: "A prompt that helps you create a user persona blueprint"
categories: ["user", "persona", "blueprint"]
tags: ["user", "persona", "blueprint"]
author: "aman"
difficulty: "advanced"
featured: true
use_cases: ["user", "persona", "blueprint"]
created_at: "2025-07-30"
updated_at: "2025-07-30"
---

You are a senior conversation analyst.

## Objective  
Distill everything you know about **this user** into a compact JSON profile that future AI systems can load to emulate their preferred style, tone, and needs.

---

## Data Source  
Rely on:  
1. Memory of all past interactions with the user.  
2. Any explicit metadata provided by the platform.  
3. Implicit cues (e.g., writing style, timing, feedback).

---

## Analysis Workflow (think step‑by‑step)

1. **Scan & Collect**  
   - Aggregate recurring phrases, formatting quirks, and feedback signals.  
   - Note domain expertise, work history, and personal interests.

2. **Synthesize Across Dimensions**  
   Evaluate the user along these axes:  
   - *Identity & Context* (demographics, role, goals)  
   - *Communication Preferences* (tone, length, structure, medium)  
   - *Cognitive Style* (reasoning depth, learning approach, decision drivers)  
   - *Technical Competence* (languages, frameworks, domain mastery)  
   - *Emotional Patterns* (patience level, motivation triggers, sensitivities)  
   - *Topic Landscape* (recurring themes, niche obsessions, avoided areas)  
   - *Interaction Metrics* (avg. message length, reply latency, correction frequency)  
   - *Constraints & Requirements* (budget, deadlines, compliance, privacy)  

3. **Contrast & Calibrate**  
   - Flag behaviors that diverge from typical users (e.g., unusually terse or data‑obsessed).  
   - Identify missing data points worth clarifying in future sessions.

4. **Format Output**  
   Emit **only** the JSON below—no extra commentary.

---

## JSON Schema

```json
{
  "user_profile": {
    "identity": {
      "role": "",
      "demographics": "",
      "primary_goals": ""
    },
    "communication_preferences": {
      "tone": "",
      "length": "",
      "structure": "",
      "formatting": "",
      "visual_aids": "",
      "humor_style": ""
    },
    "cognitive_style": {
      "reasoning_depth": "",
      "decision_frameworks": "",
      "learning_mode": "",
      "confidence_threshold": ""
    },
    "technical_competence": {
      "primary_stack": [],
      "secondary_skills": [],
      "expertise_level": ""
    },
    "emotional_patterns": {
      "patience_level": "",
      "motivation_triggers": "",
      "stress_indicators": ""
    },
    "topic_landscape": {
      "core_interests": [],
      "emerging_interests": [],
      "off_limits": []
    },
    "constraints": {
      "time_zone": "",
      "budget": "",
      "deadlines": "",
      "compliance": ""
    },
    "interaction_metadata": {
      "avg_message_length": 0,
      "avg_response_time_sec": 0,
      "correction_rate": 0.0
    },
    "insight_notes": {
      "distinctive_behaviors": "",
      "optimization_tips": "",
      "open_questions": ""
    }
  }
}