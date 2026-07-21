import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Header } from './index';

const mockSendGTMEvent = jest.fn();
const mockUsePathname = jest.fn();

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: (...args: unknown[]) => {
    mockSendGTMEvent(...args);
  }
}));

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname() as string
}));

jest.mock('@/layout/components/burger-menu', () => ({
  BurgerMenu: () => <div data-testid="burger-menu" />
}));

jest.mock('@/shared/components', () => ({
  ToggleThemeButton: () => <button type="button" data-testid="toggle-theme" />
}));

jest.mock('@/shared/helpers', () => ({
  animator: () => ''
}));

// jsdom returns an all-zero rect from getBoundingClientRect, which makes
// motion's shared-layoutId FLIP projection math never converge, so the
// exiting <li>'s underline never unmounts. Fake distinct, non-zero rects per
// call so the projection settles and the exit animation actually completes.
let boundingClientRectCallCount = 0;

beforeEach(() => {
  mockSendGTMEvent.mockClear();
  mockUsePathname.mockReturnValue('/');
  boundingClientRectCallCount = 0;
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => {
    boundingClientRectCallCount += 1;
    return {
      height: 2,
      width: 100,
      left: 0,
      bottom: 2,
      right: 100,
      top: boundingClientRectCallCount,
      x: 0,
      y: boundingClientRectCallCount,
      toJSON: () => ({})
    };
  });
});

describe('<Header />', () => {
  it('renders a nav with one link per menu entry plus the theme toggle', () => {
    render(<Header />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    expect(screen.getByTestId('toggle-theme')).toBeInTheDocument();
    expect(screen.getByTestId('burger-menu')).toBeInTheDocument();
  });

  it('fires a GTM event when a nav link is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const firstLink = screen.getAllByRole('link')[0];
    firstLink.addEventListener('click', (clickEvent) => clickEvent.preventDefault());
    await user.click(firstLink);

    expect(mockSendGTMEvent).toHaveBeenCalledTimes(1);
  });

  it('does not add backdrop-blur on the home pathname', () => {
    mockUsePathname.mockReturnValue('/');
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header?.className).not.toContain('backdrop-blur-sm');
  });

  it('adds backdrop-blur on non-home pathnames', () => {
    mockUsePathname.mockReturnValue('/posts/');
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header?.className).toContain('backdrop-blur-sm');
  });

  it('shows the sliding underline under a hovered nav link', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.hover(screen.getAllByRole('link')[0]);

    expect(screen.getByTestId('nav-underline')).toBeInTheDocument();
  });

  it('keeps a single underline instance when hover moves to another link', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const links = screen.getAllByRole('link');

    await user.hover(links[0]);
    await user.hover(links[1]);

    await waitFor(
      () => {
        expect(screen.getAllByTestId('nav-underline')).toHaveLength(1);
      },
      { timeout: 2000 }
    );
  });

  it('removes the underline once the mouse leaves the menu', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const links = screen.getAllByRole('link');

    await user.hover(links[0]);
    expect(screen.getByTestId('nav-underline')).toBeInTheDocument();

    await user.unhover(links[0]);

    await waitFor(
      () => {
        expect(screen.queryByTestId('nav-underline')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
