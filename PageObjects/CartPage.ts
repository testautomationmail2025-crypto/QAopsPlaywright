import { expect, type Page, type Locator } from "@playwright/test";

export class CartPage {
  page: Page;
  checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.productCartText = page.locator("h3:has-text('ZARA COAT 3')");
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
  }

  getProductInCart(productName: string) {
    return this.page.locator(`h3:has-text("${productName}")`);
  }
  async validateProductInCart(productName: string) {
    await this.page.waitForSelector("div li");
    const bool = await this.getProductInCart(productName).isVisible();
    await expect(bool).toBeTruthy();
  }

  async cartCheckoutBtn() {
    await this.checkoutBtn.click();
  }
}
