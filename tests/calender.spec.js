import { test, expect } from "@playwright/test";

//Section 7 - automation calender
test("calender test", async ({ page }) => {
  const monthNumber = "6";
  const date = "30";
  const year = "2028";
  const expectedList = [monthNumber, date, year];
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label__labelText").click();
  await page.locator(".react-calendar__navigation__label__labelText").click();
  await page.getByText(year).click();
  await page
    .locator(".react-calendar__tile")
    .nth(Number(monthNumber) - 1)
    .click();
  //await page.locator("//abbr[text()='" + date + "']").click();
  await page.getByLabel("June 30, 2028", { exact: true }).click();

  const inputs = page.locator(".react-date-picker__inputGroup__input");

  for (let i = 0; i < expectedList.length; i++) {
    expect(await inputs.nth(i).inputValue("value")).toEqual(expectedList[i]);
  }
});
