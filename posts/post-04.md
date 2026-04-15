---
id: 4
author: Ramin
isActive: true
date: 2025-04-10
category: Frontend
slug: understanding-list-virtualization-in-react
title: Understanding List Virtualization in React
description: List virtualization in React is a technique to boost performance when rendering large datasets, by only displaying items visible in the viewport instead of the entire list. This post explains how it works and provides a step-by-step guide to implement it using react-window.
tags:
  - React
  - Optimization
  - Virtualized List
---

If you've ever tried rendering a list of 10,000 items in React, you've probably seen the browser choke. The DOM isn't designed to handle that many nodes efficiently. It slows down rendering, bloats memory, and makes scrolling feel sluggish. **List virtualization** is the standard fix: instead of rendering the whole list, you only render what's actually visible in the viewport. In this post, we'll cover how it works, look at the best libraries for it, and build a simple version from scratch.

## What is List Virtualization?

List virtualization (sometimes called "windowing") renders only the items currently visible in the viewport, not the entire list. As the user scrolls, items entering the view get rendered and items leaving it get removed from the DOM.

Think of it like a movie reel: you don't need to see all the frames at once, just the one currently on screen.

The math behind it is straightforward: if your container is 500px tall and each item is 50px, you display 10 items at a time. As scroll position changes, you recalculate which 10 items to show. The rest don't exist in the DOM at all.

Without virtualization, rendering 10,000 items might freeze your app. With it, you're always rendering maybe 10 to 20, regardless of the total count.

## Libraries Worth Knowing

You can build virtualization from scratch, but honestly there are solid libraries that handle the edge cases for you:

**`react-window`** is the one I reach for most often. It's small (around 5KB gzipped), has a simple API, and covers the two most common cases: fixed-size and variable-size lists. Brian Vaughn built it while he was on the React core team, so it's well-maintained.

**`react-virtualized`** is the older sibling — more feature-rich but heavier (around 30KB). Good if you need grids, tables, or complex infinite loading out of the box.

**`react-virtuoso`** is the newer option. Great for dynamic content and built-in infinite scrolling support. Worth checking out if `react-window` feels too low-level for your use case.

For this guide, we'll use `react-window`.

## Implementing with `react-window`

Install it:

```bash
npm install react-window
```

The core component is `FixedSizeList`. You give it the container dimensions and item size, and it handles everything else:

```javascript
import { FixedSizeList } from 'react-window';
import React from 'react';

const Row = ({ index, style }) => <div style={style}>Item {index}</div>;

const VirtualizedList = () => {
  return (
    <FixedSizeList height={400} width={300} itemCount={10000} itemSize={50}>
      {Row}
    </FixedSizeList>
  );
};

export default VirtualizedList;
```

The `Row` component gets two props: `index` (its position in the list) and `style` (absolute positioning that `react-window` calculates). You must spread `style` onto your row element, otherwise the positioning breaks.

Add some basic CSS to make it feel like a proper scrollable list:

```css
.list-container {
  border: 1px solid #ccc;
  overflow: auto;
}
```

If your items have variable heights, swap `FixedSizeList` for `VariableSizeList` and pass a function instead of a number for `itemSize`:

```javascript
import { VariableSizeList } from 'react-window';

const getItemSize = (index) => (index % 2 === 0 ? 50 : 100);

const VirtualizedList = () => {
  return (
    <VariableSizeList height={400} width={300} itemCount={10000} itemSize={getItemSize}>
      {Row}
    </VariableSizeList>
  );
};
```

## Building One from Scratch

If you want to understand what's happening under the hood, here's a bare-bones implementation without any library:

```javascript
import React, { useState, useRef } from 'react';

const SimpleVirtualizedList = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const itemHeight = 50;
  const containerHeight = 400;
  const itemCount = 10000;
  const visibleItems = Math.ceil(containerHeight / itemHeight);
  const buffer = 5;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = Math.min(itemCount, startIndex + visibleItems + buffer * 2);

  const items = [];
  for (let i = startIndex; i < endIndex; i++) {
    items.push(
      <div
        key={i}
        style={{
          height: `${itemHeight}px`,
          position: 'absolute',
          top: `${i * itemHeight}px`,
          width: '100%',
          borderBottom: '1px solid #eee'
        }}
      >
        Item {i}
      </div>
    );
  }

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: `${containerHeight}px`,
        width: '300px',
        overflow: 'auto',
        position: 'relative',
        border: '1px solid #ccc'
      }}
    >
      <div style={{ height: `${itemCount * itemHeight}px`, position: 'relative' }}>
        {items}
      </div>
    </div>
  );
};

export default SimpleVirtualizedList;
```

The idea: track `scrollTop`, calculate which items fall within the visible range plus a small buffer, and render only those. Each item is positioned absolutely based on its index, so the scroll container has the correct total height even though most items aren't in the DOM.

This version won't handle every edge case, but it's enough to see the core mechanic clearly.

## Conclusion

For most projects, `react-window` is the right starting point. It's small, well-maintained, and covers the common cases without much configuration. If you need more advanced features like infinite loading or dynamic content, `react-virtuoso` is worth a look.

Building it from scratch is a good exercise for understanding what's going on under the hood, but I wouldn't recommend shipping a hand-rolled virtualizer in production when the libraries are this mature.
