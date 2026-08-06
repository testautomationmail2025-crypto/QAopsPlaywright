import { test, expect } from "@playwright/test";
import { login } from "./login";

//Section-9 Assignment-1

test("Event flow", async ({ page }) => {
  //Step 1 — Login
  await login(page);

  //Step 2 — Create a new event
  const title = `Event${Date.now()}`;
  console.log("title: ", title);
  await page.getByRole("button", { name: "Admin" }).click();
  await page.waitForSelector(".absolute");
  await page.locator(".absolute").getByText("Manage Events").click();
  await page.getByPlaceholder("Event title").fill(title);
  await page.locator("#admin-event-form textarea").fill("Diwali mela");
  await page.getByLabel("City").fill("California");
  await page.getByLabel("Venue").fill("Milpitas");
  await page.getByLabel("Event Date & Time").click();
  await page
    .getByRole("textbox", { name: "Event Date & Time*" })
    .fill("2026-10-24T12:12");
  await page.getByLabel("Price ($)").fill("100");
  const seats = "50";
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("button#add-event-btn").click();
  await expect(page.getByText("✓Event created!×")).toBeVisible();

  //Step 3 — Find the event card and capture seats
  await page.getByTestId("nav-events").click();
  await page.locator("[href='/events/3'] h3").waitFor();
  const events = page.getByTestId("event-card");
  const eventsCount = await events.count();
  console.log(eventsCount);
  expect(await events.nth(0)).toBeVisible();
  const eventTitle = events.locator("div h3.font-semibold");
  const eventTitleText = await eventTitle.allTextContents();
  await expect(eventTitleText).toContain(title);
  const eventSeat = page.locator(
    "div.flex.items-center.justify-between.pt-3.border-t.border-gray-100",
  );
  let seatsBeforeBooking = null;
  for (let i = 0; i < (await eventTitle.count()); i++) {
    console.log(await eventTitle.nth(i).textContent());
    if ((await eventTitle.nth(i).textContent()) === title) {
      const eventSeatValidation = await eventSeat
        .locator("span.text-xs")
        .nth(i)
        .textContent();
      seatsBeforeBooking = Number(eventSeatValidation.split(" ")[0]);

      //Step 4 — Start booking
      await eventSeat.nth(i).getByTestId("book-now-btn").click();
      break;
    }
  }
  console.log(seatsBeforeBooking);

  //Step 5 — Fill booking form
  await page.waitForSelector("#ticket-count");
  expect(await page.locator("#ticket-count").textContent()).toEqual("1");
  await page.getByLabel("Full Name").fill("Poongothai Mohanumar");
  await page.locator("#customer-email").fill("abc@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 12345 67890");
  await page.locator("#confirm-booking").click();

  //Step 6 — Verify booking confirmation
  await page.locator(".booking-ref").waitFor();
  await expect(page.locator(".booking-ref")).toBeVisible();
  const bookingRef = (await page.locator(".booking-ref").textContent()).trim();
  console.log(bookingRef);

  //Step 7 — Verify in My Bookings
  await page.getByRole("button", { name: "View My Bookings" }).click();
  await page.waitForLoadState("domcontentloaded");
  //   await page.waitForURL("https://eventhub.rahulshettyacademy.com/bookings");
  expect(await page.url()).toEqual(
    "https://eventhub.rahulshettyacademy.com/bookings",
  );
  await page.waitForSelector(".text-3xl");
  await page.waitForSelector(".space-y-4");
  const bookingCard = page.locator("#booking-card");
  const bookingcardTitle = await bookingCard
    .locator("h3.font-semibold")
    .allTextContents();

  console.log(bookingcardTitle);
  const bookingCardCount = await bookingcardTitle.length;
  console.log("Booking card count: ", bookingCardCount);
  for (let i = 0; i < bookingCardCount; i++) {
    console.log(await bookingCard.nth(i).locator(".booking-ref"));
    expect(
      await bookingCard.nth(i).locator(".booking-ref").nth(i).textContent(),
    ).toequal(bookingRef);
    await expect(
      bookingCard.nth(i).locator(".booking-ref").nth(i).toBeVisible(),
    );
    expect(
      await bookingCard.locator("h3.font-semibold").nth(i).textContent(),
    ).toequal(title);
  }
});
