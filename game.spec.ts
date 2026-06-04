import { expect, test } from '@playwright/test';
import { playGameToCompletion, playHumanMove, registerFreshUser, seedUserWithHistory } from './helpers';

test.describe('game flows', () => {
  test.beforeEach(async ({ page }) => {
    await registerFreshUser(page, 'player_one');
  });

  test('starts with an empty board and allows a valid move', async ({ page }) => {
    await expect(page.getByTestId('board')).toBeVisible();

    for (let index = 0; index < 9; index += 1) {
      await expect(page.getByTestId(`cell-${index}`)).toHaveAttribute('data-state', 'empty');
    }

    await playHumanMove(page, 0);
    await expect(page.getByTestId('cell-0')).toHaveAttribute('data-state', 'x');
  });

  test('prevents overriding an occupied cell', async ({ page }) => {
    await playHumanMove(page, 0);
    const initialState = await page.getByTestId('cell-0').getAttribute('data-state');

    await expect(page.getByTestId('cell-0')).toBeDisabled();
    await expect(page.getByTestId('cell-0')).toHaveAttribute('data-state', initialState ?? 'x');
  });

  test('records a completed game in history', async ({ page }) => {
    // The final result can be win/loss/draw; the important check is that completion is recorded.
    const finalStatus = await playGameToCompletion(page);

    expect(finalStatus).toMatch(/win|lose|draw/i);
    await page.getByTestId('nav-history').click();
    await expect(page.getByTestId('history-row-0')).toBeVisible();
    await expect(page.getByTestId('history-result-0')).toContainText(/win|loss|draw/i);
  });

  test('renders a persisted draw result in history', async ({ page }) => {
    // Seed a known draw so this test stays about history rendering, not AI move choice.
    await seedUserWithHistory(page, 'draw_user', [{ difficulty: 'easy', result: 'draw' }]);
    await page.getByTestId('nav-history').click();

    await expect(page.getByTestId('history-row-0')).toBeVisible();
    await expect(page.getByTestId('history-result-0')).toContainText(/draw/i);
  });

  test('resets the board', async ({ page }) => {
    await playHumanMove(page, 0);
    await page.getByTestId('btn-reset').click();

    for (let index = 0; index < 9; index += 1) {
      await expect(page.getByTestId(`cell-${index}`)).toHaveAttribute('data-state', 'empty');
    }
  });

  test('changes difficulty mid-game and resets after confirmation', async ({ page }) => {
    await playHumanMove(page, 0);

    // Difficulty changes during a live game ask for confirmation before resetting the board.
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await page.getByTestId('select-difficulty').selectOption('hard');

    for (let index = 0; index < 9; index += 1) {
      await expect(page.getByTestId(`cell-${index}`)).toHaveAttribute('data-state', 'empty');
    }

    await expect(page.getByTestId('select-difficulty')).toHaveValue('hard');
  });

  test('shows a hint without auto-playing a move', async ({ page }) => {
    await page.getByTestId('btn-hint').click();
    await expect(page.locator('.cell.is-hint')).toHaveCount(1);
    await expect(page.locator('[data-state="x"]')).toHaveCount(0);
  });
});
