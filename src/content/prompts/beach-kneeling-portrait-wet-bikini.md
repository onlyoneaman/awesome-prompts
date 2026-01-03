---
title: "Beach Kneeling Portrait with Wet Bikini"
description: "Identity-preserved photorealism workflow for creating beach portraits. Features a woman kneeling on wet sand at golden hour, wearing a wet bikini, with ocean waves in the background."
categories: ["portraits", "images"]
tags: ["beach", "portrait", "photorealism", "identity preservation", "bikini", "golden hour", "kneeling", "wet fabric", "ocean", "sand"]
author: "aman"
difficulty: "intermediate"
type: "image"
images: 
  - "/images/beach-kneeling-portrait-wet-bikini/beach-kneeling-portrait-wet-bikini-gemini-1-optimized.webp"
  - "/images/beach-kneeling-portrait-wet-bikini/beach-kneeling-portrait-wet-bikini-grok-1-optimized.webp"
  - "/images/beach-kneeling-portrait-wet-bikini/beach-kneeling-portrait-wet-bikini-grok-2-optimized.webp"
  - "/images/beach-kneeling-portrait-wet-bikini/beach-kneeling-portrait-wet-bikini-grok-3-optimized.webp"
use_cases: ["identity-preserved portraits", "beach photography", "lifestyle photography", "photorealistic renders", "outdoor portraits"]
created_at: "2025-12-22"
updated_at: "2025-12-22"
---

```json
{
  "node_graph_configuration": {
    "version": "4.0.1",
    "workflow_type": "Identity_Preserved_Photorealism"
  },
  "nodes": {
    "NODE_01_INPUT_LOADER": {
      "type": "LoadImage",
      "parameters": {
        "image_source": "reference_file_upload.png",
        "mask_detection": "auto_face_body"
      }
    },
    "NODE_02_IDENTITY_CONTROL": {
      "type": "IP_Adapter_Advanced",
      "inputs": {
        "image": "NODE_01_INPUT_LOADER",
        "model": "face_plus_body_v2.safetensors"
      },
      "settings": {
        "weight": 1.0,
        "noise": 0.0,
        "start_at": 0.0,
        "end_at": 1.0,
        "instruction": "100% match constraint"
      }
    },
    "NODE_03_TEXT_ENCODER_POSITIVE": {
      "type": "CLIP_Text_Encode",
      "segments": [
        {
          "id": "subject_def",
          "text": "A captivating shot of a woman with long dark hair",
          "weight": 1.2,
          "clip_layer": 1
        },
        {
          "id": "action_pose",
          "text": "kneeling on a sandy beach, kneeling posture",
          "weight": 1.1,
          "clip_layer": 1
        },
        {
          "id": "attire_desc",
          "text": "wearing a blue and white wet bikini tank top, wet fabric texture, fitted",
          "weight": 1.1,
          "clip_layer": 2
        },
        {
          "id": "lighting_atmos",
          "text": "The setting sun casts a warm glow, highlighting her features, golden hour",
          "weight": 1.0,
          "clip_layer": 2
        },
        {
          "id": "environment_detail",
          "text": "wet sand around her, reflective ground, ocean waves softly visible in background, serene beach atmosphere",
          "weight": 1.0,
          "clip_layer": 3
        }
      ]
    },
    "NODE_04_TEXT_ENCODER_NEGATIVE": {
      "type": "CLIP_Text_Encode",
      "text_string": "nsfw, deformed, blurry, bad anatomy, disfigured, low resolution, cartoon, graphic, illustration, dry sand, dull lighting, altered face, changed body structure"
    },
    "NODE_05_SAMPLER_SETTINGS": {
      "type": "KSampler",
      "parameters": {
        "seed": "random_int",
        "steps": 35,
        "cfg_scale": 7.0,
        "sampler_name": "dpmpp_2m_sde",
        "scheduler": "karras",
        "denoise": 1.0
      }
    },
    "NODE_06_FINAL_OUTPUT": {
      "type": "Image_Save",
      "metadata": {
        "prompt_string": "((100% same face and body)), A captivating shot of a woman with long dark hair, kneeling on a sandy beach. She's wearing a blue and white wet bikini tank top. The setting sun casts a warm glow, highlighting her features and the wet sand around her. The ocean waves are softly visible in the background.",
        "resolution": "1024x1536",
        "aspect_ratio": "2:3"
      }
    }
  }
}
```

