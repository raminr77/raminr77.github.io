/**
 * Projects page — project cards, badges, demo links.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects/');
});

test('projects page loads and shows the page heading', async ({ page }) => {
  await expect(page).toHaveURL(/\/projects\/?$/);
  await expect(page.getByText(/projects/i).first()).toBeVisible();
});

test('at least one project card is visible', async ({ page }) => {
  // Each project card has a title rendered in a <p class="font-title">
  await expect(page.locator('main p').first()).toBeVisible();
});

test('project cards show Open Source or Private badge', async ({ page }) => {
  const openSourceBadges = page.getByText('Open Source');
  const privateBadges = page.getByText('Private');

  const openCount = await openSourceBadges.count();
  const privateCount = await privateBadges.count();

  // At least one badge type must be present
  expect(openCount + privateCount).toBeGreaterThan(0);
});

test('Demo links on open-source projects open in a new tab', async ({ page }) => {
  const demoLinks = page.getByRole('link', { name: 'Demo' });
  const count = await demoLinks.count();

  if (count > 0) {
    const firstDemo = demoLinks.first();
    await expect(firstDemo).toHaveAttribute('target', '_blank');
    await expect(firstDemo).toHaveAttribute('rel', 'noopener noreferrer');

    const href = await firstDemo.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toMatch(/^https?:\/\//);
  }
});

test('project cards display stack technology badges', async ({ page }) => {
  // Stack badges are small <span> elements with text-xs class inside project cards
  const stackBadges = page.locator('main span.text-xs');
  await expect(stackBadges.first()).toBeVisible();
});

test('projects page has navigation', async ({ page }) => {
  await expect(page.getByRole('navigation')).toBeVisible();
});
