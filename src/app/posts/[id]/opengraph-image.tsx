import { ImageResponse } from 'next/og';

import { getPostContent } from '@/shared/helpers/posts/get-post-content';
import { PERSONAL_DATA } from '@/data';

export const runtime = 'nodejs';
export const alt = 'Blog post preview';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

export default async function Image({ params }: RouteParams) {
  const { id } = await params;
  const post = getPostContent(Number(id));

  const title = post?.title ?? 'Post Not Found';
  const category = post?.category ?? 'Blog';
  const description = post?.description ?? PERSONAL_DATA.pageDescription;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: '#0b0b0f',
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(255, 143, 0, 0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.12), transparent 55%)',
        fontFamily: 'system-ui, "Segoe UI", sans-serif',
        color: '#ffffff'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            padding: '8px 16px',
            borderRadius: 999,
            border: '1px solid rgba(255, 143, 0, 0.6)',
            color: '#ff8f00',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          {category}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          maxWidth: 1040
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em'
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.35,
            color: 'rgba(255, 255, 255, 0.75)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 24,
          borderTop: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.01em' }}>
            {PERSONAL_DATA.fullName}
          </div>
          <div style={{ fontSize: 22, color: 'rgba(255, 255, 255, 0.6)' }}>
            {PERSONAL_DATA.title}
          </div>
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#ff8f00',
            fontWeight: 600
          }}
        >
          raminrezaei.se
        </div>
      </div>
    </div>,
    {
      ...size
    }
  );
}
