import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('theme toggle switches html class and persists after reload', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');
  await expect(html).toHaveClass(/\bdark\b/);

  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(html).toHaveClass(/\blight\b/);

  await page.reload();
  await expect(html).toHaveClass(/\blight\b/);
});
