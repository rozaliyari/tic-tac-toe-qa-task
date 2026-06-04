import { expect, test } from '@playwright/test';
import { clearAndOpen } from './helpers';
import type { Page } from '@playwright/test';

async function register(page: Page, username: string) {
  await page.getByTestId('input-name').fill(username);
  await page.getByTestId('btn-register').click();
  await expect(page.getByTestId('view-play')).toBeVisible();
}

test.describe('auth flows', () => {
  test.beforeEach(async ({ page }) => {
    await clearAndOpen(page);
  });

  test('registers a new user and enters the app', async ({ page }) => {
    await expect(page.getByTestId('auth-form')).toBeVisible();
    await register(page, 'sdet_user');
    await expect(page.getByTestId('hello-user')).toContainText('sdet_user');
  });

  test('shows an error when logging in with a non-existing user', async ({ page }) => {
    await page.getByTestId('btn-switch-mode').click();
    await expect(page.getByTestId('btn-login')).toBeVisible();

    await page.getByTestId('input-name').fill('ghost_user');
    await page.getByTestId('btn-login').click();

    await expect(page.getByTestId('auth-error')).toBeVisible();
  });

  test('logs out and allows login with an existing account', async ({ page }) => {
    await register(page, 'persisted_user');
    await page.getByTestId('btn-logout').click();

    await expect(page.getByTestId('auth-form')).toBeVisible();

    await page.getByTestId('btn-switch-mode').click();
    await page.getByTestId('input-name').fill('persisted_user');
    await page.getByTestId('btn-login').click();

    await expect(page.getByTestId('view-play')).toBeVisible();
    await expect(page.getByTestId('hello-user')).toContainText('persisted_user');
  });

  test('restores the user session after refresh', async ({ page }) => {
    await register(page, 'refresh_user');
    await page.reload();

    await expect(page.getByTestId('view-play')).toBeVisible();
    await expect(page.getByTestId('hello-user')).toContainText('refresh_user');
  });

  test('works on mobile for register and first move', async ({ page }) => {
    await register(page, 'mobile_user');
    await page.getByTestId('cell-0').click();

    await expect(page.getByTestId('cell-0')).toHaveAttribute('data-state', 'x');
  });
});
