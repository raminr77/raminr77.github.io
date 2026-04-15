---
id: 6
author: Ramin
isActive: true
date: 2025-07-10
category: Experience
slug: why-dont-i-do-the-right-thing
title: Why Don't I Do the Right Thing?
description: As a senior software engineer with years of experience in large-scale systems, I reflect on the psychological, organizational, and cultural reasons why we often don't do the right thing, even when we know what it is.
tags:
  - Software Engineering
  - Developer Mindset
  - Team Culture
---

We all want to do the right thing.
But more often than we like to admit, **we don't**.

As a software engineer with over 8 years of experience, 5 of which in large-scale, high-stakes systems, I've come to realize that **knowing the right thing is only half the battle**. The other half? Dealing with human limitations, organizational friction, and psychological barriers.

This post is an honest look into why we often don't do what we know is right, and what that actually says about our industry, our teams, and ourselves.

## How much decision-making power do we really have?

According to [Self-Determination Theory](https://psycnet.apa.org/record/2000-13324-007), autonomy is a key factor in motivation. But in many real-world teams, **decision-making is distributed unevenly**, or worse, **diffused to the point of paralysis**.

I've often found myself knowing what needs to be done (refactor a service, modularize the frontend, replace a broken CI process) but not having the **clear mandate** to act on it.

You hesitate, you rationalize, and eventually… you postpone.
In a system with unclear ownership, "right" often becomes "later".

## Where are we in the software lifecycle?

You can't treat a legacy system like a greenfield. And yet, many developers beat themselves up for not building "clean code" in a swamp of production bugs and feature pressure.

**Context is king.**

In early development, you have a chance to lay strong foundations. But in later stages, especially during scaling or firefighting, survival trumps architecture. That's not failure. That's lifecycle reality.

Instead of asking "Why didn't we do it right?", ask:
**"Did we do what was realistic given our constraints?"**

## Why we stick with bad tools (even when we know they're bad)

This one hits close to home.

We've all used tools we knew weren't great, maybe even ones we'd rather forget.
So why do we keep using them?

### The Cost of Inertia

Switching tools is rarely just about code. It's about retraining the team, updating documentation, rewriting infrastructure, and risking bugs during migration. Even when better tools exist, **momentum keeps the current tool alive**. This is known as the ["sunk cost fallacy"](https://en.wikipedia.org/wiki/Sunk_cost): the more we've invested in something, the harder it is to walk away.

### Team Culture and Shared Illusions

Sometimes the team _knows_ the tool sucks. But no one speaks up.
Why? Because everyone assumes everyone else is fine with it.

This is a classic case of **pluralistic ignorance**, a psychological phenomenon where everyone privately disagrees with a decision but publicly goes along with it because they think they're the only one.

I've seen teams suffer through awful workflows for years… only to later admit they all hated it. The silence cost them **years**.

### Fear of Regret

What if the new tool fails? What if the migration breaks prod?
Many engineers would rather live with a bad known than risk a worse unknown.

This fear makes us overly cautious, especially in high-stakes systems. But **progress requires discomfort**.

## Sometimes, we just don't have the people

In fast-paced environments, the bottleneck isn't usually knowledge. It's **capacity**.

You can have the best plan, the cleanest RFC, the strongest rationale. But if you only have 3 engineers maintaining a 10-person system, even the "right thing" becomes a luxury.

Leadership often wants velocity, not technical perfection. And it's up to senior engineers to **balance tech debt with delivery**, without burning out or burning bridges.

## What else gets in the way?

A few more invisible blockers I've run into over the years:

- No psychological safety — you don't challenge bad decisions because you don't want to be seen as "negative"
- Short-term reward systems — features get praised, refactors get ignored
- Decision by committee — too many voices leads to compromise, not clarity
- Bad estimations — refactors always look longer than features, so they get cut
- Unclear ownership — nobody feels responsible for long-term health

## So… what now?

Doing the "right thing" in software is rarely simple. It's often a messy negotiation between business reality, team capacity, organizational inertia, and your own energy levels.

Here's what has actually helped me over the years:

- **Start small.** Don't wait for the "perfect time" to refactor. Fix one thing per PR.
- **Make invisible work visible.** Log time spent on improvements, track value delivered.
- **Talk openly.** You'd be surprised how many teammates silently agree with you.
- **Document intent.** Even if you can't fix it now, write down what _should_ happen later.
- **Mentor junior devs.** Teach the _why_ behind clean code, not just the _how_.
- **Lead by influence.** You don't need a title to nudge a team in the right direction.

## Recommended Reading

If you've ever struggled with this, you're not alone. These helped me a lot:

- _Drive_ by Daniel Pink
- _The Psychology of Computer Programming_ by Gerald Weinberg
- _Software Engineering at Google_ by Titus Winters et al.
- [Sunk Cost Fallacy (Wikipedia)](https://en.wikipedia.org/wiki/Sunk_cost)
- [Self-Determination Theory](https://psycnet.apa.org/record/2000-13324-007)

At the end of the day, **doing the right thing in tech is a leadership act**, not just a coding decision.
And sometimes, leadership looks like slowing down, or even saying no.

– Ramin ✌️
