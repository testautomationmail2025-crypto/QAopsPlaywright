// const { LoginPage } = require("../Pages/LoginPage");
import { type Page, type Locator } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckOutPage } from "./CheckOutPage";
import { OrderConfirmationPage } from "./OrcerConfirmationPage";
import { OrdersPage } from "./OrdersPage";

export class POManager {
  page: Page;
  loginPage: LoginPage;
  DashboardPage: DashboardPage;
  cartPage: CartPage;
  checkoutPage: CheckOutPage;
  orderConfirmationPage: OrderConfirmationPage;
  ordersPage: OrdersPage;
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.DashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckOutPage(this.page);
    this.orderConfirmationPage = new OrderConfirmationPage(this.page);
    this.ordersPage = new OrdersPage(this.page);
  }

  getOrdersPage() {
    return this.ordersPage;
  }
  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.DashboardPage;
  }
  getCartPage() {
    return this.cartPage;
  }
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getOrderConfirmationPage() {
    return this.orderConfirmationPage;
  }
}
