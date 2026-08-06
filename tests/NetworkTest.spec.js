// import { test, expect, request } from "@playwright/test";
// import { APIUtils } from "../utils/APIUtils";
const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

//Sectio-12 Netwrork Interception
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
const fakePayloadOrders = { data: [], message: "No Orders" };
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("WebAPI-part1", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");

  await page.route(
    //"https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69eebf06f86ba51a6589d2fb",
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request()); //fetch the api response
      let body = JSON.stringify(fakePayloadOrders); //converting javascript to jSON object
      //route.fulfill() --> tis just fetch and send the response without changing
      route.fulfill({
        response,
        body,
      }); //change to fake response and send to the browser again
    },
  );

  //Orders tab
  await page.locator("ul li").getByRole("button", { name: "  ORDERS" }).click();
  // await page.waitForResponse(
  //   "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69eebf06f86ba51a6589d2fb",
  // );
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );
  // await page.pause();
  console.log(await page.locator(".mt-4").textContent());
  //check the order id in the orders page
  //await page.waitForSelector("tbody tr");
  const orderRows = page.locator("tbody tr ");
});
