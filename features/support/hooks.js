const {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
} = require("@cucumber/cucumber");
const { POManager } = require("../../Pages/POManager");
const { chromium } = require("playwright");

Before({ tags: "@regression or @smoke" }, async function () {
  console.log("Inside regression Before hook");
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage(); //making it as WOld constructior to available in other functions
  this.poManager = new POManager(this.page);
});

After(async function () {
  console.log("In After hook");
});

BeforeStep(async function () {
  console.log("In BeforeStep hook");
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "ssHook.png", fullPage: true });
  }
});
