import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { JourneyItem } from '@/data/journey';

import { JourneyCard } from '../components/journey-card';

const mockSendGTMEvent = jest.fn<void, unknown[]>();
jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: (...args: unknown[]) => {
    mockSendGTMEvent(...args);
  }
}));

jest.mock('@/shared/components', () => ({
  Icons: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
  PixelCanvas: () => <div data-testid="pixel-canvas" />,
  TrackedAnchor: ({
    href,
    children,
    trackingPayload,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    trackingPayload: unknown;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      onClick={() => {
        mockSendGTMEvent(trackingPayload);
      }}
      {...rest}
    >
      {children}
    </a>
  )
}));

jest.mock('@/shared/constants', () => ({
  ROUTES: {
    HOME: '/',
    LENS: '/lens/',
    POSTS: '/posts/',
    JOURNEY: '/journey/',
    PROJECTS: '/projects/',
    ABOUT_ME: '/about-me/',
    CONTACT_ME: '/contact-me/',
    RECOMMENDATIONS: '/recommendations/'
  },
  GTM_EVENTS: {
    CHECK_EXPERIENCE: (label: string) => ({ event: 'check_experience', label })
  }
}));

jest.mock('@/shared/helpers', () => ({
  animator: () => ''
}));

const baseItem: JourneyItem = {
  id: 1,
  year: 2024,
  date: '2024 - present',
  title: 'Senior Engineer at Acme',
  location: 'Stockholm, Sweden',
  description: '<p>Building things.</p>'
};

beforeEach(() => {
  mockSendGTMEvent.mockClear();
});

describe('<JourneyCard />', () => {
  it('renders the title, year, location and date', () => {
    render(<JourneyCard data={baseItem} />);
    expect(screen.getByText(baseItem.title)).toBeInTheDocument();
    expect(screen.getByText(String(baseItem.year))).toBeInTheDocument();
    expect(screen.getByText(baseItem.location)).toBeInTheDocument();
    expect(screen.getByText(baseItem.date)).toBeInTheDocument();
  });

  it('renders the description as HTML', () => {
    render(<JourneyCard data={baseItem} />);
    expect(screen.getByText('Building things.')).toBeInTheDocument();
  });

  it('renders bullet items when provided', () => {
    render(
      <JourneyCard
        data={{
          ...baseItem,
          items: ['<strong>First</strong> item', '<em>Second</em> item']
        }}
      />
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('does not render a link when url is missing', () => {
    render(<JourneyCard data={baseItem} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders an external link and fires the GTM event on click when url is present', async () => {
    const user = userEvent.setup();
    render(<JourneyCard data={{ ...baseItem, url: 'https://acme.example' }} />);

    const link = screen.getByRole('link', { name: new RegExp(baseItem.title, 'i') });
    expect(link).toHaveAttribute('href', 'https://acme.example');

    await user.click(link);

    expect(mockSendGTMEvent).toHaveBeenCalledWith({
      event: 'check_experience',
      label: baseItem.title
    });
  });
});
