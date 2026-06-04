import { expect, test } from '@playwright/test';
import { playGameToCompletion, registerFreshUser, seedUserWithHistory } from './helpers';

test.describe('history flows', () => {
  test.beforeEach(async ({ page }) => {
    await registerFreshUser(page, 'history_user');
  });

  test('shows empty history for a new user', async ({ page }) => {
    await page.getByTestId('nav-history').click();
    await expect(page.getByTestId('history-empty')).toBeVisible();
  });

  test('adds a history row after a completed game', async ({ page }) => {
    // Complete the game as a user would, then verify the persisted row on the History page.
    await playGameToCompletion(page);

    await page.getByTestId('nav-history').click();
    await expect(page.getByTestId('history-table')).toBeVisible();
    await expect(page.getByTestId('history-row-0')).toBeVisible();
    await expect(page.getByTestId('history-date-0')).not.toHaveText('');
    await expect(page.getByTestId('history-difficulty-0')).not.toHaveText('');
    await expect(page.getByTestId('history-result-0')).toContainText(/win|loss|draw/i);
  });

  test('clears history after confirmation', async ({ page }) => {
    // Start from a known history row so the clear action is the only behavior under test.
    await seedUserWithHistory(page, 'history_user', [{ difficulty: 'hard', result: 'win' }]);
    await page.getByTestId('nav-history').click();

    // Clearing history is destructive, so the app protects it with a browser confirmation.
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await page.getByTestId('btn-clear-history').click();
    await expect(page.getByTestId('history-empty')).toBeVisible();
  });
});
