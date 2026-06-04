# Test Cases

## Auth

| ID | Scenario | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- |
| TC-01 | Open app | Open the application URL. | Header, language switch, theme button, and auth form are visible. | High |
| TC-02 | Register with valid username | Enter a valid username in register mode and submit. | User enters the main app and sees the game screen. | High |
| TC-03 | Switch to login mode | Click the auth mode switch. | Primary button changes from register to login. | High |
| TC-04 | Login with unknown user | Switch to login mode, enter an unknown username, submit. | Login is blocked and an error message is shown. | High |
| TC-05 | Login with existing user | Create a user, logout, switch to login mode, sign in again. | Existing account is restored successfully. | High |
| TC-06 | Logout | Click logout from an active session. | User returns to the auth screen. | High |
| TC-07 | Refresh after login | Login and refresh the page. | Session is restored as expected. | Medium |

## Gameplay

| ID | Scenario | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- |
| TC-08 | Fresh board state | Login and inspect the board before any move. | All 9 cells are empty. | High |
| TC-09 | Valid move | Click an empty cell. | Human mark is placed and the turn advances. | High |
| TC-10 | Occupied cell cannot be reused | Play one move, then try the same cell again. | Existing mark stays unchanged and no second move is accepted. | High |
| TC-11 | Computer responds | Place one valid move and wait. | Computer places exactly one response move. | High |
| TC-12 | Completed game | Play until the game reaches win, loss, or draw. | The app shows a final result and records the game. | High |
| TC-13 | Draw state | Complete or seed a draw scenario. | Draw result appears correctly in history/profile stats. | High |
| TC-14 | Reset | Make at least one move, then click reset. | Board returns to all-empty cells. | High |
| TC-15 | New Game | Finish or start a game, then click new game. | Fresh game starts with a clean board. | High |
| TC-16 | Hint | Click hint during an active game. | One suggested cell is highlighted and no mark is auto-played. | Medium |

## Difficulty

| ID | Scenario | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- |
| TC-17 | Change difficulty before play | Select another difficulty before making moves. | Difficulty changes successfully. | Medium |
| TC-18 | Change difficulty mid-game | Make a move, change difficulty, accept confirmation. | Current round resets and new difficulty is applied. | High |
| TC-19 | Hard mode sanity check | Switch to Hard and play multiple turns. | Flow remains stable and AI continues responding. | High |

## Profile

| ID | Scenario | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- |
| TC-20 | Open profile | Navigate to the profile page. | Profile form and stats are visible. | High |
| TC-21 | Update display name | Change the profile name and save. | Success message appears and header name updates. | High |
| TC-22 | Stats update after win | Win a game, then open profile. | Wins counter increases. | High |
| TC-23 | Stats update after draw | Draw a game, then open profile. | Draws counter increases. | High |
| TC-24 | Delete account | Click delete account and confirm. | Account is removed and user returns to auth. | High |

## History

| ID | Scenario | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- |
| TC-25 | Empty history state | Open history for a new user. | Empty-state message is shown. | Medium |
| TC-26 | History row after completed game | Finish a game and open history. | New row shows date, difficulty, and result. | High |
| TC-27 | Clear history | Click clear history and confirm. | History is removed and empty-state message appears. | High |

## Language And Theme

| ID | Scenario | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- |
| TC-28 | Switch to Persian | Select Persian from language control. | Document changes to `lang=fa` and `dir=rtl`. | High |
| TC-29 | Switch back to English | Select English after Persian mode. | Document changes to `lang=en` and `dir=ltr`. | High |
| TC-30 | Continue gameplay after language change | Change language during an active game and keep playing. | Board remains usable and state is preserved. | High |
| TC-31 | Enable dark theme | Click theme toggle from light mode. | Theme changes to dark. | High |
| TC-32 | Return to light theme | Click theme toggle again. | Theme changes back to light. | Medium |
| TC-33 | Continue using controls after theme change | Toggle theme and keep using board/settings controls. | Controls remain usable. | High |

## Responsive

| ID | Scenario | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- |
| TC-34 | Mobile auth smoke | Open the app in mobile viewport and register/login. | Auth flow remains usable on mobile. | High |
| TC-35 | Mobile gameplay smoke | Start a game in mobile viewport and place a move. | Core gameplay remains functional on mobile. | High |

## Automation Note

Some history/profile checks seed browser storage directly. I used that only where a fully UI-driven game path would be unnecessarily fragile because the computer player can choose different cells. The UI still validates that the user-facing pages render and behave correctly.
