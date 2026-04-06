import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('opens a lens item modal and returns to the list after closing it', async ({
  page
}) => {
  await page.goto('/lens/');

  const firstLensCard = page.getByTestId('lens-card').first();
  const firstLensTitle = firstLensCard.locator('h3');
  await expect(firstLensTitle).toBeVisible();
  await expect(firstLensCard).toBeVisible();

  const selectedTitle = (await firstLensTitle.textContent())?.trim();
  expect(selectedTitle).toBeTruthy();
  await firstLensCard.click();

  // Wait for the modal to open
  const closeButton = page.getByTestId('close-button');
  const modalTitle = page.getByTestId('lens-item-title');
  const modalDescription = page.getByTestId('lens-item-description');

  await expect(modalTitle).toBeVisible();
  await expect(closeButton).toBeVisible();
  await expect(modalDescription).toBeVisible();
  await expect(modalTitle).toContainText(selectedTitle!);

  await closeButton.click();

  await expect(modalTitle).not.toBeVisible();
  await expect(closeButton).not.toBeVisible();
  await expect(modalDescription).not.toBeVisible();

  await expect(firstLensCard).toBeVisible();
});
