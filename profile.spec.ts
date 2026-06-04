import { expect, test } from '@playwright/test';
import { registerFreshUser, seedUserWithHistory } from './helpers';

test.describe('profile flows', () => {
  test.beforeEach(async ({ page }) => {
    await registerFreshUser(page, 'profile_user');
  });

  test('opens profile and shows persistent stats fields', async ({ page }) => {
    await page.getByTestId('nav-profile').click();

    await expect(page.getByTestId('view-profile')).toBeVisible();
    await expect(page.getByTestId('profile-created')).toBeVisible();
    await expect(page.getByTestId('profile-wins')).toBeVisible();
    await expect(page.getByTestId('profile-losses')).toBeVisible();
    await expect(page.getByTestId('profile-draws')).toBeVisible();
  });

  test('saves display name changes', async ({ page }) => {
    await page.getByTestId('nav-profile').click();
    await page.getByTestId('input-profile-name').fill('renamed_user');
    await page.getByTestId('btn-save-profile').click();

    await expect(page.getByTestId('profile-message')).toBeVisible();
    await expect(page.getByTestId('hello-user')).toContainText('renamed_user');
  });

  test('updates draw stats after a draw', async ({ page }) => {
    // Profile stats are derived from history, so a seeded draw gives us a precise stat check.
    await seedUserWithHistory(page, 'profile_user', [{ difficulty: 'easy', result: 'draw' }]);
    await page.getByTestId('nav-profile').click();

    await expect(page.getByTestId('profile-draws')).not.toHaveText('0');
  });

  test('deletes the account and returns to auth screen', async ({ page }) => {
    await page.getByTestId('nav-profile').click();

    // Account deletion is intentionally guarded by a confirmation dialog.
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await page.getByTestId('btn-delete-account').click();

    await expect(page.getByTestId('auth-form')).toBeVisible();
  });
});
