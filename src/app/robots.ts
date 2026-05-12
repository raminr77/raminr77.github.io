import type { MetadataRoute } from 'next';

import { ENV } from '@/shared/constants';
import { PERSONAL_DATA } from '@/data';

const SITE_URL = PERSONAL_DATA.url.replace(/\/$/, '');

// Vercel exposes the deployment target via VERCEL_ENV ('production' | 'preview' | 'development').
// We want preview deployments crawled only by their owners, not Googlebot.
function isProduction(): boolean {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv) return vercelEnv === 'production';
  return ENV.NODE_ENV === 'production';
}

export default function robots(): MetadataRoute.Robots {
  if (!isProduction()) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      host: SITE_URL
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
