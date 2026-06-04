# Tic-Tac-Toe QA Task

This repository contains a full QA-style submission for the provided single-file Tic-Tac-Toe application.

## Deliverables

- `docs/EXPLORATORY_TESTING.md`
- `docs/TEST_PLAN.md`
- `docs/TEST_CASES.md`
- Playwright + TypeScript automation

## Scope Covered

- Welcome / auth entry flow
- Register
- Login
- Logout
- Profile
- Save profile changes
- Change display name
- Delete account
- Game board
- Difficulty selection
- New Game / Reset / Hint
- Win / Loss / Draw states
- History table
- Clear history
- Language switch
- Light / Dark theme
- Desktop and mobile execution

## Run Locally

```bash
npm install
npx playwright install
npm test
```

Run a specific project:

```bash
npx playwright test --project=desktop-chromium
npx playwright test --project=mobile-chrome
```

Open the HTML report:

```bash
npx playwright show-report
```

## Notes

- The suite serves the local `index.html` through a lightweight static server.
- Selectors use `getByTestId()` as the primary strategy.
- The browser projects cover both desktop and mobile viewport behavior.
