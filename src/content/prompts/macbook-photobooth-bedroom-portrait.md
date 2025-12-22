---
title: "MacBook Photo Booth Bedroom Portrait"
description: "Hyper-realistic screen simulation showing a MacBook displaying Photo Booth with a candid bedroom portrait. Features detailed screen imperfections, dark mode macOS interface, and identity-preserved subject."
categories: ["portraits", "images"]
tags: ["screen simulation", "photorealism", "macbook", "photobooth", "bedroom", "portrait", "dark mode", "nocturnal", "candid", "identity preservation"]
author: "aman"
difficulty: "intermediate"
type: "image"
images: 
  - "/images/macbook-photobooth-bedroom-portrait/macbook-photobooth-bedroom-portrait-chatgpt-1-optimized.webp"
  - "/images/macbook-photobooth-bedroom-portrait/macbook-photobooth-bedroom-portrait-gemini-1-optimized.webp"
use_cases: ["screen simulation photography", "photorealistic renders", "bedroom portraits", "candid lifestyle photography", "identity-preserved portraits"]
created_at: "2025-12-22"
updated_at: "2025-12-22"
---

```json
{
  "task_configuration": {
    "task_type": "screen_simulation_photorealism",
    "target_model": "SDXL_1.0_Refiner",
    "aspect_ratio": "3:4",
    "resolution": {
      "width": 1152,
      "height": 1536
    }
  },
  "visual_hierarchy": {
    "layer_1_physical_macro": {
      "camera_angle": "Downward-angled, high-angle",
      "framing": "MacBook screen filling 95% of frame",
      "surface_imperfections": [
        "subtle pixel-grid texture (moire)",
        "tiny dust particles on glass",
        "faint ambient light reflection on glossy screen",
        "fingerprint smudges"
      ],
      "foreground_anchor": "Thin strip of physical keyboard visible at lower edge"
    },
    "layer_2_digital_interface": {
      "theme": "Dark Mode (macOS)",
      "window_layout": {
        "right_panel": "Photo Booth live-preview window (dominant focus)"
      }
    },
    "layer_3_nested_subject_content": {
      "context": "Inside the Photo Booth window",
      "environment": "Dim bedroom, off-white wall, rumpled bedding",
      "lighting_simulation": "Cool screen glow mixed with warm skin tones, deep nocturnal shadows",
      "subjects": {
        "shared_attributes": [
          "black top",
          "Reclining pose",
          "Looking at screen"
        ],
        "subject_girl": {
          "identity_target": "uploaded_female_reference_image",
          "position": "Left/Center",
          "age": "young adult",
          "expression": "relaxed, candid, slight smile",
          "hair": {
            "color": "blonde",
            "style": "shoulder a bit long length, slightly short"
          }
        }
      }
    }
  },
  "prompt_assembly": {
    "positive_prompt": "Hyper-realistic downward shot of a MacBook screen. The screen surface has visible dust, pixel grid, and reflection. The screen displays a macOS desktop in dark mode with two windows: on the left, a dominant Photo Booth live-preview window showing a girl in a dark bedroom with an off-white wall and rumpled bedding. The girl is lying, wearing black top, grey bottom, faces fully visible and taken exactly from the uploaded reference photos. The girl is holding a iPhone 15 Pro phone in her right hand. The lighting is low-key, candid, nocturnal, with blue-ish screen glow mixed with warm skin tones and deep shadows. High fidelity, raw photo, unedited, natural noise and imperfections.",
    "negative_prompt": "vector art, screenshot, flat digital image, clean glass, perfect screen, daylight, bright studio lights, cartoon, 3d render, painting, watermark"
  },
  "identity_preservation_settings": {
    "strictness_level": "CRITICAL",
    "methodology": {
      "control_net_stack": [
        {
          "unit": "ControlNet_Tile",
          "weight": 0.4,
          "purpose": "To maintain the text/interface sharpness on the MacBook screen"
        },
        {
          "unit": "IP-Adapter_FaceID_Plus",
          "weight": 0.95,
          "region_mask": "Photo Booth Window Area Only"
        }
      ]
    }
  },
  "rendering_parameters": {
    "sampler": "DPM++ 3M SDE Exponential",
    "steps": 40,
    "cfg_scale": 5.5,
    "denoising_strength": 0.35
  }
}
```

