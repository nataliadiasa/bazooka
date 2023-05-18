import { When, Then, Given} from "@badeball/cypress-cucumber-preprocessor";
import {expect} from 'chai'

Given(/I visit ([\w]+) page/, (page) => {
    cy.visit(`https://front.serverest.dev/${page}`)
})

When(/I set ([\w]+) field to (.+)/, (field, value) => {
    cy.get(`[data-testid = "${field}"]`).click().clear().type(value)
})

When(/I click in button ([\w]+)/, (field) => {
    cy.get(`[data-testid = "${field}"]`).click()
})

Then(/We check alert to be (.+)/, (label) => {
    cy.get(`form > .alert > span`).then((field) => {
        expect(field.text()).to.eq(label)
    })
})

Given(/a user with name (.+), email (\S+@\S+\.\S+) and password (.+) exists/, (name, email, password) => {
    cy.request("https://serverest.dev/usuarios").then((response) => {
        const user = response.body.usuarios.find((user) => {
            return user.email == email
        })

        const body = {
            email: email,
            nome: name,
            password: password,
            administrador: "true"
        }

        if(user) {
            if(user.password == password && user.nome == name) return
            cy.request({
                method: "PUT",
                url: `https://serverest.dev/usuarios/${user._id}`,
                body
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        }

        cy.request({
            method: "POST",
            url: "https://serverest.dev/usuarios",
            body: {
                email: email,
                nome: "Monkey D. Luffy",
                password: password,
                administrador: "true"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })
})

Then(/I must be in (.+)/, (page) => {
    cy.url().should('contain', page )
})

Then(/I can see (.+) in (.+)/, (value, selector) => {
    cy.get(selector).contains(value)
})