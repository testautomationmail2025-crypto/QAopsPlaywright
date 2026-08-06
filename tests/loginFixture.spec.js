import { customtest, expect } from "../utils/loginFixture";

customtest("Login fixture test", async ({ loggedInPage }) => {
  console.log(await loggedInPage.url());
});
