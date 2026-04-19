---
id: 8
author: Ramin
isActive: true
date: 2025-08-15
category: Experience
slug: The-Complete-and-Practical-Code-Review-Checklist
title: The Complete and Practical Code Review Checklist
description: A comprehensive guide for conducting effective code reviews, combining a technical checklist with process-oriented best practices.
tags:
  - Software Engineering
  - Code Review
  - Developer Mindset
---

A code review isn't just about finding bugs. Its real goal is improving code quality over time — catching issues before they ship, keeping the codebase consistent, and spreading knowledge across the team. When it works, it's one of the most valuable things a team does. When it doesn't, everyone just resents the process.

This is the checklist I use, adapted from Neo Kim's CodeRabbit checklist and refined with things I've learned the hard way.

## Before You Start Reviewing

**Read the PR description and linked tickets first.** Understanding _why_ the change was made changes how you review it. A fix for a production incident deserves a different lens than a routine feature.

**If you're the author:** review your own PR before requesting review. Remove debug code, commented-out blocks, and anything that crept in by accident. Run the tests locally. It sounds obvious but it saves everyone time.

**Keep PRs small.** A 500-line PR gets skimmed. A 100-line PR gets read. If you're waiting on a big feature to be "done" before opening a PR, you're probably doing it wrong.

## Functionality

Does the code actually do what it's supposed to?

- Does it meet the requirements in the ticket?
- Does it handle edge cases: null, undefined, empty arrays, large inputs?
- Does it break anything that was already working?

```ts
// Correct
if (user && user.isAdmin) { ... }

// Risky — throws if user is null
if (user.isAdmin) { ... }
```

Check the happy path, check the failure path, and check the weird inputs that nobody tested but definitely exist in production.

## Readability

Code is read far more often than it's written. If you have to read a function twice to understand it, that's a problem.

- Are names descriptive enough to understand without comments?

```ts
// Bad
const a = getData();

// Good
const userProfile = getUserProfile();
```

- Is the formatting consistent with the rest of the codebase? (If you have Prettier and ESLint, this should be automatic.)
- Do comments explain _why_, not just _what_? A comment that says `// increment counter` is noise. One that says `// user sessions expire after 24h per compliance requirement` is useful.

## Performance

- Are there obvious algorithmic problems?

```ts
// Bad — O(n²)
arr.forEach(a => arr.forEach(b => { ... }));

// Good — O(n)
const set = new Set(arr);
```

- Does it do unnecessary work? Duplicate API calls, redundant computations inside loops, missing memoization?
- Does it scale reasonably? A query that works fine for 100 records might time out at 100,000.

## Security

- Are inputs validated and sanitized before use?
- Are there any SQL injection, XSS, or CSRF vectors?
- Is sensitive data (passwords, tokens, PII) handled correctly — not logged, not exposed in responses?
- Does error handling fail gracefully without leaking internals?

```ts
try {
  await processPayment();
} catch (err) {
  logger.error(err);
  throw new PaymentFailedError();
}
```

- Are any new dependencies necessary? Are they maintained and up to date?

## Giving Feedback

A few things that make a real difference in how reviews land:

**Fix the important stuff first.** Security issues and broken logic matter. Missing semicolons don't. Save the nitpicks for after the real problems are sorted.

**Ask questions instead of making demands.** "What do you think about extracting this into a helper?" reads differently than "extract this into a helper." The code author usually knows things you don't.

**Be specific.** Link to docs, point to examples, explain why. Vague feedback ("this doesn't look right") creates friction without value.

**Follow up.** After the author addresses your comments, check that nothing new was introduced in the process.

## Quick Checklist

- Meets requirements and doesn't break existing behavior
- Names and formatting are consistent with the codebase
- No obvious performance bottlenecks
- Inputs are validated, sensitive data is handled safely
- Error handling is in place
- PR is focused and small enough to review properly

---

A good code review isn't a bug hunt competition. It's an opportunity for team learning, quality improvement, and building trust in the codebase.

> Code reviews are about progress, not perfection.

– Ramin ✌️
