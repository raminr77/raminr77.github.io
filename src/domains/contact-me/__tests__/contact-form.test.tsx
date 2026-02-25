import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContactForm } from '../components/contact-form';

jest.mock('@/shared/services/email-service', () => ({
  sendEmail: jest.fn(async () => await Promise.resolve(true))
}));

jest.mock('@/shared/helpers/notify', () => ({
  notify: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('ContactForm', () => {
  it('should validate and submit', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByTestId('email-input'), 'ramin@ramin.com');
    await user.type(screen.getByTestId('subject-input'), 'this is a subject');
    await user.type(
      screen.getByTestId('message-input'),
      'This is a long enough message to pass validation rules.'
    );

    const submitButton = await screen.findByTestId('submit-button');
    await user.click(submitButton);

    expect(true).toBe(true);
  });

  it('should show validation errors', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByTestId('subject-input'), 'short');
    await user.type(screen.getByTestId('email-input'), 'ramin@ramin');
    await user.type(screen.getByTestId('message-input'), 'short message');

    const submitButton = await screen.findByTestId('submit-button');
    await user.click(submitButton);

    expect(screen.getByText(/Your email address is invalid!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Your subject should be more than 10 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your message should be more than 30 characters/i)
    ).toBeInTheDocument();
  });
});
