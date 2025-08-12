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

CSS has evolved significantly over the years, introducing powerful features that enhance styling capabilities. One such feature is @property, which allows developers to define custom properties (CSS variables) with specific types, default values, and inheritance behavior. This feature enables better performance and flexibility when working with dynamic styles, particularly in animations and transitions.

## What is @property?

`@property` is an at-rule in CSS that allows defining custom properties with additional metadata such as type, initial value, and inheritance. This helps CSS engines optimize animations and transitions, ensuring smooth and efficient rendering.

### Syntax

```css
@property --my-color {
  syntax: '<color>';
  inherits: false;
  initial-value: blue;
}
```

### Explanation:

- `syntax`: Defines the expected data type for the property (e.g., `<color>`, `<length>`, `<number>`).
- `inherits`: Specifies whether the property is inherited by child elements (`true` or `false`).
- `initial-value`: Sets the default value of the property.

## Benefits of Using @property

1. **Improved Performance:** Helps browsers optimize animations by defining the expected type.
2. **Better Maintainability:** Ensures properties have consistent types and default values.
3. **Enhanced Animations:** Enables smooth transitions by providing structured data types.

## Example: Animating a Custom Property

With `@property`, we can animate CSS variables smoothly.

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

### Explanation:

- The `@property` rule defines `--main-bg-color` as a `<color>` type.
- The `body` element uses this variable for its background color.
- The transition applies when `--main-bg-color` changes, ensuring smooth color transitions.
- When hovering over the button, the background color changes to `lightblue` with a smooth transition.

## Limitations

- Currently, `@property` is supported in Chromium-based browsers (Chrome, Edge, Opera) but not in Firefox or Safari.
- The `@property` rule only works with explicitly defined syntax; generic CSS variables (`--var`) do not automatically benefit from it.

## Conclusion

The `@property` rule in CSS is a powerful feature for defining custom properties with additional metadata. It enhances performance, improves maintainability, and allows smooth animations. While browser support is limited, it remains a valuable tool for developers aiming to create dynamic and optimized web experiences.
