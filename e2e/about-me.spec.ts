/**
 * About Me page — hero image, personal info, resume download button.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/about-me/');
});

test('about me page loads at the correct URL', async ({ page }) => {
  await expect(page).toHaveURL(/\/about-me\/?$/);
});

test('resume download button is visible and has download attribute', async ({ page }) => {
  // aria-label is "Download Software-Engineer-Ramin-Rezaei-CV.pdf", not "Download Resume"
  const downloadLink = page.getByRole('link', { name: /download.*\.pdf/i });
  await expect(downloadLink).toBeVisible();
  await expect(downloadLink).toHaveAttribute('download');
});

test('resume download link points to a PDF file', async ({ page }) => {
  const downloadLink = page.getByRole('link', { name: /download.*\.pdf/i });
  const href = await downloadLink.getAttribute('href');
  expect(href).toMatch(/\.pdf$/i);
});

test('about me page has a personal image', async ({ page }) => {
  const heroImage = page.locator('img').first();
  await expect(heroImage).toBeVisible();
});

test('page has navigation', async ({ page }) => {
  await expect(page.getByRole('navigation').first()).toBeVisible();
});

test('about me page has descriptive text content', async ({ page }) => {
  const mainContent = page.locator('main');
  await expect(mainContent).toBeVisible();
  const paragraphs = mainContent.locator('p');
  const count = await paragraphs.count();
  expect(count).toBeGreaterThan(0);
});
