import { expect, test } from '@playwright/test';
import { appUrl, playHumanMove, registerFreshUser } from './helpers';

test.describe('localization flows', () => {
  test('switches from English to Persian and back', async ({ page }) => {
    await page.goto(appUrl);

    await page.getByTestId('select-language').selectOption('fa');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    await page.getByTestId('select-language').selectOption('en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  });

  test('keeps gameplay functional after language switch', async ({ page }) => {
    await registerFreshUser(page, 'localized_user');
    await page.getByTestId('select-language').selectOption('fa');
    await playHumanMove(page, 0);

    await expect(page.getByTestId('cell-0')).toHaveAttribute('data-state', 'x');
  });
});
