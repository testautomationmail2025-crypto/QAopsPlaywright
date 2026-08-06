import { test, expect, type Page } from "@playwright/test";
import { POManager } from "../../PageObjects/POManager";
import { customtest } from "../../utils/test-baseFixtureTS";
// const dataset = JSON.parse(
//   JSON.stringify(require("../../utils/clientAppTestData.json")),
// ); //testdata from json file
const dataset = JSON.parse(
  JSON.stringify(require("../../utils/parameterizeTestData.json")),
);
for (const data of dataset) {
  test(`@web E2E automation test - ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dbPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const orderConfirmPage = poManager.getOrderConfirmationPage();
    const ordersPage = poManager.getOrdersPage();

    await loginPage.goTo();
    //await loginPage.validLogin(dataset.username, dataset.password); //-> if data from json file
    await loginPage.validLogin(data.username, data.password);

    // await dbPage.searchProductAddCart(dataset.productName); //-> if data from json file
    await dbPage.searchProductAddCart(data.productName);
    await dbPage.navigateToCart();

    await cartPage.validateProductInCart(data.productName);
    await cartPage.cartCheckoutBtn();

    await checkoutPage.fillCheckoutFieldInformation(data.username);
    await checkoutPage.placeOrder();

    await orderConfirmPage.validateSuccessMessage();
    const orderId = await orderConfirmPage.getOrderId();
    await orderConfirmPage.navigateToOrders();

    await ordersPage.selctOrderFromTable(orderId);
    await ordersPage.validateOrderId(orderId);
  });
}

customtest(
  "E2E automation test",
  async ({
    page,
    testDataForOrder,
  }: {
    page: Page;
    testDataForOrder: {
      username: string;
      password: string;
      productName: string;
    };
  }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dbPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const orderConfirmPage = poManager.getOrderConfirmationPage();
    const ordersPage = poManager.getOrdersPage();

    await loginPage.goTo();
    //await loginPage.validLogin(dataset.username, dataset.password); //-> if data from json file
    await loginPage.validLogin(
      testDataForOrder.username,
      testDataForOrder.password,
    );

    // await dbPage.searchProductAddCart(dataset.productName); //-> if data from json file
    await dbPage.searchProductAddCart(testDataForOrder.productName);
    await dbPage.navigateToCart();

    await cartPage.validateProductInCart(testDataForOrder.productName);
    await cartPage.cartCheckoutBtn();

    await checkoutPage.fillCheckoutFieldInformation(testDataForOrder.username);
    await checkoutPage.placeOrder();

    await orderConfirmPage.validateSuccessMessage();
    const orderId = await orderConfirmPage.getOrderId();
    await orderConfirmPage.navigateToOrders();

    await ordersPage.selctOrderFromTable(orderId);
    await ordersPage.validateOrderId(orderId);
  },
);
