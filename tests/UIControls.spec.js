import { test, expect } from "@playwright/test";

//section 5
test("@web UI control dropdown test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const username = await page.locator("#username");
  const password = await page.locator("#password");
  const signInBtn = await page.locator("#signInBtn");
  await username.type("rahulshettyacademy");
  await password.type("Learning@830$3mK2");

  const dropdown = page.locator("select.form-control");
  const radioButton = page.locator(".radiotextsty");
  await dropdown.selectOption("consult");
  await radioButton.last().click();
  await page.locator("#okayBtn").click();
  await expect(radioButton.last()).toBeChecked();

  //checkbox
  await page.locator("#terms").check();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  console.log(await page.locator("#terms").isChecked());
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await page.pause();
  await signInBtn.click();
});

test("Blink link validation test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const blinkLink = page.locator("[href*='documents-request']");
  await expect(blinkLink).toHaveAttribute("class", "blinkingText");
});

test("child window handling test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const blinkLink = page.locator("[href*='documents-request']");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    blinkLink.click(),
  ]);
  const newPageText = await newPage.locator(".red").textContent();
  console.log(newPageText);
  const userNameNewPage = newPageText.split("@");
  const email = userNameNewPage[1].split(" ")[0];

  //enter email in the user name field in the parent page
  await page.locator("#username").fill(email);
  await page.pause();

  //   const usernameText = await page.locator("#username").textContent();
  const usernameText = await page.locator("#username").inputValue();
  console.log(usernameText);
});
