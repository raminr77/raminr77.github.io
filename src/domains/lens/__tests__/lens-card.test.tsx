import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { LensItem } from '@/data';

import { LensCard } from '../components/lens-card';

jest.mock('@/shared/hooks', () => ({
  useIsClient: () => true
}));

jest.mock('../components/lens-gallery-modal', () => ({
  LensGalleryModal: ({ onClose }: { onClose: () => void }) => (
    <div role="dialog" data-testid="gallery-modal">
      <button onClick={onClose}>Close</button>
    </div>
  )
}));

const mockItem: LensItem = {
  id: 1,
  src: '/photo.jpg',
  alt: 'A landscape',
  title: 'Mountain View',
  cover: '/cover.jpg',
  isVideo: false,
  createdAt: '2024-06-01',
  description: 'A beautiful mountain view',
  slides: []
};

describe('<LensCard />', () => {
  it('renders the card with title', () => {
    render(<LensCard data={mockItem} disabledAnimation />);
    expect(screen.getByText('Mountain View')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<LensCard data={mockItem} disabledAnimation />);
    expect(screen.getByText('A beautiful mountain view')).toBeInTheDocument();
  });

  it('shows item count and date', () => {
    render(<LensCard data={mockItem} disabledAnimation />);
    // 1 cover + 0 slides = 1 item
    expect(screen.getByText(/1 Items/)).toBeInTheDocument();
    expect(screen.getByText(/2024-06-01/)).toBeInTheDocument();
  });

  it('opens modal on click', async () => {
    const user = userEvent.setup();
    render(<LensCard data={mockItem} disabledAnimation />);
    await user.click(screen.getByTestId('lens-card'));
    expect(screen.getByTestId('gallery-modal')).toBeInTheDocument();
  });

  it('opens modal on Enter key', async () => {
    const user = userEvent.setup();
    render(<LensCard data={mockItem} disabledAnimation />);
    screen.getByTestId('lens-card').focus();
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('gallery-modal')).toBeInTheDocument();
  });

  it('closes modal when close is triggered', async () => {
    const user = userEvent.setup();
    render(<LensCard data={mockItem} disabledAnimation />);
    await user.click(screen.getByTestId('lens-card'));
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByTestId('gallery-modal')).not.toBeInTheDocument();
  });

  it('counts slides correctly', () => {
    const itemWithSlides: LensItem = {
      ...mockItem,
      slides: [
        { id: 1, src: '/s1.jpg', alt: 'slide 1', cover: '/s1c.jpg', isVideo: false },
        { id: 2, src: '/s2.jpg', alt: 'slide 2', cover: '/s2c.jpg', isVideo: false }
      ]
    };
    render(<LensCard data={itemWithSlides} disabledAnimation />);
    // 1 cover + 2 slides = 3 items
    expect(screen.getByText(/3 Items/)).toBeInTheDocument();
  });
});
