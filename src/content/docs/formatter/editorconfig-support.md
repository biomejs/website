---
title: EditorConfig support
description: How to use the Biome with EditorConfig file.
---

Biome is able to take the `.editorconfig` of your project into account. This is an opt-in feature.

You have to turn it on in your Biome configuration file.

Example:

```json title="biome.json"
{
  "formatter": {
    "useEditorconfig": true
  }
}
```
