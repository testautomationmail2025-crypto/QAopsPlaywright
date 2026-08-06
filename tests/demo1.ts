import { type Page, type Locator } from "@playwright/test";
let msg1: string = "Hello ts";
console.log(msg1);

let age1: number = 20;
console.log(age1);

let isActive: boolean = false;

let data: any = "abc";
data = 40;
console.log(data);

function addition(a: number, b: number): number {
  return a + b;
}
console.log(addition(3, 4));

let user2: { name: string; age: number } = {
  name: "Bob",
  age: 34,
};
//user2.location = "Chennai";
console.log(user2);

class LoginPage {
  page: Page;
  userName: Locator;
  password: Locator;
  signInBtn: Locator;
  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
    this.signInBtn = page.locator("#login");
  }
}
