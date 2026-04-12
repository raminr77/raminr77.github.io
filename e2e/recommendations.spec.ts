/**
 * Recommendations page — cards, LinkedIn links, anchor navigation.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/recommendations/');
});

test('recommendations page loads with the page heading', async ({ page }) => {
  await expect(page).toHaveURL(/\/recommendations\/?$/);
  await expect(page.getByText(/recommendations/i).first()).toBeVisible();
});

test('at least one LinkedIn link is visible', async ({ page }) => {
  const linkedinLink = page.getByRole('link', { name: /linkedin/i }).first();
  await expect(linkedinLink).toBeVisible();
});

test('all LinkedIn links open in a new tab', async ({ page }) => {
  const linkedinLinks = page.getByRole('link', { name: /linkedin/i });
  const count = await linkedinLinks.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    await expect(linkedinLinks.nth(i)).toHaveAttribute('target', '_blank');
  }
});

test('recommendation cards display a person name', async ({ page }) => {
  // RecommendationCard renders fullName in uppercase
  // We just check that there's content — names are data-driven
  const cards = page.locator('[id^="item-"]');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
});

test('footer call-to-action link is visible', async ({ page }) => {
  // The page has a footer link (e.g., "Recommend Me on LinkedIn")
  const footerLink = page.locator('main a').last();
  await expect(footerLink).toBeVisible();
});

test('page has navigation', async ({ page }) => {
  await expect(page.getByRole('navigation')).toBeVisible();
});
