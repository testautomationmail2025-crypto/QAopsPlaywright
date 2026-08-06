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
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForLoadState("networkidle");
  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: " Add To Cart" })
    .click();
  await page.locator("li").filter({ hasText: "Cart" }).click();

  await page.waitForSelector("div li");
  expect(await page.getByText("ZARA COAT 3").isVisible()).toBeTruthy();

  //checkout
  await page.getByRole("button", { name: "Checkout" }).click();
  //await page.getByPlaceholder("Select Country").type("ind", { delay: 100 });
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button", { name: "India" }).nth(1).click();

  //validating email id
  expect(
    await page.getByText("poongothai.chennappan@gmail.com", { exact: true }),
  ).toHaveText(username);

  //cvv

  await page.locator("div input[class='input txt']").first().fill("123");
  //submit button
  await page.getByText("Place Order").click();
  await page.pause();

  //validating success message
  exepct(
    await page.getByText(" Thankyou for the order. ").isVisible(),
  ).toBeTruthy();
  // const successMessage = await page.locator(".hero-primary").textContent();
  // console.log(successMessage);
  // await expect(page.locator(".hero-primary")).toHaveText(
  //   " Thankyou for the order. ",
  // );

  // //validate orderid
  // const orderId = await page
  //   .locator(".em-spacer-1 .ng-star-inserted")
  //   .textContent();
  // console.log("orderId: " + orderId);

  // //Orders tab
  // await page.locator("ul li").getByRole("button", { name: "  ORDERS" }).click();
  // //check the order id in the orders page
  // await page.waitForSelector("tbody tr");
  // const orderRows = page.locator("tbody tr ");
  // //const orderIdColumn = await orderRows.locator("th");
  // const orderIdCount = await orderRows.count();
  // for (let i = 0; i < orderIdCount; i++) {
  //   const tableOrderId = await orderRows.nth(i).locator("th").textContent();
  //   if (orderId.includes(tableOrderId)) {
  //     await orderRows.nth(i).locator("button").first().click();
  //     break;
  //   }
  // }
  // //order summary page validation for id
  // const orderSummaryId = await page.locator(".col-text").textContent();
  // expect(orderId.includes(orderSummaryId)).toBeTruthy();
  // await page.pause();
});
