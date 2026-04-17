/**
 * Full navigation coverage — all desktop menu links, mobile burger menu.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

// ─── Desktop navigation (default 1280×720 viewport) ──────────────────────────

const NAV_LINKS = [
  { name: 'Home', url: /\/$/ },
  { name: 'Posts', url: /\/posts\/?$/ },
  { name: 'Lens', url: /\/lens\/?$/ },
  { name: 'Journey', url: /\/journey\/?$/ },
  { name: 'Projects', url: /\/projects\/?$/ },
  { name: 'About Me', url: /\/about-me\/?$/ },
  { name: 'Contact Me', url: /\/contact-me\/?$/ }
] as const;

for (const { name, url } of NAV_LINKS) {
  test(`desktop nav: clicking "${name}" navigates to the correct URL`, async ({
    page
  }) => {
    await page.goto('/');

    // Use first() — some pages (e.g. posts with pagination) render a second <nav>
    const nav = page.getByRole('navigation').first();
    const link = nav.getByRole('link', { name, exact: true });
    await expect(link).toBeVisible();

    await link.click();
    // Wait for page to finish loading before checking URL — dev server (Turbopack)
    // compiles pages on-demand and can take longer than the default 5s timeout.
    // Using 'load' instead of 'networkidle' — pages with dynamic imports (e.g. About Me)
    // keep network activity alive indefinitely and never reach networkidle on CI.
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(url, { timeout: 15000 });
  });
}

test('desktop home page: resume download link is present', async ({ page }) => {
  await page.goto('/');

  // ResumeDownloaderButton is in the home page content, not inside <nav>
  // Its aria-label is "Download Software-Engineer-Ramin-Rezaei-CV.pdf"
  const downloadLink = page.getByRole('link', { name: /download.*\.pdf/i });
  await expect(downloadLink).toBeVisible();
  await expect(downloadLink).toHaveAttribute('download');
});

test('desktop nav: theme toggle button is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
});

// ─── Mobile burger menu (375×812 viewport) ───────────────────────────────────

test('mobile: burger menu toggle button is visible', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  // Burger toggle button (aria-label="Burger Menu Toggle")
  const burgerButton = page.getByRole('button', { name: 'Burger Menu Toggle' });
  await expect(burgerButton).toBeVisible();
});

test('mobile: burger menu opens and shows all navigation links', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const burgerButton = page.getByRole('button', { name: 'Burger Menu Toggle' });
  await burgerButton.click();

  // Links in the burger menu are rendered in uppercase
  for (const { name } of NAV_LINKS) {
    const link = page.getByRole('link', { name: name.toUpperCase(), exact: true });
    await expect(link).toBeVisible();
  }
});

test('mobile: clicking a burger menu link navigates and closes the menu', async ({
  page
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const burgerButton = page.getByRole('button', { name: 'Burger Menu Toggle' });
  await burgerButton.click();

  // Click the POSTS link (uppercase in burger menu)
  await page.getByRole('link', { name: 'POSTS', exact: true }).click();
  await expect(page).toHaveURL(/\/posts\/?$/);

  // After navigation, fullscreen menu should be gone
  await expect(page.getByRole('link', { name: 'POSTS', exact: true })).not.toBeVisible();
});

test('mobile: burger menu toggle button closes the menu when clicked again', async ({
  page
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const burgerButton = page.getByRole('button', { name: 'Burger Menu Toggle' });

  // Open
  await burgerButton.click();
  await expect(page.getByRole('link', { name: 'HOME', exact: true })).toBeVisible();

  // Close
  await burgerButton.click();
  // Wait for close animation (500ms timeout in the component)
  await expect(page.getByRole('link', { name: 'HOME', exact: true })).not.toBeVisible({
    timeout: 1500
  });
});
