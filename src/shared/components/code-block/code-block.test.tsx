import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CodeBlock } from './index';

const ORIGINAL_SCROLL_HEIGHT = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'scrollHeight'
);

function mockScrollHeight(value: number): void {
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get: () => value
  });
}

function restoreScrollHeight(): void {
  if (ORIGINAL_SCROLL_HEIGHT) {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', ORIGINAL_SCROLL_HEIGHT);
  }
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
  });
});

afterEach(() => {
  restoreScrollHeight();
  jest.restoreAllMocks();
});

describe('<CodeBlock />', () => {
  it('renders only the <pre> when the code is short', () => {
    mockScrollHeight(200);

    render(
      <CodeBlock>
        <code>{'short code'}</code>
      </CodeBlock>
    );

    expect(screen.getByText('short code')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the toggle button when the code exceeds the threshold', () => {
    mockScrollHeight(800);

    render(
      <CodeBlock>
        <code>{'long code'}</code>
      </CodeBlock>
    );

    const toggle = screen.getByRole('button', { name: /expand code/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles label and aria-expanded when the button is clicked', async () => {
    mockScrollHeight(800);
    const user = userEvent.setup();

    render(
      <CodeBlock>
        <code>{'long code'}</code>
      </CodeBlock>
    );

    const toggle = screen.getByRole('button', { name: /expand code/i });

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveTextContent(/collapse code/i);

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveTextContent(/expand code/i);
  });

  it('forwards className and children to the <pre>', () => {
    mockScrollHeight(100);

    const { container } = render(
      <CodeBlock className="language-ts custom">
        <code data-testid="code">{'const x = 1'}</code>
      </CodeBlock>
    );

    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    expect(pre).toHaveClass('language-ts');
    expect(pre).toHaveClass('custom');
    expect(screen.getByTestId('code')).toBeInTheDocument();
  });

  it('connects the button to the <pre> via aria-controls', () => {
    mockScrollHeight(900);

    const { container } = render(
      <CodeBlock>
        <code>{'long code'}</code>
      </CodeBlock>
    );

    const pre = container.querySelector('pre');
    const toggle = screen.getByRole('button');
    expect(toggle.getAttribute('aria-controls')).toBe(pre?.id);
  });

  it('smooth-scrolls when collapsing an expanded block', async () => {
    mockScrollHeight(900);
    const user = userEvent.setup();

    render(
      <CodeBlock>
        <code>{'long code'}</code>
      </CodeBlock>
    );

    const toggle = screen.getByRole('button');
    await user.click(toggle); // expand
    await user.click(toggle); // collapse

    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth' })
    );
  });

  it('snaps instead of smooth-scrolls under prefers-reduced-motion', async () => {
    mockScrollHeight(900);
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
      onchange: null
    }));
    const user = userEvent.setup();

    render(
      <CodeBlock>
        <code>{'long code'}</code>
      </CodeBlock>
    );

    const toggle = screen.getByRole('button');
    await user.click(toggle);
    await user.click(toggle);

    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'auto' })
    );
  });

  it('re-measures on window resize', () => {
    mockScrollHeight(200);

    render(
      <CodeBlock>
        <code>{'short code'}</code>
      </CodeBlock>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    // Now grow the content past the threshold and dispatch a resize.
    mockScrollHeight(800);
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByRole('button', { name: /expand code/i })).toBeInTheDocument();
  });
});
