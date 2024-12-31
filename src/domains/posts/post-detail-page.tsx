export async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: postId } = await params;
  return (
    <main>
      <h1>Post Detail - {postId}</h1>
    </main>
  );
}
