# Security Policy

Thanks for taking the time to look at this project's security. If you've found something that looks like a vulnerability, please report it privately — don't open a public issue or PR with proof-of-concept code.

## Reporting

Email <ramin.rezaei@sinch.com> with:

- A short description of the issue.
- Steps to reproduce (or a minimal repro).
- The affected URL, route, or commit if you can pin it down.
- Your suggested severity and any mitigation ideas.

I'll confirm I received the report within **3 business days** and aim to respond with a plan within **7 days**. Fixes ship on `dev` first, then merge to `master` once verified.

## Scope

In scope:

- The deployed site at <https://raminrezaei.se> and any preview deployment under `*.vercel.app`.
- This repository's source code and CI configuration.

Out of scope:

- Issues that only exist because of a third-party service we depend on (Vercel, Sentry, Google reCAPTCHA, GTM). Please report those upstream and let me know so I can mitigate on our side.
- Social engineering, phishing, or physical attacks.
- Findings from automated scanners without a working proof of concept.

## What you can expect

- Acknowledgement within 3 business days.
- A coordinated disclosure timeline. If the issue is real and severe, I'll prioritize a fix before any public discussion.
- Credit in the commit / changelog if you'd like it.

Thanks for helping keep the site safe.
