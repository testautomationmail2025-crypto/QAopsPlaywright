const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    // this.productCartText = page.locator("h3:has-text('ZARA COAT 3')");
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
  }

  getProductInCart(productName) {
    return this.page.locator(`h3:has-text("${productName}")`);
  }
  async validateProductInCart(productName) {
    await this.page.waitForSelector("div li");
    const bool = await this.getProductInCart(productName).isVisible();
    await expect(bool).toBeTruthy();
  }

  async cartCheckoutBtn() {
    await this.checkoutBtn.click();
  }
}
module.exports = { CartPage };
