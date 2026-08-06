const { test, expect } = require("@playwright/test");

//Section 3
test("UI basic test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  console.log(title);
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
});

test("UI basic test login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
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
