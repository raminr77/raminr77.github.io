---
id: 2
author: Ramin
isActive: true
date: 2025-02-25
category: Frontend
slug: understanding-property-in-css
title: Understanding @property in CSS
description: The @property CSS at-rule is part of the CSS Houdini set of APIs. It allows developers to explicitly define CSS custom properties, allowing for property type checking and constraining, setting default values, and defining whether a custom property can inherit values or not.
tags:
  - CSS
---

If you've worked with CSS custom properties for a while, you've probably hit their limits, especially when trying to animate them. Plain CSS variables are opaque to the browser; it doesn't know if `--my-value` holds a color, a length, or a number, which means it can't interpolate between states. That's exactly the problem `@property` solves. It lets you define a custom property with an explicit type, a default value, and an inheritance rule, giving the browser the information it needs to handle transitions and animations properly.

## What is @property?

`@property` is a CSS at-rule that lets you declare a custom property with metadata: its expected type, whether child elements can inherit it, and what the default value is. Without this, the browser treats every custom property as just an opaque string.

```css
@property --my-color {
  syntax: '<color>';
  inherits: false;
  initial-value: blue;
}
```

Three fields, all required. `syntax` tells the browser what kind of value to expect (things like `<color>`, `<length>`, `<number>`). `inherits` controls whether child elements pick up the value from their parent. `initial-value` is the fallback when nothing else is set.

## Animating a Custom Property

This is where `@property` really shines. Normally, CSS can't animate a variable because it doesn't know what type it is. Once you declare it, that changes:

```css
@property --main-bg-color {
  syntax: '<color>';
  inherits: false;
  initial-value: white;
}

body {
  background-color: var(--main-bg-color);
  transition: --main-bg-color 1s ease-in-out;
}

button:hover {
  --main-bg-color: lightblue;
}
```

The transition on `--main-bg-color` works because the browser now knows it's a color and can interpolate between two color values. Without the `@property` declaration, that transition would just snap between states with no animation at all.

## Browser Support

`@property` is now supported across all major browsers:

- **Chrome** since v85
- **Edge** since v85
- **Firefox** since v128 (July 2024)
- **Safari** since v16.4 (March 2023)

It's safe to use in production without needing a fallback for modern browsers.

One thing to keep in mind: `@property` only works with explicitly typed syntax. A generic untyped variable (`--my-var`) doesn't gain anything from it. You need to declare a proper `syntax` value for the browser to do anything meaningful with it.

## Conclusion

`@property` fills a real gap in CSS. It's not just a nice-to-have. For anything involving animated custom properties, it's the right way to do it. Now that browser support has caught up, there's little reason not to use it when you need it.
