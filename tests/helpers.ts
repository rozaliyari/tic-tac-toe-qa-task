import { expect, type Page } from '@playwright/test';

export const appUrl = '/index.html';

export async function clearAndOpen(page: Page) {
  // Keep every test independent; this app stores users and sessions in localStorage.
  await page.goto(appUrl);
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await expect(page.getByTestId('app')).toBeVisible();
}

export async function registerFreshUser(page: Page, username: string) {
  await clearAndOpen(page);
  await page.getByTestId('input-name').fill(username);
  await page.getByTestId('btn-register').click();
  await expect(page.getByTestId('view-play')).toBeVisible();
}

export async function waitForHumanTurn(page: Page) {
  // The computer moves asynchronously, so the next click should wait for the player turn.
  await expect(page.getByTestId('status')).toHaveAttribute('data-status', 'your-turn');
}

export async function playHumanMove(page: Page, index: number) {
  await waitForHumanTurn(page);
  const cell = page.getByTestId(`cell-${index}`);
  await expect(cell).toBeEnabled();
  await expect(cell).toHaveAttribute('data-state', 'empty');
  await cell.click();
}

async function boardState(page: Page) {
  const board: string[] = [];
  for (let index = 0; index < 9; index += 1) {
    board.push((await page.getByTestId(`cell-${index}`).getAttribute('data-state')) ?? 'empty');
  }
  return board;
}

function findLineMove(board: string[], mark: 'x' | 'o') {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const marks = line.map(index => board[index]);
    if (marks.filter(value => value === mark).length === 2 && marks.includes('empty')) {
      return line[marks.indexOf('empty')];
    }
  }

  return undefined;
}

function chooseNextMove(board: string[]) {
  // Prefer a winning move, then a blocking move, then a stable fallback order.
  return (
    findLineMove(board, 'x') ??
    findLineMove(board, 'o') ??
    [4, 0, 2, 6, 8, 1, 3, 5, 7].find(index => board[index] === 'empty')
  );
}

export async function playGameToCompletion(page: Page) {
  // Finish the game through the UI without depending on a fixed computer response.
  for (let turn = 0; turn < 5; turn += 1) {
    await waitForHumanTurn(page);

    const board = await boardState(page);
    const move = chooseNextMove(board);
    expect(move).toBeDefined();

    await playHumanMove(page, move as number);

    const statusText = (await page.getByTestId('status').textContent()) ?? '';
    if (/win|lose|draw/i.test(statusText)) {
      return statusText;
    }
  }

  return (await page.getByTestId('status').textContent()) ?? '';
}

export async function seedUserWithHistory(
  page: Page,
  username: string,
  history: Array<{ difficulty: 'easy' | 'medium' | 'hard'; result: 'win' | 'loss' | 'draw' }>
) {
  // Used for focused profile/history checks where forcing the same result via AI would be brittle.
  await page.goto(appUrl);
  await page.evaluate(
    ({ name, entries }) => {
      const user = {
        name,
        createdAt: Date.now(),
        difficulty: 'easy',
        history: entries.map((entry, index) => ({
          finishedAt: Date.now() - index * 1000,
          difficulty: entry.difficulty,
          result: entry.result
        }))
      };

      window.localStorage.setItem('ttt:users', JSON.stringify({ [name]: user }));
      window.localStorage.setItem('ttt:session', name);
    },
    { name: username, entries: history }
  );
  await page.reload();
  await expect(page.getByTestId('view-play')).toBeVisible();
}
