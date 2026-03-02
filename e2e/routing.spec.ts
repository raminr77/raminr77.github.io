import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('legacy routes redirect', async ({ page }) => {
  await page.goto('/skills');
  await expect(page).toHaveURL(/\/journey\/?$/);
});

test('unknown routes show not-found page', async ({ page }) => {
  await page.goto('/definitely-not-a-real-route');
  await expect(page.getByRole('link', { name: 'Return Home' })).toBeVisible();
});

test('invalid post id redirects to posts list', async ({ page }) => {
  await page.goto('/posts/999999');
  await expect(page).toHaveURL(/\/posts\/?$/);
});
