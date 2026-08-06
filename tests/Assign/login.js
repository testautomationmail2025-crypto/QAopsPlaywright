import { page, expect } from "@playwright/test";

export async function login(page) {
  await page.goto("https://eventhub.rahulshettyacademy.com");
  await page
    .getByPlaceholder("you@email.com")
    .fill("poongothai.chennappan@gmail.com");
  await page.locator("#password").fill("Playwright123!");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();
}
