import { ContentContainer } from '@/layout/components/content-container';

export async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: postId } = await params;
  return (
    <ContentContainer>
      <h1 className='mb-4 text-center'>Post Detail - {postId}</h1>
      <h3 className='text-center'>Coming Soon...</h3>
    </ContentContainer>
  );
}
