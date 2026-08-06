// @ts-check
import { chromium, defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 6000,
  },

  reporter: "html",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
        headless: false,
        screenshot: "on",
        trace: "on",
        viewport: { width: 720, height: 720 },
      },
    },
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "off",
        trace: "on",
        ...devices["Pixel 3"],
      },
    },
    {
      name: "webkit",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "off",
        trace: "on",
        ...devices["iPhone 11"],
        video: "retain-on-failure",
      },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // /* Run your local dev server before starting the tests */
  // // webServer: {
  // //   command: 'npm run start',
  // //   url: 'http://localhost:3000',
  // //   reuseExistingServer: !process.env.CI,
  // // },
});
