---
description: Scaffold a new App Router page + domain folder + route + menu entry
argument-hint: <kebab-route-name>
---

Scaffold a new top-level page for route: **/$ARGUMENTS**

## Steps

1. **Server-side route entry**: create `src/app/<route>/page.tsx`:

```tsx
import type { Metadata } from 'next';

import { <PascalName>Page } from '@/domains/<route>';

export const metadata: Metadata = {
  title: '<Title>',
  description: '<page description>'
};

export default function Page() {
  return <<PascalName>Page />;
}
```

2. **Domain entry**: create `src/domains/<route>/index.tsx`:

```tsx
import { ContentContainer } from '@/layout/components';
import { PageHeader } from '@/shared/components';

export function <PascalName>Page() {
  return (
    <ContentContainer>
      <PageHeader title="<Title>" />
      {/* page content */}
    </ContentContainer>
  );
}
```

3. **Domain components folder**: create `src/domains/<route>/components/` directory (empty for now).

4. **Routes constant**: append to `src/shared/constants/routes.ts`:

```ts
<UPPER_NAME>: '/<route>',
```

5. **Menu entry (optional)**: if the page is in the main menu, add to `MENU_ITEM_ROUTES` in `src/shared/constants/index.ts`.

6. **E2E spec (recommended)**: create `e2e/<route>.spec.ts` with a basic navigation check:

```ts
import { test, expect } from '@playwright/test';

test('<route> page loads', async ({ page }) => {
  await page.goto('/<route>');
  await expect(page.getByRole('heading', { name: '<Title>' })).toBeVisible();
});
```

7. Run:
   - `pnpm check-types`
   - `pnpm build` (verifies the route registers)
   - Print the route at `/` + path.

## Things to NOT do

- Do not put page UI directly inside `src/app/<route>/page.tsx`: keep `app/` thin and forward to the domain.
- Do not hardcode the route path string elsewhere, always reference `ROUTES.<NAME>`.
