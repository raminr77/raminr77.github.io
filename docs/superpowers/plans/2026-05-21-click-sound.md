# Click Sound Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Play `public/click.mp3` on four user interactions — desktop header menu links, More About Ramin link, Resume download button, and Contact form submit.

**Architecture:** A single `useClickSound` hook in `src/shared/hooks/` holds one `HTMLAudioElement` per component instance via `useRef`, preloads it on mount, and returns a stable `playClick` callback. Each of the four touch points imports the hook and calls `playClick()` alongside its existing `onClick`/`onSubmit` logic.

**Tech Stack:** React 19, TypeScript 6, Jest 30 + @testing-library/react

---

## File Map

| Action | Path                                                              | Responsibility                       |
| ------ | ----------------------------------------------------------------- | ------------------------------------ |
| Create | `src/shared/hooks/use-click-sound.ts`                             | Hook — Audio ref, preload, playClick |
| Create | `src/shared/hooks/use-click-sound.test.ts`                        | Unit tests for the hook              |
| Modify | `src/shared/hooks/index.ts`                                       | Barrel — add export                  |
| Modify | `src/layout/components/header/index.tsx`                          | Desktop menu link onClick            |
| Modify | `src/domains/home/components/summary/more-information-button.tsx` | More About link onClick              |
| Modify | `src/shared/components/resume-downloader-button/index.tsx`        | Resume anchor onClick                |
| Modify | `src/domains/contact-me/components/contact-form/index.tsx`        | Form onSubmit                        |

---

## Task 1: `useClickSound` hook + tests

**Files:**

- Create: `src/shared/hooks/use-click-sound.ts`
- Create: `src/shared/hooks/use-click-sound.test.ts`
- Modify: `src/shared/hooks/index.ts`

### Performance contract

- One `HTMLAudioElement` instance per component (created in `useEffect`, stored in `useRef`)
- `preload = 'auto'` — file buffered on mount, zero gap on first click
- `audio.currentTime = 0` before each `play()` — rapid clicks always replay from start
- `useCallback` with empty deps — reference never changes, children never re-render because of it
- `.catch(() => undefined)` — browser autoplay-policy rejections are silently swallowed (expected on some browsers before the first user gesture)

- [ ] **Step 1: Write failing tests**

Create `src/shared/hooks/use-click-sound.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useClickSound } from './use-click-sound';

const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockAudio = {
  preload: '',
  currentTime: 0,
  play: mockPlay
};

beforeEach(() => {
  jest.clearAllMocks();
  mockAudio.currentTime = 0;
  window.Audio = jest.fn(() => mockAudio) as unknown as typeof Audio;
});

describe('useClickSound', () => {
  it('creates an Audio element with the correct src on mount', () => {
    renderHook(() => useClickSound());
    expect(window.Audio).toHaveBeenCalledWith('/click.mp3');
  });

  it('sets preload to auto on mount', () => {
    renderHook(() => useClickSound());
    expect(mockAudio.preload).toBe('auto');
  });

  it('returns a stable playClick callback', () => {
    const { result, rerender } = renderHook(() => useClickSound());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });

  it('resets currentTime to 0 and calls play on each invocation', async () => {
    const { result } = renderHook(() => useClickSound());
    mockAudio.currentTime = 5;
    await act(async () => {
      result.current();
    });
    expect(mockAudio.currentTime).toBe(0);
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('calls play twice when invoked twice rapidly', async () => {
    const { result } = renderHook(() => useClickSound());
    await act(async () => {
      result.current();
      result.current();
    });
    expect(mockPlay).toHaveBeenCalledTimes(2);
  });

  it('does not throw when play rejects (autoplay policy)', async () => {
    mockPlay.mockRejectedValueOnce(new DOMException('NotAllowedError'));
    const { result } = renderHook(() => useClickSound());
    await expect(act(async () => result.current())).resolves.not.toThrow();
  });

  it('nulls the audio ref on unmount', () => {
    const { unmount } = renderHook(() => useClickSound());
    unmount();
    // No assertion needed — coverage confirms cleanup runs without error
  });
});
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
pnpm test src/shared/hooks/use-click-sound.test.ts
```

Expected: `FAIL` — `useClickSound` is not defined.

- [ ] **Step 3: Implement the hook**

Create `src/shared/hooks/use-click-sound.ts`:

```typescript
import { useCallback, useEffect, useRef } from 'react';

export function useClickSound(): () => void {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/click.mp3');
    audio.preload = 'auto';
    audioRef.current = audio;
    return () => {
      audioRef.current = null;
    };
  }, []);

  return useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  }, []);
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
pnpm test src/shared/hooks/use-click-sound.test.ts
```

Expected: all 7 tests `PASS`.

- [ ] **Step 5: Register in barrel**

Edit `src/shared/hooks/index.ts` — add one line:

```typescript
export * from './use-track';
export * from './use-debounce';
export * from './use-is-client';
export * from './use-click-sound';
```

- [ ] **Step 6: Commit**

```bash
git add src/shared/hooks/use-click-sound.ts src/shared/hooks/use-click-sound.test.ts src/shared/hooks/index.ts
git commit -m "feat: add useClickSound hook"
```

---

## Task 2: Desktop header menu

