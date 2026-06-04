import { defineConfig, devices } from '@playwright/test';
import * as fs from 'node:fs';

const chromiumPath =
  process.env.PLAYWRIGHT_EXECUTABLE_PATH ??
  (fs.existsSync(
    '/Users/rozita/Library/Caches/ms-playwright/chromium-1169/chrome-mac/Chromium.app/Contents/MacOS/Chromium'
  )
    ? '/Users/rozita/Library/Caches/ms-playwright/chromium-1169/chrome-mac/Chromium.app/Contents/MacOS/Chromium'
    : undefined);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  webServer: {
    command: 'python3 -m http.server 4173',
    url: 'http://127.0.0.1:4173/index.html',
    reuseExistingServer: true,
    timeout: 30_000
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        launchOptions: chromiumPath ? { executablePath: chromiumPath } : undefined
      }
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
        browserName: 'chromium',
        launchOptions: chromiumPath ? { executablePath: chromiumPath } : undefined
      }
    }
  ]
});
