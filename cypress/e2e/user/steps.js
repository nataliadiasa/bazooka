import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
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
  

Given("I set POST user API endpoint", () => {
    this.endpoint = "https://serverest.dev/usuarios"
})

Given("I set POST user payload", () => {
    var id = generateRandomString(20);

    this.payload = {
        nome: "Monkey D. Luffy",
        email: `luffy-${id}@qa.com.br`,
        password: "teste",
        administrador: "true"
    }
})

When("I send POST http request", () => {
    cy.request({
        method: 'POST',
        url: this.endpoint,
        body: this.payload,
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