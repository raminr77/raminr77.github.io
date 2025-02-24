import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { PERSONAL_DATA } from './src/data/personal-data';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    id: { type: 'number', required: true },
    date: { type: 'date', required: true },
    slug: { type: 'string', required: true },
    title: { type: 'string', required: true },
    isActive: { type: 'boolean', required: true },
    description: { required: true, type: 'markdown' },
    category: { type: 'string', default: 'news', required: true },
    author: { type: 'string', required: true, default: PERSONAL_DATA.firstName },
    tags: { type: 'list', default: [], of: { type: 'string' }, required: false }
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` }
  }
}));

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] });

/*

// Post Example //

---
id: 1
author: Ramin
isActive: true
category: news
date: 2025-01-01
slug: my-first-post
title: My First Post
description: This is my first blog post.
tags:
  - react
  - typescript
---

## Introduction

Hello! This is my first blog post.

## Stay Tuned

More posts coming soon!

*/
