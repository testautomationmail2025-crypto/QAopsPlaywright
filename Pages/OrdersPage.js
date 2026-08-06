const { expect } = require("@playwright/test");

class OrdersPage {
  constructor(page) {
    this.page = page;
    this.orderRows = page.locator("tbody tr ");
    this.orderSummaryId = page.locator(".col-text");
  }

  async selctOrderFromTable(orderId) {
    //const orderIdColumn = await orderRows.locator("th");
    const orderIdCount = await this.orderRows.count();
    for (let i = 0; i < orderIdCount; i++) {
      const tableOrderId = await this.orderRows
        .nth(i)
        .locator("th")
        .textContent();
      if (orderId.includes(tableOrderId)) {
        await this.orderRows.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  async validateOrderId(orderId) {
    const orderSummaryId = await this.orderSummaryId.textContent();
    expect(orderId.includes(orderSummaryId)).toBeTruthy();
  }
}
module.exports = { OrdersPage };
