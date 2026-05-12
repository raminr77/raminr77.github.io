import { render, screen } from '@testing-library/react';

import { ContactMePage } from '../index';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('react-google-recaptcha-v3', () => ({
  GoogleReCaptchaProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="recaptcha-provider">{children}</div>
  )
}));

jest.mock('@/shared/helpers', () => ({
  animator: () => ''
}));

jest.mock('@/shared/components', () => ({
  PageHeader: ({ title }: { title: string }) => <h1>{title}</h1>
}));

jest.mock('@/layout/components', () => ({
  ContentContainer: ({ children }: { children: React.ReactNode }) => (
    <main data-testid="content-container">{children}</main>
  )
}));

jest.mock('../components', () => ({
  ContactForm: () => (
    <form data-testid="contact-form">
      <button type="submit">Send</button>
    </form>
  )
}));

describe('<ContactMePage />', () => {
  it('renders the page header and the contact form inside the reCAPTCHA provider', () => {
    render(<ContactMePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /contact me/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByTestId('recaptcha-provider')).toBeInTheDocument();
  });

  it('renders the calendar / link buttons from the data file', () => {
    render(<ContactMePage />);
    const externalLinks = screen
      .getAllByRole('link')
      .filter((linkElement) => linkElement.getAttribute('target') === '_blank');
    expect(externalLinks.length).toBeGreaterThan(0);
  });
});
