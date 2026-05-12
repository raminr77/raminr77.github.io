import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sendGTMEvent } from '@next/third-parties/google';

import { TrackedAnchor } from './tracked-anchor';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

const mockedSendGTMEvent = jest.mocked(sendGTMEvent);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<TrackedAnchor />', () => {
  it('renders an anchor with href, target, and rel preserved', () => {
    render(
      <TrackedAnchor
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        trackingPayload={{ event: 'external' }}
      >
        External
      </TrackedAnchor>
    );

    const anchor = screen.getByRole('link', { name: 'External' });
    expect(anchor).toHaveAttribute('href', 'https://example.com');
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('fires the GTM event when clicked', async () => {
    const user = userEvent.setup();
    render(
      <TrackedAnchor
        href="https://example.com"
        trackingPayload={{ event: 'click', label: 'linkedin' }}
      >
        LinkedIn
      </TrackedAnchor>
    );

    const anchor = screen.getByRole('link', { name: 'LinkedIn' });
    // Prevent jsdom from logging "Not implemented: navigation" when the real
    // anchor click bubbles to navigation.
    anchor.addEventListener('click', (clickEvent) => clickEvent.preventDefault());

    await user.click(anchor);

    expect(mockedSendGTMEvent).toHaveBeenCalledTimes(1);
    expect(mockedSendGTMEvent).toHaveBeenCalledWith({
      event: 'click',
      label: 'linkedin'
    });
  });

  it('passes through extra anchor attributes', () => {
    render(
      <TrackedAnchor
        href="/x"
        aria-label="external link"
        data-testid="anchor"
        trackingPayload={{ event: 'noop' }}
      >
        x
      </TrackedAnchor>
    );

    const anchor = screen.getByTestId('anchor');
    expect(anchor).toHaveAttribute('aria-label', 'external link');
  });
});
