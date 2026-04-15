---
id: 9
author: Ramin
isActive: true
date: 2025-08-27
category: Experience
slug: Complexity-and-Knowledge-in-Software-Design
title: Complexity and Knowledge in Software Design
description: An experience-driven reflection on software complexity, exploring how technical skills and business knowledge shape better system design.
tags:
  - Software Engineering
  - System Design
  - Developer Mindset
---

Projects don't usually start complicated. They get that way over time, sometimes because the problem genuinely grew, but more often because of decisions made along the way: the wrong tool, an architecture that didn't match the scale, a process that nobody questioned.

In this post, I want to share a personal story and a few lessons I've picked up about software design, complexity, and the often underrated role of business knowledge.

## The Story of the Setaregan Project

The **Setaregan Project** is a project I've been maintaining for over a decade. It started in 2013 when my sports coach asked for a simple website for his club. At the time, I had zero web development experience — no HTML, no CSS, no idea where to even start. But I gave it a shot.

The first version was a static page. It showed some text on a domain and I edited the files by hand whenever something needed to change. Over the years, the system kept evolving:

- **Year 2:** Rebuilt with Joomla.
- **Year 3:** Migrated to a blogging platform.
- **Year 4:** Recreated with WordPress, adding more features.
- **Year 7:** A custom PHP MVC version — large, full of bugs, very unstable.
- **Year 8:** A complete rebuild using Laravel and React.
- **Later:** Microservices, Docker, Kubernetes.

On paper, that looks like steady progress. But the pattern I noticed was less encouraging: **as my technical knowledge grew, the system got more complex, not necessarily better.**

## Why Complexity Grows

### Developer Knowledge

There's a trap that a lot of developers fall into, myself included. When you learn something new — a pattern, a framework, an architecture — you want to use it. When I built my own MVC framework in PHP, I genuinely thought I was improving the system. What I was actually doing was adding complexity I didn't yet have the skills to manage. I didn't know SOLID principles, I hadn't studied Design Patterns seriously, and Clean Architecture was just a book title at that point. The result was something harder to maintain than WordPress.

As _The Pragmatic Programmer_ puts it, the right tool in the wrong hands can lead to disaster.

### Technology Choices

The biggest mistake I made with the Setaregan project was introducing microservices, Docker, and Kubernetes into something that had no real reason to be distributed. A single well-structured monolith would have served the club perfectly.

Fred Brooks said it decades ago in _The Mythical Man-Month_: there is no silver bullet. Modern tools are genuinely powerful, but if your problem doesn't require them, you're not solving a problem — you're creating one.

### Domain Knowledge

This is the one that took me the longest to understand. I spent years optimizing the technical side of that project while having a pretty shallow understanding of what the club actually needed. I was solving the wrong problem, just increasingly well.

Eric Evans' _Domain-Driven Design_ makes this point clearly: the real value of software comes from connecting technical design with the business domain. I realized later that the club's actual needs were much simpler than anything I built. A more focused conversation with my coach earlier on would have saved a lot of wasted effort.

**Domain knowledge is often more important than technical skill.** That's not a comfortable thing to admit, but it's been consistently true in my experience.

## What I Try to Keep in Mind Now

- **KISS:** Always choose the simplest solution that actually works.
- **YAGNI:** Don't add it until you genuinely need it.
- **Refactor continuously:** Don't wait until something breaks to simplify it.
- **Write tests:** Not because it's best practice, but because they make future changes less scary.
- **Talk to stakeholders early:** Understand the problem before designing the solution.

## Conclusion

After more than a decade with the same project, two things became very clear to me. First, the more technical skill you have, the more discipline you need to avoid over-engineering things. Second, understanding the business is not optional — without it, the best code in the world won't solve the right problem.

Successful software isn't the one with the newest tech stack. It's the one that stays simple, useful, and aligned with what people actually need.

_References:_

- _The Pragmatic Programmer_ by Andrew Hunt and David Thomas
- _The Mythical Man-Month_ by Frederick P. Brooks Jr.
- _Domain-Driven Design_ by Eric Evans
- _Clean Code_ by Robert C. Martin

– Ramin ✌️
