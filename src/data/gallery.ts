export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  cover: string;
  isVideo: boolean;
  createdAt: string;
  description: string;
};

export const GALLERY_DATA = {
  title: 'Gallery',
  description: 'A collection of moments, memories, and creative captures'
} as const;

export const GALLERY_ITEMS: GalleryItem[] = [];
