# CLAUDE.md, raminrezaei.se

This file is read automatically by Claude Code. It captures the project context, conventions, and guardrails you must respect when working in this repo.

## Project Overview

Personal portfolio for **Ramin Rezaei** at <https://raminrezaei.se>. Public source code: <https://github.com/raminr77/raminr77.github.io>. Deployed to Vercel.

- **Framework**: Next.js **16.x** (App Router, Turbopack for dev, Webpack for production via `next build`)
- **UI**: React **19**, Tailwind CSS **4** (via `@tailwindcss/postcss`), SCSS modules
- **Lang**: TypeScript **6**
- **State / forms**: `react-hook-form`, no global store
- **Animation**: `motion` (Framer) + `gsap` + `animate.css` (via `animator` helper)
- **Markdown**: blog posts in `/posts/*.md` (gray-matter + markdown-to-jsx)
- **Testing**: Jest **30** + `@testing-library/react` (unit) + Playwright (E2E)
- **Monitoring**: Sentry + Vercel Speed Insights
- **Package manager**: **pnpm 11**: never use `npm` or `yarn` here. [ current pnpm version pnpm@11.5.3]

## Architecture

```
src/
├── app/                       Next.js App Router (server-first)
│   ├── api/                   Route handlers
│   ├── layout.tsx             Root layout (Server Component)
│   └── <route>/page.tsx       Each route forwards to a domain page
├── domains/                   Feature-vertical code, each owns:
│   ├── <feature>/
│   │   ├── index.tsx          Page entry (often 'use client')
│   │   ├── components/        Feature-scoped components
│   │   ├── __tests__/         Co-located Jest tests
│   │   └── helper/, services/, constants/
├── layout/                    Cross-page layout pieces (header, cookies, scripts)
├── shared/                    Cross-feature utilities
│   ├── components/            Generic UI (Button, TextInput, …)
│   ├── helpers/               Pure functions
│   ├── hooks/                 Generic React hooks
│   ├── services/              External API clients (email, recaptcha)
│   ├── types/                 Shared type defs
│   └── api/constants/         Endpoint URLs
├── data/                      Static content (about-me, projects, recommendations)
└── posts/                     Blog posts (markdown, repo root)
```

**Path alias**: `@/*` → `src/*` (see `tsconfig.json`).

## Critical Conventions

### Server vs Client Components

- **Default to Server Components.** Add `'use client'` only when you need state, effects, browser APIs, or event handlers.
- **`next/dynamic` with `ssr: false` is forbidden in Server Components** (Next 16). Either drop `ssr: false` and rely on the leaf `'use client'` boundary, or wrap in a small client wrapper.
- **`React.lazy` must never be used in Server Components.** Use `next/dynamic` instead.

### Imports

- Use the path alias: `import { Button } from '@/shared/components'`: never relative `../../..` across domain boundaries.
- `clsx` is imported as a **named** import: `import { clsx } from 'clsx'`. Do not switch to default.
- Prettier sorts imports via `@trivago/prettier-plugin-sort-imports`: let it format; do not hand-order.

### Styling

- Prefer Tailwind utility classes.
- Use SCSS modules (`*.module.scss`) for complex per-component styles (animations, pseudo-elements).
- Global styles live in `src/app/globals.scss` only.
- Animation helpers go through `animator({ name, speed, delay, repeat })` from `@/shared/helpers`: produces `animate__*` classes.

### Forms

- All forms use `react-hook-form`. Validation via inline `rules` / `register` options.
- Submit handlers must be wrapped in `void handleSubmit(onSubmit)(event)`: do **not** add `eslint-disable @typescript-eslint/no-misused-promises`.

### Analytics

- Track via `useTrack(payload)` from `@/shared/hooks` for stable callbacks, or `sendGTMEvent` for one-off cases.
- All event keys live in `src/shared/constants/gtm-events.ts`: add new ones there, never hardcode strings.

### Performance Rules

- Server-side post parsing is cached at module level (`allPostsCache` in `get-posts.ts`). Tests call `__resetPostsCacheForTests()` in `beforeEach`.
- `PerformanceObserver` registrations are idempotent, never call `monitorWebVitals()` outside the singleton.
- Add new heavy packages to `next.config.ts` → `experimental.optimizePackageImports`.

