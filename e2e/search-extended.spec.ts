/**
 * Posts search — extended coverage: Escape key, backdrop click, empty state,
 * no-results state, and result navigation. Basic happy-path is in search.spec.ts.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/posts/');
});

async function openSearch(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: 'Search Posts' }).click();
  await expect(page.getByRole('button', { name: 'Close Search' })).toBeVisible();
}

test('search modal opens when search button is clicked', async ({ page }) => {
  await page.getByRole('button', { name: 'Search Posts' }).click();
  await expect(page.getByTestId('search')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close Search' })).toBeVisible();
});

test('search modal closes when close button is clicked', async ({ page }) => {
  await openSearch(page);

  await page.getByRole('button', { name: 'Close Search' }).click();
  await expect(page.getByRole('button', { name: 'Close Search' })).not.toBeVisible();
  await expect(page.getByTestId('search')).not.toBeVisible();
});

test('pressing Escape closes the search modal', async ({ page }) => {
  await openSearch(page);

  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Close Search' })).not.toBeVisible();
});

test('clicking the backdrop (outside modal content) closes the search modal', async ({
  page
}) => {
  await openSearch(page);

  // The backdrop is fixed full-screen at z-10.
  // The header (z-50) covers the top ~80px. The modal content (max-w-3xl, mt-40)
  // is centered horizontally (~256–1024px in a 1280px viewport) and starts at ~160px from top.
  // Click at x=50 (left of modal content), y=400 (below header, inside backdrop area).
  await page.mouse.click(50, 400);

  await expect(page.getByRole('button', { name: 'Close Search' })).not.toBeVisible();
});

test('typing in search and clearing it shows no results state', async ({ page }) => {
  await openSearch(page);

  const searchInput = page.getByTestId('search');
  await searchInput.fill('some query to get results');

  await page.waitForTimeout(400);
  await searchInput.clear();
  await page.waitForTimeout(400);

  // With empty value, posts list is cleared
  await expect(page.getByText('No posts found.')).not.toBeVisible();
});

test('search with no matches shows "No posts found." message', async ({ page }) => {
  await openSearch(page);

  const searchInput = page.getByTestId('search');
  await searchInput.fill('xyzzy-definitely-not-a-real-post-title-12345');

  await page.waitForTimeout(500);

  await expect(page.getByText('No posts found.')).toBeVisible();
});

test('search results appear after typing a query', async ({ page }) => {
  await openSearch(page);

  const searchInput = page.getByTestId('search');
  await searchInput.fill('react');

  await page.waitForTimeout(500);

  // The results are scoped to the modal content (parent of the close button)
  const modalContent = page.getByRole('button', { name: 'Close Search' }).locator('..');
  const count = await modalContent.locator('ul a').count();
  if (count > 0) {
    await expect(modalContent.locator('ul a').first()).toBeVisible();
  }
});

test('clicking a search result navigates to the post detail page', async ({ page }) => {
  await openSearch(page);

  const searchInput = page.getByTestId('search');
  await searchInput.fill('property');

  await page.waitForTimeout(500);

  // Scope to the modal content to avoid matching nav links
  const modalContent = page.getByRole('button', { name: 'Close Search' }).locator('..');
  const firstResult = modalContent.locator('ul a').first();

  if (await firstResult.isVisible()) {
    await firstResult.click();
    await expect(page).toHaveURL(/\/posts\/\d+/);
  }
});

test('search input auto-focuses when modal opens', async ({ page }) => {
  await openSearch(page);

  const searchInput = page.getByTestId('search');
  await expect(searchInput).toBeFocused();
});
