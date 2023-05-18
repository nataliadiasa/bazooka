import { When, Then, Given, Before } from "@badeball/cypress-cucumber-preprocessor";
import { expect } from "chai";

const generateRandomString = (myLength) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

Before(() => {
    this.endpoint = null;
    this.payload = null;
    this.userID = null;
    this.email = null;
})
  

Given("I set POST user API endpoint", () => {
    this.endpoint = "https://serverest.dev/usuarios"
})

Given("I generate random email", () => {
    var id = generateRandomString(20);
    this.email = `luffy-${id}@qa.com.br`;
})

Given(/user email is (\S+@\S+\.\S+)/, (email) => {
    this.email = email;
})

Given(/I set ([\w]+) user payload/, () => {
    this.payload = {
        nome: "Monkey D. Luffy",
        email: this.email,
        password: "teste",
        administrador: "true"
    }
})

When(/^I send ([\w]+) http request$/, (method) => {
    cy.request({
        method,
        url: this.endpoint,
        body: this.payload,
        failOnStatusCode: false,
    }).then((response) => {
        this.response = response
    })
})

Then("I receive HTTP status {int}", (status) => {
    expect(this.response.status).to.eq(status)
})

Then("I receive valid user response", () => {
    const { body } = this.response;
    expect(body.message).to.eq("Cadastro realizado com sucesso")
    expect(body._id).to.not.empty
})

Given("I generate random ID", () => {
    this.userID = generateRandomString(10)
})


Given("I set GET user API endpoint", () => {
    this.endpoint = `https://serverest.dev/usuarios`
})

Given(/a user with email (\S+@\S+\.\S+) exists/, (email) => {
    cy.request("https://serverest.dev/usuarios").then((response) => {
        const user = response.body.usuarios.find((user) => {
            return user.email == email
        })

        if(user) {
            this.userID = user._id;
            return;
        }

        cy.request({
            method: "POST",
            url: "https://serverest.dev/usuarios",
            body: {
                email: email,
                nome: "Monkey D. Luffy",
                password: "teste",
                administrador: "true"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            this.userID = response.body._id;
        })
    })
})

Given("I set user with ID API endpoint", () => {
    this.endpoint = `https://serverest.dev/usuarios/${this.userID}`
})