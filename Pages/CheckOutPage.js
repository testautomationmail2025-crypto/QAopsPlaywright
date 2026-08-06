const { expect } = require("@playwright/test");
class CheckOutPage {
  constructor(page) {
    this.page = page;
    this.countryInputBox = page.getByPlaceholder("Select Country");
    this.dropdown = page.locator(".ta-results");
    this.validateEmailText = page.getByText("poongothai.chennappan@gmail.com", {
      exact: true,
    });
    this.cvvInputBox = page.locator("div input[class='input txt']").first();
    this.placeOrderBtn = page.locator(".action__submit.ng-star-inserted");
  }

  async fillCheckoutFieldInformation(username) {
    //await page.getByPlaceholder("Select Country").type("ind", { delay: 100 });
    await this.countryInputBox.pressSequentially("ind");
    await this.page.waitForSelector(".ta-results");
    const dropdownCount = await this.dropdown.locator("button.ta-item").count();
    console.log("dropdown count: ", dropdownCount);

    for (let i = 0; i < dropdownCount; i++) {
      const text = await this.dropdown
        .locator("button.ta-item")
        .nth(i)
        .textContent();
      if (text === " India") {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }

    //validating email id
    expect(await this.validateEmailText).toHaveText(username);

    //cvv
    await this.cvvInputBox.fill("123");
  }

  async placeOrder() {
    //submit button
    await this.placeOrderBtn.click();
  }
}
module.exports = { CheckOutPage };
