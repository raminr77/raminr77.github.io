---
description: Scaffold a new blog post markdown file in /posts with correct frontmatter
argument-hint: <slug-or-title>
---

Scaffold a new blog post at `posts/post-NN.md` for: **$ARGUMENTS**

## Steps

1. List existing posts with `ls posts/` to find the next available id (`post-01.md`, `post-02.md`, …). Zero-pad ids ≤ 9.
2. Ask the user for any missing detail you need:
   - Title (default: prettify $ARGUMENTS)
   - Category (existing: scan posts for current categories)
   - Tags (comma-separated)
   - Description (1–2 sentences)
3. Create `posts/post-NN.md` with this frontmatter (today's date in ISO):

```markdown
---
id: <NN>
slug: <kebab-case-slug>
title: <Title Case>
description: <one-paragraph description>
category: <category>
tags:
  - <tag1>
  - <tag2>
date: <YYYY-MM-DD>
isActive: false
author: Ramin
---

<!-- write your post body here in Markdown -->
```

4. Set `isActive: false` by default so the user can preview before publishing.
5. Run `pnpm test src/shared/helpers/posts/get-posts.test.ts` to confirm the parser still works.
6. Print the file path and remind the user to flip `isActive: true` when ready.
