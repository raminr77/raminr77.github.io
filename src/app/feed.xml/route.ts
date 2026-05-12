import { getPosts } from '@/shared/helpers/posts/get-posts';
import { PERSONAL_DATA } from '@/data';

const SITE_URL = PERSONAL_DATA.url.replace(/\/$/, '');
const FEED_URL = `${SITE_URL}/feed.xml`;

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => XML_ENTITIES[character] ?? character);
}

function toRFC822(date: Date | string): string {
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) return new Date().toUTCString();
  return parsed.toUTCString();
}

export function GET(): Response {
  const posts = getPosts().data;

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/posts/${post.id}/`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${toRFC822(post.date)}</pubDate>
      <author>noreply@raminrezaei.se (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${PERSONAL_DATA.fullName} — Blog`)}</title>
    <link>${SITE_URL}/posts/</link>
    <description>${escapeXml(PERSONAL_DATA.pageDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
