---
id: 10
author: Ramin
isActive: true
date: 2026-04-19
category: Frontend
slug: feature-flags-from-zero
title: Feature Flags - From a Simple Constants File to Production-Scale Experimentation
description: Feature flags are one of those tools that look trivial on the surface but change the way you think about deploying software. From a single constants file on my personal site to A/B testing nine design variants at Digikala to toggling backend APIs at Sinch, here's everything I know about using them well.
tags:
  - Frontend
  - Developer Mindset
  - Software Engineering
---

Last year, I added the blog section (Posts) to my site and went straight to a colleague to show him the changes. Told him to open it up and have a look. He did, and I immediately noticed something!!!! his entire setup was in light mode. Browser, OS, everything. Meanwhile, I live in dark mode exclusively, always have. Seeing my site through his screen was a bit jarring :D It worked, but it clearly wasn't built with light in mind.

That was the moment I realized I needed to actually support light mode properly. But it wasn't a small change :( The theme touches almost everything: colors, shadows, component states, and images. I didn't want to push it all at once and deal with a broken deploy on a Saturday afternoon for a personal project that wasn't exactly mission-critical. And I was genuinely curious too: how many people actually prefer light mode? Is this just my colleague, or is it more common than I think?

That's what pushed me toward feature flags on my own site, not just as a safety net for the rollout, but as a way to actually measure how people use it.

## What a Feature Flag Actually Is

A feature flag. Also called a feature toggle or feature switch. Is simply a way to change your software’s behavior without redeploying code.

At its core, it’s nothing more than an `if` statement. The real shift is not technical complexity. It’s about where that condition lives and who has control over it.

The key idea is this: **you separate deploying code from releasing features**.

You can ship code whenever it’s ready. No pressure to expose it immediately. Then, when the time is right, you decide who sees it and when. If something goes wrong, you can disable it instantly. No rollback, no redeploy. Just flip the switch.

It also unlocks more advanced workflows. You can run multiple versions of a feature at the same time. Compare them. Let real user data tell you what actually works instead of relying on assumptions.

