const { test: base, expect } = require("@playwright/test");
import data from "../utils/clientAppTestData.json";
const { LoginPage } = require("../Pages/LoginPage");
exports.customtest = base.test.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    await use(page);
  },
});
