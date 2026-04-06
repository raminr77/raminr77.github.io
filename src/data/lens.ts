export type LensItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  cover: string;
  isVideo: boolean;
  createdAt: string;
  description: string;
};

export const LENS_DATA = {
  title: 'Lens',
  description: 'A collection of moments, memories, and creative captures'
} as const;

export const LENS_ITEMS: LensItem[] = [];
