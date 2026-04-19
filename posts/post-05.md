---
id: 5
author: Ramin
isActive: true
date: 2025-06-02
category: Frontend
slug: smooth-dom-transitions-in-spas-using-the-view-transitions-api
title: Smooth DOM Transitions in SPAs Using the View Transitions API
description: Learn how to create native, animated transitions between UI states in your single-page applications using the View Transitions API. This post walks through the basics, provides a practical example, and links to official documentation to help you get started quickly.
tags:
  - CSS
  - SPA
---

Page transitions in SPAs have always been a bit awkward to get right. You either pull in a full animation library, write your own enter/leave logic with CSS classes, or just accept the abrupt content swap. The View Transitions API is a browser-native way to handle this — you wrap a DOM update in `document.startViewTransition()` and the browser captures the before/after states and animates between them.

It works differently from traditional CSS transitions. Instead of transitioning a property value over time, it takes a screenshot of the current state, makes your DOM change, then animates from the old screenshot to the new live state. The result is smooth even for complex layout changes.

## When It Makes Sense

The API is most useful for route changes in SPAs, tab-based navigation, or any case where you're swapping out a significant chunk of content and want the change to feel less jarring. For small UI interactions like toggling a dropdown, regular CSS transitions are still the right tool.

For multi-page apps (MPA), browsers handle the snapshots automatically when navigating between pages. For SPAs doing same-document navigation, you trigger it manually.

## A Minimal Example

Here's a simple two-view demo with a fade transition:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>View Transitions Example</title>
    <style>
      main {
        view-transition-name: main;
      }

      ::view-transition-old(main),
      ::view-transition-new(main) {
        animation-duration: 0.4s;
        animation-timing-function: ease;
      }

      ::view-transition-old(main) {
        animation-name: fade-out;
      }

      ::view-transition-new(main) {
        animation-name: fade-in;
      }

      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fade-out {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      nav {
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <nav>
      <button onclick="navigate('home')">Home</button>
      <button onclick="navigate('about')">About</button>
    </nav>

    <main id="content">Welcome to the homepage.</main>

    <script>
      const pages = {
        home: 'Welcome to the homepage.',
        about: 'This is the about page.'
      };

      function navigate(page) {
        const content = document.getElementById('content');

        if (!document.startViewTransition) {
          content.textContent = pages[page];
          return;
        }

        document.startViewTransition(() => {
          content.textContent = pages[page];
        });
      }
    </script>
  </body>
</html>
```

The key parts: you assign a `view-transition-name` to the element you want to animate, define `@keyframes` for the old and new states using the `::view-transition-old` and `::view-transition-new` pseudo-elements, then call `document.startViewTransition()` with your DOM update inside the callback.

The fallback on line `if (!document.startViewTransition)` handles browsers that don't support it — content still updates, just without the animation.

## Browser Support

Same-document view transitions are now supported in all major browsers:

- **Chrome** since v111
- **Edge** since v111
- **Safari** since v18 (September 2024)
- **Firefox** since v131 (October 2024)

Always check for support before using the API:

```js
if ('startViewTransition' in document) {
  // Safe to use the API
}
```

## References

- [View Transitions API Overview](https://developer.chrome.com/docs/web-platform/view-transitions)
- [Same-Document Transitions Guide](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)

If you're building a modern SPA and want native-feeling transitions without pulling in an animation library, the View Transitions API is worth trying. Browser support is now solid across the board, the fallback is safe, the setup is minimal, and when it works, it genuinely elevates the feel of navigation.
