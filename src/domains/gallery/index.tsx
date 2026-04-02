import type { Metadata } from 'next';

import { ContentContainer } from '@/layout/components/content-container';

export const metadata: Metadata = {
  title: 'Gallery'
};

export function GalleryPage() {
  return (
    <ContentContainer className="text-center">
      <h1 className="mb-5 text-4xl font-bold">Gallery</h1>
      <p className="text-lg">Welcome to the gallery page!</p>
      <p className="mt-4">Here you can find a collection of images and media soon.</p>
      <p className="mt-2">Stay tuned for updates!</p>
    </ContentContainer>
  );
}
