Feature: Test CRUD methods in User

    Rule: 
        Scenario: Add User
            Given I set POST user API endpoint
            And I generate random email 
            And I set POST user payload
            When I send POST http request
            Then I receive HTTP status 201
            And I receive valid user response

        Scenario: Update User with random email
            Given I generate random ID 
            And I set PUT user API endpoint
            And I generate random email 
            And I set PUT user payload
            When I send PUT http request
            Then I receive HTTP status 201
            And I receive valid user response

        Scenario: List all users
            Given I set GET user API endpoint
            When I send GET http request
            Then I receive HTTP status 200

        Scenario: Get non existent user with ID
            Given I generate random ID
            And I set GET user with ID API endpoint
            When I send GET http request
            Then I receive HTTP status 400
            
    Rule:
        Background:
            Given a user with email monkeydluffy@qa.com.br exists

        Scenario: Add user with existent email
            Given I set POST user API endpoint
            And user email is monkeydluffy@qa.com.br
            And I set POST user payload
            When I send POST http request
            Then I receive HTTP status 400

        Scenario: Get User with ID
            Given I set GET user with ID API endpoint
            When I send GET http request
            Then I receive HTTP status 200