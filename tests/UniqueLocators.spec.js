import { test, expect } from "@playwright/test";

// Section-7
test("PW unique locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  //getByLabel
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByLabel("Employed").check();

  //getByPlaceholder
  await page.getByPlaceholder("Password").fill("12345678");

  //getByRole
  await page.getByRole("button", { name: "Submit" }).click();

  //getByText
  expect(
    await page
      .getByText("Success! The Form has been submitted successfully!")
      .isVisible(),
  ).toBeTruthy();

  await page.getByRole("link", { name: "Shop" }).click();

  //locator chaining
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
  await page.pause();
});
