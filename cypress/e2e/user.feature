Feature: Test CRUD methods in User

    Scenario: Add User
        Given I set POST user API endpoint
        And I set POST user payload
        When I send POST http request
        Then I receive HTTP status 201
        And I receive valid user response