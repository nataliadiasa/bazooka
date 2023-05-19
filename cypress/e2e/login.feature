@browser-feature
Feature: Login
  Rule: 
    Scenario: Non Existent User login
      Given I visit login page
      When I set email field to invalid-email@invalid-domain.com
      And I set senha field to teste
      And I click in button entrar
      Then We check alert to be Email e/ou senha inválidos

  Rule: 
    Background:
      Given a user with name Monkey D. Luffy, email monkeydluffy@qa.com.br and password teste exists

    Scenario: Existent User login
      Given I visit login page
      When I set email field to monkeydluffy@qa.com.br
      And I set senha field to teste
      And I click in button entrar
      Then I must be in /admin/home
      And I can see Bem Vindo Monkey D. Luffy in h1