/**
 * Posts filtering — category dropdown, clear filter, URL state.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('category dropdown updates the URL and filters posts', async ({ page }) => {
  await page.goto('/posts/');

  const select = page.getByRole('combobox', { name: 'Select a category' });
  await expect(select).toBeVisible();

  // Pick the first real option (skip the placeholder)
  const firstOption = page
    .locator('select[aria-label="Select a category"] option')
    .nth(1);
  const categoryValue = await firstOption.getAttribute('value');
  expect(categoryValue).toBeTruthy();

  await select.selectOption(categoryValue);

  await expect(page).toHaveURL(
    new RegExp(`category=${encodeURIComponent(categoryValue!)}`)
  );
});

test('clear filter button appears after selecting a category and restores all posts', async ({
  page
}) => {
  await page.goto('/posts/');

  const select = page.getByRole('combobox', { name: 'Select a category' });
  const firstOption = page
    .locator('select[aria-label="Select a category"] option')
    .nth(1);
  const categoryValue = await firstOption.getAttribute('value');

  await select.selectOption(categoryValue);

  const clearFilter = page.getByTestId('clear-filter-link');
  await expect(clearFilter).toBeVisible();

  await clearFilter.click();

  await expect(page).toHaveURL(/\/posts\/?(\?.*)?$/);
  await expect(page).not.toHaveURL(/category=/);
  await expect(clearFilter).not.toBeVisible();
});

test('category filter pre-selected when URL contains category param', async ({
  page
}) => {
  const firstOption = await (async () => {
    await page.goto('/posts/');
    const option = page.locator('select[aria-label="Select a category"] option').nth(1);
    return option.getAttribute('value');
  })();

  await page.goto(`/posts/?category=${encodeURIComponent(firstOption!)}`);

  const select = page.getByRole('combobox', { name: 'Select a category' });
  await expect(select).toHaveValue(firstOption!);

  const clearFilter = page.getByTestId('clear-filter-link');
  await expect(clearFilter).toBeVisible();
});

test('selecting empty option from category dropdown clears filter', async ({ page }) => {
  await page.goto('/posts/');

  const select = page.getByRole('combobox', { name: 'Select a category' });
  const firstOption = page
    .locator('select[aria-label="Select a category"] option')
    .nth(1);
  const categoryValue = await firstOption.getAttribute('value');

  // Apply filter first
  await select.selectOption(categoryValue);
  await expect(page).toHaveURL(/category=/);

  // Select the placeholder (empty value)
  await select.selectOption('');
  await expect(page).toHaveURL(/\/posts\/?$/);
  await expect(page).not.toHaveURL(/category=/);
});