**Files:**

- Modify: `src/layout/components/header/index.tsx`

- [ ] **Step 1: Wire the hook**

In `src/layout/components/header/index.tsx`, add the import and call `playClick()` alongside the existing GTM event:

```typescript
// add to imports
import { useClickSound } from '@/shared/hooks';

// inside Header(), before the return:
const playClick = useClickSound();

// update each menu Link onClick:
onClick={() => {
  playClick();
  sendGTMEvent(GTM_EVENTS.MENU(title));
}}
```

Full updated `<Link>` element:

```tsx
<Link
  href={url}
  onClick={() => {
    playClick();
    sendGTMEvent(GTM_EVENTS.MENU(title));
  }}
  className="border-b border-transparent bg-transparent px-4 py-3 duration-200 hover:border-orange-500 whitespace-nowrap"
>
  {title}
</Link>
```

- [ ] **Step 2: Run existing header tests**

```bash
pnpm test src/layout/components/header/
```

Expected: `PASS` — no behaviour changes, only an added side effect.

- [ ] **Step 3: Commit**

```bash
git add src/layout/components/header/index.tsx
git commit -m "feat: play click sound on desktop header menu links"
```

---

## Task 3: More About Ramin link

**Files:**

- Modify: `src/domains/home/components/summary/more-information-button.tsx`

- [ ] **Step 1: Wire the hook**

Replace the full file content:

```typescript
'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { GTM_EVENTS, ROUTES } from '@/shared/constants';
import { useClickSound } from '@/shared/hooks';
import { PERSONAL_DATA } from '@/data';
import Link from 'next/link';

export function MoreInformationButton() {
  const playClick = useClickSound();

  return (
    <Link
      href={ROUTES.ABOUT_ME}
      className="border-b px-3 pb-1 duration-200 hover:px-5"
      onClick={() => {
        playClick();
        sendGTMEvent(GTM_EVENTS.MORE_ABOUT_ME);
      }}
    >
      More About {PERSONAL_DATA.firstName}
    </Link>
  );
}
```

- [ ] **Step 2: Run home domain tests**

```bash
pnpm test src/domains/home/
```

Expected: `PASS`.

- [ ] **Step 3: Commit**

```bash
git add src/domains/home/components/summary/more-information-button.tsx
git commit -m "feat: play click sound on more-about-ramin link"
```

---

## Task 4: Resume download button

**Files:**

- Modify: `src/shared/components/resume-downloader-button/index.tsx`

- [ ] **Step 1: Wire the hook**

Replace the full file content:

```typescript
'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { clsx } from 'clsx';

import { GTM_EVENTS } from '@/shared/constants';
import { useClickSound } from '@/shared/hooks';
import { RESUME_FILE } from '@/data';

import styles from './resume-downloader-button.module.scss';

export function ResumeDownloaderButton() {
  const playClick = useClickSound();

  return (
    <a
      target="_blank"
      href={RESUME_FILE.url}
      rel="noopener noreferrer"
      download={RESUME_FILE.fileName}
      aria-label={`Download ${RESUME_FILE.fileName}`}
      onClick={() => {
        playClick();
        sendGTMEvent(GTM_EVENTS.DOWNLOAD_RESUME);
      }}
      className={clsx(
        'relative block rounded px-4 text-xl leading-10 duration-500',
        styles['resume-downloader-button']
      )}
    >
      {RESUME_FILE.actionLabel}
    </a>
  );
}
```

- [ ] **Step 2: Run resume downloader tests**

```bash
pnpm test src/shared/components/resume-downloader-button/
```

Expected: `PASS`.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/resume-downloader-button/index.tsx
git commit -m "feat: play click sound on resume download button"
```

---

## Task 5: Contact form submit

**Files:**

- Modify: `src/domains/contact-me/components/contact-form/index.tsx`

The sound plays immediately when the user submits the form — before async work begins — giving instant tactile feedback regardless of network latency.

- [ ] **Step 1: Wire the hook**

In `src/domains/contact-me/components/contact-form/index.tsx`:

Add import:

```typescript
import { useClickSound } from '@/shared/hooks';
```

Add hook call inside `ContactForm()`, alongside existing hooks:

```typescript
const playClick = useClickSound();
```

Update the `form` `onSubmit` to call `playClick()` first:

```tsx
onSubmit={(event) => {
  playClick();
  void handleSubmit(onSubmit)(event);
}}
```

- [ ] **Step 2: Run contact form tests**

```bash
pnpm test src/domains/contact-me/
```

Expected: `PASS`.

- [ ] **Step 3: Commit**

```bash
git add src/domains/contact-me/components/contact-form/index.tsx
git commit -m "feat: play click sound on contact form submit"
```

---

## Task 6: Full verification

- [ ] **Step 1: Type-check, lint, and all tests**

```bash
pnpm check-all
pnpm test
```

Expected: 0 type errors, 0 lint warnings, all tests pass (count ≥ previous + 7 new).

- [ ] **Step 2: Production build**

```bash
pnpm build
```

Expected: build completes with no errors.

- [ ] **Step 3: Final commit (if any fixups needed)**

```bash
git add -p
git commit -m "chore: post-integration fixups for click sound"
```
