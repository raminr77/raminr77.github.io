---
id: 4
author: Ramin
isActive: true
date: 2025-04-10
category: Frontend
slug: understanding-list-virtualization-in-react
title: Understanding List Virtualization in React
description: List virtualization in React is a powerful technique to boost performance when rendering large datasets, by only displaying items visible in the viewport instead of the entire list. This post explores its benefits—like faster rendering and lower memory use—explains how it works, and provides a step-by-step guide to implement it using react-window.
tags:
  - React
  - Optimization
  - Virtualized List
---

When building modern web applications with React, performance is a key concern, especially when dealing with large datasets like long lists or tables. Rendering thousands of items in the DOM can slow down your app, increase memory usage, and degrade the user experience. This is where **list virtualization** comes into play—a technique that optimizes rendering by only displaying the items visible in the viewport. In this blog post, we'll dive deep into list virtualization in React, explore its benefits, and walk through how to implement it step-by-step. We'll also build a simple example from scratch.

## What is List Virtualization?

List virtualization (sometimes called "windowing") is a performance optimization technique that renders only a small subset of items in a list—those currently visible to the user—rather than rendering the entire list at once. As the user scrolls, the virtualized list dynamically updates the DOM to show new items entering the viewport while removing those that scroll out of view.

Think of it like a movie reel: you don’t need to see all the frames at once, just the one currently on screen.

## Why Use List Virtualization?

Here’s why list virtualization is a game-changer:

- **Performance**: Rendering fewer DOM nodes reduces memory usage and speeds up rendering.
- **Scalability**: Handle lists with thousands or even millions of items without crashing the browser.
- **User Experience**: Smooth scrolling and fast load times keep users happy.
- **Efficiency**: Avoid unnecessary computations for items that aren’t visible.

Without virtualization, rendering a list of 10,000 items might freeze your app. With virtualization, you might only render 10–20 items at a time, regardless of the total size.

## How Does List Virtualization Work?

At its core, list virtualization relies on two key concepts:

1. **Viewport Detection**: Determine which items are visible based on the scroll position and container size.
2. **Dynamic Rendering**: Render only the visible items (plus a small buffer) and update them as the user scrolls.

The technique uses the scroll container’s dimensions and the scroll offset to calculate which items should be in view.

### For example:

- If your container is 500px tall and each item is 50px tall, you can display 10 items at once.
- As the user scrolls, you adjust the rendered items based on the scroll position.

Libraries like `react-virtualized` or `react-window` handle the heavy lifting, but we’ll also explore a basic manual implementation later.

## Popular Libraries for List Virtualization in React

While you can build virtualization from scratch, several battle-tested libraries make it easier:

1. **`react-window`**:

- Lightweight (~5KB gzipped).
- Simple API for fixed-size or variable-size lists.
- Maintained by Brian Vaughn, a former React core team member.
- Ideal for most use cases.

2. **`react-virtualized`**:

- More feature-rich but heavier (~30KB gzipped).
- Supports advanced use cases like grids, tables, and infinite loading.
- Also created by Brian Vaughn.

3. **`react-virtuoso`**:

- Modern and user-friendly.
- Great for dynamic content and responsive designs.
- Includes built-in support for infinite scrolling.

For this guide, we’ll focus on `react-window` because it’s lightweight, widely used, and strikes a balance between simplicity and power.

## Implementing List Virtualization with `react-window`

Let’s walk through how to implement list virtualization in React using `react-window`. We’ll assume you’re familiar with basic React concepts like components and hooks.

### Step 1: Install `react-window`

First, install the library:

```bash
npm install react-window
```

### Step 2: Set Up Your Data

Create a large dataset to virtualize. For example:

```javascript
const bigList = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  name: `Item ${index}`
}));
```

### Step 3: Create a Virtualized List Component

Import the `FixedSizeList` component from `react-window` and use it to render your list:

