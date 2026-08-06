Feature: Ecommerce validations

    @regression @smoke
    Scenario Outline:  Placing the order
        Given a login to ecommerce2 application "poongothai.chennappan@gmail.com" and "Playwright123!"
        Then Verify error message is displayed

    @smoke
    Scenario Outline:  Placing the order
        Given a login to ecommerce2 application "<username>" and "<password>"
        Then Verify error message is displayed

        Examples:
            | username                        | password          |
            | rahulshettyacademy              | Learning@830$3mK2 |
            | poongothai.chennappan@gmail.com | Playwright123!    |
            | anshika@gmail.com               | Iamking@000       |
            | abc@gmail.com                   | xyz123!           |