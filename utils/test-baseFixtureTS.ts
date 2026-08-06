import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}
export const customtest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
  testDataForOrder: {
    username: "poongothai.chennappan@gmail.com",
    password: "Playwright123!",
    productName: "ZARA COAT 3",
  },
});
