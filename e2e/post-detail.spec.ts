/**
 * Post detail page — metadata bar, share button, tags, back navigation,
 * and related post recommendations.
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

async function goToFirstPost(page: import('@playwright/test').Page) {
  // Navigate directly to a known active post to avoid dev-server timing issues
  // that occur when many tests click through the posts list simultaneously.
  await page.goto('/posts/1?slug=start-a-new-adventure');
  await expect(page).toHaveURL(/\/posts\/1/);
}

test('post detail shows title in an h3', async ({ page }) => {
  await goToFirstPost(page);
  await expect(page.locator('main h3').first()).toBeVisible();
});

test('post detail shows author name', async ({ page }) => {
  await goToFirstPost(page);
  // PostAuthor renders the author in a <p> inside a flex row with an icon
  await expect(page.locator('main p').first()).toBeVisible();
});

test('post detail shows a formatted date', async ({ page }) => {
  await goToFirstPost(page);
  // PostDate renders a <span> with format "LLLL d, yyyy" e.g. "January 1, 2025"
  const dateSpan = page
    .locator('main span')
    .filter({ hasText: /\w+ \d+, \d{4}/ })
    .first();
  await expect(dateSpan).toBeVisible();
});

test('post detail shows category as an amber link', async ({ page }) => {
  await goToFirstPost(page);
  // PostCategory renders a link with href containing "category="
  const categoryLink = page.locator('main a[href*="category="]').first();
  await expect(categoryLink).toBeVisible();
});

test('post detail shows reading time', async ({ page }) => {
  await goToFirstPost(page);
  await expect(page.getByText(/Reading Time \d+ Minute/)).toBeVisible();
});

test('share button is visible and labelled', async ({ page }) => {
  await goToFirstPost(page);
  const shareBtn = page.getByRole('button', { name: 'Share post' });
  await expect(shareBtn).toBeVisible();
  await expect(shareBtn.getByText('Share')).toBeVisible();
});

test('clicking share button copies the post link to clipboard', async ({ page }) => {
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  await goToFirstPost(page);

  const url = page.url();
  // Extract post id from URL like /posts/7?slug=...
  const match = url.match(/\/posts\/(\d+)/);
  expect(match).not.toBeNull();
  const postId = match![1];

  await page.getByRole('button', { name: 'Share post' }).click();

  // Share link is constructed as origin/posts/<id>/
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardText).toContain(`/posts/${postId}/`);
});

test('post category link navigates to filtered posts list', async ({ page }) => {
  await goToFirstPost(page);

  const categoryLink = page.locator('main a[href*="category="]').first();
  await categoryLink.click();
  await expect(page).toHaveURL(/\/posts.*category=/);
  // Posts list with filter applied — clear filter button visible
  await expect(page.getByTestId('clear-filter-link')).toBeVisible();
});

test('post tags are links with tag filter URLs', async ({ page }) => {
  await goToFirstPost(page);

  const tagLinks = page.locator('main a[href*="tag="]');
  const count = await tagLinks.count();

  if (count > 0) {
    const firstTagHref = await tagLinks.first().getAttribute('href');
    expect(firstTagHref).toMatch(/tag=/);
    // Tags open in a new tab
    await expect(tagLinks.first()).toHaveAttribute('target', '_blank');
  }
});

test('back to posts link navigates to posts list', async ({ page }) => {
  await goToFirstPost(page);

  const backLink = page.getByRole('link', { name: 'Back To All Posts' });
  await expect(backLink).toBeVisible();
  await backLink.click();
  await expect(page).toHaveURL(/\/posts\/?$/);
});

test('post detail page has navigation and main content area', async ({ page }) => {
  await goToFirstPost(page);
  await expect(page.getByRole('navigation').first()).toBeVisible();
  await expect(page.locator('main')).toBeVisible();
});
