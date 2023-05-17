Feature: Login

  Scenario: Existent User login
    Given eu tenho um usuario que existe
    When eu fizer uma requisicao para login
    Then receberei status 200
    Then receberei um token valido

  Scenario: Non Existent User login
    Given eu tenho um usuario que nao existe
    When eu fizer uma requisicao para login
    Then receberei status 401