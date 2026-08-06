import { test, expect } from "@playwright/test";
import { login } from "./login";

//Section-9
//Test 1 — Single ticket booking is eligible for refund
test("Booking refund test1", async ({ page }) => {
  const baseURL = "https://eventhub.rahulshettyacademy.com";

  //Step1- Login
  await login(page);

  //Step 2 — Book first event with 1 ticket (default)
  await page.getByTestId("nav-events").click();
  await page.locator("[href='/events/3'] h3").waitFor();
  const events = page.getByTestId("event-card");
  const eventsCount = await events.count();
  console.log(eventsCount);
  console.log(await events.locator("div.p-4 a#book-now-btn").count());
  await events.locator("div.p-4 a#book-now-btn").nth(0).click();
  await page.waitForSelector("#ticket-count");
  await page.getByLabel("Full Name").fill("Poongothai Mohanumar");
  await page.locator("#customer-email").fill("abc@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 12345 67890");
  await page.locator("#confirm-booking").click();

  //Step 3 — Navigate to booking detail
  await page.getByRole("button", { name: "View My Bookings" }).click();
  await page.waitForLoadState("domcontentloaded");
  expect(await page.url()).toContain("/bookings");
  await page.waitForSelector(".text-3xl");
  await page.waitForSelector(".space-y-4");
  await page
    .locator("#booking-card")
    .nth(0)
    .getByRole("button", { name: "View Details" })
    .click();

  await page.waitForSelector(".text-2xl");
  expect(await page.getByText("Booking Information")).toBeVisible();

  //Step 4 — Validate booking ref
  const bookingref = await page
    .locator("nav span.text-gray-900.font-mono")
    .textContent();
  const eventTitle = await page.locator("div h1").textContent();
  expect(await bookingref.charAt(0)).toEqual(eventTitle.charAt(0));

  //   Step 5 — Check refund eligibility
  await page
    .getByRole("button", { name: "Check eligibility for refund?" })
    .click();
  await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

  //Step 6 — Validate result
  const refund = page.locator("#refund-result");
  await expect(refund).toBeVisible();
  expect(await refund.textContent()).toContain("Eligible for refund");
  expect(await refund.textContent()).toContain(
    "Single-ticket bookings qualify for a full refund",
  );
});

test("Booking refund test2", async ({ page }) => {
  const baseURL = "https://eventhub.rahulshettyacademy.com";

  //Step1- Login
  await login(page);

  //Step 2 — Book first event with 1 ticket (default)
  await page.getByTestId("nav-events").click();
  await page.locator("[href='/events/3'] h3").waitFor();
  const events = page.getByTestId("event-card");
  const eventsCount = await events.count();
  console.log(eventsCount);
  console.log(await events.locator("div.p-4 a#book-now-btn").count());
  await events.locator("div.p-4 a#book-now-btn").nth(0).click();
  await page.waitForSelector("#ticket-count");
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByLabel("Full Name").fill("Poongothai Mohanumar");
  await page.locator("#customer-email").fill("abc@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 12345 67890");
  await page.locator("#confirm-booking").click();

  //Step 3 — Navigate to booking detail
  await page.getByRole("button", { name: "View My Bookings" }).click();
  await page.waitForLoadState("domcontentloaded");
  expect(await page.url()).toContain("/bookings");
  await page.waitForSelector(".text-3xl");
  await page.waitForSelector(".space-y-4");
  await page
    .locator("#booking-card")
    .nth(0)
    .getByRole("button", { name: "View Details" })
    .click();

  await page.waitForSelector(".text-2xl");
  expect(await page.getByText("Booking Information")).toBeVisible();

  //Step 4 — Validate booking ref
  const bookingref = await page
    .locator("nav span.text-gray-900.font-mono")
    .textContent();
  const eventTitle = await page.locator("div h1").textContent();
  expect(await bookingref.charAt(0)).toEqual(eventTitle.charAt(0));

  //   Step 5 — Check refund eligibility
  await page
    .getByRole("button", { name: "Check eligibility for refund?" })
    .click();
  await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

  //Step 6 — Validate result (different assertions)

  const refund = page.locator("#refund-result");
  await expect(refund).toBeVisible();
  expect(await refund.textContent()).toContain("Not eligible for refund");
  expect(await refund.textContent()).toContain(
    "Group bookings (3 tickets) are non-refundable.",
  );
});
