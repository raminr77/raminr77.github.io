import { sendEmail } from './email-service';
import { notify } from '@/shared/helpers';

jest.mock('./recaptcha-service', () => ({
  isValidGoogleReCaptcha: jest.fn()
}));

jest.mock('@/shared/helpers', () => ({
  notify: { error: jest.fn(), success: jest.fn() }
}));

jest.mock('@/shared/api/constants', () => ({
  ENDPOINTS: { sendMessage: 'https://email-api.example.com' }
}));

import { isValidGoogleReCaptcha } from './recaptcha-service';

const mockRecaptcha = isValidGoogleReCaptcha as jest.Mock;

const validData = {
  email: 'test@test.com',
  subject: 'Hello',
  message: 'A message',
  recaptchaToken: 'valid-token'
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('sendEmail', () => {
  it('throws and notifies when recaptchaToken is missing', async () => {
    await expect(sendEmail({ ...validData, recaptchaToken: '' })).rejects.toThrow(
      'Missing reCAPTCHA token.'
    );
    expect(jest.mocked(notify.error)).toHaveBeenCalledWith({
      message: 'Missing reCAPTCHA token.'
    });
  });

  it('propagates recaptcha failure', async () => {
    mockRecaptcha.mockRejectedValue(new Error('reCAPTCHA failed'));
    await expect(sendEmail(validData)).rejects.toThrow('reCAPTCHA failed');
  });

  it('returns true and notifies success on successful send', async () => {
    mockRecaptcha.mockResolvedValue(true);
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, message: 'Message sent!' })
    });

    const result = await sendEmail(validData);
    expect(result).toBe(true);
    expect(jest.mocked(notify.success)).toHaveBeenCalledWith({
      message: 'Message sent!'
    });
  });

  it('throws and notifies when API returns success: false', async () => {
    mockRecaptcha.mockResolvedValue(true);
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false, message: 'Email service down' })
    });

    await expect(sendEmail(validData)).rejects.toThrow('Email service down');
    expect(jest.mocked(notify.error)).toHaveBeenCalledWith({
      message: 'Email service down'
    });
  });

  it('uses default error message when API failure has no message', async () => {
    mockRecaptcha.mockResolvedValue(true);
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false, message: '' })
    });

    await expect(sendEmail(validData)).rejects.toThrow(
      'We could not send your message now!'
    );
  });
});
