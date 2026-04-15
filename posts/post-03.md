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

When I decided to add a blog to my personal site, I didn't want to deal with a CMS or a database. I just wanted to write Markdown files, push them to Git, and have them show up as posts. The stack I landed on was Next.js + Contentlayer, and it worked well for a while.

> **Note:** Contentlayer's repository was archived in 2024 and is no longer actively maintained. The core concepts in this post still hold, but you may want to look at alternatives like [Velite](https://velite.js.org/) or [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) for new projects.

The idea is simple: Contentlayer reads your Markdown files and generates type-safe data you can import directly into your Next.js pages. No database, no API calls, just files on disk that become typed objects at build time. Git handles versioning, and you write posts in whatever editor you already use.

## Setting Up Your Next.js Project

Start with a Next.js project if you don't have one:

```bash
npx create-next-app@latest my-blog
cd my-blog
```

Then install Contentlayer:

```bash
npm install contentlayer next-contentlayer
```

Wrap your Next.js config with Contentlayer in `next.config.js`:

```javascript
const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer({
  // Your existing Next.js config
});
```

## Configuring Contentlayer

Create a `contentlayer.config.js` at your project root. This is where you tell Contentlayer where your Markdown files live and what fields to extract:

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

The `slug` is computed from the filename automatically, so you don't have to set it in every post's frontmatter.

## Writing a Post

Create a `content/posts` directory and add a Markdown file like `my-first-post.md`:

```markdown
---
title: My First Blog Post
date: 2025-04-09
description: A simple intro to blogging with Next.js.
---

Welcome to my blog! This is my first post, written in Markdown and powered by Contentlayer and Next.js.
```

The frontmatter (between `---`) defines metadata, while the content below is the body of your post.

## Displaying Posts

Contentlayer generates a data layer you can import directly. For the blog index page at `pages/blog/index.js`:

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

For individual posts at `pages/blog/[slug].js`:

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

## Deploying

Before running the dev server, keep in mind that **Contentlayer generates its data layer at build time**, so you need to build first or run `npm run dev` (which triggers the generation automatically on start).

Once everything looks good, deploy to Vercel or your preferred platform. Adding a new post is as simple as creating a new Markdown file in the `content/posts` directory; Contentlayer and Next.js take care of the rest.

## Wrapping Up

For a developer-owned blog, this stack hits a sweet spot: you write in Markdown, your content lives in Git alongside your code, and Next.js handles all the rendering. It works especially well for personal sites and portfolios where you don't need a full CMS.

Read more on [contentlayer.dev](https://contentlayer.dev/)
