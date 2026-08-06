import { expect, type Page, type Locator } from "@playwright/test";
export class DashboardPage {
  page: Page;
  products: Locator;
  cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.cart = page.getByText("Cart", { exact: true });
  }

  async searchProductAddCart(productName: string) {
    const productCount = await this.products.count();
    for (let i = 0; i < productCount; i++) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products
          .nth(i)
          .getByRole("button", { name: " Add To Cart" })
          .click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.click();
  }
}
