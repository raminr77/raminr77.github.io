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
  description: 'A collection of moments and memories.'
} as const;

export const LENS_ITEMS: LensItem[] = [
  {
    id: 1,
    isVideo: false,
    createdAt: '2019-02-10',
    title: 'Motosel Seminar at Isfahan',
    alt: 'Motosel Seminar at Isfahan City Center - Ramin Rezaei',
    src: '/images/lens/MOTOSEL.webp',
    cover: '/images/lens/MOTOSEL.webp',
    description:
      'Motosel seminar at Isfahan City Center, For sellers and buyers in the car industry, sharing our application and our platform with the audience.',
    slides: []
  },
  {
    id: 2,
    isVideo: false,
    createdAt: '2021-01-11',
    title: 'Birthday at Digikala',
    alt: 'Birthday Celebration at Digikala - Ramin Rezaei',
    src: '/images/lens/BIRTHDAY-CELEBRATION-DIGIKA-01.jpg',
    cover: '/images/lens/BIRTHDAY-CELEBRATION-DIGIKA-01.jpg',
    description:
      'A personal moment celebrated with the team at Digikala, highlighting the human side of the journey.',
    slides: []
  },
  {
    id: 3,
    isVideo: false,
    createdAt: '2022-08-01',
    title: 'Digistyle Team',
    alt: 'Digistyle Team - Ramin Rezaei',
    src: '/images/lens/DIGISTYLE.webp',
    cover: '/images/lens/DIGISTYLE.webp',
    description:
      'Digistyle team, a group of amazing people together to create a fashion e-commerce experience within Digikala.',
    slides: []
  },
  {
    id: 4,
    isVideo: false,
    createdAt: '2023-08-01',
    title: 'Last Day at Digikala',
    alt: 'Last Day at Digikala - Ramin Rezaei',
    src: '/images/lens/LAST-DAY-OF-DIGIKA-01.jpg',
    cover: '/images/lens/LAST-DAY-OF-DIGIKA-01.jpg',
    description:
      'Wrapping up my journey at Digikala after years of growth, challenges, and meaningful experiences.',
    slides: []
  },
  {
    id: 5,
    isVideo: false,
    createdAt: '2024-01-01',
    src: '/images/lens/AR-01.jpg',
    cover: '/images/lens/AR-01.jpg',
    title: 'AR/VR Talk at Boozt Tech Conference',
    alt: 'AR/VR Presentation by Ramin Rezaei',
    description:
      'Delivered a talk on AR/VR technologies, sharing real-world use cases and practical insights into immersive experiences.',
    slides: [
      {
        id: 1,
        isVideo: false,
        src: '/images/lens/AR-02.jpg',
        cover: '/images/lens/AR-02.jpg',
        alt: 'AR/VR Presentation by Ramin Rezaei'
      },
      {
        id: 2,
        isVideo: false,
        src: '/images/lens/AR-03.jpg',
        cover: '/images/lens/AR-03.jpg',
        alt: 'AR/VR Presentation by Ramin Rezaei'
      },
      {
        id: 3,
        isVideo: false,
        src: '/images/lens/AR-04.jpg',
        cover: '/images/lens/AR-04.jpg',
        alt: 'AR/VR Presentation by Ramin Rezaei'
      }
    ]
  },
  {
    id: 6,
    isVideo: false,
    createdAt: '2024-03-01',
    src: '/images/lens/BEAUTY-IN-CODE-2024-01.jpg',
    cover: '/images/lens/BEAUTY-IN-CODE-2024-01.jpg',
    title: 'Beauty in Code 2024',
    alt: 'Beauty in Code 2024 - Ramin Rezaei',
    description:
      'Attended Beauty in Code 2024 in Malmö, a high-quality conference focused on modern software engineering practices.',
    slides: []
  },
  {
    id: 7,
    isVideo: false,
    createdAt: '2024-06-01',
    title: 'Boozt Club, Scaling to 1M Users',
    src: '/images/lens/BOOZT-CLUB-01.jpg',
    cover: '/images/lens/BOOZT-CLUB-01.jpg',
    alt: 'Boozt Club Project - Ramin Rezaei',
    description:
      'Contributed to scaling Boozt Club to over 1 million users in just 230 days, building a high-impact loyalty platform.',
    slides: []
  },
  {
    id: 8,
    isVideo: false,
    createdAt: '2024-06-10',
    src: '/images/lens/VISITOR-GOOGLE-01.webp',
    cover: '/images/lens/VISITOR-GOOGLE-01.webp',
    title: 'Visiting Google Office in Copenhagen',
    alt: 'Ramin Rezaei Visiting Google Office in Copenhagen',
    description:
      'Visited the Google office in Copenhagen, connecting with talented professionals and experiencing the energy of a world-class engineering environment.',
    slides: [
      {
        id: 1,
        isVideo: false,
        src: '/images/lens/VISITOR-GOOGLE-02.webp',
        cover: '/images/lens/VISITOR-GOOGLE-02.webp',
        alt: 'Ramin Rezaei Visiting Google Office in Copenhagen'
      }
    ]
  },
  {
    id: 9,
    isVideo: false,
    createdAt: '2024-11-01',
    title: 'Google AI Day 2024',
    alt: 'Google AI Day 2024 - Ramin Rezaei',
    src: '/images/lens/GOOGLE-AI-DAY-2024-01.webp',
    cover: '/images/lens/GOOGLE-AI-DAY-2024-01.webp',
    description:
      'Attended Google AI Day 2024, exploring the latest trends in AI and exchanging ideas with industry experts.',
    slides: [
      {
        id: 1,
        isVideo: false,
        alt: 'Google AI Day 2024 - Ramin Rezaei',
        src: '/images/lens/GOOGLE-AI-DAY-2024-02.webp',
        cover: '/images/lens/GOOGLE-AI-DAY-2024-02.webp'
      },
      {
        id: 2,
        isVideo: false,
        alt: 'Google AI Day 2024 - Ramin Rezaei',
        src: '/images/lens/GOOGLE-AI-DAY-2024-03.webp',
        cover: '/images/lens/GOOGLE-AI-DAY-2024-03.webp'
      },
      {
        id: 3,
        isVideo: false,
        alt: 'Google AI Day 2024 - Ramin Rezaei',
        src: '/images/lens/GOOGLE-AI-DAY-2024-04.webp',
        cover: '/images/lens/GOOGLE-AI-DAY-2024-04.webp'
      }
    ]
  },
  {
    id: 10,
    isVideo: false,
    createdAt: '2024-11-01',
    title: 'Code in the Dark 2024, 1st Place',
    src: '/images/lens/CODE-IN-THE-DARK-01.webp',
    cover: '/images/lens/CODE-IN-THE-DARK-01.webp',
    alt: 'Code in the Dark 2024 - Ramin Rezaei',
    description:
      'Won 1st place in Code in the Dark Malmö 2024, building a pixel-perfect UI under intense time pressure.',
    slides: [
      {
        id: 1,
        isVideo: false,
        alt: 'Code in the Dark 2024 - Ramin Rezaei',
        src: '/images/lens/CODE-IN-THE-DARK-02.webp',
        cover: '/images/lens/CODE-IN-THE-DARK-02.webp'
      },
      {
        id: 2,
        isVideo: false,
        alt: 'Code in the Dark 2024 - Ramin Rezaei',
        src: '/images/lens/CODE-IN-THE-DARK-03.webp',
        cover: '/images/lens/CODE-IN-THE-DARK-03.webp'
      }
    ]
  },
  {
    id: 11,
    isVideo: false,
    createdAt: '2025-03-01',
    src: '/images/lens/BEAUTY-IN-CODE-2025-01.jpg',
    cover: '/images/lens/BEAUTY-IN-CODE-2025-01.jpg',
    title: 'Beauty in Code 2025',
    alt: 'Beauty in Code 2025 - Ramin Rezaei',
    description:
      'Participated in Beauty in Code 2025 at Malmö Live, a premium single-track tech conference featuring top-tier speakers and forward-thinking engineering insights.',
    slides: []
  },
  {
    id: 12,
    isVideo: false,
    createdAt: '2025-05-01',
    title: 'Last Day at Boozt',
    alt: 'Last Day at Boozt - Ramin Rezaei',
    src: '/images/lens/LAST-DAY-OF-BOOZT-01.webp',
    cover: '/images/lens/LAST-DAY-OF-BOOZT-01.webp',
    description:
      'Closing an important chapter at Boozt. Grateful for the journey, impactful projects, and the incredible team I worked with.',
    slides: [
      {
        id: 1,
        isVideo: false,
        alt: 'Last Day at Boozt - Ramin Rezaei',
        src: '/images/lens/LAST-DAY-OF-BOOZT-02.webp',
        cover: '/images/lens/LAST-DAY-OF-BOOZT-02.webp'
      }
    ]
  },
  {
    id: 13,
    isVideo: false,
    createdAt: '2025-11-01',
    title: 'Google AI Day 2025',
    alt: 'Google AI Day 2025 - Ramin Rezaei',
    src: '/images/lens/GOOGLE-AI-DAY-2025-01.webp',
    cover: '/images/lens/GOOGLE-AI-DAY-2025-01.webp',
    description:
      'Attended Google AI Day 2025, exploring cutting-edge advancements in AI and machine learning while connecting with industry leaders shaping the future.',
    slides: [
      {
        id: 1,
        isVideo: false,
        alt: 'Google AI Day 2025 - Ramin Rezaei',
        src: '/images/lens/GOOGLE-AI-DAY-2025-02.webp',
        cover: '/images/lens/GOOGLE-AI-DAY-2025-02.webp'
      },
      {
        id: 2,
        isVideo: false,
        alt: 'Google AI Day 2025 - Ramin Rezaei',
        src: '/images/lens/GOOGLE-AI-DAY-2025-03.webp',
        cover: '/images/lens/GOOGLE-AI-DAY-2025-03.webp'
      }
    ]
  }
];
