import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { downloadFile } from '@/shared/helpers';
import { requestResume } from '@/shared/services';

import { ResumeRequestModal } from './index';

jest.mock('@next/third-parties/google', () => ({ sendGTMEvent: jest.fn() }));

jest.mock('@/shared/services', () => ({ requestResume: jest.fn() }));

jest.mock('@/shared/helpers', () => ({ downloadFile: jest.fn() }));

const mockExecuteRecaptcha = jest.fn();
let mockIsRecaptchaLoaded = true;

jest.mock('react-google-recaptcha-v3', () => ({
  GoogleReCaptchaProvider: ({ children }: { children: React.ReactNode }) => children,
  useGoogleReCaptcha: () => ({
    executeRecaptcha: mockIsRecaptchaLoaded ? mockExecuteRecaptcha : undefined
  })
}));

const DOWNLOAD_URL = 'https://cdn.test/cv.pdf';

describe('<ResumeRequestModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsRecaptchaLoaded = true;
    mockExecuteRecaptcha.mockResolvedValue('token');
  });

  it('shows an error for an invalid email and does not submit', async () => {
    render(<ResumeRequestModal onClose={jest.fn()} />);
    const user = userEvent.setup();

    await user.type(screen.getByTestId('resume-email-input'), 'not-an-email');
    await user.click(screen.getByTestId('resume-submit-button'));

    expect(await screen.findByText(/email address is invalid/i)).toBeInTheDocument();
    expect(requestResume).not.toHaveBeenCalled();
  });

  it('requires an email', async () => {
    render(<ResumeRequestModal onClose={jest.fn()} />);

    await userEvent.click(screen.getByTestId('resume-submit-button'));

    expect(await screen.findByText(/must to enter your email/i)).toBeInTheDocument();
    expect(requestResume).not.toHaveBeenCalled();
  });

  it('sends the request, shows the link and starts the download', async () => {
    jest.mocked(requestResume).mockResolvedValue({
      message: 'Sent',
      downloadUrl: DOWNLOAD_URL
    });
    render(<ResumeRequestModal onClose={jest.fn()} />);
    const user = userEvent.setup();

    await user.type(screen.getByTestId('resume-email-input'), 'ramin@example.com');
    await user.click(screen.getByTestId('resume-submit-button'));

    expect(await screen.findByTestId('resume-success')).toHaveTextContent(
      'ramin@example.com'
    );
    expect(requestResume).toHaveBeenCalledWith({
      email: 'ramin@example.com',
      recaptchaToken: 'token'
    });
    expect(screen.getByTestId('resume-download-link')).toHaveAttribute(
      'href',
      DOWNLOAD_URL
    );
    expect(downloadFile).toHaveBeenCalledWith(DOWNLOAD_URL, expect.any(String));
  });

  it('shows the backend error message and stays on the form', async () => {
    jest.mocked(requestResume).mockRejectedValue(new Error('Mailbox unavailable'));
    render(<ResumeRequestModal onClose={jest.fn()} />);
    const user = userEvent.setup();

    await user.type(screen.getByTestId('resume-email-input'), 'ramin@example.com');
    await user.click(screen.getByTestId('resume-submit-button'));

    expect(await screen.findByTestId('resume-error')).toHaveTextContent(
      'Mailbox unavailable'
    );
    expect(downloadFile).not.toHaveBeenCalled();
  });

  it('explains that reCAPTCHA is unavailable and blocks submitting', () => {
    mockIsRecaptchaLoaded = false;
    render(<ResumeRequestModal onClose={jest.fn()} />);

    expect(screen.getByTestId('resume-error')).toHaveTextContent(/could not be loaded/i);
    expect(screen.getByTestId('resume-submit-button')).toBeDisabled();
  });

  it('closes on Escape and on backdrop click', async () => {
    const onClose = jest.fn();
    render(<ResumeRequestModal onClose={onClose} />);
    const user = userEvent.setup();

    await user.keyboard('{Escape}');
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));

    await user.click(screen.getByTestId('resume-modal-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
