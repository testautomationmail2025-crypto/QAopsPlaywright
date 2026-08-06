import { test, expect, request } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = "https://api.eventhub.rahulshettyacademy.com/api";

const YAHOO_user = { email: "studentkothai@yahoo.com", password: "secret123" };
const GMAIL_user = {
  email: "poongothai.chennappan@gmail.com",
  password: "Playwright123!",
};
async function login(page, user) {
  await page.goto("https://eventhub.rahulshettyacademy.com");
  await page.getByPlaceholder("you@email.com").fill(user.email);
  await page.locator("#password").fill(user.password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();
}

test("Cross user access denied test", async ({ page, request }) => {
  //const apiContext = await request.newContext();
  console.log(`${API_URL}/auth/login`);
  const loginResponse = await request.post(`${API_URL}/auth/login`, {
    data: { email: YAHOO_user.email, password: YAHOO_user.password },
  });
  expect(loginResponse.ok()).toBeTruthy();
  const loginRespJson = await loginResponse.json();
  const token = loginRespJson.token;

  //   Step 2 — Fetch events via API to get a valid event ID
  const eventResponse = await request.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  await expect(eventResponse.ok()).toBeTruthy();
  const eventRespJson = await eventResponse.json();
  const eventId = eventRespJson.data[0].id;

  // Step 3 — Create a booking via API as Yahoo user
  const bookingResponse = await request.post(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      eventId: eventId,
      customerName: "Yahookt",
      customerEmail: YAHOO_user.email,
      customerPhone: 1234567890,
      quantity: 1,
    },
  });

  await expect(bookingResponse.ok()).toBeTruthy();
  const bookingRespJson = await bookingResponse.json();
  const yahooBookingId = bookingRespJson.data.id;
  console.log(bookingRespJson);
  console.log(yahooBookingId);

  //Step 4 — Login as Gmail user via browser UI
  await login(page, GMAIL_user);

  //Step 5 — Navigate to Yahoo's booking URL as Gmail user
  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, {
    waitUntil: "networkidle",
  });

  //Step 6 — Validate Access Denied
  await expect(page.getByText(" Access Denied")).toBeVisible();
  await expect(
    page.getByText("You are not authorized to view this booking"),
  ).toBeVisible();
});
