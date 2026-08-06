const { LoginPage } = require("../Pages/LoginPage");
const { DashboardPage } = require("../Pages/DashboardPage");
const { CartPage } = require("../Pages/CartPage");
const { CheckOutPage } = require("../Pages/CheckOutPage");
const { OrderConfirmationPage } = require("../Pages/OrcerConfirmationPage");
const { OrdersPage } = require("../Pages/OrdersPage");
class POManager {
  constructor(page) {
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
module.exports = { POManager };
