/**
 * About Me page, hero image, personal info, resume download button.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/about-me/');
});

test('about me page loads at the correct URL', async ({ page }) => {
  await expect(page).toHaveURL(/\/about-me\/?$/);
});

test('resume download button is visible', async ({ page }) => {
  // aria-label is "Download Software-Engineer-Ramin-Rezaei-CV.pdf", not "Download Resume"
  await expect(page.getByRole('button', { name: /download.*\.pdf/i })).toBeVisible();
});

test('resume button opens a modal that validates the email', async ({ page }) => {
  await page.getByRole('button', { name: /download.*\.pdf/i }).click();

  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();

  await modal.getByTestId('resume-email-input').fill('not-an-email');
  await modal.getByTestId('resume-submit-button').click();
  await expect(modal.getByText(/email address is invalid/i)).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
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