```javascript
import { FixedSizeList } from 'react-window';
import React from 'react';

const Row = ({ index, style }) => <div style={style}>Item {index}</div>;

const VirtualizedList = () => {
  return (
    <FixedSizeList
      height={400} // Height of the list container
      width={300} // Width of the list container
      itemCount={10000} // Total number of items
      itemSize={50} // Height of each item
    >
      {Row}
    </FixedSizeList>
  );
};

export default VirtualizedList;
```

Here’s what’s happening:

- `FixedSizeList` is a component that handles virtualization for fixed-height items.
- `height` and `width` define the container’s dimensions.
- `itemCount` is the total number of items in your list.
- `itemSize` is the height of each row (must be fixed for FixedSizeList).
- The `Row` component receives `index` (the item’s position) and `style` (positioning styles) as props.

### Step 4: Add Styling

To make it look like a scrollable list, add some basic CSS:

```css
.list-container {
  border: 1px solid #ccc;
  overflow: auto;
}
```

Wrap your `VirtualizedList` in a styled div:

```jsx
<div className="list-container">
  <VirtualizedList />
</div>
```

### Step 5: Handle Variable Heights (Optional)

If your list items have variable heights, use `VariableSizeList` instead:

```javascript
import { VariableSizeList } from 'react-window';

const getItemSize = (index) => (index % 2 === 0 ? 50 : 100); // Example variable heights

const VirtualizedList = () => {
  return (
    <VariableSizeList
      height={400}
      width={300}
      itemCount={10000}
      itemSize={getItemSize} // Function to return height for each item
    >
      {Row}
    </VariableSizeList>
  );
};
```

## Advanced Use Cases

- **Infinite Scrolling**: Combine virtualization with an API to load more data as the user scrolls.
- **Dynamic Data**: Update itemCount and re-render when the dataset changes.
- **Grids**: Use FixedSizeGrid or VariableSizeGrid for 2D layouts.

# Building a Simple Example from Scratch

Let’s create a basic virtualized list without a library to understand the underlying mechanics. This example assumes a fixed item height and a static dataset.

### Step 1: Set Up the Component

```javascript
import React, { useState, useRef } from 'react';

const SimpleVirtualizedList = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const itemHeight = 50; // Height of each item
  const containerHeight = 400; // Height of the container
  const itemCount = 10000; // Total items
  const visibleItems = Math.ceil(containerHeight / itemHeight); // Items in view
  const buffer = 5; // Extra items to render above/below

  // Calculate start and end indices based on scroll position
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = Math.min(itemCount, startIndex + visibleItems + buffer * 2);

  // Generate visible items
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

  // Handle scroll event
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
      <div
        style={{
          height: `${itemCount * itemHeight}px`, // Total height of the list
          position: 'relative'
        }}
      >
        {items}
      </div>
    </div>
  );
};

export default SimpleVirtualizedList;
```

### Step 2: Use It in Your App

```javascript
import SimpleVirtualizedList from './SimpleVirtualizedList';
import React from 'react';

const App = () => {
  return (
    <div>
      <h1>Simple Virtualized List</h1>
      <SimpleVirtualizedList />
    </div>
  );
};

export default App;
```

## How It Works

- **Scroll Tracking**: The `scrollTop` state updates as the user scrolls.
- **Visible Range**: `startIndex` and `endIndex` calculate which items to render based on the scroll position, with a buffer for smooth scrolling.
- **Absolute Positioning**: Items are positioned absolutely within a tall container to simulate the full list height.
  This is a basic implementation. For production use, libraries like react-window handle edge cases and optimizations better.

## Conclusion

List virtualization is an essential technique for optimizing React applications with large datasets. Whether you use a library like react-window or roll your own solution, the key is to render only what’s visible. Start with react-window for most projects—it’s lightweight and easy to integrate. For learning purposes or custom needs, building it from scratch can deepen your understanding.

Try implementing the examples above in your next project and watch your app’s performance soar!
