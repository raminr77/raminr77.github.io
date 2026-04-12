import { isValidGoogleReCaptcha } from './recaptcha-service';
import { notify } from '@/shared/helpers';

jest.mock('@/shared/helpers', () => ({
  notify: { error: jest.fn(), success: jest.fn() }
}));

jest.mock('@/shared/api/constants', () => ({
  ENDPOINTS: { verifyReCaptcha: '/api/recaptcha-verify' }
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('isValidGoogleReCaptcha', () => {
  it('returns true when reCAPTCHA verification succeeds', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true })
    });

    const result = await isValidGoogleReCaptcha({ token: 'valid-token' });
    expect(result).toBe(true);
    expect(jest.mocked(notify.error)).not.toHaveBeenCalled();
  });

  it('throws and notifies on failed verification', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false, message: 'Invalid token' })
    });

    await expect(isValidGoogleReCaptcha({ token: 'bad-token' })).rejects.toThrow();
    expect(jest.mocked(notify.error)).toHaveBeenCalledWith({ message: 'Invalid token' });
  });

  it('uses default error message when no message is provided', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false })
    });

    await expect(isValidGoogleReCaptcha({ token: 'bad-token' })).rejects.toThrow();
    expect(jest.mocked(notify.error)).toHaveBeenCalledWith({
      message: 'Error: We could not verify your reCAPTCHA token!'
    });
  });
});
