Feature: Ecommerce validations

    @smoke
    Scenario:  Placing the order
        Given a login to ecommerce application "poongothai.chennappan@gmail.com" and "Playwright123!"
        When add "ZARA COAT 3" to cart
        Then verify "ZARA COAT 3" is displayed in the cart
        When enter valid details and place the order
        Then verify order is present in the order history