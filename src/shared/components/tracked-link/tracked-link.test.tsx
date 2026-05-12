import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sendGTMEvent } from '@next/third-parties/google';

import { TrackedLink } from './index';

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn()
}));

const mockedSendGTMEvent = jest.mocked(sendGTMEvent);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<TrackedLink />', () => {
  it('renders an anchor pointing at href with the provided children', () => {
    render(
      <TrackedLink href="/posts" trackingPayload={{ event: 'click' }}>
        Read posts
      </TrackedLink>
    );

    const link = screen.getByRole('link', { name: 'Read posts' });
    expect(link).toHaveAttribute('href', '/posts');
  });

  it('fires the GTM event when clicked', async () => {
    const user = userEvent.setup();
    render(
      <TrackedLink
        href="/projects"
        trackingPayload={{ event: 'click', label: 'projects' }}
      >
        Projects
      </TrackedLink>
    );

    const link = screen.getByRole('link', { name: 'Projects' });
    // Prevent jsdom from logging "Not implemented: navigation" when the real
    // anchor click bubbles to navigation.
    link.addEventListener('click', (clickEvent) => clickEvent.preventDefault());

    await user.click(link);

    expect(mockedSendGTMEvent).toHaveBeenCalledTimes(1);
    expect(mockedSendGTMEvent).toHaveBeenCalledWith({
      event: 'click',
      label: 'projects'
    });
  });

  it('forwards className to the underlying anchor', () => {
    render(
      <TrackedLink
        href="/x"
        className="text-amber-500"
        trackingPayload={{ event: 'noop' }}
      >
        x
      </TrackedLink>
    );

    expect(screen.getByRole('link', { name: 'x' })).toHaveClass('text-amber-500');
  });
});
