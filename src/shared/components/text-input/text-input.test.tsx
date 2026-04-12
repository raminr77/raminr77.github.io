import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from './index';

describe('<TextInput />', () => {
  it('renders a text input by default', () => {
    render(<TextInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a textarea when type is "textarea"', () => {
    render(<TextInput type="textarea" />);
    expect(screen.getByRole('textbox').tagName.toLowerCase()).toBe('textarea');
  });

  it('renders an email input when type is "email"', () => {
    const { container } = render(<TextInput type="email" />);
    expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
  });

  it('shows the label when provided', () => {
    render(<TextInput label="Email address" />);
    expect(screen.getByText(/email address/i)).toBeInTheDocument();
  });

  it('shows required asterisk when required is true', () => {
    render(<TextInput label="Name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(<TextInput error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('adds error border class when error is provided', () => {
    const { container } = render(<TextInput error="Error" />);
    expect(container.querySelector('.border-red-500')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<TextInput onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('applies testId as data-testid', () => {
    render(<TextInput testId="my-input" />);
    expect(screen.getByTestId('my-input')).toBeInTheDocument();
  });

  it('applies placeholder text', () => {
    render(<TextInput placeholder="Type here..." />);
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
  });

  it('links label to input via htmlFor', () => {
    render(<TextInput id="name-field" label="Your Name" />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
  });
});
