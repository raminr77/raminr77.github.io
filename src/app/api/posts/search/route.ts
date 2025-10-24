import { getPosts, type Posts } from '@/shared/helpers/posts/get-posts';

export function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query: string = searchParams.get('q') || '';
    const posts: Posts = getPosts(null, query);

    return Response.json(
      {
        success: true,
        data: posts.data,
        message: 'Search completed successfully'
      },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch {
    return Response.json({
      success: false,
      message: 'An error occurred while searching for posts.'
    });
  }
}
