import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResumeDownloaderButton } from './index';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

jest.mock('@/data', () => ({
  RESUME_FILE: {
    fileName: 'test-resume.pdf',
    actionLabel: 'Download Resume'
  }
}));

jest.mock('@/shared/constants', () => ({
  GTM_EVENTS: { DOWNLOAD_RESUME: 'download_resume' }
}));

jest.mock('@/shared/components/resume-request-modal', () => ({
  ResumeRequestModal: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="resume-modal">
      <button onClick={onClose}>close</button>
    </div>
  )
}));

describe('<ResumeDownloaderButton />', () => {
  it('renders a button with the resume label', () => {
    render(<ResumeDownloaderButton />);
    expect(screen.getByRole('button', { name: /download/i })).toHaveTextContent(
      'Download Resume'
    );
  });

  it('does not show the modal until it is clicked', () => {
    render(<ResumeDownloaderButton />);
    expect(screen.queryByTestId('resume-modal')).not.toBeInTheDocument();
  });

  it('opens the modal on click', async () => {
    render(<ResumeDownloaderButton />);
    await userEvent.click(screen.getByRole('button', { name: /download/i }));
    expect(await screen.findByTestId('resume-modal')).toBeInTheDocument();
  });

  it('closes the modal when the modal asks to close', async () => {
    render(<ResumeDownloaderButton />);
    await userEvent.click(screen.getByRole('button', { name: /download/i }));
    await userEvent.click(await screen.findByText('close'));
    expect(screen.queryByTestId('resume-modal')).not.toBeInTheDocument();
  });
});
