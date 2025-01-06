import { ContentContainer } from '@/layout/components/content-container';

export async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: postId } = await params;
  return (
    <ContentContainer>
      <h1>Post Detail - {postId}</h1>
    </ContentContainer>
  );
}
