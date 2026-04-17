import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('main navigation works', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('link', {
      name: /download\s+Software-Engineer-Ramin-Rezaei-CV\.pdf/i
    })
  ).toBeVisible();

  await page.getByRole('link', { name: 'Posts' }).click();
  await expect(page).toHaveURL(/\/posts\/?$/);
  await expect(page.getByRole('heading', { name: /post/i })).toBeVisible();

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL(/\/$/);
});
