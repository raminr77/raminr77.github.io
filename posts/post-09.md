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

It often happens that a project becomes more complex than it really needs to be.  
This complexity is not always caused by real business needs, but many times by wrong decisions about tools, architecture, or even team process.

In this article, I want to share my personal story and also highlight some practical lessons about software design, complexity, and the balance between technology and business knowledge.

## The Story of the Setaregan Project

The **Setaregan Project** is a real-world example of how complexity grows step by step.  
It started in 2013 as a very small idea: my coach wanted a website for his sports club. At that time, I had zero knowledge of web development. I didn’t know HTML, CSS, or even the basic tools. But I decided to give it a try.

The first version was a very simple static page. It only showed some text on a domain, and to update it I had to edit the files manually every time.  
Over the years, this small page evolved:

- **Year 2:** Rebuilt with Joomla.
- **Year 3:** Migrated to a blogging platform.
- **Year 4:** Recreated with WordPress, adding more features.
- **Year 7:** A custom PHP MVC version (big, full of bugs, and very unstable).
- **Year 8:** A complete rebuild using Laravel + React.
- **Later:** A microservice architecture running on Docker and Kubernetes.

At first glance, this looks like a great progress story. But in reality, I noticed something interesting:  
👉 **As my technical knowledge grew, the system became more complex, not always better.**

## Three Main Causes of Complexity

### 1. Developer Knowledge

Complexity often reflects the developer’s level of knowledge.  
For example, when I built my own MVC framework in PHP, I thought I was improving the system. But because I didn’t know basic principles like **SOLID**, **Design Patterns**, or **Clean Architecture**, the result was a system that was harder to maintain than WordPress.

As _The Pragmatic Programmer_ explains, the right tool in the wrong hands can easily lead to disaster.

### 2. Technology Choices

The second cause of complexity is the choice of technology.  
The newest technology is not always the best.

As Fred Brooks writes in _The Mythical Man-Month_: _“There is no silver bullet.”_  
Using microservices, Docker, and Kubernetes in a project that could easily run as a monolith only added overhead and unnecessary complexity.

Modern tools are powerful, but if the problem is small, a simple solution usually works better.

### 3. Domain Knowledge

The third cause, and maybe the most important, is **domain knowledge**.  
Without a deep understanding of the business, even the most advanced technical team will build the wrong system.

As Eric Evans describes in _Domain-Driven Design_, the real value of software comes from connecting technical design with the business domain.  
In my case, I realized much later that the club’s real needs were much simpler than the system I had created.

👉 **Domain knowledge is often more important than technical knowledge.**

## Practical Principles for Reducing Complexity

From this experience, I learned some practical principles that every developer and team should remember:

- **KISS (Keep It Simple, Stupid):** Always choose the simplest solution that works.
- **YAGNI (You Aren’t Gonna Need It):** Don’t add features until they are really needed.
- **Continuous Refactoring:** Review and simplify code regularly, not only when problems appear.
- **Testing Matters:** As Robert C. Martin says in _Clean Code_, good tests make your system easier to change and maintain.
- **Balanced Teams:** A good team is not made of only senior developers. A mix of levels and perspectives often leads to better results.

## Conclusion

After more than 10 years with the same project, two big lessons became very clear to me:

1. **Technical skills and correct technology choices directly affect complexity.** The more you know, the more careful you must be to avoid creating unnecessary complexity.
2. **Domain knowledge is as important as technical skill—and sometimes even more.** Without understanding the business, the best code will not solve the right problem.

In the end, successful software is not the one with the latest technologies, but the one that stays **simple, useful, and aligned with real business needs**.

_References:_

- _The Pragmatic Programmer_ by Andrew Hunt and David Thomas
- _The Mythical Man-Month_ by Frederick P. Brooks Jr.
- _Domain-Driven Design_ by Eric Evans
- _Clean Code_ by Robert C. Martin

– Ramin ✌️
