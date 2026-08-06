const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../pages/POManager");
const { expect } = require("@playwright/test");
const { chromium } = require("playwright");
const data = JSON.parse(
  JSON.stringify(require("../../utils/clientAppTestData.json")),
);
Given(
  "a login to ecommerce application {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    /*
    These steps will be moved to hooks.js file to avoid code duplication in other scenarios
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    // const poManager = new POManager(page);
    this.poManager = new POManager(this.page); //world constructor -> world scope variable to access in other steps
    */
    const loginPage = this.poManager.getLoginPage();

    await loginPage.goTo();
    //await loginPage.validLogin(dataset.username, dataset.password); //-> if data from json file
    await loginPage.validLogin(username, password);
  },
);

When("add {string} to cart", async function (productName) {
  const dbPage = this.poManager.getDashboardPage();
  await dbPage.searchProductAddCart(productName);
  await dbPage.navigateToCart();
});

Then("verify {string} is displayed in the cart", async function (product) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.validateProductInCart(product);
  await cartPage.cartCheckoutBtn(product);
});

When("enter valid details and place the order", async function () {
  const checkoutPage = this.poManager.getCheckoutPage();
  await checkoutPage.fillCheckoutFieldInformation(data.username);
  await checkoutPage.placeOrder();
});

Then("verify order is present in the order history", async function () {
  const orderConfirmPage = this.poManager.getOrderConfirmationPage();
  const ordersPage = this.poManager.getOrdersPage();
  await orderConfirmPage.validateSuccessMessage();
  const orderId = await orderConfirmPage.getOrderId();
  await orderConfirmPage.navigateToOrders();

  await ordersPage.selctOrderFromTable(orderId);
  await ordersPage.validateOrderId(orderId);
});

Given(
  "a login to ecommerce2 application {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username2, password2) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const title = await this.page.title();
    console.log(title);
    await expect(this.page).toHaveTitle(
      "LoginPage Practise | Rahul Shetty Academy",
    );

    const username = await this.page.locator("#username");
    const password = await this.page.locator("#password");
    const signInBtn = await this.page.locator("#signInBtn");
    await username.type(username2);
    await password.type(password2);
    await signInBtn.click();
  },
);

Then("Verify error message is displayed", async function () {
  const errorMsg = await this.page.locator("[style*='block']").textContent();
  console.log(errorMsg);
  await expect(errorMsg).toContain("Incorrect");
});