### Security

- **Never** read `process.env.NEXT_PUBLIC_*` for secrets, anything prefixed `NEXT_PUBLIC_` ships to the client.
- reCAPTCHA secret is `GOOGLE_RECAPTCHA_SECRET_KEY` (server-only).
- `dangerouslyAllowSVG` is **disabled** in `next/image` config, SVGs are imported as React components via `@svgr/webpack`.

## Non-negotiable Coding Rules

These apply to every change you make in this repo. They override personal style preferences.

### Performance first

- Performance is a first-class concern, not an afterthought. Before reaching for `useEffect` / `useState` / a new client component, ask: "can this be a Server Component? Can this be derived at render time? Can this run once instead of on every render?"
- Keep `'use client'` boundaries as small and as deep in the tree as possible. Wrap only the interactive leaf, never a whole page.
- Don't ship work to the client that can be done at build time (static data, markdown parsing, route metadata).
- Memoize expensive computations with `useMemo`; memoize callbacks passed to child components with `useCallback`. But don't memoize trivially-cheap things, that adds noise without benefit.
- Every observer (`IntersectionObserver`, `ResizeObserver`, `PerformanceObserver`, …) and every `addEventListener` must have a matching teardown in the cleanup. Singletons must be idempotent (guard with a flag).
- Images go through `next/image` with explicit `width`/`height` (or `fill`) and a meaningful `alt`. Above-the-fold images get `fetchPriority="high"`.
- New heavy dependencies must be added to `experimental.optimizePackageImports` in `next.config.ts`.

### Clean code

- Functions and components do one thing. If a function description needs the word "and", split it.
- Prefer pure functions and early returns. Avoid deep nesting (`if (a) { if (b) { ... } }`), invert the condition and return early.
- Dead code is deleted, not commented out. Unused imports, variables, and props are removed.
- Magic numbers and magic strings become named constants. Group constants near their use or under `src/shared/constants/` if they're shared.
- No silent `catch` blocks. Either handle the error meaningfully, rethrow, or report it (Sentry / `notify`).
- Don't add comments that restate the code. Add comments only when the **why** is non-obvious (a workaround, a hidden constraint, an intentional non-pattern).

### TypeScript, types everywhere

- **Every** variable, parameter, and return value has a correct type. Lean on inference for locals, but never leave a function signature unannotated.
- **Never** use `any`. Use `unknown` at boundaries and narrow before use. If you truly need `any`, add a `// eslint-disable-next-line` with a one-line justification, and expect the reviewer to push back.
- Avoid type assertions (`as Foo`) unless the alternative is impossible. Prefer narrowing predicates (`is Foo`).
- Use `interface` for object shapes that describe a contract (props, public API responses, domain entities). Use `type` for unions, intersections, mapped types, and aliases of primitives.
- Discriminated unions over optional flags whenever the state space is finite.
- `Readonly<...>`, `as const`, and `ReadonlyArray<...>` for data that must not be mutated.

### Component props pattern (project standard)

Every component must declare its props as a **named `interface`** above the component. Always. No inline `{ ... }: { foo: string }`, no `type Props = {}`, no anonymous shapes.

```tsx
// ✅ Correct, follow this everywhere
interface PostCardProps {
  data: PostMetadata;
  className?: string;
  animationDelay?: number;
  disabledAnimation?: boolean;
}

export function PostCard({
  data,
  className,
  animationDelay = 0,
  disabledAnimation = false
}: PostCardProps) {
  // ...
}
```

```tsx
// ❌ Wrong, inline anonymous shape
export function PostCard({ data }: { data: PostMetadata }) {}

// ❌ Wrong, type alias instead of interface for plain props
type PostCardProps = { data: PostMetadata };
```

Naming: `<ComponentName>Props`. If the component is exported, the interface is co-located in the same file (no need to export it unless a consumer needs it).

### Naming, full words, always

