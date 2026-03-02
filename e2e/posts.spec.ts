import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('can open a post from the list and return back', async ({ page }) => {
  await page.goto('/posts/');

  const firstReadMore = page.getByRole('link', { name: '[ Read More ]' }).first();
  await expect(firstReadMore).toBeVisible();
  await firstReadMore.click();

  await expect(page).toHaveURL(/\/posts\/\d+/);
  await expect(page.locator('main h3').first()).toBeVisible();

  const backLink = page.getByRole('link', { name: 'Back To All Posts' });
  await expect(backLink).toBeVisible();
  await backLink.click();
  await expect(page).toHaveURL(/\/posts\/?$/);
});
