import { test, expect } from "@playwright/test";

test("Login practice test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page
    .getByPlaceholder("email@example.com")
    .fill("poongothai.chennappan@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Playwright123!");
  await page.locator("#login").click();
  console.log(await page.locator(".card-body b").nth(0).textContent());
});

test("E2E automation test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const username = "poongothai.chennappan@gmail.com";
  await page.getByPlaceholder("email@example.com").fill(username);
  await page.getByPlaceholder("enter your passsword").fill("Playwright123!");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  const products = await page.locator(".card-body");
  const productCount = await products.count();
  //console.log(productCount);

  const productName = "ZARA COAT 3";
  for (let i = 0; i < productCount; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products
        .nth(i)
        .getByRole("button", { name: " Add To Cart" })
        .click();
      break;
    }
  }
  await page.getByText("Cart", { exact: true }).click();
  //await page.locator('button').filter({ hasText: 'Cart' }).first();

  //.items h3

  await page.waitForSelector("div li");
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  await expect(bool).toBeTruthy();

  //checkout
  await page.getByRole("button", { name: "Checkout" }).click();
  //await page.getByPlaceholder("Select Country").type("ind", { delay: 100 });
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.waitForSelector(".ta-results");
  const dropdown = page.locator(".ta-results");
  const dropdownCount = await dropdown.locator("button").count();
  console.log(dropdownCount);

  for (let i = 0; i < dropdownCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  //validating email id
  expect(
    await page.getByText("poongothai.chennappan@gmail.com", { exact: true }),
  ).toHaveText(username);

  //cvv
  await page.locator("div input[class='input txt']").first().fill("123");
  //submit button
  await page.locator(".action__submit").click();

  //validating success message
  const successMessage = await page.locator(".hero-primary").textContent();
  console.log(successMessage);
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );

  //validate orderid
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log("orderId: " + orderId);

  //Orders tab
  await page.locator("ul li").getByRole("button", { name: "  ORDERS" }).click();
  //check the order id in the orders page
  await page.waitForSelector("tbody tr");
  const orderRows = page.locator("tbody tr ");
  //const orderIdColumn = await orderRows.locator("th");
  const orderIdCount = await orderRows.count();
  for (let i = 0; i < orderIdCount; i++) {
    const tableOrderId = await orderRows.nth(i).locator("th").textContent();
    if (orderId.includes(tableOrderId)) {
      await orderRows.nth(i).locator("button").first().click();
      break;
    }
  }
  //order summary page validation for id
  const orderSummaryId = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderSummaryId)).toBeTruthy();
  await page.pause();
});
