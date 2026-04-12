import { render, screen } from '@testing-library/react';

import { ResumeDownloaderButton } from './index';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('@/data', () => ({
  RESUME_FILE: {
    url: '/test-resume.pdf',
    fileName: 'test-resume.pdf',
    actionLabel: 'Download Resume'
  }
}));

jest.mock('@/shared/constants', () => ({
  GTM_EVENTS: { DOWNLOAD_RESUME: 'download_resume' }
}));

describe('<ResumeDownloaderButton />', () => {
  it('renders a link with the resume label', () => {
    render(<ResumeDownloaderButton />);
    expect(screen.getByText('Download Resume')).toBeInTheDocument();
  });

  it('has the correct href', () => {
    render(<ResumeDownloaderButton />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test-resume.pdf');
  });

  it('has the download attribute with the correct filename', () => {
    render(<ResumeDownloaderButton />);
    expect(screen.getByRole('link')).toHaveAttribute('download', 'test-resume.pdf');
  });

  it('opens in a new tab', () => {
    render(<ResumeDownloaderButton />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('has an aria-label', () => {
    render(<ResumeDownloaderButton />);
    expect(screen.getByLabelText(/download/i)).toBeInTheDocument();
  });
});
