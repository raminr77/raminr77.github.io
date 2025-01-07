export interface JourneyItem {
  id: number;
  year: number;
  title: string;
  description: string;
}

export const JOURNEY_DATA: JourneyItem[] = [
  {
    id: 1,
    year: 1999,
    title: 'Birthday',
    description: '11 Jun 1999'
  },
  {
    id: 2,
    year: 1999,
    title: 'Birthday',
    description: '11 Jun 1999'
  },
  {
    id: 3,
    year: 1999,
    title: 'Birthday',
    description: '11 Jun 1999'
  },
  {
    id: 4,
    year: 1999,
    title: 'Birthday',
    description: '11 Jun 1999'
  },
  {
    id: 5,
    year: 1999,
    title: 'Birthday',
    description: '11 Jun 1999'
  },
  {
    id: 6,
    year: 1999,
    title: 'Birthday',
    description: '11 Jun 1999'
  }
] as const;