- **Never** use single-letter variables. Not `e`, `i`, `j`, `k`, `m`, `n`, `p`, `s`, `t`, `x`, `y`, `cb`, `fn`. Spell them out: `event`, `index`, `pixelIndex`, `pageIndex`, `mapItem`, `pointer`, `callback`, `handler`.
- The only exceptions are mathematical contexts where the single letter is genuinely conventional and unambiguous (`x`/`y` for canvas coordinates, `dx`/`dy` for deltas inside a tight numeric block).
- Booleans start with `is`/`has`/`should`/`can` (`isActive`, `hasAnimated`, `shouldRender`).
- Event handlers start with `handle` for the implementation, `on` for the prop (`handleClick` defined locally, passed as `onClick={handleClick}`).
- Avoid abbreviations: `recommendation` not `rec`, `category` not `cat`, `description` not `desc`.

### Writing style, sound like a human, not an LLM

Anything you write that a human reads, comments, commit messages, PR descriptions, error messages, documentation, blog snippets, even chat responses, must read like it was written by an experienced engineer, not generated by an AI.

Concretely:

- Be direct. Skip filler ("It's worth noting that…", "In essence…", "Let's dive into…", "Certainly!", "I'd be happy to…").
- Skip the marketing voice. No "robust", "seamless", "powerful", "leverage", "unlock", "delve", "intricate", "tapestry", "ensure".
- No emoji unless the user used them first or asked for them.
- No reflexive bullet-listing every sentence. Use prose when prose fits; use lists only when items are genuinely parallel.
- Don't restate the obvious. If a function is named `getPosts`, the comment doesn't say "this gets posts".
- Vary sentence length. Short sentences punctuate. Longer ones connect ideas.
- When you're uncertain, say so plainly ("I'm not sure" / "haven't verified"). Don't bluff.
- When you summarize a change, describe the **why** and the **shape** of the change, not a list of every line touched.

If a sentence sounds like a chatbot wrote it, rewrite it.

## Workflows

### Before claiming work is done

Always run, in order:

```bash
pnpm check-all   # prettier + eslint --max-warnings=0 + tsc --noEmit
pnpm test        # 199+ unit tests
pnpm build       # full production build
```

E2E tests (`pnpm test:e2e`) require Playwright browsers installed (`pnpm test:e2e:install`).

### Adding a new blog post

1. Create `posts/post-NN.md` (zero-padded id ≤ 9, e.g. `post-09.md`).
2. Front-matter must include: `id`, `title`, `slug`, `description`, `category`, `tags`, `date`, `isActive`, `author`.
3. Run `pnpm test src/shared/helpers/posts` to confirm `getPosts` picks it up.

### Adding a new page

1. Add `src/app/<route>/page.tsx` (server component) re-exporting from `src/domains/<feature>/index.tsx`.
2. Update `src/shared/constants/routes.ts` and the menu in `src/shared/constants/index.ts`.
3. Add an E2E spec under `e2e/` if the page has interactions.

### Adding a new component

- **Generic / reusable** → `src/shared/components/<name>/index.tsx`, register in `src/shared/components/index.ts`.
- **Feature-specific** → `src/domains/<feature>/components/<name>/index.tsx`.
- Co-locate tests in `__tests__/` next to the consumer.

## Commit & PR

- Commit messages: short, imperative, lower-case prefix (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`).
- The Husky pre-commit runs lint-staged → prettier + eslint on staged files. Don't bypass with `--no-verify` unless explicitly asked.
- Do not commit unless the user explicitly asks ("commit this", "create a PR"). When in doubt, summarize the diff and wait.

## Known Debt (kept out of scope until asked)

See `~/.claude/projects/-Users-ramrez-Projects-raminr77-github-io/memory/project-audit-may-2026.md` for the latest audit list. Most-relevant deferred items:

- **React Compiler** not enabled, needs `babel-plugin-react-compiler`.
- **animate.css** is still global, `animator` helper depends on it.
- **CSP header** not yet strict, inline GTM scripts would need nonces.
- **Pagination labels** still read from `GENERAL_SITE_DATA` directly (tree-shaking handles it for now).

## Where to find help

- Slash commands: `.claude/commands/` (try `/check`, `/new-post`, `/audit-perf`, …)
- Custom subagents: `.claude/agents/` (`nextjs-reviewer`, `test-writer`, `perf-auditor`, `a11y-reviewer`)
- Memory (across sessions): `~/.claude/projects/-Users-ramrez-Projects-raminr77-github-io/memory/`
