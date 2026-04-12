import { render, screen } from '@testing-library/react';

import type { RecommendationItem } from '@/data';

import { RecommendationCard } from '../components/recommendation-card';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
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
    LINKEDIN_RECOMMENDATION: (name: string) => `recommendation_${name}`
  }
}));

const mockItem: RecommendationItem = {
  id: 1,
  fullName: 'Jane Doe',
  title: 'Senior Engineer',
  caption: 'Tech Lead',
  date: 'Jan 2025',
  text: 'Ramin is an excellent engineer.',
  url: 'https://linkedin.com/in/jane',
  imageURL: '/jane.jpg'
};

describe('<RecommendationCard />', () => {
  it('renders the full name in uppercase', () => {
    render(<RecommendationCard data={mockItem} />);
    expect(screen.getByText('JANE DOE')).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<RecommendationCard data={mockItem} />);
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
  });

  it('renders the caption and date', () => {
    render(<RecommendationCard data={mockItem} />);
    expect(screen.getByText('Tech Lead')).toBeInTheDocument();
    expect(screen.getByText(/Jan 2025/)).toBeInTheDocument();
  });

  it('renders the recommendation text', () => {
    render(<RecommendationCard data={mockItem} />);
    expect(screen.getByText('Ramin is an excellent engineer.')).toBeInTheDocument();
  });

  it('renders a LinkedIn link', () => {
    render(<RecommendationCard data={mockItem} />);
    const links = screen.getAllByRole('link');
    const linkedInLink = links.find(
      (l) => l.getAttribute('href') === 'https://linkedin.com/in/jane'
    );
    expect(linkedInLink).toBeDefined();
  });

  it('links open in a new tab', () => {
    render(<RecommendationCard data={mockItem} />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('renders the profile image when imageURL is provided', () => {
    render(<RecommendationCard data={mockItem} />);
    expect(screen.getByAltText('Jane Doe')).toBeInTheDocument();
  });

  it('does not render an image when imageURL is null', () => {
    render(<RecommendationCard data={{ ...mockItem, imageURL: null }} />);
    expect(screen.queryByAltText('Jane Doe')).not.toBeInTheDocument();
  });

  it('sets the correct anchor id', () => {
    const { container } = render(<RecommendationCard data={mockItem} />);
    expect(container.querySelector('#item-1')).toBeInTheDocument();
  });
});
