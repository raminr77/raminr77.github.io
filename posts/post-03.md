---
id: 3
author: Ramin
isActive: true
date: 2025-04-09
category: Frontend
slug: how-i-manage-my-static-blog-with-nextjs-and-markdown
title: How I Manage My Static Blog with Next.js and Markdown
description: Building a blog can feel overwhelming, especially when you want something fast, customizable, and easy to maintain. If you're a developer who loves working with modern tools, combining Next.js, Contentlayer, and Markdown offers a powerful yet simple solution for creating and managing a blog.
tags:
  - NextJs
  - Blog
  - Markdown
  - ContentLayer
---

In this post, I’ll walk you through how these tools work together to streamline your workflow and give you full control over your content.

## Why This Stack?

- **Next.js**: A React framework that provides server-side rendering, static site generation, and an excellent developer experience.
- **Contentlayer**: A content management tool that turns your Markdown files into structured, type-safe data, seamlessly integrating with Next.js.
- **Markdown**: A lightweight, human-readable format for writing content that’s easy to version control with Git.

This combination lets you write blog posts in Markdown, process them into a usable format with Contentlayer, and serve them efficiently with Next.js. Let’s dive into how it works.

### Step 1: Setting Up Your Next.js Project

First, create a new Next.js project if you don’t already have one:

```bash
npx create-next-app@latest my-blog
cd my-blog
```

Install the necessary dependencies:

```bash
npm install contentlayer next-contentlayer
```

Wrap your Next.js configuration with Contentlayer by updating `next.config.js`:

```javascript
const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer({
  // Your existing Next.js config
});
```

### Step 2: Configuring Contentlayer

Create a `contentlayer.config.js` file in your project root to define how Contentlayer processes your Markdown files. Here’s a simple example:

```javascript
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string' }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace(/\.md$/, '')
    }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post]
});
```

This setup tells Contentlayer to look for Markdown files in a `content/posts` directory and extract fields like `title`, `date`, and `description`. The `slug` is automatically generated from the filename.

### Step 3: Writing Your First Blog Post

Create a `content/posts` directory and add a Markdown file, like `my-first-post.md`:

```markdown
---
title: My First Blog Post
date: 2025-04-09
description: A simple intro to blogging with Next.js.
---

Welcome to my blog! This is my first post, written in Markdown and powered by Contentlayer and Next.js.
```

The frontmatter (between `---`) defines metadata, while the content below is the body of your post.

### Step 4: Fetching and Displaying Posts

Contentlayer generates a data layer you can import into your Next.js pages. For example, create a blog index page at `pages/blog/index.js`:

```javascript
import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';

export default function Blog() {
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {allPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title} - {post.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

For individual posts, create a dynamic route at `pages/blog/[slug].js`:

```javascript
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allPosts } from 'contentlayer/generated';

export default function Post({ post }) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <MDXContent />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = allPosts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = allPosts.find((post) => post.slug === params.slug);
  return { props: { post } };
}
```

### Step 5: Deploy and Enjoy

**You have to build your project to generate the markdown files.**
Run your project with `npm run dev` to see it in action.
Once you’re happy, deploy it to Vercel or your preferred platform.
Add more posts by creating new Markdown files in the `content/posts` directory—Contentlayer and Next.js handle the rest!

## Benefits of This Approach

- **Simplicity**: Write posts in Markdown without needing a database or complex CMS.
- **Flexibility**: Customize the structure and styling however you like.
- **Performance**: Next.js static generation ensures blazing-fast load times.
- **Version Control**: Store your content in Git alongside your code.

## Conclusion

Using Next.js with Contentlayer and Markdown is a game-changer for developers who want a lightweight, maintainable blog. It’s perfect for personal sites, portfolios, or even small documentation projects.

Read more on [contentlayer.dev](https://contentlayer.dev/)
