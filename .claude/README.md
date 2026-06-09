# .claude/, Claude Code workspace for raminrezaei.se

This folder contains everything Claude Code needs to work on this repo predictably: project context, allowed permissions, reusable slash commands, and specialized subagents.

## What's in here

```txt
.claude/
├── README.md                 (this file)
├── settings.json             Shared, committed: permissions, hooks, env
├── settings.local.json       Personal, gitignored: extra perms for the current dev
├── commands/                 Slash commands (`/check`, `/new-post`, …)
└── agents/                   Custom subagents (review, test, perf, a11y, …)
```

The project root also has a **`CLAUDE.md`** that is loaded automatically at the start of every Claude Code session.

---

## Slash commands

All under `.claude/commands/`. Invoke with `/<name>` in the prompt.

| Command            | Purpose                                                                     |
| ------------------ | --------------------------------------------------------------------------- |
| `/check`           | Run `pnpm check-all` + `pnpm test` and report pass/fail.                    |
| `/pre-merge`       | Full pre-merge gate: format · lint · types · unit tests · production build. |
| `/new-post <slug>` | Scaffold `posts/post-NN.md` with correct frontmatter.                       |
| `/new-component`   | Scaffold a shared or domain-scoped component + co-located test.             |
| `/new-page <name>` | Scaffold a new App Router page, domain folder, route constant, E2E spec.    |
| `/audit-perf`      | Performance audit, RSC boundary, bundle, observers, images, caching.        |
| `/audit-a11y`      | Accessibility audit (WCAG 2.2 AA), semantics, ARIA, keyboard, contrast.     |
| `/bundle-analyze`  | Run `pnpm build:analyze` and summarize the chunk report.                    |
| `/add-test <path>` | Write Jest tests for the given file/function/component.                     |
| `/e2e [pattern]`   | Run the Playwright suite (optionally filtered by `--grep`).                 |
| `/update-deps`     | Show outdated packages + upgrade-risk assessment (no install).              |

Read each `.md` file under `commands/` for the full prompt the command sends.

---

## Subagents

All under `.claude/agents/`. Invoked automatically by Claude when the task matches their description, or explicitly via the Agent tool.

| Agent               | When to use                                                                            |
| ------------------- | -------------------------------------------------------------------------------------- |
| `nextjs-reviewer`   | Code review for Next.js 16 App Router + React 19 patterns (after any UI/page change).  |
| `test-writer`       | Author Jest unit / RTL component / Playwright E2E tests following project conventions. |
| `perf-auditor`      | Performance audits, bundle, CWV, RSC boundary, observer leaks.                         |
| `a11y-reviewer`     | WCAG 2.2 AA review, semantic HTML, ARIA, keyboard, contrast.                           |
| `domain-architect`  | Decide where new code lives, `shared/` vs `domains/<feature>/`. Plan folder structure. |
| `markdown-curator`  | Curate blog posts in `/posts`, frontmatter, slugs, SEO, markdown rendering.            |
| `security-reviewer` | Security posture, env exposure, headers, XSS, CORS, recaptcha, dep CVEs.               |

Each agent's `.md` file in `agents/` includes its model preference (`opus` for deep review, `sonnet` for execution) and its strict scope.

---

## Settings

### Shared (`settings.json`, committed)

- **Permissions**: pre-approves project tooling (`pnpm check-all`, `pnpm test`, `pnpm format`, `git status/diff/log`) and the MCP servers the team uses (`context-mode`, `codebase-memory`, `context7`).
- **Denies**: blocks destructive ops (`git commit`, `git push`, `rm -rf`, `npm install`, `yarn`) and reading/writing `.env*` files.
- **Env**: `NEXT_TELEMETRY_DISABLED=1` so Next doesn't ping home during dev.

### Personal (`settings.local.json`, gitignored)

Drop anything specific to your machine here, extra Bash patterns, model overrides, etc. The file is gitignored by Next's default `.gitignore`.

---

## How sessions usually flow

1. **Start**: Claude reads root `CLAUDE.md` and `.claude/settings.json`.
2. **Discover**: When the user asks for code-related work, Claude defers to `codebase-memory-mcp` tools first (per the user's global hook).
3. **Execute**: Heavy tooling output is kept out of context via `context-mode-mcp` (`ctx_batch_execute`, `ctx_execute_file`). Source edits use native `Read` / `Edit` / `Write`.
4. **Verify**: Before claiming a task done, Claude runs `/check` (or `/pre-merge` for shippable work).
5. **Commit**: Only when the user explicitly asks. Commit messages follow the project convention (short, imperative, lowercased prefix: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`).

---

## Memory (persistent across sessions)

Long-lived facts about this project live at:

```txt
~/.claude/projects/-Users-ramrez-Projects-raminr77-github-io/memory/
├── MEMORY.md                       Index (always loaded)
├── project-overview.md             Stack, paths, services
├── project-audit-apr-2026.md       April 2026 audit (security + bug fixes)
└── project-audit-may-2026.md       May 2026 audit (perf + clean-code)
```

When you onboard a new contributor, point them at the memory dir + this README.

---

## Maintenance

- When you add/remove dependencies, also update `experimental.optimizePackageImports` in `next.config.ts` (the `perf-auditor` checks this).
- When you add a new feature folder, the `domain-architect` agent enforces placement rules, invoke it for the design before writing code.
- When you add a new top-level route, run `/new-page` so the routes constant, menu entry, and E2E spec stay in sync.
