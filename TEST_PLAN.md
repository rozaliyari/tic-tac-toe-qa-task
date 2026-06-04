# Test Plan

## Objective

Validate that the Tic-Tac-Toe application behaves correctly across authentication, gameplay, account management, persistence, localization, theme changes, and responsive execution.

## In Scope

- Welcome / auth entry
- Register
- Login
- Logout
- Profile view
- Save profile changes
- Change display name
- Delete account
- Game board interaction
- Difficulty levels: Easy, Medium, Hard
- New Game
- Reset
- Hint
- Win / Loss / Draw states
- History page and clear history
- Persistent profile stats
- Language switch: English / Persian
- Theme switch: Light / Dark
- Desktop and mobile regression execution

## Out Of Scope

- Deep accessibility audit
- Security testing
- Performance/load testing
- Source-code unit testing
- Full cross-browser matrix beyond the configured Chromium desktop/mobile projects

## Test Approach

1. Explore the app manually to understand real behavior and hidden state dependencies.
2. Document functional scenarios by feature area.
3. Automate the highest-value regression flows with Playwright and TypeScript.
4. Run the suite on both desktop and mobile projects.

## Automation Focus

- Register/login/logout
- Session restore after refresh
- Valid game move
- Occupied-cell protection
- Completed game history logging
- Reset
- Difficulty change during play
- Hint behavior
- Profile page and profile update
- History table and clear history
- Language switch
- Theme switch
- Mobile smoke coverage

## Risks

- Game-state logic may become inconsistent after UI setting changes.
- Difficulty switching can reset state unexpectedly.
- Persistent storage can leak between scenarios if tests do not isolate state.
- Mobile layout can affect navigation and discoverability.
- The computer player makes some long exact move sequences less stable for automation.

## Current Automation Status

Last verified command:

```bash
npx playwright test
```

Result:

```text
46 passed
```
