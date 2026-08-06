import { expect, type Page, type Locator } from "@playwright/test";

export class OrdersPage {
  page: Page;
  orderRows: Locator;
  orderSummaryId: Locator;
  constructor(page: Page) {
    this.page = page;
    this.orderRows = page.locator("tbody tr ");
    this.orderSummaryId = page.locator(".col-text");
  }

  async selctOrderFromTable(orderId: any) {
    //const orderIdColumn = await orderRows.locator("th");
    const orderIdCount = await this.orderRows.count();
    for (let i = 0; i < orderIdCount; i++) {
      const tableOrderId: string | null = await this.orderRows
        .nth(i)
        .locator("th")
        .textContent();

      if (tableOrderId && orderId.includes(tableOrderId)) {
        await this.orderRows.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  async validateOrderId(orderId: any) {
    const orderSummaryId: string | null =
      await this.orderSummaryId.textContent();
    if (orderSummaryId) {
      expect(orderId.includes(orderSummaryId)).toBeTruthy();
    }
  }
}
