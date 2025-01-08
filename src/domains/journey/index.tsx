import { PixelCard } from '@/shared/components/pixel-card';
import { ContentContainer } from '@/layout/components/content-container';

export function JourneyPage() {
  return (
    <ContentContainer>
      <PixelCard
        color='blue'
        title='title'
        description='this is a test for description'
      />
    </ContentContainer>
  );
}
