/**
 * Contact form validation — required fields, error messages, calendar links.
 * Form submission is covered separately in contact.spec.ts (mocked).
 */
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/contact-me/');
  // The cookies banner (z-50) sits at the bottom and can block the submit button.
  // Dismiss it so form interactions are unobstructed.
  const acceptBtn = page.getByRole('button', { name: 'Accept' });
  if (await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await acceptBtn.click();
  }
});

test('all required field errors appear when each field is touched and cleared', async ({
  page
}) => {
  // react-hook-form (mode: 'onChange') sets required errors on the onChange event.
  // Native browser constraint validation blocks the submit event when required
  // fields are empty, so we trigger errors by filling then clearing each field.
  await page.getByTestId('subject-input').fill('x');
  await page.getByTestId('subject-input').clear();
  await page.getByTestId('email-input').fill('x');
  await page.getByTestId('email-input').clear();
  await page.getByTestId('message-input').fill('x');
  await page.getByTestId('message-input').clear();

  await expect(page.getByText('You must to enter a subject!')).toBeVisible();
  await expect(page.getByText('You must to enter your email address!')).toBeVisible();
  await expect(page.getByText('You must to enter your message!')).toBeVisible();
});

test('short subject shows min-length error', async ({ page }) => {
  await page.getByTestId('subject-input').fill('Hi');
  await page.getByTestId('submit-button').click();

  await expect(
    page.getByText('Your subject should be more than 10 characters')
  ).toBeVisible();
});

test('invalid email format shows email error', async ({ page }) => {
  await page.getByTestId('email-input').fill('not-an-email');
  // Trigger validation by moving focus
  await page.getByTestId('subject-input').click();

  await expect(page.getByText('Your email address is invalid!')).toBeVisible();
});

test('short message shows min-length error', async ({ page }) => {
  await page.getByTestId('message-input').fill('Too short');
  await page.getByTestId('submit-button').click();

  await expect(
    page.getByText('Your message should be more than 30 characters')
  ).toBeVisible();
});

test('filling all fields correctly clears validation errors', async ({ page }) => {
  // Trigger required errors via fill+clear (onChange) instead of submit,
  // because native validation blocks the submit event on empty required fields.
  await page.getByTestId('subject-input').fill('x');
  await page.getByTestId('subject-input').clear();
  await expect(page.getByText('You must to enter a subject!')).toBeVisible();

  // Fill all fields correctly
  await page.getByTestId('subject-input').fill('This is a valid subject line');
  await page.getByTestId('email-input').fill('valid@example.com');
  await page
    .getByTestId('message-input')
    .fill('This is a message that is long enough to pass validation.');

  await expect(page.getByText('You must to enter a subject!')).not.toBeVisible();
  await expect(page.getByText('You must to enter your email address!')).not.toBeVisible();
  await expect(page.getByText('You must to enter your message!')).not.toBeVisible();
});

test('contact page shows calendar links for scheduling meetings', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Personal Calendar' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Mentorship Calendar' })).toBeVisible();
});

test('calendar links open in a new tab', async ({ page }) => {
  const personalCalendar = page.getByRole('link', { name: 'Personal Calendar' });
  const mentorshipCalendar = page.getByRole('link', { name: 'Mentorship Calendar' });

  await expect(personalCalendar).toHaveAttribute('target', '_blank');
  await expect(mentorshipCalendar).toHaveAttribute('target', '_blank');
});

test('contact form inputs are present and labelled', async ({ page }) => {
  await expect(page.getByTestId('subject-input')).toBeVisible();
  await expect(page.getByTestId('email-input')).toBeVisible();
  await expect(page.getByTestId('message-input')).toBeVisible();
  await expect(page.getByTestId('submit-button')).toBeVisible();

  // Labels are linked to inputs via htmlFor/id
  await expect(page.getByLabel('Subject *')).toBeVisible();
  await expect(page.getByLabel('Email *')).toBeVisible();
  await expect(page.getByLabel('Message *')).toBeVisible();
});
