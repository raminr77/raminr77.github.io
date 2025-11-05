import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './index';

// Mock Spinner to avoid relying on its internals
jest.mock('@/shared/components/spinner', () => ({
  Spinner: () => <span data-testid="spinner" />
}));

describe('<Button />', () => {
  test('renders label and defaults to type="button"', () => {
    render(<Button label="Click me" type="button" />);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  test('supports type="submit"', () => {
    render(<Button label="Submit" type="submit" />);
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn).toHaveAttribute('type', 'submit');
  });

  test('sets title and aria-label to label', () => {
    render(<Button label="Do stuff" type="button" />);
    const btn = screen.getByRole('button', { name: /do stuff/i });
    expect(btn).toHaveAttribute('title', 'Do stuff');
    expect(btn).toHaveAttribute('aria-label', 'Do stuff');
  });

  test('merges className', () => {
    render(<Button label="Styled" type="button" className="extra-class" />);
    const btn = screen.getByRole('button', { name: /styled/i });
    expect(btn).toHaveClass('extra-class');
  });

  test('disabled prop disables button and prevents clicks', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button label="Nope" type="button" disabled onClick={onClick} />);
    const btn = screen.getByRole('button', { name: /nope/i });

    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('loading shows spinner, disables button, and prevents clicks', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button label="Loading" type="button" loading onClick={onClick} />);
    const btn = screen.getByRole('button', { name: /loading/i });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(btn).toBeDisabled();

    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('fires onClick when enabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button label="Go" type="button" onClick={onClick} />);
    const btn = screen.getByRole('button', { name: /go/i });

    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('keyboard activation works when enabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button label="Key" type="button" onClick={onClick} />);
    const btn = screen.getByRole('button', { name: /key/i });

    btn.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
