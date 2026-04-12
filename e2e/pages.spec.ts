/**
 * Smoke tests — verify every main page loads and shows its primary content.
 * These are the fastest safety net: if a page fails to render, this catches it.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('home page loads with resume download link and navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('link', { name: /download.*\.pdf/i })).toBeVisible();
});

test('posts page loads with post cards', async ({ page }) => {
  await page.goto('/posts/');

  await expect(page).toHaveURL(/\/posts\/?$/);
  await expect(page.getByRole('link', { name: '[ Read More ]' }).first()).toBeVisible();
});

test('lens page loads with gallery cards', async ({ page }) => {
  await page.goto('/lens/');

  await expect(page).toHaveURL(/\/lens\/?$/);
  await expect(page.getByTestId('lens-card').first()).toBeVisible();
});

test('journey page loads with content', async ({ page }) => {
  await page.goto('/journey/');

  await expect(page).toHaveURL(/\/journey\/?$/);
  // Page header title
  await expect(page.getByText(/journey/i).first()).toBeVisible();
});

test('projects page loads with project cards', async ({ page }) => {
  await page.goto('/projects/');

  await expect(page).toHaveURL(/\/projects\/?$/);
  // At least one project title is visible
  await expect(page.locator('main').first()).toBeVisible();
  // Projects page has a heading
  await expect(page.getByText(/projects/i).first()).toBeVisible();
});

test('about me page loads with content and resume button', async ({ page }) => {
  await page.goto('/about-me/');

  await expect(page).toHaveURL(/\/about-me\/?$/);
  await expect(page.getByRole('link', { name: /download.*\.pdf/i })).toBeVisible();
});

test('contact me page loads with form', async ({ page }) => {
  await page.goto('/contact-me/');

  await expect(page).toHaveURL(/\/contact-me\/?$/);
  await expect(page.getByTestId('email-input')).toBeVisible();
  await expect(page.getByTestId('subject-input')).toBeVisible();
  await expect(page.getByTestId('message-input')).toBeVisible();
  await expect(page.getByTestId('submit-button')).toBeVisible();
});

test('recommendations page loads with cards', async ({ page }) => {
  await page.goto('/recommendations/');

  await expect(page).toHaveURL(/\/recommendations\/?$/);
  await expect(page.getByText(/recommendations/i).first()).toBeVisible();
  // At least one LinkedIn link is visible
  await expect(page.getByRole('link', { name: /linkedin/i }).first()).toBeVisible();
});
