export class APIUtils {
  apiContext: any;
  loginPayLoad: string;
  constructor(apiContext: any, loginPayLoad: string) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getToken() {
    //Login API
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayLoad,
      },
    );
    //expect(loginResponse.ok()).toBeTruthy(); --> assertions are not needed when precondition setup
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload: string) {
    //Create-order API validation
    let response: { token: string; orderId: any } = {
      token: "",
      orderId: null,
    };
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );
    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    console.log(response);
    return response;
  }
}
