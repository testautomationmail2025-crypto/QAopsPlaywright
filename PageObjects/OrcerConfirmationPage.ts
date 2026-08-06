import { expect, type Page, type Locator } from "@playwright/test";

export class OrderConfirmationPage {
  page: Page;
  successMessageText: Locator;
  orderId: Locator;
  ordersTab: Locator;
  constructor(page: Page) {
    this.page = page;
    this.successMessageText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    this.ordersTab = page.locator("ul li");
  }

  async validateSuccessMessage() {
    const successMessage = await this.successMessageText.textContent();
    console.log(successMessage);
    await expect(this.successMessageText).toHaveText(
      " Thankyou for the order. ",
    );
  }

  async getOrderId() {
    const orderId = await this.orderId.textContent();
    console.log("orderId: ", orderId);
    return orderId;
  }

  async navigateToOrders() {
    await this.ordersTab.getByRole("button", { name: "  ORDERS" }).click();
    await this.page.waitForSelector("tbody tr");
  }
}
