//section-12 interwork interception - route.abort

//page.on --> request

import { test, expect } from "@playwright/test";

test("Network interception - route.abort", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status()),
  );
  //   page.route("**/*.css", (route) => route.abort()); --> this blocks the fancy formatting
  page.route("**/*.{jpg, png, jpeg}", (route) => route.abort()); //--> blocks image loading
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const title = await page.title();
  console.log(title);
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  const username = await page.locator("#username");
  const password = await page.locator("#password");
  const signInBtn = await page.locator("#signInBtn");
  await username.type("rahulshetty");
  await password.type("Learning@830$3mK2");
  await signInBtn.click();
  const errorMsg = await page.locator("[style*='block']").textContent();
  console.log(errorMsg);
  await expect(errorMsg).toContain("Incorrect");

  await username.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await signInBtn.click();

  //Get 1st product text
  console.log(await page.locator(".card-body a").nth(0).textContent());

  //get all products text
  const allProducts = await page.locator(".card-body a").allTextContents();
  console.log(allProducts);
});
