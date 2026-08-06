const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "poongothai.chennappan@gmail.com",
    password: "Playwright123!",
    productName: "ZARA COAT 3",
  },
});
