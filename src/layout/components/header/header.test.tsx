import { render, screen } from '@testing-library/react';
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

beforeEach(() => {
  mockSendGTMEvent.mockClear();
  mockUsePathname.mockReturnValue('/');
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
});
