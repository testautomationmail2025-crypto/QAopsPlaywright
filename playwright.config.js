// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.spec.ts"],
  timeout: 30 * 1000,
  expect: {
    timeout: 6000,
  },
  //retries: 2,
  fullyParallel: false,
  //workers: 3,
  reporter: [["line"], ["allure-playwright"]],
  use: {
    browserName: "chromium", //global setting for all tests, can be overridden in test.describe block
    headless: true,
    screenshot: "on",
    trace: "on",
  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: "chromium",
  //     use: { ...devices["Desktop Chrome"] },
  //   },
  //   //   /* Test against mobile viewports. */
  //   //   // {
  //   //   //   name: 'Mobile Chrome',
  //   //   //   use: { ...devices['Pixel 5'] },
  //   //   // },
  //   //   // {
  //   //   //   name: 'Mobile Safari',
  //   //   //   use: { ...devices['iPhone 12'] },
  //   //   // },
  //   //   /* Test against branded browsers. */
  //   //   // {
  //   //   //   name: 'Microsoft Edge',
  //   //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   //   // },
  //   //   // {
  //   //   //   name: 'Google Chrome',
  //   //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   //   // },
  // ],

  // /* Run your local dev server before starting the tests */
  // // webServer: {
  // //   command: 'npm run start',
  // //   url: 'http://localhost:3000',
  // //   reuseExistingServer: !process.env.CI,
  // // },
});
