---
description: Scaffold a new component (shared or domain-scoped) with co-located test
argument-hint: <ComponentName> [shared|<domain>]
---

Scaffold a new component for: **$ARGUMENTS**

## Decide placement

- If the second token is `shared` (or omitted and the component is generic): create under `src/shared/components/<kebab-name>/`.
- If the second token names a domain (e.g. `posts`, `journey`, `lens`): create under `src/domains/<domain>/components/<kebab-name>/`.

## Conventions

- Folder name: kebab-case
- Component file: `index.tsx`
- Test file: `__tests__/<kebab-name>.test.tsx` next to consumers (shared → `<kebab-name>.test.tsx` alongside), or domain `__tests__/`
- Always export a **named** function: `export function ComponentName(...) {}`
- Add `'use client'` ONLY if the component uses state, effects, or browser APIs

## Steps

1. Create the component folder + `index.tsx` scaffold:

```tsx
import { clsx } from 'clsx';

interface <ComponentName>Props {
  className?: string;
}

export function <ComponentName>({ className }: <ComponentName>Props) {
  return <div className={clsx('', className)} />;
}
```

2. Create a co-located test:

```tsx
import { render } from '@testing-library/react';

import { <ComponentName> } from '<correct-import-path>';

describe('<ComponentName>', () => {
  it('renders without crashing', () => {
    const { container } = render(<<ComponentName> />);
    expect(container).toBeTruthy();
  });
});
```

3. If shared: append the export to `src/shared/components/index.ts`.
4. Run `pnpm test -- <kebab-name>` to confirm it passes.
5. Run `pnpm check-types` to verify TypeScript.

## Things to NOT do

- Do not add `'use client'` reflexively — check if the component truly needs it.
- Do not use `import clsx from 'clsx'` — use the **named** import.
- Do not place generic UI under `src/domains/` — those are feature-specific.
