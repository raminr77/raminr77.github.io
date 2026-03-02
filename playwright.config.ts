import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT || 3000);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL,
    serviceWorkers: 'block',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ],

  webServer: {
    command: 'pnpm run build && pnpm run start',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
    env: {
      ...process.env,
      PORT: String(PORT),

      // Keep e2e runs self-contained (no real keys required)
      NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY:
        process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY || 'e2e-site-key',
      NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE:
        process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CODE || '',
      NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE:
        process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_CODE || '',
      NEXT_PUBLIC_SENTRY_ENABLED: process.env.NEXT_PUBLIC_SENTRY_ENABLED || 'false'
    }
  }
});
