import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BurgerMenu } from './index';

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

jest.mock('@/shared/components', () => ({
  ToggleThemeButton: () => <button type="button" data-testid="toggle-theme" />
}));

jest.mock('@/shared/helpers', () => ({
  animator: () => '',
  pageTitleGenerator: () => 'Home'
}));

jest.mock('./burger-menu-tools-animation', () => ({
  BurgerMenuToolsAnimation: () => <div data-testid="tools-animation" />
}));

beforeEach(() => {
  mockSendGTMEvent.mockClear();
  mockUsePathname.mockReturnValue('/');
  jest.useFakeTimers();
});

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

describe('<BurgerMenu />', () => {
  it('renders the toggle button with the right aria-label', () => {
    render(<BurgerMenu />);
    expect(
      screen.getByRole('button', { name: /burger menu toggle/i })
    ).toBeInTheDocument();
  });

  it('opens the menu when the toggle button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<BurgerMenu />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /burger menu toggle/i }));

    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
    expect(mockSendGTMEvent).toHaveBeenCalled();
  });

  it('hides the page title block once the menu is open', async () => {
    mockUsePathname.mockReturnValue('/posts/');
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<BurgerMenu />);

    // Title visible before opening (mobile fallback).
    expect(screen.getByText('Home')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /burger menu toggle/i }));

    // Once the menu opens, the title block has the `max-md:hidden` modifier applied.
    const titleHeading = screen.queryByText('Home');
    expect(titleHeading?.parentElement?.className).toContain('max-md:hidden');
  });
});
