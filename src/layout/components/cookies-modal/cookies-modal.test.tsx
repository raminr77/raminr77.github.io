import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CookiesModal } from './index';

const getCookiesModalStatusMock = jest.fn<string, []>();
const updateCookiesModalStatusMock = jest.fn<void, [string]>();

jest.mock('@/shared/helpers', () => ({
  animator: () => '',
  getCookiesModalStatus: (): string => getCookiesModalStatusMock(),
  updateCookiesModalStatus: (status: string): void => {
    updateCookiesModalStatusMock(status);
  },
  CookiesModalStatus: {}
}));

jest.mock('@/shared/constants', () => ({
  COOKIES_MODAL_STATUS: {
    NONE: 'none',
    ACCEPT: 'accept',
    REJECT: 'reject'
  }
}));

jest.mock('@/data', () => ({
  GENERAL_SITE_DATA: {
    cookiesModal: {
      title: 'Cookies title',
      description: 'Cookies description',
      accept: 'Accept all',
      reject: 'Reject all'
    }
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<CookiesModal />', () => {
  it('renders the modal when stored status is NONE', () => {
    getCookiesModalStatusMock.mockReturnValue('none');

    render(<CookiesModal />);

    expect(screen.getByText('Cookies title')).toBeInTheDocument();
    expect(screen.getByText('Cookies description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept all' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject all' })).toBeInTheDocument();
  });

  it('hides itself after the user accepts', async () => {
    getCookiesModalStatusMock.mockReturnValue('none');
    const user = userEvent.setup();

    render(<CookiesModal />);
    await user.click(screen.getByRole('button', { name: 'Accept all' }));

    expect(updateCookiesModalStatusMock).toHaveBeenCalledWith('accept');
    expect(screen.queryByText('Cookies title')).not.toBeInTheDocument();
  });

  it('hides itself after the user rejects', async () => {
    getCookiesModalStatusMock.mockReturnValue('none');
    const user = userEvent.setup();

    render(<CookiesModal />);
    await user.click(screen.getByRole('button', { name: 'Reject all' }));

    expect(updateCookiesModalStatusMock).toHaveBeenCalledWith('reject');
    expect(screen.queryByText('Cookies title')).not.toBeInTheDocument();
  });

  it('does not render when stored status is ACCEPT', () => {
    getCookiesModalStatusMock.mockReturnValue('accept');

    render(<CookiesModal />);

    expect(screen.queryByText('Cookies title')).not.toBeInTheDocument();
  });
});
