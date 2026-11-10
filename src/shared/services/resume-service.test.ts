import { requestResume } from './resume-service';

jest.mock('@/shared/helpers', () => ({
  notify: { error: jest.fn(), success: jest.fn() }
}));

jest.mock('@/shared/api/constants', () => ({
  ENDPOINTS: { requestResume: 'https://email-api.test/resume' }
}));

const mockVerify = jest.fn();
jest.mock('./recaptcha-service', () => ({
  isValidGoogleReCaptcha: (arguments_: unknown) => mockVerify(arguments_) as unknown
}));

const mockFetchResponse = (body: unknown, isOk = true): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: isOk,
    json: () => Promise.resolve(body)
  });
};

const REQUEST = { email: 'ramin@example.com', recaptchaToken: 'token' };

beforeEach(() => {
  jest.clearAllMocks();
  mockVerify.mockResolvedValue(true);
});

describe('requestResume', () => {
  it('rejects when the reCAPTCHA token is missing', async () => {
    await expect(requestResume({ ...REQUEST, recaptchaToken: '' })).rejects.toThrow(
      /missing recaptcha/i
    );
  });

  it('does not call the resume endpoint when reCAPTCHA fails', async () => {
    mockVerify.mockRejectedValue(new Error('bad token'));
    global.fetch = jest.fn();

    await expect(requestResume(REQUEST)).rejects.toThrow('bad token');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('posts the email and token to the resume endpoint', async () => {
    mockFetchResponse({
      success: true,
      message: 'Sent',
      downloadUrl: 'https://cdn.test/cv.pdf'
    });

    await requestResume(REQUEST);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://email-api.test/resume',
      expect.objectContaining({ method: 'POST', body: JSON.stringify(REQUEST) })
    );
  });

  it('returns the message and download url on success', async () => {
    mockFetchResponse({
      success: true,
      message: 'Sent',
      downloadUrl: 'https://cdn.test/cv.pdf'
    });

    await expect(requestResume(REQUEST)).resolves.toEqual({
      message: 'Sent',
      downloadUrl: 'https://cdn.test/cv.pdf'
    });
  });

  it('drops a download url that is not http(s)', async () => {
    mockFetchResponse({ success: true, downloadUrl: 'javascript:alert(1)' });

    const delivery = await requestResume(REQUEST);
    expect(delivery.downloadUrl).toBeNull();
  });

  it('throws the backend message when the request is not successful', async () => {
    mockFetchResponse({ success: false, message: 'Mailbox unavailable' });

    await expect(requestResume(REQUEST)).rejects.toThrow('Mailbox unavailable');
  });

  it('throws when the response status is not ok', async () => {
    mockFetchResponse({ success: true }, false);

    await expect(requestResume(REQUEST)).rejects.toThrow(/could not send/i);
  });
});
