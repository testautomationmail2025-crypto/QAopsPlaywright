import { test, expect, request } from "@playwright/test";
import { login } from "./login";

const SIX_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 5,
      title: "Lollapalooza India",
      category: "Festival",
      eventDate: "2025-06-20T12:00:00.000Z",
      venue: "Mahalaxmi Racecourse",
      city: "Mumbai",
      price: "3000",
      totalSeats: 5000,
      availableSeats: 2000,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 6,
      title: "AI & ML Expo",
      category: "Conference",
      eventDate: "2025-06-25T10:00:00.000Z",
      venue: "Bangalore International Exhibition Centre",
      city: "Bangalore",
      price: "750",
      totalSeats: 300,
      availableSeats: 180,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};
const FOUR_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

//Test1 - Banner IS visible when 6 events are returned
//User clicks Events -> Browser sends GET /api/events -> Playwright catches it -> route.fulfill() ->
// -> Returns SIX_EVENTS_RESPONSE -> Frontend renders 6 cards
test("Test1 -Banner IS visible when 6 events are returned ", async ({
  page,
}) => {
  //Step-1 -->//Step 2 — Login and navigate
  await page.route("**/api/events**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      status: 200,
      body: JSON.stringify(SIX_EVENTS_RESPONSE),
    });
  });

  //Step 2 — Login and navigate
  await login(page);
  await page.getByTestId("nav-events").click();

  //Step 3 — Verify cards loaded from mock
  const eventCards = page.getByTestId("event-card");
  await expect(eventCards.first()).toBeVisible();
  expect(await eventCards.count()).toBe(6);

  //Step-4 locate banner and validate text
  await expect(page.getByText(/sandbox holds up to/i)).toBeVisible();
  await expect(page.locator(".mx-1").first()).toHaveText("9 bookings");
});

//Test 2 — Banner is NOT visible when 4 events are returned
test("Test1 -Banner is NOT visible when 4 events are returned ", async ({
  page,
}) => {
  //   Steps 1–2 — Same as Test 1, but use FOUR_EVENTS_RESPONSE in the mock
  await page.route("**/api/events**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      status: 200,
      body: JSON.stringify(FOUR_EVENTS_RESPONSE),
    });
  });
  //Step 2 — Login and navigate
  await login(page);
  await page.getByTestId("nav-events").click();
  await page.pause();

  //Step 3 — Verify cards loaded from mock
  const eventCards = page.getByTestId("event-card");
  await expect(eventCards.first()).toBeVisible();
  expect(await eventCards.count()).toBe(4);

  //Step-4  Verify banner is hidden
  await expect(page.getByText(/sandbox holds up to/i)).toBeHidden();
  //await expect(page.locator(".mx-1").first()).toHaveText("9 bookings");
});
