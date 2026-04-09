import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('contact form submits (mocked recaptcha + email)', async ({ page }) => {
  await page.route('**/recaptcha/api.js*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: [
        'window.grecaptcha = {',
        '  ready: (cb) => cb && cb(),',
        '  execute: () => Promise.resolve("e2e-token")',
        '};'
      ].join('\n')
    });
  });

  await page.route('**/api/recaptcha-verify', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'e2e ok' })
    });
  });

  await page.route('https://email-api.ramiin.se/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'E2E: message sent' })
    });
  });

  await page.goto('/contact-me/');

  await page.getByTestId('subject-input').fill('Hello from Playwright');
  await page.getByTestId('email-input').fill('e2e@example.com');
  await page
    .getByTestId('message-input')
    .fill('This is an end-to-end test message that is long enough.');

  await page.getByTestId('submit-button').click();
  await expect(page.getByText('E2E: message sent')).toBeVisible();
});
