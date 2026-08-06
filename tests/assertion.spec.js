import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });
//section- 10
test("@web More assertions and Popup validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("https://google.com");
  //   await page.goBack();
  //   await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  //dialog
  await page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();

  //hover
  await page.locator("#mousehover").hover();
  await page.locator(".mouse-hover-content a").nth(0).click();

  //iframe
  const framesPage = page.frameLocator("courses-iframe");
});

//Section- 14
test("Screenshot & visual comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await expect(page.locator("#displayed-text")).toBeVisible();

  //Partial - element level screenshot
  await page.locator("#displayed-text").screenshot({ path: "partialSS.png" });

  await page.locator("#hide-textbox").click();

  //whole screen screenshot
  await page.screenshot({ path: "ssAssertion.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

//Section- 14
test("Visual testing", async ({ page }) => {
  await page.goto("https://www.flightaware.com/");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
