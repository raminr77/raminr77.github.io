import { NextResponse } from 'next/server';
import { POSTS_DATA, type Post } from '@/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post: Post | null =
    POSTS_DATA.find((item: Post) => String(item.id) === id) || null;

  if (POSTS_DATA.length === 0 || !post) {
    return NextResponse.json({
      status: 404,
      message: 'the Post not found!'
    });
  }

  return NextResponse.json({ data: post });
}
