// import { test, expect, request } from "@playwright/test";
// import { APIUtils } from "../utils/APIUtils";
const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

//Sectio-11
const loginPayload = {
  userEmail: "poongothai.chennappan@gmail.com",
  userPassword: "Playwright123!",
};
const orderPayload = {
  orders: [
    {
      country: "India",
      productOrderedId: "6960eac0c941646b7a8b3e68",
    },
  ],
}; //JS obj -> At run time it will be converted into json

// let token;
// let orderId; --> login and create order mover to utils. SO these 2 has no value here
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("@API WebAPI-part1", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");

  //validate orderid
  // orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  // console.log("orderId: " + orderId);

  //Orders tab
  await page.locator("ul li").getByRole("button", { name: "  ORDERS" }).click();

  //check the order id in the orders page
  await page.waitForSelector("tbody tr");
  const orderRows = page.locator("tbody tr ");

  //const orderIdColumn = await orderRows.locator("th");
  const orderRowsCount = await orderRows.count();
  for (let i = 0; i < orderRowsCount; i++) {
    const tableOrderId = await orderRows.nth(i).locator("th").textContent();
    console.log("orderId: ", response.orderId);
    if (response.orderId.includes(tableOrderId)) {
      await orderRows.nth(i).locator("button").first().click();
      break;
    }
  }

  //order summary page validation for id
  const orderSummaryId = await page.locator(".col-text").textContent();
  await page.pause();
  expect(response.orderId.includes(orderSummaryId)).toBeTruthy();
  await page.pause();
});