If you want a solid foundation on this topic, Martin Fowler and his team published one of the most widely referenced articles on feature flags [ [Feature Toggles (aka Feature Flags)](https://martinfowler.com/articles/feature-toggles.html) ]. Their classification still holds up today:

- **Experiment flags** for A/B testing
- **Ops flags** for operational control and safety
- **Release flags** for gradually rolling out features
- **Permission flags** for targeting specific users or groups

We’ll get into those. But first, let me show you how this usually starts in practice.

## The Simplest Possible Implementation

On my personal site, the whole system is one file:

```ts
// src/shared/constants/feature-flags.ts
export const FEATURE_FLAGS = {
  TOGGLE_THEME_BUTTON: true
} as const;
```

A component reads it and either renders or doesn't:

```tsx
import { FEATURE_FLAGS } from '@/shared/constants/feature-flags';

export default function ToggleThemeButton() {
  if (!FEATURE_FLAGS.TOGGLE_THEME_BUTTON) return null;
  return <button onClick={toggleTheme}>Switch Theme</button>;
}
```

That’s it.

No SDK, no external service.

Even this simple setup gives you something valuable. You can deploy a feature to production but keep it hidden until you’re confident.

For environment-based control, environment variables work well:

```ts
export const FEATURE_FLAGS = {
  TOGGLE_THEME_BUTTON: process.env.NEXT_PUBLIC_FF_THEME === 'true'
} as const;
```

On Vercel, I can have the flag off in production while a preview deployment has it on. No code change, no redeploy, just a variable.

### Note

Just to clarify, this feature is currently always enabled on my site. For this article, I’ve kept it hardcoded in the file, so it stays on all the time.

Previously, I was using an `environment variable` to control it. That way, I could update the value directly from [Vercel](https://vercel.com/docs/environment-variables) without needing to redeploy the app.

Later on, Vercel introduced a dedicated [feature flag](https://vercel.com/docs/flags) section, so I started using that instead. It made things cleaner and removed the need to manage it through environment variables.

## Story 1: Light Mode and What I Didn't Expect

After that moment with my colleague, I started looking at my site from other people’s perspectives. Not just mine.

I asked my wife to check it. She uses light mode for everything. Then I checked my analytics and noticed something interesting. Many users, especially on mobile, were seeing the light version of the site. Their phones were set to light mode, and my site was following the system setting.

That wasn’t what I had in mind at all.

I had designed the whole experience around dark mode. Every color, every shadow, every contrast decision was made with a dark background in mind. Light mode wasn’t really “designed”. It just kind of existed by default.

So I started experimenting.

### First attempt

I let the site follow `prefers-color-scheme`. It sounded like the right thing to do. But in reality, it meant I had zero control. People with light mode were getting an experience I never truly designed.

### Second attempt

I forced dark mode. No toggle, no choice. That fixed my problem… but created a new one. Now users had no control at all.

### Third attempt

Dark mode as the default, with a toggle. This felt like the right balance. But I didn’t want to roll it out blindly.

Changing themes wasn’t a small tweak. It touched everything. Colors, components, images, hover states, transitions. If something broke, I didn’t want to hunt down issues one by one. I wanted a kill switch.

So I did this:

```ts
export const FEATURE_FLAGS = {
  TOGGLE_THEME_BUTTON: false // everything's deployed, nothing's visible yet
} as const;
```

The logic was already live in production. The button just wasn’t visible.

For a few weeks, I tested everything carefully. Different devices, both themes, edge cases. I checked how localStorage behaved, whether transitions felt smooth, whether anything looked off.

Once I felt confident, I flipped the flag.

What surprised me was how many people actually used the toggle. I had tracking set up through Google Tag Manager, and the numbers were higher than I expected. Which makes sense now. I was surrounded by people who preferred dark mode, but that’s not the whole internet.

If I had shipped this without a feature flag and something broke, it would’ve been painful to fix. The flag gave me a safety net. I could ship early, test properly, and only expose it when I was sure it was ready.

## Story 2: The AI Chatbot That Nobody Used

A while ago, I built a chatbot for my site. I used [Dify](https://dify.ai/) as the backend and trained it on all my content. Projects, experience, blog posts. The idea was simple. Instead of clicking around, someone could just land on the homepage and ask something like “what has Ramin worked on?”

On the frontend, I didn’t go with anything off-the-shelf. I built a fully custom UI. A floating button, a modal, streaming responses. The whole experience.

But there was a catch. Running AI APIs isn’t free. It costs real money.

So there was no way I was going to enable it for everyone from day one.

I wrapped the whole thing behind a feature flag and rolled it out gradually to a limited group of users with vercel flags.

I tracked everything through GTM, button opens, messages sent, full conversation completions. Gave it a few months.

The result was clear. People clicked the button sometimes, but very few actually used it.

Visitors on a personal site don’t want a conversation. They want to scan quickly and decide.

I turned the flag off. Waited a bit. Then removed the feature.

It wasn’t a waste. I learned a lot. But it didn’t solve a real user problem.

## Story 3: Nine Design Variants at Digikala

At [Digikala](https://www.digikala.com/), we were working on how buyers navigate to a seller's main page from a product listing or product details page.

Instead of guessing, we ran an experiment.

Three design directions, each with three variations. 9 variants in total.

Traffic was split across all variants and we waited for statistical significance, We tracked:

- Click-through rate
- Time to click
- Conversion

For example:

```ts
type SellerPageVariant =
  | 'control' // Current Version
  | 'design_a_v1'
  | 'design_a_v2'
  | 'design_a_v3'
  | 'design_b_v1'
  | 'design_b_v2'
  | 'design_b_v3'
  | 'design_c_v1'
  | 'design_c_v2'
  | 'design_c_v3';

const variant = getFeatureFlag<SellerPageVariant>('seller_page_navigation');
```

## Story 4: Feature Flags at Sinch

At [Sinch](https://www.sinch.com/), the codebase is big enough, and the customer base is varied enough that a constants file doesn't cut it. We use [ConfigCat](https://configcat.com/), which handles real-time flag evaluation, per-user and per-organization targeting, percentage rollouts, and keeps an audit trail of every change.

One concrete example: the **project picker**, a component that lets users switch between projects in the platform. When we redesigned it, we rolled it out through ConfigCat's targeting rules, internal users first, then a slice of paying customers, then everyone. At any point, if something went wrong for a specific customer, we could flip it back to the old UI without touching a deployment.

On the backend, flags work the same way, but for APIs:

```ts
// flag checked at the handler level
if (!configCatClient.getValue('new_messaging_api_enabled', false, user)) {
  return res.status(404).json({ error: 'Not available' });
}
```

We use this for gradual API rollouts and as kill switches. If a feature is misbehaving in production, being able to disable it in seconds, without a deployment, without waking anyone up, is genuinely useful.

The key thing ConfigCat adds over environment variables: the flags are evaluated remotely, fetched from a CDN, and updated without any code change or deployment. At this scale, that matters.

## Choosing the Right Tool

| Scenario                              | Tool                                                                               |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| Personal project, small team          | Constants file + Vercel env vars / Vercel flags                                    |
| Multi-environment, no real-time needs | Environment variables per deployment                                               |
| Per-user targeting, no backend infra  | [ConfigCat](https://configcat.com/) or [GrowthBook](https://www.growthbook.io/)    |
| Large-scale A/B testing               | [LaunchDarkly](https://launchdarkly.com/) or [Unleash](https://www.getunleash.io/) |
| Full experimentation platform         | Internal system or [Optimizely](https://www.optimizely.com/)                       |

Don't reach for ConfigCat or LaunchDarkly because they look professional. Start with what fits where you are.
A constants file is a legitimate solution, it works until it doesn't, and when it stops working, you'll know exactly what you actually need.

## The Part Nobody Likes: Cleaning Up Flags

The longer a flag stays in the codebase, the more it costs. Old flags pile up, confuse people who come in later, and occasionally cause bugs when something that was supposed to be permanently on gets accidentally toggled.

The practice that actually works: treat every flag as temporary by default. When you create it, decide upfront what done looks like. Once the feature is shipped and stable, delete the flag and the conditional code around it. Put a note in the PR that links back to the ticket.

At Sinch, every active flag has a corresponding backlog item. When the flag gets resolved, shipped or killed, the item closes and the cleanup happens. Small overhead per flag, much less confusion down the road.

## Why This Matters

Flags don't make features better. They just change who sees them, when, and under what conditions, which is a separate problem from building the feature itself, and often just as important.

The chatbot was good code. The flag is why removing it was easy. The Digikala experiment didn't validate anyone's intuition, it just showed what actually performed better. The theme toggle is on my site today because data said it should be, not because I assumed it would be useful.

That's the shift: shipping code and releasing a feature are two different decisions. Flags let you make them separately.

– Ramin ✌️
