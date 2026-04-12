import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ToggleThemeButton } from './index';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('@/shared/components/icons', () => ({
  Icons: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />
}));

jest.mock('@/shared/constants', () => ({
  FEATURE_FLAGS: { TOGGLE_THEME_BUTTON: true },
  GTM_EVENTS: { TOGGLE_THEME: (theme: string) => `toggle_theme_${theme}` },
  LOCAL_STORAGE_KEYS: { THEME: 'theme' }
}));

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
});

describe('<ToggleThemeButton />', () => {
  it('renders the button', () => {
    act(() => {
      render(<ToggleThemeButton />);
    });
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('defaults to dark theme — shows sun icon (to switch to light)', () => {
    act(() => {
      render(<ToggleThemeButton />);
    });
    expect(screen.getByTestId('icon-sun')).toBeInTheDocument();
  });

  it('reads saved light theme from localStorage and shows moon icon', () => {
    localStorage.setItem('theme', 'light');
    act(() => {
      render(<ToggleThemeButton />);
    });
    expect(screen.getByTestId('icon-moon')).toBeInTheDocument();
  });

  it('toggles from dark to light on click', async () => {
    const user = userEvent.setup();
    act(() => {
      render(<ToggleThemeButton />);
    });
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(screen.getByTestId('icon-moon')).toBeInTheDocument();
  });

  it('persists the new theme to localStorage after toggle', async () => {
    const user = userEvent.setup();
    act(() => {
      render(<ToggleThemeButton />);
    });
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('applies theme class to document element', () => {
    act(() => {
      render(<ToggleThemeButton />);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('shows button text in burger menu mode', () => {
    act(() => {
      render(<ToggleThemeButton isBurgerMenu />);
    });
    expect(screen.getByText(/switch to/i)).toBeInTheDocument();
  });
});
