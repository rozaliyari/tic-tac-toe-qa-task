# Exploratory Testing

## Overview

The app looks small at first glance, but it is not only a board game. It also has authentication, profile data, game history, difficulty settings, localization, theme switching, and browser-storage persistence.

I treated it as a small stateful product, because most of the real risk sits in the places where those features meet each other.

## What I Explored

- Welcome/auth entry screen
- Register and login mode switch
- Username-based session entry
- Logout flow
- Gameplay screen with board, status, difficulty, hint, new game, and reset
- Profile page with editable display name and persistent stats
- History page with result rows and clear-history action
- Language switch between English and Persian
- Light/Dark theme toggle
- Session and profile persistence through browser storage
- Desktop and mobile behavior

## Key Observations

- The app depends heavily on front-end state, so stale state after reset, difficulty change, logout, or refresh is a meaningful risk.
- The computer plays automatically after the user moves. Automated tests should avoid hard-coded long move sequences unless the expected computer response is controlled.
- Persian mode changes both content and document direction, so it is more than a text-only check.
- History and profile stats are connected to game completion, which makes them good candidates for regression coverage.
- Stable `data-testid` selectors make the app automation-friendly.

## Practical Note

I kept the automated tests focused on user-visible behavior. For some result-state checks, persisted setup is cleaner than forcing a long and brittle UI path. That keeps the tests useful instead of turning them into a fight with the computer player.
