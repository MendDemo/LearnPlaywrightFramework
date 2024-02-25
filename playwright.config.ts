import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 240000,
  workers: 4,
  retries: 0,
  use: {
    trace: 'on',
    video:'on',
    screenshot:'on',
    headless: false,
  },
  projects: [
    {
      name: 'chrome',
       use: {
          channel: 'chrome',
          baseURL: 'https://businesscentral.dynamics.com/?noSignUpCheck=1',
          viewport: {
            width: 1720,
            height: 1280
          }
        },
    }, 
  ],
 
})