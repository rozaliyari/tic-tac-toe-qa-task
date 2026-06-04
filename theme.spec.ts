import { expect, test } from '@playwright/test';
import { appUrl, playHumanMove, registerFreshUser } from './helpers';

test.describe('theme flows', () => {
  test('toggles dark mode and back to light mode', async ({ page }) => {
    await page.goto(appUrl);

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByTestId('btn-theme').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByTestId('btn-theme').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('keeps controls usable after theme switch', async ({ page }) => {
    await registerFreshUser(page, 'theme_user');

    await page.getByTestId('btn-theme').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await playHumanMove(page, 0);
    await expect(page.getByTestId('cell-0')).toHaveAttribute('data-state', 'x');
    await expect(page.getByTestId('select-language')).toBeEnabled();
  });
});
