import type { MetadataRoute } from 'next';

import { getPosts } from '@/shared/helpers/posts/get-posts';
import { ROUTES } from '@/shared/constants';
import { PERSONAL_DATA } from '@/data';

const SITE_URL = PERSONAL_DATA.url.replace(/\/$/, '');

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

interface StaticRoute {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

const STATIC_ROUTES: StaticRoute[] = [
  { path: ROUTES.HOME, changeFrequency: 'monthly', priority: 1 },
  { path: ROUTES.POSTS, changeFrequency: 'weekly', priority: 0.9 },
  { path: ROUTES.PROJECTS, changeFrequency: 'monthly', priority: 0.8 },
  { path: ROUTES.JOURNEY, changeFrequency: 'monthly', priority: 0.7 },
  { path: ROUTES.RECOMMENDATIONS, changeFrequency: 'monthly', priority: 0.7 },
  { path: ROUTES.LENS, changeFrequency: 'monthly', priority: 0.6 },
  { path: ROUTES.ABOUT_ME, changeFrequency: 'yearly', priority: 0.6 },
  { path: ROUTES.CONTACT_ME, changeFrequency: 'yearly', priority: 0.5 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  const postEntries: MetadataRoute.Sitemap = getPosts().data.map((post) => ({
    url: `${SITE_URL}/posts/${post.id}/`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'yearly',
    priority: 0.8
  }));

  return [...staticEntries, ...postEntries];
}
