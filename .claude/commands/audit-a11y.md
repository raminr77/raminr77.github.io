---
description: Accessibility audit — semantic HTML, aria, keyboard, contrast risks
allowed-tools: Bash(grep:*), Bash(rg:*), mcp__plugin_context-mode_context-mode__ctx_batch_execute, Read
---

Run an accessibility (WCAG 2.2 AA) audit. Use the `a11y-reviewer` subagent if available; otherwise execute this checklist.

## Checklist

### Semantic HTML

- Find `<div onClick>` / `<span onClick>` that lack `role="button"` + `tabIndex={0}` + keyboard handler. Flag each.
- Find buttons missing `type` attr (default is `submit` inside forms — frequent source of accidental submissions).

### ARIA & labels

- `<Image>` and `<img>` must have non-empty `alt`. Decorative images should have `alt=""`.
- Form inputs (`<input>`, `<textarea>`, `<select>`) must be associated with a `<label htmlFor>` or have `aria-label` / `aria-labelledby`.
- Modal / dialog containers should have `role="dialog"`, `aria-modal="true"`, and an accessible name (`aria-label` or `aria-labelledby`).
- Icon-only buttons need `aria-label`.

### Keyboard

- `tabIndex` values: never positive numbers (use 0 or -1).
- Focus traps in modals: verify the lens gallery modal and any future modal don't strand keyboard users.
- Skip-to-content link present? (Currently missing — flag it as enhancement.)

### Landmarks

- Single `<main>` per page (server-side default would be enough; flag if multiple).
- Header / footer / nav landmarks present.

### Color contrast (heuristic)

- Grep for `text-white/40`, `text-white/50`, `text-slate-300/40` — anything under 50% opacity on a varied background is risky. Spot-check vs. background.

### Motion preference

- Components with continuous animation must check `prefers-reduced-motion`. `ProgressBar` already does — verify `DecryptedText`, `CustomCursor`, `PixelCanvas` honor it too.

### Language

- `<html lang="en">` is set in `src/app/layout.tsx`. If the optional `[locale]` route group goes live, the html lang must be dynamic.

## Output

Group findings by severity. For each: file:line + 1-line fix suggestion. End with how many findings vs. how many checks passed.

Do not auto-fix.
