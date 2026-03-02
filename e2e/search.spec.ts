import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('post search modal returns results and can navigate', async ({ page }) => {
  await page.goto('/posts/');

  await page.getByRole('button', { name: 'Search Posts' }).click();

  const searchInput = page.getByTestId('search');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('property');

  const modal = page.getByRole('button', { name: 'Close Search' }).locator('..');
  const firstResult = modal.locator('ul a').first();
  await expect(firstResult).toBeVisible();

  await firstResult.click();
  await expect(page).toHaveURL(/\/posts\/\d+/);
  await expect(page.locator('main h3').first()).toBeVisible();
});
