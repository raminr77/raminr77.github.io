export type LensSlideItem = {
  id: number;
  src: string;
  alt: string;
  cover: string;
  isVideo: boolean;
};

export type LensItem = {
  id: number;
  src: string;
  alt: string;
  title: string;
  cover: string;
  isVideo: boolean;
  createdAt: string;
  description: string;
  slides?: LensSlideItem[];
};

export const LENS_DATA = {
  title: 'Lens',
  description: 'A collection of moments, memories, and creative captures'
} as const;

export const LENS_ITEMS: LensItem[] = [
  {
    id: 1,
    isVideo: false,
    src: '/images/lens/AR-01.jpg',
    cover: '/images/lens/AR-01.jpg',
    title: 'Boozt Tech Conference 2024',
    alt: 'AR/VR Presentation by Ramin Rezaei on Boozt Tech Conference 2024',
    createdAt: '2024-01-01T12:00:00Z',
    description:
      'Ramin delivering an engaging presentation on AR/VR technologies at the Boozt Tech Conference 2024, showcasing innovative solutions and insights in the field.',
    slides: [
      {
        id: 1,
        isVideo: false,
        src: '/images/lens/AR-02.jpg',
        cover: '/images/lens/AR-02.jpg',
        alt: 'AR/VR Presentation by Ramin Rezaei on Boozt Tech Conference 2024'
      },
      {
        id: 2,
        isVideo: false,
        src: '/images/lens/AR-03.jpg',
        cover: '/images/lens/AR-03.jpg',
        alt: 'AR/VR Presentation by Ramin Rezaei on Boozt Tech Conference 2024'
      },
      {
        id: 3,
        isVideo: false,
        src: '/images/lens/AR-04.jpg',
        cover: '/images/lens/AR-04.jpg',
        alt: 'AR/VR Presentation by Ramin Rezaei on Boozt Tech Conference 2024'
      }
    ]
  }
];
