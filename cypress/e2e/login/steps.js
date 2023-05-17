import { When, Then, Given} from "@badeball/cypress-cucumber-preprocessor";
import {expect} from 'chai'


Given("eu tenho um usuario que existe", () => {
    this.user = {
        email: "nataliadias@qa.com.br",
        password: "teste"
    }
});

Given("eu tenho um usuario que nao existe", () => {
    this.user = {
        email: "nataliadias@qa.com.br",
        password: "teste1"
    }
});

When("eu fizer uma requisicao para login", () => {
    const {email, password} = this.user;

    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
            email: email,
            password: password
        },
        failOnStatusCode: false
    }).then((response) => {
        this.response = response
    })
});

Then("receberei status {int}", (status) => {
    expect(this.response.status).to.eq(status)
});

Then("receberei um token valido", () => {
    expect(this.response.body.authorization).to.match(/Bearer .*/)
});