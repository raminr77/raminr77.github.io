/**
 * @jest-environment node
 */
import { POST } from './route';

jest.mock('@/shared/api/constants', () => ({
  ENDPOINTS: {
    googleVerifyReCaptcha: 'https://example.test/recaptcha-verify'
  }
}));

jest.mock('@/shared/constants', () => ({
  ENV: { GOOGLE_RECAPTCHA_SECRET_KEY: 'test-secret' }
}));

beforeEach(() => {
  jest.clearAllMocks();
});

function buildRequest(body: unknown) {
  return new Request('https://example.test/api/recaptcha-verify', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

describe('POST /api/recaptcha-verify', () => {
  it('returns 400 when token is missing', async () => {
    const response = await POST(buildRequest({}));
    expect(response.status).toBe(400);
    const json = (await response.json()) as { message: string };
    expect(json.message).toMatch(/missing/i);
  });

  it('returns 400 when Google response is unsuccessful', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false })
    });

    const response = await POST(buildRequest({ token: 'abc' }));
    expect(response.status).toBe(400);
    const json = (await response.json()) as { message: string };
    expect(json.message).toMatch(/failed/i);
  });

  it('returns 400 when score is below threshold', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({ success: true, score: 0.3, action: 'contact_form_submit' })
    });

    const response = await POST(buildRequest({ token: 'abc' }));
    expect(response.status).toBe(400);
    const json = (await response.json()) as { message: string };
    expect(json.message).toMatch(/low/i);
  });

  it('returns 400 when action does not match', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, score: 0.9, action: 'something-else' })
    });

    const response = await POST(buildRequest({ token: 'abc' }));
    expect(response.status).toBe(400);
    const json = (await response.json()) as { message: string };
    expect(json.message).toMatch(/invalid/i);
  });

  it('returns 200 on a fully valid verification', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({ success: true, score: 0.9, action: 'contact_form_submit' })
    });

    const response = await POST(buildRequest({ token: 'abc' }));
    expect(response.status).toBe(200);
    const json = (await response.json()) as { success: boolean };
    expect(json.success).toBe(true);
  });

  it('returns 500 on unexpected errors', async () => {
    const response = await POST(
      new Request('https://example.test/api/recaptcha-verify', {
        method: 'POST',
        body: 'not json' // triggers JSON parse error
      })
    );
    expect(response.status).toBe(500);
  });
});
