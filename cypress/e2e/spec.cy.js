
//api test post to login
describe('API TESTING', () => {
  
  context("POST /login", () => {
    it('API - POST LOGIN', () => {
      cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
          email: "nataliadias@qa.com.br",
          password: "teste"
      }
      }).as('details')
      //Validate status code
      cy.get('@details').its('status').should('eq', 200)
      cy.get('@details')
      .then((response) => {
          let res = response.body
          const auth = res.authorization
          cy.log(auth)
      })
      cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
      })
    })
  })

  context("GET /usuarios", () => {
    it('API - GET USERS', () => {
      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios',
        }).as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 200)
        cy.get('@details')
        .then((response) => {
            let res = response.body
            cy.log(res)
        })
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })
      })
    })


    context("POST /usuarios", () => {
    it('API - POST USERS CREATE', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: {
          "nome": "Narutinhoo da Silva",
          "email": "narutohokage2000@qa.com.br",
          "password": "teste",
          "administrador": "true"
      }}).as('details')
      //Validate status code
      //cy.get('@details').its('status').should('eq', 200)
      cy.get('@details')
      .then((response) => {
          let res = response.body
          const att1 = res._id
          cy.log(att1)
      })
      cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
      })
    })
  })

  context("GET /usuarios/_id", () => {
    it('API - GET USERS WITH ID CREATE', () => {
      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios/'+ att1,
        })
        .as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 200)
        cy.get('@details').then((response) => {
            let res = response.body
            let att1 = res.id
            cy.log(att1)
        })
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })     
    })
  })
  
  context("GET /usuarios/_id", () => {
    it('API - DELETE USERS WITH ID CREATE', () => {
      cy.request({
        method: 'DELETE',
        url: 'https://serverest.dev/usuarios/'+ att1,
        })
        .as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 200)
        cy.get('@details').then((response) => {
            let res = response.body
            let att1 = res.id
            cy.log(att1)
        })
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })     
    })
  })

  context("PUT /usuarios/_id", () => {
    it('API - PUT USERS'), () => {
      cy.request({
        method: 'PUT',
        url: 'https://serverest.dev/usuarios/'+ att1,
        body: {
          nome: "Narutinho vai dar bom",
          email: "narutinhoemuitobom@qa.com.br",
          password: "teste",
          administrador: "true"
      }}).as('details')
      //Validate status code
      cy.get('@details').its('status').should('eq', 201)
      cy.get('@details')
      .then((response) => {
          let res = response.body
          let att1 = res._id
          cy.log(att1)
          cy.log(auth)
      })
      cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
      })
    }

    context("GET /produtos", () => {
      it('API - GET PRODUCTS', () => {
      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/produtos',
        })
        .as('details')
        //Validate status code
        cy.get('@details').its('status').should('eq', 200)
        cy.get('@details').then((response) => {
            let res = response.body
            let att1 = res.id
            cy.log(att1)
        })
        cy.get('@details').then((response) => {
            cy.log(JSON.stringify(response.body))
        })     
    })
  })    

  context("POST /produtos", () => {
    it('API - POST PRODUCTS CREATE', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        body: {
          "nome": "Logitech MX Vertical",
          "preco": 470,
          "descricao": "Mouse",
          "quantidade": 381
      }}).as('details')
      //Validate status code
      //cy.get('@details').its('status').should('eq', 200)
      cy.get('@details')
      .then((response) => {
          let res = response.body
          const att1 = res._id
          cy.log(att1)
      })
      cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
      })
    })
  })



}
)})