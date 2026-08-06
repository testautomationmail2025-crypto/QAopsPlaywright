//Interwork interception - security testing

import { test, expect, request } from "@playwright/test";

test("Security test request intercept", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page
    .getByPlaceholder("email@example.com")
    .fill("poongothai.chennappan@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Playwright123!");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  console.log(await page.locator(".card-body b").allTextContents());
  await page.locator("ul li").getByRole("button", { name: "  ORDERS" }).click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a6027a685b8849b49014c24",
      }),
  );
  await page.locator('button:has-text("View")').first().click();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order",
  );
});
