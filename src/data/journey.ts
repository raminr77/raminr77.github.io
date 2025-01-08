export interface JourneyItem {
  id: number;
  year: number;
  date: string;
  title: string;
  description: string;
}

export const JOURNEY_DATA: JourneyItem[] = [
  {
    id: 1,
    year: 1999,
    title: 'Birthday',
    date: '11 Jun 1999',
    description:
      "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used"
  },
  {
    id: 2,
    year: 1999,
    title: 'Birthday',
    date: '11 Jun 1999',
    description:
      "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used"
  },
  {
    id: 3,
    year: 1999,
    title: 'Birthday',
    date: '11 Jun 1999',
    description:
      "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used"
  },
  {
    id: 4,
    year: 1999,
    title: 'Birthday',
    date: '11 Jun 1999',
    description:
      "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used"
  },
  {
    id: 5,
    year: 1999,
    title: 'Birthday',
    date: '11 Jun 1999',
    description:
      "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used"
  },
  {
    id: 6,
    year: 1999,
    title: 'Birthday',
    date: '11 Jun 1999',
    description:
      "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used"
  },
  {
    id: 6,
    year: 1999,
    title: 'Birthday',
    date: '11 Jun 1999',
    description:
      "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used"
  },
  {
    id: 6,
    year: 1999,
    title: 'Birthday',
    date: '11 Jun 1999',
    description:
      "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used"
  }
] as const;
